import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sendEmail, getSheetData, updateSheetRow } from './lib/googleApi.js';
import { EMAIL_TEMPLATES, getGreeting } from './lib/emailTemplates.js';
import { hasBeenContacted, logEmailSent, getEmailsSentTodayCount } from './lib/db.js';

// Configuration
const WARMUP_START_DATE = new Date('2026-07-19T00:00:00Z');

// Rotate between sender accounts
const SENDERS = ['jarred@pivotaltimes.io', 'hello@pivotaltimes.io'];

function getDailyLimit(): number {
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - WARMUP_START_DATE.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  
  let baseLimit = 15;
  if (diffDays <= 7) baseLimit = 15;
  else if (diffDays <= 14) baseLimit = 30;
  else if (diffDays <= 21) baseLimit = 50;
  else baseLimit = 100;
  
  // Multiply the base limit by the number of active sender accounts
  return baseLimit * SENDERS.length;
}

type SequenceType = 'A' | 'B' | 'C';

function parseLastSent(notes: string): { step: number, sequence: SequenceType, date: Date } | null {
  if (!notes) return null;
  
  let lastState = null;
  
  // Parse the new v2 format
  const regex = /\[Seq([ABC])_([123]) sent (?:from .*? )?at (.*?)\]/g;
  let match;
  while ((match = regex.exec(notes)) !== null) {
    const seq = match[1] as SequenceType;
    const step = parseInt(match[2], 10);
    const date = new Date(match[3]);
    if (!lastState || step > lastState.step) {
      lastState = { step, sequence: seq, date };
    }
  }
  
  if (lastState) return lastState;
  
  // Backwards compatibility for the old v1 format
  const oldRegex = /\[SequenceA_Initial sent from .* at (.*?) EST\]/g;
  while ((match = oldRegex.exec(notes)) !== null) {
    const dateStr = match[1]; 
    const date = new Date(dateStr);
    lastState = { step: 1, sequence: 'A' as SequenceType, date };
  }
  
  return lastState;
}

// This endpoint is triggered by Vercel Cron
export default async function handler(req: VercelRequest, res: VercelResponse) {
  const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;
  if (!SPREADSHEET_ID) {
    console.log('Missing GOOGLE_SHEET_ID. Skipping outreach.');
    return res.status(200).json({ status: 'skipped', reason: 'Missing GOOGLE_SHEET_ID' });
  }

  try {
    // 0. Enforce Business Hours (9am - 6pm Central Time)
    const now = new Date();
    const cstHour = parseInt(now.toLocaleString('en-US', { timeZone: 'America/Chicago', hour: 'numeric', hourCycle: 'h23' }));
    if (cstHour < 9 || cstHour >= 18) {
      console.log(`Outside of business hours (9am - 6pm CST). Current CST hour: ${cstHour}`);
      return res.status(200).json({ status: 'paused', reason: 'Outside business hours' });
    }

    // 2. Fetch leads from Google Sheet (First Name, Email, Status, Notes)
    const rows = await getSheetData(SPREADSHEET_ID, 'A2:D');
    if (!rows || rows.length === 0) {
      return res.status(200).json({ status: 'completed', message: 'No leads found' });
    }

    // 1. Warmup Throttle Check
    const dailyLimit = getDailyLimit();
    
    // Count emails sent today directly from the Google Sheets logs
    // This makes the rate limit bulletproof even if the Supabase connection fails
    const todayStr = new Date().toISOString().split('T')[0]; // e.g. '2026-07-20'
    let emailsSentToday = 0;
    for (const row of rows) {
      const notes = row[3] || '';
      const matches = notes.match(new RegExp(`sent (?:from .*? )?at ${todayStr}`, 'g'));
      if (matches) {
        emailsSentToday += matches.length;
      }
    }
    
    if (emailsSentToday >= dailyLimit) {
      console.log(`Daily limit reached (${emailsSentToday}/${dailyLimit}). Pausing until tomorrow.`);
      return res.status(200).json({ status: 'throttled', emailsSentToday, dailyLimit });
    }

    let emailsProcessed = 0;
    
    // Process top-to-bottom
    for (let i = 0; i < rows.length; i++) {
      // Re-verify daily limit locally per tick
      if (emailsSentToday + emailsProcessed >= dailyLimit) break;
      if (emailsProcessed >= 2) break; // Hard limit per cron tick (waterfall flow)

      const [firstName, email, status, notes] = rows[i];

      // 3. Do Not Disturb checks
      if (!email || !email.includes('@')) continue;
      const skipStatuses = ['dnd', 'replied', 'in convo', 'sent'];
      if (status && skipStatuses.includes(status.toLowerCase())) continue;

      // 4. State Machine Logic
      const state = parseLastSent(notes);
      
      let nextStepToSend = 1;
      let sequenceToUse: SequenceType;
      
      const now = new Date();
      
      if (!state) {
        // No emails sent yet. Assign a random sequence!
        const seqs: SequenceType[] = ['A', 'B', 'C'];
        sequenceToUse = seqs[Math.floor(Math.random() * seqs.length)];
        nextStepToSend = 1;
        
        // Deduplication check for brand new leads (only check Supabase on step 1)
        const contacted = await hasBeenContacted(email);
        if (contacted) {
          console.log(`Skipping ${email}: Already in Supabase database.`);
          continue;
        }
      } else {
        // They have received at least one email
        sequenceToUse = state.sequence;
        
        if (state.step === 1) {
          // Check if 72 hours have passed since Email 1
          const hoursElapsed = (now.getTime() - state.date.getTime()) / (1000 * 60 * 60);
          if (hoursElapsed < 72) continue; // Not time yet
          nextStepToSend = 2;
        } 
        else if (state.step === 2) {
          // Check if 96 hours (4 days) have passed since Email 2
          const hoursElapsed = (now.getTime() - state.date.getTime()) / (1000 * 60 * 60);
          if (hoursElapsed < 96) continue; // Not time yet
          nextStepToSend = 3;
        }
        else {
          // Step 3 or higher. Sequence is complete!
          continue; 
        }
      }

      // 5. Send Email
      // Get the correct template based on sequence and step
      const seqMap = {
        'A': EMAIL_TEMPLATES.sequenceA,
        'B': EMAIL_TEMPLATES.sequenceB,
        'C': EMAIL_TEMPLATES.sequenceC
      };
      
      const stepKey = `email${nextStepToSend}` as 'email1'|'email2'|'email3';
      const template = seqMap[sequenceToUse][stepKey];
      
      // Inject variables
      const greeting = getGreeting(firstName);
      const rawBody = template.body.replace('{{GREETING}}', greeting);
      const htmlBody = rawBody.replace(/\n/g, '<br/>');

      const senderAccount = SENDERS[Math.floor(Math.random() * SENDERS.length)];

      console.log(`Sending Seq${sequenceToUse}_${nextStepToSend} to ${email} from ${senderAccount}`);
      try {
        await sendEmail(senderAccount, email, template.subject, htmlBody);
        
        // 6. Log to Database
        await logEmailSent(email, `Seq${sequenceToUse}_${nextStepToSend}`);
        
        // 7. Write back to Google Sheets (Column D is Notes. Row is i + 2)
        const newLog = `[Seq${sequenceToUse}_${nextStepToSend} sent from ${senderAccount} at ${now.toISOString()}]`;
        const combinedNotes = notes ? `${notes}\n${newLog}` : newLog;
        await updateSheetRow(SPREADSHEET_ID, `D${i + 2}`, [[combinedNotes]]);
        
        emailsProcessed++;
      } catch (err: any) {
        console.error(`Failed to send email to ${email} from ${senderAccount}. Error:`, err.message);
        // Continue to the next lead so the entire engine doesn't crash
        continue;
      }
    }

    return res.status(200).json({ success: true, processed: emailsProcessed, limit: dailyLimit });
  } catch (error: any) {
    console.error('Outreach engine error:', error);
    return res.status(500).json({ error: 'Outreach failed', details: error.message });
  }
}

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sendEmail, getSheetData, updateSheetRow } from './lib/googleApi.js';
import { EMAIL_TEMPLATES } from './lib/emailTemplates.js';
import { hasBeenContacted, logEmailSent, getEmailsSentTodayCount } from './lib/db.js';

// Configuration
const WARMUP_START_DATE = new Date('2026-07-19T00:00:00Z');

const SENDERS = ['hello@pivotaltimes.io', 'jarred@pivotaltimes.io'];

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

// This endpoint is triggered by Vercel Cron
export default async function handler(req: VercelRequest, res: VercelResponse) {
  const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;
  if (!SPREADSHEET_ID) {
    console.log('Missing GOOGLE_SHEET_ID. Skipping outreach.');
    return res.status(200).json({ status: 'skipped', reason: 'Missing GOOGLE_SHEET_ID' });
  }

  try {
    // 1. Warmup Throttle Check
    const dailyLimit = getDailyLimit();
    const emailsSentToday = await getEmailsSentTodayCount();
    
    if (emailsSentToday >= dailyLimit) {
      console.log(`Daily limit reached (${emailsSentToday}/${dailyLimit}). Pausing until tomorrow.`);
      return res.status(200).json({ status: 'throttled', emailsSentToday, dailyLimit });
    }

    // 2. Fetch leads from Google Sheet (First Name, Email, Status, Notes)
    const rows = await getSheetData(SPREADSHEET_ID, 'A2:D');
    if (!rows || rows.length === 0) {
      return res.status(200).json({ status: 'completed', message: 'No leads found' });
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
      // Skip if Notes column indicates it was already processed for this specific sequence
      // (This prevents double-sending the same sequence, but allows other sequence notes)
      if (notes && notes.includes('[SequenceA_Initial sent')) continue;

      // 4. Deduplication via Supabase
      const contacted = await hasBeenContacted(email);
      if (contacted) {
        console.log(`Skipping ${email}: Already in Supabase database.`);
        continue;
      }

      // 5. Send Email
      // Randomly pick an account from the SENDERS array to distribute the load
      const senderAccount = SENDERS[Math.floor(Math.random() * SENDERS.length)];
      const template = EMAIL_TEMPLATES.sequenceA.initial;
      const htmlBody = template.body.replace(/\n/g, '<br/>');

      console.log(`Sending Initial Outreach to ${email} from ${senderAccount}`);
      await sendEmail(senderAccount, email, template.subject, htmlBody);
      
      // 6. Log to Database
      await logEmailSent(email, 'SequenceA_Initial');
      
      // 7. Write back to Google Sheets (Column D is Notes. Row is i + 2)
      // We append to the existing notes so we never overwrite old data
      const timestamp = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' });
      const newLog = `[SequenceA_Initial sent from ${senderAccount} at ${timestamp} EST]`;
      const combinedNotes = notes ? `${notes}\n${newLog}` : newLog;
      await updateSheetRow(SPREADSHEET_ID, `D${i + 2}`, [[combinedNotes]]);
      
      emailsProcessed++;
    }

    return res.status(200).json({ success: true, processed: emailsProcessed, limit: dailyLimit });
  } catch (error: any) {
    console.error('Outreach engine error:', error);
    return res.status(500).json({ error: 'Outreach failed', details: error.message });
  }
}

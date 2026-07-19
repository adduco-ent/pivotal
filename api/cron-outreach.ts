import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sendEmail, getSheetData } from './lib/googleApi.js';
import { EMAIL_TEMPLATES } from './lib/emailTemplates.js';
import { hasBeenContacted, logEmailSent } from './lib/db.js';

// This endpoint is triggered by Vercel Cron
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Protect the cron endpoint from public access if needed, though Vercel handles authorization via headers for cron.
  
  const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;
  if (!SPREADSHEET_ID) {
    console.log('Missing GOOGLE_SHEET_ID. Skipping outreach.');
    return res.status(200).json({ status: 'skipped', reason: 'Missing GOOGLE_SHEET_ID' });
  }

  try {
    // 1. Fetch leads from Google Sheet (Assuming Columns A: Email, B: Status)
    const rows = await getSheetData(SPREADSHEET_ID, 'Leads!A2:B');
    if (!rows || rows.length === 0) {
      return res.status(200).json({ status: 'completed', message: 'No leads found' });
    }

    let emailsProcessed = 0;
    
    // Process top-to-bottom, strictly 1 or 2 per tick to avoid rate limits
    for (let i = 0; i < rows.length; i++) {
      if (emailsProcessed >= 2) break; // Hard limit per cron tick (waterfall flow)

      const [email, status] = rows[i];

      // 2. Do Not Disturb checks
      if (!email || !email.includes('@')) continue;
      const skipStatuses = ['dnd', 'replied', 'in convo', 'sent'];
      if (status && skipStatuses.includes(status.toLowerCase())) continue;

      // 3. Deduplication via Supabase
      const contacted = await hasBeenContacted(email);
      if (contacted) {
        console.log(`Skipping ${email}: Already in Supabase database.`);
        continue;
      }

      // 4. Send Email (Domain Warmup: you can rotate sender accounts here)
      const senderAccount = 'hello@pivotaltimes.io'; // or rotate based on logic
      const template = EMAIL_TEMPLATES.sequenceA.initial;

      // Replace newlines with <br/> for HTML
      const htmlBody = template.body.replace(/\n/g, '<br/>');

      console.log(`Sending Initial Outreach to ${email} from ${senderAccount}`);
      
      // Uncomment to actually send:
      await sendEmail(senderAccount, email, template.subject, htmlBody);
      
      // 5. Log to Database
      await logEmailSent(email, 'SequenceA_Initial');
      
      emailsProcessed++;
    }

    return res.status(200).json({ success: true, processed: emailsProcessed });
  } catch (error: any) {
    console.error('Outreach engine error:', error);
    return res.status(500).json({ error: 'Outreach failed', details: error.message });
  }
}

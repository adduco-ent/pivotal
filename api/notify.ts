import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sendEmail } from './lib/googleApi.js';
import { db } from './lib/db.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, website, revenue, message } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    // 1. Insert into Supabase (if db is configured)
    if (db) {
      const { error: dbError } = await db.from('strategy_calls').insert([{
        name,
        email,
        phone,
        website,
        revenue,
        message
      }]);

      if (dbError) {
        console.error('Supabase insert error:', dbError);
        // We continue to send the email even if DB fails so lead isn't lost
      }
    } else {
      console.warn('Supabase DB client not initialized. Skipping database insert.');
    }

    // 2. Send Email Notification
    const subject = `New Call Request: ${name} from ${website || 'Website'}`;
    const htmlBody = `
      <h2>New Booking Request</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
      <p><strong>Website:</strong> ${website || 'N/A'}</p>
      <p><strong>Current Monthly Revenue:</strong> ${revenue}</p>
      <p><strong>Message:</strong> ${message || 'N/A'}</p>
    `;

    // Send the email to Jarred from the service account
    await sendEmail(
      'hello@pivotaltimes.io', // Impersonate this sender
      'jarred@pivotaltimes.io', // Destination email
      subject,
      htmlBody
    );

    return res.status(200).json({ success: true, message: 'Booking received and notification sent' });
  } catch (error: any) {
    console.error('Error in notify endpoint:', error);
    return res.status(500).json({ error: 'Failed to process booking', details: error.message });
  }
}

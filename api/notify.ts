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
      'jarred@pivotaltimes.io', // Impersonate this sender
      'jarred@pivotaltimes.io', // Destination email
      subject,
      htmlBody
    );

    // 3. Send Auto-Responder to the Lead (A/B Split Test)
    const isVariationA = Math.random() < 0.5;
    
    let autoResponderSubject = '';
    let autoResponderBody = '';

    if (isVariationA) {
      autoResponderSubject = `Your funnel is about to get a lot tighter.`;
      autoResponderBody = `
        <p>Hey ${name},</p>
        <p>Jarred here, Founder of PivotalX.</p>
        <p>I see your booking request just came through. First of all, respect for pulling the trigger. Most founders just watch their revenue leak out of their funnels and hope it fixes itself. It doesn't.</p>
        <p>We're going to dive deep into your entire architecture and find exactly where you're bleeding cash. I'll review your info and get back to you shortly to lock in a time for us to talk.</p>
        <p>Talk soon,<br/>Jarred Letofsky</p>
      `;
    } else {
      autoResponderSubject = `I caught your booking request. Let's fix those leaks.`;
      autoResponderBody = `
        <p>Hey ${name},</p>
        <p>Jarred here. Just got your strategy call request.</p>
        <p>I've already got my team pulling up the blueprint on your current setup. To be completely honest, looking at funnels that are leaking revenue physically hurts my soul—so I'm looking forward to getting in there and patching it up for you.</p>
        <p>I'm reviewing your details now, and I'll shoot you over a couple of times to connect shortly. Take a breath; the hard part is over.</p>
        <p>Best,<br/>Jarred Letofsky<br/>Founder, PivotalX</p>
      `;
    }

    try {
      await sendEmail(
        'hello@pivotaltimes.io', // Use the new dedicated hello account
        email, // Send TO the lead
        autoResponderSubject,
        autoResponderBody
      );
    } catch (autoResponderError) {
      console.error('Failed to send auto-responder to lead:', autoResponderError);
      // We don't fail the whole request if the autoresponder fails
    }

    return res.status(200).json({ success: true, message: 'Booking received and notification sent' });
  } catch (error: any) {
    console.error('Error in notify endpoint:', error);
    return res.status(500).json({ error: 'Failed to process booking', details: error.message });
  }
}

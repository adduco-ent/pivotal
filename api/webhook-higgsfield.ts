import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || '';
const db = (supabaseUrl && supabaseKey) ? createClient(supabaseUrl, supabaseKey) : null;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  if (!db) {
    return res.status(500).json({ error: 'Database not configured' });
  }

  try {
    // Higgsfield Webhook payload usually contains the generation status and video URL
    // E.g. { id: '...', status: 'completed', url: 'https://...' }
    const { id, status, url } = req.body;

    if (!id || !status) {
      return res.status(400).json({ error: 'Invalid webhook payload' });
    }

    if (status === 'completed' && url) {
      // Update the queue in Supabase
      const { error } = await db
        .from('content_queue')
        .update({ video_url: url })
        .eq('higgsfield_generation_id', id);

      if (error) {
        throw new Error(`Database Error: ${error.message}`);
      }
    } else if (status === 'failed') {
      // Mark as failed/rejected in our system
      await db
        .from('content_queue')
        .update({ status: 'rejected' })
        .eq('higgsfield_generation_id', id);
    }

    return res.status(200).json({ success: true });
  } catch (error: any) {
    console.error('Webhook Error:', error);
    return res.status(500).json({ error: 'Webhook processing failed', details: error.message });
  }
}

import type { VercelRequest, VercelResponse } from '@vercel/node';
import OpenAI from 'openai';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || '';
const db = (supabaseUrl && supabaseKey) ? createClient(supabaseUrl, supabaseKey) : null;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const HIGGSFIELD_API_KEY = process.env.HIGGSFIELD_API_KEY;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!db) {
    return res.status(500).json({ error: 'Database not configured' });
  }
  if (!process.env.OPENAI_API_KEY || !HIGGSFIELD_API_KEY) {
    return res.status(500).json({ error: 'Missing API keys (OpenAI or Higgsfield)' });
  }

  // 1. Determine if this should be a "post" or a "story" (e.g. 1 story per day, 3 posts per week)
  // For simplicity, let's randomly pick, leaning towards story since it's daily.
  const isPost = Math.random() > 0.7; // 30% chance for a post
  const type = isPost ? 'post' : 'story';
  
  // Aspect ratio for Higgsfield
  // Stories are 9:16, Posts are typically 4:5 or 1:1, let's use 4:5 for cinematic posts
  const aspectRatio = isPost ? '4:5' : '9:16';

  try {
    // 2. Generate Cinematic Prompt via GPT-4o
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a master creative director and cinematographer. Your job is to write a highly detailed, cinematic text-to-video prompt for an AI video generator (like Sora/Higgsfield) that showcases premium design, branding, and conversion rate optimization (CRO) concepts."
        },
        {
          role: "user",
          content: `Write a prompt for a breathtaking ${type} video. It should visually symbolize high-end web design, scaling revenue, or plugging leaky funnels. Use terms like: 4k, photorealistic, cinematic lighting, volumetric fog, dynamic tracking shot, macro lens, etc. 
          Return ONLY the prompt string, nothing else. Maximum 500 characters.`
        }
      ],
      temperature: 0.8,
    });

    const prompt = completion.choices[0].message.content?.trim() || '';
    if (!prompt) throw new Error('Failed to generate prompt');

    console.log(`Generated Prompt: ${prompt}`);

    // 3. Send to Higgsfield Supercomputer API
    // (Note: The exact payload format assumes v1 generations endpoint based on Higgsfield docs)
    const higgsResponse = await fetch('https://api.higgsfield.ai/v1/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${HIGGSFIELD_API_KEY}`
      },
      body: JSON.stringify({
        prompt: prompt,
        aspect_ratio: aspectRatio,
        duration: 5, // typically 5s or 10s
        webhook_url: `https://${req.headers.host}/api/webhook-higgsfield`,
        // metadata to identify it when the webhook fires
        metadata: {
          type: type
        }
      })
    });

    if (!higgsResponse.ok) {
      const err = await higgsResponse.text();
      throw new Error(`Higgsfield API Error: ${err}`);
    }

    const higgsData = await higgsResponse.json();
    const generationId = higgsData.id;

    // 4. Queue it in Supabase as "pending_review"
    const { error } = await db.from('content_queue').insert([{
      higgsfield_generation_id: generationId,
      prompt: prompt,
      type: type,
      status: 'pending_review'
    }]);

    if (error) {
      throw new Error(`Database Error: ${error.message}`);
    }

    return res.status(200).json({ success: true, generationId, type, prompt });
  } catch (error: any) {
    console.error('Content Generator Error:', error);
    return res.status(500).json({ error: 'Content generation failed', details: error.message });
  }
}

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

// Only initialize the client if variables are present to prevent boot crashes
export const db = (supabaseUrl && supabaseKey) 
  ? createClient(supabaseUrl, supabaseKey) 
  : null;

export async function hasBeenContacted(email: string): Promise<boolean> {
  if (!db) return false;
  const { data, error } = await db
    .from('email_logs')
    .select('id')
    .eq('email', email)
    .limit(1);
  if (error) console.error('Error checking contact status:', error);
  return data && data.length > 0;
}

export async function logEmailSent(email: string, sequenceId: string) {
  if (!db) return;
  const { error } = await db.from('email_logs').insert([{
    email,
    sequence_id: sequenceId,
    sent_at: new Date().toISOString()
  }]);
  if (error) console.error('Error logging email:', error);
}

export async function getEmailsSentTodayCount(): Promise<number> {
  if (!db) return 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Start of today

  const { count, error } = await db
    .from('email_logs')
    .select('*', { count: 'exact', head: true })
    .gte('sent_at', today.toISOString());
    
  if (error) console.error('Error counting emails today:', error);
  return count || 0;
}

import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const sa = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || '';
  const pk = process.env.GOOGLE_PRIVATE_KEY || '';
  
  return res.status(200).json({
    service_account: sa.substring(0, 10) + '...',
    pk_length: pk.length,
    pk_start: pk.substring(0, 30),
    pk_has_newlines: pk.includes('\n'),
    pk_has_literal_newlines: pk.includes('\\n')
  });
}

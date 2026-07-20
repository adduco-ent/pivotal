import { google } from 'googleapis';

const SCOPES = [
  'https://mail.google.com/',
  'https://www.googleapis.com/auth/spreadsheets'
];

export function getAuthClient(subjectEmail: string) {
  // If the key has literal '\n' strings instead of actual newlines, fix it
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;

  if (!privateKey || !clientEmail) {
    throw new Error('Google credentials missing in environment variables');
  }

  return new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: SCOPES,
    subject: subjectEmail, // Impersonate the user for Domain-Wide Delegation
  });
}

export async function sendEmail(fromEmail: string, toEmail: string, subject: string, htmlBody: string) {
  const auth = getAuthClient(fromEmail);
  const gmail = google.gmail({ version: 'v1', auth });

  const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString('base64')}?=`;
  
  const messageParts = [
    `From: ${fromEmail}`,
    `To: ${toEmail}`,
    'Content-Type: text/html; charset=utf-8',
    'MIME-Version: 1.0',
    `Subject: ${utf8Subject}`,
    '',
    htmlBody,
  ];
  const message = messageParts.join('\n');
  
  // The Gmail API requires base64url encoded strings
  const encodedMessage = Buffer.from(message)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  const res = await gmail.users.messages.send({
    userId: 'me',
    requestBody: {
      raw: encodedMessage,
    },
  });

  return res.data;
}

export async function getSheetData(spreadsheetId: string, range: string) {
  const auth = getAuthClient('jarred@pivotaltimes.io');
  const sheets = google.sheets({ version: 'v4', auth });
  
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  });
  
  return response.data.values;
}

export async function updateSheetRow(spreadsheetId: string, range: string, values: any[][]) {
  const auth = getAuthClient('jarred@pivotaltimes.io');
  const sheets = google.sheets({ version: 'v4', auth });
  
  const response = await sheets.spreadsheets.values.update({
    spreadsheetId,
    range,
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values,
    },
  });
  
  return response.data;
}

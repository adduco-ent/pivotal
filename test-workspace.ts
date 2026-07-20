import { config } from 'dotenv';
config();
import { google } from 'googleapis';

const SCOPES = [
  'https://mail.google.com/',
  'https://www.googleapis.com/auth/spreadsheets'
];

function getAuthClient(subjectEmail: string) {
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  return new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: SCOPES,
    subject: subjectEmail,
  });
}

async function testEmail(authEmail: string, fromEmail: string) {
  try {
    const auth = getAuthClient(authEmail);
    const gmail = google.gmail({ version: 'v1', auth });
    
    const messageParts = [
      `From: ${fromEmail}`,
      `To: jarred@adducoenterprises.com`,
      'Content-Type: text/html; charset=utf-8',
      'MIME-Version: 1.0',
      `Subject: Test Auth=${authEmail} From=${fromEmail}`,
      '',
      'Testing!',
    ];
    
    const message = messageParts.join('\n');
    const encodedMessage = Buffer.from(message)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    await gmail.users.messages.send({
      userId: 'me',
      requestBody: { raw: encodedMessage },
    });
    console.log(`SUCCESS: Auth=${authEmail}, From=${fromEmail}`);
  } catch (e: any) {
    console.error(`FAILED: Auth=${authEmail}, From=${fromEmail} | Error: ${e.message}`);
  }
}

async function runTests() {
  console.log("Running tests...");
  await testEmail('nobody@pivotaltimes.io', 'nobody@pivotaltimes.io');
  await testEmail('hello@pivotaltimes.io', 'hello@pivotaltimes.io');
  await testEmail('nobody@pivotaltimes.io', 'hello@pivotaltimes.io');
}

runTests();

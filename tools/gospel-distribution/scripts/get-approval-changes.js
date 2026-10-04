const { google } = require('googleapis');
require('dotenv').config();

const auth = new google.auth.OAuth2(
  process.env.GMAIL_CLIENT_ID,
  process.env.GMAIL_CLIENT_SECRET,
  'http://localhost:3000/auth/callback'
);

auth.setCredentials({
  refresh_token: process.env.GMAIL_REFRESH_TOKEN
});

const gmail = google.gmail({
  version: 'v1',
  auth: auth
});

function getMessageBody(message) {
  try {
    if (message.payload.parts) {
      for (const part of message.payload.parts) {
        if (part.mimeType === 'text/plain') {
          return Buffer.from(part.body.data, 'base64').toString('utf-8');
        }
      }
    }
    if (message.payload.body && message.payload.body.data) {
      return Buffer.from(message.payload.body.data, 'base64').toString('utf-8');
    }
    return '';
  } catch (error) {
    return '';
  }
}

async function getApprovalContent() {
  try {
    console.log('Fetching approval response...\n');

    // Search for approval responses
    const res = await gmail.users.messages.list({
      userId: 'me',
      q: 'subject:"Re: Quote #1" OR subject:"Re: Quote #2" from:whoisjimi.today@gmail.com',
      maxResults: 5
    });

    const messages = res.data.messages || [];
    
    if (messages.length === 0) {
      console.log('No approval responses found');
      return;
    }

    for (const msg of messages) {
      const fullMessage = await gmail.users.messages.get({
        userId: 'me',
        id: msg.id,
        format: 'full'
      });

      const subject = fullMessage.data.payload.headers.find(h => h.name === 'Subject')?.value || '';
      const body = getMessageBody(fullMessage.data);
      const date = fullMessage.data.payload.headers.find(h => h.name === 'Date')?.value || '';

      console.log('='.repeat(80));
      console.log(`Subject: ${subject}`);
      console.log(`Date: ${date}`);
      console.log('='.repeat(80));
      console.log('\nContent:\n');
      console.log(body);
      console.log('\n' + '='.repeat(80) + '\n');
    }

  } catch (error) {
    console.error('Error:', error.message);
  }
}

getApprovalContent();

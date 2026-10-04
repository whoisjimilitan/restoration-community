const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
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
    console.error('Error extracting message body:', error);
    return '';
  }
}

async function listenForApproval(quoteNumber = 1, checkIntervalSeconds = 5) {
  console.log(`Listening for approval of Quote #${quoteNumber}...`);
  console.log(`Checking every ${checkIntervalSeconds} seconds...`);
  console.log(`(This will run indefinitely until approval is received)\n`);

  const checkForApproval = async () => {
    try {
      // Look for emails with "Quote" and the quote number in subject
      const query = `subject:"Quote #${quoteNumber}" from:${process.env.APPROVAL_EMAIL}`;

      const res = await gmail.users.messages.list({
        userId: 'me',
        q: query,
        maxResults: 10
      });

      const messages = res.data.messages || [];

      if (messages.length === 0) {
        return null;
      }

      // Get the most recent message (the reply)
      const replyMessage = await gmail.users.messages.get({
        userId: 'me',
        id: messages[0].id,
        format: 'full'
      });

      const subject = replyMessage.data.payload.headers.find(h => h.name === 'Subject')?.value || '';
      const body = getMessageBody(replyMessage.data);
      const from = replyMessage.data.payload.headers.find(h => h.name === 'From')?.value || '';

      // Check if this is a reply (contains "Re:")
      if (!subject.includes('Re:')) {
        return null;
      }

      // Parse approval status
      let status = null;
      let feedback = '';

      if (body.includes('Approve') || body.includes('approve')) {
        status = 'APPROVED';
      } else if (body.includes('Redo') || body.includes('redo')) {
        status = 'REDO_REQUESTED';
        // Extract feedback after "Redo"
        const redoMatch = body.match(/[Rr]edo[:\s]+([\s\S]*?)(?:\n\n|$)/);
        if (redoMatch) {
          feedback = redoMatch[1].trim();
        }
      }

      if (status) {
        return {
          quoteNumber,
          status,
          feedback,
          from,
          subject,
          body,
          messageId: messages[0].id,
          receivedAt: new Date().toISOString()
        };
      }

      return null;

    } catch (error) {
      console.error('Error checking for approval:', error);
      return null;
    }
  };

  // Check immediately, then at intervals, indefinitely
  let approval = await checkForApproval();

  while (!approval) {
    await new Promise(resolve => setTimeout(resolve, checkIntervalSeconds * 1000));
    approval = await checkForApproval();
  }

  // Log the approval
  const logDir = path.join(process.env.EVIDENCE_LOG_PATH || './pipeline-evidence', `quote-${quoteNumber}-approval`);
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }

  fs.writeFileSync(
    path.join(logDir, 'approval-received.json'),
    JSON.stringify(approval, null, 2)
  );

  console.log('\n' + '='.repeat(80));
  console.log(`✓ APPROVAL RECEIVED FOR QUOTE #${quoteNumber}`);
  console.log('='.repeat(80));
  console.log(`Status: ${approval.status}`);
  console.log(`From: ${approval.from}`);
  console.log(`Subject: ${approval.subject}`);
  if (approval.feedback) {
    console.log(`\nFeedback:\n${approval.feedback}`);
  }
  console.log('='.repeat(80) + '\n');

  return approval;
}

// Export for use
module.exports = { listenForApproval };

// If run directly with quote number argument
if (require.main === module) {
  const quoteNum = process.argv[2] ? parseInt(process.argv[2]) : 1;
  listenForApproval(quoteNum).then(approval => {
    if (approval.status === 'APPROVED') {
      console.log(`Proceeding with Quote #${quoteNum}...`);
      process.exit(0);
    } else {
      console.log(`Quote #${quoteNum} needs revision.`);
      console.log(`Feedback: ${approval.feedback}`);
      process.exit(1);
    }
  });
}

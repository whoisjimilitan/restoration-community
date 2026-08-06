// Email sequence configuration for the restoration journey
// Each sequence triggers at specific lifecycle events

console.log('[EMAIL] Sequences module loaded');

export interface EmailSequence {
  name: string;
  trigger: string;
  subject: string;
  timing: string; // when email should be sent relative to trigger
  description: string;
}

// Sequence 1: Gathering attendance reminder (24 hours before)
export const gatheringReminderSequence: EmailSequence = {
  name: 'Gathering 24hr Reminder',
  trigger: 'attendance_registered',
  subject: '🙏 Your Gathering is Tomorrow - Friday 7PM at SCOAN',
  timing: '24 hours before gathering',
  description: 'Sends reminder to registered attendees 24 hours before Friday gathering with location, time, and preparation prayer.',
};

// Sequence 2: Stage progression notification (when user advances a stage)
export const stageProgressionSequence: EmailSequence = {
  name: 'Stage Progression Alert',
  trigger: 'stage_transitioned',
  subject: 'You\'ve Progressed to a New Stage in Your Restoration Journey',
  timing: 'immediately after transition approval',
  description: 'Welcomes user to new stage, explains the week\'s focus, includes stage resources and reflection prompts.',
};

// Sequence 3: Reflection prompt (daily/weekly)
export const reflectionPromptSequence: EmailSequence = {
  name: 'Weekly Reflection Prompt',
  trigger: 'weekly_schedule',
  subject: 'This Week\'s Reflection: [Stage Name]',
  timing: 'Monday 9am in user\'s timezone',
  description: 'Sends weekly reflection question based on current stage, encourages journaling, includes relevant scripture.',
};

// Sequence 4: Mentor introduction (when mentor assigned)
export const mentorIntroductionSequence: EmailSequence = {
  name: 'Mentor Assignment Intro',
  trigger: 'mentor_assigned',
  subject: 'Meet Your Mentor - [Mentor Name]',
  timing: 'immediately after assignment',
  description: 'Introduces mentor, explains mentor\'s role, provides mentor contact info, sets expectations for accountability.',
};

// Sequence 5: Prayer request acknowledgment
export const prayerRequestAckSequence: EmailSequence = {
  name: 'Prayer Request Acknowledgment',
  trigger: 'prayer_request_submitted',
  subject: 'Your Prayer Request Has Been Received',
  timing: 'immediately after submission',
  description: 'Confirms prayer request received, explains prayer ministry process, sets expectation for prayer warrior assignment.',
};

// Sequence 6: Cohort completion (when all 7 stages finished)
export const completionCelebrationSequence: EmailSequence = {
  name: 'Restoration Completion Celebration',
  trigger: 'cohort_complete',
  subject: '🎉 You\'ve Completed Your 7-Week Restoration Journey',
  timing: 'immediately after final stage completion',
  description: 'Celebrates completion, invites reflection on transformation, explains next steps (testify, mentor, continue serving).',
};

// All sequences
export const emailSequences: EmailSequence[] = [
  gatheringReminderSequence,
  stageProgressionSequence,
  reflectionPromptSequence,
  mentorIntroductionSequence,
  prayerRequestAckSequence,
  completionCelebrationSequence,
];

// Email trigger events
export type EmailTrigger =
  | 'attendance_registered'
  | 'stage_transitioned'
  | 'weekly_schedule'
  | 'mentor_assigned'
  | 'prayer_request_submitted'
  | 'cohort_complete';

// Helper to get sequence by trigger
export function getSequenceByTrigger(trigger: EmailTrigger): EmailSequence | undefined {
  return emailSequences.find(seq => seq.trigger === trigger);
}

// Template for gathering reminder
export const gatheringReminderTemplate = (userName: string, gatheringDate: string) => ({
  subject: '🙏 Your Gathering is Tomorrow - Friday 7PM at SCOAN',
  preview: 'Don\'t miss tomorrow\'s gathering...',
  body: `
Hello ${userName},

Your gathering is tomorrow at SCOAN Accra!

📅 Date: ${gatheringDate}
⏰ Time: 7:00 PM
📍 Location: Mango Farm, Abokobi - SCOAN Accra, Ghana

Come ready to:
- Hear live teaching from Brother Jimi
- Pray corporately with your cohort family
- Witness what Jesus does in deliverance and healing
- Connect with others on the restoration journey

What to bring: An open heart and your Bible (optional)

See you there!

In Christ,
Brother Jimi Restoration Community
  `.trim(),
});

// Template for stage progression
export const stageProgressionTemplate = (userName: string, stageName: string, description: string) => ({
  subject: `You've Progressed to ${stageName} in Your Restoration Journey`,
  preview: 'Welcome to your next stage...',
  body: `
Hello ${userName},

Congratulations! You've progressed to the **${stageName}** stage of your restoration journey.

This week's focus:
${description}

Your mentor is here to support you through this stage. Don't hesitate to reach out with questions or struggles.

Key scriptures for this week will be in your dashboard resources.

Keep going! You're on the path to freedom.

In Christ,
Brother Jimi Restoration Community
  `.trim(),
});

// Email send function stub (to be implemented with actual email service)
export async function sendEmail(to: string, subject: string, _body: string): Promise<void> {
  console.log(`[EMAIL] Would send to ${to}: ${subject}`);
  // TODO: Integrate with email provider (SendGrid, Resend, etc.)
  // For now, just log that it would be sent
}

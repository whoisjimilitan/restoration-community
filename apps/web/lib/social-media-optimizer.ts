export interface OptimizedOutput {
  content: string;
  hashtags: string[];
  callToAction: string;
  bestTimeToPost: string;
  platform: string;
  characterCount: number;
  viralityTips: string[];
}

export function optimizeForPlatform(
  content: string,
  platform: 'twitter' | 'instagram' | 'facebook' | 'tiktok' | 'email'
): OptimizedOutput {
  const baseHashtags = [
    '#Faith',
    '#Gospel',
    '#Jesus',
    '#Transformation',
    '#BrotherJimi',
  ];

  if (platform === 'twitter') {
    return optimizeTwitter(content, baseHashtags);
  } else if (platform === 'instagram') {
    return optimizeInstagram(content, baseHashtags);
  } else if (platform === 'facebook') {
    return optimizeFacebook(content, baseHashtags);
  } else if (platform === 'tiktok') {
    return optimizeTikTok(content, baseHashtags);
  } else if (platform === 'email') {
    return optimizeEmail(content);
  }

  return {
    content,
    hashtags: baseHashtags,
    callToAction: 'Share this message',
    bestTimeToPost: '09:00',
    platform,
    characterCount: content.length,
    viralityTips: [],
  };
}

function optimizeTwitter(content: string, baseHashtags: string[]): OptimizedOutput {
  const lines = content.split('\n').filter((l) => l.trim().length > 0);
  const tweets: string[] = [];
  let currentTweet = '';

  for (const line of lines) {
    if ((currentTweet + line).length < 260) {
      currentTweet += (currentTweet ? ' ' : '') + line;
    } else {
      if (currentTweet) tweets.push(currentTweet);
      currentTweet = line;
    }
  }
  if (currentTweet) tweets.push(currentTweet);

  const threadContent = tweets
    .map((t, i) => `[${i + 1}/${tweets.length}]\n${t}`)
    .join('\n\n');

  return {
    content: threadContent,
    hashtags: baseHashtags.slice(0, 3),
    callToAction: 'What resonates with you? Reply below.',
    bestTimeToPost: '09:00',
    platform: 'twitter',
    characterCount: threadContent.length,
    viralityTips: [
      'Break into 4-6 tweet threads',
      'Ask a question to drive replies',
      'Use line breaks for readability',
      'Include 1-2 personal experiences',
    ],
  };
}

function optimizeInstagram(content: string, baseHashtags: string[]): OptimizedOutput {
  const lines = content
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  const formatted = lines
    .map((line) => {
      if (line.startsWith('#')) return line;
      return line;
    })
    .join('\n\n');

  const instagramHashtags = [
    ...baseHashtags,
    '#SpiritualGrowth',
    '#Ministry',
    '#Encouragement',
  ];

  return {
    content: formatted,
    hashtags: instagramHashtags,
    callToAction: 'Save this. Share it. Let it transform someone.',
    bestTimeToPost: '19:00',
    platform: 'instagram',
    characterCount: formatted.length,
    viralityTips: [
      'Add 2-3 emojis sparingly (not every line)',
      'Use double line breaks between thoughts',
      'Close with strong CTA',
      'Hashtags: put 10-15 at end, separated',
      'Consider carousel post (5-7 images)',
    ],
  };
}

function optimizeFacebook(content: string, baseHashtags: string[]): OptimizedOutput {
  const conversational =
    content +
    '\n\n' +
    'What is God saying to you through this? Share your thoughts in the comments.';

  return {
    content: conversational,
    hashtags: baseHashtags,
    callToAction: 'Share your testimony in the comments',
    bestTimeToPost: '19:00',
    platform: 'facebook',
    characterCount: conversational.length,
    viralityTips: [
      'Write conversationally (like speaking to friends)',
      'Ask direct questions to spark discussion',
      'Break into small paragraphs',
      'Include 1 CTA asking for comments/shares',
    ],
  };
}

function optimizeTikTok(content: string, baseHashtags: string[]): OptimizedOutput {
  const lines = content
    .split('\n')
    .filter((l) => l.trim().length > 0)
    .slice(0, 8);

  const caption = lines.join('\n\n');
  const tiktokHashtags = [
    '#FaithTok',
    '#SpiritualGrowth',
    '#Gospel',
    '#Motivation',
    '#BrotherJimi',
  ];

  return {
    content: caption,
    hashtags: tiktokHashtags,
    callToAction: 'Follow for daily breakthroughs',
    bestTimeToPost: '18:00',
    platform: 'tiktok',
    characterCount: caption.length,
    viralityTips: [
      'Keep each line under 20 words',
      'First 3 seconds must hook attention',
      'Trending sounds boost reach',
      'Use captions (people scroll without audio)',
      'Encourage shares (duets, stitches)',
    ],
  };
}

function optimizeEmail(content: string): OptimizedOutput {
  return {
    content,
    hashtags: [],
    callToAction: 'Forward this to someone who needs to hear it.',
    bestTimeToPost: '07:00',
    platform: 'email',
    characterCount: content.length,
    viralityTips: [
      'Subject line: 50 characters max, action-oriented',
      'Open with personal connection',
      'Use short paragraphs (2-3 sentences max)',
      'Strong P.S. line (post-scriptum)',
      'One main CTA (not multiple)',
    ],
  };
}

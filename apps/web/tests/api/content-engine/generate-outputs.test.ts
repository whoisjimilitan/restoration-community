/**
 * @jest-environment node
 */
import { POST } from '@/app/api/content-engine/generate-outputs/route';
import type { VoiceTheme } from '@/lib/voice-extraction';

// Mock the dependencies
jest.mock('@/lib/prisma', () => ({
  prisma: {
    contentPlan: {
      create: jest.fn()
    }
  }
}));

jest.mock('@/lib/identity-extraction', () => ({
  extractIdentityChoice: jest.fn()
}));

jest.mock('@/lib/voice-extraction', () => ({
  extractVoiceTheme: jest.fn()
}));

jest.mock('@/lib/content-generation-v2', () => ({
  generateAllOutputsV2: jest.fn()
}));

import * as identityExtraction from '@/lib/identity-extraction';
import * as voiceExtraction from '@/lib/voice-extraction';
import * as contentGenV2 from '@/lib/content-generation-v2';
import { prisma } from '@/lib/prisma';

describe('POST /api/content-engine/generate-outputs (v2)', () => {
  const mockTheme = {
    revelation: 'Test revelation about identity and choice.',
    contrast: 'The lie we believe vs the truth we need.',
    callToIdentity: 'Who are you really?',
    examples: ['Example 1: A person transformed', 'Example 2: Another transformation'],
    scriptural: '1 John 3:1-2',
    coreMessage: 'This is who you are becoming.'
  };

  const mockIdentity = {
    choice: 1,
    label: 'The Chosen One'
  };

  const mockV2Output = {
    dailyLetter: 'Daily letter content here...',
    socialPost: 'Social post content here...',
    microInsight: 'Micro insight content here...',
    devotional: 'Devotional content here...',
    article: 'Article content here...',
    shortVideo: 'Short video script content here...',
    longVideo: 'Long video script content here...',
    podcastMoment: 'Podcast moment content here...',
    email: 'Email content here...',
    frame: 'counsel' as const,
    conversationalEntry: 'Here is what I am seeing in this moment.',
    voiceValidation: {
      isValid: true,
      warnings: [],
      confidence: 0.95
    }
  };

  const mockContentPlan = {
    id: 'test-id-123',
    identityChoice: 1,
    identityLabel: 'The Chosen One',
    sourceType: 'scripture',
    sourceTitle: 'Test Source',
    sourceUrl: 'https://example.com',
    sourceExcerpt: 'Test excerpt...',
    revelation: 'Test revelation',
    userId: 'user-123',
    status: 'draft',
    frame: 'counsel',
    conversationalEntry: 'Here is what I am seeing in this moment.',
    outputs: [
      { format: 'daily-letter', content: 'content', title: 'Title' },
      { format: 'social-post', content: 'content', title: 'Title' },
      { format: 'micro-insight', content: 'content', title: 'Title' },
      { format: 'devotional', content: 'content', title: 'Title' },
      { format: 'article', content: 'content', title: 'Title' },
      { format: 'short-video-script', content: 'content', title: 'Title' },
      { format: 'long-video-script', content: 'content', title: 'Title' },
      { format: 'podcast-moment', content: 'content', title: 'Title' },
      { format: 'email', content: 'content', title: 'Title' }
    ]
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (identityExtraction.extractIdentityChoice as jest.Mock).mockReturnValue(mockIdentity);
    (voiceExtraction.extractVoiceTheme as jest.Mock).mockReturnValue(mockTheme);
    (contentGenV2.generateAllOutputsV2 as jest.Mock).mockReturnValue(mockV2Output);
    (prisma.contentPlan.create as jest.Mock).mockResolvedValue(mockContentPlan);
  });

  it('returns v2 outputs with frame and conversational entry', async () => {
    const req = new Request('http://localhost:3000/api/content-engine/generate-outputs', {
      method: 'POST',
      body: JSON.stringify({
        text: 'Test text content here.',
        sourceType: 'scripture',
        sourceTitle: 'Test Source',
        userId: 'user-123'
      })
    });

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.data).toBeDefined();
    expect(data.data.frame).toBe('counsel');
    expect(['counsel', 'advise', 'uplift', 'enlighten', 'educate']).toContain(data.data.frame);
    expect(data.data.conversationalEntry).toBe('Here is what I am seeing in this moment.');
    expect(data.data.voiceValidation).toBeDefined();
  });

  it('includes all 9 formats in outputs', async () => {
    const req = new Request('http://localhost:3000/api/content-engine/generate-outputs', {
      method: 'POST',
      body: JSON.stringify({
        text: 'Test text content here.',
        sourceType: 'scripture',
        sourceTitle: 'Test Source',
        userId: 'user-123'
      })
    });

    const res = await POST(req);
    const data = await res.json();

    expect(data.data.outputs.dailyLetter).toBeDefined();
    expect(data.data.outputs.socialPost).toBeDefined();
    expect(data.data.outputs.microInsight).toBeDefined();
    expect(data.data.outputs.devotional).toBeDefined();
    expect(data.data.outputs.article).toBeDefined();
    expect(data.data.outputs.shortVideo).toBeDefined();
    expect(data.data.outputs.longVideo).toBeDefined();
    expect(data.data.outputs.podcastMoment).toBeDefined();
    expect(data.data.outputs.email).toBeDefined();
  });

  it('includes voice validation results', async () => {
    const req = new Request('http://localhost:3000/api/content-engine/generate-outputs', {
      method: 'POST',
      body: JSON.stringify({
        text: 'Test text content here.',
        sourceType: 'scripture',
        sourceTitle: 'Test Source',
        userId: 'user-123'
      })
    });

    const res = await POST(req);
    const data = await res.json();

    expect(data.data.voiceValidation.isValid).toBeDefined();
    expect(typeof data.data.voiceValidation.isValid).toBe('boolean');
    expect(Array.isArray(data.data.voiceValidation.warnings)).toBe(true);
    expect(data.data.voiceValidation.confidence).toBeGreaterThanOrEqual(0);
    expect(data.data.voiceValidation.confidence).toBeLessThanOrEqual(1);
  });

  it('returns 400 for missing text field', async () => {
    const req = new Request('http://localhost:3000/api/content-engine/generate-outputs', {
      method: 'POST',
      body: JSON.stringify({
        sourceType: 'scripture',
        sourceTitle: 'Test Source',
        userId: 'user-123'
        // Missing text field
      })
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it('returns 400 for missing sourceType field', async () => {
    const req = new Request('http://localhost:3000/api/content-engine/generate-outputs', {
      method: 'POST',
      body: JSON.stringify({
        text: 'Test text',
        sourceTitle: 'Test Source',
        userId: 'user-123'
        // Missing sourceType
      })
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it('returns 400 for missing sourceTitle field', async () => {
    const req = new Request('http://localhost:3000/api/content-engine/generate-outputs', {
      method: 'POST',
      body: JSON.stringify({
        text: 'Test text',
        sourceType: 'scripture',
        userId: 'user-123'
        // Missing sourceTitle
      })
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it('returns 400 for missing userId field', async () => {
    const req = new Request('http://localhost:3000/api/content-engine/generate-outputs', {
      method: 'POST',
      body: JSON.stringify({
        text: 'Test text',
        sourceType: 'scripture',
        sourceTitle: 'Test Source'
        // Missing userId
      })
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it('persists content to database', async () => {
    const req = new Request('http://localhost:3000/api/content-engine/generate-outputs', {
      method: 'POST',
      body: JSON.stringify({
        text: 'Test text content here.',
        sourceType: 'scripture',
        sourceTitle: 'Test Source',
        userId: 'user-123'
      })
    });

    const res = await POST(req);
    const data = await res.json();

    // Verify database persistence
    expect(data.contentPlan).toBeDefined();
    expect(data.contentPlan.id).toBe('test-id-123');
    expect(data.contentPlan.outputs.length).toBe(9);
  });

  it('uses v2 pipeline with contentIndex parameter', async () => {
    const req = new Request('http://localhost:3000/api/content-engine/generate-outputs', {
      method: 'POST',
      body: JSON.stringify({
        text: 'Test text content here.',
        sourceType: 'scripture',
        sourceTitle: 'Test Source',
        userId: 'user-123',
        contentIndex: 2
      })
    });

    await POST(req);

    // Verify v2 pipeline was called with correct parameters
    expect(contentGenV2.generateAllOutputsV2).toHaveBeenCalledWith(
      expect.objectContaining({
        theme: mockTheme,
        identityChoice: mockIdentity.choice,
        contentIndex: 2
      })
    );
  });

  it('defaults contentIndex to 0 when not provided', async () => {
    const req = new Request('http://localhost:3000/api/content-engine/generate-outputs', {
      method: 'POST',
      body: JSON.stringify({
        text: 'Test text content here.',
        sourceType: 'scripture',
        sourceTitle: 'Test Source',
        userId: 'user-123'
        // No contentIndex provided
      })
    });

    await POST(req);

    // Verify v2 pipeline was called with contentIndex defaulting to 0
    expect(contentGenV2.generateAllOutputsV2).toHaveBeenCalledWith(
      expect.objectContaining({
        contentIndex: 0
      })
    );
  });

  it('persists frame and conversationalEntry to database', async () => {
    const req = new Request('http://localhost:3000/api/content-engine/generate-outputs', {
      method: 'POST',
      body: JSON.stringify({
        text: 'Test text content here.',
        sourceType: 'scripture',
        sourceTitle: 'Test Source',
        userId: 'user-123'
      })
    });

    await POST(req);

    // Verify frame and conversationalEntry were passed to database
    expect(prisma.contentPlan.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          frame: 'counsel',
          conversationalEntry: 'Here is what I am seeing in this moment.'
        })
      })
    );
  });

  it('handles database errors gracefully', async () => {
    (prisma.contentPlan.create as jest.Mock).mockRejectedValue(
      new Error('Database connection failed')
    );

    const req = new Request('http://localhost:3000/api/content-engine/generate-outputs', {
      method: 'POST',
      body: JSON.stringify({
        text: 'Test text content here.',
        sourceType: 'scripture',
        sourceTitle: 'Test Source',
        userId: 'user-123'
      })
    });

    const res = await POST(req);
    expect(res.status).toBe(500);

    const data = await res.json();
    expect(data.error).toBeDefined();
  });
});

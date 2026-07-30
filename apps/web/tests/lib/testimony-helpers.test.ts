import {
  getStageLabel,
  formatTestimony,
  groupTestimoniesByStage,
  sortTestimoniesByStage,
  sortTestimoniesByDate,
  filterTestimoniesByStage,
  getRecentTestimonies,
  TestimonyWithImages,
} from '@/lib/testimony-helpers';

const mockTestimony = (overrides?: Partial<TestimonyWithImages>): TestimonyWithImages => ({
  id: 'test-1',
  name: 'John Doe',
  role: 'Former Scammer',
  stage: 6,
  quote: 'Jesus changed my life',
  story: 'My story of transformation...',
  heroImage: null,
  proofImages: [],
  createdAt: new Date('2026-07-01'),
  updatedAt: new Date('2026-07-01'),
  heroImageId: null,
  ...overrides,
});

describe('testimony-helpers', () => {
  describe('getStageLabel', () => {
    it('returns correct stage names', () => {
      expect(getStageLabel(1)).toBe('Truth');
      expect(getStageLabel(6)).toBe('Honest Work');
      expect(getStageLabel(7)).toBe('Service');
    });

    it('returns fallback for unknown stages', () => {
      expect(getStageLabel(99)).toBe('Stage 99');
    });
  });

  describe('formatTestimony', () => {
    it('formats testimony correctly', () => {
      const testimony = mockTestimony({ stage: 6 });
      const formatted = formatTestimony(testimony);

      expect(formatted.id).toBe('test-1');
      expect(formatted.name).toBe('John Doe');
      expect(formatted.stageName).toBe('Honest Work');
      expect(formatted.quote).toBe('Jesus changed my life');
    });

    it('includes hero image when present', () => {
      const testimony = mockTestimony({
        heroImage: {
          id: 'img-1',
          url: 'https://example.com/hero.jpg',
          alt: 'John',
          type: 'hero',
          heroImageId: null,
          heroTestimony: null,
          proofTestimonies: [],
          createdAt: new Date(),
        },
      });
      const formatted = formatTestimony(testimony);
      expect(formatted.heroImage?.url).toBe('https://example.com/hero.jpg');
    });

    it('includes proof images', () => {
      const testimony = mockTestimony({
        proofImages: [
          {
            id: 'img-2',
            url: 'https://example.com/proof.jpg',
            alt: 'Proof',
            type: 'proof',
            heroImageId: null,
            heroTestimony: null,
            proofTestimonies: [],
            createdAt: new Date(),
          },
        ],
      });
      const formatted = formatTestimony(testimony);
      expect(formatted.proofImages).toHaveLength(1);
      expect(formatted.proofImages[0].url).toBe('https://example.com/proof.jpg');
    });
  });

  describe('groupTestimoniesByStage', () => {
    it('groups testimonies by stage', () => {
      const testimonies = [
        mockTestimony({ stage: 6 }),
        mockTestimony({ id: 'test-2', stage: 7 }),
        mockTestimony({ id: 'test-3', stage: 6 }),
      ];
      const grouped = groupTestimoniesByStage(testimonies);

      expect(grouped[6]).toHaveLength(2);
      expect(grouped[7]).toHaveLength(1);
    });
  });

  describe('sortTestimoniesByStage', () => {
    it('sorts testimonies by stage ascending', () => {
      const testimonies = [
        mockTestimony({ stage: 7 }),
        mockTestimony({ id: 'test-2', stage: 5 }),
        mockTestimony({ id: 'test-3', stage: 6 }),
      ];
      const sorted = sortTestimoniesByStage(testimonies);

      expect(sorted[0].stage).toBe(5);
      expect(sorted[1].stage).toBe(6);
      expect(sorted[2].stage).toBe(7);
    });
  });

  describe('sortTestimoniesByDate', () => {
    it('sorts testimonies by date descending by default', () => {
      const older = new Date('2026-07-01');
      const newer = new Date('2026-07-15');

      const testimonies = [
        mockTestimony({ createdAt: older }),
        mockTestimony({ id: 'test-2', createdAt: newer }),
      ];
      const sorted = sortTestimoniesByDate(testimonies);

      expect(sorted[0].createdAt.getTime()).toBeGreaterThan(
        sorted[1].createdAt.getTime()
      );
    });

    it('sorts ascending when descending=false', () => {
      const older = new Date('2026-07-01');
      const newer = new Date('2026-07-15');

      const testimonies = [
        mockTestimony({ createdAt: newer }),
        mockTestimony({ id: 'test-2', createdAt: older }),
      ];
      const sorted = sortTestimoniesByDate(testimonies, false);

      expect(sorted[0].createdAt.getTime()).toBeLessThan(
        sorted[1].createdAt.getTime()
      );
    });
  });

  describe('filterTestimoniesByStage', () => {
    it('filters testimonies by stage', () => {
      const testimonies = [
        mockTestimony({ stage: 6 }),
        mockTestimony({ id: 'test-2', stage: 7 }),
        mockTestimony({ id: 'test-3', stage: 6 }),
      ];
      const filtered = filterTestimoniesByStage(testimonies, 6);

      expect(filtered).toHaveLength(2);
      expect(filtered.every((t) => t.stage === 6)).toBe(true);
    });
  });

  describe('getRecentTestimonies', () => {
    it('returns most recent testimonies', () => {
      const testimonies = [
        mockTestimony({ createdAt: new Date('2026-07-01') }),
        mockTestimony({ id: 'test-2', createdAt: new Date('2026-07-15') }),
        mockTestimony({ id: 'test-3', createdAt: new Date('2026-07-10') }),
      ];
      const recent = getRecentTestimonies(testimonies, 2);

      expect(recent).toHaveLength(2);
      expect(recent[0].id).toBe('test-2'); // Most recent
    });

    it('respects limit parameter', () => {
      const testimonies = Array.from({ length: 10 }, (_, i) =>
        mockTestimony({ id: `test-${i}` })
      );
      const recent = getRecentTestimonies(testimonies, 3);

      expect(recent).toHaveLength(3);
    });
  });
});

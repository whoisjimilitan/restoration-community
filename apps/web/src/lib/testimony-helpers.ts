import { Testimony, TestimonyImage } from '@prisma/client';

export interface TestimonyWithImages extends Testimony {
  heroImage?: TestimonyImage | null;
  proofImages: TestimonyImage[];
}

export interface FormattedTestimony {
  id: string;
  name: string;
  role: string;
  stage: number;
  stageName: string;
  quote: string;
  story: string;
  heroImage?: {
    url: string;
    alt: string;
  } | null;
  proofImages: Array<{
    url: string;
    alt: string;
  }>;
  createdAt: string;
}

const stageLookup: Record<number, string> = {
  1: 'Truth',
  2: 'Confession',
  3: 'Repentance',
  4: 'Forgiveness',
  5: 'Reconciliation',
  6: 'Honest Work',
  7: 'Service',
};

export function getStageLabel(stageNumber: number): string {
  return stageLookup[stageNumber] || `Stage ${stageNumber}`;
}

export function formatTestimony(testimony: TestimonyWithImages): FormattedTestimony {
  return {
    id: testimony.id,
    name: testimony.name,
    role: testimony.role,
    stage: testimony.stage,
    stageName: getStageLabel(testimony.stage),
    quote: testimony.quote,
    story: testimony.story,
    heroImage: testimony.heroImage
      ? {
          url: testimony.heroImage.url,
          alt: testimony.heroImage.alt,
        }
      : null,
    proofImages: testimony.proofImages.map((img) => ({
      url: img.url,
      alt: img.alt,
    })),
    createdAt: testimony.createdAt.toISOString(),
  };
}

export function groupTestimoniesByStage(
  testimonies: TestimonyWithImages[]
): Record<number, FormattedTestimony[]> {
  const grouped: Record<number, FormattedTestimony[]> = {};

  testimonies.forEach((testimony) => {
    const stageNum = testimony.stage;
    if (!grouped[stageNum]) {
      grouped[stageNum] = [];
    }
    grouped[stageNum].push(formatTestimony(testimony));
  });

  return grouped;
}

export function sortTestimoniesByStage(
  testimonies: TestimonyWithImages[]
): TestimonyWithImages[] {
  return [...testimonies].sort((a, b) => a.stage - b.stage);
}

export function sortTestimoniesByDate(
  testimonies: TestimonyWithImages[],
  descending = true
): TestimonyWithImages[] {
  return [...testimonies].sort((a, b) => {
    const diff = new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    return descending ? diff : -diff;
  });
}

export function filterTestimoniesByStage(
  testimonies: TestimonyWithImages[],
  stage: number
): TestimonyWithImages[] {
  return testimonies.filter((t) => t.stage === stage);
}

export function getRecentTestimonies(
  testimonies: TestimonyWithImages[],
  limit = 5
): TestimonyWithImages[] {
  return sortTestimoniesByDate(testimonies).slice(0, limit);
}

export interface FormattedTestimony {
  id: string;
  name: string;
  role: string;
  stage: number;
  quote: string;
  story: string;
  heroImage?: string;
  proofImages?: string[];
}

export function formatTestimonyData(data: any): FormattedTestimony {
  return {
    id: data.id || '',
    name: data.name || '',
    role: data.role || '',
    stage: data.stage || 0,
    quote: data.quote || '',
    story: data.story || '',
    heroImage: data.heroImage,
    proofImages: data.proofImages,
  };
}

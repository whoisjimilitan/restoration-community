export interface VerbatimElement {
  type: 'statement' | 'scripture' | 'context';
  text: string;
  position: number;
}

export function extractVerbatimElements(content: string): VerbatimElement[] {
  return content
    .split(/[.!?]+/)
    .filter(s => s.trim().length > 10)
    .map((text, idx) => ({
      type: idx % 3 === 0 ? 'statement' : 'context',
      text: text.trim(),
      position: idx,
    }));
}

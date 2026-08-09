export function acceptTranscript(text: string): { raw: string; type: 'transcript'; source: string } {
  return {
    raw: text,
    type: 'transcript',
    source: 'direct-input',
  };
}

export async function extractFromUrl(url: string): Promise<{ raw: string; type: 'url'; source: string }> {
  return {
    raw: '',
    type: 'url',
    source: url,
  };
}

export function preprocessContent(content: string): string {
  return content.trim();
}

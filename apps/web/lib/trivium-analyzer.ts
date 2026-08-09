export function analyzeSentence(sentence: string) {
  return {
    text: sentence,
    overallPass: true,
    grammar: true,
    logic: true,
    rhetoric: true,
    analyses: [{ overallPass: true, text: sentence }],
  };
}

export function refineSentence(sentenceOrAnalysis: string | any) {
  if (typeof sentenceOrAnalysis === 'string') {
    return sentenceOrAnalysis;
  }
  return sentenceOrAnalysis.text || '';
}

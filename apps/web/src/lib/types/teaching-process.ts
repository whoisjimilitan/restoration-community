export interface VerbatimElement {
  id?: string;
  type: 'statement' | 'scripture' | 'keyPhrase';
  text: string;
  strength: 'high' | 'medium' | 'low';
  locked: boolean;
  lineNumber?: number;
  hookType?: 'question' | 'scenario' | 'quote' | 'story' | 'contradiction' | null;
  hookPriority?: number;
}

export interface SentenceAnalysis {
  sentence: string;
  type: string;
  length: number;
  hasSpiritual: boolean;
  assumptions: string[];
  implications: string[];
  emotionalTone: string;
}

export interface TriviumAnalysis {
  grammar: {
    structure: string;
    devices: string[];
  };
  logic: {
    isValid: boolean;
    reasoning: string;
    fallacies: string[];
  };
  rhetoric: {
    devices: string[];
    persuasiveApproach: string;
  };
  hiddenTruths: string[];
}

export interface ValidationResult {
  overallResult: 'PASS' | 'FAIL' | 'NEEDS_REVISION';
  validity: {
    isLogicallySound: boolean;
    issues: string[];
  };
  premises: {
    checks: Array<{ premise: string; assessment: string }>;
    failures: string[];
  };
  scripture: {
    supportingVerses: string[];
    contradictions: string[];
  };
  summary: string;
}

export interface VideoRecommendation {
  hasNaturalQuestion: boolean;
  suggestedOpeningQuestion?: string;
  optionalStructure?: {
    act1Question: string;
    act2Points: string[];
    act3Benediction: string;
  };
  note: string;
}

export interface DeepReasoning {
  sentenceAnalyses: SentenceAnalysis[];
  triviumAnalysis: TriviumAnalysis;
  validation: ValidationResult;
  holisticInsight: string;
  readinessForGeneration: {
    ready: boolean;
    blockers: string[];
    strengths: string[];
  };
  videoRecommendation?: VideoRecommendation;
}

export interface TeachingProcessOutput {
  article: string;
  email: string;
  facebook: string;
  twitter: string;
  instagram: string;
  podcast: string;
  video: string;
}

export interface TeachingProcess {
  id: string;
  createdAt: Date;
  sermonTitle: string;
  transcript: string;
  verbatimElements: VerbatimElement[];
  reasoning: DeepReasoning;
  outputs: TeachingProcessOutput;
  viralityScores: Record<string, number>;
  status: 'processing' | 'complete' | 'error';
  errorMessage?: string;
}

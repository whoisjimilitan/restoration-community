import { buildNarrativeStructure } from './voice-patterns';

export interface ExpansionInput {
  statement: string;
  context?: string;
}

export interface ExpandedResult {
  narrative: string;
}

/**
 * Expands a raw statement into a conversational narrative
 * using voice patterns that match Brother Jimi's authentic style
 */
export async function expandStatement(input: ExpansionInput): Promise<ExpandedResult> {
  const { statement, context } = input;

  console.log('[EXPANSION] Expanding statement:', statement.substring(0, 50) + '...');

  try {
    const narrative = buildNarrativeStructure(statement, context);

    console.log('[EXPANSION] Statement expanded successfully');

    return { narrative };
  } catch (error) {
    console.error('[EXPANSION] Error expanding statement:', error);
    throw error;
  }
}

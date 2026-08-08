export interface ExpansionInput {
  statement: string;
  context?: string;
}

export interface ExpandedResult {
  narrative: string;
}

/**
 * Stub - narrative expansion disabled in favor of direct Stage 3 generation
 */
export async function expandStatement(input: ExpansionInput): Promise<ExpandedResult> {
  const { statement } = input;
  return { narrative: statement };
}

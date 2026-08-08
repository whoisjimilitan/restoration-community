import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  console.log('[SAVE-RESULTS] Saving engine output to repo...');

  try {
    const data = await request.json();

    // Create results directory in restoration community repo
    const resultsDir = path.join(process.cwd(), 'public', 'engine-results');
    if (!fs.existsSync(resultsDir)) {
      fs.mkdirSync(resultsDir, { recursive: true });
    }

    // Generate timestamp for filename
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0];
    const filename = `engine-results-${timestamp}.json`;
    const filePath = path.join(resultsDir, filename);

    // Save full JSON output
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    console.log(`[SAVE-RESULTS] Saved to: ${filePath}`);

    return NextResponse.json({
      success: true,
      savedTo: `/engine-results/${filename}`,
      timestamp,
    });
  } catch (error) {
    console.error('[SAVE-RESULTS] Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to save results' },
      { status: 500 }
    );
  }
}

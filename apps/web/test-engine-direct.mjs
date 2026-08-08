import { expandStatement } from './src/lib/narrative-expansion.js';
import { identifyElements } from './src/lib/element-identifier.js';
import { applyFrame } from './src/lib/frame-applier.js';
import { generateAllFormats } from './src/lib/format-generators.js';

const STATEMENT = "A contented life is not about having everything you want. It's about being at peace with what you have and trusting God's provision. Contentment is a spiritual choice, not a circumstance.";

console.log('=== CONTENT ENGINE TEST ===\n');
console.log('Input Statement:');
console.log(STATEMENT);
console.log('\n' + '='.repeat(60) + '\n');

try {
  // Step 1: Expand statement
  console.log('Step 1: Expanding statement into narrative...');
  const { narrative } = await expandStatement({ 
    statement: STATEMENT, 
    context: 'Episode: A Contented Life' 
  });
  
  console.log('\n✓ Narrative Generated:');
  console.log(narrative);
  console.log('\n' + '='.repeat(60) + '\n');

  // Step 2: Identify elements
  console.log('Step 2: Identifying key elements...');
  const elements = identifyElements(narrative);
  
  console.log('\n✓ Elements Identified:');
  console.log('  Revelation:', elements.revelation);
  console.log('  Contrast:', elements.contrast);
  console.log('  Core Message:', elements.coreMessage);
  console.log('  Identity Choice:', elements.identityChoice);
  console.log('  Call to Action:', elements.callToAction);
  console.log('\n' + '='.repeat(60) + '\n');

  // Step 3: Apply frame
  console.log('Step 3: Applying frame (enlighten)...');
  const { framedNarrative } = applyFrame({
    narrative,
    frame: 'enlighten',
    elements,
  });
  
  console.log('\n✓ Framed Narrative:');
  console.log(framedNarrative);
  console.log('\n' + '='.repeat(60) + '\n');

  // Step 4: Generate all 9 formats
  console.log('Step 4: Generating 9 content formats...');
  const formats = generateAllFormats({
    narrative: framedNarrative,
    elements,
    frame: 'enlighten',
  });

  console.log('\n✓ All formats generated:\n');
  
  Object.entries(formats).forEach(([format, content]) => {
    console.log(`\n--- ${format.toUpperCase()} ---`);
    console.log(content);
    console.log('');
  });

} catch (error) {
  console.error('Error:', error.message);
  console.error(error.stack);
}

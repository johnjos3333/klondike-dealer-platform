/**
 * Phase 76.1A — Node smoke tests for SALES_ENABLEMENT_FLAGSHIP_NARRATIVES (via validation tooling only).
 * Does not import flagshipNarratives.js directly.
 * Run: npm run test:flagship-narratives
 */

import { validateFlagshipNarrativesOnly } from "./validateSalesEnablementKnowledge.js";

const { ok, errors, warnings } = validateFlagshipNarrativesOnly();

console.log("\nSALES_ENABLEMENT_FLAGSHIP_NARRATIVES smoke tests\n" + "=".repeat(56));
console.log(ok ? "PASS  structure and content rules" : "FAIL  validation errors present");
if (warnings.length) {
  console.log("\nWarnings:");
  for (const w of warnings) console.log(`  - ${w}`);
} else {
  console.log("\nWarnings: (none)");
}
if (errors.length) {
  console.log("\nErrors:");
  for (const e of errors) console.log(`  - ${e}`);
}
console.log("=".repeat(56) + "\n");

if (!ok) {
  throw new Error(
    `Flagship narrative smoke tests failed (${errors.length} error(s)): ${errors.join(" | ")}`
  );
}

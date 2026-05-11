/**
 * Phase 73.7 — Development-only runner: prints validation result; throws if errors exist.
 * Run: npm run validate:sales-enablement
 */

import { validateSalesEnablementKnowledge } from "./validateSalesEnablementKnowledge.js";

const { ok, errors, warnings } = validateSalesEnablementKnowledge();

console.log(ok ? "OK" : "FAILED");

console.log("errors:");
if (errors.length === 0) {
  console.log("  (none)");
} else {
  for (const e of errors) console.log(`  - ${e}`);
}

console.log("warnings:");
if (warnings.length === 0) {
  console.log("  (none)");
} else {
  for (const w of warnings) console.log(`  - ${w}`);
}

if (!ok) {
  throw new Error(
    `Sales Enablement knowledge validation failed (${errors.length} error(s))`
  );
}

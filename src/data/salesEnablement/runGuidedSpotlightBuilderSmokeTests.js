/**
 * Phase 77.0 — Smoke tests for deterministic Guided Spotlight Builder recommendations.
 * Run: npm run test:guided-spotlight-builder
 */

import { getGuidedSpotlightBuilderRecommendation } from "./guidedSpotlightBuilderRecommendations.js";

const cases = [
  ["Nano EP 2", "product", "ps-grease-ep2"],
  ["mining grease", "product", "ps-grease-ep2"],
  ["wet brake chatter", "product", "ps-agrimax-zf"],
  ["cold weather hydraulics", "product", "ps-klondike-aw-synthetic-hydraulic"],
  ["hydraulic reliability", "category", "cs-hydraulic-opportunity"],
  ["construction earthmoving", "customer_profile", "construction"],
];

let failed = 0;
for (const [query, kind, expectId] of cases) {
  const r = getGuidedSpotlightBuilderRecommendation({ query, messageKind: kind });
  const id = r.match?.spotlightId || "";
  if (!r.match || id !== expectId) {
    console.error(`FAIL  "${query}" (${kind}) → got ${id || "null"}, expected ${expectId}`);
    failed += 1;
  }
}

const empty = getGuidedSpotlightBuilderRecommendation({ query: "   ", messageKind: "product" });
if (empty.match != null) {
  console.error("FAIL  empty query should return null");
  failed += 1;
}

console.log("\nGuided Spotlight Builder smoke tests\n" + "=".repeat(48));
console.log(failed === 0 ? `PASS  ${cases.length + 1} checks` : `FAIL  ${failed} check(s)`);
if (failed) process.exit(1);

/**
 * Smoke test: canonical fact loading for AI Sales Copy Generator (no OpenAI call).
 * Run: node src/server/aiSalesCopyGenerator/runSmokeTest.js
 */

import { generateAiSalesCopy } from "./generateAiSalesCopy.js";
import { loadCanonicalFactsForSalesCopy } from "./loadCanonicalFacts.js";

const NANO_GREASE_ID = "grease-canonical-nano-calcium-sulfonate-ep";

function assert(cond, msg) {
  if (!cond) throw new Error(msg || "assertion failed");
}

async function main() {
  const facts = loadCanonicalFactsForSalesCopy({
    productId: NANO_GREASE_ID,
    packageType: "product_spotlight",
    audience: "rep",
    context: "mining fleet maintenance",
  });

  assert(facts.ok, `facts load failed: ${facts.error}`);
  assert(facts.approvedFacts?.productName, "expected productName");
  assert(facts.approvedFacts.specsApprovalsRegistrations?.length > 0, "expected specs");
  assert(facts.approvedFacts.cautions?.length > 0, "expected cautions");

  const dryRun = await generateAiSalesCopy(
    { productId: NANO_GREASE_ID, packageType: "product_spotlight" },
    { skipOpenAi: true }
  );
  assert(dryRun.ok && dryRun.copy === null, "dry run should skip OpenAI");

  const missing = await generateAiSalesCopy({ productId: "not-a-real-id" });
  assert(!missing.ok && missing.error === "product_not_found", "expected product_not_found");

  console.log("aiSalesCopyGenerator smoke tests passed");
  console.log(`  product: ${facts.approvedFacts.productName}`);
  console.log(`  specs: ${facts.approvedFacts.specsApprovalsRegistrations.length}`);
  console.log(`  cautions: ${facts.approvedFacts.cautions.length}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

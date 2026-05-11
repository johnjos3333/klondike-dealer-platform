/**
 * Phase 73.11 — Node smoke tests for composeSalesEnablementSpotlight (starter overlay/profile pairs).
 * Run: npm run test:sales-enablement-composer
 */

import { composeSalesEnablementSpotlight } from "./composeSalesEnablementSpotlight.js";

const CASES = [
  { name: "Nano EP 2 Grease + mining_aggregate", overlayId: "overlay-nano-ep2-grease", customerProfileId: "mining_aggregate" },
  { name: "AW Hydraulic Fluids + construction", overlayId: "overlay-aw-hydraulic-fluids", customerProfileId: "construction" },
  { name: "Full Synthetic 15W-40 + trucking_fleet", overlayId: "overlay-full-synthetic-15w40-hd", customerProfileId: "trucking_fleet" },
  { name: "Universal Tractor Fluid + agriculture", overlayId: "overlay-universal-tractor-fluid", customerProfileId: "agriculture" },
  { name: "HD Full Synthetic ATF + municipal_fleet", overlayId: "overlay-hd-full-synthetic-atf", customerProfileId: "municipal_fleet" },
];

/** @param {unknown} s */
function nonEmpty(s) {
  return typeof s === "string" && s.trim().length > 0;
}

/**
 * @param {{ ok: boolean, errors: string[], spotlight: Record<string, unknown> }} result
 * @returns {string[]}
 */
function verify(result) {
  const failures = [];
  const { ok, errors, spotlight } = result;
  const sp = spotlight && typeof spotlight === "object" ? spotlight : {};

  if (ok !== true) {
    failures.push(`ok !== true (got ${JSON.stringify(ok)}); errors: ${(errors || []).join("; ") || "(none)"}`);
  }
  if (!nonEmpty(sp.productName)) failures.push("productName missing or empty");
  if (!nonEmpty(sp.categoryTitle)) failures.push("categoryTitle missing or empty");
  if (!nonEmpty(sp.customerProfileTitle)) failures.push("customerProfileTitle missing or empty");
  if (!nonEmpty(sp.lfbbBlockId)) failures.push("lfbbBlockId missing or empty");

  const lfbb = sp.lfbb && typeof sp.lfbb === "object" ? sp.lfbb : {};
  if (!nonEmpty(lfbb.link)) failures.push("lfbb.link missing or empty");
  if (!nonEmpty(lfbb.feature)) failures.push("lfbb.feature missing or empty");
  if (!nonEmpty(lfbb.bridge)) failures.push("lfbb.bridge missing or empty");
  if (!nonEmpty(lfbb.benefit)) failures.push("lfbb.benefit missing or empty");

  const pts = sp.technicalProofPoints;
  if (!Array.isArray(pts) || pts.length < 1) {
    failures.push("technicalProofPoints missing or empty (need at least one)");
  } else if (!pts.some((p) => nonEmpty(p))) {
    failures.push("technicalProofPoints has no non-empty strings");
  }

  if (!nonEmpty(sp.suggestedCta)) failures.push("suggestedCta missing or empty");

  return failures;
}

/** @type {{ name: string, failures: string[] }[]} */
const results = [];

for (const c of CASES) {
  const out = composeSalesEnablementSpotlight({
    overlayId: c.overlayId,
    customerProfileId: c.customerProfileId,
  });
  const failures = verify(out);
  results.push({ name: c.name, failures });
}

let passCount = 0;
let failCount = 0;

console.log("\nSales Enablement composer smoke tests\n" + "=".repeat(56));

for (const r of results) {
  if (r.failures.length === 0) {
    passCount += 1;
    console.log(`PASS  ${r.name}`);
  } else {
    failCount += 1;
    console.log(`FAIL  ${r.name}`);
    for (const f of r.failures) console.log(`      - ${f}`);
  }
}

console.log("=".repeat(56));
console.log(`Summary: ${passCount} passed, ${failCount} failed (of ${CASES.length})\n`);

if (failCount > 0) {
  const detail = results
    .filter((r) => r.failures.length)
    .map((r) => `${r.name}: ${r.failures.join(" | ")}`)
    .join("\n");
  throw new Error(`Sales Enablement composer smoke tests failed:\n${detail}`);
}

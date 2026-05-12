/**
 * Phase 73.15 — Node smoke tests for composeSalesEnablementCategorySpotlight.
 * Run: npm run test:sales-enablement-category-composer
 */

import { composeSalesEnablementCategorySpotlight } from "./composeSalesEnablementCategorySpotlight.js";

const CASES = [
  {
    name: "Severe-Duty Grease Program + mining_aggregate",
    overlayId: "cat-overlay-severe-duty-grease-program",
    customerProfileId: "mining_aggregate",
  },
  {
    name: "Hydraulic Reliability Program + construction",
    overlayId: "cat-overlay-hydraulic-reliability-program",
    customerProfileId: "construction",
  },
  {
    name: "Heavy-Duty Engine Oil Program + trucking_fleet",
    overlayId: "cat-overlay-hd-engine-oil-program",
    customerProfileId: "trucking_fleet",
  },
  {
    name: "Synthetic Conversion Program + municipal_fleet",
    overlayId: "cat-overlay-synthetic-conversion-program",
    customerProfileId: "municipal_fleet",
  },
  {
    name: "Mixed Fleet / Tractor Fluids Program + agriculture",
    overlayId: "cat-overlay-mixed-fleet-tractor-fluids-program",
    customerProfileId: "agriculture",
  },
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
  if (!nonEmpty(sp.title)) failures.push("title missing or empty");
  if (!nonEmpty(sp.categoryTitle)) failures.push("categoryTitle missing or empty");
  if (!nonEmpty(sp.customerProfileTitle)) failures.push("customerProfileTitle missing or empty");
  if (!nonEmpty(sp.lfbbBlockId)) failures.push("lfbbBlockId missing or empty");

  const lfbb = sp.lfbb && typeof sp.lfbb === "object" ? sp.lfbb : {};
  if (!nonEmpty(lfbb.link)) failures.push("lfbb.link missing or empty");
  if (!nonEmpty(lfbb.feature)) failures.push("lfbb.feature missing or empty");
  if (!nonEmpty(lfbb.bridge)) failures.push("lfbb.bridge missing or empty");
  if (!nonEmpty(lfbb.benefit)) failures.push("lfbb.benefit missing or empty");

  const plf = sp.productLineFocus;
  if (!Array.isArray(plf) || plf.length < 1) {
    failures.push("productLineFocus missing or empty (need at least one)");
  } else if (!plf.some((p) => nonEmpty(p))) {
    failures.push("productLineFocus has no non-empty strings");
  }

  const pts = sp.technicalProofPoints;
  if (!Array.isArray(pts) || pts.length < 1) {
    failures.push("technicalProofPoints missing or empty (need at least one)");
  } else if (!pts.some((p) => nonEmpty(p))) {
    failures.push("technicalProofPoints has no non-empty strings");
  }

  if (!nonEmpty(sp.suggestedCta)) failures.push("suggestedCta missing or empty");

  if (!nonEmpty(sp.pdsFileHint)) failures.push("pdsFileHint missing or empty");

  return failures;
}

/** @type {{ name: string, failures: string[] }[]} */
const results = [];

for (const c of CASES) {
  const out = composeSalesEnablementCategorySpotlight({
    overlayId: c.overlayId,
    customerProfileId: c.customerProfileId,
  });
  results.push({ name: c.name, failures: verify(out) });
}

let passCount = 0;
let failCount = 0;

console.log("\nSales Enablement category composer smoke tests\n" + "=".repeat(56));

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
  throw new Error(`Sales Enablement category composer smoke tests failed:\n${detail}`);
}

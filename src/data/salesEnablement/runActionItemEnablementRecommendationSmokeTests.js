/**
 * Phase 78.0 — Smoke tests for action item → Guided Spotlight Wizard bridge.
 * Run: npm run test:action-item-enablement-recommendations
 */

import { getEnablementRecommendationForActionItem } from "./actionItemEnablementRecommendations.js";

const requiredKeys = [
  "ok",
  "reason",
  "messageKind",
  "query",
  "recommendedTitle",
  "customerProfileId",
  "suggestedActionLabel",
];

function assertShape(r) {
  for (const k of requiredKeys) {
    if (!(k in r)) throw new Error(`missing field: ${k}`);
  }
}

let failed = 0;

function check(name, action, expect) {
  const r = getEnablementRecommendationForActionItem(action);
  try {
    assertShape(r);
  } catch (e) {
    console.error(`FAIL  ${name} shape: ${e.message}`);
    failed += 1;
    return;
  }
  if (Boolean(r.ok) !== Boolean(expect.ok)) {
    console.error(`FAIL  ${name} ok: got ${r.ok}, expected ${expect.ok}`);
    failed += 1;
    return;
  }
  if (expect.ok) {
    if (r.messageKind !== expect.messageKind) {
      console.error(`FAIL  ${name} messageKind: got ${r.messageKind}, expected ${expect.messageKind}`);
      failed += 1;
    }
    if (!String(r.query || "").trim()) {
      console.error(`FAIL  ${name} query empty`);
      failed += 1;
    }
    if (expect.targetSpotlightId && r.targetSpotlightId !== expect.targetSpotlightId) {
      console.error(
        `FAIL  ${name} targetSpotlightId: got ${r.targetSpotlightId}, expected ${expect.targetSpotlightId}`
      );
      failed += 1;
    }
  }
}

check(
  "signal low_grease_penetration",
  {
    kind: "spotlight",
    id: "alert-x",
    spotlightId: "cs-grease-program-growth",
    spotlightType: "category",
    enablementSignalKind: "low_grease_penetration",
  },
  { ok: true, messageKind: "product", targetSpotlightId: "ps-grease-ep2" }
);

check(
  "signal weak_hydraulic_quote_mix",
  {
    kind: "spotlight",
    spotlightId: "cs-hydraulic-opportunity",
    spotlightType: "category",
    enablementSignalKind: "weak_hydraulic_quote_mix",
  },
  { ok: true, messageKind: "category", targetSpotlightId: "cs-hydraulic-opportunity" }
);

check(
  "signal weak_hydraulic_approved_mix → XVI product",
  {
    kind: "spotlight",
    spotlightId: "ps-klondike-aw-hydraulic",
    spotlightType: "product",
    enablementSignalKind: "weak_hydraulic_approved_mix",
  },
  { ok: true, messageKind: "product", targetSpotlightId: "ps-klondike-aw-synthetic-hydraulic" }
);

check(
  "signal weak_synthetic_adoption",
  {
    kind: "spotlight",
    spotlightId: "cs-synthetic-upgrade",
    spotlightType: "category",
    enablementSignalKind: "weak_synthetic_adoption",
  },
  { ok: true, messageKind: "category", targetSpotlightId: "cs-synthetic-upgrade" }
);

check(
  "signal heavy_duty_quote_concentration",
  {
    kind: "spotlight",
    spotlightId: "cs-hd-conversion",
    spotlightType: "category",
    enablementSignalKind: "heavy_duty_quote_concentration",
  },
  { ok: true, messageKind: "category", targetSpotlightId: "cs-hd-conversion" }
);

check("playbook weak grease", { kind: "spotlight", id: "playbook-weak-grease-adoption" }, {
  ok: true,
  messageKind: "product",
  targetSpotlightId: "ps-grease-ep2",
});

check(
  "dealer intel grease expansion (no spotlight id)",
  {
    cardType: "Suggested Product Focus",
    title: "Grease expansion",
    category: "Grease",
    why: "Quote-line buckets show grease trailing peer dealers.",
  },
  { ok: true, messageKind: "product", targetSpotlightId: "ps-grease-ep2" }
);

check(
  "wet brake text heuristic",
  {
    kind: "spotlight",
    spotlightId: "cs-hd-conversion",
    spotlightType: "category",
    issue: "Tractor wet brake chatter in yard trials",
  },
  { ok: true, messageKind: "product", targetSpotlightId: "ps-agrimax-zf" }
);

check(
  "coolant spotlight id",
  { kind: "spotlight", spotlightId: "cs-coolant-chemical-addon", spotlightType: "category" },
  { ok: true, messageKind: "category", targetSpotlightId: "cs-coolant-chemical-addon" }
);

check(
  "workflow notice — no bridge",
  { kind: "workflow_notice", id: "playbook-low-ocr-usage", issue: "Low OCR" },
  { ok: false }
);

console.log("\nAction item → enablement recommendation smoke tests\n" + "=".repeat(52));
console.log(failed === 0 ? `PASS  ${10} cases` : `FAIL  ${failed} case(s)`);
if (failed) process.exit(1);

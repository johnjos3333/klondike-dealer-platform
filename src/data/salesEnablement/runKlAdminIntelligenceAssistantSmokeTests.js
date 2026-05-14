/**
 * Phase 79.0 — Smoke tests for KL Admin Intelligence Assistant.
 * Run: npm run test:kl-admin-intelligence-assistant
 */

import { getKlAdminIntelligenceRecommendation } from "./klAdminIntelligenceAssistant.js";

/** @param {unknown} cond @param {string} [msg] */
function assert(cond, msg) {
  if (!cond) throw new Error(msg || "assertion failed");
}

function mustMatch(input, expectedType, label) {
  const r = getKlAdminIntelligenceRecommendation(input);
  assert(r.ok === true, `${label}: ok`);
  assert(r.recommendedActionType === expectedType, `${label}: expected ${expectedType}, got ${r.recommendedActionType}`);
  assert(typeof r.title === "string" && r.title.length > 0, `${label}: title`);
  assert(typeof r.reason === "string" && r.reason.length > 0, `${label}: reason`);
  assert(typeof r.priority === "string", `${label}: priority`);
  assert(typeof r.suggestedActionLabel === "string", `${label}: label`);
  assert(typeof r.recommendedCadence === "string", `${label}: cadence`);
  assert(typeof r.relatedSpotlightQuery === "string", `${label}: query`);
  assert(typeof r.relatedTrainingTopic === "string", `${label}: training`);
  assert(typeof r.customerProfileId === "string", `${label}: customerProfileId`);
  assert(typeof r.notes === "string", `${label}: notes`);
}

mustMatch(
  { performanceTrend: "slight_decline", categoryGap: "light" },
  "Spotlight",
  "slight decline + light gap"
);

mustMatch({ categoryGap: "full_non_performance" }, "Klondike U", "full category gap");

mustMatch({ relationshipHealth: "needs_coaching" }, "Field Ride-Along", "coaching");

mustMatch({ performanceTrend: "severe_decline" }, "In-Person Training", "severe decline");

mustMatch({ dealerLifecycle: "onboarding" }, "In-Person Training", "onboarding");

mustMatch({ operationalReviewCadence: "overdue" }, "Field Audit", "operational overdue");

mustMatch({ strategicReviewCadence: "quarterly_due" }, "Business Review", "strategic quarterly");

mustMatch({ performanceTrend: "stable", categoryGap: "none" }, "Momentum Action", "smooth default");

const bad = getKlAdminIntelligenceRecommendation(null);
assert(bad.ok === false, "null input ok=false");
assert(bad.recommendedActionType === "Momentum Action", "null fallback type");

const severePlusStrategic = getKlAdminIntelligenceRecommendation({
  performanceTrend: "severe_decline",
  strategicReviewCadence: "quarterly_due",
});
assert(severePlusStrategic.recommendedActionType === "In-Person Training", "severe beats strategic");

console.log("PASS  klAdminIntelligenceAssistant smoke tests (10 checks)");

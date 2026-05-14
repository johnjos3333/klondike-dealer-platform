/**
 * Smoke tests for lubrication concept detection and explanations.
 * Run: node src/data/salesEnablement/runLubricationKnowledgeSmokeTests.js
 */

import {
  detectLubricationConcepts,
  buildConceptExplanation,
} from "../../utils/lubricationAdvisorCoreHelpers.js";

/** @param {unknown} cond @param {string} [msg] */
function assert(cond, msg) {
  if (!cond) throw new Error(msg || "assertion failed");
}

/**
 * @param {string} query
 * @param {string} expectedConceptId
 * @param {string} label
 */
function mustDetectPrimary(query, expectedConceptId, label) {
  const matches = detectLubricationConcepts(query);
  assert(matches.length > 0, `${label}: expected at least one match`);
  assert(
    matches[0].id === expectedConceptId,
    `${label}: expected primary ${expectedConceptId}, got ${matches[0].id}`
  );
  assert(matches[0].score >= 6, `${label}: score threshold`);
  assert(
    typeof matches[0].concept?.summary === "string" && matches[0].concept.summary.length > 0,
    `${label}: concept summary`
  );
}

/**
 * @param {string} query
 * @param {string} expectedConceptId
 * @param {string} label
 */
function mustExplain(query, expectedConceptId, label) {
  const explanation = buildConceptExplanation(query);
  assert(explanation.ok === true, `${label}: ok`);
  assert(
    explanation.primaryConceptId === expectedConceptId,
    `${label}: expected primary ${expectedConceptId}, got ${explanation.primaryConceptId}`
  );
  assert(
    typeof explanation.directAnswer === "string" && explanation.directAnswer.length > 0,
    `${label}: directAnswer`
  );
  assert(
    typeof explanation.whyItMatters === "string" && explanation.whyItMatters.length > 0,
    `${label}: whyItMatters`
  );
  assert(
    typeof explanation.repGuidance === "string" && explanation.repGuidance.length > 0,
    `${label}: repGuidance`
  );
  assert(explanation.confidence > 0, `${label}: confidence`);
  assert(explanation.conceptIds.includes(expectedConceptId), `${label}: conceptIds`);
}

mustDetectPrimary("Explain viscosity index", "viscosityIndex", "viscosity index detect");
mustExplain("Explain viscosity index", "viscosityIndex", "viscosity index explain");

mustDetectPrimary("water washout on wet pins", "waterWashout", "water washout detect");
mustExplain("water washout on wet pins", "waterWashout", "water washout explain");

mustDetectPrimary("What causes wet brake chatter?", "wetBrakeChatter", "wet brake chatter detect");
mustExplain("What causes wet brake chatter?", "wetBrakeChatter", "wet brake chatter explain");

mustDetectPrimary("hydraulic pump cavitation noise", "cavitation", "cavitation detect");
mustExplain("hydraulic pump cavitation noise", "cavitation", "cavitation explain");

const empty = buildConceptExplanation("");
assert(empty.ok === false, "empty input ok=false");

console.log("PASS  lubrication knowledge smoke tests (10 checks)");

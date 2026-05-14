/**
 * Smoke tests for lubrication advisor orchestrator routing and unified responses.
 * Run: node src/data/salesEnablement/runLubricationAdvisorOrchestratorSmokeTests.js
 */

import {
  buildLubricationAdvisorResponse,
  classifyLubricationAdvisorIntent,
} from "../../utils/lubricationAdvisorOrchestrator.js";

/** @param {unknown} cond @param {string} [msg] */
function assert(cond, msg) {
  if (!cond) throw new Error(msg || "assertion failed");
}

/**
 * @param {string} query
 * @param {string} expectedIntent
 * @param {string} label
 */
function mustRouteAndRespond(query, expectedIntent, label) {
  const classification = classifyLubricationAdvisorIntent(query);
  assert(
    classification.intent === expectedIntent,
    `${label}: expected intent ${expectedIntent}, got ${classification.intent}`
  );

  const response = buildLubricationAdvisorResponse(query);
  assert(
    response.intent === expectedIntent,
    `${label}: response intent ${expectedIntent}, got ${response.intent}`
  );
  assert(typeof response.title === "string" && response.title.length > 0, `${label}: title`);
  assert(
    typeof response.directAnswer === "string" && response.directAnswer.length > 0,
    `${label}: directAnswer`
  );
  assert(Array.isArray(response.sections), `${label}: sections array`);
  assert(Array.isArray(response.followUpQuestions), `${label}: followUpQuestions array`);
  assert(Array.isArray(response.sourceBadges), `${label}: sourceBadges array`);
  assert(Array.isArray(response.cautionNotes), `${label}: cautionNotes array`);
}

mustRouteAndRespond("What is viscosity index?", "concept", "viscosity index concept");
mustRouteAndRespond("What causes wet brake chatter?", "troubleshooting", "wet brake chatter troubleshooting");
mustRouteAndRespond("Does a quarry use lubricants?", "industry", "quarry industry");
mustRouteAndRespond("What lubricants does an excavator use?", "equipment", "excavator equipment");
mustRouteAndRespond("What should I ask about pins and bushings?", "equipment", "pins and bushings equipment");
mustRouteAndRespond("Why is hydraulic oil foaming?", "troubleshooting", "hydraulic foaming troubleshooting");
mustRouteAndRespond("Does a dairy farm use lubricants?", "industry", "dairy farm industry");
mustRouteAndRespond("Explain water washout", "concept", "water washout concept");

console.log("PASS  lubrication advisor orchestrator smoke tests (8 cases)");

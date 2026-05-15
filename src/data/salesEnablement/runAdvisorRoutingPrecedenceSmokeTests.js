/**
 * Smoke tests for lubrication advisor orchestrator routing precedence.
 * Run: node src/data/salesEnablement/runAdvisorRoutingPrecedenceSmokeTests.js
 */

import { buildLubricationAdvisorResponse } from "../../utils/lubricationAdvisorOrchestrator.js";

/** @param {unknown} cond @param {string} [msg] */
function assert(cond, msg) {
  if (!cond) throw new Error(msg || "assertion failed");
}

/** @param {unknown} s */
function nonEmptyString(s) {
  return typeof s === "string" && s.trim().length > 0;
}

/**
 * @param {string} label
 * @param {string} query
 * @param {string | string[]} expectedIntent
 * @param {{ requireSections?: boolean }} [opts]
 */
function runRoutingCase(label, query, expectedIntent, opts = {}) {
  const { requireSections = true } = opts;
  const response = buildLubricationAdvisorResponse(query);

  assert(response && typeof response === "object", `${label}: expected response object`);

  const allowed = Array.isArray(expectedIntent) ? expectedIntent : [expectedIntent];
  assert(
    allowed.includes(response.intent),
    `${label}: expected intent ${allowed.join(" OR ")}, got ${response.intent}`
  );

  assert(nonEmptyString(response.title), `${label}: expected non-empty title`);
  assert(nonEmptyString(response.directAnswer), `${label}: expected non-empty directAnswer`);

  assert(Array.isArray(response.sections), `${label}: expected sections array`);
  if (requireSections) {
    assert(response.sections.length > 0, `${label}: expected non-empty sections`);
  }
}

console.log("\nadvisor routing precedence smoke tests\n" + "=".repeat(56));

try {
  runRoutingCase("Nano grease entity", "What is Nano grease?", "product_entity");
  console.log("PASS  What is Nano grease? => product_entity");

  runRoutingCase(
    "Grease thickener compatibility",
    "Can I mix lithium complex and calcium sulfonate grease?",
    "compatibility"
  );
  console.log("PASS  Can I mix lithium complex and calcium sulfonate grease? => compatibility");

  runRoutingCase("Wet brake chatter", "wet brake chatter after top off", "hydraulic_troubleshooting");
  console.log("PASS  wet brake chatter after top off => hydraulic_troubleshooting");

  runRoutingCase(
    "Recommend crusher pins",
    "What grease should I recommend for crusher pins?",
    "deterministic_recommendation"
  );
  console.log("PASS  What grease should I recommend for crusher pins? => deterministic_recommendation");

  runRoutingCase(
    "Recommend quarry winter",
    "What should I recommend for a quarry in winter?",
    "deterministic_recommendation"
  );
  console.log("PASS  What should I recommend for a quarry in winter? => deterministic_recommendation");

  runRoutingCase("Hydraulic cavitation", "hydraulic system cavitating", "hydraulic_troubleshooting");
  console.log("PASS  hydraulic system cavitating => hydraulic_troubleshooting");

  runRoutingCase("XVI hydraulic entity", "What is XVI hydraulic?", "product_entity");
  console.log("PASS  What is XVI hydraulic? => product_entity");

  runRoutingCase(
    "Turbine oils catalog",
    "What turbine oils does Klondike carry?",
    ["product_retrieval", "product_entity"]
  );
  console.log("PASS  What turbine oils does Klondike carry? => product_retrieval OR product_entity");

  console.log("=".repeat(56));
  console.log("All advisor routing precedence smoke tests passed.\n");
} catch (e) {
  console.log(`FAIL  ${e instanceof Error ? e.message : e}`);
  process.exitCode = 1;
}

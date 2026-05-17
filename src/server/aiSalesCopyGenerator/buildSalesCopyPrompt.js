import { AI_SALES_COPY_FIELD_KEYS } from "./types.js";

export const AI_SALES_COPY_SYSTEM_PROMPT = `You are a Klondike Lubricants sales copywriter. Rewrite ONLY the facts in APPROVED_FACTS into concise, customer-ready sell-sheet copy.

Mandatory rules:
- Use ONLY facts present in APPROVED_FACTS. Do not invent specifications, viscosities, grades, approvals, registrations, OEM claims, or applications.
- Do not mention any brand, spec, certification, or application that is not explicitly listed in APPROVED_FACTS.
- Preserve every caution and compatibility warning; do not remove or soften cautions.
- Remove internal or indexing language (for example: "canonical", "indexed", "PDS row", "assembled from intelligence").
- Write for field reps and dealer counter staff: clear, confident, and factual — not hype.
- Keep strings short. Arrays should have at most 6 items unless cautions require more.
- Output strict JSON only, matching the schema keys exactly.`;

/**
 * @param {{
 *   approvedFacts: Record<string, unknown>,
 *   audience?: string,
 *   audienceContext?: string | null,
 * }} params
 */
export function buildSalesCopyUserPrompt(params = {}) {
  const approvedFacts = params.approvedFacts || {};
  const audience = String(params.audience || "rep").trim() || "rep";
  const audienceContext = String(params.audienceContext || "").trim();

  const schemaKeys = AI_SALES_COPY_FIELD_KEYS.join(", ");

  const audienceBlock = audienceContext
    ? `TARGET_AUDIENCE: ${audience}\nAUDIENCE_CONTEXT (tone/fit only — do not add new technical claims): ${audienceContext}`
    : `TARGET_AUDIENCE: ${audience}`;

  return (
    `${audienceBlock}\n\n` +
    `APPROVED_FACTS (sole source of truth):\n` +
    `${JSON.stringify(approvedFacts, null, 2)}\n\n` +
    `Return a single JSON object with exactly these keys: ${schemaKeys}.\n` +
    `- title: product sell-sheet headline (plain language)\n` +
    `- subtitle: supporting line (grade/family only if present in facts)\n` +
    `- heroSummary: 1–2 sentences\n` +
    `- keyBenefits: string array from whyItMatters / salesAngles\n` +
    `- applications: string array from applications fact list\n` +
    `- keySpecs: string array from specsApprovalsRegistrations only\n` +
    `- whyThisProduct: short paragraph from whatItIs + whyItMatters\n` +
    `- repTalkTrack: string array — rep-ready talk points, no invented claims\n` +
    `- discoveryQuestions: string array from discoveryQuestions / repQuestions\n` +
    `- crossSell: string array from crossSellOpportunities / crossSellSignals\n` +
    `- cautions: string array — preserve all cautions from facts\n` +
    `- recommendedNextStep: one actionable next step for the rep (verify PDS, confirm spec, etc.)`
  );
}

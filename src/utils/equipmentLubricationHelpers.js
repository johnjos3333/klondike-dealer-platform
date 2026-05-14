/**
 * Equipment lubrication helpers — deterministic intent detection and responses.
 * Plain JavaScript only; not wired to UI.
 */

import { equipmentLubricationKnowledge } from "../data/equipmentLubricationKnowledge.js";

/** @param {unknown} raw */
function normalizeEquipmentText(raw) {
  return String(raw ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9#]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** @param {unknown} query */
function tokenizeEquipmentQuery(query) {
  const n = normalizeEquipmentText(query);
  if (!n) return [];
  return [...new Set(n.split(" ").filter((t) => t.length >= 2))].slice(0, 32);
}

/** @param {string} camel */
function camelToWords(camel) {
  return String(camel || "")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .toLowerCase();
}

/**
 * @param {string} equipmentId
 * @param {typeof equipmentLubricationKnowledge[string]} profile
 * @param {string} normalizedInput
 * @param {string[]} tokens
 */
function scoreEquipmentMatch(equipmentId, profile, normalizedInput, tokens) {
  let score = 0;
  /** @type {string[]} */
  const matchedKeywords = [];

  const idPhrase = normalizeEquipmentText(camelToWords(equipmentId));
  if (idPhrase && normalizedInput.includes(idPhrase)) {
    score += 10 + idPhrase.length;
    matchedKeywords.push(idPhrase);
  }

  const equipmentNorm = normalizeEquipmentText(profile.equipment);
  if (equipmentNorm && normalizedInput.includes(equipmentNorm)) {
    score += 14 + Math.min(equipmentNorm.length, 24);
    matchedKeywords.push(profile.equipment);
  }

  for (const alias of profile.aliases || []) {
    const aliasNorm = normalizeEquipmentText(alias);
    if (!aliasNorm) continue;
    if (normalizedInput.includes(aliasNorm)) {
      score += 9 + Math.min(aliasNorm.length, 18);
      matchedKeywords.push(alias);
    }
  }

  for (const keyword of profile.keywords || []) {
    const kwNorm = normalizeEquipmentText(keyword);
    if (!kwNorm) continue;
    if (normalizedInput.includes(kwNorm)) {
      score += 7 + Math.min(kwNorm.length, 16);
      matchedKeywords.push(keyword);
    }
  }

  for (const system of profile.lubricationSystems || []) {
    const sysNorm = normalizeEquipmentText(system);
    if (sysNorm.length >= 10 && normalizedInput.includes(sysNorm)) {
      score += 5;
    }
  }

  for (const token of tokens) {
    if (!token) continue;
    if (equipmentNorm.includes(token)) {
      score += 4 + token.length;
    }
    for (const alias of profile.aliases || []) {
      const aliasNorm = normalizeEquipmentText(alias);
      if (aliasNorm.includes(token) || (token.length >= 4 && aliasNorm.split(" ").includes(token))) {
        score += 3 + token.length;
      }
    }
  }

  return { score, matchedKeywords: [...new Set(matchedKeywords)] };
}

/**
 * @param {unknown} inputText
 * @returns {Array<{
 *   id: string,
 *   equipment: string,
 *   score: number,
 *   matchedKeywords: string[],
 *   profile: typeof equipmentLubricationKnowledge[string],
 * }>}
 */
export function detectEquipmentIntent(inputText) {
  const normalizedInput = normalizeEquipmentText(inputText);
  if (!normalizedInput) return [];

  const tokens = tokenizeEquipmentQuery(inputText);
  /** @type {ReturnType<typeof detectEquipmentIntent>} */
  const matches = [];

  for (const [equipmentId, profile] of Object.entries(equipmentLubricationKnowledge)) {
    const { score, matchedKeywords } = scoreEquipmentMatch(
      equipmentId,
      profile,
      normalizedInput,
      tokens
    );
    if (score < 6) continue;
    matches.push({
      id: equipmentId,
      equipment: profile.equipment,
      score,
      matchedKeywords,
      profile,
    });
  }

  return matches.sort((a, b) => b.score - a.score);
}

/**
 * @param {unknown} inputTextOrKey
 * @returns {typeof equipmentLubricationKnowledge[string] | null}
 */
export function getEquipmentLubricationProfile(inputTextOrKey) {
  const raw = String(inputTextOrKey ?? "").trim();
  if (!raw) return null;

  if (equipmentLubricationKnowledge[raw]) {
    return equipmentLubricationKnowledge[raw];
  }

  for (const [id, profile] of Object.entries(equipmentLubricationKnowledge)) {
    if (normalizeEquipmentText(id) === normalizeEquipmentText(raw)) return profile;
    if (normalizeEquipmentText(camelToWords(id)) === normalizeEquipmentText(raw)) return profile;
  }

  const matches = detectEquipmentIntent(raw);
  return matches[0]?.profile || null;
}

/**
 * @param {unknown} inputText
 * @returns {{
 *   ok: boolean,
 *   question: string,
 *   equipmentId: string | null,
 *   equipment: string,
 *   industryFit: string[],
 *   lubricationSystems: string[],
 *   operatingConditions: string[],
 *   commonPainPoints: string[],
 *   commonFailures: string[],
 *   likelyLubricantCategories: string[],
 *   commonQuestionsToAsk: string[],
 *   relatedConcepts: string[],
 *   troubleshootingLinks: string[],
 *   salesOpportunities: string[],
 *   cautionNotes: string[],
 *   confidence: number,
 *   message: string,
 * }}
 */
export function buildEquipmentLubricationResponse(inputText) {
  const question = String(inputText ?? "").trim();
  const matches = detectEquipmentIntent(question);

  const empty = {
    ok: false,
    question,
    equipmentId: null,
    equipment: "",
    industryFit: [],
    lubricationSystems: [],
    operatingConditions: [],
    commonPainPoints: [],
    commonFailures: [],
    likelyLubricantCategories: [],
    commonQuestionsToAsk: [],
    relatedConcepts: [],
    troubleshootingLinks: [],
    salesOpportunities: [],
    cautionNotes: [],
    confidence: 0,
    message: "",
  };

  if (!question) {
    return {
      ...empty,
      message: "Ask about equipment—e.g. excavator, tractor, wet brake system, or pins and bushings.",
    };
  }

  if (!matches.length) {
    return {
      ...empty,
      message:
        "No indexed equipment profile matched. Try excavator, wheel loader, tractor, air compressor, or pins and bushings.",
    };
  }

  const primary = matches[0].profile;
  const confidence = Math.min(1, matches[0].score / 34);

  return {
    ok: true,
    question,
    equipmentId: matches[0].id,
    equipment: primary.equipment,
    industryFit: primary.industryFit || [],
    lubricationSystems: primary.lubricationSystems || [],
    operatingConditions: primary.operatingConditions || [],
    commonPainPoints: primary.commonPainPoints || [],
    commonFailures: primary.commonFailures || [],
    likelyLubricantCategories: primary.likelyLubricantCategories || [],
    commonQuestionsToAsk: primary.commonQuestionsToAsk || [],
    relatedConcepts: primary.relatedConcepts || [],
    troubleshootingLinks: primary.troubleshootingLinks || [],
    salesOpportunities: primary.salesOpportunities || [],
    cautionNotes: primary.cautionNotes || [],
    confidence,
    message: `Matched equipment: ${primary.equipment}.`,
  };
}

/**
 * @param {unknown} inputText
 * @returns {{ ok: boolean, question: string, equipmentId: string | null, questions: string[], message: string }}
 */
export function buildEquipmentQuestionsToAsk(inputText) {
  const response = buildEquipmentLubricationResponse(inputText);
  if (!response.ok) {
    return {
      ok: false,
      question: response.question,
      equipmentId: null,
      questions: [],
      message: response.message,
    };
  }

  return {
    ok: true,
    question: response.question,
    equipmentId: response.equipmentId,
    questions: response.commonQuestionsToAsk || [],
    message: response.message,
  };
}

/**
 * @param {unknown} inputText
 * @returns {{
 *   ok: boolean,
 *   question: string,
 *   equipmentId: string | null,
 *   salesOpportunities: string[],
 *   likelyLubricantCategories: string[],
 *   cautionNotes: string[],
 *   message: string,
 * }}
 */
export function buildEquipmentSalesGuidance(inputText) {
  const response = buildEquipmentLubricationResponse(inputText);
  if (!response.ok) {
    return {
      ok: false,
      question: response.question,
      equipmentId: null,
      salesOpportunities: [],
      likelyLubricantCategories: [],
      cautionNotes: [],
      message: response.message,
    };
  }

  return {
    ok: true,
    question: response.question,
    equipmentId: response.equipmentId,
    salesOpportunities: response.salesOpportunities || [],
    likelyLubricantCategories: response.likelyLubricantCategories || [],
    cautionNotes: response.cautionNotes || [],
    message: response.message,
  };
}

/**
 * Industry lubrication helpers — deterministic intent detection and responses.
 * Plain JavaScript only; not wired to UI.
 */

import { industryLubricationKnowledge } from "../data/industryLubricationKnowledge.js";

/** @param {unknown} raw */
function normalizeIndustryText(raw) {
  return String(raw ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9#]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** @param {unknown} query */
function tokenizeIndustryQuery(query) {
  const n = normalizeIndustryText(query);
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
 * @param {string} industryId
 * @param {typeof industryLubricationKnowledge[string]} profile
 * @param {string} normalizedInput
 * @param {string[]} tokens
 */
function scoreIndustryMatch(industryId, profile, normalizedInput, tokens) {
  let score = 0;
  /** @type {string[]} */
  const matchedKeywords = [];

  const idPhrase = normalizeIndustryText(camelToWords(industryId));
  if (idPhrase && normalizedInput.includes(idPhrase)) {
    score += 10 + idPhrase.length;
    matchedKeywords.push(idPhrase);
  }

  const industryNorm = normalizeIndustryText(profile.industry);
  if (industryNorm && normalizedInput.includes(industryNorm)) {
    score += 14 + Math.min(industryNorm.length, 24);
    matchedKeywords.push(profile.industry);
  }

  for (const alias of profile.aliases || []) {
    const aliasNorm = normalizeIndustryText(alias);
    if (!aliasNorm) continue;
    if (normalizedInput.includes(aliasNorm)) {
      score += 9 + Math.min(aliasNorm.length, 18);
      matchedKeywords.push(alias);
    }
  }

  for (const keyword of profile.keywords || []) {
    const kwNorm = normalizeIndustryText(keyword);
    if (!kwNorm) continue;
    if (normalizedInput.includes(kwNorm)) {
      score += 7 + Math.min(kwNorm.length, 16);
      matchedKeywords.push(keyword);
    }
  }

  for (const token of tokens) {
    if (!token) continue;
    if (industryNorm.includes(token)) {
      score += 4 + token.length;
    }
    for (const alias of profile.aliases || []) {
      const aliasNorm = normalizeIndustryText(alias);
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
 *   industry: string,
 *   score: number,
 *   matchedKeywords: string[],
 *   profile: typeof industryLubricationKnowledge[string],
 * }>}
 */
export function detectIndustryIntent(inputText) {
  const normalizedInput = normalizeIndustryText(inputText);
  if (!normalizedInput) return [];

  const tokens = tokenizeIndustryQuery(inputText);
  /** @type {ReturnType<typeof detectIndustryIntent>} */
  const matches = [];

  for (const [industryId, profile] of Object.entries(industryLubricationKnowledge)) {
    const { score, matchedKeywords } = scoreIndustryMatch(
      industryId,
      profile,
      normalizedInput,
      tokens
    );
    if (score < 6) continue;
    matches.push({
      id: industryId,
      industry: profile.industry,
      score,
      matchedKeywords,
      profile,
    });
  }

  return matches.sort((a, b) => b.score - a.score);
}

/**
 * @param {unknown} inputTextOrKey
 * @returns {typeof industryLubricationKnowledge[string] | null}
 */
export function getIndustryLubricationProfile(inputTextOrKey) {
  const raw = String(inputTextOrKey ?? "").trim();
  if (!raw) return null;

  if (industryLubricationKnowledge[raw]) {
    return industryLubricationKnowledge[raw];
  }

  const normalizedKey = normalizeIndustryText(raw).replace(/\s+/g, "");
  for (const [id, profile] of Object.entries(industryLubricationKnowledge)) {
    if (normalizeIndustryText(id) === normalizedKey) return profile;
    if (normalizeIndustryText(camelToWords(id)) === normalizeIndustryText(raw)) return profile;
  }

  const matches = detectIndustryIntent(raw);
  return matches[0]?.profile || null;
}

/**
 * @param {unknown} inputText
 * @returns {{
 *   ok: boolean,
 *   question: string,
 *   industryId: string | null,
 *   industry: string,
 *   opportunityLevel: string,
 *   answerSummary: string,
 *   commonEquipment: string[],
 *   lubricantUseAreas: Array<typeof industryLubricationKnowledge[string]["lubricantUseAreas"][number]>,
 *   commonPainSignals: string[],
 *   recommendedOpeningQuestions: string[],
 *   repTalkTrack: string,
 *   spotlightAngles: string[],
 *   cautionNotes: string[],
 *   confidence: number,
 *   message: string,
 * }}
 */
export function buildIndustryLubricationResponse(inputText) {
  const question = String(inputText ?? "").trim();
  const matches = detectIndustryIntent(question);

  const empty = {
    ok: false,
    question,
    industryId: null,
    industry: "",
    opportunityLevel: "",
    answerSummary: "",
    commonEquipment: [],
    lubricantUseAreas: [],
    commonPainSignals: [],
    recommendedOpeningQuestions: [],
    repTalkTrack: "",
    spotlightAngles: [],
    cautionNotes: [],
    confidence: 0,
    message: "",
  };

  if (!question) {
    return {
      ...empty,
      message: "Ask about an industry—e.g. mining, dairy farm, municipality fleet, or food processing.",
    };
  }

  if (!matches.length) {
    return {
      ...empty,
      message:
        "No indexed industry profile matched. Try mining, quarry, trucking fleet, municipality, or food processing.",
    };
  }

  const primary = matches[0].profile;
  const confidence = Math.min(1, matches[0].score / 34);

  return {
    ok: true,
    question,
    industryId: matches[0].id,
    industry: primary.industry,
    opportunityLevel: primary.opportunityLevel,
    answerSummary: primary.answerSummary,
    commonEquipment: primary.commonEquipment || [],
    lubricantUseAreas: primary.lubricantUseAreas || [],
    commonPainSignals: primary.commonPainSignals || [],
    recommendedOpeningQuestions: primary.recommendedOpeningQuestions || [],
    repTalkTrack: primary.repTalkTrack || "",
    spotlightAngles: primary.spotlightAngles || [],
    cautionNotes: primary.cautionNotes || [],
    confidence,
    message: `Matched industry: ${primary.industry} (${primary.opportunityLevel} opportunity).`,
  };
}

/**
 * @param {unknown} inputText
 * @returns {{ ok: boolean, question: string, industryId: string | null, questions: string[], message: string }}
 */
export function buildIndustryQuestionsToAsk(inputText) {
  const response = buildIndustryLubricationResponse(inputText);
  if (!response.ok) {
    return {
      ok: false,
      question: response.question,
      industryId: null,
      questions: [],
      message: response.message,
    };
  }

  const areaQuestions = (response.lubricantUseAreas || []).flatMap(
    (area) => area.discoveryQuestions || []
  );

  const questions = [
    ...new Set([...(response.recommendedOpeningQuestions || []), ...areaQuestions]),
  ].slice(0, 8);

  return {
    ok: true,
    question: response.question,
    industryId: response.industryId,
    questions,
    message: response.message,
  };
}

/**
 * @param {unknown} inputText
 * @returns {{ ok: boolean, question: string, industryId: string | null, repTalkTrack: string, spotlightAngles: string[], cautionNotes: string[], message: string }}
 */
export function buildIndustryRepTalkTrack(inputText) {
  const response = buildIndustryLubricationResponse(inputText);
  if (!response.ok) {
    return {
      ok: false,
      question: response.question,
      industryId: null,
      repTalkTrack: "",
      spotlightAngles: [],
      cautionNotes: [],
      message: response.message,
    };
  }

  return {
    ok: true,
    question: response.question,
    industryId: response.industryId,
    repTalkTrack: response.repTalkTrack,
    spotlightAngles: response.spotlightAngles,
    cautionNotes: response.cautionNotes,
    message: response.message,
  };
}

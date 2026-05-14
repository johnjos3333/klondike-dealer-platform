/**
 * Lubrication Advisor core helpers — deterministic concept detection and explanations.
 * Plain JavaScript only; not wired to UI.
 */

import { lubricationConcepts } from "../data/lubricationConcepts.js";

/** @param {unknown} raw */
function normalizeAdvisorText(raw) {
  return String(raw ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9#]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** @param {unknown} query */
function tokenizeAdvisorQuery(query) {
  const n = normalizeAdvisorText(query);
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
 * @param {string} conceptId
 * @param {import("../data/lubricationConcepts.js").lubricationConcepts[string]} concept
 * @param {string} normalizedInput
 * @param {string[]} tokens
 */
function scoreConceptMatch(conceptId, concept, normalizedInput, tokens) {
  let score = 0;
  /** @type {string[]} */
  const matchedKeywords = [];

  const idPhrase = normalizeAdvisorText(camelToWords(conceptId));
  if (idPhrase && normalizedInput.includes(idPhrase)) {
    score += 10 + idPhrase.length;
    matchedKeywords.push(idPhrase);
  }

  const labelNorm = normalizeAdvisorText(concept.label);
  if (labelNorm && normalizedInput.includes(labelNorm)) {
    score += 12 + labelNorm.length;
    matchedKeywords.push(concept.label);
  }

  for (const keyword of concept.keywords || []) {
    const kwNorm = normalizeAdvisorText(keyword);
    if (!kwNorm) continue;
    if (normalizedInput.includes(kwNorm)) {
      score += 8 + Math.min(kwNorm.length, 16);
      matchedKeywords.push(keyword);
    }
  }

  for (const token of tokens) {
    if (!token) continue;
    if (labelNorm.includes(token)) {
      score += 4 + token.length;
    }
    for (const keyword of concept.keywords || []) {
      const kwNorm = normalizeAdvisorText(keyword);
      if (kwNorm.includes(token) || token.length >= 4 && kwNorm.split(" ").includes(token)) {
        score += 3 + token.length;
        if (!matchedKeywords.includes(keyword)) matchedKeywords.push(keyword);
      }
    }
  }

  return { score, matchedKeywords: [...new Set(matchedKeywords)] };
}

/**
 * Detect lubrication concepts referenced in free-text input.
 *
 * @param {unknown} inputText
 * @returns {Array<{
 *   id: string,
 *   label: string,
 *   score: number,
 *   matchedKeywords: string[],
 *   concept: typeof lubricationConcepts[string],
 * }>}
 */
export function detectLubricationConcepts(inputText) {
  const normalizedInput = normalizeAdvisorText(inputText);
  if (!normalizedInput) return [];

  const tokens = tokenizeAdvisorQuery(inputText);
  /** @type {ReturnType<typeof detectLubricationConcepts>} */
  const matches = [];

  for (const [conceptId, concept] of Object.entries(lubricationConcepts)) {
    const { score, matchedKeywords } = scoreConceptMatch(
      conceptId,
      concept,
      normalizedInput,
      tokens
    );
    if (score < 6) continue;
    matches.push({
      id: conceptId,
      label: concept.label,
      score,
      matchedKeywords,
      concept,
    });
  }

  return matches.sort((a, b) => b.score - a.score);
}

/**
 * Build a structured concept explanation from input text.
 *
 * @param {unknown} inputText
 * @returns {{
 *   ok: boolean,
 *   question: string,
 *   conceptIds: string[],
 *   primaryConceptId: string | null,
 *   directAnswer: string,
 *   whyItMatters: string,
 *   repGuidance: string,
 *   applicationNotes: string[],
 *   relatedCategories: string[],
 *   confidence: number,
 *   message: string,
 * }}
 */
export function buildConceptExplanation(inputText) {
  const question = String(inputText ?? "").trim();
  const matches = detectLubricationConcepts(question);

  if (!question) {
    return {
      ok: false,
      question: "",
      conceptIds: [],
      primaryConceptId: null,
      directAnswer: "",
      whyItMatters: "",
      repGuidance: "",
      applicationNotes: [],
      relatedCategories: [],
      confidence: 0,
      message: "Enter a lubrication term or concept to explain.",
    };
  }

  if (!matches.length) {
    return {
      ok: false,
      question,
      conceptIds: [],
      primaryConceptId: null,
      directAnswer: "",
      whyItMatters: "",
      repGuidance: "",
      applicationNotes: [],
      relatedCategories: [],
      confidence: 0,
      message:
        "No indexed lubrication concept matched this question. Try terms like viscosity index, NLGI grade, wet brake chatter, or water washout.",
    };
  }

  const primary = matches[0];
  const secondary = matches.slice(1, 3);
  const relatedCategories = [
    ...new Set(matches.flatMap((m) => m.concept.relatedCategories || [])),
  ];

  const applicationNotes = [
    ...(primary.concept.applicationNotes || []),
    ...secondary.flatMap((m) => m.concept.applicationNotes || []).slice(0, 2),
  ].slice(0, 5);

  const confidence = Math.min(1, primary.score / 28);

  let message = `Matched concept: ${primary.label}.`;
  if (secondary.length) {
    message += ` Related: ${secondary.map((m) => m.label).join(", ")}.`;
  }

  return {
    ok: true,
    question,
    conceptIds: matches.map((m) => m.id),
    primaryConceptId: primary.id,
    directAnswer: primary.concept.summary,
    whyItMatters: primary.concept.whyItMatters,
    repGuidance: primary.concept.repGuidance,
    applicationNotes,
    relatedCategories,
    confidence,
    message,
  };
}

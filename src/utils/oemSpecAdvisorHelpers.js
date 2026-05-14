/**
 * OEM / spec advisor helpers — deterministic intent detection, PDS-backed product lookup.
 * Plain JavaScript only; not wired to UI.
 */

import { PDS_MAP } from "../data/pdsMap.js";
import { oemSpecKnowledge } from "../data/oemSpecKnowledge.js";

const MATCH_THRESHOLD = 6;

/** @param {unknown} raw */
function normalizeOemSpecText(raw) {
  return String(raw ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9#]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** @param {unknown} query */
function tokenizeOemSpecQuery(query) {
  const n = normalizeOemSpecText(query);
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
 * @param {string} term
 * @param {string} haystackNormalized
 * @param {string[]} haystackTokens
 */
function termMatchesHaystack(term, haystackNormalized, haystackTokens) {
  const termNorm = normalizeOemSpecText(term);
  if (!termNorm) return false;

  if (termNorm.length <= 3) {
    return haystackTokens.includes(termNorm);
  }

  if (haystackNormalized.includes(termNorm)) return true;

  const termTokens = termNorm.split(" ").filter(Boolean);
  if (termTokens.length > 1) {
    return termTokens.every((t) => haystackTokens.includes(t) || haystackNormalized.includes(t));
  }

  return false;
}

/**
 * @param {string} specLine
 * @param {string[]} searchTerms
 */
function specLineMatchesSearchTerms(specLine, searchTerms) {
  const normalized = normalizeOemSpecText(specLine);
  const tokens = normalized.split(" ").filter(Boolean);
  return searchTerms.some((term) => termMatchesHaystack(term, normalized, tokens));
}

/**
 * @param {string} profileId
 * @param {typeof oemSpecKnowledge[string]} profile
 * @param {string} normalizedInput
 * @param {string[]} tokens
 */
function scoreOemSpecMatch(profileId, profile, normalizedInput, tokens) {
  let score = 0;
  /** @type {string[]} */
  const matchedKeywords = [];

  const idPhrase = normalizeOemSpecText(camelToWords(profileId));
  if (idPhrase && normalizedInput.includes(idPhrase)) {
    score += 10 + idPhrase.length;
    matchedKeywords.push(idPhrase);
  }

  const nameNorm = normalizeOemSpecText(profile.name);
  if (nameNorm && normalizedInput.includes(nameNorm)) {
    score += 14 + Math.min(nameNorm.length, 24);
    matchedKeywords.push(profile.name);
  }

  for (const alias of profile.aliases || []) {
    const aliasNorm = normalizeOemSpecText(alias);
    if (!aliasNorm) continue;
    if (aliasNorm.length <= 3) {
      if (tokens.includes(aliasNorm)) {
        score += 8;
        matchedKeywords.push(alias);
      }
      continue;
    }
    if (normalizedInput.includes(aliasNorm)) {
      score += 9 + Math.min(aliasNorm.length, 18);
      matchedKeywords.push(alias);
    }
  }

  for (const spec of profile.relatedSpecs || []) {
    const specNorm = normalizeOemSpecText(spec);
    if (specNorm.length >= 5 && normalizedInput.includes(specNorm)) {
      score += 8 + Math.min(specNorm.length, 20);
      matchedKeywords.push(spec);
    }
  }

  for (const keyword of profile.keywords || []) {
    const kwNorm = normalizeOemSpecText(keyword);
    if (!kwNorm) continue;
    if (normalizedInput.includes(kwNorm)) {
      score += 7 + Math.min(kwNorm.length, 16);
      matchedKeywords.push(keyword);
    }
  }

  for (const token of tokens) {
    if (!token) continue;
    if (nameNorm.includes(token)) score += 4 + token.length;
    for (const alias of profile.aliases || []) {
      const aliasNorm = normalizeOemSpecText(alias);
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
 *   name: string,
 *   type: string,
 *   score: number,
 *   matchedKeywords: string[],
 *   profile: typeof oemSpecKnowledge[string],
 * }>}
 */
export function detectOemSpecIntent(inputText) {
  const normalizedInput = normalizeOemSpecText(inputText);
  if (!normalizedInput) return [];

  const tokens = tokenizeOemSpecQuery(inputText);
  /** @type {ReturnType<typeof detectOemSpecIntent>} */
  const matches = [];

  for (const [profileId, profile] of Object.entries(oemSpecKnowledge)) {
    const { score, matchedKeywords } = scoreOemSpecMatch(
      profileId,
      profile,
      normalizedInput,
      tokens
    );
    if (score < MATCH_THRESHOLD) continue;
    matches.push({
      id: profileId,
      name: profile.name,
      type: profile.type,
      score,
      matchedKeywords,
      profile,
    });
  }

  return matches.sort((a, b) => b.score - a.score);
}

/**
 * @param {unknown} inputTextOrKey
 * @returns {typeof oemSpecKnowledge[string] | null}
 */
function getOemSpecProfile(inputTextOrKey) {
  const raw = String(inputTextOrKey ?? "").trim();
  if (!raw) return null;

  if (oemSpecKnowledge[raw]) return oemSpecKnowledge[raw];

  const matches = detectOemSpecIntent(raw);
  return matches[0]?.profile || null;
}

/**
 * @param {typeof oemSpecKnowledge[string]} profile
 * @param {number} [limit]
 */
function scanPdsForProfile(profile, limit = 12) {
  const searchTerms = [
    ...new Set([
      ...(profile.specSearchTerms || []),
      normalizeOemSpecText(profile.name),
      ...(profile.aliases || []).map((a) => normalizeOemSpecText(a)).filter((a) => a.length >= 4),
    ]),
  ].filter(Boolean);

  /** @type {Array<{
 *   productName: string,
 *   url: string,
 *   why: string,
 *   matchedSpecs: string[],
 *   matchStatus: "confirmed",
 * }>} */
  const products = [];

  for (const [productName, entry] of Object.entries(PDS_MAP)) {
    if (!entry || typeof entry !== "object") continue;

    const specs = Array.isArray(entry.specs) ? entry.specs : [];
    const matchedSpecs = specs.filter((line) => specLineMatchesSearchTerms(line, searchTerms));

    if (!matchedSpecs.length) continue;

    products.push({
      productName,
      url: String(entry.url || ""),
      why: String(entry.why || ""),
      matchedSpecs,
      matchStatus: "confirmed",
    });
  }

  return products
    .sort((a, b) => b.matchedSpecs.length - a.matchedSpecs.length || a.productName.localeCompare(b.productName))
    .slice(0, limit);
}

/**
 * @param {unknown} inputText
 * @returns {{
 *   ok: boolean,
 *   question: string,
 *   profileId: string | null,
 *   name: string,
 *   type: string,
 *   aliases: string[],
 *   relatedSpecs: string[],
 *   applicationCategory: string,
 *   explanation: string,
 *   productCategoriesToConsider: string[],
 *   products: Array<{
 *     productName: string,
 *     url: string,
 *     why: string,
 *     matchedSpecs: string[],
 *     matchStatus: string,
 *   }>,
 *   productMatchStatus: "confirmed" | "needs_confirmation",
 *   questionsToAsk: string[],
 *   repTalkTrack: string,
 *   cautionNotes: string[],
 *   confidence: number,
 *   message: string,
 * }}
 */
export function findProductsByOemSpec(inputText) {
  const question = String(inputText ?? "").trim();
  const matches = detectOemSpecIntent(question);

  const empty = {
    ok: false,
    question,
    profileId: null,
    name: "",
    type: "",
    aliases: [],
    relatedSpecs: [],
    applicationCategory: "",
    explanation: "",
    productCategoriesToConsider: [],
    products: [],
    productMatchStatus: /** @type {"needs_confirmation"} */ ("needs_confirmation"),
    questionsToAsk: [],
    repTalkTrack: "",
    cautionNotes: [],
    confidence: 0,
    message: "",
  };

  if (!question) {
    return {
      ...empty,
      message:
        "Ask about an OEM or spec—e.g. Cummins CES 20086, Allison TES-295, API CK-4, Dexron VI, or Mercon LV.",
    };
  }

  if (!matches.length) {
    return {
      ...empty,
      message:
        "No indexed OEM/spec profile matched. Try Allison, Ford, CAT, Cummins, Detroit, Volvo, Mack, API CK-4, Dexron, or Mercon.",
    };
  }

  const primary = matches[0].profile;
  const products = scanPdsForProfile(primary);
  const productMatchStatus = products.length ? "confirmed" : "needs_confirmation";
  const confidence = Math.min(1, matches[0].score / 34);

  return {
    ok: true,
    question,
    profileId: matches[0].id,
    name: primary.name,
    type: primary.type,
    aliases: primary.aliases || [],
    relatedSpecs: primary.relatedSpecs || [],
    applicationCategory: primary.applicationCategory || "",
    explanation: primary.explanation || "",
    productCategoriesToConsider: primary.productCategoriesToConsider || [],
    products,
    productMatchStatus,
    questionsToAsk: primary.questionsToAsk || [],
    repTalkTrack: primary.repTalkTrack || "",
    cautionNotes: primary.cautionNotes || [],
    confidence,
    message:
      productMatchStatus === "confirmed"
        ? `Matched ${primary.name}; ${products.length} Klondike product(s) explicitly list related specs on the current PDS index.`
        : `Matched ${primary.name}, but no Klondike product in the current PDS index explicitly lists that OEM/spec—needs confirmation before quoting.`,
  };
}

/**
 * @param {unknown} inputText
 * @returns {ReturnType<typeof findProductsByOemSpec>}
 */
export function buildOemSpecAdvisorResponse(inputText) {
  return findProductsByOemSpec(inputText);
}

/**
 * @param {unknown} inputText
 * @returns {{
 *   ok: boolean,
 *   question: string,
 *   profileId: string | null,
 *   name: string,
 *   questions: string[],
 *   message: string,
 * }}
 */
export function buildOemSpecQuestionsToAsk(inputText) {
  const response = findProductsByOemSpec(inputText);

  if (!response.ok) {
    return {
      ok: false,
      question: response.question,
      profileId: null,
      name: "",
      questions: [],
      message: response.message,
    };
  }

  const questions = [...new Set(response.questionsToAsk || [])].slice(0, 8);

  if (response.productMatchStatus === "needs_confirmation") {
    questions.push(
      "Can you share the dipstick, fill-cap, or OEM spec sheet so we can confirm the exact approval?"
    );
  }

  return {
    ok: true,
    question: response.question,
    profileId: response.profileId,
    name: response.name,
    questions: [...new Set(questions)].slice(0, 8),
    message: response.message,
  };
}

export { getOemSpecProfile, normalizeOemSpecText, scanPdsForProfile };

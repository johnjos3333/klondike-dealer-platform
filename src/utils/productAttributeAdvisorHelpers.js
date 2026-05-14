/**
 * Product attribute advisor helpers — deterministic intent detection and advisor responses.
 * Plain JavaScript only; not wired to UI yet.
 */

import { productAttributeKnowledge } from "../data/productAttributeKnowledge.js";

const MATCH_THRESHOLD = 6;

/** @param {unknown} raw */
function normalizeAttributeText(raw) {
  return String(raw ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9#]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** @param {unknown} query */
function tokenizeAttributeQuery(query) {
  const n = normalizeAttributeText(query);
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
 * @param {string} profileId
 * @param {typeof productAttributeKnowledge[string]} profile
 * @param {string} normalizedInput
 * @param {string[]} tokens
 */
function scoreAttributeMatch(profileId, profile, normalizedInput, tokens) {
  let score = 0;
  /** @type {string[]} */
  const matchedKeywords = [];

  const carryPhrases = [
    "does klondike carry",
    "do you carry",
    "do you have",
    "does klondike have",
    "what products",
    "klondike products with",
  ];
  for (const phrase of carryPhrases) {
    if (normalizedInput.includes(phrase)) {
      score += 5;
      matchedKeywords.push(phrase);
    }
  }

  const idPhrase = normalizeAttributeText(camelToWords(profileId));
  if (idPhrase && normalizedInput.includes(idPhrase)) {
    score += 10 + idPhrase.length;
    matchedKeywords.push(idPhrase);
  }

  const attributeNorm = normalizeAttributeText(profile.attribute);
  if (attributeNorm && normalizedInput.includes(attributeNorm)) {
    score += 14 + Math.min(attributeNorm.length, 24);
    matchedKeywords.push(profile.attribute);
  }

  for (const alias of profile.aliases || []) {
    const aliasNorm = normalizeAttributeText(alias);
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

  for (const example of profile.questionExamples || []) {
    const exNorm = normalizeAttributeText(example);
    if (exNorm.length >= 10 && normalizedInput.includes(exNorm)) {
      score += 8;
      matchedKeywords.push(example);
    }
  }

  for (const keyword of profile.keywords || []) {
    const kwNorm = normalizeAttributeText(keyword);
    if (!kwNorm) continue;
    if (normalizedInput.includes(kwNorm)) {
      score += 7 + Math.min(kwNorm.length, 16);
      matchedKeywords.push(keyword);
    }
  }

  for (const token of tokens) {
    if (!token) continue;
    if (attributeNorm.includes(token)) score += 4 + token.length;
    for (const alias of profile.aliases || []) {
      const aliasNorm = normalizeAttributeText(alias);
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
 *   title: string,
 *   score: number,
 *   matchedKeywords: string[],
 *   profile: typeof productAttributeKnowledge[string],
 * }>}
 */
export function detectProductAttributeIntent(inputText) {
  const normalizedInput = normalizeAttributeText(inputText);
  if (!normalizedInput) return [];

  const tokens = tokenizeAttributeQuery(inputText);
  /** @type {ReturnType<typeof detectProductAttributeIntent>} */
  const matches = [];

  for (const [profileId, profile] of Object.entries(productAttributeKnowledge)) {
    const { score, matchedKeywords } = scoreAttributeMatch(
      profileId,
      profile,
      normalizedInput,
      tokens
    );
    if (score < MATCH_THRESHOLD) continue;
    matches.push({
      id: profileId,
      title: profile.attribute,
      score,
      matchedKeywords,
      profile,
    });
  }

  return matches.sort((a, b) => b.score - a.score);
}

/**
 * @param {unknown} inputTextOrKey
 * @returns {typeof productAttributeKnowledge[string] | null}
 */
export function getProductAttributeProfile(inputTextOrKey) {
  const raw = String(inputTextOrKey ?? "").trim();
  if (!raw) return null;

  if (productAttributeKnowledge[raw]) {
    return productAttributeKnowledge[raw];
  }

  const normalizedKey = normalizeAttributeText(raw).replace(/\s+/g, "");
  for (const [id, profile] of Object.entries(productAttributeKnowledge)) {
    if (normalizeAttributeText(id) === normalizedKey) return profile;
    if (normalizeAttributeText(camelToWords(id)) === normalizeAttributeText(raw)) return profile;
    if (normalizeAttributeText(profile.attribute) === normalizeAttributeText(raw)) return profile;
  }

  const matches = detectProductAttributeIntent(raw);
  return matches[0]?.profile || null;
}

/**
 * @param {string} id
 * @param {string} title
 * @param {string} [body]
 * @param {string[]} [items]
 */
function section(id, title, body, items) {
  return { id, title, ...(body ? { body } : {}), ...(items?.length ? { items } : {}) };
}

/**
 * @param {unknown} inputText
 * @returns {{
 *   ok: boolean,
 *   profileId: string | null,
 *   confidence: number,
 *   title: string,
 *   directAnswer: string,
 *   sections: Array<{ id: string, title: string, body?: string, items?: string[] }>,
 *   followUpQuestions: string[],
 *   sourceBadges: string[],
 *   cautionNotes: string[],
 *   message: string,
 * }}
 */
export function buildProductAttributeResponse(inputText) {
  const question = String(inputText ?? "").trim();
  const matches = detectProductAttributeIntent(question);

  const empty = {
    ok: false,
    profileId: null,
    confidence: 0,
    title: "",
    directAnswer: "",
    sections: [],
    followUpQuestions: [],
    sourceBadges: ["Product attribute intelligence"],
    cautionNotes: [],
    message: "",
  };

  if (!question) {
    return {
      ...empty,
      message:
        "Ask whether KLONDIKE carries a product attribute—e.g. food-grade, biodegradable hydraulic, calcium sulfonate grease, UTF wet brake, or synthetic CK-4.",
    };
  }

  if (!matches.length) {
    return {
      ...empty,
      message:
        "No indexed product attribute matched. Try food grade, EAL, zinc-free hydraulic, moly grease, open gear, natural gas engine oil, or compressor oil.",
    };
  }

  const primary = matches[0].profile;
  const confidence = Math.min(1, matches[0].score / 34);

  const confirmBeforeUse = [
    ...(primary.pdsProofRequired
      ? ["Confirm attribute claims on the current PDS revision before quoting or converting bulk programs."]
      : []),
    ...(primary.confirmedKlondikeProducts.length === 0
      ? ["No confirmed KLONDIKE SKU in the indexed library for this attribute—escalate to technical/PDS confirmation."]
      : []),
    ...(primary.cautionNotes || []),
  ];

  const sections = [
    section("whatItMeans", "What It Means", primary.whatItMeans),
    section("whyCustomersAsk", "Why Customers Ask", primary.whyCustomersAsk),
    section(
      "likelyProductCategories",
      "Likely Product Categories",
      "",
      (primary.likelyProductCategories || []).map((c) => c.replace(/_/g, " "))
    ),
    section(
      "confirmedKlondikeProducts",
      "Confirmed KLONDIKE Products",
      primary.confirmedKlondikeProducts.length
        ? "Products listed below are grounded on indexed PDS / spotlight map data in this platform."
        : "No KLONDIKE product in the indexed PDS library explicitly confirms this attribute—needs technical/PDS confirmation.",
      primary.confirmedKlondikeProducts
    ),
    section(
      "productsToVerify",
      "Products to Verify",
      "",
      primary.possibleKlondikeProductsToVerify
    ),
    section("questionsToAsk", "Questions to Ask", "", primary.questionsToAsk),
    section("repTalkTrack", "Rep Talk Track", primary.repTalkTrack),
    section("confirmBeforeUse", "Confirm Before Use", "", confirmBeforeUse),
  ].filter((s) => s.body || (s.items && s.items.length > 0));

  return {
    ok: true,
    profileId: matches[0].id,
    confidence,
    title: primary.attribute,
    directAnswer: primary.directAnswer,
    sections,
    followUpQuestions: primary.questionsToAsk || [],
    sourceBadges: ["Product attribute intelligence", "PDS library match"],
    cautionNotes: primary.cautionNotes || [],
    message: `Matched product attribute: ${primary.attribute}.`,
  };
}

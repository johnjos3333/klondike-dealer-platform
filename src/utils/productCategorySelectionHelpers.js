/**
 * Product category selection helpers — deterministic intent detection and advisor responses.
 * Plain JavaScript only; not wired to UI.
 */

import { productCategorySelectionKnowledge } from "../data/productCategorySelectionKnowledge.js";

const MATCH_THRESHOLD = 6;

/** @param {unknown} raw */
function normalizeCategoryText(raw) {
  return String(raw ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9#]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** @param {unknown} query */
function tokenizeCategoryQuery(query) {
  const n = normalizeCategoryText(query);
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
 * @param {typeof productCategorySelectionKnowledge[string]} profile
 * @param {string} normalizedInput
 * @param {string[]} tokens
 */
function scoreCategoryMatch(profileId, profile, normalizedInput, tokens) {
  let score = 0;
  /** @type {string[]} */
  const matchedKeywords = [];

  const idPhrase = normalizeCategoryText(camelToWords(profileId));
  if (idPhrase && normalizedInput.includes(idPhrase)) {
    score += 10 + idPhrase.length;
    matchedKeywords.push(idPhrase);
  }

  const categoryNorm = normalizeCategoryText(profile.category);
  if (categoryNorm && normalizedInput.includes(categoryNorm)) {
    score += 14 + Math.min(categoryNorm.length, 24);
    matchedKeywords.push(profile.category);
  }

  for (const alias of profile.aliases || []) {
    const aliasNorm = normalizeCategoryText(alias);
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
    const exNorm = normalizeCategoryText(example);
    if (exNorm.length >= 10 && normalizedInput.includes(exNorm)) {
      score += 8;
      matchedKeywords.push(example);
    }
  }

  for (const keyword of profile.keywords || []) {
    const kwNorm = normalizeCategoryText(keyword);
    if (!kwNorm) continue;
    if (normalizedInput.includes(kwNorm)) {
      score += 7 + Math.min(kwNorm.length, 16);
      matchedKeywords.push(keyword);
    }
  }

  for (const token of tokens) {
    if (!token) continue;
    if (categoryNorm.includes(token)) score += 4 + token.length;
    for (const alias of profile.aliases || []) {
      const aliasNorm = normalizeCategoryText(alias);
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
 *   category: string,
 *   score: number,
 *   matchedKeywords: string[],
 *   profile: typeof productCategorySelectionKnowledge[string],
 * }>}
 */
export function detectProductCategorySelectionIntent(inputText) {
  const normalizedInput = normalizeCategoryText(inputText);
  if (!normalizedInput) return [];

  const tokens = tokenizeCategoryQuery(inputText);
  /** @type {ReturnType<typeof detectProductCategorySelectionIntent>} */
  const matches = [];

  for (const [profileId, profile] of Object.entries(productCategorySelectionKnowledge)) {
    const { score, matchedKeywords } = scoreCategoryMatch(
      profileId,
      profile,
      normalizedInput,
      tokens
    );
    if (score < MATCH_THRESHOLD) continue;
    matches.push({
      id: profileId,
      category: profile.category,
      score,
      matchedKeywords,
      profile,
    });
  }

  return matches.sort((a, b) => b.score - a.score);
}

/**
 * @param {unknown} inputTextOrKey
 * @returns {typeof productCategorySelectionKnowledge[string] | null}
 */
export function getProductCategorySelectionProfile(inputTextOrKey) {
  const raw = String(inputTextOrKey ?? "").trim();
  if (!raw) return null;

  if (productCategorySelectionKnowledge[raw]) {
    return productCategorySelectionKnowledge[raw];
  }

  const normalizedKey = normalizeCategoryText(raw).replace(/\s+/g, "");
  for (const [id, profile] of Object.entries(productCategorySelectionKnowledge)) {
    if (normalizeCategoryText(id) === normalizedKey) return profile;
    if (normalizeCategoryText(camelToWords(id)) === normalizeCategoryText(raw)) return profile;
  }

  const matches = detectProductCategorySelectionIntent(raw);
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
export function buildProductCategorySelectionResponse(inputText) {
  const question = String(inputText ?? "").trim();
  const matches = detectProductCategorySelectionIntent(question);

  const empty = {
    ok: false,
    profileId: null,
    confidence: 0,
    title: "",
    directAnswer: "",
    sections: [],
    followUpQuestions: [],
    sourceBadges: ["Product category selection"],
    cautionNotes: [],
    message: "",
  };

  if (!question) {
    return {
      ...empty,
      message:
        "Ask about a product category—e.g. hydraulic fluid, grease, CK-4 engine oil, ATF, UTF, coolant, or food-grade lubricant.",
    };
  }

  if (!matches.length) {
    return {
      ...empty,
      message:
        "No indexed product category matched. Try hydraulic fluid, grease, heavy-duty engine oil, gear oil, ATF, UTF, compressor oil, coolant, food-grade, or open gear lubricant.",
    };
  }

  const primary = matches[0].profile;
  const confidence = Math.min(1, matches[0].score / 34);

  const sections = [
    section("selectionFactors", "Key Selection Factors", "", primary.selectionFactors),
    section("criticalSpecs", "Specs to Confirm", "", primary.criticalSpecsToConfirm),
    section(
      "operatingConditions",
      "Operating Conditions to Ask About",
      "",
      primary.operatingConditionsToAskAbout
    ),
    section("commonMistakes", "Common Mistakes", "", primary.commonMistakes),
    section("failureRisks", "Failure Risks", "", primary.failureRisks),
    section("relatedEquipment", "Related Equipment", "", primary.relatedEquipment),
    section(
      "klondikeFit",
      "KLONDIKE Product Category Fit",
      "",
      primary.klondikeProductCategories
    ),
    section("upgradeOpportunities", "Upgrade Opportunities", "", primary.upgradeOpportunities),
    section("repTalkTrack", "Rep Talk Track", primary.repTalkTrack),
    section("questionsToAsk", "Questions to Ask", "", primary.questionsToAsk),
  ].filter((s) => s.body || (s.items && s.items.length > 0));

  return {
    ok: true,
    profileId: matches[0].id,
    confidence,
    title: primary.category,
    directAnswer: primary.directAnswer,
    sections,
    followUpQuestions: primary.questionsToAsk || [],
    sourceBadges: ["Product category selection", "Training guidance"],
    cautionNotes: primary.cautionNotes || [],
    message: `Matched product category: ${primary.category}.`,
  };
}

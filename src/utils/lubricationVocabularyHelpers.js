/**
 * Lubrication vocabulary helpers — deterministic field slang detection and advisor responses.
 * Plain JavaScript only; not wired to UI yet.
 */

import { lubricationVocabularyKnowledge } from "../data/lubricationVocabularyKnowledge.js";

const MATCH_THRESHOLD = 6;

/**
 * @param {unknown} raw
 * @returns {string}
 */
export function normalizeLubricationVocabulary(raw) {
  return String(raw ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9#]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** @param {unknown} query */
function tokenizeVocabularyQuery(query) {
  const n = normalizeLubricationVocabulary(query);
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
 * @param {string} entryId
 * @param {typeof lubricationVocabularyKnowledge[string]} entry
 * @param {string} normalizedInput
 * @param {string[]} tokens
 */
function scoreVocabularyMatch(entryId, entry, normalizedInput, tokens) {
  let score = 0;
  /** @type {string[]} */
  const matchedKeywords = [];

  const idPhrase = normalizeLubricationVocabulary(camelToWords(entryId));
  if (idPhrase && normalizedInput.includes(idPhrase)) {
    score += 10 + idPhrase.length;
    matchedKeywords.push(idPhrase);
  }

  const fieldNorm = normalizeLubricationVocabulary(entry.fieldTerm);
  if (fieldNorm && normalizedInput.includes(fieldNorm)) {
    score += 14 + Math.min(fieldNorm.length, 24);
    matchedKeywords.push(entry.fieldTerm);
  }

  for (const alias of entry.aliases || []) {
    const aliasNorm = normalizeLubricationVocabulary(alias);
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

  for (const keyword of entry.keywords || []) {
    const kwNorm = normalizeLubricationVocabulary(keyword);
    if (!kwNorm) continue;
    if (normalizedInput.includes(kwNorm)) {
      score += 7 + Math.min(kwNorm.length, 16);
      matchedKeywords.push(keyword);
    }
  }

  for (const token of tokens) {
    if (!token) continue;
    if (fieldNorm.includes(token)) score += 4 + token.length;
    for (const alias of entry.aliases || []) {
      const aliasNorm = normalizeLubricationVocabulary(alias);
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
 *   entry: typeof lubricationVocabularyKnowledge[string],
 * }>}
 */
export function detectVocabularyIntent(inputText) {
  const normalizedInput = normalizeLubricationVocabulary(inputText);
  if (!normalizedInput) return [];

  const tokens = tokenizeVocabularyQuery(inputText);
  /** @type {ReturnType<typeof detectVocabularyIntent>} */
  const matches = [];

  for (const [entryId, entry] of Object.entries(lubricationVocabularyKnowledge)) {
    const { score, matchedKeywords } = scoreVocabularyMatch(
      entryId,
      entry,
      normalizedInput,
      tokens
    );
    if (score < MATCH_THRESHOLD) continue;
    matches.push({
      id: entryId,
      title: entry.fieldTerm,
      score,
      matchedKeywords,
      entry,
    });
  }

  return matches.sort((a, b) => b.score - a.score);
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
 *   entryId: string | null,
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
export function buildVocabularyResponse(inputText) {
  const question = String(inputText ?? "").trim();
  const matches = detectVocabularyIntent(question);

  const empty = {
    ok: false,
    entryId: null,
    confidence: 0,
    title: "",
    directAnswer: "",
    sections: [],
    followUpQuestions: [],
    sourceBadges: ["Field vocabulary"],
    cautionNotes: [],
    message: "",
  };

  if (!question) {
    return {
      ...empty,
      message:
        "Ask about field slang—e.g. wet kit oil, way lube, rock drill oil, fifth wheel grease, or heat transfer fluid.",
    };
  }

  if (!matches.length) {
    return {
      ...empty,
      message:
        "No indexed vocabulary term matched. Try drip oil, slideway oil, circulating oil, quench oil, or cotton picker grease.",
    };
  }

  const primary = matches[0].entry;
  const confidence = Math.min(1, matches[0].score / 34);

  const confirmBeforeUse = [
    "Translate field language to OEM/PDS requirements before quoting any SKU.",
    ...(primary.cautionNotes || []),
  ];

  const sections = [
    section(
      "whatThisUsuallyRefersTo",
      "What This Usually Refers To",
      `${primary.normalizedCategory}. ${primary.explanation}`
    ),
    section("relatedApplications", "Related Applications", "", primary.relatedApplications),
    section("likelyIndustries", "Likely Industries", "", primary.likelyIndustries),
    section(
      "likelyKlondikeCategories",
      "KLONDIKE Product Categories",
      "Use as search guidance only—confirm exact product on current PDS for the application.",
      primary.likelyKlondikeCategories
    ),
    section("commonMisunderstandings", "Common Misunderstandings", "", primary.commonMisunderstandings),
    section("questionsToAsk", "Questions to Ask", "", primary.questionsToAsk),
    section("confirmBeforeUse", "Confirm Before Use", "", confirmBeforeUse),
  ].filter((s) => s.body || (s.items && s.items.length > 0));

  return {
    ok: true,
    entryId: matches[0].id,
    confidence,
    title: `Field term: ${primary.fieldTerm}`,
    directAnswer: primary.explanation,
    sections,
    followUpQuestions: primary.questionsToAsk || [],
    sourceBadges: ["Field vocabulary", "Training guidance"],
    cautionNotes: primary.cautionNotes || [],
    message: `Matched vocabulary: ${primary.fieldTerm}.`,
  };
}

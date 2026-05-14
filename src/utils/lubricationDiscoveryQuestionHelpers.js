/**
 * Lubrication discovery-question helpers — deterministic intent detection and advisor responses.
 * Plain JavaScript only; not wired to UI yet.
 */

import { lubricationDiscoveryQuestionKnowledge } from "../data/lubricationDiscoveryQuestionKnowledge.js";

const MATCH_THRESHOLD = 6;

/** @param {unknown} raw */
function normalizeDiscoveryText(raw) {
  return String(raw ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9#]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** @param {unknown} query */
function tokenizeDiscoveryQuery(query) {
  const n = normalizeDiscoveryText(query);
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
 * @param {typeof lubricationDiscoveryQuestionKnowledge[string]} profile
 * @param {string} normalizedInput
 * @param {string[]} tokens
 */
function scoreDiscoveryMatch(profileId, profile, normalizedInput, tokens) {
  let score = 0;
  /** @type {string[]} */
  const matchedKeywords = [];

  const discoveryPhrases = [
    "what should i ask",
    "what questions should i ask",
    "what to ask",
    "questions to ask",
    "what do i ask",
    "discovery questions",
    "before recommending",
    "before choosing",
  ];
  for (const phrase of discoveryPhrases) {
    if (normalizedInput.includes(phrase)) {
      score += 6;
      matchedKeywords.push(phrase);
    }
  }

  const idPhrase = normalizeDiscoveryText(camelToWords(profileId));
  if (idPhrase && normalizedInput.includes(idPhrase)) {
    score += 10 + idPhrase.length;
    matchedKeywords.push(idPhrase);
  }

  const titleNorm = normalizeDiscoveryText(profile.title);
  if (titleNorm && normalizedInput.includes(titleNorm)) {
    score += 14 + Math.min(titleNorm.length, 24);
    matchedKeywords.push(profile.title);
  }

  for (const alias of profile.aliases || []) {
    const aliasNorm = normalizeDiscoveryText(alias);
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
    const exNorm = normalizeDiscoveryText(example);
    if (exNorm.length >= 10 && normalizedInput.includes(exNorm)) {
      score += 8;
      matchedKeywords.push(example);
    }
  }

  for (const keyword of profile.keywords || []) {
    const kwNorm = normalizeDiscoveryText(keyword);
    if (!kwNorm) continue;
    if (normalizedInput.includes(kwNorm)) {
      score += 7 + Math.min(kwNorm.length, 16);
      matchedKeywords.push(keyword);
    }
  }

  for (const token of tokens) {
    if (!token) continue;
    if (titleNorm.includes(token)) score += 4 + token.length;
    for (const alias of profile.aliases || []) {
      const aliasNorm = normalizeDiscoveryText(alias);
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
 *   profile: typeof lubricationDiscoveryQuestionKnowledge[string],
 * }>}
 */
export function detectDiscoveryQuestionIntent(inputText) {
  const normalizedInput = normalizeDiscoveryText(inputText);
  if (!normalizedInput) return [];

  const tokens = tokenizeDiscoveryQuery(inputText);
  /** @type {ReturnType<typeof detectDiscoveryQuestionIntent>} */
  const matches = [];

  for (const [profileId, profile] of Object.entries(lubricationDiscoveryQuestionKnowledge)) {
    const { score, matchedKeywords } = scoreDiscoveryMatch(
      profileId,
      profile,
      normalizedInput,
      tokens
    );
    if (score < MATCH_THRESHOLD) continue;
    matches.push({
      id: profileId,
      title: profile.title,
      score,
      matchedKeywords,
      profile,
    });
  }

  return matches.sort((a, b) => b.score - a.score);
}

/**
 * @param {unknown} inputTextOrKey
 * @returns {typeof lubricationDiscoveryQuestionKnowledge[string] | null}
 */
export function getDiscoveryQuestionProfile(inputTextOrKey) {
  const raw = String(inputTextOrKey ?? "").trim();
  if (!raw) return null;

  if (lubricationDiscoveryQuestionKnowledge[raw]) {
    return lubricationDiscoveryQuestionKnowledge[raw];
  }

  const normalizedKey = normalizeDiscoveryText(raw).replace(/\s+/g, "");
  for (const [id, profile] of Object.entries(lubricationDiscoveryQuestionKnowledge)) {
    if (normalizeDiscoveryText(id) === normalizedKey) return profile;
    if (normalizeDiscoveryText(camelToWords(id)) === normalizeDiscoveryText(raw)) return profile;
  }

  const matches = detectDiscoveryQuestionIntent(raw);
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
export function buildDiscoveryQuestionResponse(inputText) {
  const question = String(inputText ?? "").trim();
  const matches = detectDiscoveryQuestionIntent(question);

  const empty = {
    ok: false,
    profileId: null,
    confidence: 0,
    title: "",
    directAnswer: "",
    sections: [],
    followUpQuestions: [],
    sourceBadges: ["Discovery questions"],
    cautionNotes: [],
    message: "",
  };

  if (!question) {
    return {
      ...empty,
      message:
        "Ask what you should discover before recommending a product—e.g. hydraulic oil, grease, gear oil, fleet engine oil, quarry visit, or OEM spec confirmation.",
    };
  }

  if (!matches.length) {
    return {
      ...empty,
      message:
        "No indexed discovery profile matched. Try 'what should I ask before recommending hydraulic oil', 'quarry customer questions', 'fleet customer', 'wet brake chatter', or 'gear oil questions'.",
    };
  }

  const primary = matches[0].profile;
  const confidence = Math.min(1, matches[0].score / 34);

  const sections = [
    section("mustAskQuestions", "Must-Ask Questions", "", primary.mustAskQuestions),
    section("helpfulFollowUps", "Helpful Follow-Ups", "", primary.helpfulFollowUps),
    section("redFlagQuestions", "Red Flags", "", primary.redFlagQuestions),
    section(
      "applicationDetailsToCapture",
      "Application Details to Capture",
      "",
      primary.applicationDetailsToCapture
    ),
    section(
      "customerPainSignalsToListenFor",
      "Pain Signals to Listen For",
      "",
      primary.customerPainSignalsToListenFor
    ),
    section(
      "decisionMakerQuestions",
      "Decision Maker Questions",
      "",
      primary.decisionMakerQuestions
    ),
    section("klondikeTieIn", "KLONDIKE Tie-In", primary.klondikeTieIn),
    section("repTalkTrack", "Rep Talk Track", primary.repTalkTrack),
  ].filter((s) => s.body || (s.items && s.items.length > 0));

  return {
    ok: true,
    profileId: matches[0].id,
    confidence,
    title: primary.title,
    directAnswer: primary.directAnswer,
    sections,
    followUpQuestions: primary.mustAskQuestions || [],
    sourceBadges: ["Discovery questions", "Sales enablement"],
    cautionNotes: primary.cautionNotes || [],
    message: `Matched discovery profile: ${primary.title}.`,
  };
}

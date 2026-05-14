/**
 * Lubricant compatibility helpers — deterministic intent detection and advisor responses.
 * Plain JavaScript only; not wired to UI yet.
 */

import { lubricantCompatibilityKnowledge } from "../data/lubricantCompatibilityKnowledge.js";

const MATCH_THRESHOLD = 6;

/** @param {unknown} raw */
function normalizeCompatibilityText(raw) {
  return String(raw ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9#]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** @param {unknown} query */
function tokenizeCompatibilityQuery(query) {
  const n = normalizeCompatibilityText(query);
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
 * @param {typeof lubricantCompatibilityKnowledge[string]} profile
 * @param {string} normalizedInput
 * @param {string[]} tokens
 */
function scoreCompatibilityMatch(profileId, profile, normalizedInput, tokens) {
  let score = 0;
  /** @type {string[]} */
  const matchedKeywords = [];

  const idPhrase = normalizeCompatibilityText(camelToWords(profileId));
  if (idPhrase && normalizedInput.includes(idPhrase)) {
    score += 10 + idPhrase.length;
    matchedKeywords.push(idPhrase);
  }

  const titleNorm = normalizeCompatibilityText(profile.title);
  if (titleNorm && normalizedInput.includes(titleNorm)) {
    score += 14 + Math.min(titleNorm.length, 24);
    matchedKeywords.push(profile.title);
  }

  for (const alias of profile.aliases || []) {
    const aliasNorm = normalizeCompatibilityText(alias);
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
    const exNorm = normalizeCompatibilityText(example);
    if (exNorm.length >= 10 && normalizedInput.includes(exNorm)) {
      score += 8;
      matchedKeywords.push(example);
    }
  }

  for (const keyword of profile.keywords || []) {
    const kwNorm = normalizeCompatibilityText(keyword);
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
      const aliasNorm = normalizeCompatibilityText(alias);
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
 *   profile: typeof lubricantCompatibilityKnowledge[string],
 * }>}
 */
export function detectCompatibilityIntent(inputText) {
  const normalizedInput = normalizeCompatibilityText(inputText);
  if (!normalizedInput) return [];

  const tokens = tokenizeCompatibilityQuery(inputText);
  /** @type {ReturnType<typeof detectCompatibilityIntent>} */
  const matches = [];

  for (const [profileId, profile] of Object.entries(lubricantCompatibilityKnowledge)) {
    const { score, matchedKeywords } = scoreCompatibilityMatch(
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
 * @returns {typeof lubricantCompatibilityKnowledge[string] | null}
 */
export function getCompatibilityProfile(inputTextOrKey) {
  const raw = String(inputTextOrKey ?? "").trim();
  if (!raw) return null;

  if (lubricantCompatibilityKnowledge[raw]) {
    return lubricantCompatibilityKnowledge[raw];
  }

  const normalizedKey = normalizeCompatibilityText(raw).replace(/\s+/g, "");
  for (const [id, profile] of Object.entries(lubricantCompatibilityKnowledge)) {
    if (normalizeCompatibilityText(id) === normalizedKey) return profile;
    if (normalizeCompatibilityText(camelToWords(id)) === normalizeCompatibilityText(raw)) return profile;
  }

  const matches = detectCompatibilityIntent(raw);
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
export function buildCompatibilityResponse(inputText) {
  const question = String(inputText ?? "").trim();
  const matches = detectCompatibilityIntent(question);

  const empty = {
    ok: false,
    profileId: null,
    confidence: 0,
    title: "",
    directAnswer: "",
    sections: [],
    followUpQuestions: [],
    sourceBadges: ["Compatibility guidance"],
    cautionNotes: [],
    message: "",
  };

  if (!question) {
    return {
      ...empty,
      message:
        "Ask about lubricant compatibility—e.g. mixing greases, synthetic and conventional oil, hydraulic fluids, coolant, or ATF.",
    };
  }

  if (!matches.length) {
    return {
      ...empty,
      message:
        "No indexed compatibility profile matched. Try grease mixing, lithium vs calcium sulfonate, hydraulic fluid compatibility, coolant mixing, ATF, or water contamination.",
    };
  }

  const primary = matches[0].profile;
  const confidence = Math.min(1, matches[0].score / 34);

  const sections = [
    section("compatibilitySummary", "Compatibility Summary", primary.compatibilitySummary),
    section("risks", "Risks", "", primary.risks),
    section("operationalConsequences", "Operational Consequences", "", primary.operationalConsequences),
    section("safePractices", "Safe Practices", "", primary.safePractices),
    section("whenToAvoidMixing", "When to Avoid Mixing", "", primary.whenToAvoidMixing),
    section("troubleshootingSignals", "Troubleshooting Signals", "", primary.troubleshootingSignals),
    section("relatedApplications", "Related Applications", "", primary.relatedApplications),
    section("relatedFailureModes", "Related Failure Modes", "", primary.relatedFailureModes),
    section("questionsToAsk", "Questions to Ask", "", primary.questionsToAsk),
    section("repTalkTrack", "Rep Talk Track", primary.repTalkTrack),
  ].filter((s) => s.body || (s.items && s.items.length > 0));

  return {
    ok: true,
    profileId: matches[0].id,
    confidence,
    title: primary.title,
    directAnswer: primary.directAnswer,
    sections,
    followUpQuestions: primary.questionsToAsk || [],
    sourceBadges: ["Compatibility guidance", "Training guidance"],
    cautionNotes: primary.cautionNotes || [],
    message: `Matched compatibility topic: ${primary.title}.`,
  };
}

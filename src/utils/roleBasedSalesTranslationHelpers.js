/**
 * Role-based sales translation helpers — deterministic intent detection and advisor responses.
 * Plain JavaScript only; not wired to UI yet.
 */

import { roleBasedSalesTranslationKnowledge } from "../data/roleBasedSalesTranslationKnowledge.js";

const MATCH_THRESHOLD = 6;

/** @param {unknown} raw */
function normalizeRoleSalesText(raw) {
  return String(raw ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9#]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** @param {unknown} query */
function tokenizeRoleSalesQuery(query) {
  const n = normalizeRoleSalesText(query);
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
 * @param {typeof roleBasedSalesTranslationKnowledge[string]} profile
 * @param {string} normalizedInput
 * @param {string[]} tokens
 */
function scoreRoleSalesMatch(profileId, profile, normalizedInput, tokens) {
  let score = 0;
  /** @type {string[]} */
  const matchedKeywords = [];

  const rolePhrases = [
    "how to talk to",
    "how to sell to",
    "talking to",
    "speak to",
    "sales translation",
    "what does care about",
    "frame value for",
    "objections from",
  ];
  for (const phrase of rolePhrases) {
    if (normalizedInput.includes(phrase)) {
      score += 6;
      matchedKeywords.push(phrase);
    }
  }

  const idPhrase = normalizeRoleSalesText(camelToWords(profileId));
  if (idPhrase && normalizedInput.includes(idPhrase)) {
    score += 10 + idPhrase.length;
    matchedKeywords.push(idPhrase);
  }

  const roleNorm = normalizeRoleSalesText(profile.role);
  if (roleNorm && normalizedInput.includes(roleNorm)) {
    score += 14 + Math.min(roleNorm.length, 24);
    matchedKeywords.push(profile.role);
  }

  for (const alias of profile.aliases || []) {
    const aliasNorm = normalizeRoleSalesText(alias);
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

  for (const keyword of profile.keywords || []) {
    const kwNorm = normalizeRoleSalesText(keyword);
    if (!kwNorm) continue;
    if (normalizedInput.includes(kwNorm)) {
      score += 7 + Math.min(kwNorm.length, 16);
      matchedKeywords.push(keyword);
    }
  }

  for (const token of tokens) {
    if (!token) continue;
    if (roleNorm.includes(token)) score += 4 + token.length;
    for (const alias of profile.aliases || []) {
      const aliasNorm = normalizeRoleSalesText(alias);
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
 *   profile: typeof roleBasedSalesTranslationKnowledge[string],
 * }>}
 */
export function detectRoleBasedSalesIntent(inputText) {
  const normalizedInput = normalizeRoleSalesText(inputText);
  if (!normalizedInput) return [];

  const tokens = tokenizeRoleSalesQuery(inputText);
  /** @type {ReturnType<typeof detectRoleBasedSalesIntent>} */
  const matches = [];

  for (const [profileId, profile] of Object.entries(roleBasedSalesTranslationKnowledge)) {
    const { score, matchedKeywords } = scoreRoleSalesMatch(
      profileId,
      profile,
      normalizedInput,
      tokens
    );
    if (score < MATCH_THRESHOLD) continue;
    matches.push({
      id: profileId,
      title: profile.role,
      score,
      matchedKeywords,
      profile,
    });
  }

  return matches.sort((a, b) => b.score - a.score);
}

/**
 * @param {unknown} inputTextOrKey
 * @returns {typeof roleBasedSalesTranslationKnowledge[string] | null}
 */
export function getRoleSalesProfile(inputTextOrKey) {
  const raw = String(inputTextOrKey ?? "").trim();
  if (!raw) return null;

  if (roleBasedSalesTranslationKnowledge[raw]) {
    return roleBasedSalesTranslationKnowledge[raw];
  }

  const normalizedKey = normalizeRoleSalesText(raw).replace(/\s+/g, "");
  for (const [id, profile] of Object.entries(roleBasedSalesTranslationKnowledge)) {
    if (normalizeRoleSalesText(id) === normalizedKey) return profile;
    if (normalizeRoleSalesText(camelToWords(id)) === normalizeRoleSalesText(raw)) return profile;
    if (normalizeRoleSalesText(profile.role) === normalizeRoleSalesText(raw)) return profile;
  }

  const matches = detectRoleBasedSalesIntent(raw);
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
export function buildRoleBasedSalesResponse(inputText) {
  const question = String(inputText ?? "").trim();
  const matches = detectRoleBasedSalesIntent(question);

  const empty = {
    ok: false,
    profileId: null,
    confidence: 0,
    title: "",
    directAnswer: "",
    sections: [],
    followUpQuestions: [],
    sourceBadges: ["Sales translation"],
    cautionNotes: [],
    message: "",
  };

  if (!question) {
    return {
      ...empty,
      message:
        "Ask how to frame lubrication value for a role—e.g. owner, maintenance manager, fleet manager, mechanic, or purchasing.",
    };
  }

  if (!matches.length) {
    return {
      ...empty,
      message:
        "No indexed role profile matched. Try 'how to talk to a fleet manager', 'maintenance manager objections', 'selling to purchasing', or 'new lubricant salesperson'.",
    };
  }

  const primary = matches[0].profile;
  const confidence = Math.min(1, matches[0].score / 34);

  const directAnswer = `When speaking with a ${primary.role}, lead with what they prioritize operationally and commercially—then align KLONDIKE recommendations to documented specs, not generic product claims.`;

  const sections = [
    section("whatTheyCareAbout", "What They Care About", "", primary.whatTheyCareAbout),
    section("howToFrameValue", "How to Frame Value", "", primary.howToFrameValue),
    section("languageToUse", "Language to Use", "", primary.languageToUse),
    section("languageToAvoid", "Language to Avoid", "", primary.languageToAvoid),
    section("commonObjections", "Common Objections", "", primary.commonObjections),
    section("responseStrategy", "Response Strategy", "", primary.responseStrategy),
    section("exampleTalkTracks", "Example Talk Tracks", "", primary.exampleTalkTracks),
    section("questionsToAsk", "Questions to Ask", "", primary.questionsToAsk),
  ].filter((s) => s.body || (s.items && s.items.length > 0));

  return {
    ok: true,
    profileId: matches[0].id,
    confidence,
    title: `Sales Translation: ${primary.role}`,
    directAnswer,
    sections,
    followUpQuestions: primary.questionsToAsk || [],
    sourceBadges: ["Sales translation", "Sales enablement"],
    cautionNotes: primary.cautionNotes || [],
    message: `Matched role profile: ${primary.role}.`,
  };
}

/**
 * Lubricant compatibility helpers — deterministic intent detection and advisor responses.
 * Plain JavaScript only; not wired to UI yet.
 */

import { lubricantCompatibilityKnowledge } from "../data/lubricantCompatibilityKnowledge.js";
import {
  GREASE_COMPATIBILITY_THICKENERS,
  getGreaseCompatibility,
  normalizeGreaseThickener,
} from "../data/greaseCompatibilityMatrix.js";

const MATCH_THRESHOLD = 6;

/** @type {readonly string[]} */
const GREASE_THICKENERS_BY_LENGTH = Object.freeze(
  [...GREASE_COMPATIBILITY_THICKENERS].sort((a, b) => b.length - a.length)
);

const GREASE_COMPATIBILITY_CUE_RE =
  /\b(mix|mixing|compatible|compatibility|switch|switching|convert|conversion|change|combine|interchange|top[\s-]?off|blend|together|vs)\b/;

/** @type {Readonly<Record<"C" | "P" | "I", string>>} */
const GREASE_COMPATIBILITY_CODE_LABELS = Object.freeze({
  C: "Compatible (C) — generally safe to transition with normal regreasing when base oil and additives also align.",
  P: "Partially compatible (P) — purge, re-grease, and monitor during changeover; do not rely on casual top-off.",
  I: "Incompatible (I) — flush and purge strongly recommended before conversion; avoid blending in service.",
});

const STANDARD_GREASE_COMPATIBILITY_CAUTIONS = Object.freeze([
  "Confirm application, NLGI grade, base oil viscosity, and additive package on both PDS sheets—thickener match alone is not enough.",
  "Follow OEM, equipment builder, and centralized auto-lube supplier requirements before bulk or fleet conversion.",
  "Avoid blind top-off when in-service grease history is unknown—purge and refill is the safer default on critical pins and auto-lube lines.",
]);

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

/** @param {string[]} arr */
function uniqStrings(arr) {
  const out = [];
  const seen = new Set();
  for (const s of arr) {
    const t = String(s ?? "").trim();
    if (!t || seen.has(t)) continue;
    seen.add(t);
    out.push(t);
  }
  return out;
}

/**
 * @param {string} normalizedQuestion
 * @returns {string[]}
 */
function extractGreaseThickenersFromQuestion(normalizedQuestion) {
  const norm = normalizeCompatibilityText(normalizedQuestion);
  if (!norm) return [];

  /** @type {string[]} */
  const found = [];

  for (const thickener of GREASE_THICKENERS_BY_LENGTH) {
    const thickenerNorm = normalizeCompatibilityText(thickener);
    if (!thickenerNorm || !norm.includes(thickenerNorm)) continue;

    const withoutSubstring = found.filter((existing) => {
      const existingNorm = normalizeCompatibilityText(existing);
      return !thickenerNorm.includes(existingNorm) && !existingNorm.includes(thickenerNorm);
    });

    if (withoutSubstring.some((existing) => normalizeCompatibilityText(existing) === thickenerNorm)) {
      continue;
    }

    found.length = 0;
    found.push(...withoutSubstring, thickener);
  }

  const segmentSplitters = /\b(?:and|with|vs|versus|to|from|into)\b/g;
  for (const segment of norm.split(segmentSplitters)) {
    const trimmed = segment.trim();
    if (trimmed.length < 3) continue;
    const canonical = normalizeGreaseThickener(trimmed);
    if (!canonical) continue;
    const withoutSubstring = found.filter((existing) => {
      const existingNorm = normalizeCompatibilityText(existing);
      const canonicalNorm = normalizeCompatibilityText(canonical);
      return !canonicalNorm.includes(existingNorm) && !existingNorm.includes(canonicalNorm);
    });
    if (!withoutSubstring.some((existing) => normalizeCompatibilityText(existing) === normalizeCompatibilityText(canonical))) {
      found.length = 0;
      found.push(...withoutSubstring, canonical);
    }
  }

  return found.slice(0, 2);
}

/**
 * @param {string} normalizedQuestion
 */
function isGreaseThickenerCompatibilityQuestion(normalizedQuestion) {
  const norm = normalizeCompatibilityText(normalizedQuestion);
  if (!norm) return false;
  const thickeners = extractGreaseThickenersFromQuestion(norm);
  if (thickeners.length < 2) return false;
  if (GREASE_COMPATIBILITY_CUE_RE.test(norm)) return true;
  return /\b(grease|greases|thickener|thickeners)\b/.test(norm);
}

/**
 * @param {string} question
 * @param {string} thickenerA
 * @param {string} thickenerB
 * @returns {ReturnType<typeof buildCompatibilityResponse> | null}
 */
function buildGreaseThickenerMatrixResponse(question, thickenerA, thickenerB) {
  const cell = getGreaseCompatibility(thickenerA, thickenerB);
  if (!cell) return null;

  const code = cell.compatibility;
  const codeLabel = GREASE_COMPATIBILITY_CODE_LABELS[code];

  const directAnswer = `${thickenerA} and ${thickenerB}: ${codeLabel} ${cell.interpretation}`;

  const sections = [
    section(
      "compatibilityCode",
      "Compatibility Code",
      `${code} = ${
        code === "C"
          ? "Compatible"
          : code === "P"
            ? "Partially compatible — purge and monitor recommended"
            : "Incompatible — flush/purge strongly recommended"
      }.`,
      []
    ),
    section("interpretation", "What It Means", cell.interpretation),
    section("recommendedAction", "Recommended Action", cell.recommendedAction),
    section("cautionNotes", "Caution Notes", "", uniqStrings([...cell.cautionNotes, ...STANDARD_GREASE_COMPATIBILITY_CAUTIONS])),
  ].filter((s) => s.body || (s.items && s.items.length > 0));

  return {
    ok: true,
    profileId: `greaseCompatibilityMatrix:${thickenerA}:${thickenerB}`,
    confidence: 0.92,
    title: `Grease thickener compatibility — ${thickenerA} & ${thickenerB}`,
    directAnswer,
    sections,
    followUpQuestions: [
      `What ${thickenerA} and ${thickenerB} product names are on the PDS title blocks today?`,
      "Is this manual regrease, grease gun, or a centralized auto-lube system?",
      "What NLGI grade and OEM thickener requirement does the equipment tag show?",
    ],
    sourceBadges: ["Grease compatibility matrix", "Compatibility guidance"],
    cautionNotes: uniqStrings([...cell.cautionNotes, ...STANDARD_GREASE_COMPATIBILITY_CAUTIONS]),
    message: `Canonical grease matrix: ${thickenerA} vs ${thickenerB} (${code}).`,
  };
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

  const normalizedQuestion = normalizeCompatibilityText(question);
  if (isGreaseThickenerCompatibilityQuestion(normalizedQuestion)) {
    const thickeners = extractGreaseThickenersFromQuestion(normalizedQuestion);
    if (thickeners.length >= 2) {
      const matrixResponse = buildGreaseThickenerMatrixResponse(question, thickeners[0], thickeners[1]);
      if (matrixResponse) return matrixResponse;
    }
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

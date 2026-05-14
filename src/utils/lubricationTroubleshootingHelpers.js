/**
 * Lubrication troubleshooting helpers — deterministic intent detection and guidance.
 * Plain JavaScript only; not wired to UI.
 */

import { lubricationTroubleshootingKnowledge } from "../data/lubricationTroubleshootingKnowledge.js";

/** @param {unknown} raw */
function normalizeTroubleshootingText(raw) {
  return String(raw ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9#]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** @param {unknown} query */
function tokenizeTroubleshootingQuery(query) {
  const n = normalizeTroubleshootingText(query);
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
 * @param {string} issueId
 * @param {typeof lubricationTroubleshootingKnowledge[string]} entry
 * @param {string} normalizedInput
 * @param {string[]} tokens
 */
function scoreTroubleshootingMatch(issueId, entry, normalizedInput, tokens) {
  let score = 0;
  /** @type {string[]} */
  const matchedKeywords = [];

  const idPhrase = normalizeTroubleshootingText(camelToWords(issueId));
  if (idPhrase && normalizedInput.includes(idPhrase)) {
    score += 10 + idPhrase.length;
    matchedKeywords.push(idPhrase);
  }

  const issueNorm = normalizeTroubleshootingText(entry.issue);
  if (issueNorm && normalizedInput.includes(issueNorm)) {
    score += 14 + Math.min(issueNorm.length, 24);
    matchedKeywords.push(entry.issue);
  }

  for (const keyword of entry.keywords || []) {
    const kwNorm = normalizeTroubleshootingText(keyword);
    if (!kwNorm) continue;
    if (normalizedInput.includes(kwNorm)) {
      score += 8 + Math.min(kwNorm.length, 18);
      matchedKeywords.push(keyword);
    }
  }

  for (const symptom of entry.symptoms || []) {
    const symNorm = normalizeTroubleshootingText(symptom);
    if (symNorm.length >= 8 && normalizedInput.includes(symNorm)) {
      score += 6;
    }
  }

  for (const token of tokens) {
    if (!token) continue;
    if (issueNorm.includes(token)) {
      score += 4 + token.length;
    }
    for (const keyword of entry.keywords || []) {
      const kwNorm = normalizeTroubleshootingText(keyword);
      if (kwNorm.includes(token) || (token.length >= 4 && kwNorm.split(" ").includes(token))) {
        score += 3 + token.length;
        if (!matchedKeywords.includes(keyword)) matchedKeywords.push(keyword);
      }
    }
  }

  return { score, matchedKeywords: [...new Set(matchedKeywords)] };
}

/**
 * @param {unknown} inputText
 * @returns {Array<{
 *   id: string,
 *   issue: string,
 *   score: number,
 *   matchedKeywords: string[],
 *   entry: typeof lubricationTroubleshootingKnowledge[string],
 * }>}
 */
export function detectTroubleshootingIntent(inputText) {
  const normalizedInput = normalizeTroubleshootingText(inputText);
  if (!normalizedInput) return [];

  const tokens = tokenizeTroubleshootingQuery(inputText);
  /** @type {ReturnType<typeof detectTroubleshootingIntent>} */
  const matches = [];

  for (const [issueId, entry] of Object.entries(lubricationTroubleshootingKnowledge)) {
    const { score, matchedKeywords } = scoreTroubleshootingMatch(
      issueId,
      entry,
      normalizedInput,
      tokens
    );
    if (score < 6) continue;
    matches.push({
      id: issueId,
      issue: entry.issue,
      score,
      matchedKeywords,
      entry,
    });
  }

  return matches.sort((a, b) => b.score - a.score);
}

/**
 * @param {unknown} inputText
 * @returns {{
 *   ok: boolean,
 *   question: string,
 *   issueId: string | null,
 *   issue: string,
 *   symptoms: string[],
 *   likelyCauses: string[],
 *   operationalConsequences: string[],
 *   questionsToAsk: string[],
 *   relatedConcepts: string[],
 *   relatedApplications: string[],
 *   possibleLubricantCategories: string[],
 *   repTalkTrack: string,
 *   cautionNotes: string[],
 *   confidence: number,
 *   message: string,
 * }}
 */
export function buildTroubleshootingGuidance(inputText) {
  const question = String(inputText ?? "").trim();
  const matches = detectTroubleshootingIntent(question);

  const empty = {
    ok: false,
    question,
    issueId: null,
    issue: "",
    symptoms: [],
    likelyCauses: [],
    operationalConsequences: [],
    questionsToAsk: [],
    relatedConcepts: [],
    relatedApplications: [],
    possibleLubricantCategories: [],
    repTalkTrack: "",
    cautionNotes: [],
    confidence: 0,
    message: "",
  };

  if (!question) {
    return {
      ...empty,
      message: "Describe the symptom or failure mode to get troubleshooting guidance.",
    };
  }

  if (!matches.length) {
    return {
      ...empty,
      message:
        "No indexed troubleshooting pattern matched. Try symptoms like wet brake chatter, grease washout, cavitation, or shortened drain intervals.",
    };
  }

  const primary = matches[0].entry;
  const confidence = Math.min(1, matches[0].score / 32);

  return {
    ok: true,
    question,
    issueId: matches[0].id,
    issue: primary.issue,
    symptoms: primary.symptoms || [],
    likelyCauses: primary.likelyCauses || [],
    operationalConsequences: primary.operationalConsequences || [],
    questionsToAsk: primary.questionsToAsk || [],
    relatedConcepts: primary.relatedConcepts || [],
    relatedApplications: primary.relatedApplications || [],
    possibleLubricantCategories: primary.possibleLubricantCategories || [],
    repTalkTrack: primary.repTalkTrack || "",
    cautionNotes: primary.cautionNotes || [],
    confidence,
    message: `Matched troubleshooting issue: ${primary.issue}.`,
  };
}

/**
 * @param {unknown} inputText
 * @returns {{ ok: boolean, question: string, issueId: string | null, questions: string[], message: string }}
 */
export function buildTroubleshootingQuestions(inputText) {
  const guidance = buildTroubleshootingGuidance(inputText);
  if (!guidance.ok) {
    return {
      ok: false,
      question: guidance.question,
      issueId: null,
      questions: [],
      message: guidance.message,
    };
  }

  return {
    ok: true,
    question: guidance.question,
    issueId: guidance.issueId,
    questions: guidance.questionsToAsk,
    message: guidance.message,
  };
}

/**
 * @param {unknown} inputText
 * @returns {{ ok: boolean, question: string, issueId: string | null, repTalkTrack: string, cautionNotes: string[], message: string }}
 */
export function buildTroubleshootingTalkTrack(inputText) {
  const guidance = buildTroubleshootingGuidance(inputText);
  if (!guidance.ok) {
    return {
      ok: false,
      question: guidance.question,
      issueId: null,
      repTalkTrack: "",
      cautionNotes: [],
      message: guidance.message,
    };
  }

  return {
    ok: true,
    question: guidance.question,
    issueId: guidance.issueId,
    repTalkTrack: guidance.repTalkTrack,
    cautionNotes: guidance.cautionNotes,
    message: guidance.message,
  };
}

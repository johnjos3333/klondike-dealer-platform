/**
 * Lubrication Advisor orchestrator — routes rep questions to the correct deterministic brain.
 * Plain JavaScript only; not wired to UI.
 */

import {
  buildConceptExplanation,
  detectLubricationConcepts,
} from "./lubricationAdvisorCoreHelpers.js";
import {
  buildTroubleshootingGuidance,
  detectTroubleshootingIntent,
} from "./lubricationTroubleshootingHelpers.js";
import {
  buildIndustryLubricationResponse,
  detectIndustryIntent,
} from "./industryLubricationHelpers.js";
import {
  buildEquipmentLubricationResponse,
  detectEquipmentIntent,
} from "./equipmentLubricationHelpers.js";
import {
  buildOemSpecAdvisorResponse,
  detectOemSpecIntent,
} from "./oemSpecAdvisorHelpers.js";
import {
  buildProductCategorySelectionResponse,
  detectProductCategorySelectionIntent,
} from "./productCategorySelectionHelpers.js";
import {
  buildCompatibilityResponse,
  detectCompatibilityIntent,
} from "./lubricantCompatibilityHelpers.js";
import {
  buildDiscoveryQuestionResponse,
  detectDiscoveryQuestionIntent,
} from "./lubricationDiscoveryQuestionHelpers.js";
import {
  buildRoleBasedSalesResponse,
  detectRoleBasedSalesIntent,
} from "./roleBasedSalesTranslationHelpers.js";
import { buildContextFusionResponse } from "./lubricationAdvisorContextFusionHelpers.js";
import {
  buildProductAttributeResponse,
  detectProductAttributeIntent,
} from "./productAttributeAdvisorHelpers.js";
import {
  buildVocabularyResponse,
  detectVocabularyIntent,
} from "./lubricationVocabularyHelpers.js";
import {
  buildKlondikeProductRetrievalResponse,
  searchKlondikeProducts,
} from "./klondikeProductRetrievalHelpers.js";
import {
  buildProductDifferentiationResponse,
  detectProductDifferentiationIntent,
} from "./productDifferentiationAdvisorHelpers.js";
import {
  buildProductEntityAdvisorResponse,
  detectKlondikeProductEntity,
} from "./klondikeProductEntityResolver.js";
import {
  buildHydraulicTroubleshootingResponse,
  detectHydraulicTroubleshootingIntent,
} from "./hydraulicTroubleshootingAdvisorHelpers.js";
import {
  buildDeterministicRecommendationResponse,
  detectDeterministicRecommendationIntent,
} from "./deterministicRecommendationAdvisorHelpers.js";

const MATCH_THRESHOLD = 6;
/** Named product entity early-route (aligns with `klondikeProductEntityResolver` exact threshold). */
const PRODUCT_ENTITY_STRONG_MIN_SCORE = 34;
const PRODUCT_ENTITY_AMBIGUOUS_GAP = 6;
/** Differentiation early-route: require anchored cue score from `detectProductDifferentiationIntent`. */
const PRODUCT_DIFFERENTIATION_STRONG_MIN_SCORE = 26;
/** Minimum top `searchKlondikeProducts` score to answer catalog questions (aligns with PDS map search floor). */
const PRODUCT_RETRIEVAL_REASONABLE_MIN_SCORE = 10;
/** Skip product retrieval when these intents are already clearly firing. */
const PRODUCT_RETRIEVAL_EXCLUDE_SCORE = 10;
/** Scores within this margin of the top score are treated as a tie for priority resolution. */
const TIE_SCORE_MARGIN = 8;

const INTENT_PRIORITY = [
  "troubleshooting",
  "product_differentiation",
  "product_attribute",
  "vocabulary",
  "discovery_question",
  "compatibility",
  "role_sales",
  "equipment",
  "industry",
  "oem_spec",
  "product_category_selection",
  "concept",
];

const INTENT_CONFIDENCE_DIVISOR = {
  troubleshooting: 32,
  product_differentiation: 36,
  product_attribute: 34,
  vocabulary: 34,
  discovery_question: 34,
  compatibility: 34,
  role_sales: 34,
  equipment: 34,
  industry: 34,
  oem_spec: 34,
  product_category_selection: 34,
  concept: 28,
};

const MATCHES_BY_INTENT = {
  troubleshooting: (matches) => matches.troubleshootingMatches,
  product_differentiation: (matches) => matches.productDifferentiationMatches,
  product_attribute: (matches) => matches.productAttributeMatches,
  vocabulary: (matches) => matches.vocabularyMatches,
  discovery_question: (matches) => matches.discoveryQuestionMatches,
  compatibility: (matches) => matches.compatibilityMatches,
  role_sales: (matches) => matches.roleSalesMatches,
  equipment: (matches) => matches.equipmentMatches,
  industry: (matches) => matches.industryMatches,
  oem_spec: (matches) => matches.oemSpecMatches,
  product_category_selection: (matches) => matches.productCategoryMatches,
  concept: (matches) => matches.conceptMatches,
};

/**
 * @param {typeof INTENT_PRIORITY[number]} intent
 * @param {number} score
 */
function intentConfidence(intent, score) {
  const divisor = INTENT_CONFIDENCE_DIVISOR[intent] || 32;
  return Math.min(1, score / divisor);
}

/**
 * @param {Record<string, number>} scores
 * @returns {typeof INTENT_PRIORITY[number] | "general"}
 */
function resolveIntentFromScores(scores) {
  const eligible = INTENT_PRIORITY.filter((intent) => scores[intent] >= MATCH_THRESHOLD);
  if (!eligible.length) return "general";

  const topScore = Math.max(...eligible.map((intent) => scores[intent]));
  const nearTop = eligible.filter((intent) => topScore - scores[intent] <= TIE_SCORE_MARGIN);

  for (const intent of INTENT_PRIORITY) {
    if (nearTop.includes(intent)) return intent;
  }

  return eligible.reduce((best, intent) =>
    scores[intent] > scores[best] ? intent : best
  );
}

const FALLBACK_PROMPTS = [
  "What grease should I use for wet pins and bushings?",
  "Does a quarry use lubricants?",
  "What causes wet brake chatter?",
  "Explain viscosity index",
  "What should I ask a fleet customer?",
];

/**
 * @param {unknown} inputText
 * @returns {{
 *   intent: "troubleshooting" | "product_differentiation" | "product_attribute" | "vocabulary" | "discovery_question" | "compatibility" | "role_sales" | "equipment" | "industry" | "oem_spec" | "product_category_selection" | "concept" | "general",
 *   confidence: number,
 *   matchId: string | null,
 *   scores: {
 *     troubleshooting: number,
 *     product_differentiation: number,
 *     product_attribute: number,
 *     vocabulary: number,
 *     discovery_question: number,
 *     compatibility: number,
 *     role_sales: number,
 *     equipment: number,
 *     industry: number,
 *     oem_spec: number,
 *     product_category_selection: number,
 *     concept: number,
 *   },
 * }}
 */
export function classifyLubricationAdvisorIntent(inputText) {
  const question = String(inputText ?? "").trim();
  const troubleshootingMatches = detectTroubleshootingIntent(question);
  const productDifferentiationMatches = detectProductDifferentiationIntent(question);
  const productAttributeMatches = detectProductAttributeIntent(question);
  const vocabularyMatches = detectVocabularyIntent(question);
  const discoveryQuestionMatches = detectDiscoveryQuestionIntent(question);
  const compatibilityMatches = detectCompatibilityIntent(question);
  const roleSalesMatches = detectRoleBasedSalesIntent(question);
  const equipmentMatches = detectEquipmentIntent(question);
  const industryMatches = detectIndustryIntent(question);
  const oemSpecMatches = detectOemSpecIntent(question);
  const productCategoryMatches = detectProductCategorySelectionIntent(question);
  const conceptMatches = detectLubricationConcepts(question);

  const scores = {
    troubleshooting: troubleshootingMatches[0]?.score || 0,
    product_differentiation: productDifferentiationMatches[0]?.score || 0,
    product_attribute: productAttributeMatches[0]?.score || 0,
    vocabulary: vocabularyMatches[0]?.score || 0,
    discovery_question: discoveryQuestionMatches[0]?.score || 0,
    compatibility: compatibilityMatches[0]?.score || 0,
    role_sales: roleSalesMatches[0]?.score || 0,
    equipment: equipmentMatches[0]?.score || 0,
    industry: industryMatches[0]?.score || 0,
    oem_spec: oemSpecMatches[0]?.score || 0,
    product_category_selection: productCategoryMatches[0]?.score || 0,
    concept: conceptMatches[0]?.score || 0,
  };

  if (
    isProductCarryingKlondikeQuery(question) &&
    !isExplicitDiscoveryQuestionQuery(question)
  ) {
    scores.discovery_question = 0;
  }

  if (!question) {
    return { intent: "general", confidence: 0, matchId: null, scores };
  }

  const intent = resolveIntentFromScores(scores);
  if (intent === "general") {
    return { intent: "general", confidence: 0, matchId: null, scores };
  }

  const matchLists = {
    troubleshootingMatches,
    productDifferentiationMatches,
    productAttributeMatches,
    vocabularyMatches,
    discoveryQuestionMatches,
    compatibilityMatches,
    roleSalesMatches,
    equipmentMatches,
    industryMatches,
    oemSpecMatches,
    productCategoryMatches,
    conceptMatches,
  };
  const topMatch = MATCHES_BY_INTENT[intent](matchLists)[0];

  return {
    intent,
    confidence: intentConfidence(intent, scores[intent]),
    matchId: topMatch?.id || null,
    scores,
  };
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
 * Rep explicitly asking for discovery-question coaching (not catalog inventory).
 * @param {string} question
 */
function isExplicitDiscoveryQuestionQuery(question) {
  const n = String(question ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9#]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (!n) return false;
  const phrases = [
    "what should i ask",
    "what questions should i ask",
    "what to ask",
    "questions to ask",
    "what do i ask",
    "discovery questions",
    "before recommending",
    "before choosing",
  ];
  return phrases.some((p) => n.includes(p));
}

/**
 * Broad Klondike / rep catalog questions ("what do we carry", etc.).
 * @param {string} question
 */
function isProductCarryingKlondikeQuery(question) {
  const q = String(question ?? "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
  if (q.length < 6) return false;

  const hardPhrases = [
    "what does klondike carry",
    "what does klondike have",
    "what products",
    "what product",
    "what line",
    "what lines",
    "do we carry",
    "do we have",
    "do we offer",
    "does klondike offer",
    "does klondike have",
    "does klondike carry",
    "does klondike stock",
    "klondike offer",
    "what klondike carry",
    "what klondike have",
    "what klondike offer",
  ];
  if (hardPhrases.some((p) => q.includes(p))) return true;

  if (
    /\bwhat\s+(kind|kinds|type|types)\s+of\b/.test(q) &&
    q.includes("klondike") &&
    /\b(does|do)\s+klondike\s+(have|carry|offer|stock)\b/.test(q)
  ) {
    return true;
  }

  if (
    /\bwhat\s+(kind|kinds|type|types)\s+of\b/.test(q) &&
    /\bdo\s+we\s+(have|carry|offer|stock)\b/.test(q)
  ) {
    return true;
  }

  if (
    /what\s+.+\s+does\s+klondike\s+(carry|have|offer|stock)\b/.test(q) ||
    /what\s+.+\s+do\s+we\s+(carry|have|offer|stock)\b/.test(q)
  ) {
    return true;
  }

  if (
    q.includes("klondike") &&
    /\b(what|which|any)\b/.test(q) &&
    /\b(carry|carries|carrying|have|has|offer|offers|stock|stocks|products?|line|lines|range|category|categories)\b/.test(q)
  ) {
    return true;
  }

  if (
    /\b(do|does)\s+we\b/.test(q) &&
    /\b(carry|carries|carrying|have|has|offer|offers|stock|get|sell)\b/.test(q)
  ) {
    return true;
  }

  return false;
}

/**
 * Definition-style concept questions — do not route to product retrieval.
 * @param {string} question
 */
function shouldDeferProductRetrievalForConcept(question) {
  const q = String(question ?? "").toLowerCase();
  const conceptTop = detectLubricationConcepts(question)[0]?.score || 0;
  if (conceptTop < MATCH_THRESHOLD) return false;
  if (/\b(carry|carries|carrying|do\s+we\s+(have|carry|offer)|does\s+klondike|what\s+products|klondike\s+(have|carry|offer|stock))\b/.test(q)) {
    return false;
  }
  return /\b(what\s+is|what\s+are|define|meaning\s+of|explain(\s+what)?)\b/.test(q);
}

/**
 * @param {{ matches: Array<{ score: number }> }} searchResult
 */
function hasReasonableKlondikeProductSearch(searchResult) {
  const matches = searchResult?.matches;
  if (!matches?.length) return false;
  return matches[0].score >= PRODUCT_RETRIEVAL_REASONABLE_MIN_SCORE;
}

/**
 * @param {string} question
 */
function isCatalogCarryWithoutTroubleshootingAdmission(question) {
  return isProductCarryingKlondikeQuery(question) && !hasHydraulicTroubleshootingAdmission(question);
}

function shouldSkipProductRetrievalRouting(question) {
  if (shouldRouteGreaseThickenerCompatibility(question)) return true;
  if (shouldRouteHydraulicTroubleshooting(question)) return true;
  if (isCatalogCarryWithoutTroubleshootingAdmission(question)) {
    if (shouldRouteDeterministicRecommendation(question) && isExplicitRecommendationQuery(question)) {
      return true;
    }
    return shouldDeferProductRetrievalForConcept(question);
  }
  if (shouldRouteDeterministicRecommendation(question)) return true;
  const t = detectTroubleshootingIntent(question)[0]?.score || 0;
  if (t >= PRODUCT_RETRIEVAL_EXCLUDE_SCORE) return true;
  const r = detectRoleBasedSalesIntent(question)[0]?.score || 0;
  if (r >= PRODUCT_RETRIEVAL_EXCLUDE_SCORE) return true;
  if (shouldDeferProductRetrievalForConcept(question)) return true;
  return false;
}

/** @param {unknown} raw */
function normalizeOrchestratorText(raw) {
  return String(raw ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Longest phrases first so "lithium complex" is not double-counted as "lithium". */
const GREASE_THICKENER_FAMILY_PHRASES = [
  "lithium complex",
  "calcium sulfonate",
  "calcium complex",
  "barium complex",
  "bentonite clay",
  "aluminum complex",
  "anhydrous calcium",
  "molybdenum complex",
  "moly complex",
  "polyurea",
  "silicone",
  "sodium",
  "lithium",
  "calcium",
  "bentonite",
];

const GREASE_COMPATIBILITY_OVERRIDE_CUE_RE =
  /\b(mix|mixing|compatible|compatibility|purge|flush)\b|switch\s+from|switch\s+to|can\s+i\s+mix|can\s+i\s+switch/;

/**
 * Grease thickener compatibility questions override product entity / retrieval / differentiation.
 * @param {string} question
 */
function shouldRouteGreaseThickenerCompatibility(question) {
  const norm = normalizeOrchestratorText(question);
  if (!norm || !GREASE_COMPATIBILITY_OVERRIDE_CUE_RE.test(norm)) return false;

  /** @type {string[]} */
  const families = [];
  for (const phrase of GREASE_THICKENER_FAMILY_PHRASES) {
    if (!norm.includes(phrase)) continue;
    const filtered = families.filter((existing) => !phrase.includes(existing) && !existing.includes(phrase));
    if (filtered.some((existing) => existing === phrase)) continue;
    families.length = 0;
    families.push(...filtered, phrase);
  }

  return families.length >= 2;
}

/** @type {readonly string[]} */
const EXPLICIT_RECOMMENDATION_PHRASES = Object.freeze([
  "what should i recommend",
  "what should we recommend",
  "what grease should i recommend",
  "what fluid should i recommend",
  "what product should i recommend",
  "what should i use",
  "what should we use",
  "best product for",
  "best grease for",
  "best fluid for",
  "recommend for",
]);

/** @type {readonly string[]} */
const PRODUCT_IDENTITY_PHRASES = Object.freeze([
  "what is",
  "explain",
  "tell me about",
  "what makes",
  "what s different about",
  "whats different about",
  "describe",
]);

/** @type {readonly string[]} */
const DIRECT_TROUBLESHOOTING_SYMPTOM_PHRASES = Object.freeze([
  "chatter",
  "cavitation",
  "cavitat",
  "foaming",
  "overheating",
  "whining",
  "pump noise",
  "sluggish",
  "varnish",
  "water contamination",
  "filter plugging",
  "cylinder drift",
  "erratic hydraulics",
  "erratic hydraulic",
  "seal failure",
  "worn pump",
  "brake fade",
  "hard shifting",
  "no movement",
  "slipping",
  "high temperature",
  "slow response",
]);

/** Operational failure language — not generic product/category words (heavy duty, coolant, fleet). */
const TROUBLESHOOTING_OPERATIONAL_PHRASES = Object.freeze([
  "after top off",
  "after topoff",
  "after fill",
  "won t work",
  "wont work",
  "not working",
  "problem with",
  "issue with",
  "failure mode",
  "troubleshoot",
  "troubleshooting",
  "what s wrong",
  "whats wrong",
  "why is my",
  "why does my",
  "keeps failing",
  "started after",
  "symptom",
  "symptoms",
]);

/**
 * @param {string} question
 * @returns {boolean}
 */
export function isExplicitRecommendationQuery(question) {
  const norm = normalizeOrchestratorText(question);
  if (!norm) return false;
  return EXPLICIT_RECOMMENDATION_PHRASES.some((phrase) => norm.includes(phrase));
}

/**
 * @param {string} question
 * @returns {boolean}
 */
export function hasDirectTroubleshootingSymptom(question) {
  const norm = normalizeOrchestratorText(question);
  if (!norm) return false;
  return DIRECT_TROUBLESHOOTING_SYMPTOM_PHRASES.some((phrase) => norm.includes(phrase));
}

/**
 * @param {string} question
 * @returns {boolean}
 */
export function hasTroubleshootingOperationalPhrase(question) {
  const norm = normalizeOrchestratorText(question);
  if (!norm) return false;
  return TROUBLESHOOTING_OPERATIONAL_PHRASES.some((phrase) => norm.includes(phrase));
}

/**
 * @param {string} question
 * @returns {boolean}
 */
function hasHydraulicTroubleshootingAdmission(question) {
  return hasDirectTroubleshootingSymptom(question) || hasTroubleshootingOperationalPhrase(question);
}

/**
 * @param {string} question
 * @returns {boolean}
 */
export function isProductIdentityQuery(question) {
  const norm = normalizeOrchestratorText(question);
  if (!norm) return false;
  return PRODUCT_IDENTITY_PHRASES.some((phrase) => norm.includes(phrase));
}

/**
 * @param {string} question
 * @returns {ReturnType<typeof buildLubricationAdvisorResponse> | null}
 */
function tryRouteStrongProductEntityResponse(question) {
  const entityDetected = detectKlondikeProductEntity(question);
  const entityTop = entityDetected[0];
  const entitySecond = entityDetected[1];
  const strongProductEntity =
    entityTop &&
    entityTop.score >= PRODUCT_ENTITY_STRONG_MIN_SCORE &&
    (!entitySecond || entityTop.score - entitySecond.score >= PRODUCT_ENTITY_AMBIGUOUS_GAP);
  if (!strongProductEntity) return null;

  const entityResp = buildProductEntityAdvisorResponse(question);
  return {
    intent: "product_entity",
    confidence: Math.min(0.95, (entityTop?.score || PRODUCT_ENTITY_STRONG_MIN_SCORE) / 48),
    title: entityResp.title,
    directAnswer: entityResp.directAnswer,
    sections: entityResp.sections || [],
    followUpQuestions: entityResp.followUpQuestions || [],
    sourceBadges: entityResp.sourceBadges || ["Product entity resolver"],
    cautionNotes: entityResp.cautionNotes || [],
    matchedProducts: entityResp.matchedProducts || [],
  };
}

/**
 * @param {string} question
 * @returns {ReturnType<typeof buildLubricationAdvisorResponse> | null}
 */
function tryRouteDeterministicRecommendationResponse(question) {
  const recommendationDetected = detectDeterministicRecommendationIntent(question);
  if (recommendationDetected.confidence !== "exact" && recommendationDetected.confidence !== "likely") {
    return null;
  }
  const recommendationResp = buildDeterministicRecommendationResponse(question);
  return {
    intent: "deterministic_recommendation",
    confidence: deterministicRecommendationOrchestratorConfidence(recommendationDetected),
    title: recommendationResp.title,
    directAnswer: recommendationResp.directAnswer,
    sections: recommendationResp.sections || [],
    followUpQuestions: recommendationResp.followUpQuestions || [],
    sourceBadges: recommendationResp.sourceBadges || ["Deterministic recommendation intelligence"],
    cautionNotes: recommendationResp.cautionNotes || [],
  };
}

/**
 * Hydraulic troubleshooting (canonical profiles) — before product entity, retrieval, and generic troubleshooting.
 * @param {string} question
 */
function shouldRouteHydraulicTroubleshooting(question) {
  if (!hasHydraulicTroubleshootingAdmission(question)) return false;
  const detected = detectHydraulicTroubleshootingIntent(question);
  return detected.confidence === "exact" || detected.confidence === "likely";
}

/**
 * @param {string} question
 * @returns {ReturnType<typeof buildLubricationAdvisorResponse> | null}
 */
function tryRouteProductRetrievalResponse(question) {
  if (!isProductCarryingKlondikeQuery(question)) return null;
  if (shouldSkipProductRetrievalRouting(question)) return null;

  const productSearch = searchKlondikeProducts(question);
  if (!hasReasonableKlondikeProductSearch(productSearch)) return null;

  const retrieval = buildKlondikeProductRetrievalResponse(question);
  if (!retrieval.ok) return null;

  const topScore = productSearch.matches[0]?.score || 0;
  return {
    intent: "product_retrieval",
    confidence: Math.min(0.95, 0.35 + topScore / 72),
    title: retrieval.title,
    directAnswer: retrieval.directAnswer,
    sections: retrieval.sections || [],
    followUpQuestions: retrieval.followUpQuestions || [],
    sourceBadges: retrieval.sourceBadges || ["PDS map retrieval"],
    cautionNotes: retrieval.cautionNotes || [],
    matchedProducts: retrieval.matchedProducts || [],
  };
}

/**
 * @param {ReturnType<typeof detectHydraulicTroubleshootingIntent>} detected
 */
function hydraulicTroubleshootingOrchestratorConfidence(detected) {
  const topScore = detected.matches[0]?.score || 0;
  if (detected.confidence === "exact") return Math.min(0.95, 0.78 + topScore / 48);
  if (detected.confidence === "likely") return Math.min(0.88, 0.58 + topScore / 48);
  return 0;
}

/**
 * Deterministic recommendation — after product differentiation; defers product identity and troubleshooting in helper.
 * @param {string} question
 */
function shouldRouteDeterministicRecommendation(question) {
  const detected = detectDeterministicRecommendationIntent(question);
  return detected.confidence === "exact" || detected.confidence === "likely";
}

/**
 * @param {ReturnType<typeof detectDeterministicRecommendationIntent>} detected
 */
function deterministicRecommendationOrchestratorConfidence(detected) {
  const topScore = detected.matches[0]?.score || 0;
  if (detected.confidence === "exact") return Math.min(0.95, 0.76 + topScore / 52);
  if (detected.confidence === "likely") return Math.min(0.88, 0.56 + topScore / 52);
  return 0;
}

/**
 * @param {unknown} inputText
 * @returns {{
 *   intent: string,
 *   confidence: number,
 *   title: string,
 *   directAnswer: string,
 *   sections: Array<{ id: string, title: string, body?: string, items?: string[] }>,
 *   followUpQuestions: string[],
 *   sourceBadges: string[],
 *   cautionNotes: string[],
 *   matchedProducts?: Array<Record<string, unknown>>,
 * }}
 */
export function buildLubricationAdvisorResponse(inputText) {
  const question = String(inputText ?? "").trim();

  if (!hasHydraulicTroubleshootingAdmission(question)) {
    const priorityCatalogRetrieval = tryRouteProductRetrievalResponse(question);
    if (priorityCatalogRetrieval) return priorityCatalogRetrieval;
  }

  const fusionResponse = buildContextFusionResponse(question);
  if (fusionResponse.ok) {
    return {
      intent: "context_fusion",
      confidence: fusionResponse.confidence ?? 1,
      title: fusionResponse.title,
      directAnswer: fusionResponse.directAnswer,
      sections: fusionResponse.sections || [],
      followUpQuestions: fusionResponse.followUpQuestions || [],
      sourceBadges: fusionResponse.sourceBadges || ["Context fusion"],
      cautionNotes: fusionResponse.cautionNotes || [],
    };
  }

  if (shouldRouteGreaseThickenerCompatibility(question)) {
    const compatibility = buildCompatibilityResponse(question);
    if (compatibility.ok) {
      return {
        intent: "compatibility",
        confidence: compatibility.confidence,
        title: compatibility.title,
        directAnswer: compatibility.directAnswer,
        sections: compatibility.sections || [],
        followUpQuestions: compatibility.followUpQuestions || [],
        sourceBadges: compatibility.sourceBadges || ["Grease compatibility matrix", "Compatibility guidance"],
        cautionNotes: compatibility.cautionNotes || [],
      };
    }
  }

  if (isExplicitRecommendationQuery(question) && !hasDirectTroubleshootingSymptom(question)) {
    const earlyRecommendation = tryRouteDeterministicRecommendationResponse(question);
    if (earlyRecommendation) return earlyRecommendation;
  }

  if (
    isProductIdentityQuery(question) &&
    !hasHydraulicTroubleshootingAdmission(question) &&
    !isCatalogCarryWithoutTroubleshootingAdmission(question)
  ) {
    const earlyProductEntity = tryRouteStrongProductEntityResponse(question);
    if (earlyProductEntity) return earlyProductEntity;
  }

  const hydraulicDetected = detectHydraulicTroubleshootingIntent(question);
  if (
    hasHydraulicTroubleshootingAdmission(question) &&
    (hydraulicDetected.confidence === "exact" || hydraulicDetected.confidence === "likely")
  ) {
    const hydraulicResp = buildHydraulicTroubleshootingResponse(question);
    return {
      intent: "hydraulic_troubleshooting",
      confidence: hydraulicTroubleshootingOrchestratorConfidence(hydraulicDetected),
      title: hydraulicResp.title,
      directAnswer: hydraulicResp.directAnswer,
      sections: hydraulicResp.sections || [],
      followUpQuestions: hydraulicResp.followUpQuestions || [],
      sourceBadges: hydraulicResp.sourceBadges || ["Hydraulic troubleshooting intelligence"],
      cautionNotes: hydraulicResp.cautionNotes || [],
    };
  }

  if (!isCatalogCarryWithoutTroubleshootingAdmission(question)) {
    const productEntityResponse = tryRouteStrongProductEntityResponse(question);
    if (productEntityResponse) return productEntityResponse;
  }

  const differentiationMatches = detectProductDifferentiationIntent(question);
  const diffTop = differentiationMatches[0];
  if (diffTop && diffTop.score >= PRODUCT_DIFFERENTIATION_STRONG_MIN_SCORE) {
    const diffResp = buildProductDifferentiationResponse(question);
    if (diffResp.ok) {
      return {
        intent: "product_differentiation",
        confidence: Math.min(0.95, intentConfidence("product_differentiation", diffTop.score)),
        title: diffResp.title,
        directAnswer: diffResp.directAnswer,
        sections: diffResp.sections || [],
        followUpQuestions: diffResp.followUpQuestions || [],
        sourceBadges: diffResp.sourceBadges || ["Product differentiation"],
        cautionNotes: diffResp.cautionNotes || [],
      };
    }
  }

  const lateRecommendation = tryRouteDeterministicRecommendationResponse(question);
  if (lateRecommendation) return lateRecommendation;

  const lateCatalogRetrieval = tryRouteProductRetrievalResponse(question);
  if (lateCatalogRetrieval) return lateCatalogRetrieval;

  const classification = classifyLubricationAdvisorIntent(question);

  if (classification.intent === "troubleshooting") {
    const guidance = buildTroubleshootingGuidance(question);
    if (guidance.ok) {
      return {
        intent: "troubleshooting",
        confidence: guidance.confidence,
        title: guidance.issue,
        directAnswer: guidance.repTalkTrack || guidance.message,
        sections: [
          section("symptoms", "Symptoms", "", guidance.symptoms),
          section("likelyCauses", "Likely Causes", "", guidance.likelyCauses),
          section(
            "operationalConsequences",
            "Operational Consequences",
            "",
            guidance.operationalConsequences
          ),
          section(
            "relatedApplications",
            "Related Applications",
            "",
            guidance.relatedApplications
          ),
          section(
            "productCategories",
            "Possible Lubricant Categories",
            "",
            guidance.possibleLubricantCategories
          ),
          section("repTalkTrack", "Rep Talk Track", guidance.repTalkTrack),
        ].filter((s) => s.body || (s.items && s.items.length > 0)),
        followUpQuestions: guidance.questionsToAsk || [],
        sourceBadges: ["Troubleshooting guidance", "Training guidance"],
        cautionNotes: guidance.cautionNotes || [],
      };
    }
  }

  if (classification.intent === "product_differentiation") {
    const diffResp = buildProductDifferentiationResponse(question);
    if (diffResp.ok) {
      return {
        intent: "product_differentiation",
        confidence: intentConfidence("product_differentiation", classification.scores.product_differentiation),
        title: diffResp.title,
        directAnswer: diffResp.directAnswer,
        sections: diffResp.sections || [],
        followUpQuestions: diffResp.followUpQuestions || [],
        sourceBadges: diffResp.sourceBadges || ["Product differentiation"],
        cautionNotes: diffResp.cautionNotes || [],
      };
    }
  }

  if (classification.intent === "product_attribute") {
    const productAttribute = buildProductAttributeResponse(question);
    if (productAttribute.ok) {
      return {
        intent: "product_attribute",
        confidence: productAttribute.confidence,
        title: productAttribute.title,
        directAnswer: productAttribute.directAnswer,
        sections: productAttribute.sections || [],
        followUpQuestions: productAttribute.followUpQuestions || [],
        sourceBadges: productAttribute.sourceBadges || ["Product attribute intelligence"],
        cautionNotes: productAttribute.cautionNotes || [],
      };
    }
  }

  if (classification.intent === "vocabulary") {
    const vocabulary = buildVocabularyResponse(question);
    if (vocabulary.ok) {
      return {
        intent: "vocabulary",
        confidence: vocabulary.confidence,
        title: vocabulary.title,
        directAnswer: vocabulary.directAnswer,
        sections: vocabulary.sections || [],
        followUpQuestions: vocabulary.followUpQuestions || [],
        sourceBadges: vocabulary.sourceBadges || ["Field vocabulary"],
        cautionNotes: vocabulary.cautionNotes || [],
      };
    }
  }

  if (classification.intent === "discovery_question" && isExplicitDiscoveryQuestionQuery(question)) {
    const discovery = buildDiscoveryQuestionResponse(question);
    if (discovery.ok) {
      return {
        intent: "discovery_question",
        confidence: discovery.confidence,
        title: discovery.title,
        directAnswer: discovery.directAnswer,
        sections: discovery.sections || [],
        followUpQuestions: discovery.followUpQuestions || [],
        sourceBadges: discovery.sourceBadges || ["Discovery questions"],
        cautionNotes: discovery.cautionNotes || [],
      };
    }
  }

  if (classification.intent === "compatibility") {
    const compatibility = buildCompatibilityResponse(question);
    if (compatibility.ok) {
      return {
        intent: "compatibility",
        confidence: compatibility.confidence,
        title: compatibility.title,
        directAnswer: compatibility.directAnswer,
        sections: compatibility.sections || [],
        followUpQuestions: compatibility.followUpQuestions || [],
        sourceBadges: compatibility.sourceBadges || ["Compatibility guidance"],
        cautionNotes: compatibility.cautionNotes || [],
      };
    }
  }

  if (classification.intent === "role_sales") {
    const roleSales = buildRoleBasedSalesResponse(question);
    if (roleSales.ok) {
      return {
        intent: "role_sales",
        confidence: roleSales.confidence,
        title: roleSales.title,
        directAnswer: roleSales.directAnswer,
        sections: roleSales.sections || [],
        followUpQuestions: roleSales.followUpQuestions || [],
        sourceBadges: roleSales.sourceBadges || ["Sales translation"],
        cautionNotes: roleSales.cautionNotes || [],
      };
    }
  }

  if (classification.intent === "equipment") {
    const equipment = buildEquipmentLubricationResponse(question);
    if (equipment.ok) {
      return {
        intent: "equipment",
        confidence: equipment.confidence,
        title: equipment.equipment,
        directAnswer:
          (equipment.salesOpportunities || [])[0] ||
          equipment.message ||
          `Lubrication guidance for ${equipment.equipment}.`,
        sections: [
          section("lubricationSystems", "Lubrication Systems", "", equipment.lubricationSystems),
          section("operatingConditions", "Operating Conditions", "", equipment.operatingConditions),
          section("commonPainPoints", "Common Pain Points", "", equipment.commonPainPoints),
          section("commonFailures", "Common Failures", "", equipment.commonFailures),
          section(
            "likelyLubricantCategories",
            "Likely Lubricant Categories",
            "",
            (equipment.likelyLubricantCategories || []).map((c) => c.replace(/_/g, " "))
          ),
          section("salesOpportunities", "Sales Opportunities", "", equipment.salesOpportunities),
          section(
            "relatedConcepts",
            "Related Concepts",
            "",
            equipment.relatedConcepts || []
          ),
          section(
            "troubleshootingLinks",
            "Related Troubleshooting Topics",
            "",
            (equipment.troubleshootingLinks || []).map((t) => t.replace(/([A-Z])/g, " $1").trim())
          ),
        ].filter((s) => s.body || (s.items && s.items.length > 0)),
        followUpQuestions: equipment.commonQuestionsToAsk || [],
        sourceBadges: ["Equipment profile", "Product intelligence match"],
        cautionNotes: equipment.cautionNotes || [],
      };
    }
  }

  if (classification.intent === "industry") {
    const industry = buildIndustryLubricationResponse(question);
    if (industry.ok) {
      const useAreaSections = (industry.lubricantUseAreas || []).map((area, idx) =>
        section(
          `useArea-${idx}`,
          area.system,
          [
            area.salesAngle,
            area.equipmentExamples?.length
              ? `Equipment: ${area.equipmentExamples.join(", ")}`
              : "",
            area.likelyProductCategories?.length
              ? `Categories: ${area.likelyProductCategories.join(", ")}`
              : "",
          ]
            .filter(Boolean)
            .join(" ")
        )
      );

      const followUpQuestions = [
        ...new Set([
          ...(industry.recommendedOpeningQuestions || []),
          ...(industry.lubricantUseAreas || []).flatMap((a) => a.discoveryQuestions || []),
        ]),
      ].slice(0, 6);

      return {
        intent: "industry",
        confidence: industry.confidence,
        title: industry.industry,
        directAnswer: industry.answerSummary,
        sections: [
          section("commonEquipment", "Common Equipment", "", industry.commonEquipment),
          ...useAreaSections,
          section("painSignals", "Common Pain Signals", "", industry.commonPainSignals),
          section("repTalkTrack", "Rep Talk Track", industry.repTalkTrack),
          section("spotlightAngles", "Spotlight Angles", "", industry.spotlightAngles),
        ].filter((s) => s.body || (s.items && s.items.length > 0)),
        followUpQuestions,
        sourceBadges: ["Industry profile", "Product intelligence match"],
        cautionNotes: industry.cautionNotes || [],
      };
    }
  }

  if (classification.intent === "oem_spec") {
    const oemSpec = buildOemSpecAdvisorResponse(question);
    if (oemSpec.ok) {
      const productItems = (oemSpec.products || []).map((product) => {
        const specs = (product.matchedSpecs || []).join("; ");
        return specs ? `${product.productName} — ${specs}` : product.productName;
      });

      const cautionNotes = [...(oemSpec.cautionNotes || [])];
      if (oemSpec.productMatchStatus === "needs_confirmation") {
        cautionNotes.push(
          "No Klondike product in the current PDS index explicitly lists this OEM/spec—needs confirmation before quoting."
        );
      }

      return {
        intent: "oem_spec",
        confidence: oemSpec.confidence,
        title: oemSpec.name,
        directAnswer: oemSpec.explanation || oemSpec.repTalkTrack || oemSpec.message,
        sections: [
          section(
            "applicationCategory",
            "Application Category",
            (oemSpec.applicationCategory || "").replace(/_/g, " ")
          ),
          section("relatedSpecs", "Related Specs", "", oemSpec.relatedSpecs),
          section(
            "productCategories",
            "Product Categories to Consider",
            "",
            (oemSpec.productCategoriesToConsider || []).map((c) => c.replace(/_/g, " "))
          ),
          section("pdsProducts", "PDS-Matched Products", "", productItems),
          section("repTalkTrack", "Rep Talk Track", oemSpec.repTalkTrack),
          section("aliases", "Also Known As", "", oemSpec.aliases),
        ].filter((s) => s.body || (s.items && s.items.length > 0)),
        followUpQuestions: oemSpec.questionsToAsk || [],
        sourceBadges:
          oemSpec.productMatchStatus === "confirmed"
            ? ["OEM/spec profile", "PDS library match"]
            : ["OEM/spec profile", "Needs technical confirmation"],
        cautionNotes,
      };
    }
  }

  if (classification.intent === "product_category_selection") {
    const categorySelection = buildProductCategorySelectionResponse(question);
    if (categorySelection.ok) {
      return {
        intent: "product_category_selection",
        confidence: categorySelection.confidence,
        title: categorySelection.title,
        directAnswer: categorySelection.directAnswer,
        sections: categorySelection.sections || [],
        followUpQuestions: categorySelection.followUpQuestions || [],
        sourceBadges: categorySelection.sourceBadges || ["Product category selection"],
        cautionNotes: categorySelection.cautionNotes || [],
      };
    }
  }

  if (classification.intent === "concept") {
    const concept = buildConceptExplanation(question);
    const conceptMatch = detectLubricationConcepts(question)[0];
    if (concept.ok) {
      return {
        intent: "concept",
        confidence: concept.confidence,
        title: conceptMatch?.label || "Lubrication Concept",
        directAnswer: concept.directAnswer,
        sections: [
          section("whyItMatters", "Why It Matters", concept.whyItMatters),
          section("salesTranslation", "Sales Translation", concept.repGuidance),
          section("relatedApplications", "Related Applications", "", concept.applicationNotes),
          section(
            "relatedCategories",
            "Related Product Categories",
            "",
            (concept.relatedCategories || []).map((c) => c.replace(/_/g, " "))
          ),
        ].filter((s) => s.body || (s.items && s.items.length > 0)),
        followUpQuestions: [
          "What OEM requirements should I confirm?",
          "What operating conditions matter most on this account?",
          ...(concept.relatedCategories || []).slice(0, 2).map(
            (c) => `What KLONDIKE products apply to ${c.replace(/_/g, " ")}?`
          ),
        ].slice(0, 4),
        sourceBadges: ["Training guidance", "Product intelligence match"],
        cautionNotes: ["Verify OEM requirements and application details before recommending products."],
      };
    }
  }

  return {
    intent: "general",
    confidence: 0,
    title: "Need more detail",
    directAnswer: question
      ? "I need a little more detail to route this question. Try a specific symptom, equipment type, industry, or concept from the prompts below."
      : "I need a little more detail. Ask about a symptom, equipment, industry, or lubrication concept to get started.",
    sections: [],
    followUpQuestions: [...FALLBACK_PROMPTS],
    sourceBadges: ["Needs technical confirmation"],
    cautionNotes: ["Confirm equipment, OEM requirements, and in-service fluid before quoting."],
  };
}

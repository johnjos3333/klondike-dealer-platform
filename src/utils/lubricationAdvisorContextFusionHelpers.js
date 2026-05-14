/**
 * Lubrication Advisor context fusion — deterministic multi-domain response composition.
 * Plain JavaScript only; not wired to UI yet.
 */

import { SALES_ENABLEMENT_FLAGSHIP_NARRATIVES } from "../data/salesEnablement/flagshipNarratives.js";
import {
  getSalesEnablementFlagshipNarrativeById,
  getSalesEnablementFlagshipNarrativeByProductName,
  normalizeSalesEnablementFlagshipProductNameLabel,
  SALES_ENABLEMENT_FLAGSHIP_PRODUCT_NAME_ALIASES_NORMALIZED,
} from "../data/salesEnablement/salesEnablementFlagshipNarrativeLookup.js";
import { detectLubricationConcepts } from "./lubricationAdvisorCoreHelpers.js";
import { detectTroubleshootingIntent } from "./lubricationTroubleshootingHelpers.js";
import { detectIndustryIntent } from "./industryLubricationHelpers.js";
import { detectEquipmentIntent } from "./equipmentLubricationHelpers.js";
import { detectOemSpecIntent } from "./oemSpecAdvisorHelpers.js";
import { detectCompatibilityIntent } from "./lubricantCompatibilityHelpers.js";
import { detectProductCategorySelectionIntent } from "./productCategorySelectionHelpers.js";
import { detectRoleBasedSalesIntent } from "./roleBasedSalesTranslationHelpers.js";

const CONTEXT_MATCH_THRESHOLD = 6;

const FUSION_PHRASES = [
  "how do i explain",
  "how to explain",
  "how do i sell",
  "how to sell",
  "how do i position",
  "how to position",
  "explain to",
  "position for",
  "talk track for",
  "frame for",
];

/** @param {unknown} raw */
function normalizeFusionText(raw) {
  return String(raw ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9#]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** @returns {import("../data/salesEnablement/flagshipNarratives.js").SalesEnablementFlagshipNarrative[]} */
function listFlagships() {
  const list = SALES_ENABLEMENT_FLAGSHIP_NARRATIVES?.flagships;
  return Array.isArray(list) ? list : [];
}

/**
 * @param {unknown} inputText
 */
function detectFlagshipProductContext(inputText) {
  const question = String(inputText ?? "").trim();
  const normalized = normalizeFusionText(question);
  const empty = {
    matched: false,
    score: 0,
    id: null,
    narrative: null,
    matchedLabel: null,
  };
  if (!normalized) return empty;

  const direct = getSalesEnablementFlagshipNarrativeByProductName(question);
  if (direct) {
    return {
      matched: true,
      score: 24 + direct.productName.length,
      id: direct.id,
      narrative: direct,
      matchedLabel: direct.productName,
    };
  }

  /** @type {{ alias: string, id: string } | null} */
  let bestAlias = null;
  for (const [alias, id] of Object.entries(SALES_ENABLEMENT_FLAGSHIP_PRODUCT_NAME_ALIASES_NORMALIZED)) {
    if (!normalized.includes(alias)) continue;
    if (!bestAlias || alias.length > bestAlias.alias.length) {
      bestAlias = { alias, id };
    }
  }
  if (bestAlias) {
    const narrative = getSalesEnablementFlagshipNarrativeById(bestAlias.id);
    if (narrative) {
      return {
        matched: true,
        score: 12 + bestAlias.alias.length,
        id: narrative.id,
        narrative,
        matchedLabel: bestAlias.alias,
      };
    }
  }

  /** @type {import("../data/salesEnablement/flagshipNarratives.js").SalesEnablementFlagshipNarrative | null} */
  let bestName = null;
  for (const flagship of listFlagships()) {
    const productNorm = normalizeSalesEnablementFlagshipProductNameLabel(flagship.productName);
    if (!productNorm || !normalized.includes(productNorm)) continue;
    if (!bestName || productNorm.length > normalizeSalesEnablementFlagshipProductNameLabel(bestName.productName).length) {
      bestName = flagship;
    }
  }
  if (bestName) {
    return {
      matched: true,
      score: 12 + normalizeSalesEnablementFlagshipProductNameLabel(bestName.productName).length,
      id: bestName.id,
      narrative: bestName,
      matchedLabel: bestName.productName,
    };
  }

  return empty;
}

/**
 * @param {Array<{ score: number, id: string, title?: string, profile?: unknown }>} matches
 * @param {string} key
 */
function wrapIntentMatches(matches, key) {
  const top = matches[0];
  if (!top || top.score < CONTEXT_MATCH_THRESHOLD) {
    return { matched: false, score: 0, id: null, title: null, profile: null, matches: [] };
  }
  return {
    matched: true,
    score: top.score,
    id: top.id,
    title: top.title || top.label || null,
    profile: top.profile || null,
    matches,
  };
}

/**
 * @param {unknown} inputText
 */
function hasFusionCue(inputText) {
  const normalized = normalizeFusionText(inputText);
  return FUSION_PHRASES.some((phrase) => normalized.includes(phrase));
}

/**
 * @param {ReturnType<typeof detectAdvisorContexts>} contexts
 */
function countActiveContexts(contexts) {
  return Object.values(contexts).filter((ctx) => ctx?.matched).length;
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
 * @param {string[]} lists
 */
function uniqueItems(...lists) {
  return [...new Set(lists.flat().filter(Boolean))].slice(0, 12);
}

/**
 * @param {unknown} inputText
 * @returns {{
 *   role: { matched: boolean, score: number, id: string | null, title: string | null, profile: unknown, matches: unknown[] },
 *   product: { matched: boolean, score: number, id: string | null, narrative: import("../data/salesEnablement/flagshipNarratives.js").SalesEnablementFlagshipNarrative | null, matchedLabel: string | null },
 *   industry: { matched: boolean, score: number, id: string | null, title: string | null, profile: unknown, matches: unknown[] },
 *   equipment: { matched: boolean, score: number, id: string | null, title: string | null, profile: unknown, matches: unknown[] },
 *   troubleshooting: { matched: boolean, score: number, id: string | null, title: string | null, profile: unknown, matches: unknown[] },
 *   oemSpec: { matched: boolean, score: number, id: string | null, title: string | null, profile: unknown, matches: unknown[] },
 *   compatibility: { matched: boolean, score: number, id: string | null, title: string | null, profile: unknown, matches: unknown[] },
 *   productCategory: { matched: boolean, score: number, id: string | null, title: string | null, profile: unknown, matches: unknown[] },
 *   concepts: { matched: boolean, score: number, id: string | null, title: string | null, profile: unknown, matches: unknown[] },
 *   fusionCue: boolean,
 *   activeCount: number,
 * }}
 */
export function detectAdvisorContexts(inputText) {
  const question = String(inputText ?? "").trim();

  const roleMatches = detectRoleBasedSalesIntent(question);
  const product = detectFlagshipProductContext(question);
  const industryMatches = detectIndustryIntent(question);
  const equipmentMatches = detectEquipmentIntent(question);
  const troubleshootingMatches = detectTroubleshootingIntent(question);
  const oemSpecMatches = detectOemSpecIntent(question);
  const compatibilityMatches = detectCompatibilityIntent(question);
  const productCategoryMatches = detectProductCategorySelectionIntent(question);
  const conceptMatches = detectLubricationConcepts(question);

  const role = wrapIntentMatches(roleMatches, "role");
  const industry = wrapIntentMatches(industryMatches, "industry");
  const equipment = wrapIntentMatches(equipmentMatches, "equipment");
  const troubleshooting = wrapIntentMatches(troubleshootingMatches, "troubleshooting");
  const oemSpec = wrapIntentMatches(oemSpecMatches, "oemSpec");
  const compatibility = wrapIntentMatches(compatibilityMatches, "compatibility");
  const productCategory = wrapIntentMatches(productCategoryMatches, "productCategory");

  const topConcept = conceptMatches[0];
  const concepts =
    topConcept && topConcept.score >= CONTEXT_MATCH_THRESHOLD
      ? {
          matched: true,
          score: topConcept.score,
          id: topConcept.id,
          title: topConcept.label || null,
          profile: topConcept,
          matches: conceptMatches,
        }
      : { matched: false, score: 0, id: null, title: null, profile: null, matches: [] };

  const contexts = {
    role,
    product,
    industry,
    equipment,
    troubleshooting,
    oemSpec,
    compatibility,
    productCategory,
    concepts,
    fusionCue: hasFusionCue(question),
    activeCount: 0,
  };

  contexts.activeCount = countActiveContexts(contexts);
  return contexts;
}

/**
 * @param {ReturnType<typeof detectAdvisorContexts>} contexts
 */
function shouldFuse(contexts) {
  if (contexts.product.matched && contexts.role.matched) return true;
  if (contexts.fusionCue && contexts.activeCount >= 2) return true;
  if (contexts.activeCount >= 3) return true;
  return false;
}

/**
 * @param {ReturnType<typeof detectAdvisorContexts>} contexts
 * @param {string} question
 */
function buildFusionTitle(contexts, question) {
  const parts = [];
  if (contexts.product.narrative?.productName) parts.push(contexts.product.narrative.productName);
  if (contexts.role.profile?.role) parts.push(`for ${contexts.role.profile.role}`);
  else if (contexts.industry.title) parts.push(`— ${contexts.industry.title}`);
  else if (contexts.equipment.title) parts.push(`— ${contexts.equipment.title}`);
  if (parts.length) return parts.join(" ");
  if (contexts.troubleshooting.title) return `Guidance: ${contexts.troubleshooting.title}`;
  return question ? "Multi-context lubrication guidance" : "Context fusion";
}

/**
 * @param {ReturnType<typeof detectAdvisorContexts>} contexts
 */
function buildFusionDirectAnswer(contexts) {
  const product = contexts.product.narrative;
  const role = contexts.role.profile;

  if (product && role) {
    return `Position ${product.productName} for a ${role.role} by leading with what they prioritize—${(role.whatTheyCareAbout || []).slice(0, 2).join("; ")}—then anchor to PDS-backed proof: ${product.whyItWins || product.flagshipPositioning}`;
  }

  if (product) {
    return product.flagshipPositioning || product.whyItWins || product.flagshipNarrativeParagraph || "";
  }

  if (role) {
    return `When speaking with a ${role.role}, frame lubrication value around their operational priorities and use documented specs—not unsupported product claims.`;
  }

  const fragments = [];
  if (contexts.troubleshooting.profile) {
    fragments.push(
      contexts.troubleshooting.profile.repTalkTrack ||
        contexts.troubleshooting.profile.directAnswer ||
        `Address ${contexts.troubleshooting.title} with symptom-first discovery.`
    );
  }
  if (contexts.industry.profile?.answerSummary) fragments.push(contexts.industry.profile.answerSummary);
  if (contexts.equipment.profile?.salesOpportunities?.[0]) {
    fragments.push(contexts.equipment.profile.salesOpportunities[0]);
  }
  return fragments.filter(Boolean).join(" ") || "Combine the matched contexts below into one customer-ready conversation.";
}

/**
 * @param {ReturnType<typeof detectAdvisorContexts>} contexts
 */
function buildFusionSections(contexts) {
  const product = contexts.product.narrative;
  const role = contexts.role.profile;
  /** @type {Array<{ id: string, title: string, body?: string, items?: string[] }>} */
  const sections = [];

  if (product) {
    sections.push(
      section(
        "whyThisProductWins",
        "Why This Product Wins",
        product.whyItWins || product.flagshipPositioning,
        uniqueItems(
          product.keyDifferentiators,
          product.whatMakesThisDifferent,
          product.severeDutyUseCases
        )
      )
    );
  }

  if (role) {
    sections.push(
      section("whatThisRoleCaresAbout", "What This Role Cares About", "", role.whatTheyCareAbout),
      section("howToFrameValue", "How to Frame Value", "", role.howToFrameValue)
    );
  }

  const operationalItems = uniqueItems(
    product?.operationalConsequences,
    product?.customerPainSignals,
    contexts.troubleshooting.profile?.operationalConsequences,
    contexts.equipment.profile?.commonFailures
  );
  if (operationalItems.length) {
    sections.push(section("operationalConsequences", "Operational Consequences", "", operationalItems));
  }

  if (product?.premiumProofPoints?.length) {
    sections.push(section("pdsBackedProof", "PDS-Backed Proof", "", product.premiumProofPoints));
  } else if (contexts.oemSpec.profile?.relatedSpecs?.length) {
    sections.push(
      section("pdsBackedProof", "PDS-Backed Proof", "", contexts.oemSpec.profile.relatedSpecs)
    );
  }

  const talkTrackItems = uniqueItems(
    product?.repTalkTrack,
    product?.dealerTalkingPoints,
    role?.exampleTalkTracks,
    contexts.industry.profile?.repTalkTrack ? [contexts.industry.profile.repTalkTrack] : [],
    contexts.troubleshooting.profile?.repTalkTrack
      ? [contexts.troubleshooting.profile.repTalkTrack]
      : []
  );
  if (talkTrackItems.length) {
    sections.push(section("repTalkTrack", "Rep Talk Track", "", talkTrackItems));
  }

  const questionItems = uniqueItems(
    role?.questionsToAsk,
    contexts.troubleshooting.profile?.questionsToAsk,
    contexts.equipment.profile?.commonQuestionsToAsk,
    contexts.industry.profile?.recommendedOpeningQuestions,
    contexts.oemSpec.profile?.questionsToAsk,
    contexts.compatibility.profile?.questionsToAsk
  );
  if (questionItems.length) {
    sections.push(section("questionsToAsk", "Questions to Ask", "", questionItems));
  }

  const upgradeItems = uniqueItems(
    product?.operationalWins,
    product?.severeDutyUseCases,
    role?.howToFrameValue,
    contexts.productCategory.profile?.upgradeAngles,
    contexts.equipment.profile?.salesOpportunities
  );
  if (upgradeItems.length) {
    sections.push(section("upgradeOpportunity", "Upgrade Opportunity", "", upgradeItems));
  }

  if (contexts.compatibility.profile) {
    sections.push(
      section(
        "compatibilityNotes",
        "Compatibility Notes",
        contexts.compatibility.profile.compatibilitySummary ||
          contexts.compatibility.profile.directAnswer,
        uniqueItems(
          contexts.compatibility.profile.safePractices,
          contexts.compatibility.profile.whenToAvoidMixing
        )
      )
    );
  }

  if (contexts.concepts.profile) {
    sections.push(
      section(
        "relatedConcept",
        "Related Concept",
        contexts.concepts.profile.directAnswer || contexts.concepts.title || "",
        contexts.concepts.profile.applicationNotes || []
      )
    );
  }

  return sections.filter((s) => s.body || (s.items && s.items.length > 0));
}

/**
 * @param {ReturnType<typeof detectAdvisorContexts>} contexts
 */
function buildFusionSourceBadges(contexts) {
  const badges = [];
  if (contexts.product.matched) badges.push("Flagship product intelligence");
  if (contexts.role.matched) badges.push("Sales translation");
  if (contexts.troubleshooting.matched) badges.push("Troubleshooting guidance");
  if (contexts.industry.matched) badges.push("Industry profile");
  if (contexts.equipment.matched) badges.push("Equipment profile");
  if (contexts.oemSpec.matched) badges.push("OEM/spec profile");
  if (contexts.compatibility.matched) badges.push("Compatibility guidance");
  if (contexts.productCategory.matched) badges.push("Product category selection");
  if (contexts.concepts.matched) badges.push("Training guidance");
  if (!badges.length) badges.push("Context fusion");
  return [...new Set(badges)];
}

/**
 * @param {ReturnType<typeof detectAdvisorContexts>} contexts
 */
function buildFusionCautionNotes(contexts) {
  const product = contexts.product.narrative;
  const role = contexts.role.profile;
  return uniqueItems(
    product?.doNotSay,
    role?.cautionNotes,
    contexts.compatibility.profile?.cautionNotes,
    contexts.oemSpec.profile?.cautionNotes,
    ["Keep claims inside PDS and OEM documentation—confirm application details before quoting."]
  );
}

/**
 * @param {unknown} inputText
 * @returns {{
 *   ok: boolean,
 *   contexts: ReturnType<typeof detectAdvisorContexts>,
 *   title: string,
 *   directAnswer: string,
 *   sections: Array<{ id: string, title: string, body?: string, items?: string[] }>,
 *   followUpQuestions: string[],
 *   sourceBadges: string[],
 *   cautionNotes: string[],
 *   message: string,
 * }}
 */
export function buildContextFusionResponse(inputText) {
  const question = String(inputText ?? "").trim();
  const contexts = detectAdvisorContexts(question);

  const empty = {
    ok: false,
    contexts,
    title: "",
    directAnswer: "",
    sections: [],
    followUpQuestions: [],
    sourceBadges: ["Context fusion"],
    cautionNotes: [],
    message: "",
  };

  if (!question) {
    return {
      ...empty,
      message:
        "Ask a multi-context question—e.g. how to explain a flagship product to a maintenance manager, or position grease for a quarry operations lead.",
    };
  }

  if (!shouldFuse(contexts)) {
    return {
      ...empty,
      message:
        contexts.activeCount < 2
          ? "Context fusion needs at least two matched domains (e.g. product + role). Try naming a KLONDIKE flagship and the audience."
          : "Multiple domains detected but fusion cue not strong enough. Try phrasing like “How do I explain Nano EP2 to a maintenance manager?”",
    };
  }

  const title = buildFusionTitle(contexts, question);
  const directAnswer = buildFusionDirectAnswer(contexts);
  const sections = buildFusionSections(contexts);
  const followUpQuestions = uniqueItems(
    contexts.role.profile?.questionsToAsk,
    contexts.troubleshooting.profile?.questionsToAsk,
    contexts.equipment.profile?.commonQuestionsToAsk,
    contexts.industry.profile?.recommendedOpeningQuestions
  ).slice(0, 6);

  return {
    ok: true,
    contexts,
    title,
    directAnswer,
    sections,
    followUpQuestions,
    sourceBadges: buildFusionSourceBadges(contexts),
    cautionNotes: buildFusionCautionNotes(contexts),
    message: `Fused ${contexts.activeCount} context domain(s) into one response.`,
  };
}

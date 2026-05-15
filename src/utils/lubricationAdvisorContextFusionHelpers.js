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
import { detectProductAttributeIntent } from "./productAttributeAdvisorHelpers.js";
import {
  NANO_EP_2_FLAGSHIP_PRODUCT_ID,
  NANO_EP_2_FLAGSHIP_PRODUCT_INTELLIGENCE,
} from "../data/flagshipProductIntelligence.js";

const CONTEXT_MATCH_THRESHOLD = 6;

/** Additional fusion-layer flagship aliases (longest-match wins). */
const FUSION_FLAGSHIP_PRODUCT_ALIASES = {
  "flagship-nano-ep-2-grease": [
    "klondike nano calcium sulfonate ep",
    "klondike nano calcium sulfonate",
    "nano calcium sulfonate",
    "calcium sulfonate nano",
    "klondike nano ep2",
    "klondike nano ep 2",
    "klondike nano",
    "nano ep 2",
    "nano ep2",
    "nano ep",
    "nano grease",
    "nano",
    "what is nano grease",
    "explain nano ep2",
    "explain nano ep 2",
  ],
};

/** Product-specific education supplements for fusion responses (fusion layer only). */
const PRODUCT_EDUCATION_SUPPLEMENTS = {
  [NANO_EP_2_FLAGSHIP_PRODUCT_ID]: {
    whatItIsIntro: NANO_EP_2_FLAGSHIP_PRODUCT_INTELLIGENCE.whatItIsIntro,
    whatItIsDetails: [...NANO_EP_2_FLAGSHIP_PRODUCT_INTELLIGENCE.whatItIsDetails],
    whereItFits: [...NANO_EP_2_FLAGSHIP_PRODUCT_INTELLIGENCE.severeDutyUseCases],
    questionsToAsk: [...NANO_EP_2_FLAGSHIP_PRODUCT_INTELLIGENCE.questionsToAsk],
    confirmBeforeUse: [...NANO_EP_2_FLAGSHIP_PRODUCT_INTELLIGENCE.confirmBeforeUse],
  },
};

const FUSION_PHRASES = [
  "how do i explain",
  "how to explain",
  "how do i sell",
  "how to sell",
  "how do i position",
  "how to position",
  "how do i talk to",
  "how to talk to",
  "explain to",
  "position for",
  "talk track for",
  "talk track",
  "frame for",
];

/** Explicit sales/audience cues required before role counts toward fusion. */
const ROLE_FUSION_CUES = [
  "how do i explain",
  "how to explain",
  "how do i sell",
  "how to sell",
  "how do i talk to",
  "how to talk to",
  "talk track",
  "objection",
  "customer conversation",
  "maintenance manager",
  "maintenance supervisor",
  "owner",
  "executive",
  "purchasing",
  "procurement",
  "fleet manager",
  "operations manager",
];

/** Coaching/meta roles need explicit sales cues — not brand name alone. */
const META_ROLE_IDS = new Set(["dealerRep", "newLubricantSalesperson"]);

const PRODUCT_CARRY_PHRASES = [
  "does klondike carry",
  "does klondike have",
  "does klondike offer",
  "do you carry",
  "do you have",
  "do you offer",
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

  /** @type {Array<{ alias: string, id: string }>} */
  const fusionAliasEntries = [];
  for (const [id, aliases] of Object.entries(FUSION_FLAGSHIP_PRODUCT_ALIASES)) {
    for (const alias of aliases) {
      fusionAliasEntries.push({ alias: normalizeFusionText(alias), id });
    }
  }
  fusionAliasEntries.sort((a, b) => b.alias.length - a.alias.length);

  const tokens = normalized.split(" ").filter(Boolean);
  for (const { alias, id } of fusionAliasEntries) {
    if (!alias) continue;
    const tokenHit = alias.length <= 4 && (tokens.includes(alias) || normalized === alias);
    const phraseHit = alias.length > 4 && normalized.includes(alias);
    if (!tokenHit && !phraseHit) continue;

    const narrative = getSalesEnablementFlagshipNarrativeById(id);
    if (narrative) {
      return {
        matched: true,
        score: 16 + alias.length,
        id: narrative.id,
        narrative,
        matchedLabel: alias,
      };
    }
  }

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
 * @param {string} question
 * @param {{ id: string, score: number, title?: string, profile?: { role?: string, aliases?: string[] } }} | undefined} roleMatch
 */
function roleQualifiesForFusion(question, roleMatch) {
  if (!roleMatch || roleMatch.score < CONTEXT_MATCH_THRESHOLD) return false;

  const normalized = normalizeFusionText(question);
  if (ROLE_FUSION_CUES.some((cue) => normalized.includes(cue))) return true;

  if (META_ROLE_IDS.has(roleMatch.id)) return false;

  const profile = roleMatch.profile;
  if (profile?.role) {
    const roleNorm = normalizeFusionText(profile.role);
    if (roleNorm.length > 4 && normalized.includes(roleNorm)) return true;
  }
  for (const alias of profile?.aliases || []) {
    const aliasNorm = normalizeFusionText(alias);
    if (aliasNorm.length > 4 && normalized.includes(aliasNorm)) return true;
  }
  return false;
}

/**
 * @param {string} question
 */
function isProductCarryQuery(question) {
  const normalized = normalizeFusionText(question);
  return PRODUCT_CARRY_PHRASES.some((phrase) => normalized.includes(phrase));
}

/**
 * @param {string} question
 */
function wrapProductAttributeContext(question) {
  const matches = detectProductAttributeIntent(question);
  const top = matches[0];
  if (!top || top.score < CONTEXT_MATCH_THRESHOLD) {
    return {
      matched: false,
      score: 0,
      id: null,
      title: null,
      profile: null,
      matches: [],
    };
  }
  return {
    matched: true,
    score: top.score,
    id: top.id,
    title: top.title,
    profile: top.profile,
    matches,
  };
}

/**
 * @param {string} question
 * @param {ReturnType<typeof detectRoleBasedSalesIntent>} roleMatches
 */
function wrapRoleContextForFusion(question, roleMatches) {
  const top = roleMatches[0];
  if (!top || !roleQualifiesForFusion(question, top)) {
    return {
      matched: false,
      score: 0,
      id: null,
      title: null,
      profile: null,
      matches: [],
    };
  }
  return {
    matched: true,
    score: top.score,
    id: top.id,
    title: top.title || top.profile?.role || null,
    profile: top.profile || null,
    matches: roleMatches,
  };
}

/**
 * @param {ReturnType<typeof detectAdvisorContexts>} contexts
 */
function countActiveContexts(contexts) {
  const keys = [
    "role",
    "product",
    "industry",
    "equipment",
    "troubleshooting",
    "oemSpec",
    "compatibility",
    "productCategory",
    "concepts",
  ];
  return keys.filter((key) => contexts[key]?.matched).length;
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
 *   productAttribute: { matched: boolean, score: number, id: string | null, title: string | null, profile: unknown, matches: unknown[] },
 *   fusionCue: boolean,
 *   activeCount: number,
 * }}
 */
export function detectAdvisorContexts(inputText) {
  const question = String(inputText ?? "").trim();

  const roleMatches = detectRoleBasedSalesIntent(question);
  const productAttribute = wrapProductAttributeContext(question);
  const product = detectFlagshipProductContext(question);
  const industryMatches = detectIndustryIntent(question);
  const equipmentMatches = detectEquipmentIntent(question);
  const troubleshootingMatches = detectTroubleshootingIntent(question);
  const oemSpecMatches = detectOemSpecIntent(question);
  const compatibilityMatches = detectCompatibilityIntent(question);
  const productCategoryMatches = detectProductCategorySelectionIntent(question);
  const conceptMatches = detectLubricationConcepts(question);

  const role = wrapRoleContextForFusion(question, roleMatches);
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
    productAttribute,
    fusionCue: hasFusionCue(question),
    activeCount: 0,
  };

  contexts.activeCount = countActiveContexts(contexts);
  return contexts;
}

/**
 * @param {ReturnType<typeof detectAdvisorContexts>} contexts
 * @param {string} question
 */
function shouldFuse(contexts, question) {
  if (contexts.productAttribute.matched) {
    if (isProductCarryQuery(question)) return false;
    if (contexts.product.matched && contexts.role.matched) return true;
    return false;
  }

  if (contexts.product.matched && contexts.role.matched) return true;
  if (contexts.product.matched) return true;
  if (contexts.fusionCue && contexts.activeCount >= 2) return true;
  if (contexts.activeCount >= 3) return true;
  return false;
}

/**
 * @param {import("../data/salesEnablement/flagshipNarratives.js").SalesEnablementFlagshipNarrative} product
 */
function getProductEducationSupplement(product) {
  return PRODUCT_EDUCATION_SUPPLEMENTS[product.id] || null;
}

/**
 * @param {ReturnType<typeof detectAdvisorContexts>} contexts
 */
function buildProductCentricSections(contexts) {
  const product = contexts.product.narrative;
  const role = contexts.role.profile;
  if (!product) return [];

  const supplement = getProductEducationSupplement(product);
  /** @type {Array<{ id: string, title: string, body?: string, items?: string[] }>} */
  const sections = [];

  sections.push(
    section(
      "whatItIs",
      "What It Is",
      supplement?.whatItIsIntro || product.fieldIdentity || product.flagshipNarrativeParagraph,
      uniqueItems(
        supplement?.whatItIsDetails,
        product.whatMakesThisDifferent,
        product.keyDifferentiators?.filter((line) =>
          /calcium sulfonate|tungsten|thickener|commodity|shock|washout|weld|dropping/i.test(line)
        )
      )
    ),
    section(
      "whyItWins",
      "Why It Wins",
      product.whyItWins || product.flagshipPositioning,
      uniqueItems(
        product.keyDifferentiators?.filter((line) =>
          /shock|washout|weld|timken|tungsten|severe/i.test(line)
        ),
        product.whatMakesThisDifferent
      )
    ),
    section(
      "whereItFits",
      "Where It Fits",
      product.fieldIdentity,
      uniqueItems(supplement?.whereItFits, product.severeDutyUseCases)
    )
  );

  if (product.premiumProofPoints?.length) {
    sections.push(section("pdsBackedProof", "PDS-Backed Proof", "", product.premiumProofPoints));
  }

  const talkTrackItems = uniqueItems(product.repTalkTrack, product.dealerTalkingPoints);
  if (role?.exampleTalkTracks?.length) {
    talkTrackItems.push(...role.exampleTalkTracks.slice(0, 2));
  }
  if (talkTrackItems.length) {
    sections.push(section("repTalkTrack", "Rep Talk Track", "", talkTrackItems));
  }

  const questionItems = uniqueItems(
    supplement?.questionsToAsk,
    role?.questionsToAsk,
    ["What OEM or thickener is approved for this pin or auto-lube system?"]
  );
  if (questionItems.length) {
    sections.push(section("questionsToAsk", "Questions to Ask", "", questionItems));
  }

  const confirmItems = uniqueItems(supplement?.confirmBeforeUse, product.doNotSay);
  if (confirmItems.length) {
    sections.push(section("confirmBeforeUse", "Confirm Before Use", "", confirmItems));
  }

  if (role) {
    sections.push(
      section("whatThisRoleCaresAbout", "What This Role Cares About", "", role.whatTheyCareAbout),
      section("howToFrameValue", "How to Frame Value", "", role.howToFrameValue)
    );
  }

  return sections.filter((s) => s.body || (s.items && s.items.length > 0));
}

/**
 * @param {ReturnType<typeof detectAdvisorContexts>} contexts
 * @param {string} question
 */
function buildFusionTitle(contexts, question) {
  if (contexts.product.narrative?.productName) {
    const parts = [contexts.product.narrative.productName];
    if (contexts.role.profile?.role) parts.push(`for ${contexts.role.profile.role}`);
    return parts.join(" ");
  }
  const parts = [];
  if (contexts.industry.title) parts.push(contexts.industry.title);
  if (contexts.equipment.title) parts.push(contexts.equipment.title);
  if (parts.length) return parts.join(" — ");
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
    const supplement = getProductEducationSupplement(product);
    if (supplement?.whatItIsIntro) {
      return `${supplement.whatItIsIntro} ${product.whyItWins || product.flagshipPositioning}`;
    }
    return product.flagshipNarrativeParagraph || product.flagshipPositioning || product.whyItWins || "";
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

  if (product) {
    return buildProductCentricSections(contexts);
  }

  /** @type {Array<{ id: string, title: string, body?: string, items?: string[] }>} */
  const sections = [];

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

  if (!shouldFuse(contexts, question)) {
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
    contexts.product.narrative
      ? getProductEducationSupplement(contexts.product.narrative)?.questionsToAsk
      : [],
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

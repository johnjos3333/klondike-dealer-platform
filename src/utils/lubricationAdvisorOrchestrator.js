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

const MATCH_THRESHOLD = 6;
/** Scores within this margin of the top score are treated as a tie for priority resolution. */
const TIE_SCORE_MARGIN = 8;

const INTENT_PRIORITY = [
  "troubleshooting",
  "product_attribute",
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
  product_attribute: 34,
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
  product_attribute: (matches) => matches.productAttributeMatches,
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
 *   intent: "troubleshooting" | "product_attribute" | "discovery_question" | "compatibility" | "role_sales" | "equipment" | "industry" | "oem_spec" | "product_category_selection" | "concept" | "general",
 *   confidence: number,
 *   matchId: string | null,
 *   scores: {
 *     troubleshooting: number,
 *     product_attribute: number,
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
  const productAttributeMatches = detectProductAttributeIntent(question);
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
    product_attribute: productAttributeMatches[0]?.score || 0,
    discovery_question: discoveryQuestionMatches[0]?.score || 0,
    compatibility: compatibilityMatches[0]?.score || 0,
    role_sales: roleSalesMatches[0]?.score || 0,
    equipment: equipmentMatches[0]?.score || 0,
    industry: industryMatches[0]?.score || 0,
    oem_spec: oemSpecMatches[0]?.score || 0,
    product_category_selection: productCategoryMatches[0]?.score || 0,
    concept: conceptMatches[0]?.score || 0,
  };

  if (!question) {
    return { intent: "general", confidence: 0, matchId: null, scores };
  }

  const intent = resolveIntentFromScores(scores);
  if (intent === "general") {
    return { intent: "general", confidence: 0, matchId: null, scores };
  }

  const matchLists = {
    troubleshootingMatches,
    productAttributeMatches,
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
 * }}
 */
export function buildLubricationAdvisorResponse(inputText) {
  const question = String(inputText ?? "").trim();

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

  if (classification.intent === "discovery_question") {
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

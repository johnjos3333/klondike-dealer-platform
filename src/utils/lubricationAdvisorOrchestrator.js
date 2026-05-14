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

const MATCH_THRESHOLD = 6;

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
 *   intent: "troubleshooting" | "equipment" | "industry" | "concept" | "general",
 *   confidence: number,
 *   matchId: string | null,
 *   scores: { troubleshooting: number, equipment: number, industry: number, concept: number },
 * }}
 */
export function classifyLubricationAdvisorIntent(inputText) {
  const question = String(inputText ?? "").trim();
  const troubleshootingMatches = detectTroubleshootingIntent(question);
  const equipmentMatches = detectEquipmentIntent(question);
  const industryMatches = detectIndustryIntent(question);
  const conceptMatches = detectLubricationConcepts(question);

  const scores = {
    troubleshooting: troubleshootingMatches[0]?.score || 0,
    equipment: equipmentMatches[0]?.score || 0,
    industry: industryMatches[0]?.score || 0,
    concept: conceptMatches[0]?.score || 0,
  };

  if (!question) {
    return { intent: "general", confidence: 0, matchId: null, scores };
  }

  if (scores.troubleshooting >= MATCH_THRESHOLD) {
    return {
      intent: "troubleshooting",
      confidence: Math.min(1, scores.troubleshooting / 32),
      matchId: troubleshootingMatches[0].id,
      scores,
    };
  }

  if (scores.equipment >= MATCH_THRESHOLD) {
    return {
      intent: "equipment",
      confidence: Math.min(1, scores.equipment / 34),
      matchId: equipmentMatches[0].id,
      scores,
    };
  }

  if (scores.industry >= MATCH_THRESHOLD) {
    return {
      intent: "industry",
      confidence: Math.min(1, scores.industry / 34),
      matchId: industryMatches[0].id,
      scores,
    };
  }

  if (scores.concept >= MATCH_THRESHOLD) {
    return {
      intent: "concept",
      confidence: Math.min(1, scores.concept / 28),
      matchId: conceptMatches[0].id,
      scores,
    };
  }

  return { intent: "general", confidence: 0, matchId: null, scores };
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

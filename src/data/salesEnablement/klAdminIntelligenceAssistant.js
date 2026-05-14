/**
 * Phase 79.0 — KL Admin Intelligence Assistant (deterministic recommendation foundation).
 * Preview / planning helper only — not wired to send payloads or external systems.
 */

/** @typedef {"dealer" | "territory"} KlAdminAssistantMode */

/** @typedef {"growth" | "stable" | "slight_decline" | "severe_decline"} KlAdminPerformanceTrend */

/** @typedef {"none" | "light" | "full_non_performance"} KlAdminCategoryGap */

/** @typedef {"strong" | "neutral" | "needs_coaching" | "at_risk"} KlAdminRelationshipHealth */

/** @typedef {"established" | "kickoff" | "onboarding"} KlAdminDealerLifecycle */

/** @typedef {"none" | "due_soon" | "overdue"} KlAdminOperationalReview */

/** @typedef {"none" | "quarterly_due" | "semi_annual_due"} KlAdminStrategicReview */

/**
 * @typedef {{
 *   assistantMode?: unknown,
 *   performanceTrend?: unknown,
 *   categoryGap?: unknown,
 *   relationshipHealth?: unknown,
 *   dealerLifecycle?: unknown,
 *   operationalReviewCadence?: unknown,
 *   strategicReviewCadence?: unknown,
 *   customerProfileId?: unknown,
 *   territoryLabel?: unknown,
 * }} KlAdminIntelligenceAssistantInput
 */

/**
 * @typedef {{
 *   ok: boolean,
 *   assistantMode: KlAdminAssistantMode,
 *   recommendedActionType: string,
 *   priority: string,
 *   title: string,
 *   reason: string,
 *   suggestedActionLabel: string,
 *   recommendedCadence: string,
 *   relatedSpotlightQuery: string,
 *   relatedTrainingTopic: string,
 *   customerProfileId: string,
 *   notes: string,
 * }} KlAdminIntelligenceRecommendation
 */

const ACTION = {
  SPOTLIGHT: "Spotlight",
  KLONDIKE_U: "Klondike U",
  FIELD_RIDE_ALONG: "Field Ride-Along",
  IN_PERSON_TRAINING: "In-Person Training",
  FIELD_AUDIT: "Field Audit",
  BUSINESS_REVIEW: "Business Review",
  MOMENTUM_ACTION: "Momentum Action",
};

/** @param {unknown} v @param {string[]} allowed @param {string} fallback */
function enumStr(v, allowed, fallback) {
  const s = String(v ?? "").trim();
  return allowed.includes(s) ? s : fallback;
}

/**
 * Deterministic next-best enablement recommendation for KL Admin.
 *
 * Precedence (first match wins): severe decline / kickoff / onboarding → In-Person Training;
 * operational review window → Field Audit; strategic growth review → Business Review;
 * full category gap → Klondike U; relationship coaching signal → Field Ride-Along;
 * slight decline or light category gap → Spotlight; otherwise momentum when performance is smooth.
 *
 * @param {KlAdminIntelligenceAssistantInput} input
 * @returns {KlAdminIntelligenceRecommendation}
 */
export function getKlAdminIntelligenceRecommendation(input) {
  if (!input || typeof input !== "object") {
    return {
      ok: false,
      assistantMode: "dealer",
      recommendedActionType: ACTION.MOMENTUM_ACTION,
      priority: "P7",
      title: "Assistant needs a structured input object",
      reason: "Add territory or dealer signals when you are ready—the assistant stays deterministic and auditable.",
      suggestedActionLabel: "Prepare input snapshot",
      recommendedCadence: "N/A",
      relatedSpotlightQuery: "",
      relatedTrainingTopic: "",
      customerProfileId: "",
      notes: "Invalid or missing input.",
    };
  }

  const assistantMode = /** @type {KlAdminAssistantMode} */ (
    enumStr(input.assistantMode, ["dealer", "territory"], "dealer")
  );
  const performanceTrend = enumStr(
    input.performanceTrend,
    ["growth", "stable", "slight_decline", "severe_decline"],
    "stable"
  );
  const categoryGap = enumStr(input.categoryGap, ["none", "light", "full_non_performance"], "none");
  const relationshipHealth = enumStr(
    input.relationshipHealth,
    ["strong", "neutral", "needs_coaching", "at_risk"],
    "neutral"
  );
  const dealerLifecycle = enumStr(input.dealerLifecycle, ["established", "kickoff", "onboarding"], "established");
  const operationalReviewCadence = enumStr(
    input.operationalReviewCadence,
    ["none", "due_soon", "overdue"],
    "none"
  );
  const strategicReviewCadence = enumStr(
    input.strategicReviewCadence,
    ["none", "quarterly_due", "semi_annual_due"],
    "none"
  );
  const customerProfileId = String(input.customerProfileId ?? "").trim();
  const territoryLabel = String(input.territoryLabel ?? "").trim();

  const scopeNote = assistantMode === "territory" && territoryLabel ? ` (${territoryLabel})` : "";

  /** @type {KlAdminIntelligenceRecommendation} */
  let out;

  if (
    performanceTrend === "severe_decline" ||
    dealerLifecycle === "kickoff" ||
    dealerLifecycle === "onboarding"
  ) {
    out = {
      ok: true,
      assistantMode,
      recommendedActionType: ACTION.IN_PERSON_TRAINING,
      priority: "P1",
      title: `In-person training visit${scopeNote}`,
      reason:
        dealerLifecycle === "kickoff" || dealerLifecycle === "onboarding"
          ? "A structured onboarding or kickoff window is an opportunity to align expectations, workflows, and enablement resources together—before small gaps widen."
          : "A sharper change in trajectory is a coaching moment, not a judgment—bring trainers and dealer leads side-by-side to reset the plan with clarity.",
      suggestedActionLabel: "Schedule joint training day",
      recommendedCadence: "Within 10 business days",
      relatedSpotlightQuery: "conversion training alignment",
      relatedTrainingTopic: "Territory enablement bootcamp · workflow + product storytelling",
      customerProfileId,
      notes: "Escalates ahead of lighter-touch options when momentum needs a deliberate reset.",
    };
  } else if (operationalReviewCadence === "overdue" || operationalReviewCadence === "due_soon") {
    out = {
      ok: true,
      assistantMode,
      recommendedActionType: ACTION.FIELD_AUDIT,
      priority: "P2",
      title: `Semi-annual operational field audit${scopeNote}`,
      reason:
        "The next operational review is a chance to celebrate what is working and tighten execution where friction shows up—keep it collaborative and evidence-led.",
      suggestedActionLabel: "Book field audit walkthrough",
      recommendedCadence: operationalReviewCadence === "overdue" ? "This month" : "Within 30 days",
      relatedSpotlightQuery: "operational cadence bulk desk",
      relatedTrainingTopic: "Field audit checklist · sampling + bulk governance",
      customerProfileId,
      notes: "Pairs well with inventory and proposal hygiene reviews already in Admin.",
    };
  } else if (strategicReviewCadence === "quarterly_due" || strategicReviewCadence === "semi_annual_due") {
    out = {
      ok: true,
      assistantMode,
      recommendedActionType: ACTION.BUSINESS_REVIEW,
      priority: "P3",
      title: `Strategic dealer growth review${scopeNote}`,
      reason:
        "Quarterly or semi-annual reviews are natural milestones to align growth bets, coverage, and training investments—frame it as shared planning, not inspection.",
      suggestedActionLabel: "Schedule QBR-style business review",
      recommendedCadence: strategicReviewCadence === "quarterly_due" ? "Within 21 days" : "Next planning cycle",
      relatedSpotlightQuery: "growth program mixed fleet",
      relatedTrainingTopic: "Joint business planning · KPI storytelling",
      customerProfileId,
      notes: "Use approved-demand and mix intelligence as discussion anchors.",
    };
  } else if (categoryGap === "full_non_performance") {
    out = {
      ok: true,
      assistantMode,
      recommendedActionType: ACTION.KLONDIKE_U,
      priority: "P4",
      title: `Klondike U curriculum path${scopeNote}`,
      reason:
        "When a full category is under-performing versus peers, structured learning often unlocks faster wins than one-off emails—meet the team where the gap is widest.",
      suggestedActionLabel: "Assign KL University module track",
      recommendedCadence: "Start within 2 weeks · reinforce at 30 days",
      relatedSpotlightQuery: "category conversion hydraulic",
      relatedTrainingTopic: "KL-U · category mastery + spec discipline",
      customerProfileId,
      notes: "Complements spotlight sends after baseline vocabulary is aligned.",
    };
  } else if (relationshipHealth === "needs_coaching" || relationshipHealth === "at_risk") {
    out = {
      ok: true,
      assistantMode,
      recommendedActionType: ACTION.FIELD_RIDE_ALONG,
      priority: "P5",
      title: `Field ride-along coaching${scopeNote}`,
      reason:
        "Relationship signals point to a side-by-side day in market—listen first, co-build the next few plays second. Position it as partnership, not surveillance.",
      suggestedActionLabel: "Propose a joint ride day",
      recommendedCadence: "Within 3 weeks",
      relatedSpotlightQuery: "customer conversation coaching",
      relatedTrainingTopic: "Joint call coaching · discovery + follow-up",
      customerProfileId,
      notes: "Keeps tone human while nudging execution discipline.",
    };
  } else if (
    performanceTrend === "slight_decline" ||
    categoryGap === "light" ||
    (performanceTrend === "slight_decline" && categoryGap === "none")
  ) {
    out = {
      ok: true,
      assistantMode,
      recommendedActionType: ACTION.SPOTLIGHT,
      priority: "P6",
      title: `Targeted spotlight enablement${scopeNote}`,
      reason:
        "A modest dip or a light category gap is usually an opportunity for a crisp, well-scoped story—lead with curiosity and a single next step the dealer can own.",
      suggestedActionLabel: "Stage spotlight + coach angle",
      recommendedCadence: "This week",
      relatedSpotlightQuery: "hydraulic reliability mixed fleet",
      relatedTrainingTopic: "Spotlight rehearsal · proof points + CTA",
      customerProfileId,
      notes: "Prefer one spotlight thread over a broad campaign when the signal is light.",
    };
  } else {
    out = {
      ok: true,
      assistantMode,
      recommendedActionType: ACTION.MOMENTUM_ACTION,
      priority: "P7",
      title: `Momentum reinforcement${scopeNote}`,
      reason:
        "Smooth performance is a chance to compound wins—recognize progress, capture what is working, and tee up the next growth chapter before urgency returns.",
      suggestedActionLabel: "Send recognition + next chapter teaser",
      recommendedCadence: "Ongoing · light monthly touch",
      relatedSpotlightQuery: "synthetic upgrade agriculture",
      relatedTrainingTopic: "Advanced plays · optional micro-learning",
      customerProfileId,
      notes: "Default when no higher-priority signal is present.",
    };
  }

  return out;
}

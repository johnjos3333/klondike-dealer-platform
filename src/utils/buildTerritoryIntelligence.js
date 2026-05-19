/**
 * KLONDIKE Territory Intelligence — outside-sales signals only (Phase 7D).
 * Quotes, proposals, category mix, enablement usage, training recommendations.
 * Not dealer ERP, counter sales, or CRM analytics.
 */

import {
  computeDealerActionCenterSignals,
  getDealerMixPresence,
  buildIntentionalProfileAndOemActions,
  INTENTIONAL_CUSTOMER_PROFILES,
} from "./klAdminActionCenterIntelligence";
import { recommendKlondikeUniversityCourses } from "../data/salesEnablement/klondikeUniversityCourses";

const MIX_LABELS = {
  hd: "HD engine oil",
  hydraulic: "hydraulic",
  grease: "grease",
  gear: "gear oil",
  coolant: "coolant",
  transmission: "transmission",
  automotive: "automotive",
};

function attachEnablementAlertKinds(signals, dealer, ctx) {
  const oid = String(signals.dealerOrgId || dealer?.organization_id || "");
  const alerts = Array.isArray(ctx?.enablementAlerts) ? ctx.enablementAlerts : [];
  const kinds = alerts
    .filter((al) => String(al.dealerOrgId || al.organization_id || "") === oid)
    .map((al) => String(al.signalKind || "").trim())
    .filter(Boolean);
  return { ...signals, enablementAlertKinds: kinds };
}

function mixCountFromRows(dealer, patterns) {
  const rows = Array.isArray(dealer?.productMix) ? dealer.productMix : [];
  let n = 0;
  rows.forEach((row) => {
    const name = String(row?.name || "");
    const count = Number(row?.count || 0);
    if (count <= 0) return;
    if (patterns.some((re) => re.test(name))) n += count;
  });
  return n;
}

function activeCategoryLabels(presence) {
  const keys = Array.isArray(presence.activeCategories) ? presence.activeCategories : [];
  return keys.map((k) => MIX_LABELS[k] || k);
}

/**
 * Deterministic health label from platform activity (no fake revenue or CRM scores).
 * @param {object} signals
 * @returns {{ label: string, factors: string[] }}
 */
export function computeDealerHealthLabel(signals) {
  const presence = signals.dealerCategoryMix || {};
  const activeCount = Number(presence.activeCategories?.length || 0);
  const q = Number(signals.quotesCreated || 0);
  const p = Number(signals.proposalsSent || 0);
  const r = Number(signals.customerResponses || 0);
  const factors = [];

  if (signals.newDealer) {
    factors.push("Outside-sales activity is still ramping on the platform.");
    return { label: "New / Developing", factors };
  }

  if (signals.stalledQuoteActivity) {
    factors.push("Quotes and proposals are active, but customer replies are quiet.");
    return { label: "Needs Attention", factors };
  }

  let points = 0;
  if (q >= 1) {
    factors.push(`${q} quote(s) logged on the platform.`);
    points += q >= 3 ? 2 : 1;
  } else {
    factors.push("Little or no quote activity on the platform yet.");
  }
  if (p >= 1) {
    factors.push(`${p} proposal(s) sent through the platform.`);
    points += p >= 2 ? 2 : 1;
  }
  if (r >= 1) {
    factors.push(`${r} customer reply signal(s) on open proposals.`);
    points += 1;
  }
  if (activeCount >= 4) {
    factors.push("Broad category mix in quoted products.");
    points += 2;
  } else if (activeCount >= 2) {
    factors.push(`Quoted mix spans ${activeCount} categories.`);
    points += 1;
  } else if (signals.narrowProductMix) {
    factors.push("Quoted mix is still narrow across categories.");
  }

  if (signals.mixGrowing || signals.quoteSpike) {
    factors.push("Recent quote or category momentum on the platform.");
    points += 2;
  }
  if (signals.possibleTrainingNeed) {
    factors.push("Training or coaching signals are active for this dealer.");
  }

  if (signals.lowProposalFollowUp && p >= 2) {
    return { label: "Needs Attention", factors };
  }

  if (points >= 5 || signals.mixGrowing || signals.quoteSpike) {
    return { label: "Growing", factors };
  }
  if (points >= 2 && !signals.narrowProductMix) {
    return { label: "Stable", factors };
  }
  if (signals.narrowProductMix || q === 0) {
    return { label: "Needs Attention", factors };
  }
  return { label: "Stable", factors };
}

/**
 * @param {object} signals
 * @returns {{ label: string, detail: string }}
 */
export function computeDealerMomentumLabel(signals) {
  if (signals.newDealer) {
    return {
      label: "New Dealer Ramp-Up",
      detail: "Early quotes and proposals may need structure before habits set.",
    };
  }
  if (signals.stalledQuoteActivity || signals.lowProposalFollowUp) {
    return {
      label: "Needs Follow-Up",
      detail: "Proposal activity is visible, but customer replies are still light.",
    };
  }
  if (signals.narrowProductMix || signals.hdOilOnly || signals.hydraulicOnly) {
    return {
      label: "Narrow Product Mix",
      detail: `Quoted lines lean toward ${activeCategoryLabels(signals.dealerCategoryMix).join(" and ") || "one or two categories"}.`,
    };
  }
  if (signals.mixGrowing || signals.categoryExpansionOpportunity) {
    return {
      label: "Expanding Categories",
      detail: "Quoted products are widening—good moment for adjacent category coaching.",
    };
  }
  if (signals.quoteSpike || signals.recentQuoteActivity) {
    return {
      label: "Growing",
      detail: "Quote activity is picking up on the platform.",
    };
  }
  return {
    label: "Stable",
    detail: "Platform activity is steady—watch for the next category attach.",
  };
}

/**
 * @param {object} dealer
 * @param {object} ctx
 * @returns {object}
 */
export function buildDealerTerritoryIntelligence(dealer, ctx = {}) {
  const raw = computeDealerActionCenterSignals(dealer, ctx);
  const signals = attachEnablementAlertKinds(raw, dealer, ctx);
  const presence = signals.dealerCategoryMix || getDealerMixPresence(dealer);
  const health = computeDealerHealthLabel(signals);
  const momentum = computeDealerMomentumLabel(signals);
  const activeCount = Number(presence.activeCategories?.length || 0);
  const missing = Array.isArray(signals.missingCategories) ? signals.missingCategories : [];
  const alertKinds = signals.enablementAlertKinds || [];

  const categoryOpportunityGaps = [];
  if (signals.noGrease || signals.greaseLowHdHydStrong) {
    categoryOpportunityGaps.push("grease");
  }
  if (signals.noCoolant || signals.hdNoCoolant) {
    categoryOpportunityGaps.push("coolant");
  }
  if (signals.hydraulicOnly || signals.hydraulicNoGear) {
    categoryOpportunityGaps.push("hydraulic");
  }
  if (signals.hydraulicNoGear) {
    categoryOpportunityGaps.push("gear");
  }
  if (mixCountFromRows(dealer, [/food/i, /h1/i, /nsf/i]) === 0 && alertKinds.includes("weak_approved_capture")) {
    categoryOpportunityGaps.push("food_grade");
  }
  if (mixCountFromRows(dealer, [/agrimax/i, /agri/i]) === 0 && (presence.hd >= 2 || presence.hydraulic >= 2)) {
    categoryOpportunityGaps.push("agrimax");
  }

  const profileActions = buildIntentionalProfileAndOemActions(dealer, signals);
  const customerProfileSignals = profileActions
    .filter((a) => a.kind === "customer_profile_play")
    .map((a) => ({
      profileId: a.customerProfileId,
      label: a.enablementTitle || INTENTIONAL_CUSTOMER_PROFILES[a.customerProfileId] || "Customer profile",
      why: a.why,
    }));
  const oemOpportunitySignals = profileActions
    .filter((a) => a.kind === "oem_profile_play")
    .map((a) => ({
      oemKey: a.oemOpportunityProfileKey,
      label: a.enablementTitle || "OEM opportunity profile",
      why: a.why,
    }));

  const kuCourses = recommendKlondikeUniversityCourses(signals, { maxCourses: 3 });
  const trainingNeedSignals = kuCourses.map((c) => ({
    courseId: c.id,
    title: c.title,
    why: c.whyItMatters,
  }));

  const followUpSignals = [];
  if (signals.stalledQuoteActivity) {
    followUpSignals.push("Stalled quote follow-up — proposals sent with quiet customer replies.");
  }
  if (signals.lowProposalFollowUp) {
    followUpSignals.push("Low proposal follow-up — more quotes than reply signals.");
  }

  const businessReviewSignals = [];
  if (signals.possibleBusinessReview) {
    businessReviewSignals.push("Quote and category signals may support a dealer business review.");
  }

  return {
    dealerOrgId: signals.dealerOrgId,
    dealerName: signals.dealerName,
    dealerHealthScore: health,
    dealerMomentum: momentum,
    categoryDiversity: {
      activeCount,
      activeCategories: activeCategoryLabels(presence),
      missingCategories: missing.map((k) => MIX_LABELS[k] || k),
      narrowMix: Boolean(signals.narrowProductMix),
    },
    categoryOpportunityGaps,
    greaseOpportunity: Boolean(signals.noGrease || signals.greaseLowHdHydStrong),
    coolantOpportunity: Boolean(signals.noCoolant || signals.hdNoCoolant),
    gearOilOpportunity: Boolean(signals.hydraulicNoGear),
    hydraulicOpportunity: Boolean(
      signals.hydraulicOnly || signals.hydraulicNoGear || alertKinds.some((k) => /hydraulic/i.test(k))
    ),
    foodGradeOpportunity:
      mixCountFromRows(dealer, [/food/i, /h1/i, /nsf/i]) === 0 &&
      alertKinds.includes("weak_approved_capture"),
    agrimaxOpportunity:
      mixCountFromRows(dealer, [/agrimax/i, /agri/i]) === 0 &&
      (Number(presence.hd || 0) >= 2 || Number(presence.hydraulic || 0) >= 2),
    oemOpportunitySignals,
    customerProfileSignals,
    trainingNeedSignals,
    followUpSignals,
    businessReviewSignals,
    signals,
  };
}

function opportunityEntry(dealerIntel, why, next) {
  return {
    dealerOrgId: dealerIntel.dealerOrgId,
    dealerName: dealerIntel.dealerName,
    why,
    next,
    healthLabel: dealerIntel.dealerHealthScore?.label,
    momentumLabel: dealerIntel.dealerMomentum?.label,
  };
}

function dealerOpportunityScore(d) {
  let score = 0;
  if (d.dealerHealthScore?.label === "Needs Attention") score += 12;
  if (d.followUpSignals?.length) score += 10;
  if (d.dealerHealthScore?.label === "New / Developing") score += 9;
  if (d.businessReviewSignals?.length) score += 7;
  score += (d.categoryOpportunityGaps || []).length * 4;
  if (d.dealerMomentum?.label === "Needs Follow-Up") score += 6;
  if (d.dealerMomentum?.label === "Narrow Product Mix") score += 4;
  return score;
}

function dealerOpportunityHeadline(d) {
  if (d.followUpSignals?.length) return "This dealer needs follow-up on open proposals.";
  if (d.dealerHealthScore?.label === "Needs Attention") return "This dealer needs attention.";
  if (d.dealerHealthScore?.label === "New / Developing") return "New dealer ramp-up in progress.";
  if ((d.categoryOpportunityGaps || []).length >= 2) return "Whitespace across multiple categories.";
  return "Category coaching opportunity on the platform.";
}

function dealerOpportunityNext(d) {
  if (d.followUpSignals?.length) {
    return "Agree on quote owners and call dates while proposals are still open.";
  }
  if (d.businessReviewSignals?.length) {
    return "Prepare business review from quote activity and category mix.";
  }
  if (d.dealerHealthScore?.label === "New / Developing") {
    return "Schedule kickoff training and Klondike University foundations.";
  }
  const gap = (d.categoryOpportunityGaps || [])[0];
  if (gap === "coolant") return "Review coolant opportunity on the next HD visit.";
  if (gap === "grease") return "Review grease category on the next PM conversation.";
  if (gap === "hydraulic") return "Assign hydraulics refresher before the next counter review.";
  return "Review dealer mix and agree on one category attach for the next visit.";
}

function momentumWhyForDisplay(d) {
  return (
    d.dealerMomentum?.detail ||
    d.dealerHealthScore?.factors?.[0] ||
    "Platform activity is visible—coaching can widen the next conversation."
  );
}

function momentumNextForDisplay(d) {
  const label = d.dealerMomentum?.label;
  if (label === "Needs Follow-Up") {
    return "List open quotes with the manager and set a customer decision date.";
  }
  if (label === "Narrow Product Mix") {
    return "Review dealer mix and mark two categories not on recent quotes.";
  }
  if (label === "New Dealer Ramp-Up") {
    return "Schedule kickoff training before quote habits harden.";
  }
  if (label === "Expanding Categories" || label === "Growing") {
    return "Protect momentum with one spotlight or profile on the next visit.";
  }
  return "Confirm next field touch before adding more quotes.";
}

const HEATMAP_SPECS = [
  {
    key: "grease",
    title: "Top Grease Opportunities",
    categoryName: "Grease",
    match: (d) => d.greaseOpportunity,
    ctaType: "prepare_training",
    spotlightCategoryId: "cs-grease-program-growth",
    whySummary:
      "Dealers quoting HD or hydraulic lines without enough grease on the platform—PM attach may be open.",
    why: (d) => {
      const cats = d.categoryDiversity?.activeCategories?.join(" and ") || "HD or hydraulic";
      return `This dealer quotes ${cats} but grease is thin in quoted products.`;
    },
    next: () => "Review grease category with the rep before the next PM conversation.",
  },
  {
    key: "coolant",
    title: "Top Coolant Opportunities",
    categoryName: "Coolant",
    match: (d) => d.coolantOpportunity,
    ctaType: "sales_enablement",
    spotlightCategoryId: "cs-coolant-chemical-addon",
    whySummary:
      "HD engine oil quote activity without matching coolant lines—program coaching may help.",
    why: () => "This dealer quotes HD engine oils but little coolant.",
    next: () => "Review coolant opportunity before the next HD or fleet visit.",
  },
  {
    key: "hydraulic",
    title: "Top Hydraulic Opportunities",
    categoryName: "Hydraulic",
    match: (d) => d.hydraulicOpportunity,
    ctaType: "prepare_training",
    spotlightCategoryId: "cs-hydraulic-opportunity",
    whySummary:
      "Hydraulic categories look thin or isolated—ISO/VG coaching builds rep confidence.",
    why: () => "Hydraulic lines are underdeveloped in the quoted mix.",
    next: () => "Prepare training on hydraulics before the next counter review or ride-along.",
  },
  {
    key: "gear",
    title: "Top Gear Oil Opportunities",
    categoryName: "Gear Oil",
    match: (d) => d.gearOilOpportunity,
    ctaType: "dealer_mix",
    spotlightCategoryId: "cs-transmission-drivetrain",
    whySummary:
      "Hydraulic-heavy quotes without gear oil—final-drive coaching may be the next win.",
    why: () => "Hydraulic interest shows up without gear oil in quoted lines.",
    next: () => "Review dealer mix and walk one final-drive tag on site.",
  },
  {
    key: "food_grade",
    title: "Top Food Grade Opportunities",
    categoryName: "Food Grade",
    match: (d) => d.foodGradeOpportunity,
    ctaType: "sales_enablement",
    spotlightCategoryId: null,
    whySummary: "Food-processing signals may need H1 language before plant visits.",
    why: () => "Food-grade lines are thin for accounts that may need plant-ready positioning.",
    next: () => "Open Sales Enablement and rehearse food-grade discovery on site.",
  },
  {
    key: "agrimax",
    title: "Top AGRIMAX Opportunities",
    categoryName: "AGRIMAX",
    match: (d) => d.agrimaxOpportunity,
    ctaType: "prepare_training",
    spotlightCategoryId: null,
    whySummary: "Ag or fleet quote activity without AGRIMAX—program story may still be open.",
    why: () => "Ag or fleet equipment quotes without AGRIMAX lines on the platform.",
    next: () => "Prepare AGRIMAX refresher before the next ag bay walk-through.",
  },
  {
    key: "oem",
    title: "Top OEM Opportunity Accounts",
    categoryName: "OEM",
    match: (d) => d.oemOpportunitySignals?.length > 0,
    ctaType: "sales_enablement",
    spotlightCategoryId: null,
    whySummary:
      "Proposal activity may benefit from OEM spec conversations—not endorsements.",
    why: (d) =>
      d.oemOpportunitySignals[0]?.why ||
      "OEM spec language may help reps coach from equipment tags.",
    next: (d) =>
      `Walk the ${d.oemOpportunitySignals[0]?.label || "OEM profile"} with the rep before any send.`,
  },
];

function buildCoachingChecklist(dealerIntel) {
  const items = [];
  const push = (row) => {
    if (!row.dealerOrgId) return;
    items.push(row);
  };

  dealerIntel.forEach((d) => {
    if (d.followUpSignals?.length) {
      push({
        id: `followup-${d.dealerOrgId}`,
        type: "quote_follow_up",
        checklistLabel: "Quote follow-up",
        dealerName: d.dealerName,
        dealerOrgId: d.dealerOrgId,
        detail: d.followUpSignals[0],
        actionLabel: "Review open quotes",
        ctaType: "focus_dealer",
        priority: 0,
      });
    }
  });

  dealerIntel.forEach((d) => {
    if (!d.followUpSignals?.length) return;
    push({
      id: `ridealong-${d.dealerOrgId}`,
      type: "ride_along",
      checklistLabel: "Ride-along",
      dealerName: d.dealerName,
      dealerOrgId: d.dealerOrgId,
      detail: "Join the next visit while proposals are still open.",
      actionLabel: "Schedule ride-along",
      ctaType: "focus_dealer",
      priority: 1,
    });
  });

  dealerIntel
    .filter((d) => d.dealerHealthScore?.label === "New / Developing")
    .forEach((d) => {
      push({
        id: `kickoff-${d.dealerOrgId}`,
        type: "kickoff_training",
        checklistLabel: "Kickoff training",
        dealerName: d.dealerName,
        dealerOrgId: d.dealerOrgId,
        detail: "Outside-sales activity is still early on the platform.",
        actionLabel: "Schedule kickoff training",
        ctaType: "prepare_training",
        priority: 2,
      });
    });

  dealerIntel
    .filter((d) => (d.categoryOpportunityGaps || []).length >= 2)
    .forEach((d) => {
      push({
        id: `category-${d.dealerOrgId}`,
        type: "category_training",
        checklistLabel: "Category training",
        dealerName: d.dealerName,
        dealerOrgId: d.dealerOrgId,
        detail: `Gaps: ${(d.categoryOpportunityGaps || []).join(", ")}`,
        actionLabel: "Review category opportunity",
        ctaType: "dealer_mix",
        priority: 3,
      });
    });

  dealerIntel
    .filter((d) => d.businessReviewSignals?.length > 0)
    .forEach((d) => {
      push({
        id: `bdr-${d.dealerOrgId}`,
        type: "business_review",
        checklistLabel: "Business review",
        dealerName: d.dealerName,
        dealerOrgId: d.dealerOrgId,
        detail: d.businessReviewSignals[0],
        actionLabel: "Prepare business review",
        ctaType: "business_review",
        priority: 4,
      });
    });

  dealerIntel
    .filter((d) => d.dealerMomentum?.label === "Narrow Product Mix")
    .forEach((d) => {
      push({
        id: `narrow-${d.dealerOrgId}`,
        type: "category_training",
        checklistLabel: "Category training",
        dealerName: d.dealerName,
        dealerOrgId: d.dealerOrgId,
        detail: d.dealerMomentum?.detail,
        actionLabel: "Widen category coaching",
        ctaType: "dealer_mix",
        priority: 5,
      });
    });

  const seen = new Set();
  return items
    .filter((row) => {
      const k = `${row.type}:${row.dealerOrgId}`;
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    })
    .sort((a, b) => a.priority - b.priority);
}

function buildTerritoryFocusHero(dealerIntel, categoryLanes, coachingChecklist) {
  const followUp = dealerIntel.filter((d) => d.followUpSignals?.length > 0);
  const attention = dealerIntel.filter((d) => d.dealerHealthScore?.label === "Needs Attention");
  const newDealers = dealerIntel.filter((d) => d.dealerHealthScore?.label === "New / Developing");
  const reviewDealers = dealerIntel.filter((d) => d.businessReviewSignals?.length > 0);

  let focusThisWeek = "Territory activity is steady—pick one category lane to coach on the next visits.";
  if (followUp.length) {
    focusThisWeek = `${followUp.length} dealer(s) need quote follow-up while proposals are still open on the platform.`;
  } else if (attention.length) {
    focusThisWeek = `${attention.length} dealer(s) need attention—quotes or mix may need a coaching touch this week.`;
  } else if (newDealers.length) {
    focusThisWeek = `${newDealers.length} new dealer(s) on the platform—schedule kickoff training before habits set.`;
  }

  const biggest = categoryLanes[0];
  const biggestCategoryOpportunity = biggest
    ? `${biggest.categoryName} · ${biggest.dealerCount} dealer${biggest.dealerCount === 1 ? "" : "s"}`
    : "No major category lane flagged yet";

  const dealersNeedingReview =
    reviewDealers.length > 0
      ? `${reviewDealers.length} dealer${reviewDealers.length === 1 ? "" : "s"}: ${reviewDealers
          .slice(0, 3)
          .map((d) => d.dealerName)
          .join(", ")}${reviewDealers.length > 3 ? "…" : ""}`
      : "None flagged for a business review right now";

  const topCoach = coachingChecklist[0];
  const recommendedFirstMove = topCoach
    ? `${topCoach.actionLabel} — ${topCoach.dealerName}`
    : biggest
      ? biggest.nextStep
      : "Work the Action Center list top-down for today's coaching queue.";

  return {
    focusThisWeek,
    biggestCategoryOpportunity,
    dealersNeedingReview,
    recommendedFirstMove,
  };
}

/**
 * @param {object[]} dealers
 * @param {{ enablementAlerts?: object[], territoryProposalSignals?: object }} [ctx]
 */
export function buildTerritoryIntelligence(dealers, ctx = {}) {
  const rows = Array.isArray(dealers) ? dealers : [];
  const dealerIntel = rows.map((d) => buildDealerTerritoryIntelligence(d, ctx));

  const categoryHeatmap = {};
  const categoryLanes = [];

  HEATMAP_SPECS.forEach((spec) => {
    const matched = dealerIntel.filter(spec.match);
    if (!matched.length) return;
    const topDealers = matched
      .slice(0, 3)
      .map((d) => opportunityEntry(d, spec.why(d), spec.next(d)));
    const lane = {
      key: spec.key,
      title: spec.title,
      categoryName: spec.categoryName,
      dealerCount: matched.length,
      whySummary: spec.whySummary,
      nextStep: spec.next(matched[0]),
      ctaType: spec.ctaType,
      spotlightCategoryId: spec.spotlightCategoryId,
      topDealers,
      moreDealerCount: Math.max(0, matched.length - 3),
    };
    categoryHeatmap[spec.key] = lane;
    categoryLanes.push(lane);
  });

  categoryLanes.sort((a, b) => b.dealerCount - a.dealerCount);

  const growingDealers = dealerIntel.filter((d) => d.dealerHealthScore?.label === "Growing");
  const attentionDealers = dealerIntel.filter(
    (d) =>
      d.dealerHealthScore?.label === "Needs Attention" ||
      d.followUpSignals?.length > 0
  );

  const topDealerOpportunities = [...dealerIntel]
    .sort((a, b) => dealerOpportunityScore(b) - dealerOpportunityScore(a))
    .filter((d) => dealerOpportunityScore(d) > 0)
    .slice(0, 3)
    .map((d) => ({
      dealerOrgId: d.dealerOrgId,
      dealerName: d.dealerName,
      headline: dealerOpportunityHeadline(d),
      why: momentumWhyForDisplay(d),
      nextAction: dealerOpportunityNext(d),
      healthLabel: d.dealerHealthScore?.label,
      momentumLabel: d.dealerMomentum?.label,
      categoryGaps: d.categoryOpportunityGaps || [],
    }));

  const topCategoryOpportunities = categoryLanes.slice(0, 3).map((lane) => ({
    key: lane.key,
    categoryName: lane.categoryName,
    dealerCount: lane.dealerCount,
    whySummary: lane.whySummary,
    nextStep: lane.nextStep,
    ctaType: lane.ctaType,
    spotlightCategoryId: lane.spotlightCategoryId,
    sampleDealerOrgId: lane.topDealers[0]?.dealerOrgId || null,
  }));

  const coachingChecklist = buildCoachingChecklist(dealerIntel);
  const topCoachingPriorities = coachingChecklist.slice(0, 3);
  const moreCoachingPriorities = coachingChecklist.slice(3, 8);

  const territoryFocus = buildTerritoryFocusHero(dealerIntel, categoryLanes, coachingChecklist);

  const coachingPriorities = {
    rideAlongs: coachingChecklist.filter((c) => c.type === "ride_along"),
    quoteFollowUp: coachingChecklist.filter((c) => c.type === "quote_follow_up"),
    narrowCategoryReps: coachingChecklist.filter(
      (c) => c.type === "category_training" && c.actionLabel === "Widen category coaching"
    ),
    kickoffTraining: coachingChecklist.filter((c) => c.type === "kickoff_training"),
    businessReviews: coachingChecklist.filter((c) => c.type === "business_review"),
    categoryReviews: coachingChecklist.filter(
      (c) => c.type === "category_training" && c.actionLabel === "Review category opportunity"
    ),
  };

  const healthCounts = { Growing: 0, Stable: 0, "Needs Attention": 0, "New / Developing": 0 };
  dealerIntel.forEach((d) => {
    const lbl = d.dealerHealthScore?.label || "Stable";
    healthCounts[lbl] = (healthCounts[lbl] || 0) + 1;
  });

  const dealerMomentum = dealerIntel
    .map((d) => ({
      dealerOrgId: d.dealerOrgId,
      dealerName: d.dealerName,
      label: d.dealerMomentum?.label,
      why: momentumWhyForDisplay(d),
      nextAction: momentumNextForDisplay(d),
      healthLabel: d.dealerHealthScore?.label,
    }))
    .sort((a, b) => {
      const order = {
        "New Dealer Ramp-Up": 0,
        "Needs Follow-Up": 1,
        "Narrow Product Mix": 2,
        Growing: 3,
        "Expanding Categories": 4,
        Stable: 5,
      };
      return (order[a.label] ?? 9) - (order[b.label] ?? 9);
    });

  return {
    version: 2,
    generatedAt: new Date().toISOString(),
    dealerCount: dealerIntel.length,
    dealerSnapshots: dealerIntel,
    territoryFocus,
    topDealerOpportunities,
    topCategoryOpportunities,
    topCoachingPriorities,
    moreCoachingPriorities,
    coachingChecklist,
    opportunitySnapshot: {
      growingCount: growingDealers.length,
      needsAttentionCount: attentionDealers.length,
    },
    dealerMomentum,
    categoryHeatmap,
    categoryLanes,
    coachingPriorities,
    dealersNeedingBusinessReviews: coachingPriorities.businessReviews.slice(0, 3),
    healthSummary: healthCounts,
  };
}

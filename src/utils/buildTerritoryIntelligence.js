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

function rankOpportunities(dealerIntelList, predicate, whyFor, nextFor, limit = 4) {
  return dealerIntelList
    .filter(predicate)
    .map((d) => opportunityEntry(d, whyFor(d), nextFor(d)))
    .slice(0, limit);
}

const HEATMAP_SPECS = [
  {
    key: "grease",
    title: "Top Grease Opportunities",
    match: (d) => d.greaseOpportunity,
    why: (d) => {
      const cats = d.categoryDiversity?.activeCategories?.join(" and ") || "HD or hydraulic";
      return `This dealer quotes ${cats} but grease is thin in quoted products. A grease category review may help expand the account.`;
    },
    next: () =>
      "Review Grease Part 1 with the rep before the next PM or chassis conversation.",
  },
  {
    key: "coolant",
    title: "Top Coolant Opportunities",
    match: (d) => d.coolantOpportunity,
    why: () =>
      "This dealer quotes HD engine oils but little coolant. A coolant review may help expand the account.",
    next: () =>
      "Suggest the Coolant module and agree on one fleet program story before the next HD visit.",
  },
  {
    key: "hydraulic",
    title: "Top Hydraulic Opportunities",
    match: (d) => d.hydraulicOpportunity,
    why: () =>
      "Hydraulic lines are underdeveloped or isolated in the quoted mix—ISO/VG coaching may build category confidence.",
    next: () =>
      "Assign Hydraulics Part 1 before the next counter review or ride-along.",
  },
  {
    key: "gear",
    title: "Top Gear Oil Opportunities",
    match: (d) => d.gearOilOpportunity,
    why: () =>
      "Hydraulic interest shows up in quotes without gear oil—final-drive tags may be the next coaching angle.",
    next: () =>
      "Open the Gear Oils module and walk one equipment tag in the yard with the rep.",
  },
  {
    key: "food_grade",
    title: "Top Food Grade Opportunities",
    match: (d) => d.foodGradeOpportunity,
    why: () =>
      "Plant or food-processing quote signals may need H1 language and audit habits before the next visit.",
    next: () =>
      "Use the Food Processing customer profile and rehearse two discovery questions on site.",
  },
  {
    key: "agrimax",
    title: "Top AGRIMAX Opportunities",
    match: (d) => d.agrimaxOpportunity,
    why: () =>
      "Ag or fleet equipment quote activity without AGRIMAX lines may mean program positioning is still open.",
    next: () =>
      "Suggest AGRIMAX and Transmission refresher before the next ag bay walk-through.",
  },
  {
    key: "oem",
    title: "Top OEM Opportunity Accounts",
    match: (d) => d.oemOpportunitySignals?.length > 0,
    why: (d) =>
      d.oemOpportunitySignals[0]?.why ||
      "Proposal activity may benefit from OEM spec conversations—not endorsements.",
    next: (d) =>
      `Walk the ${d.oemOpportunitySignals[0]?.label || "OEM opportunity profile"} with the rep before any customer send.`,
  },
];

/**
 * @param {object[]} dealers
 * @param {{ enablementAlerts?: object[], territoryProposalSignals?: object }} [ctx]
 */
export function buildTerritoryIntelligence(dealers, ctx = {}) {
  const rows = Array.isArray(dealers) ? dealers : [];
  const dealerIntel = rows.map((d) => buildDealerTerritoryIntelligence(d, ctx));

  const categoryHeatmap = {};
  HEATMAP_SPECS.forEach((spec) => {
    const items = rankOpportunities(
      dealerIntel,
      spec.match,
      spec.why,
      spec.next,
      4
    );
    if (items.length) {
      categoryHeatmap[spec.key] = { title: spec.title, items };
    }
  });

  const growingDealers = dealerIntel.filter((d) => d.dealerHealthScore?.label === "Growing");
  const attentionDealers = dealerIntel.filter(
    (d) =>
      d.dealerHealthScore?.label === "Needs Attention" ||
      d.followUpSignals?.length > 0
  );

  const strongestGrowthOpportunities = dealerIntel
    .filter(
      (d) =>
        d.greaseOpportunity ||
        d.coolantOpportunity ||
        d.hydraulicOpportunity ||
        d.categoryOpportunityGaps?.length >= 2
    )
    .slice(0, 5)
    .map((d) => ({
      dealerName: d.dealerName,
      dealerOrgId: d.dealerOrgId,
      gaps: d.categoryOpportunityGaps,
      momentum: d.dealerMomentum?.label,
      summary: `${d.dealerName} — ${d.dealerMomentum?.label || "Opportunity"} · ${(d.categoryOpportunityGaps || []).join(", ") || "category coaching"}`,
    }));

  const coachingPriorities = {
    rideAlongs: dealerIntel
      .filter((d) => d.followUpSignals?.length > 0)
      .map((d) => ({
        dealerName: d.dealerName,
        dealerOrgId: d.dealerOrgId,
        detail: d.followUpSignals[0],
      }))
      .slice(0, 5),
    narrowCategoryReps: dealerIntel
      .filter((d) => d.dealerMomentum?.label === "Narrow Product Mix")
      .map((d) => ({
        dealerName: d.dealerName,
        dealerOrgId: d.dealerOrgId,
        detail: d.dealerMomentum?.detail,
      }))
      .slice(0, 5),
    kickoffTraining: dealerIntel
      .filter((d) => d.dealerHealthScore?.label === "New / Developing")
      .map((d) => ({
        dealerName: d.dealerName,
        dealerOrgId: d.dealerOrgId,
        detail: "Schedule kickoff training and Klondike University foundations.",
      }))
      .slice(0, 5),
    businessReviews: dealerIntel
      .filter((d) => d.businessReviewSignals?.length > 0)
      .map((d) => ({
        dealerName: d.dealerName,
        dealerOrgId: d.dealerOrgId,
        detail: d.businessReviewSignals[0],
      }))
      .slice(0, 5),
    categoryReviews: dealerIntel
      .filter((d) => (d.categoryOpportunityGaps || []).length >= 2)
      .map((d) => ({
        dealerName: d.dealerName,
        dealerOrgId: d.dealerOrgId,
        detail: `Category gaps: ${(d.categoryOpportunityGaps || []).join(", ")}`,
      }))
      .slice(0, 5),
  };

  const healthCounts = { Growing: 0, Stable: 0, "Needs Attention": 0, "New / Developing": 0 };
  dealerIntel.forEach((d) => {
    const lbl = d.dealerHealthScore?.label || "Stable";
    healthCounts[lbl] = (healthCounts[lbl] || 0) + 1;
  });

  return {
    version: 1,
    generatedAt: new Date().toISOString(),
    dealerCount: dealerIntel.length,
    dealerSnapshots: dealerIntel,
    opportunitySnapshot: {
      growingCount: growingDealers.length,
      needsAttentionCount: attentionDealers.length,
      strongestGrowthOpportunities,
      summaryBullets: [
        growingDealers.length
          ? `${growingDealers.length} dealer(s) show growing platform activity.`
          : null,
        attentionDealers.length
          ? `${attentionDealers.length} dealer(s) need follow-up or coaching attention.`
          : null,
        Object.keys(categoryHeatmap).length
          ? `${Object.keys(categoryHeatmap).length} category opportunity lane(s) active in the territory.`
          : null,
      ].filter(Boolean),
    },
    dealerMomentum: dealerIntel
      .map((d) => ({
        dealerOrgId: d.dealerOrgId,
        dealerName: d.dealerName,
        label: d.dealerMomentum?.label,
        detail: d.dealerMomentum?.detail,
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
      }),
    categoryHeatmap,
    coachingPriorities,
    dealersNeedingBusinessReviews: coachingPriorities.businessReviews,
    healthSummary: healthCounts,
  };
}

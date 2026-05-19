/**
 * KL Admin Action Center — projected opportunity + intentional enablement (Phase 7A.6).
 * Uses outside-sales quotes, proposals, category mix, and enablement usage only—not dealer ERP/counter data.
 */

import { CATEGORY_SPOTLIGHT_BY_MIX_CATEGORY } from "../data/salesEnablement/spotlightSuggestionRules";
import {
  formatKlondikeUniversityActionIssue,
  recommendKlondikeUniversityCourses,
} from "../data/salesEnablement/klondikeUniversityCourses";

/** @typedef {"mix_expansion" | "category_gap" | "quote_followup" | "business_review" | "training" | "oem_play" | "profile_play" | "spotlight" | "setup" | "competitive"} IntelligenceTheme */

const MIX_CATEGORY_ALIASES = {
  hd: ["Heavy Duty", "HD Engine Oils"],
  hydraulic: ["Hydraulic Fluids", "Hydraulic"],
  grease: ["Grease"],
  gear: ["Gear Oils", "Gear"],
  coolant: ["Coolants", "Chemicals", "Coolants / Chemicals"],
  transmission: ["Transmission Fluids", "Transmission"],
  automotive: ["Automotive"],
};

const MIX_KEYS = ["hd", "hydraulic", "grease", "gear", "coolant", "transmission", "automotive"];

/** Deterministic priority when quote mix shows a clear next category spotlight. */
const SPOTLIGHT_GAP_PRIORITY = ["coolant", "grease", "gear", "transmission", "hydraulic", "hd"];

function pickSpotlightKeyForMixGaps(missingCategories, presence) {
  const missing = new Set(missingCategories || []);
  for (const key of SPOTLIGHT_GAP_PRIORITY) {
    if (!missing.has(key)) continue;
    if (key === "coolant" && (hasMix(presence, "hd", 1) || hasMix(presence, "hydraulic", 1))) return key;
    if (key === "grease" && (hasMix(presence, "hd", 1) || hasMix(presence, "hydraulic", 1))) return key;
    if (key === "gear" && hasMix(presence, "hydraulic", 2)) return key;
    if (
      key === "transmission" &&
      (hasMix(presence, "hd", 1) || hasMix(presence, "grease", 1) || hasMix(presence, "hydraulic", 1))
    ) {
      return key;
    }
    if (key === "hydraulic" && hasMix(presence, "hd", 1)) return key;
    if (key === "hd" && presence.total >= 2) return key;
  }
  return null;
}

const SPOTLIGHT_BY_MIX_KEY = {
  hd: { id: CATEGORY_SPOTLIGHT_BY_MIX_CATEGORY["HD Engine Oils"], type: "category" },
  hydraulic: { id: CATEGORY_SPOTLIGHT_BY_MIX_CATEGORY["Hydraulic Fluids"], type: "category" },
  grease: { id: CATEGORY_SPOTLIGHT_BY_MIX_CATEGORY.Grease, type: "category" },
  gear: { id: CATEGORY_SPOTLIGHT_BY_MIX_CATEGORY["Gear Oils"], type: "category" },
  coolant: { id: CATEGORY_SPOTLIGHT_BY_MIX_CATEGORY["Coolants / Chemicals"], type: "category" },
  transmission: {
    id: CATEGORY_SPOTLIGHT_BY_MIX_CATEGORY["Transmission Fluids"],
    type: "category",
  },
};

const RECENT_QUOTE_MS = 14 * 24 * 60 * 60 * 1000;

/** Intentional enablement titles (never random library picks). */
export const INTENTIONAL_SPOTLIGHT_LABELS = {
  coolant: "Heavy Duty Coolant Category Spotlight",
  grease: "Grease Category Spotlight",
  gear: "Gear Oil Category Spotlight",
  hydraulic: "Hydraulic Category Spotlight",
  hd: "HD Engine Oil Category Spotlight",
  transmission: "Transmission & Drivetrain Category Spotlight",
};

export const INTENTIONAL_CUSTOMER_PROFILES = {
  food_processing: "Food Processing Customer Profile",
  construction: "Construction Customer Profile",
  mining_aggregate: "Mining & Aggregate Customer Profile",
  truck_dealers: "Truck Dealer Customer Profile",
  shop_fleet_maintenance: "Shop & Fleet Maintenance Customer Profile",
};

const ENABLEMENT_ALERT_TO_PROFILE = {
  weak_approved_capture: "food_processing",
  low_grease_penetration: "construction",
  weak_hydraulic_quote_mix: "mining_aggregate",
  weak_hydraulic_approved_mix: "mining_aggregate",
  heavy_duty_quote_concentration: "truck_dealers",
  weak_synthetic_adoption: "shop_fleet_maintenance",
  low_ocr_utilization: "shop_fleet_maintenance",
};

const ENABLEMENT_ALERT_TO_OEM = {
  heavy_duty_quote_concentration: "international",
  weak_hydraulic_quote_mix: "cat",
  weak_hydraulic_approved_mix: "volvo_ce",
  low_proposal_activity: "cat",
};

export const KL_ADMIN_TRAINING_MODULES = {
  hydraulic_fundamentals: {
    label: "Hydraulic Fundamentals",
    issue: (dealerName) => `${dealerName} may need hydraulic fundamentals training.`,
    why: "ISO/VG and contamination stories help reps coach from equipment tags—not assumed counter knowledge.",
    next: "Prepare Training on hydraulic tags, common failures, and PDS checks—15 minutes at the counter.",
  },
  grease_fundamentals: {
    label: "Grease Fundamentals",
    issue: (dealerName) => `${dealerName} may need grease fundamentals training.`,
    why: "PM grease attach fails when reps cannot match NLGI, interval, and joint type to the sticker.",
    next: "Prepare Training: chassis points on a PM sheet, moly vs standard, and what not to over-promise.",
  },
  coolant_technology: {
    label: "Coolant Technology",
    issue: (dealerName) => `${dealerName} may be ready for a coolant program conversation.`,
    why: "HD quote activity without coolant lines may mean reps need a program story—not confirmed fleet stocking.",
    next: "Prepare Training on coolant colors, dilution, and fleet testing habits—pair with the next HD visit.",
  },
  oem_spec_conversations: {
    label: "OEM / Spec Conversations",
    issue: (dealerName) => `Coach ${dealerName} on OEM spec conversations (not approvals).`,
    why: "Reps coach better from tags and PDS—never imply OEM endorsement.",
    next: "Prepare Training using the OEM opportunity profile; rehearse two discovery questions on equipment tags.",
  },
  food_grade_basics: {
    label: "Food Grade Basics",
    issue: (dealerName) => `${dealerName} may need food-grade basics before plant visits.`,
    why: "H1 language and audit habits matter more than SKU count in food plants.",
    next: "Prepare Training on NSF H1 positioning and washdown environments—verify current PDS on site.",
  },
  transmission_wet_brake: {
    label: "Transmission & Wet Brake Fundamentals",
    issue: (dealerName) => `${dealerName} may need transmission / wet brake training.`,
    why: "Ag and construction bays confuse UTTO, hydraulic, and gear fills—easy attach when explained simply.",
    next: "Prepare Training on compartment tags and OEM wet-brake language before the next ag visit.",
  },
  quote_followup: {
    label: "Quote follow-up coaching",
    issue: (dealerName) => `Review quote follow-up with ${dealerName}.`,
    why: "Busy quoting with few customer replies usually means timing or the ask—not missing SKUs.",
    next: "Role-play the close: who calls, when, and what decision you need from the customer.",
  },
  category_expansion: {
    label: "Category expansion coaching",
    issue: (dealerName) => `${dealerName} may benefit from category expansion coaching.`,
    why: "Narrow quote patterns often mean one line gets all the air time on outside-sales visits.",
    next: "Walk the PM ticket together—mark three lines due that are not on today's quote.",
  },
};

/** Signal key → Klondike University / in-person training module. */
export const SIGNAL_TRAINING_MAP = {
  hdNoCoolant: "coolant_technology",
  noCoolant: "coolant_technology",
  noGrease: "grease_fundamentals",
  greaseLowHdHydStrong: "grease_fundamentals",
  hydraulicNoGear: "hydraulic_fundamentals",
  hydraulicOnly: "hydraulic_fundamentals",
  hdOilOnly: "coolant_technology",
  narrowProductMix: "category_expansion",
  categoryExpansionOpportunity: "category_expansion",
  newDealer: "category_expansion",
  stalledQuoteActivity: "quote_followup",
  lowProposalFollowUp: "quote_followup",
  noTransmission: "transmission_wet_brake",
};

function hasMix(presence, key, min = 1) {
  return Number(presence[key] || 0) >= min;
}

function mixShare(presence, key) {
  const total = Number(presence.total || 0);
  if (total <= 0) return 0;
  return Number(presence[key] || 0) / total;
}

function dealerActivityScore(dealer) {
  return (
    Number(dealer?.quotesCreated || 0) +
    Number(dealer?.proposalsSent || 0) * 2 +
    Number(dealer?.customerResponses || 0) * 3
  );
}

function countRecentQuotes(dealer) {
  const raw = Array.isArray(dealer?.rawQuotes) ? dealer.rawQuotes : [];
  if (!raw.length) return Number(dealer?.quotesCreated || 0);
  const cutoff = Date.now() - RECENT_QUOTE_MS;
  return raw.filter((q) => {
    const t = new Date(q.created_at || q.updated_at || 0).getTime();
    return Number.isFinite(t) && t >= cutoff;
  }).length;
}

/**
 * @param {object} dealer
 * @returns {Record<string, number> & { total: number, activeCategories: string[] }}
 */
export function getDealerMixPresence(dealer) {
  const presence = {
    hd: 0,
    hydraulic: 0,
    grease: 0,
    gear: 0,
    coolant: 0,
    transmission: 0,
    automotive: 0,
    total: 0,
    activeCategories: [],
  };
  const rows = Array.isArray(dealer?.productMix) ? dealer.productMix : [];
  rows.forEach((row) => {
    const sourceName = String(row?.name || "").trim();
    const count = Number(row?.count || 0);
    if (!sourceName || count <= 0) return;
    presence.total += count;
    Object.entries(MIX_CATEGORY_ALIASES).forEach(([key, aliases]) => {
      if (aliases.some((alias) => sourceName === alias || sourceName.includes(alias))) {
        presence[key] += count;
      }
    });
  });
  presence.activeCategories = Object.keys(MIX_CATEGORY_ALIASES).filter(
    (k) => Number(presence[k] || 0) > 0
  );
  return presence;
}

/**
 * Deterministic normalized signals from dealer + quote activity.
 * @param {object} dealer
 * @param {{ enablementAlerts?: object[] }} [ctx]
 */
export function computeDealerActionCenterSignals(dealer, ctx = {}) {
  const presence = getDealerMixPresence(dealer);
  const oid = String(dealer?.organization_id || "");
  const dealerName = String(dealer?.name || "Dealer").trim();
  const q = Number(dealer?.quotesCreated || 0);
  const p = Number(dealer?.proposalsSent || 0);
  const r = Number(dealer?.customerResponses || 0);
  const activity = dealerActivityScore(dealer);
  const recentCount = countRecentQuotes(dealer);
  const activation = dealer?.activation || {};
  const activeCount = presence.activeCategories.length;

  const missingCategories = MIX_KEYS.filter((k) => !hasMix(presence, k));

  const hdOilOnly =
    hasMix(presence, "hd", 2) &&
    activeCount <= 2 &&
    !hasMix(presence, "hydraulic") &&
    !hasMix(presence, "grease");
  const hydraulicOnly =
    hasMix(presence, "hydraulic", 2) &&
    activeCount <= 2 &&
    !hasMix(presence, "hd") &&
    !hasMix(presence, "gear");
  const noCoolant =
    !hasMix(presence, "coolant") &&
    (hasMix(presence, "hd", 2) || hasMix(presence, "hydraulic", 2));
  const noGrease =
    !hasMix(presence, "grease") &&
    (hasMix(presence, "hd", 2) || hasMix(presence, "hydraulic", 2));
  const noTransmission =
    !hasMix(presence, "transmission") &&
    (hasMix(presence, "hd", 2) || hasMix(presence, "hydraulic", 2) || hasMix(presence, "grease", 2));
  const hdNoCoolant = hasMix(presence, "hd", 2) && !hasMix(presence, "coolant");
  const hydraulicNoGear = hasMix(presence, "hydraulic", 2) && !hasMix(presence, "gear");
  const greaseLowHdHydStrong =
    (!hasMix(presence, "grease") || mixShare(presence, "grease") < 0.12) &&
    (hasMix(presence, "hd", 2) || hasMix(presence, "hydraulic", 2)) &&
    presence.total >= 3;

  const narrowProductMix = activeCount <= 2 && presence.total >= 4;
  const lowCategoryDiversity = activeCount <= 2 && presence.total >= 2;
  const recentQuoteActivity = recentCount >= 2 || q >= 3;
  const stalledQuoteActivity = q >= 4 && r === 0 && p >= 1;
  const lowProposalFollowUp =
    !stalledQuoteActivity && q >= 3 && p >= 2 && r < Math.max(1, Math.floor(q * 0.3));

  const newDealer =
    (q <= 2 && p === 0 && !activation.firstProposalSent) ||
    (!activation.firstQuoteCreated && !activation.profileConfigured);

  const quoteSpike = q >= 5 && activity >= 8;
  const mixGrowing = activeCount >= 3 && presence.total >= 6 && p >= 2;
  const categoryExpansionOpportunity =
    (narrowProductMix ||
      hdOilOnly ||
      hydraulicOnly ||
      missingCategories.length >= 4 ||
      (presence.total >= 5 && activeCount <= 3)) &&
    !hdNoCoolant &&
    !greaseLowHdHydStrong &&
    !hydraulicNoGear;

  const multipleOpportunities =
    [noCoolant, noGrease, greaseLowHdHydStrong, hydraulicNoGear, narrowProductMix].filter(Boolean)
      .length >= 2;

  const possibleBusinessReview =
    quoteSpike ||
    mixGrowing ||
    (recentQuoteActivity && multipleOpportunities) ||
    (lowCategoryDiversity && q >= 2 && p >= 1) ||
    (activeCount >= 2 && r >= 1 && p >= 3);

  const possibleTrainingNeed =
    newDealer ||
    categoryExpansionOpportunity ||
    greaseLowHdHydStrong ||
    noCoolant ||
    noGrease ||
    hydraulicNoGear ||
    hdNoCoolant ||
    noTransmission;

  return {
    dealerOrgId: oid,
    dealerName,
    dealerCategoryMix: presence,
    missingCategories,
    recentQuoteActivity,
    stalledQuoteActivity,
    newDealer,
    narrowProductMix,
    hydraulicOnly,
    hdOilOnly,
    noCoolant,
    noGrease,
    noTransmission,
    lowCategoryDiversity,
    lowProposalFollowUp,
    possibleTrainingNeed,
    possibleBusinessReview,
    categoryExpansionOpportunity,
    greaseLowHdHydStrong,
    hydraulicNoGear,
    hdNoCoolant,
    quotesCreated: q,
    proposalsSent: p,
    customerResponses: r,
    activityScore: activity,
    quoteSpike,
    mixGrowing,
  };
}

function spotlightRecommendationRow({
  oid,
  name,
  signalKey,
  dedupeKey,
  spotlightKey,
  issue,
  whatChanged,
  why,
  recommended,
  severityRank = 2,
  confidence = 85,
  trainingModuleKey = null,
}) {
  const title = INTENTIONAL_SPOTLIGHT_LABELS[spotlightKey] || "Category Spotlight";
  return {
    id: `sig-spotlight-${signalKey}-${oid}`,
    kind: "spotlight",
    intelligenceTheme: "category_gap",
    recommendationType: "spotlight_recommendation",
    signalKey,
    dedupeKey,
    enablementTitle: title,
    enablementRationale: why,
    issue: issue || `Recommend ${title} for ${name}.`,
    whatChanged,
    why,
    recommended:
      recommended ||
      `Open ${title} with the rep—walk one equipment tag and align the next quote to that category gap.`,
    trainingModuleKey,
    spotlightKey,
    severityRank,
    confidence,
    buttonLabel: "Open Sales Enablement",
    navigationIntent: "open_sales_enablement",
  };
}

function categoryLabels(keys) {
  const labels = {
    hd: "HD engine oil",
    hydraulic: "hydraulic",
    grease: "grease",
    gear: "gear oil",
    coolant: "coolant",
    transmission: "transmission",
    automotive: "automotive",
  };
  return keys.map((k) => labels[k] || k).join(" and ");
}

/**
 * Rank signal → action factories (highest priority first).
 */
export function rankDealerSignalActions(signals) {
  const { dealerName: name, dealerOrgId: oid, dealerCategoryMix: presence } = signals;
  if (!oid || presence.total < 1) return [];

  const ranked = [];
  const add = (signalKey, priority, confidence, factory) => {
    ranked.push({ signalKey, priority, confidence, build: factory });
  };

  if (signals.newDealer) {
    add("newDealer", 0, 93, () => ({
      id: `sig-new-dealer-${oid}`,
      kind: "training_recommendation",
      intelligenceTheme: "training",
      recommendationType: "category_training_recommendation",
      signalKey: "newDealer",
      dedupeKey: `${oid}:training:kickoff`,
      issue: `Schedule an in-person kickoff training for ${name}.`,
      whatChanged: `Outside-sales activity is just starting for ${name}—few quotes or proposals on file yet.`,
      why: "Early field visits shape how reps quote, send proposals, and follow up—before patterns harden.",
      recommended:
        "Schedule in-person kickoff: first quote, proposal send, and follow-up habits—pair with Klondike University foundations.",
      trainingModuleKey: "hydraulic_fundamentals",
      enablementTitle: "New dealer kickoff",
      severityRank: 0,
      confidence: 93,
    }));
  }

  if (signals.stalledQuoteActivity) {
    add("stalledQuoteActivity", 0, 94, () => ({
      id: `sig-stalled-quotes-${oid}`,
      kind: "field_coaching_recommendation",
      intelligenceTheme: "quote_followup",
      signalKey: "stalledQuoteActivity",
      dedupeKey: `${oid}:quote_followup`,
      issue: `This rep may need help moving quotes forward at ${name}.`,
      whatChanged: `${name} has recent quote activity (${signals.quotesCreated} quotes, ${signals.proposalsSent} proposals).`,
      why: "Quotes are moving but customer replies are quiet—coach decision timing and the ask, not more SKUs.",
      recommended: "Review the top quoted products with the manager and agree on the next step.",
      trainingModuleKey: "quote_followup",
      severityRank: 0,
      confidence: 94,
    }));
  } else if (signals.lowProposalFollowUp) {
    add("lowProposalFollowUp", 1, 87, () => ({
      id: `sig-low-followup-${oid}`,
      kind: "field_coaching_recommendation",
      intelligenceTheme: "quote_followup",
      signalKey: "lowProposalFollowUp",
      dedupeKey: `${oid}:quote_followup`,
      issue: `This rep may need help moving quotes forward at ${name}.`,
      whatChanged: `${signals.quotesCreated} quotes with only ${signals.customerResponses} customer reply(ies) so far.`,
      why: "Reps may be quoting without a clear next step or decision date.",
      recommended: "List open quotes with the manager; assign owner and call date for each.",
      trainingModuleKey: "quote_followup",
      severityRank: 1,
      confidence: 87,
    }));
  }

  if (signals.hdNoCoolant || (signals.noCoolant && hasMix(presence, "hd", 2))) {
    add("hdNoCoolant", 1, 90, () =>
      spotlightRecommendationRow({
        oid,
        name,
        signalKey: "hdNoCoolant",
        dedupeKey: `${oid}:spotlight:coolant`,
        spotlightKey: "coolant",
        issue: `Coach ${name} on HD coolant program discipline.`,
        whatChanged: `Quotes at ${name} show HD engine oil; coolant is not in the quoted mix yet.`,
        why: "HD diesel fleets need inhibitor-family discipline—OAT, NOAT, nitrite-free Gold, and top-off rules—not engine oil alone on the card.",
        recommended: `Open ${INTENTIONAL_SPOTLIGHT_LABELS.coolant}—match bulk tanks and top-off habits to tags before the next HD proposal.`,
        severityRank: 1,
        confidence: 90,
      })
    );
  }

  if (signals.greaseLowHdHydStrong || (signals.noGrease && !signals.hdNoCoolant)) {
    add("greaseLowHdHydStrong", 1, 88, () =>
      spotlightRecommendationRow({
        oid,
        name,
        signalKey: "greaseLowHdHydStrong",
        dedupeKey: `${oid}:spotlight:grease`,
        spotlightKey: "grease",
        issue: `Attach grease to ${name}'s equipment-fluid quotes.`,
        whatChanged: `Quotes at ${name} show HD or hydraulic lines; grease is thin or missing in the mix.`,
        why: "Mobile and HD accounts usually need chassis and pin PM on the same card—grease is often the gap when hydraulics lead.",
        recommended: `Open ${INTENTIONAL_SPOTLIGHT_LABELS.grease}—map NLGI and joint severity on one PM sheet before the next quote.`,
        severityRank: 1,
        confidence: 88,
      })
    );
  }

  if (signals.hydraulicNoGear) {
    add("hydraulicNoGear", 2, 82, () =>
      spotlightRecommendationRow({
        oid,
        name,
        signalKey: "hydraulicNoGear",
        dedupeKey: `${oid}:spotlight:gear`,
        spotlightKey: "gear",
        issue: `Add driveline coverage to ${name}'s hydraulic quotes.`,
        whatChanged: `Hydraulic fluid is in quotes at ${name}; gear oil is not in the quoted mix yet.`,
        why: "Final drives and differentials are separate compartments—hydraulic AW does not replace GL-5 or industrial EP fills on tags.",
        recommended: `Open ${INTENTIONAL_SPOTLIGHT_LABELS.gear}—verify one final-drive or axle tag on yard iron before the next proposal.`,
        severityRank: 2,
        confidence: 82,
      })
    );
  }

  if (signals.hydraulicOnly && !signals.hydraulicNoGear) {
    add("hydraulicOnly", 2, 80, () =>
      spotlightRecommendationRow({
        oid,
        name,
        signalKey: "hydraulicOnly",
        dedupeKey: `${oid}:spotlight:hydraulic`,
        spotlightKey: "hydraulic",
        issue: `Widen ${name}'s quote story beyond hydraulics alone.`,
        whatChanged: `Quoted mix at ${name} is narrow—mostly hydraulic with few companion categories.`,
        why: "ISO VG discipline and pump tags are the entry point—engine, grease, gear, and coolant usually belong on the same fleet card.",
        recommended: `Open ${INTENTIONAL_SPOTLIGHT_LABELS.hydraulic}—confirm ISO VG on bulk tanks and one pump tag before adding companion lines.`,
        severityRank: 2,
        confidence: 80,
      })
    );
  }

  if (signals.hdOilOnly && signals.noCoolant && !signals.hdNoCoolant) {
    add("hdOilOnly", 2, 79, () =>
      spotlightRecommendationRow({
        oid,
        name,
        signalKey: "hdOilOnly",
        dedupeKey: `${oid}:spotlight:coolant:hd-only`,
        spotlightKey: "coolant",
        issue: `Pair HD engine quotes at ${name} with a coolant program.`,
        whatChanged: `Quotes are concentrated on HD engine oil with little category breadth.`,
        why: "Engine-only quoting misses inhibitor-family and top-off discipline that HD fleets need on the same service card.",
        recommended: `Open ${INTENTIONAL_SPOTLIGHT_LABELS.coolant}—separate NOAT, OAT, and nitrite-free Gold on the bulk chart with the rep.`,
        severityRank: 2,
        confidence: 79,
      })
    );
  }

  if (signals.categoryExpansionOpportunity && !signals.newDealer && !signals.narrowProductMix) {
    const expansionSpotlightKey = pickSpotlightKeyForMixGaps(signals.missingCategories, presence);
    const expansionTitle =
      expansionSpotlightKey && INTENTIONAL_SPOTLIGHT_LABELS[expansionSpotlightKey]
        ? INTENTIONAL_SPOTLIGHT_LABELS[expansionSpotlightKey]
        : null;

    if (expansionSpotlightKey && expansionTitle) {
      add("categoryExpansionOpportunity", 2, 77, () =>
        spotlightRecommendationRow({
          oid,
          name,
          signalKey: "categoryExpansionOpportunity",
          dedupeKey: `${oid}:spotlight:${expansionSpotlightKey}:expand`,
          spotlightKey: expansionSpotlightKey,
          issue: `Add ${expansionTitle} to ${name}'s next coaching visit.`,
          whatChanged: `Quotes lean on ${categoryLabels(presence.activeCategories)}; ${expansionSpotlightKey} is not in the mix yet.`,
          why: `Outside-sales quotes show room to coach ${expansionSpotlightKey} alongside existing lines—match equipment tags, not random SKU adds.`,
          recommended: `Open ${expansionTitle}—pick one compartment on yard iron that needs ${expansionSpotlightKey} on the next quote.`,
          severityRank: 2,
          confidence: 77,
        })
      );
    } else {
      add("categoryExpansionOpportunity", 2, 77, () => ({
        id: `sig-category-expand-${oid}`,
        kind: "category_growth_opportunity",
        intelligenceTheme: "mix_expansion",
        signalKey: "categoryExpansionOpportunity",
        dedupeKey: `${oid}:mix_expansion:categories`,
        issue: `Broaden category coaching at ${name}.`,
        whatChanged: `Quoted products span ${presence.activeCategories.length} categories—mostly ${categoryLabels(presence.activeCategories)}.`,
        why: "Thin mix on active quotes is a coaching moment—walk tags and add one documented category on the next visit.",
        recommended: "Pick one equipment tag in the yard and add one category missing from recent quotes—verify on PDS before proposing.",
        trainingModuleKey: "category_expansion",
        severityRank: 2,
        confidence: 77,
      }));
    }
  }

  if (signals.narrowProductMix && !signals.newDealer) {
    add("narrowProductMix", 2, 78, () => ({
      id: `sig-narrow-mix-${oid}`,
      kind: "product_mix_audit",
      intelligenceTheme: "mix_expansion",
      signalKey: "narrowProductMix",
      dedupeKey: `${oid}:mix_expansion:narrow`,
      issue: `${name} may be ready for broader category training.`,
      whatChanged: `Quoted mix is narrow—mostly ${categoryLabels(presence.activeCategories)}.`,
      why: "When only one or two lines appear on quotes, outside-sales coaching should widen the story on the next visit.",
      recommended:
        "Prepare broader category training: three PM lines due that are not on the counter story today.",
      trainingModuleKey: "category_expansion",
      severityRank: 2,
      confidence: 78,
    }));
  }

  if (signals.noTransmission && presence.total >= 4) {
    add("noTransmission", 3, 72, () =>
      spotlightRecommendationRow({
        oid,
        name,
        signalKey: "noTransmission",
        dedupeKey: `${oid}:spotlight:transmission`,
        spotlightKey: "transmission",
        issue: `Coach ${name} on transmission and wet-brake fluid discipline.`,
        whatChanged: `Quotes at ${name} show equipment-fluid activity without transmission or UTTO lines.`,
        why: "Ag and construction accounts confuse ATF, UTTO, wet brake, and hydraulic AW—compartment tags drive the correct fill.",
        recommended: `Open ${INTENTIONAL_SPOTLIGHT_LABELS.transmission}—read reservoir labels on one tractor or vocational unit before the next quote.`,
        severityRank: 3,
        confidence: 72,
      })
    );
  }

  ranked.sort((a, b) => a.priority - b.priority || b.confidence - a.confidence);
  return ranked;
}

/**
 * Attach Klondike University course names to training-oriented Action Center rows.
 * @param {object} row
 * @param {ReturnType<typeof computeDealerActionCenterSignals>} signals
 * @param {object} [kuContext]
 */
function enrichActionWithKlondikeUniversity(row, signals, kuContext = {}) {
  const isTrainingRow =
    row.kind === "training_recommendation" || row.kind === "klondike_university_assignment";

  if (!isTrainingRow) return row;

  const kuCourses = recommendKlondikeUniversityCourses(signals, {
    ...kuContext,
    signalKey: row.signalKey,
    maxCourses: 4,
  });
  const primary = kuCourses[0];
  if (!primary) return row;

  const hydraulicWhy =
    row.signalKey === "hydraulicNoGear" || row.signalKey === "hydraulicOnly"
      ? "This dealer is quoting hydraulic products, but related categories look underdeveloped."
      : primary.whyItMatters;

  return {
    ...row,
    klondikeUniversityCourseId: primary.id,
    klondikeUniversityCourseIds: kuCourses.map((c) => c.id),
    klondikeUniversityCourseTitles: kuCourses.map((c) => c.title),
    enablementTitle: primary.title,
    issue: formatKlondikeUniversityActionIssue(primary),
    why: hydraulicWhy || row.why || primary.whyItMatters,
    recommended: primary.suggestedNextAction || row.recommended,
    suggestedFormat: "klondike university",
    buttonLabel: row.buttonLabel || "Prepare Training",
    navigationIntent: row.navigationIntent || "prepare_training",
  };
}

/**
 * @param {object} dealer
 * @param {ReturnType<typeof computeDealerActionCenterSignals>} signals
 * @param {{ trainingModules?: object, maxActions?: number, klondikeUniversityContext?: object }} [opts]
 */
export function buildActionsFromDealerSignals(dealer, signals, opts = {}) {
  const {
    trainingModules = KL_ADMIN_TRAINING_MODULES,
    maxActions = 3,
    klondikeUniversityContext = {},
  } = opts;
  const oid = signals.dealerOrgId;
  const name = signals.dealerName;
  const ranked = rankDealerSignalActions(signals);
  const out = [];
  const usedSignalKeys = new Set();

  const finalize = (row) => {
    const trainingKey = row.trainingModuleKey || SIGNAL_TRAINING_MAP[row.signalKey];
    const training = trainingKey && trainingModules[trainingKey] ? trainingModules[trainingKey] : null;
    const spot = row.spotlightKey ? SPOTLIGHT_BY_MIX_KEY[row.spotlightKey] : null;
    const isSpotlightRec =
      row.kind === "spotlight" ||
      row.recommendationType === "spotlight_recommendation" ||
      Boolean(row.enablementTitle && spot);
    const useSpotlightCta = isSpotlightRec || Boolean(spot && /spotlight/i.test(String(row.recommended || "")));
    const base = {
      ...row,
      scope: name,
      summary: String(row.whatChanged || row.issue || "").trim(),
      dealerOrgId: oid,
      buttonLabel: useSpotlightCta
        ? "Open Sales Enablement"
        : training
          ? "Prepare Training"
          : row.buttonLabel || "Open Dealer Snapshot",
      navigationIntent: useSpotlightCta
        ? "open_sales_enablement"
        : training
          ? "prepare_training"
          : row.navigationIntent || "open_dealer_snapshot",
      suggestedOwner: training ? "KL BDM" : row.suggestedOwner || "Dealer manager",
      suggestedFormat: useSpotlightCta
        ? "spotlight"
        : training
          ? "in-person training"
          : row.suggestedFormat || "dealer review",
      accent: (row.severityRank ?? 2) <= 1 ? "orange" : "green",
      recommended:
        useSpotlightCta || !training ? row.recommended : training.next,
      ...(spot ? { spotlightId: spot.id, spotlightType: spot.type } : {}),
    };

    if (useSpotlightCta) return base;
    return enrichActionWithKlondikeUniversity(base, signals, klondikeUniversityContext);
  };

  for (const entry of ranked) {
    if (out.length >= maxActions) break;
    if (usedSignalKeys.has(entry.signalKey)) continue;
    const row = entry.build();
    if (!row) continue;
    usedSignalKeys.add(entry.signalKey);
    out.push(finalize(row));
  }

  return out;
}

export function pickDealersForCoachingIntelligence(dealers, limit = 6) {
  return (Array.isArray(dealers) ? dealers : [])
    .filter((d) => {
      const p = getDealerMixPresence(d);
      return p.total >= 2 || dealerActivityScore(d) >= 2;
    })
    .sort((a, b) => dealerActivityScore(b) - dealerActivityScore(a))
    .slice(0, limit);
}

export function buildDealerMixGapCandidates(dealer, ctx = {}) {
  const signals = computeDealerActionCenterSignals(dealer, ctx);
  if (signals.dealerCategoryMix.total < 2 && signals.activityScore < 2) return [];
  return buildActionsFromDealerSignals(dealer, signals, { maxActions: 2 }).filter(
    (a) => a.intelligenceTheme !== "quote_followup" && a.kind !== "business_review_reminder"
  );
}

export function buildDealerPipelineCoachingCandidates(dealer) {
  const oid = String(dealer.organization_id || "");
  const name = String(dealer.name || "Dealer").trim();
  const q = Number(dealer.quotesCreated || 0);
  const p = Number(dealer.proposalsSent || 0);
  const r = Number(dealer.customerResponses || 0);
  const out = [];

  if (q >= 4 && r === 0 && p >= 1) {
    out.push({
      id: `intel-ride-along-${oid}`,
      kind: "ride_along_recommendation",
      intelligenceTheme: "quote_followup",
      signalKey: "ride_along",
      dedupeKey: `${oid}:ride_along`,
      issue: "This rep may need help closing quotes.",
      scope: name,
      whatChanged: `Customers have not replied to ${p} proposal(s) despite active quoting.`,
      why: "A ride-along shows whether the gap is the ask, the spec story, or timing.",
      recommended: "Schedule a ride-along on the next customer visit—listen for the decision ask.",
      summary: `Customers have not replied to ${p} proposal(s) despite active quoting.`,
      dealerOrgId: oid,
      severityRank: 0,
      confidence: 91,
      buttonLabel: "Schedule Ride-Along",
      navigationIntent: "schedule_ride_along",
      suggestedOwner: "Field rep",
      suggestedFormat: "ride-along",
      accent: "orange",
    });
  }

  return out;
}

export function buildDealerBusinessReviewCandidates(dealer, ctx = {}) {
  const { territoryProposalSignals = {} } = ctx || {};
  const oid = String(dealer.organization_id || "");
  const name = String(dealer.name || "Dealer").trim();
  const signals = computeDealerActionCenterSignals(dealer, ctx);
  const q = signals.quotesCreated;
  const out = [];

  if (signals.possibleBusinessReview) {
    const presence = signals.dealerCategoryMix;
    const mixBreadth = presence.activeCategories.length;
    let whatChanged = "";
    if (signals.quoteSpike) {
      whatChanged = `${name} has a burst of quote activity (${q} quotes)—good time to align on priorities.`;
    } else if (signals.mixGrowing) {
      whatChanged = `${name} shows quote activity across ${mixBreadth} categories—room to align on growth targets.`;
    } else {
      whatChanged = `${name} has recent quote activity and multiple category opportunities.`;
    }

    out.push({
      id: `intel-qbr-${oid}`,
      kind: "business_review_reminder",
      intelligenceTheme: "business_review",
      recommendationType: "business_review_recommendation",
      signalKey: "possibleBusinessReview",
      dedupeKey: `${oid}:business_review`,
      issue: `${name} may be ready for a business review.`,
      scope: name,
      whatChanged,
      why: "A short review can turn quote activity, category interest, and training needs into a projected growth plan.",
      recommended:
        "Open the Business Review Plan preview—top quoted categories, growth opportunities, and coaching steps.",
      summary: "Quote activity and mix suggest a planning visit.",
      dealerOrgId: oid,
      severityRank: signals.quoteSpike ? 1 : 2,
      confidence: signals.quoteSpike ? 88 : 80,
      buttonLabel: "Prepare Business Review",
      navigationIntent: "prepare_business_review",
      suggestedOwner: "KL BDM",
      suggestedFormat: "business review",
      accent: "blue",
    });
  }

  const tProps = Number(territoryProposalSignals?.proposalsSent || 0);
  const tResp = Number(territoryProposalSignals?.responsesReceived || 0);
  if (tProps >= 2 && tResp === 0 && q >= 2 && !out.length) {
    out.push({
      id: `intel-qbr-territory-stall-${oid}`,
      kind: "business_review_reminder",
      intelligenceTheme: "business_review",
      recommendationType: "business_review_recommendation",
      signalKey: "territoryBusinessReview",
      dedupeKey: `${oid}:business_review`,
      issue: "It may be time for a dealer business review.",
      scope: name,
      whatChanged: `Territory has ${tProps} proposals out with quiet customer replies; ${name} is part of that motion.`,
      why: "A short review resets follow-up before more quotes pile up.",
      recommended: "Open the Business Review Plan preview for open proposals, category interest, and next steps.",
      dealerOrgId: oid,
      severityRank: 1,
      confidence: 85,
      buttonLabel: "Prepare Business Review",
      navigationIntent: "prepare_business_review",
      suggestedOwner: "KL BDM",
      suggestedFormat: "business review",
      accent: "orange",
    });
  }

  return out;
}

export function actionCenterSortKey(ac) {
  const sev = typeof ac.severityRank === "number" ? ac.severityRank : 3;
  const conf = typeof ac.confidence === "number" ? ac.confidence : 50;
  const kindBoost =
    ac.kind === "dealer_activation"
      ? 0
      : ac.kind === "ride_along_recommendation" || ac.kind === "field_coaching_recommendation"
        ? 1
        : ac.kind === "business_review_reminder"
          ? 2
          : ac.kind === "warehouse_inventory_support"
            ? 3
            : ac.kind === "category_growth_opportunity" || ac.kind === "product_mix_audit"
              ? 4
              : ac.kind === "spotlight"
                ? 8
                : 5;
  return sev * 1000 - conf + kindBoost;
}

export function deduplicateActionCenterQueue(actions) {
  const list = Array.isArray(actions) ? actions : [];
  const byDedupe = new Map();
  const themesByDealer = new Map();

  const themeRank = (ac) => {
    if (ac.kind === "ride_along_recommendation" || ac.kind === "field_coaching_recommendation") {
      return 0;
    }
    if (ac.kind === "category_growth_opportunity" || ac.kind === "product_mix_audit") return 1;
    if (ac.kind === "training_recommendation" || ac.kind === "klondike_university_assignment") {
      return 2;
    }
    if (ac.kind === "spotlight") return 9;
    return 5;
  };

  list.forEach((ac) => {
    const signalKey = String(ac.signalKey || "").trim();
    const dedupeKey =
      String(ac.dedupeKey || "").trim() ||
      (signalKey
        ? `${String(ac.dealerOrgId || "territory")}:signal:${signalKey}`
        : `${String(ac.dealerOrgId || "territory")}:${String(ac.intelligenceTheme || ac.kind)}`);
    const existing = byDedupe.get(dedupeKey);
    const score = (ac) =>
      (typeof ac.confidence === "number" ? ac.confidence : 50) -
      themeRank(ac) * 5 -
      (typeof ac.severityRank === "number" ? ac.severityRank : 3) * 2;

    if (!existing || score(ac) > score(existing)) {
      byDedupe.set(dedupeKey, ac);
    }
  });

  let merged = [...byDedupe.values()];

  merged = merged.filter((ac) => {
    const oid = String(ac.dealerOrgId || "");
    if (!oid) return true;
    const theme = String(ac.intelligenceTheme || ac.kind || "");
    const dealerThemes = themesByDealer.get(oid) || new Set();

    if (theme === "quote_followup" && ac.kind === "field_coaching_recommendation") {
      if (dealerThemes.has("ride_along")) return false;
    }

    dealerThemes.add(
      theme === "quote_followup" && ac.kind === "ride_along_recommendation" ? "ride_along" : theme
    );
    themesByDealer.set(oid, dealerThemes);
    return true;
  });

  const issueSeen = new Set();
  const categoryGapByDealer = new Map();
  merged = merged.filter((ac) => {
    const norm = String(ac.issue || "")
      .toLowerCase()
      .replace(/\s+/g, " ")
      .slice(0, 72);
    const oid = String(ac.dealerOrgId || "t");
    const key = `${oid}:${norm}`;
    if (issueSeen.has(key)) return false;
    issueSeen.add(key);

    if (
      oid !== "t" &&
      (ac.intelligenceTheme === "category_gap" || ac.intelligenceTheme === "mix_expansion")
    ) {
      const gaps = categoryGapByDealer.get(oid) || 0;
      if (gaps >= 2) return false;
      categoryGapByDealer.set(oid, gaps + 1);
    }
    return true;
  });

  const perDealerCount = new Map();
  merged = merged.filter((ac) => {
    const oid = String(ac.dealerOrgId || "");
    if (!oid) return true;
    const n = perDealerCount.get(oid) || 0;
    if (n >= 3) return false;
    perDealerCount.set(oid, n + 1);
    return true;
  });

  return merged.sort((a, b) => actionCenterSortKey(a) - actionCenterSortKey(b));
}

/**
 * Intentional customer profile / OEM plays from enablement alert signals (not random library).
 */
export function buildIntentionalProfileAndOemActions(dealer, signals) {
  const oid = signals.dealerOrgId;
  const name = signals.dealerName;
  const out = [];
  const usedProfile = new Set();
  const usedOem = new Set();

  (signals.enablementAlertKinds || []).forEach((alertKind) => {
    const profileId = ENABLEMENT_ALERT_TO_PROFILE[alertKind];
    if (profileId && !usedProfile.has(profileId)) {
      usedProfile.add(profileId);
      const profileLabel =
        INTENTIONAL_CUSTOMER_PROFILES[profileId] ||
        profileId.replace(/_/g, " ");
      out.push({
        id: `sig-profile-${profileId}-${oid}`,
        kind: "customer_profile_play",
        intelligenceTheme: "profile_play",
        recommendationType: "customer_profile_recommendation",
        signalKey: `profile:${profileId}`,
        dedupeKey: `${oid}:profile:${profileId}`,
        enablementSignalKind: alertKind,
        issue: `Recommend the ${profileLabel}.`,
        whatChanged: `Quote patterns at ${name} align with the ${profileLabel}—equipment and category signals from recent activity.`,
        why: "Profile playbooks keep discovery on compartments, tags, and PDS—not a SKU list.",
        recommended: `Open Sales Enablement · ${profileLabel} · rehearse two discovery questions with the rep before the next visit.`,
        customerProfileId: profileId,
        enablementTitle: profileLabel,
        dealerOrgId: oid,
        severityRank: 2,
        confidence: 84,
        buttonLabel: "Open Sales Enablement",
        navigationIntent: "open_sales_enablement",
        suggestedOwner: "Field rep",
        suggestedFormat: "in-person training",
        accent: "blue",
      });
    }

    const oemKey = ENABLEMENT_ALERT_TO_OEM[alertKind];
    if (oemKey && !usedOem.has(oemKey)) {
      usedOem.add(oemKey);
      const oemLabel = oemKey.replace(/_/g, " ");
      out.push({
        id: `sig-oem-${oemKey}-${oid}`,
        kind: "oem_profile_play",
        intelligenceTheme: "oem_play",
        recommendationType: "oem_profile_recommendation",
        signalKey: `oem:${oemKey}`,
        dedupeKey: `${oid}:oem:${oemKey}`,
        enablementSignalKind: alertKind,
        issue: `Walk the ${oemLabel} OEM opportunity profile with ${name}.`,
        whatChanged: `Proposal activity at ${name} may benefit from an OEM spec conversation aid—not an endorsement.`,
        why: "OEM profiles help reps read tags and ask better questions; they do not replace equipment manuals or PDS.",
        recommended: `Open Sales Enablement · OEM opportunity profile · ${oemLabel}—align questions to equipment on the lot.`,
        oemOpportunityProfileKey: oemKey,
        enablementTitle: `${oemLabel} OEM opportunity profile`,
        dealerOrgId: oid,
        severityRank: 2,
        confidence: 80,
        buttonLabel: "Open Sales Enablement",
        navigationIntent: "open_sales_enablement",
        suggestedOwner: "KL BDM",
        suggestedFormat: "in-person training",
        accent: "blue",
        trainingModuleKey: "oem_spec_conversations",
      });
    }
  });

  if (
    signals.greaseLowHdHydStrong &&
    !usedProfile.has("construction") &&
    out.length < 2
  ) {
    const profileId = "construction";
    const profileLabel = INTENTIONAL_CUSTOMER_PROFILES[profileId];
    out.push({
      id: `sig-profile-mix-${profileId}-${oid}`,
      kind: "customer_profile_play",
      recommendationType: "customer_profile_recommendation",
      signalKey: `profile:${profileId}`,
      dedupeKey: `${oid}:profile:${profileId}`,
      issue: `Consider the ${profileLabel} for field visits.`,
      whatChanged: `Mixed equipment quote patterns at ${name} may fit construction / mobile equipment accounts.`,
      why: "A named profile gives the rep discovery structure instead of ad-hoc product lists.",
      recommended: `Open Sales Enablement · ${profileLabel} before the next site visit.`,
      customerProfileId: profileId,
      enablementTitle: profileLabel,
      dealerOrgId: oid,
      severityRank: 3,
      confidence: 72,
      buttonLabel: "Open Sales Enablement",
      navigationIntent: "open_sales_enablement",
      accent: "blue",
    });
  }

  return out;
}

export function buildKlAdminIntelligenceCandidates(ctx) {
  const { dealers = [], enablementAlerts = [], territoryProposalSignals = {} } = ctx || {};
  const signalCtx = { enablementAlerts, territoryProposalSignals };
  const candidates = [];

  pickDealersForCoachingIntelligence(dealers, 10).forEach((dealer) => {
    const signals = computeDealerActionCenterSignals(dealer, signalCtx);
    buildActionsFromDealerSignals(dealer, signals, { maxActions: 3 }).forEach((row) =>
      candidates.push(row)
    );
    buildIntentionalProfileAndOemActions(dealer, signals).forEach((row) => candidates.push(row));
    buildDealerPipelineCoachingCandidates(dealer).forEach((row) => candidates.push(row));
    buildDealerBusinessReviewCandidates(dealer, signalCtx).forEach((row) => candidates.push(row));
  });

  return deduplicateActionCenterQueue(candidates).slice(0, 10);
}

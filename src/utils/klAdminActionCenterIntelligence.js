/**
 * KL Admin Action Center — territory/dealer coaching intelligence (Phase 7A.2).
 * Deterministic only; uses in-memory dealer productMix and activity fields.
 */

import { CATEGORY_SPOTLIGHT_BY_MIX_CATEGORY } from "../data/salesEnablement/spotlightSuggestionRules";

/** @typedef {"mix_expansion" | "category_gap" | "quote_followup" | "business_review" | "training" | "oem_play" | "profile_play" | "spotlight" | "setup" | "competitive"} IntelligenceTheme */

export const KL_ADMIN_TRAINING_MODULES = {
  hydraulic_fundamentals: {
    label: "Hydraulic fundamentals",
    issue: (dealerName) => `${dealerName} may need hydraulic fundamentals training.`,
    why: "ISO/VG and contamination stories close gaps when the counter only knows engine oil.",
    next: "Prepare Training on hydraulic tags, common failures, and PDS checks—15 minutes at the counter.",
  },
  grease_fundamentals: {
    label: "Grease fundamentals",
    issue: (dealerName) => `${dealerName} may need grease fundamentals training.`,
    why: "PM grease attach fails when reps cannot match NLGI, interval, and joint type to the sticker.",
    next: "Prepare Training: chassis points on a PM sheet, moly vs standard, and what not to over-promise.",
  },
  coolant_technology: {
    label: "Coolant technology",
    issue: (dealerName) => `${dealerName} may be ready for a coolant program conversation.`,
    why: "HD bays often sell CK-4 but skip OAT/NOAT programs that lock in annual PM revenue.",
    next: "Prepare Training on coolant colors, dilution, and fleet testing habits—pair with the next HD visit.",
  },
  oem_spec_conversations: {
    label: "OEM / spec conversations",
    issue: (dealerName) => `Coach ${dealerName} on OEM spec conversations (not approvals).`,
    why: "Reps win when they read tags and PDS—never imply OEM endorsement.",
    next: "Prepare Training using the OEM opportunity profile; rehearse two discovery questions on equipment tags.",
  },
  food_grade_basics: {
    label: "Food-grade basics",
    issue: (dealerName) => `${dealerName} may need food-grade basics before plant visits.`,
    why: "H1 language and audit habits matter more than SKU count in food plants.",
    next: "Prepare Training on NSF H1 positioning and washdown environments—verify current PDS on site.",
  },
  transmission_wet_brake: {
    label: "Transmission & wet brake fundamentals",
    issue: (dealerName) => `${dealerName} may need transmission / wet brake training.`,
    why: "Ag and construction bays confuse UTTO, hydraulic, and gear fills—easy attach when explained simply.",
    next: "Prepare Training on compartment tags and OEM wet-brake language before the next ag visit.",
  },
  quote_followup: {
    label: "Quote follow-up coaching",
    issue: (dealerName) => `Review quote follow-up with ${dealerName}.`,
    why: "Busy quoting with few customer yeses usually means timing or the ask—not missing SKUs.",
    next: "Role-play the close: who calls, when, and what decision you need from the customer.",
  },
  category_expansion: {
    label: "Category expansion coaching",
    issue: (dealerName) => `${dealerName} may benefit from category expansion coaching.`,
    why: "Narrow counters leave PM revenue on the table when only one fluid line gets air time.",
    next: "Walk the PM ticket together—mark three lines due that are not on today's quote.",
  },
};

const MIX_CATEGORY_ALIASES = {
  hd: ["Heavy Duty", "HD Engine Oils"],
  hydraulic: ["Hydraulic Fluids", "Hydraulic"],
  grease: ["Grease"],
  gear: ["Gear Oils", "Gear"],
  coolant: ["Coolants", "Chemicals", "Coolants / Chemicals"],
  transmission: ["Transmission Fluids", "Transmission"],
  automotive: ["Automotive"],
};

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

function hasMix(presence, key, min = 1) {
  return Number(presence[key] || 0) >= min;
}

function dealerActivityScore(dealer) {
  return (
    Number(dealer?.quotesCreated || 0) +
    Number(dealer?.proposalsSent || 0) * 2 +
    Number(dealer?.customerResponses || 0) * 3
  );
}

/**
 * Dealers with enough mix/activity data to coach (highest activity first).
 */
export function pickDealersForCoachingIntelligence(dealers, limit = 6) {
  return (Array.isArray(dealers) ? dealers : [])
    .filter((d) => {
      const p = getDealerMixPresence(d);
      return p.total >= 2 || dealerActivityScore(d) >= 2;
    })
    .sort((a, b) => dealerActivityScore(b) - dealerActivityScore(a))
    .slice(0, limit);
}

/**
 * @returns {Array<object>} Raw candidate actions (not yet deduped).
 */
export function buildDealerMixGapCandidates(dealer) {
  const presence = getDealerMixPresence(dealer);
  if (presence.total < 2) return [];

  const oid = String(dealer.organization_id || "");
  const name = String(dealer.name || "Dealer").trim();
  const out = [];

  const pushGap = ({
    id,
    kind,
    theme,
    issue,
    whatChanged,
    why,
    recommended,
    severityRank = 2,
    confidence = 75,
    trainingModuleKey = null,
    spotlightKey = null,
    buttonLabel = "Review Dealer Mix",
    navigationIntent = "review_product_mix",
    suggestedFormat = "dealer review",
  }) => {
    const training =
      trainingModuleKey && KL_ADMIN_TRAINING_MODULES[trainingModuleKey]
        ? KL_ADMIN_TRAINING_MODULES[trainingModuleKey]
        : null;
    const spot = spotlightKey ? SPOTLIGHT_BY_MIX_KEY[spotlightKey] : null;
    out.push({
      id: `intel-${id}-${oid}`,
      kind,
      intelligenceTheme: theme,
      dedupeKey: `${oid}:${theme}`,
      issue,
      scope: name,
      whatChanged,
      why,
      recommended: training ? training.next : recommended,
      summary: whatChanged,
      dealerOrgId: oid,
      severityRank,
      confidence,
      trainingModuleKey,
      buttonLabel: training ? "Prepare Training" : buttonLabel,
      navigationIntent: training ? "prepare_training" : navigationIntent,
      suggestedOwner: training ? "KL BDM" : "Dealer manager",
      suggestedFormat: training ? "in-person training" : suggestedFormat,
      accent: severityRank <= 1 ? "orange" : "green",
      ...(spot
        ? { spotlightId: spot.id, spotlightType: spot.type }
        : {}),
    });
  };

  if (
    hasMix(presence, "grease", 2) &&
    !hasMix(presence, "gear") &&
    !hasMix(presence, "hydraulic") &&
    !hasMix(presence, "coolant")
  ) {
    pushGap({
      id: "grease-only-expand",
      kind: "category_growth_opportunity",
      theme: "mix_expansion",
      issue: `Expand the lubrication conversation beyond grease at ${name}.`,
      whatChanged: `${name} is strong on grease—gear, hydraulic, and coolant are thin in the product mix.`,
      why: "Grease-heavy counters often miss driveline, hydraulic, and cooling PM on the same visit.",
      recommended:
        "On the next visit, walk one PM sheet and add gear, hydraulic, and coolant lines that are due today.",
      severityRank: 1,
      confidence: 92,
      trainingModuleKey: "grease_fundamentals",
    });
  }

  if (hasMix(presence, "hd", 2) && !hasMix(presence, "coolant")) {
    pushGap({
      id: "hd-no-coolant",
      kind: "service_bay_opportunity",
      theme: "category_gap",
      issue: `Coolant programs may be an opportunity for ${name}.`,
      whatChanged: `${name} quotes HD engine oil—this dealer is not selling much coolant yet.`,
      why: "Fleet PM visits should pair CK-4 with the right coolant program—not engine oil alone.",
      recommended:
        "Ask the service manager which fleets are due for coolant testing or top-up this quarter.",
      severityRank: 1,
      confidence: 90,
      trainingModuleKey: "coolant_technology",
      spotlightKey: "coolant",
    });
  }

  if (hasMix(presence, "hd", 2) && !hasMix(presence, "grease")) {
    pushGap({
      id: "hd-no-grease",
      kind: "pm_audit_opportunity",
      theme: "category_gap",
      issue: `PM grease may be missing from ${name}'s quote habits.`,
      whatChanged: `${name} is strong on HD engine oil but grease is not on quoted lines.`,
      why: "Chassis and bearing grease should be on every PM conversation with fleet accounts.",
      recommended: "Audit one fleet PM sticker vs last three quotes—list grease points not quoted.",
      severityRank: 2,
      confidence: 84,
      trainingModuleKey: "grease_fundamentals",
      spotlightKey: "grease",
    });
  }

  if (hasMix(presence, "hydraulic", 2) && !hasMix(presence, "gear")) {
    pushGap({
      id: "hydraulic-no-gear",
      kind: "category_growth_opportunity",
      theme: "mix_expansion",
      issue: `Add gear oil to the story at ${name}.`,
      whatChanged: `${name} quotes hydraulics—this customer may have additional driveline opportunities.`,
      why: "Mobile equipment often has both circuits—hydraulic wins open the door for final drives.",
      recommended: "Review final-drive tags on one machine in the yard with the rep.",
      severityRank: 2,
      confidence: 80,
      trainingModuleKey: "hydraulic_fundamentals",
      spotlightKey: "gear",
    });
  }

  if (
    presence.activeCategories.length <= 2 &&
    presence.total >= 4
  ) {
    const cats = presence.activeCategories
      .map((k) => {
        const labels = {
          hd: "HD engine oil",
          hydraulic: "hydraulic",
          grease: "grease",
          gear: "gear oil",
          coolant: "coolant",
          transmission: "transmission",
          automotive: "automotive",
        };
        return labels[k] || k;
      })
      .join(" and ");
    pushGap({
      id: "narrow-mix",
      kind: "product_mix_audit",
      theme: "mix_expansion",
      issue: `${name} may benefit from category training.`,
      whatChanged: `Quoted mix is narrow—mostly ${cats}.`,
      why: "When only one or two lines get quoted, PM attach and margin walk away with the customer.",
      recommended:
        "Prepare a category expansion huddle: three PM lines due that are not on the counter story today.",
      severityRank: 2,
      confidence: 78,
      trainingModuleKey: "category_expansion",
      buttonLabel: "Prepare Training",
      navigationIntent: "prepare_training",
      suggestedFormat: "in-person training",
    });
  }

  const topShare =
    presence.total > 0
      ? Math.max(
          ...presence.activeCategories.map((k) => Number(presence[k] || 0) / presence.total)
        )
      : 0;
  if (topShare >= 0.65 && presence.activeCategories.length >= 1) {
    const dominant = presence.activeCategories.reduce((best, k) =>
      Number(presence[k] || 0) > Number(presence[best] || 0) ? k : best
    , presence.activeCategories[0]);
    const domLabel =
      { hd: "HD engine oil", hydraulic: "hydraulic", grease: "grease", gear: "gear oil", coolant: "coolant" }[
        dominant
      ] || dominant;
    if (!out.some((a) => a.id.includes("narrow-mix"))) {
      pushGap({
        id: "concentrated-mix",
        kind: "product_mix_audit",
        theme: "mix_expansion",
        issue: `${name} leans heavily on ${domLabel}.`,
        whatChanged: `Most quoted lines are ${domLabel}—other PM categories are thin.`,
        why: "Seasonal fleet changes expose risk when the counter only sells one story.",
        recommended: "Open the dealer snapshot and map two adjacent categories to equipment tags on site.",
        severityRank: 2,
        confidence: 76,
        buttonLabel: "Open Dealer Snapshot",
        navigationIntent: "open_dealer_snapshot",
      });
    }
  }

  return out;
}

/**
 * Quote / proposal coaching candidates for a single dealer.
 */
export function buildDealerPipelineCoachingCandidates(dealer) {
  const oid = String(dealer.organization_id || "");
  const name = String(dealer.name || "Dealer").trim();
  const q = Number(dealer.quotesCreated || 0);
  const p = Number(dealer.proposalsSent || 0);
  const r = Number(dealer.customerResponses || 0);
  const out = [];

  if (q >= 4 && r === 0 && p >= 1) {
    out.push({
      id: `intel-quote-followup-${oid}`,
      kind: "field_coaching_recommendation",
      intelligenceTheme: "quote_followup",
      dedupeKey: `${oid}:quote_followup`,
      issue: `Review quote follow-up with ${name}.`,
      scope: name,
      whatChanged: `${q} quotes and ${p} proposals on file—customers have not said yes yet.`,
      why: "Busy quoting with quiet replies usually means follow-up or the ask—not missing SKUs.",
      recommended: KL_ADMIN_TRAINING_MODULES.quote_followup.next,
      summary: `${name} has busy quoting but few customer yeses yet.`,
      dealerOrgId: oid,
      severityRank: 0,
      confidence: 94,
      trainingModuleKey: "quote_followup",
      buttonLabel: "Open Dealer Snapshot",
      navigationIntent: "open_dealer_snapshot",
      suggestedOwner: "KL BDM",
      suggestedFormat: "in-person training",
      accent: "orange",
    });
    if (p >= 1) {
      out.push({
        id: `intel-ride-along-${oid}`,
        kind: "ride_along_recommendation",
        intelligenceTheme: "quote_followup",
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
  } else if (q >= 3 && p >= 2 && r < Math.max(1, Math.floor(q * 0.3))) {
    out.push({
      id: `intel-low-win-rate-${oid}`,
      kind: "field_coaching_recommendation",
      intelligenceTheme: "quote_followup",
      dedupeKey: `${oid}:quote_followup`,
      issue: `This rep may need help moving quotes forward at ${name}.`,
      scope: name,
      whatChanged: `${q} quotes with only ${r} customer reply(ies) so far.`,
      why: "Reps may be quoting without a clear next step or decision date.",
      recommended: "List open quotes with the manager; assign owner and call date for each.",
      dealerOrgId: oid,
      severityRank: 1,
      confidence: 86,
      buttonLabel: "Open Dealer Snapshot",
      navigationIntent: "open_dealer_snapshot",
      suggestedOwner: "KL BDM",
      suggestedFormat: "in-person training",
      accent: "orange",
    });
  }

  return out;
}

/**
 * Business review timing from dealer behavior (not revenue).
 */
export function buildDealerBusinessReviewCandidates(dealer, { territoryProposalSignals = {} } = {}) {
  const oid = String(dealer.organization_id || "");
  const name = String(dealer.name || "Dealer").trim();
  const presence = getDealerMixPresence(dealer);
  const q = Number(dealer.quotesCreated || 0);
  const p = Number(dealer.proposalsSent || 0);
  const r = Number(dealer.customerResponses || 0);
  const activity = dealerActivityScore(dealer);
  const out = [];

  const mixBreadth = presence.activeCategories.length;
  const quoteSpike = q >= 5 && activity >= 8;
  const growthStall = q >= 2 && r === 0 && p >= 1;
  const categoryOpportunity =
    mixBreadth >= 2 && mixBreadth <= 4 && presence.total >= 6;

  if (
    quoteSpike ||
    growthStall ||
    (categoryOpportunity && p >= 2) ||
    (mixBreadth >= 3 && r >= 1 && p >= 3)
  ) {
    let whatChanged = "";
    if (quoteSpike) {
      whatChanged = `${name} has a burst of quote activity (${q} quotes)—good time to align on priorities.`;
    } else if (growthStall) {
      whatChanged = `${name} is quoting but customers have not said yes on recent proposals yet.`;
    } else if (categoryOpportunity) {
      whatChanged = `${name} sells across ${mixBreadth} categories—room to align on growth targets.`;
    } else {
      whatChanged = `${name} has steady quotes and customer replies—ready for a planning conversation.`;
    }

    out.push({
      id: `intel-qbr-${oid}`,
      kind: "business_review_reminder",
      intelligenceTheme: "business_review",
      dedupeKey: `${oid}:business_review`,
      issue: `${name} may be ready for a quarterly business review.`,
      scope: name,
      whatChanged,
      why: "QBRs work when mix, open quotes, and category goals are on one agenda—not scattered emails.",
      recommended:
        "Prepare Business Review: top 3 categories to grow, open proposals, and one training commitment.",
      summary: "Product mix and activity suggest a planning visit.",
      dealerOrgId: oid,
      severityRank: quoteSpike || growthStall ? 1 : 2,
      confidence: quoteSpike || growthStall ? 88 : 72,
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
      dedupeKey: `${oid}:business_review`,
      issue: "It may be time for a dealer business review.",
      scope: name,
      whatChanged: `Territory has ${tProps} proposals out with quiet customer replies; ${name} is part of that motion.`,
      why: "A short QBR resets follow-up before more quotes pile up.",
      recommended: "Prepare Business Review with this dealer's open proposals and rep owners.",
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

/**
 * Score for sort order (lower = higher priority).
 */
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
          : ac.kind === "category_growth_opportunity" || ac.kind === "product_mix_audit"
            ? 3
            : ac.kind === "spotlight"
              ? 8
              : 5;
  return sev * 1000 - conf + kindBoost;
}

/**
 * Remove duplicate / overlapping coaching actions.
 */
export function deduplicateActionCenterQueue(actions) {
  const list = Array.isArray(actions) ? actions : [];
  const byDedupe = new Map();
  const themesByDealer = new Map();

  const themeRank = (ac) => {
    if (ac.kind === "ride_along_recommendation" || ac.kind === "field_coaching_recommendation") {
      return 0;
    }
    if (ac.kind === "category_growth_opportunity" || ac.kind === "product_mix_audit") return 1;
    if (ac.kind === "customer_profile_play" || ac.kind === "oem_profile_play") return 2;
    if (ac.kind === "training_recommendation" || ac.kind === "klondike_university_assignment") {
      return 3;
    }
    if (ac.kind === "spotlight") return 9;
    return 5;
  };

  list.forEach((ac) => {
    const dedupeKey =
      String(ac.dedupeKey || "").trim() ||
      `${String(ac.dealerOrgId || "territory")}:${String(ac.intelligenceTheme || ac.kind)}`;
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
    if (ac.kind === "spotlight") {
      if (dealerThemes.has("profile_play") || dealerThemes.has("oem_play")) return false;
      const signal = String(ac.enablementSignalKind || "");
      if (
        signal &&
        merged.some(
          (x) =>
            x.dealerOrgId === oid &&
            (x.kind === "customer_profile_play" || x.kind === "oem_profile_play") &&
            x.enablementSignalKind === signal
        )
      ) {
        return false;
      }
    }

    dealerThemes.add(theme === "quote_followup" && ac.kind === "ride_along_recommendation" ? "ride_along" : theme);
    if (ac.kind === "customer_profile_play") dealerThemes.add("profile_play");
    if (ac.kind === "oem_profile_play") dealerThemes.add("oem_play");
    themesByDealer.set(oid, dealerThemes);
    return true;
  });

  const issueSeen = new Set();
  merged = merged.filter((ac) => {
    const norm = String(ac.issue || "")
      .toLowerCase()
      .replace(/\s+/g, " ")
      .slice(0, 72);
    const oid = String(ac.dealerOrgId || "t");
    const key = `${oid}:${norm}`;
    if (issueSeen.has(key)) return false;
    issueSeen.add(key);
    return true;
  });

  return merged.sort((a, b) => actionCenterSortKey(a) - actionCenterSortKey(b));
}

/**
 * Assemble high-confidence dealer coaching candidates for BDR merge layer.
 */
export function buildKlAdminIntelligenceCandidates(ctx) {
  const { dealers = [], enablementAlerts = [], territoryProposalSignals = {} } = ctx || {};
  const candidates = [];
  const pushAll = (rows) => {
    (Array.isArray(rows) ? rows : []).forEach((r) => candidates.push(r));
  };

  pickDealersForCoachingIntelligence(dealers, 8).forEach((dealer) => {
    pushAll(buildDealerPipelineCoachingCandidates(dealer));
    pushAll(buildDealerMixGapCandidates(dealer));
    pushAll(buildDealerBusinessReviewCandidates(dealer, { territoryProposalSignals }));
  });

  return deduplicateActionCenterQueue(candidates).slice(0, 12);
}

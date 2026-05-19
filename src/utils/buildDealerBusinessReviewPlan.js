/**
 * Dealer Business Review Plan — structured preview from outside-sales platform signals (Phase 7B).
 * Not a PPT export; no persistence or backend writes.
 */

import {
  computeDealerActionCenterSignals,
  getDealerMixPresence,
  INTENTIONAL_SPOTLIGHT_LABELS,
  INTENTIONAL_CUSTOMER_PROFILES,
  KL_ADMIN_TRAINING_MODULES,
  buildIntentionalProfileAndOemActions,
} from "./klAdminActionCenterIntelligence";

export const KLONDIKE_BDR_LOGO_SRC = "/klondike-horizontal-logo.png";

const MIX_LABELS = {
  hd: "HD Engine Oil",
  hydraulic: "Hydraulic",
  grease: "Grease",
  gear: "Gear Oil",
  coolant: "Coolant",
  transmission: "Transmission",
  automotive: "Automotive",
};

const CATEGORY_GROWTH_CATALOG = [
  {
    id: "grease",
    label: "Grease",
    mixKey: "grease",
    spotlightKey: "grease",
    trainingKey: "grease_fundamentals",
    profileId: "construction",
    signalKeys: ["noGrease", "greaseLowHdHydStrong"],
    namePatterns: [/grease/i],
  },
  {
    id: "coolant",
    label: "Coolant",
    mixKey: "coolant",
    spotlightKey: "coolant",
    trainingKey: "coolant_technology",
    profileId: "truck_dealers",
    signalKeys: ["noCoolant", "hdNoCoolant"],
    namePatterns: [/coolant/i, /antifreeze/i],
  },
  {
    id: "gear",
    label: "Gear Oil",
    mixKey: "gear",
    spotlightKey: "gear",
    trainingKey: "hydraulic_fundamentals",
    signalKeys: ["hydraulicNoGear"],
    namePatterns: [/gear/i],
  },
  {
    id: "hydraulic",
    label: "Hydraulic",
    mixKey: "hydraulic",
    spotlightKey: "hydraulic",
    trainingKey: "hydraulic_fundamentals",
    signalKeys: ["hydraulicOnly", "weak_hydraulic_quote_mix"],
    namePatterns: [/hydraulic/i],
  },
  {
    id: "food_grade",
    label: "Food Grade",
    mixKey: null,
    spotlightKey: null,
    trainingKey: "food_grade_basics",
    profileId: "food_processing",
    signalKeys: ["weak_approved_capture"],
    namePatterns: [/food/i, /h1/i, /nsf/i],
  },
  {
    id: "agrimax",
    label: "AGRIMAX",
    mixKey: null,
    spotlightKey: "hd",
    trainingKey: "category_expansion",
    profileId: null,
    signalKeys: [],
    namePatterns: [/agrimax/i, /agri/i],
  },
  {
    id: "environmental_eal",
    label: "Environmental / EAL",
    mixKey: null,
    spotlightKey: null,
    trainingKey: "category_expansion",
    profileId: null,
    signalKeys: [],
    namePatterns: [/bio/i, /eal/i, /enviro/i, /biodegradable/i],
  },
  {
    id: "transmission",
    label: "Transmission",
    mixKey: "transmission",
    spotlightKey: "transmission",
    trainingKey: "transmission_wet_brake",
    signalKeys: ["noTransmission"],
    namePatterns: [/transmission/i, /utto/i, /wet brake/i],
  },
];

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

function topQuotedCategories(presence, dealer, limit = 4) {
  const scored = Object.entries(MIX_LABELS)
    .map(([key, label]) => ({
      key,
      label,
      count: Number(presence[key] || 0),
    }))
    .filter((r) => r.count > 0)
    .sort((a, b) => b.count - a.count);

  if (scored.length >= limit) return scored.slice(0, limit);

  const rows = Array.isArray(dealer?.productMix) ? dealer.productMix : [];
  const extra = rows
    .map((row) => ({
      label: String(row?.name || "").trim(),
      count: Number(row?.count || 0),
    }))
    .filter((r) => r.label && r.count > 0)
    .sort((a, b) => b.count - a.count);

  const seen = new Set(scored.map((s) => s.label.toLowerCase()));
  extra.forEach((row) => {
    if (scored.length >= limit) return;
    const k = row.label.toLowerCase();
    if (seen.has(k)) return;
    seen.add(k);
    scored.push({ key: k, label: row.label, count: row.count });
  });

  return scored.slice(0, limit);
}

function attachEnablementAlertKinds(signals, dealer, ctx) {
  const oid = String(signals.dealerOrgId || dealer?.organization_id || "");
  const alerts = Array.isArray(ctx?.enablementAlerts) ? ctx.enablementAlerts : [];
  const kinds = alerts
    .filter((al) => String(al.dealerOrgId || al.organization_id || "") === oid)
    .map((al) => String(al.signalKind || "").trim())
    .filter(Boolean);
  return { ...signals, enablementAlertKinds: kinds };
}

function buildInterpretationBullets(signals, presence, special) {
  const bullets = [];

  if (signals.newDealer) {
    bullets.push({
      id: "new_dealer",
      text: "New dealer ramp-up — outside-sales activity is still early; quotes and proposals may need structure before patterns set.",
    });
  }
  if (signals.narrowProductMix || signals.hdOilOnly || signals.hydraulicOnly) {
    bullets.push({
      id: "narrow_mix",
      text: "Narrow product mix in quoted lines — coaching may need to widen category conversations on the next visit.",
    });
  }
  if (signals.hdNoCoolant || signals.noCoolant) {
    bullets.push({
      id: "missing_coolant",
      text: "Strong HD engine oil interest in quotes with thin coolant lines — may be a coolant program coaching opportunity.",
    });
  }
  if (signals.hydraulicNoGear || (presence.hydraulic >= 2 && !presence.gear)) {
    bullets.push({
      id: "hydraulic_no_gear",
      text: "Hydraulic interest in quotes without gear oil — final-drive and drivetrain tags may be the next coaching angle.",
    });
  }
  if (signals.greaseLowHdHydStrong || signals.noGrease) {
    bullets.push({
      id: "grease_gap",
      text: "HD or hydraulic lines dominate quotes while grease is thin — PM grease may be an attach coaching opportunity.",
    });
  }
  if (signals.stalledQuoteActivity || signals.lowProposalFollowUp) {
    bullets.push({
      id: "quote_followup",
      text: "Quote follow-up opportunity — proposals or customer replies are quiet relative to quote volume.",
    });
  }
  if (signals.quoteSpike) {
    bullets.push({
      id: "quote_spike",
      text: "Recent quote activity is elevated — good window to align on priorities before more quotes stack up.",
    });
  }
  if (special.foodGrade === 0 && (signals.enablementAlertKinds || []).includes("weak_approved_capture")) {
    bullets.push({
      id: "food_grade_signal",
      text: "Quote activity may include plant or food-grade accounts — profile-guided discovery may help reps.",
    });
  }

  if (!bullets.length) {
    bullets.push({
      id: "steady",
      text: "Quote and proposal activity look steady — use the review to align on the next two category growth bets.",
    });
  }

  return bullets.slice(0, 6);
}

function scoreCategoryOpportunity(entry, signals, presence, special, alertKinds, dealer) {
  let score = 0;
  const mixKey = entry.mixKey;
  if (mixKey && Number(presence[mixKey] || 0) === 0) score += 4;
  if (mixKey && Number(presence[mixKey] || 0) > 0 && Number(presence[mixKey] || 0) <= 1) score += 2;

  (entry.signalKeys || []).forEach((sk) => {
    if (signals[sk]) score += 5;
    if (alertKinds.includes(sk)) score += 4;
  });

  if (entry.id === "food_grade" && special.foodGrade === 0 && alertKinds.includes("weak_approved_capture")) {
    score += 6;
  }
  if (entry.id === "agrimax" && special.agrimax === 0 && (presence.hd >= 2 || presence.hydraulic >= 2)) {
    score += 3;
  }
  if (entry.id === "environmental_eal" && special.eal === 0 && presence.total >= 4) {
    score += 2;
  }
  if (entry.namePatterns?.length && mixCountFromRows(dealer, entry.namePatterns) === 0 && score > 0) {
    score += 1;
  }

  return score;
}

function suggestedEnablementForCategory(entry, signals) {
  const parts = [];
  if (entry.spotlightKey && INTENTIONAL_SPOTLIGHT_LABELS[entry.spotlightKey]) {
    parts.push(`Spotlight: ${INTENTIONAL_SPOTLIGHT_LABELS[entry.spotlightKey]}`);
  }
  if (entry.profileId && INTENTIONAL_CUSTOMER_PROFILES[entry.profileId]) {
    parts.push(`Profile: ${INTENTIONAL_CUSTOMER_PROFILES[entry.profileId]}`);
  }
  const training = entry.trainingKey && KL_ADMIN_TRAINING_MODULES[entry.trainingKey];
  if (training) {
    parts.push(`Training: ${training.label}`);
  }
  if (!parts.length) {
    parts.push("Category review with the rep using quote tags and current PDS.");
  }
  return parts.join(" · ");
}

function buildCategoryGrowthOpportunities(signals, presence, dealer, alertKinds) {
  const special = {
    foodGrade: mixCountFromRows(dealer, [/food/i, /h1/i, /nsf/i]),
    agrimax: mixCountFromRows(dealer, [/agrimax/i]),
    eal: mixCountFromRows(dealer, [/bio/i, /eal/i, /enviro/i, /biodegradable/i]),
  };
  const ranked = CATEGORY_GROWTH_CATALOG.map((entry) => ({
    entry,
    score: scoreCategoryOpportunity(entry, signals, presence, special, alertKinds, dealer),
  }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score);

  const whyById = {
    grease: "PM and chassis work often needs a deliberate grease story when hydraulic or HD lines lead quotes.",
    coolant: "Fleet and HD quote patterns without coolant may mean reps need a program conversation—not assumed stocking.",
    gear: "Hydraulic-heavy quotes without gear oil may leave final-drive coaching on the table.",
    hydraulic: "When hydraulics are thin in quoted products, ISO/VG and tag language usually comes before price.",
    food_grade: "Plant accounts need H1 language and audit habits—profile-guided discovery beats a generic SKU list.",
    agrimax: "Ag and fleet equipment lines may benefit from AGRIMAX program positioning when ag quote signals appear.",
    environmental_eal: "Sensitive sites may need biodegradable / EAL positioning when environmental accounts are in play.",
    transmission: "UTTO, hydraulic, and gear fills are often confused—transmission coaching clarifies the next ask.",
  };

  return ranked.slice(0, 5).map(({ entry }) => ({
    category: entry.label,
    whyItMatters:
      whyById[entry.id] ||
      `Recent quote activity suggests room to grow ${entry.label} in outside-sales conversations.`,
    suggestedEnablement: suggestedEnablementForCategory(entry, signals),
  }));
}

function buildTrainingCoachingPlan(signals, profileActions) {
  const items = [];

  if (signals.newDealer) {
    items.push({
      type: "in_person_kickoff",
      label: "In-person kickoff training",
      rationale:
        "Hydraulic Fundamentals, Grease Fundamentals, first quote, proposal send, and follow-up habits while activity is still ramping.",
    });
  }

  const trainingKeys = new Set();
  if (signals.hdNoCoolant || signals.noCoolant) trainingKeys.add("coolant_technology");
  if (signals.greaseLowHdHydStrong || signals.noGrease) trainingKeys.add("grease_fundamentals");
  if (signals.hydraulicNoGear || signals.hydraulicOnly) trainingKeys.add("hydraulic_fundamentals");
  if (signals.noTransmission) trainingKeys.add("transmission_wet_brake");
  if (signals.categoryExpansionOpportunity) trainingKeys.add("category_expansion");
  if (signals.stalledQuoteActivity || signals.lowProposalFollowUp) trainingKeys.add("quote_followup");

  trainingKeys.forEach((key) => {
    const mod = KL_ADMIN_TRAINING_MODULES[key];
    if (!mod) return;
    items.push({
      type: "category_training",
      label: mod.label,
      rationale: mod.why,
    });
  });

  if (signals.stalledQuoteActivity || (signals.proposalsSent >= 2 && signals.customerResponses === 0)) {
    items.push({
      type: "ride_along",
      label: "Ride-along",
      rationale: "Listen for the customer decision ask while proposals are still open on the platform.",
    });
  }

  items.push({
    type: "klondike_university",
    label: "Klondike University assignment",
    rationale:
      "Assign an online module for managers who want follow-up between field visits—optional, not a substitute for counter coaching.",
  });

  if (signals.narrowProductMix || signals.categoryExpansionOpportunity) {
    items.push({
      type: "category_review",
      label: "Category review",
      rationale: "Walk quoted products vs. equipment tags and mark two categories not on recent quotes.",
    });
  }

  if (signals.greaseLowHdHydStrong || signals.hdNoCoolant) {
    items.push({
      type: "service_bay_review",
      label: "Service bay review",
      rationale: "Use one PM ticket or bay walk-through to connect quoted lines to compartments on the unit.",
    });
  }

  profileActions.slice(0, 2).forEach((row) => {
    items.push({
      type: "customer_profile",
      label: row.enablementTitle || "Customer profile review",
      rationale: row.why || "Profile-guided discovery for the next field visit.",
    });
  });

  const seen = new Set();
  return items.filter((row) => {
    const k = `${row.type}:${row.label}`;
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  }).slice(0, 6);
}

function buildNext30DayActions(signals, opportunities, warehouseNeeded) {
  const actions = [];

  const topSpot = opportunities.find((o) => /Spotlight:/i.test(o.suggestedEnablement));
  if (topSpot) {
    const m = topSpot.suggestedEnablement.match(/Spotlight: ([^·]+)/);
    actions.push({
      action: "Send spotlight",
      detail: m
        ? `Review ${m[1].trim()} with the rep before any customer send.`
        : `Review the ${topSpot.category} spotlight with the rep before any customer send.`,
    });
  }

  if (signals.newDealer || signals.possibleTrainingNeed) {
    actions.push({
      action: "Assign training",
      detail: "Book Prepare Training or Klondike University for the top module from the coaching plan.",
    });
  }

  if (signals.stalledQuoteActivity || signals.lowProposalFollowUp) {
    actions.push({
      action: "Schedule ride-along",
      detail: "Join the next customer visit while open proposals are visible on the platform.",
    });
  }

  if (signals.narrowProductMix || opportunities.length >= 2) {
    actions.push({
      action: "Prepare category review",
      detail: "Agree on two category growth targets from quoted products—not dealer ERP or counter totals.",
    });
  }

  if (warehouseNeeded) {
    actions.push({
      action: "Review warehouse support",
      detail:
        "Review KLONDIKE warehouse inventory support for products tied to projected demand from proposals.",
    });
  }

  if (actions.length < 3) {
    actions.push({
      action: "Align follow-up plan",
      detail: "Document quote owners, next customer touch dates, and one enablement send for the month.",
    });
  }

  return actions.slice(0, 5);
}

function formatCurrencyUsd(amount) {
  const n = Number(amount);
  if (!Number.isFinite(n) || n <= 0) return null;
  return `$${Math.round(n).toLocaleString()}`;
}

function resolveDealerLogoUrl(dealer, ctx) {
  return (
    String(dealer?.dealerLogoUrl || "").trim() ||
    String(ctx?.dealerLogoUrl || "").trim() ||
    ""
  );
}

/**
 * @param {object} dealer
 * @param {{ contests?: object[], contestLeaderSummaries?: Record<string, object>, dealers?: object[] }} ctx
 * @returns {object[]|null}
 */
function buildContestResultsItems(dealer, ctx) {
  const oid = String(dealer?.organization_id || "");
  const contests = Array.isArray(ctx?.contests) ? ctx.contests : [];
  const leaders = ctx?.contestLeaderSummaries || {};
  const dealers = Array.isArray(ctx?.dealers) ? ctx.dealers : [];

  const items = contests
    .filter((c) => {
      const scope = String(c?.scopeType || "territory");
      if (scope === "dealer" && c?.scopeDealerOrgId) {
        return String(c.scopeDealerOrgId) === oid;
      }
      return scope === "territory" || scope === "all_reps";
    })
    .map((c) => {
      const cid = String(c?.id || "");
      const ld = leaders[cid] || {};
      const start = String(c?.startDate || "").slice(0, 10);
      const end = String(c?.endDate || "").slice(0, 10);
      const dateRange =
        start && end ? `${start} – ${end}` : String(c?.dateRangeLabel || "").trim() || "Active window";

      let standings = [];
      const scope = String(c?.scopeType || "territory");
      if (scope === "dealer") {
        standings = (Array.isArray(dealer?.leaderboard) ? dealer.leaderboard : [])
          .slice(0, 5)
          .map((r) => {
            const val = formatCurrencyUsd(r?.revenue);
            return {
              name: String(r?.name || "Rep").trim(),
              detail: [
                `${Number(r?.quotes || 0)} quotes`,
                `${Number(r?.proposals || 0)} proposals`,
                val ? `${val} accepted proposal value` : null,
              ]
                .filter(Boolean)
                .join(" · "),
            };
          })
          .filter((r) => r.name);
      } else if (dealers.length) {
        standings = [...dealers]
          .sort((a, b) => Number(b?.revenueWon || 0) - Number(a?.revenueWon || 0))
          .slice(0, 3)
          .map((d) => {
            const val = formatCurrencyUsd(d?.revenueWon);
            return {
              name: String(d?.name || "Dealer").trim(),
              detail: val
                ? `${val} projected accepted proposal value on the platform`
                : "Quote activity on the platform",
            };
          });
      }

      return {
        contestName: String(c?.title || "Territory contest").trim(),
        dateRange,
        progressLine: String(ld?.line || "—").trim(),
        footnote: String(ld?.footnote || "").trim(),
        leaderLabel: ld?.qualified ? "Leader" : "Progress",
        standings,
      };
    });

  return items.length ? items : null;
}

/**
 * @param {object} dealer
 * @returns {{ empty: boolean, rows: object[] }}
 */
function buildRepPlatformAdoption(dealer) {
  const raw = Array.isArray(dealer?.leaderboard) ? dealer.leaderboard : [];
  const rows = raw
    .map((r) => ({
      name: String(r?.name || "Rep").trim(),
      quotesCreated: Number(r?.quotes || 0),
      proposalsSent: Number(r?.proposals || 0),
      acceptedProposalValue: Number(r?.revenue || 0),
      customerResponses: Number(r?.responses || 0),
      spotlightUsage: null,
    }))
    .filter((r) => r.name)
    .sort(
      (a, b) =>
        b.quotesCreated +
        b.proposalsSent * 2 +
        b.acceptedProposalValue / 1000 -
        (a.quotesCreated + a.proposalsSent * 2 + a.acceptedProposalValue / 1000)
    )
    .slice(0, 10);

  return { empty: rows.length === 0, rows };
}

/**
 * @param {object} dealer — dealerNetworkPerformance row
 * @param {{
 *   enablementAlerts?: object[],
 *   territoryProposalSignals?: object,
 *   territoryInventoryModel?: object,
 *   contests?: object[],
 *   contestLeaderSummaries?: Record<string, object>,
 *   dealers?: object[],
 *   dealerLogoUrl?: string,
 * }} [ctx]
 */
export function buildDealerBusinessReviewPlan(dealer, ctx = {}) {
  const name = String(dealer?.name || "Dealer").trim();
  const oid = String(dealer?.organization_id || "");
  const presence = getDealerMixPresence(dealer);
  let signals = computeDealerActionCenterSignals(dealer, ctx);
  signals = attachEnablementAlertKinds(signals, dealer, ctx);
  const alertKinds = signals.enablementAlertKinds || [];

  const q = Number(signals.quotesCreated || 0);
  const p = Number(signals.proposalsSent || 0);
  const r = Number(signals.customerResponses || 0);
  const topCategories = topQuotedCategories(presence, dealer);

  const proposalSummary =
    p === 0
      ? `${q} quote(s) on file with no proposals sent yet.`
      : r === 0
        ? `${p} proposal(s) sent with no customer replies recorded on the platform yet.`
        : `${p} proposal(s) sent with ${r} customer reply signal(s) on the platform.`;

  const inv = ctx.territoryInventoryModel;
  const warehouseNeeded = Boolean(
    inv?.hasData &&
      ((Array.isArray(inv.acceleratingSkus) && inv.acceleratingSkus.length > 0) ||
        (Array.isArray(inv.insights) && inv.insights.length > 0))
  );

  const profileActions = buildIntentionalProfileAndOemActions(dealer, signals);
  const interpretation = buildInterpretationBullets(signals, presence, {
    foodGrade: mixCountFromRows(dealer, [/food/i, /h1/i, /nsf/i]),
    agrimax: mixCountFromRows(dealer, [/agrimax/i]),
    eal: mixCountFromRows(dealer, [/bio/i, /eal/i, /enviro/i]),
  });
  const categoryGrowthOpportunities = buildCategoryGrowthOpportunities(
    signals,
    presence,
    dealer,
    alertKinds
  );
  const trainingCoachingPlan = buildTrainingCoachingPlan(signals, profileActions);
  const next30DayActions = buildNext30DayActions(
    signals,
    categoryGrowthOpportunities,
    warehouseNeeded
  );

  const acceptedProposalValue = Number(dealer?.revenueWon || 0);
  const acceptedProposalCount = Number(dealer?.approvedLineCount || 0);
  const acceptedValueLabel = formatCurrencyUsd(acceptedProposalValue);
  const contestItems = buildContestResultsItems(dealer, ctx);
  const repAdoption = buildRepPlatformAdoption(dealer);
  const dealerLogoUrl = resolveDealerLogoUrl(dealer, ctx);

  const preparedAt = new Date();
  const sections = {
      dealerSnapshot: {
        dealerName: name,
        recentActivity: `${q} quotes · ${p} proposals · ${r} customer reply signal(s) on the platform`,
        topQuotedCategories: topCategories.map((c) => ({
          label: c.label,
          count: c.count,
        })),
        proposalActivitySummary: proposalSummary,
        acceptedProposalCount,
        acceptedProposalValue,
        acceptedProposalValueLabel: acceptedValueLabel
          ? `${acceptedValueLabel} projected accepted proposal value`
          : "No accepted proposal value on the platform yet",
        acceptedProposalCountLabel:
          acceptedProposalCount > 0
            ? `${acceptedProposalCount} accepted proposal line(s) on the platform`
            : "No accepted proposal lines on the platform yet",
      },
      interpretation: {
        title: "What We Think Is Happening",
        bullets: interpretation,
      },
      categoryGrowthOpportunities: {
        title: "Category Growth Opportunities",
        items: categoryGrowthOpportunities,
      },
      trainingCoachingPlan: {
        title: "Training / Coaching Plan",
        items: trainingCoachingPlan,
      },
      suggestedAgenda: {
        title: "Suggested Review Agenda",
        steps: [
          "Review recent quote activity and who owns follow-up on open proposals.",
          "Review top product and category interests from quoted lines on the platform.",
          "Identify two to three category growth opportunities from the list above.",
          "Agree on one spotlight, profile, or training follow-up for the next field cycle.",
          warehouseNeeded
            ? "Align on KLONDIKE warehouse inventory support for projected demand if proposal activity warrants it."
            : "Confirm next customer touch dates before adding more quotes.",
        ],
      },
      next30DayActionPlan: {
        title: "Next 30-Day Action Plan",
        actions: next30DayActions,
      },
    };

  if (contestItems) {
    sections.contestResults = {
      title: "Contest Results",
      items: contestItems,
    };
  }

  sections.repPlatformAdoption = {
    title: "Rep Platform Adoption",
    empty: repAdoption.empty,
    rows: repAdoption.rows,
  };

  return {
    version: 1,
    generatedAt: preparedAt.toISOString(),
    preparedDateLabel: preparedAt.toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    preparedSubtitle: "Prepared from platform activity and projected opportunities",
    footerDisclaimer:
      "Projected opportunity only. Not dealer counter sales, ERP data, closed revenue, or dealership inventory.",
    dealerOrgId: oid,
    dealerName: name,
    acceptedProposalValue,
    acceptedProposalCount,
    branding: {
      klondikeLogoSrc: KLONDIKE_BDR_LOGO_SRC,
      dealerLogoUrl,
      dealerName: name,
    },
    platformBoundaryNote:
      "Built from outside-sales quote, proposal, category mix, and enablement usage only—not dealer counter sales, ERP data, closed revenue, or dealership inventory levels.",
    sections,
  };
}

export function isBusinessReviewActionCenterItem(ac) {
  if (!ac || typeof ac !== "object") return false;
  if (ac.recommendationType === "business_review_recommendation") return true;
  return String(ac.kind || "").includes("business_review");
}

/**
 * Plain-text export for clipboard copy.
 * @param {ReturnType<typeof buildDealerBusinessReviewPlan>} plan
 */
export function formatBusinessReviewPlanPlainText(plan) {
  if (!plan?.sections) return "";
  const s = plan.sections;
  const lines = [
    "KLONDIKE DEALER BUSINESS REVIEW",
    String(plan.dealerName || "Dealer").trim(),
    String(plan.preparedDateLabel || "").trim(),
    String(plan.preparedSubtitle || "Prepared from platform activity and projected opportunities").trim(),
    "",
    "—— Dealer Snapshot ——",
    `Recent activity: ${s.dealerSnapshot?.recentActivity || "—"}`,
    `Proposals: ${s.dealerSnapshot?.proposalActivitySummary || "—"}`,
    `Accepted proposal value: ${s.dealerSnapshot?.acceptedProposalValueLabel || "—"}`,
    `Accepted proposal count: ${s.dealerSnapshot?.acceptedProposalCountLabel || "—"}`,
  ];
  if (s.contestResults?.items?.length) {
    lines.push("", `—— ${s.contestResults.title} ——`);
    s.contestResults.items.forEach((c) => {
      lines.push(`  ${c.contestName} (${c.dateRange})`);
      lines.push(`    ${c.progressLine}`);
      if (c.footnote) lines.push(`    ${c.footnote}`);
      (c.standings || []).forEach((st) => lines.push(`    · ${st.name}: ${st.detail}`));
    });
  }
  if (s.repPlatformAdoption) {
    lines.push("", `—— ${s.repPlatformAdoption.title} ——`);
    if (s.repPlatformAdoption.empty) {
      lines.push("  No rep activity yet on the platform.");
    } else {
      (s.repPlatformAdoption.rows || []).forEach((r) => {
        const val = Number(r.acceptedProposalValue || 0);
        const valTxt = val > 0 ? ` · $${Math.round(val).toLocaleString()} accepted proposal value` : "";
        lines.push(
          `  · ${r.name}: ${r.quotesCreated} quotes · ${r.proposalsSent} proposals${valTxt}`
        );
      });
    }
  }
  const cats = s.dealerSnapshot?.topQuotedCategories || [];
  if (cats.length) {
    lines.push("Top quoted categories:");
    cats.forEach((c) => lines.push(`  · ${c.label}${c.count ? ` (${c.count})` : ""}`));
  }
  lines.push("", `—— ${s.interpretation?.title || "What We Think Is Happening"} ——`);
  (s.interpretation?.bullets || []).forEach((b) => lines.push(`  · ${b.text}`));
  lines.push("", `—— ${s.categoryGrowthOpportunities?.title || "Category Growth Opportunities"} ——`);
  (s.categoryGrowthOpportunities?.items || []).forEach((row) => {
    lines.push(`  ${row.category}`);
    lines.push(`    Why: ${row.whyItMatters}`);
    lines.push(`    Enablement: ${row.suggestedEnablement}`);
  });
  lines.push("", `—— ${s.trainingCoachingPlan?.title || "Training / Coaching Plan"} ——`);
  (s.trainingCoachingPlan?.items || []).forEach((row) => {
    lines.push(`  · ${row.label} — ${row.rationale}`);
  });
  lines.push("", `—— ${s.suggestedAgenda?.title || "Suggested Review Agenda"} ——`);
  (s.suggestedAgenda?.steps || []).forEach((step, i) => lines.push(`  ${i + 1}. ${step}`));
  lines.push("", `—— ${s.next30DayActionPlan?.title || "Next 30-Day Action Plan"} ——`);
  (s.next30DayActionPlan?.actions || []).forEach((row) => {
    lines.push(`  · ${row.action} — ${row.detail}`);
  });
  lines.push("", String(plan.footerDisclaimer || plan.platformBoundaryNote || "").trim());
  return lines.filter((ln, idx, arr) => !(ln === "" && arr[idx - 1] === "")).join("\n");
}

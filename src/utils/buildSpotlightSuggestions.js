/**
 * Deterministic spotlight suggestions from tracked Klondike Admin intelligence only.
 * No ML — rules are explicit and auditable.
 */

import { CATEGORY_SPOTLIGHTS } from "../data/salesEnablement/categorySpotlights";
import { PRODUCT_SPOTLIGHTS } from "../data/salesEnablement/productSpotlights";
import {
  CATEGORY_SPOTLIGHT_BY_MIX_CATEGORY,
  DEFAULT_PRODUCT_SPOTLIGHT_BY_DEMAND_CATEGORY,
  PRIORITY_ORDER,
  SIGNAL_TYPES,
} from "../data/salesEnablement/spotlightSuggestionRules";
import { demandCategoryFromProductName } from "./territoryProposalSignals";

function titleMaps() {
  const product = Object.fromEntries(PRODUCT_SPOTLIGHTS.map((p) => [p.id, p.title]));
  const category = Object.fromEntries(CATEGORY_SPOTLIGHTS.map((c) => [c.id, c.title]));
  return { product, category };
}

/**
 * @param {object} context
 * @param {object|null} context.territoryInventoryModel
 * @param {object} context.productMixIntelligence
 * @param {object} context.ocrSnapshot
 * @param {object|null} context.territoryProposalSignals
 * @param {object} context.territoryRollup
 */
export function buildSpotlightSuggestions(context) {
  const { product: productTitleById, category: categoryTitleById } = titleMaps();
  const raw = [];

  const push = ({
    spotlightId,
    spotlightType,
    reason,
    signalType,
    priority,
    category,
    territoryContext,
  }) => {
    const title =
      spotlightType === "product"
        ? productTitleById[spotlightId] || spotlightId
        : categoryTitleById[spotlightId] || spotlightId;
    raw.push({
      spotlightId,
      spotlightType,
      title,
      reason,
      signalType,
      priority,
      category: category || "",
      territoryContext: territoryContext || "",
    });
  };

  const {
    territoryInventoryModel,
    productMixIntelligence,
    ocrSnapshot,
    territoryProposalSignals,
    territoryRollup,
  } = context || {};

  // --- Proposal throughput vs responses (territory rollup) ---
  if (territoryRollup) {
    const sent = Number(territoryRollup.totalProposalsSent || 0);
    const resp = Number(territoryRollup.totalCustomerResponses || 0);
    if (sent >= 8 && resp <= Math.floor(sent * 0.35)) {
      push({
        spotlightId: "cs-hd-conversion",
        spotlightType: "category",
        reason: `Territory shows ${sent} outbound proposal(s) with only ${resp} customer response record(s)—conversion coaching is timely.`,
        signalType: SIGNAL_TYPES.PROPOSAL_RESPONSE_GAP,
        priority: "high",
        category: "HD Engine Oils",
        territoryContext: "Territory-wide proposal throughput",
      });
    }
  }

  // --- Category-level approval vs decline (proposal responses) ---
  const catDec = territoryProposalSignals?.categoryDecisions;
  if (catDec && typeof catDec === "object") {
    Object.entries(catDec).forEach(([cat, d]) => {
      const a = Number(d?.approved || 0);
      const dec = Number(d?.declined || 0);
      const tot = a + dec;
      if (tot < 3 || cat === "Other") return;
      const declineShare = dec / tot;
      if (declineShare >= 0.42 && dec >= 2) {
        const csId = CATEGORY_SPOTLIGHT_BY_MIX_CATEGORY[cat] || "cs-hd-conversion";
        push({
          spotlightId: csId,
          spotlightType: "category",
          reason: `Recorded proposal line decisions: ${dec} declined vs ${a} approved in ${cat} (${Math.round(
            declineShare * 100
          )}% declined)—review fit and follow-up discipline.`,
          signalType: SIGNAL_TYPES.UNDERPERFORMING_CATEGORY,
          priority: declineShare >= 0.55 ? "high" : "medium",
          category: cat,
          territoryContext: "Proposal response lines",
        });
      }
    });
  }

  // --- Quoted mix gaps ---
  const mixRows = productMixIntelligence?.rows;
  if (Array.isArray(mixRows)) {
    mixRows.forEach((row) => {
      if (Number(row?.count || 0) !== 0) return;
      const name = row?.name;
      const csId = CATEGORY_SPOTLIGHT_BY_MIX_CATEGORY[name];
      if (!csId) return;
      push({
        spotlightId: csId,
        spotlightType: "category",
        reason: `${name} has zero quoted product touches in the current dealer activity rollup—consider enabling broader discovery.`,
        signalType: SIGNAL_TYPES.UNDERREPRESENTED_CATEGORY,
        priority: "medium",
        category: name,
        territoryContext: "Quoted product mix (dealer network)",
      });
    });
  }

  // --- Approved demand rollup (inventory intelligence model) ---
  const inv = territoryInventoryModel;
  if (inv?.hasData) {
    const synPct = Number(inv.syntheticSharePct || 0);
    if (synPct >= 22) {
      push({
        spotlightId: "cs-synthetic-upgrade",
        spotlightType: "category",
        reason: `Synthetic-related approved lines represent about ${synPct}% of cumulative approved unit volume—synthetic upgrade narratives apply.`,
        signalType: SIGNAL_TYPES.SYNTHETIC_DEMAND_ACCELERATION,
        priority: "medium",
        category: "Synthetic Conversion",
        territoryContext: "Approved proposal demand (units)",
      });
      push({
        spotlightId: "ps-klondike-5w40-fs-hd",
        spotlightType: "product",
        reason:
          "Synthetic share in approved demand supports keeping HD synthetic spotlight materials ready where OEM allows.",
        signalType: SIGNAL_TYPES.SYNTHETIC_DEMAND_ACCELERATION,
        priority: "low",
        category: "HD Engine Oils",
        territoryContext: "Approved proposal demand (units)",
      });
    }

    const pkgRows = Array.isArray(inv.packageTrendRows) ? inv.packageTrendRows : [];
    const tote = pkgRows.find((r) => r?.name === "Tote / bulk");
    if (
      tote &&
      Number(tote.recentUnits || 0) >= 4 &&
      Number(tote.recentUnits || 0) > Number(tote.priorUnits || 0)
    ) {
      push({
        spotlightId: "cs-hydraulic-opportunity",
        spotlightType: "category",
        reason: `Tote/bulk package approvals in the recent 14-day window (${Number(
          tote.recentUnits
        )} units) exceed the prior window (${Number(tote.priorUnits || 0)})—bulk fluid conversations may be strengthening.`,
        signalType: SIGNAL_TYPES.TOTE_PACKAGE_MOMENTUM,
        priority: "medium",
        category: "Hydraulic Fluids",
        territoryContext: "Approved demand package trend",
      });
    }

    const insights = Array.isArray(inv.insights) ? inv.insights : [];
    insights.forEach((ins) => {
      const s = String(ins || "");
      if (s.includes("Hydraulic tote demand is accelerating")) {
        push({
          spotlightId: "ps-klondike-aw-hydraulic",
          spotlightType: "product",
          reason: s,
          signalType: SIGNAL_TYPES.TOTE_PACKAGE_MOMENTUM,
          priority: "medium",
          category: "Hydraulic Fluids",
          territoryContext: "Inventory intelligence (rollup insight)",
        });
      }
      if (s.includes("Synthetic approvals are increasing")) {
        push({
          spotlightId: "cs-synthetic-upgrade",
          spotlightType: "category",
          reason: s,
          signalType: SIGNAL_TYPES.SYNTHETIC_DEMAND_ACCELERATION,
          priority: "medium",
          category: "Synthetic Conversion",
          territoryContext: "Inventory intelligence (rollup insight)",
        });
      }
      if (s.includes("approvals increased versus the prior 14-day window")) {
        const m = s.match(/^([^\n]+) approvals increased/);
        const catHint = m ? m[1].trim() : "";
        if (catHint && catHint !== "Other") {
          const csId = CATEGORY_SPOTLIGHT_BY_MIX_CATEGORY[catHint] || null;
          if (csId) {
            push({
              spotlightId: csId,
              spotlightType: "category",
              reason: s,
              signalType: SIGNAL_TYPES.CATEGORY_DEMAND_ACCELERATION,
              priority: "medium",
              category: catHint,
              territoryContext: "Category velocity (approved units)",
            });
          }
        }
      }
    });

    const accel = Array.isArray(inv.acceleratingSkus) ? inv.acceleratingSkus : [];
    accel.slice(0, 4).forEach((row) => {
      const cat = demandCategoryFromProductName(row?.product);
      const pid = DEFAULT_PRODUCT_SPOTLIGHT_BY_DEMAND_CATEGORY[cat];
      if (!pid || cat === "Other") return;
      const label = String(row?.product || "").trim();
      const short =
        label.length > 90 ? `${label.slice(0, 90)}…` : label;
      push({
        spotlightId: pid,
        spotlightType: "product",
        reason: `Approved demand for “${short}” is accelerating (recent vs prior 14-day windows).`,
        signalType: SIGNAL_TYPES.ACCELERATING_SKU,
        priority: "medium",
        category: cat,
        territoryContext: "SKU velocity",
      });
    });

    const cr = Array.isArray(inv.categoryRows) ? inv.categoryRows : [];
    if (cr.length > 0 && Number(cr[0].units || 0) >= 10 && Number(cr[0].sharePct || 0) >= 28) {
      const top = cr[0];
      const cs =
        CATEGORY_SPOTLIGHT_BY_MIX_CATEGORY[top.name] ||
        (top.name === "Hydraulic Fluids" ? "cs-hydraulic-opportunity" : null);
      if (cs && top.name && top.name !== "Other") {
        push({
          spotlightId: cs,
          spotlightType: "category",
          reason: `${top.name} leads approved units (${top.sharePct}% share)—reinforce category messaging while attention is high.`,
          signalType: SIGNAL_TYPES.APPROVED_DEMAND_FOCUS,
          priority: "low",
          category: top.name,
          territoryContext: "Territory approved-demand rollup",
        });
      }
    }
  }

  // --- OCR field concentration ---
  if (ocrSnapshot && Number(ocrSnapshot.totalScans || 0) >= 6) {
    const brand = String(ocrSnapshot.topBrand || "").trim();
    if (brand) {
      push({
        spotlightId: "cs-hd-conversion",
        spotlightType: "category",
        reason: `OCR scans recorded (${Number(
          ocrSnapshot.totalScans
        )}); most-scanned competitor brand is “${brand}”—support consultative conversion coaching.`,
        signalType: SIGNAL_TYPES.OCR_COMPETITOR_CONCENTRATION,
        priority: "low",
        category: "HD Engine Oils",
        territoryContext: "Field OCR adoption",
      });
    }
  }

  /** @type {Map<string, typeof raw[0]>} */
  const best = new Map();
  raw.forEach((s) => {
    const prev = best.get(s.spotlightId);
    if (!prev || PRIORITY_ORDER[s.priority] < PRIORITY_ORDER[prev.priority]) {
      best.set(s.spotlightId, s);
    }
  });

  return Array.from(best.values())
    .sort((a, b) => {
      const pr = PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
      if (pr !== 0) return pr;
      return String(a.title).localeCompare(String(b.title));
    })
    .slice(0, 10);
}

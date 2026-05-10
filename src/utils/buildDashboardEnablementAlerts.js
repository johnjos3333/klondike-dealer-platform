/**
 * Top dealer enablement alerts for KL Admin dashboard cards (deterministic).
 */

import { CATEGORY_SPOTLIGHTS } from "../data/salesEnablement/categorySpotlights";
import { PRODUCT_SPOTLIGHTS } from "../data/salesEnablement/productSpotlights";
import { buildDealerEnablementIntelligence } from "./buildDealerEnablementIntelligence";

const DASHBOARD_SIGNAL_PRIORITY = [
  "weak_approved_capture",
  "low_proposal_activity",
  "weak_hydraulic_quote_mix",
  "weak_hydraulic_approved_mix",
  "low_grease_penetration",
  "weak_synthetic_adoption",
  "proposal_engagement_gap",
  "low_ocr_utilization",
  "heavy_duty_quote_concentration",
];

const ISSUE_TITLE = {
  weak_hydraulic_quote_mix: "Weak hydraulic adoption (quotes)",
  weak_hydraulic_approved_mix: "Weak hydraulic adoption (approved demand)",
  low_grease_penetration: "Weak grease penetration",
  weak_synthetic_adoption: "Weak synthetic adoption",
  low_proposal_activity: "Low proposal activity",
  weak_approved_capture: "Weak approved capture",
  proposal_engagement_gap: "Proposal engagement gap",
  low_ocr_utilization: "Low OCR utilization",
  heavy_duty_quote_concentration: "Heavy diesel quote concentration",
};

const WHY_MATTERS = {
  weak_hydraulic_quote_mix:
    "Hydraulic conversations often lag until reps have a repeatable ISO/VG story—spotlight material closes the gap.",
  weak_hydraulic_approved_mix:
    "Approved demand should reflect hydraulic share where fleets run fluid circuits—misalignment risks lost attach.",
  low_grease_penetration:
    "Grease is high-frequency attach on mixed fleets—low penetration leaves revenue and training upside on the table.",
  weak_synthetic_adoption:
    "Synthetic share below the territory rollup suggests coaching opportunity before premium tier conversations stall.",
  low_proposal_activity:
    "Quotes without proposals stall customer decisions—fix workflow before scaling enablement sends.",
  weak_approved_capture:
    "Without approved lines, inventory and coaching signals stay blind—tighten approval capture first.",
  proposal_engagement_gap:
    "Outbound proposals without responses burn cycle time—enablement should pair with follow-up discipline.",
  low_ocr_utilization:
    "OCR builds competitive context for counter staff—missing scans reduce field intelligence for this dealer.",
  heavy_duty_quote_concentration:
    "Heavy diesel-heavy quoting benefits from structured CK-4 positioning while opening adjacent categories.",
};

const FALLBACK_SPOTLIGHT = {
  weak_hydraulic_quote_mix: { spotlightId: "cs-hydraulic-opportunity", spotlightType: "category" },
  weak_hydraulic_approved_mix: {
    spotlightId: "ps-klondike-aw-hydraulic",
    spotlightType: "product",
  },
  low_grease_penetration: { spotlightId: "cs-grease-program-growth", spotlightType: "category" },
  weak_synthetic_adoption: { spotlightId: "cs-synthetic-upgrade", spotlightType: "category" },
  low_proposal_activity: { spotlightId: "cs-hd-conversion", spotlightType: "category" },
  weak_approved_capture: { spotlightId: "cs-hd-conversion", spotlightType: "category" },
  proposal_engagement_gap: { spotlightId: "cs-hd-conversion", spotlightType: "category" },
  low_ocr_utilization: { spotlightId: "cs-hd-conversion", spotlightType: "category" },
  heavy_duty_quote_concentration: { spotlightId: "cs-hd-conversion", spotlightType: "category" },
};

function severityRank(sev) {
  if (sev === "high") return 0;
  if (sev === "medium") return 1;
  return 2;
}

function resolveSpotlightTitle(spotlightId, spotlightType) {
  if (!spotlightId) return "—";
  if (spotlightType === "product") {
    const p = PRODUCT_SPOTLIGHTS.find((x) => x.id === spotlightId);
    return p?.title || spotlightId;
  }
  const c = CATEGORY_SPOTLIGHTS.find((x) => x.id === spotlightId);
  return c?.title || spotlightId;
}

function pickSpotlightForSignal(signalKind, recommendations) {
  const rec = (recommendations || []).find((r) => r.spotlightId && r.spotlightType);
  if (rec) {
    return {
      spotlightId: rec.spotlightId,
      spotlightType: rec.spotlightType,
      recommendedTitle: rec.title,
    };
  }
  const fb = FALLBACK_SPOTLIGHT[signalKind];
  if (fb) {
    return {
      spotlightId: fb.spotlightId,
      spotlightType: fb.spotlightType,
      recommendedTitle: null,
    };
  }
  return null;
}

/**
 * @returns {Array<{
 *   alertKey: string,
 *   dealerOrgId: string,
 *   dealerName: string,
 *   signalKind: string,
 *   issueTitle: string,
 *   issueDetail: string,
 *   whyItMatters: string,
 *   spotlightId: string,
 *   spotlightType: string,
 *   spotlightTitle: string,
 *   severityRank: number,
 *   signalPriorityIdx: number,
 * }>}
 */
export function buildDashboardEnablementAlerts({
  dealerNetworkPerformance,
  adminDealerDrilldownRows,
  klondikeDealerApprovedDemandProfiles,
  quotedBenchmarks,
  territorySyntheticSharePct,
  maxAlerts = 8,
}) {
  const dealers = Array.isArray(dealerNetworkPerformance) ? dealerNetworkPerformance : [];
  const drill = Array.isArray(adminDealerDrilldownRows) ? adminDealerDrilldownRows : [];
  const profiles = klondikeDealerApprovedDemandProfiles || {};
  const alerts = [];

  dealers.forEach((dealer) => {
    const oid = String(dealer.organization_id || "");
    if (!oid) return;
    const drillRow =
      drill.find((d) => String(d.organization_id) === oid) || null;
    const intel = buildDealerEnablementIntelligence({
      dealerRow: dealer,
      ocrActivityCount: Number(drillRow?.ocrActivityCount || 0),
      approvedProfile: profiles[oid] || null,
      quotedBenchmarks,
      territorySyntheticSharePct,
    });
    if (!intel.signals.length) return;

    const sortedSignals = intel.signals
      .slice()
      .sort((a, b) => {
        const dr =
          severityRank(a.severity) - severityRank(b.severity);
        if (dr !== 0) return dr;
        const ia = DASHBOARD_SIGNAL_PRIORITY.indexOf(a.kind);
        const ib = DASHBOARD_SIGNAL_PRIORITY.indexOf(b.kind);
        const va = ia === -1 ? 999 : ia;
        const vb = ib === -1 ? 999 : ib;
        return va - vb;
      });

    const chosen =
      sortedSignals.find((s) => DASHBOARD_SIGNAL_PRIORITY.includes(s.kind)) || sortedSignals[0];

    const picked = pickSpotlightForSignal(chosen.kind, intel.recommendations);
    if (!picked?.spotlightId) return;

    const spotlightTitle =
      picked.recommendedTitle ||
      resolveSpotlightTitle(picked.spotlightId, picked.spotlightType);

    alerts.push({
      alertKey: `${oid}-${chosen.kind}`,
      dealerOrgId: oid,
      dealerName: String(dealer.name || "Dealer").trim(),
      signalKind: chosen.kind,
      issueTitle:
        ISSUE_TITLE[chosen.kind] ||
        String(chosen.kind || "").replace(/_/g, " "),
      issueDetail: chosen.detail,
      whyItMatters:
        WHY_MATTERS[chosen.kind] ||
        "Review spotlight material with this dealer to tighten execution against live signals.",
      spotlightId: picked.spotlightId,
      spotlightType: picked.spotlightType,
      spotlightTitle,
      severityRank: severityRank(chosen.severity),
      signalPriorityIdx: DASHBOARD_SIGNAL_PRIORITY.indexOf(chosen.kind),
    });
  });

  alerts.sort((a, b) => {
    if (a.severityRank !== b.severityRank) return a.severityRank - b.severityRank;
    const ia = a.signalPriorityIdx === -1 ? 999 : a.signalPriorityIdx;
    const ib = b.signalPriorityIdx === -1 ? 999 : b.signalPriorityIdx;
    if (ia !== ib) return ia - ib;
    return String(a.dealerName).localeCompare(String(b.dealerName));
  });

  return alerts.slice(0, maxAlerts);
}

/**
 * Single primary spotlight recommendation for the Sales Enablement dealer intelligence panel.
 * Aligns with dashboard alert spotlight resolution for the selected dealer’s signals.
 */
export function resolvePrimarySpotlightForDealerIntel(intel) {
  if (!intel || !Array.isArray(intel.signals) || intel.signals.length === 0) {
    return null;
  }
  const sortedSignals = intel.signals.slice().sort((a, b) => {
    const dr = severityRank(a.severity) - severityRank(b.severity);
    if (dr !== 0) return dr;
    const ia = DASHBOARD_SIGNAL_PRIORITY.indexOf(a.kind);
    const ib = DASHBOARD_SIGNAL_PRIORITY.indexOf(b.kind);
    const va = ia === -1 ? 999 : ia;
    const vb = ib === -1 ? 999 : ib;
    return va - vb;
  });
  const chosen =
    sortedSignals.find((s) => DASHBOARD_SIGNAL_PRIORITY.includes(s.kind)) || sortedSignals[0];
  const picked = pickSpotlightForSignal(chosen.kind, intel.recommendations);
  if (!picked?.spotlightId) return null;
  const spotlightTitle =
    picked.recommendedTitle || resolveSpotlightTitle(picked.spotlightId, picked.spotlightType);
  return {
    signalKind: chosen.kind,
    issueTitle:
      ISSUE_TITLE[chosen.kind] || String(chosen.kind || "").replace(/_/g, " "),
    issueDetail: chosen.detail,
    whyItMatters:
      WHY_MATTERS[chosen.kind] ||
      "Review spotlight material with this dealer to tighten execution against live signals.",
    spotlightId: picked.spotlightId,
    spotlightType: picked.spotlightType,
    spotlightTitle,
  };
}

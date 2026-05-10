/**
 * Deterministic dealer enablement signals from loaded KL Admin metrics only.
 */

import { DEALER_TRAINING_OPPORTUNITIES } from "../data/salesEnablement/dealerTrainingCatalog";

/** Quoted mix buckets as stored on dealerNetworkPerformance.productMix[].name */
const HYDRAULIC_BUCKET = "Hydraulic Fluids";
const GREASE_BUCKET = "Grease";
const HEAVY_DUTY_BUCKET = "Heavy Duty";

export const DEALER_ENABLEMENT_STATUS = {
  ACTIVE: "Active",
  OPPORTUNITY_DETECTED: "Opportunity Detected",
  NEEDS_PRODUCT_FOCUS: "Needs Product Focus",
  NEEDS_WORKFLOW_ADOPTION: "Needs Workflow Adoption",
};

function mixCount(dealerRow, bucketName) {
  const rows = Array.isArray(dealerRow?.productMix) ? dealerRow.productMix : [];
  const hit = rows.find((r) => String(r?.name || "") === bucketName);
  return Number(hit?.count || 0);
}

function mixTotal(dealerRow) {
  const rows = Array.isArray(dealerRow?.productMix) ? dealerRow.productMix : [];
  return rows.reduce((s, r) => s + Number(r?.count || 0), 0);
}

function median(nums) {
  const a = nums.filter((n) => Number.isFinite(n)).slice().sort((x, y) => x - y);
  if (!a.length) return null;
  const mid = Math.floor(a.length / 2);
  return a.length % 2 ? a[mid] : (a[mid - 1] + a[mid]) / 2;
}

export function computeTerritoryQuotedBenchmarks(dealerRows) {
  const hydraulicShares = [];
  const greaseShares = [];
  (dealerRows || []).forEach((d) => {
    const t = mixTotal(d);
    if (t < 5) return;
    hydraulicShares.push(mixCount(d, HYDRAULIC_BUCKET) / t);
    greaseShares.push(mixCount(d, GREASE_BUCKET) / t);
  });
  return {
    medianHydraulicShare: median(hydraulicShares),
    medianGreaseShare: median(greaseShares),
    sampleDealersCompared: hydraulicShares.length,
  };
}

/**
 * @param {object} params
 * @param {object|null} params.dealerRow
 * @param {number} params.ocrActivityCount
 * @param {object|null} params.approvedProfile — entry from buildDealerApprovedDemandProfiles
 * @param {object} params.quotedBenchmarks
 * @param {number|null} params.territorySyntheticSharePct — klondikeTerritoryInventoryModel.syntheticSharePct
 */
export function buildDealerEnablementIntelligence({
  dealerRow,
  ocrActivityCount,
  approvedProfile,
  quotedBenchmarks,
  territorySyntheticSharePct,
}) {
  const signals = [];
  const recommendations = [];
  const trainingMatches = [];
  const statusSet = new Set();

  if (!dealerRow) {
    return {
      signals,
      recommendations,
      trainingMatches,
      statusTags: [],
      territoryOpportunity: null,
      quotedBenchmarks,
    };
  }

  const orgName = String(dealerRow.name || "").trim() || "Selected dealer";
  const quotesCreated = Number(dealerRow.quotesCreated || 0);
  const proposalsSent = Number(dealerRow.proposalsSent || 0);
  const customerResponses = Number(dealerRow.customerResponses || 0);
  const approvedLineCount = Number(dealerRow.approvedLineCount || 0);
  const mixTot = mixTotal(dealerRow);
  const hydroShare = mixTot > 0 ? mixCount(dealerRow, HYDRAULIC_BUCKET) / mixTot : 0;
  const greaseShare = mixTot > 0 ? mixCount(dealerRow, GREASE_BUCKET) / mixTot : 0;
  const hdShare = mixTot > 0 ? mixCount(dealerRow, HEAVY_DUTY_BUCKET) / mixTot : 0;

  const medH = quotedBenchmarks?.medianHydraulicShare;
  const medG = quotedBenchmarks?.medianGreaseShare;

  const pushSignal = (kind, detail, severity) => {
    signals.push({ kind, detail, severity });
  };

  // Workflow adoption
  if (quotesCreated >= 3 && proposalsSent === 0) {
    pushSignal(
      "low_proposal_activity",
      `${quotesCreated} quote(s) logged with no outbound proposal sends recorded for ${orgName}.`,
      "high"
    );
    statusSet.add(DEALER_ENABLEMENT_STATUS.NEEDS_WORKFLOW_ADOPTION);
    recommendations.push({
      cardType: "Recommended Training",
      title: "Proposal execution rhythm",
      why: "Quotes exist without matching proposal-send signals—coach outbound workflow before enablement content lands.",
      actionHint: "Request Training",
    });
  }

  if (proposalsSent >= 4 && customerResponses === 0) {
    pushSignal(
      "proposal_engagement_gap",
      `${proposalsSent} proposal send(s) recorded but no customer response rows yet for ${orgName}.`,
      "medium"
    );
    statusSet.add(DEALER_ENABLEMENT_STATUS.NEEDS_WORKFLOW_ADOPTION);
  }

  if (quotesCreated >= 6 && Number(ocrActivityCount || 0) === 0) {
    pushSignal(
      "low_ocr_utilization",
      `${quotesCreated} quotes logged with zero OCR scan events attributed to this dealer org.`,
      "medium"
    );
    statusSet.add(DEALER_ENABLEMENT_STATUS.NEEDS_WORKFLOW_ADOPTION);
    recommendations.push({
      cardType: "Territory Opportunity",
      title: "OCR-led discovery runway",
      category: "Field diagnostics",
      why: "Quote volume exists without OCR events logged against this dealer id—increase label-scan hygiene before competitor-heavy narratives.",
      actionHint: "Request Training",
    });
  }

  // Product mix (quoted lines)
  if (
    mixTot >= 8 &&
    medH != null &&
    hydroShare + 0.001 < medH - 0.06
  ) {
    pushSignal(
      "weak_hydraulic_quote_mix",
      `Hydraulic quoted lines ${Math.round(hydroShare * 100)}% vs territory median ~${Math.round(
        medH * 100
      )}% among dealers with sufficient quote volume.`,
      "medium"
    );
    recommendations.push({
      cardType: "Recommended Spotlight",
      title: "Hydraulic Fluids Opportunity",
      spotlightId: "cs-hydraulic-opportunity",
      spotlightType: "category",
      category: "Hydraulic Fluids",
      why: "Quoted activity under-indexes hydraulic versus comparable dealers—prioritize hydraulic spotlight rehearsal.",
      actionHint: "Send Spotlight",
    });
    trainingMatches.push(DEALER_TRAINING_OPPORTUNITIES[0]);
  }

  if (mixTot >= 8 && medG != null && greaseShare + 0.001 < medG - 0.04) {
    pushSignal(
      "low_grease_penetration",
      `Grease quoted lines ${Math.round(greaseShare * 100)}% vs territory median ~${Math.round(
        medG * 100
      )}%.`,
      "medium"
    );
    recommendations.push({
      cardType: "Suggested Product Focus",
      title: "Grease expansion",
      category: "Grease",
      why: "Quote-line buckets show grease trailing peer dealers—queue grease program growth narrative.",
      actionHint: "Assign KL University Material",
    });
    trainingMatches.push(DEALER_TRAINING_OPPORTUNITIES[1]);
  }

  if (mixTot >= 12 && hdShare >= 0.42 && proposalsSent >= 2) {
    pushSignal(
      "heavy_duty_quote_concentration",
      `Heavy Duty quote lines represent ~${Math.round(hdShare * 100)}% of bucketed quote activity—cross-category balance may still be thin.`,
      "low"
    );
    recommendations.push({
      cardType: "Recommended Training",
      title: "Fleet Diesel Positioning",
      spotlightId: "cs-hd-conversion",
      spotlightType: "category",
      category: "HD Engine Oils",
      why: "Heavy Duty buckets dominate quoted lines—layer CK-4 discipline and spec ladders without overpromising interchange.",
      actionHint: "Assign KL University Material",
    });
    trainingMatches.push(DEALER_TRAINING_OPPORTUNITIES[3]);
  }

  // Approved demand / synthetic
  const totalAppr = approvedProfile?.totalApprovedUnits ?? 0;
  const synShare = approvedProfile?.syntheticSharePct ?? 0;
  const terrSyn =
    territorySyntheticSharePct != null && Number.isFinite(Number(territorySyntheticSharePct))
      ? Number(territorySyntheticSharePct)
      : null;

  if (
    proposalsSent >= 2 &&
    approvedLineCount === 0 &&
    quotesCreated >= 2
  ) {
    pushSignal(
      "weak_approved_capture",
      "Proposal sends exist but no approved demand lines are attributed to this org in the current rollup.",
      "high"
    );
    recommendations.push({
      cardType: "Territory Opportunity",
      title: "Approval discipline checkpoint",
      category: "Territory",
      why: "Bridge quoting momentum to documented approvals before scaling category coaching.",
      actionHint: "Request Training",
    });
  }

  if (
    totalAppr >= 12 &&
    terrSyn != null &&
    synShare + 0.5 < terrSyn - 10
  ) {
    pushSignal(
      "weak_synthetic_adoption",
      `Synthetic-related approvals ~${synShare}% of units vs ~${terrSyn}% territory rollup.`,
      "medium"
    );
    recommendations.push({
      cardType: "Recommended Spotlight",
      title: "Synthetic Upgrade Focus",
      spotlightId: "cs-synthetic-upgrade",
      spotlightType: "category",
      category: "Synthetic Conversion",
      why: "Approved-unit synthetic share trails network rollup—deploy synthetic coaching safely within OEM guardrails.",
      actionHint: "Send Spotlight",
    });
    trainingMatches.push(DEALER_TRAINING_OPPORTUNITIES[2]);
  }

  const hydroApproved =
    Number(approvedProfile?.categoryUnits?.["Hydraulic Fluids"] || 0);
  if (
    totalAppr >= 15 &&
    hydroApproved / totalAppr < 0.08 &&
    hydroShare < 0.12
  ) {
    pushSignal(
      "weak_hydraulic_approved_mix",
      "Hydraulic approved units remain a low share of this dealer’s captured demand.",
      "low"
    );
  }

  const trainingTitles = new Map();
  trainingMatches.forEach((t) => trainingTitles.set(t.id, t));

  if (
    signals.some((s) =>
      [
        "weak_hydraulic_quote_mix",
        "low_grease_penetration",
        "weak_synthetic_adoption",
        "weak_hydraulic_approved_mix",
        "heavy_duty_quote_concentration",
      ].includes(s.kind)
    )
  ) {
    statusSet.add(DEALER_ENABLEMENT_STATUS.NEEDS_PRODUCT_FOCUS);
  }

  if (signals.some((s) => s.kind === "weak_approved_capture")) {
    statusSet.add(DEALER_ENABLEMENT_STATUS.OPPORTUNITY_DETECTED);
  }

  if (
    quotesCreated >= 4 &&
    proposalsSent >= 2 &&
    Number(ocrActivityCount || 0) >= 1 &&
    !statusSet.has(DEALER_ENABLEMENT_STATUS.NEEDS_WORKFLOW_ADOPTION) &&
    !statusSet.has(DEALER_ENABLEMENT_STATUS.NEEDS_PRODUCT_FOCUS) &&
    !signals.some((s) => s.kind === "weak_approved_capture")
  ) {
    statusSet.add(DEALER_ENABLEMENT_STATUS.ACTIVE);
  }

  const territoryOpportunity =
    signals.length > 0
      ? {
          headline: `${signals.length} deterministic signal(s) for ${orgName}`,
          detail:
            "Prioritize workflow fixes before spotlight pushes when adoption gaps are present.",
        }
      : null;

  const priorityOrder = {
    [DEALER_ENABLEMENT_STATUS.NEEDS_WORKFLOW_ADOPTION]: 0,
    [DEALER_ENABLEMENT_STATUS.NEEDS_PRODUCT_FOCUS]: 1,
    [DEALER_ENABLEMENT_STATUS.OPPORTUNITY_DETECTED]: 2,
    [DEALER_ENABLEMENT_STATUS.ACTIVE]: 3,
  };

  const statusTags = Array.from(statusSet).sort(
    (a, b) => priorityOrder[a] - priorityOrder[b]
  );

  return {
    signals,
    recommendations: dedupeRecommendations(recommendations),
    trainingMatches: Array.from(trainingTitles.values()),
    statusTags,
    territoryOpportunity,
    quotedBenchmarks,
    dealerLabel: orgName,
  };
}

function dedupeRecommendations(rows) {
  const seen = new Set();
  const out = [];
  rows.forEach((r) => {
    const key = `${r.cardType}|${r.title}|${r.spotlightId || ""}`;
    if (seen.has(key)) return;
    seen.add(key);
    out.push(r);
  });
  return out;
}

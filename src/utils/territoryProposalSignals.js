/**
 * Territory-wide proposal decision tallies for Klondike Admin (deterministic, session data only).
 * Mirrors App.js category bucketing for product lines so spotlight suggestions stay aligned with dashboards.
 */

function getProposalProductResponseArray(row) {
  const dd = row.decision_data || {};
  return Array.isArray(dd.responses)
    ? dd.responses
    : Array.isArray(row.responses)
      ? row.responses
      : [];
}

function collectProposalDecisionLines(row) {
  const products = getProposalProductResponseArray(row);
  const dd = row.decision_data || {};
  const equipment = Array.isArray(dd.equipment)
    ? dd.equipment
    : Array.isArray(row.equipment)
      ? row.equipment
      : [];
  return [...products, ...equipment];
}

/** Same logic as App.js getDashboardDemandCategoryFromProductName — keep in sync when changing bucketing. */
export function demandCategoryFromProductName(productName) {
  const n = String(productName || "").toLowerCase();
  if (n.includes("grease")) return "Grease";
  if (n.includes("hydraulic")) return "Hydraulic Fluids";
  if (n.includes("transmission") || /\batf\b/i.test(n)) return "Transmission Fluids";
  if (n.includes("coolant")) return "Coolants / Chemicals";
  if (/\bgear\b/i.test(n) && (n.includes("lubricant") || n.includes("oil")))
    return "Gear Oils";
  if (
    n.includes("engine") ||
    n.includes("diesel") ||
    n.includes("motor oil") ||
    /\d+w-\d+/i.test(n)
  ) {
    return "HD Engine Oils";
  }
  return "Other";
}

function countTerritoryOutboundProposals(quotes) {
  return (quotes || []).filter(
    (q) => Boolean(q?.rep_signature) || Boolean(String(q?.rep_email || "").trim())
  ).length;
}

/**
 * @returns {{
 *   proposalsSent: number,
 *   responsesReceived: number,
 *   approvedLines: number,
 *   declinedLines: number,
 *   decisionsTotal: number,
 *   approvalRatioPercent: number | null,
 *   categoryDecisions: Record<string, { approved: number, declined: number }>,
 * }}
 */
export function computeTerritoryProposalSignals(quotes, responseRows) {
  const proposalsSent = countTerritoryOutboundProposals(quotes);
  const responses = responseRows || [];
  const responsesReceived = responses.length;

  let approvedLines = 0;
  let declinedLines = 0;
  /** @type {Record<string, { approved: number, declined: number }>} */
  const categoryDecisions = {};

  const bump = (cat, key) => {
    if (!categoryDecisions[cat]) {
      categoryDecisions[cat] = { approved: 0, declined: 0 };
    }
    categoryDecisions[cat][key] += 1;
  };

  responses.forEach((res) => {
    collectProposalDecisionLines(res).forEach((ln) => {
      const productLabel = String(ln.product || "").trim() || "—";
      const cat = demandCategoryFromProductName(productLabel);
      if (ln.decision === "approved") {
        approvedLines += 1;
        bump(cat, "approved");
      } else if (ln.decision === "declined") {
        declinedLines += 1;
        bump(cat, "declined");
      }
    });
  });

  const decisionsTotal = approvedLines + declinedLines;
  const approvalRatioPercent =
    decisionsTotal > 0 ? Math.round((approvedLines / decisionsTotal) * 100) : null;

  return {
    proposalsSent,
    responsesReceived,
    approvedLines,
    declinedLines,
    decisionsTotal,
    approvalRatioPercent,
    categoryDecisions,
  };
}

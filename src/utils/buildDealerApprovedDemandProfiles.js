/**
 * Per-dealer approved-demand rollup from proposal responses (matches territory inventory semantics).
 * Enablement-only; does not alter pricing or proposal calculations elsewhere.
 */

import { demandCategoryFromProductName } from "./territoryProposalSignals";

function buildQuoteItemLookupById(itemRows) {
  const map = {};
  (itemRows || []).forEach((r) => {
    if (r?.id != null) map[r.id] = r;
  });
  return map;
}

function approvedDemandLineQty(item, quoteItemById) {
  let qty = 1;
  const qid = item.quote_item_id;
  if (qid && quoteItemById?.[qid]) {
    const qi = quoteItemById[qid];
    qty =
      qi.quantity != null && Number.isFinite(Number(qi.quantity))
        ? Number(qi.quantity)
        : 1;
  }
  return qty;
}

function getProposalProductResponseArray(row) {
  const dd = row.decision_data || {};
  return Array.isArray(dd.responses)
    ? dd.responses
    : Array.isArray(row.responses)
      ? row.responses
      : [];
}

/**
 * @returns {Record<string, {
 *   organization_id: string,
 *   totalApprovedUnits: number,
 *   syntheticApprovedUnits: number,
 *   syntheticSharePct: number,
 *   categoryUnits: Record<string, number>,
 * }>}
 */
export function buildDealerApprovedDemandProfiles(responseRows, quoteItems, quotes) {
  const quoteItemById = buildQuoteItemLookupById(quoteItems);
  const quoteById = {};
  (quotes || []).forEach((q) => {
    if (q?.id) quoteById[q.id] = q;
  });

  /** @type {Record<string, { units: number, synthetic: number, cats: Record<string, number> }>} */
  const acc = {};

  const bump = (orgId, item) => {
    if (!orgId) return;
    if (!acc[orgId]) {
      acc[orgId] = { units: 0, synthetic: 0, cats: {} };
    }
    const qty = approvedDemandLineQty(item, quoteItemById);
    const cat = demandCategoryFromProductName(item.product);
    acc[orgId].units += qty;
    acc[orgId].cats[cat] = (acc[orgId].cats[cat] || 0) + qty;
    if (/synthetic/i.test(String(item.product || ""))) {
      acc[orgId].synthetic += qty;
    }
  };

  (responseRows || []).forEach((row) => {
    const quote = quoteById[row.quote_id];
    const orgId = quote?.organization_id ? String(quote.organization_id) : "";
    getProposalProductResponseArray(row).forEach((item) => {
      if (item.decision !== "approved") return;
      if (item.type === "equipment") return;
      if (String(item.package || "").toLowerCase() === "equipment") return;
      bump(orgId, item);
    });
  });

  const out = {};
  Object.entries(acc).forEach(([orgId, v]) => {
    const total = v.units;
    out[orgId] = {
      organization_id: orgId,
      totalApprovedUnits: total,
      syntheticApprovedUnits: v.synthetic,
      syntheticSharePct:
        total > 0 ? Math.round((v.synthetic / total) * 1000) / 10 : 0,
      categoryUnits: { ...v.cats },
    };
  });
  return out;
}

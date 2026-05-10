/**
 * Prioritized KL Admin dashboard actions from existing session intelligence only.
 */

function activationGapForDealer(dealer) {
  const a = dealer?.activation;
  if (!a) return null;

  const checks = [
    {
      stepId: "profile",
      test: () => Boolean(a.profilesQueryOk) && !a.profileConfigured,
      why: "Profile setup is incomplete—downstream workflows stay blocked.",
      recommended: "Finish dealer profile configuration in activation.",
    },
    {
      stepId: "logo",
      test: () => Boolean(a.profilesQueryOk) && !a.logoUploaded,
      why: "Branding assets are missing—customer-facing proposals look unfinished.",
      recommended: "Upload the dealer logo for polished outbound materials.",
    },
    {
      stepId: "admin",
      test: () => !a.hasDealerAdmin,
      why: "No dealer admin is assigned—org governance is unclear.",
      recommended: "Assign or activate a dealer administrator.",
    },
    {
      stepId: "manager",
      test: () => !a.hasManager,
      why: "No manager role on file—coaching coverage may be thin.",
      recommended: "Add a manager membership for this dealer org.",
    },
    {
      stepId: "reps",
      test: () => !a.repsAssigned,
      why: "Field reps are not wired to this org—quotes may stall.",
      recommended: "Assign reps or confirm team assignments.",
    },
    {
      stepId: "quote",
      test: () => !a.firstQuoteCreated,
      why: "No quotes yet—pipeline proof is missing.",
      recommended: "Coach the team to create the first quote.",
    },
    {
      stepId: "proposal_sent",
      test: () => !a.firstProposalSent,
      why: "Quotes exist but outbound proposals are not logged.",
      recommended: "Drive proposal sends so customers can decide.",
    },
    {
      stepId: "viewed",
      test: () =>
        Boolean(a.proposalViewsQueryOk) && !a.customerProposalViewed && Boolean(a.firstProposalSent),
      why: "Customers have not opened proposal links yet.",
      recommended: "Confirm links are reaching buyers and reps are following up.",
    },
    {
      stepId: "response",
      test: () =>
        Boolean(a.customerProposalViewed) && !a.customerResponseReceived,
      why: "Proposals were viewed but no decision rows landed.",
      recommended: "Follow up while proposals are still warm.",
    },
    {
      stepId: "demand",
      test: () => Boolean(a.customerResponseReceived) && !a.approvedDemandGenerated,
      why: "Responses exist without approved lines—demand capture is incomplete.",
      recommended: "Work approvals so inventory signals populate.",
    },
    {
      stepId: "inventory",
      test: () => Boolean(a.approvedDemandGenerated) && !a.inventoryAlertsActive,
      why: "Approved demand is not flowing into inventory-ready signals.",
      recommended: "Confirm approved lines roll into inventory alerts.",
    },
    {
      stepId: "ocr",
      test: () => Boolean(a.ocrQueryOk) && !a.ocrScanStarted,
      why: "No OCR scans—competitive label intelligence is blind.",
      recommended: "Start OCR hygiene with counter or field reps.",
    },
  ];

  for (const row of checks) {
    if (row.test()) {
      return {
        stepId: row.stepId,
        why: row.why,
        recommended: row.recommended,
      };
    }
  }
  return null;
}

/**
 * @returns {Array<{
 *   id: string,
 *   kind: 'spotlight' | 'dealer_activation' | 'inventory_intel' | 'dealers_tab' | 'dealers_select',
 *   issue: string,
 *   scope: string,
 *   why: string,
 *   recommended: string,
 *   buttonLabel: string,
 *   accent: 'blue' | 'orange' | 'green',
 *   dealerOrgId?: string,
 *   spotlightId?: string,
 *   spotlightType?: string,
 *   dealerRow?: object,
 * }>}
 */
export function buildKlondikeActionCenterActions({
  enablementAlerts,
  dealerNetworkPerformance,
  territoryProposalSignals,
  territoryInventoryModel,
  maxActions = 5,
}) {
  const actions = [];
  const usedIds = new Set();

  const push = (item) => {
    if (actions.length >= maxActions) return false;
    if (usedIds.has(item.id)) return false;
    usedIds.add(item.id);
    actions.push(item);
    return true;
  };

  const alertDealerIds = new Set();

  (Array.isArray(enablementAlerts) ? enablementAlerts : []).slice(0, 2).forEach((al) => {
    alertDealerIds.add(String(al.dealerOrgId || ""));
    push({
      id: `alert-${al.alertKey}`,
      kind: "spotlight",
      issue: al.issueTitle || "Dealer enablement gap detected.",
      scope: String(al.dealerName || "Dealer").trim(),
      why: al.whyItMatters || "Rule-based signals flagged this dealer for coaching.",
      recommended: `Send the “${al.spotlightTitle}” spotlight after you review copy.`,
      buttonLabel: "Send Spotlight",
      accent: "blue",
      dealerOrgId: String(al.dealerOrgId || ""),
      spotlightId: al.spotlightId,
      spotlightType: al.spotlightType,
    });
  });

  const dealers = Array.isArray(dealerNetworkPerformance) ? dealerNetworkPerformance : [];

  for (const d of dealers) {
    const gap = activationGapForDealer(d);
    if (!gap) continue;
    const oid = String(d.organization_id || "");
    if (!oid) continue;
    push({
      id: `activation-${oid}-${gap.stepId}`,
      kind: "dealer_activation",
      issue: "This dealer needs attention.",
      scope: String(d.name || "Dealer").trim(),
      why: gap.why,
      recommended: gap.recommended,
      buttonLabel: "Open Dealer Activation",
      accent: "orange",
      dealerOrgId: oid,
    });
    break;
  }

  const sig = territoryProposalSignals || {};
  const proposalsSent = Number(sig.proposalsSent || 0);
  const responsesReceived = Number(sig.responsesReceived || 0);
  const decisionsTotal = Number(sig.decisionsTotal || 0);
  const approvedLines = Number(sig.approvedLines || 0);
  const declinedLines = Number(sig.declinedLines || 0);

  let territoryStallAdded = false;
  if (proposalsSent >= 2 && responsesReceived === 0) {
    if (
      push({
        id: "territory-proposal-engagement-stall",
        kind: "dealers_tab",
        issue: "Proposal engagement is quiet.",
        scope: "Territory",
        why: "Outbound proposals are logged but no customer responses have arrived.",
        recommended: "Review which dealers have live proposals and coach follow-up.",
        buttonLabel: "Review Proposal Engagement",
        accent: "blue",
      })
    ) {
      territoryStallAdded = true;
    }
  }

  if (!territoryStallAdded) {
    for (const d of dealers) {
      const qs = Number(d.quotesCreated || 0);
      const ps = Number(d.proposalsSent || 0);
      const cr = Number(d.customerResponses || 0);
      const oid = String(d.organization_id || "");
      if (qs >= 2 && ps >= 1 && cr === 0 && oid && !alertDealerIds.has(oid)) {
        push({
          id: `dealer-followup-${oid}`,
          kind: "dealers_select",
          issue: "This dealer needs attention.",
          scope: String(d.name || "Dealer").trim(),
          why: "Quotes and proposals are moving but no customer responses are recorded.",
          recommended: "Confirm reps are closing the loop on open proposals.",
          buttonLabel: "Open Dealer Record",
          accent: "green",
          dealerOrgId: oid,
          dealerRow: d,
        });
        break;
      }
    }
  }

  if (decisionsTotal >= 4 && declinedLines > approvedLines) {
    push({
      id: "territory-proposal-conversion-skew",
      kind: "dealers_tab",
      issue: "Proposal conversion needs attention.",
      scope: "Territory",
      why: "Declined lines currently outweigh approvals in captured decisions.",
      recommended: "Review positioning, specs, and pricing assumptions on recent proposals.",
      buttonLabel: "Review Proposal Engagement",
      accent: "orange",
    });
  }

  const inv = territoryInventoryModel;
  if (inv?.hasData) {
    const accel =
      Array.isArray(inv.acceleratingSkus) && inv.acceleratingSkus.length > 0;
    const insightFirst =
      Array.isArray(inv.insights) && inv.insights.length > 0 ? inv.insights[0] : "";
    if (accel || insightFirst) {
      push({
        id: "territory-inventory-review",
        kind: "inventory_intel",
        issue: accel ? "SKU demand is accelerating." : "Review territory demand signals.",
        scope: "Territory inventory rollup",
        why: accel
          ? "Approved units are climbing quickly on one or more SKUs—stocking may need alignment."
          : insightFirst,
        recommended:
          "Review approved-demand categories, package mix, and dealer concentration in Inventory Intelligence.",
        buttonLabel: "Review Inventory Demand",
        accent: "green",
      });
    }
  }

  return actions.slice(0, maxActions);
}

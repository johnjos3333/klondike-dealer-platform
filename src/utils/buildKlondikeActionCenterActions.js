/**
 * Prioritized KL Admin dashboard actions from existing session intelligence only.
 */

import { CATEGORY_SPOTLIGHT_BY_MIX_CATEGORY } from "../data/salesEnablement/spotlightSuggestionRules";

/**
 * Static coaching archetypes to fill Action Center when live signals are sparse (Phase 72B.5).
 * Uses existing action kinds + handlers only.
 */
export function buildKlAdminActionPlaybookMocks({ dealerOrgId = "" } = {}) {
  const oid = String(dealerOrgId || "");

  return [
    {
      id: "playbook-dealer-activation-risk",
      kind: oid ? "dealer_activation" : "dealers_tab",
      issue: "Dealer activation risk is elevated.",
      scope: "Territory",
      why: "Orgs stuck before the first quote burn runway and skew funnel math.",
      recommended: "Target the slowest onboarding lanes before rolling wider campaigns.",
      buttonLabel: "Review Dealer",
      accent: "orange",
      dealerOrgId: oid || undefined,
      severityRank: 1,
    },
    {
      id: "playbook-weak-grease-adoption",
      kind: "spotlight",
      issue: "Weak grease adoption versus territory potential.",
      scope: "Category · Grease",
      why: "PM intervals and attach SKUs slip when grease stays optional in conversations.",
      recommended: "Deploy the grease program spotlight with bundled PM talking points.",
      buttonLabel: "Send Spotlight",
      accent: "orange",
      dealerOrgId: oid,
      spotlightId: CATEGORY_SPOTLIGHT_BY_MIX_CATEGORY.Grease,
      spotlightType: "category",
      severityRank: 2,
    },
    {
      id: "playbook-low-ocr-usage",
      kind: "workflow_notice",
      issue: "Low OCR usage limits competitive visibility.",
      scope: "Territory",
      why: "Without label scans, reps guess on swap-outs while competitors hide blind spots.",
      recommended: "Ask managers to mandate scans on competitive bids this week.",
      buttonLabel: "Notify Manager",
      accent: "blue",
      noticeText:
        "Follow-up prepared (mock): manager OCR reminder staged as banner only — no email sent; scheduling later.",
      severityRank: 2,
    },
    {
      id: "playbook-synthetic-conversion",
      kind: "spotlight",
      issue: "Synthetic conversion opportunity on approved demand.",
      scope: "Category · Synthetic",
      why: "Premium mix lifts margin when fleets accept OEM-aligned upgrades.",
      recommended: "Push synthetic upgrade positioning before price concessions.",
      buttonLabel: "Send Spotlight",
      accent: "orange",
      dealerOrgId: oid,
      spotlightId: "cs-synthetic-upgrade",
      spotlightType: "category",
      severityRank: 2,
    },
    {
      id: "playbook-training-followup",
      kind: "sales_enablement",
      issue: "Training follow-up needed after recent spotlights.",
      scope: "Territory enablement",
      why: "Reps retain narratives when reinforcement lands within a tight window of sends.",
      recommended: "Queue a walkthrough tied to last week's spotlight themes.",
      buttonLabel: "Request Training",
      accent: "blue",
      severityRank: 3,
    },
  ];
}

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

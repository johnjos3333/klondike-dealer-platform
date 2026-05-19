/**
 * Prioritized KL Admin dashboard actions from deterministic territory signals (Phase 7A.5).
 */

import { CATEGORY_SPOTLIGHT_BY_MIX_CATEGORY } from "../data/salesEnablement/spotlightSuggestionRules";
import {
  buildKlAdminIntelligenceCandidates,
  deduplicateActionCenterQueue,
  pickDealersForCoachingIntelligence,
} from "./klAdminActionCenterIntelligence";

/**
 * Static coaching archetypes when live signals are sparse.
 */
export function buildKlAdminActionPlaybookMocks({ dealerOrgId = "" } = {}) {
  const oid = String(dealerOrgId || "");

  return [
    {
      id: "playbook-dealer-activation-risk",
      kind: oid ? "dealer_activation" : "dealers_tab",
      issue: "A dealer still needs help getting set up.",
      scope: "Territory",
      whatChanged: "Setup steps are incomplete before the first quote goes out.",
      why: "Counters stay quiet when profile, team, and first quote habits are not in place.",
      recommended: "Open the dealer snapshot and finish the next setup step with the manager.",
      buttonLabel: "Open Dealer Snapshot",
      accent: "orange",
      dealerOrgId: oid || undefined,
      severityRank: 1,
    },
    {
      id: "playbook-weak-grease-adoption",
      kind: "spotlight",
      issue: "Grease may be under-quoted on PM work in this territory.",
      scope: "Category · Grease",
      whatChanged: "Grease is not showing up as often as other fluid lines in recent quote activity.",
      why: "PM grease should ride with every chassis conversation when reps coach from equipment tags—not only engine oil quotes.",
      recommended: "Review the grease spotlight with a rep before the next fleet visit.",
      buttonLabel: "Open Sales Enablement",
      accent: "orange",
      dealerOrgId: oid,
      spotlightId: CATEGORY_SPOTLIGHT_BY_MIX_CATEGORY.Grease,
      spotlightType: "category",
      severityRank: 2,
    },
    {
      id: "playbook-low-ocr-usage",
      kind: "workflow_notice",
      issue: "Reps are not scanning competitor labels much.",
      scope: "Territory",
      whatChanged: "Few label scans are on file for competitive comparisons.",
      why: "Without scans, counter staff guess on swap-outs instead of using a real spec story.",
      recommended: "Ask managers for one scan per competitive bid this week (mock notice only).",
      buttonLabel: "Notify Manager",
      accent: "blue",
      noticeText:
        "Coaching reminder ready (mock): manager banner only — no email sent yet.",
      severityRank: 2,
    },
    {
      id: "playbook-synthetic-conversion",
      kind: "spotlight",
      issue: "Room to coach premium synthetic lines.",
      scope: "Category · Synthetic",
      whatChanged: "Synthetic products are still a modest part of quoted products.",
      why: "Reps sell upgrades when they have simple tag-and-PDS language—not a price sheet first.",
      recommended: "Walk the synthetic spotlight with the manager before the next fleet pitch.",
      buttonLabel: "Open Sales Enablement",
      accent: "orange",
      dealerOrgId: oid,
      spotlightId: "cs-synthetic-upgrade",
      spotlightType: "category",
      severityRank: 2,
    },
    {
      id: "playbook-training-followup",
      kind: "sales_enablement",
      issue: "Follow up training after recent spotlight sends.",
      scope: "Territory",
      whatChanged: "Spotlight materials went out recently—reps may need a live walkthrough.",
      why: "Stories stick when a manager rehearses them within a few days of the send.",
      recommended: "Book a short training huddle tied to last week's spotlight themes.",
      buttonLabel: "Prepare Training",
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
      whatChanged: "Dealer profile is not finished yet.",
      why: "Quotes and proposals look unfinished to customers until the profile is complete.",
      recommended: "Finish the dealer profile with the manager on your next call.",
    },
    {
      stepId: "logo",
      test: () => Boolean(a.profilesQueryOk) && !a.logoUploaded,
      whatChanged: "Dealer logo is missing on customer-facing materials.",
      why: "Proposals look generic without the dealer brand on the header.",
      recommended: "Upload the dealer logo together—takes five minutes on a screen share.",
    },
    {
      stepId: "admin",
      test: () => !a.hasDealerAdmin,
      whatChanged: "No dealer admin is assigned for this org.",
      why: "Someone needs to own user access and day-to-day settings.",
      recommended: "Assign a dealer admin before reps start quoting.",
    },
    {
      stepId: "manager",
      test: () => !a.hasManager,
      whatChanged: "No manager contact is on file for this dealer.",
      why: "Coaching and approvals stall without a named manager.",
      recommended: "Add a manager membership for this org.",
    },
    {
      stepId: "reps",
      test: () => !a.repsAssigned,
      whatChanged: "Field reps are not linked to this dealer yet.",
      why: "Quotes may sit in limbo if the wrong team owns the account.",
      recommended: "Confirm rep assignments with the dealer principal.",
    },
    {
      stepId: "quote",
      test: () => !a.firstQuoteCreated,
      whatChanged: "No quotes have been created for this dealer yet.",
      why: "The first quote proves the counter story works in the system.",
      recommended: "Coach the team to build one live quote on your visit.",
    },
    {
      stepId: "proposal_sent",
      test: () => !a.firstProposalSent,
      whatChanged: "Quotes exist but no proposal has gone to a customer yet.",
      why: "The buyer cannot move forward until a proposal leaves the shop.",
      recommended: "Send one proposal while you are on site and walk through it with the manager.",
    },
    {
      stepId: "viewed",
      test: () =>
        Boolean(a.proposalViewsQueryOk) && !a.customerProposalViewed && Boolean(a.firstProposalSent),
      whatChanged: "Customers have not opened the proposal link yet.",
      why: "The email or text may not be reaching the buyer—worth checking live.",
      recommended: "Confirm the customer got the link and the rep has a follow-up time.",
    },
    {
      stepId: "response",
      test: () =>
        Boolean(a.customerProposalViewed) && !a.customerResponseReceived,
      whatChanged: "The customer viewed the proposal but has not decided yet.",
      why: "Decisions go cold fast—this is a coach-the-close moment.",
      recommended: "Call the buyer while the proposal is still open on their screen.",
    },
    {
      stepId: "demand",
      test: () => Boolean(a.customerResponseReceived) && !a.approvedDemandGenerated,
      whatChanged: "Proposal responses are in but follow-up on quoted products is not clear yet.",
      why: "When quote activity is not tied to a clear next step, outside-sales coaching should reset the plan with the manager.",
      recommended:
        "Review quoted products with the manager and agree on the next customer follow-up.",
    },
    {
      stepId: "inventory",
      test: () => Boolean(a.approvedDemandGenerated) && !a.inventoryAlertsActive,
      whatChanged: "Quoted products from proposals are not linked to warehouse support review yet.",
      why: "Projected demand from proposals may justify KLONDIKE warehouse inventory support—not dealer on-hand counts.",
      recommended: "Open Inventory Intelligence and review warehouse support for products tied to active proposals.",
    },
    {
      stepId: "ocr",
      test: () => Boolean(a.ocrQueryOk) && !a.ocrScanStarted,
      whatChanged: "No competitive label scans started for this dealer.",
      why: "Scans give counter staff a concrete story on swaps and specs.",
      recommended: "Scan one competitor label together on the next visit.",
    },
  ];

  for (const row of checks) {
    if (row.test()) {
      return {
        stepId: row.stepId,
        whatChanged: row.whatChanged,
        why: row.why,
        recommended: row.recommended,
      };
    }
  }
  return null;
}

/**
 * @returns {Array<object>}
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

  const alertDealerIds = new Set(
    (Array.isArray(enablementAlerts) ? enablementAlerts : []).map((al) =>
      String(al.dealerOrgId || "")
    )
  );

  const dealers = Array.isArray(dealerNetworkPerformance) ? dealerNetworkPerformance : [];

  deduplicateActionCenterQueue(
    buildKlAdminIntelligenceCandidates({
      dealers,
      enablementAlerts,
      territoryProposalSignals,
    })
  ).forEach((row) => push(row));

  if (actions.length < maxActions) {
    pickDealersForCoachingIntelligence(dealers, 3).forEach((dealer) => {
      if (actions.length >= maxActions) return;
      const oid = String(dealer.organization_id || "");
      if (actions.some((a) => String(a.dealerOrgId) === oid)) return;
      const gap = activationGapForDealer(dealer);
      if (!gap || !oid) return;
      push({
        id: `activation-${oid}-${gap.stepId}`,
        kind: "dealer_activation",
        issue: "This dealer still has setup steps to finish.",
        scope: String(dealer.name || "Dealer").trim(),
        whatChanged: gap.whatChanged,
        why: gap.why,
        recommended: gap.recommended,
        buttonLabel: "Open Dealer Snapshot",
        accent: "orange",
        dealerOrgId: oid,
        severityRank: 0,
        confidence: 88,
        signalKey: `setup:${gap.stepId}`,
        dedupeKey: `${oid}:setup:${gap.stepId}`,
      });
    });
  }

  if (!actions.some((a) => a.kind === "dealer_activation")) {
    for (const d of dealers) {
      const gap = activationGapForDealer(d);
      if (!gap) continue;
      const oid = String(d.organization_id || "");
      if (!oid) continue;
      push({
        id: `activation-${oid}-${gap.stepId}`,
        kind: "dealer_activation",
        issue: "This dealer still has setup steps to finish.",
        scope: String(d.name || "Dealer").trim(),
        whatChanged: gap.whatChanged,
        why: gap.why,
        recommended: gap.recommended,
        buttonLabel: "Open Dealer Snapshot",
        accent: "orange",
        dealerOrgId: oid,
        severityRank: 0,
        confidence: 88,
        signalKey: `setup:${gap.stepId}`,
        dedupeKey: `${oid}:setup:${gap.stepId}`,
      });
      break;
    }
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
        issue: "Customers are not responding to proposals yet.",
        scope: "Territory",
        whatChanged: `${proposalsSent} proposals are out with no customer replies yet.`,
        why: "Managers may need a follow-up plan—not more product sheets.",
        recommended: "See which dealers have open proposals and who owns the next call.",
        buttonLabel: "Open Dealer Snapshot",
        accent: "blue",
        severityRank: 1,
        confidence: 75,
        intelligenceTheme: "business_review",
        dedupeKey: "territory:proposal_stall",
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
          issue: "Quotes are moving—customers have not replied yet.",
          scope: String(d.name || "Dealer").trim(),
          whatChanged: `${qs} quotes and ${ps} proposals with no customer decision yet.`,
          why: "The rep may need help closing the loop while the quote is still warm.",
          recommended: "Open this dealer and agree on the next customer call or visit.",
          buttonLabel: "Open Dealer Snapshot",
          accent: "green",
          dealerOrgId: oid,
          dealerRow: d,
          severityRank: 0,
          confidence: 90,
          intelligenceTheme: "quote_followup",
          dedupeKey: `${oid}:quote_followup`,
        });
        break;
      }
    }
  }

  if (decisionsTotal >= 4 && declinedLines > approvedLines) {
    push({
      id: "territory-proposal-conversion-skew",
      kind: "dealers_tab",
      issue: "Too many lines are getting declined on recent proposals.",
      scope: "Territory",
      whatChanged: "Declined lines are outpacing approvals in recent customer decisions.",
      why: "Specs, positioning, or price assumptions may be off—worth a manager review.",
      recommended: "Review recent proposals with two reps: tags, PDS, and what the customer actually needed.",
      buttonLabel: "Open Dealer Snapshot",
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
        id: "territory-warehouse-support",
        kind: "warehouse_inventory_support",
        recommendationType: "warehouse_inventory_support_review",
        issue: "Review KLONDIKE warehouse inventory support for projected demand.",
        scope: "Territory",
        whatChanged: accel
          ? "Recent proposal activity suggests growing interest in one or more product lines."
          : String(insightFirst).trim() ||
            "Proposal activity may point to products that need warehouse support review.",
        why: "This reflects projected demand from quotes and proposals—not dealer counter sales, ERP data, or on-hand stocking.",
        recommended:
          "Open Inventory Intelligence and review KLONDIKE warehouse support for products tied to active proposals.",
        buttonLabel: "Review Warehouse Support",
        navigationIntent: "open_inventory_intelligence",
        dedupeKey: "territory:warehouse_support",
        severityRank: 2,
        confidence: 78,
        accent: "green",
      });
    }
  }

  return actions.slice(0, maxActions);
}

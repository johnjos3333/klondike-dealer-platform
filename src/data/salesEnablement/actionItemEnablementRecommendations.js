/**
 * Phase 78.0 — Deterministic bridge from KL Admin action items / dealer intel rows
 * to Guided Spotlight Wizard (Step 3) pre-fill hints. No network, no send payloads.
 */

import { PRODUCT_SPOTLIGHTS } from "./productSpotlights.js";
import { CATEGORY_SPOTLIGHTS } from "./categorySpotlights.js";

/** @param {unknown} v */
function norm(v) {
  return String(v ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** @param {string} id @param {"product"|"category"} type */
function titleForSpotlight(id, type) {
  if (!id) return "";
  if (type === "product") {
    const row = PRODUCT_SPOTLIGHTS.find((r) => r.id === id);
    return String(row?.title || id).trim();
  }
  const row = CATEGORY_SPOTLIGHTS.find((r) => r.id === id);
  return String(row?.title || id).trim();
}

/**
 * @typedef {{
 *   ok: boolean,
 *   reason: string,
 *   messageKind: "product"|"category"|"customer_profile"|null,
 *   query: string,
 *   recommendedTitle: string,
 *   customerProfileId: string|null,
 *   suggestedActionLabel: string,
 *   targetSpotlightId: string|null,
 *   targetSpotlightType: "product"|"category"|null,
 * }} EnablementActionRecommendation
 */

/** @returns {EnablementActionRecommendation} */
function noop(reason) {
  return {
    ok: false,
    reason,
    messageKind: null,
    query: "",
    recommendedTitle: "",
    customerProfileId: null,
    suggestedActionLabel: "Open Guided Spotlight Wizard",
    targetSpotlightId: null,
    targetSpotlightType: null,
  };
}

/** @returns {EnablementActionRecommendation} */
function okRow({
  reason,
  messageKind,
  query,
  recommendedTitle,
  customerProfileId = null,
  targetSpotlightId = null,
  targetSpotlightType = null,
}) {
  return {
    ok: true,
    reason,
    messageKind,
    query: String(query || "").trim(),
    recommendedTitle: String(recommendedTitle || "").trim(),
    customerProfileId: customerProfileId ? String(customerProfileId).trim() : null,
    suggestedActionLabel: "Open Guided Spotlight Wizard",
    targetSpotlightId: targetSpotlightId ? String(targetSpotlightId).trim() : null,
    targetSpotlightType: targetSpotlightType || null,
  };
}

/** Dashboard / builder signal kinds → wizard seed */
const SIGNAL_RULES = {
  low_grease_penetration: () =>
    okRow({
      reason: "Territory signal: grease penetration below peers — land Nano EP 2 / severe-duty grease narrative.",
      messageKind: "product",
      query:
        "Nano EP 2 severe duty grease spotlight — NLGI EP-2, washout resistance, mining and construction pins",
      recommendedTitle: titleForSpotlight("ps-grease-ep2", "product"),
      targetSpotlightId: "ps-grease-ep2",
      targetSpotlightType: "product",
    }),
  weak_hydraulic_quote_mix: () =>
    okRow({
      reason: "Territory signal: hydraulic share weak in quotes — open hydraulic reliability / ISO / XVI program.",
      messageKind: "category",
      query:
        "Hydraulic reliability program spotlight — AW vs XVI, ISO VG discipline, filtration and circuit-led positioning",
      recommendedTitle: titleForSpotlight("cs-hydraulic-opportunity", "category"),
      targetSpotlightId: "cs-hydraulic-opportunity",
      targetSpotlightType: "category",
    }),
  weak_hydraulic_approved_mix: () =>
    okRow({
      reason:
        "Territory signal: hydraulic approved units thin — emphasize XVI / synthetic hydraulic hero with PDS-backed proof.",
      messageKind: "product",
      query:
        "XVI synthetic hydraulic fluid spotlight — extreme VI, cold pour, field proof vs seasonal AW habits",
      recommendedTitle: titleForSpotlight("ps-klondike-aw-synthetic-hydraulic", "product"),
      targetSpotlightId: "ps-klondike-aw-synthetic-hydraulic",
      targetSpotlightType: "product",
    }),
  heavy_duty_quote_concentration: () =>
    okRow({
      reason: "Territory signal: diesel-heavy quote mix — reinforce HD engine oil Good-Better-Best / CK-4 ladder.",
      messageKind: "category",
      query:
        "HD engine oil conversion spotlight — Good Better Best CK-4 positioning for mixed diesel fleets",
      recommendedTitle: titleForSpotlight("cs-hd-conversion", "category"),
      targetSpotlightId: "cs-hd-conversion",
      targetSpotlightType: "category",
    }),
  weak_synthetic_adoption: () =>
    okRow({
      reason: "Territory signal: synthetic share trails rollup — coach synthetic upgrade path under OEM guardrails.",
      messageKind: "category",
      query: "Synthetic upgrade spotlight — premium tier framing aligned to OEM drain and CK-4 discipline",
      recommendedTitle: titleForSpotlight("cs-synthetic-upgrade", "category"),
      targetSpotlightId: "cs-synthetic-upgrade",
      targetSpotlightType: "category",
    }),
};

/**
 * Wet-brake / UTF / tractor fluid coaching (heuristic on text + spotlight ids).
 * @param {string} hay
 * @param {string} sid
 */
function utfAgrimaxSpotlightRow() {
  return okRow({
    reason: "UTF / AgriMax spotlight — wet brake and common-sump tractor discipline.",
    messageKind: "product",
    query: "AgriMax UTF wet brake spotlight — CNH MAT vs JD J20C decision tree",
    recommendedTitle: titleForSpotlight("ps-agrimax-zf", "product"),
    targetSpotlightId: "ps-agrimax-zf",
    targetSpotlightType: "product",
  });
}

function wetBrakeTractorRule(hay, sid) {
  const id = String(sid || "").trim();
  const hit =
    hay.includes("wet brake") ||
    hay.includes("utf") ||
    hay.includes("utto") ||
    hay.includes("tractor") ||
    id === "ps-agrimax-zf" ||
    (hay.includes("trans drive") && hay.includes("hydraulic"));
  if (!hit) return null;
  return okRow({
    reason: "Wet brake / tractor sump context — steer synthetic UTF and category discipline from indexed PDS rows.",
    messageKind: "product",
    query:
      "Universal tractor fluid wet brake spotlight — J20C synthetic UTF, Brookfield cold columns, common-sump discipline",
    recommendedTitle: titleForSpotlight("ps-agrimax-zf", "product"),
    targetSpotlightId: "ps-agrimax-zf",
    targetSpotlightType: "product",
  });
}

/** @param {string} hay */
function coolantChemicalRule(hay, sid) {
  const id = String(sid || "").trim();
  if (id === "cs-coolant-chemical-addon") {
    return okRow({
      reason: "Coolant / chemical add-on mix opportunity — bundle antifreeze with service intervals.",
      messageKind: "category",
      query: "Coolant chemical add-on spotlight — antifreeze concentration, fleet topping, winter readiness",
      recommendedTitle: titleForSpotlight("cs-coolant-chemical-addon", "category"),
      targetSpotlightId: "cs-coolant-chemical-addon",
      targetSpotlightType: "category",
    });
  }
  if (
    hay.includes("coolant") ||
    hay.includes("antifreeze") ||
    hay.includes("def ") ||
    hay.includes("diesel exhaust fluid") ||
    (hay.includes("chemical") && hay.includes("addon"))
  ) {
    return okRow({
      reason: "Coolant / chemical attach heuristic matched — open coolant add-on category narrative.",
      messageKind: "category",
      query: "Coolant chemical add-on opportunity — green universal antifreeze and service bay checklist",
      recommendedTitle: titleForSpotlight("cs-coolant-chemical-addon", "category"),
      targetSpotlightId: "cs-coolant-chemical-addon",
      targetSpotlightType: "category",
    });
  }
  return null;
}

/**
 * Deterministic bridge: dashboard action item, playbook row, or dealer intel recommendation card.
 *
 * @param {Record<string, unknown>|null|undefined} actionItem
 * @returns {EnablementActionRecommendation}
 */
export function getEnablementRecommendationForActionItem(actionItem) {
  const raw = actionItem && typeof actionItem === "object" ? actionItem : {};
  const signalKind = String(
    raw.enablementSignalKind ?? raw.signalKind ?? ""
  ).trim();
  const id = String(raw.id || "").trim();
  const kind = String(raw.kind || "").trim();
  const spotlightId = String(raw.spotlightId || "").trim();
  const spotlightType = String(raw.spotlightType || "").trim();
  const hay = norm(
    `${raw.issue || ""} ${raw.scope || ""} ${raw.why || ""} ${raw.recommended || ""} ${raw.title || ""} ${raw.category || ""}`
  );

  if (signalKind && SIGNAL_RULES[signalKind]) {
    return SIGNAL_RULES[signalKind]();
  }

  if (id === "playbook-weak-grease-adoption") {
    return SIGNAL_RULES.low_grease_penetration();
  }
  if (id === "playbook-synthetic-conversion") {
    return SIGNAL_RULES.weak_synthetic_adoption();
  }

  const wet = wetBrakeTractorRule(hay, spotlightId);
  if (wet) return wet;

  const cool = coolantChemicalRule(hay, spotlightId);
  if (cool) return cool;

  if (kind === "spotlight" && spotlightId) {
    if (spotlightId === "cs-grease-program-growth") {
      return SIGNAL_RULES.low_grease_penetration();
    }
    if (spotlightId === "ps-klondike-aw-hydraulic" && signalKind === "weak_hydraulic_approved_mix") {
      return SIGNAL_RULES.weak_hydraulic_approved_mix();
    }
    if (spotlightId === "ps-klondike-aw-hydraulic") {
      return okRow({
        reason: "Hydraulic AW program spotlight — ISO VG ladders and filtration discipline from indexed AW rows.",
        messageKind: "product",
        query:
          "AW hydraulic fluid spotlight — commercial AW reliability, ISO VG selection, and circuit-led upsell",
        recommendedTitle: titleForSpotlight("ps-klondike-aw-hydraulic", "product"),
        targetSpotlightId: "ps-klondike-aw-hydraulic",
        targetSpotlightType: "product",
      });
    }
    if (spotlightId === "cs-hydraulic-opportunity" || (spotlightType === "category" && hay.includes("hydraulic"))) {
      return SIGNAL_RULES.weak_hydraulic_quote_mix();
    }
    if (spotlightId === "cs-hd-conversion") {
      return SIGNAL_RULES.heavy_duty_quote_concentration();
    }
    if (spotlightId === "cs-synthetic-upgrade") {
      return SIGNAL_RULES.weak_synthetic_adoption();
    }
    if (spotlightId === "ps-grease-ep2") {
      return okRow({
        reason: "Action already targets Nano EP 2 grease spotlight — seed builder query for proof-led rehearsal.",
        messageKind: "product",
        query: "Nano EP 2 grease spotlight — severe duty EP-2 proof points and PDS anchors",
        recommendedTitle: titleForSpotlight("ps-grease-ep2", "product"),
        targetSpotlightId: "ps-grease-ep2",
        targetSpotlightType: "product",
      });
    }
    if (spotlightId === "ps-agrimax-zf") {
      return utfAgrimaxSpotlightRow();
    }
    const st = spotlightType === "product" ? "product" : "category";
    const qt =
      st === "product"
        ? `${titleForSpotlight(spotlightId, "product")} product spotlight rehearsal`
        : `${titleForSpotlight(spotlightId, "category")} category spotlight rehearsal`;
    return okRow({
      reason: "Spotlight-tagged action item — align Guided builder query with staged library id.",
      messageKind: st,
      query: qt,
      recommendedTitle: titleForSpotlight(spotlightId, st),
      targetSpotlightId: spotlightId,
      targetSpotlightType: st,
    });
  }

  if (raw.cardType != null && String(raw.title || "").trim()) {
    if (!spotlightId && (hay.includes("grease") || String(raw.category || "").toLowerCase().includes("grease"))) {
      return SIGNAL_RULES.low_grease_penetration();
    }
    if (spotlightId === "cs-hydraulic-opportunity") {
      return SIGNAL_RULES.weak_hydraulic_quote_mix();
    }
    if (spotlightId === "cs-synthetic-upgrade") {
      return SIGNAL_RULES.weak_synthetic_adoption();
    }
    if (spotlightId === "cs-hd-conversion") {
      return SIGNAL_RULES.heavy_duty_quote_concentration();
    }
    if (spotlightId && spotlightType) {
      const st = spotlightType === "product" ? "product" : "category";
      return okRow({
        reason: "Dealer intel recommendation row includes a library spotlight — seed wizard for coaching copy.",
        messageKind: st,
        query: `${titleForSpotlight(spotlightId, st)} spotlight — dealer gap follow-up`,
        recommendedTitle: titleForSpotlight(spotlightId, st),
        targetSpotlightId: spotlightId,
        targetSpotlightType: st,
      });
    }
  }

  return noop("No deterministic enablement bridge matched this action item.");
}

/**
 * Phase 78.2 — Static preview-only image hints for Guided Step 4 (Sales Enablement).
 * Public URL strings only; no React image imports; not wired to send payloads.
 */

import { CATEGORY_SPOTLIGHTS } from "./categorySpotlights.js";
import { PRODUCT_SPOTLIGHTS } from "./productSpotlights.js";

/** @typedef {"spotlight_id" | "category_id" | "product_name" | "pds_product_name" | "pds_file_hint" | "placeholder"} SalesEnablementImageHintSource */

/** @typedef {{ imageUrl: string | null, alt: string, source: SalesEnablementImageHintSource, isPlaceholder: boolean }} SalesEnablementProductImageHint */

const ASSET_PRODUCTS = "/products.png";
const ASSET_BRAND = "/klondike-full-logo.png";

const DEFAULT_ALT = "Klondike product preview";

/** Every library product spotlight id → hero asset. */
const SPOTLIGHT_ID_IMAGE_URL = Object.fromEntries(
  PRODUCT_SPOTLIGHTS.map((r) => {
    const id = String(r?.id || "").trim();
    return [id, ASSET_PRODUCTS];
  }).filter(([id]) => id)
);

/** Category spotlight ids → preview asset (fluids use lineup art; governance uses logo). */
const CATEGORY_ID_IMAGE_URL = (() => {
  /** @type {Record<string, string>} */
  const map = Object.fromEntries(
    CATEGORY_SPOTLIGHTS.map((r) => {
      const id = String(r?.id || "").trim();
      return [id, ASSET_PRODUCTS];
    }).filter(([id]) => id)
  );
  map["cs-fleet-governance"] = ASSET_BRAND;
  return map;
})();

/**
 * @param {unknown} s
 * @returns {string}
 */
function normText(s) {
  return String(s ?? "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[·•]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * @param {unknown} pdsFileHint
 * @returns {string}
 */
function deriveLabelFromPdsFileHint(pdsFileHint) {
  const raw = String(pdsFileHint ?? "").trim();
  if (!raw) return "";
  const last = raw.split("/").pop() || raw;
  return last
    .replace(/\.pdf$/i, "")
    .replace(/^KLONDIKE\s+/i, "")
    .replace(/\s+PDS$/i, "")
    .trim();
}

/**
 * Longer / more specific matchers first.
 * @type {{ test: (n: string) => boolean, alt: string }[]}
 */
const TEXT_MATCHERS = [
  {
    test: (n) => n.includes("universal tractor fluid") && n.includes("full synthetic"),
    alt: "Klondike Universal Tractor Fluid Full Synthetic",
  },
  {
    test: (n) => n.includes("wet brake") && n.includes("full synthetic"),
    alt: "Klondike Wet Brake Fluid Full Synthetic",
  },
  {
    test: (n) => n.includes("xvi") && (n.includes("all season") || n.includes("blend extreme")),
    alt: "Klondike XVI All Season Blend Extreme Hydraulic Fluid",
  },
  {
    test: (n) =>
      n.includes("hd full synthetic atf") ||
      (n.includes("full synthetic") && n.includes("atf") && n.includes("hd")),
    alt: "Klondike HD Full Synthetic ATF",
  },
  {
    test: (n) =>
      (n.includes("15w-40") || n.includes("15w40")) &&
      n.includes("ck-4") &&
      (n.includes("full synthetic") || n.includes("full-synthetic")),
    alt: "Klondike 15W-40 CK-4 Full Synthetic Heavy Duty Engine Oil",
  },
  {
    test: (n) => (n.includes("15w-40") || n.includes("15w40")) && n.includes("full synthetic") && n.includes("heavy duty"),
    alt: "Klondike SAE 15W-40 Full Synthetic Heavy Duty Engine Oil",
  },
  {
    test: (n) =>
      n.includes("nano ep 2") ||
      (n.includes("nano") && (n.includes("ep-2") || n.includes("ep 2"))),
    alt: "Klondike Nano EP 2 Grease",
  },
  {
    test: (n) =>
      (n.includes("moly tac") && (n.includes("ep-2") || n.includes("ep2"))) ||
      (n.includes("moly") && n.includes("tac") && n.includes("ep")),
    alt: "Klondike Moly Tac EP-2 Grease",
  },
  {
    test: (n) => n.includes("advanced formula") && n.includes("aw") && (n.includes("hydraulic") || n.includes("fluid")),
    alt: "Klondike AW Advanced Formula Hydraulic Fluids",
  },
  {
    test: (n) =>
      n.includes("aw") &&
      n.includes("hydraulic") &&
      (n.includes("professional") || n.includes("commercial") || n.includes("commercial formula")),
    alt: "Klondike AW Hydraulic Fluids",
  },
  {
    test: (n) => n.includes("agrimax"),
    alt: "Klondike AGRIMAX",
  },
];

/**
 * @param {unknown} pdsFileHint
 * @returns {boolean}
 */
function pdsHintSuggestsMappedHydraulicTractor(/** @type {unknown} */ pdsFileHint) {
  const h = normText(String(pdsFileHint ?? "").replace(/%20/g, " "));
  if (!h) return false;
  if (h.includes("xvi") && h.includes("hydraulic")) return true;
  if (h.includes("universal") && h.includes("tractor") && h.includes("full") && h.includes("synthetic")) return true;
  if (h.includes("wet") && h.includes("brake")) return true;
  return false;
}

/**
 * Preview-only image hint for Step 4 hero well.
 *
 * @param {{
 *   spotlightId?: unknown,
 *   spotlightMode?: unknown,
 *   categoryId?: unknown,
 *   productName?: unknown,
 *   pdsProductName?: unknown,
 *   pdsFileHint?: unknown,
 *   mockImageId?: unknown,
 * }} input
 * @returns {SalesEnablementProductImageHint}
 */
export function getSalesEnablementProductImageHint(input) {
  const mode = String(input?.spotlightMode ?? "product").trim() || "product";
  const spotlightId = String(input?.spotlightId ?? "").trim();
  const categoryId = String(input?.categoryId ?? "").trim() || (mode === "category" ? spotlightId : "");
  const productName = String(input?.productName ?? "").trim();
  const pdsProductName = String(input?.pdsProductName ?? "").trim();
  const pdsFileHint = String(input?.pdsFileHint ?? "").trim();
  const derivedFromHint = deriveLabelFromPdsFileHint(pdsFileHint);

  /** @type {(source: SalesEnablementImageHintSource, alt: string) => SalesEnablementProductImageHint} */
  const resolved = (source, alt) => ({
    imageUrl: ASSET_PRODUCTS,
    alt: alt.slice(0, 180) || DEFAULT_ALT,
    source,
    isPlaceholder: false,
  });

  if (mode === "category" && categoryId && CATEGORY_ID_IMAGE_URL[categoryId]) {
    const row = CATEGORY_SPOTLIGHTS.find((c) => String(c?.id) === categoryId);
    const title = String(row?.title || row?.category || categoryId).trim();
    return {
      imageUrl: CATEGORY_ID_IMAGE_URL[categoryId],
      alt: `Klondike · ${title}`.slice(0, 180),
      source: "category_id",
      isPlaceholder: false,
    };
  }

  if (mode === "product" && spotlightId && SPOTLIGHT_ID_IMAGE_URL[spotlightId]) {
    const row = PRODUCT_SPOTLIGHTS.find((p) => String(p?.id) === spotlightId);
    const title = String(row?.title || spotlightId).trim();
    return resolved("spotlight_id", `Klondike · ${title}`);
  }

  if (pdsHintSuggestsMappedHydraulicTractor(pdsFileHint)) {
    const alt = derivedFromHint || "Klondike hydraulic / tractor fluid";
    return resolved("pds_file_hint", `Klondike · ${alt}`);
  }

  /** @type {{ source: "product_name" | "pds_product_name" | "pds_file_hint"; n: string }[]} */
  const textChain = [
    { source: "product_name", n: normText(productName) },
    { source: "pds_product_name", n: normText(pdsProductName) },
    { source: "pds_file_hint", n: normText(derivedFromHint) },
  ];
  for (const { source, n } of textChain) {
    if (!n) continue;
    for (const rule of TEXT_MATCHERS) {
      if (rule.test(n)) return resolved(source, rule.alt);
    }
  }

  const titleForPlaceholder =
    productName ||
    pdsProductName ||
    derivedFromHint ||
    (mode === "category" ? categoryId || "Category spotlight" : spotlightId || "Product spotlight");

  return {
    imageUrl: null,
    alt: `${String(titleForPlaceholder).slice(0, 120)} — preview`,
    source: "placeholder",
    isPlaceholder: true,
  };
}

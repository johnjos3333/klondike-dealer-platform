/**
 * Enablement Visual Library — trademark-safe local SVG paths only.
 * Selection is heuristic from product/package text; no network assets.
 */

export const ENABLEMENT_VISUAL_REGISTRY_VERSION = "1.0.0";

/** Default hero visual when no rule matches. */
export const ENABLEMENT_VISUAL_FALLBACK_KEY = "shop_maintenance";

export const ENABLEMENT_VISUAL_REGISTRY = {
  hd_engine_oil: "/enablement-visuals/hd-engine-oil/hd-truck-maintenance.svg",
  hydraulic: "/enablement-visuals/hydraulic/excavator-hydraulics.svg",
  gear_oil: "/enablement-visuals/gear-oil/drivetrain-axle.svg",
  grease: "/enablement-visuals/grease/grease-bearing-service.svg",
  agrimax_green: "/enablement-visuals/agrimax-green/green-tractor-generic.svg",
  agrimax_red: "/enablement-visuals/agrimax-red/red-tractor-generic.svg",
  food_grade: "/enablement-visuals/food-grade/food-processing-line.svg",
  environmental_eal: "/enablement-visuals/environmental-eal/marine-dredging-generic.svg",
  forestry: "/enablement-visuals/forestry/logging-equipment-generic.svg",
  mining: "/enablement-visuals/mining/mining-equipment-generic.svg",
  construction: "/enablement-visuals/construction/construction-loader-generic.svg",
  marine: "/enablement-visuals/marine/marine-equipment-generic.svg",
  shop_maintenance: "/enablement-visuals/shop-maintenance/mechanic-shop-generic.svg",
  industrial: "/enablement-visuals/industrial/industrial-plant-generic.svg",
};

export const ENABLEMENT_VISUAL_CATEGORIES = [
  {
    key: "hd_engine_oil",
    label: "HD Engine Oil",
    folder: "hd-engine-oil",
    file: "hd-truck-maintenance.svg",
    path: ENABLEMENT_VISUAL_REGISTRY.hd_engine_oil,
  },
  {
    key: "hydraulic",
    label: "Hydraulic",
    folder: "hydraulic",
    file: "excavator-hydraulics.svg",
    path: ENABLEMENT_VISUAL_REGISTRY.hydraulic,
  },
  {
    key: "gear_oil",
    label: "Gear Oil",
    folder: "gear-oil",
    file: "drivetrain-axle.svg",
    path: ENABLEMENT_VISUAL_REGISTRY.gear_oil,
  },
  {
    key: "grease",
    label: "Grease",
    folder: "grease",
    file: "grease-bearing-service.svg",
    path: ENABLEMENT_VISUAL_REGISTRY.grease,
  },
  {
    key: "agrimax_green",
    label: "AGRIMAX (green line)",
    folder: "agrimax-green",
    file: "green-tractor-generic.svg",
    path: ENABLEMENT_VISUAL_REGISTRY.agrimax_green,
  },
  {
    key: "agrimax_red",
    label: "AGRIMAX (red line)",
    folder: "agrimax-red",
    file: "red-tractor-generic.svg",
    path: ENABLEMENT_VISUAL_REGISTRY.agrimax_red,
  },
  {
    key: "food_grade",
    label: "Food grade",
    folder: "food-grade",
    file: "food-processing-line.svg",
    path: ENABLEMENT_VISUAL_REGISTRY.food_grade,
  },
  {
    key: "environmental_eal",
    label: "Environmental / EAL",
    folder: "environmental-eal",
    file: "marine-dredging-generic.svg",
    path: ENABLEMENT_VISUAL_REGISTRY.environmental_eal,
  },
  {
    key: "forestry",
    label: "Forestry",
    folder: "forestry",
    file: "logging-equipment-generic.svg",
    path: ENABLEMENT_VISUAL_REGISTRY.forestry,
  },
  {
    key: "mining",
    label: "Mining",
    folder: "mining",
    file: "mining-equipment-generic.svg",
    path: ENABLEMENT_VISUAL_REGISTRY.mining,
  },
  {
    key: "construction",
    label: "Construction",
    folder: "construction",
    file: "construction-loader-generic.svg",
    path: ENABLEMENT_VISUAL_REGISTRY.construction,
  },
  {
    key: "marine",
    label: "Marine",
    folder: "marine",
    file: "marine-equipment-generic.svg",
    path: ENABLEMENT_VISUAL_REGISTRY.marine,
  },
  {
    key: "shop_maintenance",
    label: "Shop / maintenance",
    folder: "shop-maintenance",
    file: "mechanic-shop-generic.svg",
    path: ENABLEMENT_VISUAL_REGISTRY.shop_maintenance,
  },
  {
    key: "industrial",
    label: "Industrial",
    folder: "industrial",
    file: "industrial-plant-generic.svg",
    path: ENABLEMENT_VISUAL_REGISTRY.industrial,
  },
];

/** @param {unknown} v */
function pushText(out, v) {
  if (v == null) return;
  if (typeof v === "string") {
    const t = v.trim();
    if (t) out.push(t);
    return;
  }
  if (typeof v === "number" && Number.isFinite(v)) {
    out.push(String(v));
    return;
  }
  if (Array.isArray(v)) {
    for (const x of v) pushText(out, x);
  }
}

/** @param {Record<string, unknown>|null|undefined} obj */
function collectFromObject(obj, keys) {
  const out = [];
  if (!obj || typeof obj !== "object") return out;
  for (const k of keys) {
    if (Object.prototype.hasOwnProperty.call(obj, k)) pushText(out, /** @type {unknown} */ (obj[k]));
  }
  return out;
}

/** @param {unknown[]} sections */
function collectFromSections(sections) {
  const out = [];
  if (!Array.isArray(sections)) return out;
  for (const s of sections) {
    if (!s || typeof s !== "object") continue;
    const o = /** @type {Record<string, unknown>} */ (s);
    pushText(out, o.title);
    pushText(out, o.subtitle);
    if (Array.isArray(o.bullets)) pushText(out, o.bullets);
  }
  return out;
}

/** @param {unknown} productLike */
export function textBlobFromProductLike(productLike) {
  const parts = [];
  if (!productLike || typeof productLike !== "object") return "";
  const p = /** @type {Record<string, unknown>} */ (productLike);
  pushText(parts, collectFromObject(p, [
    "productName",
    "canonicalFamily",
    "positioningLine",
    "oneLiner",
    "category",
    "pdsMapKey",
    "packageType",
  ]));
  pushText(parts, p.keySpecs);
  pushText(parts, p.approvals);
  pushText(parts, p.salesAngles);
  pushText(parts, p.salesEnablementAngles);
  return parts.join(" \n ").toLowerCase();
}

/** @param {unknown} packageInput */
export function textBlobFromPackage(packageInput) {
  const parts = [];
  if (!packageInput || typeof packageInput !== "object") return "";
  const p = /** @type {Record<string, unknown>} */ (packageInput);
  pushText(parts, collectFromObject(p, [
    "title",
    "subtitle",
    "summary",
    "category",
    "packageType",
    "suggestedSpotlightType",
    "audience",
    "recommendedAction",
    "priority",
  ]));
  pushText(parts, collectFromSections(/** @type {unknown[]} */ (p.sections)));
  if (Array.isArray(p.productCards)) {
    for (const row of p.productCards) {
      pushText(parts, textBlobFromProductLike(row));
    }
  }
  if (Array.isArray(p.crossSellOpportunities)) pushText(parts, p.crossSellOpportunities);
  if (Array.isArray(p.guardrails)) pushText(parts, p.guardrails);
  if (Array.isArray(p.sourceNotes)) pushText(parts, p.sourceNotes);
  return parts.join(" \n ").toLowerCase();
}

const RE_AGRIMAX = /\bagrimax\b/i;
const RE_GREEN_LINE = /\bjohn\s*deere\b|\bdeere\b|\bj20\b|\bjdm\b|\bj14j\b|\bj20c\b|\b8020\b|\b9970\b/i;
const RE_RED_LINE =
  /\bcnh\b|case\s*ih|case-ih|case\sinternational|\bnew\s*holland\b|\bm1366\b|\bmat\b(?:\s|$|[,\.])/i;

const RE_FOOD = /\bnsf\s*h1\b|\bh1\b.*(?:food|lube)|\bfood[\s-]*grade\b|\bfda\b|food[\s-]*machinery/i;
const RE_EAL =
  /\bvgp\b|\beal\b|\benviro\b|\benvironmental\b|\bhees\b|\bhfdu\b|\bbiodegrad|\bbio[\s-]*synthetic|\bbiosynthetic|\bbio[\s-]*lubric/i;

const RE_FORESTRY = /\bforestry\b|bar[\s-]*chain|saw[\s-]*guide|chain[\s-]*saw|chainsaw/i;
const RE_MINING = /\bmining\b|\bhaul\s*truck\b|\bshovel\b.*mine/i;
const RE_CONSTRUCTION = /\bconstruction\b|wheel\s*loader|backhoe|excavator\s*(?!hydraulic\s*fluid)|\bskid\s*steer/i;
const RE_MARINE = /\bmarine\b|stern\s*tube|offshore\s*vessel|ship\s*engine|dockside|port\s*equipment/i;
const RE_SHOP = /\bshop\b|\bmechanic\b|service\s*bay|maintenance\s*bay|garage\s*service/i;
const RE_INDUSTRIAL =
  /\bindustrial\b|compressor\s*oil|turbine\s*oil|circulating\s*oil|way\s*oil|cutting\s*oil|slide\s*way/i;

const RE_GREASE = /\bgrease\b|\bnlgi\b|\bep[\s-]*2\b|poly\s*urea|calcium\s*sulfonate/i;
const RE_GEAR =
  /\bgear\s*oil\b|drivetrain|differential\b|axle\b|75w-90|80w-90|\bgl[\s-]*[45]\b|limited\s*slip/i;
const RE_HYDRAULIC =
  /\bhydraulic\b|hydrostatic|aw\s*hydraulic|hv[\s-]*lp|iso\s*vg\s*(?:32|46|68)/i;
const RE_HD_ENGINE =
  /\bck[\s-]*4\b|\bcj[\s-]*4\b|\bfab[\s-]*4\b|\bpc[\s-]*11\b|\b15w-40\b|\b10w-30\b|heavy[\s-]*duty[\s-]*engine|\bengine\s*oil\b|diesel\s*engine\s*oil/i;

/**
 * First matching rule wins. Order = most specific product cues before broad categories.
 * @param {string} blob
 * @returns {keyof typeof ENABLEMENT_VISUAL_REGISTRY}
 */
export function resolveEnablementVisualKeyFromBlob(blob) {
  const b = String(blob || "").toLowerCase();

  if (RE_AGRIMAX.test(b) && RE_GREEN_LINE.test(b)) return "agrimax_green";
  if (RE_AGRIMAX.test(b) && RE_RED_LINE.test(b)) return "agrimax_red";

  if (RE_FOOD.test(b)) return "food_grade";
  if (RE_EAL.test(b)) return "environmental_eal";

  if (RE_FORESTRY.test(b)) return "forestry";
  if (RE_MINING.test(b)) return "mining";
  if (RE_CONSTRUCTION.test(b)) return "construction";
  if (RE_MARINE.test(b)) return "marine";

  if (RE_GREASE.test(b)) return "grease";
  if (RE_GEAR.test(b)) return "gear_oil";
  if (RE_HYDRAULIC.test(b)) return "hydraulic";
  if (RE_HD_ENGINE.test(b)) return "hd_engine_oil";

  if (RE_INDUSTRIAL.test(b)) return "industrial";
  if (RE_SHOP.test(b)) return "shop_maintenance";

  return ENABLEMENT_VISUAL_FALLBACK_KEY;
}

/**
 * @param {unknown} productOrPackage — product card row or small package-like object
 * @returns {{ key: string, path: string, version: string }}
 */
export function getEnablementVisualForProduct(productOrPackage) {
  const blob = textBlobFromProductLike(productOrPackage);
  const key = resolveEnablementVisualKeyFromBlob(blob);
  const path =
    ENABLEMENT_VISUAL_REGISTRY[/** @type {keyof typeof ENABLEMENT_VISUAL_REGISTRY} */ (key)] ||
    ENABLEMENT_VISUAL_REGISTRY[ENABLEMENT_VISUAL_FALLBACK_KEY];
  return { key, path, version: ENABLEMENT_VISUAL_REGISTRY_VERSION };
}

/**
 * @param {unknown} packageInput — assembled enablement package / spotlight assembly output
 * @returns {{ key: string, path: string, version: string }}
 */
export function getEnablementVisualForPackage(packageInput) {
  const blob = textBlobFromPackage(packageInput);
  const key = resolveEnablementVisualKeyFromBlob(blob);
  const path =
    ENABLEMENT_VISUAL_REGISTRY[/** @type {keyof typeof ENABLEMENT_VISUAL_REGISTRY} */ (key)] ||
    ENABLEMENT_VISUAL_REGISTRY[ENABLEMENT_VISUAL_FALLBACK_KEY];
  return { key, path, version: ENABLEMENT_VISUAL_REGISTRY_VERSION };
}

/** @returns {Array<{ key: string, label: string, path: string, folder: string, file: string }>} */
export function listEnablementVisuals() {
  return ENABLEMENT_VISUAL_CATEGORIES.map((c) => ({
    key: c.key,
    label: c.label,
    path: c.path,
    folder: c.folder,
    file: c.file,
  }));
}

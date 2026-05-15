/**
 * Canonical grease thickener compatibility matrix (deterministic).
 * Source: KLONDIKE grease thickener compatibility chart (C / P / I).
 * Not wired to UI yet.
 */

/** @type {number} */
export const GREASE_COMPATIBILITY_MATRIX_VERSION = 1;

/** @typedef {"C" | "P" | "I"} GreaseCompatibilityCode */

/**
 * @typedef {{
 *   compatibility: GreaseCompatibilityCode,
 *   interpretation: string,
 *   recommendedAction: string,
 *   flushRecommended: boolean,
 *   cautionNotes: string[],
 * }} GreaseCompatibilityCell
 */

/** @type {readonly string[]} */
export const GREASE_COMPATIBILITY_THICKENERS = Object.freeze([
  "Aluminum Complex",
  "Barium Complex",
  "Bentonite Clay",
  "Calcium",
  "Calcium Complex",
  "Calcium Sulfonate",
  "Lithium",
  "Lithium Complex",
  "Polyurea",
  "Sodium",
  "Anhydrous Calcium",
  "Silicone",
  "Molybdenum Complex",
]);

/** @type {Readonly<Record<GreaseCompatibilityCode, Omit<GreaseCompatibilityCell, "compatibility">>>} */
const COMPATIBILITY_CODE_GUIDANCE = Object.freeze({
  C: Object.freeze({
    interpretation:
      "Compatible — generally safe to transition between these thickener families with normal regreasing practices when base oil and additive packages are also aligned.",
    recommendedAction:
      "Confirm NLGI grade, base oil viscosity, and EP/AW needs on both PDS sheets. Regrease per OEM interval; purge is still prudent when history is unknown or on centralized systems.",
    flushRecommended: false,
    cautionNotes: Object.freeze([
      "Same-thickener products from different suppliers can still differ in base oil and additives—verify both PDS rows.",
      "Centralized lube and sealed motor bearings may still require OEM sign-off even when thickeners are compatible.",
    ]),
  }),
  P: Object.freeze({
    interpretation:
      "Partially compatible — mixing or conversion may soften, harden, or change texture. Purge, re-grease, and monitor during changeover.",
    recommendedAction:
      "Plan a controlled conversion: purge fittings and lines where practical, regrease manually on critical points, and inspect texture after the first heat cycle and regrease interval.",
    flushRecommended: true,
    cautionNotes: Object.freeze([
      "Do not rely on partial compatibility for bulk auto-lube reservoirs without a flush plan.",
      "Pilot one machine before fleet-wide conversion when texture or line pressure is unknown.",
    ]),
  }),
  I: Object.freeze({
    interpretation:
      "Incompatible — thickeners can react, causing softening, hardening, separation, or line blockage. Full purge and flush strongly recommended before conversion.",
    recommendedAction:
      "Stop indiscriminate top-off. Purge old grease from cavities, lines, and auto-lube distributors; flush per OEM where required; refill only after the system is clean and the target PDS thickener is confirmed.",
    flushRecommended: true,
    cautionNotes: Object.freeze([
      "Never present incompatible mixing as safe for centralized systems or long-life bearings.",
      "Document conversion on maintenance records and re-check texture at the next regrease.",
    ]),
  }),
});

/**
 * Symmetric compatibility grid (row = column order in GREASE_COMPATIBILITY_THICKENERS).
 * C = Compatible | P = Partially Compatible | I = Incompatible
 * @type {readonly (readonly GreaseCompatibilityCode[])[]}
 */
const THICKENER_COMPATIBILITY_GRID = Object.freeze([
  /* Aluminum Complex */ ["C", "P", "I", "P", "C", "C", "C", "C", "P", "I", "P", "I", "C"],
  /* Barium Complex */ ["P", "C", "I", "P", "P", "C", "C", "C", "P", "I", "P", "I", "P"],
  /* Bentonite Clay */ ["I", "I", "C", "I", "I", "I", "I", "I", "I", "I", "I", "C", "I"],
  /* Calcium */ ["P", "P", "I", "C", "C", "C", "C", "C", "P", "I", "C", "I", "P"],
  /* Calcium Complex */ ["C", "P", "I", "C", "C", "C", "C", "C", "P", "I", "C", "I", "P"],
  /* Calcium Sulfonate */ ["C", "C", "I", "C", "C", "C", "C", "C", "P", "I", "C", "I", "C"],
  /* Lithium */ ["C", "C", "I", "C", "C", "C", "C", "C", "P", "I", "C", "I", "C"],
  /* Lithium Complex */ ["C", "C", "I", "C", "C", "C", "C", "C", "P", "I", "C", "I", "C"],
  /* Polyurea */ ["P", "P", "I", "P", "P", "P", "P", "P", "C", "I", "P", "I", "P"],
  /* Sodium */ ["I", "I", "I", "I", "I", "I", "I", "I", "I", "C", "I", "I", "I"],
  /* Anhydrous Calcium */ ["P", "P", "I", "C", "C", "C", "C", "C", "P", "I", "C", "I", "P"],
  /* Silicone */ ["I", "I", "C", "I", "I", "I", "I", "I", "I", "I", "I", "C", "I"],
  /* Molybdenum Complex */ ["C", "P", "I", "P", "P", "C", "C", "C", "P", "I", "P", "I", "C"],
]);

/** @type {Readonly<Record<string, Readonly<Record<string, GreaseCompatibilityCell>>>>} */
const PAIR_CAUTION_OVERRIDES = Object.freeze({
  "Bentonite Clay": Object.freeze({
    "Lithium": Object.freeze([
      "Bentonite (clay) thickeners are non-soap; they do not mix safely with lithium soap greases—purge before any lithium fill.",
    ]),
    "Lithium Complex": Object.freeze([
      "Clay and lithium-complex soaps are a high-risk mix—full purge required before conversion.",
    ]),
    "Calcium Sulfonate": Object.freeze([
      "Calcium sulfonate and bentonite are incompatible in most field programs—treat as a flush conversion only.",
    ]),
  }),
  "Polyurea": Object.freeze({
    "Lithium": Object.freeze([
      "Polyurea with lithium is at best partially compatible—motor and long-life bearing OEMs often require polyurea-only refill.",
    ]),
    "Lithium Complex": Object.freeze([
      "Polyurea and lithium complex are a common incompatibility in electric motor programs—confirm nameplate grease before top-off.",
    ]),
  }),
  "Sodium": Object.freeze({
    "Lithium": Object.freeze([
      "Sodium soap greases are legacy chemistry and incompatible with lithium programs—flush and do not blend.",
    ]),
  }),
  "Silicone": Object.freeze({
    "Lithium": Object.freeze([
      "Silicone thickeners are incompatible with metal-soap greases except bentonite and other silicone—dedicated hardware only.",
    ]),
  }),
});

/** @param {unknown} raw */
function normalizeGreaseThickenerText(raw) {
  return String(raw ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** @type {Readonly<Record<string, string>>} */
const THICKENER_ALIAS_TO_CANONICAL = Object.freeze({
  "aluminum complex": "Aluminum Complex",
  "al complex": "Aluminum Complex",
  "aluminium complex": "Aluminum Complex",
  "barium complex": "Barium Complex",
  "bentonite clay": "Bentonite Clay",
  bentonite: "Bentonite Clay",
  clay: "Bentonite Clay",
  "organophilic clay": "Bentonite Clay",
  "calcium complex": "Calcium Complex",
  "calcium sulfonate": "Calcium Sulfonate",
  "ca sulfonate": "Calcium Sulfonate",
  "calcium sulphonate": "Calcium Sulfonate",
  "lithium complex": "Lithium Complex",
  "li complex": "Lithium Complex",
  "anhydrous calcium": "Anhydrous Calcium",
  "molybdenum complex": "Molybdenum Complex",
  "moly complex": "Molybdenum Complex",
  "molybdenum disulfide complex": "Molybdenum Complex",
  polyurea: "Polyurea",
  silicone: "Silicone",
  sodium: "Sodium",
  lithium: "Lithium",
  calcium: "Calcium",
});

/**
 * @param {string} thickenerA
 * @param {string} thickenerB
 * @param {GreaseCompatibilityCode} code
 */
function pairCautionNotes(thickenerA, thickenerB, code) {
  const base = [...COMPATIBILITY_CODE_GUIDANCE[code].cautionNotes];
  const extra =
    PAIR_CAUTION_OVERRIDES[thickenerA]?.[thickenerB] ||
    PAIR_CAUTION_OVERRIDES[thickenerB]?.[thickenerA] ||
    [];
  return Object.freeze(uniqStrings([...base, ...extra]));
}

/** @param {string[]} arr */
function uniqStrings(arr) {
  const out = [];
  const seen = new Set();
  for (const s of arr) {
    const t = String(s ?? "").trim();
    if (!t || seen.has(t)) continue;
    seen.add(t);
    out.push(t);
  }
  return out;
}

/**
 * @param {string} thickenerA
 * @param {string} thickenerB
 * @param {GreaseCompatibilityCode} code
 * @returns {GreaseCompatibilityCell}
 */
function buildCompatibilityCell(thickenerA, thickenerB, code) {
  const guidance = COMPATIBILITY_CODE_GUIDANCE[code];
  const sameThickener = thickenerA === thickenerB;
  return Object.freeze({
    compatibility: code,
    interpretation: sameThickener
      ? "Same thickener family — compatible with itself; still confirm base oil, NLGI grade, and additive package on the PDS before interchange between products."
      : guidance.interpretation,
    recommendedAction: sameThickener
      ? "Match NLGI, base oil viscosity, and EP/solid additive needs on the PDS; supplier changes still deserve a compatibility check when auto-lube or motor programs apply."
      : guidance.recommendedAction,
    flushRecommended: sameThickener ? false : guidance.flushRecommended,
    cautionNotes: pairCautionNotes(thickenerA, thickenerB, code),
  });
}

/** @returns {Record<string, Record<string, GreaseCompatibilityCell>>} */
function buildThickenerCompatibilityMatrix() {
  /** @type {Record<string, Record<string, GreaseCompatibilityCell>>} */
  const matrix = {};
  for (let i = 0; i < GREASE_COMPATIBILITY_THICKENERS.length; i += 1) {
    const rowName = GREASE_COMPATIBILITY_THICKENERS[i];
    /** @type {Record<string, GreaseCompatibilityCell>} */
    const row = {};
    for (let j = 0; j < GREASE_COMPATIBILITY_THICKENERS.length; j += 1) {
      const colName = GREASE_COMPATIBILITY_THICKENERS[j];
      const code = THICKENER_COMPATIBILITY_GRID[i][j];
      row[colName] = buildCompatibilityCell(rowName, colName, code);
    }
    matrix[rowName] = Object.freeze(row);
  }
  return matrix;
}

/** @type {Readonly<Record<string, Readonly<Record<string, GreaseCompatibilityCell>>>>} */
const THICKENER_COMPATIBILITY_MATRIX = Object.freeze(buildThickenerCompatibilityMatrix());

/** @type {Readonly<Record<string, Readonly<Record<string, GreaseCompatibilityCell>>>>} */
export const GREASE_COMPATIBILITY_MATRIX = THICKENER_COMPATIBILITY_MATRIX;

/**
 * @param {unknown} thickener
 * @returns {string | null}
 */
export function normalizeGreaseThickener(thickener) {
  const norm = normalizeGreaseThickenerText(thickener);
  if (!norm) return null;

  if (THICKENER_ALIAS_TO_CANONICAL[norm]) {
    return THICKENER_ALIAS_TO_CANONICAL[norm];
  }

  for (const canonical of GREASE_COMPATIBILITY_THICKENERS) {
    if (normalizeGreaseThickenerText(canonical) === norm) {
      return canonical;
    }
  }

  return null;
}

/**
 * @param {unknown} thickenerA
 * @param {unknown} thickenerB
 * @returns {GreaseCompatibilityCell | null}
 */
export function getGreaseCompatibility(thickenerA, thickenerB) {
  const a = normalizeGreaseThickener(thickenerA);
  const b = normalizeGreaseThickener(thickenerB);
  if (!a || !b) return null;

  const direct = THICKENER_COMPATIBILITY_MATRIX[a]?.[b];
  if (direct) return direct;

  const symmetric = THICKENER_COMPATIBILITY_MATRIX[b]?.[a];
  return symmetric || null;
}

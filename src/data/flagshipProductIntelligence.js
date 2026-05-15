/**
 * Canonical flagship product intelligence (deterministic source text).
 * Prefer these rows over generic category / attribute templates when a flagship id matches.
 */

export const NANO_EP_2_FLAGSHIP_PRODUCT_ID = "flagship-nano-ep-2-grease";

/** @type {Readonly<{
 *   id: string,
 *   productName: string,
 *   canonicalProductLabel: string,
 *   whatItIsIntro: string,
 *   whatItIsDetails: readonly string[],
 *   whyItWins: string,
 *   keyDifferentiators: readonly string[],
 *   premiumProofPoints: readonly string[],
 *   severeDutyUseCases: readonly string[],
 *   repTalkTrack: readonly string[],
 *   questionsToAsk: readonly string[],
 *   confirmBeforeUse: readonly string[],
 *   doNotSay: readonly string[],
 * }>} */
export const NANO_EP_2_FLAGSHIP_PRODUCT_INTELLIGENCE = Object.freeze({
  id: NANO_EP_2_FLAGSHIP_PRODUCT_ID,
  productName: "Nano EP 2 Grease",
  canonicalProductLabel: "KLONDIKE nano Calcium Sulfonate EP Grease (Nano EP 2)",
  whatItIsIntro:
    "KLONDIKE Nano EP 2 is a calcium sulfonate complex grease with proprietary tungsten disulfide nanotechnology for severe-duty shock-load protection, wet-environment washout resistance, and documented EP headroom—not commodity EP grease sold on tube color alone.",
  whatItIsDetails: [
    "Calcium sulfonate complex thickener with NLGI 2 discipline (NLGI 1 where the OEM chart allows) for pins, bushings, and severe mobile duty.",
    "Proprietary tungsten disulfide nanotechnology on the PDS for EP and wear—repeat only the printed customer-facing wording.",
    "Severe-duty shock-load protection for crushers, hammers, and loader implements where load spikes and impact are daily.",
    "Wet-environment and washout resistance when slurry, pressure-wash, and haul-road mud strip marginal films.",
    "Positioned above commodity EP grease programs that cannot show the same weld, Timken, spray-off, and dropping-point story on paper.",
  ],
  whyItWins:
    "It wins where shock, water, and heat gang up: 800 kg 4-ball weld, sub-1% water spray-off, and high dropping point on the index back a calcium sulfonate complex film with proprietary tungsten disulfide nanotechnology—not the commodity EP grease habit that treats every red tube as interchangeable.",
  keyDifferentiators: [
    "Calcium sulfonate complex grease chemistry built for severe-duty shock-load protection—not commodity EP grease positioning.",
    "Proprietary tungsten disulfide nanotechnology tied to EP and wear language exactly as printed on the PDS.",
    "800 kg 4-ball weld load and Timken OK values maintenance can post beside the zerk map.",
    "Wet-environment washout resistance with indexed water spray-off under 1% on the summary.",
    "High dropping point near 316 °C class on the index for hot, angry duty without guesswork.",
  ],
  premiumProofPoints: [
    "PDS-indexed 4-ball weld load 800 kg—anchor shock and load talk to the number on the wall.",
    "PDS-indexed water spray-off below 1%—wet yards, wash-down, and slurry without hand-waving.",
    "PDS-indexed high dropping point ~316 °C class—temperature headroom versus commodity EP grease guesswork.",
    "PDS references proprietary tungsten disulfide nanotechnology for EP/wear—use printed wording only.",
  ],
  severeDutyUseCases: [
    "Crusher frames, hammer mills, and slow-turn pins where shock loads spike and the film must survive until the next service window.",
    "Shovels, loaders, and excavator bushings in wet yards—pressure-wash routines, haul roads, and seasonal mud.",
    "Mine and plant shops standardizing one severe calcium sulfonate complex EP tier instead of interchangeable commodity EP grease tubes.",
  ],
  repTalkTrack: [
    "Start on duty: “Where are shock, water, and load worst—crushers, hammers, wet booms, or pins every pass?”",
    "Drop proof calmly: “Eight-hundred-kilogram 4-ball weld, washout under one percent, high dropping point—calcium sulfonate complex with proprietary tungsten disulfide nanotechnology on the sheet.”",
    "Close on discipline: “Match NLGI and OEM chart, keep language inside the PDS, and reserve this for severe duty—not commodity EP grease by habit.”",
  ],
  questionsToAsk: [
    "What thickener and NLGI grade is in the pin or auto-lube line today?",
    "Which joints see the worst shock, water, or wash-down—crushers, hammers, or loader booms?",
    "Does the OEM chart allow NLGI 2 calcium sulfonate complex EP on these points?",
    "Manual regrease, gun, or centralized auto-lube—and any thickener compatibility restrictions?",
    "What failure are you fighting—wash-off, metal loss, or line issues after a product change?",
  ],
  confirmBeforeUse: [
    "Confirm OEM and application allow NLGI 2 calcium sulfonate complex EP on each point before recommending.",
    "Do not assume interchangeability with other thickener families or central systems without a compatibility review.",
    "Centralized lube systems need thickener compatibility sign-off before bulk conversion.",
    "Keep proprietary tungsten disulfide nanotechnology claims inside the current PDS—no extrapolation beyond printed statements.",
  ],
  doNotSay: [
    "Do not call it interchangeable with every NLGI 2 EP grease or central systems without a compatibility review.",
    "Do not extrapolate nanotechnology or drain-life beyond published PDS statements.",
    "Do not promise miracle life extension beyond OEM regrease intervals.",
    "Do not imply NLGI 2 without confirming OEM allows NLGI 2 calcium sulfonate complex EP on that joint.",
  ],
});

/**
 * @param {string} normQ normalized query from normalizeProductQuery
 */
export function isNanoEp2ProductQuery(normQ) {
  const n = String(normQ ?? "").trim();
  if (!n) return false;
  if (n === "nano ep2" || n === "nano ep 2") return true;
  if (n.includes("nano ep 2") || n.includes("nano ep2")) return true;
  if (n.includes("nano calcium sulfonate")) return true;
  if (n.includes("nano grease") && !n.includes("full synthetic")) return true;
  return /\bnano\b/.test(n) && /\bep\s*2\b/.test(n);
}

/**
 * @param {string | null | undefined} flagshipId
 */
export function isNanoEp2FlagshipId(flagshipId) {
  return String(flagshipId ?? "") === NANO_EP_2_FLAGSHIP_PRODUCT_ID;
}

/**
 * @param {unknown} flagship narrative row
 * @param {string} [normQ]
 */
export function isNanoEp2Anchored(flagship, normQ = "") {
  if (flagship && typeof flagship === "object" && isNanoEp2FlagshipId(/** @type {{ id?: string }} */ (flagship).id)) {
    return true;
  }
  return isNanoEp2ProductQuery(normQ);
}

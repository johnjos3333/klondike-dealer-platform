/**
 * Klondike University course registry — recommendation-only (Phase 7C).
 * No Thinkific integration, completion tracking, or LMS enrollment sync.
 */

/** @typedef {"foundation" | "product_line" | "category_deep_dive" | "bonus"} KlondikeUniversityCategory */
/** @typedef {"foundations" | "product_training" | "category_module" | "bonus_resource"} KlondikeUniversityCourseType */

/**
 * @typedef {object} KlondikeUniversityCourse
 * @property {string} id
 * @property {string} title
 * @property {KlondikeUniversityCategory} category
 * @property {KlondikeUniversityCourseType} courseType
 * @property {string[]} recommendedFor
 * @property {string[]} triggeredBySignals
 * @property {string} whyItMatters
 * @property {string} suggestedNextAction
 * @property {string} [thinkificUrlPlaceholder]
 */

/** @type {KlondikeUniversityCourse[]} */
export const KLONDIKE_UNIVERSITY_COURSES = [
  {
    id: "product-training-introduction",
    title: "KLONDIKE UNIVERSITY: Product Training Introduction",
    category: "foundation",
    courseType: "foundations",
    recommendedFor: ["new dealers", "new reps", "onboarding"],
    triggeredBySignals: ["newDealer", "newRep"],
    whyItMatters:
      "Sets shared language for how KLONDIKE products are positioned before reps quote or send proposals on the platform.",
    suggestedNextAction:
      "Suggest this module before the first counter review or ride-along so reps know where deeper category courses fit.",
    thinkificUrlPlaceholder: null,
  },
  {
    id: "lubrication-fundamentals-ilma",
    title: "Lubrication Fundamentals presented by ILMA",
    category: "foundation",
    courseType: "foundations",
    recommendedFor: ["new dealers", "new reps", "category confidence"],
    triggeredBySignals: ["newDealer", "newRep"],
    whyItMatters:
      "Builds baseline lubrication vocabulary so reps coach from equipment tags—not assumed counter knowledge.",
    suggestedNextAction:
      "Recommend as a refresher before contest season or when quote mix is still narrow across categories.",
    thinkificUrlPlaceholder: null,
  },
  {
    id: "klondike-product-basics",
    title: "KLONDIKE Product Basics",
    category: "foundation",
    courseType: "product_training",
    recommendedFor: ["new dealers", "new reps"],
    triggeredBySignals: ["newDealer", "newRep"],
    whyItMatters:
      "Connects the product families reps see in quotes to the stories they should use on the next visit.",
    suggestedNextAction:
      "Assign before the next visit when outside-sales activity is just starting on the platform.",
    thinkificUrlPlaceholder: null,
  },
  {
    id: "heavy-duty",
    title: "Heavy Duty",
    category: "product_line",
    courseType: "product_training",
    recommendedFor: ["HD-focused dealers", "fleet accounts"],
    triggeredBySignals: ["hdOilOnly", "hdOpportunity"],
    whyItMatters:
      "HD quote concentration without adjacent categories often means reps need spec and program confidence—not more SKUs on the list.",
    suggestedNextAction:
      "Suggest before the next fleet or PM conversation when HD lines dominate quoted products.",
    thinkificUrlPlaceholder: null,
  },
  {
    id: "automotive",
    title: "Automotive",
    category: "product_line",
    courseType: "product_training",
    recommendedFor: ["automotive bays", "light-duty mix expansion"],
    triggeredBySignals: ["automotiveOpportunity"],
    whyItMatters:
      "Automotive lines may be under-quoted when reps default to HD or hydraulic stories on mixed-lot dealers.",
    suggestedNextAction:
      "Recommend before ride-along on accounts with passenger-car or light-duty bays.",
    thinkificUrlPlaceholder: null,
  },
  {
    id: "gear-oils",
    title: "Gear Oils",
    category: "product_line",
    courseType: "product_training",
    recommendedFor: ["drivetrain coaching", "industrial accounts"],
    triggeredBySignals: ["hdOpportunity", "hydraulicOpportunity", "industrialOpportunity"],
    whyItMatters:
      "Hydraulic-heavy quotes without gear oil often leave final-drive and industrial EP coaching on the table.",
    suggestedNextAction:
      "Suggest before reviewing equipment tags on one unit in the yard.",
    thinkificUrlPlaceholder: null,
  },
  {
    id: "transmission",
    title: "Transmission",
    category: "product_line",
    courseType: "category_module",
    recommendedFor: ["ag dealers", "construction fleets"],
    triggeredBySignals: ["transmissionOpportunity", "wetBrakeOpportunity"],
    whyItMatters:
      "UTTO, hydraulic, and gear fills are commonly confused—category confidence clears the next ask.",
    suggestedNextAction:
      "Assign before the next ag or construction visit when transmission lines are thin in quotes.",
    thinkificUrlPlaceholder: null,
  },
  {
    id: "hydraulics-part-1-basics",
    title: "Hydraulics - Part 1 The Basics",
    category: "category_deep_dive",
    courseType: "category_module",
    recommendedFor: ["hydraulic quote gaps", "ISO/VG coaching"],
    triggeredBySignals: ["lowHydraulic", "hydraulicOpportunity"],
    whyItMatters:
      "When hydraulics are thin in quoted products, ISO/VG and contamination language usually comes before price.",
    suggestedNextAction:
      "Recommend before the next counter review when hydraulic categories look underdeveloped.",
    thinkificUrlPlaceholder: null,
  },
  {
    id: "hydraulics-part-2-selling-klondike",
    title: "Hydraulics Part 2 - Selling KLONDIKE",
    category: "category_deep_dive",
    courseType: "category_module",
    recommendedFor: ["hydraulic growth", "field reps"],
    triggeredBySignals: ["lowHydraulic", "hydraulicOpportunity"],
    whyItMatters:
      "This dealer may be quoting hydraulic products, but related categories look underdeveloped—Part 2 ties basics to KLONDIKE positioning.",
    suggestedNextAction:
      "Assign this module before the next counter review or ride-along.",
    thinkificUrlPlaceholder: null,
  },
  {
    id: "industrial-fluids",
    title: "Industrial Fluids",
    category: "product_line",
    courseType: "product_training",
    recommendedFor: ["plant accounts", "industrial expansion"],
    triggeredBySignals: ["industrialOpportunity"],
    whyItMatters:
      "Industrial accounts need compartment and application language before reps widen the quote mix.",
    suggestedNextAction:
      "Suggest before contest windows when industrial categories are missing from quoted lines.",
    thinkificUrlPlaceholder: null,
  },
  {
    id: "grease-part-1-basics",
    title: "Grease Part 1 - The Basics",
    category: "category_deep_dive",
    courseType: "category_module",
    recommendedFor: ["grease gaps", "PM attach"],
    triggeredBySignals: ["lowGrease", "greaseOpportunity"],
    whyItMatters:
      "PM grease attach fails when reps cannot match NLGI, interval, and joint type to the sticker.",
    suggestedNextAction:
      "Recommend before the next PM or chassis conversation when grease is thin in quotes.",
    thinkificUrlPlaceholder: null,
  },
  {
    id: "grease-part-2-selling-klondike",
    title: "Grease Part 2 - Selling KLONDIKE",
    category: "category_deep_dive",
    courseType: "category_module",
    recommendedFor: ["grease growth", "construction accounts"],
    triggeredBySignals: ["lowGrease", "greaseOpportunity"],
    whyItMatters:
      "HD or hydraulic interest without grease on quotes may mean reps need a deliberate grease story—not assumed stocking.",
    suggestedNextAction:
      "Assign before ride-along when grease categories trail hydraulic or HD quote activity.",
    thinkificUrlPlaceholder: null,
  },
  {
    id: "coolant",
    title: "Coolant",
    category: "product_line",
    courseType: "category_module",
    recommendedFor: ["HD programs", "fleet maintenance"],
    triggeredBySignals: ["coolantOpportunity"],
    whyItMatters:
      "HD quote activity without coolant lines may mean reps need a program story—not confirmed fleet stocking.",
    suggestedNextAction:
      "Suggest as a refresher before the next HD visit or fleet review.",
    thinkificUrlPlaceholder: null,
  },
  {
    id: "chemicals",
    title: "Chemicals",
    category: "product_line",
    courseType: "category_module",
    recommendedFor: ["shop chemicals", "maintenance bays"],
    triggeredBySignals: ["chemicalOpportunity"],
    whyItMatters:
      "Shop chemical and maintenance-fluid conversations often ride along with HD or fleet programs.",
    suggestedNextAction:
      "Recommend before expanding shop-maintenance quotes on the platform.",
    thinkificUrlPlaceholder: null,
  },
  {
    id: "agrimax",
    title: "AGRIMAX",
    category: "product_line",
    courseType: "product_training",
    recommendedFor: ["ag dealers", "wet brake / UTTO accounts"],
    triggeredBySignals: ["transmissionOpportunity", "wetBrakeOpportunity"],
    whyItMatters:
      "Ag and fleet equipment lines benefit from AGRIMAX program positioning when transmission signals are weak.",
    suggestedNextAction:
      "Assign before the next ag visit when UTTO and wet-brake language will be on the ticket.",
    thinkificUrlPlaceholder: null,
  },
  {
    id: "field-reference-guide-bonus",
    title: "BONUS: Field Reference Guide",
    category: "bonus",
    courseType: "bonus_resource",
    recommendedFor: ["ride-alongs", "field prep", "contest prep"],
    triggeredBySignals: ["fieldPrep", "rideAlongPrep"],
    whyItMatters:
      "Gives reps a quick reference between visits without replacing in-person counter coaching.",
    suggestedNextAction:
      "Suggest before the next ride-along or customer visit while proposals are still open.",
    thinkificUrlPlaceholder: null,
  },
];

/** @type {Record<string, KlondikeUniversityCourse>} */
export const KLONDIKE_UNIVERSITY_COURSE_MAP = Object.fromEntries(
  KLONDIKE_UNIVERSITY_COURSES.map((c) => [c.id, c])
);

/** Recommendation bucket → course ids (deterministic order). */
const BUCKET_COURSE_IDS = {
  newDealer: [
    "product-training-introduction",
    "klondike-product-basics",
    "lubrication-fundamentals-ilma",
  ],
  newRep: [
    "product-training-introduction",
    "klondike-product-basics",
    "lubrication-fundamentals-ilma",
  ],
  lowHydraulic: ["hydraulics-part-1-basics", "hydraulics-part-2-selling-klondike"],
  hydraulicOpportunity: ["hydraulics-part-1-basics", "hydraulics-part-2-selling-klondike"],
  lowGrease: ["grease-part-1-basics", "grease-part-2-selling-klondike"],
  greaseOpportunity: ["grease-part-1-basics", "grease-part-2-selling-klondike"],
  hdOilOnly: ["heavy-duty", "coolant", "gear-oils"],
  hdOpportunity: ["heavy-duty", "coolant", "gear-oils"],
  transmissionOpportunity: ["transmission", "agrimax"],
  wetBrakeOpportunity: ["transmission", "agrimax"],
  industrialOpportunity: ["industrial-fluids", "gear-oils"],
  coolantOpportunity: ["coolant"],
  automotiveOpportunity: ["automotive"],
  chemicalOpportunity: ["chemicals"],
  fieldPrep: ["field-reference-guide-bonus"],
  rideAlongPrep: ["field-reference-guide-bonus"],
};

const BUCKET_PRIORITY = {
  newDealer: 0,
  newRep: 0,
  rideAlongPrep: 1,
  fieldPrep: 1,
  lowHydraulic: 2,
  hydraulicOpportunity: 2,
  lowGrease: 3,
  greaseOpportunity: 3,
  hdOilOnly: 4,
  hdOpportunity: 4,
  coolantOpportunity: 5,
  transmissionOpportunity: 6,
  wetBrakeOpportunity: 6,
  industrialOpportunity: 7,
  automotiveOpportunity: 8,
  chemicalOpportunity: 9,
};

/**
 * @param {string} id
 * @returns {KlondikeUniversityCourse | null}
 */
export function getKlondikeUniversityCourse(id) {
  const key = String(id || "").trim();
  return KLONDIKE_UNIVERSITY_COURSE_MAP[key] || null;
}

/**
 * @returns {KlondikeUniversityCourse[]}
 */
export function listKlondikeUniversityCourses() {
  return [...KLONDIKE_UNIVERSITY_COURSES];
}

/**
 * Derive recommendation buckets from Action Center signals + optional context.
 * @param {object} signals
 * @param {object} [context]
 * @returns {Set<string>}
 */
function deriveRecommendationBuckets(signals, context = {}) {
  const buckets = new Set();
  const presence = signals.dealerCategoryMix || {};
  const active = Array.isArray(presence.activeCategories) ? presence.activeCategories : [];
  const hasHydraulic =
    Number(presence.hydraulic || 0) >= 1 ||
    active.includes("hydraulic");
  const hasHd = Number(presence.hd || 0) >= 1 || active.includes("hd");
  const hasGrease = Number(presence.grease || 0) >= 1 || active.includes("grease");
  const hasAutomotive =
    Number(presence.automotive || 0) >= 1 || active.includes("automotive");

  if (signals.newDealer) buckets.add("newDealer");
  if (context.newRep) buckets.add("newRep");

  if (signals.hydraulicOnly || signals.hydraulicNoGear) {
    buckets.add("lowHydraulic");
  }
  if (signals.hydraulicNoGear || signals.hydraulicOnly) {
    buckets.add("hydraulicOpportunity");
  }
  if (
    context.lowHydraulic ||
    (signals.enablementAlertKinds || []).some((k) =>
      /hydraulic/i.test(String(k))
    )
  ) {
    buckets.add("lowHydraulic");
    buckets.add("hydraulicOpportunity");
  }

  if (signals.noGrease) buckets.add("lowGrease");
  if (signals.greaseLowHdHydStrong) buckets.add("greaseOpportunity");
  if (context.lowGrease) buckets.add("lowGrease");
  if (context.greaseOpportunity) buckets.add("greaseOpportunity");

  if (signals.hdOilOnly) buckets.add("hdOilOnly");
  if (signals.hdNoCoolant || signals.hdOilOnly || signals.noCoolant) {
    buckets.add("hdOpportunity");
  }
  if (context.hdOpportunity) buckets.add("hdOpportunity");

  if (signals.noTransmission) {
    buckets.add("transmissionOpportunity");
    buckets.add("wetBrakeOpportunity");
  }
  if (context.transmissionOpportunity || context.wetBrakeOpportunity) {
    buckets.add("transmissionOpportunity");
    buckets.add("wetBrakeOpportunity");
  }

  if (
    signals.categoryExpansionOpportunity &&
    (hasHydraulic || signals.hydraulicNoGear) &&
    !signals.hdOilOnly
  ) {
    buckets.add("industrialOpportunity");
  }
  if (context.industrialOpportunity) buckets.add("industrialOpportunity");

  if (signals.noCoolant || signals.hdNoCoolant) buckets.add("coolantOpportunity");
  if (context.coolantOpportunity) buckets.add("coolantOpportunity");

  if (
    !hasAutomotive &&
    (hasHd || hasHydraulic || Number(signals.quotesCreated || 0) >= 2)
  ) {
    buckets.add("automotiveOpportunity");
  }
  if (context.automotiveOpportunity) buckets.add("automotiveOpportunity");

  if (
    signals.noCoolant ||
    signals.hdNoCoolant ||
    (hasHd && !hasAutomotive)
  ) {
    buckets.add("chemicalOpportunity");
  }
  if (context.chemicalOpportunity) buckets.add("chemicalOpportunity");

  if (
    signals.stalledQuoteActivity ||
    signals.lowProposalFollowUp ||
    signals.possibleBusinessReview
  ) {
    buckets.add("rideAlongPrep");
  }
  if (context.fieldPrep || context.rideAlongPrep) {
    buckets.add("fieldPrep");
    buckets.add("rideAlongPrep");
  }

  return buckets;
}

/**
 * Deterministic Klondike University recommendations from platform signals.
 * @param {object} signals — typically computeDealerActionCenterSignals output
 * @param {{ newRep?: boolean, maxCourses?: number, signalKey?: string, [key: string]: unknown }} [context]
 * @returns {Array<KlondikeUniversityCourse & { matchedBuckets: string[], priority: number }>}
 */
export function recommendKlondikeUniversityCourses(signals, context = {}) {
  const buckets = deriveRecommendationBuckets(signals || {}, context);
  const signalKey = String(context.signalKey || "").trim();

  if (signalKey === "newDealer") buckets.add("newDealer");
  if (signalKey === "noTransmission") {
    buckets.add("transmissionOpportunity");
    buckets.add("wetBrakeOpportunity");
  }
  if (signalKey === "hdNoCoolant" || signalKey === "noCoolant") {
    buckets.add("coolantOpportunity");
    buckets.add("hdOpportunity");
  }
  if (signalKey === "greaseLowHdHydStrong" || signalKey === "noGrease") {
    buckets.add("greaseOpportunity");
    buckets.add("lowGrease");
  }
  if (signalKey === "hydraulicNoGear" || signalKey === "hydraulicOnly") {
    buckets.add("hydraulicOpportunity");
    buckets.add("lowHydraulic");
  }
  if (signalKey === "stalledQuoteActivity" || signalKey === "lowProposalFollowUp") {
    buckets.add("rideAlongPrep");
  }

  const maxCourses = Number(context.maxCourses) > 0 ? Number(context.maxCourses) : 6;
  const seen = new Set();
  const ranked = [];

  [...buckets]
    .sort((a, b) => (BUCKET_PRIORITY[a] ?? 50) - (BUCKET_PRIORITY[b] ?? 50))
    .forEach((bucket) => {
      const ids = BUCKET_COURSE_IDS[bucket] || [];
      ids.forEach((id) => {
        if (seen.has(id)) return;
        const course = KLONDIKE_UNIVERSITY_COURSE_MAP[id];
        if (!course) return;
        seen.add(id);
        ranked.push({
          ...course,
          matchedBuckets: [bucket],
          priority: BUCKET_PRIORITY[bucket] ?? 50,
        });
      });
    });

  return ranked.slice(0, maxCourses);
}

/**
 * Action Center headline for a recommended course.
 * @param {KlondikeUniversityCourse} course
 */
export function formatKlondikeUniversityActionIssue(course) {
  const title = String(course?.title || "Klondike University module").trim();
  return `Recommended Klondike University: ${title}`;
}

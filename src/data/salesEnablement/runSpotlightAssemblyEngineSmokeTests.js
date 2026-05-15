/**
 * Smoke tests for Spotlight Assembly Engine (deterministic canonical packages).
 * Run: node src/data/salesEnablement/runSpotlightAssemblyEngineSmokeTests.js
 */

import {
  SPOTLIGHT_ASSEMBLY_ENGINE_VERSION,
  SPOTLIGHT_ACTION_TYPES,
  SPOTLIGHT_AUDIENCES,
  SPOTLIGHT_PACKAGE_TYPES,
  buildProductSpotlightPackage,
  buildCategorySpotlightPackage,
  buildCustomerProfilePackage,
  buildRepCoachingBrief,
  buildTrainingRecommendationPackage,
  buildFieldRideRecommendationPackage,
  buildRecommendedEnablementActions,
  buildSalesEnablementPackage,
  listAvailableCanonicalProducts,
  findCanonicalProductsForEnablement,
} from "./spotlightAssemblyEngine.js";

const FOOD_GRADE_GREASE_ID = "compliance-specialty-canonical-food-grade-ep2-grease";
const FOOD_GRADE_HYDR_ID = "compliance-specialty-canonical-food-grade-hydraulic-oil-iso32";
const AGRI_JD_TRANS_ID = "agri-oem-canonical-agrimax-john-deere-trans-drive-hydraulic-green";
const BIO_ROCK_150_ID = "compliance-specialty-canonical-bio-rock-drill-oil-iso150";
const BIO_EAL_32_ID = "compliance-specialty-canonical-bio-synthetic-eal-hydraulic-iso32";
const GEAR_FS_75W90_ID = "gear-oil-canonical-full-synthetic-gl5-gear-lubricant-75w90";

const REQUIRED_FAMILIES = [
  "agri_oem",
  "compliance_specialty",
  "industrial_specialty_oil",
  "gear_oil",
  "coolant",
  "transmission",
  "hydraulic",
  "grease",
  "hd_engine_oil",
];

const REQUIRED_ACTION_TYPES = [
  "send_product_spotlight",
  "send_category_spotlight",
  "generate_customer_profile",
  "schedule_field_ride",
  "schedule_in_person_training",
  "assign_klondike_university_course",
  "coach_rep",
  "review_product_mix",
];

/** @param {unknown} cond @param {string} [msg] */
function assert(cond, msg) {
  if (!cond) throw new Error(msg || "assertion failed");
}

/** @param {unknown} s */
function norm(s) {
  return String(s ?? "").toLowerCase();
}

/**
 * @param {string} haystack
 * @param {string | RegExp | Array<string | RegExp>} needles
 */
function containsPhrase(haystack, needles) {
  const text = norm(haystack);
  const list = Array.isArray(needles) ? needles : [needles];
  return list.some((n) => {
    if (n instanceof RegExp) return n.test(text);
    return text.includes(norm(n));
  });
}

/**
 * @param {Record<string, unknown>} pkg
 */
function packageTextBundle(pkg) {
  const sections = Array.isArray(pkg.sections) ? pkg.sections : [];
  const sectionText = sections
    .flatMap((s) => {
      const sec = /** @type {{ title?: string, bullets?: string[] }} */ (s);
      return [sec.title, ...(sec.bullets || [])];
    })
    .join(" ");
  const cards = Array.isArray(pkg.productCards) ? pkg.productCards : [];
  const cardText = cards
    .map((c) => {
      const card = /** @type {{ productName?: string, id?: string }} */ (c);
      return `${card.productName} ${card.id}`;
    })
    .join(" ");
  return [
    pkg.title,
    pkg.subtitle,
    pkg.summary,
    pkg.recommendedAction,
    pkg.primaryCTA,
    sectionText,
    cardText,
    ...(Array.isArray(pkg.guardrails) ? pkg.guardrails : []),
    ...(Array.isArray(pkg.sourceNotes) ? pkg.sourceNotes : []),
    ...(Array.isArray(pkg.customerProfileQuestions) ? pkg.customerProfileQuestions : []),
    ...(Array.isArray(pkg.repQuestions) ? pkg.repQuestions : []),
    ...(Array.isArray(pkg.trainingRecommendations) ? pkg.trainingRecommendations : []),
    ...(Array.isArray(pkg.fieldRideRecommendations) ? pkg.fieldRideRecommendations : []),
    (Array.isArray(pkg.sourceProducts) ? pkg.sourceProducts : []).join(" "),
  ].join(" ");
}

/**
 * @param {Array<{ id: string, productName?: string, score?: number }>} matches
 * @param {string | RegExp | string[]} needle
 */
function searchMatchesInclude(matches, needle) {
  const ids = matches.map((m) => m.id).join(" ");
  const names = matches.map((m) => m.productName || "").join(" ");
  const hay = `${ids} ${names}`;
  return containsPhrase(hay, needle);
}

/**
 * @param {Array<{ action: string, reason?: string }>} actions
 * @param {string} actionType
 */
function actionsInclude(actions, actionType) {
  return actions.some((a) => a.action === actionType);
}

/**
 * @param {Array<{ action: string, reason?: string }>} actions
 * @param {string | RegExp | string[]} needle
 */
function anyActionReasonMatches(actions, needle) {
  const text = actions.map((a) => `${a.action} ${a.reason || ""}`).join(" ");
  return containsPhrase(text, needle);
}

console.log("\nSpotlight assembly engine smoke tests\n" + "=".repeat(56));

let passed = 0;
let runnable = 0;

function pass(line) {
  console.log(`PASS  ${line}`);
  passed += 1;
  runnable += 1;
}

try {
  assert(typeof SPOTLIGHT_ASSEMBLY_ENGINE_VERSION === "number" && SPOTLIGHT_ASSEMBLY_ENGINE_VERSION >= 1);
  for (const action of REQUIRED_ACTION_TYPES) {
    assert(SPOTLIGHT_ACTION_TYPES.includes(action), `missing action type ${action}`);
  }
  assert(SPOTLIGHT_AUDIENCES.length >= 5);
  assert(SPOTLIGHT_PACKAGE_TYPES.length >= 6);
  pass("engine exports (version, action types, audiences, package types)");

  const catalog = listAvailableCanonicalProducts();
  assert(catalog.length > 0, "catalog must be non-empty");
  for (const family of REQUIRED_FAMILIES) {
    assert(
      catalog.some((p) => p.canonicalFamily === family),
      `catalog missing family ${family}`
    );
  }
  pass(`catalog flatten (${catalog.length} products, all ${REQUIRED_FAMILIES.length} families)`);

  {
    const m = findCanonicalProductsForEnablement("food grade hydraulic");
    assert(m.length > 0, "food grade hydraulic search returned no matches");
    assert(
      searchMatchesInclude(m, [FOOD_GRADE_HYDR_ID, "food grade hydraulic", "food-grade"]),
      `food grade hydraulic: expected Food Grade Hydraulic in results, got ${m.slice(0, 3).map((x) => x.id).join(",")}`
    );
  }
  pass('findCanonicalProductsForEnablement("food grade hydraulic")');

  {
    const m = findCanonicalProductsForEnablement("AGRIMAX John Deere J20C");
    assert(m.length > 0);
    assert(
      searchMatchesInclude(m, [AGRI_JD_TRANS_ID, "agrimax", "trans drive", "john deere"]),
      `AGRIMAX J20C: expected John Deere trans drive, got ${m.slice(0, 3).map((x) => x.id).join(",")}`
    );
  }
  pass('findCanonicalProductsForEnablement("AGRIMAX John Deere J20C")');

  {
    const m = findCanonicalProductsForEnablement("bar and chain forestry");
    assert(m.length > 0);
    assert(
      searchMatchesInclude(m, ["bar-chain", "bar and chain", "forestry"]),
      `bar and chain forestry: expected bar/chain product, got ${m.slice(0, 3).map((x) => x.id).join(",")}`
    );
  }
  pass('findCanonicalProductsForEnablement("bar and chain forestry")');

  {
    const m = findCanonicalProductsForEnablement("BIO-Synthetic EAL VGP");
    assert(m.length > 0);
    assert(
      searchMatchesInclude(m, [BIO_EAL_32_ID, "bio synthetic", "eal", "vgp"]),
      `BIO-Synthetic EAL VGP: expected EAL product, got ${m.slice(0, 3).map((x) => x.id).join(",")}`
    );
  }
  pass('findCanonicalProductsForEnablement("BIO-Synthetic EAL VGP")');

  {
    const m = findCanonicalProductsForEnablement("75W-90 limited slip");
    assert(m.length > 0);
    assert(
      searchMatchesInclude(m, [GEAR_FS_75W90_ID, "75w 90", "limited slip", "gl-5"]),
      `75W-90 limited slip: expected GL-5 gear, got ${m.slice(0, 3).map((x) => x.id).join(",")}`
    );
  }
  pass('findCanonicalProductsForEnablement("75W-90 limited slip")');

  {
    const pkg = buildProductSpotlightPackage({
      packageType: "product_spotlight",
      productIds: [FOOD_GRADE_GREASE_ID],
    });
    assert(pkg.ok === true, `product spotlight ok=false reason=${pkg.reason}`);
    assert(norm(pkg.packageType) === "product_spotlight");
    assert(nonEmpty(pkg.title));
    assert(Array.isArray(pkg.productCards) && pkg.productCards.length > 0);
    const sections = /** @type {Array<{ title?: string, bullets?: string[] }>} */ (pkg.sections || []);
    assert(sections.length > 0);
    const sectionTitles = sections.map((s) => norm(s.title)).join(" ");
    assert(
      containsPhrase(sectionTitles, ["spec", "approval", "registration", "proof"]),
      "product spotlight sections should cover specs/approvals/registrations"
    );
    assert(
      (Array.isArray(pkg.repQuestions) && pkg.repQuestions.length > 0) ||
        (Array.isArray(pkg.customerProfileQuestions) && pkg.customerProfileQuestions.length > 0),
      "product spotlight should include rep or customer questions"
    );
    const bundle = packageTextBundle(pkg);
    assert(
      containsPhrase(bundle, ["food grade", "nsf", "163515", "guardrail", "caution"]),
      "product spotlight should preserve food-grade compliance / cautions / guardrails"
    );
    assert(
      (Array.isArray(pkg.sourceProducts) ? pkg.sourceProducts : []).includes(FOOD_GRADE_GREASE_ID),
      `sourceProducts should include ${FOOD_GRADE_GREASE_ID}`
    );
  }
  pass("buildProductSpotlightPackage Food Grade EP-2 Grease");

  {
    const pkg = buildCategorySpotlightPackage({
      packageType: "category_spotlight",
      category: "Food Grade",
      customerProfileSignals: ["food processing", "brewery", "bakery"],
    });
    assert(pkg.ok === true, `category spotlight failed: ${pkg.reason}`);
    assert(norm(pkg.packageType) === "category_spotlight");
    assert(nonEmpty(pkg.recommendedAction));
    assert(Array.isArray(pkg.sections) && pkg.sections.length > 0);
    const cardHay = (pkg.productCards || [])
      .map((c) => /** @type {{ id?: string, productName?: string }} */ (c).productName || "")
      .join(" ");
    assert(
      containsPhrase(cardHay, ["food grade", "food-grade", FOOD_GRADE_GREASE_ID, FOOD_GRADE_HYDR_ID]),
      `category spotlight productCards should include food-grade products, got ${cardHay}`
    );
    const bundle = packageTextBundle(pkg);
    assert(
      containsPhrase(bundle, ["food processing", "brewery", "bakery", "food grade"]),
      "category spotlight should reflect food processing / brewery / bakery signals"
    );
  }
  pass("buildCategorySpotlightPackage Food Grade category");

  {
    const pkg = buildCustomerProfilePackage({
      packageType: "customer_profile",
      accountContext: {
        dealerName: "Demo Ag Dealer",
        industries: ["agriculture", "John Deere"],
        knownProductLines: ["hydraulic"],
        missingProductLines: ["AGRIMAX"],
        opportunitySignals: ["JDM J20C", "COOL GARD II", "PLUS 50 II"],
      },
    });
    assert(pkg.ok === true, `customer profile failed: ${pkg.reason}`);
    assert(norm(pkg.packageType) === "customer_profile");
    assert(
      containsPhrase(packageTextBundle(pkg), ["customer profile", "demo ag dealer", "dealer"]),
      "customer profile title/body should reference profile or dealer"
    );
    const bundle = packageTextBundle(pkg);
    assert(
      containsPhrase(bundle, ["agrimax", "john deere", "j20c", "cool gard", "plus 50", AGRI_JD_TRANS_ID]),
      "customer profile should suggest AGRIMAX / John Deere-aligned products"
    );
    assert(
      Array.isArray(pkg.customerProfileQuestions) && pkg.customerProfileQuestions.length > 0,
      "customerProfileQuestions must be non-empty"
    );
    const sources = [
      ...(Array.isArray(pkg.sourceProducts) ? pkg.sourceProducts : []),
      ...(pkg.productCards || []).map((c) => /** @type {{ id?: string }} */ (c).id || ""),
    ].join(" ");
    assert(
      sources.includes("agri-oem-canonical-"),
      `expected at least one Ag OEM product in sourceProducts/cards, got ${sources}`
    );
  }
  pass("buildCustomerProfilePackage Demo Ag Dealer");

  {
    const pkg = buildRepCoachingBrief({
      packageType: "rep_coaching",
      productIds: [BIO_ROCK_150_ID],
    });
    assert(pkg.ok === true, `rep coaching failed: ${pkg.reason}`);
    assert(norm(pkg.packageType) === "rep_coaching");
    assert(Array.isArray(pkg.repQuestions) && pkg.repQuestions.length > 0);
    assert(
      (Array.isArray(pkg.operationalPainPoints) && pkg.operationalPainPoints.length > 0) ||
        (Array.isArray(pkg.salesAngles) && pkg.salesAngles.length > 0),
      "rep coaching needs operationalPainPoints or salesAngles"
    );
    const bundle = packageTextBundle(pkg);
    assert(
      containsPhrase(bundle, ["caution", "guardrail", "source", "rock drill", "bio"]),
      "rep coaching should include cautions/source notes when available"
    );
    assert(
      (Array.isArray(pkg.sourceProducts) ? pkg.sourceProducts : []).includes(BIO_ROCK_150_ID),
      `sourceProducts should include ${BIO_ROCK_150_ID}`
    );
  }
  pass("buildRepCoachingBrief BIO Rock Drill ISO 150");

  {
    const pkg = buildTrainingRecommendationPackage({
      packageType: "training_recommendation",
      category: "EAL Hydraulic",
      customerProfileSignals: ["marine", "dredging", "environmentally sensitive"],
    });
    assert(pkg.ok === true, `training recommendation failed: ${pkg.reason}`);
    assert(norm(pkg.packageType) === "training_recommendation");
    assert(Array.isArray(pkg.trainingRecommendations) && pkg.trainingRecommendations.length > 0);
    const bundle = packageTextBundle(pkg);
    assert(
      containsPhrase(bundle, ["training", "course", "university", "klondike"]),
      "training package should mention training or Klondike University"
    );
    const sources = [
      ...(Array.isArray(pkg.sourceProducts) ? pkg.sourceProducts : []),
      ...(pkg.productCards || []).map((c) => /** @type {{ id?: string }} */ (c).id || ""),
    ].join(" ");
    assert(
      containsPhrase(sources, ["compliance-specialty-canonical", "bio", "eal", "enviro"]),
      "training scope should include environmental/EAL hydraulic products"
    );
  }
  pass("buildTrainingRecommendationPackage EAL / environmental");

  {
    const pkg = buildFieldRideRecommendationPackage({
      packageType: "field_ride_recommendation",
      performanceContext: {
        revenueTrend: "declining",
        quoteTrend: "low",
        productLineTrend: "declining hydraulic activity",
        missingCategories: ["gear oil", "grease"],
      },
      accountContext: {
        dealerName: "Demo Dealer",
        industries: ["construction", "mining"],
      },
    });
    assert(pkg.ok === true, `field ride failed: ${pkg.reason}`);
    assert(norm(pkg.packageType) === "field_ride_recommendation");
    assert(Array.isArray(pkg.fieldRideRecommendations) && pkg.fieldRideRecommendations.length > 0);
    const bundle = packageTextBundle(pkg);
    assert(
      containsPhrase(bundle, ["field ride", "schedule"]),
      "field ride package should mention field ride in action or CTA"
    );
    const sectionTitles = (pkg.sections || [])
      .map((s) => norm(/** @type {{ title?: string }} */ (s).title))
      .join(" ");
    assert(
      containsPhrase(sectionTitles, ["observe", "discovery", "outcome", "target", "why"]),
      "field ride sections should cover observation / discovery / outcome"
    );
  }
  pass("buildFieldRideRecommendationPackage declining activity");

  {
    const actions = buildRecommendedEnablementActions({
      accountContext: {
        industries: ["food processing", "brewery"],
        missingProductLines: ["Food Grade"],
      },
    });
    assert(actions.length > 0);
    assert(
      actionsInclude(actions, "send_product_spotlight") || actionsInclude(actions, "send_category_spotlight"),
      `food processing actions: expected spotlight action, got ${actions.map((a) => a.action).join(",")}`
    );
    assert(
      anyActionReasonMatches(actions, ["food grade", "food processing", "nsf"]),
      "food processing actions should mention Food Grade or food processing in reason"
    );
  }
  pass("buildRecommendedEnablementActions food processing gap");

  {
    const actions = buildRecommendedEnablementActions({
      accountContext: {
        industries: ["agriculture", "John Deere"],
        opportunitySignals: ["JDM J20C", "COOL GARD II", "PLUS 50 II"],
        missingProductLines: ["AGRIMAX"],
      },
    });
    assert(actionsInclude(actions, "generate_customer_profile"));
    assert(
      actionsInclude(actions, "send_product_spotlight") || actionsInclude(actions, "send_category_spotlight"),
      "Deere signals should recommend spotlight or category action"
    );
    assert(
      anyActionReasonMatches(actions, ["agrimax", "john deere", "deere", "j20c", "cool gard"]),
      "Deere/AGRIMAX actions should mention AGRIMAX or John Deere in reason"
    );
  }
  pass("buildRecommendedEnablementActions Deere / AGRIMAX gap");

  {
    const actions = buildRecommendedEnablementActions({
      performanceContext: {
        revenueTrend: "declining",
        quoteTrend: "low",
        productLineTrend: "narrow quoting",
      },
      accountContext: {
        performanceSignals: ["low rep activity"],
      },
    });
    assert(actionsInclude(actions, "schedule_field_ride"));
    assert(
      actionsInclude(actions, "assign_klondike_university_course") ||
        actionsInclude(actions, "schedule_in_person_training") ||
        actionsInclude(actions, "coach_rep"),
      `declining activity: expected training/coaching action, got ${actions.map((a) => a.action).join(",")}`
    );
  }
  pass("buildRecommendedEnablementActions declining / low activity");

  {
    const direct = buildProductSpotlightPackage({
      packageType: "product_spotlight",
      productIds: [FOOD_GRADE_GREASE_ID],
    });
    assert(direct.ok === true, `direct product_spotlight failed: ${direct.reason}`);
    const dispatched = buildSalesEnablementPackage({
      packageType: "product_spotlight",
      productIds: [FOOD_GRADE_GREASE_ID],
    });
    assert(dispatched.ok === true, `dispatched product_spotlight failed: ${dispatched.reason}`);
    assert(
      containsPhrase(norm(dispatched.packageType), ["product", "spotlight"]),
      `packageType should be product spotlight, got ${dispatched.packageType}`
    );
    assert(nonEmpty(dispatched.title), "dispatched title missing");
    assert(Array.isArray(dispatched.sections) && dispatched.sections.length > 0, "dispatched sections empty");
  }
  pass("buildSalesEnablementPackage product_spotlight dispatcher");

  {
    const profilePkg = buildSalesEnablementPackage({
      packageType: "customer_profile",
      customerProfileSignals: ["AGRIMAX", "John Deere", "JDM J20C"],
      accountContext: {
        dealerName: "Dispatcher Test Dealer",
        opportunitySignals: ["AGRIMAX", "John Deere"],
      },
    });
    assert(profilePkg.ok === true, `dispatched customer_profile failed: ${profilePkg.reason}`);
    assert(
      containsPhrase(norm(profilePkg.packageType), ["customer", "profile"]),
      `packageType should be customer profile, got ${profilePkg.packageType}`
    );
  }
  pass("buildSalesEnablementPackage customer_profile dispatcher");

  {
    const unknown = buildSalesEnablementPackage({
      packageType: "unknown_package_type_xyz",
      productIds: ["missing-product-id"],
    });
    assert(
      unknown.ok === false,
      `unknown packageType should fall back to empty product_spotlight (ok false), got ok=${unknown.ok} reason=${unknown.reason}`
    );
    assert(
      nonEmpty(unknown.reason) || (Array.isArray(unknown.suggestions) && unknown.suggestions.length > 0),
      "missing product should return reason or suggestions"
    );
  }
  pass("buildSalesEnablementPackage unknown packageType safe fallback");

  {
    const empty = buildProductSpotlightPackage({ productIds: ["missing-product-id-zzzz"] });
    assert(empty.ok === false, `expected ok false for missing product id, got ok=${empty.ok}`);
    assert(
      containsPhrase(String(empty.reason || ""), "no matching") ||
        (Array.isArray(empty.suggestions) && empty.suggestions.length > 0),
      `missing product should return reason and suggestions, reason=${empty.reason}`
    );

    const noSearch = findCanonicalProductsForEnablement("qqqxklndikezzznomatch999888777");
    assert(
      Array.isArray(noSearch) && noSearch.length === 0,
      `no-match search should return empty array, got ${noSearch.length} hits: ${noSearch.slice(0, 3).map((m) => m.id).join(",")}`
    );
  }
  pass("empty / no-match behavior");

  console.log("=".repeat(56));
  console.log(`Spotlight assembly engine smoke tests: ${passed}/${runnable} PASS\n`);
  if (passed !== runnable) {
    throw new Error(`expected all runnable tests to pass (${passed}/${runnable})`);
  }
} catch (e) {
  console.log(`FAIL  ${e instanceof Error ? e.message : e}`);
  console.log("=".repeat(56));
  console.log(`Spotlight assembly engine smoke tests: ${passed}/${runnable} PASS (with failures)\n`);
  process.exitCode = 1;
}

/** @param {unknown} v */
function nonEmpty(v) {
  return typeof v === "string" && v.trim().length > 0;
}

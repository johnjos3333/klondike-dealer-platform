/**
 * Deterministic recommendation advisor helpers — intent detection and advisor responses.
 * Plain JavaScript only; not wired to UI yet.
 */

import {
  DETERMINISTIC_RECOMMENDATION_KNOWLEDGE,
  getDeterministicRecommendationProfileById,
  listDeterministicRecommendationProfiles,
} from "../data/deterministicRecommendationKnowledge.js";

const MATCH_THRESHOLD = 8;
const AMBIGUOUS_SCORE_GAP = 5;

/** Recommendation-style questions (boost routing when present). */
const RECOMMENDATION_REQUEST_RE =
  /\b(what should i (recommend|use|suggest)|what (product|fluid|grease|oil) should|best product for|recommend for|which (product|fluid|grease|oil)|what do you recommend|suggest a (product|fluid|grease|oil)|help me (pick|choose)|what to use for|what would you (recommend|use)|recommendation for)\b/;

/**
 * Defer when query reads as explicit product identity or troubleshooting (orchestrator should win later).
 * Scenario-heavy phrases can still match when score is strong enough without recommend cue.
 */
const DEFER_TO_PRODUCT_OR_TROUBLESHOOTING_RE =
  /\b(what is|what are|explain|define|who makes|tell me about)\b.*\b(grease|oil|fluid|nano|moly|xvi|utf)\b|\b(why is my|chatter after|after top off|cavitat|foaming|drift|varnish in|filter plug|pump whine|troubleshoot|failure mode|broken pump|noise when|milky hydraulic)\b/;

/**
 * @type {ReadonlyArray<{ profileId: string, phrases: readonly string[], weight?: number }>}
 */
const RECOMMENDATION_INTENT_INDEX = Object.freeze([
  { profileId: "severeColdHydraulics", phrases: ["severe cold", "cold hydraulics", "cold startup", "winter hydraulics", "first shift slow"] },
  { profileId: "wetEnvironmentGrease", phrases: ["wet environment", "wet pins", "washout", "water spray grease", "wet bushings"] },
  { profileId: "crusherShockLoad", phrases: ["crusher pins", "crusher grease", "hammer mill grease", "shock load grease"] },
  { profileId: "commonSumpWetBrake", phrases: ["common sump", "wet brake fluid", "utto", "tractor fluid", "utf program"] },
  { profileId: "seasonalFluidReduction", phrases: ["seasonal swap", "seasonal swaps", "seasonal fluid", "reduce seasonal", "one drum season"] },
  { profileId: "highTemperatureHydraulics", phrases: ["high temperature hydraulic", "hot hydraulic", "hydraulic overheating program"] },
  { profileId: "contaminationControl", phrases: ["contamination control", "cleanliness program", "filter program hydraulic"] },
  { profileId: "quarryFleet", phrases: ["quarry", "quarry in winter", "quarry fleet", "aggregate fleet"] },
  { profileId: "forestryEquipment", phrases: ["forestry", "skidder", "harvester lube", "bush equipment"] },
  { profileId: "miningEquipment", phrases: ["mining equipment", "mining fleet", "shovel hydraulic", "haul truck hydraulic"] },
  { profileId: "agriculturalEquipment", phrases: ["agricultural", "farm tractor fluid", "ag equipment", "planting season fluid"] },
  { profileId: "compressorReliability", phrases: ["compressor oil", "screw compressor", "air compressor fluid", "compressor reliability"] },
  { profileId: "turbineReliability", phrases: ["turbine oil", "turbine reliability", "steam turbine oil", "gas turbine oil"] },
  { profileId: "severeDutyPinsBushings", phrases: ["severe duty pins", "pins and bushings", "loader pins", "excavator pins"] },
  { profileId: "autoLubeColdWeather", phrases: ["auto lube cold", "centralized lube cold", "autolube winter", "feeder grease cold"] },
  { profileId: "highLoadMolyApplications", phrases: ["high load moly", "moly ep", "3% moly", "moly tac application"] },
  { profileId: "foodGradePlant", phrases: ["food grade plant", "food plant lube", "h1 hydraulic", "nsf h1", "food processing lube"] },
  {
    profileId: "biodegradableHydraulics",
    phrases: ["biodegradable hydraulic", "enviro hydraulic", "eal hydraulic", "spill sensitive hydraulic", "bio hydraulic"],
  },
]);

/** @param {unknown} raw */
function normalizeRecommendationText(raw) {
  return String(raw ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9#]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** @param {unknown} query */
function tokenizeRecommendationQuery(query) {
  const n = normalizeRecommendationText(query);
  if (!n) return [];
  return [...new Set(n.split(" ").filter((t) => t.length >= 2))].slice(0, 36);
}

/** @param {string} camel */
function camelToWords(camel) {
  return String(camel || "")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .toLowerCase();
}

/** @param {string} normalizedInput */
function hasRecommendationRequestCue(normalizedInput) {
  return RECOMMENDATION_REQUEST_RE.test(normalizedInput);
}

/**
 * @param {string} normalizedInput
 * @param {number} topScore
 */
function shouldDeferRecommendationRouting(normalizedInput, topScore) {
  if (hasRecommendationRequestCue(normalizedInput)) return false;
  if (DEFER_TO_PRODUCT_OR_TROUBLESHOOTING_RE.test(normalizedInput)) return true;
  if (/^(what is|what are|explain|define)\b/.test(normalizedInput)) return true;
  if (topScore < 16) return true;
  return false;
}

/**
 * @param {import("../data/deterministicRecommendationKnowledge.js").DeterministicRecommendationProfile} profile
 * @param {string} normalizedInput
 * @param {string[]} tokens
 * @param {boolean} hasRecommendCue
 */
function scoreRecommendationProfileMatch(profile, normalizedInput, tokens, hasRecommendCue) {
  let score = 0;
  /** @type {string[]} */
  const matchedKeywords = [];

  if (hasRecommendCue) {
    score += 12;
    matchedKeywords.push("recommendation_request");
  }

  const idPhrase = normalizeRecommendationText(camelToWords(profile.id));
  if (idPhrase && normalizedInput.includes(idPhrase)) {
    score += 10 + Math.min(idPhrase.length, 18);
    matchedKeywords.push(idPhrase);
  }

  const scenarioNorm = normalizeRecommendationText(profile.operatingScenario);
  if (scenarioNorm.length >= 16) {
    for (const entry of RECOMMENDATION_INTENT_INDEX) {
      if (entry.profileId !== profile.id) continue;
      for (const phrase of entry.phrases) {
        const phraseNorm = normalizeRecommendationText(phrase);
        if (phraseNorm && normalizedInput.includes(phraseNorm)) {
          score += 11 + Math.min(phraseNorm.length, 16) + (entry.weight ?? 0);
          matchedKeywords.push(phrase);
        }
      }
    }
  }

  for (const flagship of profile.flagshipRecommendations || []) {
    const flagNorm = normalizeRecommendationText(flagship);
    if (flagNorm.length >= 12 && normalizedInput.includes(flagNorm.slice(0, Math.min(28, flagNorm.length)))) {
      score += 4;
    }
  }

  for (const token of tokens) {
    if (!token) continue;
    if (scenarioNorm.includes(token) && token.length >= 4) score += 2 + token.length;
    if (idPhrase.includes(token) && token.length >= 4) score += 3 + token.length;
  }

  return { score, matchedKeywords: [...new Set(matchedKeywords)] };
}

/**
 * @param {number} topScore
 * @param {number} secondScore
 * @param {boolean} deferred
 * @returns {"exact" | "likely" | "ambiguous" | "none"}
 */
function confidenceFromScores(topScore, secondScore, deferred) {
  if (deferred || topScore < MATCH_THRESHOLD) return "none";
  if (topScore >= 26) return "exact";
  if (secondScore >= MATCH_THRESHOLD && topScore - secondScore < AMBIGUOUS_SCORE_GAP) return "ambiguous";
  if (topScore >= 14) return "likely";
  return "likely";
}

/**
 * @param {unknown} inputText
 * @returns {{
 *   profileId: string | null,
 *   confidence: "exact" | "likely" | "ambiguous" | "none",
 *   matches: Array<{
 *     profileId: string,
 *     operatingScenario: string,
 *     score: number,
 *     matchedKeywords: string[],
 *   }>,
 *   message: string,
 * }}
 */
export function detectDeterministicRecommendationIntent(inputText) {
  const question = String(inputText ?? "").trim();
  const normalizedInput = normalizeRecommendationText(question);

  if (!normalizedInput) {
    return {
      profileId: null,
      confidence: "none",
      matches: [],
      message: "Empty query.",
    };
  }

  const tokens = tokenizeRecommendationQuery(question);
  const hasRecommendCue = hasRecommendationRequestCue(normalizedInput);
  /** @type {ReturnType<typeof detectDeterministicRecommendationIntent>["matches"]} */
  const matches = [];

  for (const profile of listDeterministicRecommendationProfiles()) {
    const { score, matchedKeywords } = scoreRecommendationProfileMatch(
      profile,
      normalizedInput,
      tokens,
      hasRecommendCue
    );
    if (score < MATCH_THRESHOLD) continue;
    matches.push({
      profileId: profile.id,
      operatingScenario: profile.operatingScenario,
      score,
      matchedKeywords,
    });
  }

  matches.sort((a, b) => b.score - a.score);

  const top = matches[0];
  const second = matches[1];
  const deferred = shouldDeferRecommendationRouting(normalizedInput, top?.score ?? 0);
  const confidence = confidenceFromScores(top?.score ?? 0, second?.score ?? 0, deferred);
  const profileId = confidence === "none" ? null : top?.profileId ?? null;

  let message = "";
  if (deferred && !hasRecommendCue) {
    message =
      "Query reads as product identity or troubleshooting—defer to product entity or troubleshooting brains unless a recommendation scenario is explicit.";
  } else if (confidence === "none") {
    message =
      "No indexed recommendation profile matched. Try 'what should I recommend for…' with quarry, wet pins, common sump, seasonal fluid, food grade, or biodegradable hydraulic.";
  } else if (confidence === "ambiguous") {
    message = `Multiple recommendation scenarios may apply (${matches
      .slice(0, 3)
      .map((m) => m.profileId)
      .join(", ")}). Confirm equipment, OEM tag, and operating conditions.`;
  } else {
    message = `Matched recommendation profile: ${top.profileId}.`;
  }

  return { profileId, confidence, matches, message };
}

/**
 * @param {unknown} inputTextOrKey
 * @returns {import("../data/deterministicRecommendationKnowledge.js").DeterministicRecommendationProfile | null}
 */
export function getDeterministicRecommendationProfile(inputTextOrKey) {
  const raw = String(inputTextOrKey ?? "").trim();
  if (!raw) return null;

  const byId = getDeterministicRecommendationProfileById(raw);
  if (byId) return byId;

  const normalizedKey = normalizeRecommendationText(raw).replace(/\s+/g, "");
  for (const profile of listDeterministicRecommendationProfiles()) {
    if (normalizeRecommendationText(profile.id) === normalizedKey) return profile;
    if (normalizeRecommendationText(camelToWords(profile.id)) === normalizeRecommendationText(raw)) return profile;
  }

  const detected = detectDeterministicRecommendationIntent(raw);
  if (!detected.profileId || detected.confidence === "none") return null;
  return getDeterministicRecommendationProfileById(detected.profileId);
}

/**
 * @param {string} id
 * @param {string} title
 * @param {string} [body]
 * @param {string[]} [items]
 */
function section(id, title, body, items) {
  return {
    id,
    title,
    ...(body ? { body } : {}),
    ...(items?.length ? { items } : {}),
  };
}

/** @param {string[]} arr */
function uniqStrings(arr) {
  const seen = new Set();
  /** @type {string[]} */
  const out = [];
  for (const s of arr) {
    const t = String(s ?? "").trim();
    if (!t || seen.has(t)) continue;
    seen.add(t);
    out.push(t);
  }
  return out;
}

/**
 * @param {import("../data/deterministicRecommendationKnowledge.js").DeterministicRecommendationProfile} profile
 */
function formatProductItems(profile) {
  return (profile.possibleKlondikeProducts || []).map((p) => {
    const role = p.role ? ` — ${p.role}` : "";
    return `${p.productName} (indexed: ${p.pdsMapKey})${role}`;
  });
}

/**
 * @param {import("../data/deterministicRecommendationKnowledge.js").DeterministicRecommendationProfile} profile
 */
function buildSectionsFromProfile(profile) {
  const confirmItems = uniqStrings([
    ...(profile.cautionNotes || []),
    "Confirm OEM nameplate, viscosity grade, and fluid category before quoting any KLONDIKE SKU.",
    "Quote only claims supported by the indexed PDS map row for the selected product.",
    "Recommendation direction is not a substitute for in-service analysis or flush procedures when contamination is present.",
  ]);

  return [
    section("recommendedDirection", "Recommended Direction", "", profile.recommendedProductDirection),
    section("whyThisDirectionWorks", "Why This Direction Works", "", profile.whyThisDirectionWorks),
    section("flagshipRecommendations", "Flagship Recommendations", "", profile.flagshipRecommendations),
    section("possibleKlondikeProducts", "Possible KLONDIKE Products", "", formatProductItems(profile)),
    section("upgradeStory", "Upgrade Story", "", profile.upgradeStory),
    section("discoveryQuestions", "Discovery Questions", "", profile.discoveryQuestions),
    section("repTalkTrack", "Rep Talk Track", "", profile.repTalkTrack),
    section("confirmBeforeQuoting", "Confirm Before Quoting", "", confirmItems),
  ].filter((s) => s.body || (s.items && s.items.length > 0));
}

/**
 * @param {ReturnType<typeof detectDeterministicRecommendationIntent>} detected
 */
function recommendationOrchestratorConfidence(detected) {
  const topScore = detected.matches[0]?.score || 0;
  if (detected.confidence === "exact") return Math.min(0.95, 0.76 + topScore / 52);
  if (detected.confidence === "likely") return Math.min(0.88, 0.56 + topScore / 52);
  if (detected.confidence === "ambiguous") return Math.min(0.72, 0.42 + topScore / 60);
  return 0;
}

/**
 * @param {unknown} inputText
 * @returns {{
 *   ok: boolean,
 *   profileId: string | null,
 *   confidence: "exact" | "likely" | "ambiguous" | "none",
 *   title: string,
 *   directAnswer: string,
 *   sections: Array<{ id: string, title: string, body?: string, items?: string[] }>,
 *   followUpQuestions: string[],
 *   sourceBadges: string[],
 *   cautionNotes: string[],
 *   message: string,
 * }}
 */
export function buildDeterministicRecommendationResponse(inputText) {
  const question = String(inputText ?? "").trim();
  const empty = {
    ok: false,
    profileId: null,
    confidence: /** @type {const} */ ("none"),
    title: "Product recommendation",
    directAnswer: "",
    sections: [],
    followUpQuestions: [],
    sourceBadges: [
      "Deterministic recommendation intelligence",
      `Knowledge v${DETERMINISTIC_RECOMMENDATION_KNOWLEDGE.version}`,
    ],
    cautionNotes: [
      "Confirm OEM requirements and indexed PDS title block before quoting.",
    ],
    message: "",
  };

  if (!question) {
    return {
      ...empty,
      directAnswer:
        "Describe the operating scenario (equipment, environment, temperature, load) or ask what you should recommend for a duty such as quarry winter hydraulics, wet pins, common sump UTF, or food-grade plant service.",
      message: "Empty query.",
    };
  }

  const detected = detectDeterministicRecommendationIntent(question);
  const { confidence, matches, message: detectMessage } = detected;

  if (confidence === "none" || !detected.profileId) {
    return {
      ...empty,
      confidence,
      directAnswer: detectMessage,
      followUpQuestions: [
        "What equipment and OEM fluid specification apply?",
        "What environment, temperature band, and duty cycle matter most?",
        "Is this a new program, upgrade, or troubleshooting recovery?",
      ],
      message: detectMessage,
    };
  }

  const profile = getDeterministicRecommendationProfileById(detected.profileId);
  if (!profile) {
    return {
      ...empty,
      message: "Profile id resolved but data row missing.",
    };
  }

  const directAnswerParts = [
    profile.recommendedProductDirection[0] || profile.operatingScenario,
    profile.flagshipRecommendations[0] ? `Flagship path: ${profile.flagshipRecommendations[0]}` : "",
  ];

  if (confidence === "ambiguous" && matches.length > 1) {
    directAnswerParts.push(
      `Also evaluate: ${matches
        .slice(1, 3)
        .map((m) => m.profileId)
        .join(", ")}.`
    );
  }

  return {
    ok: confidence === "exact" || confidence === "likely",
    profileId: profile.id,
    confidence,
    title: `Recommendation — ${profile.operatingScenario.slice(0, 72)}${profile.operatingScenario.length > 72 ? "…" : ""}`,
    directAnswer: directAnswerParts.filter(Boolean).join(" "),
    sections: buildSectionsFromProfile(profile),
    followUpQuestions: uniqStrings(profile.discoveryQuestions || []).slice(0, 8),
    sourceBadges: uniqStrings([
      "Deterministic recommendation intelligence",
      "Canonical product hierarchy",
      `Knowledge v${DETERMINISTIC_RECOMMENDATION_KNOWLEDGE.version}`,
      `Profile: ${profile.id}`,
    ]),
    cautionNotes: uniqStrings(profile.cautionNotes || []),
    message: detectMessage,
  };
}

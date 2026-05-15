/**
 * Hydraulic troubleshooting advisor helpers — deterministic intent detection and responses.
 * Plain JavaScript only; not wired to UI yet.
 */

import {
  HYDRAULIC_TROUBLESHOOTING_KNOWLEDGE,
  getHydraulicTroubleshootingProfileById,
  listHydraulicTroubleshootingProfiles,
} from "../data/hydraulicTroubleshootingKnowledge.js";

const MATCH_THRESHOLD = 6;
const AMBIGUOUS_SCORE_GAP = 4;

/** @type {readonly string[]} */
const HYDRAULIC_CONTEXT_CUES = Object.freeze([
  "hydraulic",
  "hydraulics",
  "pump",
  "reservoir",
  "cylinder",
  "iso vg",
  "aw hydraulic",
  "utf",
  "tractor fluid",
  "wet brake",
  "implement",
  "boom",
  "relief valve",
  "case drain",
]);

/**
 * Indexed phrase → profile id (longer phrases first within each profile scan).
 * @type {ReadonlyArray<{ profileId: string, phrases: readonly string[], weight?: number }>}
 */
const HYDRAULIC_TROUBLESHOOTING_INTENT_INDEX = Object.freeze([
  { profileId: "cavitation", phrases: ["cavitation", "cavitate", "cavitating", "inlet starvation", "suction side air"] },
  {
    profileId: "wetBrakeChatter",
    phrases: ["wet brake chatter", "wet brake squeal", "brake chatter", "utf chatter", "pedal chatter", "wet brake noise"],
  },
  { profileId: "foaming", phrases: ["foaming", "foam in hydraulic", "foam in reservoir", "hydraulic foam", "aerated reservoir"] },
  {
    profileId: "hydraulicWhine",
    phrases: ["hydraulic whine", "whining pump", "pump whine", "high pitched hydraulic", "hydraulic scream", "pump noise", "pump screaming"],
    weight: 1,
  },
  {
    profileId: "hydraulicOverheating",
    phrases: ["hydraulic overheating", "overheating hydraulic", "hot hydraulic oil", "hydraulic running hot", "fluid running hot"],
  },
  { profileId: "airEntrapment", phrases: ["air entrainment", "air entrapment", "air in hydraulic", "spongy hydraulic", "compressible hydraulic"] },
  {
    profileId: "sluggishColdStartup",
    phrases: ["sluggish cold startup", "slow hydraulics cold", "cold start hydraulic", "slow morning hydraulics", "cold sluggish"],
  },
  {
    profileId: "oxidationVarnish",
    phrases: ["varnish", "oxidized hydraulic", "oxidation varnish", "hydraulic sludge", "dark hydraulic oil", "sticky spool"],
  },
  {
    profileId: "contamination",
    phrases: ["contaminated hydraulic", "dirty hydraulic", "particle contamination", "hydraulic contamination"],
  },
  {
    profileId: "waterIngress",
    phrases: ["water in hydraulic", "water in hydraulic oil", "milky hydraulic", "water contamination hydraulic", "emulsion hydraulic"],
  },
  {
    profileId: "filterPlugging",
    phrases: ["filter plugging", "clogged hydraulic filter", "filter plugged", "delta p filter", "filter bypass hydraulic"],
  },
  {
    profileId: "sealShrinkage",
    phrases: ["seal shrinkage", "seal leak hydraulic", "weeping seal", "leak after fluid change"],
  },
  { profileId: "cylinderDrift", phrases: ["cylinder drift", "load drop hydraulic", "cannot hold position", "drifting cylinder"] },
  { profileId: "erraticHydraulics", phrases: ["erratic hydraulics", "jerky hydraulics", "hunting pressure", "pressure swings hydraulic"] },
  {
    profileId: "pumpWear",
    phrases: ["pump wear", "worn hydraulic pump", "case drain flow", "low flow pump", "pump scoring"],
    weight: 1,
  },
  { profileId: "viscosityTooHeavy", phrases: ["viscosity too heavy", "too thick hydraulic", "heavy hydraulic oil", "iso too high"] },
  { profileId: "viscosityTooLight", phrases: ["viscosity too light", "too thin hydraulic", "light hydraulic oil hot", "iso too low"] },
  {
    profileId: "seasonalFluidMismatch",
    phrases: ["seasonal fluid", "seasonal fluid issue", "wrong seasonal oil", "winter fluid in summer", "summer fluid in winter", "seasonal hydraulic"],
  },
]);

/** Mechanical / safety escalation cues in operator language. */
const MECHANICAL_ESCALATION_RE =
  /\b(metal debris|metal in oil|pump failure|failed pump|case drain|uncommanded motion|safety interlock|scored pump|bearing failure|immediate stop|stop use)\b/;

/** Severe contamination escalation cues. */
const SEVERE_CONTAMINATION_RE =
  /\b(milky|chocolate mousse|glitter|metal flakes|water ppm|flood|coolant in hydraulic|emulsion won't clear)\b/;

/** OEM / spec ambiguity cues. */
const OEM_AMBIGUITY_RE =
  /\b(oem unknown|don't know spec|unknown fluid|wrong fluid history|which fluid|what spec|nameplate missing|tag unreadable|mixed fluids unknown)\b/;

/** @param {unknown} raw */
function normalizeHydraulicText(raw) {
  return String(raw ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9#]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** @param {unknown} query */
function tokenizeHydraulicQuery(query) {
  const n = normalizeHydraulicText(query);
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
function hasHydraulicContext(normalizedInput) {
  return HYDRAULIC_CONTEXT_CUES.some((cue) => normalizedInput.includes(cue));
}

/**
 * @param {import("../data/hydraulicTroubleshootingKnowledge.js").HydraulicTroubleshootingProfile} profile
 * @param {string} normalizedInput
 * @param {string[]} tokens
 */
function scoreHydraulicProfileMatch(profile, normalizedInput, tokens) {
  let score = 0;
  /** @type {string[]} */
  const matchedKeywords = [];

  const idPhrase = normalizeHydraulicText(camelToWords(profile.id));
  if (idPhrase && normalizedInput.includes(idPhrase)) {
    score += 12 + Math.min(idPhrase.length, 20);
    matchedKeywords.push(idPhrase);
  }

  const symptomNorm = normalizeHydraulicText(profile.symptom);
  if (symptomNorm.length >= 12 && normalizedInput.includes(symptomNorm)) {
    score += 14 + Math.min(symptomNorm.length, 22);
    matchedKeywords.push(profile.symptom);
  }

  for (const entry of HYDRAULIC_TROUBLESHOOTING_INTENT_INDEX) {
    if (entry.profileId !== profile.id) continue;
    const boost = entry.weight ?? 0;
    for (const phrase of entry.phrases) {
      const phraseNorm = normalizeHydraulicText(phrase);
      if (!phraseNorm) continue;
      if (normalizedInput.includes(phraseNorm)) {
        score += 10 + Math.min(phraseNorm.length, 18) + boost;
        matchedKeywords.push(phrase);
      }
    }
  }

  for (const root of profile.likelyRootCauses || []) {
    const rootNorm = normalizeHydraulicText(root);
    if (rootNorm.length >= 14 && normalizedInput.includes(rootNorm)) {
      score += 5;
    }
  }

  for (const token of tokens) {
    if (!token) continue;
    if (symptomNorm.includes(token)) score += 3 + token.length;
    if (idPhrase.includes(token) && token.length >= 4) score += 4 + token.length;
    for (const entry of HYDRAULIC_TROUBLESHOOTING_INTENT_INDEX) {
      if (entry.profileId !== profile.id) continue;
      for (const phrase of entry.phrases) {
        const phraseNorm = normalizeHydraulicText(phrase);
        if (phraseNorm.includes(token) || (token.length >= 5 && phraseNorm.split(" ").includes(token))) {
          score += 2 + token.length;
          if (!matchedKeywords.includes(phrase)) matchedKeywords.push(phrase);
        }
      }
    }
  }

  if (hasHydraulicContext(normalizedInput)) {
    score += 3;
  }

  return { score, matchedKeywords: [...new Set(matchedKeywords)] };
}

/**
 * @param {number} topScore
 * @param {number} secondScore
 * @returns {"exact" | "likely" | "ambiguous" | "none"}
 */
function confidenceFromScores(topScore, secondScore) {
  if (topScore < MATCH_THRESHOLD) return "none";
  if (topScore >= 22) return "exact";
  if (secondScore >= MATCH_THRESHOLD && topScore - secondScore < AMBIGUOUS_SCORE_GAP) return "ambiguous";
  if (topScore >= 12) return "likely";
  return "likely";
}

/**
 * @param {unknown} inputText
 * @returns {{
 *   profileId: string | null,
 *   confidence: "exact" | "likely" | "ambiguous" | "none",
 *   matches: Array<{
 *     profileId: string,
 *     symptom: string,
 *     score: number,
 *     matchedKeywords: string[],
 *   }>,
 *   message: string,
 * }}
 */
export function detectHydraulicTroubleshootingIntent(inputText) {
  const question = String(inputText ?? "").trim();
  const normalizedInput = normalizeHydraulicText(question);

  if (!normalizedInput) {
    return {
      profileId: null,
      confidence: "none",
      matches: [],
      message: "Empty query.",
    };
  }

  const tokens = tokenizeHydraulicQuery(question);
  /** @type {ReturnType<typeof detectHydraulicTroubleshootingIntent>["matches"]} */
  const matches = [];

  for (const profile of listHydraulicTroubleshootingProfiles()) {
    const { score, matchedKeywords } = scoreHydraulicProfileMatch(profile, normalizedInput, tokens);
    if (score < MATCH_THRESHOLD) continue;
    matches.push({
      profileId: profile.id,
      symptom: profile.symptom,
      score,
      matchedKeywords,
    });
  }

  matches.sort((a, b) => b.score - a.score);

  const top = matches[0];
  const second = matches[1];
  const confidence = confidenceFromScores(top?.score ?? 0, second?.score ?? 0);
  const profileId = confidence === "none" ? null : top?.profileId ?? null;

  let message = "";
  if (confidence === "none") {
    message =
      "No indexed hydraulic troubleshooting profile matched. Try cavitation, wet brake chatter, foaming, sluggish cold startup, varnish, water in hydraulic oil, or seasonal fluid issue.";
  } else if (confidence === "ambiguous") {
    message = `Multiple hydraulic troubleshooting patterns may apply (${matches
      .slice(0, 3)
      .map((m) => m.profileId)
      .join(", ")}). Confirm symptom and OEM fluid class.`;
  } else {
    message = `Matched hydraulic troubleshooting profile: ${top.profileId}.`;
  }

  return { profileId, confidence, matches, message };
}

/**
 * @param {unknown} inputTextOrKey
 * @returns {import("../data/hydraulicTroubleshootingKnowledge.js").HydraulicTroubleshootingProfile | null}
 */
export function getHydraulicTroubleshootingProfile(inputTextOrKey) {
  const raw = String(inputTextOrKey ?? "").trim();
  if (!raw) return null;

  const byId = getHydraulicTroubleshootingProfileById(raw);
  if (byId) return byId;

  const normalizedKey = normalizeHydraulicText(raw).replace(/\s+/g, "");
  for (const profile of listHydraulicTroubleshootingProfiles()) {
    if (normalizeHydraulicText(profile.id) === normalizedKey) return profile;
    if (normalizeHydraulicText(camelToWords(profile.id)) === normalizeHydraulicText(raw)) return profile;
  }

  const detected = detectHydraulicTroubleshootingIntent(raw);
  if (!detected.profileId || detected.confidence === "none") return null;
  return getHydraulicTroubleshootingProfileById(detected.profileId);
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
 * @param {import("../data/hydraulicTroubleshootingKnowledge.js").HydraulicTroubleshootingProfile} profile
 */
function formatProductDirectionItems(profile) {
  return (profile.possibleKlondikeProducts || []).map((p) => {
    const note = p.directionNote ? ` — ${p.directionNote}` : "";
    return `${p.productName} (indexed: ${p.pdsMapKey})${note}`;
  });
}

/**
 * @param {string} question
 * @param {import("../data/hydraulicTroubleshootingKnowledge.js").HydraulicTroubleshootingProfile} profile
 */
function buildEscalationNotes(question, profile) {
  const normQ = normalizeHydraulicText(question);
  /** @type {string[]} */
  const notes = [];

  if (MECHANICAL_ESCALATION_RE.test(normQ)) {
    notes.push(
      "Escalation: possible mechanical failure or safety-critical condition—confirm pump, valve, and load-holding status with OEM service guidance before fluid-only recommendations."
    );
  }
  if (SEVERE_CONTAMINATION_RE.test(normQ)) {
    notes.push(
      "Escalation: severe contamination indicators—stop ingression, plan flush and analysis per OEM; fluid tier change alone is insufficient."
    );
  }
  if (OEM_AMBIGUITY_RE.test(normQ)) {
    notes.push(
      "Escalation: OEM / fluid spec ambiguity—photograph nameplate and confirm MAT/J20/HM/HVLP/ASTM class before quoting KLONDIKE SKU."
    );
  }

  for (const trigger of profile.escalationTriggers || []) {
    const triggerNorm = normalizeHydraulicText(trigger);
    if (triggerNorm.length >= 12 && normQ.includes(triggerNorm.slice(0, Math.min(24, triggerNorm.length)))) {
      notes.push(`Escalation: ${trigger}`);
    }
  }

  return uniqStrings(notes);
}

/**
 * @param {import("../data/hydraulicTroubleshootingKnowledge.js").HydraulicTroubleshootingProfile} profile
 * @param {"exact" | "likely" | "ambiguous" | "none"} confidence
 */
function buildSectionsFromProfile(profile, confidence) {
  const confirmItems = uniqStrings([
    ...(profile.cautionNotes || []),
    ...buildEscalationNotes("", profile).filter((n) => n.startsWith("Escalation:")),
    "Confirm OEM viscosity grade, fluid category (AW vs UTF vs turbine ASTM D4304), and nameplate before bulk change.",
    "Do not recommend AW hydraulic where UTF, wet brake, or dedicated J20 fluid is required.",
    confidence === "ambiguous"
      ? "Multiple symptom patterns may overlap—confirm primary failure mode with field inspection before positioning product."
      : "",
  ]);

  return [
    section("whatItUsuallyMeans", "What It Usually Means", profile.whatItUsuallyMeans),
    section("likelyRootCauses", "Likely Root Causes", "", profile.likelyRootCauses),
    section("fieldInspectionSteps", "Field Inspection Steps", "", profile.fieldInspectionSteps),
    section("fluidRelatedCauses", "Fluid-Related Causes", "", profile.fluidRelatedCauses),
    section("contaminationIndicators", "Contamination Indicators", "", profile.contaminationIndicators),
    section("operationalConsequences", "Operational Consequences", "", profile.operationalConsequences),
    section("recommendedFluidDirection", "Recommended Fluid Direction", "", profile.recommendedFluidDirection),
    section("possibleKlondikeProducts", "Possible KLONDIKE Products", "", formatProductDirectionItems(profile)),
    section("repTalkTrack", "Rep Talk Track", "", profile.repTalkTrack),
    section("confirmBeforeChangingFluid", "Confirm Before Changing Fluid", "", confirmItems),
  ].filter((s) => s.body || (s.items && s.items.length > 0));
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
export function buildHydraulicTroubleshootingResponse(inputText) {
  const question = String(inputText ?? "").trim();
  const empty = {
    ok: false,
    profileId: null,
    confidence: /** @type {const} */ ("none"),
    title: "Hydraulic troubleshooting",
    directAnswer: "",
    sections: [],
    followUpQuestions: [],
    sourceBadges: [
      "Hydraulic troubleshooting intelligence",
      `Knowledge v${HYDRAULIC_TROUBLESHOOTING_KNOWLEDGE.version}`,
    ],
    cautionNotes: [
      "Confirm OEM requirements before changing fluids—do not quote specs beyond indexed PDS map rows.",
    ],
    message: "",
  };

  if (!question) {
    return {
      ...empty,
      directAnswer:
        "Describe the hydraulic symptom (e.g. cavitation, wet brake chatter, foaming, sluggish cold startup, varnish, water in hydraulic oil, filter plugging, or seasonal fluid issue).",
      message: "Empty query.",
    };
  }

  const detected = detectHydraulicTroubleshootingIntent(question);
  const { confidence, matches, message: detectMessage } = detected;

  if (confidence === "none" || !detected.profileId) {
    return {
      ...empty,
      confidence,
      directAnswer: detectMessage,
      followUpQuestions: [
        "Is this mobile AW hydraulic, tractor UTF/wet brake, or stationary turbine/compressor class?",
        "What symptom started the call—noise, heat, foam, drift, or fluid condition?",
        "What fluid is in the reservoir today and what does the nameplate require?",
      ],
      message: detectMessage,
    };
  }

  const profile = getHydraulicTroubleshootingProfileById(detected.profileId);
  if (!profile) {
    return {
      ...empty,
      confidence: "none",
      message: "Profile id resolved but data row missing.",
    };
  }

  const escalationNotes = buildEscalationNotes(question, profile);
  const cautionNotes = uniqStrings([...(profile.cautionNotes || []), ...escalationNotes]);

  const directAnswerParts = [profile.whatItUsuallyMeans];
  if (escalationNotes.length) {
    directAnswerParts.push(escalationNotes[0]);
  }
  if (confidence === "ambiguous" && matches.length > 1) {
    directAnswerParts.push(
      `Also consider: ${matches
        .slice(1, 3)
        .map((m) => m.symptom)
        .join("; ")}.`
    );
  }

  const sections = buildSectionsFromProfile(profile, confidence);

  return {
    ok: confidence === "exact" || confidence === "likely",
    profileId: profile.id,
    confidence,
    title: `Hydraulic troubleshooting — ${profile.symptom}`,
    directAnswer: directAnswerParts.filter(Boolean).join(" "),
    sections,
    followUpQuestions: uniqStrings(profile.questionsToAsk || []).slice(0, 8),
    sourceBadges: uniqStrings([
      "Hydraulic troubleshooting intelligence",
      "Canonical hydraulic hierarchy",
      `Knowledge v${HYDRAULIC_TROUBLESHOOTING_KNOWLEDGE.version}`,
      `Profile: ${profile.id}`,
    ]),
    cautionNotes,
    message: detectMessage,
  };
}

/**
 * Canonical KLONDIKE coolant / antifreeze intelligence (deterministic source text).
 * Grounded on indexed `pdsMap.js` rows and Coolant PDS PDFs — confirm lines on live PDS before quoting.
 * Not wired to UI in this module.
 */

/** @type {number} */
export const COOLANT_CANONICAL_PRODUCT_INTELLIGENCE_VERSION = 1;

/**
 * Hierarchy branches for coolant programs.
 * @type {Readonly<Record<string, { branch: string, tier: string, description: string }>>}
 */
export const COOLANT_CANONICAL_HIERARCHY_REF = Object.freeze({
  conventionalCoolant: Object.freeze({
    branch: "conventional_coolant",
    tier: "conventional",
    description: "Traditional low-silicate coolant requiring supplemental coolant additive (SCA) for many heavy-duty programs — not extended-life OAT chemistry.",
  }),
  automotiveOatElc: Object.freeze({
    branch: "automotive_oat_elc",
    tier: "automotive_oat",
    description: "Automotive / light-duty OAT extended-life programs — separate bulk from heavy-duty NOAT red column.",
  }),
  nitriteFreeOatElc: Object.freeze({
    branch: "nitrite_free_oat_elc",
    tier: "nitrite_free_oat",
    description: "Nitrite-free OAT extended life for mixed fleets and aluminum-intensive systems without nitrite cavitation strategy.",
  }),
  heavyDutyNoatElc: Object.freeze({
    branch: "heavy_duty_noat_elc",
    tier: "noat",
    description: "Nitrited OAT (NOAT) for heavy-duty diesel wet-sleeve cavitation protection — not nitrite-free gold column.",
  }),
  heavyDutyHoatElc: Object.freeze({
    branch: "heavy_duty_hoat_elc",
    tier: "hoat",
    description: "Nitrited hybrid OAT (HOAT) severe-duty extended life with liner protection — distinct from conventional green and automotive yellow.",
  }),
  mixedFleetCoolant: Object.freeze({
    branch: "mixed_fleet_coolant",
    tier: "mixed_fleet",
    description: "Fleet consolidation rows when OEM allows one chemistry across passenger and diesel — chemistry match still required.",
  }),
  extendedLifeCoolant: Object.freeze({
    branch: "extended_life_coolant",
    tier: "elc",
    description: "Extended service interval coolants (OAT / NOAT / HOAT families) versus ~2-year conventional green programs.",
  }),
  nitritedCoolant: Object.freeze({
    branch: "nitrited_coolant",
    tier: "nitrited",
    description: "Nitrite-containing programs for wet-cylinder liner cavitation in heavy-duty diesel — SCA-free when indexed as ELC NOAT/HOAT.",
  }),
  nitriteFreeCoolant: Object.freeze({
    branch: "nitrite_free_coolant",
    tier: "nitrite_free",
    description: "Nitrite-free inhibitor packages — do not assume nitrite-free equals conventional green or equals NOAT without reading the tag.",
  }),
});

/**
 * @typedef {{
 *   id: string,
 *   productName: string,
 *   aliases: string[],
 *   hierarchyBranch: string,
 *   coolantTechnology: string,
 *   nitriteStrategy: string,
 *   productPositioning: string,
 *   whatItIs: string,
 *   whyItWins: string,
 *   cavitationProtection: string,
 *   SCARequirement: string,
 *   extendedLifePositioning: string,
 *   mixedFleetPositioning: string,
 *   aluminumProtection: string,
 *   topOffCompatibility: string,
 *   maintenanceStrategy: string,
 *   OEMPositioning: string,
 *   applications: string[],
 *   industries: string[],
 *   customerPainSignals: string[],
 *   troubleshootingAssociations: string[],
 *   upgradeStory: string[],
 *   repTalkTrack: string[],
 *   productSpotlightAngle: string,
 *   categorySpotlightRole: string,
 *   customerProfileMatches: string[],
 *   doNotConfuseWith: string[],
 *   proofPoints: string[],
 *   pdsMapKey: string,
 *   cautionNotes: string[],
 * }} CoolantCanonicalProductIntelligence
 */

/** @param {CoolantCanonicalProductIntelligence} row */
function freezeCoolantRow(row) {
  const listKeys = [
    "aliases",
    "applications",
    "industries",
    "customerPainSignals",
    "troubleshootingAssociations",
    "upgradeStory",
    "repTalkTrack",
    "customerProfileMatches",
    "doNotConfuseWith",
    "proofPoints",
    "cautionNotes",
  ];
  /** @type {Record<string, unknown>} */
  const frozen = { ...row };
  for (const key of listKeys) {
    const val = row[key];
    frozen[key] = Object.freeze([...(Array.isArray(val) ? val : [])]);
  }
  return Object.freeze(frozen);
}

/** @param {Partial<CoolantCanonicalProductIntelligence> & Pick<CoolantCanonicalProductIntelligence, "id" | "productName" | "pdsMapKey">} row */
function coolantRow(row) {
  return freezeCoolantRow({
    hierarchyBranch: "",
    coolantTechnology: "",
    nitriteStrategy: "",
    productPositioning: "",
    whatItIs: "",
    whyItWins: "",
    cavitationProtection: "",
    SCARequirement: "",
    extendedLifePositioning: "",
    mixedFleetPositioning: "",
    aluminumProtection: "",
    topOffCompatibility: "",
    maintenanceStrategy: "",
    OEMPositioning: "",
    applications: [],
    industries: [],
    customerPainSignals: [],
    troubleshootingAssociations: [],
    upgradeStory: [],
    repTalkTrack: [],
    productSpotlightAngle: "",
    categorySpotlightRole: "",
    customerProfileMatches: [],
    doNotConfuseWith: [],
    proofPoints: [],
    cautionNotes: [],
    aliases: [],
    ...row,
  });
}

/** @type {CoolantCanonicalProductIntelligence[]} */
const COOLANT_CANONICAL_PRODUCT_ROWS = [
  coolantRow({
    id: "coolant-canonical-green-universal",
    productName: "KLONDIKE Green Universal Antifreeze/Coolant",
    aliases: [
      "green universal antifreeze",
      "green universal coolant",
      "green conventional coolant",
      "klondike green coolant",
    ],
    hierarchyBranch: COOLANT_CANONICAL_HIERARCHY_REF.conventionalCoolant.branch,
    coolantTechnology: "conventional_low_silicate",
    nitriteStrategy: "Not an extended-life nitrite-free OAT program — heavy-duty use may require supplemental coolant additive per indexed summary.",
    productPositioning:
      "Traditional **green** conventional coolant for automotive and heavy-duty systems that still rely on SCA discipline — not a pour-and-forget ELC OAT/NOAT bulk.",
    whatItIs:
      "Traditional low-silicate antifreeze/coolant indexed ASTM D3306 / D4985 with ASTM D6210 when used with SCA for heavy-duty per PDS map summary.",
    whyItWins:
      "Honest conventional lane: reliable freeze protection (~−36.7°C on index), Ford / GM / Chrysler positioning, and familiar green bulk for shops that maintain SCA programs.",
    cavitationProtection: "Wet-sleeve cavitation for heavy diesel requires correct SCA program — not the same as nitrited NOAT/HOAT ELC rows on index.",
    SCARequirement: "Requires SCA for HD use per indexed summary — confirm SCA test schedule before claiming maintenance-free diesel protection.",
    extendedLifePositioning: "Service life ~2 years / 80,000 km on index — not 1.6M km / 20,000 hr ELC diesel intervals.",
    mixedFleetPositioning: "Fleet consolidation only when every unit allows conventional + SCA discipline — do not standardize mixed OAT/NOAT fleets on green without flush.",
    aluminumProtection: "Conventional inhibitor package — not phosphate/silicate-free OAT gold positioning on index.",
    topOffCompatibility: "Top-off only within same conventional chemistry — never mix green conventional with red NOAT, gold NF OAT, or yellow automotive OAT without OEM flush guidance.",
    maintenanceStrategy: "SCA testing and periodic additive maintenance for HD programs per indexed conventional strategy.",
    OEMPositioning: "Ford / GM / Chrysler; ASTM D3306 / D4985; ASTM D6210 with SCA per PDS map index.",
    applications: [
      "Automotive and legacy heavy-duty cooling systems specifying conventional coolant with SCA support.",
      "Top-off where OEM confirms conventional chemistry remains in service.",
    ],
    industries: ["automotive_aftermarket", "municipal_fleet", "agriculture", "construction"],
    customerPainSignals: [
      "Green drum top-off into red NOAT or gold OAT fleet causing gelation.",
      "Assuming green equals universal extended-life compatibility.",
      "Skipping SCA on HD diesel and seeing liner pitting.",
    ],
    troubleshootingAssociations: ["overheating", "contamination"],
    upgradeStory: [
      "Green + SCA → Yellow / Gold / Red / HOAT ELC only after OEM-approved flush when upgrading to extended-life chemistry.",
    ],
    repTalkTrack: [
      "Green is conventional — read the tag for OAT, NOAT, or HOAT before you consolidate bulk. If the spec says extended life nitrite-free, this is the wrong colour habit.",
    ],
    productSpotlightAngle: "Conventional coolant — green universal column.",
    categorySpotlightRole: "**Conventional Coolant Program** anchor.",
    customerProfileMatches: ["automotive_aftermarket", "municipal_fleet", "agriculture"],
    doNotConfuseWith: [
      "KLONDIKE Yellow Automotive OAT ELC — extended-life OAT, not conventional green.",
      "KLONDIKE Gold All Engines NF OAT ELC — nitrite-free OAT mixed fleet.",
      "KLONDIKE Red Heavy Duty NOAT ELC — nitrited OAT for HD cavitation.",
      "KLONDIKE Commercial HD HOAT ELC — nitrited HOAT extended life.",
      "Any ‘colour equals chemistry’ assumption — always match inhibitor family on the OEM chart.",
    ],
    proofPoints: [
      "ASTM D3306 / D4985.",
      "ASTM D6210 with SCA for HD on index.",
      "Freeze point ~−36.7°C.",
      "Service life ~2 years / 80,000 km.",
      "Low silicate formulation; requires SCA for HD use.",
    ],
    pdsMapKey: "Green Universal Coolant",
    cautionNotes: [
      "Green conventional ≠ extended-life OAT/NOAT/HOAT.",
      "Confirm SCA program before quoting HD diesel cavitation protection.",
      "Do not mix with ELC coolants without flush per OEM.",
    ],
  }),

  coolantRow({
    id: "coolant-canonical-yellow-oat-elc",
    productName: "KLONDIKE Yellow Automotive OAT ELC Antifreeze/Coolant",
    aliases: [
      "yellow oat elc",
      "yellow automotive oat",
      "dex-cool yellow",
      "automotive oat coolant",
    ],
    hierarchyBranch: COOLANT_CANONICAL_HIERARCHY_REF.automotiveOatElc.branch,
    coolantTechnology: "oat_elc_automotive",
    nitriteStrategy: "OAT extended-life inhibitor package per index — not nitrited NOAT diesel cavitation chemistry.",
    productPositioning:
      "**Yellow** automotive OAT extended-life coolant for passenger and light-duty truck programs — not heavy-duty red NOAT bulk.",
    whatItIs:
      "Extended-life OAT coolant indexed ASTM D3306, SAE J1034, GM DEX-COOL, and Ford / Chrysler / Toyota lines on PDS map.",
    whyItWins:
      "5 years / 250,000 km service positioning with silicate/phosphate-free OAT chemistry and aluminum protection language on index.",
    cavitationProtection: "Automotive OAT focus — heavy-duty wet-sleeve cavitation programs use nitrited NOAT/HOAT rows when OEM specifies.",
    SCARequirement: "No supplemental additives required per indexed automotive ELC positioning.",
    extendedLifePositioning: "Service life 5 years / 250,000 km on index versus ~2-year conventional green.",
    mixedFleetPositioning: "Light-duty mixed fleet when OEM chart allows yellow OAT — do not replace red NOAT diesel standard without spec review.",
    aluminumProtection: "Aluminum protection and silicate/phosphate-free language on indexed summary.",
    topOffCompatibility: "Top-off with same OAT chemistry only — do not mix with conventional green or nitrited NOAT red without flush.",
    maintenanceStrategy: "Extended drain interval with refractometer / test strip discipline per OEM — no SCA top-up on index.",
    OEMPositioning: "ASTM D3306; SAE J1034; GM DEX-COOL; Ford / Chrysler / Toyota per PDS map index.",
    applications: ["Automotive and light-duty truck cooling systems specifying OAT ELC."],
    industries: ["automotive_aftermarket", "municipal_fleet"],
    customerPainSignals: [
      "Yellow top-off into red NOAT Class 8 fleet.",
      "Shop using gold NF OAT for all colours without OEM chart.",
      "Overheating after incompatible mix — gelled coolant.",
    ],
    troubleshootingAssociations: ["overheating", "contamination"],
    upgradeStory: ["Yellow OAT → Gold NF OAT when fleet wants nitrite-free mixed passenger + diesel consolidation per OEM."],
    repTalkTrack: [
      "Yellow is automotive OAT on the index — if the tag says heavy-duty NOAT or nitrite for cavitation, move to the red column, not yellow habit.",
    ],
    productSpotlightAngle: "Automotive OAT ELC — yellow column.",
    categorySpotlightRole: "**Automotive OAT ELC Program**.",
    customerProfileMatches: ["automotive_aftermarket", "municipal_fleet"],
    doNotConfuseWith: [
      "KLONDIKE Green Universal Antifreeze/Coolant — conventional, SCA-era maintenance.",
      "KLONDIKE Red Heavy Duty NOAT ELC — nitrited HD diesel NOAT.",
      "KLONDIKE Gold All Engines NF OAT ELC — nitrite-free all-engine mixed fleet.",
      "KLONDIKE Commercial HD HOAT ELC — nitrited HOAT severe diesel.",
    ],
    proofPoints: [
      "ASTM D3306; SAE J1034.",
      "GM DEX-COOL.",
      "Freeze point ~−36.7°C.",
      "5 years / 250,000 km service life.",
      "Silicate/phosphate free; aluminum protection on index.",
    ],
    pdsMapKey: "Yellow OAT ELC",
    cautionNotes: [
      "Automotive OAT ≠ heavy-duty NOAT.",
      "Colour is not chemistry — confirm OEM inhibitor family.",
      "Flush before switching from conventional green.",
    ],
  }),

  coolantRow({
    id: "coolant-canonical-gold-nf-oat-elc",
    productName: "KLONDIKE Gold All Engines NF OAT ELC Antifreeze/Coolant",
    aliases: [
      "gold oat elc",
      "gold all engines nf",
      "nitrite free oat coolant",
      "all engines nf oat",
    ],
    hierarchyBranch: COOLANT_CANONICAL_HIERARCHY_REF.nitriteFreeOatElc.branch,
    coolantTechnology: "nitrite_free_oat_elc",
    nitriteStrategy: "Nitrite-free OAT — not nitrited NOAT red chemistry; cavitation strategy differs from wet-sleeve nitrite programs.",
    productPositioning:
      "**Gold** nitrite-free OAT extended life for universal / mixed-fleet consolidation when OEM allows — eliminates SCA but is not conventional green.",
    whatItIs:
      "Nitrite-free OAT extended life coolant with ASTM D6210 / D3306, GM DEX-COOL, Cummins CES 14603, and Detroit 93K217 on PDS map index.",
    whyItWins:
      "1,600,000 km / 20,000 hr service positioning with phosphate/silicate-free OAT and no supplemental additives required per index — mixed-fleet simplification story.",
    cavitationProtection:
      "Nitrite-free OAT — confirm OEM allows NF OAT for wet-sleeve diesel; nitrited NOAT/HOAT rows exist when spec demands nitrite cavitation protection.",
    SCARequirement: "No supplemental additives required per indexed summary — still not interchangeable with SCA-managed green without flush.",
    extendedLifePositioning: "Extended life 1,600,000 km / 20,000 hrs on index — ELC tier versus conventional green ~80,000 km.",
    mixedFleetPositioning:
      "Primary **mixed fleet coolant** row when OEM chart supports one nitrite-free OAT across engine types on index.",
    aluminumProtection: "Phosphate/silicate free OAT with multi-metal protection positioning on index.",
    topOffCompatibility: "Top-off within nitrite-free OAT family only — never mix with nitrited red NOAT or conventional green without OEM flush.",
    maintenanceStrategy: "Extended interval with coolant testing — no SCA bottles on index; still require refractometer discipline.",
    OEMPositioning: "ASTM D6210 / D3306; GM DEX-COOL; Cummins CES 14603; Detroit Diesel 93K217 per PDS map.",
    applications: [
      "Mixed fleets standardizing on nitrite-free OAT when OEM permits.",
      "Passenger and on-highway diesel programs accepting NF OAT per chart.",
    ],
    industries: ["trucking_fleet", "automotive_aftermarket", "municipal_fleet", "agriculture"],
    customerPainSignals: [
      "Nitrite-free gold in nitrite-required NOAT diesel spec.",
      "Colour-based top-off between gold, yellow, and red drums.",
      "Assuming nitrite-free means compatible with conventional green.",
    ],
    troubleshootingAssociations: ["overheating", "contamination"],
    upgradeStory: [
      "Conventional green → Gold NF OAT after flush when fleet wants single ELC chemistry.",
      "Gold NF → Red NOAT when OEM adds nitrite cavitation requirement for HD diesel.",
    ],
    repTalkTrack: [
      "Gold is nitrite-free OAT — great for mixed fleet when the OEM chart allows it. If the spec says nitrited NOAT for liner protection, gold is not a shortcut.",
    ],
    productSpotlightAngle: "Nitrite-free OAT — gold all-engines column.",
    categorySpotlightRole: "**Nitrite-Free OAT ELC** and **Mixed Fleet Coolant Program** anchor.",
    customerProfileMatches: ["trucking_fleet", "automotive_aftermarket", "municipal_fleet"],
    doNotConfuseWith: [
      "KLONDIKE Red Heavy Duty NOAT ELC — nitrited OAT (~2400 ppm nitrite on index), not nitrite-free.",
      "KLONDIKE Green Universal Antifreeze/Coolant — conventional with SCA for HD.",
      "KLONDIKE Yellow Automotive OAT ELC — automotive OAT column, not all-engine gold positioning.",
      "KLONDIKE Commercial HD HOAT ELC — nitrited HOAT, not NF OAT.",
    ],
    proofPoints: [
      "ASTM D6210 / D3306.",
      "GM DEX-COOL; Cummins CES 14603; Detroit 93K217.",
      "Nitrite-free; phosphate/silicate free.",
      "1,600,000 km / 20,000 hr service life.",
      "Freeze point ~−36.7°C.",
    ],
    pdsMapKey: "Gold OAT ELC",
    cautionNotes: [
      "Nitrite-free OAT ≠ nitrited NOAT — read wet-sleeve requirements.",
      "Not conventional green — flush before chemistry change.",
      "Top-off compatibility is chemistry-based, not colour-based.",
    ],
  }),

  coolantRow({
    id: "coolant-canonical-red-noat-elc",
    productName: "KLONDIKE Red Heavy Duty NOAT ELC Antifreeze/Coolant",
    aliases: [
      "red noat elc",
      "red heavy duty noat",
      "nitrited oat hd coolant",
      "red hd fleet elc",
    ],
    hierarchyBranch: COOLANT_CANONICAL_HIERARCHY_REF.heavyDutyNoatElc.branch,
    coolantTechnology: "noat_elc_nitrited",
    nitriteStrategy: "Nitrited OAT — nitrite ~2400 ppm on index for wet-sleeve protection — not nitrite-free gold column.",
    productPositioning:
      "**Red** nitrited NOAT extended life for heavy-duty diesel cavitation and long drain — separate from nitrite-free gold and from conventional green.",
    whatItIs:
      "Nitrited OAT extended life coolant indexed ASTM D6210 / D3306, CAT EC-1, Cummins CES 14603, Volvo / Mack, and SAE NOAT formulation on PDS map.",
    whyItWins:
      "Wet sleeve protection with 1,600,000 km / 20,000 hr service and nitrite cavitation strategy documented on index — HD diesel ELC without SCA bottles when spec matches.",
    cavitationProtection: "Wet sleeve / liner cavitation protection via nitrited NOAT chemistry — primary HD diesel story on index.",
    SCARequirement: "Extended-life NOAT positioning — no supplemental additives required per indexed ELC summary (not SCA-dependent green).",
    extendedLifePositioning: "1,600,000 km / 20,000 hrs on index — extended life tier for severe diesel.",
    mixedFleetPositioning: "HD diesel anchor — consolidate passenger units only when OEM chart allows same nitrited NOAT chemistry.",
    aluminumProtection: "Multi-metal corrosion control per NOAT ELC positioning on index.",
    topOffCompatibility: "Top-off with same nitrited NOAT chemistry — incompatible with nitrite-free gold/yellow without flush.",
    maintenanceStrategy: "Extended drain with coolant analysis — nitrite level monitoring per OEM where required.",
    OEMPositioning: "ASTM D6210 / D3306; CAT EC-1; Cummins CES 14603; Volvo / Mack; SAE NOAT per index.",
    applications: [
      "Heavy-duty diesel engines requiring nitrited OAT cavitation protection.",
      "On-highway and vocational diesel ELC programs per OEM chart.",
    ],
    industries: ["trucking_fleet", "construction", "mining", "municipal_fleet", "agriculture"],
    customerPainSignals: [
      "Gold nitrite-free top-off into nitrite-required NOAT system.",
      "Green conventional mixed into red NOAT causing inhibitor collapse.",
      "Liner pitting when NF OAT used where nitrite NOAT is specified.",
    ],
    troubleshootingAssociations: ["overheating", "cavitation", "contamination"],
    upgradeStory: ["Red NOAT remains HD diesel standard when cavitation spec requires nitrite — do not downgrade to gold NF without OEM bulletin."],
    repTalkTrack: [
      "Red is nitrited NOAT for HD cavitation on the index — nitrite-free gold is a different inhibitor strategy, not a colour swap.",
    ],
    productSpotlightAngle: "Heavy Duty NOAT ELC — red nitrited column.",
    categorySpotlightRole: "**Heavy Duty NOAT ELC** and **Nitrited Coolant Program** anchor.",
    customerProfileMatches: ["trucking_fleet", "construction", "mining_aggregate"],
    doNotConfuseWith: [
      "KLONDIKE Gold All Engines NF OAT ELC — nitrite-free, not nitrited NOAT.",
      "KLONDIKE Commercial HD HOAT ELC — nitrited HOAT hybrid chemistry, different indexed row.",
      "KLONDIKE Green Universal Antifreeze/Coolant — conventional SCA program.",
      "KLONDIKE Yellow Automotive OAT ELC — automotive OAT, not HD NOAT.",
    ],
    proofPoints: [
      "ASTM D6210 / D3306.",
      "CAT EC-1; Cummins CES 14603; Volvo / Mack.",
      "SAE NOAT formulation; nitrite ~2400 ppm.",
      "1,600,000 km / 20,000 hr service life.",
      "Wet sleeve protection on index.",
    ],
    pdsMapKey: "Red NOAT ELC",
    cautionNotes: [
      "NOAT nitrited ≠ nitrite-free OAT gold.",
      "Not HOAT chemistry — confirm OEM NOAT vs HOAT chart line.",
      "Never mix with conventional green without flush.",
    ],
  }),

  coolantRow({
    id: "coolant-canonical-commercial-hd-hoat-elc",
    productName: "KLONDIKE Commercial HD HOAT ELC Antifreeze/Coolant",
    aliases: [
      "commercial hd hoat",
      "hoat elc 50/50",
      "hoat extended life coolant",
      "nitrited hoat hd",
    ],
    hierarchyBranch: COOLANT_CANONICAL_HIERARCHY_REF.heavyDutyHoatElc.branch,
    coolantTechnology: "hoat_elc_nitrited",
    nitriteStrategy: "Nitrited HOAT formulation on index — cavitation/liner strategy with nitrite; not nitrite-free OAT.",
    productPositioning:
      "**Commercial HD HOAT** nitrited hybrid OAT extended life for severe diesel — 50/50 premix row on index with no SCA required.",
    whatItIs:
      "Hybrid OAT extended life coolant (nitrited HOAT) indexed ASTM D6210 / D3306, TMC RP329, CAT EC-1, Cummins / Detroit Diesel, and SAE premix 50/50 on PDS map.",
    whyItWins:
      "960,000 km / 12,000 hr service with wet sleeve liner protection, mixed-fleet compatibility language, and no SCA required per index — severe-duty HOAT lane.",
    cavitationProtection: "Wet sleeve liner protection and cavitation control via nitrited HOAT chemistry on indexed summary.",
    SCARequirement: "No SCA required per index — extended-life HOAT program, not conventional green + SCA maintenance.",
    extendedLifePositioning: "960,000 km / 12,000 hrs on index — extended life HOAT tier.",
    mixedFleetPositioning: "Mixed fleet compatibility without supplemental additives when OEM allows HOAT chemistry per index.",
    aluminumProtection: "Corrosion control across cooling system metals per HOAT ELC positioning.",
    topOffCompatibility: "Top-off within same HOAT/ELC family — do not mix with NOAT red, gold NF, yellow OAT, or green conventional without flush.",
    maintenanceStrategy: "Extended service interval with coolant testing — nitrited HOAT inhibitor maintenance per OEM.",
    OEMPositioning: "ASTM D6210 / D3306; TMC RP329; CAT EC-1; Cummins / Detroit Diesel per PDS map index.",
    applications: [
      "Heavy-duty diesel requiring HOAT extended life and cavitation protection.",
      "Commercial mixed fleets when OEM chart lists HOAT ELC premix.",
    ],
    industries: ["trucking_fleet", "construction", "mining", "municipal_fleet", "manufacturing"],
    customerPainSignals: [
      "HOAT drum confused with NOAT red or conventional green.",
      "Assuming all ‘red’ coolants share chemistry.",
      "Top-off with nitrite-free gold into nitrited HOAT system.",
    ],
    troubleshootingAssociations: ["overheating", "cavitation", "contamination"],
    upgradeStory: [
      "HOAT ELC for OEM HOAT chart lines; Red NOAT when spec explicitly calls NOAT nitrite program — confirm bulletin, do not assume interchange.",
    ],
    repTalkTrack: [
      "HOAT is nitrited hybrid OAT on the index — still not conventional green, and not nitrite-free gold. Read Commercial HD HOAT on the PDS title block before bulk.",
    ],
    productSpotlightAngle: "Heavy Duty HOAT ELC — commercial severe diesel.",
    categorySpotlightRole: "**Heavy Duty HOAT ELC Program** within **Extended Life Coolant**.",
    customerProfileMatches: ["trucking_fleet", "construction", "mining_aggregate", "municipal_fleet"],
    doNotConfuseWith: [
      "KLONDIKE Green Universal Antifreeze/Coolant — conventional with SCA for HD.",
      "KLONDIKE Red Heavy Duty NOAT ELC — nitrited OAT NOAT, not HOAT hybrid row.",
      "KLONDIKE Gold All Engines NF OAT ELC — nitrite-free OAT.",
      "KLONDIKE Yellow Automotive OAT ELC — automotive OAT column.",
    ],
    proofPoints: [
      "ASTM D6210 / D3306.",
      "TMC RP329; CAT EC-1.",
      "Cummins / Detroit Diesel on index.",
      "Nitrited HOAT formulation; no SCA required.",
      "960,000 km / 12,000 hr service; freeze point ~−36.7°C.",
      "SAE premix 50/50 on index.",
    ],
    pdsMapKey: "HOAT ELC 50/50",
    cautionNotes: [
      "HOAT ≠ conventional green — different maintenance model.",
      "HOAT ≠ nitrite-free OAT — confirm nitrite strategy on OEM tag.",
      "Indexed PDS map key is HOAT ELC 50/50 — confirm live PDS title block matches Commercial HD HOAT marketing.",
      "NOAT red and HOAT are separate chemistry families — do not interchange without OEM proof.",
    ],
  }),
];

/** @type {Readonly<Record<string, CoolantCanonicalProductIntelligence>>} */
const COOLANT_CANONICAL_BY_ID = Object.freeze(
  Object.fromEntries(COOLANT_CANONICAL_PRODUCT_ROWS.map((p) => [p.id, p]))
);

/** @type {Readonly<{ version: number, category: "coolants", products: readonly CoolantCanonicalProductIntelligence[] }>} */
export const COOLANT_CANONICAL_PRODUCT_INTELLIGENCE = Object.freeze({
  version: COOLANT_CANONICAL_PRODUCT_INTELLIGENCE_VERSION,
  category: "coolants",
  products: Object.freeze(COOLANT_CANONICAL_PRODUCT_ROWS),
});

/** @returns {readonly CoolantCanonicalProductIntelligence[]} */
export function listCoolantCanonicalProductIntelligence() {
  return COOLANT_CANONICAL_PRODUCT_INTELLIGENCE.products;
}

/**
 * @param {unknown} id
 * @returns {CoolantCanonicalProductIntelligence | null}
 */
export function getCoolantCanonicalProductIntelligenceById(id) {
  const key = String(id ?? "").trim();
  if (!key) return null;
  return COOLANT_CANONICAL_BY_ID[key] || null;
}

/**
 * @param {unknown} pdsMapKey
 * @returns {CoolantCanonicalProductIntelligence | null}
 */
export function getCoolantCanonicalProductIntelligenceByPdsKey(pdsMapKey) {
  const key = String(pdsMapKey ?? "").trim();
  if (!key) return null;
  return COOLANT_CANONICAL_PRODUCT_INTELLIGENCE.products.find((p) => p.pdsMapKey === key) || null;
}

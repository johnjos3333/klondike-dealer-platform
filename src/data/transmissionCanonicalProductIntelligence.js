/**
 * Canonical KLONDIKE transmission / drivetrain product intelligence (deterministic source text).
 * Grounded on indexed `pdsMap.js` rows and Transmission Fluids PDS PDFs — confirm lines on live PDS before quoting.
 * Not wired to UI in this module.
 */

/** @type {number} */
export const TRANSMISSION_CANONICAL_PRODUCT_INTELLIGENCE_VERSION = 1;

/**
 * Hierarchy branches for transmission and drivetrain programs.
 * @type {Readonly<Record<string, { branch: string, tier: string, description: string }>>}
 */
export const TRANSMISSION_CANONICAL_HIERARCHY_REF = Object.freeze({
  legacyAtf: Object.freeze({
    branch: "legacy_atf",
    tier: "legacy",
    description: "DEXRON III / MERCON / Type F era automatic transmission fluids for older hardware.",
  }),
  universalAtf: Object.freeze({
    branch: "universal_atf",
    tier: "universal",
    description: "Broad multi-OEM full synthetic ATF when nameplate lists compatible DEXRON / MERCON families — not ULV or CVT chemistry.",
  }),
  lowViscosityAtf: Object.freeze({
    branch: "low_viscosity_atf",
    tier: "low_viscosity",
    description: "DEXRON VI / MERCON LV low-viscosity full synthetic ATF for modern 6–8 speed programs.",
  }),
  ultraLowViscosityAtf: Object.freeze({
    branch: "ultra_low_viscosity_atf",
    tier: "ulv",
    description: "Dexron ULV / Mercon ULV 9–10 speed fuel-economy ATF — separate bulk from universal or DEXRON VI rows.",
  }),
  cvt: Object.freeze({
    branch: "cvt",
    tier: "cvt",
    description: "Belt- and chain-CVT friction chemistry — never substituted with stepped ATF, DCT, or ULV.",
  }),
  dct: Object.freeze({
    branch: "dct",
    tier: "dct",
    description: "Dual-clutch transmission fluid for wet-clutch DCT hardware — separate from CVT and conventional ATF.",
  }),
  heavyDutyAutomatic: Object.freeze({
    branch: "heavy_duty_automatic_transmission",
    tier: "heavy_duty",
    description: "Class 8 and vocational automatic transmission severe-service column — Allison and OEM vocational lists.",
  }),
  tes295: Object.freeze({
    branch: "tes_295",
    tier: "tes_295",
    description: "Allison TES-295 extended-drain severe-duty ATF programs.",
  }),
  tes668: Object.freeze({
    branch: "tes_668",
    tier: "tes_668",
    description: "Allison TES-668 next-generation severe-duty ATF — not interchangeable positioning with TES-295 without OEM confirmation.",
  }),
  manualTransmission: Object.freeze({
    branch: "manual_transmission",
    tier: "manual",
    description: "Heavy-duty manual transmission and MT-1 extended-service lubricants — not hypoid axle GL-5 default.",
  }),
  synchromesh: Object.freeze({
    branch: "synchromesh",
    tier: "synchromesh",
    description: "GL-4 synchromesh manual transmission fluid with yellow metal compatibility.",
  }),
  tdto4: Object.freeze({
    branch: "tdto_4",
    tier: "tdto",
    description: "Caterpillar TO-4 transmission / drivetrain oils for off-highway powershift and brake-compatibility duty.",
  }),
  arcticTdto: Object.freeze({
    branch: "arctic_tdto",
    tier: "arctic_tdto",
    description: "Arctic full synthetic TDTO-4 for extreme cold TO-4 bulk programs.",
  }),
  wetBrakePowershift: Object.freeze({
    branch: "wet_brake_powershift",
    tier: "wet_brake",
    description: "Dedicated wet brake / powershift friction programs — not engine oil or generic ATF top-off.",
  }),
  offRoadDrivetrain: Object.freeze({
    branch: "off_road_drivetrain",
    tier: "off_road",
    description: "Mining, construction, and agricultural drivetrain bulk where TO-4, wet brake, and clutch friction share a sump.",
  }),
});

/**
 * @typedef {{
 *   id: string,
 *   productName: string,
 *   aliases: string[],
 *   hierarchyBranch: string,
 *   transmissionType: string,
 *   productPositioning: string,
 *   whatItIs: string,
 *   whyItWins: string,
 *   frictionStrategy: string,
 *   antiShudderPositioning: string,
 *   fuelEconomyPositioning: string,
 *   severeDutyPositioning: string,
 *   coldTemperaturePositioning: string,
 *   wetBrakePositioning: string,
 *   powershiftPositioning: string,
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
 * }} TransmissionCanonicalProductIntelligence
 */

/** @param {TransmissionCanonicalProductIntelligence} row */
function freezeTransmissionRow(row) {
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

/** @param {Partial<TransmissionCanonicalProductIntelligence> & Pick<TransmissionCanonicalProductIntelligence, "id" | "productName" | "pdsMapKey">} row */
function txRow(row) {
  return freezeTransmissionRow({
    hierarchyBranch: "",
    transmissionType: "",
    productPositioning: "",
    whatItIs: "",
    whyItWins: "",
    frictionStrategy: "",
    antiShudderPositioning: "",
    fuelEconomyPositioning: "",
    severeDutyPositioning: "",
    coldTemperaturePositioning: "",
    wetBrakePositioning: "",
    powershiftPositioning: "",
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

/** @type {TransmissionCanonicalProductIntelligence[]} */
const TRANSMISSION_CANONICAL_PRODUCT_ROWS = [
  txRow({
    id: "tx-canonical-md3-atf",
    productName: "KLONDIKE MD3 Automatic Transmission Fluid",
    aliases: ["md3 atf", "dexron iii atf", "mercon md3", "klondike md3"],
    hierarchyBranch: TRANSMISSION_CANONICAL_HIERARCHY_REF.legacyAtf.branch,
    transmissionType: "legacy_stepped_atf",
    productPositioning: "Legacy multi-vehicle ATF for older automatics requiring DEXRON III or MERCON — not DEXRON VI, ULV, CVT, or DCT chemistry.",
    whatItIs:
      "Multi-vehicle ATF indexed for DEXRON III, MERCON, and Allison C-3 / C-4 language on the PDS map for older transmission systems.",
    whyItWins:
      "Honest legacy lane with documented viscosity @40°C ~35.5 cSt, VI ~180, and pour −50°C on index — avoids forcing modern low-viscosity ATF into III-era friction curves.",
    frictionStrategy: "DEXRON III / MERCON friction curve — not backwards-compatible substitute for VI, ULV, CVT, or DCT rows.",
    antiShudderPositioning: "Smooth shift positioning for older torque-converter hardware per indexed summary — not modern anti-shudder ULV chemistry.",
    fuelEconomyPositioning: "",
    severeDutyPositioning: "Allison C-3 / C-4 back-service context on index — confirm vocational vs passenger nameplate.",
    coldTemperaturePositioning: "Brookfield @−40°C ~15,000 cP on index for legacy cold cranking context.",
    wetBrakePositioning: "",
    powershiftPositioning: "",
    OEMPositioning: "DEXRON III; MERCON; Allison C-3 / C-4 per PDS map index.",
    applications: ["Older domestic and import automatics specifying DEXRON III or MERCON."],
    industries: ["automotive_aftermarket", "municipal_fleet", "agriculture"],
    customerPainSignals: [
      "DEXRON VI or ULV drum used in III-spec transmission.",
      "Shift flare and clutch slip after ‘universal ATF’ top-off.",
    ],
    troubleshootingAssociations: ["contamination", "seasonalFluidMismatch"],
    upgradeStory: ["MD3 → DEXRON VI / MERCON LV only when OEM bulletin explicitly allows — never assume ULV."],
    repTalkTrack: [
      "Read the dipstick tag: if it says DEXRON III, MD3 is the indexed row — don’t upsell VI or ULV without OEM proof.",
    ],
    productSpotlightAngle: "Legacy ATF — MD3 column.",
    categorySpotlightRole: "**Legacy ATF Program** — DEXRON III / MERCON anchor.",
    customerProfileMatches: ["automotive_aftermarket", "municipal_fleet"],
    doNotConfuseWith: [
      "KLONDIKE Dexron VI / Mercon LV Full Synthetic — low-viscosity modern ATF.",
      "KLONDIKE ULV Full Synthetic ATF — ultra-low viscosity 9–10 speed chemistry.",
      "KLONDIKE Universal Full Synthetic ATF — multi-spec universal, not III-only positioning.",
      "KLONDIKE CVT Full Synthetic — CVT belt/chain fluid.",
    ],
    proofPoints: ["DEXRON III; MERCON.", "Allison C-3 / C-4 on index.", "Viscosity @40°C ~35.5 cSt; VI ~180; pour −50°C."],
    pdsMapKey: "MD3 ATF",
    cautionNotes: ["Never position as DEXRON VI, ULV, CVT, or DCT substitute.", "Confirm Allison generation on vocational units."],
  }),

  txRow({
    id: "tx-canonical-type-f-atf",
    productName: "KLONDIKE TYPE F Transmission Fluid",
    aliases: ["type f atf", "ford type f", "m2c33-f"],
    hierarchyBranch: TRANSMISSION_CANONICAL_HIERARCHY_REF.legacyAtf.branch,
    transmissionType: "legacy_type_f_atf",
    productPositioning: "Ford Type F friction program for designated legacy automatics — separate bulk from DEXRON/MERCON families.",
    whatItIs:
      "Automatic transmission fluid indexed for Ford M2C33-F / G Type F applications per PDS map summary.",
    whyItWins:
      "Preserves Type F friction characteristics shops still see on pre-1980s Ford programs — viscosity @40°C ~32.5 cSt on index.",
    frictionStrategy: "Type F friction curve — not DEXRON III/VI or MERCON LV chemistry.",
    antiShudderPositioning: "",
    fuelEconomyPositioning: "",
    severeDutyPositioning: "",
    coldTemperaturePositioning: "Pour −50°C on index.",
    wetBrakePositioning: "",
    powershiftPositioning: "",
    OEMPositioning: "Ford M2C33-F / G per indexed PDS summary.",
    applications: ["Legacy Ford automatics specifying Type F."],
    industries: ["automotive_aftermarket"],
    customerPainSignals: ["DEXRON fluid in Type F sump causing harsh shifts.", "Assuming red fluid color equals spec."],
    troubleshootingAssociations: ["contamination"],
    upgradeStory: ["Stay on Type F when nameplate requires M2C33 — no automatic upgrade to MD3 without OEM documentation."],
    repTalkTrack: ["Type F is its own friction class — confirm M2C33 on the tag before opening the drum."],
    productSpotlightAngle: "Legacy ATF — Type F footnote.",
    categorySpotlightRole: "**Legacy ATF Program** — Ford Type F niche.",
    customerProfileMatches: ["automotive_aftermarket"],
    doNotConfuseWith: [
      "KLONDIKE MD3 ATF — DEXRON III / MERCON.",
      "Any modern DEXRON VI, ULV, CVT, or DCT product.",
    ],
    proofPoints: ["Ford M2C33-F / G.", "Viscosity @40°C ~32.5 cSt; VI ~170; flash ~210°C on index."],
    pdsMapKey: "Type F ATF",
    cautionNotes: ["Not for DEXRON- or MERCON-spec transmissions without OEM exception."],
  }),

  txRow({
    id: "tx-canonical-universal-atf",
    productName: "KLONDIKE Universal Full Synthetic Automatic Transmission Fluid",
    aliases: ["universal full synthetic atf", "universal atf", "multi vehicle atf"],
    hierarchyBranch: TRANSMISSION_CANONICAL_HIERARCHY_REF.universalAtf.branch,
    transmissionType: "universal_stepped_atf",
    productPositioning:
      "Universal full synthetic ATF for broad stepped-automatic coverage when OEM lists compatible DEXRON / MERCON families — not ULV 9–10 speed or CVT/DCT.",
    whatItIs:
      "Universal full synthetic ATF with Allison C-3 / C-4 and multi-spec DEXRON / MERCON language on the PDS map index.",
    whyItWins:
      "Consolidation story for mixed passenger/light fleets when nameplates align — VI ~152, @40°C ~28.6 cSt, pour −51°C on index with multi-vehicle compatibility positioning.",
    frictionStrategy: "Multi-OEM stepped-ATF friction — not CVT belt fluid or DCT wet-clutch chemistry.",
    antiShudderPositioning: "Shift quality and oxidation resistance per indexed summary — not a substitute for OEM ULV bulletins.",
    fuelEconomyPositioning: "Lower viscosity than MD3-era fluids on index — still not Dexron ULV / Mercon ULV chemistry.",
    severeDutyPositioning: "Allison C-3 / C-4 language for light vocational context — severe Class 8 programs need TES-295 / TES-668 rows.",
    coldTemperaturePositioning: "Brookfield @−40°C ~10,000 cP on index.",
    wetBrakePositioning: "",
    powershiftPositioning: "",
    OEMPositioning: "Allison C-3 / C-4; DEXRON / MERCON multi-spec per PDS map index.",
    applications: ["Mixed fleets when OEM chart allows compatible universal ATF."],
    industries: ["automotive_aftermarket", "municipal_fleet", "trucking_fleet"],
    customerPainSignals: [
      "Universal ATF in ULV-only 10-speed.",
      "CVT fill from universal ATF drum.",
      "Allison vocational unit filled with passenger universal fluid.",
    ],
    troubleshootingAssociations: ["contamination", "seasonalFluidMismatch"],
    upgradeStory: ["Universal → DEXRON VI / MERCON LV when OEM lists VI/LV.", "Vocational severe → HD ATF TES-295 / SYN DRIVE TES-668."],
    repTalkTrack: [
      "Universal means stepped ATF with printed multi-spec lines — still read the tag for ULV, CVT, or Allison TES numbers.",
    ],
    productSpotlightAngle: "Universal ATF — mixed-fleet consolidation.",
    categorySpotlightRole: "**Universal ATF Program** anchor.",
    customerProfileMatches: ["automotive_aftermarket", "municipal_fleet"],
    doNotConfuseWith: [
      "KLONDIKE ULV Full Synthetic ATF — Dexron ULV / Mercon ULV only.",
      "KLONDIKE Dexron VI / Mercon LV Full Synthetic — VI/LV spec row.",
      "KLONDIKE CVT Full Synthetic — CVT ≠ ATF.",
      "KLONDIKE Dual Clutch Full Synthetic — DCT ≠ ATF.",
      "KLONDIKE HD Full Synthetic ATF — Allison TES-295 severe column.",
    ],
    proofPoints: [
      "Allison C-3 / C-4 on index.",
      "DEXRON / MERCON multi-spec.",
      "Viscosity @40°C ~28.6 cSt; VI ~152; pour −51°C.",
    ],
    pdsMapKey: "Universal Full Synthetic ATF",
    cautionNotes: ["Never bulk-label as ULV, CVT, DCT, or TES-668.", "Confirm OEM approval string on tag before quoting drain interval."],
  }),

  txRow({
    id: "tx-canonical-dexron-vi-mercon-lv",
    productName: "KLONDIKE Dexron VI / Mercon LV Full Synthetic ATF",
    aliases: ["dexron vi", "mercon lv", "dexron vi mercon lv", "low viscosity atf"],
    hierarchyBranch: TRANSMISSION_CANONICAL_HIERARCHY_REF.lowViscosityAtf.branch,
    transmissionType: "low_viscosity_stepped_atf",
    productPositioning: "DEXRON VI and MERCON LV full synthetic ATF for modern 6–8 speed programs — not ULV 9–10 speed chemistry.",
    whatItIs:
      "Low-viscosity full synthetic ATF indexed for DEXRON VI and MERCON LV with anti-shudder and fuel economy language on the PDS map.",
    whyItWins:
      "Documented @40°C ~28.6 cSt, VI ~157, pour −51°C, and anti-shudder performance on index for OEM VI/LV nameplates.",
    frictionStrategy: "DEXRON VI / MERCON LV friction modifiers — separate from ULV, CVT, and DCT curves.",
    antiShudderPositioning: "Anti-shudder performance called out on PDS index for torque-converter shift quality.",
    fuelEconomyPositioning: "Improved fuel economy versus higher-viscosity legacy ATF per indexed summary.",
    severeDutyPositioning: "",
    coldTemperaturePositioning: "Brookfield @−40°C ~10,000 cP on index.",
    wetBrakePositioning: "",
    powershiftPositioning: "",
    OEMPositioning: "DEXRON VI; MERCON LV per PDS map index.",
    applications: ["GM and Ford modern automatics specifying VI or LV."],
    industries: ["automotive_aftermarket", "trucking_fleet"],
    customerPainSignals: ["ULV used where only VI/LV is approved.", "Universal ATF causing shudder on VI-spec unit."],
    troubleshootingAssociations: ["contamination", "seasonalFluidMismatch"],
    upgradeStory: ["VI/LV → ULV only when OEM explicitly lists Dexron ULV or Mercon ULV — not automatic."],
    repTalkTrack: ["VI and LV share this indexed row — if the tag says ULV, switch to the ULV SKU, not this drum."],
    productSpotlightAngle: "Low Viscosity ATF — DEXRON VI / MERCON LV.",
    categorySpotlightRole: "**Low Viscosity ATF Program**.",
    customerProfileMatches: ["automotive_aftermarket"],
    doNotConfuseWith: [
      "KLONDIKE ULV Full Synthetic ATF — 9–10 speed ULV chemistry (@40°C ~17.1 cSt on index).",
      "KLONDIKE Universal Full Synthetic ATF — broader multi-spec, not VI/LV-only positioning.",
      "KLONDIKE CVT Full Synthetic.",
      "KLONDIKE Dual Clutch Full Synthetic.",
    ],
    proofPoints: ["DEXRON VI; MERCON LV.", "Anti-shudder on index.", "@40°C ~28.6 cSt; VI ~157; pour −51°C."],
    pdsMapKey: "Dexron VI / Mercon LV Full Synthetic",
    cautionNotes: ["Not Dexron ULV / Mercon ULV — verify exact OEM string.", "Not for CVT or DCT hardware."],
  }),

  txRow({
    id: "tx-canonical-ulv-atf",
    productName: "KLONDIKE ULV Full Synthetic Automatic Transmission Fluid",
    aliases: ["ulv atf", "dexron ulv", "mercon ulv", "ultra low viscosity atf"],
    hierarchyBranch: TRANSMISSION_CANONICAL_HIERARCHY_REF.ultraLowViscosityAtf.branch,
    transmissionType: "ultra_low_viscosity_atf",
    productPositioning:
      "Ultra-low viscosity ATF for 9–10 speed and next-gen fuel-economy automatics requiring Dexron ULV / Mercon ULV — not universal or VI/LV substitute.",
    whatItIs:
      "Ultra-low viscosity full synthetic ATF indexed for Dexron ULV and Mercon ULV with @40°C ~17.1 cSt on the PDS map.",
    whyItWins:
      "Fuel-economy-optimized viscosity with Brookfield @−40°C ~4,750 cP and pour −54°C on index for modern high-speed automatics.",
    frictionStrategy: "ULV friction control for designated 9–10 speed hardware — wrong curve causes shudder and slip.",
    antiShudderPositioning: "Advanced friction control for next-gen drivetrains per indexed summary.",
    fuelEconomyPositioning: "Maximum fuel efficiency positioning for ULV-approved transmissions on PDS index.",
    severeDutyPositioning: "",
    coldTemperaturePositioning: "Brookfield @−40°C ~4,750 cP; pour −54°C on index.",
    wetBrakePositioning: "",
    powershiftPositioning: "",
    OEMPositioning: "Dexron ULV; Mercon ULV per PDS map index.",
    applications: ["9- and 10-speed and ULV-only OEM automatic programs."],
    industries: ["automotive_aftermarket", "trucking_fleet"],
    customerPainSignals: [
      "DEXRON VI drum in ULV-only transmission.",
      "Universal ATF top-off causing shudder on 10-speed.",
    ],
    troubleshootingAssociations: ["contamination", "seasonalFluidMismatch"],
    upgradeStory: ["No downgrade from ULV to VI/LV or universal without OEM bulletin."],
    repTalkTrack: [
      "ULV is its own bulk gun — @40°C ~17 cSt on the PDS index proves it is not the universal or VI drum.",
    ],
    productSpotlightAngle: "Ultra Low Viscosity ATF — 9/10-speed column.",
    categorySpotlightRole: "**Ultra Low Viscosity ATF Program**.",
    customerProfileMatches: ["automotive_aftermarket", "trucking_fleet"],
    doNotConfuseWith: [
      "KLONDIKE Dexron VI / Mercon LV Full Synthetic — higher viscosity VI/LV row.",
      "KLONDIKE Universal Full Synthetic ATF.",
      "KLONDIKE CVT Full Synthetic — CVT ≠ ULV ATF.",
      "KLONDIKE Dual Clutch Full Synthetic — DCT ≠ ULV ATF.",
    ],
    proofPoints: ["Dexron ULV; Mercon ULV.", "@40°C ~17.1 cSt; VI ~163; pour −54°C; Brookfield @−40°C ~4,750 cP."],
    pdsMapKey: "ULV Full Synthetic ATF",
    cautionNotes: ["ULV ≠ universal ATF ≠ DEXRON VI — triple-check OEM label.", "Never use in CVT or DCT sumps."],
  }),

  txRow({
    id: "tx-canonical-cvt",
    productName: "KLONDIKE CVT Fluid Full Synthetic",
    aliases: ["cvt fluid", "cvt full synthetic", "continuously variable transmission fluid"],
    hierarchyBranch: TRANSMISSION_CANONICAL_HIERARCHY_REF.cvt.branch,
    transmissionType: "cvt",
    productPositioning: "Full synthetic CVT fluid for belt- and chain-driven CVTs — never substituted with stepped ATF, ULV, or DCT fluid.",
    whatItIs:
      "Full synthetic CVT fluid with global CVT application language, anti-shudder durability, and friction stability per PDS map index.",
    whyItWins:
      "Stable friction and anti-shudder durability with VI ~185, pour −51°C, and CVT OEM application positioning on index.",
    frictionStrategy: "CVT belt/chain friction chemistry — incompatible with torque-converter ATF or DCT wet-clutch packages.",
    antiShudderPositioning: "Anti-shudder durability explicitly indexed for CVT shift quality.",
    fuelEconomyPositioning: "Fuel economy positioning for CVT drivetrains per indexed summary.",
    severeDutyPositioning: "",
    coldTemperaturePositioning: "Pour −51°C; @40°C ~33.8 cSt on index.",
    wetBrakePositioning: "",
    powershiftPositioning: "",
    OEMPositioning: "CVT applications (global OEM) per PDS map index.",
    applications: ["Belt- and chain-CVT passenger and light-duty programs per OEM chart."],
    industries: ["automotive_aftermarket"],
    customerPainSignals: [
      "Universal ATF or ULV in CVT sump.",
      "Shudder and belt slip after wrong-fluid flush.",
    ],
    troubleshootingAssociations: ["contamination"],
    upgradeStory: ["No cross-grade to DCT or ATF — CVT fluid only when CVT hardware is confirmed."],
    repTalkTrack: ["If it is a CVT, this is the indexed row — ATF and ULV drums stay on the shelf."],
    productSpotlightAngle: "CVT Program — belt/chain friction.",
    categorySpotlightRole: "**CVT Program** — separate from stepped ATF and DCT.",
    customerProfileMatches: ["automotive_aftermarket"],
    doNotConfuseWith: [
      "KLONDIKE Dual Clutch Full Synthetic — DCT ≠ CVT.",
      "KLONDIKE ULV Full Synthetic ATF.",
      "KLONDIKE Universal Full Synthetic ATF.",
      "KLONDIKE Dexron VI / Mercon LV Full Synthetic.",
    ],
    proofPoints: [
      "CVT applications (global OEM).",
      "Anti-shudder durability; friction stability.",
      "@40°C ~33.8 cSt; VI ~185; pour −51°C; flash ~200°C.",
    ],
    pdsMapKey: "CVT Full Synthetic",
    cautionNotes: ["CVT ≠ DCT ≠ ATF — confirm hardware before fill.", "Quote only printed CVT OEM lines from live PDS."],
  }),

  txRow({
    id: "tx-canonical-dct",
    productName: "KLONDIKE Full Synthetic Dual Clutch Transmission Fluid",
    aliases: ["dct fluid", "dual clutch transmission fluid", "dsg fluid"],
    hierarchyBranch: TRANSMISSION_CANONICAL_HIERARCHY_REF.dct.branch,
    transmissionType: "dct",
    productPositioning: "Full synthetic DCT fluid for dual-clutch transmissions — separate from CVT and conventional ATF sumps.",
    whatItIs:
      "Full synthetic DCT fluid with global DCT application, friction stability, and thermal stability language on the PDS map index.",
    whyItWins:
      "Precise friction control for wet-clutch DCT with @40°C ~34.0 cSt, VI ~173, pour −48°C, and flash ~230°C on index.",
    frictionStrategy: "DCT wet-clutch friction package — not CVT belt chemistry or torque-converter ATF.",
    antiShudderPositioning: "Smooth shifting via precise friction control per indexed summary.",
    fuelEconomyPositioning: "",
    severeDutyPositioning: "High load thermal stability language on index.",
    coldTemperaturePositioning: "Brookfield @−40°C ~9,000 cP on index.",
    wetBrakePositioning: "",
    powershiftPositioning: "",
    OEMPositioning: "DCT applications (global OEM) per PDS map index.",
    applications: ["OEM-listed dual-clutch transmission service."],
    industries: ["automotive_aftermarket"],
    customerPainSignals: ["CVT fluid in DCT.", "Universal ATF causing shudder on DCT."],
    troubleshootingAssociations: ["contamination", "highTemperatureHydraulics"],
    upgradeStory: ["Never downgrade DCT to CVT or ATF — separate SKU and bulk labeling."],
    repTalkTrack: ["DCT and CVT are different friction classes — read the cap, not the marketing name ‘synthetic trans fluid’."],
    productSpotlightAngle: "DCT Program — wet-clutch precision.",
    categorySpotlightRole: "**DCT Program** — parallel to CVT, not interchangeable.",
    customerProfileMatches: ["automotive_aftermarket"],
    doNotConfuseWith: [
      "KLONDIKE CVT Full Synthetic — CVT ≠ DCT.",
      "KLONDIKE ULV Full Synthetic ATF.",
      "KLONDIKE Universal Full Synthetic ATF.",
    ],
    proofPoints: [
      "DCT applications (global OEM).",
      "Friction stability.",
      "@40°C ~34.0 cSt; VI ~173; pour −48°C; flash ~230°C.",
    ],
    pdsMapKey: "Dual Clutch Full Synthetic",
    cautionNotes: ["DCT ≠ CVT — confirm transmission type.", "Do not substitute with stepped ATF or ULV."],
  }),

  txRow({
    id: "tx-canonical-hd-atf-tes295",
    productName: "KLONDIKE HD Full Synthetic Automatic Transmission Fluid",
    aliases: ["hd full synthetic atf", "allison tes 295", "tes-295 atf", "heavy duty atf"],
    hierarchyBranch: TRANSMISSION_CANONICAL_HIERARCHY_REF.tes295.branch,
    transmissionType: "heavy_duty_stepped_atf",
    productPositioning:
      "Heavy-duty full synthetic ATF for extended drain and severe service — Allison TES-295 on index, not TES-668 unless OEM allows.",
    whatItIs:
      "Heavy-duty full synthetic ATF meeting Allison TES-295 performance with extended drain and severe-service language on the PDS map.",
    whyItWins:
      "TES-295 positioning with VI >184, @40°C ~34.8 cSt, pour −51°C, and extended drain capability on index for vocational automatics.",
    frictionStrategy: "Allison severe-duty friction — separate from passenger ULV and CVT chemistry.",
    antiShudderPositioning: "",
    fuelEconomyPositioning: "",
    severeDutyPositioning: "Extended drain intervals and severe service for Class 8 and vocational automatics per index.",
    coldTemperaturePositioning: "Brookfield @−40°C ~8,000 cP on index.",
    wetBrakePositioning: "",
    powershiftPositioning: "",
    OEMPositioning: "Allison TES-295; Allison C-3 / C-4 per PDS map index.",
    applications: ["Allison TES-295 vocational and on-highway automatic programs."],
    industries: ["trucking_fleet", "municipal_fleet", "construction"],
    customerPainSignals: [
      "TES-668 marketed where TES-295 is still required.",
      "Passenger ATF in Allison transmission.",
    ],
    troubleshootingAssociations: ["contamination", "oxidationVarnish"],
    upgradeStory: ["TES-295 → HD SYN DRIVE TES-668 when OEM bulletin lists TES-668 — confirm back-service notes on live PDS."],
    repTalkTrack: [
      "Allison tag first: TES-295 is this drum — TES-668 is HD SYN DRIVE, not interchangeable marketing.",
    ],
    productSpotlightAngle: "TES-295 severe-duty ATF column.",
    categorySpotlightRole: "**Heavy Duty Automatic Transmission** — TES-295 anchor.",
    customerProfileMatches: ["trucking_fleet", "municipal_fleet", "construction"],
    doNotConfuseWith: [
      "KLONDIKE HD SYN DRIVE TES 668 — TES-668 next-gen row (back-service to TES-295 noted on SYN DRIVE index only when OEM permits).",
      "KLONDIKE Universal Full Synthetic ATF — passenger/light multi-spec.",
      "KLONDIKE ULV Full Synthetic ATF.",
      "TDTO-4 products — TO-4 off-road powershift, not on-highway Allison ATF.",
    ],
    proofPoints: [
      "Allison TES-295.",
      "Allison C-3 / C-4.",
      "Extended drain capability on index.",
      "@40°C ~34.8 cSt; VI >184; pour −51°C.",
    ],
    pdsMapKey: "HD Full Synthetic ATF",
    cautionNotes: ["TES-295 ≠ TES-668 without OEM proof.", "Not TO-4, CVT, DCT, or ULV chemistry."],
  }),

  txRow({
    id: "tx-canonical-hd-syn-drive-tes668",
    productName: "KLONDIKE HD SYN DRIVE Full Synthetic Transmission Fluid",
    aliases: ["hd syn drive", "tes 668", "tes-668", "allison tes 668"],
    hierarchyBranch: TRANSMISSION_CANONICAL_HIERARCHY_REF.tes668.branch,
    transmissionType: "heavy_duty_stepped_atf",
    productPositioning:
      "Premium Allison TES-668 full synthetic ATF — superior shift and extended drain vs TES-295 row when OEM specifies TES-668.",
    whatItIs:
      "Full synthetic transmission fluid approved for Allison TES-668 with TES-295 back-serviceable language on the PDS map index.",
    whyItWins:
      "TES-668 approval with enhanced shear stability, @40°C ~34.1 cSt, VI ~170, and extended service interval positioning on index.",
    frictionStrategy: "TES-668 Allison friction program — do not bulk as TES-295 without OEM alignment.",
    antiShudderPositioning: "Superior shift performance language on indexed summary.",
    fuelEconomyPositioning: "",
    severeDutyPositioning: "Heavy-duty extended service with thermal stability per index.",
    coldTemperaturePositioning: "Pour −51°C; Brookfield @−40°C ~11,000 cP on index.",
    wetBrakePositioning: "",
    powershiftPositioning: "",
    OEMPositioning: "Allison TES-668; Allison TES-295 (back serviceable) per PDS map index.",
    applications: ["Allison TES-668 specified vocational and on-highway programs."],
    industries: ["trucking_fleet", "municipal_fleet", "construction", "mining"],
    customerPainSignals: [
      "TES-295 drum in TES-668-only transmission.",
      "Assuming all ‘HD ATF’ drums are the same Allison generation.",
    ],
    troubleshootingAssociations: ["contamination", "oxidationVarnish"],
    upgradeStory: ["Upgrade from TES-295 only when OEM lists TES-668 — confirm back-service footnotes on live PDS."],
    repTalkTrack: [
      "668 is HD SYN DRIVE on the index — 295 is the HD Full Synthetic ATF SKU; read the Allison spec plate.",
    ],
    productSpotlightAngle: "TES-668 next-gen severe ATF.",
    categorySpotlightRole: "**TES-668 Program** — upgrade path from TES-295 when OEM allows.",
    customerProfileMatches: ["trucking_fleet", "municipal_fleet", "mining_aggregate"],
    doNotConfuseWith: [
      "KLONDIKE HD Full Synthetic ATF — primary TES-295 indexed row.",
      "KLONDIKE Universal or ULV ATF.",
      "TDTO-4 drivetrain oils — TO-4 off-road, not Allison ATF.",
    ],
    proofPoints: [
      "Allison TES-668.",
      "Allison TES-295 back serviceable on index.",
      "Enhanced shear stability.",
      "@40°C ~34.1 cSt; VI ~170; pour −51°C.",
    ],
    pdsMapKey: "HD SYN DRIVE TES 668",
    cautionNotes: [
      "TES-668 vs TES-295 is not automatic upsell — OEM tag governs.",
      "Back-service language on index does not override TES-668-only hardware.",
    ],
  }),

  txRow({
    id: "tx-canonical-sae-40-es",
    productName: "KLONDIKE SAE 40 Full Synthetic ES Transmission Lubricant",
    aliases: ["sae 40 es", "40 es transmission", "extended service manual transmission"],
    hierarchyBranch: TRANSMISSION_CANONICAL_HIERARCHY_REF.manualTransmission.branch,
    transmissionType: "manual_mt1",
    productPositioning: "SAE 40 full synthetic extended-service manual transmission lubricant — API MT-1 / Eaton PS-386 lane.",
    whatItIs:
      "Full synthetic extended service transmission lubricant for heavy-duty manual transmissions per API MT-1 and Eaton PS-386 on index.",
    whyItWins:
      "Extended drain with @40°C ~96 cSt, VI ~165, pour −50°C, and Mack TO-A Plus language on PDS map.",
    frictionStrategy: "MT-1 gear protection — not synchromesh GL-4 yellow-metal package.",
    antiShudderPositioning: "",
    fuelEconomyPositioning: "Improved fuel efficiency language on indexed summary.",
    severeDutyPositioning: "Severe operating conditions for HD manual boxes per index.",
    coldTemperaturePositioning: "Pour −50°C on index.",
    wetBrakePositioning: "",
    powershiftPositioning: "",
    OEMPositioning: "API MT-1; Eaton PS-386; Mack TO-A Plus per PDS map index.",
    applications: ["Heavy-duty manual transmissions specifying MT-1 / PS-386 programs."],
    industries: ["trucking_fleet", "construction", "mining"],
    customerPainSignals: ["GL-5 axle oil in manual transmission.", "Wrong SAE 40 product (engine oil) in gearbox."],
    troubleshootingAssociations: ["contamination", "pumpWear"],
    upgradeStory: ["40 ES → 50 MT-1 row when OEM tags heavier SAE 50 severe program."],
    repTalkTrack: ["40 ES is the extended-service manual row — not 75W-80 synchromesh and not rear axle GL-5 by habit."],
    productSpotlightAngle: "Manual Transmission — SAE 40 ES column.",
    categorySpotlightRole: "**Manual Transmission Program** — extended service.",
    customerProfileMatches: ["trucking_fleet", "construction"],
    doNotConfuseWith: [
      "KLONDIKE SAE 75W-80 Synchromesh — GL-4 yellow metal synchromesh fluid.",
      "KLONDIKE SAE 50 Manual Transmission — heavier MT-1 SAE 50 row.",
      "Hypoid GL-5 gear oils — different additive package.",
      "Engine oils — not MT-1 manual transmission substitutes.",
    ],
    proofPoints: ["API MT-1.", "Eaton PS-386.", "Mack TO-A Plus.", "@40°C ~96 cSt; VI ~165; extended drain on index."],
    pdsMapKey: "SAE 40 ES Transmission",
    cautionNotes: ["Manual transmission only — not ATF, CVT, or DCT.", "Not synchromesh GL-4 passenger manual default."],
  }),

  txRow({
    id: "tx-canonical-sae-50-manual",
    productName: "KLONDIKE SAE 50 Full Synthetic Manual Transmission Lubricant",
    aliases: ["sae 50 manual", "mt-1 50", "50 weight manual transmission"],
    hierarchyBranch: TRANSMISSION_CANONICAL_HIERARCHY_REF.manualTransmission.branch,
    transmissionType: "manual_mt1",
    productPositioning: "SAE 50 full synthetic MT-1 manual lubricant for long drain severe HD manuals.",
    whatItIs:
      "Heavy-duty full synthetic manual transmission lubricant with API MT-1, Eaton PS-164, and Volvo 97305 on PDS map index.",
    whyItWins:
      "Strong film strength with @40°C ~120 cSt, VI ~165, pour −50°C, and heavy-duty protection language on index.",
    frictionStrategy: "MT-1 severe manual protection — thicker than 40 ES row when OEM specifies SAE 50.",
    antiShudderPositioning: "",
    fuelEconomyPositioning: "",
    severeDutyPositioning: "Long drain severe service across wide temperature range per index.",
    coldTemperaturePositioning: "Pour −50°C on index.",
    wetBrakePositioning: "",
    powershiftPositioning: "",
    OEMPositioning: "API MT-1; Eaton PS-164; Volvo 97305 per PDS map index.",
    applications: ["HD manual transmissions specifying SAE 50 MT-1 programs."],
    industries: ["trucking_fleet", "construction", "mining"],
    customerPainSignals: ["40 ES used where SAE 50 MT-1 is tagged.", "Axle GL-5 in manual box."],
    troubleshootingAssociations: ["contamination", "pumpWear"],
    upgradeStory: ["Use 40 ES when OEM lists lighter extended-service SAE 40 — not automatic interchange."],
    repTalkTrack: ["Fifty-weight MT-1 is this PDS row — don’t pull 40 ES or synchromesh off the shelf by guesswork."],
    productSpotlightAngle: "Manual Transmission — SAE 50 MT-1.",
    categorySpotlightRole: "**Manual Transmission Program** — severe SAE 50.",
    customerProfileMatches: ["trucking_fleet", "mining_aggregate"],
    doNotConfuseWith: [
      "KLONDIKE SAE 40 ES Transmission.",
      "KLONDIKE 75W-80 Synchromesh — GL-4 light-duty manual.",
      "GL-5 hypoid gear oil.",
    ],
    proofPoints: ["API MT-1.", "Eaton PS-164.", "Volvo 97305.", "@40°C ~120 cSt; VI ~165; pour −50°C."],
    pdsMapKey: "SAE 50 Manual Transmission",
    cautionNotes: ["Not for synchromesh GL-4 passenger manuals.", "Not ATF or TO-4 products."],
  }),

  txRow({
    id: "tx-canonical-75w80-synchromesh",
    productName: "KLONDIKE SAE 75W-80 Synchromesh Full Synthetic Manual Transmission Fluid",
    aliases: ["75w80 synchromesh", "synchromesh gl-4", "gl-4 manual transmission"],
    hierarchyBranch: TRANSMISSION_CANONICAL_HIERARCHY_REF.synchromesh.branch,
    transmissionType: "synchromesh_gl4",
    productPositioning:
      "GL-4 synchromesh fluid with yellow metal compatibility — not hypoid GL-5 axle oil and not MT-1 HD manual lube.",
    whatItIs:
      "Full synthetic synchromesh fluid with API GL-4, SAE 75W-80, and yellow metal compatible language on the PDS map index.",
    whyItWins:
      "Smooth shift and yellow metal protection with @40°C ~45 cSt, VI ~193, pour −48°C on index for passenger/light truck manuals.",
    frictionStrategy: "GL-4 synchromesh friction — protects brass/copper synchronizers; GL-5 EP chemistry is wrong class.",
    antiShudderPositioning: "Smooth shift performance on index.",
    fuelEconomyPositioning: "",
    severeDutyPositioning: "",
    coldTemperaturePositioning: "Pour −48°C on index.",
    wetBrakePositioning: "",
    powershiftPositioning: "",
    OEMPositioning: "API GL-4; SAE 75W-80 per PDS map index.",
    applications: ["Manual transmissions requiring GL-4 and yellow metal compatibility."],
    industries: ["automotive_aftermarket"],
    customerPainSignals: [
      "GL-5 axle oil in synchromesh manual causing shift grind.",
      "MT-1 HD manual fluid in light-duty GL-4 box.",
    ],
    troubleshootingAssociations: ["contamination"],
    upgradeStory: ["Stay GL-4 for synchromesh — HD MT-1 rows only when OEM exits GL-4 chart."],
    repTalkTrack: [
      "Yellow metal means GL-4 synchromesh — not the GL-5 pail from the differential job.",
    ],
    productSpotlightAngle: "Synchromesh — GL-4 yellow metal.",
    categorySpotlightRole: "**Synchromesh Program**.",
    customerProfileMatches: ["automotive_aftermarket"],
    doNotConfuseWith: [
      "Hypoid GL-5 gear oils — axle EP chemistry, not synchromesh.",
      "KLONDIKE SAE 40 ES / SAE 50 Manual Transmission — MT-1 HD manuals.",
      "Any ATF, CVT, or DCT fluid.",
    ],
    proofPoints: ["API GL-4.", "SAE 75W-80.", "Yellow metal compatible.", "@40°C ~45 cSt; VI ~193; pour −48°C."],
    pdsMapKey: "75W-80 Synchromesh",
    cautionNotes: ["Synchromesh ≠ hypoid gear oil.", "Not for HD MT-1 vocational manuals unless OEM lists GL-4."],
  }),

  txRow({
    id: "tx-canonical-tdto-sae-grades",
    productName: "KLONDIKE TDTO-4 Transmission Drive Train Oils (SAE Grades)",
    aliases: ["tdto-4 sae 10w", "tdto-4 sae 30", "tdto-4 sae 50", "to-4 straight grade", "cat to-4"],
    hierarchyBranch: TRANSMISSION_CANONICAL_HIERARCHY_REF.tdto4.branch,
    transmissionType: "tdto_to4_straight",
    productPositioning:
      "Straight-grade TDTO-4 / CAT TO-4 drivetrain oils in SAE 10W / 30 / 50 — off-road powershift and wet-brake-compatible sump programs.",
    whatItIs:
      "Heavy-duty transmission and drivetrain oils in multiple SAE grades for CAT TO-4 with wet brake performance language on the PDS map.",
    whyItWins:
      "Reliable TO-4 friction and wear control with SAE ladder, TBN ~7.1, and Allison C-4 on index for severe equipment.",
    frictionStrategy: "CAT TO-4 friction for clutch and brake packs — not engine oil or on-highway ATF.",
    antiShudderPositioning: "",
    fuelEconomyPositioning: "",
    severeDutyPositioning: "Severe-duty mining, construction, and agricultural drivetrain per index.",
    coldTemperaturePositioning: "Grade selection by climate — SAE 10W / 30 / 50 on index.",
    wetBrakePositioning: "Wet brake performance called out on PDS map index for shared sump duty.",
    powershiftPositioning: "Powershift and drivetrain friction for CAT TO-4 hardware.",
    OEMPositioning: "CAT TO-4; Allison C-4; API GL-3 per PDS map index.",
    applications: ["CAT TO-4 powershift transmissions and drive trains specifying straight SAE grades."],
    industries: ["construction", "mining", "agriculture"],
    customerPainSignals: [
      "Engine oil in TO-4 sump.",
      "ATF top-off on powershift transmission.",
      "Wrong SAE grade seasonally.",
    ],
    troubleshootingAssociations: ["wetBrakeChatter", "contamination"],
    upgradeStory: [
      "Straight grade → All Season Syn Blend or Synthetic Multigrade when OEM allows wider temperature window.",
    ],
    repTalkTrack: [
      "TO-4 is not engine oil — read CAT TO-4 on the tag, then pick 10W, 30, or 50 from the indexed SAE ladder.",
    ],
    productSpotlightAngle: "TDTO-4 — straight-grade TO-4 column.",
    categorySpotlightRole: "**TDTO-4 Program** — straight grades in **Off-Road Drivetrain**.",
    customerProfileMatches: ["construction", "mining_aggregate", "agriculture"],
    doNotConfuseWith: [
      "KLONDIKE TDTO-4 All Season Syn Blend — 10W-40 all-season row.",
      "KLONDIKE TDTO-4 Arctic Full Synthetic — arctic TO-4.",
      "KLONDIKE TDTO-4 Synthetic Multigrade — full synthetic multigrade TO-4.",
      "Any CK-4 engine oil or Allison TES-295 ATF.",
    ],
    proofPoints: ["CAT TO-4.", "Allison C-4.", "API GL-3.", "SAE 10W / 30 / 50.", "TBN ~7.1.", "Wet brake performance on index."],
    pdsMapKey: "TDTO-4 SAE Grades",
    cautionNotes: ["TO-4 ≠ engine oil.", "Confirm SAE grade on dipstick before bulk change."],
  }),

  txRow({
    id: "tx-canonical-tdto-all-season",
    productName: "KLONDIKE TDTO-4 All Season Synthetic Blend Transmission Drive Train Oil",
    aliases: ["tdto-4 all season", "to-4 all season syn blend", "10w40 tdto"],
    hierarchyBranch: TRANSMISSION_CANONICAL_HIERARCHY_REF.tdto4.branch,
    transmissionType: "tdto_to4_multigrade",
    productPositioning: "All-season TO-4 / TO-4M synthetic blend 10W-40 for varied-temperature off-road drivetrain bulk.",
    whatItIs:
      "All-season synthetic blend drivetrain fluid with CAT TO-4 / TO-4M, SAE 10W-40, and wet brake compatibility on PDS map index.",
    whyItWins:
      "Year-round TO-4 friction with VI ~140, pour −41°C, TBN ~7.2, and wet brake compatibility on index.",
    frictionStrategy: "TO-4M all-season friction — consolidates seasonal straight-grade changes where OEM permits 10W-40 TO-4.",
    antiShudderPositioning: "",
    fuelEconomyPositioning: "",
    severeDutyPositioning: "Heavy-duty equipment TO-4 all-season programs per index.",
    coldTemperaturePositioning: "Pour −41°C — broader window than mono-grade TO-4 in many climates.",
    wetBrakePositioning: "Wet brake compatibility on indexed summary.",
    powershiftPositioning: "Powershift TO-4M drivetrain service.",
    OEMPositioning: "CAT TO-4 / TO-4M; Allison C-4; SAE 10W-40 per PDS map index.",
    applications: ["Mixed-season CAT TO-4 fleets seeking single 10W-40 bulk."],
    industries: ["construction", "agriculture", "mining"],
    customerPainSignals: ["Winter straight-grade without arctic plan.", "Engine oil in TO-4M sump."],
    troubleshootingAssociations: ["wetBrakeChatter", "seasonalFluidMismatch"],
    upgradeStory: ["All Season → Arctic Full Synthetic for extreme northern cold when OEM allows."],
    repTalkTrack: [
      "All Season is the 10W-40 TO-4M indexed row — still not ATF for Allison highway automatics.",
    ],
    productSpotlightAngle: "TDTO-4 All Season synthetic blend.",
    categorySpotlightRole: "**TDTO-4 Program** — all-season **Off-Road Drivetrain**.",
    customerProfileMatches: ["construction", "agriculture"],
    doNotConfuseWith: [
      "KLONDIKE TDTO-4 SAE Grades — straight 10W/30/50 ladder.",
      "KLONDIKE TDTO-4 Arctic Full Synthetic.",
      "KLONDIKE TDTO-4 Synthetic Multigrade — full synthetic multigrade TO-4.",
    ],
    proofPoints: ["CAT TO-4 / TO-4M.", "SAE 10W-40.", "VI ~140.", "Pour −41°C.", "TBN ~7.2.", "Wet brake compatibility."],
    pdsMapKey: "TDTO-4 All Season Syn Blend",
    cautionNotes: ["TO-4M ≠ highway ATF.", "Arctic extreme cold may need Arctic TDTO row per OEM."],
  }),

  txRow({
    id: "tx-canonical-tdto-arctic",
    productName: "KLONDIKE TDTO-4 Arctic Full Synthetic Transmission Drive Train Oil",
    aliases: ["arctic tdto", "tdto-4 arctic", "to-4 arctic full synthetic"],
    hierarchyBranch: TRANSMISSION_CANONICAL_HIERARCHY_REF.arcticTdto.branch,
    transmissionType: "tdto_to4_arctic",
    productPositioning: "Arctic full synthetic TO-4 for extreme cold startup and drivetrain protection — not all-season or straight-grade default.",
    whatItIs:
      "Arctic-grade full synthetic drivetrain fluid with CAT TO-4, VI ~202, pour −60°C, and cold temperature performance on PDS map index.",
    whyItWins:
      "Extreme cold pour −60°C and VI ~202 with @40°C ~32.9 cSt for northern mining and construction TO-4 programs.",
    frictionStrategy: "TO-4 arctic friction stability — maintains clutch/brake performance at cold startup per index.",
    antiShudderPositioning: "",
    fuelEconomyPositioning: "",
    severeDutyPositioning: "Harsh cold severe-duty TO-4 per indexed summary.",
    coldTemperaturePositioning: "Pour −60°C — primary arctic startup story for TO-4 bulk.",
    wetBrakePositioning: "",
    powershiftPositioning: "Arctic powershift and drivetrain TO-4 service.",
    OEMPositioning: "CAT TO-4; Allison C-4 per PDS map index.",
    applications: ["Extreme cold environments requiring arctic TO-4 full synthetic."],
    industries: ["mining", "construction", "agriculture"],
    customerPainSignals: ["All-season TO-4 in −40°C startup failures.", "Slow wet brake response after cold soak."],
    troubleshootingAssociations: ["sluggishColdStartup", "wetBrakeChatter"],
    upgradeStory: ["Arctic TDTO for extreme north; return to All Season or multigrade when equipment moves south per OEM."],
    repTalkTrack: [
      "−60°C pour on the index is the arctic TO-4 story — don’t sell all-season 10W-40 for northern January startups without OEM OK.",
    ],
    productSpotlightAngle: "Arctic TDTO-4 — extreme cold TO-4.",
    categorySpotlightRole: "**Arctic TDTO Program** within **Off-Road Drivetrain**.",
    customerProfileMatches: ["mining_aggregate", "construction"],
    doNotConfuseWith: [
      "KLONDIKE TDTO-4 All Season Syn Blend.",
      "KLONDIKE TDTO-4 SAE Grades.",
      "Arctic tractor UTF — J20C multi-functional, not TO-4 TDTO bulk.",
    ],
    proofPoints: ["CAT TO-4.", "Allison C-4.", "VI ~202.", "Pour −60°C.", "@40°C ~32.9 cSt.", "TBN ~7.2."],
    pdsMapKey: "TDTO-4 Arctic Full Synthetic",
    cautionNotes: ["Arctic TO-4 ≠ arctic engine oil.", "Confirm TO-4 requirement before arctic bulk."],
  }),

  txRow({
    id: "tx-canonical-tdto-synthetic-multigrade",
    productName: "KLONDIKE TDTO-4 Synthetic Multigrade Fluids",
    aliases: ["tdto-4 synthetic multigrade", "to-4 synthetic multigrade", "synthetic tdto"],
    hierarchyBranch: TRANSMISSION_CANONICAL_HIERARCHY_REF.offRoadDrivetrain.branch,
    transmissionType: "tdto_to4_synthetic_multigrade",
    productPositioning:
      "Full synthetic multigrade TO-4 for temperature extremes — BETTER TO-4 tier vs all-season blend when OEM allows synthetic multigrade.",
    whatItIs:
      "Full synthetic multigrade transmission and drivetrain fluid for Caterpillar TO-4 with VI ~176–188 and pour −54°C on PDS map index.",
    whyItWins:
      "Superior temperature span and clutch performance with TBN ~7.2 and extended service life language on index.",
    frictionStrategy: "Full synthetic TO-4 multigrade friction — upgrade from syn blend and straight grades when spec allows.",
    antiShudderPositioning: "",
    fuelEconomyPositioning: "",
    severeDutyPositioning: "Extreme temperature severe TO-4 duty per index.",
    coldTemperaturePositioning: "Pour −54°C; VI ~176–188 on index.",
    wetBrakePositioning: "",
    powershiftPositioning: "Synthetic multigrade powershift TO-4 programs.",
    OEMPositioning: "CAT TO-4; Allison C-4; API GL-3 per PDS map index.",
    applications: ["TO-4 fleets needing full synthetic multigrade temperature performance."],
    industries: ["mining", "construction", "agriculture"],
    customerPainSignals: ["Straight-grade inventory complexity.", "Syn blend used where synthetic multigrade is specified."],
    troubleshootingAssociations: ["seasonalFluidMismatch", "contamination"],
    upgradeStory: ["Synthetic multigrade as BETTER TO-4 tier from All Season or straight grades when OEM permits."],
    repTalkTrack: [
      "Synthetic multigrade is the full synthetic TO-4 row on the index — still not TES-668 Allison ATF.",
    ],
    productSpotlightAngle: "Synthetic Multigrade TDTO-4.",
    categorySpotlightRole: "**Off-Road Drivetrain** — full synthetic TO-4 multigrade.",
    customerProfileMatches: ["mining_aggregate", "construction"],
    doNotConfuseWith: [
      "KLONDIKE TDTO-4 All Season Syn Blend — synthetic blend 10W-40, not full synthetic multigrade.",
      "KLONDIKE HD SYN DRIVE — Allison TES-668 ATF, not TO-4.",
      "Engine oils and highway ATF products.",
    ],
    proofPoints: ["CAT TO-4.", "Allison C-4.", "API GL-3.", "VI ~176–188.", "Pour −54°C.", "TBN ~7.2."],
    pdsMapKey: "TDTO-4 Synthetic Multigrade",
    cautionNotes: ["TO-4 synthetic multigrade ≠ CVT/ULV/ATF.", "Verify CAT TO-4 on nameplate."],
  }),

  txRow({
    id: "tx-canonical-wet-brake-fluid",
    productName: "KLONDIKE Wet Brake Fluid Full Synthetic",
    aliases: ["wet brake fluid", "full synthetic wet brake", "wet brake lubricant"],
    hierarchyBranch: TRANSMISSION_CANONICAL_HIERARCHY_REF.wetBrakePowershift.branch,
    transmissionType: "wet_brake_powershift",
    productPositioning:
      "Dedicated full synthetic wet brake / power transmission fluid — chatter control and friction for wet brake systems, not engine oil top-off.",
    whatItIs:
      "Full synthetic multi-functional fluid for wet brake systems and power transmission with API GL-4 and wet brake performance on PDS map index.",
    whyItWins:
      "Wet brake performance with pour −51°C, VI ~167, and John Deere J20C/J20D language on index for equipment specifying wet brake fluid.",
    frictionStrategy: "Wet brake friction and wear control — separate from engine oil and generic ATF habit.",
    antiShudderPositioning: "Friction control supports smooth engagement — pair with wetBrakeChatter troubleshooting when sump was wrong fluid.",
    fuelEconomyPositioning: "",
    severeDutyPositioning: "Heavy-duty equipment wet brake and power transmission per index.",
    coldTemperaturePositioning: "Brookfield @−35°C ~11,500 cP on index.",
    wetBrakePositioning: "Primary wet brake chatter reduction story — correct category for brake pack friction.",
    powershiftPositioning: "Power transmission in heavy-duty equipment per indexed summary.",
    OEMPositioning: "API GL-4; Allison C-4; John Deere J20C/J20D per PDS map index.",
    applications: ["Dedicated wet brake reservoirs and specified wet brake / power transmission systems."],
    industries: ["agriculture", "construction", "mining"],
    customerPainSignals: [
      "Hydraulic AW in wet brake reservoir causing chatter.",
      "Engine oil or ATF in wet brake system.",
    ],
    troubleshootingAssociations: ["wetBrakeChatter", "contamination"],
    upgradeStory: ["Wrong-fluid flush to Wet Brake Fluid when OEM calls dedicated wet brake lubricant — not UTF unless tag lists UTF."],
    repTalkTrack: [
      "Chatter after top-off means wrong category — this is the indexed wet brake row, not engine oil or highway ATF.",
    ],
    productSpotlightAngle: "Wet Brake / Powershift — dedicated wet brake fluid.",
    categorySpotlightRole: "**Wet Brake / Powershift Program**.",
    customerProfileMatches: ["agriculture", "construction"],
    doNotConfuseWith: [
      "KLONDIKE Universal Tractor Fluid — UTF multi-functional when OEM specifies UTF, not every wet brake tank.",
      "KLONDIKE TDTO-4 products — TO-4 drivetrain bulk for CAT powershift sumps.",
      "Engine oils and CK-4 diesel products.",
      "Highway ATF (TES-295 / ULV) — different friction class.",
    ],
    proofPoints: [
      "API GL-4.",
      "Allison C-4.",
      "John Deere J20C/J20D.",
      "Wet brake performance on index.",
      "Pour −51°C; VI ~167.",
    ],
    pdsMapKey: "Wet Brake Fluid Full Synthetic",
    cautionNotes: [
      "Confirm reservoir label — UTF, TDTO, or dedicated wet brake each have different indexed rows.",
      "Wet brake chatter after wrong fluid may require flush beyond top-off.",
    ],
  }),
];

/** @type {Readonly<Record<string, TransmissionCanonicalProductIntelligence>>} */
const TRANSMISSION_CANONICAL_BY_ID = Object.freeze(
  Object.fromEntries(TRANSMISSION_CANONICAL_PRODUCT_ROWS.map((p) => [p.id, p]))
);

/** @type {Readonly<{ version: number, category: "transmission_drivetrain", products: readonly TransmissionCanonicalProductIntelligence[] }>} */
export const TRANSMISSION_CANONICAL_PRODUCT_INTELLIGENCE = Object.freeze({
  version: TRANSMISSION_CANONICAL_PRODUCT_INTELLIGENCE_VERSION,
  category: "transmission_drivetrain",
  products: Object.freeze(TRANSMISSION_CANONICAL_PRODUCT_ROWS),
});

/** @returns {readonly TransmissionCanonicalProductIntelligence[]} */
export function listTransmissionCanonicalProductIntelligence() {
  return TRANSMISSION_CANONICAL_PRODUCT_INTELLIGENCE.products;
}

/**
 * @param {unknown} id
 * @returns {TransmissionCanonicalProductIntelligence | null}
 */
export function getTransmissionCanonicalProductIntelligenceById(id) {
  const key = String(id ?? "").trim();
  if (!key) return null;
  return TRANSMISSION_CANONICAL_BY_ID[key] || null;
}

/**
 * @param {unknown} pdsMapKey
 * @returns {TransmissionCanonicalProductIntelligence | null}
 */
export function getTransmissionCanonicalProductIntelligenceByPdsKey(pdsMapKey) {
  const key = String(pdsMapKey ?? "").trim();
  if (!key) return null;
  return TRANSMISSION_CANONICAL_PRODUCT_INTELLIGENCE.products.find((p) => p.pdsMapKey === key) || null;
}

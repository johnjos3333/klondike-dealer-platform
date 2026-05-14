/**
 * OEM / spec lubrication knowledge — deterministic profiles for advisor intelligence.
 * Not wired to UI yet.
 */

export const oemSpecKnowledge = {
  allison: {
    id: "allison",
    name: "Allison Transmission",
    type: "oem",
    aliases: [
      "allison",
      "allison transmission",
      "allison trans",
      "allison atf",
      "tes 295",
      "tes 668",
      "tes-295",
      "tes-668",
    ],
    relatedSpecs: [
      "Allison TES-295",
      "Allison TES 668",
      "Allison C-3",
      "Allison C-4",
      "Allison C4",
    ],
    applicationCategory: "automatic_transmission_and_transmission_hydraulic",
    explanation:
      "Allison approvals govern automatic transmission fluids and some multi-functional tractor/transmission fluids. TES-295 and TES 668 are common heavy-duty ATF performance lines; C-3/C-4 appear on older transmission and UTTO-type fluids. Always confirm the exact Allison approval on the dipstick, tag, or OEM manual before quoting.",
    productCategoriesToConsider: [
      "automatic_transmission_fluid",
      "transmission_hydraulic_fluid",
      "fleet_atf",
    ],
    questionsToAsk: [
      "What Allison approval is printed on the fill cap or maintenance schedule—TES-295, TES 668, or C-4?",
      "Is this a highway vocational truck, bus, or off-road unit with a separate transmission cooler?",
      "What drain interval and severity (P&D, refuse, transit) are you targeting?",
      "Any prior fluid brand or shift complaints we should avoid repeating?",
    ],
    repTalkTrack:
      "Allison specs are approval-driven, not viscosity guesses. I'll match your TES or C-series requirement to a Klondike ATF that explicitly lists that approval on the PDS—if the exact approval isn't in our library, we'll flag it for confirmation instead of substituting.",
    cautionNotes: [
      "Do not substitute TES-295, TES 668, and C-4 fluids without OEM confirmation.",
      "Mixed fleets may have multiple Allison generations—verify per unit.",
    ],
    specSearchTerms: [
      "allison",
      "tes 295",
      "tes-295",
      "tes 668",
      "tes-668",
      "c-4",
      "c4",
      "c-3",
    ],
    keywords: ["allison", "transmission", "atf", "tes", "automatic"],
  },

  ford: {
    id: "ford",
    name: "Ford",
    type: "oem",
    aliases: [
      "ford",
      "ford motor",
      "ford truck",
      "ford atf",
      "mercon",
      "type f",
      "wss-m2c",
      "m2c",
    ],
    relatedSpecs: [
      "Ford MERCON LV",
      "Ford MERCON ULV",
      "Ford MERCON V",
      "Ford M2C946-B1",
      "Ford M2C961-A1",
      "Ford M2C33-F",
      "Ford WSS-M2C945-B1",
    ],
    applicationCategory: "passenger_light_duty_and_fleet_drivetrain",
    explanation:
      "Ford lubricant specs span ATF (MERCON generations), gasoline engine oils (WSS-M2C), and legacy Type F applications. MERCON LV/ULV are common on modern automatics; older units may still reference Type F or earlier MERCON grades. Use the owner manual or fill-cap marking as the source of truth.",
    productCategoriesToConsider: [
      "automatic_transmission_fluid",
      "passenger_car_motor_oil",
      "diesel_pickup_engine_oil",
    ],
    questionsToAsk: [
      "Which Ford spec is on the cap—MERCON LV, ULV, V, or an M2C engine oil spec?",
      "Model year and engine family (Power Stroke, EcoBoost, gas V8)?",
      "Dealership warranty or fleet bulk program requirements?",
      "Any aftermarket transmission or engine modifications?",
    ],
    repTalkTrack:
      "Ford is strict about MERCON and WSS-M2C callouts. I'll pull Klondike products that explicitly list your Ford approval on the current PDS—if we only have a close category match, we'll mark it needs confirmation rather than guess.",
    cautionNotes: [
      "MERCON LV, ULV, and V are not interchangeable without OEM approval.",
      "Type F is for designated legacy Ford transmissions only.",
    ],
    specSearchTerms: [
      "ford",
      "mercon",
      "m2c",
      "wss-m2c",
      "type f",
      "m2c33",
    ],
    keywords: ["ford", "mercon", "atf", "pickup", "power stroke"],
  },

  caterpillar: {
    id: "caterpillar",
    name: "Caterpillar (CAT)",
    type: "oem",
    aliases: [
      "caterpillar",
      "cat",
      "cat engine",
      "cat diesel",
      "cat hydraulic",
      "cat to-4",
    ],
    relatedSpecs: [
      "Caterpillar",
      "Caterpillar TO-4",
      "Caterpillar ECF-1",
      "Caterpillar 3300 / 3400 / 3500 / 3600 Series",
      "Caterpillar multi-grade applications",
    ],
    applicationCategory: "off_highway_construction_and_power_systems",
    explanation:
      "Caterpillar publishes engine, hydraulic, drivetrain, and coolant specifications across construction, mining, and power units. TO-4 is a common powershift transmission / final-drive category; engine lines may reference Cat ECF or multi-grade sheets. Confirm the exact Cat spec from the SOS report, decal, or operator manual.",
    productCategoriesToConsider: [
      "heavy_duty_engine_oil",
      "hydraulic_fluid",
      "drive_train_fluid",
      "coolant",
    ],
    questionsToAsk: [
      "Which Cat spec sheet or SOS report are you holding—engine, hydraulic, or TO-4?",
      "Machine family (haul truck, excavator, loader, genset)?",
      "Single-grade vs multi-grade requirement?",
      "Is fluid managed by Cat dealer or independent lube program?",
    ],
    repTalkTrack:
      "Cat accounts are spec-sheet driven. I'll map your stated Caterpillar requirement to Klondike SKUs that explicitly list Caterpillar on the PDS. If the exact Cat sheet isn't indexed, we'll say needs confirmation and ask for the decal or SOS printout.",
    cautionNotes: [
      "Short token 'CAT' can be ambiguous—confirm Caterpillar equipment vs other uses.",
      "TO-4 and engine-oil specs are different systems—do not cross-quote.",
    ],
    specSearchTerms: ["caterpillar", "cat to-4", "to-4", "ecf-1", "3300", "3400", "3500", "3600"],
    keywords: ["caterpillar", "cat", "to-4", "construction", "mining"],
  },

  cummins: {
    id: "cummins",
    name: "Cummins",
    type: "oem",
    aliases: [
      "cummins",
      "cummins diesel",
      "cummins isx",
      "cummins x15",
      "ces 20086",
      "ces 20081",
      "ces 20087",
      "ces 20074",
      "rio-grande",
    ],
    relatedSpecs: [
      "Cummins CES 20086",
      "Cummins CES 20081",
      "Cummins CES 20087",
      "Cummins CES 20074",
      "Cummins Rio-Grande",
    ],
    applicationCategory: "heavy_duty_diesel_engine",
    explanation:
      "Cummins Engine Specification (CES) numbers define approved heavy-duty diesel engine oils for on-highway and industrial engines. CES 20086 is common on modern CK-4 programs; older fleets may still reference CES 20081 or Rio-Grande industrial sheets. Match the CES on the oil fill label or Cummins owner information.",
    productCategoriesToConsider: ["heavy_duty_engine_oil", "synthetic_blend_engine_oil", "full_synthetic_engine_oil"],
    questionsToAsk: [
      "Which Cummins CES number is on the fill cap or ECM maintenance screen?",
      "Engine model (X15, L9, B6.7) and duty cycle?",
      "Extended drain program or standard OEM interval?",
      "Any prior soot, K&N, or fuel dilution issues?",
    ],
    repTalkTrack:
      "For Cummins, the CES number is the gate. I'll show Klondike engine oils that explicitly list your Cummins CES on the current PDS—typically alongside API CK-4 where applicable. No CES match in our library means needs confirmation, not a viscosity guess.",
    cautionNotes: [
      "CES 20086 and 20087 are not interchangeable without Cummins guidance.",
      "Verify emissions aftertreatment compatibility for the exact CES.",
    ],
    specSearchTerms: [
      "cummins",
      "ces 20086",
      "ces 20081",
      "ces 20087",
      "ces 20074",
      "rio-grande",
      "rio grande",
    ],
    keywords: ["cummins", "ces", "diesel", "x15", "isx"],
  },

  detroitDiesel: {
    id: "detroitDiesel",
    name: "Detroit Diesel",
    type: "oem",
    aliases: [
      "detroit",
      "detroit diesel",
      "dd13",
      "dd15",
      "dd16",
      "93k222",
      "93k223",
      "93k218",
      "93k216",
      "dfs 93k222",
      "pgos 93k216",
    ],
    relatedSpecs: [
      "Detroit Diesel 93K222",
      "Detroit Diesel 93K223",
      "Detroit Diesel 93K218",
      "Detroit Diesel DFS 93K222",
      "Detroit Diesel PGOS 93K216",
    ],
    applicationCategory: "heavy_duty_diesel_engine",
    explanation:
      "Detroit Diesel publishes 93K-series oil specifications for EPA-era engines. 93K222 commonly pairs with API CK-4 for DD13/DD15 platforms; 93K223 relates to FA-4 fuel-economy programs. Use the oil specification label in the Detroit maintenance literature—do not assume 93K222 if the truck calls for 93K223.",
    productCategoriesToConsider: ["heavy_duty_engine_oil", "full_synthetic_engine_oil"],
    questionsToAsk: [
      "Which 93K spec is listed for your DD platform?",
      "DD13, DD15, or legacy Series 60 still in fleet?",
      "OEM extended drain or standard interval?",
      "Any DPF regen or fuel dilution history?",
    ],
    repTalkTrack:
      "Detroit is a 93K-number conversation. I'll line up Klondike CK-4 or FA-4 products that explicitly cite your Detroit sheet on the PDS. If only API CK-4 is indexed without the 93K line, we'll flag needs confirmation.",
    cautionNotes: [
      "93K222 (CK-4) and 93K223 (FA-4) serve different OEM programs—confirm before quoting.",
      "Mixed Daimler Truck North America fleets may standardize on one 93K—verify shop policy.",
    ],
    specSearchTerms: [
      "detroit",
      "detroit diesel",
      "93k222",
      "93k223",
      "93k218",
      "93k216",
      "dfs 93k222",
      "pgos 93k216",
    ],
    keywords: ["detroit", "dd15", "dd13", "93k", "freightliner"],
  },

  volvo: {
    id: "volvo",
    name: "Volvo",
    type: "oem",
    aliases: [
      "volvo",
      "volvo truck",
      "volvo d13",
      "volvo d11",
      "vds-4.5",
      "vds-4",
      "vds 4.5",
      "vds 4",
    ],
    relatedSpecs: ["Volvo VDS-4.5", "Volvo VDS-4", "Volvo VDS"],
    applicationCategory: "heavy_duty_diesel_engine",
    explanation:
      "Volvo Truck VDS (Volvo Drain Specification) defines approved engine oils for Volvo diesel engines. VDS-4.5 is the common CK-4 era callout on highway tractors; older VDS-4 may still appear in legacy documentation. Confirm VDS revision on the oil filler note or Volvo maintenance portal.",
    productCategoriesToConsider: ["heavy_duty_engine_oil", "full_synthetic_engine_oil"],
    questionsToAsk: [
      "Which VDS revision does Volvo list for this VNL/VNR—4.5 or earlier?",
      "D11 or D13 engine and typical gross weight?",
      "Volvo Gold Contract or independent lube program?",
      "Operating climate (northern seasonal vs long-haul southern)?",
    ],
    repTalkTrack:
      "Volvo approvals ride on the VDS number. I'll match Klondike engine oils that explicitly list VDS-4.5 or your stated VDS on the PDS alongside API CK-4 where published. No explicit VDS line means needs confirmation.",
    cautionNotes: [
      "VDS-4 and VDS-4.5 are not automatically interchangeable—check OEM bulletin.",
      "Volvo Mack unified specs may appear on some fleets—confirm brand and VDS together.",
    ],
    specSearchTerms: ["volvo", "vds-4.5", "vds 4.5", "vds-4", "vds 4"],
    keywords: ["volvo", "vds", "d13", "tractor", "highway"],
  },

  mack: {
    id: "mack",
    name: "Mack",
    type: "oem",
    aliases: [
      "mack",
      "mack truck",
      "mack mp",
      "eos-4.5",
      "eos 4.5",
      "eos-4",
      "eos 4",
    ],
    relatedSpecs: ["Mack EOS-4.5", "Mack EOS-4", "Mack EOS"],
    applicationCategory: "heavy_duty_diesel_engine",
    explanation:
      "Mack Engine Oil Specification (EOS) defines approved heavy-duty engine oils for Mack diesel engines. EOS-4.5 aligns with modern CK-4 programs on MP engines. Confirm EOS revision on the maintenance label—Mack/Volvo groups may share fleet standards but EOS must still be explicit on the PDS.",
    productCategoriesToConsider: ["heavy_duty_engine_oil", "full_synthetic_engine_oil"],
    questionsToAsk: [
      "Which EOS revision is on the Mack maintenance sheet—4.5 or earlier?",
      "MP7, MP8, or legacy engine still in service?",
      "GuardDog Connect / extended drain enrollment?",
      "Mixed Mack-Volvo fleet with a single bulk tank?",
    ],
    repTalkTrack:
      "Mack is an EOS-number sale. I'll show Klondike products that explicitly list Mack EOS-4.5 (or your stated EOS) on the current PDS. If we can't prove the EOS line on the sheet, we'll mark needs confirmation.",
    cautionNotes: [
      "EOS-4.5 and EOS-4 are different approval generations—verify before bulk conversion.",
      "Shared Volvo-Mack shops may need both VDS and EOS proof on the same SKU.",
    ],
    specSearchTerms: ["mack", "eos-4.5", "eos 4.5", "eos-4", "eos 4"],
    keywords: ["mack", "eos", "mp8", "vocational"],
  },

  apiCk4: {
    id: "apiCk4",
    name: "API CK-4",
    type: "spec",
    aliases: [
      "api ck-4",
      "api ck4",
      "ck-4",
      "ck4",
      "ck 4",
      "api service ck-4",
    ],
    relatedSpecs: [
      "API CK-4",
      "CJ-4",
      "CI-4 Plus",
      "API FA-4 (fuel economy sibling—not interchangeable)",
    ],
    applicationCategory: "heavy_duty_diesel_engine",
    explanation:
      "API CK-4 is the current heavy-duty diesel engine oil category for 2017+ hardware, backward compatible to CJ-4/CI-4 Plus in many fleets. It is not the same as FA-4 (lower HTHS fuel-economy oils). Use CK-4 when the manual or bulk tank label calls for CK-4; confirm OEM sheets (Cummins CES, Detroit 93K, Volvo VDS, Mack EOS) in addition to the API donut.",
    productCategoriesToConsider: [
      "heavy_duty_engine_oil",
      "synthetic_blend_engine_oil",
      "full_synthetic_engine_oil",
    ],
    questionsToAsk: [
      "Does the manual call for CK-4 only, or also an OEM sheet (CES / 93K / VDS / EOS)?",
      "Preferred viscosity—15W-40 vs 10W-30 for climate and fuel economy goals?",
      "Any FA-4 trial programs in the fleet (not CK-4 interchangeable)?",
      "Extended drain or standard OEM interval?",
    ],
    repTalkTrack:
      "CK-4 is the API category gate for modern diesel. I'll list Klondike products that explicitly state API CK-4 on the PDS and note paired OEM approvals where published. Category fit without a PDS CK-4 line stays needs confirmation.",
    cautionNotes: [
      "CK-4 and FA-4 are different API categories—do not swap without OEM approval.",
      "Gasoline SN combined labels may appear on mixed-service oils—confirm diesel-only need.",
    ],
    specSearchTerms: ["api ck-4", "api ck4", "ck-4", "ck4"],
    keywords: ["ck-4", "ck4", "api", "diesel", "heavy duty"],
  },

  dexron: {
    id: "dexron",
    name: "Dexron",
    type: "spec",
    aliases: [
      "dexron",
      "dexron iii",
      "dexron iii h",
      "dexron vi",
      "dexron-vi",
      "dexron ulv",
      "gm dexron",
      "dexron ii",
    ],
    relatedSpecs: [
      "GM Dexron VI",
      "GM Dexron III / III H",
      "Dexron ULV",
      "Dexron II",
    ],
    applicationCategory: "automatic_transmission_fluid",
    explanation:
      "GM Dexron specifications define automatic transmission fluid performance for General Motors and many imported transmissions licensed to Dexron. Dexron VI is the common current generation with backward serviceability per GM charts; ULV is a separate low-viscosity program. Read the transmission label—Dexron generation is not interchangeable by guess.",
    productCategoriesToConsider: ["automatic_transmission_fluid", "full_synthetic_atf"],
    questionsToAsk: [
      "Which Dexron generation is on the dipstick—VI, ULV, or legacy III?",
      "GM light duty, transit bus, or licensed non-GM transmission?",
      "Any shudder, slip, or aftermarket cooler modifications?",
      "Drain interval vs severe-service (taxi, plow, tow)?",
    ],
    repTalkTrack:
      "Dexron is a licensed ATF performance line. I'll show Klondike fluids that explicitly list your Dexron generation on the PDS—often paired with Mercon on multi-vehicle SKUs. No explicit Dexron line on the sheet means needs confirmation.",
    cautionNotes: [
      "Dexron VI, ULV, and III are not freely interchangeable—follow GM bulletin.",
      "Dual-labeled Dexron/Mercon products still require the correct generation.",
    ],
    specSearchTerms: [
      "dexron",
      "dexron vi",
      "dexron-vi",
      "dexron iii",
      "dexron ulv",
      "dexron ii",
    ],
    keywords: ["dexron", "gm", "atf", "automatic", "transmission"],
  },

  mercon: {
    id: "mercon",
    name: "Mercon",
    type: "oem_spec",
    aliases: [
      "mercon",
      "mercon lv",
      "mercon ulv",
      "mercon v",
      "mercon sp",
      "ford mercon",
    ],
    relatedSpecs: [
      "Ford MERCON LV",
      "Ford MERCON ULV",
      "Ford MERCON V",
      "Mercon LV",
      "Mercon ULV",
    ],
    applicationCategory: "automatic_transmission_fluid",
    explanation:
      "Ford MERCON specifications define ATF performance for Ford automatic transmissions and licensed applications. MERCON LV and ULV are distinct low-viscosity programs for modern transmissions. Confirm the cap marking or owner manual—many Klondike ATFs dual-list Dexron VI and MERCON LV when explicitly approved on the PDS.",
    productCategoriesToConsider: ["automatic_transmission_fluid", "full_synthetic_atf"],
    questionsToAsk: [
      "Which MERCON grade is specified—LV, ULV, or V?",
      "Ford truck, van, or licensed non-Ford unit?",
      "Any aftermarket tune or auxiliary transmission cooler?",
      "Shop standard bulk fluid or unit-by-unit top-off?",
    ],
    repTalkTrack:
      "MERCON is Ford's ATF gate. I'll pull Klondike transmission fluids that explicitly cite MERCON LV, ULV, or V on the current PDS. Close category matches without the MERCON line get flagged needs confirmation.",
    cautionNotes: [
      "MERCON LV and ULV are not the same program—verify cap marking.",
      "Dual Dexron/Mercon fluids must still list your required MERCON generation.",
    ],
    specSearchTerms: ["mercon", "mercon lv", "mercon ulv", "mercon v", "mercon sp"],
    keywords: ["mercon", "ford", "atf", "transmission"],
  },
};

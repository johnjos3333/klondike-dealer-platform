/**
 * Product attribute knowledge — deterministic profiles for “does KLONDIKE carry…?” advisor intelligence.
 * Confirmed products are grounded on indexed PDS / spotlight map data only.
 * Not wired to UI yet.
 */

export const productAttributeKnowledge = {
  nonConductiveDielectricHydraulic: {
    id: "nonConductiveDielectricHydraulic",
    attribute: "Non-Conductive / Dielectric Hydraulic Fluid",
    aliases: [
      "dielectric hydraulic fluid",
      "non conductive hydraulic",
      "non-conductive hydraulic",
      "insulating hydraulic fluid",
      "utility aerial hydraulic",
    ],
    questionExamples: [
      "Does KLONDIKE carry dielectric hydraulic fluid?",
      "Do you have non-conductive hydraulic oil?",
      "What hydraulic fluid for utility bucket trucks?",
    ],
    directAnswer:
      "Dielectric or non-conductive hydraulic fluid is a specialty utility/aerial-device category—not standard AW hydraulic oil. The current indexed PDS library in this platform does not list a KLONDIKE dielectric hydraulic SKU with explicit dielectric-strength claims. Treat as needs technical/PDS confirmation before quoting any substitute.",
    whatItMeans:
      "Fluid formulated so electrical breakdown resistance and moisture control stay within OEM limits where hydraulic oil may contact energized electrical equipment—such as utility aerial devices. Requires dielectric testing programs, not just viscosity match.",
    whyCustomersAsk:
      "Utility fleets, linework contractors, and municipal aerial departments must meet OEM electrical safety bulletins and periodic dielectric testing—standard mobile AW is often prohibited.",
    likelyProductCategories: ["specialty_hydraulic", "utility_aerial_hydraulic"],
    confirmedKlondikeProducts: [],
    possibleKlondikeProductsToVerify: [
      "No dielectric/non-conductive hydraulic row is indexed in the current PDS library—verify with KLONDIKE technical before proposing any AW product as a substitute.",
    ],
    pdsProofRequired: true,
    questionsToAsk: [
      "What OEM bulletin or dielectric test standard governs this aerial device?",
      "Required dielectric test interval and last test result?",
      "Current fluid brand and whether moisture contamination is tracked?",
      "Is this a dedicated dielectric sump or shared with other hydraulics?",
    ],
    repTalkTrack:
      "Dielectric hydraulic is a safety spec, not a viscosity guess. I need the utility OEM bulletin and test interval before we talk product. Our indexed PDS set does not show a confirmed dielectric SKU—I'll escalate to technical rather than substitute standard AW.",
    cautionNotes: [
      "Never substitute standard AW hydraulic for dielectric service without written OEM approval.",
      "Do not claim KLONDIKE carries dielectric hydraulic until PDS explicitly supports it.",
    ],
    keywords: ["dielectric", "non conductive", "non-conductive", "insulating", "utility aerial"],
  },

  biodegradableHydraulicFluid: {
    id: "biodegradableHydraulicFluid",
    attribute: "Biodegradable Hydraulic Fluid",
    aliases: [
      "biodegradable hydraulic",
      "bio hydraulic fluid",
      "biodegradable aw hydraulic",
      "environmentally sensitive hydraulic",
      "readily biodegradable hydraulic",
    ],
    questionExamples: [
      "Does KLONDIKE have biodegradable hydraulic oil?",
      "What bio hydraulic fluids do you carry?",
      "Do you sell biodegradable AW?",
    ],
    directAnswer:
      "Yes—KLONDIKE indexes multiple biodegradable hydraulic families on PDS, including vegetable-based BIO AW (OECD 301B >60%), ENVIRO inherently biodegradable AW and MV (OECD 301B >30%), BIO synthetic blend, HEES, HFDU, and EAL bio-synthetic rows. Match OEM HM/HVLP class and environmental requirement before quoting.",
    whatItMeans:
      "Hydraulic fluids with documented biodegradability per referenced test methods (e.g. OECD 301B on indexed PDS rows)—used where spill response, site permits, or OEM environmental clauses require bio-based or inherently biodegradable chemistry.",
    whyCustomersAsk:
      "Construction near waterways, parks departments, orchards, mining reclamation, and municipal equipment with spill policies need PDS-documented biodegradability—not green marketing alone.",
    likelyProductCategories: ["hydraulic_fluid", "environmental_hydraulic"],
    confirmedKlondikeProducts: [
      "KLONDIKE BIO Biodegradable AW Hydraulic Fluids — PDS: OECD 301B >60%; ISO 32/46; VI 220+; zinc-free (indexed spotlight).",
      "KLONDIKE ENVIRO Inherently Biodegradable AW Hydraulic Fluids — PDS: OECD 301B >30%; zinc-free ashless; DIN 51524; ISO 11158 HM/HL/HR (indexed spotlight).",
      "KLONDIKE ENVIRO Inherently Biodegradable MV Hydraulic Fluids — PDS: OECD 301B >30%; HVLP; zinc-free (indexed spotlight).",
      "KLONDIKE BIO Biodegradable Synthetic Blend Hydraulic Fluids — PDS library indexed row.",
      "KLONDIKE Bio HEES Hydraulic Fluids — PDS: ISO 15380 HEES; biodegradable ester (indexed spotlight).",
      "KLONDIKE Bio HFDU Hydraulic Fluids — PDS: ISO 12922 HFDU fire-resistant biodegradable (indexed spotlight).",
    ],
    possibleKlondikeProductsToVerify: [
      "KLONDIKE BIO Biodegradable Rock Drill Oil — biodegradable ISO drill grades on PDS; confirm ISO 100 vs 150 for exact drill model.",
      "Exact OECD percentage and HM vs HVLP class for the OEM sump—read the specific PDS row before bulk quote.",
    ],
    pdsProofRequired: true,
    questionsToAsk: [
      "What biodegradability test or spill plan reference is required—OECD 301B threshold?",
      "HM, HVLP, or specialty class on the equipment tag?",
      "Zinc-free or ashless requirement in addition to biodegradability?",
      "Operating temperature and drain interval expectations?",
    ],
    repTalkTrack:
      "KLONDIKE has several indexed biodegradable hydraulic rows—not one universal bio drum. Tell me your environmental clause and pump class, and I'll match BIO AW, ENVIRO AW/MV, HEES, or HFDU to the PDS that documents the right OECD and ISO lines.",
    cautionNotes: [
      "Biodegradability claims must match exact PDS test references and percentages.",
      "Bio base stocks may need closer UOA in ultra-hot circuits—confirm with OEM.",
    ],
    keywords: ["biodegradable", "bio hydraulic", "bio aw", "oecd", "environmentally sensitive"],
  },

  environmentallyAcceptableLubricantEal: {
    id: "environmentallyAcceptableLubricantEal",
    attribute: "Environmentally Acceptable Lubricant (EAL)",
    aliases: [
      "eal hydraulic",
      "environmentally acceptable lubricant",
      "vessel general permit hydraulic",
      "epa vgp hydraulic",
      "eal compliant hydraulic",
    ],
    questionExamples: [
      "Does KLONDIKE carry EAL hydraulic fluid?",
      "What environmentally acceptable lubricants do you sell?",
      "Do you have VGP-compliant hydraulic oil?",
    ],
    directAnswer:
      "Yes—KLONDIKE indexes EAL-compliant hydraulic products on PDS, including BIO-Synthetic EAL Hydraulic Oils (OECD 301B readily biodegradable; FZG on PDS) and Bio HEES Hydraulic Fluids (ISO 15380; EU Ecolabel; EPA VGP language on indexed spotlight). Confirm OEM EAL class before quoting.",
    whatItMeans:
      "Lubricants meeting regulatory or OEM definitions of environmentally acceptable fluids—often tied to biodegradability, toxicity, and bioaccumulation requirements for marine, port, and environmentally permitted equipment.",
    whyCustomersAsk:
      "Marine contractors, port equipment, and environmental tenders require documented EAL compliance—not generic biodegradable claims.",
    likelyProductCategories: ["environmental_hydraulic", "marine_hydraulic"],
    confirmedKlondikeProducts: [
      "KLONDIKE BIO-Synthetic EAL Hydraulic Oils — PDS: EAL compliant; OECD 301B readily biodegradable; FZG stage on indexed spotlight.",
      "KLONDIKE Bio HEES Hydraulic Fluids — PDS: ISO 15380 HEES; EU Ecolabel; EPA VGP compliant language on indexed spotlight.",
    ],
    possibleKlondikeProductsToVerify: [
      "KLONDIKE BIO Biodegradable Synthetic Blend Hydraulic Fluids — EAL compliant synthetic blend row on PDS; confirm class vs full HEES/EAL bio-synthetic requirement.",
      "Regulatory scope varies by contract—attach exact PDS environmental statements to the bid.",
    ],
    pdsProofRequired: true,
    questionsToAsk: [
      "What EAL standard or permit clause is cited—EPA VGP, ISO 15380 HEES, or OEM marine spec?",
      "Required FZG or wear test documentation for the tender?",
      "ISO viscosity grade on the equipment?",
    ],
    repTalkTrack:
      "EAL bids are won on checklists. KLONDIKE indexes BIO-Synthetic EAL and Bio HEES rows with regulatory language on the PDS—send me your permit clause and we'll match the row, not the closest AW drum.",
    cautionNotes: [
      "EAL scope is regulatory—do not overclaim beyond PDS environmental statements.",
      "Blend EAL rows may differ from full HEES performance—compare PDS before deciding.",
    ],
    keywords: ["eal", "environmentally acceptable", "vgp", "vessel general permit", "hees"],
  },

  foodGradeLubricant: {
    id: "foodGradeLubricant",
    attribute: "Food-Grade Lubricant",
    aliases: [
      "food grade lubricant",
      "food grade oil",
      "food grade grease",
      "h1 lubricant",
      "nsf h1",
      "food plant lubricant",
    ],
    questionExamples: [
      "Does KLONDIKE carry food-grade lubricants?",
      "What H1 hydraulic oil do you have?",
      "Do you sell NSF H1 grease?",
    ],
    directAnswer:
      "Yes—KLONDIKE indexes NSF H1 food-grade products on PDS, including FOOD-GRADE Hydraulic Oils (ISO 32/46; zinc-free ashless; FDA 21 CFR 178.3570 reference on indexed spotlight) and FOOD-GRADE EP-2 Grease (NSF H1 registered per PDS library). Confirm H1 vs H2 zone and current NSF registration before quoting.",
    whatItMeans:
      "Lubricants registered for food-processing environments under NSF categories—H1 for incidental food contact, H2 for non-contact, with audit documentation required. Not interchangeable with general industrial products.",
    whyCustomersAsk:
      "Food and beverage plants, packaging lines, and breweries face audit failures when lubricants lack NSF registration and posted documentation at the asset.",
    likelyProductCategories: ["food_grade_hydraulic", "food_grade_grease"],
    confirmedKlondikeProducts: [
      "KLONDIKE FOOD-GRADE Hydraulic Oils — PDS: NSF H1; ISO 32/46; zinc-free ashless wear package; FDA 21 CFR 178.3570 on indexed spotlight.",
      "KLONDIKE FOOD-GRADE EP-2 Grease — PDS library: NSF H1 registered food-grade EP-2 grease row.",
    ],
    possibleKlondikeProductsToVerify: [
      "Verify current NSF registration numbers on the latest PDS revision for each SKU before audit packets.",
      "Food-adjacent plant may also need segregated industrial products—confirm zone map with QA.",
    ],
    pdsProofRequired: true,
    questionsToAsk: [
      "H1 incidental contact or H2 non-contact zone?",
      "Audit standard—SQF, BRC, customer-specific?",
      "Hydraulic, grease, or gearbox points in the food area?",
      "Current NSF registration the plant expects on file?",
    ],
    repTalkTrack:
      "Food grade is chemistry plus paperwork. KLONDIKE indexes H1 hydraulic and EP-2 grease on PDS—I need your zone classification and audit rules, then we quote with NSF documentation from the sheet, not a generic industrial drum.",
    cautionNotes: [
      "H1 is incidental food contact only—follow plant GMP and HACCP procedures.",
      "Always verify current NSF registration on PDS before quoting.",
    ],
    keywords: ["food grade", "h1", "nsf", "food plant", "food-grade"],
  },

  zincFreeAshlessHydraulic: {
    id: "zincFreeAshlessHydraulic",
    attribute: "Zinc-Free / Ashless Hydraulic Fluid",
    aliases: [
      "zinc free hydraulic",
      "ashless hydraulic",
      "zinc-free hydraulic fluid",
      "no zinc hydraulic",
      "ashless aw hydraulic",
    ],
    questionExamples: [
      "Does KLONDIKE have zinc-free hydraulic oil?",
      "Do you carry ashless hydraulic fluid?",
      "What hydraulic for yellow metal or zinc-sensitive systems?",
    ],
    directAnswer:
      "Yes—several indexed KLONDIKE hydraulic rows document zinc-free or ashless formulations on PDS, including ENVIRO Inherently Biodegradable AW and MV, BIO Biodegradable AW, FOOD-GRADE Hydraulic Oils, and AGRIMAX Zinc Free Trans Drive Hydraulic Fluid Red. Standard Commercial and Advanced AW products are zinc AW chemistry—not ashless.",
    whatItMeans:
      "Hydraulic fluids formulated without zinc-based AW chemistry, used where OEM, yellow-metal components, or environmental policies require ashless anti-wear packages.",
    whyCustomersAsk:
      "CNH friction packs, food-adjacent hydraulics, environmentally permitted sites, and some industrial R&O circuits specify zinc-free fluids—zinc AW top-off can cause warranty or compatibility issues.",
    likelyProductCategories: ["hydraulic_fluid", "tractor_utto"],
    confirmedKlondikeProducts: [
      "KLONDIKE ENVIRO Inherently Biodegradable AW Hydraulic Fluids — PDS: zinc-free formulation (indexed spotlight).",
      "KLONDIKE ENVIRO Inherently Biodegradable MV Hydraulic Fluids — PDS: zinc-free (indexed spotlight).",
      "KLONDIKE BIO Biodegradable AW Hydraulic Fluids — PDS: zinc-free (indexed spotlight).",
      "KLONDIKE FOOD-GRADE Hydraulic Oils — PDS: zinc-free ashless wear package (indexed spotlight).",
      "KLONDIKE AGRIMAX Zinc Free Trans Drive Hydraulic Fluid Red — PDS: zinc-free; CNH MAT 3544/3540 (indexed spotlight).",
    ],
    possibleKlondikeProductsToVerify: [
      "KLONDIKE Commercial AW and AW Advanced Formula — zinc AW per indexed PDS; not ashless substitutes.",
      "Confirm pump OEM allows ashless HM/HVLP before converting from zinc AW fleet programs.",
    ],
    pdsProofRequired: true,
    questionsToAsk: [
      "OEM zinc prohibition or yellow-metal sensitivity documented where?",
      "HM, HVLP, or UTTO class required?",
      "Environmental biodegradability needed in addition to zinc-free?",
    ],
    repTalkTrack:
      "Zinc-free is not one SKU—it is a chemistry lane on the PDS. Tell me if this is CNH red iron, food-adjacent hydraulics, or environmental AW, and I'll point to the indexed Enviro, Bio, Food-Grade, or AgriMax zinc-free row—not standard Commercial AW.",
    cautionNotes: [
      "Do not substitute zinc AW for OEM-mandated ashless fluid without engineering sign-off.",
      "Zinc-free UTTO is not interchangeable with John Deere green programs—read MAT/JDM lines.",
    ],
    keywords: ["zinc free", "zinc-free", "ashless", "no zinc", "yellow metal"],
  },

  antiWearHydraulicFluid: {
    id: "antiWearHydraulicFluid",
    attribute: "Anti-Wear Hydraulic Fluid",
    aliases: [
      "anti wear hydraulic",
      "anti-wear hydraulic",
      "aw hydraulic",
      "aw hydraulic oil",
      "hm hydraulic fluid",
    ],
    questionExamples: [
      "Does KLONDIKE carry AW hydraulic oil?",
      "What anti-wear hydraulic fluids do you sell?",
      "Do you have ISO 46 AW hydraulic?",
    ],
    directAnswer:
      "Yes—KLONDIKE indexes a broad AW hydraulic portfolio on PDS, including Commercial AW, AW Advanced Formula, Red AW, Multi-Viscosity AW, and ENVIRO/BIO environmental AW rows. Match ISO grade, zinc vs ashless need, and OEM Denison/DIN references on the specific PDS.",
    whatItMeans:
      "Hydraulic fluids with anti-wear (AW) or HM performance for mobile and industrial pumps—typically ISO 11158 HM or HVLP grades with EP/anti-wear additives per PDS.",
    whyCustomersAsk:
      "Most mobile equipment calls for AW or HM hydraulic oil—reps need the correct ISO viscosity and chemistry family, not just ‘hydraulic oil’ generically.",
    likelyProductCategories: ["hydraulic_fluid"],
    confirmedKlondikeProducts: [
      "KLONDIKE Commercial AW Hydraulic Fluids — PDS-indexed AW/HM hydraulic row (spotlight map).",
      "KLONDIKE AW Advanced Formula Hydraulic Fluids — PDS: ISO 22–100; anti-wear zinc formulation (indexed spotlight).",
      "KLONDIKE Red AW Hydraulic Fluids — PDS: dyed AW with Denison HF references (indexed spotlight).",
      "KLONDIKE Multi-Viscosity AW Hydraulic Fluids — PDS: HVLP AW grades (indexed spotlight).",
      "KLONDIKE ENVIRO Inherently Biodegradable AW Hydraulic Fluids — PDS: zinc-free AW HM/HL/HR (indexed spotlight).",
      "KLONDIKE BIO Biodegradable AW Hydraulic Fluids — PDS: vegetable HM AW (indexed spotlight).",
    ],
    possibleKlondikeProductsToVerify: [
      "KLONDIKE SAE 10W Heavy Duty Hydraulic Oil — PDS library row; confirm vs ISO HVLP programs.",
      "Exact ISO 15/22/32/46/68 grade and zinc policy from pump OEM before bulk quote.",
    ],
    pdsProofRequired: true,
    questionsToAsk: [
      "ISO viscosity grade on the tag or manual?",
      "Zinc AW acceptable or ashless/zinc-free required?",
      "Denison, DIN 51524, or other OEM sheet referenced?",
      "Single-grade or multi-viscosity HVLP needed for seasonal swing?",
    ],
    repTalkTrack:
      "KLONDIKE AW is a portfolio—Commercial, Advanced, Red, MV, Enviro, and Bio rows on PDS. Give me ISO grade, zinc policy, and any environmental clause, and we'll match the indexed row instead of guessing from drum color.",
    cautionNotes: [
      "AW hydraulic is not UTF, ATF, or compressor oil—confirm sump type.",
      "Dyed Red AW is not allowed on all OEMs—verify before fill.",
    ],
    keywords: ["anti wear", "anti-wear", "aw hydraulic", "hm hydraulic", "iso 46 aw"],
  },

  highViscosityIndexHydraulic: {
    id: "highViscosityIndexHydraulic",
    attribute: "High Viscosity Index Hydraulic Fluid",
    aliases: [
      "high vi hydraulic",
      "high viscosity index hydraulic",
      "hvlp hydraulic",
      "multi viscosity hydraulic",
      "all season hydraulic",
    ],
    questionExamples: [
      "Does KLONDIKE have high VI hydraulic oil?",
      "What HVLP hydraulic fluids do you carry?",
      "Do you sell all-season hydraulic fluid?",
    ],
    directAnswer:
      "Yes—KLONDIKE indexes high-VI and HVLP hydraulic products on PDS, including Multi-Viscosity AW (VI ~140–150), XVI All Season Blend Extreme Hydraulic Fluid (VI ~210), BIO Biodegradable AW (VI 220+), and ENVIRO MV (VI 160+). Confirm OEM allows HVLP before consolidating seasonal grades.",
    whatItMeans:
      "Hydraulic fluids with elevated viscosity index for wider temperature operating bands—HVLP or multi-grade programs that may reduce seasonal ISO changeouts when OEM permits.",
    whyCustomersAsk:
      "Fleets operating from cold winters to hot summers want one drum program with documented pour points and VI—not two ISO inventories.",
    likelyProductCategories: ["hydraulic_fluid", "extreme_hydraulic"],
    confirmedKlondikeProducts: [
      "KLONDIKE Multi-Viscosity AW Hydraulic Fluids — PDS: HVLP; VI ~140–150; pour to −60 °C class on indexed spotlight.",
      "KLONDIKE XVI All Season Blend Extreme Hydraulic Fluid — PDS: VI ~210; wide operating band on indexed spotlight.",
      "KLONDIKE BIO Biodegradable AW Hydraulic Fluids — PDS: VI 220+ on indexed spotlight.",
      "KLONDIKE ENVIRO Inherently Biodegradable MV Hydraulic Fluids — PDS: VI 160+; HVLP on indexed spotlight.",
    ],
    possibleKlondikeProductsToVerify: [
      "KLONDIKE Universal Tractor Fluid and UTF Full Synthetic — high VI UTTO rows; not general industrial HM unless OEM allows.",
      "Pump OEM shear stability limits for HVLP—confirm on tag before MV/XVI conversion.",
    ],
    pdsProofRequired: true,
    questionsToAsk: [
      "Annual ambient temperature range at the site?",
      "OEM permits HVLP or multi-grade AW?",
      "Current ISO grade summer vs winter practice?",
      "Environmental or zinc-free requirement alongside high VI?",
    ],
    repTalkTrack:
      "High VI is documented on the PDS—MV AW, XVI extreme, Bio AW, and Enviro MV each tell a different story. Map your temperature swing and OEM HVLP allowance, then we pick the row with the VI and pour points that match.",
    cautionNotes: [
      "HVLP shear stability must meet pump OEM limits—confirm before bulk conversion.",
      "XVI and MV are not interchangeable with straight ISO without engineering review.",
    ],
    keywords: ["high vi", "viscosity index", "hvlp", "multi viscosity", "all season hydraulic"],
  },

  coldWeatherHydraulicFluid: {
    id: "coldWeatherHydraulicFluid",
    attribute: "Cold Weather Hydraulic Fluid",
    aliases: [
      "cold weather hydraulic",
      "arctic hydraulic fluid",
      "low temperature hydraulic",
      "winter hydraulic oil",
      "cold climate hydraulic",
    ],
    questionExamples: [
      "Does KLONDIKE have cold weather hydraulic oil?",
      "What hydraulic for arctic conditions?",
      "Do you carry winter hydraulic fluid?",
    ],
    directAnswer:
      "Yes—KLONDIKE indexes cold-climate hydraulic and UTTO products on PDS with documented low-temperature data, including Multi-Viscosity AW (pour to −60 °C class), XVI All Season Blend Extreme Hydraulic Fluid, SAE 10W Heavy Duty Hydraulic Oil (PDS library), Arctic Tractor Fluid Synthetic Blend, UTF Full Synthetic, and Wet Brake Fluid with Brookfield cold data.",
    whatItMeans:
      "Hydraulic or UTTO fluids selected for low pour points, cold Brookfield viscosity, and pumpability at winter startup—not just the same ISO grade year-round.",
    whyCustomersAsk:
      "Northern construction, agriculture, mining, and municipal fleets face slow cycles, cavitation, and warranty issues when summer hydraulic stays in the tank through winter.",
    likelyProductCategories: ["hydraulic_fluid", "tractor_utto", "arctic_hydraulic"],
    confirmedKlondikeProducts: [
      "KLONDIKE Multi-Viscosity AW Hydraulic Fluids — PDS: pour as low as −60 °C on indexed spotlight.",
      "KLONDIKE XVI All Season Blend Extreme Hydraulic Fluid — PDS: pour −48 °C; wide temperature band (indexed spotlight).",
      "KLONDIKE SAE 10W Heavy Duty Hydraulic Oil — PDS library indexed row.",
      "KLONDIKE Arctic Tractor Fluid Synthetic Blend — PDS: pour −54 °C; Brookfield @ −40 °C on indexed spotlight.",
      "KLONDIKE Universal Tractor Fluid Full Synthetic — PDS: Brookfield @ −35 °C on indexed spotlight.",
      "KLONDIKE Wet Brake Fluid — PDS: Brookfield @ −35 °C on indexed spotlight.",
    ],
    possibleKlondikeProductsToVerify: [
      "KLONDIKE Universal Tractor Fluid — cold data on PDS; confirm vs dedicated Arctic Tractor row for extreme winter.",
      "Industrial HM cold programs may need MV or XVI—not single-grade ISO 46 without OEM review.",
    ],
    pdsProofRequired: true,
    questionsToAsk: [
      "Lowest ambient temperature and block heater policy?",
      "Industrial AW sump or tractor common sump?",
      "OEM seasonal fluid bulletin or year-round ISO requirement?",
      "Wet brake chatter history after winter fill?",
    ],
    repTalkTrack:
      "Cold weather is a pour-point and Brookfield conversation on the PDS. Tell me if this is mobile AW, XVI/MV industrial, or tractor UTF—and the coldest week you run—and we'll match Arctic Tractor, UTF Full Synthetic, MV AW, or XVI to the indexed cold numbers.",
    cautionNotes: [
      "Arctic tractor fluid is not general industrial AW—confirm sump type.",
      "UTF summer row may not be adequate for extreme northern winter without OEM seasonal guidance.",
    ],
    keywords: ["cold weather", "arctic", "winter hydraulic", "low temperature", "brookfield"],
  },

  wetBrakeTractorFluid: {
    id: "wetBrakeTractorFluid",
    attribute: "Wet Brake Tractor Fluid",
    aliases: [
      "wet brake fluid",
      "tractor hydraulic fluid",
      "utf",
      "universal tractor fluid",
      "utto",
      "j20c",
      "j20d",
      "wet brake chatter",
    ],
    questionExamples: [
      "Does KLONDIKE carry UTF for wet brakes?",
      "What tractor fluid for wet brake systems?",
      "Do you have J20C hydraulic fluid?",
    ],
    directAnswer:
      "Yes—KLONDIKE indexes multiple tractor and wet-brake fluids on PDS with wet brake compatibility language, including Universal Tractor Fluid, UTF Full Synthetic, Wet Brake Fluid, Universal Red Tractor Fluid (CNH MAT), AGRIMAX Trans Drive (John Deere J20C), Arctic Tractor Fluid, and AGRIMAX Zinc Free Trans Drive Red.",
    whatItMeans:
      "Multi-functional tractor fluids (UTTO/UTF) or dedicated wet-brake fluids designed for common sumps serving hydraulics, transmission, and wet disc brakes—friction performance is part of the spec, not optional.",
    whyCustomersAsk:
      "Agriculture and construction dealers see brake chatter, shuttle issues, and warranty disputes when standard AW hydraulic is used in shared-sump tractors.",
    likelyProductCategories: ["tractor_utto", "wet_brake_fluid"],
    confirmedKlondikeProducts: [
      "KLONDIKE Universal Tractor Fluid — PDS: wet brake compatibility; CNH MAT 3525/3505; Allison C-4 (indexed spotlight).",
      "KLONDIKE Universal Tractor Fluid Full Synthetic — PDS: J20C/J20D; wet brake compatibility (indexed spotlight).",
      "KLONDIKE Wet Brake Fluid — PDS: J20C/J20D full synthetic wet brake/transmission row (indexed spotlight).",
      "KLONDIKE Universal Red Tractor Fluid — PDS: CNH MAT; wet brake compatibility (indexed spotlight).",
      "KLONDIKE AGRIMAX Trans Drive Hydraulic Fluid (John Deere) — PDS: J20C wet brake chatter control (indexed spotlight).",
      "KLONDIKE Arctic Tractor Fluid Synthetic Blend — PDS: J20D; wet brake compatibility (indexed spotlight).",
    ],
    possibleKlondikeProductsToVerify: [
      "KLONDIKE AGRIMAX Zinc Free Trans Drive Hydraulic Fluid Red — zinc-free CNH MAT row; confirm red vs green OEM path.",
      "Wet Brake Fluid vs UTF—OEM may require dedicated wet brake product; read bulletin before substituting.",
    ],
    pdsProofRequired: true,
    questionsToAsk: [
      "Tractor make and OEM fluid spec—J20C, J20D, MAT 3525, or MAT 3544?",
      "Common sump or dedicated wet brake circuit?",
      "Any brake chatter after last fluid change?",
      "Red CNH vs green John Deere program?",
    ],
    repTalkTrack:
      "Wet brake performance is on the PDS, not on the AW drum. Photo the axle tag and tell me CNH red or JD green—I’ll match UTF, Wet Brake Fluid, or AgriMax Trans Drive to the indexed OEM lines.",
    cautionNotes: [
      "Never use standard AW hydraulic in OEM UTF/wet-brake sumps without written exception.",
      "Red and green tractor fluid families are not interchangeable—confirm OEM color program.",
    ],
    keywords: ["wet brake", "utf", "utto", "tractor fluid", "j20c", "j20d", "universal tractor"],
  },

  calciumSulfonateGrease: {
    id: "calciumSulfonateGrease",
    attribute: "Calcium Sulfonate Grease",
    aliases: [
      "calcium sulfonate grease",
      "calcium sulfonate ep grease",
      "nano calcium sulfonate",
      "calcium complex grease",
      "sulfonate grease",
    ],
    questionExamples: [
      "Does KLONDIKE carry calcium sulfonate grease?",
      "Do you have nano calcium sulfonate EP grease?",
      "What calcium sulfonate products are on PDS?",
    ],
    directAnswer:
      "Yes—KLONDIKE indexes nano Calcium Sulfonate EP Grease on PDS with calcium sulfonate complex thickener, severe-duty EP positioning, and published weld, Timken, washout, and nano tungsten disulfide language on the grease spotlight map.",
    whatItMeans:
      "Grease built on calcium sulfonate complex thickener chemistry—severe-duty EP, washout resistance, and shock-load protection on pins and bushings versus commodity EP-2 greases sold on price alone.",
    whyCustomersAsk:
      "Mining, construction, and quarry accounts want calcium sulfonate for wet pins and shock load—but need PDS proof and thickener compatibility before fleet conversion.",
    likelyProductCategories: ["grease", "severe_duty_grease"],
    confirmedKlondikeProducts: [
      "KLONDIKE nano Calcium Sulfonate EP Grease — PDS: calcium sulfonate complex thickener; NLGI 2; 800 kg 4-ball weld; water spray-off <1%; nano tungsten disulfide EP/wear language (indexed grease spotlight).",
    ],
    possibleKlondikeProductsToVerify: [
      "Other KLONDIKE grease SKUs are different thickener families—do not assume all EP-2 products are calcium sulfonate.",
      "Auto-lube and centralized systems need thickener compatibility review before calcium sulfonate conversion.",
    ],
    pdsProofRequired: true,
    questionsToAsk: [
      "What thickener is in the line today?",
      "NLGI 1 or 2 required on OEM chart?",
      "Manual, gun, or centralized application?",
      "Water exposure and shock load on the joint?",
    ],
    repTalkTrack:
      "KLONDIKE’s indexed calcium sulfonate severe-duty story is nano Calcium Sulfonate EP on PDS—with weld, washout, and tungsten disulfide lines for wet, shock-loaded pins. Before bulk change we confirm thickener compatibility and OEM NLGI.",
    cautionNotes: [
      "Do not interchange with incompatible thickener families (polyurea and other soap types) without compatibility chart review.",
      "Keep proprietary tungsten disulfide nanotechnology claims inside published PDS wording.",
    ],
    keywords: ["calcium sulfonate", "sulfonate grease", "nano calcium", "calcium complex"],
  },

  molyGrease: {
    id: "molyGrease",
    attribute: "Moly Grease",
    aliases: [
      "moly grease",
      "molybdenum grease",
      "moly ep grease",
      "moly fortified grease",
      "3% moly grease",
    ],
    questionExamples: [
      "Does KLONDIKE carry moly grease?",
      "Do you have moly EP-2 grease?",
      "What molybdenum greases are on PDS?",
    ],
    directAnswer:
      "Yes—KLONDIKE indexes multiple moly-fortified greases on PDS, led by Moly Tac EP-2 Grease (lithium complex; 3% molybdenum on indexed spotlight), plus Moly Tac EP-1, Arctic Extreme EP-0, Bentone High Temp EP-2, and Fifth Wheel Grease with moly positioning.",
    whatItMeans:
      "Greases with documented molybdenum disulfide content for EP, shock load, and sliding wear on pins, implements, and chassis points where OEM calls for moly EP grades.",
    whyCustomersAsk:
      "Loader implements, vocational chassis, and fifth wheel applications often specify moly EP-2—buyers need the moly percent and thickener family from PDS, not tube color.",
    likelyProductCategories: ["grease", "moly_ep_grease"],
    confirmedKlondikeProducts: [
      "KLONDIKE Moly Tac EP-2 Grease — PDS: lithium complex; 3% molybdenum; NLGI 2 (indexed grease spotlight).",
      "KLONDIKE Moly Tac EP-1 Grease — PDS library indexed moly EP grease row.",
      "KLONDIKE Moly Tac Arctic Extreme EP-0 Grease — PDS library indexed row.",
      "KLONDIKE Moly Tac Bentone High Temp EP-2 — PDS library indexed row.",
      "KLONDIKE Fifth Wheel Grease — PDS: moly-fortified tacky NLGI 2 positioning (indexed grease spotlight).",
    ],
    possibleKlondikeProductsToVerify: [
      "KLONDIKE Open Gear Grease — confirm moly content on specific PDS if customer asks moly for open gear; may differ from Moly Tac EP family.",
      "Moly Tac SKUs are lithium complex per indexed PDS—not calcium sulfonate chemistry.",
    ],
    pdsProofRequired: true,
    questionsToAsk: [
      "OEM calls for moly EP-2, EP-1, or EP-0?",
      "Thickener family in auto-lube system today?",
      "Shock load, chassis, or fifth wheel application?",
      "Centralized lube compatibility restrictions?",
    ],
    repTalkTrack:
      "Moly is a number on the PDS—Moly Tac EP-2 shows 3% moly and lithium complex on the indexed sheet. Match NLGI and moly percent to the zerk chart before we talk drums.",
    cautionNotes: [
      "Do not assume calcium sulfonate nano greases are moly substitutes—different chemistry.",
      "Confirm auto-lube thickener compatibility before bulk moly conversion.",
    ],
    keywords: ["moly", "molybdenum", "moly ep", "moly grease", "3% moly"],
  },

  tackyGrease: {
    id: "tackyGrease",
    attribute: "Tacky Grease",
    aliases: [
      "tacky grease",
      "tackifier grease",
      "adhesive grease",
      "fibrous grease",
      "poly tac grease",
      "high tack grease",
    ],
    questionExamples: [
      "Does KLONDIKE have tacky grease?",
      "Do you carry adhesive grease for drill rods?",
      "What tacky NLGI 3 grease do you sell?",
    ],
    directAnswer:
      "Yes—KLONDIKE indexes tacky/adhesive greases on PDS, including Drill Rod Grease (fibrous tacky NLGI 3 barium complex), Fifth Wheel Grease (tacky moly-fortified NLGI 2), and AGRIMAX Poly Tac Grease (PDS library row).",
    whatItMeans:
      "Greases formulated for adhesion and stay-put performance on vertical or exposed points—often tacky or fibrous structure to resist throw-off, wash-down, or rotation.",
    whyCustomersAsk:
      "Drilling contractors, fifth wheel fleets, and open exposed pins need grease that stays on the joint—not runs off under water spray or road speed.",
    likelyProductCategories: ["grease", "adhesive_grease"],
    confirmedKlondikeProducts: [
      "KLONDIKE Drill Rod Grease — PDS: NLGI 3; barium complex; fibrous tacky structure; adhesion/washout language (indexed grease spotlight).",
      "KLONDIKE Fifth Wheel Grease — PDS: tacky moly-fortified NLGI 2 for fifth wheel duty (indexed grease spotlight).",
      "KLONDIKE AGRIMAX Poly Tac Grease — PDS library indexed tacky grease row.",
    ],
    possibleKlondikeProductsToVerify: [
      "Open Gear Grease and Open Gear Lubricant — different product family for open gearing; confirm tacky need vs enclosed grease.",
      "Thickener compatibility for barium complex drill rod grease in mixed systems.",
    ],
    pdsProofRequired: true,
    questionsToAsk: [
      "Application—drill rod, fifth wheel, open pin, or other?",
      "NLGI grade on OEM chart?",
      "Water spray or road-speed throw-off issue?",
      "Current thickener in service?",
    ],
    repTalkTrack:
      "Tacky is application-specific on our PDS—Drill Rod for fibrous NLGI 3 rod service, Fifth Wheel for tacky moly plate lube, Poly Tac for indexed tacky programs. Tell me the joint and we match the row, not the cheapest EP-2.",
    cautionNotes: [
      "Barium complex drill rod grease is not a general chassis default—confirm OEM.",
      "Fifth wheel grease is not interchangeable with multipurpose chassis grease without spec review.",
    ],
    keywords: ["tacky", "tackifier", "adhesive grease", "fibrous", "poly tac", "drill rod"],
  },

  openGearLubricant: {
    id: "openGearLubricant",
    attribute: "Open Gear Lubricant",
    aliases: [
      "open gear lubricant",
      "open gear grease",
      "girth gear lubricant",
      "kiln gear lubricant",
      "shovel open gear",
    ],
    questionExamples: [
      "Does KLONDIKE carry open gear lubricant?",
      "What do you have for mining open gears?",
      "Do you sell open gear grease?",
    ],
    directAnswer:
      "Yes—KLONDIKE indexes open gear products on PDS: Open Gear Grease for extreme-load open gearing with high weld load and adhesion positioning, and Open Gear Lubricant as a non-asphaltic open gear lubricant with weld/wear metrics on the grease spotlight map.",
    whatItMeans:
      "Lubricants for exposed girth gears, shovel open drives, and kiln gears—film strength, adhesion, and weld load matter more than standard enclosed gearbox oil.",
    whyCustomersAsk:
      "Mining, cement, and heavy industrial sites need PDS-backed open gear chemistry—not enclosed GL-5 or generic EP-2 mistaken for open gear duty.",
    likelyProductCategories: ["open_gear_lubricant", "industrial_grease"],
    confirmedKlondikeProducts: [
      "KLONDIKE Open Gear Grease — PDS: extreme-load open gearing; high weld load; very high base viscosity; mining/kiln positioning (indexed grease spotlight).",
      "KLONDIKE Open Gear Lubricant — PDS: non-asphaltic open gear lubricant; weld load and wear scar metrics (indexed grease spotlight).",
    ],
    possibleKlondikeProductsToVerify: [
      "Enclosed industrial gearbox oils are a different category—confirm open vs enclosed drive before quoting.",
      "Semi-fluid vs NLGI consistency required by OEM open gear spec.",
    ],
    pdsProofRequired: true,
    questionsToAsk: [
      "Open girth gear, shovel drive, or kiln application?",
      "OEM requires grease vs fluid open gear product?",
      "Current product and application method—flood, brush, auto spray?",
      "Load, speed, and contamination environment?",
    ],
    repTalkTrack:
      "Open gear is its own PDS lane—Open Gear Grease and Open Gear Lubricant are indexed for extreme-load exposed gearing. Send the OEM open gear note and we’ll match grease vs lubricant row with weld and adhesion language from the sheet.",
    cautionNotes: [
      "Do not substitute enclosed gear oil or multipurpose grease for open gear OEM specs.",
      "Application method and NLGI/fluid class must match OEM.",
    ],
    keywords: ["open gear", "girth gear", "kiln gear", "shovel gear", "open gearing"],
  },

  syntheticHeavyDutyEngineOil: {
    id: "syntheticHeavyDutyEngineOil",
    attribute: "Synthetic Heavy-Duty Engine Oil",
    aliases: [
      "synthetic heavy duty engine oil",
      "full synthetic diesel oil",
      "ck-4 full synthetic",
      "synthetic 15w-40",
      "synthetic fleet oil",
    ],
    questionExamples: [
      "Does KLONDIKE carry full synthetic heavy-duty engine oil?",
      "Do you have synthetic CK-4 15W-40?",
      "What synthetic diesel oils are on PDS?",
    ],
    directAnswer:
      "Yes—KLONDIKE indexes multiple full synthetic heavy-duty engine oils on PDS, including SAE 15W-40 Full Synthetic Heavy Duty Engine Oil (API CK-4/SN with OEM license rows on indexed spotlight), SAE 5W-40 Full Synthetic Heavy Duty, and SAE 0W-30/0W-40 Full Synthetic Heavy Duty Arctic CK-4 rows.",
    whatItMeans:
      "Full synthetic API CK-4 (and related OEM-licensed) heavy-duty engine oils for severe diesel duty—oxidation reserve, VI, and cold-flow language on PDS versus mineral or blend tiers.",
    whyCustomersAsk:
      "Fleet managers upgrading bulk programs want CK-4 proof, VI headroom, and OEM license documentation—not ‘synthetic’ marketing on non-CK-4 products.",
    likelyProductCategories: ["engine_oil", "heavy_duty_engine_oil"],
    confirmedKlondikeProducts: [
      "KLONDIKE SAE 15W-40 Full Synthetic Heavy Duty Engine Oil — PDS: API CK-4/SN; ACEA E9/E7; OEM licenses; VI ~155 on indexed HD spotlight.",
      "KLONDIKE SAE 5W-40 Full Synthetic Heavy Duty Engine Oil — PDS library indexed full synthetic HD row.",
      "KLONDIKE SAE 0W-30 / 0W-40 Full Synthetic Heavy Duty Engine Oils — PDS: Arctic Performance Technology; CK-4; extreme pour on indexed HD spotlight.",
    ],
    possibleKlondikeProductsToVerify: [
      "KLONDIKE SAE 15W-40 CK-4 Synthetic Blend Heavy Duty Engine Oil — blend tier, not full synthetic per product name.",
      "FA-4 and natural gas engine oils are separate categories—do not interchange with CK-4 bulk.",
    ],
    pdsProofRequired: true,
    questionsToAsk: [
      "Engine OEM and required API/OEM spec?",
      "DPF/aftertreatment and low-SAPS requirements?",
      "Climate for viscosity grade selection?",
      "Drain interval target vs OEM maximum?",
    ],
    repTalkTrack:
      "Full synthetic CK-4 is documented on the PDS—15W-40, 5W-40, and Arctic 0W rows each carry license and VI language. Tell me your engine family and climate; we’ll match the synthetic HD row, not a blend or FA-4 SKU.",
    cautionNotes: [
      "Do not promise drain intervals beyond OEM maximums.",
      "Segregate FA-4, natural gas, and CK-4 bulk programs.",
    ],
    keywords: ["synthetic heavy duty", "full synthetic diesel", "ck-4 synthetic", "synthetic 15w-40"],
  },

  naturalGasEngineOil: {
    id: "naturalGasEngineOil",
    attribute: "Natural Gas Engine Oil",
    aliases: [
      "natural gas engine oil",
      "cng engine oil",
      "lng engine oil",
      "low ash natural gas oil",
      "sour gas engine oil",
    ],
    questionExamples: [
      "Does KLONDIKE carry natural gas engine oil?",
      "Do you have low ash gas engine oil?",
      "What oil for Cummins natural gas engines?",
    ],
    directAnswer:
      "Yes—KLONDIKE indexes natural gas engine oils on PDS with low-ash and sour-gas positioning, including SAE 15W-40 Low Ash Natural Gas Engine Oil, SAE 40 Low Ash Natural Gas, SAE 40 Low Ash Sour Natural Gas, SAE 40 Mid Ash Sour Natural Gas, and SAE 10W-40 Synthetic Blend Low Ash Natural Gas Heavy Duty Engine Oil.",
    whatItMeans:
      "Engine oils formulated for compressed natural gas, LNG, and sour-gas engines with ash and detergent chemistry matched to OEM natural gas service— not standard diesel CK-4 bulk.",
    whyCustomersAsk:
      "Power generation, transit CNG fleets, and oilfield gas compression need low-ash gas engine oils with PDS documentation—diesel CK-4 is the wrong category.",
    likelyProductCategories: ["engine_oil", "natural_gas_engine_oil"],
    confirmedKlondikeProducts: [
      "KLONDIKE SAE 15W-40 Low Ash Natural Gas Engine Oil — PDS library indexed row (HD spotlight map).",
      "KLONDIKE SAE 40 Low Ash Natural Gas Engine Oil — PDS library indexed row (HD spotlight map).",
      "KLONDIKE SAE 40 Low Ash Sour Natural Gas Engine Oil — PDS library indexed row (HD spotlight map).",
      "KLONDIKE SAE 40 Mid Ash Sour Natural Gas Engine Oil — PDS library indexed row (HD spotlight map).",
      "KLONDIKE SAE 10W-40 Synthetic Blend Low Ash Natural Gas Heavy Duty Engine Oil — PDS library indexed row (HD spotlight map).",
    ],
    possibleKlondikeProductsToVerify: [
      "Confirm Cummins, Caterpillar, or other OEM natural gas sheet against exact PDS product name and ash class.",
      "Diesel CK-4 products are not natural gas substitutes—verify engine fuel type first.",
    ],
    pdsProofRequired: true,
    questionsToAsk: [
      "Spark-ignited natural gas, dual-fuel, or sour gas service?",
      "OEM natural gas oil specification and ash requirement?",
      "Drain interval and oil analysis program?",
      "Stationary gen-set vs mobile CNG fleet?",
    ],
    repTalkTrack:
      "Natural gas is its own PDS family—low ash and sour-gas rows indexed separately from diesel CK-4. Give me the engine OEM and fuel type and we’ll match the gas engine oil row with documentation, not bulk diesel.",
    cautionNotes: [
      "Do not use diesel CK-4 in OEM natural gas engines without explicit approval.",
      "Sour gas vs sweet gas may require different ash class—read PDS title exactly.",
    ],
    keywords: ["natural gas", "cng", "lng", "low ash gas", "sour gas engine"],
  },

  compressorOil: {
    id: "compressorOil",
    attribute: "Compressor Oil",
    aliases: [
      "compressor oil",
      "rotary screw compressor oil",
      "air compressor lubricant",
      "synthetic compressor oil",
      "iso 46 compressor",
    ],
    questionExamples: [
      "Does KLONDIKE carry compressor oil?",
      "Do you have rotary screw compressor lubricant?",
      "What ISO 46 compressor oil is on PDS?",
    ],
    directAnswer:
      "Yes—KLONDIKE indexes compressor oils on PDS, including ISO 46 Full Synthetic Compressor Oil for rotary screw service (demulsibility, foam, wear metrics on indexed spotlight) and Full Synthetic Circulating Compressor Turbine Oils for broader circulating/compressor-turbine ASTM D4304 class applications.",
    whatItMeans:
      "Lubricants formulated for compressor sumps—foam control, demulsibility, oxidation stability, and wear protection per PDS—not general AW hydraulic oil.",
    whyCustomersAsk:
      "Plant maintenance teams need the right compressor class to avoid foam, moisture carryover, and separator failures from hydraulic top-off mistakes.",
    likelyProductCategories: ["compressor_oil", "industrial_oil"],
    confirmedKlondikeProducts: [
      "KLONDIKE ISO 46 Full Synthetic Compressor Oil — PDS: demulsibility 40-40-0; foam control; four-ball wear 0.45 mm (indexed hydraulic/industrial spotlight).",
      "KLONDIKE Full Synthetic Circulating Compressor Turbine Oils — PDS: ASTM D4304 Type I; ISO 32–680; oxidation 10,000+ hrs (indexed spotlight).",
    ],
    possibleKlondikeProductsToVerify: [
      "KLONDIKE Long Life Turbine Oils — turbine class; not reciprocating compressor default without OEM.",
      "Natural gas compressor specialty rows—confirm ISO 260 vs ISO 46 rotary screw requirement on PDS.",
    ],
    pdsProofRequired: true,
    questionsToAsk: [
      "Rotary screw, reciprocating, or circulating system?",
      "OEM compressor oil specification and ISO viscosity?",
      "Separator change interval and moisture issues?",
      "Food-grade or breathing air requirement?",
    ],
    repTalkTrack:
      "Compressor sumps need compressor PDS rows—ISO 46 Full Synthetic for typical plant air, or Synthetic Circulating when ASTM D4304 class is specified. I’ll confirm OEM class before we quote AW hydraulic by mistake.",
    cautionNotes: [
      "Do not top off compressors with AW hydraulic without OEM approval.",
      "Wide ISO span on circulating oil—quote exact viscosity row from PDS.",
    ],
    keywords: ["compressor oil", "rotary screw", "air compressor", "iso 46 compressor"],
  },

  turbineOil: {
    id: "turbineOil",
    attribute: "Turbine Oil",
    aliases: [
      "turbine oil",
      "steam turbine oil",
      "gas turbine oil",
      "long life turbine oil",
      "turbine circulating oil",
    ],
    questionExamples: [
      "Does KLONDIKE carry turbine oil?",
      "Do you have long life turbine lubricant?",
      "What turbine oils are indexed on PDS?",
    ],
    directAnswer:
      "Yes—KLONDIKE indexes turbine oils on PDS: Long Life Turbine Oils (ASTM D4304 Type I; DIN 51515; oxidation 10,000+ hrs on indexed spotlight) and Full Synthetic Circulating Compressor Turbine Oils for combined circulating turbine/compressor service per ASTM D4304 on PDS.",
    whatItMeans:
      "Circulating oils for steam and gas turbine systems—oxidation stability, rust protection, and water separation per ASTM/DIN classes on PDS—not mobile AW hydraulic.",
    whyCustomersAsk:
      "Power generation and industrial plants require turbine-class fluids with documented oxidation and rust performance—compressor or hydraulic substitutes risk trips and varnish.",
    likelyProductCategories: ["turbine_oil", "industrial_oil"],
    confirmedKlondikeProducts: [
      "KLONDIKE Long Life Turbine Oils — PDS: ASTM D4304 Type I; DIN 51515; ISO 32–150; oxidation 10,000+ hrs (indexed spotlight).",
      "KLONDIKE Full Synthetic Circulating Compressor Turbine Oils — PDS: ASTM D4304 Type I; DIN 51515/51524 (indexed spotlight).",
    ],
    possibleKlondikeProductsToVerify: [
      "Exact ISO viscosity per turbine OEM—quote specific row from PDS span.",
      "Reciprocating compressor vs turbine loop—confirm ASTM class with engineering.",
    ],
    pdsProofRequired: true,
    questionsToAsk: [
      "Steam or gas turbine OEM lubricant class?",
      "Required ISO viscosity grade?",
      "Water separation and rust test expectations?",
      "Shared circulating loop with compressors?",
    ],
    repTalkTrack:
      "Turbine trips are career events—Long Life Turbine and Synthetic Circulating rows are indexed to ASTM D4304 on PDS. Send the turbine OEM class and ISO grade and we’ll match the row, never the AW drum.",
    cautionNotes: [
      "Not for reciprocating compressor programs without OEM approval.",
      "Moisture ingress control is part of turbine oil management—fluid choice alone does not fix water issues.",
    ],
    keywords: ["turbine oil", "steam turbine", "gas turbine", "long life turbine", "d4304"],
  },
};

/**
 * Phase 74.0 / 74.2 — Grease PDS spotlight extraction foundation (data only).
 *
 * Summaries are aligned to `pdsMap.js` grease entries and published spec bullets there;
 * dealers must confirm NLGI, thickener, and OEM fit on the current PDS before quoting.
 * Not imported by App.js or Sales Enablement UI in this phase.
 */

/** @typedef {{ link: string, feature: string, bridge: string, benefit: string }} GreaseLfbb */

/**
 * @typedef {{
 *   id: string,
 *   productName: string,
 *   categoryId: "grease",
 *   pdsFileHint: string,
 *   primaryApplications: string[],
 *   industries: string[],
 *   equipmentTargets: string[],
 *   operatingConditions: string[],
 *   technicalProofPoints: string[],
 *   painPoints: string[],
 *   lfbb: GreaseLfbb,
 *   recommendedCustomerProfileIds: string[],
 *   recommendedCta: string,
 *   productNumbers: string[],
 *   pdsSafeNotes: string[],
 * }} GreasePdsSpotlightProduct */

/**
 * @typedef {{
 *   version: number,
 *   categoryId: "grease",
 *   products: GreasePdsSpotlightProduct[],
 * }} GreasePdsSpotlightMap */
export const GREASE_PDS_SPOTLIGHT_MAP = {
  version: 1,
  categoryId: "grease",
  products: [
    {
      id: "grease-pds-hd-hammer",
      productName: "KLONDIKE HD Hammer Grease",
      categoryId: "grease",
      pdsFileHint: "Grease PDS/KLONDIKE HD Hammer Grease PDS.pdf",
      primaryApplications: [
        "Hydraulic breaker and hammer tool lubrication where a hammer-specific grease is called for.",
        "High-shock, reciprocating tool points where EP film and solid lubricant fortification are specified on the PDS.",
      ],
      industries: [
        "Construction and demolition contracting",
        "Mining and quarry support (mobile breaking and size reduction)",
        "Aggregate processing when hydraulic hammers are in the fleet mix",
      ],
      equipmentTargets: [
        "Hydraulic hammers and impact tools",
        "Breaker attachments on excavators and backhoes",
      ],
      operatingConditions: [
        "Severe shock loading; PDS cites calcium sulfonate complex thickener and solid lubricant fortification.",
        "High dropping point and heavy base oil viscosity called out on the PDS for severe service.",
      ],
      technicalProofPoints: [
        "PDS-indexed NLGI 2; calcium sulfonate complex thickener.",
        "PDS lists 4-ball weld load 800 kg, dropping point >275°C, wear scar <0.5 mm, base oil viscosity 460 cSt (confirm revision on current sheet).",
        "Positioned in PDS library for copper/graphite–fortified durability language—verify exact additive claims on live PDS.",
      ],
      painPoints: [
        "Premature tool wear or noisy operation when a general-purpose chassis grease is substituted for hammer duty.",
        "Grease squeeze-by or breakdown when shock frequency and impact energy exceed the prior product’s documented envelope.",
      ],
      lfbb: {
        link: "Breaker crews feel downtime first when the tool overheats or wears—often after a non-hammer grease was used to “save a trip.”",
        feature:
          "Hammer-oriented grease with PDS-documented EP performance, high dropping point, and solid lubricant fortification for severe impact duty.",
        bridge:
          "Move the conversation from “any red grease in the zerk” to matching hammer OEM or tool manual NLGI and duty class to the PDS line.",
        benefit:
          "Gives the dealer a defensible spec conversation and fewer emergency comebacks on shock-loaded tooling—when the PDS and OEM allow this product.",
      },
      recommendedCustomerProfileIds: ["construction", "mining_aggregate", "municipal_fleet"],
      recommendedCta:
        "Pull the hammer OEM lube note and compare NLGI, thickener, and operating temperature to the current HD Hammer Grease PDS before switching drums.",
      productNumbers: [],
      pdsSafeNotes: [
        "Do not infer interchange with other calcium sulfonate or moly greases; compatibility must be confirmed for the system.",
        "Pack sizes and exact additive wording change with PDS revision—quote from the sheet the customer signs.",
      ],
    },
    {
      id: "grease-pds-drill-rod",
      productName: "KLONDIKE Drill Rod Grease",
      categoryId: "grease",
      pdsFileHint: "Grease PDS/KLONDIKE Drill Rod Grease PDS.pdf",
      primaryApplications: [
        "Drill rod and coupling lubrication in underground and surface drilling where a tacky, fibrous NLGI 3 grease is specified.",
        "Applications calling for strong adhesion and controlled water washout per PDS test limits.",
      ],
      industries: [
        "Underground and surface mining exploration",
        "Aggregate and quarry drilling contractors",
        "Geotechnical and specialty drilling services",
      ],
      equipmentTargets: [
        "Top-hammer and DTH rod strings and couplings",
        "Drills operating in wet, high-adhesion-demand cycles",
      ],
      operatingConditions: [
        "PDS-indexed NLGI 3; barium complex thickener; fibrous tacky structure for adhesion.",
        "Water washout listed ≤5% on PDS index; dropping point 200°C; base oil viscosity 150 cSt (verify on current PDS).",
      ],
      technicalProofPoints: [
        "Rust protection pass called out on indexed PDS summary.",
        "High adhesion performance and tacky structure documented for rod-type service.",
      ],
      painPoints: [
        "Rod galling and thread damage when grease washes off or lacks fibrous tack for collar service.",
        "Inefficient drilling and extra steel cost when friction and contamination control slip on long rounds.",
      ],
      lfbb: {
        link: "Drilling contractors lose meters per shift when rods heat or gall—often traced to wrong NLGI or a non-tacky product on threads.",
        feature:
          "Heavy-duty tacky NLGI 3 barium-complex grease indexed for drill rod service with documented washout and adhesion language.",
        bridge:
          "Shift from price-per-tube to thread condition photos, water exposure, and the PDS washout/adhesion bullets the crew can post at the rod rack.",
        benefit:
          "Supports a repeatable rod-lube SOP aligned to PDS limits—reducing unplanned trips down the hole for the wrong reasons.",
      },
      recommendedCustomerProfileIds: ["mining_aggregate", "construction"],
      recommendedCta:
        "Confirm barium thickener acceptance with the drill OEM and any mixing rules before converting a rod program—use the Drill Rod Grease PDS as the approval artifact.",
      productNumbers: [],
      pdsSafeNotes: [
        "Barium complex thickeners are not interchangeable with lithium or polyurea without a compatibility review.",
        "Underground ventilation and HSE rules are site-specific; grease choice still must follow OEM.",
      ],
    },
    {
      id: "grease-pds-nano-calcium-sulfonate-ep",
      productName: "KLONDIKE nano Calcium Sulfonate EP Grease",
      categoryId: "grease",
      pdsFileHint: "Grease PDS/KLONDIKE nano Calcium Sulfonate EP Grease PDS.pdf",
      primaryApplications: [
        "High-load, high-temperature, and wet environments where NLGI 1 or 2 calcium sulfonate EP greases are allowed.",
        "Programs that need documented EP performance and water spray-off resistance per PDS tables.",
      ],
      industries: [
        "Mining and aggregate processing",
        "Heavy construction and infrastructure",
        "Agriculture on severe-duty implements where EP grease is specified",
        "Industrial maintenance with wash-down exposure",
      ],
      equipmentTargets: [
        "Slow-speed bearings, pins, and bushings under shock and load",
        "Mobile equipment pivot lines where calcium sulfonate EP is an approved class",
      ],
      operatingConditions: [
        "PDS index lists NLGI 1 / 2 options; calcium sulfonate complex thickener.",
        "Water spray off <1% and dropping point 300°C+ on indexed summary—revalidate on current PDS.",
      ],
      technicalProofPoints: [
        "4-ball weld load 800 kg; Timken OK load 65+ lbs on PDS index.",
        "Nano tungsten disulfide technology called out for EP/wear positioning—use PDS wording only.",
      ],
      painPoints: [
        "Water and slurry exposure washing grease from pins when spray-off performance is not matched to duty.",
        "Confusion between “premium red grease” SKUs without a documented EP and washout story.",
      ],
      lfbb: {
        link: "Severe-duty yards see pin play long before finance sees the grease invoice—especially after wet shifts or high-pressure wash routines.",
        feature:
          "Calcium sulfonate complex EP grease with indexed high weld load, Timken OK values, and low water spray-off for demanding environments.",
        bridge:
          "Replace shelf stories with NLGI choice (1 vs 2), regrease interval discipline, and the PDS EP/water lines the service manager can file.",
        benefit:
          "Helps standardize a spec-backed severe-duty grease tier where OEM and thickener compatibility allow—without promising interchange across all greases.",
      },
      recommendedCustomerProfileIds: ["mining_aggregate", "construction", "agriculture", "manufacturing"],
      recommendedCta:
        "Pick NLGI 1 vs 2 from the component OEM chart, then align Timken and 4-ball values on the live PDS with the pin map on the worst actors.",
      productNumbers: [],
      pdsSafeNotes: [
        "NLGI 1 vs 2 changes pumpability and channeling; choose from OEM guidance, not habit.",
        "“Nano” claims must track exact PDS language; do not extrapolate beyond the published sheet.",
      ],
    },
    {
      id: "grease-pds-moly-tac-ep2",
      productName: "KLONDIKE Moly Tac EP-2 Grease",
      categoryId: "grease",
      pdsFileHint: "Grease PDS/KLONDIKE Moly Tac EP-2 Grease PDS.pdf",
      primaryApplications: [
        "Heavy-duty NLGI 2 applications where lithium complex moly grease is specified for EP, shock, and adhesion.",
        "General severe-service mobile and industrial grease points when moly EP-2 is an approved product class.",
      ],
      industries: [
        "Construction and earthmoving",
        "Mining and aggregate mobile fleets",
        "Agriculture implements and PTO-driven equipment (when spec allows moly EP-2)",
        "Trucking and vocational chassis where NLGI 2 EP moly is specified",
      ],
      equipmentTargets: [
        "Pins, bushings, and chassis zerks calling for moly-fortified EP-2",
        "Loader and excavator implement greasing on mixed fleets",
      ],
      operatingConditions: [
        "PDS index: NLGI 2 lithium complex thickener with 3% molybdenum; dropping point 260°C.",
        "Indexed water washout 1%; 4-ball EP load 500 kg; Timken OK load 70 lbs—confirm on current PDS revision.",
      ],
      technicalProofPoints: [
        "High load carrying capacity called out alongside EP and Timken metrics on PDS index.",
        "Moly level and thickener type must be treated as compatibility-critical vs. central systems.",
      ],
      painPoints: [
        "Shock-loaded pins spalling when a non-moly or wrong-thickener grease is used on moly-spec joints.",
        "Centralized lube systems contaminated by incompatible thickener crossover.",
      ],
      lfbb: {
        link: "Mixed fleets standardize on one color of EP-2—until a central greaser plugs with incompatible soap or a moly-spec pin fails early.",
        feature:
          "Moly-fortified lithium complex NLGI 2 grease with indexed EP load, Timken OK, and low washout for heavy-duty service.",
        bridge:
          "Bring the conversation to thickener family, moly percentage, and OEM zerk charts before swapping brands at the drum gun.",
        benefit:
          "Reduces misapplication risk when shops post the PDS thickener line next to the grease board for contract mechanics.",
      },
      recommendedCustomerProfileIds: ["construction", "mining_aggregate", "agriculture", "trucking_fleet", "municipal_fleet"],
      recommendedCta:
        "Audit the top ten high-load pins for moly and NLGI 2 requirements, then match lithium complex and 3% moly language on the Moly Tac EP-2 PDS to the OEM cap.",
      productNumbers: [],
      pdsSafeNotes: [
        "PDS index lists lithium complex; do not assume calcium sulfonate chemistry despite other Moly Tac line names—read the sheet for each SKU.",
        "Moly greases are not universal; confirm central system and OEM restrictions.",
      ],
    },
    {
      id: "grease-pds-open-gear",
      productName: "KLONDIKE Open Gear Grease",
      categoryId: "grease",
      pdsFileHint: "Grease PDS/KLONDIKE Open Gear Grease PDS.pdf",
      primaryApplications: [
        "Open gear sets on kilns, shovels, mills, and other exposed gearing where a heavy adhesive open-gear grease is specified.",
        "Extreme-load open gearing where PDS lists high weld load and very high base viscosity for film strength.",
      ],
      industries: [
        "Mining (e.g., rope shovels and large excavators with open gear drives per PDS examples)",
        "Cement and lime production (kiln open gears)",
        "Heavy industrial drives with exposed gearing and manual inspection routines",
      ],
      equipmentTargets: [
        "Open girth gears, kiln drives, and similar exposed gear trains",
        "Large mining shovel open gear systems referenced in PDS positioning",
      ],
      operatingConditions: [
        "PDS index: NLGI 0/1; lithium thickener; very high base viscosity at 40°C for film retention.",
        "Rust protection pass; wear scar and weld load documented for extreme load performance—verify limits on current PDS.",
      ],
      technicalProofPoints: [
        "4-ball weld load 1000 kg on indexed summary; viscosity @40°C 4100 cSt; wear scar 0.7 mm.",
        "High adhesion and extreme load performance called out for mining shovel and kiln-style applications in PDS library text.",
      ],
      painPoints: [
        "Mesh wear and inspection failures when film thickness is inadequate for open mesh contact patterns.",
        "Environmental contamination and water exposure washing or breaking films on slow-turning gears.",
      ],
      lfbb: {
        link: "Open gears fail slowly then expensively—often after a thinner grease was chosen for easier spray at the expense of film.",
        feature:
          "Heavy-duty open gear grease with indexed high weld load, very high viscosity, and adhesion-oriented positioning for mining and kiln duty.",
        bridge:
          "Move from spray convenience to tooth inspection photos, pitch-line velocity, and the PDS viscosity and EP lines the reliability team can defend.",
        benefit:
          "Gives maintenance a PDS-backed path for extreme-load open gearing—without implying interchange with enclosed gear oils or semi-fluid open-gear products.",
      },
      recommendedCustomerProfileIds: ["mining_aggregate", "manufacturing"],
      recommendedCta:
        "Schedule a joint walk with reliability on spray pattern, tooth wear photos, and ambient contamination—then lock NLGI 0/1 choice to the Open Gear Grease PDS limits.",
      productNumbers: [],
      pdsSafeNotes: [
        "Not interchangeable with Open Gear Lubricant (semi-fluid) or enclosed industrial gear oils; confirm product family with OEM.",
        "Application method (spray, idler, etc.) must follow OEM and site HSE; PDS does not replace those procedures.",
      ],
    },
    {
      id: "grease-pds-fifth-wheel",
      productName: "KLONDIKE Fifth Wheel Grease",
      categoryId: "grease",
      pdsFileHint: "Grease PDS/KLONDIKE Fifth Wheel Grease PDS.pdf",
      primaryApplications: [
        "Fifth wheel plate and kingpin sliding interfaces where a tacky, moly-fortified NLGI 2 grease is specified.",
        "Heavy sliding loads and outdoor exposure where PDS cites adhesion and water-resistant formulation.",
      ],
      industries: [
        "Trucking and for-hire fleet maintenance",
        "Municipal and vocational fleets with fifth wheel service",
        "Dealer and lube-bay programs supporting Class 8 chassis PM",
      ],
      equipmentTargets: [
        "Tractor fifth wheel top plates and pivot surfaces",
        "Sliding hitches and similar high-adhesion chassis points per OEM guidance",
      ],
      operatingConditions: [
        "PDS index: NLGI 2; barium complex thickener; moly fortified; base oil viscosity 100 cSt.",
        "Dropping point 165°C; load wear index 65; water-resistant formulation and high adhesion called out on indexed summary.",
      ],
      technicalProofPoints: [
        "Moly-fortified tacky grease positioning for fifth wheel duty in PDS library summary.",
        "Barium complex thickener—compatibility must be verified before mixing with other greases.",
      ],
      painPoints: [
        "Plate wear and steering feel complaints when a non-tacky or non-moly product washes off in rain or road spray.",
        "Repeat fifth wheel service when adhesion and load-carrying do not match sliding load severity.",
      ],
      lfbb: {
        link: "Linehaul shops see fifth wheel callbacks from wear and noise—often after a chassis multipurpose grease was used on the plate.",
        feature:
          "Tacky, moly-fortified NLGI 2 grease indexed for fifth wheel plates with adhesion and wash-resistance language on the PDS.",
        bridge:
          "Shift from “whatever is in the gun” to OEM fifth wheel lube notes, NLGI 2, and barium/moly compatibility on the posted spec card.",
        benefit:
          "Supports a repeatable fifth wheel PM lane that matches documented sliding-load and weather exposure—when OEM allows this product.",
      },
      recommendedCustomerProfileIds: ["trucking_fleet", "municipal_fleet", "construction"],
      recommendedCta:
        "Photograph the fifth wheel OEM lube note and compare NLGI, moly, and thickener to the Fifth Wheel Grease PDS before bulk conversion.",
      productNumbers: [],
      pdsSafeNotes: [
        "Barium complex is not interchangeable with lithium or polyurea without a formal compatibility review.",
        "Do not assume GC-LB chassis approval from this row alone—confirm on the live PDS for the exact SKU.",
      ],
    },
    {
      id: "grease-pds-moly-tac-arctic-ep0",
      productName: "KLONDIKE Moly Tac Arctic Extreme EP-0 Grease",
      categoryId: "grease",
      pdsFileHint: "Grease PDS/KLONDIKE Moly Tac Arctic Extreme Synthetic EP-0 Grease PDS.pdf",
      primaryApplications: [
        "Sub-zero and severe cold environments where NLGI 0 pumpability and synthetic-blend cold flow are specified.",
        "Equipment and centralized points where PDS lists operating range −45°C to 20°C for this grade.",
      ],
      industries: [
        "Northern trucking, municipal snowfighting, and utility fleets",
        "Construction mobilization in winter conditions",
        "Mining and aggregate surface operations with extreme cold exposure",
      ],
      equipmentTargets: [
        "Chassis and implement points calling for NLGI 0 in cold service",
        "Applications referencing low-temperature pumpability on the PDS",
      ],
      operatingConditions: [
        "Indexed operating range −45°C to 20°C; NLGI 0; synthetic blend base oil with 5% solid lubricant per PDS summary.",
        "4-ball EP load 400 kg; dropping point 180°C; rust protection pass—reconfirm on current PDS.",
      ],
      technicalProofPoints: [
        "Solid lubricant content and cold-temperature pumpability called out for severe low-temperature duty.",
        "EP protection indexed at 400 kg 4-ball—use PDS wording only vs. other NLGI grades.",
      ],
      painPoints: [
        "Grease starvation at cold start when NLGI 2 or the wrong thickener will not pump to the pin.",
        "Emergency top-offs with warm-climate grease that channels or fails to feed in winter.",
      ],
      lfbb: {
        link: "Cold-climate fleets fight slow greasers and dry pins on the first −20°C morning—often after summer-grade grease stayed in the cart.",
        feature:
          "Arctic-oriented NLGI 0 synthetic-blend grease with indexed cold operating band, solid lubricants, and EP metrics on the PDS.",
        bridge:
          "Move from viscosity guesswork to ambient lows, auto-lube line diameter, and the PDS pumpability bullets for winter PM.",
        benefit:
          "Helps standardize a defensible cold-weather NLGI 0 lane where OEM and central system design allow—without implying all EP-0 products match.",
      },
      recommendedCustomerProfileIds: ["trucking_fleet", "municipal_fleet", "construction", "mining_aggregate"],
      recommendedCta:
        "Log the coldest operating week and central lube hardware, then align NLGI 0 and −45 °C language on the Arctic EP-0 PDS with OEM limits.",
      productNumbers: [],
      pdsSafeNotes: [
        "Tight upper temperature bound (20°C on index)—do not extrapolate to hot kiln or high-speed bearing duty without OEM sign-off.",
        "Centralized systems require OEM and hardware approval for NLGI 0 feed rates.",
      ],
    },
    {
      id: "grease-pds-moly-tac-bentone-ep2",
      productName: "KLONDIKE Moly Tac Bentone High Temp EP-2",
      categoryId: "grease",
      pdsFileHint: "Grease PDS/KLONDIKE Moly Tac Bentone High Temp EP-2 Grease PDS.pdf",
      primaryApplications: [
        "High-temperature industrial points where bentonite (clay) thickener and moly are specified.",
        "Furnace, kiln vicinity, and severe heat exposure noted in PDS positioning—not general chassis default.",
      ],
      industries: [
        "Cement, lime, and high-temperature process plants",
        "Primary metals and manufacturing with oven or kiln-adjacent equipment",
        "Mining process heat zones where clay-thickened moly EP-2 is an approved class",
      ],
      equipmentTargets: [
        "Slow-speed bearings and mechanisms in high-heat environments per OEM",
        "Equipment calling for clay-thickened moly EP-2 on the lube chart",
      ],
      operatingConditions: [
        "PDS index: NLGI 2; clay (Bentone) thickener; molybdenum disulfide; penetration 270–290; base oil viscosity 14 cSt.",
        "Dropping point listed as none (clay); high temperature stability, water and vibration resistance on indexed summary.",
      ],
      technicalProofPoints: [
        "Clay thickener behavior differs from soap-thickened greases; PDS notes high temperature stability.",
        "Moly disulfide called out—verify compatibility with seals and other greases before changeover.",
      ],
      painPoints: [
        "Bleed, dry-out, or loss of film when soap-thickened greases exceed their temperature envelope.",
        "Cross-contamination with incompatible thickeners in shared grease routes.",
      ],
      lfbb: {
        link: "Reliability teams chase mystery bearing failures near heat—often where a general EP-2 was never rated for the skin temperature of the housing.",
        feature:
          "High-temperature bentonite-thickened NLGI 2 grease with moly, indexed for furnace/kiln-style duty language on the PDS.",
        bridge:
          "Replace shelf chatter with housing temperature logs, OEM clay-grease allowance, and the PDS penetration and thickener line.",
        benefit:
          "Gives engineering a documented bentone+moly path for approved high-heat assets—without promising interchange with lithium EP-2.",
      },
      recommendedCustomerProfileIds: ["manufacturing", "mining_aggregate", "municipal_fleet"],
      recommendedCta:
        "Capture max skin temperature and OEM clay-grease approval, then walk the Bentone High Temp EP-2 PDS thickener and moly bullets with maintenance.",
      productNumbers: [],
      pdsSafeNotes: [
        "Clay thickeners are incompatible with many soap greases; purge and flush procedures must follow OEM.",
        "Very low indexed base oil viscosity (14 cSt)—do not assume heavy open-gear film; that is a different product family.",
      ],
    },
    {
      id: "grease-pds-moly-tac-ep1",
      productName: "KLONDIKE Moly Tac EP-1 Grease",
      categoryId: "grease",
      pdsFileHint: "Grease PDS/KLONDIKE Moly Tac EP-1 Grease PDS.pdf",
      primaryApplications: [
        "NLGI 1 heavy-duty points where softer grease is needed for pumpability or central feed versus NLGI 2.",
        "Shock-load and EP service where PDS lists lithium complex, 3% moly, and wide temperature performance.",
      ],
      industries: [
        "Construction and earthmoving mixed fleets",
        "Mining and aggregate mobile equipment",
        "Agriculture implements when NLGI 1 moly EP is specified",
      ],
      equipmentTargets: [
        "Pins, bushings, and central systems calling for NLGI 1 moly EP",
        "Seasonal or ambient conditions where NLGI 1 feeds better than NLGI 2 per OEM",
      ],
      operatingConditions: [
        "PDS index: NLGI 1; lithium complex; 3% molybdenum; dropping point 260°C.",
        "4-ball EP load 400 kg; Timken OK 70 lbs; water washout 4% on indexed summary—verify revision.",
      ],
      technicalProofPoints: [
        "Same moly percentage family as other indexed Moly Tac EP grades with different NLGI.",
        "Wide temperature performance called out for severe service environments.",
      ],
      painPoints: [
        "Feed problems or channeling when NLGI 2 is too stiff for the circuit or ambient band.",
        "Pin wear when moly content or thickener family does not match the OEM chart.",
      ],
      lfbb: {
        link: "Service managers default to NLGI 2 “because it lasts longer”—then fight feed issues on long grease lines or cold mornings.",
        feature:
          "Moly-fortified lithium complex NLGI 1 grease with indexed EP, Timken, and washout values on the PDS.",
        bridge:
          "Pair ambient lows, line length, and OEM NLGI guidance before swapping between Moly Tac EP-1 and EP-2.",
        benefit:
          "Clarifies when NLGI 1 moly EP is the documentable fit—reducing guesswork between adjacent grades in the same product family.",
      },
      recommendedCustomerProfileIds: ["construction", "mining_aggregate", "agriculture", "trucking_fleet"],
      recommendedCta:
        "Mark every zerk that OEM lists as NLGI 1, then align Timken and 4-ball lines on the Moly Tac EP-1 PDS to those tags only.",
      productNumbers: [],
      pdsSafeNotes: [
        "Not interchangeable with Moly Tac EP-2 for applications that explicitly require NLGI 2 film thickness.",
        "Confirm moly allowance for food-adjacent or specialty equipment separately.",
      ],
    },
    {
      id: "grease-pds-multi-purpose",
      productName: "KLONDIKE Multi-Purpose Grease",
      categoryId: "grease",
      pdsFileHint: "Grease PDS/KLONDIKE Multi-Purpose Grease PDS.pdf",
      primaryApplications: [
        "General plant and yard lubrication where NLGI 2 lithium multipurpose grease is appropriate per OEM.",
        "Moderate to heavy-duty industrial and mobile points that do not need a specialty thickener or moly program.",
      ],
      industries: [
        "Manufacturing MRO and in-plant lubrication routes",
        "Municipal shops with mixed light equipment",
        "Construction and fleet yards needing a documented multipurpose NLGI 2 baseline",
      ],
      equipmentTargets: [
        "Bearings, bushings, and general grease points on industrial and mobile equipment per OEM charts",
        "Non-specialty zerk routes where lithium NLGI 2 is the approved default",
      ],
      operatingConditions: [
        "PDS index: NLGI 2; lithium thickener; dropping point 200°C; base oil viscosity 200 cSt.",
        "4-ball weld 315 kg; Timken OK 45 lbs; water resistant; multipurpose application language on indexed summary.",
      ],
      technicalProofPoints: [
        "Positioned as versatile lithium NLGI 2 with documented EP Timken and weld metrics on the index.",
        "Lower Timken OK than premium severe-duty lines—avoid overselling vs. moly or calcium sulfonate programs.",
      ],
      painPoints: [
        "SKU sprawl when every bench picks a different “red grease” without a posted multipurpose standard.",
        "Misapplication on hammer, open gear, or fifth wheel duty where specialty products are required.",
      ],
      lfbb: {
        link: "Shops want one grease on the cart—until a specialty point fails because the multipurpose grade was never on the OEM chart for that joint.",
        feature:
          "Documented NLGI 2 lithium multipurpose grease with indexed EP-related metrics and water resistance on the PDS.",
        bridge:
          "Post the OEM-approved multipurpose map next to the drum; route hammers, fifth wheels, and open gears to their correct rows.",
        benefit:
          "Reduces random top-off when a single, PDS-backed multipurpose standard is agreed for eligible points only.",
      },
      recommendedCustomerProfileIds: ["manufacturing", "municipal_fleet", "construction", "trucking_fleet"],
      recommendedCta:
        "Audit the top 20 zerks for specialty exclusions, then adopt Multi-Purpose Grease only where OEM and PDS align for NLGI 2 lithium service.",
      productNumbers: [],
      pdsSafeNotes: [
        "Multipurpose does not replace moly, clay, barium, or open-gear products; confirm joint class before quoting.",
        "Timken and weld values are moderate vs. severe-duty family greases—quote PDS tables, not competitor slogans.",
      ],
    },
    {
      id: "grease-pds-nano-full-synthetic-ep1-5",
      productName: "KLONDIKE nano Full Synthetic EP-1.5 Grease",
      categoryId: "grease",
      pdsFileHint: "Grease PDS/KLONDIKE nano Full Synthetic EP-1.5 Grease PDS.pdf",
      primaryApplications: [
        "Premium full-synthetic NLGI 1.5 service where PDS lists PAO base oil, nano tungsten disulfide, and high EP metrics.",
        "High load, speed, or temperature windows when OEM allows this NLGI and chemistry.",
      ],
      industries: [
        "Mining and aggregate severe-duty mobile fleets",
        "Construction high-shock implement and pivot programs",
        "Manufacturing and OEM assembly cells specifying premium synthetic chassis or bearing greases",
      ],
      equipmentTargets: [
        "Severe-duty bearings and pivots calling for synthetic EP grease in the NLGI 1.5 band",
        "Equipment where reduced wear scar and high Timken OK are decision criteria on the PDS",
      ],
      operatingConditions: [
        "PDS index: NLGI 1.5; full synthetic PAO base oil; nano tungsten disulfide; dropping point 260°C.",
        "4-ball weld load 800 kg; Timken OK 80 lbs; wear scar 0.33 mm on indexed summary—confirm on current sheet.",
      ],
      technicalProofPoints: [
        "Extreme temperature performance and nano additive language tied to indexed test values.",
        "NLGI 1.5 sits between 1 and 2—OEM clearance on channeling and feed is mandatory.",
      ],
      painPoints: [
        "Premature wear when accounts under-buy EP capability for true severe duty.",
        "Confusion between nano calcium sulfonate EP and nano full synthetic EP-1.5 SKUs at the counter.",
      ],
      lfbb: {
        link: "Severe-duty buyers hear “nano” everywhere—fewer can explain NLGI 1.5 or show the PDS Timken line next to the pin map.",
        feature:
          "Full synthetic PAO NLGI 1.5 grease with indexed high weld load, Timken OK, and wear scar data plus nano additive positioning on the PDS.",
        bridge:
          "Tie premium spend to OEM NLGI allowance, operating temperature, and the indexed scar and EP numbers—not shelf stories.",
        benefit:
          "Supports a defensible premium pivot for approved severe assets without blurring into unrelated nano SKUs.",
      },
      recommendedCustomerProfileIds: ["mining_aggregate", "construction", "manufacturing", "trucking_fleet"],
      recommendedCta:
        "Bench the worst five wear pins against PDS Timken, weld load, and wear scar—then confirm NLGI 1.5 is on the OEM chart before upselling.",
      productNumbers: [],
      pdsSafeNotes: [
        "“Nano” and synthetic claims must track exact PDS wording; do not interchange with nano Calcium Sulfonate EP.",
        "Verify central system shear and feed compatibility for NLGI 1.5 vs. plant standard greases.",
      ],
    },
    {
      id: "grease-pds-open-gear-lubricant",
      productName: "KLONDIKE Open Gear Lubricant",
      categoryId: "grease",
      pdsFileHint: "Grease PDS/KLONDIKE Open Gear Lubricant PDS.pdf",
      primaryApplications: [
        "Exposed open gear drives where a non-asphaltic open gear lubricant is specified instead of asphaltic compounds.",
        "Extreme-load open gearing where PDS cites high weld load, controlled wear scar, and resists-hardening positioning.",
      ],
      industries: [
        "Mining and cement open gear drives",
        "Heavy industrial kilns and mills with visual tooth inspection programs",
        "Manufacturing reliability teams managing spray or idler application systems",
      ],
      equipmentTargets: [
        "Open girth gears and similar drives calling for semi-fluid / open gear lubricant products per OEM",
        "Not interchangeable with NLGI Open Gear Grease brick—confirm product family on the chart",
      ],
      operatingConditions: [
        "Non-asphaltic formulation; 4-ball weld load >800 kg; wear scar 0.45 mm; flash point 175°C on PDS index.",
        "Copper corrosion 1B; high viscosity film; extreme pressure protection; resists hardening per indexed summary.",
      ],
      technicalProofPoints: [
        "Distinct from Open Gear Grease NLGI 0/1 row—different chemistry and application class on separate PDS.",
        "Wear scar and weld metrics support EP positioning only in open-gear context per PDS.",
      ],
      painPoints: [
        "Inspection failures when asphaltic films crack or harden; sites need non-hardening film behavior where PDS allows.",
        "Wrong product family selected under time pressure between “open gear” SKUs.",
      ],
      lfbb: {
        link: "Open gear inspectors flag flaking and hardening before operations sees tonnage loss—often after the wrong open-gear chemistry was sprayed for convenience.",
        feature:
          "Non-asphaltic open gear lubricant with indexed weld load, wear scar, corrosion, and resists-hardening language on the PDS.",
        bridge:
          "Separate Open Gear Lubricant from Open Gear Grease on the lube board with OEM spray method and film type.",
        benefit:
          "Gives reliability a PDS-backed non-asphaltic option where that film type is approved—without mixing semi-fluid and NLGI brick stories.",
      },
      recommendedCustomerProfileIds: ["mining_aggregate", "manufacturing"],
      recommendedCta:
        "Bring tooth photos and OEM film-type requirement to the meeting, then confirm non-asphaltic Open Gear Lubricant PDS limits vs. NLGI Open Gear Grease.",
      productNumbers: [],
      pdsSafeNotes: [
        "Do not substitute for enclosed gear oils or general multipurpose greases.",
        "Spray equipment, consumption rates, and HSE controls are site- and OEM-specific.",
      ],
    },
    {
      id: "grease-pds-syn-tac-ep00",
      productName: "KLONDIKE Syn Tac EP-00 Synthetic Grease",
      categoryId: "grease",
      pdsFileHint: "Grease PDS/KLONDIKE Syn Tac Synthetic EP-00 PDS.pdf",
      primaryApplications: [
        "Semi-fluid NLGI 00 synthetic (PAO) grease for extreme low temperatures and centralized lubrication systems when specified.",
        "Cold-climate pumpability where PDS lists operating range −45°C to 120°C and low-temperature pumpability.",
      ],
      industries: [
        "Northern trucking and municipal fleets with autolube",
        "Mining and construction equipment with cold-weather central lube",
        "Manufacturing lines with small-bore distributors needing NLGI 00 feed",
      ],
      equipmentTargets: [
        "Centralized lube systems and sumps calling for NLGI 00 EP synthetic grease per OEM",
        "Mobile equipment chassis autolube in sub-zero service when NLGI 00 is approved",
      ],
      operatingConditions: [
        "PDS index: NLGI 00; lithium complex; synthetic PAO base oil; operating range −45°C to 120°C.",
        "Dropping point 260°C; base oil viscosity 440 cSt; EP protection and pumpability called out on indexed summary.",
      ],
      technicalProofPoints: [
        "Broader indexed high-temperature headroom than arctic EP-0 family row—still confirm OEM vs. each joint class.",
        "PAO lithium complex chemistry—compatibility review required vs. incumbent semi-fluid greases.",
      ],
      painPoints: [
        "Line starvation and bearing damage when NLGI 2 is left in autolube systems designed for 00.",
        "Cross-grade top-offs that plug distributors or separate in reservoir.",
      ],
      lfbb: {
        link: "Autolube alarms spike after the first deep freeze—often when the wrong NLGI was left in the header after summer PM.",
        feature:
          "Semi-fluid NLGI 00 PAO lithium complex grease with indexed wide cold/hot operating band and EP protection on the PDS.",
        bridge:
          "Validate pump, line ID, and OEM NLGI 00 requirement before quoting; post the PDS operating range beside the reservoir.",
        benefit:
          "Supports technically honest central-lube cold programs where 00 synthetic EP is the documented fit.",
      },
      recommendedCustomerProfileIds: ["trucking_fleet", "municipal_fleet", "mining_aggregate", "manufacturing"],
      recommendedCta:
        "Walk the autolube schematic with the OEM NLGI 00 callout, then match −45 °C pumpability and 440 cSt base oil language on the Syn Tac EP-00 PDS.",
      productNumbers: [],
      pdsSafeNotes: [
        "NLGI 00 is not for general zerk service; mis-posting at the counter causes severe under-film conditions on wrong joints.",
        "Mixing with other thickener families in reservoirs can cause false failures—follow OEM purge guidance.",
      ],
    },
    {
      id: "grease-pds-syn-tac-ep1",
      productName: "KLONDIKE Syn Tac Synthetic EP-1 Grease",
      categoryId: "grease",
      pdsFileHint: "Grease PDS/KLONDIKE Syn Tac Synthetic EP-1 Grease PDS.pdf",
      primaryApplications: [
        "Full synthetic PAO NLGI 1 lithium complex grease for wide-temperature heavy-duty service when OEM allows.",
        "Chassis and bearing programs where PDS cites GC-LB performance and high-temperature stability.",
      ],
      industries: [
        "Trucking and vocational fleets",
        "Construction and agriculture equipment with synthetic chassis grease allowances",
        "Municipal mixed fleets standardizing synthetic NLGI 1 EP",
      ],
      equipmentTargets: [
        "Wheel-end and chassis grease points referencing GC-LB category on OEM charts",
        "Equipment operating across −40°C to 180°C indexed band on PDS summary",
      ],
      operatingConditions: [
        "PDS index: NLGI 1; lithium complex; synthetic PAO base oil; operating range −40°C to 180°C.",
        "Dropping point 300°C; Timken OK 65 lbs; GC-LB performance noted on indexed summary.",
      ],
      technicalProofPoints: [
        "GC-LB and wide temperature band differentiate this row from non-synthetic multipurpose options—quote PDS only.",
        "Full synthetic PAO positioning for extended-interval discussions only where OEM supports.",
      ],
      painPoints: [
        "Interval creep without OEM backing when shops assume synthetic always doubles grease life.",
        "Mis-selection when GC-LB or NLGI 1 is not on the nameplate for the joint in question.",
      ],
      lfbb: {
        link: "Fleet managers want one synthetic chassis story from Winnipeg to Phoenix—without a spec line they can post, they default to habit brands.",
        feature:
          "Full synthetic PAO NLGI 1 lithium complex grease with GC-LB, Timken OK, and wide operating temperature indexed on the PDS.",
        bridge:
          "Anchor upgrades to GC-LB need, ambient swing, and OEM synthetic allowance—not generic mileage claims.",
        benefit:
          "Clarifies when a synthetic NLGI 1 EP chassis grease is documentable vs. multipurpose lithium rows.",
      },
      recommendedCustomerProfileIds: ["trucking_fleet", "construction", "agriculture", "municipal_fleet"],
      recommendedCta:
        "Capture GC-LB and NLGI 1 requirements from the OEM chart, then attach the Syn Tac Synthetic EP-1 PDS Timken and temperature lines to the quote.",
      productNumbers: [],
      pdsSafeNotes: [
        "GC-LB applies to tested chassis categories on the PDS—do not extrapolate to non-chassis specialty joints.",
        "Confirm compatibility with existing chassis grease before bulk swap.",
      ],
    },
    {
      id: "grease-pds-ultra-tac-ep",
      productName: "KLONDIKE Ultra Tac EP Grease",
      categoryId: "grease",
      pdsFileHint: "Grease PDS/KLONDIKE Ultra Tac EP Greases PDS.pdf",
      primaryApplications: [
        "Premium heavy-duty NLGI 2 EP applications such as wheel bearings and chassis points where PDS lists GC-LB and high load performance.",
        "Severe load conditions referencing indexed 4-ball EP and Timken OK on the Ultra Tac EP greases sheet.",
      ],
      industries: [
        "Class 8 and vocational trucking",
        "Construction and municipal fleets with severe chassis duty",
        "Dealer networks promoting documented GC-LB premium EP programs",
      ],
      equipmentTargets: [
        "Wheel bearings and chassis greasing where GC-LB NLGI 2 lithium complex EP is specified",
        "High-load fleet PM routes aligned to PDS water washout and EP metrics",
      ],
      operatingConditions: [
        "Indexed from Ultra Tac EP-2 row on same family PDS: NLGI 2; lithium complex; NLGI GC-LB; dropping point 300°C.",
        "4-ball EP load 400 kg; Timken OK 60 lbs; water washout 3.8% on PDS index—confirm other NLGI grades on the live sheet if offered.",
      ],
      technicalProofPoints: [
        "GC-LB and high dropping point support premium chassis positioning when OEM allows lithium complex EP-2.",
        "Family document may list additional NLGI grades—dealer must quote the exact SKU row.",
      ],
      painPoints: [
        "Bearing and hub noise when chassis greases miss GC-LB or EP requirements on severe routes.",
        "Price-only comparisons that ignore Timken and washout lines on the PDS.",
      ],
      lfbb: {
        link: "Wheel-end comebacks hit warranty and downtime before the grease invoice is remembered—often after a non-GC-LB product was used on a GC-LB chart.",
        feature:
          "Premium NLGI 2 lithium complex EP grease with GC-LB, high dropping point, and indexed EP and Timken values on the Ultra Tac EP greases PDS.",
        bridge:
          "Post GC-LB and NLGI 2 beside the bulk gun; train night shift on the exact Ultra Tac EP SKU tied to that chart line.",
        benefit:
          "Supports a premium chassis lane with PDS numbers customers can photograph for their spec binder.",
      },
      recommendedCustomerProfileIds: ["trucking_fleet", "construction", "municipal_fleet", "mining_aggregate"],
      recommendedCta:
        "Verify the fleet’s OEM wheel-bearing and chassis chart for GC-LB NLGI 2, then lock the quote to the matching Ultra Tac EP Grease row on the family PDS.",
      productNumbers: [],
      pdsSafeNotes: [
        "Product name is family-level; confirm the exact NLGI 2 SKU and any alternate grades on the current Ultra Tac EP Greases PDS.",
        "GC-LB does not authorize use on fifth wheel, open gear, or hammer applications.",
      ],
    },
    {
      id: "grease-pds-ultra-tac-synthetic-blend-ep",
      productName: "KLONDIKE Ultra Tac Synthetic Blend EP Greases",
      categoryId: "grease",
      pdsFileHint: "Grease PDS/KLONDIKE Ultra Tac Synthetic Blend EP Greases PDS.pdf",
      primaryApplications: [
        "Synthetic blend EP greases for cold-weather and heavy-duty applications when NLGI 1 lithium complex GC-LB is selected from the family PDS.",
        "Chassis and bearing programs needing indexed cold performance with GC-LB per PDS representative row.",
      ],
      industries: [
        "Northern and mixed-climate trucking",
        "Construction and municipal fleets with seasonal chassis programs",
        "Agriculture and vocational accounts bridging cold start and summer load",
      ],
      equipmentTargets: [
        "Chassis points where OEM allows synthetic blend NLGI 1 EP GC-LB product from this family document",
        "Cold-performance-sensitive routes referencing same PDS family",
      ],
      operatingConditions: [
        "Representative Ultra Tac Synthetic Blend EP-1 index: NLGI 1; lithium complex; synthetic blend base oil; NLGI GC-LB.",
        "Dropping point 265°C; 4-ball EP load 400 kg; Timken OK 60 lbs; cold temperature performance on indexed summary—other NLGI grades may exist on sheet.",
      ],
      technicalProofPoints: [
        "Family PDS may list multiple grades; this extraction uses NLGI 1 row as the documented representative until SKU-specific rows are added.",
        "Synthetic blend (not full PAO) positioning per indexed base oil type.",
      ],
      painPoints: [
        "Seasonal grease swaps that skip OEM GC-LB and NLGI discipline.",
        "Confusion between full synthetic Syn Tac and synthetic blend Ultra Tac families at the counter.",
      ],
      lfbb: {
        link: "Fleets want one drum from November to March without cold feed failures—without a family PDS line, they guess at blend levels.",
        feature:
          "Synthetic blend lithium complex NLGI 1 GC-LB EP grease with indexed EP, Timken, and cold-performance language on the Ultra Tac Synthetic Blend EP greases PDS.",
        bridge:
          "Label the exact NLGI row from the family PDS on the bulk tank; separate from Syn Tac full synthetic where OEM distinguishes.",
        benefit:
          "Supports honest synthetic-blend chassis positioning with GC-LB and cold bullets customers can audit.",
      },
      recommendedCustomerProfileIds: ["trucking_fleet", "municipal_fleet", "construction", "agriculture"],
      recommendedCta:
        "Open the Ultra Tac Synthetic Blend EP Greases PDS table, highlight the customer’s NLGI row, and photograph GC-LB and Timken lines before quoting drums.",
      productNumbers: [],
      pdsSafeNotes: [
        "Plural family name—confirm each stocked SKU against its row; do not assume all NLGI grades share identical metrics.",
        "Synthetic blend is not full synthetic; avoid Syn Tac naming confusion in CRM notes.",
      ],
    },
    {
      id: "grease-pds-ultra-tac-synthetic-blend-ep00",
      productName: "KLONDIKE Ultra Tac Synthetic Blend EP-00 Grease",
      categoryId: "grease",
      pdsFileHint: "Grease PDS/KLONDIKE Ultra Tac Synthetic Blend EP-00 Grease PDS.pdf",
      primaryApplications: [
        "Semi-fluid NLGI 00 synthetic blend grease for centralized systems in extreme cold per PDS operating range.",
        "Pumpability-first programs where PDS lists −45°C to 20°C band and low-temperature pumpability.",
      ],
      industries: [
        "Northern trucking autolube programs",
        "Municipal snow and utility fleets",
        "Mining and construction equipment with cold-region central lube",
      ],
      equipmentTargets: [
        "Centralized lubrication systems specifying NLGI 00 synthetic blend EP",
        "Cold-climate mobile fleets with OEM-approved 00 reservoirs",
      ],
      operatingConditions: [
        "PDS index: NLGI 00; lithium complex; synthetic blend base oil; operating range −45°C to 20°C.",
        "Dropping point 218°C; base oil viscosity 160 cSt; EP protection and pumpability on indexed summary.",
      ],
      technicalProofPoints: [
        "Tighter high-temperature cap (20°C) than Syn Tac EP-00 row—do not substitute ranges between SKUs without OEM review.",
        "Semi-fluid 00 positioning distinct from NLGI 1/2 chassis greases.",
      ],
      painPoints: [
        "Cold feed failures when 00 blend is not specified but was cheaper at bid time.",
        "Reservoir incompatibility when summer-grade NLGI 2 is topped into 00 systems.",
      ],
      lfbb: {
        link: "Central lube alarms cluster after the first cold snap when the wrong NLGI stayed in the header from the wrong family.",
        feature:
          "Ultra Tac Synthetic Blend NLGI 00 grease with indexed −45°C to 20°C band, EP protection, and pumpability language on the PDS.",
        bridge:
          "Contrast this 00 blend cold band with Syn Tac EP-00 and arctic EP-0 rows before quoting—post the correct PDS strip on the reservoir.",
        benefit:
          "Reduces accidental range substitution between semi-fluid SKUs by forcing OEM and PDS band alignment.",
      },
      recommendedCustomerProfileIds: ["trucking_fleet", "municipal_fleet", "mining_aggregate", "construction"],
      recommendedCta:
        "Measure lowest ambient and highest header temperature, then match them to the EP-00 blend PDS −45 °C / 20 °C box before approving fill.",
      productNumbers: [],
      pdsSafeNotes: [
        "Upper band 20°C on index—do not run on hot slow-speed bearings without OEM approval.",
        "Purging incompatible thickeners from central systems is mandatory; follow OEM volumes.",
      ],
    },
  ],
};

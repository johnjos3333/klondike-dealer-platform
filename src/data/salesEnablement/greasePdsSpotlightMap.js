/**
 * Phase 74.0 — Grease PDS spotlight extraction foundation (data only).
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
  ],
};

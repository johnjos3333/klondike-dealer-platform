/**
 * Phase 73.0 — Sales Enablement knowledge foundation (data only).
 *
 * Canonical themes, pains, profiles, and benefits by lubricant category for future:
 * spotlight generation, customer profiles, LFBB messaging, and recommendation intelligence.
 *
 * Not wired to UI or sends yet — extend with products, signals, and cross-links incrementally.
 */

/** @typedef {{ id: string, label: string, summary: string, buyingSignals?: string[] }} CustomerProfileKnowledge */

/**
 * @typedef {{
 *   id: string,
 *   title: string,
 *   operationalThemes: string[],
 *   painPoints: string[],
 *   customerProfiles: CustomerProfileKnowledge[],
 *   coreBenefits: string[],
 * }} SalesEnablementCategoryKnowledge */

/**
 * @typedef {{
 *   version: number,
 *   categories: SalesEnablementCategoryKnowledge[],
 * }} SalesEnablementKnowledgeRoot */

/** @type {SalesEnablementKnowledgeRoot} */
export const SALES_ENABLEMENT_KNOWLEDGE = {
  version: 1,
  categories: [
    {
      id: "grease",
      title: "Grease",
      operationalThemes: [
        "Centralized lube routes, seasonal temperature swings, and wash-down exposure on pins and bushings.",
        "OEM NLGI / thickener compatibility, re-grease intervals, and contamination control at the zerk.",
        "Moly / calcium sulfonate / synthetic blend positioning where spec sheets—not shelf talk—close the deal.",
        "Inventory rationalization: fewer SKUs covering more pins, bearings, and slow-speed gears without cross-contamination.",
      ],
      painPoints: [
        "Bleed-through, wash-off, or water ingress leading to bearing noise and unplanned downtime.",
        "Wrong thickener mixed with legacy grease causing softening, channeling, or pump starvation on auto-lube systems.",
        "Over-greasing and under-documented intervals—shops blame “bad grease” when the root cause is procedure or contamination.",
        "Price-only comparisons that skip base oil quality, EP additives, and validated load / speed envelopes.",
      ],
      customerProfiles: [
        {
          id: "fleet_maintenance_manager",
          label: "Fleet maintenance manager",
          summary:
            "Owns PM calendars, vendor consolidation, and warranty exposure; wants spec-backed SKUs and predictable drain / regrease cadence.",
          buyingSignals: [
            "Requests PDS or OEM cross for NLGI and thickener before approving a drum change.",
            "Asks about compatibility with existing bulk or cartridge programs.",
          ],
        },
        {
          id: "industrial_plant_reliability",
          label: "Plant reliability / MRO lead",
          summary:
            "Focused on mean time between failure, contamination audits, and standardizing lube routes across rotating and linear assets.",
          buyingSignals: [
            "Mentions ISO cleanliness targets, color-coding, or single-point lessons learned from failures.",
            "Wants training for line leads on quantity, frequency, and torque on fittings.",
          ],
        },
        {
          id: "ag_dealer_parts_counter",
          label: "Ag dealer parts counter",
          summary:
            "Balances OEM bundles with aftermarket options; needs clear seasonal and implement messaging for mixed-age iron.",
          buyingSignals: [
            "Seasonal uptick in PTO and mower spindle calls.",
            "Asks for grease that survives field moisture and dust without frequent re-packs.",
          ],
        },
      ],
      coreBenefits: [
        "Documented thickener and EP story aligned to application class—reduces misapplication and warranty gray areas.",
        "Predictable performance in wet, loaded, or slow-speed conditions when intervals and quantities match OEM guidance.",
        "Fewer emergency bearing jobs when contamination and compatibility are addressed at the same time as product choice.",
      ],
    },
    {
      id: "hydraulic_fluids",
      title: "Hydraulic fluids",
      operationalThemes: [
        "Viscosity grade selection for cold start vs. high ambient—especially mobile hydraulics and scrap / material handlers.",
        "OEM anti-wear (AW) expectations, zinc chemistry, and filterability on modern high-pressure systems.",
        "Water separation, air release, and varnish risk on long-life circuits with limited reservoir turnover.",
        "Biodegradable and fire-resistant options where site rules or proximity to sensitive environments apply.",
      ],
      painPoints: [
        "Cavitation, sluggish cycles, or cylinder chatter after seasonal temperature swings or top-off with wrong ISO grade.",
        "Premature filter plugging or servo instability from incompatible fluid mixes or poor storage hygiene.",
        "Leak creep and seal hardening blamed on fluid when contamination or pressure spikes are the driver.",
        "Emergency cross-grades that skip OEM viscosity and shear-stability requirements.",
      ],
      customerProfiles: [
        {
          id: "mobile_equipment_superintendent",
          label: "Mobile equipment superintendent",
          summary:
            "Runs excavators, loaders, and cranes; cares about cold-flow, foaming, and same-day top-off discipline across a mixed fleet.",
          buyingSignals: [
            "Mentions ISO VG changes between winter and summer yards.",
            "Tracks cylinder cycle times and heat maps on hydraulics.",
          ],
        },
        {
          id: "metal_fab_hydraulic_lead",
          label: "Metal fabrication / press hydraulic lead",
          summary:
            "High-cycle presses and brakes—sensitive to varnish, particulate, and consistent AW film strength under shock loads.",
          buyingSignals: [
            "Oil analysis trending oxidation or particulate spikes.",
            "Considering centralized filtration or fluid consolidation.",
          ],
        },
        {
          id: "forestry_or_marine_ops",
          label: "Forestry / marine / regulated-site operator",
          summary:
            "May need EAL or site-specific fluid approvals; values spill response readiness and documented environmental claims.",
          buyingSignals: [
            "References lease terms, spill plans, or provincial / federal biodegradable requirements.",
          ],
        },
      ],
      coreBenefits: [
        "Stable viscosity and AW protection across temperature swings when grades and change practices match OEM.",
        "Better water handling and filter life when reservoirs breathe clean and top-offs use one approved fluid.",
        "Clear path to spec-appropriate MV or synthetic blends where OEM allows—without skipping documentation.",
      ],
    },
    {
      id: "hd_engine_oils",
      title: "Heavy-duty engine oils",
      operationalThemes: [
        "API CK-4 / FA-4 and OEM claims alignment—especially mixed-age fleets and vocational duty cycles.",
        "DPF / SCR aftertreatment sensitivity to ash and SAPS where low-ash formulations are mandated.",
        "Extended drain programs that still require oil analysis, fuel quality, and idle-hour honesty.",
        "Cold-start pumpability vs. high-temp shear stability on turbocharged HD platforms.",
      ],
      painPoints: [
        "Cross-top-off with wrong API category or viscosity leading to warranty disputes and DPF ash surprises.",
        "Fuel dilution and soot loading on severe idle / PTO profiles without analysis-backed intervals.",
        "Price-only bids that ignore TBN retention, shear stability, and OEM sheet language.",
        "Misread nameplate specs on vocational conversions (e.g., off-road vs. on-highway ratings).",
      ],
      customerProfiles: [
        {
          id: "fleet_compliance_manager",
          label: "Fleet compliance / technical manager",
          summary:
            "Owns spec binders, warranty correspondence, and bulk tank labeling; wants one HD tier per season with defensible API lines.",
          buyingSignals: [
            "Asks for CK-4 vs FA-4 applicability by VIN pattern or OEM bulletin.",
            "Audits bulk tanks and dispensing guns quarterly.",
          ],
        },
        {
          id: "vocational_shop_foreman",
          label: "Vocational shop foreman",
          summary:
            "Mixed diesel ages, PTO hours, and seasonal viscosity changes—needs simple counter messaging and posted spec cards.",
          buyingSignals: [
            "Frequent 15W-40 vs 10W-30 questions for same customer yard.",
            "Complaints about fuel economy or regen frequency tied to oil choice.",
          ],
        },
        {
          id: "dealer_bulk_program_owner",
          label: "Dealer bulk program owner",
          summary:
            "Balances margin with churn risk; wants drum / tote logistics and training for counter staff on category—not hype.",
          buyingSignals: [
            "Requests co-branded spec one-pagers or tank stickers.",
            "Evaluating single HD synthetic tier for premium accounts.",
          ],
        },
      ],
      coreBenefits: [
        "Category-first conversations (API / viscosity / OEM line) that protect the customer and the dealer on warranty language.",
        "Better aftertreatment and component life when SAPS and drain practices match how the truck actually runs.",
        "Fewer emergency oil-related road calls when analysis and nameplate discipline back the product choice.",
      ],
    },
    {
      id: "synthetics",
      title: "Synthetics",
      operationalThemes: [
        "Full synthetic vs synthetic blend positioning where OEM allows both—avoid overpromising mileage miracles.",
        "Low-SAPS Euro and OEM-specific approvals for passenger and light HD where catalyst and turbo protection matter.",
        "Cold-start energy loss and HTHS context for modern turbo GDI and small-displacement HD.",
        "Industrial synthetic rotations (circulating, compressor, gear) where varnish and oxidation resistance justify premium.",
      ],
      painPoints: [
        "Customer skepticism after past “synthetic” claims that didn’t match analysis or driving pattern.",
        "Wrong approval codes on Euro or dexos-style specs leading to warranty noise.",
        "Mixing marketing language (“full synthetic”) with what the PDS actually documents.",
        "Skipping interval discipline—synthetics still oxidize under severe idling, short trips, or fuel dilution.",
      ],
      customerProfiles: [
        {
          id: "premium_automotive_service_advisor",
          label: "Premium automotive service advisor",
          summary:
            "Upsells OE-interval packages; needs honest differentiation between blend and full synthetic with approval callouts.",
          buyingSignals: [
            "Sticker lookup for dexos / ACEA / OEM bottle codes.",
            "Customer asks for “longest interval” without discussing driving profile.",
          ],
        },
        {
          id: "mixed_fleet_owner_operator",
          label: "Mixed fleet owner-operator",
          summary:
            "Runs pickups and a few Class 8 units; wants fewer oil SKUs if specs allow, without gambling on approvals.",
          buyingSignals: [
            "Asks if one synthetic can cover both pickup and vocational skid.",
          ],
        },
        {
          id: "industrial_plant_lubrication_engineer",
          label: "Industrial lubrication engineer",
          summary:
            "Evaluates ROI on synthetic upgrades for compressors, turbines, or gear trains—wants oxidation and foam data, not slogans.",
          buyingSignals: [
            "Oil analysis program already in place; comparing RPVOT or demulsibility trends.",
          ],
        },
      ],
      coreBenefits: [
        "Documented approval and category fit so premium pricing stands on OEM-safe language.",
        "Improved low-temp flow and high-temp film strength where the application actually benefits from synthetic chemistry.",
        "Platform for honest upsell: fewer emergency failures when intervals and spec match real duty.",
      ],
    },
    {
      id: "tractor_fluids",
      title: "Tractor fluids",
      operationalThemes: [
        "UTTO / THF / “universal tractor hydraulic-transmission” spec alignment—avoiding one-fluid myths across brands.",
        "Wet brake / PTO chatter and OEM friction modifier requirements for common sumps.",
        "Seasonal viscosity for hydraulics and transmissions on ag iron exposed to field dust and moisture.",
        "Staged fluid programs for dealers supporting mixed green and legacy fleets.",
      ],
      painPoints: [
        "Chatter, brake noise, or clutch slip after off-brand universal fluid without correct OEM category.",
        "Water and dust ingress in open systems leading to varnish and valve sticking.",
        "Emergency top-off with industrial AW hydraulic fluid that lacks tractor friction chemistry.",
        "Confusion between engine oil and sump fluid on compact tractors at retail.",
      ],
      customerProfiles: [
        {
          id: "ag_dealer_service_manager",
          label: "Ag dealer service manager",
          summary:
            "Owns PDI, warranty fluid fills, and seasonal campaigns; needs spec charts tied to brand and model year.",
          buyingSignals: [
            "Bulk UTTO changeouts before spring planting rush.",
            "PTO or shuttle-shift complaints after customer self-service fluid adds.",
          ],
        },
        {
          id: "large_crop_producer",
          label: "Large crop producer / fleet shed",
          summary:
            "In-house PM on combines, sprayers, and tractors; buys totes and drums; values one spec-backed fluid per sump type.",
          buyingSignals: [
            "Asks for cold-weather pour point for early spring field work.",
            "Tracks hours and filter changes across multiple OEM colors in one yard.",
          ],
        },
        {
          id: "municipal_parks_grounds",
          label: "Municipal parks & grounds supervisor",
          summary:
            "Compact tractors, mowers, and loaders—mixed brands, limited shop depth; needs foolproof labeling and counter guidance.",
          buyingSignals: [
            "Small sump volumes and frequent top-offs from partial jugs.",
            "Noise complaints from operators after fluid swaps.",
          ],
        },
      ],
      coreBenefits: [
        "Correct friction and wear chemistry for shared tractor sumps—reduces comeback jobs tied to wrong “universal” fluid.",
        "Clear seasonal and OEM-category messaging for dealers training seasonal counter staff.",
        "Better component life when water exclusion, breathers, and filtration match the fluid tier in use.",
      ],
    },
  ],
};

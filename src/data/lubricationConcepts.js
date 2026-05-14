/**
 * Starter lubrication concept library — plain data for future advisor / training intelligence.
 * Not wired to UI yet.
 */

export const lubricationConcepts = {
  viscosityIndex: {
    id: "viscosityIndex",
    label: "Viscosity Index (VI)",
    summary:
      "Viscosity index measures how much an oil's viscosity changes with temperature. Higher VI means the oil thins less as it heats up and stays more pumpable when cold.",
    whyItMatters:
      "VI helps reps explain why two oils with the same SAE grade can perform very differently across seasonal swings, cold starts, and hot operating windows.",
    repGuidance:
      "Use VI to justify premium or synthetic options when the customer cares about cold-start protection, wide ambient ranges, or stable film strength at operating temperature.",
    applicationNotes: [
      "Especially relevant for hydraulic fluids, engine oils, and gear oils in outdoor or mixed-season fleets.",
      "Pair VI with OEM minimum requirements—VI supports the story but does not replace spec approval.",
    ],
    relatedCategories: ["engine_oil", "hydraulic_fluid", "gear_oil"],
    keywords: ["viscosity index", "vi", "temperature", "thinning", "cold start", "pumpability"],
  },

  oxidationStability: {
    id: "oxidationStability",
    label: "Oxidation Stability",
    summary:
      "Oxidation stability is an oil's resistance to chemical breakdown from heat, air, and time in service. Breakdown forms acids, varnish, and sludge that reduce protection and clog passages.",
    whyItMatters:
      "Customers extending drain intervals or running hot equipment need to understand that oxidation control is what protects the oil after the additive package starts working.",
    repGuidance:
      "Position higher-quality base stocks and robust additive systems when the account mentions long hours, idle time, turbo heat, or missed drains.",
    applicationNotes: [
      "Common concern in heavy-duty engine oil, compressor, and turbine discussions.",
      "Ask about sump temperature, filtration, and whether they monitor TAN or oil analysis.",
    ],
    relatedCategories: ["engine_oil", "compressor_oil", "turbine_oil"],
    keywords: ["oxidation", "thermal breakdown", "sludge", "varnish", "drain interval", "oil life"],
  },

  waterWashout: {
    id: "waterWashout",
    label: "Water Washout",
    summary:
      "Water washout describes how readily water displaces or removes lubricant from a metal surface—common on pins, bushings, and bearings exposed to rain, spray, or wash-down.",
    whyItMatters:
      "In mining, construction, and ag applications, grease that resists washout keeps EP film and corrosion protection where the metal actually needs it.",
    repGuidance:
      "Lead with application exposure first, then connect calcium sulfonate, polymer, or tackifier stories only where PDS data supports the claim.",
    applicationNotes: [
      "Critical for wet pins, loader linkages, marine-adjacent sites, and equipment cleaned with pressure washers.",
      "Confirm re-grease intervals and whether water is fresh, brackish, or chemical-laden.",
    ],
    relatedCategories: ["grease"],
    keywords: ["washout", "water", "pins", "bushings", "rain", "spray", "displacement"],
  },

  epAdditives: {
    id: "epAdditives",
    label: "EP Additives",
    summary:
      "Extreme pressure (EP) additives activate under high load and boundary contact to reduce metal-to-metal wear. They are common in gear oils and greases for shock load and slow-speed heavy contact.",
    whyItMatters:
      "Customers comparing on price alone often miss that EP chemistry is what protects pins, gears, and bearings when hydrodynamic film is thin or interrupted.",
    repGuidance:
      "Explain EP as insurance for shock, oscillation, and slow-speed loading—not a substitute for the correct viscosity or thickener system.",
    applicationNotes: [
      "Relevant for greases on pins and bushings, industrial gear oils, and some hydraulic-tractor discussions.",
      "Verify OEM limits on sulfur/phosphorus-sensitive components such as yellow metals where applicable.",
    ],
    relatedCategories: ["grease", "gear_oil"],
    keywords: ["ep", "extreme pressure", "shock load", "boundary lubrication", "wear", "moly"],
  },

  nlgiGrade: {
    id: "nlgiGrade",
    label: "NLGI Grade",
    summary:
      "NLGI grade classifies grease consistency from 000 (fluid) to 6 (very stiff). Grade affects pumpability, retention in the fitting, and ability to stay in the contact zone.",
    whyItMatters:
      "Wrong NLGI grade is one of the fastest ways to create pump starvation, leakage, or inadequate film—especially on auto-lube systems and seasonal equipment.",
    repGuidance:
      "Confirm how the customer applies grease (manual gun, central system, sealed-for-life) before recommending a grade change.",
    applicationNotes: [
      "NLGI #2 is common for general industrial and fleet pins; #1 or softer grades may suit cold or long pump runs.",
      "Thickener type and base oil matter as much as NLGI—grade alone does not define performance.",
    ],
    relatedCategories: ["grease"],
    keywords: ["nlgi", "consistency", "grade", "thickener", "pumpability", "#2", "#1"],
  },

  cavitation: {
    id: "cavitation",
    label: "Cavitation",
    summary:
      "Cavitation occurs when pressure drops low enough for vapor bubbles to form in a fluid, then collapse violently and pit metal—often in pumps, hydraulics, and high-speed bearings.",
    whyItMatters:
      "Customers may blame the oil when the root cause is suction restriction, aeration, wrong viscosity, or operating the pump outside its envelope.",
    repGuidance:
      "Separate fluid quality from system design. Recommend proper viscosity, air release, and filtration only after confirming suction line, reservoir level, and pump speed conditions.",
    applicationNotes: [
      "Common in mobile hydraulics, piston pumps, and undersized or overheated reservoirs.",
      "Ask about foaming, whine, erratic actuator response, and recent filter or hose changes.",
    ],
    relatedCategories: ["hydraulic_fluid", "gear_oil"],
    keywords: ["cavitation", "aeration", "foam", "pump", "suction", "vapor bubbles"],
  },

  wetBrakeChatter: {
    id: "wetBrakeChatter",
    label: "Wet Brake Chatter",
    summary:
      "Wet brake chatter is noise or vibration from friction interfaces operating in oil—typical on tractors and equipment using universal tractor fluid (UTF) in wet brake/hydraulic systems.",
    whyItMatters:
      "Chatter is often a spec, friction, or contamination issue—not simply 'any hydraulic oil will work.' Wrong fluid can damage brakes and void OEM coverage.",
    repGuidance:
      "Confirm equipment type, OEM UTF or JDM requirement, fluid age, and whether engine oil or generic AW hydraulic fluid was added in error.",
    applicationNotes: [
      "Common on ag tractors and some construction units with combined transmission / brake sump.",
      "Do not recommend a product swap until the exact OEM fluid category is verified.",
    ],
    relatedCategories: ["tractor_hydraulic", "utf"],
    keywords: ["wet brake", "chatter", "utf", "tractor hydraulic", "friction", "jd j20", "noise"],
  },

  contamination: {
    id: "contamination",
    label: "Contamination Control",
    summary:
      "Contamination includes dirt, water, fuel dilution, wrong fluid mix, and wear metals that degrade lubricant performance and accelerate component failure.",
    whyItMatters:
      "Many field failures blamed on lubricant quality are actually contamination or maintenance practice problems that no product alone can fix.",
    repGuidance:
      "Use contamination questions to qualify the opportunity: seals, breathers, filtration, top-off discipline, and storage hygiene often matter more than a SKU change.",
    applicationNotes: [
      "Relevant across engine oil, hydraulic, grease, and gear applications.",
      "Oil analysis, sight glass checks, and ISO cleanliness targets are strong discovery tools for industrial accounts.",
    ],
    relatedCategories: ["engine_oil", "hydraulic_fluid", "grease", "gear_oil"],
    keywords: ["contamination", "dirt", "water ingress", "filtration", "iso cleanliness", "dilution"],
  },
};

/**
 * Phase 76.1 — Flagship dealer-facing narrative layer for Sales Enablement (data only).
 * Grounded on indexed PDS summaries in grease / HD oil / hydraulic spotlight maps; not wired to UI or sends.
 */

/**
 * @typedef {{
 *   id: string,
 *   productName: string,
 *   flagshipPositioning: string,
 *   fieldIdentity: string,
 *   severeDutyUseCases: string[],
 *   keyDifferentiators: string[],
 *   emotionalSalesAngles: string[],
 *   operationalWins: string[],
 *   premiumProofPoints: string[],
 *   whatMakesThisDifferent: string[],
 *   customerLanguageExamples: string[],
 *   dealerTalkingPoints: string[],
 *   doNotSay: string[],
 *   flagshipNarrativeParagraph: string,
 * }} SalesEnablementFlagshipNarrative */

/** @type {{ version: number, flagships: SalesEnablementFlagshipNarrative[] }} */
export const SALES_ENABLEMENT_FLAGSHIP_NARRATIVES = {
  version: 1,
  flagships: [
    {
      id: "flagship-nano-ep-2-grease",
      productName: "Nano EP 2 Grease",
      flagshipPositioning:
        "Premium severe-duty NLGI 2 calcium sulfonate EP grease for shock, load, and wash-down exposure—not the commodity red-tube story.",
      fieldIdentity:
        "The grease you pull when pins see slurry, pressure-wash routines, and real shock, and the OEM still wants a documented EP calcium sulfonate program.",
      severeDutyUseCases: [
        "Slow-speed pins and bushings on shovels, loaders, and crushers where load spikes and contamination show up before the regrease interval.",
        "Wet shifts and high-moisture ag implements where spray-off performance has to match the duty, not the drum price.",
        "Mine and plant maintenance bays standardizing one severe EP tier where NLGI 2 and thickener class are already approved.",
      ],
      keyDifferentiators: [
        "Calcium sulfonate complex thickener with indexed EP metrics—not generic lithium EP-2 habit stocking.",
        "PDS-indexed nano tungsten disulfide called out for EP/wear positioning; quote the sheet, not folklore.",
        "Water spray-off resistance indexed very low on the summary (<1%) with a 300 °C+ dropping point class—reconfirm on the live PDS for your revision.",
        "4-ball weld load and Timken OK values published on the PDS for dealers who need numbers on the wall, not adjectives.",
      ],
      emotionalSalesAngles: [
        "Confidence when the job is ugly: you are not hoping the grease stays—you are matching published washout and EP proof to the worst actors.",
        "Pride in spec discipline: NLGI 1 vs 2 and thickener compatibility handled like a reliability engineer, not a color guess.",
      ],
      operationalWins: [
        "Fewer emergency re-greases after wet shifts when spray-off and adhesion stories match the pin map.",
        "Cleaner warranty conversations when the PDS thickener line and EP tables are posted beside the grease board.",
        "Less thickener crossover risk when shops stop treating every NLGI 2 EP tube as interchangeable.",
      ],
      premiumProofPoints: [
        "PDS: 4-ball weld load 800 kg; Timken OK load 65+ lb on indexed summary.",
        "PDS: nano tungsten disulfide technology referenced for EP/wear—use exact PDS wording in customer-facing material.",
        "PDS: NLGI 1 and 2 options; calcium sulfonate complex; water spray-off and high dropping point indexed—verify revision before quoting numbers.",
      ],
      whatMakesThisDifferent: [
        "It earns premium placement with published EP, Timken, washout, and high-temperature headroom—not with “heavy duty” labels alone.",
        "It separates Klondike’s severe-duty shelf from commodity EP-2 tubes that cannot show the same indexed package.",
      ],
      customerLanguageExamples: [
        "“We stopped chasing the cheapest EP-2 and standardized on what the PDS actually shows for washout and weld load on our worst pins.”",
        "“If we are going to argue uptime with maintenance, I want Timken and 4-ball lines I can photograph—not a slogan.”",
      ],
      dealerTalkingPoints: [
        "Open with shock, moisture, and load—then land on NLGI 1 vs 2 from the OEM chart before you talk price.",
        "Pair every trial with a one-page excerpt: thickener family, Timken, 4-ball, spray-off, and tungsten disulfide language exactly as printed.",
        "Position as premium severe-duty, not “better red grease”; commodity EP-2 is a different conversation.",
      ],
      doNotSay: [
        "Do not call it interchangeable with every NLGI 2 lithium EP grease or central systems without a compatibility review.",
        "Do not extrapolate “nano” beyond the published PDS statements.",
        "Do not promise miracle life extension beyond OEM regrease intervals.",
        "Do not imply NLGI 2 without confirming OEM allows NLGI 2 calcium sulfonate EP on that joint.",
      ],
      flagshipNarrativeParagraph:
        "Nano EP 2 is how you speak when the yard is hard on equipment: shock, slurry, and wash-down pressure do not forgive vague EP claims. This is KLONDIKE nano Calcium Sulfonate EP Grease in NLGI 2 (and NLGI 1 where the chart allows)—a calcium sulfonate complex severe EP grease with PDS-indexed weld and Timken performance plus nano tungsten disulfide called out for EP/wear positioning. The premium story is contamination resistance and load confidence backed by published spray-off and high-temperature headroom, not a brighter tube label. Sell it as disciplined severe duty: pick the right NLGI, post the PDS lines at the board, and stop letting commodity EP-2 masquerade as insurance on million-dollar iron.",
    },
    {
      id: "flagship-moly-tac-ep2-grease",
      productName: "Moly Tac EP-2 Grease",
      flagshipPositioning:
        "Moly-fortified lithium complex NLGI 2 EP grease for high-shock pins and mixed fleets where 3% moly and thickener class are part of the spec conversation.",
      fieldIdentity:
        "The shop-floor standard when contractors and mines need a defensible moly EP-2 with published Timken and washout numbers—not “whatever was on sale.”",
      severeDutyUseCases: [
        "Loader and excavator implement lines where OEM caps reference moly-fortified EP-2 and shock loading is daily.",
        "Vocational chassis and vocational fleets where NLGI 2 moly EP is the approved class and crossover from non-moly greases has failed before.",
        "Mixed iron yards that need one moly EP-2 drum story technicians can trust when the grease board is crowded.",
      ],
      keyDifferentiators: [
        "Lithium complex thickener with 3% molybdenum called out on the PDS—compatibility-critical versus other soap families.",
        "Indexed EP load carrying, Timken OK, and low water washout for a complete severe-service picture on one sheet.",
        "High load carrying language on the PDS sits beside the moly level so you can explain why the pin needs moly, not just “more EP.”",
      ],
      emotionalSalesAngles: [
        "Relief when the central greaser stops plugging because thickener discipline came before brand switching.",
        "Respect from fleet mechanics when the counter can quote moly percent and thickener type from the PDS, not memory.",
      ],
      operationalWins: [
        "Fewer spalled pins when moly-spec joints actually get moly EP-2 lithium complex instead of a random EP-2.",
        "Faster audits when the grease board shows thickener and moly lines copied from the PDS next to each zerk map.",
      ],
      premiumProofPoints: [
        "PDS index: NLGI 2 lithium complex with 3% moly; dropping point 260 °C class on summary.",
        "PDS index: water washout about 1%; 4-ball EP load 500 kg; Timken OK load 70 lb—confirm on current revision.",
      ],
      whatMakesThisDifferent: [
        "Moly Tac EP-2 is explicit about moly level and lithium complex chemistry—reducing the silent failures you get when “any red EP-2” hits a moly-spec joint.",
        "It carries the Timken/washout/EP package dealers need to justify premium placement against commodity moly guesses.",
      ],
      customerLanguageExamples: [
        "“We stopped treating EP-2 as generic—moly percent and lithium complex are on the PDS, and that is what we match to the chart.”",
        "“If the pin calls for moly EP-2, I want the sheet that shows 3% moly and the Timken line—not a cheaper tube that skips the detail.”",
      ],
      dealerTalkingPoints: [
        "Lead with OEM zerk charts and moly requirements, then hand them the PDS lines for 3% moly and lithium complex.",
        "Warn against thickener crossover in auto-lube systems—post the PDS soap family beside the pump.",
        "Use Moly Tac EP-2 as the disciplined moly EP-2 tier; steer nano calcium sulfonate programs to their own SKU when chemistry differs.",
      ],
      doNotSay: [
        "Do not assume calcium sulfonate chemistry—this SKU is lithium complex per the PDS; read each Moly Tac variant separately.",
        "Do not blanket-approve central systems without OEM and compatibility sign-off.",
        "Do not promise interchange with polyurea or other thickeners without a review.",
      ],
      flagshipNarrativeParagraph:
        "Moly Tac EP-2 is the confident answer when the application is not “any EP-2”—it is moly-spec, shock-heavy, and sensitive to thickener mistakes. KLONDIKE Moly Tac EP-2 Grease is a lithium complex NLGI 2 grease with 3% molybdenum and indexed Timken, four-ball EP, and washout values that let you defend premium placement with paper, not bravado. The premium why is load confidence and adhesion discipline on real pins and chassis points, especially where a non-moly or wrong-soap grease has already taught an expensive lesson. Position it as field-honest severe duty: match the PDS moly and thickener lines to the OEM cap, keep auto-lube compatibility explicit, and let published metrics do the talking.",
    },
    {
      id: "flagship-15w40-ck4-full-synthetic-hd",
      productName: "15W-40 CK-4 Full Synthetic HD Engine Oil",
      flagshipPositioning:
        "Best-in-class CK-4/SN full synthetic 15W-40 for severe diesel when oxidation reserve, shear stability, and cold-flow margin need to show up on the PDS, not in a tagline.",
      fieldIdentity:
        "The drum you recommend when uptime buyers want API CK-4 proof with full synthetic VI headroom and OEM license rows they can file.",
      severeDutyUseCases: [
        "Premium linehaul and vocational diesels running high stress cycles where synthetic oxidation stability supports OEM-allowed service strategies.",
        "Severe mobile mine and construction diesels when the fleet engineer asks for VI and oxidation language tied to CK-4.",
        "Municipal severe routes where cold starts and idle-heavy profiles punish the wrong 15W-40 tier.",
      ],
      keyDifferentiators: [
        "API CK-4 / SN with ACEA E9/E7 and CES 20086-class OEM positioning on the indexed sheet—not synthetic marketing without category proof.",
        "High viscosity index (~155 on index) supports honest conversations about low-temperature performance vs mineral tiers where OEM allows the same SAE.",
        "Enhanced oxidation stability and low-temperature performance bullets on the PDS give dealers narrative fuel without inventing claims.",
      ],
      emotionalSalesAngles: [
        "Calm in the reliability office when the buyer wants synthetic upside anchored to CK-4 licenses and VI, not fluff.",
        "Respect from owner-operators who have been burned by “synthetic” labels that were not full synthetic CK-4.",
      ],
      operationalWins: [
        "Clearer bulk-gun discipline when synthetic CK-4 is separated from FA-4, natural gas, and ag-bridge SKUs.",
        "Better severe-service proposals when VI and oxidation lines are attached to the upgrade worksheet.",
      ],
      premiumProofPoints: [
        "PDS index: API CK-4 / SN; ACEA E9 / E7; CES 20086; Detroit Diesel DFS 93K222; Volvo VDS-4.5 on summary.",
        "PDS index: VI ~155 with enhanced oxidation stability and improved low-temperature performance language vs mineral tiers—quote current revision.",
      ],
      whatMakesThisDifferent: [
        "It is the CK-4 full synthetic tier with OEM-facing rows and high VI—premium because the sheet backs severe diesel duty, not because the pail is shinier.",
        "It keeps synthetic conversations inside API/OEM guardrails, which protects the dealer when drains are scrutinized.",
      ],
      customerLanguageExamples: [
        "“We moved bulk synthetic when oxidation trends and cold starts justified it—and we wanted CK-4 lines we could show the shop steward.”",
        "“If we are paying synthetic, I want VI and licenses on the PDS, not a sticker.”",
      ],
      dealerTalkingPoints: [
        "Attach VI ~155 and oxidation bullets from the Full Synthetic PDS to every severe-service upgrade memo.",
        "Separate FA-4 and niche categories at the rack—synthetic CK-4 wins when the right cap is on the engine.",
        "Pair with UOA when promoting longer intervals—never outrun OEM max even with synthetic reserve.",
      ],
      doNotSay: [
        "Do not imply FA-4 interchange or natural gas coverage—keep SKUs segregated per PDS category.",
        "Do not promise drain intervals beyond OEM maximums.",
        "Do not claim universal superiority over every CK-4 without referencing the specific indexed advantages on the PDS.",
      ],
      flagshipNarrativeParagraph:
        "This is the premium 15W-40 conversation for people who buy diesel uptime, not pail shine. KLONDIKE SAE 15W-40 Full Synthetic Heavy Duty Engine Oil carries API CK-4 / SN with ACEA E9/E7 and the OEM license rows dealers need on file, plus a high VI near 155 on the index for an honest cold-flow and shear story. The premium why is oxidation reserve and low-temperature performance language tied to a true full synthetic CK-4 package—not a vague “synthetic blend” claim. Position it when severe duty or analysis justifies moving above mineral or lower-tier CK-4, keep drains inside OEM caps, and let the PDS do the heavy lifting when the buyer pushes back on price.",
    },
    {
      id: "flagship-xvi-all-season-extreme-hydraulic",
      productName: "XVI All Season Syn Blend Extreme Hydraulic Fluid",
      flagshipPositioning:
        "Extreme-tier HVLP ISO 46 hydraulic fluid for wide ambient swings where straight mineral ISO grades lose pump response and shear stability—when OEM allows HVLP.",
      fieldIdentity:
        "The fluid specialist’s answer when the same machine sees cold morning starts and hot afternoon hydraulics and the customer is tired of seasonal ISO juggling.",
      severeDutyUseCases: [
        "Mobile mining and construction hydraulics with wide temperature exposure where HVLP shear stability and pour performance are indexed on the PDS.",
        "Plant presses and stackers on ISO 46 HV circuits when viscosity index and operating band need to match engineering specs.",
        "Programs evaluating fewer seasonal changeouts because MV or HVLP is approved and the PDS temperature band matches the site histogram.",
      ],
      keyDifferentiators: [
        "HVLP positioning under ASTM HV and DIN 51524 Part 3 language on the PDS—not a rebranded straight AW.",
        "Viscosity index near 210 and pour near −48 °C on the index for a credible wide-temperature narrative.",
        "PDS-published operating band spanning cold through high-temperature hydraulic duty for ISO 46—verify on live sheet before quoting exact endpoints.",
      ],
      emotionalSalesAngles: [
        "Confidence when desert heat and cold starts share the same circuit—engineers respect an HVLP row with VI and pour proof.",
        "Relief for buyers burned by “all season” mineral oils that could not hold shear in the heat.",
      ],
      operationalWins: [
        "Less sluggish hydraulics at first shift when pour and HVLP class match the OEM pump chart.",
        "Cleaner capital conversations when the PDS operating band is overlaid on site min/max temperatures.",
      ],
      premiumProofPoints: [
        "PDS index: ISO 11158 HV; ISO 46 HVLP; VI ~210; pour −48 °C; high shear stability called out.",
        "PDS references wide operating temperature band for extreme all-season positioning—copy endpoints from current revision only.",
      ],
      whatMakesThisDifferent: [
        "XVI is explicitly extreme HVLP ISO 46 with high VI—premium because it addresses temperature and shear limits straight grades cannot.",
        "It belongs in the hydraulic premium tier, separate from Professional Series AW fills, until OEM HVLP approval is confirmed.",
      ],
      customerLanguageExamples: [
        "“We mapped our cold starts and summer tank temps—HVLP ISO 46 with that VI finally matched both sides of the year.”",
        "“I do not want another ‘all season’ story without a pour point and VI on paper.”",
      ],
      dealerTalkingPoints: [
        "Overlay site temperature histograms on the PDS operating band and pour columns before you quote drum count.",
        "Validate HVLP and ISO 46 against the pump nameplate—XVI is not a shortcut around OEM class.",
        "Keep XVI in the extreme conversation, not as a silent substitute for entry AW programs.",
      ],
      doNotSay: [
        "Do not substitute for Professional Series AW without OEM HVLP / ISO 46 approval.",
        "Do not invent wider temperature spans than the current PDS publishes.",
        "Do not confuse with tractor UTF or wet-brake fluids—different categories and risks.",
      ],
      flagshipNarrativeParagraph:
        "XVI is how you sound when hydraulics cannot behave like a fair-weather ISO grade. KLONDIKE XVI All Season Blend Extreme Hydraulic Fluid is an ISO 46 HVLP row with extreme viscosity index and cold pour performance on the PDS, plus high shear stability language suited to wide-swing mobile and industrial circuits when OEM allows HVLP. The premium why is operating confidence across temperature extremes without pretending a straight mineral AW can do the same shear and pour job. Sell it with engineering respect: confirm ASTM HV / DIN Part 3 class, match the pump chart, and cite the indexed VI, pour, and operating band when the buyer asks why XVI costs more than the AW drum.",
    },
    {
      id: "flagship-utf-full-synthetic-tractor",
      productName: "Universal Tractor Fluid Full Synthetic",
      flagshipPositioning:
        "Full synthetic premium UTTO for common sump tractors when John Deere J20C/J20D and extreme cold Brookfield data matter as much as wet brake feel.",
      fieldIdentity:
        "The premium common-sump fluid you recommend when the customer runs modern iron, cold climates, and wants synthetic UTTO proof on the sheet—not just a brighter pail.",
      severeDutyUseCases: [
        "Cold-climate planting and winter construction when Brookfield viscosity at −35 °C and low pour points are indexed on the PDS.",
        "Premium tractors where OEM allows synthetic UTTO and wet brake / transmission-hydraulic performance must stay on category.",
        "Dealer PDIs and upsell paths where J20C/J20D rows need to be stapled to the work order, not implied.",
      ],
      keyDifferentiators: [
        "Full synthetic UTTO with API GL-4 and Allison C-4 positioning plus John Deere J20C/J20D on the indexed summary.",
        "Brookfield viscosity at −35 °C near 13,000 cP and pour near −51 °C on the index for a credible arctic-start story.",
        "Higher VI class (~161 on index) than conventional UTF tiers—premium cold-flow margin when OEM approves synthetic UTTO.",
      ],
      emotionalSalesAngles: [
        "Operator confidence on first engagement when cold Brookfield numbers match what they feel at the pedal.",
        "Dealer pride when premium iron gets a fluid tier that reads like the OEM binder, not a bargain-bin UTF.",
      ],
      operationalWins: [
        "Fewer wet-brake chatter comebacks when synthetic UTTO is actually approved and documented on the ticket.",
        "Cleaner seasonal bulk strategy when cold columns from the PDS justify the synthetic drum over summer UTF carryover.",
      ],
      premiumProofPoints: [
        "PDS index: API GL-4; Allison C-4; John Deere J20C/J20D; VI ~161; pour −51 °C; Brookfield @ −35 °C ~13,000 cP.",
      ],
      whatMakesThisDifferent: [
        "It is a full synthetic UTF tier with explicit JD J20C/J20D and cold Brookfield data—premium because common-sump tractors punish the wrong fluid in both hydraulics and brakes.",
        "It is not hydraulic AW, not engine CK-4, and not food-grade—category discipline is the differentiator.",
      ],
      customerLanguageExamples: [
        "“We stopped guessing on winter UTF—Brookfield and pour are on the PDS, and the wet brake feel finally stayed consistent.”",
        "“If we are running synthetic iron, I want synthetic UTTO with J20 lines I can show the service manager.”",
      ],
      dealerTalkingPoints: [
        "Lead with axle tag and OEM synthetic UTF allowance, then hand them the J20C/J20D and Brookfield lines from the PDS.",
        "Attach Brookfield @ −35 °C to cold-climate quotes—numbers beat adjectives for premium UTF.",
        "Keep CNH red programs on their MAT rows; this UTF story is JD J20C/J20D class per the indexed sheet.",
      ],
      doNotSay: [
        "Do not imply H1 food-plant suitability—keep hydraulic food SKUs segregated.",
        "Do not substitute for CNH MAT programs when the OEM calls for red-case UTTO.",
        "Do not promise wet brake cures without confirming OEM fluid category and any friction updates.",
      ],
      flagshipNarrativeParagraph:
        "Universal Tractor Fluid Full Synthetic is how you talk when the customer’s iron is too expensive for “good enough UTF.” KLONDIKE Universal Tractor Fluid Full Synthetic is a full synthetic UTTO with John Deere J20C/J20D, API GL-4, and Allison C-4 language on the PDS, plus Brookfield and pour values that support real cold-start confidence. The premium why is common-sump discipline: transmission, hydraulic, and wet-brake performance tied to OEM-approved synthetic UTTO chemistry—not a hydraulic AW drum pressed into the case. Position it when OEM allows synthetic UTF, staple the Brookfield and J20 lines to the quote, and keep category boundaries blunt so the dealer never trades short-term price for long-term chatter or warranty heat.",
    },
  ],
};

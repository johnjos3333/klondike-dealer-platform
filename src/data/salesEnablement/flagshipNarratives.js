/**
 * Phase 76.1 / 76.6 — Flagship dealer-facing narrative layer for Sales Enablement (data only).
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
        "Premium severe-duty NLGI 2 calcium sulfonate EP grease built for shock, wet pins, and real wash-down—not the commodity EP-2 drum that lives on price alone.",
      fieldIdentity:
        "What you reach for when hammers, crushers, and loader pins are eating shock, slurry is in every joint, and downtime from washout or metal loss is not an abstract risk.",
      severeDutyUseCases: [
        "Crusher frames, hammer mills, and slow-turn pins where shock loads spike and a thin film has to survive until the next service window.",
        "Shovels, loaders, and excavator bushings in wet yards—pressure-wash routines, haul roads, and seasonal mud that strip marginal greases.",
        "Mine and plant shops that want one severe EP tier with NLGI 2 discipline (or NLGI 1 where the OEM chart calls for it) instead of a rainbow of “good enough” tubes.",
      ],
      keyDifferentiators: [
        "Calcium sulfonate complex chemistry with indexed EP performance—this is a severe-duty program, not habit-stocked lithium EP-2.",
        "Nano tungsten disulfide on the PDS for EP/wear positioning—name it on the counter and tie it to shock and sliding wear, not buzzwords.",
        "Water spray-off on the indexed summary is vanishingly low; dropping point sits north of 300 °C class—field language: it stays put when things get hot and wet.",
        "4-ball weld load and Timken OK on the sheet give maintenance managers numbers they respect on crushers, hammers, and kingpins.",
      ],
      emotionalSalesAngles: [
        "Quiet confidence when the night shift regrease has to count—washout and load numbers match the ugliest pins, not the best-case demo.",
        "Respect from crews who have watched commodity EP wash off a wet boom and learned what “cheap” really costs in hours.",
      ],
      operationalWins: [
        "Fewer panic regreases after wet shifts when the film survives slurry, spray, and shock instead of disappearing mid-week.",
        "Cleaner conversations with reliability: thickener class, Timken, 4-ball, and spray-off sit on one narrative instead of tribal grease-board lore.",
        "Less silent downgrading when every red tube stops being treated as interchangeable on million-dollar iron.",
      ],
      premiumProofPoints: [
        "PDS-indexed 4-ball weld load 800 kg and Timken OK load 65+ lb—severe-duty proof you can point to beside the zerk map.",
        "PDS references nano tungsten disulfide for EP/wear—keep customer wording aligned with the printed line.",
        "PDS: NLGI 1 and 2 options, calcium sulfonate complex, low spray-off, high dropping point—premium headroom commodity EP rarely carries.",
      ],
      whatMakesThisDifferent: [
        "It earns the premium slot with published EP, Timken, washout, and temperature headroom—not with a louder “heavy duty” label.",
        "It separates Klondike’s severe-duty shelf from commodity EP-2 that cannot back the same story on crushers, hammers, and wet pins.",
      ],
      customerLanguageExamples: [
        "“We quit pretending every EP-2 is the same—on crushers and hammers we run what the sheet shows for shock, washout, and that tungsten disulfide line.”",
        "“If we are arguing uptime with maintenance, I want Timken and 4-ball on the board, not another story about the cheapest tube.”",
      ],
      dealerTalkingPoints: [
        "Walk the pin map: shock, water, load—then match NLGI 1 vs 2 to the OEM chart before dollars enter the room.",
        "Pair trials with weld, Timken, spray-off, thickener family, and tungsten disulfide wording straight off the PDS—let the field crew read what they are standing behind.",
        "Sell premium severe duty: this is not a commodity EP-2 conversation; it is crushers, hammers, bushings, and wet shifts that punish the wrong grease.",
      ],
      doNotSay: [
        "Do not call it interchangeable with every NLGI 2 lithium EP grease or central systems without a compatibility review.",
        "Do not extrapolate “nano” beyond the published PDS statements.",
        "Do not promise miracle life extension beyond OEM regrease intervals.",
        "Do not imply NLGI 2 without confirming OEM allows NLGI 2 calcium sulfonate EP on that joint.",
      ],
      flagshipNarrativeParagraph:
        "Nano EP 2 is the grease conversation when the job is loud, wet, and unforgiving—crushers, hammers, loader pins, and bushings that see shock, slurry, and pressure-wash routines that strip commodity films. KLONDIKE nano Calcium Sulfonate EP Grease is NLGI 2 severe EP (NLGI 1 where the chart allows) with calcium sulfonate complex chemistry, PDS-indexed weld and Timken performance, and nano tungsten disulfide called out for EP and wear—field language for sliding and shock loads, not a brighter tube. Water washout resistance on the summary is extremely low and the dropping point class is high-temperature serious, so the story is uptime and maintenance confidence in severe duty, not “another EP-2.” Match NLGI to the OEM map, keep claims inside the printed lines, and position it where downtime, contamination, and load spikes are real—not where price alone drives the pick.",
    },
    {
      id: "flagship-moly-tac-ep2-grease",
      productName: "Moly Tac EP-2 Grease",
      flagshipPositioning:
        "Moly-fortified lithium complex NLGI 2 EP grease for high-shock pins, implements, and chassis where 3% moly and the right soap family keep iron turning.",
      fieldIdentity:
        "The drum mechanics nod at when the cap sheet says moly EP-2 and the yard has already burned a pin on “whatever EP-2 was cheapest.”",
      severeDutyUseCases: [
        "Loader and excavator implement lines where shock hits every shift and OEM guidance points to moly-fortified EP-2.",
        "Vocational chassis and vocational fleets where NLGI 2 moly EP is the approved class and the wrong grease has already spalled a joint.",
        "Mixed yards that want one honest moly EP-2 story on the grease board—thickener, moly level, Timken, and washout on the same page.",
      ],
      keyDifferentiators: [
        "Lithium complex thickener with 3% molybdenum on the PDS—name the soap family before auto-lube or bulk crossover gets creative.",
        "Indexed EP load carrying, Timken OK, and low water washout—severe-service language for pins that see rain, dust, and load spikes together.",
        "Load-carrying detail sits beside the moly callout so you explain why the joint wants moly, not just “more EP” from a red tube.",
      ],
      emotionalSalesAngles: [
        "Relief when the central system stays consistent because thickener discipline landed before another brand swap.",
        "Credibility on the shop floor when the counter quotes 3% moly and lithium complex from the sheet, not from last year’s memory.",
      ],
      operationalWins: [
        "Fewer spalled pins when moly-spec joints actually get moly EP-2 lithium complex instead of a random EP-2 that skipped the chart.",
        "Faster morning audits when thickener and moly lines from the PDS sit next to each zerk map—less guessing at the pump.",
      ],
      premiumProofPoints: [
        "PDS: NLGI 2 lithium complex with 3% moly; dropping point about 260 °C class on the indexed summary.",
        "PDS: water washout about 1%; 4-ball EP load 500 kg; Timken OK load 70 lb—numbers that back shock and washdown stories.",
      ],
      whatMakesThisDifferent: [
        "Moly Tac EP-2 is explicit on moly percent and lithium complex chemistry—fewer silent failures when “any red EP-2” hits a moly-spec pin.",
        "It carries the Timken, washout, and EP package you need to justify shelf space against commodity guesses.",
      ],
      customerLanguageExamples: [
        "“We stopped treating EP-2 as generic—3% moly and lithium complex are printed, and that is what we match to the zerk chart.”",
        "“If the pin calls for moly EP-2, I want the Timken line and the moly number on paper—not a bargain tube that omits both.”",
      ],
      dealerTalkingPoints: [
        "Start with the OEM cap: moly EP-2, shock, environment—then hand them 3% moly and lithium complex straight from the PDS.",
        "Auto-lube and bulk systems: call out soap family before crossover; thickener surprises are downtime events.",
        "Keep Moly Tac EP-2 in the disciplined moly tier; steer nano calcium sulfonate programs to their own SKU when chemistry differs.",
      ],
      doNotSay: [
        "Do not assume calcium sulfonate chemistry—this SKU is lithium complex per the PDS; read each Moly Tac variant separately.",
        "Do not blanket-approve central systems without OEM and compatibility sign-off.",
        "Do not promise interchange with polyurea or other thickeners without a review.",
      ],
      flagshipNarrativeParagraph:
        "Moly Tac EP-2 is for the yards where “any EP-2” already cost someone a weekend and a pin. KLONDIKE Moly Tac EP-2 Grease is lithium complex NLGI 2 with 3% molybdenum—indexed Timken, four-ball EP, and washout values that let you talk shock, load, and water like a field specialist, not a slogan. The win is honest film strength on implements and chassis points that see daily abuse, especially where non-moly or wrong-thickener greases taught a hard lesson. Match the PDS moly and soap lines to the OEM chart, keep central-lube compatibility explicit, and sell it as the moly EP-2 tier that earns uptime without overselling what the sheet does not say.",
    },
    {
      id: "flagship-15w40-ck4-full-synthetic-hd",
      productName: "15W-40 CK-4 Full Synthetic HD Engine Oil",
      flagshipPositioning:
        "Full synthetic CK-4/SN 15W-40 for severe diesel when oxidation reserve, shear stability, and cold morning pumpability have to earn their keep on the road and in the pit.",
      fieldIdentity:
        "The bulk recommendation when fleet managers care about idle-heavy routes, cold starts, and drain discipline—and want CK-4 proof with VI headroom they can explain to drivers.",
      severeDutyUseCases: [
        "Linehaul and vocational diesels on high-stress cycles where oxidation stability supports OEM-allowed service strategies without fairy tales.",
        "Mine and construction mobiles when engineers ask for CK-4 with VI language tied to real ambient swings.",
        "Municipal and utility routes where winter starts and summer idle punish the wrong 15W-40 tier.",
      ],
      keyDifferentiators: [
        "API CK-4 / SN with ACEA E9/E7 and CES 20086-class OEM rows on the indexed sheet—synthetic story anchored to category, not stickers.",
        "Viscosity index near 155 on the index—honest talk about low-temperature flow and shear margin versus mineral tiers where OEM allows the same SAE grade.",
        "Oxidation stability and low-temperature performance language on the PDS backs severe-duty narratives without inventing drain miracles.",
      ],
      emotionalSalesAngles: [
        "Calm in the reliability office when synthetic upside is tied to CK-4 licenses and VI the buyer can trace.",
        "Trust from owner-operators burned once by “synthetic” labels that were not full synthetic CK-4 where it mattered.",
      ],
      operationalWins: [
        "Cleaner bulk discipline when synthetic CK-4 stays separated from FA-4, natural gas, and bridge SKUs that do not belong on the same gun.",
        "Sharper upgrade memos when VI and oxidation lines ride with the severe-service justification—not a generic upsell.",
      ],
      premiumProofPoints: [
        "PDS index: API CK-4 / SN; ACEA E9 / E7; CES 20086; Detroit Diesel DFS 93K222; Volvo VDS-4.5 on summary.",
        "PDS index: VI ~155 with enhanced oxidation stability and improved low-temperature performance versus mineral tiers on the same sheet narrative.",
      ],
      whatMakesThisDifferent: [
        "It is CK-4 full synthetic with OEM-facing rows and high VI—premium because severe diesel duty is documented, not because the pail is shinier.",
        "It keeps synthetic conversations inside API/OEM lanes—protects the dealer when drains and audits get picky.",
      ],
      customerLanguageExamples: [
        "“We moved bulk synthetic when cold starts and oxidation trends justified it—and we wanted CK-4 lines we could show the shop steward.”",
        "“If we are paying synthetic, I want VI and licenses on the data sheet, not another slogan on the drum.”",
      ],
      dealerTalkingPoints: [
        "Bring VI near 155 and oxidation language from the Full Synthetic PDS into every severe-service upgrade—not as legalese, as operating margin.",
        "Keep FA-4 and niche categories off the same bulk label—synthetic CK-4 wins when the cap matches the engine.",
        "Use UOA when discussing longer intervals; stay inside OEM max drains even with synthetic reserve.",
      ],
      doNotSay: [
        "Do not imply FA-4 interchange or natural gas coverage—keep SKUs segregated per PDS category.",
        "Do not promise drain intervals beyond OEM maximums.",
        "Do not claim universal superiority over every CK-4 without referencing the specific indexed advantages on the PDS.",
      ],
      flagshipNarrativeParagraph:
        "This is the 15W-40 you talk when diesel uptime—not drum cosmetics—is what closes the deal. KLONDIKE SAE 15W-40 Full Synthetic Heavy Duty Engine Oil is API CK-4 / SN with ACEA E9/E7 and OEM license rows that belong in the file cabinet, plus VI near 155 on the index for straight talk about cold starts, shear stability, and severe-cycle oxidation reserve. Field angle: fewer surprises on idle-heavy routes and winter mornings when the fluid matches the duty class the cap calls for. Position it when severe service or oil analysis justifies stepping above mineral or lower CK-4 tiers, keep drains inside OEM maximums, and lean on the printed VI and license package when price pushback shows up—no miracle claims, just documented headroom.",
    },
    {
      id: "flagship-xvi-all-season-extreme-hydraulic",
      productName: "XVI All Season Syn Blend Extreme Hydraulic Fluid",
      flagshipPositioning:
        "Extreme HVLP ISO 46 hydraulic fluid for wide ambient swings—cold morning boom response and hot afternoon pump confidence when straight ISO grades fall off shear or pour.",
      fieldIdentity:
        "What you put forward when the same excavator or press sees frost on the rails at dawn and hot oil by lunch, and the customer is tired of seasonal ISO band-aids.",
      severeDutyUseCases: [
        "Mobile mining and construction hydraulics with brutal temperature swings—HVLP shear stability and pour that match real site histograms.",
        "Plant presses, stackers, and ISO 46 HV circuits where viscosity index and operating band have to line up with engineering, not hope.",
        "Programs chasing fewer seasonal fluid gymnastics when MV/HVLP is approved and the temperature story matches how the yard actually runs.",
      ],
      keyDifferentiators: [
        "HVLP under ASTM HV and DIN 51524 Part 3 language on the PDS—not a rebadged straight AW pretending to be “all season.”",
        "Viscosity index near 210 and pour near −48 °C on the index—field-credible wide-temperature talk for first-shift responsiveness and summer load.",
        "PDS operating band language for extreme all-season ISO 46 duty—use the printed band when you overlay site highs and lows.",
      ],
      emotionalSalesAngles: [
        "Confidence when desert heat and cold starts share the same circuit—HVLP with VI and pour numbers beats another mineral guess.",
        "Relief for buyers who watched “all season” mineral thin out under load and paid for it in cycle time.",
      ],
      operationalWins: [
        "Less morning sluggishness when pour and HVLP class match the pump chart instead of the calendar guess.",
        "Cleaner capex conversations when the PDS temperature band sits on top of actual min/max site temps.",
      ],
      premiumProofPoints: [
        "PDS index: ISO 11158 HV; ISO 46 HVLP; VI ~210; pour −48 °C; high shear stability called out.",
        "PDS wide operating temperature band for extreme all-season positioning—pair with site data when you justify the drum.",
      ],
      whatMakesThisDifferent: [
        "XVI is extreme HVLP ISO 46 with high VI—premium because it answers shear and temperature limits straight grades cannot honestly cover.",
        "It stays in the hydraulic premium tier, separate from entry AW programs, until OEM HVLP approval is on the ticket.",
      ],
      customerLanguageExamples: [
        "“We mapped cold starts and summer tank temps—HVLP ISO 46 with that VI finally matched both ends of our year.”",
        "“I am done with ‘all season’ talk unless pour and VI are on the sheet.”",
      ],
      dealerTalkingPoints: [
        "Lay site min/max temps on the PDS operating band and pour columns before you size drum count—operations managers respect the overlay.",
        "Check HVLP and ISO 46 against the pump nameplate; XVI is not a workaround for the wrong class.",
        "Sell extreme duty, not a silent AW substitute—keep XVI in the wide-swing conversation where it belongs.",
      ],
      doNotSay: [
        "Do not substitute for Professional Series AW without OEM HVLP / ISO 46 approval.",
        "Do not invent wider temperature spans than the current PDS publishes.",
        "Do not confuse with tractor UTF or wet-brake fluids—different categories and risks.",
      ],
      flagshipNarrativeParagraph:
        "XVI is the hydraulic story when the machine does not get to pick nice weather. KLONDIKE XVI All Season Blend Extreme Hydraulic Fluid is ISO 46 HVLP with extreme viscosity index, cold pour performance, and high shear stability language on the PDS—built for wide-swing mobile and industrial circuits when OEM allows HVLP, not for fair-weather ISO habits. Field win: first-shift responsiveness when it is frosty, pump confidence when the circuit is hot, and less seasonal juggling when the fluid class matches how the site actually runs. Match ASTM HV / DIN Part 3 class to the pump chart, keep UTF and wet-brake categories out of the conversation, and let VI, pour, and the published operating band carry the premium when someone asks why XVI is not the cheapest AW drum.",
    },
    {
      id: "flagship-utf-full-synthetic-tractor",
      productName: "Universal Tractor Fluid Full Synthetic",
      flagshipPositioning:
        "Full synthetic premium UTTO for common-sump tractors when John Deere J20C/J20D, cold Brookfield behavior, and honest wet-brake feel belong in the same fill.",
      fieldIdentity:
        "The fluid you stand behind when premium iron, cold mornings, and operator feel at the pedal matter more than whichever UTF drum was on promotion.",
      severeDutyUseCases: [
        "Cold-climate planting, winter road work, and frosty yard starts when Brookfield at −35 °C and low pour on the PDS match what the operator feels.",
        "Premium tractors where OEM allows synthetic UTTO and one sump has to protect hydraulics, transmission, and wet brakes without category drift.",
        "Dealer PDIs and upsell lanes where J20C/J20D lines belong on the work order beside axle tags—not implied from a similar-looking pail.",
      ],
      keyDifferentiators: [
        "Full synthetic UTTO with API GL-4 and Allison C-4 plus John Deere J20C/J20D on the indexed summary—common-sump story with receipts.",
        "Brookfield viscosity near 13,000 cP at −35 °C and pour near −51 °C on the index—arctic-start language that matches field mornings.",
        "Higher VI class (~161 on index) than conventional UTF tiers—extra cold-flow margin when OEM signs off on synthetic UTTO.",
      ],
      emotionalSalesAngles: [
        "Operator confidence on first engagement when cold Brookfield numbers line up with pedal and shuttle feel.",
        "Dealer pride when premium tractors get a UTTO tier that reads like the OEM binder instead of a bargain-bin carryover.",
      ],
      operationalWins: [
        "Fewer wet-brake chatter headaches when synthetic UTTO is actually approved and written on the ticket.",
        "Cleaner seasonal bulk planning when cold columns from the PDS justify the synthetic drum instead of stretching summer UTF into winter.",
      ],
      premiumProofPoints: [
        "PDS index: API GL-4; Allison C-4; John Deere J20C/J20D; VI ~161; pour −51 °C; Brookfield @ −35 °C ~13,000 cP.",
      ],
      whatMakesThisDifferent: [
        "Full synthetic UTF with explicit JD J20C/J20D and cold Brookfield data—common-sump tractors punish the wrong fluid in hydraulics and brakes alike.",
        "Not hydraulic AW, not CK-4, not food-grade—category honesty is the differentiator.",
      ],
      customerLanguageExamples: [
        "“We quit guessing on winter UTF—Brookfield and pour are on the sheet, and wet brake feel finally stayed steady.”",
        "“If we bought synthetic iron, I want synthetic UTTO with J20 lines I can hand the service manager.”",
      ],
      dealerTalkingPoints: [
        "Start at the axle tag and OEM synthetic UTF allowance, then land J20C/J20D and Brookfield straight from the PDS.",
        "Cold quotes: lead with Brookfield at −35 °C—operators trust numbers they can feel at first engagement.",
        "Keep CNH red programs on their MAT rows; this narrative is JD J20C/J20D class per the indexed sheet.",
      ],
      doNotSay: [
        "Do not imply H1 food-plant suitability—keep hydraulic food SKUs segregated.",
        "Do not substitute for CNH MAT programs when the OEM calls for red-case UTTO.",
        "Do not promise wet brake cures without confirming OEM fluid category and any friction updates.",
      ],
      flagshipNarrativeParagraph:
        "Universal Tractor Fluid Full Synthetic is how you sell common-sump tractors when “close enough UTF” is how downtime starts. KLONDIKE Universal Tractor Fluid Full Synthetic is full synthetic UTTO with John Deere J20C/J20D, API GL-4, and Allison C-4 on the PDS, plus Brookfield and pour values that translate to cold-yard mornings and confident first shifts. Field angle: one sump doing transmission, hydraulic, and wet-brake work needs category discipline—this is not a hydraulic AW drum shoved into the case for price. Position it when OEM allows synthetic UTF, keep J20 and Brookfield lines on the quote, and draw hard boundaries so nobody trades a short-term drum discount for chatter, slippage, or warranty heat.",
    },
  ],
};

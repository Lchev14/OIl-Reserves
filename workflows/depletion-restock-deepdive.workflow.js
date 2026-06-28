export const meta = {
  name: 'depletion-restock-deepdive',
  description: 'Expansive deep-dive: full reserve-depletion forensics (every country + producers + IEA-release mechanics) AND the restocking-demand race (who must refill, how much, from where, competition, price, timeline) -> powerful synthesis. Web-search heavy.',
  phases: [
    { title: 'Frame', detail: 'current state + IEA 400mb release mechanics, country contributions' },
    { title: 'Depletion', detail: 'per-country depletion forensics: 16 consumers + 6 producers + OECD aggregate' },
    { title: 'RestockRace', detail: 'refill demand by buyer + sourcing + price competition + freight + demand-offset + timeline' },
    { title: 'Verify', detail: 'isolated source-verify + adversarial red team' },
    { title: 'Synthesis', detail: 'powerful narrative: depletion -> the race -> outlook' },
  ],
}

const CONSUMERS = ['USA','Germany','France','UK','Italy','Spain','Netherlands','Poland','Japan','South Korea','China','India','Thailand','Philippines','Indonesia','Vietnam']
const PRODUCERS = ['Saudi Arabia','UAE','Iran','Iraq','Kuwait','Qatar']
const BUYERS = [
  ['US SPR refill','US DOE — mandated/strategic refill of the SPR from its 1983 low (~331 mb), incl. any Congressional refill authority and the ~140 mb of cancelled 2024 buybacks'],
  ['EU/IEA strategic rebuild','EU + IEA members rebuilding the ~186 mb executed of the 400 mb release to restore the 90-day obligation'],
  ['Japan & Korea rebuild','METI/KNOC restoring the public stocks they released in Mar-2026 (Japan ~54 mb, Korea ~22 mb)'],
  ['China opportunistic accumulation','China buying discounted crude to refill/grow its ~1.0 bn bbl SPR+commercial — the swing opportunistic buyer'],
  ['India SPR build-out','India filling ISPRL Phase-I (~64%) + Phase-II build — structural new demand'],
  ['Commercial/industry restock','refiners + traders rebuilding drawn commercial stocks globally once backwardation eases'],
]

const SRC = { type:'object', required:['publisher','asOf'], properties:{ publisher:{type:'string'}, url:{type:'string'}, asOf:{type:'string'} } }
const DEPLETION = { type:'object', required:['country','todayDaysCover','confidence','sources'], properties:{
  country:{type:'string'},
  beforeDaysCover:{type:['number','null'], description:'Dec-2025 days of cover (net-import basis where possible)'},
  todayDaysCover:{type:['number','null']},
  daysBasis:{type:'string', description:'net-import | consumption | demand — which denominator'},
  strategicStockMb:{type:['number','null']},
  ieaReleaseContributionMb:{type:['number','null'], description:'how much this country released in the Mar-2026 IEA 400mb action'},
  drawdownStory:{type:'string', description:'2-3 sentences: what happened to this reserve Feb-Jun 2026'},
  confidence:{type:'string', enum:['official','wire','estimate','none']},
  sources:{type:'array', items:SRC} } }
const PROD = { type:'object', required:['country','shutInMbd','confidence','sources'], properties:{
  country:{type:'string'}, storageUtilPct:{type:['number','null']}, shutInMbd:{type:['number','null']},
  floatingStorageMb:{type:['number','null']}, story:{type:'string'}, confidence:{type:'string'}, sources:{type:'array',items:SRC} } }
const RESTOCK = { type:'object', required:['buyer','refillNeedMb','sources'], properties:{
  buyer:{type:'string'}, refillNeedMb:{type:['number','null'], description:'barrels this buyer needs to refill'},
  motive:{type:'string', description:'legal obligation | strategic | opportunistic'},
  whenBuying:{type:'string', description:'now / waiting for lower price / multi-year'},
  competesWith:{type:'string', description:'who else bids for the same barrels'},
  priceImpact:{type:'string'}, confidence:{type:'string'}, sources:{type:'array',items:SRC} } }
const THEME = { type:'object', required:['finding','sources'], properties:{ finding:{type:'string'}, numbers:{type:'string'}, confidence:{type:'string'}, sources:{type:'array',items:SRC} } }
const VERDICT = { type:'object', required:['verdict','attacks'], properties:{ verdict:{type:'string'}, killed:{type:'array',items:{type:'string'}}, attacks:{type:'array',items:{type:'string'}} } }

// ---- Frame ----
phase('Frame')
const frame = await agent(
  `Web-search the current state (late June 2026) of the 2026 Iran-Hormuz oil crisis and especially the MECHANICS of the IEA coordinated 400 mb stock release (decided 11 Mar 2026): the per-country contribution breakdown (US 172 mb, Japan ~80 mb, Korea ~22 mb, Spain 11.5 mb, etc.), how much has actually been EXECUTED vs authorised, and the OECD/global stock drawdown sequence month by month (IEA reported draws ~129 mb Mar, ~117 mb Apr...). Cite sources with dates. Be precise about executed-vs-authorised.`,
  { label:'frame', phase:'Frame', schema:THEME, effort:'high' })

// ---- Depletion: consumers + producers + aggregate ----
phase('Depletion')
const consumerDepletion = (await parallel(CONSUMERS.map(c => () =>
  agent(`You are a reserve-depletion forensics agent for ${c}. Web-search and report its crude/petroleum reserve DEPLETION story Feb->Jun 2026: Dec-2025 days of cover vs today (state the denominator: net-import / consumption / demand), strategic stock in mb, how much ${c} contributed to the IEA Mar-2026 release, and a 2-3 sentence drawdown narrative. Prefer national agency (EBV/SAGESS/DESNZ/OCSIT/CORES/COVA/RARS/JOGMEC/KNOC/PPAC/DOEB/DOE/ESDM/MOIT), IEA, JODI, Eurostat, Reuters/Bloomberg/Argus. For non-IEA Asia be honest where no series exists. Tag confidence official/wire/estimate/none.`,
    { label:`dep:${c}`, phase:'Depletion', schema:DEPLETION, effort:'high' })
))).filter(Boolean)

const producerDepletion = (await parallel(PRODUCERS.map(c => () =>
  agent(`You are a producer-side forensics agent for ${c}. Web-search Feb->Jun 2026: how much crude ${c} SHUT IN at the wellhead (mb/d), storage utilisation %, floating storage build (mb), and the story of why it couldn't stockpile blocked oil. Sources with dates; tag confidence.`,
    { label:`prod:${c}`, phase:'Depletion', schema:PROD, effort:'high' })
))).filter(Boolean)

const aggregate = await agent(
  `Web-search the AGGREGATE global/OECD oil-inventory picture as of June 2026: total OECD commercial + government stocks vs 5-yr average, days of forward cover (IEA says weakest since ~2003), the cumulative draw since the war, and the split between crude and products. Also the global observed stock-draw rate (mb/d). Cite sources.`,
  { label:'aggregate', phase:'Depletion', schema:THEME, effort:'high' })

// ---- Restock race ----
phase('RestockRace')
const restockByBuyer = (await parallel(BUYERS.map(([b,desc]) => () =>
  agent(`You are a restocking-demand analyst for this buyer: ${b}. Context: ${desc}. Web-search (June 2026): how many barrels they NEED to refill, their motive (legal obligation / strategic / opportunistic), WHEN they will buy (now vs waiting for lower price vs multi-year), WHO else competes for the same barrels, and the price impact. This is about the RESTOCKING RACE — quantify the competition for crude. Sources with dates.`,
    { label:`restock:${b}`, phase:'RestockRace', schema:RESTOCK, effort:'high' })
))).filter(Boolean)

const themes = await parallel([
  () => agent(`RESTOCK SOURCING: web-search where the restock barrels physically come from (Atlantic Basin reroute +mb/d, Saudi Yanbu/UAE Fujairah bypass, returning Hormuz flow) and why OPEC spare is NOT a source (trapped behind the Strait). Quantify mb/d. Sources.`, { label:'theme:sourcing', phase:'RestockRace', schema:THEME, effort:'high' }),
  () => agent(`RESTOCK PRICE COMPETITION ("the race"): web-search whether there is a bidding competition for barrels — backwardation, prompt premiums, China vs SPR-refill vs commercial restock, freight (VLCC $/day) and war-risk insurance as a cost wedge. Is restocking a price-supportive force or second-order? Sources.`, { label:'theme:price', phase:'RestockRace', schema:THEME, effort:'high' }),
  () => agent(`DEMAND DESTRUCTION OFFSET: web-search how much oil demand was permanently destroyed (China/Japan import drops, 2Q26 demand y/y) and net it against gross restock demand to estimate NET restocking demand. Show the arithmetic. Sources.`, { label:'theme:demand', phase:'RestockRace', schema:THEME, effort:'high' }),
  () => agent(`RESTOCK TIMELINE: web-search the realistic refill timeline — the ~4-month price-transmission lag, bypass capacity limits (no new until 2027), SPR refill pace constraints, and what each forecaster says about when restocking begins/ends. Sources.`, { label:'theme:timeline', phase:'RestockRace', schema:THEME, effort:'high' }),
  () => agent(`FORECASTER VIEWS ON RESTOCK: web-search what Goldman/JPMorgan/Morgan Stanley/RBC(Croft)/Rapidan(McNally)/Energy Aspects(Sen)/Rystad say specifically about restocking demand and whether it floods or tightens the market. Name who thinks what. Sources.`, { label:'theme:forecasters', phase:'RestockRace', schema:THEME, effort:'high' }),
])

// ---- Verify (isolated) ----
phase('Verify')
const bundle = { frame, consumerDepletion, producerDepletion, aggregate, restockByBuyer, themes }
const [verify, redteam] = await parallel([
  () => agent(`You are an ISOLATED source-verification agent (you did not gather this). Audit the bundle: flag any figure without a real dated source, any denominator confusion (net-import vs consumption vs demand mixed in one column), and any double-count in the restock-demand math. Verdict: ship | fix-required.\nBUNDLE: ${JSON.stringify(bundle)}`, { label:'verify', phase:'Verify', schema:VERDICT, effort:'high' }),
  () => agent(`You are an ISOLATED adversarial red team. Produce >=6 substantive attacks on the depletion story and the restock-race thesis (e.g. is the "race" real or is demand destruction killing it? is China actually buying or drawing? is SPR refill legally happening?). For each: the attack + what would settle it.\nBUNDLE: ${JSON.stringify(bundle)}`, { label:'redteam', phase:'Verify', schema:VERDICT, effort:'high' }),
])

// ---- Synthesis ----
phase('Synthesis')
const synthesis = await agent(
  `You are the master synthesist. Write a POWERFUL, detailed synthesis (Markdown, ~1200-1800 words) titled "Reserve Depletion & the Restocking-Demand Race — Deep Synthesis". Use ALL the data below. Structure:
1. The depletion story — what actually drained, country by country and producer side, with the IEA-release mechanics as the drawdown mechanism. Lead with the sharpest facts.
2. The global picture — OECD aggregate, days of cover, the crude/product split.
3. THE RESTOCKING-DEMAND RACE — the core: who must refill, how much, the competition for barrels (SPR-refill vs China-opportunistic vs commercial vs strategic rebuild), sourcing, the price-competition dynamics, and whether it's a genuine bidding race or second-order vs demand destruction. Net restock demand with arithmetic.
4. Forecaster split on restock.
5. Timeline.
6. Bottom line for a procurement/commodity-intelligence manager — the 3 things that matter, the key uncertainty, and what to watch.
Preserve disagreement; apply the red team's valid attacks; tag confidence where it matters; be honest about denominators and data-dark countries. Be specific and quantitative.

DATA:
frame=${JSON.stringify(frame)}
consumerDepletion=${JSON.stringify(consumerDepletion)}
producerDepletion=${JSON.stringify(producerDepletion)}
aggregate=${JSON.stringify(aggregate)}
restockByBuyer=${JSON.stringify(restockByBuyer)}
themes=${JSON.stringify(themes)}
verify=${JSON.stringify(verify)}
redteam=${JSON.stringify(redteam)}`,
  { label:'synthesis', phase:'Synthesis', effort:'high' })

return { synthesis, verifyVerdict: verify?.verdict, redTeamAttacks: redteam?.attacks?.length,
  consumers: consumerDepletion.length, producers: producerDepletion.length, buyers: restockByBuyer.length }

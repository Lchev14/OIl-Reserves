# First Workflow — Raw Agent Outputs (salvaged)

*Distilled final output of every agent from run `wf_9642a98b-45e` (52 agents, ~1.9M tokens, ~59 min, 26 Jun 2026). This is the per-agent detail that fed the synthesis but was never committed before. StructuredOutput = the agent's validated final result.*

---

## a05229bea9e0afb67
**Role:** You are an A-04 consumer subagent for India …
```json
{
 "country": "India",
 "todayDays": 76,
 "method": "published-triangulated",
 "confidence": "Inferred-triangulated",
 "hormuzDependenceShare": 0.3,
 "divergenceFlag": "No material divergence at a single reference date. Two coverage definitions coexist and must not be conflated: (a) TOTAL fuel reserves (strategic SPR + refinery inventories + commercial OMC stocks) = 76-80 days per Oil Minister Puri ~8 Jun 2026 — this is the headline todayDays anchor; (b) NARROWER crude+LNG subset = 69 days (Puri, 12 May) and ~60 days (March war-trough). The apparent 60->69->76 progression is a TIME SERIES (stock rebuild as Hormuz flows resumed and India leaned on non-Hormuz suppliers: Russia via Suez/Cape, US, West Africa), NOT a cross-source disagreement. Strategic-only SPR is just ~9-10 days (5 days at current ~64% fill) and is a small sub-component, not the coverage figure. todayDays=76 uses the conservative lower bound of the latest official 76-80 range, consistent with the ~74-day structural total-cover baseline India was refilling toward.",
 "sourceClassesUsed": [
  "official-primary",
  "secondary-wire"
 ],
 "massBalance": {
  "blockedMbd": 0,
  "demandReliefMbd": 0,
  "replacementMbd": 0,
  "netRateR_mbd": 0,
  "tDays": 0,
  "sReleaseMmb": 0,
  "deltaStockMmb": 0,
  "deltaCoverageDays": 0,
  "denominatorMbd": 4.84,
  "perCountryCalibrationNote": "Mass-balance NOT used: India has a directly published official-primary today figure (76-80 days total fuel reserves, Oil Minister Puri ~8 Jun 2026), triangulated by multiple secondary-wire outlets. Method (1) PUBLISHED-TRIANGULATED takes priority over modelling. For context only, India's Hormuz exposure is modest (~30% of crude imports via Hormuz; ~70% rerouted outside, govt-stated), and the minister explicitly framed reserves as sufficient to navigate a ~30-day Hormuz disruption — consistent with the published 76-day buffer rather than any drawdown model. All mass-balance fields zeroed because no modelled stock-change path was applied."
 },
 "sources": [
  {
   "publisher": "The Tribune (India) — Min. Puri: 76-80 days of oil reserves, no immediate risk",
   "sourceClass": "secondary-wire",
   "asOf": "2026-06-08",
   "nextPublish": "as-events",
   "url": "https://www.tribuneindia.com/news/india/we-have-76-80-days-of-oil-reserves-no-immediate-risk-to-country-union-minister-puri/"
  },
  {
   "publisher": "News9live — India can manage Hormuz disruption with 76-80 days of fuel reserves (Puri)",
   "sourceClass": "secondary-wire",
   "asOf": "2026-06-08",
   "nextPublish": "as-events",
   "url": "https://www.news9live.com/business/biz-news/india-can-manage-hormuz-disruption-with-76-to-80-days-of-fuel-reserves-says-hardeep-puri-2978228"
  },
  {
   "publisher": "India TV — Oil Minister Puri: India has 69 days of crude oil & LNG reserves, 45 days LPG (CII summit)",
   "sourceClass": "official-primary",
   "asOf": "2026-05-12",
   "nextPublish": "as-events",
   "url": "https://www.indiatvnews.com/news/india/no-supply-issue-india-has-69-days-crude-oil-lng-reserves-and-45-day-of-lpg-stock-says-oil-minister-hardeep-singh-puri-latest-updates-2026-05-12-1040802"
  },
  {
   "publisher": "Business Today — India has 60 days of crude oil stock (govt, total cover incl. caverns)",
   "sourceClass": "secondary-wire",
   "asOf": "2026-05-11",
   "nextPublish": "as-events",
   "url": "https://www.businesstoday.in/latest/economy/story/india-has-60-days-of-crude-oil-stock-heres-why-govt-still-wants-fuel-conservation-530881-2026-05-11"
  },
  {
   "publisher": "Akashvani/NewsOnAir (Petroleum Ministry) — India secures 70% of crude imports outside Strait of Hormuz",
   "sourceClass": "official-primary",
   "asOf": "2026-06",
   "nextPublish": "as-events",
   "url": "https://newsonair.gov.in/india-secures-70-of-crude-oil-imports-outside-strait-of-hormuz-petroleum-ministry/"
  },
  {
   "publisher": "Outlook Business — India's strategic SPR covers only ~9-10 days (sub-component, not total cover)",
   "sourceClass": "secondary-wire",
   "asOf": "2026-03",
   "nextPublish": "as-events",
   "url": "https://www.outlookbusiness.com/amp/story/news/indias-strategic-oil-reserves-cover-only-9-10-days-of-crude-imports-report"
  }
 ]
}
```

## a0d415871f01474d7
**Role:** You are A-09 Red Team, ISOLATED and adversarial …
```json
{
 "attacks": [
  {
   "target": "ledger-logic",
   "severity": "high",
   "attack": "The reconciliation is internally inconsistent and the residual is understated. The synthesis claims the ~1,200 mb supply gap reconciles to demand destruction (472) + stock draw (615) + Atlantic substitution (410) within a -179 mb residual. But 472+615+410 = 1,497, which OVERSHOOTS the 1,200 gap by -297 mb, not -179. A residual of -297/1,200 = ~25%, not the advertised ~15%. Separately, observedGlobalDraw is stated as 495 mb in the ledger object but the rhoConfidenceBand text derives it as 448 mb (IEA flat 3.8 mb/d x 118d). The headline cannot use a number it cannot reproduce from its own inputs. The reconciliation residual is the single most load-bearing honesty check in the whole ledger, and it does not close.",
   "response": "CONCEDE and rederive. Either (a) consumerDraw is being double-counted against observedGlobalDraw (the 615 consumer draw and the 448-495 observed global draw are not independent legs — the IEA observed draw IS largely the consumer/strategic draw, so adding 615 + a separate 410 Atlantic leg against the gap double-books). Pick ONE accounting identity: gap = demandDestruction + netStockDraw + (supply rerouted in). Restate the residual honestly at ~25% and widen the rho band, OR re-tag the legs so they are mutually exclusive and exhaustive. State which observedGlobalDraw (448 vs 495) is canonical and why."
  },
  {
   "target": "ledger-logic",
   "severity": "high",
   "attack": "Foregone output is double-counted with stranding and is computed on a time-invariant blockage that the bundle's own Hormuz data refutes. foregoneOutputMmb=1,080 = 9.2 mb/d x 118d. But the throughput object says Hormuz flowed at 4.8 mb/d ('contested-but-flowing') and recovered through the window, and bypassRealized=5.7 mb/d. 15 - 5.7 bypass - 4.8 Hormuz = ~4.5 mb/d genuinely unable to reach water at the END state, not 9.2. The 9.2/9.3 figure (15 - 5.7) assumes Hormuz at ZERO for all 118 days, which contradicts the spine (flow recovering; ~35 mb stranded crude cleared in June; CENTCOM 55 transits on 20 Jun). A time-weighted foregone figure is materially lower, which directly inflates the denominator that makes rho look tiny. rho is honest in DIRECTION but its magnitude rests on an overstated foregone number.",
   "response": "CONCEDE the magnitude, defend the direction. Recompute foregone output with a time-weighted blockage profile (e.g. Phase 1 Mar near-total, Phase 2 partial bypass ramp, Phase 3 Jun Hormuz at 4.8 + bypass 5.7). This lowers foregone from ~1,080 toward perhaps ~700-850 mb. rho rises modestly but stays far below 1, so the REFUTED verdict survives. The fix strengthens credibility: the current 9.2-flat figure is indefensible against the bundle's own flow data and a hostile reviewer will use it to discredit the whole ledger."
  },
  {
   "target": "estimator-calibration",
   "severity": "high",
   "attack": "The at-risk 'effectiveAtRiskCoverDays = daysOfCover x (1 - hormuzDependenceShare)' formula is dimensionally incoherent and contradicts the per-country mass-balance it sits next to. Stock cover is fungible: a barrel in a German cavern covers consumption regardless of whether the marginal import normally arrives via Hormuz. Multiplying days-of-cover by (1 - dependence) implicitly asserts that Hormuz-dependent barrels vanish AND cannot be replaced AND that strategic stock cannot substitute for them — i.e. zero replacement elasticity. But every per-country massBalance in the 'today' object credits heavy replacement (Spain near-full Atlantic substitution, Korea diversified to non-Hormuz, China +1.5 mb/d replacement). So the same bundle simultaneously assumes ~full replacement (mass-balance) and zero replacement (at-risk). Japan collapsing 205 -> 20.5 days is a scare number with no mechanism: it presumes Japan burns its 205-day stockpile at full Hormuz-blocked rate with no draw on the very reserves the 205 measures.",
   "response": "CONCEDE the formula is a heuristic, not a coverage estimate, and relabel it. 'Effective at-risk days' should model a flow shortfall net of replacement and bypass, then divide the at-risk shortfall into stock — not scale total cover by dependence. At minimum, reconcile it with the per-country replacement credits: if Korea/Japan can diversify (as the today-object asserts), their effective at-risk days are far above 20.5. Present it explicitly as a worst-case 'zero-replacement, full-blockage' bound and stop implying it is a realistic coverage figure."
  },
  {
   "target": "estimator-dimensionality",
   "severity": "high",
   "attack": "A global-average Hormuz-dependence and a single fixed denominator D were smuggled in under the banner of per-country calibration. The 'today' deltaCoverageDays for the EU members are all driven not by Hormuz physics but by the IEA release, yet the denominators are inconsistent with the baseline table and with each other. Korea's note divides S_release by 2.7 m
… (truncated)
```

## a0dabbe871aa88392
**Role:** You are A-12 Throughput / Bypass Model …
```json
{
 "hormuzNormalCrudeMbd": 15,
 "bypassCeilingMbd": 6.5,
 "bypassRealizedMbd": 5.7,
 "strandedMbd": 9.3,
 "routes": [
  {
   "name": "Saudi Petroline / East-West to Yanbu (Red Sea)",
   "nameplateMbd": 7,
   "realizedMbd": 4,
   "bindingConstraint": "Yanbu PORT loading/marine-terminal capacity, NOT the pipeline. Pipeline maxed at 7.0 mb/d on 11 Mar 2026 (NGL lines converted to crude), but Yanbu's two terminals load ~4.5 mb/d nominal / ~4.0 mb/d tested, and ~1.0 mb/d is drawn off by Yanbu-area refineries before tankers. Vortexa pegged effective wartime loading nearer 3.0 mb/d. ~4.4 mb/d actually loaded late Mar confirms the port gate, not the line, is binding. (Iranian drone hit a pump station 9 Apr, -0.7 mb/d transient, restored 12 Apr.)",
   "hormuzRelief": "HIGH / genuine — Red Sea exit fully clears Hormuz. This is ~70% of all realized bypass."
  },
  {
   "name": "UAE ADCOP / Habshan-Fujairah (Gulf of Oman)",
   "nameplateMbd": 1.8,
   "realizedMbd": 1.5,
   "bindingConstraint": "Fujairah terminal loading + storage; line nameplate ~1.5 mb/d (debottleneck to ~1.8). Targeted by Iranian strikes during the war. New West-East doubling line (~50% complete May 2026) not online until 2027, so no near-term lift.",
   "hormuzRelief": "HIGH but caveated — Fujairah discharges into the Gulf of Oman OUTSIDE the strait's narrowest channel, so it is true relief; however the terminal sits at the strait's mouth and is itself within Iranian strike/closure reach."
  },
  {
   "name": "Iraq Kirkuk-Ceyhan (Turkey / Mediterranean)",
   "nameplateMbd": 1.6,
   "realizedMbd": 0.2,
   "bindingConstraint": "Northern-field feedstock + Iraq-Turkey export/payment agreement and pipeline rehabilitation after a decade of intermittent closure; realized settled ~0.2 mb/d, Baghdad targeting 0.5-0.65 (max ~0.77).",
   "hormuzRelief": "NEAR-ZERO true Hormuz relief — NORTH-ONLY route fed by Kirkuk/northern crude. It does NOT connect to southern Basrah fields (>3.3 mb/d), which are the Hormuz-exposed volume. Any uplift here substitutes for northern barrels, not for stranded southern Gulf crude."
  },
  {
   "name": "Iran Goreh-Jask (Gulf of Oman)",
   "nameplateMbd": 0.3,
   "realizedMbd": 0,
   "bindingConstraint": "Effectively idle — Jask terminal non-operational since the 2024 test loadings; sanctions/marketing constraints, not infrastructure. <0.07 mb/d even at its 2024 peak.",
   "hormuzRelief": "NEGLIGIBLE — geographically bypasses Hormuz but contributes ~0 to global market supply; relief rounds to zero."
  }
 ],
 "opecSpareTrappedNote": "OPEC effective spare capacity (~3.5-4 mb/d) is held almost entirely by Saudi Arabia and the UAE, both of whose incremental barrels must exit via the Gulf. Vitol CEO Russell Hardy (FT Commodities Global Summit, Lausanne, late Apr 2026): \"all of [the world's spare production capacity] sits behind the Strait.\" The trap is double: (1) spare crude can be PUMPED but not SHIPPED — bypass exits are port-gated (Yanbu ~4 mb/d realized vs 7 mb/d piped; Fujairah ~1.5), so additional spare cannot physically reach water; (2) Kuwait and southern Basrah-Iraq have ZERO bypass — no inland line to a non-Hormuz coast, so their barrels (Kuwait ~2.5+ mb/d, Basrah >3.3 mb/d) strand entirely on a true closure, with Basrah output already collapsing ~4.3->1.4 mb/d on storage saturation. Net: activating OPEC spare does little for global balances while the strait is constrained because the spare and the bypass ceiling share the same blocked geography. Hardy estimated cumulative losses of 600-700 mb by late Apr, projected toward ~1 bn barrels including ramp-up — the rationale for the 400 mb IEA coordinated release (11 Mar).",
 "sources": [
  {
   "publisher": "Al Jazeera",
   "sourceClass": "secondary-wire",
   "asOf": "2026-03-27",
   "nextPublish": "as-events",
   "url": "https://www.aljazeera.com/economy/2026/3/27/saudi-uae-iraq-can-three-pipelines-help-oil-escape-strait-of-hormuz"
  },
  {
   "publisher": "CNBC — oil exporters scramble for routes beyond Hormuz",
   "sourceClass": "secondary-wire",
   "asOf": "2026-04-23",
   "nextPublish": "as-events",
   "url": "https://www.cnbc.com/2026/04/23/strait-hormuz-closure-alternative-routes-middle-east-oil-gas-pipelines.html"
  },
  {
   "publisher": "CNBC — two pipelines helping Saudi/UAE bypass Hormuz",
   "sourceClass": "secondary-wire",
   "asOf": "2026-03-12",
   "nextPublish": "as-events",
   "url": "https://www.cnbc.com/2026/03/12/strait-of-hormuz-oil-pipelines-iran-war-saudi-arabia-uae.html"
  },
  {
   "publisher": "Pipeline Technology Journal — Saudi maxes out East-West",
   "sourceClass": "secondary-wire",
   "asOf": "2026-03-12",
   "nextPublish": "as-events",
   "url": "https://www.pipeline-journal.net/news/saudi-arabia-maxes-out-east-west-pipeline-bypass-strait-hormuz"
  },
  {
   "publisher": "Engineering News-Record — bypass sized for short disruption",
   "sourceClass": "secondary-wire",
   "asOf": "2026-04-15",
   "nextPublish": "as-events",
   "url": "https://www
… (truncated)
```

## a18330846a90ddcb2
**Role:** You are A-13 the Global Redistribution Ledger — the THESIS TEST …
```json
{
 "consumerDrawMmb": 615,
 "producerBuildMmb": 120,
 "foregoneOutputMmb": 1080,
 "demandDestructionMmb": 472,
 "observedGlobalDrawMmb": 495,
 "rho": 0.195,
 "reconciliationResidualMmb": -179,
 "rhoConfidenceBand": "rho 0.15-0.26 (point 0.20). Bounds: producerBuild 100-140 mb (floating +80-110, onshore +15-30; Kpler/Vortexa ~90 mb stranded crude cross-checks the floating leg); consumerDraw 540-690 mb driven by observedGlobalDraw 448 mb (IEA flat 3.8 mb/d x 118d) to 540 mb (monthly-print build with steeper March shock). Even at the thesis-favorable extreme (producerBuild 140, consumerDraw 540) rho = 0.26 << 1. Band excludes 1.0 by a wide margin; the qualitative verdict is robust to all plausible input combinations.",
 "verdict": "REFUTED (strong form). The hypothesis \"a chokepoint closure conserves global reserves by stranding oil producer-side (consumerDraw ~= producerBuild, rho ~1)\" is rejected. rho = 0.20 (band 0.15-0.26), an order of magnitude below conservation. Mechanism: producers could NOT hoard blocked barrels because Gulf tankage saturated within ~1-2 weeks (Ras Tanura/Ju'aymah/Abqaiq ~90-95% by early March per Kayrros; Iraq/Kuwait/Qatar at tank-tops within days, forcing force majeure). With no storage headroom, ~9.2 mb/d of blocked Gulf output was SHUT IN at the wellhead, not stockpiled — cumulative foregone output ~1,080 mb over T=118d, roughly 9x the ~120 mb genuinely stranded (floating +100, onshore +20). The barrels were destroyed-at-source (never produced), not redistributed. The dominant adjustment was on the production and DEMAND side: consumers drew ~615 mb of stock (incl. ~80 mb US SPR / ~186 mb total IEA strategic releases) and demand destruction removed ~472 mb of consumption (2Q26 deliveries -5 mb/d y-o-y), while ~410 mb of Atlantic-basin supply was diverted East-of-Suez. NUANCE: the WEAK form (\"some stranding occurs\") is trivially true (~120 mb did move producer-side), but the load-bearing conservation claim fails decisively. The ~1,200 mb market supply gap reconciles to demand destruction + stock draw + Atlantic substitution within a -179 mb residual (~15%), the error bar absorbing modelled-tier uncertainty on bypass substitution and demand elasticity. OPEC spare capacity was structurally trapped (Vitol: \"all spare sits behind the strait\"), so activation could not offset the gap. Verdict insensitive to input bounds: rho < 0.3 across the entire plausible range.",
 "sources": [
  {
   "publisher": "IEA Oil Market Report (June 2026) - observed global draw 3.8 mb/d since war start; 143 mb May, 74 mb Apr; 2Q26 demand -5 mb/d y-o-y",
   "sourceClass": "official-primary",
   "asOf": "2026-06-17",
   "nextPublish": "2026-07 (monthly OMR)",
   "url": "https://www.iea.org/reports/oil-market-report-june-2026"
  },
  {
   "publisher": "CNBC - IEA flags demand destruction, inventories to historic lows",
   "sourceClass": "secondary-wire",
   "asOf": "2026-06-17",
   "nextPublish": "as-events",
   "url": "https://www.cnbc.com/2026/06/17/global-oil-demand-suppy-energy-prices-iea-inventories.html"
  },
  {
   "publisher": "U.S. EIA SPR weekly (411 -> 331 mb, 80 mb strategic draw)",
   "sourceClass": "official-primary",
   "asOf": "2026-06-19",
   "nextPublish": "weekly (Wed)",
   "url": "https://www.eia.gov/dnav/pet/hist/LeafHandler.ashx?n=PET&s=WCSSTUS1&f=W"
  },
  {
   "publisher": "IEA - largest-ever 400 mb collective stock release (US 172 mb)",
   "sourceClass": "official-primary",
   "asOf": "2026-03-11",
   "nextPublish": "as-events",
   "url": "https://www.iea.org/news/iea-member-countries-to-carry-out-largest-ever-oil-stock-release-amid-market-disruptions-from-middle-east-conflict"
  },
  {
   "publisher": "CNBC - ~35 mb stranded crude exited Hormuz post-deal (of ~90 mb stuck, Kpler/Vortexa) - floating-build cross-check",
   "sourceClass": "secondary-wire",
   "asOf": "2026-06-24",
   "nextPublish": "as-events",
   "url": "https://www.cnbc.com/2026/06/24/oil-tanker-strait-hormuz-iran-deal.html"
  },
  {
   "publisher": "Rigzone / Kayrros - Saudi storage filling fast, Ras Tanura/Ju'aymah tanks full (storage-saturation -> shut-in mechanism)",
   "sourceClass": "proxy-satellite",
   "asOf": "2026-03-04",
   "nextPublish": "as-events",
   "url": "https://www.rigzone.com/news/wire/saudi_oil_storage_filling_fast_kayrros_says-04-mar-2026-183120-article/"
  },
  {
   "publisher": "Bloomberg - Iraq starts shutting Rumaila output as storage fills (foregone-output, not stockpile)",
   "sourceClass": "secondary-wire",
   "asOf": "2026-03-03",
   "nextPublish": "as-events",
   "url": "https://www.bloomberg.com/news/articles/2026-03-03/iraq-starts-shutting-oil-output-at-rumaila-as-storage-fills-up"
  },
  {
   "publisher": "Vitol (Russell Hardy, FT Commodities Summit) - all spare capacity sits behind the strait; 600-700 mb cumulative loss by late Apr",
   "sourceClass": "secondary-wire",
   "asOf": "2026-04-23",
   "nextPublish": "as-events",
   "url": "https://www.energyintel.com/00000197-8318-def3
… (truncated)
```

## a1b7b3953cac9a586
**Role:** You are an A-04 consumer subagent for Netherlands …
```json
{
 "country": "Netherlands",
 "todayDays": null,
 "method": "absent",
 "confidence": "Absent",
 "hormuzDependenceShare": 0.06,
 "sourceClassesUsed": [
  "official-primary",
  "secondary-wire",
  "proxy-satellite"
 ],
 "divergenceFlag": "STRUCTURAL: Netherlands is an IEA-classified NET OIL EXPORTER (Rotterdam/ARA hub re-exports exceed crude intake on a net basis), so 'days of net-import cover' is mathematically ill-defined — net imports approach zero/negative, making any todayDays = stock/net_imports diverge toward infinity or undefined. IEA therefore EXEMPTS the Netherlands from the 90-day net-import rule. Its only binding metric is the EU Directive 2009/119/EC floor (61 days of INLAND CONSUMPTION, the greater of the two for NL). No source publishes a crisis-adjusted late-June-2026 'today coverage in days' for the Netherlands. Mass-balance path is also blocked: denominator D from A-03 is explicitly 'unknown mb/d', so ΔStock/D is uncomputable, and D itself is ill-posed for a net exporter. Both numeric paths fail on verifiable inputs -> ABSENT per method-priority rule (3); no guess emitted.",
 "sources": [
  {
   "publisher": "IEA — Netherlands' legislation on oil security",
   "sourceClass": "official-primary",
   "asOf": "2025-12-01",
   "nextPublish": "as-updated",
   "url": "https://www.iea.org/articles/netherlands-legislation-on-oil-security"
  },
  {
   "publisher": "COVA (Dutch central stockholding agency) — stock obligation 4,100–4,770 kt COE; 2025 temporary drawdown for relocation",
   "sourceClass": "official-primary",
   "asOf": "2025-02-01",
   "nextPublish": "annual",
   "url": "https://cova.nl/en/oil-dashboard-netherlands/"
  },
  {
   "publisher": "IEA Oil Stocks of IEA Countries data tool (NL exempt as net exporter)",
   "sourceClass": "official-primary",
   "asOf": "2026-03-12",
   "nextPublish": "monthly",
   "url": "https://www.iea.org/data-and-statistics/data-tools/oil-stocks-of-iea-countries"
  },
  {
   "publisher": "Council of the EU — Where does the EU get its oil from (GCC ~7%, Saudi 6.8%, Iraq 5.8% of EU oil imports 2025)",
   "sourceClass": "secondary-wire",
   "asOf": "2025-06-01",
   "nextPublish": "as-updated",
   "url": "https://www.consilium.europa.eu/en/infographics/where-does-the-eu-get-its-oil-from/"
  },
  {
   "publisher": "Visual Capitalist — Oil Trade Through the Strait of Hormuz by Country / Europe's Crude Imports 2024",
   "sourceClass": "proxy-satellite",
   "asOf": "2025-01-01",
   "nextPublish": "as-updated",
   "url": "https://www.visualcapitalist.com/charted-oil-trade-through-the-strait-of-hormuz-by-country/"
  },
  {
   "publisher": "Trading Economics — Netherlands imports from Saudi Arabia of crude oil (~US$500M, 2025; small vs total)",
   "sourceClass": "secondary-wire",
   "asOf": "2025-12-31",
   "nextPublish": "as-updated",
   "url": "https://tradingeconomics.com/netherlands/imports/saudi-arabia/crude-oil-petroleum-bituminous-minerals"
  }
 ],
 "massBalance": {
  "blockedMbd": 0,
  "deltaCoverageDays": 0,
  "deltaStockMmb": 0,
  "demandReliefMbd": 0,
  "denominatorMbd": 0,
  "netRateR_mbd": 0,
  "perCountryCalibrationNote": "Mass-balance NOT executed. Denominator D from A-03 = 'unknown mb/d', so ΔStock/D is uncomputable; per methodology, never guess. Compounding the block: the Netherlands is an IEA net oil EXPORTER, so the country-level net-import denominator is itself ill-defined (Rotterdam/ARA re-exports refined product in excess of crude intake on a net basis). Hormuz-dependence calibration for NL is LOW (~6% of crude imports via Hormuz): EU-wide GCC share is ~7% of oil imports (Saudi 6.8%, Iraq 5.8% are largely non-Hormuz blends routed to other EU states); Dutch Saudi crude imports ~US$500M/yr are marginal against a multi-tens-of-billion crude bill dominated by North Sea, US, West Africa, Norway and Guyana barrels. blockedMbd to NL from the 4.8 vs 15 mb/d Hormuz cut is therefore small in absolute terms and partly offset by Atlantic-basin substitution available to a coastal hub refiner. With D unknown and NL net-import cover structurally undefined, no numeric Δdays or todayDays can be responsibly produced. All numeric fields set to 0 as required-shape placeholders, NOT estimates.",
  "replacementMbd": 0,
  "sReleaseMmb": 0,
  "tDays": 118
 }
}
```

## a2752c2d7e3f3b637
**Role:** You are A-10 Synthesis + Build …
Now I have all verified figures. Assembling the final Markdown deliverable.

# Global Oil Reserve Redistribution Under the 2026 Hormuz Disruption — Synthesis

*As-of 26 Jun 2026 · War start 28 Feb 2026 · Window T = 118 days · MoU ceasefire 17 Jun · Brent $74.43 · Hormuz contested-but-flowing ~4.8 mb/d (32% of ~15 prewar)*

**THESIS VERDICT (load-bearing, never averaged): The conservation hypothesis is REFUTED (strong form).** A chokepoint closure does **not** conserve global reserves by stranding oil producer-side. ρ = 0.20 (band 0.15–0.26), an order of magnitude below the conservation threshold of 1.0. Producers could not hoard blocked barrels — Gulf tankage saturated within ~1–2 weeks, so ~700–1,080 mb of blocked output was **shut in at the wellhead (destroyed-at-source)**, not stockpiled. The system rebalanced through consumer/strategic draw + demand destruction + Atlantic substitution, not producer hoarding. The verdict is robust across the entire plausible input range (see §d, including the corrected reconciliation residual).

---

## (a) Consumer Reserve Cover — Before vs Today

months = days / 30.44 · Δ% = (today−before)/before · "−" where null · effective at-risk cover is a **worst-case zero-replacement bound** (see footnote F7), not a coverage estimate.

| Country | Before (days) | Before (months) | Today (days) | Today (months) | Δ days | Δ % | Hormuz-dep % | Eff. at-risk cover¹ | Confidence | Source & Date |
|---|---|---|---|---|---|---|---|---|---|---|
| USA | − | − | − | − | − | − | 8% | − ² | Absent | EIA WPSR / IEA OMR May-2026; net-exporter, metric undefined |
| Germany | − | − | 99.1 | 3.3 | − | − | 5% | 94.1 | Modelled-EST | BMWE/EBV + IEA, 11 Mar 2026 |
| France | 98 | 3.2 | 98 | 3.2 | +0.0 | +0.0% | 11% | 87.2 | Inferred-triangulated | IEA/Euronews/Eurostat, Apr 2026 |
| UK | 104 | 3.4 | 90 | 3.0 | −14.0 | −13.5% | 7% | 83.7 | Inferred-triangulated | GOV.UK/IEA/Al Jazeera, Mar 2026 |
| Italy | − | − | 90 | 3.0 | − | − | 18% | 73.8 | Inferred-triangulated | IEA Italy Oil Security / EU Dir. 2009/119, 2026 |
| Spain | 120 | 3.9 | 91 | 3.0 | −29.0 | −24.2% | 6% | 85.5 | Modelled-EST | CORES/IEA/Al Jazeera, Mar 2026 |
| Netherlands | − | − | − | − | − | − | 6% | − ² | Absent | IEA/COVA; net-exporter, metric undefined |
| Poland | − | − | 86.5 | 2.8 | − | − | 13% | 75.3 | Modelled-EST | IEA Poland Oil Security + model, 2026 |
| Japan | 200 | 6.6 | 205 | 6.7 | +5.0 | +2.5% | 90% | **20.5** | Inferred-triangulated | S&P/METI-ANRE, 9 May 2026 |

… (truncated)

## a3142efb7f50b2a9e
**Role:** You are A-06 Restocking Demand Estimate …
```json
{
 "refillMmb": 186,
 "newBuildsMmb": 120,
 "demandDestructionOffsetMmb": 472,
 "netDemandMmb": -166,
 "method": "Total restocking demand = released-stock refill + new capacity builds, NET of demand destruction.\n\nLEG 1 - RELEASED-STOCK REFILL (strategic stock actually drawn that must be replenished): 186 mb.\n  - US SPR: 411 mb (31 Dec 2025) -> 331 mb (19 Jun 2026 EIA weekly) = 80 mb drawn (lowest since 1983; fill 46.4% vs ~714 mb nameplate). [EIA WCSSTUS1]\n  - Other IEA members' executed strategic releases = ~106 mb (ledger: '~80 mb US SPR / ~186 mb total IEA strategic releases'). 186 - 80 = 106 mb.\n  - Refill leg = 80 + 106 = 186 mb (EXECUTED/DRAWN basis).\n  - NOTE on basis: the IEA collective DECISION was 400 mb (US share 172 mb, decided 2026-03-11), but only ~186 mb was physically drawn down by the 19-Jun as-of date. Refill DEMAND tracks barrels actually removed, so the base case uses 186 mb. If instead the full 400 mb authorization is treated as a standing refill obligation, the refill leg = 400 mb (see bracket below).\n\nLEG 2 - NEW CAPACITY BUILDS (genuinely stranded barrels now sitting as incremental stock): 120 mb.\n  - producerBuildMmb = 120 mb: floating storage +~100 mb (Kpler/Vortexa ~90 mb stranded crude cross-check; ~35 mb exited post-deal per CNBC 24-Jun) + onshore +~20 mb. This is the only real producer-side stock build; the other ~1,080 mb of blocked Gulf output was SHUT IN at the wellhead (foregone, never produced), not stockpiled.\n\nGROSS RESTOCKING DEMAND = 186 (refill) + 120 (new builds) = 306 mb.\n\nLEG 3 - DEMAND-DESTRUCTION OFFSET (netted out): 472 mb.\n  - demandDestructionMmb = 472 mb. IEA OMR Jun 2026: 2Q26 demand -5 mb/d y-o-y; China+Japan crude imports down ~40%. Permanently removed consumption does NOT need to be restocked, so it is subtracted from gross restocking demand.\n\nNET RESTOCKING DEMAND = 306 - 472 = -166 mb.\n\nINTERPRETATION (load-bearing): Net restocking demand is NEGATIVE. Demand destruction (472 mb) EXCEEDS gross restocking need (306 mb) by 166 mb. The chokepoint episode destroyed more forward consumption than it created in refill+rebuild obligation, so it generated NO net incremental restocking pull on the post-ceasefire market. This is consistent with Brent settling at $74.43 on 26 Jun 2026 -- back at the ~$72 eve-of-war level -- despite the US SPR sitting at a 1983 low (331 mb, 46.4% full). It also corroborates the ledger's REFUTED conservation verdict (rho=0.20): the system rebalanced primarily through shut-in production and demand destruction, not stock conservation, leaving little restocking-demand overhang.\n\nBRACKET (sensitivity on the refill basis): Using full 400 mb IEA authorization as the refill obligation -> gross = 400 + 120 = 520 mb; net = 520 - 472 = +48 mb. So the SIGN of net restocking demand flips on the refill basis: -166 mb (executed-draw, base case) to +48 mb (full-authorization). Either way the magnitude is small relative to the ~1,200 mb war-supply gap -- restocking is a second-order driver, not a price-supportive overhang. Range: -166 mb to +48 mb (point estimate -166 mb, executed-draw basis).",
 "sources": [
  {
   "publisher": "U.S. EIA (SPR weekly stocks WCSSTUS1; 411->331 mb, 80 mb strategic draw)",
   "sourceClass": "official-primary",
   "asOf": "2026-06-19",
   "nextPublish": "weekly (Wed)",
   "url": "https://www.eia.gov/dnav/pet/hist/LeafHandler.ashx?n=PET&s=WCSSTUS1&f=W"
  },
  {
   "publisher": "International Energy Agency (collective action decision, 400 mb, US 172 mb)",
   "sourceClass": "official-primary",
   "asOf": "2026-03-11",
   "nextPublish": "as-events",
   "url": "https://www.iea.org/news/iea-member-countries-to-carry-out-largest-ever-oil-stock-release-amid-market-disruptions-from-middle-east-conflict"
  },
  {
   "publisher": "IEA Oil Market Report (June 2026) - 2Q26 demand -5 mb/d y-o-y; observed global draw 3.8 mb/d; inventories to historic lows",
   "sourceClass": "official-primary",
   "asOf": "2026-06-17",
   "nextPublish": "2026-07 (monthly OMR)",
   "url": "https://www.iea.org/reports/oil-market-report-june-2026"
  },
  {
   "publisher": "CNBC - ~35 mb stranded crude exited Hormuz post-deal (of ~90 mb stuck per Kpler/Vortexa) - floating-build cross-check",
   "sourceClass": "secondary-wire",
   "asOf": "2026-06-24",
   "nextPublish": "as-events",
   "url": "https://www.cnbc.com/2026/06/24/oil-tanker-strait-hormuz-iran-deal.html"
  },
  {
   "publisher": "Rigzone / Kayrros - Gulf onshore storage saturation (Ras Tanura/Ju'aymah full) -> shut-in not stockpile mechanism",
   "sourceClass": "proxy-satellite",
   "asOf": "2026-03-04",
   "nextPublish": "as-events",
   "url": "https://www.rigzone.com/news/wire/saudi_oil_storage_filling_fast_kayrros_says-04-mar-2026-183120-article/"
  },
  {
   "publisher": "EIA Europe Brent Spot Price FOB (RBRTE) - $74.43 settle 26 Jun 2026",
   "sourceClass": "official-primary",
   "asOf": "2026-06-26",
   "nextPublish": "daily",
   "url": "https://www.eia.gov/dnav/pet/hist
… (truncated)
```

## a3685245073f0a7e6
**Role:** You are an A-04 consumer subagent for Thailand …
```json
{
 "country": "Thailand",
 "todayDays": 117,
 "method": "published-triangulated",
 "confidence": "Inferred-triangulated",
 "hormuzDependenceShare": 0.55,
 "sourceClassesUsed": [
  "official-primary",
  "secondary-wire",
  "forecaster"
 ],
 "divergenceFlag": "COMPOSITION CAVEAT (not a >15% tracker divergence): Thailand is an IEA Association country, NOT a member — it has no IEA 90-day import-coverage obligation and publishes its own national days-of-cover. The headline 117 days (Thai Energy Ministry, as of 12-13 May 2026, the latest published figure; no June-dated update located) is a BROAD coverage metric that bundles four components: legal/strategic reserve 25d + commercial reserve 31d + oil-in-transit 35d + confirmed-but-undelivered procurement 26d. HARD physical inventory on the ground = legal + commercial = ~56 days only. The remaining ~61 days (in-transit + forward-contracted) is contingent on Hormuz and global shipping continuing to flow; against a HARD Hormuz closure that resilience degrades toward the ~56-day floor. The official series trended 60d (23 Feb) -> 95d (6 Mar) -> 106d (2 Apr) -> 109d (9 Apr) -> 110d (24 Apr) -> 108d (1 May) -> 117d (12 May), reflecting active reserve-building and replacement crude secured from the US, Africa, Malaysia and Russia-crude talks. Method is published-triangulated (official-primary figure corroborated by multiple secondary wires); fixed denominator D=0.95 mb/d and mass-balance were NOT used because Thailand directly publishes days-of-coverage.",
 "massBalance": {
  "replacementMbd": 0,
  "demandReliefMbd": 0,
  "blockedMbd": 0,
  "netRateR_mbd": 0,
  "sReleaseMmb": 0,
  "tDays": 0,
  "deltaStockMmb": 0,
  "denominatorMbd": 0.95,
  "deltaCoverageDays": 0,
  "todayDays": 117,
  "perCountryCalibrationNote": "Mass-balance NOT used as the method. Thailand publishes its own national days-of-cover directly (official-primary), so the published-triangulated path takes priority and the fixed denominator D=0.95 mb/d is not the operative basis. Fields zeroed because no flow-to-stock modelling was performed; todayDays=117 is the directly published official figure, not a modelled delta. For reference, Thailand's Hormuz dependence is high (~55% of crude via the Persian Gulf/Hormuz; range 50% via-Hormuz to ~58-59% Middle-East-sourced), but the 117-day figure already internalizes replacement procurement (26d confirmed supply) rather than requiring it to be modelled."
 },
 "sources": [
  {
   "publisher": "Thai Energy Ministry (via Nation Thailand / ThaiPBS World)",
   "sourceClass": "official-primary",
   "asOf": "2026-05-12",
   "nextPublish": "as-events (periodic ministry briefings)",
   "url": "https://world.thaipbs.or.th/detail/60974"
  },
  {
   "publisher": "Nation Thailand (oil reserves cover 108 days, full component breakdown)",
   "sourceClass": "secondary-wire",
   "asOf": "2026-05-01",
   "nextPublish": "as-events",
   "url": "https://www.nationthailand.com/news/general/40065734"
  },
  {
   "publisher": "The Star (ASEAN+, Thailand 108-day reserves)",
   "sourceClass": "secondary-wire",
   "asOf": "2026-05-02",
   "nextPublish": "as-events",
   "url": "https://www.thestar.com.my/aseanplus/aseanplus-news/2026/05/02/thailand-says-its-oil-reserves-will-cover-108-days-amid-energy-volatility-from-the-middle-east-tensions"
  },
  {
   "publisher": "Nation Thailand (Thailand imports ~50% of crude from Persian Gulf via Hormuz; Russian crude talks)",
   "sourceClass": "secondary-wire",
   "asOf": "2026-03",
   "nextPublish": "as-events",
   "url": "https://www.nationthailand.com/blogs/news/policy/40063734"
  },
  {
   "publisher": "Krungsri Research (Middle East tensions; Thailand ~58% crude from Middle East)",
   "sourceClass": "forecaster",
   "asOf": "2026-03",
   "nextPublish": "as-events",
   "url": "https://www.krungsri.com/en/research/research-intelligence/middle-east-tension-2026"
  },
  {
   "publisher": "Bloomsbury Intelligence and Security Institute (Thailand oil-import vulnerability / Hormuz exposure)",
   "sourceClass": "forecaster",
   "asOf": "2026",
   "nextPublish": "as-events",
   "url": "https://bisi.org.uk/reports/thailand-oil-import-vulnerability-structural-risks-exposed-by-hormuz-crisis"
  }
 ]
}
```

## a3f5a4294ffa17f69
**Role:** You are A-08 Source Verification, in an ISOLATED context (you did NOT generate these figur …
```json
{
 "killed": [],
 "downgraded": [
  "India baseline beforeDays=74 (today=76): cites discoveryalert.com.au, which the frame's own `excluded` list bans as a 'content-farm/aggregator blog, not primary.' EXCLUSION GATE FIRED on a load-bearing source. Figure survives (vajiramandravi secondary-wire + Deccan Chronicle/Kpler proxy-tanker independently corroborate ~74d total / ~9-10d SPR; today=76 separately rests on official-primary Min. Puri 76-80d, 8 Jun 2026), so DOWNGRADE not KILL: strip discoveryalert from the source set, hold confidence at Inferred-triangulated on the surviving corroboration.",
  "Qatar producer block (exportCoverDays=10.5, usableStockMmb=10, storageUtilPct=92, shutInMbd=0.95): block tagged Inferred-triangulated, but the block self-discloses that 'exact tankage volumes, June crude-export tonnage, and current shut-in are not separately published' and figures are EST triangulated off an Oct-2025 EIA brief, Halul Island specs, and Wikipedia. Self-admitted EST + reliance on a Wikipedia spec source overreaches the Inferred-triangulated tag. DOWNGRADE confidence to Modelled-EST.",
  "Trajectory OECD/SPR weekly series: source list includes global-energy-flow.com (frame's `excluded` list bans it as a 'single-purpose day-counter tracker'). EXCLUSION GATE FIRED. Series survives on EIA WCSSTUS1 (official-primary, four VERIFIED SPR anchors) + IEA OMR May/Jun (official-primary); the OECD weekly path is disclosed as linear interpolation of IEA monthly. DOWNGRADE: strip global-energy-flow.com as a decorative/redundant tracker source; the surviving EIA+IEA backing carries the series.",
  "China today=130 divergenceFlag: prose cites discoveryalert ('incremental US crude purchases'). Not load-bearing for the 130-day headline (Reuters/Kemp forecaster + EIA official-primary carry it), but it is an excluded-source mention. DOWNGRADE: strip the discoveryalert reference from the narrative; headline figure unaffected."
 ],
 "passed": [
  "Brent now=$74.43 (EIA RBRTE official-primary 2026-06-26 + Trading Economics; dual-class, dated).",
  "US SPR before=411/now=331/fill=46.4% (EIA WCSSTUS1 official-primary; 331/714=46.4% checks; lowest-since-1983 corroborated).",
  "IEA release 400mb / US share 172mb / decided 11 Mar 2026 (IEA news page official-primary + Bloomberg + CNBC + Al Jazeera; strongly corroborated).",
  "Freight VLCC now ~$179,600/day vs ~$55k prewar (Hellenic/Lloyd's List + OilPrice + CNBC; appropriate secondary-wire class for freight).",
  "France baseline 98 / today 98 (Euronews + Eurostat + IEA article; published 90-100d band, Inferred-triangulated appropriate; mass-balance cross-check correctly subordinated, no spurious drawdown applied).",
  "UK 104/90, Spain 120/91, China 122.5/130, Germany today 99.1 (Modelled-EST), Poland today 86.5 (Modelled-EST), Spain today 91 (Modelled-EST): methods disclosed, confidence honestly tagged to the modelled tier, no overreach.",
  "Japan 200/205 and South Korea 208/205 (IEA chart + EIA + S&P + Statista-on-IEA; multi-class, Inferred-triangulated honest; net-imports vs consumption basis split correctly flagged, not conflated).",
  "At-risk effectiveAtRiskCoverDays for all 14 computable rows: arithmetic = daysOfCover*(1-hormuzDependenceShare) verified exact for every row.",
  "demand net = -166 mb (gross 306 [refill 186 + builds 120] minus demand destruction 472); refill 186 = 80 EIA-verified SPR draw + 106 other-IEA, internally consistent; sensitivity bracket to +48mb on full-authorization basis disclosed.",
  "FABRICATION DISCIPLINE (strong pass): US, Germany, Italy, Netherlands, Poland, Thailand, Philippines, Indonesia, Vietnam beforeDays all correctly NULLED to Absent where the canonical IEA net-import metric was net-exporter-undefined, non-IEA, or 403-blocked. No invented numbers substituted for unverifiable ones. USA todayDays correctly resolved to null with mass-balance left at zeros (dimensionally undefined for a net exporter).",
  "Self-citation guard held: hormuzstraitmonitor.com / straits.live correctly excluded as operator-dashboard derivatives; no figure relies on them.",
  "Saudi Okinawa lease 8.2mmb (Argus/Zawya, dated 2024-12); Iran 106mmb / 13.5mb headroom (Kpler forecaster, dated): named, dated, qualifying."
 ],
 "reconciliation": "Bottom-up consumer-stock sum vs IEA top-down OECD aggregate. TOP-DOWN: IEA OMR observed global draw 3.8 mb/d x 118 d = 448 mb (OECD-trajectory leg shows 4,100->3,560 = -540 mb OECD-only; SPR 411->331 = -80 mb verified). BOTTOM-UP supply gap ~1,200 mb reconciles via observedGlobalDraw 495 + demand destruction 472 + Atlantic substitution 410 = 1,377, leaving residual -177 mb (bundle states -179; rounding). DIVERGENCE / ERROR BAR ~= -179 mb (~15% of the gap), which the bundle correctly nominates as the error bar absorbing modelled-tier uncertainty on bypass substitution and demand elasticity. rho = producerBuild 120 / consumerDraw 615 = 0.195 (verified), band 0.15-0.26, an order of magnitude below the conservation threshold of
… (truncated)
```

## a3fa713da2d53bcf2
**Role:** You are an A-03 consumer subagent for Netherlands …
```json
{
 "country": "Netherlands",
 "beforeDays": null,
 "denominatorMbd": null,
 "stockBasis": "IEA TOTAL oil stocks = strategic (COVA agency) + commercial/industry obligated stocks (crude + NGL + refined products), NOT strategic-only. As of May 2025 (latest Eurostat figure surfaced via search), Netherlands held the EU's largest COMMERCIAL stock at 9.50 Mt, which was 68.3% of its total stocks -> implied TOTAL stocks ~13.9 Mt (~102 mb), of which ~31.7% (~4.4 Mt / ~32 mb) strategic/agency. Dec-2025 total-stock level not retrievable from primary IEA tables in this session (egress block).",
 "netExporterConvention": "Netherlands is NOT a strict net oil exporter on the IEA TOTAL-oil basis: it is a large net CRUDE importer (~1 mb/d into Rotterdam) and the largest European net PRODUCT exporter, leaving a SMALL POSITIVE total-oil net-import denominator. IEA therefore lists it in the days-of-net-import-cover chart, but because the denominator D is small and volatile the metric is ill-defined / unstable (commonly a few hundred days). Convention adopted: compute days-of-cover as IEA TOTAL stocks (strategic+commercial) divided by prior-year avg daily TOTAL-OIL NET imports (the IEA/EU net-imports method), NOT gross crude imports, with footnote. Footnote: the IEA/EU net-imports method is acknowledged by COVA and the Dutch ministry to under-state the true obligation for NL (large blending/refining sector), which is why NL is bound by the EU 61-days-of-inland-consumption floor (whichever-greater rule) rather than the 90-days-net-imports rule. A gross-crude-imports denominator (~1.0 mb/d) would give a materially LOWER, more stable days figure (~100 days) and is offered as the alternative reading. Precise D and beforeDays NOT obtainable this session.",
 "confidence": "Inferred-triangulated",
 "sources": [
  {
   "publisher": "IEA — Oil Stocks of IEA Countries (data tool) & Oil Market Report Dec-2025",
   "sourceClass": "official-primary",
   "asOf": "2025-12",
   "url": "https://www.iea.org/data-and-statistics/data-tools/oil-stocks-of-iea-countries",
   "nextPublish": "monthly OMR"
  },
  {
   "publisher": "IEA — IEA total oil stocks, December 2025 (chart)",
   "sourceClass": "official-primary",
   "asOf": "2025-12",
   "url": "https://www.iea.org/data-and-statistics/charts/iea-total-oil-stocks-december-2025",
   "nextPublish": "monthly"
  },
  {
   "publisher": "Eurostat — Emergency oil stocks statistics (commercial 9.50 Mt = 68.3% of NL total, May 2025)",
   "sourceClass": "official-primary",
   "asOf": "2025-05",
   "url": "https://ec.europa.eu/eurostat/statistics-explained/index.php?title=Emergency_oil_stocks_statistics",
   "nextPublish": "annual/monthly update"
  },
  {
   "publisher": "IEA — Netherlands legislation on oil security (90d net-imports vs 61d consumption, whichever greater; net-imports method too low for NL)",
   "sourceClass": "official-primary",
   "asOf": "2024",
   "url": "https://www.iea.org/articles/netherlands-legislation-on-oil-security",
   "nextPublish": "n/a"
  },
  {
   "publisher": "COVA — Our commitment / Oil dashboard Netherlands",
   "sourceClass": "official-primary",
   "asOf": "2025",
   "url": "https://cova.nl/en/our-commitment/",
   "nextPublish": "n/a"
  },
  {
   "publisher": "Statista — How Long Would Countries' Oil Stocks Last? (reproduces IEA days-of-net-imports; data updated 12 Mar 2026)",
   "sourceClass": "secondary-wire",
   "asOf": "2026-03-12",
   "url": "https://www.statista.com/chart/36019/oil-stocks-of-iea-countries-measured-in-days-of-net-imports/",
   "nextPublish": "n/a"
  }
 ]
}
```

## a464e929f906066a6
**Role:** You are A-16 Import-at-Risk …
```json
{
 "rows": [
  {
   "country": "USA",
   "daysOfCover": null,
   "hormuzDependenceShare": 0.08,
   "effectiveAtRiskCoverDays": null,
   "note": "daysOfCover unavailable (SPR + commercial stocks not provided); cannot compute. Low Hormuz dependence (8%) makes USA structurally insulated regardless."
  },
  {
   "country": "Germany",
   "daysOfCover": 99.1,
   "hormuzDependenceShare": 0.05,
   "effectiveAtRiskCoverDays": 94.145,
   "note": "Robust. High raw cover, near-negligible Hormuz exposure. Effective cover barely below headline."
  },
  {
   "country": "France",
   "daysOfCover": 98,
   "hormuzDependenceShare": 0.11,
   "effectiveAtRiskCoverDays": 87.22,
   "note": "Solid. IEA-strategic stock cushion; modest Hormuz dependence."
  },
  {
   "country": "United Kingdom",
   "daysOfCover": 90,
   "hormuzDependenceShare": 0.07,
   "effectiveAtRiskCoverDays": 83.7,
   "note": "Low dependence; effective cover holds near headline."
  },
  {
   "country": "Italy",
   "daysOfCover": 90,
   "hormuzDependenceShare": 0.18,
   "effectiveAtRiskCoverDays": 73.8,
   "note": "Higher Gulf exposure than NW Europe peers; ~18% erosion of effective cover."
  },
  {
   "country": "Spain",
   "daysOfCover": 91,
   "hormuzDependenceShare": 0.06,
   "effectiveAtRiskCoverDays": 85.54,
   "note": "Diversified (West Africa, US, Latam); low Hormuz reliance."
  },
  {
   "country": "Netherlands",
   "daysOfCover": null,
   "hormuzDependenceShare": 0.06,
   "effectiveAtRiskCoverDays": null,
   "note": "daysOfCover unavailable; cannot compute. ARA hub with low direct Hormuz dependence (6%)."
  },
  {
   "country": "Poland",
   "daysOfCover": 86.5,
   "hormuzDependenceShare": 0.13,
   "effectiveAtRiskCoverDays": 75.255,
   "note": "Shifting from Russian to diversified supply; moderate Gulf exposure."
  },
  {
   "country": "Japan",
   "daysOfCover": 205,
   "hormuzDependenceShare": 0.9,
   "effectiveAtRiskCoverDays": 20.5,
   "note": "FRAGILE — high-cover/high-dependence. 205 headline days collapses to ~20 at-risk days. 90% of barrels transit Hormuz; large stockpile masks acute single-chokepoint vulnerability."
  },
  {
   "country": "South Korea",
   "daysOfCover": 205,
   "hormuzDependenceShare": 0.9,
   "effectiveAtRiskCoverDays": 20.5,
   "note": "FRAGILE — high-cover/high-dependence. Identical profile to Japan: deep reserves, but 90% Hormuz routing leaves only ~20 effective days. Headline cover is misleading."
  },
  {
   "country": "China",
   "daysOfCover": 130,
   "hormuzDependenceShare": 0.46,
   "effectiveAtRiskCoverDays": 70.2,
   "note": "Large absolute reserves and partial diversification (Russia pipeline, West Africa) blunt Hormuz shock; effective cover still ~54% of headline."
  },
  {
   "country": "India",
   "daysOfCover": 76,
   "hormuzDependenceShare": 0.3,
   "effectiveAtRiskCoverDays": 53.2,
   "note": "Russian discount crude diversification has cut Gulf dependence; effective cover holds reasonably."
  },
  {
   "country": "Thailand",
   "daysOfCover": 117,
   "hormuzDependenceShare": 0.55,
   "effectiveAtRiskCoverDays": 52.65,
   "note": "FRAGILE — high-cover/high-dependence. 117 days halves to ~53 effective; majority-Gulf sourcing erodes a strong-looking buffer."
  },
  {
   "country": "Philippines",
   "daysOfCover": 46.47,
   "hormuzDependenceShare": 0.95,
   "effectiveAtRiskCoverDays": 2.3235,
   "note": "MOST FRAGILE — thin cover AND extreme dependence (95%). ~2.3 effective at-risk days. A Hormuz closure is near-immediate supply crisis; no buffer."
  },
  {
   "country": "Indonesia",
   "daysOfCover": 21,
   "hormuzDependenceShare": 0.2,
   "effectiveAtRiskCoverDays": 16.8,
   "note": "Thin headline cover but low Gulf dependence; effective days nearly equal headline. Risk is low absolute stock, not chokepoint."
  },
  {
   "country": "Vietnam",
   "daysOfCover": 40.3,
   "hormuzDependenceShare": 0.88,
   "effectiveAtRiskCoverDays": 4.836,
   "note": "FRAGILE — low cover AND very high dependence (88%). ~4.8 effective days. Second-most exposed after Philippines."
  }
 ]
}
```

## a4f764cf2d90052c9
**Role:** You are an A-03 consumer subagent for Thailand …
```json
{
 "country": "Thailand",
 "beforeDays": null,
 "denominatorMbd": 0.95,
 "stockBasis": "IEA TOTAL-STOCK basis (strategic+commercial) days-of-net-import-cover is NOT PUBLISHED for Thailand. Thailand is an IEA Association country (since 2015), not a member; the IEA does not compute or publish IEA-style days of net-import cover for it. National figures that exist (Dec-2025 era: ~60-65 days, decomposed by the Energy Ministry as ~22 days crude + ~20 days crude-in-transit + ~18 days refined product) are a DEMAND/CONSUMPTION-cover mandatory-stockholding measure against throughput, NOT days of NET IMPORTS, and they mix in in-transit cargoes. They are therefore not comparable to the IEA total-stock net-import-days metric and per the exclusion gate are not used as beforeDays. denominatorMbd D is the FIXED prior-year (2024) avg daily NET imports (crude+products), triangulated from EIA/Worldometer 2024 balances (consumption ~1.37 mb/d minus production ~0.42 mb/d => net imports ~0.95 mb/d); same D applies to the 'today' comparison but does not yield an IEA-style beforeDays for this non-IEA country.",
 "netExporterConvention": "Thailand is a structural NET IMPORTER of crude oil and total petroleum (imports ~67% of consumption); net-importer convention applies, denominator D is positive (net imports > 0). No net-exporter sign handling needed.",
 "confidence": "Absent",
 "sources": [
  {
   "publisher": "IEA (International Energy Agency) — Thailand country oil page",
   "sourceClass": "official-primary",
   "asOf": "2026-06-26",
   "url": "https://www.iea.org/countries/thailand/oil",
   "nextPublish": "unknown"
  },
  {
   "publisher": "Nation Thailand — minister statement on oil cover (60->95 days)",
   "sourceClass": "secondary-wire",
   "asOf": "2026-03 (Hormuz crisis coverage)",
   "url": "https://www.nationthailand.com/news/policy/40063364",
   "nextPublish": "n/a"
  },
  {
   "publisher": "Nation Thailand — Energy Minister: 61 days of oil reserves",
   "sourceClass": "secondary-wire",
   "asOf": "2025-06",
   "url": "https://www.nationthailand.com/news/general/40063128",
   "nextPublish": "n/a"
  },
  {
   "publisher": "Pattaya Mail — Energy Minister Pirapan: 60-day reserve (22 crude + 20 in-transit + 18 product)",
   "sourceClass": "secondary-wire",
   "asOf": "2025-06",
   "url": "https://www.pattayamail.com/thailandnews/thai-energy-minister-assures-60-day-oil-reserve-as-tensions-rise-over-strait-of-hormuz-506937",
   "nextPublish": "n/a"
  },
  {
   "publisher": "U.S. EIA — Thailand country analysis (consumption/production/net-import balance)",
   "sourceClass": "official-primary",
   "asOf": "2024 annual",
   "url": "https://www.eia.gov/international/analysis/country/THA",
   "nextPublish": "unknown"
  },
  {
   "publisher": "Worldometer — Thailand oil (2024 consumption 1.372 mb/d, production 0.418 mb/d)",
   "sourceClass": "secondary-wire",
   "asOf": "2024",
   "url": "https://www.worldometers.info/oil/thailand-oil/",
   "nextPublish": "n/a"
  },
  {
   "publisher": "EPPO (Energy Policy and Planning Office, Thailand) — petroleum statistics",
   "sourceClass": "official-primary",
   "asOf": "2024-2025",
   "url": "https://www.eppo.go.th/index.php/en/en-energystatistics/petroleum-statistic",
   "nextPublish": "monthly"
  }
 ]
}
```

## a550de2ef82316eeb
**Role:** You are an A-03 consumer subagent for Japan …
```json
{
 "country": "Japan",
 "beforeDays": 200,
 "denominatorMbd": 2.4,
 "stockBasis": "IEA TOTAL stocks = strategic (government/JOGMEC ~263 mb, the 90-day public reserve) + commercial/industry (~220 mb, the 70-day obligation under the Oil Stockpiling Act). Combined closing total ~450-483 mb as of Dec-2025. This is the IEA 'Oil stocks of IEA countries' total-stock basis (industry + government, NOT strategic-only). Coverage expressed as IEA days of NET-IMPORT cover.",
 "netExporterConvention": "Not applicable - Japan is a structural net importer (near-total import dependence, domestic crude production ~0.1 mb/d). Net-import denominator is positive and used directly.",
 "confidence": "Inferred-triangulated",
 "sources": [
  {
   "publisher": "IEA - Oil stocks of IEA countries (data tool) / IEA total oil stocks December 2025 chart",
   "sourceClass": "official-primary",
   "asOf": "2025-12",
   "url": "https://www.iea.org/data-and-statistics/charts/iea-total-oil-stocks-december-2025",
   "nextPublish": "monthly (OMR ~mid-month)"
  },
  {
   "publisher": "IEA - Japan country oil profile / Japan Oil Security Policy",
   "sourceClass": "official-primary",
   "asOf": "2025-12",
   "url": "https://www.iea.org/countries/japan/oil",
   "nextPublish": "periodic"
  },
  {
   "publisher": "U.S. EIA - Today in Energy: China, US, Japan hold most strategic oil inventories in 2025",
   "sourceClass": "secondary-wire",
   "asOf": "2025-12",
   "url": "https://www.eia.gov/todayinenergy/detail.php?id=67504",
   "nextPublish": "n/a"
  },
  {
   "publisher": "IEA Monthly Oil Statistics (OECD net imports denominator basis)",
   "sourceClass": "official-primary",
   "asOf": "2024 (prior-year avg, fixed D)",
   "url": "https://www.iea.org/data-and-statistics/data-product/monthly-oil-statistics",
   "nextPublish": "monthly"
  }
 ]
}
```

## a653ddc0235394107
**Role:** You are an A-11 producer subagent for Saudi Arabia (Gulf exporter) …
```json
{
 "country": "Saudi Arabia",
 "exportCoverDays": 30,
 "usableStockMmb": {
  "domesticInsideHormuz": 150,
  "domesticOutsideHormuz": 30,
  "leasedAbroad": 18
 },
 "storageUtilPct": 92,
 "bypassAdjExportMbd": 4.5,
 "shutInMbd": 2.3,
 "chokepointNote": "Saudi Arabia is a NET EXPORTER — net-import-cover is meaningless; this uses the exporter schema (usable above-ground stock / pre-crisis export rate). The BINDING constraint is NOT a strait-transit ban per se but storage saturation behind the chokepoint: with the ~5.5 mb/d Gulf/Hormuz crude export channel (mainly Ras Tanura + offshore Ju'aymah single-point moorings) blocked from ~early March 2026, Eastern Province tankage (Ras Tanura, Ju'aymah, Abqaiq) filled to ~90-95% by early March (Kayrros), forcing shut-in rather than storage build. Four supergiant OFFSHORE fields (Safaniya ~1.2 mb/d, Marjan, Zuluf, Abu Safa) idled since March = ~2.0-2.5 mb/d shut-in. BYPASS: East-West 'Petroline' (Abqaiq->Yanbu, Red Sea, OUTSIDE Hormuz) maxed to 7 mb/d on 11 Mar 2026 (5 mb/d nameplate + parallel NGL line converted to crude). But ~2 mb/d of that 7 feeds domestic refineries, leaving ~5 mb/d crude to Yanbu — and the REAL ceiling is the YANBU PORT, with North+South berths nominal ~4.5 mb/d, operationally tested ~4 mb/d. So bypass-adjusted crude export ~4.5-5.0 mb/d (Bloomberg: Yanbu crude exports ~5 mb/d by 18 Mar; +~0.7-0.9 mb/d refined products). Net foregone vs ~6.2 mb/d prewar total crude exports ≈ the ~2.3 mb/d shut-in. STOCK TAGGING: the large majority of usable above-ground crude (~150 mmb) sits INSIDE Hormuz (Eastern Province) and is effectively stranded behind the closed/contested strait — drawable to TANKER only via the Petroline->Yanbu route or restored Gulf loadings, so 'export cover' from usable stock is far thinner than the gross ~30-day figure implies. Outside-Hormuz domestic stock (~30 mmb, Yanbu/Muajjiz/Rabigh Red Sea tankage) is the only freely exportable buffer. Leased-abroad: Okinawa, Japan 8.2 mmb VERIFIED (13 tanks, ~1.3 mn kL); plus Sidi Kerir/SUMED Egypt, Rotterdam, and Fujairah (UAE east coast, itself OUTSIDE Hormuz on the Gulf of Oman) — modelled ~18 mmb aggregate, Japan-priority in emergency. RECOVERY: post-ceasefire (MoU 17 Jun), Saudi set to RESTART Ras Tanura/Ju'aymah loadings ~25 Jun 2026 (first VLCCs since early March, Bahri tankers to SPMs) as Hormuz transits rose to ~4.8 mb/d strait-wide; full Gulf-channel normalization and offshore-field restart are gradual and ceasefire-contingent (months, not weeks).",
 "confidence": "Inferred-triangulated",
 "sources": [
  {
   "publisher": "EIA (Today in Energy / Chokepoints)",
   "sourceClass": "official-primary",
   "asOf": "2025-Q1",
   "nextPublish": "as-events",
   "url": "https://www.eia.gov/todayinenergy/detail.php?id=65504"
  },
  {
   "publisher": "Argus Media (East-West pipeline maxed out; Yanbu limited option)",
   "sourceClass": "forecaster",
   "asOf": "2026-03-11",
   "nextPublish": "daily",
   "url": "https://www.argusmedia.com/en/news-and-insights/latest-market-news/2807554-saudi-east-west-pipeline-maxed-out-on-hormuz-closure"
  },
  {
   "publisher": "S&P Global Commodity Insights (Nasser: Petroline to full 7 mb/d)",
   "sourceClass": "forecaster",
   "asOf": "2026-03-10",
   "nextPublish": "as-events",
   "url": "https://www.spglobal.com/energy/en/news-research/latest-news/crude-oil/031026-aramcos-east-west-pipeline-to-hit-full-capacity-in-next-couple-of-days-ceo"
  },
  {
   "publisher": "Bloomberg (Saudi revived half exports via Hormuz bypass; Yanbu ~5 mb/d)",
   "sourceClass": "forecaster",
   "asOf": "2026-03-18",
   "nextPublish": "as-events",
   "url": "https://www.bloomberg.com/news/articles/2026-03-18/saudi-arabia-has-revived-half-its-oil-exports-via-hormuz-bypass"
  },
  {
   "publisher": "Bloomberg (Saudi set to restart Ras Tanura exports as Gulf flows rise)",
   "sourceClass": "forecaster",
   "asOf": "2026-06-25",
   "nextPublish": "as-events",
   "url": "https://www.bloomberg.com/news/articles/2026-06-25/saudis-set-to-restart-ras-tanura-oil-exports-as-gulf-flows-rise"
  },
  {
   "publisher": "Rigzone (Kayrros: Saudi oil storage filling fast; Ju'aymah/Ras Tanura tanks full)",
   "sourceClass": "proxy-satellite",
   "asOf": "2026-03-04",
   "nextPublish": "as-events",
   "url": "https://www.rigzone.com/news/wire/saudi_oil_storage_filling_fast_kayrros_says-04-mar-2026-183120-article/"
  },
  {
   "publisher": "Maritime Executive / Argus (4 supergiant offshore fields shut, ~2-2.5 mb/d)",
   "sourceClass": "secondary-wire",
   "asOf": "2026-03",
   "nextPublish": "as-events",
   "url": "https://maritime-executive.com/article/report-saudi-aramco-shuts-down-two-supergiant-offshore-oil-fields"
  },
  {
   "publisher": "Argus / Zawya (Aramco Okinawa lease 8.2 mmb / 13 tanks)",
   "sourceClass": "official-primary",
   "asOf": "2024-12",
   "nextPublish": "as-events",
   "url": "https://www.argusmedia.com/en/news-and-insights/latest-market-news/2756307-japan-extends-crude-storage-dea
… (truncated)
```

## a658cf24ca0e4c503
**Role:** You are an A-04 consumer subagent for Poland …
```json
{
 "country": "Poland",
 "todayDays": 86.5,
 "method": "mass-balance-modelled",
 "confidence": "Modelled-EST",
 "hormuzDependenceShare": 0.13,
 "divergenceFlag": "none",
 "sourceClassesUsed": [
  "official-primary",
  "forecaster",
  "secondary-wire",
  "modelled"
 ],
 "massBalance": {
  "netRateR_mbd": -0.0037,
  "replacementMbd": 0.015,
  "demandReliefMbd": 0.003,
  "blockedMbd": 0.0217,
  "sReleaseMmb": 2,
  "tDays": 118,
  "denominatorMbd": 0.7,
  "deltaStockMmb": -2.43,
  "deltaCoverageDays": -3.47,
  "perCountryCalibrationNote": "Calibrated to Poland's low, structurally-insulated Hormuz exposure, NOT a global average. National crude import shares (2025): Saudi Arabia ~29%, Norway ~18%, USA ~17%, remainder North Sea/West African/Kazakh/US grades — none of which transit Hormuz. The ONLY Hormuz-relevant supplier is Saudi Arabia. hormuzDependenceShare=0.13 = 29% Saudi share x ~0.45 of Saudi barrels that would normally route to Europe via the Strait (Ras Tanura/Gulf loadings); the remaining ~0.55 of Saudi-to-Europe crude already routes via the East-West (Petroline) pipeline to Yanbu on the Red Sea + SUMED, bypassing Hormuz entirely even pre-crisis. blockedMbd: gross Hormuz-exposed barrels = D(0.7) x 0.13 = 0.091 mb/d; Hormuz impaired 68% (flow 4.8 of 15 mb/d prewar = 32%); but Saudi-to-Europe flow is being ACTIVELY rerouted — the East-West pipeline is maxed at 7 mb/d in 2026 precisely to serve European buyers via Yanbu, neutralizing most impairment for Poland — so a residual un-reroutable fraction of ~0.35 is applied: 0.091 x 0.68 x 0.35 = 0.022 mb/d realized shortfall. replacementMbd=0.015: Orlen substitutes residual shortfall through Naftoport/Gdansk Baltic terminal (handled 37.4 Mt ~0.75 mb/d of seaborne crude in 2025, near full capacity but with cargo-reshuffling headroom; dominant gateway for North Sea/US/WAF and Yanbu-routed Saudi grades). demandReliefMbd=0.003: marginal at ~$74 Brent (near pre-war, no structural premium). sReleaseMmb=2.0: Poland is NOT a headline IEA-release contributor (vs US 172 mb); modest ~2 mb public/obligated drawdown supporting EU coordination during the crisis window. beforeDays=90 = IEA-compliant baseline (53 days obligated industry stocks + 37 days RARS public stocks; Poland structurally holds at the 90-day net-import floor, all on-territory, no overseas tickets). Net: 90 + (-3.47) = 86.5 days. The low dependence (0.13) is what keeps erosion modest; a global-average Hormuz-dependence assumption would be the failure mode here and would overstate the drawdown several-fold."
 },
 "sources": [
  {
   "publisher": "International Energy Agency (Poland Oil Security Policy — 90-day stock structure: 53 obligated + 37 RARS public, on-territory)",
   "sourceClass": "official-primary",
   "asOf": "2025-05-01",
   "url": "https://www.iea.org/articles/poland-oil-security-policy",
   "nextPublish": "annual"
  },
  {
   "publisher": "International Energy Agency (collective action decision, 400 mb release, EU member participation)",
   "sourceClass": "official-primary",
   "asOf": "2026-03-11",
   "url": "https://www.iea.org/news/iea-member-countries-to-carry-out-largest-ever-oil-stock-release-amid-market-disruptions-from-middle-east-conflict",
   "nextPublish": "as-events"
  },
  {
   "publisher": "Forum Energii / Eurostat (Poland 2025 crude import shares: Saudi Arabia 29%, Norway 18%, USA 17%)",
   "sourceClass": "forecaster",
   "asOf": "2025-01-01",
   "url": "https://www.forum-energii.eu/en/transformacja-energetyczna-polski-edycja-2025",
   "nextPublish": "annual"
  },
  {
   "publisher": "Fortune (Saudi East-West/Petroline pipeline maxed at 7 mb/d to bypass Hormuz, Yanbu ~5 mb/d crude exports to Europe via Red Sea/SUMED)",
   "sourceClass": "secondary-wire",
   "asOf": "2026-03-28",
   "url": "https://fortune.com/2026/03/28/saudi-arabia-east-west-oil-pipeline-strait-hormuz-bypass-7-million-barrels-yanbu-red-sea/",
   "nextPublish": "as-events"
  },
  {
   "publisher": "CEEnergyNews / Port Gdansk (Naftoport handled 37.4 Mt crude in 2025, near full capacity, Baltic seaborne substitution gateway)",
   "sourceClass": "secondary-wire",
   "asOf": "2025-12-01",
   "url": "https://ceenergynews.com/oil-gas/gdansk-naftoport-expansion/",
   "nextPublish": "as-events"
  },
  {
   "publisher": "Offshore-technology (Saudi Aramco supplies ~45% of Orlen crude requirements under long-term contract)",
   "sourceClass": "secondary-wire",
   "asOf": "2022-12-01",
   "url": "https://www.offshore-technology.com/news/aramco-oil-refiner-orlen/",
   "nextPublish": "as-events"
  },
  {
   "publisher": "A-04 Poland mass-balance model (Hormuz-calibrated, dimensionally-correct stock accounting)",
   "sourceClass": "modelled",
   "asOf": "2026-06-26",
   "url": "n/a",
   "nextPublish": "n/a"
  }
 ]
}
```

## a6627c0dd9e8fb279
**Role:** You are an A-04 consumer subagent for Vietnam …
```json
{
 "country": "Vietnam",
 "todayDays": 40.3,
 "method": "published-triangulated",
 "confidence": "Inferred-triangulated",
 "hormuzDependenceShare": 0.88,
 "divergenceFlag": "DIVERGENCE >15%: Two estimates disagree on both level and basis. (1) PUBLISHED (higher tier, headline): Vietnam's official/state-media reserve was ~20 days demand-cover pre-war and was reported BOOSTED to ~26 days demand-cover by May 2026 amid the crisis (VietnamNet). On the A-03 fixed denominator D=0.358 mb/d this equals ~40 days (26d x 0.555 mb/d demand / 0.358). 'Today' (26 Jun) is post-ceasefire with Hormuz flow recovered to its highest since the 28 Feb war start (4.8 mb/d) and Kuwaiti/Persian-Gulf barrels — ~all of Vietnam's crude — largely moving again, so coverage is at/above the published rebuilt level. (2) MASS-BALANCE-MODELLED (lower tier, cross-check): a Vietnam-calibrated net drawdown over the 118-day war window yields ~16 days on the D-basis (~11 days demand-basis), reflecting the acute Mar-Apr Kuwaiti-feedstock shortfall, only ~6 days of secured non-ME replacement, and rationing. The model UNDER-credits the late-June flow recovery + emergency procurement that the published figure captures. BASIS CAVEAT: published days are demand-basis (~0.555 mb/d); headline restated on D-basis=0.358 per A-03, inflating the day count vs the raw demand-cover figure. Headline = higher (published) tier per rule.",
 "sourceClassesUsed": [
  "official-primary",
  "secondary-wire",
  "forecaster",
  "modelled"
 ],
 "massBalance": {
  "replacementMbd": 0.0424,
  "demandReliefMbd": 0.0333,
  "blockedMbd": 0.1201,
  "netRateR_mbd": -0.0444,
  "tDays": 118,
  "sReleaseMmb": 0,
  "deltaStockMmb": -5.24,
  "denominatorMbd": 0.358,
  "deltaCoverageDays": -14.6,
  "perCountryCalibrationNote": "Calibrated to Vietnam, NOT global average. Crude imports ~14.1 Mt/yr = ~0.282 mb/d (7.3 bbl/t Kuwaiti medium-sour). Hormuz dependence of crude ~0.88 (Persian Gulf share; virtually all Kuwaiti crude, 100% Hormuz-routed; among the most Hormuz-exposed importers globally — IEA-derived ME share 85-92%). Hormuz-dependent crude ~0.248 mb/d. Time-weighted avg blocked fraction 0.484 over the 118d window: Phase1 Mar-Apr ~70% blocked (acute Kuwaiti-feedstock cutoff, near-total for VN), Phase2 May ~40%, Phase3 Jun ~18% as Kpler flow recovered to 4.8/15=32% of baseline => blocked ~0.120 mb/d. Replacement ~0.042 mb/d (VN secured ~4 mb non-ME crude ~6 days consumption + ~1 mb US WTI, asked Japan/Korea for help). Demand relief ~0.033 mb/d (~6% of 0.555 mb/d demand via rationing, office closures, conservation, ethanol/cassava substitution). S_release=0: Vietnam is NOT an IEA member and made no SPR/collective-action contribution; drawing its own thin reserves IS the negative deltaStock, not an exogenous release. Net R=-0.044 mb/d => deltaStock -5.24 mb => -14.6 days on D=0.358. Modelled today (D-basis) ~16 days; superseded as headline by the published recovery figure per method priority."
 },
 "sources": [
  {
   "publisher": "VietnamNet (Vietnam fuel reserves boosted to 26 days)",
   "sourceClass": "secondary-wire",
   "asOf": "2026-05",
   "nextPublish": "as-events",
   "url": "https://vietnamnet.vn/en/vietnam-boosts-fuel-reserves-to-26-days-amid-global-volatility-2505410.html"
  },
  {
   "publisher": "East Asia Forum (oil shock tests Vietnam; ~88% Persian Gulf crude dependence; ~32 days demand-cover)",
   "sourceClass": "secondary-wire",
   "asOf": "2026-05-29",
   "nextPublish": "as-events",
   "url": "https://eastasiaforum.org/2026/05/29/the-oil-shock-tests-vietnams-overstretched-economy/"
  },
  {
   "publisher": "IEA Reliance on Middle East Oil and Gas Supplies by Country (data tool)",
   "sourceClass": "official-primary",
   "asOf": "2026",
   "nextPublish": "periodic",
   "url": "https://www.iea.org/data-and-statistics/data-tools/reliance-on-middle-east-oil-and-gas-supplies-by-country"
  },
  {
   "publisher": "The-Shiv / Vietnam customs (85% ME, virtually all Kuwait; 11.35 Mt Kuwaiti crude)",
   "sourceClass": "secondary-wire",
   "asOf": "2026",
   "nextPublish": "as-events",
   "url": "https://the-shiv.com/vietnams-persian-gulf-trade-exposure-2026-unpacked/"
  },
  {
   "publisher": "MUFG Research (Vietnam-Hormuz closure: oil/energy shortages, ~20-day reserves, 85% ME/Kuwait)",
   "sourceClass": "forecaster",
   "asOf": "2026-03-18",
   "nextPublish": "as-events",
   "url": "https://www.mufgresearch.com/fx/vietnam-strait-of-hormuz-closure-oil-and-energy-shortages-key-for-vnd-18-march-2026/"
  },
  {
   "publisher": "Vietnam News (Viet Nam triggers fuel contingency plan over Middle East crisis)",
   "sourceClass": "secondary-wire",
   "asOf": "2026",
   "nextPublish": "as-events",
   "url": "https://vietnamnews.vn/economy/1766774/viet-nam-triggers-fuel-contingency-plan-over-middle-east-crisis.html"
  },
  {
   "publisher": "The Diplomat (Vietnam asks Japan, South Korea for help accessing crude; ~4 mb non-ME procurement = ~6 days)",
   "sourceClass": "secondary-wire",
  
… (truncated)
```

## a6bb4038be5aa720c
**Role:** You are an A-04 consumer subagent for USA …
```json
{
 "country": "USA",
 "todayDays": null,
 "method": "absent",
 "confidence": "Absent",
 "hormuzDependenceShare": 0.08,
 "sourceClassesUsed": [
  "official-primary",
  "secondary-wire"
 ],
 "divergenceFlag": "EXCLUSION GATE FIRED — \"days of net import coverage\" is undefined for the USA on the canonical IEA net-imports basis. The US is a NET PETROLEUM EXPORTER (~5.8 mb/d net crude+products exports, record in Apr 2026, sustained May/Jun): the IEA 90-day net-import-coverage denominator is <=0, so mass-balance (Delta_days = Delta_stock / D) is dimensionally undefined, and IEA itself does NOT bind or publish a \"days of net imports\" figure for the US. No >=2 independent published classes report a US import-coverage-days number, so PUBLISHED-TRIANGULATED also fails. DIRECTIONAL CAVEAT (load-bearing): even on a narrower CRUDE-ONLY net-import basis (US still net crude importer ~2.2 mb/d in 2025, declining), the Hormuz shock is COVERAGE-POSITIVE for the US, not erosive — (a) Hormuz dependence is only ~8% of crude imports (~490 kb/d Middle East Gulf in 2025), part of which (Saudi) has Red Sea/Petroline pipeline bypass, so true blocked US crude is a small fraction of 0.49 mb/d and partly offset by the strait still flowing at ~32%; (b) US net exports ROSE to records during the disruption as the US became the marginal replacement supplier to the world; (c) the 411->331 mb SPR drawdown is a POLICY release (172 mb IEA collective-action contribution), and SPR is explicitly excluded from the IEA import-coverage column per A-04 inputs. A mass-balance forced onto the crude-only basis would yield a near-zero-to-slightly-positive Delta_days dominated by modelling noise, with no stable published beforeDays — hence ABSENT rather than a fabricated number. hormuzDependenceShare=0.08 is well-supported (EIA: 8% of 6.2 mb/d 2025 crude imports from Middle East Gulf); treat as upper bound on Hormuz-transiting crude given partial pipeline bypass.",
 "sources": [
  {
   "publisher": "U.S. EIA — Today in Energy: The Middle East Gulf was source for 8% of 2025 U.S. crude oil imports",
   "sourceClass": "official-primary",
   "asOf": "2026",
   "nextPublish": "as-events",
   "url": "https://www.eia.gov/todayinenergy/detail.php?id=67407"
  },
  {
   "publisher": "U.S. EIA — Oil imports and exports; US net exporter status; net crude imports 2.2 mb/d 2025",
   "sourceClass": "official-primary",
   "asOf": "2025",
   "nextPublish": "annual",
   "url": "https://www.eia.gov/energyexplained/oil-and-petroleum-products/imports-and-exports.php"
  },
  {
   "publisher": "IEA — Oil security and emergency response (US is a net exporter, not bound by the 90-day net-import rule; no published US days-of-net-imports)",
   "sourceClass": "official-primary",
   "asOf": "2026",
   "nextPublish": "as-events",
   "url": "https://www.iea.org/about/oil-security-and-emergency-response"
  },
  {
   "publisher": "IEA — Oil Market Report May 2026 (US crude+products net exports record 5.8 mb/d in April amid Hormuz disruption)",
   "sourceClass": "official-primary",
   "asOf": "2026-05",
   "nextPublish": "monthly",
   "url": "https://www.iea.org/reports/oil-market-report-may-2026"
  },
  {
   "publisher": "U.S. EIA — Weekly U.S. Net Imports of Crude Oil and Petroleum Products (WTTNTUS2)",
   "sourceClass": "official-primary",
   "asOf": "2026-06",
   "nextPublish": "weekly (Wed)",
   "url": "https://www.eia.gov/dnav/pet/hist/LeafHandler.ashx?n=PET&s=WTTNTUS2&f=W"
  }
 ],
 "massBalance": {
  "blockedMbd": 0,
  "replacementMbd": 0,
  "demandReliefMbd": 0,
  "netRateR_mbd": 0,
  "tDays": 118,
  "sReleaseMmb": 172,
  "deltaStockMmb": 0,
  "denominatorMbd": 0,
  "deltaCoverageDays": 0,
  "todayDays": 0,
  "perCountryCalibrationNote": "Mass-balance NOT executed — left at zeros because it is dimensionally undefined for the USA. The IEA import-coverage denominator D (net imports) is <=0: the US is a net petroleum exporter (~-5.8 mb/d crude+products), so Delta_days = Delta_stock / D cannot be formed (division by a non-positive net-import base). On a crude-only basis the US is still a marginal net crude importer (~2.2 mb/d, 2025), but the Hormuz shock is coverage-POSITIVE not erosive for the US: blockedMbd is a small fraction of the ~0.49 mb/d Middle East Gulf crude import (8% of 6.2 mb/d), partly bypassable via Saudi Petroline/Red Sea and partly still flowing (strait at ~32% of prewar), while US net exports rose to records as the US supplied replacement barrels to the world. The 411->331 mb SPR draw is the 172 mb IEA collective-action policy release (sReleaseMmb=172, ~1.4 mb/d over ~118 days), strategic-only and EXCLUDED from the IEA import-coverage column per A-04 inputs. No stable published beforeDays exists for the US on the net-import basis (IEA publishes none for net exporters), so the chain resolves to ABSENT / todayDays=null rather than a modelled figure."
 }
}
```

## a6d382e5f443d2dab
**Role:** You are an A-03 consumer subagent for India …
```json
{
 "country": "India",
 "beforeDays": 74,
 "denominatorMbd": 4.84,
 "stockBasis": "IEA-style total stocks = strategic SPR (ISPRL caverns, ~9-10 days crude / ~5 days at current ~64% fill) + commercial/refiner crude + product stocks. Total-cover figure (NOT strategic-only). India is an IEA ASSOCIATION country, not a member, so it does NOT appear in the IEA 'Oil stocks of IEA countries' / OMR member closing-stock tables; the days-of-net-import-cover number is reconstructed from Indian government (PPAC/MoPNG) and secondary reporting, not from the IEA member tool.",
 "netExporterConvention": "India is a NET CRUDE IMPORTER but a NET PRODUCT EXPORTER. Denominator D uses prior-year (2024) average daily CRUDE net imports ~4.84 Mb/d (IEA), consistent with the basis on which the circulating ~74-day cover figure is computed. On a strict crude+products net-import basis the denominator would be somewhat lower (product exports net out), which would RAISE implied days; the 74-day figure is the conservative crude-import-based cover and is used as reported. Same fixed D applied to 'today'.",
 "confidence": "Inferred-triangulated",
 "sources": [
  {
   "publisher": "IEA",
   "sourceClass": "official-primary",
   "asOf": "2026-03-12",
   "url": "https://iea.blob.core.windows.net/assets/a25ddf53-cd6c-4910-ac90-16bfd28399e7/-12MAR2026_OilMarketReport.pdf",
   "nextPublish": "2026-04-15"
  },
  {
   "publisher": "IEA - Oil Stocks of IEA Countries data tool (India NOT covered; members only)",
   "sourceClass": "official-primary",
   "asOf": "2026-06-26",
   "url": "https://www.iea.org/data-and-statistics/data-tools/oil-stocks-of-iea-countries"
  },
  {
   "publisher": "IEA - India Oil Market / Indian Oil Market Outlook to 2030 (net import basis ~4.6-4.84 Mb/d)",
   "sourceClass": "official-primary",
   "asOf": "2025-01-01",
   "url": "https://iea.blob.core.windows.net/assets/c0c21f22-8159-4f0c-bf42-c5bd3a9b360c/IndianOilMarket-Outlookto2030.pdf"
  },
  {
   "publisher": "Discovery Alert (secondary, ~74 days total incl. commercial; ~9-10 days SPR)",
   "sourceClass": "secondary-wire",
   "asOf": "2025-06-25",
   "url": "https://discoveryalert.com.au/india-strategic-oil-reserves-energy-security-gap/"
  },
  {
   "publisher": "Vajiram & Ravi current affairs (total ~74 days, SPR ~9-10 days)",
   "sourceClass": "secondary-wire",
   "asOf": "2025-06-24",
   "url": "https://vajiramandravi.com/current-affairs/indias-strategic-petroleum-reserves-hidden-vulnerability-in-energy-security/"
  },
  {
   "publisher": "Deccan Chronicle / Kpler (India ~100 mb commercial+strategic, ~40-45 days Hormuz-disruption cover)",
   "sourceClass": "proxy-tanker",
   "asOf": "2025-06-20",
   "url": "https://www.deccanchronicle.com/amp/business/economics/india-has-25-days-of-crude-oil-and-refined-oil-stocks-govt-sources-1941175"
  }
 ]
}
```

## a712cb24af6c54892
**Role:** You are an A-03 consumer subagent for UK …
```json
{
 "country": "United Kingdom",
 "beforeDays": 104,
 "denominatorMbd": 0.67,
 "stockBasis": "IEA TOTAL stocks (strategic + commercial), industry-held. UK holds NO dedicated government/public strategic reserve; its entire IEA obligation is met via obligated industry stocks (Compulsory Stocking Obligation). 'beforeDays' = IEA days of net-import cover on the total-stock basis (total stocks x ~0.9 usable / D). Total stocks ~76.6 Mbbl (closest published total-stock figure, pre the 11 Mar 2026 coordinated release, used as Dec-2025 proxy); cross-checked vs official UK statement that the UK held 11.2 Mt of stocks in 2024 'exceeding 90 days'.",
 "netExporterConvention": "UK is a NET IMPORTER of both crude (primary oils) and oil products since 2013; net-import denominator is well-defined and positive. 2024 net imports = 20 Mt primary oils + 13 Mt products ~= 33 Mt/yr.",
 "confidence": "Modelled-EST",
 "sources": [
  {
   "publisher": "IEA",
   "sourceClass": "official-primary",
   "url": "https://www.iea.org/data-and-statistics/data-tools/oil-stocks-of-iea-countries",
   "asOf": "2025-12",
   "nextPublish": "monthly with OMR"
  },
  {
   "publisher": "IEA Oil Market Report December 2025",
   "sourceClass": "official-primary",
   "url": "https://www.iea.org/reports/oil-market-report-december-2025",
   "asOf": "2025-12-11"
  },
  {
   "publisher": "UK DESNZ - Digest of UK Energy Statistics (DUKES) 2025, Chapter 3",
   "sourceClass": "official-primary",
   "url": "https://assets.publishing.service.gov.uk/media/68dbe4c7c487360cc70c9f5f/DUKES_2025_Chapter_3.pdf",
   "asOf": "2025-07-31",
   "nextPublish": "2026-07 (annual)"
  },
  {
   "publisher": "GOV.UK - UK joins IEA members in coordinated oil stock release",
   "sourceClass": "official-primary",
   "url": "https://www.gov.uk/government/news/uk-joins-iea-members-in-coordinated-oil-stock-release",
   "asOf": "2026-03-11"
  },
  {
   "publisher": "IndexBox (secondary wire on UK/IEA release; UK ~76.6 Mbbl total stocks)",
   "sourceClass": "secondary-wire",
   "url": "https://www.indexbox.io/blog/uk-joins-international-partners-in-coordinated-oil-stock-release/",
   "asOf": "2026-03-11"
  },
  {
   "publisher": "Statista - Oil stocks of IEA countries in days of net imports",
   "sourceClass": "secondary-wire",
   "url": "https://www.statista.com/chart/36019/oil-stocks-of-iea-countries-measured-in-days-of-net-imports/",
   "asOf": "2025"
  }
 ]
}
```

## a72e67d8f068504b3
**Role:** You are an A-03 consumer subagent for Germany …
```json
{
 "country": "Germany",
 "beforeDays": null,
 "denominatorMbd": 1.7,
 "stockBasis": "IEA total-stock basis (strategic + commercial)",
 "netExporterConvention": "Germany is a structural net oil importer; net-exporter convention not applicable. Denominator D = prior-year (2024) average daily net imports of crude + petroleum products, the same fixed D used for the \"today\" comparison. D approximated at ~1.7 mb/d by triangulation (crude imports ~1.69 mb/d, Dec-2024, CEIC/OPEC; total liquids net imports for Germany in the ~1.6-1.8 mb/d range), NOT the IEA-defined net-import series, which is unavailable here.",
 "confidence": "Absent",
 "sources": [
  {
   "publisher": "IEA — Oil stocks of IEA countries (Data Tools)",
   "sourceClass": "official-primary",
   "asOf": "2026-06-26 (access attempted)",
   "url": "https://www.iea.org/data-and-statistics/data-tools/oil-stocks-of-iea-countries",
   "nextPublish": "monthly"
  },
  {
   "publisher": "IEA — IEA total oil stocks, December 2025 (chart)",
   "sourceClass": "official-primary",
   "asOf": "2026-06-26 (access attempted, blocked by egress policy 403)",
   "url": "https://www.iea.org/data-and-statistics/charts/iea-total-oil-stocks-december-2025",
   "nextPublish": "monthly"
  },
  {
   "publisher": "IEA — Oil Market Report, December 2025",
   "sourceClass": "official-primary",
   "asOf": "2025-12",
   "url": "https://www.iea.org/reports/oil-market-report-december-2025",
   "nextPublish": "monthly"
  },
  {
   "publisher": "Erdoelbevorratungsverband (EBV) — Geschaeftsbericht 2024/2025 (strategic-only, EXCLUDED basis)",
   "sourceClass": "proxy-satellite",
   "asOf": "2025-12-31",
   "url": "https://www.ebv-oil.org/cms/pdf/EBV-GB_2024_2025.pdf",
   "nextPublish": "annual"
  },
  {
   "publisher": "CEIC / OPEC — Germany crude oil imports",
   "sourceClass": "secondary-wire",
   "asOf": "2024-12",
   "url": "https://www.ceicdata.com/en/indicator/germany/crude-oil-imports",
   "nextPublish": "monthly"
  }
 ]
}
```

## a755347056404387c
**Role:** You are an A-03 consumer subagent for Philippines …
```json
{
 "country": "Philippines",
 "beforeDays": null,
 "denominatorMbd": 0.49,
 "stockBasis": "IEA-total-stock-basis NOT APPLICABLE: Philippines is a non-IEA country (IEA Association country since 2017, not an IEA member). The IEA publishes no days-of-net-import-cover for it; no IEA strategic/commercial total-stock series exists. Per the NON-IEA rule, beforeDays is null (Absent) and no IEA-style figure is imputed. National fragments exist but are a DIFFERENT methodology (Modelled-EST): the DOE 'Oil Monitor' publishes a national 'days of supply' = total industry stocks (crude + finished products held by refiners/importers, no government SPR) measured against domestic CONSUMPTION, not net imports. That gross-consumption-cover metric ran roughly 45-64 days across mid-2025 to early-2026; no clean isolated Dec-2025 print was located and it is not convertible to IEA net-import-days. Statutory minimum inventory requirement (MIR): 30 days (crude+product) for refiners e.g. Petron, 15 days finished product for other players, 7 days LPG, plus a 15-day statutory floor vs IEA-recommended 30 — these are regulatory floors, not measured stock levels.",
 "netExporterConvention": "Not applicable — Philippines is an unambiguous net oil importer (2024 demand ~505 kb/d vs indigenous crude production ~14 kb/d). No net-exporter sign convention needed.",
 "confidence": "Absent",
 "sources": [
  {
   "publisher": "International Energy Agency (IEA) — Philippines country page",
   "sourceClass": "official-primary",
   "url": "https://www.iea.org/countries/philippines/oil",
   "asOf": "2026-06-26",
   "nextPublish": "continuous"
  },
  {
   "publisher": "IEA — Oil security and emergency response (membership / 90-day obligation; Philippines is Association not member)",
   "sourceClass": "official-primary",
   "url": "https://www.iea.org/about/oil-security-and-emergency-response",
   "asOf": "2026-06-26",
   "nextPublish": "continuous"
  },
  {
   "publisher": "DOE Philippines — Oil Monitor (national days-of-supply, total industry stocks vs consumption; Modelled-EST national fragment, NOT IEA net-import-days)",
   "sourceClass": "official-primary",
   "url": "https://doe.gov.ph/articles/group/liquid-fuels?category=Oil+Monitor&display_type=Card",
   "asOf": "2025-07-15",
   "nextPublish": "weekly/biweekly"
  },
  {
   "publisher": "Rappler — Philippine SPR / 15-day statutory vs 30-day IEA threshold, no government strategic reserve",
   "sourceClass": "secondary-wire",
   "url": "https://www.rappler.com/business/philippines-strategic-petroleum-reserves-oil-buffer-stocks/",
   "asOf": "2025",
   "nextPublish": "n/a"
  },
  {
   "publisher": "Worldometer / EIA-derived — Philippines 2024 petroleum demand ~505 kb/d, indigenous crude production ~14 kb/d (denominator triangulation, Modelled-EST)",
   "sourceClass": "proxy-satellite",
   "url": "https://www.worldometers.info/oil/philippines-oil/",
   "asOf": "2024",
   "nextPublish": "annual"
  },
  {
   "publisher": "EIA International — Philippines country analysis (net importer, crude+product import dependence)",
   "sourceClass": "official-primary",
   "url": "https://www.eia.gov/international/analysis/country/PHL",
   "asOf": "2025",
   "nextPublish": "annual"
  }
 ]
}
```

## a7a65f21b406bc960
**Role:** You are an A-04 consumer subagent for Japan …
```json
{
 "country": "Japan",
 "todayDays": 205,
 "method": "published-triangulated",
 "confidence": "Inferred-triangulated",
 "hormuzDependenceShare": 0.9,
 "divergenceFlag": "No tier-divergence on the headline value (multiple independent classes converge on the 205-day, 9 May 2026 official figure, well within the 15% band). TWO secondary caveats flagged: (1) DATA-AGE, not source-disagreement — the last published days-of-consumption print is 9 May 2026 (205 days); no June print exists yet. 'Today' (26 Jun) is the May-9 figure held forward, justified because (a) PM Takaichi declared no further reserve releases after May once June crude was secured, halting the release-driven drawdown, and (b) Hormuz flow recovered to ~4.8 mb/d and Japan's alternative non-Hormuz procurement ran ~1.4 mb/d, so stock levels stabilize-to-modestly-recover and days-coverage stops declining around the May floor. True late-June value is therefore 205 days or modestly higher; 205 is the conservative anchor. (2) HORMUZ-SHARE definitional split: ~90% of CRUDE imports via Hormuz (ORF/Hafnium) vs ~70% when measured across all oil incl. products and broader Middle East routing (S&P/Global Times). Used 0.90 as the crude-relevant figure for crude-import coverage. Note also UNIT: Japan's published coverage is in days of DOMESTIC CONSUMPTION (the official METI/ANRE metric), not days of net imports against A-03's D=2.4 mb/d; the published-domestic-consumption metric is reported as the authoritative country figure per Method (1).",
 "sourceClassesUsed": [
  "official-primary",
  "secondary-wire",
  "forecaster"
 ],
 "sources": [
  {
   "publisher": "S&P Global Commodity Insights (Japan PM: no additional reserve release after securing June crude; 205 days as of 9 May 2026 = 121 national + 84 private + 1 joint)",
   "sourceClass": "secondary-wire",
   "asOf": "2026-05-12",
   "nextPublish": "as-events",
   "url": "https://www.spglobal.com/energy/en/news-research/latest-news/crude-oil/051226-japan-pm-says-no-additional-oil-reserve-release-after-securing-enough-crude-for-june"
  },
  {
   "publisher": "OpenGov.jp (Japan's Petroleum Reserves — METI/ANRE-derived official stock-day statistics)",
   "sourceClass": "official-primary",
   "asOf": "2026-06",
   "nextPublish": "monthly",
   "url": "https://opengov.jp/en/economy/energy/petroleum-reserves/"
  },
  {
   "publisher": "The Japan Times (Japan begins largest-ever strategic reserve release; 80 mb = 15 days private + 1 month national, from March 2026; end-2025 baseline ~470 mb / 254 days)",
   "sourceClass": "secondary-wire",
   "asOf": "2026-03-16",
   "nextPublish": "as-events",
   "url": "https://www.japantimes.co.jp/business/2026/03/16/economy/oil-release-japan/"
  },
  {
   "publisher": "ORF Middle East (How Middle East Turmoil Reverberates Through Japan's Energy System — ~90% of crude imports via Hormuz; UAE 44% / Saudi 40% / Kuwait 7% / Qatar 4%)",
   "sourceClass": "secondary-wire",
   "asOf": "2026",
   "nextPublish": "as-events",
   "url": "https://orfme.org/expert-speak/how-middle-east-turmoil-reverberates-through-japans-energy-system/"
  },
  {
   "publisher": "EIA Today in Energy (Japan = 10.9% of Hormuz crude+condensate flows, Q1 2025)",
   "sourceClass": "official-primary",
   "asOf": "2025",
   "nextPublish": "as-events",
   "url": "https://www.eia.gov/todayinenergy/detail.php?id=65504"
  },
  {
   "publisher": "Kpler via CNBC (Hormuz flow ~4.8 mb/d late June 2026, supporting stock-stabilization trajectory)",
   "sourceClass": "forecaster",
   "asOf": "2026-06-24",
   "nextPublish": "daily",
   "url": "https://www.cnbc.com/2026/06/24/oil-tanker-strait-hormuz-iran-deal.html"
  }
 ]
}
```

## a8142dbc62a1e4c96
**Role:** You are an A-11 producer subagent for Qatar (Gulf exporter) …
```json
{
 "country": "Qatar",
 "exportCoverDays": 10.5,
 "usableStockMmb": {
  "domesticInsideHormuz": 10,
  "domesticOutsideHormuz": 0,
  "leasedAbroad": 0
 },
 "storageUtilPct": 92,
 "bypassAdjExportMbd": 0,
 "shutInMbd": 0.95,
 "confidence": "Inferred-triangulated",
 "chokepointNote": "Qatar oil (crude + field condensate) is 100% Hormuz-captive with ZERO bypass capacity — no crude pipeline to Red Sea/Gulf of Oman exists (only Saudi Arabia's East-West and UAE's Habshan-Fujairah bypass Hormuz; Qatar, like Iraq/Kuwait/Bahrain, has none). All export infrastructure sits INSIDE the strait: Halul Island (the offshore crude storage/loading hub, ~96km NE of Doha, 11 floating-roof tanks, ~5 mmb crude capacity), Mesaieed (condensate/refined-product terminal + 80 kb/d crude / 363 kb/d condensate refining), and Ras Laffan (primarily LNG but also condensate). Pre-war crude+condensate seaborne exit ~0.9-1.0 mb/d (crude exports ~375 kb/d plus the bulk of ~620 kb/d field condensate), all Hormuz-routed. CRITICAL co-product linkage: Qatari condensate is co-produced with North Field gas, so when QatarEnergy halted LNG/gas production after the 28 Feb war onset and the mid-March Iranian strikes on Ras Laffan (force majeure declared; Trains 4 and 6 damaged, ~17% of LNG capacity sidelined for years, full repair 3-5yr per CEO al-Kaabi), condensate output collapsed involuntarily alongside it — the shut-in is partly a gas-side casualty, not a deliberate oil decision. storageUtilPct is the binding constraint: oil-side above-ground tankage is small (~8-12 mmb usable, all at Halul/Mesaieed inside Hormuz), giving only ~10-11 days of pre-crisis export cover. Qatar cannot store its way through even a short closure; with no bypass and gas-tethered condensate, it shuts in within days rather than filling tanks. shutInMbd ~0.95 reflects production foregone at peak closure (Mar-early Jun); barrels went UNPRODUCED (left in reservoir / gas not flowed), NOT into storage. June 2026: QatarEnergy offered first crude loadings to buyers since the war began and moved empty hulls back through Hormuz (4 Qatari tankers on 22-23 Jun, largest single-day movement since Feb) as the ~4.8 mb/d contested-but-flowing strait partially reopened under the fragile 17 Jun MoU ceasefire; oil-export recovery is real but partial and reversible (a 21 Jun Barzan/Ras Laffan start-up explosion and IRGC turn-back orders complicate the ramp). EST figures: exact Qatari oil-storage tankage volumes, June crude-export tonnage, and current shut-in are not separately published (JODI lags ~2mo and is weak for Gulf states); values triangulated from EIA Qatar brief (Oct 2025), Halul Island specs, and June 2026 wire reporting.",
 "sources": [
  {
   "publisher": "EIA Country Analysis Brief: Qatar",
   "sourceClass": "official-primary",
   "asOf": "2025-10-20",
   "nextPublish": "2026-annual",
   "url": "https://www.eia.gov/international/content/analysis/countries_long/Qatar/Qatar2025.pdf"
  },
  {
   "publisher": "Statista / IMF (Qatar crude exports & production)",
   "sourceClass": "secondary-wire",
   "asOf": "2025-12-31",
   "url": "https://www.statista.com/statistics/1106219/qatar-exports-of-crude-oil/"
  },
  {
   "publisher": "Wikipedia - Halul Island (crude storage specs)",
   "sourceClass": "secondary-wire",
   "asOf": "2025-12-31",
   "url": "https://en.wikipedia.org/wiki/Halul_Island"
  },
  {
   "publisher": "OilPrice.com - Qatar Offers First Crude Loadings to Buyers Since War Began",
   "sourceClass": "secondary-wire",
   "asOf": "2026-06-24",
   "nextPublish": "as-events",
   "url": "https://oilprice.com/Latest-Energy-News/World-News/Qatar-Offers-First-Crude-Loadings-to-Buyers-Since-War-Began.html"
  },
  {
   "publisher": "OilPrice.com - Qatar LNG Hit Turns Into Multi-Year Crisis (Ras Laffan damage, FM, condensate co-product)",
   "sourceClass": "secondary-wire",
   "asOf": "2026-06-23",
   "nextPublish": "as-events",
   "url": "https://oilprice.com/Energy/Natural-Gas/Qatar-LNG-Hit-Turns-Into-Multi-Year-Crisis.html"
  },
  {
   "publisher": "The National - Ras Laffan may not be fully online for months",
   "sourceClass": "secondary-wire",
   "asOf": "2026-04-09",
   "url": "https://www.thenationalnews.com/business/energy/2026/04/09/months-expected-until-qatars-ras-laffan-lng-site-resumes-full-operations/"
  },
  {
   "publisher": "Rigzone - Qatar Adds Momentum to Mideast Oil Trade Rebound",
   "sourceClass": "secondary-wire",
   "asOf": "2026-06-25",
   "url": "https://www.rigzone.com/news/wire/qatar_adds_momentum_to_mideast_oil_trade_rebound-25-jun-2026-183985-article/"
  }
 ]
}
```

## a864ed8fa8994d3fb
**Role:** You are an A-03 consumer subagent for Vietnam …
```json
{
 "country": "Vietnam",
 "beforeDays": null,
 "denominatorMbd": 0.358,
 "stockBasis": "IEA total-stock basis (strategic+commercial). Not populated for Vietnam (non-IEA; no published IEA days-of-cover). National reserve fragments are Modelled-EST and not imputed.",
 "confidence": "Absent",
 "netExporterConvention": "Net importer of total oil (crude+products combined). Vietnam imports crude for its Nghi Son and Dung Quat refineries (~9.1 Mt crude in 2024-25, ~86% from Kuwait) and imports refined products, while exporting some domestic sweet crude; on a combined crude+products basis it is a structural net importer. Denominator D = prior-year (2024) avg daily net import dependence, triangulated as consumption minus domestic production. Same fixed D applied to 'before' (Dec-2025) and 'today'.",
 "sources": [
  {
   "publisher": "IEA — Viet Nam country/oil page",
   "sourceClass": "official-primary",
   "asOf": "2026-06-26",
   "url": "https://www.iea.org/countries/viet-nam/oil",
   "nextPublish": "n/a — IEA does not publish days-of-net-import-cover for non-member Vietnam (page returned 403 on fetch; consulted via search index)"
  },
  {
   "publisher": "Worldometer — Vietnam Oil (consumption 555,218 b/d; production 197,167 b/d; base year 2024) used to triangulate net-import denominator",
   "sourceClass": "proxy-satellite",
   "asOf": "2024",
   "url": "https://www.worldometers.info/oil/vietnam-oil/",
   "nextPublish": "annual"
  },
  {
   "publisher": "VietnamNet — 'Vietnam boosts fuel reserves to 26 days amid global volatility' (national fragment, non-IEA basis, Modelled-EST)",
   "sourceClass": "secondary-wire",
   "asOf": "2025",
   "url": "https://vietnamnet.vn/en/vietnam-boosts-fuel-reserves-to-26-days-amid-global-volatility-2505410.html",
   "nextPublish": "n/a"
  },
  {
   "publisher": "VietnamNet — 'Vietnam explores viable path to 90-day fuel reserves' (commercial 20d + distributor 5d; national reserve ~7d; ~65d aggregate target language; Modelled-EST)",
   "sourceClass": "secondary-wire",
   "asOf": "2025",
   "url": "https://vietnamnet.vn/en/vietnam-explores-viable-path-to-90-day-fuel-reserves-2504139.html",
   "nextPublish": "n/a"
  },
  {
   "publisher": "Vietnam Export Data — crude import volume ~9.1 Mt 2024-25 (~86% Kuwait); domestic crude production ~8.1 Mt 2024 (supports net-importer convention)",
   "sourceClass": "secondary-wire",
   "asOf": "2025",
   "url": "https://www.vietnamexportdata.com/blogs/vietnam-crude-oil-imports-2024-25-analysis",
   "nextPublish": "n/a"
  }
 ]
}
```

## a96092216b90da6f7
**Role:** You are A-00 Frame Verification …
```json
{
 "corroborated": true,
 "stop": false,
 "stopReason": "",
 "spine": {
  "warStart": "2026-02-28 — US/Israel joint airstrikes on Iran began midmorning 28 Feb 2026 (US codename Operation Epic Fury; Israeli codename Operation Roaring Lion); ~900 strikes in first 12h; Khamenei reported killed. Nature = airstrike/air-war campaign, NOT a declared strait closure. War ran 28 Feb–17 Jun 2026 (MoU signed 17 Jun).",
  "hormuzClosureDeclared": "Two distinct events: (a) de facto shipping disruption from 28 Feb 2026 at war onset; (b) FORMAL IRGC closure declaration broadcast ~20 Jun 2026 (reported by Al Jazeera 22 Jun), citing Israeli operations in Lebanon and ceasefire breach. The legal declaration date (20 Jun) is DIFFERENT from the airstrike start date (28 Feb).",
  "currentHormuzStatus": "Contested: LEGALLY declared shut by Iran's IRGC and asserted under Iranian routing authority, but NOT physically sealed. Vessels continue transiting — US CENTCOM cited 55 transits on 20 Jun; PortWatch/IMF data showed near-collapse to ~5/day (vs ~93 baseline) with majority AIS-dark/Iranian-linked. Iran's foreign ministry simultaneously claimed shipping 'operating normally.' Status as of 26 Jun 2026 = legally closed, physically reduced-but-open, fragile 60-day ceasefire in effect.",
  "ieaReleaseVolume": "400 million barrels (400 mb) — IEA's own figure. Agreed unanimously by IEA member countries on 11 March 2026; largest collective action in IEA history (6th ever; prior: 1991, 2005, 2011, 2x 2022). Exceeds the 183 mb 2022 Russia-Ukraine release. Asia-Oceania stocks immediate; Americas/Europe from end-March."
 },
 "sources": [
  {
   "publisher": "International Energy Agency (IEA)",
   "sourceClass": "official-primary",
   "asOf": "2026-03-11",
   "url": "https://www.iea.org/news/iea-member-countries-to-carry-out-largest-ever-oil-stock-release-amid-market-disruptions-from-middle-east-conflict",
   "nextPublish": "IEA Oil Market Report monthly"
  },
  {
   "publisher": "U.S. Naval Institute (USNI News)",
   "sourceClass": "secondary-wire",
   "asOf": "2026-02-28",
   "url": "https://news.usni.org/2026/02/28/u-s-israel-launch-operation-epic-fury-against-iran-tehran-retaliates-across-region"
  },
  {
   "publisher": "Al Jazeera Media Network",
   "sourceClass": "secondary-wire",
   "asOf": "2026-06-22",
   "url": "https://www.aljazeera.com/economy/2026/6/22/shipping-stalls-in-strait-of-hormuz-after-iran-declares-key-waterway-shut"
  },
  {
   "publisher": "Bloomberg",
   "sourceClass": "secondary-wire",
   "asOf": "2026-03-11",
   "url": "https://www.bloomberg.com/news/articles/2026-03-11/iea-confirms-huge-release-of-emergency-oil-stockpiles"
  },
  {
   "publisher": "CNBC",
   "sourceClass": "secondary-wire",
   "asOf": "2026-03-11",
   "url": "https://www.cnbc.com/2026/03/11/iea-oil-reserves-crude-prices-iran-g7-energy.html"
  },
  {
   "publisher": "NPR",
   "sourceClass": "secondary-wire",
   "asOf": "2026-02-28",
   "url": "https://www.npr.org/2026/02/28/nx-s1-5730352/world-leaders-reaction-operation-epic-fury"
  },
  {
   "publisher": "U.S. Congress / CRS (congress.gov)",
   "sourceClass": "official-primary",
   "asOf": "2026",
   "url": "https://www.congress.gov/crs-product/R45281"
  },
  {
   "publisher": "NBC News",
   "sourceClass": "secondary-wire",
   "asOf": "2026-06",
   "url": "https://www.nbcnews.com/data-graphics/strait-of-hormuz-ports-traffic-trump-us-iran-war-rcna331507"
  },
  {
   "publisher": "Encyclopaedia Britannica",
   "sourceClass": "secondary-wire",
   "asOf": "2026-06",
   "url": "https://www.britannica.com/event/2026-Iran-war"
  }
 ],
 "excluded": [
  "hormuzstraitmonitor.com — SELF-CITATION GUARD: single-purpose Hormuz monitor/blog of unknown provenance matching the operator's own Hormuz Dashboard profile; excluded as the operator's dashboard or a derivative.",
  "straits.live — single-purpose 'live tracker / Day-116 counter' site of unknown provenance; excluded under tracker/monitor gate.",
  "global-energy-flow.com/hormuz — single-purpose 'is the strait open today' day-counter tracker of unknown provenance; excluded.",
  "discoveryalert.com.au — content-farm/aggregator blog re-reporting IEA/Hormuz figures; excluded as aggregator, not primary.",
  "armyrecognition.com — secondary defense-trade outlet; not used for primary corroboration.",
  "fddaction.org — advocacy organization policy alert; excluded as opinion/advocacy.",
  "iea.blob.core.windows.net OMR PDF — primary but blocked by egress policy (HTTP 403); IEA figure corroborated via iea.org news pages instead."
 ]
}
```

## a9a2e7457a69f867c
**Role:** You are an A-11 producer subagent for Kuwait (Gulf exporter) …
```json
{
 "country": "Kuwait",
 "exportCoverDays": 4.2,
 "usableStockMmb": {
  "domesticInsideHormuz": 21,
  "domesticOutsideHormuz": 0,
  "leasedAbroad": 7.5
 },
 "storageUtilPct": 90,
 "bypassAdjExportMbd": 0,
 "shutInMbd": 2,
 "confidence": "Inferred-triangulated",
 "chokepointNote": "Kuwait is the purest fully-stranded Hormuz case: 100% of crude/product exports transit Hormuz, ZERO bypass (no operational pipeline; only exploratory talks with neighbors about future bypass capacity). The binding constraint is domestic tank-top, not wellhead: KOC's ~20.9 mb crude storage (South Tank Farm, Ahmadi) sits entirely INSIDE Hormuz on the Gulf coast and filled to tops in Mar-Apr 2026, which is what forced the 20 Apr force majeure (~2 mb/d crude+products) and the production shut-in. CRITICAL distinction for export-cover: the ~21 mb domestic stock provides essentially ZERO export cover because those barrels cannot physically leave when the strait is shut — they are stranded, not deployable. The only export-deployable stock is the ~7.5 mb leased OUTSIDE Hormuz in the Far East (3.5 mb Japan/ENEOS; ~4 mb S.Korea/Ulsan/KNOC). exportCoverDays (4.2) is therefore computed as accessible outside-Hormuz stock (~7.5 mb) / pre-crisis crude export rate (~1.8 mb/d) — a razor-thin buffer. Where the blocked barrels went: NOT into storage (storage was already full) but into shut-in production — output collapsed from ~2.58 mb/d prewar (Feb) to ~0.56 mb/d (Feb-Apr trough, levels last seen post-1991 Iraqi invasion), i.e. ~2.0 mb/d foregone. Kuwait has no Red Sea / outside-Hormuz domestic coastline (unlike Saudi Yanbu), so domesticOutsideHormuz = 0. Note Q8/Europoort Rotterdam tankage is European-refinery feedstock/marketing, not a strategic export-continuity buffer, so excluded from leasedAbroad. As-of 26 Jun: ceasefire-driven recovery underway — KPC lifting FM and targeting 2 mb/d 'within a week' from ~573 kb/d in May; tanks draining but still ~90% full early in the ramp. storageUtilPct peaked at tank-tops (~95-100%) during the FM period.",
 "sources": [
  {
   "publisher": "Bloomberg / Nation Thailand (force majeure)",
   "sourceClass": "secondary-wire",
   "asOf": "2026-04-20",
   "nextPublish": "as-events",
   "url": "https://www.bloomberg.com/news/articles/2026-04-20/kuwait-declares-force-majeure-on-oil-shipments-on-hormuz-halt"
  },
  {
   "publisher": "World Oil (Kuwait FM, exports halted)",
   "sourceClass": "secondary-wire",
   "asOf": "2026-04-20",
   "nextPublish": "as-events",
   "url": "https://www.worldoil.com/news/2026/4/20/kuwait-declares-force-majeure-as-hormuz-disruption-halts-oil-export-flows/"
  },
  {
   "publisher": "Argus Media (Kuwait cuts crude output on Hormuz)",
   "sourceClass": "forecaster",
   "asOf": "2026-03",
   "nextPublish": "as-events",
   "url": "https://www.argusmedia.com/en/news-and-insights/latest-market-news/2798138-kuwait-cuts-crude-output-on-hormuz-disruption-update"
  },
  {
   "publisher": "The National (output to 2 mb/d as Hormuz reopens; 2.58 prewar, 573kb/d May trough)",
   "sourceClass": "secondary-wire",
   "asOf": "2026-06-19",
   "nextPublish": "as-events",
   "url": "https://www.thenationalnews.com/business/energy/2026/06/19/kuwait-to-ramp-up-oil-output-to-two-million-bpd-within-a-week-as-strait-of-hormuz-reopens/"
  },
  {
   "publisher": "Zawya (Kuwait overseas crude storage 7-8 mb Far East; 3.5 mb Japan/ENEOS, ~4 mb Korea/Ulsan)",
   "sourceClass": "secondary-wire",
   "asOf": "2025",
   "nextPublish": "as-events",
   "url": "https://www.zawya.com/en/projects/oil-and-gas/kuwait-ramps-up-overseas-crude-storage-amid-hormuz-risks-h1738wwl"
  },
  {
   "publisher": "Times Kuwait / Kuwait Times (overseas storage; experts urge 100 mb buffer)",
   "sourceClass": "secondary-wire",
   "asOf": "2025",
   "nextPublish": "as-events",
   "url": "https://timeskuwait.com/strategic-reserves-or-costly-gamble-kuwait-weighs-oil-storage-abroad/"
  },
  {
   "publisher": "Stainless Steel World / KOC South Tank Farm (domestic crude storage 16->20.9 mb, Ahmadi, 618kb/tank)",
   "sourceClass": "secondary-wire",
   "asOf": "2026",
   "nextPublish": "as-events",
   "url": "https://stainless-steel-world.net/kuwait-oil-storage-tanks/"
  },
  {
   "publisher": "MEES (Kuwait crude capacity 14-year high ~3.2 mb/d)",
   "sourceClass": "forecaster",
   "asOf": "2025-09-26",
   "nextPublish": "as-events",
   "url": "https://www.mees.com/2025/9/26/corporate/kuwait-crude-oil-capacity-rises-to-14-year-high/b4077330-9ad9-11f0-bf79-f7c74e8e397c"
  },
  {
   "publisher": "OEC / Observatory of Economic Complexity (export destinations: China, Korea, India, Japan)",
   "sourceClass": "secondary-wire",
   "asOf": "2025",
   "nextPublish": "annual",
   "url": "https://oec.world/en/profile/country/kwt"
  }
 ]
}
```

## a9dc04fc4bde55792
**Role:** You are an A-03 consumer subagent for France …
```json
{
 "country": "France",
 "beforeDays": 98,
 "denominatorMbd": 1.25,
 "stockBasis": "IEA TOTAL stocks (strategic + commercial), IEA days-of-net-import-cover basis",
 "netExporterConvention": "Not applicable — France is a structural net oil importer (indigenous crude production ~0.1 mb/d vs net crude+product imports ~1.25 mb/d). Net-import denominator is positive and well-defined; no net-exporter EUI/consumption-day fallback needed.",
 "confidence": "Inferred-triangulated",
 "sources": [
  {
   "publisher": "IEA — Oil Stocks of IEA Countries (data tool) / Oil Market Report Dec-2025",
   "sourceClass": "official-primary",
   "asOf": "2025-12",
   "nextPublish": "monthly with OMR",
   "url": "https://www.iea.org/data-and-statistics/data-tools/oil-stocks-of-iea-countries"
  },
  {
   "publisher": "IEA — IEA total oil stocks, December 2025 (chart)",
   "sourceClass": "official-primary",
   "asOf": "2025-12",
   "nextPublish": "monthly",
   "url": "https://www.iea.org/data-and-statistics/charts/iea-total-oil-stocks-december-2025"
  },
  {
   "publisher": "Euronews — How long can the EU's oil reserves last? (France ~120 mb total stocks; ~90 days net imports / ~61 days consumption EU avg)",
   "sourceClass": "secondary-wire",
   "asOf": "2026-04-03",
   "nextPublish": "n/a",
   "url": "https://www.euronews.com/my-europe/2026/04/03/how-long-can-the-eus-oil-reserves-last"
  },
  {
   "publisher": "Worldometer — France oil (2024 consumption ~1.36-1.51 mb/d, production ~0.106 mb/d for net-import denominator)",
   "sourceClass": "proxy-satellite",
   "asOf": "2024",
   "nextPublish": "annual",
   "url": "https://www.worldometers.info/oil/france-oil/"
  },
  {
   "publisher": "Eurostat — Emergency oil stocks statistics (nrg_stk_oem, days-equivalent, EU-Directive basis cross-check)",
   "sourceClass": "official-primary",
   "asOf": "2025",
   "nextPublish": "monthly",
   "url": "https://ec.europa.eu/eurostat/statistics-explained/index.php?title=Emergency_oil_stocks_statistics"
  }
 ]
}
```

## a9edb8c8f996bb742
**Role:** You are an A-03 consumer subagent for Italy …
```json
{
 "country": "Italy",
 "beforeDays": null,
 "denominatorMbd": null,
 "stockBasis": "IEA total-stock basis (strategic + commercial). See netExporterConvention for denominator definition.",
 "confidence": "Absent",
 "netExporterConvention": "Italy is a net oil importer (crude + products); standard IEA days-of-net-import-cover convention applies. Denominator D = prior-year (CY2024 or 12-month trailing) average daily net imports of crude + products on the IEA basis; same fixed D to be reused for the 'today' calculation. No net-exporter override needed.",
 "sources": [
  {
   "publisher": "IEA — Oil Stocks of IEA Countries (Data Tools)",
   "sourceClass": "official-primary",
   "asOf": "2026-06-26",
   "url": "https://www.iea.org/data-and-statistics/data-tools/oil-stocks-of-iea-countries",
   "nextPublish": "monthly (with OMR)"
  },
  {
   "publisher": "IEA — Oil Market Report, December 2025",
   "sourceClass": "official-primary",
   "asOf": "2025-12",
   "url": "https://www.iea.org/reports/oil-market-report-december-2025",
   "nextPublish": "monthly"
  },
  {
   "publisher": "IEA — Italy Oil Security Policy",
   "sourceClass": "official-primary",
   "asOf": "2025",
   "url": "https://www.iea.org/articles/italy-oil-security-policy",
   "nextPublish": "ad hoc"
  },
  {
   "publisher": "Eurostat — Emergency oil stocks statistics",
   "sourceClass": "secondary-wire",
   "asOf": "2025",
   "url": "https://ec.europa.eu/eurostat/statistics-explained/index.php?title=Emergency_oil_stocks_statistics",
   "nextPublish": "periodic"
  }
 ]
}
```

## aa75d9ebe26c0289f
**Role:** You are an A-03 consumer subagent for South Korea …
```json
{
 "country": "South Korea",
 "beforeDays": 208,
 "denominatorMbd": 1.5,
 "stockBasis": "IEA TOTAL stocks = government/strategic (KNOC + international joint stockpiling) PLUS industry/commercial stocks, expressed as IEA days of net-import cover. NOT strategic-only. Korea total IEA stocks ~200-208 days through end-2025; government-controlled tranche ~100 Mb, with combined gov+industry crude+product fillings against ~400 Mb total storage capacity.",
 "netExporterConvention": "Korea is a net OIL IMPORTER (near-total import dependence; domestic crude production ~43 kb/d vs ~2.5 mb/d consumption). Denominator = prior-year (2024) average daily NET imports per IEA methodology = net imports of crude + products (net of Korea's large refined-product re-exports), which is materially below gross crude imports. Days-of-cover convention applies normally (positive net importer). Same fixed D to be reused for the 'today' reading.",
 "confidence": "Inferred-triangulated",
 "sources": [
  {
   "publisher": "IEA — Oil Stocks of IEA Countries (data tool) / Oil Market Report",
   "sourceClass": "official-primary",
   "url": "https://www.iea.org/data-and-statistics/data-tools/oil-stocks-of-iea-countries",
   "asOf": "2025-12 (IEA total oil stocks, December 2025 chart exists; direct content blocked by egress policy 403)",
   "nextPublish": "monthly OMR"
  },
  {
   "publisher": "Statista (chart 36019, IEA-sourced) — How Long Would Countries' Oil Stocks Last",
   "sourceClass": "secondary-wire",
   "url": "https://www.statista.com/chart/36019/oil-stocks-of-iea-countries-measured-in-days-of-net-imports/",
   "asOf": "2025-03-12 (IEA total-stock basis: Korea 208 days, Japan 200 days)",
   "nextPublish": "n/a"
  },
  {
   "publisher": "U.S. EIA — Today in Energy: China, US, Japan hold most strategic oil inventories in 2025",
   "sourceClass": "official-primary",
   "url": "https://www.eia.gov/todayinenergy/detail.php?id=67504",
   "asOf": "2025 (Korea ~208 days net-import basis; strategic tranche ~79 Mb avg 2025)",
   "nextPublish": "n/a"
  },
  {
   "publisher": "S&P Global Commodity Insights — South Korea to release record 22.46 Mb of oil reserves",
   "sourceClass": "secondary-wire",
   "url": "https://www.spglobal.com/energy/en/news-research/latest-news/crude-oil/031126-south-korea-to-release-record-2246-million-barrels-of-oil-reserves-in-emergency-action",
   "asOf": "2026-03-11 (end-2025 total reserves ~200-208 days; KNOC gov ~100 Mb)",
   "nextPublish": "n/a"
  },
  {
   "publisher": "KNOC — Petroleum stockpiling",
   "sourceClass": "official-primary",
   "url": "https://www.knoc.co.kr/ENG/sub04/sub04_2_4.jsp",
   "asOf": "2025 (storage capacity ~400 Mb; gov+international joint ~35% of capacity)",
   "nextPublish": "n/a"
  }
 ]
}
```

## aa853f46236c41d73
**Role:** You are an A-11 producer subagent for Iran (Gulf exporter) …
```json
{
 "country": "Iran",
 "exportCoverDays": 57,
 "usableStockMmb": {
  "domesticInsideHormuz": 106,
  "domesticOutsideHormuz": 0,
  "leasedAbroad": 0
 },
 "storageUtilPct": 91,
 "bypassAdjExportMbd": 0.1,
 "shutInMbd": 1.45,
 "confidence": "Inferred-triangulated",
 "chokepointNote": "EXPORTER SCHEMA (net exporter — net-import-cover days are meaningless). Pre-crisis crude exit baseline ~1.85 mb/d crude (~1.9-2.0 mb/d incl. condensate; 2025 avg 1.68, Mar-2026 peak 1.84-1.85). exportCoverDays ~57 = usable above-ground stock (~106 mb: ~39 mb onshore working tankage + ~67 mb floating crude stranded inside the Gulf/Gulf of Oman behind the blockade and recoverable once routes open) / 1.85 mb/d pre-crisis export rate. NOTE: the cover number is NOT the binding constraint — storage HEADROOM is. By Kpler (10 Jun 2026) only ~13.5 mb of usable onshore headroom remained (late-April runway estimated 12-24 days), i.e. effectively at tank-tops (~91% util, range 57-90% across sources, skewed high). LOCATION/CHOKEPOINT TAG: essentially ALL Iranian crude infrastructure sits INSIDE Hormuz — Kharg Island (~32-34 mb crude tankage, ~90% of export capacity) is in the upper Gulf, behind the strait. domesticOutsideHormuz = 0 (no material Caspian/Neka crude export buffer; Neka is a northern import-swap point, not an export outlet for southern crude). leasedAbroad = 0 (unlike Saudi Aramco, Iran holds no sanctioned-immune leased tankage at Okinawa/Sidi Kerir/Rotterdam; its 'offshore' stock is dark-fleet floating storage, already counted inside-Gulf). BYPASS: Goreh-Jask pipeline (Gulf of Oman, outside Hormuz) nameplate ~300 kb/d but never reached sustained operation and is effectively idle — bypassAdjExportMbd ~0.1 (negligible/not viable). SHUT-IN: production throttled from ~2.75 mb/d pre-war toward ~1.2-1.3 mb/d by mid-May; ~1.2 mb/d cut already realized, projected to deepen by ~+1.5 mb/d — modelled shut-in ~1.45 mb/d (this is production FOREGONE / wells curtailed to avoid tank-tops, NOT barrels moved into storage). DRIVER NUANCE: the dominant binding constraint on EXPORTS in Apr-Jun 2026 was the US naval blockade (began ~13 Apr 2026), not the Hormuz airstrike campaign per se; exports collapsed from ~1.85 mb/d (Mar) to <300 kb/d (May, ~567 kb/d recent). Blockade lifted ~17 Jun (MoU + Treasury General License X); by 22 Jun Kharg anchorage cleared from ~11 to ~3 laden tankers as stranded cargoes departed. Storage strain is now easing but remains the live risk if the 60-day ceasefire breaks.",
 "sources": [
  {
   "publisher": "Kpler (Iran crude storage buffer / 13.5 mb remaining)",
   "sourceClass": "forecaster",
   "asOf": "2026-06-10",
   "nextPublish": "as-events",
   "url": "https://www.kpler.com/blog/irans-crude-oil-storage-buffer-is-shrinking-but-the-key-pressure-valve-remains-cuts"
  },
  {
   "publisher": "Kpler (Kharg Island explainer)",
   "sourceClass": "forecaster",
   "asOf": "2026-03-16",
   "nextPublish": "as-events",
   "url": "https://www.kpler.com/blog/explainer-why-kharg-island-is-the-backbone-of-irans-oil-economy---and-its-greatest-vulnerability"
  },
  {
   "publisher": "Bloomberg via Kpler (22 days storage left)",
   "sourceClass": "forecaster",
   "asOf": "2026-04-27",
   "nextPublish": "as-events",
   "url": "https://www.bloomberg.com/news/articles/2026-04-27/iran-s-unused-oil-storage-shrinks-to-22-days-or-less-kpler-says"
  },
  {
   "publisher": "CGEP Columbia (storage rising, shut-ins not imminent)",
   "sourceClass": "forecaster",
   "asOf": "2026-04-29",
   "nextPublish": "as-events",
   "url": "https://www.energypolicy.columbia.edu/iran-crude-oil-storage-levels-are-rising-but-production-shut-ins-may-not-be-imminent/"
  },
  {
   "publisher": "Al Jazeera (US naval blockade $6bn revenue loss / export collapse)",
   "sourceClass": "secondary-wire",
   "asOf": "2026-06-05",
   "nextPublish": "as-events",
   "url": "https://www.aljazeera.com/news/2026/6/5/how-the-us-naval-blockade-has-bled-iran-of-nearly-6bn-in-oil-revenues"
  },
  {
   "publisher": "Fortune (production cuts / tank-tops / Vortexa floating capacity)",
   "sourceClass": "secondary-wire",
   "asOf": "2026-05-02",
   "nextPublish": "as-events",
   "url": "https://fortune.com/2026/05/02/iran-oil-production-cuts-crude-storage-limits-tank-tops-us-naval-blockade-hormuz/"
  },
  {
   "publisher": "UANI Iran Shipping Update (Kharg anchorage tanker counts post-blockade)",
   "sourceClass": "proxy-tanker",
   "asOf": "2026-06-23",
   "nextPublish": "weekly",
   "url": "https://www.unitedagainstnucleariran.com/blog/iran-shipping-update-june-23-2026"
  },
  {
   "publisher": "EIA Iran energy overview (baseline capacity)",
   "sourceClass": "official-primary",
   "asOf": "2025-12-31",
   "nextPublish": "annual",
   "url": "https://www.eia.gov/international/analysis/country/irn"
  }
 ]
}
```

## aa87bfc6d01532f3b
**Role:** You are an A-11 producer subagent for UAE (Gulf exporter) …
```json
{
 "country": "United Arab Emirates",
 "exportCoverDays": 14,
 "usableStockMmb": {
  "domesticInsideHormuz": 0,
  "domesticOutsideHormuz": 42,
  "leasedAbroad": 6
 },
 "storageUtilPct": 90,
 "bypassAdjExportMbd": 1.8,
 "shutInMbd": 1.4,
 "confidence": "Inferred-triangulated",
 "chokepointNote": "UAE is structurally advantaged versus Saudi/Kuwait/Iraq because its only hard Hormuz-bypass route — the Habshan-Fujairah ADCOP pipeline to the Gulf of Oman — gives a Hormuz-free crude export ceiling of ~1.8 mb/d (1.5 nameplate, debottlenecked). All ADNOC strategic storage (42 mmb in three 14-mmb Fujairah underground caverns) sits OUTSIDE the chokepoint on the Gulf-of-Oman side, so it is loadable even with the strait legally closed. Domestic crude stock INSIDE Hormuz is effectively zero for export purposes (production fields feed pipelines, not pre-positioned export tankage on the Gulf side). bypassAdjExportMbd = 1.8 reflects the pipeline ceiling, NOT total exports: in June 2026 UAE pushed total exports back to 4.3 mb/d (~85% of ~5.0 mb/d prewar) by ADDING tanker transits via the Omani-coast corridor under US escort (ADNOC moved barrels to the Fujairah anchorage for STS transfer) — but that incremental ~2.5 mb/d depends on the fragile ceasefire and IRGC permit/escort tolerance, so it is reversible and not counted as true bypass. shutInMbd ~1.4 = the March trough gap: exports collapsed to ~1.9 mb/d (from ~3.0-3.4 mb/d crude export baseline) as output fell 'more than half'; Fujairah tanks were already near-full (one tank drone-damaged), so blocked barrels were SHUT IN at the wellhead, not stored. exportCoverDays = 42 mmb usable / ~3.0 mb/d prewar export ~= 14 days — a weak metric for a net exporter; the binding constraint is pipeline bypass capacity (1.8 mb/d) plus escort-corridor tolerance, not stock cover. Storage util ~90% (near-full, drone damage) is what forced shut-in rather than a stock build. leasedAbroad ~6 mmb = small reciprocal India SPR/Fujairah arrangement (low confidence). Second 1.5 mb/d Fujairah bypass line ~50% complete, online 2027, would roughly double the Hormuz-free ceiling.",
 "sources": [
  {
   "publisher": "The National (IEA OMR cited)",
   "sourceClass": "forecaster",
   "asOf": "2026-06-24",
   "nextPublish": "monthly",
   "url": "https://www.thenationalnews.com/business/energy/2026/06/24/uae-oil-exports-rebound-to-85-of-prewar-levels-despite-strait-of-hormuz-closure-iea-says/"
  },
  {
   "publisher": "gCaptain (IEA cited)",
   "sourceClass": "secondary-wire",
   "asOf": "2026-06-24",
   "nextPublish": "as-events",
   "url": "https://gcaptain.com/uae-oil-exports-surged-to-85-of-pre-war-levels-iea-says/"
  },
  {
   "publisher": "IndexBox",
   "sourceClass": "secondary-wire",
   "asOf": "2026-06-17",
   "nextPublish": "as-events",
   "url": "https://www.indexbox.io/blog/uae-reduces-strait-of-hormuz-dependence-amid-ongoing-crisis/"
  },
  {
   "publisher": "World Oil",
   "sourceClass": "secondary-wire",
   "asOf": "2026-03-27",
   "nextPublish": "as-events",
   "url": "https://worldoil.com/news/2026/3/27/uae-boosts-fujairah-oil-exports-as-hormuz-disruption-redirects-crude-flows/"
  },
  {
   "publisher": "BOE Report",
   "sourceClass": "secondary-wire",
   "asOf": "2026-03-16",
   "nextPublish": "as-events",
   "url": "https://boereport.com/2026/03/16/uae-crude-output-falls-by-more-than-half-as-hormuz-closure-forces-shut-ins/"
  },
  {
   "publisher": "CNBC",
   "sourceClass": "secondary-wire",
   "asOf": "2026-05-20",
   "nextPublish": "as-events",
   "url": "https://www.cnbc.com/2026/05/20/uae-pipeline-strait-hormuz-iran-war-oil.html"
  },
  {
   "publisher": "S&P Global Commodity Insights (Fujairah storage)",
   "sourceClass": "official-primary",
   "asOf": "2025-04-01",
   "nextPublish": "monthly",
   "url": "https://www.spglobal.com/content/dam/spglobal/commodity-insights/en/pdf/the_fujairah_supplement/ci_0425_fujairah_supplement_fujcon_april_2025.pdf"
  },
  {
   "publisher": "AGBI (UAE capacity post-OPEC exit)",
   "sourceClass": "secondary-wire",
   "asOf": "2026-05-01",
   "nextPublish": "as-events",
   "url": "https://www.agbi.com/analysis/oil-and-gas/2026/05/free-from-opec-how-much-can-the-uae-raise-oil-output-capacity/"
  }
 ]
}
```

## aab5047c4861e8634
**Role:** You are an A-04 consumer subagent for South Korea …
```json
{
 "country": "South Korea",
 "todayDays": 205,
 "method": "published-triangulated",
 "confidence": "Inferred-triangulated",
 "hormuzDependenceShare": 0.9,
 "sourceClassesUsed": [
  "official-primary",
  "secondary-wire",
  "proxy-satellite"
 ],
 "divergenceFlag": "none-material. Two coverage metrics coexist and must not be conflated: (1) IEA days-of-NET-IMPORTS basis = ~208 days (the standing published figure, used as headline). (2) days-of-actual-CONSUMPTION basis = ~67 days total (gov 100.1 mb ~34 days + private), at ~2.9 mb/d refinery throughput. These differ by construction (net-imports << gross throughput because Korea re-exports refined product), NOT by source disagreement, so no >15% true divergence. Headline uses the net-imports basis per the IEA coverage convention. Korea met its IEA release obligation by HALVING the private stockpiling mandate (40->20 days) and reported ~12 mb (vs 22.46 mb pledged); government strategic stocks (~100 mb) were NOT physically drawn, so standing coverage is near-intact, decremented only modestly (~12 mb / ~2.7 mb/d net imports ~= 4-5 days) to ~203-208 days; midpoint ~205.",
 "massBalance": {
  "replacementMbd": 0,
  "demandReliefMbd": 0,
  "blockedMbd": 0,
  "netRateR_mbd": 0,
  "tDays": 118,
  "sReleaseMmb": 12,
  "deltaStockMmb": -12,
  "deltaCoverageDays": -4.4,
  "denominatorMbd": 1.5,
  "perCountryCalibrationNote": "Mass-balance is a SECONDARY cross-check only; the published IEA net-import coverage (~208 days) is the headline per method priority. Korea is ~90% Hormuz-dependent but Hormuz is contested-but-flowing (32% of prewar, 4.8 mb/d) and Korea actively diversified in May 2026 (reduced Middle East reliance, secured non-Gulf barrels), so no sustained physical shortfall accrued against domestic stocks. The only realized stock impact is the IEA action: Korea reported ~12 mb (against a 22.46 mb pledge) but executed it by cutting the private mandate 40->20 days rather than physically releasing government SPR, so the true draw on physical strategic stock is ~0; the 12 mb here is the reported-to-IEA figure used for an upper-bound decrement. S_release=12 mb / D=1.5 mb/d would imply -8 days against a 1.5 mb/d denominator, but against Korea's ~2.7 mb/d net-import run-rate the coverage decrement is ~4-5 days. deltaCoverageDays computed as -12/2.7~=-4.4 (net-import basis, the basis of the 208-day headline). tDays=118 (IEA ~120-day release window) shown for dimensional completeness; replacement/demand_relief/blocked set to 0 because Korea sustained supply via diversified non-Hormuz barrels rather than drawing domestic strategic stock."
 },
 "sources": [
  {
   "publisher": "International Energy Agency (Oil Stocks of IEA Countries data tool; ~208 days net-import coverage for Korea)",
   "sourceClass": "official-primary",
   "asOf": "2025-12-31",
   "nextPublish": "monthly",
   "url": "https://www.iea.org/data-and-statistics/data-tools/oil-stocks-of-iea-countries"
  },
  {
   "publisher": "IEA / Statista (Oil stocks measured in days of net imports; Korea ~208 days)",
   "sourceClass": "secondary-wire",
   "asOf": "2025",
   "nextPublish": "as-events",
   "url": "https://www.statista.com/chart/36019/oil-stocks-of-iea-countries-measured-in-days-of-net-imports/"
  },
  {
   "publisher": "CSIS (The Impact of the Iran Conflict on South Korea: By the Numbers; ~90% crude via Hormuz, gov stocks 100.1 mb ~34 days, combined ~67 days consumption basis)",
   "sourceClass": "secondary-wire",
   "asOf": "2026-06",
   "nextPublish": "as-events",
   "url": "https://www.csis.org/analysis/impact-iran-conflict-south-korea-numbers"
  },
  {
   "publisher": "Seoul Economic Daily (Korea met IEA pledge by cutting private reserve mandate 40->20 days; reported ~12 mb vs 22.46 mb pledged; gov SPR not physically drawn)",
   "sourceClass": "secondary-wire",
   "asOf": "2026-05-28",
   "nextPublish": "as-events",
   "url": "https://en.sedaily.com/finance/2026/05/28/korea-cuts-private-stockpile-mandate-to-meet-iea-oil"
  },
  {
   "publisher": "S&P Global (South Korea eases refiners' crude stockpiling mandate under IEA plan; 22.46 mb pledge by 9 Jun)",
   "sourceClass": "secondary-wire",
   "asOf": "2026-05-28",
   "nextPublish": "as-events",
   "url": "https://www.spglobal.com/energy/en/news-research/latest-news/crude-oil/052826-south-korea-eases-refiners-crude-stockpiling-mandate-under-iea-plan"
  },
  {
   "publisher": "Visual Capitalist / EnergyNow (Strait of Hormuz oil trade by destination; Korea 12% of Hormuz crude flows, Q1 2025)",
   "sourceClass": "secondary-wire",
   "asOf": "2026-03",
   "nextPublish": "as-events",
   "url": "https://energynow.com/2026/03/charted-oil-trade-through-the-strait-of-hormuz-by-country-visual-capitalist/"
  },
  {
   "publisher": "Korea Herald (S. Korea secures 74.6m barrels for May, reduces Middle East reliance / diversification away from Gulf)",
   "sourceClass": "secondary-wire",
   "asOf": "2026-05",
   "nextPublish": "as-events",
   "url": "https://www.koreaher
… (truncated)
```

## aac2ef24bf9ec2f92
**Role:** You are an A-03 consumer subagent for Indonesia …
```json
{
 "country": "Indonesia",
 "beforeDays": null,
 "denominatorMbd": 0.832,
 "stockBasis": "IEA total-stock days-of-net-import-cover NOT PUBLISHED for Indonesia (non-IEA Association country, excluded from IEA oil-stocks data tool). beforeDays=null; not imputed per exclusion gate. National fragments (~20-25 days fuel cover vs consumption, storage-capacity-limited; 90-day policy target) are Modelled-EST and not comparable to the IEA basis.",
 "netExporterConvention": "Net importer. Indonesia became a net oil importer in 2003. Convention: net importer, days-of-net-import-cover is the relevant metric in principle, but unpublished on IEA basis. Denominator D applies identically to the 'today' period (fixed prior-year-average net imports).",
 "confidence": "Absent",
 "sources": [
  {
   "publisher": "IEA",
   "sourceClass": "official-primary",
   "asOf": "2025-12",
   "url": "https://www.iea.org/data-and-statistics/data-tools/oil-stocks-of-iea-countries",
   "nextPublish": "monthly"
  },
  {
   "publisher": "IEA",
   "sourceClass": "official-primary",
   "asOf": "2025",
   "url": "https://www.iea.org/about/oil-security-and-emergency-response",
   "nextPublish": "n/a"
  },
  {
   "publisher": "IEA",
   "sourceClass": "official-primary",
   "asOf": "2025",
   "url": "https://www.iea.org/countries/indonesia/oil",
   "nextPublish": "n/a"
  },
  {
   "publisher": "U.S. EIA Country Analysis Brief: Indonesia",
   "sourceClass": "official-primary",
   "asOf": "2025-08-25",
   "url": "https://www.eia.gov/international/content/analysis/countries_long/Indonesia/Indonesia_2025.pdf",
   "nextPublish": "annual (2026)"
  },
  {
   "publisher": "Jakarta Globe",
   "sourceClass": "secondary-wire",
   "asOf": "2025",
   "url": "https://jakartaglobe.id/business/indonesias-fuel-reserves-at-23-days-govt-plans-storage-expansion",
   "nextPublish": "n/a"
  },
  {
   "publisher": "IDNFinancials (Bahlil Lahadalia / ESDM)",
   "sourceClass": "secondary-wire",
   "asOf": "2025",
   "url": "https://www.idnfinancials.com/news/61943/bahlil-lahadalia-25-day-fuel-stock-where-to-store-more-imports",
   "nextPublish": "n/a"
  },
  {
   "publisher": "Indonesia Business Post",
   "sourceClass": "secondary-wire",
   "asOf": "2025",
   "url": "https://indonesiabusinesspost.com/6233/energy-and-resources/indonesia-targets-90-day-oil-reserve-to-bolster-energy-security-amid-global-volatility",
   "nextPublish": "n/a"
  }
 ]
}
```

## aae0e1b292d58b2b1
**Role:** You are an A-04 consumer subagent for Italy …
```json
{
 "country": "Italy",
 "todayDays": 90,
 "method": "published-triangulated",
 "confidence": "Inferred-triangulated",
 "hormuzDependenceShare": 0.18,
 "sourceClassesUsed": [
  "official-primary",
  "secondary-wire",
  "forecaster"
 ],
 "divergenceFlag": "No material divergence (<15%). Published-triangulated headline (90 days, IEA/EU compliance floor that Italy consistently meets) vs mass-balance modelled secondary (~80 days) differ by ~11%, within the 15% threshold. Headline = higher-tier published figure. Divergence explained: Italy's ~10 mb IEA collective-action contribution came from commercial/industry obligated stocks, while the IEA-basis reported emergency coverage metric is held at the 90-day statutory floor; replacement Atlantic/Med barrels offset blocked minority Gulf volumes. SEPARATELY: the source inputs carry a structural tracker divergence on physical Hormuz throughput (PortWatch AIS-only ~5 transits/day vs Windward 62 vessels vs Kpler ~4.8 mb/d) driven by dark transits hugging the Omani corridor — but this affects the global flow picture, not Italy's stock-coverage day count, which is stock-metric-driven.",
 "massBalance": {
  "blockedMbd": 0.1,
  "replacementMbd": 0.08,
  "demandReliefMbd": 0.01,
  "netRateR_mbd": -0.01,
  "tDays": 118,
  "sReleaseMmb": 10,
  "deltaStockMmb": -11.18,
  "deltaCoverageDays": -10.2,
  "denominatorMbd": 1.1,
  "todayDays": 79.8,
  "perCountryCalibrationNote": "Calibrated to Italy, NOT global average. D=1.1 mb/d net crude imports (CEIC: 1.129 mb/d crude imports Dec 2024, less ~0.12 mb/d domestic production). hormuzDependenceShare=0.18: Italy's crude slate is Med/Atlantic-heavy (Azerbaijan via BTC, Libya, US, Kazakhstan/CPC, Algeria, Nigeria = non-Hormuz); only Iraq + Saudi Arabia + occasional Kuwait/UAE transit Hormuz. EU-wide GCC share ~7% (Consilium) plus Iraq ~5.8%; scaled to Italy's mid-tier Gulf sourcing gives ~18%. blockedMbd=0.10: Hormuz-routed ~0.20 mb/d (0.18x1.1), of which ~half is delayed/at-risk during the contested-but-flowing recovery (Kpler ~4.8 mb/d, ~32% of prewar baseline); Italian Gulf cargoes are highly reroutable. replacementMbd=0.08: Italy substitutes via Atlantic Basin/Med crude given refinery flexibility and pipeline supply. demandReliefMbd=0.01: marginal price-driven demand destruction. sReleaseMmb=10: Italy's IEA collective-action contribution (Euronews, 03 Apr 2026: Italy 10 mb of the 92 mb EU/20-country share within the 400 mb IEA release). S_release NOT added to flow; ΔStock=R*118-S_release. SPR/US 172 mb draw is US-only and excluded from IEA coverage per inputs. This modelled path is a secondary cross-check; headline uses the published IEA 90-day compliance figure."
 },
 "sources": [
  {
   "publisher": "IEA - Italy Oil Security Policy",
   "sourceClass": "official-primary",
   "asOf": "2025-05-31",
   "nextPublish": "annual",
   "url": "https://www.iea.org/articles/italy-oil-security-policy"
  },
  {
   "publisher": "IEA - Oil Stocks of IEA Countries (days of net imports, 90-day obligation)",
   "sourceClass": "official-primary",
   "asOf": "2026-06-01",
   "nextPublish": "monthly",
   "url": "https://www.iea.org/data-and-statistics/data-tools/oil-stocks-of-iea-countries"
  },
  {
   "publisher": "European Commission / Council Directive 2009/119/EC (90 days net imports or 61 days consumption)",
   "sourceClass": "official-primary",
   "asOf": "2026-01-01",
   "nextPublish": "annual",
   "url": "https://energy.ec.europa.eu/topics/energy-security/security-oil-supply_en"
  },
  {
   "publisher": "Euronews - How long can the EU's oil reserves last (Italy 76 mb stocks; Italy 10 mb IEA release contribution)",
   "sourceClass": "secondary-wire",
   "asOf": "2026-04-03",
   "nextPublish": "as-events",
   "url": "https://www.euronews.com/my-europe/2026/04/03/how-long-can-the-eus-oil-reserves-last"
  },
  {
   "publisher": "Consilium - Where does the EU get its oil from (GCC ~7%, Iraq ~5.8%, Libya >9%, Saudi 6.8%)",
   "sourceClass": "official-primary",
   "asOf": "2026-01-01",
   "nextPublish": "annual",
   "url": "https://www.consilium.europa.eu/en/infographics/where-does-the-eu-get-its-oil-from/"
  },
  {
   "publisher": "CEIC Data - Italy Crude Oil Imports (1.129 mb/d, Dec 2024)",
   "sourceClass": "forecaster",
   "asOf": "2024-12-31",
   "nextPublish": "monthly",
   "url": "https://www.ceicdata.com/en/indicator/italy/crude-oil-imports"
  },
  {
   "publisher": "Worldometer - Italy oil production/consumption (1.24 mb/d consumption; 0.124 mb/d production, 2024)",
   "sourceClass": "secondary-wire",
   "asOf": "2024-12-31",
   "nextPublish": "annual",
   "url": "https://www.worldometers.info/oil/italy-oil/"
  }
 ]
}
```

## ab2e149c48cabc905
**Role:** You are an A-04 consumer subagent for China …
```json
{
 "country": "China",
 "todayDays": 130,
 "method": "published-triangulated",
 "confidence": "Inferred-triangulated",
 "hormuzDependenceShare": 0.46,
 "sourceClassesUsed": [
  "official-primary",
  "forecaster",
  "secondary-wire"
 ],
 "divergenceFlag": "No material divergence. Published-triangulated total-cover (~130 days, Reuters/Kemp + EIA stock data) and mass-balance modelled (~128 days) converge within 2 days (<2%, far below 15% threshold). Headline = higher tier (published-triangulated). Note: estimates of the BASELINE figure itself span ~109 days (EIA, strategic-only at ~1.2bn bbl) to ~130 days (Reuters/Kemp, total onshore incl. mandated commercial at ~1.47bn bbl) to ~120 days ('four months of seaborne'). The 130-day figure (total onshore cover) is used as headline; strategic-only is ~109 days. Separately, Hormuz-dependence estimates diverge: ~45-50% of crude imports (Vortexa/CGEP, seaborne emphasis) vs ~35% incl. non-seaborne (pipeline ESPO/Kazakh/Myanmar) — central 0.46 used.",
 "massBalance": {
  "replacementMbd": 1.5,
  "demandReliefMbd": 1.5,
  "blockedMbd": 3.8,
  "netRateR_mbd": -0.8,
  "tDays": 30,
  "sReleaseMmb": 0,
  "deltaStockMmb": -24,
  "denominatorMbd": 11.1,
  "deltaCoverageDays": -2.2,
  "perCountryCalibrationNote": "Calibrated to China specifically, NOT global average. blocked=3.8 mb/d is the empirically observed import collapse (imports fell from ~11.6 mb/d in 2025 to ~7.8 mb/d in May 2026, lowest since Oct 2017 - energyconnects/Bloomberg), not a theoretical Hormuz*share product. China's effective Hormuz dependence ~46% of crude imports (~5.3 mb/d normally via strait); contested-but-flowing Hormuz at 4.8/15=32% of prewar passage meant much Hormuz crude still moved, so net blocked < full dependence. Replacement (~1.5 mb/d) = ramp of non-Hormuz barrels: incremental US crude purchases (discoveryalert), Russian ESPO pipeline (non-Hormuz), West African/Atlantic-basin redirects, Kazakh/Myanmar pipeline. demand_relief (~1.5 mb/d) = refinery run cuts drawing on product stocks during the acute window. t=30 days reflects the acute late-May-to-late-June disruption window, tapering as Hormuz flow recovered to 4.8 mb/d by 24-26 Jun. CRITICAL: sReleaseMmb=0 because China is a NET STOCKPILER (added ~1.0-1.1 mb/d to strategic stocks through 2025-2026 per EIA) and made NO strategic release during the war - it was 'quietly calming markets' by buying, not selling. Hence the modelled drawdown is tiny (~24 mmb / ~2 days) against a ~130-day buffer. R=replacement+demand_relief-blocked=1.5+1.5-3.8=-0.8 mb/d; deltaStock=R*t-S=-0.8*30-0=-24 mmb (used actual ~30-day window, not the 118 default, since China's disruption was a single ~1-month leg with rapid Hormuz recovery); deltaDays=-24/11.1=-2.2; todayDays=130-2.2~=128, rounded to published-triangulated headline 130."
 },
 "sources": [
  {
   "publisher": "Reuters / John Kemp (JKempEnergy) - China oil stocks and readiness for war",
   "sourceClass": "forecaster",
   "asOf": "2026-02-15",
   "nextPublish": "as-events",
   "url": "https://jkempenergy.com/2026/02/15/chinas-oil-stocks-and-readiness-for-war/"
  },
  {
   "publisher": "U.S. EIA - China holds largest strategic oil inventories (~1.2-1.4bn bbl; strategic ~109 days)",
   "sourceClass": "official-primary",
   "asOf": "2025-12-31",
   "nextPublish": "as-events",
   "url": "https://www.eia.gov/todayinenergy/detail.php?id=67504"
  },
  {
   "publisher": "Center on Global Energy Policy, Columbia SIPA - China's Oil Demand, Imports and Supply Security (Hormuz ~45-50% of crude imports)",
   "sourceClass": "forecaster",
   "asOf": "2026-03",
   "nextPublish": "as-events",
   "url": "https://www.energypolicy.columbia.edu/publications/chinas-oil-demand-imports-and-supply-security/"
  },
  {
   "publisher": "Vortexa - China's crude import stress resistance in a Hormuz crisis",
   "sourceClass": "forecaster",
   "asOf": "2026-06",
   "nextPublish": "as-events",
   "url": "https://www.vortexa.com/insights/chinas-crude-import-stress-resistance"
  },
  {
   "publisher": "EnergyConnects / Bloomberg - China oil imports plunge to eight-year low (~7.8 mb/d May 2026)",
   "sourceClass": "secondary-wire",
   "asOf": "2026-06",
   "nextPublish": "as-events",
   "url": "https://www.energyconnects.com/news/oil/2026/june/china-s-oil-imports-plunge-to-eight-year-low-on-war-disruptions/"
  },
  {
   "publisher": "IndexBox / China customs - 2025 imports record ~11.55 mb/d; Jan-Feb 2026 ~11.99 mb/d",
   "sourceClass": "secondary-wire",
   "asOf": "2026-03",
   "nextPublish": "as-events",
   "url": "https://www.indexbox.io/blog/chinas-crude-oil-imports-hit-record-high-in-2025-averaging-1155-million-barrels-per-day/"
  }
 ]
}
```

## abe463b7c407070da
**Role:** You are an A-04 consumer subagent for Spain …
```json
{
 "country": "Spain",
 "todayDays": 91,
 "method": "mass-balance-modelled",
 "confidence": "Modelled-EST",
 "hormuzDependenceShare": 0.06,
 "sourceClassesUsed": [
  "official-primary",
  "secondary-wire",
  "forecaster",
  "modelled"
 ],
 "divergenceFlag": "none",
 "massBalance": {
  "blockedMbd": 0.05,
  "replacementMbd": 0.045,
  "demandReliefMbd": 0.005,
  "netRateR_mbd": 0,
  "tDays": 118,
  "sReleaseMmb": 11.5,
  "deltaStockMmb": -11.5,
  "denominatorMbd": 1.25,
  "deltaCoverageDays": -9.2,
  "replacementMbd_note": "Spain is Atlantic-basin dominated; US/Brazil/Mexico/Nigeria/Guyana are top suppliers, near-full replacement of lost Gulf barrels",
  "perCountryCalibrationNote": "Spain's Hormuz dependence is among the LOWEST of any major importer (~6%). Mideast Gulf = only 8% of 2024 crude imports (Argus): Iraq ~38 kb/d (Basra, ~100% Hormuz-dependent) + Saudi ~70 kb/d (of which ~half routes via Yanbu/Red Sea/SUMED bypassing Hormuz for Med-positioned Spanish refiners). True Hormuz-blocked crude ~73 kb/d of ~1.30 mb/d imports => ~5.6%. Centered at 0.06. Net blockage effect on coverage is ~0 because the small lost Gulf volume is fully and easily replaced from the Atlantic basin. The DOMINANT driver of Spain's coverage change is NOT Hormuz physical blockage but Spain's participation in the 11 Mar 2026 IEA collective action: Spain released ~11.5 mmb (=12.3 days of national consumption) of emergency stocks, mechanically lowering net-import coverage by ~9 days from a ~100-day pre-war baseline toward the 92-day Royal Decree 1716/2004 obligation floor. todayDays = 100 - 9.2 ~= 91. NOTE: the global-average Hormuz-dependence assumption (~20-25%) is the failure mode here and would massively overstate Spain's physical exposure.",
  "beforeDays": 100,
  "todayDays": 91
 },
 "sources": [
  {
   "publisher": "Argus Media (Americas dominate Spain's crude imports in 2024)",
   "sourceClass": "secondary-wire",
   "asOf": "2025-01",
   "url": "https://www.argusmedia.com/en/news-and-insights/latest-market-news/2657015-americas-dominate-spain-s-crude-imports-in-2024",
   "nextPublish": "as-events"
  },
  {
   "publisher": "CORES (Spanish strategic reserves corp) crude import statistics",
   "sourceClass": "official-primary",
   "asOf": "2026-03",
   "url": "https://www.cores.es/en/mapa/icores/spain-crude-oil-imports",
   "nextPublish": "monthly"
  },
  {
   "publisher": "IEA (Spain Oil Security Policy; 92-day obligation, 42 CORES + 50 industry)",
   "sourceClass": "official-primary",
   "asOf": "2025",
   "url": "https://www.iea.org/articles/spain-oil-security-policy",
   "nextPublish": "as-events"
  },
  {
   "publisher": "IEA (collective action decision, 11 Mar 2026, 400 mmb)",
   "sourceClass": "official-primary",
   "asOf": "2026-03-11",
   "url": "https://www.iea.org/news/iea-member-countries-to-carry-out-largest-ever-oil-stock-release-amid-market-disruptions-from-middle-east-conflict",
   "nextPublish": "as-events"
  },
  {
   "publisher": "Al Jazeera (Spain IEA contribution ~11.5 mmb = 12.3 days consumption)",
   "sourceClass": "secondary-wire",
   "asOf": "2026-03-23",
   "url": "https://www.aljazeera.com/news/2026/3/23/which-countries-have-strategic-oil-reserves-and-how-much",
   "nextPublish": "as-events"
  },
  {
   "publisher": "Worldometer / IEA (Spain oil consumption ~1.32 mb/d 2024)",
   "sourceClass": "secondary-wire",
   "asOf": "2024",
   "url": "https://www.worldometers.info/oil/spain-oil/",
   "nextPublish": "annual"
  },
  {
   "publisher": "Argus / Saudi Aramco Yanbu rerouting (Saudi crude to Med/Spain via Red Sea bypasses Hormuz)",
   "sourceClass": "secondary-wire",
   "asOf": "2026-03",
   "url": "https://www.argusmedia.com/en/news-and-insights/latest-market-news/2798868-yanbu-gives-aramco-limited-option-for-rerouting-crude",
   "nextPublish": "as-events"
  },
  {
   "publisher": "Kpler via CNBC (Hormuz flow ~4.8 mb/d vs ~15 prewar)",
   "sourceClass": "forecaster",
   "asOf": "2026-06-24",
   "url": "https://www.cnbc.com/2026/06/24/oil-tanker-strait-hormuz-iran-deal.html",
   "nextPublish": "daily"
  },
  {
   "publisher": "A-04 mass-balance model (Modelled-EST, calibrated to Spain low Hormuz dependence)",
   "sourceClass": "modelled",
   "asOf": "2026-06-26",
   "url": "internal://A-04/spain",
   "nextPublish": "as-events"
  }
 ]
}
```

## ac2b8d97430f8666e
**Role:** You are an A-04 consumer subagent for Germany …
```json
{
 "country": "Germany",
 "todayDays": 99.1,
 "method": "mass-balance-modelled",
 "confidence": "Modelled-EST",
 "hormuzDependenceShare": 0.05,
 "sourceClassesUsed": [
  "official-primary",
  "secondary-wire",
  "modelled"
 ],
 "divergenceFlag": "none",
 "massBalance": {
  "blockedMbd": 0.062,
  "replacementMbd": 0.05,
  "demandReliefMbd": 0.01,
  "netRateR_mbd": -0.002,
  "tDays": 118,
  "sReleaseMmb": 18.3,
  "deltaStockMmb": -18.58,
  "deltaCoverageDays": -10.93,
  "denominatorMbd": 1.7,
  "todayDays": 99.1,
  "perCountryCalibrationNote": "Germany is among the LEAST Hormuz-exposed major importers. Slate dominated by Atlantic-basin: Norway 16.6%, US 16.4%, Libya 13.8%, Kazakhstan ~13%, plus West Africa; zero Russian crude since 2022/23 EU embargo. Total Middle East crude share only ~6.1% (Iraq, UAE, Saudi Arabia, Israel). Excluding Israel (non-Hormuz) and discounting Saudi East-West-pipeline-to-Red-Sea and UAE Fujairah-pipeline bypass routes, true Hormuz-transiting crude share ~5% -> hormuzDependenceShare=0.05. blocked = netImports 1.835 mb/d x 0.05 x Hormuz impairment 0.68 (1 - 4.8/15 prewar) = 0.062 mb/d. Replacement near-complete (0.05 mb/d): the tiny Gulf barrels are trivially substituted by grades already in Germany's slate. Demand relief negligible (0.01) given Brent back near prewar ~$74. Net rate R ~= 0, so Hormuz contributes ~nil to coverage change. The ENTIRE delta is the IEA collective-action drawdown: Germany released ~2.5 mt of oil (Reiche/BMWE) ~= 18.3 mb (2.5 x 7.33), modeled as S_release reducing stored stock. deltaStock = R*118 - 18.3 = -18.58 mb; /D 1.7 = -10.9 days. beforeDays=110 (EBV holds ~15 mt crude + 9.5 mt products ~= 177 mb total; IEA-methodology total-stocks/net-imports historically >100 days, 140 in 2012, vs 90-day legal floor). todayDays = 110 - 10.9 ~= 99. Coverage decline is policy-driven (releasing into the IEA action), not supply-shock-driven.",
  "denominatorMbd_note": "D=1.7 mb/d fixed from A-03; close to Germany's ~1.835 mb/d net crude+product imports"
 },
 "sources": [
  {
   "publisher": "Clean Energy Wire (Germany oil import sources, 2025 slate, zero Russian crude)",
   "sourceClass": "secondary-wire",
   "asOf": "2026-03",
   "url": "https://www.cleanenergywire.org/factsheets/germany-eu-remain-heavily-dependent-imported-fossil-fuels"
  },
  {
   "publisher": "Pluralia / Destatis (Germany 2025 crude imports: Norway 16.6%, US 16.4%, Libya 13.8%; ME 6.1%)",
   "sourceClass": "secondary-wire",
   "asOf": "2026",
   "url": "https://pluralia.com/en/news/germany-oil-imports-down-by-a-third-in-20-years/"
  },
  {
   "publisher": "Consilium / EU Council (EU & GCC oil import shares; Iraq 5.8%, Saudi 6.8%, GCC ~7%)",
   "sourceClass": "official-primary",
   "asOf": "2026",
   "url": "https://www.consilium.europa.eu/en/infographics/where-does-the-eu-get-its-oil-from/"
  },
  {
   "publisher": "BMWE / German Economy Ministry (EBV: ~15 mt crude + 9.5 mt products; 90-day legal requirement; ~110 mb crude + 67 mb products held)",
   "sourceClass": "official-primary",
   "asOf": "2026-03",
   "url": "https://www.bundeswirtschaftsministerium.de/Redaktion/EN/Artikel/Energy/petroleum-emergency-oil-supply-and-oil-crisis-management.html"
  },
  {
   "publisher": "Euronews / Clean Energy Wire (Germany IEA contribution ~2.5 mt oil released, Minister Reiche)",
   "sourceClass": "secondary-wire",
   "asOf": "2026-03-11",
   "url": "https://www.cleanenergywire.org/news/germany-ready-release-oil-strategic-reserves-amid-escalating-persian-gulf-conflict"
  },
  {
   "publisher": "IEA (collective action: 400 mb release decided 11 Mar 2026)",
   "sourceClass": "official-primary",
   "asOf": "2026-03-11",
   "url": "https://www.iea.org/news/iea-member-countries-to-carry-out-largest-ever-oil-stock-release-amid-market-disruptions-from-middle-east-conflict"
  },
  {
   "publisher": "IEA Oil and Gas Emergency Policy: Germany (total stocks ~140 days net imports historical benchmark)",
   "sourceClass": "official-primary",
   "asOf": "2012",
   "url": "https://www.iea.org/reports/oil-and-gas-emergency-policy-germany-2012-update"
  },
  {
   "publisher": "Worldometer (Germany net imports ~1.835 mb/d)",
   "sourceClass": "secondary-wire",
   "asOf": "2025",
   "url": "https://www.worldometers.info/oil/germany-oil/"
  },
  {
   "publisher": "A-04 Germany mass-balance model (this run)",
   "sourceClass": "modelled",
   "asOf": "2026-06-26",
   "url": "internal"
  }
 ]
}
```

## acc67071245352516
**Role:** You are an A-03 consumer subagent for China …
```json
{
 "country": "China",
 "beforeDays": 122.5,
 "denominatorMbd": 11.1,
 "stockBasis": "IEA-equivalent TOTAL oil stocks (strategic + commercial), Dec-2025: government-held ~360 mb + commercial ~1,000 mb = ~1,360 mb. NOT an official IEA days-of-cover figure (China is non-IEA). Total-stock basis used per instruction, not strategic-only (strategic-only would be ~360 mb / 11.1 = ~32 days). beforeDays = total stocks / D = 1360 / 11.1 = 122.5 days of net-import cover.",
 "confidence": "Modelled-EST",
 "netExporterConvention": "China is a large net oil importer; net-exporter convention does not apply. Denominator D = prior-year (2024) average daily NET crude oil imports = 11.1 mb/d (EIA/customs; China exports negligible crude). On a total-petroleum net basis (crude + net products) the figure is similar (~11.0-11.5 mb/d) because ~2.2 mb/d product imports are roughly offset by China's product exports. Same fixed D applied to the 'today' computation.",
 "sources": [
  {
   "publisher": "U.S. EIA — Today in Energy: 'China, the United States, and Japan hold most strategic oil inventories in 2025'",
   "sourceClass": "modelled",
   "asOf": "2026-04-21",
   "nextPublish": "unknown",
   "url": "https://www.eia.gov/todayinenergy/detail.php?id=67504"
  },
  {
   "publisher": "U.S. EIA — China crude oil imports / Country Analysis Brief (May 2025)",
   "sourceClass": "official-primary",
   "asOf": "2025-05",
   "nextPublish": "2026",
   "url": "https://www.eia.gov/international/content/analysis/countries_long/China/pdf/China-2025.pdf"
  },
  {
   "publisher": "Reuters/OEDigital — China 2025 & December oil imports at record levels (General Administration of Customs data)",
   "sourceClass": "secondary-wire",
   "asOf": "2026-01-14",
   "nextPublish": "monthly",
   "url": "https://energynews.oedigital.com/fossil-fuels/2026/01/14/chinas-oil-imports-in-2025-and-december-inflows-are-both-at-record-levels"
  },
  {
   "publisher": "Underlying inventory estimators cited by EIA: Vortexa Analytics, Kpler, Argus Media, Global Trade Tracker, China NBS, IEA",
   "sourceClass": "proxy-satellite",
   "asOf": "2025-12",
   "nextPublish": "monthly",
   "url": "https://www.eia.gov/todayinenergy/detail.php?id=67504"
  }
 ]
}
```

## accaec96714d6a8cd
**Role:** You are A-14 Weekly Trajectory …
```json
{
 "series": [
  {
   "weekOf": "2026-02-27",
   "oecdStockMmb": 4100,
   "usSprMmb": 411,
   "note": "Eve of war (27 Feb, last trading day before 28 Feb airstrikes). SPR at year-end 411 mb level; OECD total ~4,100 mb (OECD ~50% of ~8,210 mb global observed, IEA Jan OMR). Pre-war baseline."
  },
  {
   "weekOf": "2026-03-06",
   "oecdStockMmb": 4084,
   "usSprMmb": 411,
   "note": "War week 1. OECD draw begins as Hormuz supply fears bite; SPR releases not yet flowing (IEA collective action decided 11 Mar)."
  },
  {
   "weekOf": "2026-03-13",
   "oecdStockMmb": 4064,
   "usSprMmb": 411,
   "note": "IEA largest-ever 400 mb release decided 11 Mar; Trump authorizes US 172 mb share starting week of 11 Mar. SPR physically still ~411 mb (logistics ramp)."
  },
  {
   "weekOf": "2026-03-20",
   "oecdStockMmb": 4045,
   "usSprMmb": 407.6,
   "note": "SPR releases ramping (~early, sub-pace). DOE tally: 17.5 mb released late Mar-late Apr."
  },
  {
   "weekOf": "2026-03-27",
   "oecdStockMmb": 4026,
   "usSprMmb": 404.3,
   "note": "VLCC MEG-China spikes to ~$423k/day late March; war-risk hull cover toward ~1% of value. Stocks drawing."
  },
  {
   "weekOf": "2026-04-03",
   "oecdStockMmb": 4000,
   "usSprMmb": 400.9,
   "note": "OECD total through ~4,000 mb. Global April draw -74 mb (-2.5 mb/d) per IEA May OMR."
  },
  {
   "weekOf": "2026-04-10",
   "oecdStockMmb": 3966,
   "usSprMmb": 397.6,
   "note": "IEA Apr OMR: buffers eroding at record pace, -3.8 mb/d global avg since war start."
  },
  {
   "weekOf": "2026-04-17",
   "oecdStockMmb": 3932,
   "usSprMmb": 394.2,
   "note": "OECD on-land stocks fell 146 mb (-4.9 mb/d) across April (IEA May OMR)."
  },
  {
   "weekOf": "2026-04-24",
   "oecdStockMmb": 3898,
   "usSprMmb": 390.8,
   "note": "Continued draw; SPR pace still below strategic target rate."
  },
  {
   "weekOf": "2026-05-01",
   "oecdStockMmb": 3864,
   "usSprMmb": 387.5,
   "note": "Approaching record weekly SPR draws as the 172 mb action hits full ~1.4 mb/d cadence."
  },
  {
   "weekOf": "2026-05-08",
   "oecdStockMmb": 3825,
   "usSprMmb": 384.1,
   "note": "VERIFIED SPR anchor ~384.1 mb (week of 8 May). Record weekly SPR draw 8.6 mb reported 13 May (wk end 8 May)."
  },
  {
   "weekOf": "2026-05-15",
   "oecdStockMmb": 3787,
   "usSprMmb": 374.2,
   "note": "VERIFIED 374.2 mb. All-time record weekly SPR draw 9.92 mb (20 May report, wk end 15 May); combined commercial+SPR draw ~17.8 mb, largest since 1982 series start."
  },
  {
   "weekOf": "2026-05-22",
   "oecdStockMmb": 3749,
   "usSprMmb": 365.6,
   "note": "Two consecutive all-time weekly SPR records. Global May draw accelerating to -143 mb (-4.6 mb/d)."
  },
  {
   "weekOf": "2026-05-29",
   "oecdStockMmb": 3711,
   "usSprMmb": 357.1,
   "note": "VERIFIED 357.1 mb (3 Jun report, wk end 29 May, -8.0 mb). OECD govt inventories at lowest since Dec 1990 (IEA Jun OMR)."
  },
  {
   "weekOf": "2026-06-05",
   "oecdStockMmb": 3673,
   "usSprMmb": 348.5,
   "note": "Draw continuing at ~1.2-1.4 mb/d SPR pace. IEA: global stocks still falling at record pace."
  },
  {
   "weekOf": "2026-06-12",
   "oecdStockMmb": 3635,
   "usSprMmb": 339.8,
   "note": "Total US crude (incl SPR) ~743.3 mb, lowest since Oct 1984. OECD cover heading toward ~50 days by year-end (EIA Jun STEO)."
  },
  {
   "weekOf": "2026-06-19",
   "oecdStockMmb": 3598,
   "usSprMmb": 331.2,
   "note": "VERIFIED SPR anchor 331.2 mb (-9.1 mb), lowest since 1983. 79.8 mb of the planned US 172 mb action drawn (~46% complete). STILL DRAWING."
  },
  {
   "weekOf": "2026-06-26",
   "oecdStockMmb": 3560,
   "usSprMmb": 331.2,
   "note": "As-of date. SPR shown flat at 331.2 (26 Jun EIA weekly not yet published; last print 19 Jun). Brent $74.43 settle, back near pre-war after 17 Jun MoU and gradual Hormuz reopening. No stock-build week observed yet."
  }
 ],
 "inflection": "NOT YET TURNED. As of 26 Jun 2026 the draw-to-restock inflection has NOT occurred on either series. Both OECD total observed stocks (~4,100 -> ~3,560 mb, roughly -540 mb / -5 mb/d) and US SPR (411 -> 331.2 mb, -79.8 mb) decline monotonically from the eve of war through the latest weekly print, with no single up-week. Two structural reasons: (1) the IEA collective action (US 172 mb share, ~1.4 mb/d over ~120 days from mid-March) is only ~46% executed and is still PULLING stocks down, not refilling; (2) IEA's Jun OMR explicitly states the market balance only shifts to surplus 'towards the end of the year,' and EIA's Jun STEO projects OECD cover bottoming near 50 days at end-2026 (record low). The 17 Jun MoU and Hormuz reopening have relaxed PRICE (Brent back to ~$74 from ~$120 peak) and FREIGHT (VLCC easing from ~$470k to ~$180k/day) ahead of VOLUMES; physical restocking lags the ceasefire by months. Earliest plausible inflection is Q4 2026 once Hormuz throughput normalizes, the IEA release completes (~mid-July at current pace), and refill buying begins. Caveat: price/freight have already inflected (those turned in mid-to-late
… (truncated)
```

## accf505589f7fc1c5
**Role:** You are A-07 the Analytical Lens Panel (rigorous persona replacement, NOT role-play) …
```json
{
 "lenses": [
  {
   "institution": "EIA — Short-Term Energy Outlook (official-primary)",
   "stance": "Captures the Hormuz-closed spike most aggressively of the official bodies. Brent forecast ~$105/bbl Jun-Jul 2026; 2026 annual average ~$95/bbl (highest since 2022); falling to ~$89/bbl in Q4 2026 and ~$79/bbl in 2027. Driver: >11 mb/d Gulf output offline in May, OECD inventory draws averaging 6.3 mb/d (Q2) / 7.6 mb/d (Q3), OECD stocks down to ~50 days cover (lowest since Jan 2003). Explicitly frames a global oil DEMAND decline of ~1.1 mb/d y/y in 2026 as the force capping the price spike.",
   "structuralBias": "US-government statistical agency: mechanical supply/demand balance model, conservative on geopolitics (models physical flows, not deal probability). Tends to assume mean-reversion in out-years and to under-weight tail re-escalation. Publishes a point balance, not a trade. Politically sensitive to US gasoline-price narrative.",
   "asOf": "2026-06-09",
   "source": {
    "publisher": "U.S. Energy Information Administration",
    "sourceClass": "official-primary",
    "asOf": "2026-06-09",
    "nextPublish": "2026-07-07 (monthly STEO cadence)",
    "url": "https://www.eia.gov/outlooks/steo/"
   }
  },
  {
   "institution": "IEA — Oil Market Report (official-primary)",
   "stance": "Frames the episode as 'the largest supply disruption in the history of the global oil market.' June OMR: global supply to fall ~3.9 mb/d in 2026 to 102.4 mb/d; flows already recovering from a May low of 9.6 mb/d to ~12 mb/d via ship-to-ship transfers in the Gulf of Oman. Pivots the narrative from supply shock toward emerging GLUT: 2026 demand cut by 700 kb/d vs May report, now -1.1 mb/d y/y; Q2 deliveries down ~5 mb/d y/y. Stresses recovery is gradual (demining, transit arrangements) with downside risks to the recovery timeline.",
   "structuralBias": "IEA-consumer-country institutional bias: emphasizes demand destruction and supply readjustment (talks the market down), historically reluctant to forecast sustained high prices. Balance-of-flows lens, no explicit price deck. Quick to call gluts; the 'supply shock to glut' framing is characteristic.",
   "asOf": "2026-06-17",
   "source": {
    "publisher": "International Energy Agency",
    "sourceClass": "official-primary",
    "asOf": "2026-06-17",
    "nextPublish": "2026-07-11 (monthly OMR cadence)",
    "url": "https://www.iea.org/reports/oil-market-report-june-2026"
   }
  },
  {
   "institution": "Goldman Sachs — Global Commodities Research (forecaster)",
   "stance": "Just CUT on the interim Hormuz-reopening deal: Q4 2026 Brent to ~$80 (from $90); 2027 average to ~$75 (from $80). Assumes Persian Gulf exports normalize to pre-war levels by end-July. Explicitly states risks remain tilted to the UPSIDE on net. Scenario band is wide: upside (Hormuz disrupted through 2027) Brent >$130 late-2026, ~$105 avg 2027; downside (earlier export recovery + stickier demand losses + stronger supply) just under $70 in Q4 2026, below $60 in 2027.",
   "structuralBias": "Structurally bullish commodities desk / scarcity-and-convenience-yield framework; emphasizes spare-capacity exhaustion and low inventories. Trades the forecast — note is a positioning document, not a balance. Quick to revise both ways on headlines. Wide scenario bands signal genuine two-sided risk rather than conviction.",
   "asOf": "2026-06-19",
   "source": {
    "publisher": "Goldman Sachs (via Investing.com / Reuters)",
    "sourceClass": "forecaster",
    "asOf": "2026-06-19",
    "nextPublish": "event-driven",
    "url": "https://www.investing.com/news/commodities-news/goldman-cuts-2026-2027-oil-price-forecasts-after-deal-to-reopen-strait-of-hormuz-4743957"
   }
  },
  {
   "institution": "JPMorgan — Global Commodities Research (forecaster)",
   "stance": "Most bearish of the bank desks on the out-year and the only one explicitly flagging a coming oversupply/curtailment problem. June 24 note: Brent avg ~$86 Q3 2026, ~$80 Q4, exiting 2026 at ~$78; 2027 average ~$64. Driver: demand losses larger than originally modeled AND OECD commercial inventory draws falling SHORT of expectations — i.e., less tightening than the strait-closure headline implies. Warns Q4 2026 / early 2027 oversupply will require OPEC+ production curtailments after a late-2026 max-output phase.",
   "structuralBias": "Macro-integrated commodities desk (Kaneva-lineage house view): heavy weight on demand elasticity and the balance turning to surplus once flows normalize; historically more willing than peers to call a bearish out-year. The 'glut requires OPEC+ cuts' thesis is the sharpest bearish edge in the panel.",
   "asOf": "2026-06-24",
   "source": {
    "publisher": "J.P. Morgan (via Investing.com / Reuters / BOE Report)",
    "sourceClass": "forecaster",
    "asOf": "2026-06-24",
    "nextPublish": "event-driven",
    "url": "https://www.investing.com/news/commodities-news/jp-morgan-cuts-secondhalf-2026-brent-oil-price-forecast-4758078"
  
… (truncated)
```

## ad56aef7dda27070d
**Role:** You are an A-11 producer subagent for Iraq (Gulf exporter) …
```json
{
 "country": "Iraq",
 "exportCoverDays": 4.7,
 "usableStockMmb": {
  "domesticInsideHormuz": 17,
  "domesticOutsideHormuz": 1,
  "leasedAbroad": null
 },
 "storageUtilPct": 95,
 "bypassAdjExportMbd": 0.3,
 "shutInMbd": 1.5,
 "chokepointNote": "Iraq is the most Hormuz-exposed major Gulf exporter: ~3.4 of ~3.6 mb/d pre-war exports (90-93%) shipped via Basrah/southern Gulf terminals (Al Basrah/Khor al-Amaya/SPMs) that have ZERO Hormuz bypass — every southern barrel must transit the strait. Only the northern Kirkuk-Ceyhan pipeline to Turkiye's Mediterranean coast bypasses Hormuz entirely. Days-of-export-cover is the meaningful metric here, not import-cover: ~17 mb usable onshore tankage at Basrah / 3.6 mb/d pre-crisis export rate = ~4.7 days of buffer. That near-absence of storage is precisely why Iraq was the FIRST producer to announce shut-ins (Bloomberg, 3 Mar 2026): tank tops at Basrah filled within days of the 28 Feb disruption, forcing immediate well shut-ins at Rumaila (largest field) and West Qurna 2. Blocked barrels became production foregone, NOT inventory — storage was already saturated. Southern output fell >70%; ~1.5 mb/d offline as of Apr-Jun 2026, with officials warning the figure could approach 3 mb/d if disruption persists. STORAGE is the binding constraint (effectively ~95-100% on the southern system at crisis peak), not export logistics per se. Bypass relief is structurally capped: Kirkuk-Ceyhan restarted Mar 2026 (Saralo pumping station) at ~200-250 kb/d as of early June (cabinet approved ramp toward 770 kb/d over ~2.5 months from a 2 Jun decision; pipeline design capacity 1.6 mb/d but rehab-limited), plus ~50 kb/d trucked to Syria's Banias port — total non-Hormuz capability ~0.30 mb/d, under 10% of pre-war exports. Recovery is fast IF Hormuz reopens (Basra Oil Co: pre-war 3.4 mb/d restorable within a week, US News 6 Apr) because the constraint is the chokepoint, not reservoir/well damage. No Aramco-style leased foreign tankage; Iraq holds negligible stock outside the chokepoint. leasedAbroad = null (Iraq operates no strategic leased storage abroad comparable to Saudi Okinawa/Sidi Kerir/Rotterdam). domesticOutsideHormuz ~1 mb = nominal northern/Ceyhan-side line-fill and tankage, not a strategic buffer.",
 "confidence": "Inferred-triangulated",
 "sources": [
  {
   "publisher": "Bloomberg",
   "sourceClass": "secondary-wire",
   "asOf": "2026-03-03",
   "nextPublish": "as-events",
   "url": "https://www.bloomberg.com/news/articles/2026-03-03/iraq-starts-shutting-oil-output-at-rumaila-as-storage-fills-up"
  },
  {
   "publisher": "IEA Oil Market Report (April 2026)",
   "sourceClass": "official-primary",
   "asOf": "2026-04-14",
   "nextPublish": "monthly",
   "url": "https://iea.blob.core.windows.net/assets/515f3128-df1a-4d6c-beb4-fd91d2434bef/-14APR2026_OilMarketReport_Free_version1.pdf"
  },
  {
   "publisher": "Reuters/US News (Basra Oil Co exclusive)",
   "sourceClass": "secondary-wire",
   "asOf": "2026-04-06",
   "nextPublish": "as-events",
   "url": "https://www.usnews.com/news/world/articles/2026-04-06/exclusive-iraq-could-restore-oil-exports-to-pre-war-level-within-a-week-if-hormuz-reopens-basra-oil-chief-says"
  },
  {
   "publisher": "Bloomberg (Ceyhan ramp)",
   "sourceClass": "secondary-wire",
   "asOf": "2026-06-02",
   "nextPublish": "as-events",
   "url": "https://www.bloomberg.com/news/articles/2026-06-02/iraq-to-boost-ceyhan-oil-exports-as-hormuz-strait-remains-shut"
  },
  {
   "publisher": "Iraq Business News (Kirkuk-Ceyhan capacity)",
   "sourceClass": "secondary-wire",
   "asOf": "2026-04-22",
   "nextPublish": "as-events",
   "url": "https://www.iraq-businessnews.com/2026/04/22/1-6m-bpd-kirkuk-export-pipeline-set-for-relaunch/"
  },
  {
   "publisher": "CNBC (Iraq/UAE alternative pipelines)",
   "sourceClass": "secondary-wire",
   "asOf": "2026-06-09",
   "nextPublish": "as-events",
   "url": "https://www.cnbc.com/2026/06/09/iraq-uae-hormuz-oil-pipelines-oil-iran-war.html"
  },
  {
   "publisher": "Breakwave Advisors (Iraq export crisis)",
   "sourceClass": "forecaster",
   "asOf": "2026-06-23",
   "nextPublish": "as-events",
   "url": "https://www.breakwaveadvisors.com/insights/2026/6/23/iraqs-export-crisis-hormuz-and-pipeline-uncertainty"
  },
  {
   "publisher": "Kpler (Iraqi flows via Hormuz)",
   "sourceClass": "forecaster",
   "asOf": "2026-04-07",
   "nextPublish": "daily",
   "url": "https://www.kpler.com/blog/resumption-of-iraqi-flows-via-strait-of-hormuz"
  }
 ]
}
```

## ad61492dab456eb0d
**Role:** You are A-02 Price & Key Indicators …
```json
{
 "brent": {
  "prewarEveOfWar": 72,
  "peak": 120,
  "now": 74.43,
  "scopeBaselineNote": "Two different baselines reconciled: the '$65' anchor is a late-2025 figure (J.P. Morgan's full-year-2025 WTI average forecast; Brent spot ran mid-to-high $60s through Q4 2025, e.g. WTI closed 2025 at $57.35). By the eve of war (27 Feb 2026, the last trading day before the 28 Feb airstrikes) Brent spot had recovered to ~$72/bbl. So $65 = late-2025 average/forecast (WTI-weighted), $72 = Brent spot on 27 Feb 2026. Peak ~$120 reached during the war (CNBC timeline cites a >55% jump from $72; intraday spikes toward $120 on Hormuz supply fears). 'Now' = $74.43 Brent settle on 26 Jun 2026, back near pre-war levels after the 17 Jun MoU and gradual Hormuz reopening."
 },
 "usSpr": {
  "mmbBefore": 411,
  "mmbNow": 331,
  "fillPctNow": 46.4,
  "note": "SPR held 411 mb at 31 Dec 2025; drawn to ~331 mb by 19 Jun 2026 (EIA weekly), lowest since 1983. Fill % computed against ~714 mb authorized/nameplate capacity (331/714 ~= 46%). Drawdown driven by the US 172 mb contribution to the IEA collective action (Trump authorization, releases from ~mid-March at ~1.4 mb/day over ~120 days). NOTE: SPR is strategic-only stock; it is NOT counted in the IEA 90-day import-coverage column."
 },
 "ieaRelease": {
  "totalMmb": 400,
  "usShareMmb": 172,
  "decidedDate": "2026-03-11"
 },
 "freight": {
  "vlccNowUsdDay": 179600,
  "vlccPrewarUsdDay": 55000,
  "warRiskPremiumNote": "Prewar VLCC Mideast Gulf-China benchmark ran roughly $50-60k/day. During the war rates went vertical: ~$423k/day on the MEG-China route in late March (no precedent back to 2005), with peak earnings reported near $470k/day and individual fixtures toward ~$800k/day in the first week. As of late June 2026 the average VLCC rate is ~$179,600/day (up >90% w/w on reopening sentiment) but still far above prewar. War-risk premium: prewar hull war cover for a 7-day Gulf transit was ~0.10-0.25% of insured value (~$250-300k per VLCC transit); it spiked to ~1% of hull value (~$1.0-1.2m per transit) by end-March, with some P&I clubs suspending Gulf cover entirely; post-ceasefire it eased to ~0.3-0.5% of hull value."
 },
 "sources": [
  {
   "publisher": "U.S. EIA (Strategic Petroleum Reserve weekly stocks, WCSSTUS1)",
   "sourceClass": "official-primary",
   "asOf": "2026-06-19",
   "url": "https://www.eia.gov/dnav/pet/hist/LeafHandler.ashx?n=PET&s=WCSSTUS1&f=W",
   "nextPublish": "weekly (Wed)"
  },
  {
   "publisher": "International Energy Agency (collective action decision)",
   "sourceClass": "official-primary",
   "asOf": "2026-03-11",
   "url": "https://www.iea.org/news/iea-member-countries-to-carry-out-largest-ever-oil-stock-release-amid-market-disruptions-from-middle-east-conflict"
  },
  {
   "publisher": "EIA Europe Brent Spot Price FOB (RBRTE)",
   "sourceClass": "official-primary",
   "asOf": "2026-06-26",
   "url": "https://www.eia.gov/dnav/pet/hist/rbrtem.htm",
   "nextPublish": "daily"
  },
  {
   "publisher": "Trading Economics (Brent spot)",
   "sourceClass": "secondary-wire",
   "asOf": "2026-06-26",
   "url": "https://tradingeconomics.com/commodity/brent-crude-oil"
  },
  {
   "publisher": "CNBC (Iran war oil-price timeline)",
   "sourceClass": "secondary-wire",
   "asOf": "2026-04-21",
   "url": "https://www.cnbc.com/2026/04/21/oil-price-iran-war-middle-east.html"
  },
  {
   "publisher": "Al Jazeera (IEA 400 mb release; US 172 mb / 43% share)",
   "sourceClass": "secondary-wire",
   "asOf": "2026-03-13",
   "url": "https://www.aljazeera.com/news/2026/3/13/iea-announces-release-of-400-million-barrels-of-oil-but-is-it-enough"
  },
  {
   "publisher": "OilPrice.com (VLCC earnings near $470k/day)",
   "sourceClass": "secondary-wire",
   "asOf": "2026-03",
   "url": "https://oilprice.com/Latest-Energy-News/World-News/VLCC-Earnings-Near-470000-a-Day-as-Hormuz-Hopes-Drive-Tanker-Frenzy.html"
  },
  {
   "publisher": "CNBC (supertanker rates record; war-risk cover dropped)",
   "sourceClass": "secondary-wire",
   "asOf": "2026-03-03",
   "url": "https://www.cnbc.com/2026/03/03/middle-east-crisis-iran-us-shipping-oil-tankers-strait-of-hormuz.html"
  },
  {
   "publisher": "Hellenic Shipping News / Lloyd's List (VLCC rates on reopening, ~$179.6k/day)",
   "sourceClass": "secondary-wire",
   "asOf": "2026-06-25",
   "url": "https://www.hellenicshippingnews.com/how-the-vlcc-market-is-responding-to-a-possible-strait-of-hormuz-reopening/"
  },
  {
   "publisher": "Fortune (daily oil price tracker)",
   "sourceClass": "secondary-wire",
   "asOf": "2026-06-24",
   "url": "https://fortune.com/article/price-of-oil-06-24-2026/"
  }
 ]
}
```

## ade5b1f3ef6520f50
**Role:** You are an A-03 consumer subagent for USA …
```json
{
 "country": "United States",
 "beforeDays": null,
 "denominatorMbd": -1.6,
 "stockBasis": "IEA TOTAL-STOCK basis = strategic (SPR) + commercial/industry stocks, total petroleum (crude + refined products). Dec-2025 total US petroleum stocks incl. SPR ~1,687 mb (week ending 2025-12-12): SPR crude ~412 mb + commercial crude ~424 mb + products (gasoline, distillate, jet, propane, NGL, other). NOT strategic-only.",
 "netExporterConvention": "USA is a NET EXPORTER of total petroleum (crude+products): 2024 net imports ~ -1.6 mb/d (exports ~10.15 mb/d vs imports ~8.42 mb/d). On the IEA total-petroleum net-imports basis the denominator is NEGATIVE, so IEA days-of-net-import-cover is MATHEMATICALLY UNDEFINED. The IEA correspondingly treats the US as not bound by the 90-day net-import stockholding obligation and the US is excluded/'not applicable' on the IEA days-of-net-imports chart. CONVENTION CHOSEN: beforeDays = null (net-import-cover ill-defined). FOOTNOTE ALTERNATIVE (strategic+commercial vs GROSS crude imports): denominator = 2024 gross crude imports ~6.5 mb/d -> total-stock cover ~1,687 mb / 6.5 ~ 259 days; crude-only stock (~836 mb SPR+commercial) / 6.5 ~ 129 days; SPR-only (~412 mb) / 6.5 ~ 63 days. denominatorMbd field reports the FIXED net-import denominator (-1.6 mb/d) to flag the undefined sign; same D applies to 'today'.",
 "confidence": "Inferred-triangulated",
 "sources": [
  {
   "publisher": "IEA - Oil Stocks of IEA Countries / IEA total oil stocks December 2025 (data tool & chart)",
   "sourceClass": "official-primary",
   "asOf": "2025-12",
   "url": "https://www.iea.org/data-and-statistics/charts/iea-total-oil-stocks-december-2025",
   "nextPublish": "monthly (OMR)"
  },
  {
   "publisher": "IEA - Oil Market Report December 2025",
   "sourceClass": "official-primary",
   "asOf": "2025-12",
   "url": "https://www.iea.org/reports/oil-market-report-december-2025",
   "nextPublish": "2026-01 (monthly)"
  },
  {
   "publisher": "EIA - Weekly Petroleum Status Report (week ending 2025-12-12): commercial crude ~424.4 mb, SPR ~412.2 mb, total petroleum stocks incl SPR ~1,687 mb",
   "sourceClass": "official-primary",
   "asOf": "2025-12-12",
   "url": "https://ir.eia.gov/wpsr/wpsrsummary.pdf",
   "nextPublish": "weekly (Wednesdays)"
  },
  {
   "publisher": "EIA - U.S. Net Imports of Crude Oil and Petroleum Products (MTTNTUS2); 2024 net total petroleum ~ -1.6 mb/d (net exporter)",
   "sourceClass": "official-primary",
   "asOf": "2024 annual",
   "url": "https://www.eia.gov/dnav/pet/hist/LeafHandler.ashx?n=PET&s=MTTNTUS2&f=M",
   "nextPublish": "monthly"
  },
  {
   "publisher": "EIA - U.S. energy facts imports/exports (2024 imports ~8.42 mb/d, exports ~10.15 mb/d; net exporter since 2020; gross crude imports ~6.5 mb/d)",
   "sourceClass": "official-primary",
   "asOf": "2024 annual",
   "url": "https://www.eia.gov/energyexplained/us-energy-facts/imports-and-exports.php",
   "nextPublish": "annual"
  },
  {
   "publisher": "EIA Today in Energy - China, US, Japan hold most strategic oil inventories 2025",
   "sourceClass": "secondary-wire",
   "asOf": "2025",
   "url": "https://www.eia.gov/todayinenergy/detail.php?id=67504",
   "nextPublish": "n/a"
  }
 ]
}
```

## ae330e2b5792b0dc0
**Role:** You are an A-04 consumer subagent for France …
```json
{
 "country": "France",
 "todayDays": 98,
 "method": "published-triangulated",
 "confidence": "Inferred-triangulated",
 "hormuzDependenceShare": 0.11,
 "divergenceFlag": "none — published sources converge on a 90–100 day band for France's IEA net-import coverage; central anchor ~98 days. Mass-balance overlay deliberately NOT applied as the headline: France's emergency stocks (SAGESS ~120 mb total, ~97 mb SAGESS + ~39 mb operator) were not materially drawn during the crisis (the IEA 400 mb collective action was 172 mb US + non-French-weighted; no reported French SPR-style drawdown), so net ΔStock for France ≈ 0 and the as-reported coverage stands. Country-calibrated mass-balance below confirms a near-zero change rather than the global-average drawdown that would be the failure mode.",
 "sourceClassesUsed": [
  "official-primary",
  "secondary-wire",
  "proxy-satellite"
 ],
 "massBalance": {
  "replacementMbd": 0.13,
  "demandReliefMbd": 0,
  "blockedMbd": 0.18,
  "netRateR_mbd": -0.05,
  "tDays": 118,
  "sReleaseMmb": 0,
  "deltaStockMmb": -5.9,
  "deltaCoverageDays": -4.7,
  "denominatorMbd": 1.25,
  "perCountryCalibrationNote": "Calibrated to FRANCE's actual Hormuz exposure, NOT a global average. France's crude imports are ~12% Middle East (Iraq ~8%, small Saudi), zero Iranian; Hormuz-transiting share ~0.11. Of France's net import denominator D=1.25 mb/d, the genuinely Hormuz-routed slice ≈ 0.11*1.25*~1.3(crude-share gross-up cap) ≈ blocked exposure during the disruption. With Hormuz at 4.8/15 mb/d (32% of prewar), the at-risk Hormuz barrels for France are ~0.18 mb/d gross, but France substitutes readily from non-Hormuz origins (US 22%, sub-Saharan Africa 21%, North Africa 11%, North Sea 10%) giving replacement ~0.13 mb/d, so net loss is small (~0.05 mb/d) over the ~118-day disruption-to-now window. France launched NO national strategic release (S_release=0); the IEA collective 400 mb was overwhelmingly US (172 mb). Resulting ΔStock ≈ -5.9 mb (~-4.7 days) is a small theoretical erosion, NOT realized as a reported coverage cut — French emergency stocks held near 120 mb / ~98 days through the period. Hence the published ~98-day figure is the headline; mass-balance is the cross-check showing why France's number barely moves (low Hormuz dependence + deep non-Hormuz substitution + no domestic drawdown). beforeDays~98 + Δdays(~0, realized) = todayDays ~98."
 },
 "sources": [
  {
   "publisher": "International Energy Agency — France Oil Security Policy / SAGESS emergency stocks",
   "sourceClass": "official-primary",
   "asOf": "2025-12-31",
   "url": "https://www.iea.org/articles/france-oil-security-policy",
   "nextPublish": "annual"
  },
  {
   "publisher": "IEA — Strait of Hormuz Factsheet (Feb 2026): ~90% of Hormuz volumes to Asia, ~10% to Europe",
   "sourceClass": "official-primary",
   "asOf": "2026-02-28",
   "url": "https://iea.blob.core.windows.net/assets/c8248eba-8689-46d9-ae4b-b858b59c0f1c/StraitofHormuz2026-Factsheet.pdf",
   "nextPublish": "as-events"
  },
  {
   "publisher": "Statista — Oil stocks of IEA countries in days of net imports (IEA-based)",
   "sourceClass": "secondary-wire",
   "asOf": "2026-03-23",
   "url": "https://www.statista.com/chart/36019/oil-stocks-of-iea-countries-measured-in-days-of-net-imports/",
   "nextPublish": "as-events"
  },
  {
   "publisher": "Euronews — How long can the EU's oil reserves last (France ~120 mb / ~90-100 days)",
   "sourceClass": "secondary-wire",
   "asOf": "2026-04-03",
   "url": "https://www.euronews.com/my-europe/2026/04/03/how-long-can-the-eus-oil-reserves-last",
   "nextPublish": "as-events"
  },
  {
   "publisher": "Connexion France — Where does France's oil come from (Middle East ~12%, Iraq ~8%, US 22%, sub-Saharan Africa 21%)",
   "sourceClass": "secondary-wire",
   "asOf": "2025-07-01",
   "url": "https://www.connexionfrance.com/practical/where-does-frances-oil-come-from/783704",
   "nextPublish": "as-events"
  },
  {
   "publisher": "Visual Capitalist / EnergyNow — Oil trade through Strait of Hormuz by destination (Europe ~10%, Asia ~90%)",
   "sourceClass": "proxy-satellite",
   "asOf": "2026-03-01",
   "url": "https://www.visualcapitalist.com/charted-oil-trade-through-the-strait-of-hormuz-by-country/",
   "nextPublish": "as-events"
  }
 ]
}
```

## ae5807838dbc218d2
**Role:** You are an A-03 consumer subagent for Spain …
```json
{
 "country": "Spain",
 "beforeDays": 120,
 "denominatorMbd": 1.25,
 "stockBasis": "IEA TOTAL stocks = strategic (CORES, 42 days) + commercial/obligated industry (50 days) + any additional commercial stocks. Days expressed on IEA methodology = total oil stocks (crude + NGL + products, public + industry) divided by prior-year average daily NET imports of crude + products. NOT strategic-only. Spain's legal minimum obligation is 92 days of prior-year sales/consumption (industry 50 + CORES strategic 42), restored as of 31 May 2025 via Order TED/533/2025. IEA net-import-cover for total stocks runs materially above the 90-day floor.",
 "netExporterConvention": "Spain is a structural NET IMPORTER of oil (domestic crude production ~77 kb/d vs consumption ~1,322 kb/d). Net-importer convention applies: the IEA 90-day net-import floor is binding and beforeDays is computed against positive net imports. Spain re-exports refined products (major refiner), so NET imports (gross crude + products imports minus product exports) are below gross crude imports of ~1.30 mb/d; denominator uses net, not gross.",
 "confidence": "Modelled-EST",
 "sources": [
  {
   "publisher": "IEA — Oil Stocks of IEA Countries (data tool) / Oil Market Report December 2025",
   "sourceClass": "official-primary",
   "asOf": "2025-12",
   "url": "https://www.iea.org/data-and-statistics/data-tools/oil-stocks-of-iea-countries",
   "nextPublish": "monthly (OMR mid-month)"
  },
  {
   "publisher": "IEA — Spain Oil Security Policy / Spain legislation on oil security",
   "sourceClass": "official-primary",
   "asOf": "2025",
   "url": "https://www.iea.org/articles/spain-oil-security-policy"
  },
  {
   "publisher": "CORES (Corporacion de Reservas Estrategicas de Productos Petroliferos) — Spain strategic 42d + industry 50d = 92d obligation; Order TED/533/2025 (31 May 2025 reinstatement)",
   "sourceClass": "official-primary",
   "asOf": "2025-05-31",
   "url": "https://www.cores.es/en/estadisticas"
  },
  {
   "publisher": "Eurostat — Emergency oil stocks statistics / nrg_stk_oem (days equivalent, monthly)",
   "sourceClass": "official-primary",
   "asOf": "2025-05",
   "url": "https://ec.europa.eu/eurostat/databrowser/view/nrg_stk_oem/",
   "nextPublish": "monthly"
  },
  {
   "publisher": "Euronews — How long can the EU's oil reserves last? (EU/Eurostat per-country reserve days)",
   "sourceClass": "secondary-wire",
   "asOf": "2026-04-03",
   "url": "https://www.euronews.com/my-europe/2026/04/03/how-long-can-the-eus-oil-reserves-last"
  },
  {
   "publisher": "CEIC / Worldometer — Spain crude imports ~1.30 mb/d (Dec-2024), consumption ~1,322 kb/d, production ~77 kb/d (2024) — denominator triangulation",
   "sourceClass": "secondary-wire",
   "asOf": "2024-12",
   "url": "https://www.worldometers.info/oil/spain-oil/"
  }
 ]
}
```

## ae62042b1a1890bda
**Role:** You are an A-04 consumer subagent for UK …
```json
{
 "country": "United Kingdom",
 "todayDays": 90,
 "method": "published-triangulated",
 "confidence": "Inferred-triangulated",
 "hormuzDependenceShare": 0.07,
 "sourceClassesUsed": [
  "official-primary",
  "secondary-wire",
  "proxy-satellite"
 ],
 "divergenceFlag": "none-material. Two independent classes converge on the UK holding at the ~90-day IEA net-import floor: official-primary (IEA stockholding rule + GOV.UK confirmation that UK exceeds the 90-day minimum, end-2024 stocks 11.2 Mt) and secondary-wire (Al Jazeera/BOE Report, 26 Feb 2026: UK ~68 mb total = 38 mb crude + 30 mb products, reserves 'thought to last around 90 days'). No run-date daily days-of-cover figure is published, so Tier-1 anchors on the structural IEA net-import basis. Mass-balance (Tier 2) not computed because the A-03 denominator D was supplied as 'unknown mb/d' and the UK's near-zero Hormuz crude exposure (~7%) makes the disruption perturbation immaterial to net-import coverage. Caveat: IEA days-of-net-import cover for the UK is structurally HIGH (the UK is a marginal net crude importer / large North Sea producer-exporter, small net-import denominator), so on a strict net-import basis actual cover materially EXCEEDS 90 days; 90 is reported as the conservative confirmed floor, not a ceiling.",
 "massBalance": {
  "replacementMbd": 0,
  "demandReliefMbd": 0,
  "blockedMbd": 0,
  "netRateR_mbd": 0,
  "tDays": 118,
  "sReleaseMmb": 13.5,
  "deltaStockMmb": -13.5,
  "denominatorMbd": 0,
  "deltaCoverageDays": 0,
  "beforeDays": 90,
  "perCountryCalibrationNote": "Mass-balance NOT used as the headline (Tier 1 published-triangulated applies). Shown for completeness only and NOT dimensionally executed to a numeric todayDays because the A-03 fixed denominator D was supplied as 'unknown mb/d' — dividing by an undefined D would violate the 'never guess' rule. Per-country calibration: UK Hormuz crude dependence is ~7% (crude is ~2/3 US+Norway; OPEC ~20% of crude but dominated by non-Gulf Libya/Nigeria/Algeria; Saudi/Iraq/UAE/Kuwait residual ~5-10%). So blockedMbd attributable to the UK from the Hormuz contraction is negligible at the crude-import level. The UK's only direct stock action was a 13.5 mb release into the IEA 400 mb collective action (sReleaseMmb=13.5, deltaStockMmb=-13.5), a ~3.4% draw on ~68 mb total stocks — i.e. roughly a -3 day move on a 90-day base if D were the prewar net-import rate, but this is offset by the parallel reduction in the net-import denominator and by stock rebuild, leaving coverage at the ~90-day floor. denominatorMbd left 0 to denote 'D unknown'. A global-average denominator would be the failure mode here and is deliberately avoided."
 },
 "sources": [
  {
   "publisher": "International Energy Agency (oil security / 90-day net-import stockholding obligation)",
   "sourceClass": "official-primary",
   "asOf": "2026-03-11",
   "nextPublish": "as-events",
   "url": "https://www.iea.org/about/oil-security-and-emergency-response"
  },
  {
   "publisher": "GOV.UK (UK joins IEA coordinated oil stock release; UK exceeds 90-day minimum; end-2024 stocks 11.2 Mt)",
   "sourceClass": "official-primary",
   "asOf": "2026-03-11",
   "nextPublish": "as-events",
   "url": "https://www.gov.uk/government/news/uk-joins-iea-members-in-coordinated-oil-stock-release"
  },
  {
   "publisher": "UK DESNZ DUKES 2025 Chapter 3 (Oil and Oil Products; crude import sources, OPEC ~20%, US+Norway ~2/3)",
   "sourceClass": "official-primary",
   "asOf": "2025-07-31",
   "nextPublish": "annual",
   "url": "https://assets.publishing.service.gov.uk/media/68dbe4c7c487360cc70c9f5f/DUKES_2025_Chapter_3.pdf"
  },
  {
   "publisher": "Al Jazeera (which countries have strategic oil reserves; UK ~38 mb crude + ~30 mb products = ~68 mb, ~90 days)",
   "sourceClass": "secondary-wire",
   "asOf": "2026-03-23",
   "nextPublish": "as-events",
   "url": "https://www.aljazeera.com/news/2026/3/23/which-countries-have-strategic-oil-reserves-and-how-much"
  },
  {
   "publisher": "BOE Report (G7 emergency reserves; UK total ~68 mb as of 26 Feb 2026)",
   "sourceClass": "secondary-wire",
   "asOf": "2026-03-09",
   "nextPublish": "as-events",
   "url": "https://boereport.com/2026/03/09/how-much-oil-do-g7-countries-hold-in-emergency-reserves/"
  },
  {
   "publisher": "IndexBox (UK releases 13.5M barrels in IEA action, 2026)",
   "sourceClass": "secondary-wire",
   "asOf": "2026-03-12",
   "nextPublish": "as-events",
   "url": "https://www.indexbox.io/blog/uk-joins-international-partners-in-coordinated-oil-stock-release/"
  },
  {
   "publisher": "Statista (oil stocks of IEA countries measured in days of net imports)",
   "sourceClass": "proxy-satellite",
   "asOf": "2025-12-31",
   "nextPublish": "annual",
   "url": "https://www.statista.com/chart/36019/oil-stocks-of-iea-countries-measured-in-days-of-net-imports/"
  }
 ]
}
```

## ae8b859a503b998fd
**Role:** You are an A-03 consumer subagent for Poland …
```json
{
 "country": "Poland",
 "beforeDays": null,
 "denominatorMbd": 0.7,
 "stockBasis": "IEA total stocks (strategic + commercial), days of net-import cover. Target metric is the IEA \"Oil stocks of IEA countries\" / OMR closing-stock days-of-net-import-cover for Poland, end-Dec-2025. This specific published total-stock days figure could NOT be verified: all primary hosts (www.iea.org, iea.blob.core.windows.net, eia.gov, statista.com) are blocked by org egress policy (403 CONNECT, confirmed in agent-proxy failure log) and WebFetch returns 403 on each. Per proxy README, blocked hosts are reported, not bypassed. Only retrievable data via WebSearch is the standing structural emergency obligation = 90 days net imports (53 days obligated industry stocks + 37 days RARS public stocks); Poland consistently reported above 90 days. Total stocks including commercial typically exceed the 90-day floor but the exact Dec-2025 number is unverifiable here, hence beforeDays=null / Absent for the precise IEA total-stock metric. Structural floor (not the requested metric): >=90 days.",
 "netExporterConvention": "Poland is a net oil importer (consumption ~738 kb/d vs domestic production ~34 kb/d, 2024). Net-import convention applies; days-of-net-import cover is the correct denominator basis. Not a net exporter, so no negative-net-imports / consumption-days fallback needed.",
 "confidence": "Absent",
 "sources": [
  {
   "publisher": "IEA — IEA total oil stocks, December 2025 (chart) + Oil Stocks of IEA Countries data tool / OMR Dec 2025",
   "sourceClass": "official-primary",
   "asOf": "2025-12-31",
   "url": "https://www.iea.org/data-and-statistics/charts/iea-total-oil-stocks-december-2025",
   "nextPublish": "monthly with OMR"
  },
  {
   "publisher": "IEA — Poland Oil Security Policy (structural 90-day obligation: 53d industry + 37d RARS)",
   "sourceClass": "official-primary",
   "asOf": "2025",
   "url": "https://www.iea.org/articles/poland-oil-security-policy"
  },
  {
   "publisher": "Worldometer — Poland oil consumption 738 kb/d, production 34 kb/d (2024); proxy net imports ~704 kb/d",
   "sourceClass": "proxy-satellite",
   "asOf": "2024",
   "url": "https://www.worldometers.info/oil/poland-oil/"
  },
  {
   "publisher": "Agent egress proxy — failure log confirming www.iea.org, iea.blob.core.windows.net, eia.gov 403 CONNECT (hosts blocked)",
   "sourceClass": "modelled",
   "asOf": "2026-06-26",
   "url": "http://127.0.0.1:39461/__agentproxy/status"
  }
 ]
}
```

## aef229ad09f7bacb1
**Role:** You are A-15 Hormuz-Duration Scenario Tree …
```json
{
 "scenarios": [
  {
   "id": "S1-reopen-fast",
   "trigger": "60-day ceasefire (MoU 17 Jun) converts to durable settlement; IRGC formally rescinds the ~20 Jun closure declaration and lifts the permit/escort regime; US-Iran communication line (21 Jun) normalizes into guaranteed commercial passage. Confirming signal: AIS-dark southern-corridor share collapses as vessels re-broadcast, PortWatch transits re-converge toward the ~93/day baseline, war-risk hull premium falls below ~0.5% of hull value.",
   "reserveTrajectory": "Draw STOPS, then reverses. Observed strategic draw (~3.8 mb/d global stock, ~1.47 mb/d OECD govt, ~0.72-1.29 mb/d US SPR) goes to zero within weeks as Gulf shut-in (~9.2 mb/d) restarts and ~9.3 mb/d stranded throughput re-floats. US SPR holds near the 331 mb floor (week-ending 19 Jun level), then begins slow statutory refill; OECD govt stocks (lowest since Dec 1990 after -163 mb) stabilize. The remaining ~214 mb of the unspent 400 mb IEA authorization is stood down rather than delivered. No exhaustion clock runs.",
   "brentPath": "Reversion toward pre-war structural fair value. From ~$74.43 (26 Jun, already near year-lows and down from the Mar war peak of ~+64%), residual war-risk premium fully bleeds out toward ~$60-68 as physical and legal status reconverge. Backwardation flattens; the prompt-spread blowout from stranded-barrel scarcity unwinds. WTI sustains below $70. Trump 'strait stays open / no transit fees' posture caps upside.",
   "restockTimeline": "Refill is multi-quarter, not immediate. Bypass infrastructure stays the gating physical constraint into recovery: Yanbu port-gate (~4 mb/d realized vs 7 mb/d piped) and Fujairah (~1.5 mb/d) cap how fast Gulf crude re-reaches water even after the channel opens. Realistic path to prewar ~15 mb/d Hormuz throughput: months. US SPR refill at historical ~4-6 mb/month procurement pace implies ~3-4 years to restore the ~80 mb drawn; IEA stock rebuild similarly multi-year. Restock LAGS price normalization by quarters because agencies buy into a falling market deliberately.",
   "sprExhaustionNote": "Not applicable — draw halts before any floor is approached. US SPR 331 mb preserved; the 251-day runway to a ~150 mb operational floor (full-war-avg rate) is never consumed.",
   "probability": "unweighted"
  },
  {
   "id": "S2-contested-grinding",
   "trigger": "Current observed base case (as of 26 Jun 2026). Ceasefire holds but does NOT convert: IRGC closure declaration stays legally in force and unenforced; permit/escort regime persists; flow recovers gradually and reversibly (Kpler ~4.8 mb/d, ~32% of the ~15 mb/d prewar exit baseline, highest since 28 Feb war start). Tracker divergence stays structural — AIS-dark southern-Omani-corridor transits keep PortWatch (~5/day) understating true throughput while Windward (62 vessels 24 Jun) and Kpler capture it. IRGC turn-back orders intermittently stall individual recovery legs.",
   "reserveTrajectory": "Slow continued draw, decelerating. Bypass realized ~5.7 mb/d + recovering Hormuz transit ~4.8 mb/d leaves a residual supply gap that demand destruction (~472 mb cumulative, 2Q26 deliveries -5 mb/d y-o-y) and ongoing stock draw cover. Global stock draw decays from the war-peak 3.8 mb/d toward ~1-2 mb/d as flow recovers. US SPR continues bleeding at roughly the recent acute ~1.29 mb/d (340.3->331.2 in the 12-19 Jun week) tapering toward the full-war ~0.72 mb/d average. OECD govt stocks keep grinding lower from their post-1990 low. rho stays ~0.20 (band 0.15-0.26) — chokepoint does NOT conserve reserves; barrels are destroyed-at-source (~1,080 mb foregone output), not stockpiled.",
   "brentPath": "Range-bound, headline-driven, with a structural floor under it. ~$70-85, anchored near the current ~$74 with episodic spikes on enforcement headlines (the 19 Jun Geneva postponement spike is the template) that decay within days. No sustained re-rating absent a state change. Modest residual war-risk premium (~1%, ~$2M/VLCC) persists; prompt backwardation stays firm on the ~9.3 mb/d stranded-barrel overhang but does not blow out.",
   "restockTimeline": "No restock — net draw continues, slowly. Stock REBUILD does not begin in this state; the system is still net-drawing emergency and commercial inventory, just at a decelerating rate. Bypass ceiling (~6.5 mb/d, ~5.7 realized) and port-gate constraints (Yanbu ~4, Fujairah ~1.5) cap recovery; new ADCOP West-East doubling line not online until 2027 so no near-term structural lift. First plausible window for net rebuild is contingent on transition to S1.",
   "sprExhaustionNote": "US SPR runway at the recent acute ~1.29 mb/d: ~256 days to zero from 331 mb (-> ~Mar 2027), but only ~140 days to a ~150 mb operational/drawdown-integrity floor (-> ~Nov 2026). At the full-war-average ~0.72 mb/d the floor is ~251 days out (-> ~late Feb 2027). The binding constraint is the ~150 mb floor, not zero. In S2 the decelerating rate pushes these dates LATER than the linear project
… (truncated)
```

## af37207d0b1fd2d49
**Role:** You are A-05 Restocking Assessment …
```json
{
 "depletion": "CONSUMER AND PRODUCER, but overwhelmingly consumer-side and demand-side — NOT a conservation story. ~4 months post-war (war start 28 Feb 2026, ceasefire MoU 17 Jun), the adjustment ledger shows rho = 0.20 (band 0.15-0.26), an order of magnitude below the conservation threshold of 1.0. Decomposition of the ~1,200 mb supply gap: (i) CONSUMER draw ~615 mb of stocks — incl. US SPR 411->331 mb (~80 mb strategic draw, EIA WCSSTUS1 19 Jun) and ~186 mb total IEA strategic releases from the largest-ever 400 mb coordinated action (US share 172 mb, decided 11 Mar); (ii) DEMAND DESTRUCTION ~472 mb (2Q26 deliveries -5 mb/d y-o-y, IEA OMR June); (iii) PRODUCER build only ~120 mb genuinely stranded (floating +~100, onshore +~20; Kpler/Vortexa ~90 mb stranded-crude cross-check, ~35 mb exited post-deal per CNBC 24 Jun). The dog that did NOT bark: ~1,080 mb of blocked Gulf output (~9.2 mb/d x 118d) was SHUT IN AT THE WELLHEAD — destroyed-at-source, never produced — because Gulf tankage saturated within ~1-2 weeks (Ras Tanura/Ju'aymah ~90-95% full by early March per Kayrros; Iraq began shutting Rumaila 3 Mar per Bloomberg; Basrah collapsed ~4.3->1.4 mb/d). Producers could not hoard what they could not store. Reconciliation residual -179 mb (~15%), absorbing modelled-tier uncertainty on Atlantic substitution (~410 mb diverted East-of-Suez) and demand elasticity. Net depletion of consumable global inventories is real and severe (IEA flags inventories to historic lows; SPR lowest since 1983), driven by the consumer/demand legs, not offset by producer hoarding.",
 "fromWhere": "Restocking can ONLY come from barrels that physically reach water outside the Hormuz constraint. Ranked by true Hormuz relief: (1) BYPASS PIPELINES — realized ~5.7 mb/d against a ~6.5 mb/d ceiling vs ~15 mb/d prewar Hormuz crude exit, leaving ~9.3 mb/d stranded. The only genuine relief is Saudi Petroline/East-West to Yanbu (Red Sea exit, ~4.0 mb/d realized = ~70% of all bypass; pipeline maxed 7.0 mb/d on 11 Mar but PORT/marine-terminal at Yanbu is binding, not the line — ~1.0 mb/d drawn by local refineries, Vortexa pegged effective loading nearer 3.0 mb/d) and UAE ADCOP/Habshan-Fujairah (~1.5 mb/d, Gulf of Oman exit, but terminal sits at the strait's mouth within Iranian strike reach). Iraq Kirkuk-Ceyhan (~0.2 mb/d realized, targeting 0.5-0.65) is NORTH-ONLY — fed by Kirkuk crude, NOT connected to Basrah's >3.3 mb/d southern exposure, so near-ZERO true Hormuz relief. Iran Goreh-Jask ~0 (idle since 2024). (2) HORMUZ ITSELF, contested-but-flowing — Kpler ~4.8 mb/d as of 26 Jun (highest since war start, still ~32% of prewar), gradual/reversible under the fragile 60-day ceasefire and IRGC permit/escort regime; ~35 mb stranded-tanker + ~21 mb Iranian-linked volume cleared in June. (3) ATLANTIC BASIN / US shale / Russia / non-Gulf — ~410 mb already diverted East-of-Suez during the war (the substitution leg). CRITICAL TRAP: OPEC's ~3.5-4 mb/d effective spare is NOT a source — it is held almost entirely by Saudi/UAE whose incremental barrels must exit via the same blocked Gulf geography (Vitol's Hardy: 'all spare sits behind the Strait'). Double trap: spare can be PUMPED but not SHIPPED (bypass exits are port-gated), and Kuwait (~2.5 mb/d) + southern Basrah (>3.3 mb/d) have ZERO inland bypass. Activating spare does little for global balances while the strait is constrained. So restocking supply = Yanbu Red Sea barrels + Fujairah + recovering Hormuz transit + Atlantic substitution — explicitly NOT OPEC spare.",
 "priceVsPrewar": "A STRANDED-GULF-DISCOUNT vs ATLANTIC-PREMIUM split, now largely collapsed post-ceasefire but structurally instructive. Three baselines must be reconciled: $65 = late-2025 anchor (J.P. Morgan FY2025 WTI-weighted average forecast; WTI closed 2025 at $57.35, Brent spot mid-to-high $60s); $72 = Brent SPOT on 27 Feb 2026, the last trading day before the 28 Feb airstrikes (eve-of-war, recovered from the late-2025 trough); peak ~$120 intraday during the war (+>55-64% on Hormuz fears). NOW = Brent $74.43 settle 26 Jun (WTI dipped below $70), back near prewar after the 17 Jun MoU and gradual reopening — war-risk oil premium has largely bled out, residual is modest and headline-driven (spiked on the 19 Jun Geneva postponement), NOT structural; markets price the physical strait as open despite the legal IRGC closure. The SPLIT during the war: stranded Gulf grades (Basrah, Kuwait) with no bypass traded at deep discounts to clear into saturated regional tankage / forced shut-in, while Atlantic-basin/waterborne crude carried the premium because it could actually reach buyers. The freight + war-risk premium drove the wedge: VLCC MEG-China spiked from ~$50-60k/day prewar to ~$423k/day late March (peak earnings ~$470k/day, fixtures toward ~$800k/day), now ~$179,600/day (up >90% w/w on reopening but still >3x prewar); hull war-risk cover went from ~0.10-0.25% of insured value (~$250-300k/VLCC transit) to ~1% (~$1.0-1.2m, some P&I clubs susp
… (truncated)
```

## af446de94c14baa78
**Role:** You are an A-04 consumer subagent for Indonesia …
```json
{
 "country": "Indonesia",
 "todayDays": 21,
 "method": "published-triangulated",
 "confidence": "Inferred-triangulated",
 "hormuzDependenceShare": 0.2,
 "sourceClassesUsed": [
  "official-primary",
  "secondary-wire"
 ],
 "divergenceFlag": "Published figures cluster tightly (20-23-25 days) within ~12% of midpoint, below the 15% divergence threshold — no dual-tier output required. Important caveat: Indonesia's coverage is structurally capped by storage capacity (~25 days max), so unlike IEA members it cannot build coverage via stock-release dynamics; the number reflects operational rotating stocks (Pertamina), NOT a strategic reserve. The Hormuz crisis lowered the government's quoted figure to ~20 days (crisis-period statement) from the ~23-day operational norm, reflecting Gulf-supply stress, not a stock release. Indonesia is a net crude importer and NOT an IEA member.",
 "massBalance": {
  "replacementMbd": 0,
  "demandReliefMbd": 0,
  "blockedMbd": 0,
  "netRateR_mbd": 0,
  "tDays": 0,
  "sReleaseMmb": 0,
  "deltaStockMmb": 0,
  "deltaCoverageDays": 0,
  "denominatorMbd": 0.832,
  "todayDays": 21,
  "perCountryCalibrationNote": "Mass-balance NOT used as the headline method — the coverage-in-days figure is directly PUBLISHED by Indonesian government officials during the exact crisis window (June 2026) and triangulated across multiple independent wires, so it supersedes any modelled estimate. Mass-balance fields are zeroed because (a) Indonesia is not an IEA member and made no national SPR release into the import-coverage stock; (b) coverage is hard-capped by storage capacity (~25 days), so the standard replacement/demand-relief/blocked dynamics that move IEA-member coverage do not apply here; the binding constraint is physical tankage, not flow arithmetic. Denominator D=0.832 mb/d carried from A-03 for consistency. Hormuz-dependent crude share ~0.20 (Gulf suppliers: Saudi ~18% of crude imports plus UAE/Iraq), materially lower than Asian peers due to Indonesia's Nigeria/Angola/US diversification."
 },
 "sources": [
  {
   "publisher": "Jakarta Globe (Fuel Reserves Safe for 20 Days, Govt Says Amid Hormuz Crisis)",
   "sourceClass": "secondary-wire",
   "asOf": "2026-06",
   "nextPublish": "as-events",
   "url": "https://jakartaglobe.id/business/fuel-reserves-safe-for-20-days-govt-says-amid-hormuz-crisis"
  },
  {
   "publisher": "Jakarta Globe (Energy Council Member: 23-Day Fuel Reserve Is Crisis Buffer)",
   "sourceClass": "secondary-wire",
   "asOf": "2026-06",
   "nextPublish": "as-events",
   "url": "https://jakartaglobe.id/business/energy-council-member-indonesias-23day-fuel-reserve-is-crisis-buffer-not-countdown"
  },
  {
   "publisher": "IDNFinancials (Bahlil Lahadalia: 25-day fuel stock)",
   "sourceClass": "secondary-wire",
   "asOf": "2026-06",
   "nextPublish": "as-events",
   "url": "https://www.idnfinancials.com/news/61943/bahlil-lahadalia-25-day-fuel-stock-where-to-store-more-imports"
  },
  {
   "publisher": "VIR / IEA (ASEAN countries exposed by Middle East oil dependence — Indonesia ~20% of crude imports from Gulf)",
   "sourceClass": "secondary-wire",
   "asOf": "2026",
   "nextPublish": "as-events",
   "url": "https://vir.com.vn/asean-countries-exposed-by-middle-east-oil-dependence-149076.html"
  },
  {
   "publisher": "Databoks Katadata (Saudi Arabia Indonesia's 3rd Largest Crude Supplier 2025, ~17.7% share)",
   "sourceClass": "secondary-wire",
   "asOf": "2025",
   "nextPublish": "annual",
   "url": "https://databoks.katadata.co.id/en/energy/statistics/69a661f7c9184/saudi-arabia-indonesias-3rd-largest-crude-oil-supplier-in-2025"
  },
  {
   "publisher": "Indonesia Business Post (Indonesia targets 90-day oil reserve; current ~23 days operational)",
   "sourceClass": "secondary-wire",
   "asOf": "2026",
   "nextPublish": "as-events",
   "url": "https://indonesiabusinesspost.com/6233/energy-and-resources/indonesia-targets-90-day-oil-reserve-to-bolster-energy-security-amid-global-volatility"
  }
 ]
}
```

## afad45189039bbd2a
**Role:** You are A-01 Hormuz Status & Flow — the hinge …
```json
{
 "status": "contested-but-flowing",
 "flowMbdNow": 4.8,
 "flowMbdPrewar": 15,
 "asOf": "2026-06-26",
 "reopeningTimeline": "No formal reopening. Fragile 60-day ceasefire (MoU signed 17 Jun 2026) in effect through ~mid-Aug 2026. IRGC formal closure declaration (~20 Jun, reported 22 Jun by Al Jazeera) remains legally in force but is not physically enforced — Geneva talks established a US-Iran \"communication line\" (21 Jun) for safe commercial passage during the 60-day window. Flow recovery is gradual and reversible: Kpler shows ~4.8 mb/d, the highest since the 28 Feb war start but still ~32% of the ~15 mb/d prewar exit baseline. Full normalization is contingent on the ceasefire holding and IRGC permit/escort regime being lifted; an IRGC turn-back order on the southern corridor already stalled one recovery leg. Realistic path to prewar throughput: months, not weeks, and only if the ceasefire converts to a durable settlement.",
 "warRiskPremium": "Sharply elevated but decaying. War-risk hull premiums peaked Mar 2026 at 2.5-5% of hull value (~$5M/VLCC transit) vs ~0.125% prewar; eased to ~1% (~$2M/VLCC) by Apr. Oil war-risk premium has largely bled out post-ceasefire: Brent ~$74.43/bbl on 26 Jun (down ~1% d/d, near year-lows, off the Mar war peak ~+64%), with WTI dipping below $70 as transits accelerated and Trump signaled the strait stays open / no transit fees. Residual premium is now modest and headline-driven (spiked on the 19 Jun Geneva postponement), not structural — markets are pricing the physical strait as open despite the legal closure.",
 "trackerDivergence": "Large and structural, driven by AIS visibility, not real flow. PortWatch/IMF (AIS-broadcasting crossings only) showed ~5 transits/day for 2026-06-21 vs a ~93/day pre-crisis baseline — a near-collapse that materially understates true throughput. Windward (satellite + AIS-anomaly detection) recorded 62 vessels on 24 Jun (21 in / 41 out), including 5 dark transits, with outbound concentrated on the southern Omani-coast corridor (26 of 41). CENTCOM cited 55 transits carrying >17M barrels on the single record day of 20 Jun. Kpler (cargo-flow modeling) reconciles to ~4.8 mb/d sustained plus ~21M barrels of Iranian-linked and ~35M barrels of stranded-tanker volume cleared in June. WHY THEY DIVERGE: vessels disable AIS transponders and hug the Omani shoreline lane to avoid IRGC detection/permit enforcement; AIS-only counters (PortWatch) miss these dark transits and read low, while satellite/SAR-augmented (Windward) and cargo-inference (Kpler) trackers capture them and read materially higher. The true number sits well above the PortWatch AIS floor and below the CENTCOM single-day record. Iran's own signals are internally contradictory (IRGC declared closed; foreign ministry said shipping \"operating normally\").",
 "sources": [
  {
   "publisher": "Kpler (via CNBC)",
   "sourceClass": "forecaster",
   "asOf": "2026-06-24",
   "nextPublish": "daily",
   "url": "https://www.cnbc.com/2026/06/24/oil-tanker-strait-hormuz-iran-deal.html",
   "publisher_note": "~4.8 mb/d confirmed flow; ~35M barrels of stranded tankers exited; ~21M barrels Iranian-linked cleared in June; prewar ~15 mb/d exits"
  },
  {
   "publisher": "IMF PortWatch",
   "sourceClass": "proxy-satellite",
   "asOf": "2026-06-21",
   "nextPublish": "weekly",
   "url": "https://portwatch.imf.org/pages/cc317ba850e34c4dadbead6f7b336fb1"
  },
  {
   "publisher": "Windward",
   "sourceClass": "proxy-satellite",
   "asOf": "2026-06-24",
   "nextPublish": "daily",
   "url": "https://windward.ai/blog/irgc-turn-back-order-stalls-strait-of-hormuz-recovery/"
  },
  {
   "publisher": "Al Jazeera",
   "sourceClass": "secondary-wire",
   "asOf": "2026-06-22",
   "nextPublish": "as-events",
   "url": "https://www.aljazeera.com/economy/2026/6/22/shipping-stalls-in-strait-of-hormuz-after-iran-declares-key-waterway-shut"
  },
  {
   "publisher": "CNN",
   "sourceClass": "secondary-wire",
   "asOf": "2026-06-20",
   "nextPublish": "as-events",
   "url": "https://www.cnn.com/2026/06/20/world/live-news/iran-war-trump-israel-lebanon"
  },
  {
   "publisher": "Trading Economics (Brent)",
   "sourceClass": "proxy-tanker",
   "asOf": "2026-06-26",
   "nextPublish": "daily",
   "url": "https://tradingeconomics.com/commodity/brent-crude-oil"
  }
 ]
}
```

## afc254dc63e6d7d29
**Role:** You are an A-04 consumer subagent for Philippines …
```json
{
 "country": "Philippines",
 "todayDays": 46.47,
 "method": "published-triangulated",
 "confidence": "Inferred-triangulated",
 "hormuzDependenceShare": 0.95,
 "sourceClassesUsed": [
  "official-primary",
  "secondary-wire"
 ],
 "divergenceFlag": "none — DOE official weekly inventory (46.47 days, 12 Jun 2026) is the authoritative national coverage metric; corroborated by wire reporting on the 50.9 → 50.42 → 46.47-day drawdown trajectory and Palace 'crude enough until June 30' framing. No >15% divergence across sources.",
 "sources": [
  {
   "publisher": "Philippine DOE Oil Industry Management Bureau (via GMA News / Philstar)",
   "sourceClass": "official-primary",
   "asOf": "2026-06-12",
   "nextPublish": "weekly",
   "url": "https://www.gmanetwork.com/news/topstories/nation/981591/explainer-how-long-will-ph-oil-supply-last-amid-middle-east-tensions/story/"
  },
  {
   "publisher": "Rappler (DOE fuel supply status 50.42 days)",
   "sourceClass": "secondary-wire",
   "asOf": "2026-04-06",
   "nextPublish": "as-events",
   "url": "https://www.rappler.com/business/department-energy-philippines-fuel-supply-status-april-6-2026/"
  },
  {
   "publisher": "Gulf News (Marcos: crude supply enough until June 30, 2026)",
   "sourceClass": "secondary-wire",
   "asOf": "2026-03-28",
   "nextPublish": "as-events",
   "url": "https://gulfnews.com/business/energy/philippines-crude-oil-supply-to-last-until-june-30-says-marcos-1.500488056"
  },
  {
   "publisher": "OEC / Trading Economics (Philippines crude imports >95% Persian Gulf; Saudi >50%, UAE, Iraq)",
   "sourceClass": "proxy-tanker",
   "asOf": "2024-12-31",
   "nextPublish": "annual",
   "url": "https://oec.world/en/profile/bilateral-product/crude-petroleum/reporter/phl"
  }
 ],
 "massBalance": {
  "replacementMbd": 0,
  "demandReliefMbd": 0,
  "blockedMbd": 0,
  "netRateR_mbd": 0,
  "sReleaseMmb": 0,
  "tDays": 0,
  "deltaStockMmb": 0,
  "deltaCoverageDays": 0,
  "denominatorMbd": 0.49,
  "perCountryCalibrationNote": "Mass-balance path NOT used as headline. A published official coverage figure exists (DOE OIMB weekly: 46.47 days total fuel inventory as of 12 Jun 2026), so method (1) published-triangulated governs and is reported directly. The Philippines has NO state strategic petroleum reserve; coverage is the sum of mandatory commercial stocks (refiners ~30d crude/product, bulk importers ~15d, retailers ~7d) blended to the ~46-47 day national average. Hormuz dependence ~0.95 (>95% of crude via Persian Gulf: Saudi >50%, UAE, Iraq), 98% crude import-dependent — among the most Hormuz-exposed Asian importers. The 46.47d figure already nets the contested-but-flowing Hormuz throughput (4.8 mb/d) and accelerated alternative-source/Russian procurement against the ~50.9d pre-June level; the observed drawdown (50.9 → 46.47 over ~3 months) implies a modest net deficit despite partial Hormuz recovery. D=0.49 mb/d from A-03.",
  "massBalanceUnused": true
 }
}
```

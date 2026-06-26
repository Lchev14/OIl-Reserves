export const meta = {
  name: 'hormuz-reserve-intel',
  description: 'Global crude reserve, redistribution & restocking intelligence (Hormuz 2026, v2 maximal) — consumer coverage + producer storage + redistribution-ledger thesis test + throughput model + scenario tree, with frame-verify and isolated verify/red-team gates',
  whenToUse: 'Run with Workflow({scriptPath: "workflows/hormuz-reserve-intel.workflow.js", args:{runDate, daysElapsed}}). Produces consumer table + producer table + global redistribution ledger + throughput model + restocking assessment + demand estimate + Hormuz-duration scenario tree + weekly trajectory, fully sourced and confidence-tagged.',
  phases: [
    { title: 'Frame', detail: 'A-00 verify war/Hormuz/IEA spine >=3 independent sources; STOP if it fails' },
    { title: 'Hinge', detail: 'A-01 Hormuz status/flow + A-02 price/indicators/freight' },
    { title: 'Consumer', detail: 'A-03 Dec-2025 baseline + A-04 June-2026 today, 16 countries each' },
    { title: 'Producer', detail: 'A-11 Gulf-6 exporter schema + A-12 throughput/bypass model' },
    { title: 'Ledger', detail: 'A-13 redistribution thesis test: consumer draws vs producer builds vs foregone output -> rho + verdict' },
    { title: 'Forward', detail: 'A-14 weekly trajectory + A-15 Hormuz-duration scenario tree + A-16 import-at-risk' },
    { title: 'Restock', detail: 'A-05 restocking assessment + A-06 restocking-demand estimate' },
    { title: 'Lenses', detail: 'A-07 competing-views lens panel (ACH)' },
    { title: 'Verify', detail: 'A-08 source verification + reconciliation + A-09 adversarial red team (isolated)' },
    { title: 'Synthesis', detail: 'A-10 assemble output contract; disagreements + thesis verdict preserved' },
  ],
}

// ---------------------------------------------------------------------------
const RUN_DATE = (args && args.runDate) || 'the current run date (late June 2026)'
const T_ELAPSED = (args && args.daysElapsed) || 118 // war start 28-Feb -> run date

const CONSUMERS = [
  { c: 'USA', grp: 'Americas', iea: true, netExporter: true },
  { c: 'Germany', grp: 'Europe', iea: true },
  { c: 'France', grp: 'Europe', iea: true },
  { c: 'UK', grp: 'Europe', iea: true },
  { c: 'Italy', grp: 'Europe', iea: true },
  { c: 'Spain', grp: 'Europe', iea: true },
  { c: 'Netherlands', grp: 'Europe', iea: true, netExporter: true },
  { c: 'Poland', grp: 'Europe', iea: true },
  { c: 'Japan', grp: 'Asia', iea: true },
  { c: 'South Korea', grp: 'Asia', iea: true },
  { c: 'China', grp: 'Asia', iea: false },
  { c: 'India', grp: 'Asia', iea: true },
  { c: 'Thailand', grp: 'Asia', iea: false },
  { c: 'Philippines', grp: 'Asia', iea: false },
  { c: 'Indonesia', grp: 'Asia', iea: false },
  { c: 'Vietnam', grp: 'Asia', iea: false },
]

const PRODUCERS = [
  { c: 'Saudi Arabia', bypass: 'Petroline/Yanbu (Red Sea) port-gated' },
  { c: 'UAE', bypass: 'ADCOP/Fujairah (Gulf of Oman)' },
  { c: 'Iran', bypass: 'Goreh-Jask (negligible/not viable)' },
  { c: 'Iraq', bypass: 'Kirkuk-Ceyhan (north only; Basrah=zero bypass)' },
  { c: 'Kuwait', bypass: 'NONE (fully stranded)' },
  { c: 'Qatar', bypass: 'NONE (LNG-dominant; crude via Hormuz)' },
]

const CONFIDENCE = ['Verified-official', 'Inferred-triangulated', 'Modelled-EST', 'Absent']

// ---------------------------------------------------------------------------
// Schemas
// ---------------------------------------------------------------------------
const SOURCE = {
  type: 'object', required: ['publisher', 'sourceClass', 'asOf'],
  properties: {
    publisher: { type: 'string' },
    sourceClass: { type: 'string', description: 'official-primary | forecaster | proxy-satellite | proxy-tanker | secondary-wire | modelled' },
    url: { type: 'string' }, asOf: { type: 'string' }, nextPublish: { type: 'string' },
  },
}

const FRAME_SCHEMA = {
  type: 'object', required: ['corroborated', 'stop', 'sources', 'spine', 'excluded'],
  properties: {
    corroborated: { type: 'boolean' }, stop: { type: 'boolean' }, stopReason: { type: 'string' },
    spine: { type: 'object', properties: {
      warStart: { type: 'string' }, hormuzClosureDeclared: { type: 'string' },
      currentHormuzStatus: { type: 'string' }, ieaReleaseVolume: { type: 'string' } } },
    sources: { type: 'array', items: SOURCE, minItems: 3 },
    excluded: { type: 'array', items: { type: 'string' } },
  },
}

const HORMUZ_SCHEMA = {
  type: 'object', required: ['status', 'flowMbdNow', 'flowMbdPrewar', 'asOf', 'trackerDivergence', 'sources'],
  properties: {
    status: { type: 'string' }, flowMbdNow: { type: 'number' }, flowMbdPrewar: { type: 'number' },
    asOf: { type: 'string' }, reopeningTimeline: { type: 'string' }, warRiskPremium: { type: 'string' },
    trackerDivergence: { type: 'string' }, sources: { type: 'array', items: SOURCE, minItems: 2 },
  },
}

const INDICATORS_SCHEMA = {
  type: 'object', required: ['brent', 'usSpr', 'ieaRelease', 'freight', 'sources'],
  properties: {
    brent: { type: 'object', properties: { prewarEveOfWar: { type: 'number' }, peak: { type: 'number' }, now: { type: 'number' }, scopeBaselineNote: { type: 'string' } } },
    usSpr: { type: 'object', properties: { mmbBefore: { type: 'number' }, mmbNow: { type: 'number' }, fillPctNow: { type: 'number' }, note: { type: 'string' } } },
    ieaRelease: { type: 'object', properties: { totalMmb: { type: 'number' }, usShareMmb: { type: 'number' }, decidedDate: { type: 'string' } } },
    freight: { type: 'object', properties: { vlccNowUsdDay: { type: 'number' }, vlccPrewarUsdDay: { type: 'number' }, warRiskPremiumNote: { type: 'string' } } },
    sources: { type: 'array', items: SOURCE, minItems: 2 },
  },
}

const BASELINE_CELL = {
  type: 'object', required: ['country', 'beforeDays', 'denominatorMbd', 'stockBasis', 'confidence', 'sources'],
  properties: {
    country: { type: 'string' }, beforeDays: { type: ['number', 'null'] }, denominatorMbd: { type: ['number', 'null'] },
    stockBasis: { type: 'string' }, netExporterConvention: { type: 'string' },
    confidence: { type: 'string', enum: CONFIDENCE }, sources: { type: 'array', items: SOURCE },
  },
}

const TODAY_CELL = {
  type: 'object', required: ['country', 'todayDays', 'method', 'confidence', 'sourceClassesUsed', 'sources'],
  properties: {
    country: { type: 'string' }, todayDays: { type: ['number', 'null'] },
    method: { type: 'string', description: 'published-triangulated | mass-balance-modelled | absent' },
    massBalance: { type: 'object', properties: {
      blockedMbd: { type: 'number' }, replacementMbd: { type: 'number' }, demandReliefMbd: { type: 'number' },
      netRateR_mbd: { type: 'number' }, sReleaseMmb: { type: 'number' }, tDays: { type: 'number' },
      deltaStockMmb: { type: 'number' }, denominatorMbd: { type: 'number' }, deltaCoverageDays: { type: 'number' },
      perCountryCalibrationNote: { type: 'string' } } },
    hormuzDependenceShare: { type: ['number', 'null'], description: 'fraction of crude imports normally via Hormuz' },
    confidence: { type: 'string', enum: CONFIDENCE },
    sourceClassesUsed: { type: 'array', items: { type: 'string' } },
    divergenceFlag: { type: 'string' }, sources: { type: 'array', items: SOURCE },
  },
}

const PRODUCER_CELL = {
  type: 'object', required: ['country', 'exportCoverDays', 'usableStockMmb', 'storageUtilPct', 'bypassAdjExportMbd', 'shutInMbd', 'confidence', 'sources'],
  properties: {
    country: { type: 'string' },
    exportCoverDays: { type: ['number', 'null'], description: 'usable above-ground stock / pre-crisis export rate' },
    usableStockMmb: { type: 'object', properties: {
      domesticInsideHormuz: { type: ['number', 'null'] }, domesticOutsideHormuz: { type: ['number', 'null'] }, leasedAbroad: { type: ['number', 'null'] } } },
    storageUtilPct: { type: ['number', 'null'], description: 'binding constraint; >=85-95% forces shut-in' },
    bypassAdjExportMbd: { type: ['number', 'null'] },
    shutInMbd: { type: ['number', 'null'], description: 'production foregone (where the barrels went)' },
    chokepointNote: { type: 'string' }, confidence: { type: 'string', enum: CONFIDENCE }, sources: { type: 'array', items: SOURCE },
  },
}

const THROUGHPUT_SCHEMA = {
  type: 'object', required: ['hormuzNormalCrudeMbd', 'bypassCeilingMbd', 'bypassRealizedMbd', 'strandedMbd', 'routes', 'opecSpareTrappedNote', 'sources'],
  properties: {
    hormuzNormalCrudeMbd: { type: 'number' }, bypassCeilingMbd: { type: 'number' }, bypassRealizedMbd: { type: 'number' }, strandedMbd: { type: 'number' },
    routes: { type: 'array', items: { type: 'object', properties: {
      name: { type: 'string' }, nameplateMbd: { type: 'number' }, realizedMbd: { type: 'number' }, bindingConstraint: { type: 'string' }, hormuzRelief: { type: 'string' } } } },
    opecSpareTrappedNote: { type: 'string' }, sources: { type: 'array', items: SOURCE },
  },
}

const LEDGER_SCHEMA = {
  type: 'object', required: ['consumerDrawMmb', 'producerBuildMmb', 'foregoneOutputMmb', 'demandDestructionMmb', 'observedGlobalDrawMmb', 'rho', 'reconciliationResidualMmb', 'verdict'],
  properties: {
    consumerDrawMmb: { type: 'number', description: 'sum of consumer SPR+commercial draws (mb)' },
    producerBuildMmb: { type: 'number', description: 'floating + onshore stranded build (mb)' },
    foregoneOutputMmb: { type: 'number', description: 'cumulative shut-in production never lifted (mb)' },
    demandDestructionMmb: { type: 'number' },
    observedGlobalDrawMmb: { type: 'number', description: 'IEA observed global stock draw over the window' },
    rho: { type: 'number', description: 'producerBuild / |consumerDraw|; ~1 => thesis holds, <<1 => foregone-output dominates' },
    rhoConfidenceBand: { type: 'string' },
    reconciliationResidualMmb: { type: 'number', description: 'decomposition vs observed draw = error bar' },
    verdict: { type: 'string', description: 'explicit ruling on the redistribution thesis' },
    sources: { type: 'array', items: SOURCE },
  },
}

const TRAJECTORY_SCHEMA = {
  type: 'object', required: ['series', 'inflection'],
  properties: {
    series: { type: 'array', items: { type: 'object', properties: { weekOf: { type: 'string' }, oecdStockMmb: { type: ['number', 'null'] }, usSprMmb: { type: ['number', 'null'] }, note: { type: 'string' } } } },
    inflection: { type: 'string', description: 'when draw turned toward restock, or that it has not yet' },
    sources: { type: 'array', items: SOURCE },
  },
}

const SCENARIO_SCHEMA = {
  type: 'object', required: ['scenarios'],
  properties: {
    scenarios: { type: 'array', minItems: 3, items: { type: 'object', properties: {
      id: { type: 'string', description: 'S1-reopen-fast | S2-contested-grinding | S3-reclose-hard' },
      trigger: { type: 'string' }, reserveTrajectory: { type: 'string' }, brentPath: { type: 'string' },
      restockTimeline: { type: 'string' }, sprExhaustionNote: { type: 'string' },
      probability: { type: 'string', description: 'only if anchored to a forecaster stated odds; else "unweighted"' } } } },
    sources: { type: 'array', items: SOURCE },
  },
}

const ATRISK_SCHEMA = {
  type: 'object', required: ['rows'],
  properties: { rows: { type: 'array', items: { type: 'object', properties: {
    country: { type: 'string' }, daysOfCover: { type: ['number', 'null'] }, hormuzDependenceShare: { type: ['number', 'null'] },
    effectiveAtRiskCoverDays: { type: ['number', 'null'], description: 'daysOfCover * (1 - dependence)' }, note: { type: 'string' } } } } },
}

const RESTOCK_SCHEMA = {
  type: 'object', required: ['depletion', 'fromWhere', 'priceVsPrewar', 'timeline'],
  properties: {
    depletion: { type: 'string', description: 'consumer AND producer' },
    fromWhere: { type: 'string', description: 'note OPEC spare is trapped behind Hormuz, NOT a source' },
    priceVsPrewar: { type: 'string', description: 'stranded-Gulf-discount vs Atlantic-premium split; reconcile Dec25/27-Feb/$65; freight+war-risk' },
    timeline: { type: 'string' }, sources: { type: 'array', items: SOURCE },
  },
}

const DEMAND_SCHEMA = {
  type: 'object', required: ['refillMmb', 'newBuildsMmb', 'demandDestructionOffsetMmb', 'netDemandMmb', 'method'],
  properties: {
    refillMmb: { type: 'number' }, newBuildsMmb: { type: 'number' }, demandDestructionOffsetMmb: { type: 'number' },
    netDemandMmb: { type: 'number' }, method: { type: 'string' }, sources: { type: 'array', items: SOURCE },
  },
}

const LENS_SCHEMA = {
  type: 'object', required: ['lenses', 'disagreements'],
  properties: {
    lenses: { type: 'array', items: { type: 'object', properties: {
      institution: { type: 'string' }, stance: { type: 'string' }, asOf: { type: 'string' }, structuralBias: { type: 'string' }, source: SOURCE } } },
    disagreements: { type: 'array', items: { type: 'string' } },
  },
}

const VERIFY_SCHEMA = {
  type: 'object', required: ['killed', 'downgraded', 'passed', 'reconciliation', 'verdict'],
  properties: {
    killed: { type: 'array', items: { type: 'string' } }, downgraded: { type: 'array', items: { type: 'string' } },
    passed: { type: 'array', items: { type: 'string' } },
    reconciliation: { type: 'string', description: 'bottom-up country sum vs IEA top-down OECD aggregate; divergence = error bar' },
    verdict: { type: 'string', description: 'ship | fix-required' },
  },
}

const REDTEAM_SCHEMA = {
  type: 'object', required: ['attacks'],
  properties: { attacks: { type: 'array', minItems: 5, items: { type: 'object', properties: {
    target: { type: 'string', description: 'consumer-table | producer-table | estimator-dimensionality | estimator-calibration | ledger-logic | throughput | scenario-tree | synthesis | sourcing' },
    attack: { type: 'string' }, severity: { type: 'string', enum: ['high', 'medium', 'low'] }, response: { type: 'string' } } } } },
}

// ---------------------------------------------------------------------------
// Pipeline
// ---------------------------------------------------------------------------

// Frame -------------------------------------------------------------------
phase('Frame')
const frame = await agent(
  `You are A-00 Frame Verification. The entire dataset post-dates a Jan-2026 cutoff; independently establish the NARRATIVE SPINE is real reporting (not scenario/opinion/aggregator/AI content) before any number is gathered. Run date: ${RUN_DATE}.
Corroborate from >=3 INDEPENDENT qualifying sources (no two from one publisher group): (1) the 2026 US/Israel-Iran war start date & nature (airstrikes vs declared closure are DIFFERENT dates); (2) Iran's Hormuz-closure declaration(s) and CURRENT physical-vs-legal status; (3) the IEA coordinated release date + headline volume (IEA's OWN figure, not a blog).
EXCLUSION GATE: deny single-purpose tracker/monitor sites of unknown provenance, content-farm blogs, opinion, AI aggregators (pointers only). SELF-CITATION GUARD: the operator runs a Hormuz dashboard; exclude any result resolving to it or a derivative and say so.
Use web search/fetch. If the spine cannot be corroborated across >=3 independent qualifying sources, set stop=true and explain. Do NOT proceed.`,
  { label: 'A-00 frame', phase: 'Frame', schema: FRAME_SCHEMA, effort: 'high' }
)
if (!frame || frame.stop || !frame.corroborated) {
  log(`FRAME GATE FAILED — halting. ${frame ? frame.stopReason : 'agent null'}`)
  return { halted: true, reason: frame ? frame.stopReason : 'frame agent null', frame }
}
log(`Frame OK: war ${frame.spine?.warStart}; Hormuz "${frame.spine?.currentHormuzStatus}"; IEA ${frame.spine?.ieaReleaseVolume}. Excluded ${frame.excluded?.length || 0}.`)

// Hinge -------------------------------------------------------------------
phase('Hinge')
const [hormuz, indicators] = await parallel([
  () => agent(
    `You are A-01 Hormuz Status & Flow — the hinge. Frame: ${JSON.stringify(frame.spine)}. As of ${RUN_DATE}: open/contested-but-flowing/closed; current vs prewar flow (mb/d); reopening timeline; war-risk premium; and HOW trackers (PortWatch/Windward/Kpler/TankerTrackers) diverge and why (AIS-off hugging the Omani coast understates counts). Date within the run window. Web search/fetch; exclusion gate.`,
    { label: 'A-01 hormuz', phase: 'Hinge', schema: HORMUZ_SCHEMA, effort: 'high' }),
  () => agent(
    `You are A-02 Price & Key Indicators. Frame: ${JSON.stringify(frame.spine)}. With sources+dates: Brent eve-of-war (27-Feb), peak, now — reconcile scope "$65" (late-2025) vs ~$72 eve-of-war; US SPR before/now (mb) + fill% (SPR is STRATEGIC-ONLY, not for the coverage column); IEA total release (IEA's own figure) + US share; VLCC freight now vs prewar + war-risk premium. Web search/fetch; exclusion gate.`,
    { label: 'A-02 indicators', phase: 'Hinge', schema: INDICATORS_SCHEMA, effort: 'high' }),
])

// Consumer ∥ Producer -----------------------------------------------------
phase('Consumer')
const baseline = (await parallel(CONSUMERS.map((co) => () =>
  agent(
    `You are an A-03 consumer subagent for ${co.c}. Establish the Dec-2025 "before" coverage on the IEA TOTAL-STOCK basis (strategic+commercial), NOT strategic-only. Report beforeDays (IEA days of net-import cover) and the FIXED denominator D = prior-year avg daily net imports (same D for "today").
${co.iea ? 'IEA member: use the IEA "Oil stocks of IEA countries" tool / OMR.' : 'NON-IEA: no comparable published days-of-cover. National fragments tagged Modelled-EST, else null. Do NOT impute IEA-style figures.'}
${co.netExporter ? 'NET EXPORTER: days-of-net-import-cover ill-defined. Convention: strategic+commercial vs GROSS crude imports w/ footnote, OR null+note. State which.' : ''}
${co.c === 'China' ? 'China outside IEA; third-party EST only (EIA/STEO + Kpler/Vortexa) -> Modelled-EST.' : ''}
Tag confidence (Verified-official/Inferred-triangulated/Modelled-EST/Absent). Web search/fetch; exclusion gate; cite as-of dates.`,
    { label: `A-03 ${co.c}`, phase: 'Consumer', schema: BASELINE_CELL, effort: 'medium' }))
)).filter(Boolean)
const denomBy = Object.fromEntries(baseline.map((b) => [b.country, b.denominatorMbd]))
log(`Consumer baseline: ${baseline.length}/${CONSUMERS.length}.`)

const today = (await parallel(CONSUMERS.map((co) => () =>
  agent(
    `You are an A-04 consumer subagent for ${co.c}. Determine "today" (${RUN_DATE}) coverage in days. Inputs: Hormuz ${JSON.stringify(hormuz)}; indicators ${JSON.stringify(indicators)}; fixed denominator D=${denomBy[co.c] ?? 'unknown'} mb/d (from A-03).
Method priority: (1) PUBLISHED-TRIANGULATED if >=2 independent classes agree (Inferred-triangulated); diverge >15% -> output both, flag, headline=higher tier. (2) MASS-BALANCE-MODELLED (Modelled-EST) — DIMENSIONALLY CORRECT, do NOT add flows to stocks: R=replacement+demand_relief-blocked [mb/d]; ΔStock=R*${T_ELAPSED}-S_release [mb]; Δdays=ΔStock/D; todayDays=beforeDays+Δdays. Calibrate inputs to THIS country's Hormuz dependence (a global average is the failure mode); source each input; fill massBalance fully. (3) ABSENT -> todayDays=null. Never guess.
Also estimate hormuzDependenceShare (fraction of crude imports normally via Hormuz). A model counts as <=1 class. Web search/fetch; exclusion gate.`,
    { label: `A-04 ${co.c}`, phase: 'Consumer', schema: TODAY_CELL, effort: 'high' }))
)).filter(Boolean)
log(`Consumer today: ${today.length}/${CONSUMERS.length}.`)

phase('Producer')
const producers = (await parallel(PRODUCERS.map((p) => () =>
  agent(
    `You are an A-11 producer subagent for ${p.c} (Gulf exporter). Days-of-net-import-cover is MEANINGLESS for a net exporter — use the exporter schema. Frame: ${JSON.stringify(frame.spine)}; Hormuz: ${JSON.stringify(hormuz)}.
Report: exportCoverDays = usable above-ground stock / pre-crisis export rate; usableStockMmb split into domesticInsideHormuz / domesticOutsideHormuz (e.g. Red Sea/Yanbu side) / leasedAbroad (Aramco Okinawa/Sidi Kerir/Rotterdam where applicable); storageUtilPct (the BINDING constraint — >=85-95% forces shut-in); bypassAdjExportMbd (what can still ship without Hormuz — this country's bypass: ${p.bypass}); shutInMbd (production foregone — this is where blocked barrels went, NOT into storage). Tag each stock inside vs outside the chokepoint.
Tag confidence. Web search/fetch (JODI lags ~2mo and is weak for Gulf states — prefer IEA OMR, EIA STEO, Argus, Reuters/Bloomberg, terminal/tanker trackers); exclusion gate; cite as-of dates.`,
    { label: `A-11 ${p.c}`, phase: 'Producer', schema: PRODUCER_CELL, effort: 'high' }))
)).filter(Boolean)
log(`Producer reserves: ${producers.length}/${PRODUCERS.length}.`)

const throughput = await agent(
  `You are A-12 Throughput / Bypass Model. Frame ${JSON.stringify(frame.spine)}; Hormuz ${JSON.stringify(hormuz)}. Quantify how much Gulf crude can reach market WITHOUT Hormuz: routes = Saudi Petroline/Yanbu (port-gated realized vs nameplate), UAE ADCOP/Fujairah, Iraq Kirkuk-Ceyhan (note: north-only, little true Hormuz relief), Iran Goreh-Jask (negligible). For each: nameplate, realized, binding constraint, true Hormuz relief. Compute bypassCeiling vs strandedMbd (Hormuz normal crude minus realized bypass). State that OPEC spare capacity (~3.5-4 mb/d) is largely TRAPPED behind Hormuz (Vitol: "all of it sits behind the Strait") and that Kuwait + Basrah-Iraq have ZERO bypass. Web search/fetch; exclusion gate.`,
  { label: 'A-12 throughput', phase: 'Producer', schema: THROUGHPUT_SCHEMA, effort: 'high' })

// Ledger ------------------------------------------------------------------
phase('Ledger')
const ledger = await agent(
  `You are A-13 the Global Redistribution Ledger — the THESIS TEST. Hypothesis: "a chokepoint closure doesn't destroy oil, it strands it producer-side, so global reserves are roughly conserved (consumer draws ~= producer builds)."
Build the ledger (mb) over the window (T=${T_ELAPSED} days): consumerDrawMmb (sum consumer SPR+commercial draws, from today/baseline + IEA OECD data); producerBuildMmb (floating + onshore stranded, from A-11/A-12 + IEA OMR); foregoneOutputMmb (cumulative Gulf shut-in production never lifted); demandDestructionMmb; observedGlobalDrawMmb (IEA observed global stock draw).
Compute rho = producerBuild / |consumerDraw| (rho~1 => thesis holds; rho<<1 => foregone output dominates). Reconcile the decomposition to the observed global draw; residual = error bar. Output an EXPLICIT verdict on the thesis whichever way it falls — do NOT assume redistribution.
Inputs: producers=${JSON.stringify(producers)}; throughput=${JSON.stringify(throughput)}; consumerToday=${JSON.stringify(today.map((t) => ({ c: t.country, d: t.todayDays })))}; indicators=${JSON.stringify(indicators)}. Web search/fetch IEA OMR aggregates; exclusion gate.`,
  { label: 'A-13 ledger', phase: 'Ledger', schema: LEDGER_SCHEMA, effort: 'high' })
log(`Ledger: rho=${ledger?.rho} — ${ledger?.verdict}`)

// Forward (trajectory ∥ scenarios ∥ at-risk) ------------------------------
phase('Forward')
const [trajectory, scenarios, atRisk] = await parallel([
  () => agent(
    `You are A-14 Weekly Trajectory. Build the Feb->Jun 2026 stock path (OECD total + US SPR) from EIA weekly + IEA monthly; locate the draw->restock inflection (or state it hasn't turned). Indicators ${JSON.stringify(indicators)}. Web search/fetch; exclusion gate.`,
    { label: 'A-14 trajectory', phase: 'Forward', schema: TRAJECTORY_SCHEMA, effort: 'medium' }),
  () => agent(
    `You are A-15 Hormuz-Duration Scenario Tree. Three states, each with conditional reserve trajectory + Brent path + restock timeline: S1 reopen-fast (deal holds), S2 contested-grinding (current ~observed base case), S3 re-close-hard (deal collapses -> compute SPR-exhaustion timeline at observed draw). Attach a probability ONLY if anchored to a forecaster's stated odds; else "unweighted". Use frame ${JSON.stringify(frame.spine)}, hormuz ${JSON.stringify(hormuz)}, throughput ${JSON.stringify(throughput)}, ledger ${JSON.stringify(ledger)}. Web search/fetch; exclusion gate.`,
    { label: 'A-15 scenarios', phase: 'Forward', schema: SCENARIO_SCHEMA, effort: 'high' }),
  () => agent(
    `You are A-16 Import-at-Risk. For each consumer compute effectiveAtRiskCoverDays = daysOfCover * (1 - hormuzDependenceShare), reporting raw daysOfCover and hormuzDependenceShare too. Use the today column: ${JSON.stringify(today.map((t) => ({ country: t.country, daysOfCover: t.todayDays, dep: t.hormuzDependenceShare })))}. Flag high-cover-high-dependence countries as more fragile than headline days suggest.`,
    { label: 'A-16 at-risk', phase: 'Forward', schema: ATRISK_SCHEMA, effort: 'medium' }),
])

// Restock -----------------------------------------------------------------
phase('Restock')
const [restock, demand] = await parallel([
  () => agent(
    `You are A-05 Restocking Assessment. Answer all four, THROUGHPUT-AWARE: (a) depletion ~4mo post-war, consumer AND producer; (b) from where — Gulf-via-Hormuz vs Atlantic Basin/US shale/Russia/pipeline reroute; NOTE OPEC spare is TRAPPED behind Hormuz, not a source; (c) at what price — stranded-Gulf-discount vs Atlantic-premium split, reconcile Dec-2025 reserve / 27-Feb price / scope $65, include freight+war-risk premium; (d) timeline incl ~4mo price-transmission lag + bypass ramp limits. Inputs: ledger ${JSON.stringify(ledger)}, throughput ${JSON.stringify(throughput)}, hormuz ${JSON.stringify(hormuz)}, indicators ${JSON.stringify(indicators)}. Cite sources.`,
    { label: 'A-05 restock', phase: 'Restock', schema: RESTOCK_SCHEMA, effort: 'high' }),
  () => agent(
    `You are A-06 Restocking Demand Estimate. Total restocking demand = released-stock refill + new capacity builds, NET of demand destruction. Show arithmetic + every input source; net the demand destruction explicitly (China+Japan imports down ~40%, 2Q26 demand down YoY). Use indicators ${JSON.stringify(indicators)}, ledger ${JSON.stringify(ledger)}.`,
    { label: 'A-06 demand', phase: 'Restock', schema: DEMAND_SCHEMA, effort: 'high' }),
])

// Lenses ------------------------------------------------------------------
phase('Lenses')
const lenses = await agent(
  `You are A-07 the Analytical Lens Panel (rigorous persona replacement, NOT role-play). For each institution capture its CURRENT PUBLISHED stance/number + as-of date + structural bias: JPMorgan Global Commodities, Goldman Sachs Commodities, Morgan Stanley Commodities, EIA STEO/IEA OMR (official), Rapidan Energy (geopolitics), Energy Aspects + desks (physical-flow), macro-allocator framework. Anchor to PUBLISHED notes; do NOT attach a point forecast to a named living individual. Run as analysis-of-competing-hypotheses: list where lenses SPLIT and WHY (the driver) — do not average. Web search/fetch; exclusion gate.`,
  { label: 'A-07 lenses', phase: 'Lenses', schema: LENS_SCHEMA, effort: 'high' })

// Verify (isolated) -------------------------------------------------------
phase('Verify')
const bundle = { frame, hormuz, indicators, baseline, today, producers, throughput, ledger, trajectory, scenarios, atRisk, restock, demand, lenses }
const [verify, redteam] = await parallel([
  () => agent(
    `You are A-08 Source Verification, in an ISOLATED context (you did NOT generate these figures). Audit every figure: real, named, qualifying source (exclusion + self-citation gate) + as-of date. KILL unsourced/hallucinated/exclusion-failing figures. DOWNGRADE overreaching tags (model+single-quote tagged Verified -> demote; Tier-5 model is <=1 class). Do the RECONCILIATION: bottom-up consumer-stock sum vs IEA top-down OECD aggregate; report divergence as the error bar. Verdict: ship | fix-required.
BUNDLE: ${JSON.stringify(bundle)}`,
    { label: 'A-08 verify', phase: 'Verify', schema: VERIFY_SCHEMA, effort: 'high' }),
  () => agent(
    `You are A-09 Red Team, ISOLATED and adversarial. >=5 SUBSTANTIVE attacks (not cosmetic) on: consumer table, producer table, the mass-balance estimator's DIMENSIONAL integrity AND per-country calibration (was a global average smuggled in?), the LEDGER logic (is rho computed honestly? is foregone-output double-counted?), the throughput model, the scenario tree, the synthesis, the sourcing. For each: target, attack, severity, and the response the analysis must give (or concede). Be hostile.
BUNDLE: ${JSON.stringify(bundle)}`,
    { label: 'A-09 redteam', phase: 'Verify', schema: REDTEAM_SCHEMA, effort: 'high' }),
])

// Synthesis ---------------------------------------------------------------
phase('Synthesis')
const report = await agent(
  `You are A-10 Synthesis + Build. Assemble the final deliverable per the output contract as Markdown. Apply A-08 kills/downgrades; address every A-09 attack in footnotes; PRESERVE disagreements + the thesis verdict (never average). Excel-compatible.
Produce:
(a) Consumer table — columns EXACTLY: Country | Before (days) | Before (months) | Today (days) | Today (months) | Δ days | Δ % | Hormuz-dep % | Eff. at-risk cover | Confidence | Source & Date. months=days/30.44; Δ%=(today-before)/before; "-" where null. Order: USA; Germany, France, UK, Italy, Spain, Netherlands, Poland; Japan, South Korea, China, India, Thailand, Philippines, Indonesia, Vietnam.
(b) Producer table (Gulf-6) — Country | Export-cover days | Usable stock mb (in-Hormuz/out/abroad) | Storage-util % | Bypass-adj export mb/d | Shut-in mb/d | Confidence | Source & Date; plus the Atlantic-Basin re-router flow note.
(c) Key-indicators block.
(d) Global redistribution ledger — the decomposition, rho + band, reconciliation residual, EXPLICIT thesis verdict.
(e) Throughput/bypass model — ceiling vs stranded + OPEC-spare-trapped.
(f) Restocking assessment — all four questions.
(g) Restocking-demand estimate — method + inputs.
(h) Scenario tree S1/S2/S3.
(i) Weekly trajectory + inflection.
(j) Footnotes & reconciliation — conventions, modelled-figure inputs, A-08 reconciliation/error bar, A-09 responses, run tier + whether verification was independent.
DATA: verify=${JSON.stringify(verify)} redteam=${JSON.stringify(redteam)} baseline=${JSON.stringify(baseline)} today=${JSON.stringify(today)} producers=${JSON.stringify(producers)} throughput=${JSON.stringify(throughput)} ledger=${JSON.stringify(ledger)} trajectory=${JSON.stringify(trajectory)} scenarios=${JSON.stringify(scenarios)} atRisk=${JSON.stringify(atRisk)} indicators=${JSON.stringify(indicators)} hormuz=${JSON.stringify(hormuz)} restock=${JSON.stringify(restock)} demand=${JSON.stringify(demand)} lenses=${JSON.stringify(lenses)}`,
  { label: 'A-10 synthesis', phase: 'Synthesis', effort: 'high' })

return {
  report,
  thesisVerdict: ledger?.verdict, rho: ledger?.rho,
  verifyVerdict: verify?.verdict, redTeamAttacks: redteam?.attacks?.length,
  consumers: today.length, producers: producers.length,
  frame: frame.spine,
}

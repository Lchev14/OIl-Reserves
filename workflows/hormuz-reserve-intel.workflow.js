export const meta = {
  name: 'hormuz-reserve-intel',
  description: 'Global crude reserve & restocking intelligence (Hormuz 2026) — OAS pipeline with frame-verify, dimensionally-correct mass-balance estimator, and independent verify/red-team gates',
  whenToUse: 'Produce the before-vs-today reserve-coverage table (16 countries, days+months) + key indicators + restocking assessment + demand estimate, fully sourced and confidence-tagged. Run with the Workflow tool: Workflow({scriptPath: "workflows/hormuz-reserve-intel.workflow.js"}).',
  phases: [
    { title: 'Frame', detail: 'A-00 verify the war/Hormuz/IEA spine across >=3 independent sources; STOP if it fails' },
    { title: 'Hinge', detail: 'A-01 Hormuz status/flow + A-02 price & key indicators' },
    { title: 'Baseline', detail: 'A-03 Dec-2025 IEA days-of-net-imports per country + fixed denominator' },
    { title: 'Today', detail: 'A-04 June-2026 coverage per country (triangulate -> Tier-5 estimator -> "-")' },
    { title: 'Restock', detail: 'A-05 restocking assessment + A-06 restocking-demand estimate' },
    { title: 'Lenses', detail: 'A-07 competing-views lens panel (ACH, disagreement preserved)' },
    { title: 'Verify', detail: 'A-08 source verification + A-09 adversarial red team (context-isolated)' },
    { title: 'Synthesis', detail: 'A-10 assemble output contract; disagreements preserved, not averaged' },
  ],
}

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------
const RUN_DATE = (args && args.runDate) || 'the current run date (late June 2026)'
const WAR_START = '28 February 2026'
const T_ELAPSED = (args && args.daysElapsed) || 118 // war start -> run date; pass via args to keep deterministic

const COUNTRIES = [
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

const CONFIDENCE = ['Verified-official', 'Inferred-triangulated', 'Modelled-EST', 'Absent']

// ---------------------------------------------------------------------------
// Schemas (force structured, auditable output from every agent)
// ---------------------------------------------------------------------------
const SOURCE = {
  type: 'object',
  required: ['publisher', 'sourceClass', 'asOf'],
  properties: {
    publisher: { type: 'string' },
    sourceClass: { type: 'string', description: 'official-primary | forecaster | proxy-satellite | proxy-tanker | secondary-wire | modelled' },
    url: { type: 'string' },
    asOf: { type: 'string', description: 'as-of / publish date' },
    nextPublish: { type: 'string', description: 'next scheduled release if official; else ""' },
  },
}

const FRAME_SCHEMA = {
  type: 'object',
  required: ['corroborated', 'stop', 'sources', 'spine', 'excluded'],
  properties: {
    corroborated: { type: 'boolean', description: 'spine confirmed across >=3 independent qualifying sources' },
    stop: { type: 'boolean', description: 'true if the spine could NOT be corroborated -> halt pipeline' },
    stopReason: { type: 'string' },
    spine: {
      type: 'object',
      properties: {
        warStart: { type: 'string' },
        hormuzClosureDeclared: { type: 'string' },
        currentHormuzStatus: { type: 'string', description: 'open | contested-but-flowing | closed' },
        ieaReleaseVolume: { type: 'string', description: "IEA's OWN headline figure, not a blog restatement" },
      },
    },
    sources: { type: 'array', items: SOURCE, minItems: 3 },
    excluded: { type: 'array', items: { type: 'string' }, description: 'sources rejected by the exclusion/self-citation gate, with reason' },
  },
}

const HORMUZ_SCHEMA = {
  type: 'object',
  required: ['status', 'flowMbdNow', 'flowMbdPrewar', 'asOf', 'trackerDivergence', 'sources'],
  properties: {
    status: { type: 'string', description: 'open | contested-but-flowing | closed' },
    flowMbdNow: { type: 'number' },
    flowMbdPrewar: { type: 'number' },
    asOf: { type: 'string' },
    reopeningTimeline: { type: 'string' },
    warRiskPremium: { type: 'string' },
    trackerDivergence: { type: 'string', description: 'how PortWatch/Windward/Kpler etc. disagree and why (AIS-off etc.)' },
    sources: { type: 'array', items: SOURCE, minItems: 2 },
  },
}

const INDICATORS_SCHEMA = {
  type: 'object',
  required: ['brent', 'usSpr', 'ieaRelease', 'sources'],
  properties: {
    brent: {
      type: 'object',
      properties: {
        prewarEveOfWar: { type: 'number', description: 'Brent on 27-Feb-2026' },
        peak: { type: 'number' },
        now: { type: 'number' },
        scopeBaselineNote: { type: 'string', description: 'reconcile scope $65 (late-2025) vs eve-of-war ~$72' },
      },
    },
    usSpr: {
      type: 'object',
      properties: { mmbBefore: { type: 'number' }, mmbNow: { type: 'number' }, fillPctNow: { type: 'number' }, note: { type: 'string', description: 'SPR is strategic-only — not for the coverage column' } },
    },
    ieaRelease: { type: 'object', properties: { totalMmb: { type: 'number' }, usShareMmb: { type: 'number' }, decidedDate: { type: 'string' } } },
    sources: { type: 'array', items: SOURCE, minItems: 2 },
  },
}

const BASELINE_CELL = {
  type: 'object',
  required: ['country', 'beforeDays', 'denominatorMbd', 'stockBasis', 'confidence', 'sources'],
  properties: {
    country: { type: 'string' },
    beforeDays: { type: ['number', 'null'], description: 'Dec-2025 IEA days of net-import cover; null if absent' },
    denominatorMbd: { type: ['number', 'null'], description: 'D = prior-year avg daily net imports (FIXED for both snapshots)' },
    stockBasis: { type: 'string', description: 'IEA total-stock (strategic+commercial). Note net-exporter convention if applied.' },
    netExporterConvention: { type: 'string', description: 'if net exporter: days-vs-gross-imports w/ footnote, or "-"; else ""' },
    confidence: { type: 'string', enum: CONFIDENCE },
    sources: { type: 'array', items: SOURCE },
  },
}

const TODAY_CELL = {
  type: 'object',
  required: ['country', 'todayDays', 'method', 'confidence', 'sourceClassesUsed', 'sources'],
  properties: {
    country: { type: 'string' },
    todayDays: { type: ['number', 'null'], description: 'null => "-" (no qualifying figure; never guess)' },
    method: { type: 'string', description: 'published-triangulated | mass-balance-modelled | absent' },
    massBalance: {
      type: 'object',
      description: 'REQUIRED when method=mass-balance-modelled. Dimensionally: ΔStock = R*T - S_release [mb]; Δdays = ΔStock/D.',
      properties: {
        blockedMbd: { type: 'number' },
        replacementMbd: { type: 'number' },
        demandReliefMbd: { type: 'number' },
        netRateR_mbd: { type: 'number', description: 'R = replacement + demand_relief - blocked' },
        sReleaseMmb: { type: 'number' },
        tDays: { type: 'number' },
        deltaStockMmb: { type: 'number', description: 'R*T - S_release' },
        denominatorMbd: { type: 'number', description: 'D, from baseline' },
        deltaCoverageDays: { type: 'number', description: 'ΔStock / D' },
        perCountryCalibrationNote: { type: 'string', description: 'how inputs were tied to THIS country Hormuz dependence (not a global average)' },
      },
    },
    confidence: { type: 'string', enum: CONFIDENCE },
    sourceClassesUsed: { type: 'array', items: { type: 'string' }, description: 'distinct independent classes; model counts as <=1' },
    divergenceFlag: { type: 'string', description: 'if classes diverge >15%, both values + which is headline' },
    sources: { type: 'array', items: SOURCE },
  },
}

const RESTOCK_SCHEMA = {
  type: 'object',
  required: ['depletion', 'fromWhere', 'priceVsPrewar', 'timeline'],
  properties: {
    depletion: { type: 'string' },
    fromWhere: { type: 'string', description: 'Gulf-via-Hormuz vs Atlantic Basin / US shale / Russia / pipeline reroute, with mb/d where known' },
    priceVsPrewar: { type: 'string', description: 'reconcile Dec-2025 reserve baseline vs 27-Feb price baseline vs scope $65' },
    timeline: { type: 'string', description: 'refill pace + ~4-month price-transmission lag' },
    sources: { type: 'array', items: SOURCE },
  },
}

const DEMAND_SCHEMA = {
  type: 'object',
  required: ['refillMmb', 'newBuildsMmb', 'demandDestructionOffsetMmb', 'netDemandMmb', 'method'],
  properties: {
    refillMmb: { type: 'number' },
    newBuildsMmb: { type: 'number' },
    demandDestructionOffsetMmb: { type: 'number' },
    netDemandMmb: { type: 'number' },
    method: { type: 'string', description: 'show the arithmetic and every input source' },
    sources: { type: 'array', items: SOURCE },
  },
}

const LENS_SCHEMA = {
  type: 'object',
  required: ['lenses', 'disagreements'],
  properties: {
    lenses: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          institution: { type: 'string' },
          stance: { type: 'string', description: "institution's PUBLISHED number/view; no point forecast attributed to a named individual" },
          asOf: { type: 'string' },
          structuralBias: { type: 'string' },
          source: SOURCE,
        },
      },
    },
    disagreements: { type: 'array', items: { type: 'string' }, description: 'where lenses split and WHY (driver), not averaged' },
  },
}

const VERIFY_SCHEMA = {
  type: 'object',
  required: ['killed', 'downgraded', 'passed', 'verdict'],
  properties: {
    killed: { type: 'array', items: { type: 'string' }, description: 'unsourced/hallucinated/exclusion-failing figures removed' },
    downgraded: { type: 'array', items: { type: 'string' }, description: 'confidence tags corrected (e.g. model+1-quote demoted from Verified)' },
    passed: { type: 'array', items: { type: 'string' } },
    verdict: { type: 'string', description: 'ship | fix-required' },
  },
}

const REDTEAM_SCHEMA = {
  type: 'object',
  required: ['attacks'],
  properties: {
    attacks: {
      type: 'array',
      minItems: 5,
      items: {
        type: 'object',
        properties: {
          target: { type: 'string', description: 'table | estimator-dimensionality | estimator-calibration | timeline | synthesis | sourcing' },
          attack: { type: 'string' },
          severity: { type: 'string', enum: ['high', 'medium', 'low'] },
          response: { type: 'string', description: 'how the analysis answers it (or concedes)' },
        },
      },
    },
  },
}

// ---------------------------------------------------------------------------
// Pipeline
// ---------------------------------------------------------------------------

// --- Phase Frame: A-00. Hard gate. -----------------------------------------
phase('Frame')
const frame = await agent(
  `You are A-00 Frame Verification for a crude-reserve intelligence pipeline. The entire dataset post-dates a Jan-2026 knowledge cutoff, so you must independently establish the NARRATIVE SPINE is real reporting, not scenario/opinion/aggregator/AI-generated content, before any number is gathered.

Run date: ${RUN_DATE}.

Corroborate from >=3 INDEPENDENT qualifying sources (no two from the same publisher group):
1. The 2026 US/Israel-Iran war: start date and nature (airstrikes vs. a declared Strait closure are DIFFERENT dates — keep them distinct).
2. Whether/when Iran declared the Strait of Hormuz closed, and the CURRENT physical-vs-legal status.
3. The IEA coordinated strategic-stock release: date and headline volume — use the IEA's OWN figure, not a secondary blog's restatement.

EXCLUSION GATE (mandatory): DENY single-purpose "live tracker/monitor" sites of unknown provenance, content-farm blogs, opinion/Substack, AI-generated aggregators. They may be pointers to a primary source, never the source. SELF-CITATION GUARD: the operator maintains a Hormuz dashboard; if a result resolves to that dashboard or a derivative, it is NOT independent — exclude it and say so.

Use web search/fetch. If the spine cannot be corroborated across >=3 independent qualifying sources, set stop=true and explain — do NOT proceed.`,
  { label: 'A-00 frame-verify', phase: 'Frame', schema: FRAME_SCHEMA, effort: 'high' }
)

if (!frame || frame.stop || !frame.corroborated) {
  log(`FRAME GATE FAILED — halting. ${frame ? frame.stopReason : 'agent returned null'}`)
  return { halted: true, reason: frame ? frame.stopReason : 'frame agent null', frame }
}
log(`Frame corroborated: war ${frame.spine?.warStart}; Hormuz "${frame.spine?.currentHormuzStatus}"; IEA release ${frame.spine?.ieaReleaseVolume}. Excluded ${frame.excluded?.length || 0} non-qualifying sources.`)

// --- Phase Hinge: A-01 Hormuz + A-02 indicators (independent of each other) -
phase('Hinge')
const [hormuz, indicators] = await parallel([
  () => agent(
    `You are A-01 Hormuz Status & Flow — the hinge variable. Verified frame: ${JSON.stringify(frame.spine)}.
As of ${RUN_DATE}, determine: open / contested-but-flowing / closed; current vs prewar flow (mb/d); reopening timeline; war-risk premium; and explicitly how trackers (PortWatch, Windward, Kpler, TankerTrackers) DIVERGE and why (AIS-off vessels hugging the Omani coast understate counts). Date everything within the run window. Web search/fetch; apply the exclusion gate.`,
    { label: 'A-01 hormuz', phase: 'Hinge', schema: HORMUZ_SCHEMA, effort: 'high' }
  ),
  () => agent(
    `You are A-02 Price & Key Indicators. Verified frame: ${JSON.stringify(frame.spine)}.
Pull, with sources + as-of dates: Brent eve-of-war (27-Feb-2026), peak, and now — and reconcile the scope's "$65" (a late-2025 print) against the ~$72 eve-of-war level; US SPR before/now (MMbbl) and fill % — note SPR is STRATEGIC-ONLY and must not enter the coverage column; IEA total coordinated release (IEA's own headline figure) and US share. Web search/fetch; exclusion gate.`,
    { label: 'A-02 indicators', phase: 'Hinge', schema: INDICATORS_SCHEMA, effort: 'high' }
  ),
])

// --- Phase Baseline: A-03, 16 country subagents fan out --------------------
phase('Baseline')
const baseline = (await parallel(
  COUNTRIES.map((co) => () =>
    agent(
      `You are an A-03 country subagent for ${co.c}. Establish the Dec-2025 "before" reserve coverage on the IEA TOTAL-STOCK basis (public/strategic + industry/commercial) — NOT strategic-only.
- Report beforeDays (IEA days of net-import cover) and the FIXED denominator D = prior-year avg daily net imports (same D used for the "today" snapshot).
- ${co.iea ? 'IEA member: use the IEA "Oil stocks of IEA countries" data tool / OMR.' : 'NON-IEA member: no comparable published days-of-cover. Use national fragments tagged Modelled-EST, else null ("-"). Do NOT impute IEA-style figures.'}
- ${co.netExporter ? 'NET EXPORTER: "days of net-import cover" is ill-defined (net imports -> 0). Apply the convention: days-vs-GROSS crude imports with a footnote, OR null with a note. State which.' : ''}
- ${co.c === 'China' ? 'China is outside IEA; all figures are third-party estimates (EIA/STEO + Kpler/Vortexa) -> Modelled-EST.' : ''}
Tag confidence per: Verified-official / Inferred-triangulated / Modelled-EST / Absent. Web search/fetch; exclusion gate; cite sources with as-of dates.`,
      { label: `A-03 ${co.c}`, phase: 'Baseline', schema: BASELINE_CELL, effort: 'medium' }
    )
  )
)).filter(Boolean)
const denomByCountry = Object.fromEntries(baseline.map((b) => [b.country, b.denominatorMbd]))
log(`Baseline built for ${baseline.length}/${COUNTRIES.length} countries.`)

// --- Phase Today: A-04, depends on A-01/A-02/A-03; 16 subagents fan out ----
phase('Today')
const today = (await parallel(
  COUNTRIES.map((co) => () =>
    agent(
      `You are an A-04 country subagent for ${co.c}. Determine the "today" (${RUN_DATE}) reserve coverage in days.
Inputs you may use:
- Hormuz status/flow: ${JSON.stringify(hormuz)}
- Key indicators: ${JSON.stringify(indicators)}
- This country's FIXED denominator D = ${denomByCountry[co.c] ?? 'unknown — derive or mark Absent'} mb/d (from A-03; same D as baseline).

Method priority:
1. PUBLISHED-TRIANGULATED: if >=2 INDEPENDENT source classes agree, report it (Inferred-triangulated). If they diverge >15%, output both with a divergence flag, headline = more-trusted tier.
2. MASS-BALANCE-MODELLED (Modelled-EST) when no published figure exists. Use the DIMENSIONALLY-CORRECT form — do NOT add flows to stocks:
     R       = replacement + demand_relief - blocked            [mb/d]
     ΔStock  = R * T - S_release    (T = ${T_ELAPSED} days)      [mb]
     Δdays   = ΔStock / D                                        [days]
     todayDays = beforeDays + Δdays
   Calibrate blocked/replacement/demand_relief to THIS country's Hormuz dependence — a global average is the failure mode. Source each input. Fill the massBalance object fully.
3. ABSENT: if no qualifying figure and no defensible model inputs, todayDays = null ("-"). Never guess.

A model counts as AT MOST ONE source class — model + one news quote is NOT two classes and never earns Verified. Web search/fetch; exclusion gate.`,
      { label: `A-04 ${co.c}`, phase: 'Today', schema: TODAY_CELL, effort: 'high' }
    )
  )
)).filter(Boolean)
log(`Today column built for ${today.length}/${COUNTRIES.length} countries.`)

// --- Phase Restock: A-05 + A-06 (can overlap) -----------------------------
phase('Restock')
const [restock, demand] = await parallel([
  () => agent(
    `You are A-05 Restocking Assessment. Using frame ${JSON.stringify(frame.spine)}, hormuz ${JSON.stringify(hormuz)}, indicators ${JSON.stringify(indicators)}, and the today column ${JSON.stringify(today.map((t) => ({ c: t.country, d: t.todayDays, conf: t.confidence })))}, answer all four explicitly: (a) how depleted ~4 months post-war; (b) from where countries restock (Gulf-via-Hormuz vs Atlantic Basin/US shale/Russia/pipeline reroute, mb/d where known); (c) at what price vs prewar — reconcile Dec-2025 reserve baseline vs 27-Feb price baseline vs scope's $65; (d) timeline incl. the ~4-month price-transmission lag. Cite sources.`,
    { label: 'A-05 restock', phase: 'Restock', schema: RESTOCK_SCHEMA, effort: 'high' }
  ),
  () => agent(
    `You are A-06 Restocking Demand Estimate. Estimate total restocking demand = released-stock refill + new capacity builds, NET of demand destruction. Show the arithmetic and every input source. Net the demand destruction explicitly (do not overstate the refill pull). Use indicators ${JSON.stringify(indicators)} and hormuz ${JSON.stringify(hormuz)}.`,
    { label: 'A-06 demand', phase: 'Restock', schema: DEMAND_SCHEMA, effort: 'high' }
  ),
])

// --- Phase Lenses: A-07 competing views -----------------------------------
phase('Lenses')
const lenses = await agent(
  `You are A-07 the Analytical Lens Panel (rigorous persona replacement — NOT role-play). For each institution, capture its CURRENT PUBLISHED stance/number with as-of date and structural bias: JPMorgan Global Commodities, Goldman Sachs Commodities, Morgan Stanley Commodities, EIA STEO / IEA OMR (official base case), Rapidan Energy (geopolitics), Energy Aspects + trading-desk commentary (physical-flow realist), and a macro-allocator framework. Anchor to PUBLISHED institutional notes; do NOT attach a point forecast to a named living individual. Run as analysis-of-competing-hypotheses: list where the lenses SPLIT and WHY (the driver) — do not average. Web search/fetch; exclusion gate.`,
  { label: 'A-07 lenses', phase: 'Lenses', schema: LENS_SCHEMA, effort: 'high' }
)

// --- Phase Verify: A-08 + A-09, context-isolated (genuine independence) ----
phase('Verify')
const bundle = { frame, hormuz, indicators, baseline, today, restock, demand, lenses }
const [verify, redteam] = await parallel([
  () => agent(
    `You are A-08 Source Verification, running in an isolated context (you did NOT generate any of these figures). Audit every figure in this bundle: each must have a real, named, qualifying source (apply the exclusion + self-citation gate) and an as-of date. KILL any unsourced/hallucinated/exclusion-failing figure (delete, don't flag-and-keep). DOWNGRADE confidence tags that overreach (e.g. a model + a single news quote tagged Verified -> demote; a Tier-5 model can be at most one class). Verdict: ship | fix-required.

BUNDLE:
${JSON.stringify(bundle)}`,
    { label: 'A-08 verify', phase: 'Verify', schema: VERIFY_SCHEMA, effort: 'high' }
  ),
  () => agent(
    `You are A-09 Red Team, isolated and adversarial. Produce >=5 SUBSTANTIVE attacks (not cosmetic) on: the reserve table, the mass-balance estimator's DIMENSIONAL integrity AND its per-country calibration (was a global average smuggled in?), the restocking timeline, the synthesis, and the sourcing. For each: target, attack, severity, and the response the analysis must give (or concede). Be hostile.

BUNDLE:
${JSON.stringify(bundle)}`,
    { label: 'A-09 redteam', phase: 'Verify', schema: REDTEAM_SCHEMA, effort: 'high' }
  ),
])

// --- Phase Synthesis: A-10 assemble the output contract -------------------
phase('Synthesis')
const report = await agent(
  `You are A-10 Synthesis + Table Build. Assemble the final deliverable per the output contract. Apply A-08's kills/downgrades and address every A-09 attack in the footnotes. PRESERVE disagreements (never average). Excel-compatible.

Produce, as Markdown:
(a) Reserve table — columns EXACTLY: Country | Before (days) | Before (months) | Today (days) | Today (months) | Δ days | Δ % | Confidence | Source & Date. Months = days/30.44; Δ% = (today-before)/before. Same stock basis every row. "-" where todayDays is null. Country order: USA; Germany, France, UK, Italy, Spain, Netherlands, Poland; Japan, South Korea, China, India, Thailand, Philippines, Indonesia, Vietnam.
(b) Key-indicators block (Brent prewar/peak/now; Hormuz mb/d prewar vs now; US SPR fill % + absolute; IEA total release + US share).
(c) Restocking assessment — all four questions.
(d) Total restocking-demand estimate — method + inputs, net of demand destruction.
(e) Footnotes — conventions, every modelled figure's inputs, A-09 responses, the tier this ran in and whether verification was independent.

DATA:
verify=${JSON.stringify(verify)}
redteam=${JSON.stringify(redteam)}
baseline=${JSON.stringify(baseline)}
today=${JSON.stringify(today)}
indicators=${JSON.stringify(indicators)}
hormuz=${JSON.stringify(hormuz)}
restock=${JSON.stringify(restock)}
demand=${JSON.stringify(demand)}
lenses=${JSON.stringify(lenses)}`,
  { label: 'A-10 synthesis', phase: 'Synthesis', effort: 'high' }
)

return {
  report,
  verifyVerdict: verify?.verdict,
  redTeamAttacks: redteam?.attacks?.length,
  countriesBaseline: baseline.length,
  countriesToday: today.length,
  frame: frame.spine,
}

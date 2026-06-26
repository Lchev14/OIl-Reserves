# MASTER PROMPT v2 — Global Crude Reserve, Redistribution & Restocking Intelligence (Hormuz 2026)

> Purpose: produce a decision-grade intelligence product on global crude reserves during the 2026 Hormuz crisis — not just a consumer coverage table, but the **producer side, the global redistribution ledger, the throughput-constrained restocking outlook, and a Hormuz-duration scenario tree**. Built on the OAS pattern (Orchestrator → Agent → SubAgent). Portable across execution tiers; also shipped as an executable Claude Code Workflow.
>
> **v2 thesis (load-bearing, tested not assumed):** A chokepoint closure does NOT simply move oil from consumers to producers. Producers cannot hoard what they have no tankage for — Gulf storage saturated within ~1–2 weeks (Ras Tanura 4/6 tanks full by early March 2026), forcing **shut-ins, not stockpiling**. So the dominant effect is *foregone production* (>1.3 bn bbl never lifted), with only ~120 mb genuinely stranded (floating +100, onshore +20). The "global reserves are conserved, just redistributed" hypothesis is **refuted in its strong form** and the product must quantify that, not paper over it.
>
> All hard numbers live in the dated illustrative appendix (§9) — re-fetch at run time, never anchor.

---

## 0 — HOW TO RUN THIS

| Tier | Where | Parallelism | Use when | Rough cost (guess, not benchmarked) |
|---|---|---|---|---|
| A — Single session | One Claude window | 1 agent, parallel tool fan-out, sequential phases | quick refresh, steer live | ~$0 (subscription) |
| B — Native subagents / Workflow | Claude Code `/agents` or `Workflow({scriptPath})` | ~10–16 concurrent, context-isolated | **recommended** | ~$25–60, 45–90 min |
| C — Batch fan-out | Anthropic API, asyncio + Batch + caching | hundreds → 100k queued | recurring / full-depth | ~$60–140, 2–4h unattended |

**Model routing:** Orchestrator / synthesis / red team / ledger → `claude-opus-4-8`; domain + country agents → `claude-sonnet-4-6`; extraction / formatting / table assembly → `claude-haiku-4-5`.

**Tier-A honesty clause:** In a single session, A-08 (verification) and A-09 (red team) collapse to *self-review* — the same context that produced a figure blesses it, giving NO independent hallucination control. In Tier A, mark all confidence tags **un-audited** in footnotes. Genuine verification needs the context isolation of Tier B/C.

---

## PHASE −1 — FRAME VERIFICATION (hard gate, before any number)

The entire dataset post-dates the Jan-2026 cutoff. Establish the narrative spine is **real reporting** — not scenario/opinion/aggregator/AI content — from **≥3 independent Tier-1 / major-wire sources** (no two from one publisher group):
- War start date & nature (airstrikes ≠ declared closure — different dates).
- Iran's Strait-closure declaration(s) and the **current** physical-vs-legal status.
- IEA coordinated-release decision: date + headline volume (**IEA's own figure**, not a blog restatement).

**Source-exclusion gate (reused at A-08):** DENY single-purpose "tracker/monitor" sites of unknown provenance, content-farm blogs, opinion/Substack, AI aggregators — usable only as *pointers* to a primary source. **Self-citation guard:** the operator maintains a Hormuz dashboard; any result resolving to it or a derivative is NOT independent — exclude and log it.

If the spine fails ≥3-source corroboration, **STOP and report** — do not build on an unverified premise.

---

## 1 — ORCHESTRATOR

**Mission:** Quantify the global crude-reserve position during the 2026 Hormuz crisis across BOTH sides of the chokepoint — consumer coverage AND producer storage — assemble a global redistribution ledger that tests the conservation thesis, model the throughput-constrained restocking outlook under a Hormuz-duration scenario tree, and estimate total restocking demand. Every figure sourced, confidence-tagged, traceable.

**Audience:** procurement / commodity-intelligence. Leads with *coverage and throughput*, not raw barrels.

**Non-negotiables:**
1. Official vs. estimate never blended in one cell.
2. Every "today" figure carries a confidence tag (§6A) + source + as-of date.
3. No figure → `-`. Never guess.
4. Computed values are live formulas (months = days ÷ 30.44; Δ% = (today − before) ÷ before).
5. **Consumers and producers use DIFFERENT metrics** (§5). Do not force days-of-net-import-cover onto net exporters.
6. **Stock-basis consistency within each table:** consumers on IEA total-stock basis; producers on the exporter schema (§5). Never mix SPR-only into a total-stock column.
7. **Throughput is the binding variable, not volume** — bypass capacity and storage utilization gate the analysis.
8. Surface disagreement; never average it away.
9. **Test the redistribution thesis explicitly** (§5 ledger); report the verdict whichever way it falls.

The orchestrator routes; it never writes analysis. If it starts producing findings, delegate.

---

## 2 — SOURCE DOCTRINE (5-tier hierarchy + triangulation)

Pull in priority order. Record publish AND next-publish date for every official source. Tag every figure with its tier. Apply the §−1 exclusion gate at every tier.

**Tier 1 — Official primary.** IEA OMR (monthly, ~mid-month) + "Oil stocks of IEA countries" data tool (the consumer denominator); IEA Strait of Hormuz Factsheet & Maritime Chokepoints Monitor; OPEC MOMR; EIA STEO (~2nd Tue) + Weekly Petroleum Status Report (Wed, SPR + commercial); JODI (producer-side stocks — note ~2-month lag, weak for Gulf states); national agencies (US DOE/EIA, Japan METI/PAJ, Korea KNOC, EU Euroilstock, China NBS sparse). **Fetch actual next-publish dates from each calendar.**

**Tier 2 — Forecaster ensemble (institutions, track-record-weighted).** Lens panel §4. Capture each institution's *current published* number, as-of date, key assumption. **Anchor to the institution's report — never attach a point forecast to a named living individual.** Banks: Goldman, JPMorgan, Morgan Stanley, UBS, Citi, HSBC, StanChart. Specialists: Energy Aspects, Rystad, Wood Mackenzie, S&P Global Commodity Insights, FGE, Rapidan, Commodity Context. Physical desks (directional colour): Vitol, Trafigura, Gunvor, Glencore.

**Tier 3 — Proxy / alternative data (corroboration).**
- Satellite tank-top: Kayrros, Ursa Space, Orbital Insight, Geospatial Insight (TankWatch), ICEYE — ingest their *published* outputs only; this pipeline does not task satellites. DIY Sentinel-1 pipeline = §11 (separate build).
- Tanker / flow: Kpler, Vortexa, Kayrros, Windward, TankerTrackers, MarineTraffic, IMF PortWatch, IEA Chokepoints Monitor. **Used heavily for the producer side** (floating storage, transit counts, voyage lengthening).

**Tier 4 — Reputable secondary.** Bloomberg, Reuters, FT, Argus, Platts/S&P, CNBC, Lloyd's List — for figures *attributed to* Tier 1–3, then chase the primary. Subject to §−1 gate.

**Tier 5 — Estimate-by-calculation (mass-balance, dimensionally correct).** When no published figure exists, DERIVE it, show the work, tag `Modelled-EST`. **Never add flows (mb/d) to stocks (mb)** — integrate, then normalize:

```
Per consumer country:
  R       = replacement + demand_relief − blocked            [mb/d]   (net daily stock-change rate)
  ΔStock  = R × T − S_release        (T = days since war start) [mb]
  Δdays   = ΔStock ÷ D    (D = fixed prior-year avg daily net imports) [days]
  Today_days = Before_days + Δdays
Units: (mb/d·d) − mb = mb ; mb ÷ (mb/d) = days. ✔
```
Calibrate every input **per country to its Hormuz dependence** — a global average is the failure mode that turns estimation into laundered guessing. Each input carries its own source.

**Triangulation:** `Verified` needs ≥2 independent source CLASSES. **A Tier-5 model is ≤1 class** — model + one news quote never earns `Verified`. Per-country June figures are largely OMR-paywalled, so expect a `-`/`Modelled-EST`-heavy "today" column; **an honest sparse column is correct, not a defect.** Classes diverging >15% → output both, divergence-flagged, headline = higher tier.

---

## 3 — AGENT REGISTRY (OAS pipeline, v2)

```
ORCHESTRATOR (opus) — routes, holds output contract, never analyses
│
├── A-00  Frame Verification          (opus)   — §−1 spine + exclusion + self-citation. GATES ALL.
├── A-01  Hormuz Status & Flow        (sonnet) — hinge. open/contested/closed; flow mb/d now vs prewar; tracker divergence
├── A-02  Price & Key Indicators      (sonnet) — Brent prewar/peak/now; SPR fill%; IEA release; freight/war-risk premia
├── A-03  Consumer Baseline (Dec'25)  (sonnet) — IEA days-of-net-import cover per consumer + fixed denominator D
│         └─ 16 consumer subagents (haiku)
├── A-04  Consumer Today (Jun'26)     (sonnet) — depends on A-01/02/03; triangulate → Tier-5 → "-"
│         └─ 16 consumer subagents (haiku)
├── A-11  Producer Reserves           (sonnet) — Gulf-6 exporter schema (§5): export-cover days, usable mb, storage-util%, bypass-adj export cap, in/out-of-Hormuz tag, shut-in mb/d
│         └─ 6 producer subagents (haiku)  [Saudi, UAE, Iran, Iraq, Kuwait, Qatar]
├── A-12  Throughput / Bypass Model   (sonnet) — Petroline/Yanbu, ADCOP/Fujairah, Kirkuk-Ceyhan, Jask; bypass ceiling vs stranded; OPEC spare trapped behind Hormuz
├── A-13  Global Redistribution Ledger(opus)   — THESIS TEST: consumer draws vs producer builds vs foregone production; redistribution coefficient; reconcile to IEA observed global draw
├── A-14  Weekly Trajectory           (sonnet) — Feb→Jun stock path (EIA weekly + IEA monthly); locate the draw→restock inflection
├── A-15  Hormuz-Duration Scenario Tree(opus)  — S1 reopen-fast / S2 contested-grinding / S3 re-close-hard → conditional reserve path + price + restock timeline
├── A-16  Import-at-Risk              (haiku)  — per consumer: Hormuz-dependence % × days-cover → effective at-risk cover
├── A-05  Restocking Assessment       (sonnet) — 4 questions, throughput-aware (you do NOT restock from trapped OPEC spare)
├── A-06  Restocking Demand Estimate  (sonnet) — refill + new builds, NET of demand destruction, method shown
├── A-07  Lens Panel / Competing Views(opus)   — §4 ACH; name disagreement
├── A-08  Source Verification         (opus)   — isolated; kill unsourced/hallucinated; fix tags; §−1 gate; top-down vs bottom-up reconciliation
├── A-09  Red Team                    (opus)   — isolated; ≥5 substantive attacks incl. estimator dimensionality + ledger logic
└── A-10  Synthesis + Build           (opus→haiku) — output contract §7; disagreements + thesis verdict preserved
```

**Run order (dependency-correct):**
```
A-00 → A-01 → A-02
     → [A-03 → A-04]  (consumer)   ∥  [A-11 → A-12]  (producer)
     → A-13 (ledger, needs A-04+A-11+A-12)
     → [A-14 ∥ A-15 ∥ A-16]
     → [A-05 ∥ A-06]
     → A-07
     → [A-08 ∥ A-09]   (isolated)
     → A-10
```
Within A-03/A-04 the 16 consumer subagents fan out; within A-11 the 6 producer subagents fan out. Each agent reads: orchestrator + own spec + named prior outputs only. No cross-context bleed.

---

## 4 — ANALYTICAL LENS PANEL (rigorous "persona" replacement)

Each lens = a real **institution's** published model + incentive + current number. Force every restocking/price conclusion through all lenses; synthesis names where they split and WHY.

| Lens | Institution | Structural bias |
|---|---|---|
| Bearish-fundamentals | JPMorgan Global Commodities | glut reasserts; disruptions transient |
| Shock-responsive | Goldman Sachs Commodities | prices Hormuz duration explicitly |
| Equity/valuation | Morgan Stanley Commodities | high US exports + low China imports cap upside |
| Official base case | EIA STEO / IEA OMR | model-driven, conservative |
| Geopolitics-first | Rapidan Energy | escalation / regime-change premium |
| Physical-flow realist | Energy Aspects + desks | what tankers/refiners actually do |
| Macro-allocator | macro-allocator framework (institution, not a person) | reserves as macro/inflation signal — weakest-grounded; drop if tightening |

Rules: anchor to *published* positions; no fabricated quotes; no point forecast attached to a named living individual; pull all numbers live.

---

## 5 — CALCULATION ENGINE

### 5A — Consumer coverage (16 countries)
- **IEA total-stock basis** (public/strategic + industry/commercial), same basis every consumer row.
- **Denominator fixed:** D = prior-year avg daily net imports; same D both snapshots, so before-vs-today moves with the numerator. Auditable.
- Months = days ÷ 30.44 (live). **Δ% identical for days and months — compute once.** (Months is collinear with days: presentation, not analysis.)
- **Net-exporter consumers (US, Netherlands):** days-of-net-import-cover explodes as net imports → 0. Convention: strategic+commercial vs *gross* crude imports, footnoted (recommended for US), else `-`. Pick one, apply consistently. SPR-only broken out in key indicators, never in the coverage column.
- **Non-IEA Asia (Thailand, Philippines, Indonesia, Vietnam):** national fragments tagged `Modelled-EST`, else `-`. No imputation.
- **China:** outside IEA; third-party EST only.

### 5B — Producer schema (Gulf-6: Saudi, UAE, Iran, Iraq, Kuwait, Qatar)
Days-of-net-import-cover is meaningless. Report per producer:
- **Days of export cover** = usable above-ground stock ÷ pre-crisis export rate (headline).
- **Absolute usable stock (mb)**, split: *domestic-inside-Hormuz* | *domestic-outside-Hormuz* (e.g. Saudi Red Sea/Yanbu side) | *leased-abroad* (Aramco Okinawa/Sidi Kerir/Rotterdam).
- **Storage-utilization %** — the binding constraint; ≥~85–95% ⇒ forced shut-in regardless of "days."
- **Bypass-adjusted export capacity (mb/d)** — what can still ship without Hormuz (§5C).
- **Shut-in (mb/d)** — production foregone (this is where the barrels went, not into storage).
- Tag every stock *inside vs. outside the relevant chokepoint*.

### 5C — Throughput / bypass model
```
Hormuz_normal_crude ≈ 14–17 mb/d
Bypass_ceiling = Petroline/Yanbu_realized (port-gated) + ADCOP/Fujairah_spare + Kirkuk-Ceyhan(Iraq-internal) + Jask(negligible)
Stranded = Hormuz_normal_crude − Bypass_realized
```
Note: OPEC spare capacity (~3.5–4 mb/d) is largely **trapped behind Hormuz** ⇒ unusable during closure. Kuwait and Basrah-Iraq have **zero** bypass. Kirkuk-Ceyhan carries northern-Iraqi crude that never used Hormuz ⇒ little true relief.

### 5D — Global redistribution ledger (the thesis test)
```
Accounting identity over the window T:
  ΔGlobal_stock = Production − Consumption          (≈ observed IEA global draw, ~mb/d × T)

Decompose WHERE the change sits:
  Consumer_draw      = Σ (consumer SPR + commercial draws)            [mb, negative]
  Producer_build     = floating_storage_build + onshore_stranded      [mb, positive]
  Foregone_output    = Σ shut-in production × T                       [mb, never produced]
  Demand_destruction = Σ import/refinery-run declines                 [mb, cushions the gap]

Redistribution coefficient  ρ = Producer_build ÷ |Consumer_draw|
  ρ → 1  ⇒ conservation/redistribution thesis holds
  ρ ≪ 1  ⇒ dominant effect is foregone production, NOT redistribution
Reconcile the decomposition to the IEA observed global draw; residual = error bar.
```
Report ρ with its confidence band and an explicit verdict. (Research to date: ρ ≪ 1 — ~120 mb stranded vs >1.3 bn bbl foregone.)

### 5E — Import-at-risk (consumers)
`effective_at_risk_cover_days = days_of_cover × (1 − Hormuz_dependence_share)` is the *un*-exposed cover; also report `days_of_cover` and `Hormuz_dependence_share` raw. A high-cover, high-dependence country is more fragile than the headline days suggest.

### 5F — Scenario tree (Hormuz duration)
Three states, each with conditional reserve trajectory + Brent path + restock timeline:
- **S1 Reopen-fast** — deal holds, flows → prewar within Qx.
- **S2 Contested-grinding** — current ~4.8 mb/d, intermittent re-closures (the observed base case).
- **S3 Re-close-hard** — deal collapses, full closure; compute SPR-exhaustion timeline at observed draw.
Tag each state with a subjective probability *only if* anchored to a forecaster's stated odds; else leave unweighted and say so.

### 5G — Top-down vs bottom-up reconciliation
Σ(country stocks) vs IEA published OECD aggregate. Divergence = the product's error bar; report it, don't hide it.

---

## 6 — QUALITY GATES

### 6A — Confidence taxonomy (ONE ladder, used everywhere)
| Tag | Meaning | Bar |
|---|---|---|
| `Verified-official` | Tier-1 primary, as-of dated | authoritative publisher suffices |
| `Inferred-triangulated` | ≥2 independent source classes agree | model may be ONE class |
| `Modelled-EST` | Tier-5 mass-balance, work shown | single class; never → Verified |
| `Absent (-)` | no qualifying figure | never guessed |

**Aggregation rule:** when summing to any total (ledger, reconciliation), do NOT sum across tiers as equals — carry a confidence-weighted band, and report the total as a range.

### 6B — Gates
1. **Frame gate (A-00):** ≥3 independent qualifying sources or STOP.
2. **Source-verification (A-08):** no figure ships without a real, §−1-qualifying source + as-of date; unsourced → deleted. *(Teeth only Tier B/C.)*
3. **Confidence tagging:** every cell tagged §6A, visible in output.
4. **Red-team (A-09):** ≥5 substantive attacks on table, estimator (dimensional integrity + per-country calibration), ledger logic, scenario tree, synthesis; each answered. Cosmetic fails. *(Teeth only Tier B/C.)*
5. **Disagreement preservation:** state splits + drivers. Averaging is a defect.
6. **Hormuz freshness:** A-01 dated within the run window; restocking + scenarios conditional on it.
7. **Thesis-verdict gate:** the ledger (5D) must output ρ + a stated verdict; "redistribution" may not be assumed.

---

## 7 — OUTPUT CONTRACT

**(a) Consumer reserve table** — columns exactly:
`Country | Before (days) | Before (months) | Today (days) | Today (months) | Δ days | Δ % | Hormuz-dep % | Eff. at-risk cover | Confidence | Source & Date`
Order: USA; Germany, France, UK, Italy, Spain, Netherlands, Poland; Japan, S. Korea, China, India, Thailand, Philippines, Indonesia, Vietnam. Live formulas; `-` where absent; same stock basis every row.

**(b) Producer table (Gulf-6)** — columns exactly:
`Country | Export-cover (days) | Usable stock mb (in-Hormuz / out / abroad) | Storage-util % | Bypass-adj export cap mb/d | Shut-in mb/d | Confidence | Source & Date`
Plus a note on the Atlantic-Basin re-routers (US/Russia/Brazil/Canada/Kazakhstan/Venezuela) handled flow-only in (d)/(f).

**(c) Key-indicators block:** Brent prewar(27-Feb)/peak/now; Hormuz flow mb/d prewar vs now; US SPR fill% + absolute; IEA total release + US share; VLCC/war-risk premium prewar vs now. Source + date each.

**(d) Global redistribution ledger:** the 5D decomposition with ρ, the reconciliation residual, and an explicit **thesis verdict**.

**(e) Throughput / bypass model:** bypass ceiling vs stranded; OPEC-spare-trapped note.

**(f) Restocking assessment** — answer all four, throughput-aware:
- a) Depletion ~4 months post-war (consumer AND producer).
- b) From where — Gulf-via-Hormuz vs Atlantic Basin/US shale/Russia/pipeline reroute; **note OPEC spare is trapped, not a source.**
- c) At what price — stranded-Gulf-discount vs Atlantic-premium split; reconcile Dec-2025 reserve baseline vs 27-Feb price baseline vs scope's $65; freight + war-risk premium.
- d) Timeline — refill pace + ~4-month price-transmission lag + bypass ramp limits.

**(g) Restocking-demand estimate:** refill + new builds, NET of demand destruction; method + inputs.

**(h) Scenario tree:** S1/S2/S3 conditional reserve path + price + timeline.

**(i) Weekly trajectory:** Feb→Jun stock path + inflection point.

**(j) Footnotes & reconciliation:** every convention, every modelled figure's inputs, top-down vs bottom-up divergence (error bar), A-09 responses, the run tier + whether verification was independent. Days + months consistent; Excel-compatible.

---

## 8 — KICKOFF BLOCK

```
Phase: -1
Mode: full-decomposition (OAS) | tier: B (Workflow)
Project: Hormuz-2026 Crude Reserve, Redistribution & Restocking Intelligence (v2 maximal)
Goal: consumer coverage table + producer table + global redistribution ledger (thesis test) + throughput model + restocking assessment + demand estimate + Hormuz-duration scenario tree + weekly trajectory, fully sourced & confidence-tagged.
Non-negotiables: frame-verify first; consumers≠producers metric; throughput is binding; test the redistribution thesis (report ρ + verdict); official≠estimate; tag every cell §6A; dimensionally-correct estimator §2; surface disagreement.
First action: A-00 Frame Verification — corroborate war/Hormuz/IEA spine ≥3 independent sources + exclusion/self-citation gate. Fail ⇒ STOP.
Quality: MAXIMUM. All gates §6. Red team adversarial, not cosmetic.
Stop after: A-10 synthesis. Present output contract §7.
```

---

## 9 — ILLUSTRATIVE APPENDIX (dated ~24–26 Jun 2026; RE-FETCH, do not anchor)

> Point-in-time, decays fast (the Hormuz flow shifted materially inside one week). Re-fetch every value at run time. Sources are illustrative pointers; A-00/A-08 must re-verify.

**Spine.** War start 28 Feb 2026 (US/Israel airstrikes, "Operation Epic Fury"); Iran declared Hormuz "closed" ~4 Mar; IEA coordinated release **400 mb** decided 11 Mar (largest ever; IEA's own figure — "426M" is a secondary-blog restatement, do not use). US naval blockade of Iran ~13 Apr–~29 May; US-Iran 14-point MOU ~17 Jun (strait toll-free 60 days, blockade lifted ~18 Jun); Iran re-declared closure ~20 Jun over Lebanon ceasefire dispute.

**Hormuz.** Contested-but-flowing, volatile. ~4.8 mb/d post-deal vs ~15 mb/d prewar; transit counts swung (~35 vessels → ~12 day-over-day); trackers diverge (AIS-off vessels hug the Omani coast, understating counts).

**Brent.** ~$72 eve-of-war (27 Feb); peak ~$120 (early Mar); ~$80 mid-Jun (WTI ~$77.5). Scope's "$65" is a late-2025 print, not eve-of-war.

**Consumer reserves.** US SPR ~411 mb end-2025 → ~331 mb mid-Jun (lowest since ~1983; SPR is strategic-only — keep out of the total-stock column). OECD government stocks −163 mb in May alone, lowest since Dec 1990; OECD forward cover heading to ~50 days by end-2026 (lowest since 2003). Japan ~200 / S. Korea ~208 days (end-2025 IEA). China SPR ~1.3 bn bbl (~120 days, third-party EST) — built through 2025, DREW during the crisis (cut spot buying >⅓).

**Producer side.** Ras Tanura 4/6 tanks full early Mar ⇒ curtailment. Gulf shut-ins ~7.5 mb/d (Mar) → 9.1 (Apr) → >11 (May); cumulative foregone output >1.3 bn bbl. Aramco leased storage abroad: Okinawa ~8.2 mb, Sidi Kerir/Egypt ~11.7 mb held, Rotterdam MOT stake, Fujairah products — drawn down (far side of Hormuz). Middle East floating storage +100 mb (Mar); Gulf onshore +20 mb. ~80 mb on ~40–54 VLCCs stranded at anchor, flushed within weeks of the deal (~35 mb exited post-deal).

**Throughput / bypass.** Petroline/Yanbu nameplate ~5 mb/d (→~7 with NGL-line conversion) but **port-gated to ~3 mb/d realized** (~2.5 mb/d in Jun). UAE ADCOP/Fujairah ~1.5–1.8 mb/d, ~71% used, ~0.4–0.7 spare; "West-East 1" expansion not online until 2027. Kirkuk-Ceyhan open, ~250 kb/d ramping to ~600 (Iraq-internal). Jask ~300 kb/d effective ("not viable" per IEA). **Bypass ceiling ~3–5 mb/d vs ~9–15 mb/d stranded.** OPEC spare ~3.5–4 mb/d, "all behind Hormuz" (Vitol); Kuwait & Basrah-Iraq zero bypass.

**Ledger inputs.** Observed global draw ~3.8 mb/d (2.4 crude / 1.4 products); ~250 mb Mar–Apr. Producer build ~120 mb (float +100, onshore +20) vs foregone output >1.3 bn bbl ⇒ **ρ ≪ 1, strong-form redistribution thesis refuted.** Atlantic Basin exports +3.5 mb/d to East-of-Suez (US/Brazil/Canada/Kazakhstan/Venezuela). Demand destruction: China+Japan imports ~−40% (~−6 mb/d combined); 2Q26 global demand −2.4 mb/d YoY; refinery runs −5 mb/d YoY.

**Prices/economics.** VLCC TD3C ~$420–474k/day (~4× the ~$117k prewar); war-risk hull 0.125% → 1% per 7 days (~$10–14m/transit). Late-Jun spreads reverting as flows normalize: Gulf grades flipping back to discount (Cash Dubai −$0.27, Oman −$0.96, Murban −$0.67); Atlantic light-sweet oversupplied (Congo Djeno −$10.85 to Dated Brent).

Re-pull classes: IEA.org (OMR Mar–Jun, Hormuz Factsheet, Chokepoints Monitor), EIA.gov (STEO + Weekly), OPEC MOMR, JODI, and major wires (Reuters/Bloomberg/FT/CNBC/Al Jazeera/Lloyd's List/S&P Platts) — each via the §−1 gate.

---

## 10 — CHANGELOG

**v2 (this revision):**
- Added **producer tier** (Gulf-6) with a distinct exporter schema (export-cover days, usable mb in/out/abroad, storage-util %, bypass-adj export cap, shut-in) — §5B, A-11.
- Added **throughput/bypass model** (§5C, A-12) — throughput, not volume, is the binding variable; OPEC spare trapped behind Hormuz.
- Added **global redistribution ledger** (§5D, A-13) — tests the conservation thesis, outputs ρ + verdict (research: refuted in strong form).
- Added **Hormuz-duration scenario tree** (§5F, A-15), **import-at-risk** (§5E, A-16), **weekly trajectory** (§5G→A-14), **top-down/bottom-up reconciliation** (§5G, A-08).
- Added **confidence-weighted aggregation** rule (§6A) and a **thesis-verdict gate** (§6B-7).
- Output contract expanded to consumer table + producer table + ledger + throughput + scenarios + trajectory (§7).
- DIY **Sentinel-1 satellite tank-shadow pipeline** spec added as §11 (separate build).

**v1 corrections (carried forward):** dimensionally-correct mass-balance estimator; fixed dependency graph; consistent stock basis; triangulation × data-reality resolved; Tier-A self-review honesty clause; single confidence taxonomy; pinned temporal baselines; lens panel de-risked; Phase −1 frame verification + exclusion/self-citation gate; IEA 400M (not 426M); Hormuz dates disambiguated; numbers moved to dated appendix.

---

## 11 — SATELLITE TANK-TOP PIPELINE (separate lc-build project; spec only)

**This is a separate project, not part of the run above.** Expanded from a China/Gulf-only target to a global ~80%-of-visible-stock footprint — *but with an explicit materiality correction* (read §11.0 first, it changes the allocation).

### 11.0 — Why "cover 80% of global stock with satellite" is the wrong objective
Satellite tank-top is expensive effort. Spending it where **free official data already exists is waste**. The value is strictly at **data-dark sites**. So allocate by *information gap*, not by stock share:
- **OECD importers (US, Japan, Korea, Germany, ARA/NL, Italy, Spain, UK, France, Poland):** IEA OMR + EIA weekly + Euroilstock already publish stocks. Satellite adds ~nothing → **skip** (use official; satellite only as an audit cross-check).
- **China + non-OECD Asia (India partial, Thailand, Indonesia, Vietnam):** opaque, third-party-estimate only → **highest marginal value**.
- **Gulf + other producer export terminals (Saudi, UAE, Iraq, Iran, Kuwait, Qatar; plus Russia, Nigeria, Venezuela):** terminal stocks unreported → **high value**.
This is why the v1 spec named China + Gulf: not because they are the biggest, but because they are the **darkest**. The 80%-of-stock target is achievable for the *visible above-ground* layer (see 11.2), but the *decision-relevant* coverage is the ~30–40% of global stock that nobody publishes.

### 11.1 — Materiality by tank type (what the method physically can and cannot see)
- **Floating-roof tanks → YES.** The roof rises/falls with volume; optical shadow-length + sun geometry → fill %, and SAR sees the roof-position ring. **Most commercial crude storage worldwide is floating-roof** (ARA, Cushing, US Gulf, Chinese coastal farms, Singapore, Gulf export terminals). This is the workable universe.
- **Fixed-roof tanks → NO direct fill (SAR gives weak proxies only).** Common for products, some Asian storage.
- **Underground / salt-cavern / rock-cavern → INVISIBLE to any overhead method.** Two load-bearing cases:
  - **US SPR is in salt caverns** (Bryan Mound, Big Hill, West Hackberry, Bayou Choctaw) — *cannot* be seen from orbit. (Moot: EIA publishes it weekly.)
  - **Part of China's SPR is in underground/rock caverns** (e.g. Huangdao) — invisible. But much of China's commercial + SPR is **above-ground floating-roof** (Zhoushan, Dalian, Rizhao, Huizhou) → visible. This is the single highest-value satellite target on Earth.
- **Best-fit where tanks are invisible:** **tanker-flow mass-balance** — implied stock change = imports − refinery runs − exports (Kpler/Vortexa + JODI/customs), the same logic the Tier-5 estimator uses. Satellite covers the above-ground layer; mass-balance covers the buried layer; together they bound the total.

### 11.2 — Global AOI catalogue (~80% of *visible* crude storage)
Prioritised tiers (build China+Gulf first; they carry the information value):
- **Tier-A (data-dark, build first):** China (Zhoushan, Dalian, Rizhao, Huizhou, Ningbo, Lanzhou); Gulf export terminals (Ras Tanura, Ju'aymah, Yanbu, Fujairah, Jebel Ali, Kharg, Basrah/Fao, Mesaieed); Russia (Primorsk, Ust-Luga, Novorossiysk); Nigeria (Bonny), Venezuela (José).
- **Tier-B (semi-transparent):** India (Jamnagar, Mangalore, Vizag SPR), Singapore (Jurong), Fujairah commercial, South Africa (Saldanha Bay), Malaysia (Pengerang).
- **Tier-C (transparent — audit cross-check only):** ARA (Rotterdam/Amsterdam/Antwerp), US (Cushing, Houston, LOOP/Clovelly), Caribbean (St Eustatius, Bahamas).

### 11.3 — Pipeline
- **Imagery:** Copernicus **Sentinel-1 SAR** (all-weather, day/night; floating-roof ring signature) + **Sentinel-2 optical** (shadow-length on clear days); free, EU-owned, ~6–12 day revisit; fuse for cadence. Add **commercial high-res (Planet/Umbra/ICEYE)** only for Tier-A sites needing tighter revisit.
- **Method:** (1) per-site tank-farm AOI catalogue + per-tank polygons; (2) floating-roof detection & classification (drop fixed-roof/cavern sites to the mass-balance track); (3) fill proxy — optical shadow length × sun-elevation → roof height → %full; SAR backscatter/ring as the all-weather proxy; (4) calibrate the fill-curve against published Kayrros/Ursa/Orbital figures; (5) aggregate to regional weekly stock-change with error bars; (6) **fuse with tanker-flow mass-balance** for buried-capacity sites and total reconciliation.
- **Stack:** Copernicus Data Space / Google Earth Engine; Python (rasterio, sentinelhub, scikit-image, a small CV/segmentation model); validation harness vs published provider numbers; output tagged `Modelled-EST` Tier-3 proxy, **never `Verified`**.
- **Honest limits:** fixed-roof/cavern defeats the optical method (SAR only partial); calibration without ground truth is the hard part; cloud cover gates optical (SAR mitigates); revisit ≠ daily. Scope as its own repo. Realistic effort: a focused China-only floating-roof MVP is a few-week build; the full global Tier-A/B catalogue is a multi-month project — sequence it.

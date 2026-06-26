# MASTER PROMPT — Global Crude Reserve & Restocking Intelligence (Hormuz 2026)

> Purpose: produce the before-vs-today reserve-coverage table, key-indicators block, restocking assessment, and total restocking-demand estimate defined in the source scope — at the quality a top crude desk would accept. Built on the OAS pattern (Orchestrator → Agent → SubAgent). Portable across execution tiers.
>
> **Revision note (this version):** all hard numbers have been moved out of the prompt body into a dated, illustrative appendix (§9). The body now instructs live re-fetch and never anchors on a stale figure. Eight structural corrections applied vs. the original draft — see §10 changelog.

---

## 0 — HOW TO RUN THIS

**Pick the tier that matches your environment:**

| Tier | Where | Parallelism | Use when | Rough cost (estimate, not measured) |
|---|---|---|---|---|
| A — Single session | This chat / one Claude window | 1 agent, parallel tool fan-out, sequential phases | quick refresh, you'll steer live | ~$0 (subscription) |
| B — Native subagents | Claude Code `/agents` or the Workflow primitive | ~10 concurrent, context-isolated | **recommended for this scope** | ~$15–35, 30–60 min (rough) |
| C — Batch fan-out | Anthropic API, asyncio + Batch + prompt caching | hundreds → 100k queued | full 16-country deep build, recurring | ~$40–90, 1–3h unattended (rough) |

> Cost/time figures above are order-of-magnitude guesses, not benchmarked. Treat as planning hints only.

**Model routing (cost-aware):**
- Orchestrator / synthesis / red team → `claude-opus-4-8`
- Domain + country agents → `claude-sonnet-4-6`
- Extraction / formatting / table assembly → `claude-haiku-4-5`

**Tier-A honesty clause (important):** In a single session, A-08 (verification) and A-09 (red team) collapse to *self-review* — the same context that produced a figure also blesses it, so they do **not** provide independent hallucination control. In Tier A, treat all confidence tags as **un-audited** and say so in the footnotes. Genuine verification requires the context isolation of Tier B/C (separate subagents that never saw the figure's generation).

---

## 1 — ORCHESTRATOR

**Mission (one sentence):** Quantify strategic + commercial crude coverage (days AND months of net-import cover) for 16 countries at two snapshots — pre-war baseline (Dec 2025) vs. today (run date, ~late June 2026) — then assess the restocking outlook, with every figure sourced, confidence-tagged, and traceable.

**Operator context:** Energy-markets analyst output for a procurement/commodity-intelligence audience. Excel-compatible deliverable. The reader leads with *coverage* (days/months), not raw barrels. Hormuz status is the hinge variable and must be verified, never assumed.

**Non-negotiables:**
1. Official vs. estimate never blended in the same cell.
2. Every "today" figure labelled with a confidence tag (§6A) plus its source and as-of date.
3. No figure exists → `-`. Never guess to fill a cell.
4. Computed values are live formulas, never hard-coded (months = days ÷ 30.44; Δ% = (today − before) ÷ before).
5. Net exporters break "days of net-import cover" — handle by explicit convention (§5), don't force a number.
6. **Stock-basis consistency:** every country row reports the SAME stock basis — IEA total-stock definition (public/strategic + industry/commercial), not strategic-only for some and total for others (§5).
7. Surface disagreement between sources/lenses; do not average it away.

**The orchestrator routes; it never writes the analysis itself.** If it starts producing findings, the architecture has collapsed — delegate.

---

## PHASE −1 — FRAME VERIFICATION (runs before any number is gathered)

The entire dataset post-dates the Jan-2026 knowledge cutoff. Before quantifying anything, independently establish the *narrative spine* is real reporting, not scenario/opinion/aggregator/AI-generated content. **Garbage frame in → precisely-tagged garbage out.**

Establish from **≥3 independent Tier-1 or major-wire sources** (no two from the same publisher group):
- War start date and nature (airstrikes vs. declared closure are different dates — keep them distinct).
- Whether/when Iran declared the Strait closed, and the current physical-vs-legal status (open / contested-but-flowing / closed).
- The IEA coordinated-release decision: date, headline volume, member split. **Use the IEA's own figure, not a secondary blog's restatement.**

**Source-exclusion gate (mandatory here and reused in A-08):**
- DENY: single-purpose "live tracker / monitor" sites of unknown provenance, content-farm blogs, opinion/Substack, and any AI-generated aggregator. These may be cited only as *pointers* to a primary source, never as the source.
- **Self-citation guard:** the operator maintains a Hormuz dashboard. If a search result resolves to that dashboard (or a mirror/derivative of it), it is NOT an independent source — flag and exclude. Do not let the operator's own modelling re-enter as corroboration.

If the spine cannot be corroborated across ≥3 independent qualifying sources, **stop and report that**, rather than proceeding to build a table on an unverified premise.

---

## 2 — SOURCE DOCTRINE (5-tier hierarchy + triangulation)

Pull in this priority order. Record publish date AND next-publish date for every official source. Tag every extracted figure with its tier. Apply the §−1 exclusion gate to every source at every tier.

**Tier 1 — Official, primary (highest weight).** Capture cadence + next release.
- IEA Oil Market Report (OMR) — monthly, ~mid-month. Days-of-net-imports data tool updates with it.
- IEA "Oil stocks of IEA countries" data tool — days of net imports per country (the baseline denominator).
- OPEC Monthly Oil Market Report (MOMR) — monthly, ~mid-month.
- EIA Short-Term Energy Outlook (STEO) — monthly, ~2nd Tuesday.
- EIA Weekly Petroleum Status Report — Wednesdays (SPR + commercial crude).
- EIA "Today in Energy" cross-country strategic inventory analysis.
- JODI (Joint Organisations Data Initiative) — monthly; the official OPEC-side stock source.
- National agencies: US DOE/EIA, Japan METI / PAJ, Korea KNOC, EU Euroilstock, China NBS (sparse).
- **Action: fetch the actual next-publish date from each provider's calendar; do not assert from memory.**

**Tier 2 — Forecaster ensemble (named institutions, track-record-weighted).** Use as the lens panel (§4). Capture each institution's *current published* number, *as-of date*, and *key assumption*. **Anchor to the institution's published report — do NOT attach a specific point forecast to a named living individual.**
- Banks: Goldman Sachs Commodities Research, JPMorgan Global Commodities, Morgan Stanley, UBS, Citi, HSBC, Standard Chartered.
- Specialists: Energy Aspects, Rystad Energy, Wood Mackenzie, S&P Global Commodity Insights, FGE, Rapidan Energy (geopolitics), Commodity Context (independent).
- Physical desks (directional colour, not point data): Vitol, Trafigura, Gunvor, Glencore public commentary.

**Tier 3 — Proxy / alternative data (corroboration, not gospel).**
- Satellite tank-top (floating-roof shadow / SAR): Kayrros, Ursa Space, Orbital Insight, Geospatial Insight (TankWatch), ICEYE. Ingest their *published* outputs / quoted figures — this pipeline does NOT task satellites itself. Free raw imagery (Copernicus Sentinel-1/2) noted; DIY shadow pipeline is a separate build, flag if ground-truth is required.
- Tanker / flow tracking: Kpler, Vortexa, Kayrros, Windward, TankerTrackers.com, MarineTraffic, IMF PortWatch, IEA Maritime Chokepoints Monitor.

**Tier 4 — Reputable secondary.** Bloomberg, Reuters, FT, Argus, Platts, CNBC — use for figures *attributed to* Tier 1–3, then chase the primary. Subject to the §−1 exclusion gate (a wire is fine; a content farm restating a wire is not).

**Tier 5 — Estimate-by-calculation (the mass-balance estimator).** When no published "today" figure exists, DERIVE it, show the work, label `Modelled-EST`. **The formula must be dimensionally correct** — integrate the daily imbalance over elapsed time, then normalize by the fixed denominator. Do NOT add flows (mb/d) to stocks (mb).

```
Let, per country:
  blocked      = lost Hormuz-routed crude inflow            [mb/d]
  replacement  = documented re-routed inflow (Atlantic Basin / US shale / Russia / pipeline)  [mb/d]
  demand_relief= reduction in import requirement from demand destruction                       [mb/d]
  S_release    = emergency stock released by/attributed to the country over the window         [mb]   (a STOCK)
  T            = days elapsed from war start to run date     [days]   (≈ 118 at 26-Jun-2026)
  D            = fixed IEA denominator = prior-year avg daily net imports                       [mb/d]

Net daily stock-change rate:
  R  = replacement + demand_relief − blocked                 [mb/d]     (R>0 builds stock, R<0 draws)

Cumulative stock change over the window:
  ΔStock = R × T − S_release                                 [mb]

Change in coverage:
  Δ coverage_days = ΔStock ÷ D                               [days]
  Today_days      = Before_days + Δ coverage_days

Units check: (mb/d × days) − mb = mb;  mb ÷ (mb/d) = days. ✔
```
Calibrate every input **per country to its Hormuz dependence** — a global average applied uniformly is the failure mode that turns this from estimation into laundered guessing. Each input value carries its own source.

**Triangulation rule (with the Tier-5 ambiguity resolved):**
- A `Verified` cell requires ≥2 independent source CLASSES (e.g. IEA aggregate + satellite proxy, or national agency + tanker flow).
- **A Tier-5 modelled estimate counts as at most ONE class.** It can be *corroborated* by a second independent class (→ `Inferred`), but model + one news quote is NOT two independent classes and never earns `Verified`.
- Reality check: per-country June figures are largely OMR-paywalled. Expect the "today" column to be `Modelled-EST` or `-` for most non-IEA rows. **An honest `-`-heavy column is the correct output, not a defect to paper over.**
- If two classes diverge >15%, output BOTH with a divergence flag and the more-trusted tier as the headline.

---

## 3 — AGENT REGISTRY (OAS pipeline)

```
ORCHESTRATOR (opus-4-8) — routes, holds output contract, never analyses
│
├── A-00  Frame Verification           (opus)   — §−1. Spine real? Exclusion gate. GATES EVERYTHING.
├── A-01  Hormuz Status & Flow         (sonnet) — the hinge. Open/ramping/constrained?
│         └─ subagents: vessel-transit counts | war-risk premia | reopening timeline | divergence between trackers
├── A-02  Price & Key Indicators       (sonnet) — Brent pre-war/peak/now, SPR fill %, IEA release total, Hormuz mb/d pre vs now
├── A-03  Reserve Baseline (Dec 2025)  (sonnet) — IEA days-of-net-imports per country = the "before" column + the fixed denominator D
│         └─ 16 country subagents (haiku) — one per country, official figure + as-of date
├── A-04  Reserve Today (Jun 2026)     (sonnet) — the hard column; consumes A-01/A-02/A-03; §2 Tier 1–3, falls to Tier 5 estimator
│         └─ 16 country subagents (haiku) — triangulate; tag confidence; "-" where genuinely absent
├── A-05  Restocking Assessment        (sonnet) — answers the 4 questions (depletion / from-where / at-what-price / timeline)
├── A-06  Restocking Demand Estimate   (sonnet) — released-stock refill + new capacity builds, method shown, net of demand loss
├── A-07  Lens Panel / Competing Views (opus)   — §4; runs the forecaster ensemble as ACH, names disagreement
├── A-08  Source Verification          (opus)   — every claim → real source; kills hallucinated figures; checks tags; applies §−1 gate
├── A-09  Red Team                     (opus)   — adversarial: attack the table, the estimator, the timeline. Not cosmetic.
└── A-10  Synthesis + Table Build      (opus→haiku) — assembles output contract §7; disagreements preserved, not averaged
```

**Run order (dependency-correct — A-04 depends on A-01/A-02/A-03, it does NOT run parallel to them):**
```
A-00 → A-01 → A-02 → A-03 → A-04 → A-05 → A-06 → A-07 → A-08 → A-09 → A-10
```
The only safe parallelism is *within* A-03 and within A-04: the 16 country subagents fan out concurrently. A-05/A-06 may overlap once A-04 is done. Each agent reads: orchestrator + its own spec + named prior outputs only. No cross-context bleed.

> Note on independence: A-08/A-09 only add value when run as separate context-isolated agents (Tier B/C). In Tier A they are self-review — see §0 honesty clause.

---

## 4 — ANALYTICAL LENS PANEL (the rigorous "persona" replacement)

Not role-play. Each lens = a real **institution's** actual model + incentive + current *published* number. Force every restocking/price conclusion through all lenses; the synthesis names where they split and WHY.

| Lens | Anchored to (institution) | Structural bias | Current stance |
|---|---|---|---|
| Bearish-fundamentals | JPMorgan Global Commodities | supply glut reasserts; disruptions transient | pull live |
| Shock-responsive | Goldman Sachs Commodities | prices Hormuz duration explicitly | pull live |
| Equity/valuation | Morgan Stanley Commodities | "twin-solvers": high US exports, low China imports cap upside | pull live |
| Official base case | EIA STEO / IEA OMR | model-driven, conservative | pull live |
| Geopolitics-first | Rapidan Energy | regime-change & escalation risk premium | pull live |
| Physical-flow realist | Energy Aspects + trading-desk commentary | what tankers/refiners actually do now | pull live |
| Macro-allocator | macro-allocator framework (institution, not a person) | reserves as macro/inflation regime signal | frame, don't quote (weakest-grounded lens — drop if tightening the panel) |

Rules:
- Anchor to institutions' *published* positions and incentives.
- Do NOT fabricate quotes, and do NOT attach a specific point forecast to a named living individual — cite "JPMorgan's June note", not "[analyst name] said $X".
- All numbers are pulled live at run time; none are embedded here.

---

## 5 — CALCULATION ENGINE

- **Stock basis (consistency rule #6):** report IEA total-stock coverage (public/strategic + industry/commercial) for EVERY country. Do not report SPR-only days for the US against total-stock days for Japan — that is apples-to-oranges. SPR-only is broken out separately in the key-indicators block, never substituted into the table's coverage column.
- **Denominator is fixed:** IEA days = stocks ÷ prior-year average daily net imports (D). Same D for both snapshots → before-vs-today moves with the stock numerator only. Keeps the comparison clean and the formula auditable.
- **Months = days ÷ 30.44** (live formula). Note: months is perfectly collinear with days (constant multiplier), so it adds presentation, not analysis; **Δ% is identical for days and months — compute it once, do not duplicate.**
- **Δ% = (today − before) ÷ before** (live formula).
- **Net-exporter convention (US, Netherlands, + Canada/Norway/Mexico if they appear):** they are IEA-exempt and "days of net-import cover" is ill-defined (as net imports → 0, the ratio explodes). Pick ONE convention and apply consistently: either (a) report strategic+commercial stock as days-vs-*gross* crude imports with a footnote, or (b) `-` with a note. Recommended: (a) for the US (keeps the row informative), footnoted.
- **Non-IEA Asia (Thailand, Philippines, Indonesia, Vietnam):** no comparable published days-of-cover. Use national fragments where they exist, tagged `Modelled-EST`, else `-`. Do not impute IEA-style figures onto non-members.
- **China:** outside IEA; figures are third-party estimates (EIA/STEO + Kpler/Vortexa). All China figures `Modelled-EST`.

---

## 6 — QUALITY GATES (hard stops)

### 6A — Confidence taxonomy (ONE ladder, used everywhere)
Every cell carries exactly one tag. This is the single vocabulary — §2, §5, §7 all map to it:

| Tag | Meaning | Bar |
|---|---|---|
| `Verified-official` | Tier-1 primary figure, as-of dated | one official source suffices if it is the authoritative publisher |
| `Inferred-triangulated` | agrees across ≥2 independent source classes | model may be ONE of the two |
| `Modelled-EST` | Tier-5 mass-balance estimate, work shown | single-class; never upgraded to Verified |
| `Absent (-)` | no qualifying figure exists | never guessed |

### 6B — Gates
1. **Frame gate (A-00):** spine corroborated ≥3 independent qualifying sources, or STOP.
2. **Source-verification gate (A-08):** no figure ships without a real, named, §−1-qualifying source and as-of date. Any unsourced number is deleted, not flagged-and-kept. *(Teeth only in Tier B/C — see §0.)*
3. **Confidence tagging:** every cell tagged per §6A; the tag is visible in the output.
4. **Red-team gate (A-09):** ≥5 substantive attacks on the table, the estimator (incl. its dimensional integrity and per-country calibration), and the synthesis; each must be answered. Cosmetic red-teaming fails. *(Teeth only in Tier B/C.)*
5. **Disagreement preservation:** where lenses or sources split, output states the split and the driver. Averaging is a defect.
6. **Hormuz freshness:** A-01 figure dated within the run window; the whole restocking section is conditional on it.

---

## 7 — OUTPUT CONTRACT

**(a) Reserve table** — one row per country, columns exactly:
`Country | Before (days) | Before (months) | Today (days) | Today (months) | Δ days | Δ % | Confidence | Source & Date`
Priority order: USA; Germany, France, UK, Italy, Spain, Netherlands, Poland; Japan, S. Korea, China, India, Thailand, Philippines, Indonesia, Vietnam. Months as live formula. `-` where absent. Confidence tag per §6A on every cell. Same stock basis (§5) on every row.

**(b) Key-indicators block:** Brent pre-war (eve-of-war, 27-Feb-2026) / peak / now; Hormuz flow mb/d pre-war vs now; US SPR fill % (and absolute); IEA total coordinated release (and US share) — **use the IEA's own headline figure**. Each with source + date.

**(c) Restocking assessment** — answer all four explicitly:
- a) How depleted are reserves now, ~4 months post-war start?
- b) From where can countries restock — Gulf-via-Hormuz vs Atlantic Basin / US shale / Russia / pipeline reroute?
- c) At what price vs. pre-war? **Reconcile baselines explicitly:** reserve-before = Dec 2025; price-before = eve-of-war 27-Feb-2026; the scope's "~$65" is a still-earlier late-2025 print — name all three, don't blend.
- d) Timeline — refill pace + when downstream feels the move, given the ~4-month price-transmission lag.

**(d) Total restocking-demand estimate:** released-stock refill + new capacity builds, NET of demand destruction. Show method and inputs.

**(e) Footnotes:** every limitation, every convention, every modelled figure's inputs, the tier the run executed in (and whether verification was independent or self-review). Days + months consistent throughout. Excel-compatible.

---

## 8 — KICKOFF BLOCK (paste to start)

```
Phase: -1
Mode: full-decomposition (OAS) | tier: B (Claude Code /agents or Workflow)
Project: Hormuz-2026 Crude Reserve & Restocking Intelligence
Goal: Before-vs-today coverage table (16 countries, days+months) + key indicators + restocking assessment + demand estimate, fully sourced and confidence-tagged.
Non-negotiables: frame-verify first; official≠estimate; tag every cell §6A; live formulas; same stock basis all rows; net-exporter convention §5; dimensionally-correct estimator §2 Tier 5; surface disagreement.
First action: Execute A-00 (Frame Verification) — corroborate the war/Hormuz/IEA spine across ≥3 independent qualifying sources, apply the exclusion + self-citation gate. If it fails, STOP.
Then: A-01 (Hormuz Status & Flow) as of run date; this gates the restocking section.
Quality: MAXIMUM. Run all gates §6. Red team is adversarial, not cosmetic.
Stop after: A-10 synthesis + table build. Present output contract §7.
```

---

## 9 — ILLUSTRATIVE APPENDIX (dated; RE-FETCH, do not anchor)

> Everything below is a point-in-time snapshot for orientation only. It decays fast — the Hormuz flow figure shifted materially inside a single week in June 2026. **Re-fetch every value at run time; never paste these into the deliverable.**

**As of ~24–26 June 2026 (illustrative, verify live):**
- War start: 28 Feb 2026 (US/Israel airstrikes on Iran). *Distinct from* Iran's declaration of the Strait "closed" ~4 March 2026 — keep the two dates separate.
- IEA coordinated release: **400 million barrels** (IEA's own headline figure), decided 11 March 2026 — the largest the IEA has ever coordinated. (The "426M" seen in some drafts traces to a secondary blog; do not use it.)
- Hormuz: contested-but-flowing and volatile. Flows ~4.8 mb/d after the US-Iran MOU vs. ~15 mb/d prewar; Iran re-declared closure ~20 June over the Lebanon ceasefire dispute; transit counts swung (e.g. ~35 vessels one day → ~12 the next). Trackers diverge sharply (AIS-off vessels hugging the Omani coast understate counts).
- Brent: ~$72 eve-of-war (27 Feb); peak ~$120 (early March); ~$74–75 late June. The scope's "~$65" is a late-2025 print, not the eve-of-war level.
- US SPR: ~411 MMbbl end-2025 → ~331 MMbbl mid-June 2026 (lowest since ~1983). NOTE: SPR is strategic-only; do not substitute into the total-stock coverage column (§5).
- Forecaster bench: live numbers move weekly — pull each institution's current published note at run time; do not reuse any embedded figure.

Source classes to re-pull from: IEA.org, EIA.gov, OPEC MOMR, JODI, and major wires (Reuters/Bloomberg/FT/CNBC/Al Jazeera/NPR) — each subject to the §−1 exclusion gate.

---

## 10 — CHANGELOG (corrections vs. original draft)

1. **Mass-balance estimator made dimensionally correct** (§2 Tier 5): integrate the daily imbalance over elapsed time, then normalize by the denominator; stop adding flows (mb/d) to stocks (mb). This was the make-or-break component and the original formula was unit-incoherent.
2. **Dependency graph fixed** (§3): A-04 (today) consumes A-01/A-02/A-03 and runs *after* them, not in parallel. Only the 16 country subagents within a phase fan out concurrently.
3. **Stock-basis consistency rule added** (§1 #6, §5): IEA total-stock basis for every row; US SPR-only never substituted into the coverage column.
4. **Triangulation × data-reality resolved** (§2): a Tier-5 model counts as at most one class; a `-`-heavy "today" column is the honest correct output.
5. **Tier-A self-review honesty clause** (§0, §3, §6B): A-08/A-09 have teeth only with context isolation (Tier B/C).
6. **Single confidence taxonomy** (§6A): one ladder mapped across §2/§5/§7; retired the three competing vocabularies.
7. **Temporal baselines pinned** (§7c): reserve-before = Dec 2025; price-before = 27-Feb-2026; scope's $65 = late-2025 — named, not blended.
8. **Lens panel de-risked** (§4): anchor to institutions' published notes; no point forecasts attached to named living individuals.
- Added Phase −1 Frame Verification + source-exclusion + self-citation guard (§−1).
- IEA release corrected to the official 400M (not 426M).
- Hormuz dates disambiguated (28 Feb airstrikes vs. ~4 March closure declaration).
- All hard numbers moved to dated illustrative appendix (§9); cost/time figures labelled as guesses.

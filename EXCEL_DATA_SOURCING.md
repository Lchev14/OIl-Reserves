# Sourcing the figures inside office Excel (M365 Copilot / Opus 4.8)

Companion to `EXCEL_BUILD_SPEC.md`. That file tells Copilot **how to build** the 9-sheet workbook. This file tells Copilot **how to fill it with attributable, refreshable figures** from your corporate laptop — getting you past the sandbox's network wall without scraping.

It is wired to the structural thesis behind this project — **reserve depletion → the race to rebuild → the bid to exceed the prior peak** — not just the Hormuz-2026 crisis window. Run the prompts in order; the first phase is pure diagnosis.

---

## 0 · The one thing to internalize first

In **M365 Copilot** (the pane with the model picker), **selecting Opus 4.8 does not change what data Copilot can reach.** The model swaps the reasoning engine; data reach is governed by a *different* layer — Microsoft's grounding/orchestration (Work IQ + the web toggle) and any tenant **connectors/agents** your admin provisioned. So:

- **Don't optimize the model selector for sourcing.** It's the wrong lever.
- The real levers, ranked by how much a manager can defend them:
  1. **Tenant connectors / licensed market-data agents** (Rystad, Wood Mac, S&P Global Platts, LSEG, FactSet, Enverus…) — *if your admin provisioned them*. Gold path: licensed, auditable, refreshable.
  2. **Power Query / official APIs, with Copilot authoring the M code** — runs on your corporate network, hits *official* sources, produces a refreshable, cited query. This is the deliverable a manager actually wants, and it needs **no connector**.
  3. **Web grounding** — Bing-grounded, answer-oriented. Fine to *spot-verify one figure*; useless to bulk-extract a 300-row table. Off unless the admin enabled it.

> Rule of thumb: **have Copilot build the pipe, not fetch the bucket once.** A query that refreshes beats a one-shot pull, even when the pull looks faster today.

---

## 1 · The data the thesis actually needs

Proved reserves are **not a fixed geological stock** — they are an economic-technical quantity that moves with price and technology. World proved reserves have *risen* across decades despite continuous production, via revisions, EOR, and shale. So "deplete → rebuild → exceed" is a claim about **two ratios**, driven by **two prices**:

| # | Metric | What it answers | Public-data formula | Primary source |
|---|---|---|---|---|
| 1 | **R/P ratio** (years) | The depletion clock | `Reserves_eoy / Production_annual` | EI Statistical Review; OPEC ASB; EIA Intl |
| 2 | **Reserve Replacement Ratio** (RRR, %) | The rebuild engine | `(ΔReserves + Production) / Production` | **Derivable** from #1 sources (see §3.5) |
| 3 | **Brent** (price driver) | Why RRR moves | series | EIA `RBRTE`; FRED `DCOILBRENTEU`; WB Pink Sheet |
| 4 | **Upstream capex** (investment driver) | The money behind the rebuild | annual | IEA World Energy Investment; Rystad (connector); BEA/FRED proxy |

**The load-bearing point for your manager:** your "*exceed the previous peak*" thesis is precisely the claim that **RRR stays > 100% long enough to clear the prior reserves high**. RRR < 100% sustained = structural depletion; > 100% = net rebuild. And — non-obvious — **RRR is computable from purely public data** (metric #1's year-over-year reserves plus production), so you can prove or kill the thesis *without any licensed connector*. The connectors buy you granularity (by basin, by company, forward capex), not the headline verdict.

---

## 2 · Phase 0 — Inventory what *this* Copilot can reach

Paste these one at a time into the Copilot pane. They are diagnostics; don't build on anything until they return.

**0.1 — Connectors / agents:**
```
List every external data source you can reach from this workbook right now:
(a) Copilot connectors or agents provisioned in my tenant, naming each provider;
(b) whether web search is enabled in my Sources menu;
(c) any finance or market-data connector specifically — Rystad, Wood Mackenzie,
    S&P Global / Platts, LSEG (Refinitiv), FactSet, Bloomberg, Enverus.
For each, state explicitly "available" or "not available". Do not guess; if you
cannot confirm one, say so.
```

**0.2 — Web grounding on/off:**
```
Open the Sources menu and tell me whether web grounding is ON or greyed out by
admin policy. If it is available, confirm you can return a figure with a source
URL and an as-of date. If it is unavailable in this tenant, say so plainly.
```

**0.3 — The lever test (settles the original question empirically):**
```
I will run the same Power Query request on Opus 4.8 and on the default model.
Before I do: do you have access to any data source the default model does not?
Answer yes/no and explain which layer (model vs grounding vs connector) controls
data reach in this tenant.
```

Outcome map:
- **0.1 returns a market-data connector** → you're in the gold tier; jump to §4 and mostly skip web search.
- **0.1 returns nothing, 0.2 says web is ON** → §3 (Power Query) is your spine, §5 (web) for spot-checks only.
- **0.2 says web is greyed out** → admin-disabled; **no model choice overrides it.** §3 is your *only* path. Build everything on Power Query.

---

## 3 · Phase 1 — Power Query pulls (the robust spine, no connector needed)

Each prompt asks Copilot to *author* the query against an **official** source. Store API keys in a **named cell** (`Formulas → Define Name`, e.g. `EIA_KEY`, `FRED_KEY`), never inline — so the workbook is shareable and the key is one cell to rotate.

### 3.1 — World Bank "Pink Sheet" (free, no key) — the price backbone
```
Write a Power Query (M) script that loads the World Bank Commodity Markets
"Pink Sheet" MONTHLY historical workbook (CMO-Historical-Data-Monthly.xlsx) from
the official World Bank Commodity Markets page into a sheet named "Px_WorldBank".
Pull the crude oil columns (Brent, WTI, Dubai). Type the date column as date and
prices as decimal. Set the query to refresh on open. If the download URL has
changed, fetch the current link from the World Bank Commodity Markets page first
and tell me the URL you used.
```

### 3.2 — FRED (free key) — daily Brent/WTI, cleanest JSON
```
Write a Power Query (M) script that calls the FRED API for series DCOILBRENTEU
(Brent) and DCOILWTICO (WTI), reading the API key from the named cell FRED_KEY,
into a sheet "Px_FRED". Parse the JSON observations array, type period as date and
value as decimal, drop "." missing markers, and refresh on open. Show me how to add
a third series by changing one parameter.
```
Reference shape of the call (Copilot should generate equivalent M):
`https://api.stlouisfed.org/fred/series/observations?series_id=DCOILBRENTEU&api_key=<FRED_KEY>&file_type=json`

### 3.3 — EIA API v2 (free key) — Brent spot + U.S. reserves
```
Write a Power Query (M) script using the EIA API v2, reading the key from named
cell EIA_KEY, into a sheet "EIA". Pull two datasets:
(1) Brent spot daily (petroleum/pri/spt, series RBRTE);
(2) U.S. crude oil proved reserves, annual.
Parse the JSON "response.data" array, type period and value, and refresh on open.
Tell me the exact endpoint URLs you built.
```
Reference shape: `https://api.eia.gov/v2/petroleum/pri/spt/data/?api_key=<EIA_KEY>&frequency=daily&data[0]=value&facets[series][]=RBRTE&sort[0][column]=period&sort[0][direction]=desc`

### 3.4 — Energy Institute Statistical Review (free xlsx) — the reserves + R/P backbone
```
Write a Power Query (M) script that loads the Energy Institute Statistical Review
of World Energy data workbook (formerly BP Statistical Review) from the official
energyinst.org page into a sheet "EI_Review". Import the "Oil - Proved reserves"
and "Oil - Production - barrels" tables, unpivot the year columns into a tidy
(Country, Year, Value) layout, type Year as whole number and Value as decimal,
and refresh on open. Fetch the current download link from the page and tell me
the URL you used.
```
This single source carries **proved reserves end-of-year, annual production, and a published R/P ratio** — i.e. metrics #1 and #2 in one workbook.

### 3.5 — Derive RRR and R/P in-grid (no external call — the thesis test)
After §3.4 lands, add the computed columns. Proved-reserves accounting:
`Reserves_eoy = Reserves_prev − Production + Additions` ⟹ `Additions = ΔReserves + Production`.

```
On the EI_Review data, add three calculated columns per Country, sorted by Year:
  R_P   = Reserves_eoy / Production_annual              (years; the depletion clock)
  Add   = (Reserves_eoy - Reserves_prev) + Production_annual   (gross additions)
  RRR   = Add / Production_annual                       (format %; >100% = net rebuild)
Use a live formula or a Power Query custom column referencing the prior year's
reserves (Reserves_prev) per Country. Then make a chart of global RRR over time
with a 100% reference line, and flag the first year (if any) where cumulative
additions since the prior peak exceed that peak — that is the "exceed previous
reserves" test.
```

---

## 4 · Phase 2 — Licensed connectors (only if Phase 0.1 found one)

If 0.1 returned Rystad / Wood Mac / S&P Platts / Enverus, these are the figures Power Query *can't* give you — forward capex, basin-level RRR, project sanctioning, decline rates.

```
Using the <PROVIDER> connector, return for the last 10 years, globally and for
the top 10 producing countries:
  - upstream exploration & production capex (USD bn, nominal);
  - conventional vs unconventional reserve additions;
  - organic reserve replacement ratio.
Write each figure into a sheet "Licensed_<PROVIDER>" with the provider name, the
exact dataset/field, and the as-of date in adjacent columns. Refuse to insert any
figure you cannot attribute to a specific provider dataset.
```

If multiple connectors exist, run the same prompt per provider into separate sheets and **let the divergence be your error bar** — never average two licensed sources into one cell silently.

---

## 5 · Phase 3 — Web grounding (spot-verification only)

Use this to confirm a single recent print, never to populate a table.
```
Using web search, return the single latest available monthly value for: Brent
crude, WTI, and global oil proved reserves (most recent annual estimate). For each,
give the source name, the source URL, and the as-of date in cells, and flag any you
could not verify. Do not fill more than these rows; if web search is unavailable,
say so.
```

---

## 6 · Provenance gate (run last, every time)

```
For every external figure now in this workbook, ensure an adjacent column holds:
source name, source URL or dataset id, and retrieval timestamp. Apply the project's
confidence ladder in a "Confidence" cell: Verified-official > Inferred-triangulated
> Modelled-EST > Absent ("-"). A connector or official API = Verified-official; a
web-search figure = at most Inferred-triangulated; a derived ratio inherits the
LOWEST class of its inputs. Refuse to leave any external figure unattributed.
```
This mirrors the ladder already used in `EXCEL_BUILD_SPEC.md` and the master prompt, so the sourcing sheet and the build sheet speak the same confidence language.

---

## 7 · The catches that will actually bite

- **Admin gating is the real gatekeeper, not the model.** Web grounding and connectors can be off by tenant policy; Opus 4.8 cannot override that. Phase 0 reveals it in ~30 seconds.
- **Corporate proxy / DLP** may block a target host even with internet present — Power Query and web search can fail silently or return partial data. If `From Web` errors, the host is likely blocked; that's an IT ticket, not a prompt problem.
- **Prompt injection:** Anthropic and Microsoft both warn to use these only with *trusted* spreadsheets. A downloaded vendor template or scraped page can carry hidden instructions. Keep the ingestion sheets clean; don't paste untrusted workbooks into the same file.
- **Reproducibility beats cleverness.** If the objective recurs (monthly refresh, a tracked KPI), the refreshable query/connector is worth more than a one-shot scrape — even if the scrape looks faster today.
- **Copilot is weaker at large grid manipulation** than deterministic Power Query. For heavy build-out, lean on PQ; reserve free-form Copilot writes for small blocks and the computed-column logic.
- **Data residency:** since May 2026, M365 Copilot may process Anthropic-model requests outside the EU Data Boundary. Note it if your manager cares about residency — it's a one-line caveat, not a blocker.

---

## 8 · Decision tree (what to do with your two figure types)

You said the figures are **public macro/commodity series** *or* **licensed market data**. Map:

- **Public macro/commodity** (reserves, production, Brent/WTI, R/P, derived RRR) → **§3 Power Query wins outright.** EI Statistical Review (§3.4) + World Bank/FRED/EIA prices (§3.1–3.3) + in-grid RRR/R-P (§3.5) gives the entire thesis test, attributable and refreshable, **with zero connectors.**
- **Licensed market data** (forward capex, basin RRR, decline curves) → **§4, but only if Phase 0.1 found the connector.** If it didn't, that granularity isn't reachable from this surface regardless of model — escalate to IT for the connector, or accept the public proxies (IEA WEI capex headline; BEA/FRED US mining-exploration investment) tagged one tier below licensed.

**Recommended sequence for the manager deliverable:** Phase 0 → §3.4 + §3.5 (the thesis verdict from public data) → §3.1–3.3 (price drivers) → §4 if connectors exist → §6 provenance gate. Web search (§5) stays a spot-check, never the spine.

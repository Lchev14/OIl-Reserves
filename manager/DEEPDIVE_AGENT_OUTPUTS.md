# Deep-Dive Workflow — 38-Agent Raw Outputs (salvaged)

*Distilled finals of every agent from run `wf_79741567-e1d` (`depletion-restock-deepdive`, 38 agents, ~1.19M tokens, 382 tool calls, ~23 min, run 28 Jun 2026). This is the per-agent evidence that fed `DEEP_SYNTHESIS.md`. Captured from the workflow run journal; some previews are truncated at the journal boundary — full JSONL transcripts live in the session's `subagents/workflows/wf_79741567-e1d` dir.*

> **Basis caveat (load-bearing):** the per-country depletion agents below used **mixed denominators** (net-import / consumption / demand) and were the *first-pass* gather. The isolated verify agent (#36) flagged this. Where these conflict with the **source-verified** values, the verified Eurostat `nrg_stk_oem` / IEA / EIA figures in `reserve_coverage.csv` and the workbook **supersede** these raw numbers. This file is provenance, not the authority.

---

## Phase 1 — Frame

**#1 `frame`** — *State of play + IEA 400 mb mechanics.* The 2026 Hormuz crisis began ~28 Feb (Iran halted ~1/5 of global oil flow); IEA's 6th-ever collective action. 11 Mar: Governing Board agreed **400 mb**; 19 Mar pledges summed ~426 mb (oversubscribed). Split ~301 crude / ~125 products; ~280 public + ~119 industry + ~28 production. Regional: Americas ~47%, Europe ~27%, Asia-Oceania ~25–27%. Executed << authorised. *(24.3k tok, 14 tools)*

## Phase 2 — Depletion (per-country forensics)

*Columns: today/before days-of-cover (agent basis), strategic stock mb, IEA-release contribution mb, confidence.*

| # | Country | Today / Before (d) | Basis | Strat. stock (mb) | IEA contrib (mb) | Conf |
|---|---|---|---|---|---|---|
| 2 | USA | 100 / 125 (derived) | net-import | 331.2 (SPR) | 172 | official |
| 3 | Germany | 83 / 93 | net-import | 177 | 19.5 | estimate |
| 4 | France | 84 / 95 | net-import | 120 | 14.5 | wire |
| 5 | UK | 42 / 51 | demand/consumption | industry-held | 14 | wire |
| 6 | Italy | 78 / 90 | net-import | 66 | 10 | estimate |
| 7 | Spain | 80 / 92 | consumption | 120 | 11.6 | official |
| 8 | Netherlands | 72 / 90 | consumption | 30 | — | wire |
| 9 | Poland | 79 / 90 | net-import | 63 | 7.5 | estimate |
| 10 | Japan | 214 / 254 | consumption | 263 | 80 | wire |
| 11 | South Korea | 199 / 208 | net-import | 77.6 | 22.46 | wire |
| 12 | China | 195 / 120 | net-import (import-collapse artifact; ~flat ~90d on consumption) | 360 strat | 0 | wire |
| 13 | India | 56 / 66 | net-import | 39 | 0 | wire |
| 14 | Thailand | 108 / — | demand (bundled) | 21.3 | 0 | wire |
| 15 | Philippines | 46.5 / 55 | demand | 0 (no SPR) | 0 | official |
| 16 | Indonesia | 22 / 23 | consumption | n/a | 0 | official |
| 17 | Vietnam | 9 / 9 | net-import (dedicated reserve) | 2.5 | 0 | estimate |

**Producers (#18–23):**

| # | Country | Shut-in (mb/d) | Storage util % | Floating (mb) |
|---|---|---|---|---|
| 18 | Saudi Arabia | 2.0 | 90 | 100 (Gulf aggr.) |
| 19 | UAE | 1.27 | — | — |
| 20 | Iran | 1.5 | 74 (Kharg) | 67 |
| 21 | Iraq | 3.4 | 100 | 20 |
| 22 | Kuwait | 1.9 | — | — |
| 23 | Qatar | 1.3 | 100 | 4 |

**#24 `aggregate`** — OECD total liquid-fuels forecast ~2.3 bn bbl end-2026 (lowest since 2003), ~0.5 bn below the 5-yr avg; days of forward cover ~50 (lowest since Jan 2003); global draw ~3.8 mb/d (crude ~2.4 + products ~1.4); OECD govt stocks lowest since Dec 1990.

## Phase 3 — Restock Race

**Refill need by buyer (#25–30):**

| # | Buyer | Refill need (mb) | Motive | When buying |
|---|---|---|---|---|
| 25 | US SPR refill | ~470 (to nameplate) / ~80 crisis | strategic + exchange-returns | paused (cash); returns Nov-26→Sep-28 |
| 26 | EU/IEA rebuild | 186 | legal (90-day) | multi-year, deferred to 2027 |
| 27 | Japan & Korea | 76 | legal + strategic | deferred / dip-buying |
| 28 | China opportunistic | 365 | opportunistic (not IEA-bound; already 110–180d cover) | waiting for lower price (Brent ≤ ~$70) |
| 29 | India SPR build-out | 63 | strategic (energy security) | opportunistic timing |
| 30 | Commercial/industry | 500 | operational + buy-the-dip | begins H2 2026 once curve permits |

**Themes (#31–35):**
- **#31 sourcing** — Atlantic Basin reroute **+3.5 mb/d** (biggest real source; Atlantic→Asia ~7 mb/d ≈ 30% of lost Gulf); bypass Yanbu ~4 / Fujairah ~1.5; **OPEC spare trapped behind the Strait** (not a source).
- **#32 price** — restocking is **second-order/latent**, not the prime mover; dominant driver is the war-supply shock (backwardation, freight/insurance wedge).
- **#33 demand** — **net restock ≈ +0.4 mb/d (range +0.2 to +0.6)**; most of the 2Q26 −5 mb/d y/y is **cyclical/temporary, not permanent** (the key divergence from the legacy briefing — see master note).
- **#34 timeline** — 3 conflated bottlenecks (≈4-mo price-transmission lag; no new bypass until 2027; SPR refill pace); realistic refill window **2027–2031**.
- **#35 forecasters** — Goldman bullish (≈900 mb deficit → structural floor); JPMorgan skeptical (rebuild not coming); Morgan Stanley surplus-led; Rystad self-limiting floor; Energy Aspects/Sen surge-on-resume; RBC/Croft China-leverage.

## Phase 4 — Verify (isolated)

- **#36 verify → `fix-required`** — flagged **denominator confusion** (net-import vs consumption vs demand mixed in one column) and restock double-counts. *(Addressed in synthesis; drove the later source-verification pass.)*
- **#37 redteam** — verdict: depletion numbers real, but the **"restock race" is a counterfactual, not an active bidding war** — 3 of 4 legs not firing (China drawing/absent; US "refill" is contractual exchange-returns + paused program capped ~3 mb/d; commercial blocked by backwardation).

## Phase 5 — Synthesis

- **#38 synthesis** → the full ~1,600-word deliverable in **`DEEP_SYNTHESIS.md`**.

---

*Provenance: 38 agents, 1,190,485 output tokens, 382 tool calls. Verify verdict `fix-required` and the red team's 8 attacks were folded into the synthesis. For full untruncated per-agent JSON, see the session transcript dir.*

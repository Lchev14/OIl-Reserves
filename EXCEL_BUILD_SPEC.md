# Build the Hormuz-2026 workbook natively in Excel (Copilot / Opus 4.8 spec)

This is a complete, self-contained spec to rebuild the 9-sheet workbook **from scratch inside Excel** — no file transfer. Paste the prompt below into Copilot in Excel, or follow the tables manually. All data is as-of **26 Jun 2026**; figures are wire-attributed where IEA/EIA portals were unreachable (re-check before financial decisions).

---

## ① Paste this into Copilot in Excel

> Build a workbook with 9 sheets named exactly: **READ ME, Consumer, Producer, Key Indicators, Ledger, Throughput, Trajectory, Scenarios, Footnotes**. Use the data and formulas in the spec I paste next. Rules: (1) keep every formula as a live formula, not a pasted value; (2) header row bold white text on dark navy (#0B1F2A) fill, frozen; (3) thin light borders on data cells; (4) number formats as specified; (5) where a cell shows "-", enter the text "-". After building, confirm the formulas calculate (e.g. Consumer C2 should show ~3.3). Then paste each sheet section below.

Then paste the sheet sections (②–➓) one at a time.

---

## ② Sheet: READ ME  (one column, width ~140)

Put this title in A1 (bold, 14pt): **Hormuz 2026 — Crude Reserve, Redistribution & Restocking Intelligence**

Then these lines down column A (bold the THESIS, LIVE FORMULAS and CAVEAT lines; colour the THESIS/CAVEAT red #9E2B25):
```
As-of: 26 Jun 2026 | War start 28 Feb 2026 | Window T = 118 days | Brent $74.43 | Hormuz ~4.8 mb/d

THESIS VERDICT: the "reserves are conserved, just redistributed producer-side" hypothesis is REFUTED (strong form).
  rho = producer build / consumer draw = 120 / 615 = 0.195  (band 0.15-0.26; an order of magnitude below conservation = 1.0).
  Mechanism: Gulf tankage saturated in ~1-2 weeks, so blocked output was SHUT IN at the wellhead (~700-1,080 mb), not stockpiled.

LIVE FORMULAS: every computed cell is a real formula. Edit a "days" value and months/deltas/at-risk/rho recompute.
  Months = days/30.44 | Delta days = Today-Before | Delta % = (Today-Before)/Before
  Eff. at-risk cover = Today x (1 - Hormuz-dependence)  [worst-case zero-replacement BOUND, not a coverage estimate]
  rho (Ledger) = Producer build / Consumer draw

CONFIDENCE LADDER: Verified-official > Inferred-triangulated > Modelled-EST > Absent("-"). A model is at most ONE source class.

CAVEAT: primary IEA/EIA portals were unreachable at compile time, so many cells are WIRE-ATTRIBUTED (one tier below Verified). Re-pull IEA/EIA before manager use.
```

---

## ③ Sheet: Consumer

Headers (row 1): **A** Country · **B** Before (days) · **C** Before (months) · **D** Today (days) · **E** Today (months) · **F** Δ days · **G** Δ % · **H** Hormuz-dep % · **I** Eff. at-risk cover · **J** Confidence · **K** Source & Date

**Formulas** (row 2, fill down; where B or D is "-", put "-" in the dependent cells instead):
- C2 `=B2/30.44`  (format 0.0)
- E2 `=D2/30.44`  (0.0)
- F2 `=D2-B2`  (0.0)
- G2 `=(D2-B2)/B2`  (format 0.0%)
- I2 `=D2*(1-H2)`  (0.0)
- H column format 0% ; H values are decimals (0.90 = 90%)

**Data** (A,B,D,H,J,K — leave C,E,F,G,I as formulas; "-" where shown):

| Country | Before | Today | Hormuz-dep | Confidence | Source & Date |
|---|---|---|---|---|---|
| USA | - | - | 0.08 | Absent | EIA WPSR / IEA OMR May-26; net-exporter, metric undefined |
| Germany | - | 99.1 | 0.05 | Modelled-EST | BMWE/EBV + IEA, 11 Mar 26 (before=110 imputed) |
| France | 98 | 98 | 0.11 | Inferred-triangulated | IEA/Euronews/Eurostat, Apr 26 |
| UK | 104 | 90 | 0.07 | Inferred-triangulated | GOV.UK/IEA/Al Jazeera, Mar 26 |
| Italy | - | 90 | 0.18 | Inferred-triangulated | IEA Italy Oil Security / EU Dir 2009/119 |
| Spain | 120 | 91 | 0.06 | Modelled-EST | CORES/IEA/Al Jazeera, Mar 26 |
| Netherlands | - | - | 0.06 | Absent | IEA/COVA; net-exporter, metric undefined |
| Poland | - | 86.5 | 0.13 | Modelled-EST | IEA Poland Oil Security + model |
| Japan | 200 | 205 | 0.90 | Inferred-triangulated | S&P/METI-ANRE, 9 May 26 |
| South Korea | 208 | 205 | 0.90 | Inferred-triangulated | IEA tool/CSIS/Sedaily, May 26 |
| China | 122.5 | 130 | 0.46 | Inferred-triangulated | Reuters-Kemp/EIA, 2026 |
| India | 74 | 76 | 0.30 | Inferred-triangulated | Min. Puri 76-80d, 8 Jun 26 |
| Thailand | - | 117 | 0.55 | Inferred-triangulated | Thai Energy Ministry, 12 May 26 (on-ground ~56d) |
| Philippines | - | 46.47 | 0.95 | Inferred-triangulated | PH DOE OIMB weekly, 12 Jun 26 |
| Indonesia | - | 21 | 0.20 | Inferred-triangulated | Jakarta Globe/ESDM, Jun 26 (capacity-capped ~25d) |
| Vietnam | - | 40.3 | 0.88 | Inferred-triangulated | VietnamNet D-basis, May 26 (model ~16d; divergence kept) |

Optional: colour the Confidence cell — Verified-official green (#D6F0E0), Inferred-triangulated amber (#FBEED2), Modelled-EST orange (#F6D9C7), Absent grey (#E6EAED).

---

## ④ Sheet: Producer

Headers: **A** Country · **B** Export-cover days (deployable) · **C** Export-cover days (total) · **D** Usable in-Hormuz (mb) · **E** Usable out-Hormuz (mb) · **F** Usable abroad (mb) · **G** Storage-util % · **H** Bypass-adj export (mb/d) · **I** Shut-in (mb/d) · **J** Confidence · **K** Source & Date  (G format 0%)

| Country | Deployable | Total | in-Hormuz | out-Hormuz | abroad | Util | Bypass | Shut-in | Confidence | Source |
|---|---|---|---|---|---|---|---|---|---|---|
| Saudi Arabia | 7.7 | 31.9 | 150 | 30 | 18 | 0.92 | 4.5 | 2.3 | Inferred-triangulated | Argus/Bloomberg/Kayrros, Mar-Jun 26 |
| UAE | 9 | 14 | 0 | 42 | 6 | 0.90 | 1.8 | 1.4 | Inferred-triangulated | IEA OMR via The National, 24 Jun 26 |
| Iran | 6 | 57 | 106 | 0 | 0 | 0.91 | 0.1 | 1.45 | Inferred-triangulated | Kpler/Al Jazeera, Jun 26 |
| Iraq | 0.3 | 4.7 | 17 | 1 | 0 | 0.95 | 0.3 | 1.5 | Inferred-triangulated | Bloomberg/IEA OMR Apr/Basra Oil Co |
| Kuwait | 4.2 | 16 | 21 | 0 | 7.5 | 0.90 | 0 | 2.0 | Inferred-triangulated | Bloomberg/Zawya/The National |
| Qatar | 0 | 10.5 | 10 | 0 | 0 | 0.92 | 0 | 0.95 | Modelled-EST | EIA Qatar brief + OilPrice (downgraded) |

---

## ⑤ Sheet: Key Indicators

Headers: **A** Indicator · **B** Prewar / Before · **C** Peak · **D** Now (26 Jun) · **E** Note  (all text)

| Indicator | Prewar / Before | Peak | Now (26 Jun) | Note |
|---|---|---|---|---|
| Brent ($/bbl) | $72 (27 Feb); $65 late-25 anchor | ~$120 | $74.43 | EIA RBRTE + Trading Economics |
| US SPR (mb) | 411 (31 Dec 25) | - | 331 (19 Jun) | 46.4% of ~714 nameplate; lowest since 1983 |
| IEA collective release (mb) | - | - | 400 (US share 172) | decided 11 Mar; ~186 executed by 19 Jun |
| VLCC ($/day MEG-China) | ~$55k | ~$423-470k | ~$179,600 | still >3x prewar |
| War-risk hull premium | 0.10-0.25% | 2.5-5% | 0.3-0.5% | eased post-ceasefire; reversible |
| Hormuz flow (mb/d) | ~15 | - | 4.8 | contested-but-flowing; 32% of prewar |

---

## ⑥ Sheet: Ledger  (A width 42, B 12, C 52)

A1 (bold 14pt): **GLOBAL REDISTRIBUTION LEDGER — thesis test (all mb, window T=118d)**
Row 3 headers: A3 `Leg` · B3 `mb` · C3 `Note`

| Leg (A) | mb (B) | Note (C) |
|---|---|---|
| Consumer / strategic stock draw | 615 | incl ~80 SPR + ~106 other-IEA strategic releases |
| Demand destruction | 472 | 2Q26 deliveries -5 mb/d y/y (IEA OMR Jun) |
| Atlantic substitution (in) | 410 | rerouted East-of-Suez |
| Producer build (stranded) | 120 | floating ~100 + onshore ~20 |
| Foregone output (shut-in) | 775 | time-weighted ~700-850 (flat-rate point ~1,080) |

(These occupy rows 4–8: B4=615, B5=472, B6=410, B7=120, B8=775.)

Then **live formulas**:
- A10 `rho = Producer build / Consumer draw`  · **B10 `=B7/B4`** (format 0.000; should show 0.195) · C10 `REFUTED if << 1 (conservation threshold = 1.0)`
- A11 `War supply gap (mb)` · B11 `1200`
- A12 `Canonical observed net draw (mb)` · B12 `495`
- A13 `Identity: Demand-destruction + observed draw + Atlantic` · **B13 `=B5+B12+B6`** (shows 1377)
- A14 `Reconciliation residual (gap - identity)` · **B14 `=B11-B13`** (shows -177) · C14 `~ -177 mb (~15%) = the 615-vs-495 error bar`

---

## ⑦ Sheet: Throughput  (A width 34, B 8, C 52)

Headers: A `Quantity` · B `mb/d` · C `Note`

| Quantity | mb/d | Note |
|---|---|---|
| Hormuz normal crude exit | 15 | prewar baseline |
| Bypass ceiling | 6.5 | port-gated, not pipeline-gated |
| &nbsp;&nbsp;Yanbu / Petroline (Red Sea) | 4.0 | ~70% of all bypass; port-limited |
| &nbsp;&nbsp;Fujairah / ADCOP (Gulf of Oman) | 1.5 | true bypass; terminal at strait mouth |
| &nbsp;&nbsp;Kirkuk-Ceyhan (Med) | 0.2 | north-only; near-zero true relief |
| &nbsp;&nbsp;Goreh-Jask | 0.0 | idle since 2024 |
| Hormuz actual flow (now) | 4.8 | contested-but-flowing |
| Stranded (end-state) | 4.5 | = 15 - bypass 5.7 - Hormuz 4.8 |

---

## ⑧ Sheet: Trajectory  (A 10, B 16, C 13, D 42)

Headers: A `Week of` · B `OECD stock (mb)` · C `US SPR (mb)` · D `Marker`

| Week of | OECD stock | US SPR | Marker |
|---|---|---|---|
| 27 Feb | 4100 | 411 | Eve of war |
| 13 Mar | 4064 | 411 | IEA 400 mb release decided |
| 03 Apr | 4000 | 400.9 | Global Apr draw -74 mb |
| 08 May | 3825 | 384.1 | Record weekly SPR draw 8.6 mb |
| 15 May | 3787 | 374.2 | All-time record weekly draw 9.92 mb |
| 29 May | 3711 | 357.1 | OECD govt stocks lowest since Dec 1990 |
| 19 Jun | 3598 | 331.2 | Lowest since 1983; ~46% of action drawn |
| 26 Jun | 3560 | 331.2 | As-of; no build week yet |

Then: select A1:C9 → **Insert → Line chart** → title "Reserves still falling — no turn yet"; put US SPR on a **secondary axis** (it's a smaller scale). Add a note below: *"Inflection: NOT yet turned — both series fall every print through 26 Jun."*

---

## ⑨ Sheet: Scenarios  (A 18, B/C/D 36)

Headers: A (blank) · B `S1 — Reopen-fast` · C `S2 — Contested-grinding (base)` · D `S3 — Reclose-hard`. Bold column A labels.

| | S1 — Reopen-fast | S2 — Contested-grinding | S3 — Reclose-hard |
|---|---|---|---|
| Trigger | Ceasefire converts to settlement; IRGC lifts closure | Ceasefire holds, doesn't convert; flow ~4.8 reversible | Ceasefire collapses; physical enforcement / mining |
| Reserves | Draw stops then reverses; SPR slow refill | Slow continued draw; SPR 1.29→0.72 mb/d; rho ~0.20 | Draw re-accelerates; Gulf re-strands; rho still <<1 |
| Brent | $60-68 | $70-85 range, headline spikes decay | Re-rate toward/above $120 |
| Restock | Multi-quarter, bypass-gated; SPR ~3-4 yr | No restock - net draw continues | Indefinitely deferred; none in 2026 |
| Reserve hard clock | n/a - draw halts | ~150 mb floor ~Nov 26 at acute rate | US SPR→150 mb ~5 Nov 26; OECD action ~11 Nov 26 |

---

## ➓ Sheet: Footnotes  (A width 150)

A1 (bold 14pt): **FOOTNOTES & LIMITATIONS**, then down column A (colour the VERIFICATION line red):
```
rho = producer build / consumer draw = 120/615 = 0.195. Verdict insensitive: rho<0.3 across plausible range.
Eff. at-risk cover = days x (1 - Hormuz-dep) is a WORST-CASE zero-replacement BOUND, not a coverage estimate.
   Japan/Korea 20.5 and Philippines 2.3 are scare-bounds; realistic effective cover is materially higher for diversifiers.
Net-exporters (USA, Netherlands) carry "-" on IEA net-import basis. USA alt: SPR ~63d, crude ~129d, total ~259d vs gross imports.
Vietnam: published 40.3d (D-basis) diverges >15% from model (~16d). Both kept; headline=higher tier; not averaged.
Thailand 117 bundles strategic+commercial+in-transit+contracted; hard on-ground ~56d. Indonesia capacity-capped ~25d.
Qatar producer block downgraded Inferred->Modelled-EST (self-disclosed tankage + Wikipedia spec).
Ledger: original decomposition double-counted; corrected to single identity; residual -177 mb (~15%).
Foregone output: flat 9.2 mb/d x118d = 1,080 mb indefensible vs flow data; time-weighted ~700-850 mb. REFUTED survives.
VERIFICATION NOT fully independent: IEA OMR / EIA weekly hosts were proxy-blocked; anchors WIRE-ATTRIBUTED (one tier below Verified).
Isolated red team raised 10 substantive attacks; all addressed in-run. Verify verdict: ship.

Provenance: workflow run wf_9642a98b-45e, 52 agents, ~1.9M tokens, as-of 26 Jun 2026.
```

---

## Verify the build
- Consumer C3 (France months) ≈ **3.22**; G4 (UK Δ%) ≈ **-13.5%**; I10 (Japan at-risk) ≈ **20.5**.
- Ledger B10 (rho) = **0.195**; B14 (residual) = **-177**.
- Trajectory chart shows two downward lines (no upturn).
If those match, the workbook is correct and identical to the generated version — just built natively, so no transfer/corruption issue.

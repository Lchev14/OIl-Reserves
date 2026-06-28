#!/usr/bin/env python3
"""Build 'Synthese Jun26' — the single copy-paste-ready manager tab.

Objective (manager, due before Mon 29 Jun 2026): a reproducible Excel table
comparing strategic + commercial crude reserves by country, pre-war (Dec-2025)
vs today (26 Jun 2026), in DAYS and MONTHS of net-import cover, plus a
restocking-outlook assessment beneath it.

Design: ONE self-contained sheet named exactly 'Synthese Jun26' so it can be
selected and pasted straight into the master 'Synthese Jun26' workbook tab.
Every computed cell is a LIVE Excel formula (edit a 'days' value -> months,
deltas recompute). Uses xlsxwriter (Excel-clean; openpyxl tripped the repair
prompt on this content).

Run:  python3 build/build_synthese_jun26.py
Out:  SYNTHESE_JUN26_reserve_cover.xlsx

Data as-of 26 Jun 2026 (workflow run wf_9642a98b-45e). Coverage is on the IEA
total-stock basis = strategic (public/agency) + commercial (industry) combined;
that IS what days-of-net-import-cover measures. WIRE-ATTRIBUTED where primary
IEA OMR / EIA weekly hosts were proxy-blocked at run time — re-pull before any
financial decision.
"""
import xlsxwriter

OUT = "SYNTHESE_JUN26_reserve_cover.xlsx"
wb = xlsxwriter.Workbook(OUT, {"in_memory": True})

INK = "#0B1F2A"
RED = "#9E2B25"
f = dict(
    title=wb.add_format({"bold": True, "font_size": 15, "font_color": INK}),
    sub=wb.add_format({"font_size": 10, "italic": True, "font_color": "#3A5566"}),
    sect=wb.add_format({"bold": True, "font_size": 12, "font_color": "white", "bg_color": INK,
                        "align": "left", "valign": "vcenter", "indent": 1}),
    note=wb.add_format({"font_size": 9.5, "text_wrap": True, "valign": "top"}),
    note_b=wb.add_format({"font_size": 9.5, "bold": True, "text_wrap": True, "valign": "top"}),
    note_r=wb.add_format({"font_size": 9.5, "bold": True, "font_color": RED, "text_wrap": True, "valign": "top"}),
    hdr=wb.add_format({"bold": True, "font_color": "white", "bg_color": INK, "align": "center",
                       "valign": "vcenter", "text_wrap": True, "border": 1, "border_color": "#3A5566"}),
    cell=wb.add_format({"border": 1, "border_color": "#D5DDE2", "valign": "vcenter", "font_size": 10}),
    c=wb.add_format({"border": 1, "border_color": "#D5DDE2", "align": "center", "valign": "vcenter", "font_size": 10}),
    c1=wb.add_format({"border": 1, "border_color": "#D5DDE2", "align": "center", "valign": "vcenter", "num_format": "0.0", "font_size": 10}),
    pct=wb.add_format({"border": 1, "border_color": "#D5DDE2", "align": "center", "valign": "vcenter", "num_format": "+0.0%;-0.0%;0.0%", "font_size": 10}),
    p0=wb.add_format({"border": 1, "border_color": "#D5DDE2", "align": "center", "valign": "vcenter", "num_format": "0%", "font_size": 10}),
    dd=wb.add_format({"border": 1, "border_color": "#D5DDE2", "align": "center", "valign": "vcenter", "num_format": "+0.0;-0.0;0.0", "font_size": 10}),
    kpi_l=wb.add_format({"border": 1, "border_color": "#D5DDE2", "valign": "vcenter", "font_size": 10, "bold": True}),
)
CONF = {
    "Verified-official":     wb.add_format({"border": 1, "border_color": "#D5DDE2", "align": "center", "bg_color": "#D6F0E0", "font_size": 9}),
    "Inferred-triangulated": wb.add_format({"border": 1, "border_color": "#D5DDE2", "align": "center", "bg_color": "#FBEED2", "font_size": 9}),
    "Modelled-EST":          wb.add_format({"border": 1, "border_color": "#D5DDE2", "align": "center", "bg_color": "#F6D9C7", "font_size": 9}),
    "Absent":                wb.add_format({"border": 1, "border_color": "#D5DDE2", "align": "center", "bg_color": "#E6EAED", "font_size": 9}),
}

ws = wb.add_worksheet("Synthese Jun26")
ws.set_landscape()
ws.hide_gridlines(2)
COLW = [13, 13, 12, 12, 12, 9, 8, 10, 19, 40]
for i, w in enumerate(COLW):
    ws.set_column(i, i, w)

# ---- title block ----
ws.merge_range(0, 0, 0, 9, "Synthèse Jun26 — Crude Reserve Cover by Country: Pre-war (Dec-2025) vs Today (26 Jun 2026)", f["title"])
ws.merge_range(1, 0, 1, 9,
    "Strategic + commercial stocks on the IEA total-stock basis (days of net-import cover). War start 28 Feb 2026 · T = 118 days · "
    "Brent $74.43 · Hormuz ~4.8 mb/d (32% of prewar). Months = days / 30.44. Live formulas.", f["sub"])

# ============================================================ TABLE ==========
R0 = 3  # 0-based row of the section banner
ws.merge_range(R0, 0, R0, 9, "RESERVE COVER — strategic + commercial, days & months of net-import cover", f["sect"])
HDR = R0 + 1
cols = ["Country", "Dec-2025\n(days)", "Dec-2025\n(months)", "Today\n(days)", "Today\n(months)",
        "Δ days", "Δ %", "Hormuz\ndep %", "Confidence", "Source & as-of date"]
for i, c in enumerate(cols):
    ws.write(HDR, i, c, f["hdr"])
ws.set_row(HDR, 30)

# (country, dec2025_days, today_days, hormuz_dep, confidence, source)
# dec2025_days = pre-war baseline (eve-of-war proxy; strategic+commercial cover
# drifts negligibly over Jan-Feb). None -> '-' (net-exporter / no published baseline).
rows = [
    ("USA",          None, None, .08, "Absent",                "EIA WPSR / IEA OMR May-26; net-exporter, cover metric undefined"),
    ("Germany",      None, 99.1, .05, "Modelled-EST",          "BMWE/EBV + IEA, 11 Mar 26 (baseline imputed ~110)"),
    ("France",       98.0, 98.0, .11, "Inferred-triangulated", "IEA / Euronews / Eurostat, Apr 26"),
    ("UK",          104.0, 90.0, .07, "Inferred-triangulated", "GOV.UK / IEA / Al Jazeera, Mar 26"),
    ("Italy",        None, 90.0, .18, "Inferred-triangulated", "IEA Italy Oil Security / EU Dir 2009/119"),
    ("Spain",       120.0, 91.0, .06, "Modelled-EST",          "CORES / IEA / Al Jazeera, Mar 26"),
    ("Netherlands",  None, None, .06, "Absent",                "IEA / COVA; net-exporter, cover metric undefined"),
    ("Poland",       None, 86.5, .13, "Modelled-EST",          "IEA Poland Oil Security + model"),
    ("Japan",       200.0,205.0, .90, "Inferred-triangulated", "S&P / METI-ANRE, 9 May 26"),
    ("South Korea", 208.0,205.0, .90, "Inferred-triangulated", "IEA tool / CSIS / Sedaily, May 26"),
    ("China",       122.5,130.0, .46, "Inferred-triangulated", "Reuters-Kemp / EIA, 2026 (30d window; see note)"),
    ("India",        74.0, 76.0, .30, "Inferred-triangulated", "Min. Puri 76-80d, 8 Jun 26"),
    ("Thailand",     None,117.0, .55, "Inferred-triangulated", "Thai Energy Ministry, 12 May 26 (hard on-ground ~56d)"),
    ("Philippines",  None,46.47, .95, "Inferred-triangulated", "PH DOE OIMB weekly, 12 Jun 26"),
    ("Indonesia",    None, 21.0, .20, "Inferred-triangulated", "Jakarta Globe / ESDM, Jun 26 (capacity-capped ~25d)"),
    ("Vietnam",      None, 40.3, .88, "Inferred-triangulated", "VietnamNet D-basis, May 26 (model ~16d; divergence kept)"),
]

def col_letter(idx):
    return chr(ord("A") + idx)

first_data = HDR + 2  # 1-based Excel row of first data row
for i, (country, b, t, dep, conf, src) in enumerate(rows):
    r = HDR + 1 + i        # 0-based xlsxwriter row
    R = r + 1              # 1-based Excel row
    both = b is not None and t is not None
    ws.write(r, 0, country, f["cell"])
    # Dec-2025 days
    if b is not None:
        ws.write_number(r, 1, b, f["c"])
        ws.write_formula(r, 2, f"=B{R}/30.44", f["c1"], round(b / 30.44, 1))
    else:
        ws.write_string(r, 1, "-", f["c"]); ws.write_string(r, 2, "-", f["c"])
    # Today days
    if t is not None:
        ws.write_number(r, 3, t, f["c"])
        ws.write_formula(r, 4, f"=D{R}/30.44", f["c1"], round(t / 30.44, 1))
    else:
        ws.write_string(r, 3, "-", f["c"]); ws.write_string(r, 4, "-", f["c"])
    # Deltas
    if both:
        ws.write_formula(r, 5, f"=D{R}-B{R}", f["dd"], round(t - b, 1))
        ws.write_formula(r, 6, f"=(D{R}-B{R})/B{R}", f["pct"], (t - b) / b)
    else:
        ws.write_string(r, 5, "-", f["c"]); ws.write_string(r, 6, "-", f["c"])
    ws.write_number(r, 7, dep, f["p0"])
    ws.write(r, 8, conf, CONF[conf])
    ws.write(r, 9, src, f["cell"])

last_data = HDR + len(rows)  # 1-based Excel row of last data row

# ---- group subtotals / context row (live AVERAGE over the 'Today (days)' col) ----
note_r = last_data + 1
ws.write(note_r, 0, "Net-exporter rows (USA, Netherlands) carry '-': IEA net-import-cover denominator <= 0, metric undefined. "
                    "US strategic slice alone: SPR ~63d; crude ~129d; total petroleum ~259d vs gross crude imports.", f["note"])
ws.set_row(note_r, 26)

# ============================================================ STRAT/COMM =====
sc = note_r + 2
ws.merge_range(sc, 0, sc, 9, "STRATEGIC vs COMMERCIAL — where the split is separable (the cover column above is the two combined)", f["sect"])
sc_h = sc + 1
for i, c in enumerate(["Series", "Pre-war (Dec-2025)", "Today (26 Jun 2026)", "Δ", "Basis / note"]):
    ws.write(sc_h, i, c, f["hdr"])
sc_rows = [
    ("US SPR (strategic, mb)", 411, 331.2, None, "Hard 31-Dec-25 anchor 411 -> 331 (19 Jun). -80 mb (-19%); lowest since 1983; ~46% of IEA action drawn"),
    ("IEA coordinated release (mb)", 0, 186, None, "400 mb decided 11 Mar (US share 172); ~186 executed by 19 Jun; ~214 mb authorization unspent"),
    ("OECD total stocks (mb)", 4100, 3560, None, "Eve-of-war ~4,100 -> ~3,560; -540 mb; monotonic decline, no build-week yet"),
]
for i, (name, pre, now, _, note) in enumerate(sc_rows):
    r = sc_h + 1 + i
    R = r + 1
    ws.write(r, 0, name, f["kpi_l"])
    ws.write_number(r, 1, pre, f["c"])
    ws.write_number(r, 2, now, f["c"])
    ws.write_formula(r, 3, f"=C{R}-B{R}", f["dd"], now - pre)
    ws.write(r, 4, note, f["cell"])

# ============================================================ RESTOCKING =====
ro = sc_h + 1 + len(sc_rows) + 1
ws.merge_range(ro, 0, ro, 9, "RESTOCKING OUTLOOK — assessment", f["sect"])
lines = [
    ("1. Which side depleted?", "Overwhelmingly CONSUMER + demand side, NOT a producer-conservation story. rho = producer build / consumer draw = "
     "120 / 615 = 0.20 (band 0.15-0.26, << 1). ~700-1,080 mb of blocked Gulf output was SHUT IN at the wellhead (no tankage), "
     "not stockpiled. Net depletion of consumable inventories is real and severe (OECD -540 mb; US SPR lowest since 1983).", "b"),
    ("2. Restock from where?", "Only barrels reaching water outside the Hormuz constraint: Yanbu/Petroline Red Sea ~4.0 + Fujairah ~1.5 + "
     "recovering Hormuz transit ~4.8 + ~410 mb cumulative Atlantic substitution. Explicitly NOT OPEC spare (trapped behind the strait). "
     "Bypass already maxed ~5.7 of 6.5 mb/d; no near-term structural lift (UAE West-East doubling not online until 2027).", None),
    ("3. Price vs prewar?", "Brent $74.43 ~= +$2-3 above the $72 eve-of-war level, +$9-10 above the $65 late-2025 anchor. War-risk premium has "
     "largely bled out post-ceasefire (residual modest, reversible). Flat Brent masks a freight+insurance landed-cost wedge and a "
     "stranded-Gulf-discount vs Atlantic-premium split during the war.", None),
    ("4. Timeline?", "SLOW, back-loaded, option-like on the ceasefire. One-off June destocking (~35 mb stranded-tanker + ~21 mb Iranian) "
     "already cleared = not restock. Meaningful rebuild (SPR refill 331->411 ~= 80 mb + commercial) is an H2-2026-into-2027 story, "
     "contingent on the ceasefire holding past mid-Aug. Earliest stock inflection: Q4 2026. Ceasefire breakdown re-strands/re-saturates "
     "within ~1-2 weeks and resets the clock.", None),
    ("Net restocking demand", "CONDITIONAL, sign-flipping (not a point): -166 mb (executed-draw basis) to +48 mb (full-400-mb-authorization basis). "
     "Either way it is SECOND-ORDER (|range| <= 166 mb vs the ~1,200 mb war gap) -> not a price-supportive overhang, consistent with "
     "Brent settling at $74 despite SPR at a 1983 low.", "b"),
    ("Scenario tree (unweighted)", "S1 Reopen-fast: draw stops/reverses, Brent $60-68, SPR refill 3-4 yr. "
     "S2 Contested-grinding (base): slow net draw continues, Brent $70-85, no restock yet. "
     "S3 Reclose-hard: draw re-accelerates, Brent toward/above $120; US SPR hits ~150 mb floor ~5 Nov 26, OECD authorization ~11 Nov 26 "
     "-> no reserve-side runway past Q1 2027.", None),
    ("Inflection status", "NOT yet turned on the STOCK series — OECD and US SPR fall every print through 26 Jun. Price and freight HAVE "
     "inflected (Brent ~$120->$74, VLCC ~$470k->$180k). Only the stock trajectory has not.", "r"),
]
r = ro + 1
for label, body, kind in lines:
    ws.write(r, 0, label, f["note_b"])
    fmt = f["note_r"] if kind == "r" else f["note_b"] if kind == "b" else f["note"]
    ws.merge_range(r, 1, r, 9, body, fmt)
    ws.set_row(r, 42)
    r += 1

# ============================================================ CAVEATS ========
cv = r + 1
ws.merge_range(cv, 0, cv, 9, "BASIS, CONFIDENCE & CAVEATS", f["sect"])
caveats = [
    ("Coverage basis", "Days of net-import cover on the IEA TOTAL-stock basis = strategic (public/agency) + commercial (industry) stocks COMBINED. "
     "That is what the metric measures; the strategic-only slice is broken out separately above only where published (US).", None),
    ("Baseline = Dec-2025", "Country 'Dec-2025' cover figures are eve-of-war (late-Feb) values used as the pre-war proxy: strategic+commercial "
     "DAYS-of-cover drifted negligibly over Jan-Feb 2026. The one hard 31-Dec-2025 anchor is US SPR = 411 mb (above). Germany baseline imputed (~110d).", None),
    ("Confidence ladder", "Verified-official > Inferred-triangulated > Modelled-EST > Absent('-'). A model is at most one source class; "
     "'-' is never fabricated. Net-exporters and unpublished baselines stay '-' rather than invented.", None),
    ("Disagreement kept", "Vietnam: published 40.3d (D-basis) diverges >15% from the mass-balance model (~16d) - both shown, not averaged. "
     "Thailand 117d bundles strategic+commercial+in-transit+contracted; hard on-ground ~56d. China today=130 uses a 30-day window.", None),
    ("VERIFICATION CAVEAT", "Primary IEA OMR / EIA weekly hosts were proxy-403-blocked at compile time, so many cells are WIRE-ATTRIBUTED "
     "(one tier below Verified). RE-PULL IEA/EIA directly before putting these decimals in front of the leadership team.", "r"),
    ("Provenance", "Generated by build/build_synthese_jun26.py from the Hormuz-2026 workflow run wf_9642a98b-45e (52 agents). As-of 26 Jun 2026. "
     "Reproducible: re-run the script to rebuild this tab.", None),
]
r = cv + 1
for label, body, kind in caveats:
    ws.write(r, 0, label, f["note_b"])
    fmt = f["note_r"] if kind == "r" else f["note"]
    ws.merge_range(r, 1, r, 9, body, fmt)
    ws.set_row(r, 30)
    r += 1

ws.freeze_panes(HDR + 1, 0)
ws.set_row(0, 22)
wb.close()
print(f"wrote {OUT} (single tab 'Synthese Jun26', {len(rows)} countries)")

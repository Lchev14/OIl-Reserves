#!/usr/bin/env python3
"""Manager deliverable CSVs — open cleanly in Excel (no .xlsx binary to corrupt).
Months/Δ columns are LIVE Excel formulas (=B2/30.44 etc.). Run:
  python3 build/build_manager_csv.py  ->  manager/reserve_coverage.csv, manager/key_indicators.csv
Strict per the brief: 'before' only where a real figure exists; '-' otherwise; today figures are EST.
"""
import csv, os
os.makedirs("manager", exist_ok=True)

# (country, before_days|None, today_days|None, basis, source)
rows = [
    ("USA (SPR)",    None, None, "-", "net exporter — metric undefined; SPR tracked in key_indicators"),
    ("Germany",      None, 99,   "E", "EBV/BMWE + IEA"),
    ("France",       98,   98,   "W", "IEA / Eurostat, Apr-26"),
    ("UK",           104,  90,   "W", "GOV.UK / IEA, Mar-26"),
    ("Italy",        None, 90,   "W", "IEA / EU Dir 2009/119"),
    ("Spain",        120,  91,   "E", "CORES / IEA, Mar-26"),
    ("Netherlands",  None, None, "-", "net exporter — metric undefined"),
    ("Poland",       None, 87,   "E", "IEA + model"),
    ("Japan",        200,  205,  "W", "METI / PAJ / S&P, May-26"),
    ("South Korea",  208,  205,  "W", "KNOC / IEA / CSIS, May-26"),
    ("China",        122,  130,  "W", "Reuters (Kemp) / EIA, 2026"),
    ("India",        74,   76,   "W", "Min. Petroleum, 8-Jun-26"),
    ("Thailand",     None, 117,  "W", "Thai Energy Min. (on-ground ~56d)"),
    ("Philippines",  None, 46,   "W", "PH DOE OIMB, 12-Jun-26"),
    ("Indonesia",    None, 21,   "W", "ESDM (capacity-capped ~25d)"),
    ("Vietnam",      None, 40,   "W", "VietnamNet, May-26"),
]
with open("manager/reserve_coverage.csv", "w", newline="") as f:
    w = csv.writer(f)
    w.writerow(["Country", "Before (days)", "Before (months)", "Today (days, EST.)",
                "Today (months)", "Delta days", "Delta %", "Basis", "Source & Date"])
    for i, (c, b, t, basis, src) in enumerate(rows):
        R = i + 2
        B = b if b is not None else "-"
        D = t if t is not None else "-"
        C = f"=B{R}/30.44" if b is not None else "-"
        E = f"=D{R}/30.44" if t is not None else "-"
        Fd = f"=D{R}-B{R}" if (b is not None and t is not None) else "-"
        G = f"=(D{R}-B{R})/B{R}" if (b is not None and t is not None) else "-"
        w.writerow([c, B, C, D, E, Fd, G, basis, src])

ind = [
    ("Brent crude ($/bbl)", "72 (27 Feb)", "~120", "~74", "V", "EIA / Trading Economics"),
    ("US SPR (mb)", "411", "-", "331", "V", "EIA WPSR"),
    ("US SPR fill (% of ~714 capacity)", "58%", "-", "46%", "V", "= SPR / 714"),
    ("Hormuz crude flow (mb/d)", "~15", "-", "~4.8", "W", "Kpler / wires"),
    ("IEA coordinated release (mb)", "-", "-", "400 (US share 172)", "V", "IEA, 11-Mar-26"),
    ("VLCC freight Gulf->Asia ($/day)", "~55000", "~470000", "~180000", "W", "Lloyd's List / Hellenic"),
]
with open("manager/key_indicators.csv", "w", newline="") as f:
    w = csv.writer(f)
    w.writerow(["Indicator", "Pre-war", "Peak", "Now (26 Jun)", "Basis", "Source"])
    w.writerows(ind)

print("wrote manager/reserve_coverage.csv and manager/key_indicators.csv")

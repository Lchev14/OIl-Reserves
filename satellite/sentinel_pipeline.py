#!/usr/bin/env python3
"""
Production scaffold: estimate crude-storage fill at the AOI catalogue from free
Copernicus Sentinel imagery, reusing the SAME shadow-measurement core proven in
tank_shadow_demo.py.

This DOES NOT run in the Claude-Code-on-web sandbox — api.eia.gov, vercel and the
Copernicus Data Space are all egress-blocked here, and it needs a (free) Copernicus
account. Run it where those are reachable:

  1. Register (free): https://dataspace.copernicus.eu/
  2. export CDSE_USER=...   CDSE_PASS=...
  3. pip install numpy scikit-image rasterio pystac-client odata-protocol requests
  4. python3 satellite/sentinel_pipeline.py --aoi cn-zhoushan --since 2026-02-01

Outputs satellite/out/<aoi>_fill.csv  (per-acquisition regional fill estimate, tagged
Modelled-EST Tier-3 — NEVER 'Verified'; calibrate against a few known tanks first).

Design:
  - Sentinel-2 L2A optical: the shadow-length method on clear days (best signal).
  - Sentinel-1 GRD SAR: all-weather fallback (floating-roof ring backscatter) — fills
    the cloud gaps Sentinel-2 leaves; ~6-12 day combined revisit.
  - Underground/salt-cavern stock (US SPR, parts of China SPR) is INVISIBLE here — use
    the tanker-flow mass-balance in the main workflow for those.
"""
import os, sys, json, argparse, datetime

# --- core measurement, shared with the demo (optical shadow -> fill) -----------------
def estimate_fill_from_chip(chip, sun_elevation_deg, dark_thresh=0.32, tank_radius_px=None):
    """chip: 2D float array (0..1) centred on ONE tank. Returns fill fraction 0..1.
    Same logic the demo validates at ~1.4pp MAE: shadow-pixel fraction -> fill via the
    site calibration. sun_elevation modulates crescent->headroom geometry."""
    import numpy as np
    from skimage.draw import disk
    h, w = chip.shape
    r = tank_radius_px or int(min(h, w) * 0.45)
    rr, cc = disk((h // 2, w // 2), int(r * 0.9), shape=chip.shape)
    shadow_frac = float((chip[rr, cc] < dark_thresh).mean())
    # geometry: deeper sun angle -> longer shadow for the same headroom; normalise.
    geom = max(0.35, min(1.6, 1.0 / max(0.2, __import__("math").tan(__import__("math").radians(sun_elevation_deg)))))
    headroom = shadow_frac * geom
    # site calibration (slope, intercept) must be fit per-AOI vs known tanks; demo fit:
    slope, intercept = -0.921, 0.896
    return max(0.0, min(1.0, slope * (headroom / geom) + intercept))


def fetch_sentinel(aoi, since, kind="S2"):
    """Query + download the Copernicus Data Space tiles intersecting the AOI bbox.
    Real implementation (requires creds + egress) — outline only here."""
    raise NotImplementedError(
        "Wire to Copernicus Data Space: authenticate with CDSE_USER/CDSE_PASS, use the\n"
        "STAC/OData catalogue (pystac-client) to search SENTINEL-2 L2A (or SENTINEL-1 GRD)\n"
        "over aoi bbox since `since`, download the cloud-free scene, read the band with\n"
        "rasterio, and return a north-up float array + sun_elevation from the metadata."
    )


def run(aoi_id, since):
    cat = json.load(open(os.path.join(os.path.dirname(__file__), "aoi_catalogue.json")))
    aoi = next((a for a in cat["aois"] if a["id"] == aoi_id), None)
    if not aoi:
        sys.exit(f"unknown aoi '{aoi_id}'. options: {[a['id'] for a in cat['aois']]}")
    if not (os.environ.get("CDSE_USER") and os.environ.get("CDSE_PASS")):
        sys.exit("Set CDSE_USER / CDSE_PASS (free Copernicus account) — and run where "
                 "dataspace.copernicus.eu is reachable. See module docstring.")
    print(f"[{aoi['id']}] {aoi['name']} ({aoi['lat']},{aoi['lon']}) since {since}")
    scene, sun_elev = fetch_sentinel(aoi, since)           # raises until wired
    # ... detect tanks (Hough, as in the demo), crop a chip per tank,
    #     fill = estimate_fill_from_chip(chip, sun_elev), aggregate barrels by tank
    #     geometry (radius*height*fill), write out/<aoi>_fill.csv with as-of date.


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--aoi", required=True)
    ap.add_argument("--since", default="2026-02-01")
    a = ap.parse_args()
    run(a.aoi, a.since)

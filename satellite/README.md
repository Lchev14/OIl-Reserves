# Satellite tank-fill estimation (floating-roof shadow method)

Estimate crude-storage fill from satellite imagery — the technique Kayrros / Orbital
Insight / Ursa Space sell, built here from free Copernicus Sentinel data. Targeted at
the **data-dark** sites (China, Gulf export terminals, non-OECD) where IEA/EIA publish
nothing; not where official data already exists.

## What's here
| File | Status |
|---|---|
| `tank_shadow_demo.py` | **Runs now.** Proves the estimation algorithm on synthetic imagery. |
| `sentinel_pipeline.py` | **Scaffold.** Same core, wired to real Sentinel tiles — needs a free Copernicus account + open network (blocked in the web sandbox). |
| `aoi_catalogue.json` | Prioritised tank-farm AOIs (Tier-A = build first). |
| `demo_output.png` | Output of the demo run. |

## How the method works
A floating-roof crude tank has a roof that **sits on the oil**, so it rises and falls
with volume. When the tank is low, the roof sinks below the rim and the sun throws a
**shadow crescent** on the inner wall. Crescent size → empty headroom → fill level
(corrected for sun elevation). Sentinel-2 optical gives the shadow on clear days;
Sentinel-1 SAR (all-weather) fills the cloud gaps via the roof-position ring.

## Demonstration result (run it: `python3 satellite/tank_shadow_demo.py`)
On a synthetic 35-tank farm where the algorithm is **not told the fill levels or even
where the tanks are** (it detects them with a Hough transform, measures each shadow,
and calibrates):

- **35 / 35 tanks detected**
- **Mean absolute error ≈ 1.4 percentage points, R² ≈ 0.99**

That validates the pipeline logic. Real imagery is noisier (clouds, mixed roof types,
oblique angles), so expect single-digit-pp error per tank and better at the
farm/region aggregate — consistent with the commercial providers' published accuracy.

## Running it for real
1. Free account: <https://dataspace.copernicus.eu/>
2. `export CDSE_USER=... CDSE_PASS=...`
3. `pip install numpy scikit-image rasterio pystac-client requests`
4. `python3 satellite/sentinel_pipeline.py --aoi cn-zhoushan --since 2026-02-01`

Wire the `fetch_sentinel()` stub to the Copernicus STAC/OData catalogue (the docstring
says exactly what to return). Calibrate `slope/intercept` per AOI against a few tanks of
known level before trusting the numbers.

## Honest limits
- **Fixed-roof and underground/salt-cavern storage are invisible** to the shadow method.
  The **US SPR (salt caverns)** and parts of **China's SPR (rock caverns)** cannot be
  seen from orbit — use the tanker-flow mass-balance in the main workflow for those.
- Output is a **`Modelled-EST` Tier-3 proxy**, never `Verified`. It corroborates the
  reserve estimates; it does not replace official data where that exists.
- A China-only floating-roof MVP is a few-week build; the full Tier-A/B catalogue is a
  multi-month project. Sequence it.

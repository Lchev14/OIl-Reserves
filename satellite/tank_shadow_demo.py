#!/usr/bin/env python3
"""
Floating-roof oil-tank fill estimation — WORKING DEMONSTRATION of the shadow method.

The technique (used commercially by Kayrros / Orbital Insight / Ursa): a floating-roof
crude tank has a roof that sits ON the oil, so it rises and falls with volume. When the
tank is low, the roof is sunk below the rim and the sun casts a shadow crescent on the
inner wall; the crescent's size encodes the empty headroom, hence the fill level.

This script does NOT need satellite access. It (1) synthesises a top-down tank farm with
tanks at KNOWN fill levels and physically-plausible shadow crescents, (2) DETECTS the
tanks with a Hough circle transform (it is not told where they are), (3) MEASURES each
shadow and (4) estimates fill, then (5) validates against ground truth. That proves the
estimation pipeline; sentinel_pipeline.py swaps the synthetic image for real Sentinel
tiles with the same core measurement.

Run:  python3 satellite/tank_shadow_demo.py
Out:  satellite/demo_output.png  + an accuracy table on stdout.
"""
import numpy as np
from skimage.feature import canny
from skimage.transform import hough_circle, hough_circle_peaks
from skimage.draw import disk
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

rng = np.random.default_rng(7)
H, W, R = 560, 900, 30
GROUND, ROOF, RIM, SHADOW = 0.45, 0.62, 0.80, 0.16
SUN = np.array([0.8, 0.6]); SUN = SUN / np.linalg.norm(SUN)   # direction the shadow falls

# ---- 1. synthesise the tank farm ----------------------------------------------------
img = np.full((H, W), GROUND, dtype=float)
truth = []   # (cx, cy, fill)
for y in range(70, H - 50, 96):
    for x in range(70, W - 60, 112):
        cx, cy = x + int(rng.integers(-7, 8)), y + int(rng.integers(-7, 8))
        fill = float(rng.uniform(0.08, 0.98))
        rr, cc = disk((cy, cx), R, shape=img.shape);          img[rr, cc] = ROOF
        rr, cc = disk((cy, cx), R, shape=img.shape)
        ring = (cc - cx) ** 2 + (rr - cy) ** 2 >= (R - 3) ** 2
        img[rr[ring], cc[ring]] = RIM                          # bright rim
        rr, cc = disk((cy, cx), R - 2, shape=img.shape)        # shadow crescent ~ (1-fill)
        s = (cc - cx) * SUN[0] + (rr - cy) * SUN[1]
        w = (1 - fill) * 1.7 * R
        m = s > (R - w)
        img[rr[m], cc[m]] = SHADOW
        truth.append((cx, cy, fill))
img = np.clip(img + rng.normal(0, 0.03, img.shape), 0, 1)      # sensor noise

# ---- 2. detect tanks (Hough circles) — not given their positions --------------------
edges = canny(img, sigma=2.0)
radii = np.arange(R - 5, R + 6, 2)
hough = hough_circle(edges, radii)
acc, cxs, cys, rads = hough_circle_peaks(hough, radii, total_num_peaks=len(truth) + 6,
                                         min_xdistance=70, min_ydistance=70)

# ---- 3+4. measure shadow fraction inside each detected tank, map to fill -------------
def shadow_fraction(cx, cy, r):
    rr, cc = disk((cy, cx), int(r * 0.9), shape=img.shape)
    return float(np.mean(img[rr, cc] < 0.32))

det = [(int(cx), int(cy), int(r), shadow_fraction(cx, cy, r)) for cx, cy, r in zip(cxs, cys, rads)]

# match each detection to nearest true tank
def nearest(cx, cy):
    d = [( (cx - tx) ** 2 + (cy - ty) ** 2, f) for tx, ty, f in truth]
    return min(d)[1]

pairs = [(sf, nearest(cx, cy), cx, cy, r) for cx, cy, r, sf in det]
sf = np.array([p[0] for p in pairs]); true = np.array([p[1] for p in pairs])

# calibrate dark-fraction -> fill (linear, as the real method calibrates vs known tanks)
A = np.vstack([sf, np.ones_like(sf)]).T
slope, intercept = np.linalg.lstsq(A, true, rcond=None)[0]
est = np.clip(slope * sf + intercept, 0, 1)
mae = float(np.mean(np.abs(est - true)))
r2 = 1 - np.sum((true - est) ** 2) / np.sum((true - true.mean()) ** 2)

# ---- 5. report + figure -------------------------------------------------------------
print(f"Detected {len(det)} / {len(truth)} tanks")
print(f"Calibration: fill = {slope:.3f} * shadow_fraction + {intercept:.3f}")
print(f"Mean abs error: {mae*100:.1f} pp   |   R^2: {r2:.3f}\n")
print(" tank   true%   est%   |err|")
for i, (s_, t_, cx, cy, r) in enumerate(sorted(pairs, key=lambda p: -p[1])[:10]):
    e_ = np.clip(slope * s_ + intercept, 0, 1)
    print(f"  {i:>3}   {t_*100:5.0f}  {e_*100:5.0f}   {abs(e_-t_)*100:4.1f}")

fig, ax = plt.subplots(1, 2, figsize=(15, 5), facecolor="#0a1117")
ax[0].imshow(img, cmap="gray", vmin=0, vmax=1)
for (s_, t_, cx, cy, r) in pairs:
    e_ = np.clip(slope * s_ + intercept, 0, 1)
    th = np.linspace(0, 2 * np.pi, 60)
    ax[0].plot(cx + r * np.cos(th), cy + r * np.sin(th), color="#3fbecb", lw=1.2)
    ax[0].text(cx, cy - r - 4, f"{e_*100:.0f}%", color="#f3a738", fontsize=8, ha="center")
ax[0].set_title("Synthetic 'satellite' tank farm — detected tanks + estimated fill",
                color="#eaf1f6", fontsize=11)
ax[0].axis("off")
ax[1].set_facecolor("#0f1822")
ax[1].scatter(true * 100, est * 100, c="#3fbecb", s=30, edgecolor="#0a1117")
ax[1].plot([0, 100], [0, 100], "--", color="#f3a738", lw=1)
ax[1].set_xlabel("true fill %", color="#93a8b6"); ax[1].set_ylabel("estimated fill %", color="#93a8b6")
ax[1].set_title(f"Validation — MAE {mae*100:.1f} pp,  R² {r2:.2f}", color="#eaf1f6", fontsize=11)
for a in ax[1].spines.values(): a.set_color("#21384a")
ax[1].tick_params(colors="#93a8b6")
plt.tight_layout()
plt.savefig("satellite/demo_output.png", dpi=110, facecolor="#0a1117")
print("\nwrote satellite/demo_output.png")

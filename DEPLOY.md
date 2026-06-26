# Deploying the dashboard (only the dashboard, nothing else)

`dashboard/index.html` is a single dependency-free static file. Two guards ensure **only the dashboard is public**:

- **`.vercelignore`** (repo root) excludes `*.md`, `*.xlsx`, `*.py`, `build/`, `docs/`, `workflows/` from the Vercel build — so the workbook, reports, and workflow are never uploaded to Vercel.
- **`vercel.json`** rewrites `/` → `/dashboard/index.html`, so the root URL shows the dashboard.

Result: the deployed site serves the dashboard at `/`; everything else returns 404.

## If you already imported the repo into Vercel
You don't need to re-import. A push to the deployed branch auto-redeploys with these guards applied. To be belt-and-suspenders sure, also set the **Root Directory** to `dashboard` (Project → Settings → Build & Deployment → Root Directory → `dashboard` → Save → Redeploy). With Root Directory = `dashboard`, Vercel only ever sees `index.html`.

## Verify only the dashboard is exposed
After deploy, on your Vercel URL:
- `https://<your-url>/` → dashboard renders ✓
- `https://<your-url>/OUTPUT_hormuz2026_reserve_intelligence.xlsx` → **404** ✓
- `https://<your-url>/README.md` → **404** ✓
- `https://<your-url>/workflows/hormuz-reserve-intel.workflow.js` → **404** ✓

If any of those return a file instead of 404, the guards aren't applied — set Root Directory to `dashboard` and redeploy.

## Cleanest alternative — deploy only the folder
Download `dashboard/`, drag it onto **vercel.com/new**. Only `index.html` is uploaded; nothing else can leak by construction.

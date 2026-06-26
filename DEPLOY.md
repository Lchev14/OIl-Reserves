# Deploying the dashboard (only the dashboard, nothing else)

The dashboard is `index.html` at the **repo root** — a single dependency-free static file. Vercel serves a root `index.html` at `/` with **zero configuration**. `.vercelignore` excludes everything else (`*.md`, `*.xlsx`, `*.py`, `build/`, `docs/`, `workflows/`), so only the dashboard is public.

No `vercel.json`, no rewrites, no `cleanUrls` — those caused the earlier root 404.

## Fixing an existing Vercel project that 404s
1. Vercel → your project → **Settings → Build & Deployment**.
2. **Root Directory** must be **empty / blank** (the repo root). If it says `dashboard`, clear it — that folder no longer exists.
3. **Framework Preset: Other**, no build command, default output.
4. **Deployments** tab → **Redeploy** (or just push — it auto-redeploys).

## Verify only the dashboard is exposed
On your Vercel URL:
- `/` → dashboard renders ✓
- `/README.md` → **404** ✓
- `/OUTPUT_hormuz2026_reserve_intelligence.xlsx` → **404** ✓
- `/workflows/hormuz-reserve-intel.workflow.js` → **404** ✓

## Foolproof alternative (no Git, no settings)
Download `index.html`, go to **vercel.com/new**, drag the single file (or a folder containing only it) onto the page, Deploy. Only that file is uploaded — nothing else can leak.

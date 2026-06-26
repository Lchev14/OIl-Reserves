# Deploying the dashboard

The dashboard (`dashboard/index.html`) is a single, dependency-free static file. `vercel.json` at the repo root rewrites `/` → `/dashboard/index.html`, so the deployed root URL shows the dashboard with no configuration.

## Option A — connect the GitHub repo (recommended; auto-redeploys on push)

1. Go to **vercel.com/new**.
2. **Import** `Lchev14/OIl-Reserves`. (Authorize Vercel for the repo if prompted.)
3. Framework preset: **Other**. Build command: **none**. Output directory: leave default (root).
4. **Deploy.** The root URL serves the dashboard; `/dashboard/preview.png` and the other files are served as static assets.
5. Every push to the branch redeploys automatically. To deploy from `claude/intelligent-bohr-lxpxqo`, set it as the Production Branch (Project → Settings → Git) or merge to `main`.

## Option B — drag-and-drop (fastest, no Git link)

1. Download the `dashboard/` folder.
2. Go to **vercel.com/new**, drag the folder onto the drop zone.
3. Deploy. (Root URL = `index.html` directly, since the folder *is* the root here — no rewrite needed.)

## Option C — CLI (from your machine)

```bash
npm i -g vercel
cd OIl-Reserves
vercel            # preview deploy
vercel --prod     # production
```

## Note
The deployment is **public** by default. Everything here is public oil-market data, so that's fine — but be aware the other repo files (xlsx, md) would also be reachable as static paths. To serve *only* the dashboard, use Option B (deploy just the `dashboard/` folder).

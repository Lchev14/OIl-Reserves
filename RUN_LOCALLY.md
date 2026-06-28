# Option B — run the deep-dive workflow on your own machine (open network)

Goal: run `workflows/depletion-restock-deepdive.workflow.js` where the data hosts (IEA, EIA, Eurostat, JODI) are **not** egress-blocked, so the agents pull **verified** numbers instead of wire-attributed estimates. ~38 agents, ~45–90 min, ~$30–60 on API (or covered by a Claude Max plan).

---

## 1 · Prerequisites (one-time)
- **Node.js 18+** — check with `node --version` (install from nodejs.org if missing).
- **Git**.
- **A Claude login** — a Claude Pro/Max subscription *or* an Anthropic API key.

## 2 · Install Claude Code
```bash
npm install -g @anthropic-ai/claude-code
```

## 3 · Authenticate
```bash
claude            # launches; run /login and authenticate in the browser (uses your Claude plan)
```
…or, to bill the API directly:
```bash
export ANTHROPIC_API_KEY=sk-ant-...      # then run `claude`
```

## 4 · Get the repo
```bash
git clone https://github.com/Lchev14/OIl-Reserves.git
cd OIl-Reserves
git checkout main          # main and the feature branch are identical
```

## 5 · Run the workflow
Open Claude Code in the repo folder and ask it, in plain language:
```bash
claude
```
then type:
> Run the workflow at `workflows/depletion-restock-deepdive.workflow.js` with args `{ "runDate": "28 June 2026" }`. I authorize the multi-agent workflow.

Claude Code will call its **Workflow** tool, show a permission prompt (approve it), and launch ~38 agents across 5 phases (Frame → Depletion → RestockRace → Verify → Synthesis). Watch live with `/workflows`.

**Why this run is different from the sandbox one:** on your open network the agents' web-fetch reaches `iea.org`, `eia.gov`, `ec.europa.eu` (Eurostat) and `jodidata.org` directly — so the per-country days-of-cover come back **verified**, not wire-estimated. That is the data expansion you can't get inside the locked environment.

## 6 · Save the output
When it finishes, ask Claude Code:
> Save the workflow's synthesis to `manager/DEEP_SYNTHESIS.md`, rebuild `manager/reserve_coverage.csv` from the verified figures, commit, and push.

---

## Bonus — free verified data you can drop in directly (no workflow needed)
These are the authoritative tables, free, no login (blocked from the sandbox, reachable for you):

- **Eurostat — emergency oil stocks, *days equivalent*, monthly, every EU country** (Germany, France, Italy, Spain, NL, Poland):
  - Table: <https://ec.europa.eu/eurostat/databrowser/view/nrg_stk_oem/default/table>
  - JSON API: `https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/nrg_stk_oem?format=JSON&lang=EN`
- **JODI-Oil World Database** (India, Thailand closing stocks; CSV download): <https://www.jodidata.org/oil/database/data-downloads.aspx>
- **EIA open-data API** (free key) — US SPR (`WCSSTUS1`), Brent (`RBRTE`), commercial crude (`WCESTUS1`): <https://www.eia.gov/opendata/>
- **IEA "Oil stocks of IEA countries"** (days of net-import cover; some free, full data is OMR-subscription): <https://www.iea.org/data-and-statistics/data-tools/oil-stocks-of-iea-countries>

Pull `nrg_stk_oem` + JODI and you have verified days-of-cover for ~10 of the 16 countries in 5 minutes — that alone upgrades most of the table from `W` to `V`.

## Cost / safety notes
- The workflow is public oil-market research only — nothing sensitive leaves your machine.
- Run it inside the cloned `OIl-Reserves` folder so Claude Code is scoped to this project.
- ~$30–60 on API for the full run; a Claude Max plan absorbs it without per-token billing.

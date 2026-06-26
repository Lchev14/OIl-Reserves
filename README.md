# Hormuz 2026 — Crude Reserve & Restocking Intelligence

Tooling to produce a reproducible before-vs-today crude-reserve **coverage** table (days + months of net-import cover, 16 countries), a key-indicators block, a restocking assessment, and a total restocking-demand estimate — at the quality a crude desk would accept.

## Contents

| File | What it is |
|---|---|
| `MASTER_PROMPT_crude_reserve_restocking_hormuz2026.md` | The corrected master prompt (OAS pattern). Portable across execution tiers; paste-runnable in any Claude session. |
| `workflows/hormuz-reserve-intel.workflow.js` | The same pipeline as an **executable** Claude Code Workflow — gates enforced in code, structured-output schemas per agent, real context-isolated verify/red-team. |

The two are kept in sync: the workflow is the master prompt made runnable.

## Running the workflow (Claude Code)

The Workflow primitive requires explicit opt-in. Launch it with:

```
Workflow({ scriptPath: "workflows/hormuz-reserve-intel.workflow.js" })
```

Optional deterministic args (recommended, since the script may not read the clock):

```
Workflow({
  scriptPath: "workflows/hormuz-reserve-intel.workflow.js",
  args: { runDate: "26 June 2026", daysElapsed: 118 }
})
```

It spawns ~40 agents (frame → hinge → 16 baseline → 16 today → restock → lenses → verify/red-team → synthesis). Budget accordingly; watch live with `/workflows`.

## Design notes (what makes this rigorous, not laundered guessing)

- **Frame verification first (A-00).** The whole dataset post-dates the Jan-2026 model cutoff. The pipeline corroborates the war/Hormuz/IEA spine across ≥3 independent qualifying sources and **halts** if it can't — garbage frame in → precisely-tagged garbage out.
- **Source-exclusion + self-citation gate.** Content-farm blogs and unknown "live tracker" sites are denied; the operator's own Hormuz dashboard cannot re-enter as "corroboration."
- **Dimensionally-correct mass-balance estimator.** `ΔStock = R·T − S_release` [mb]; `Δdays = ΔStock / D` [days]. Flows (mb/d) are integrated over elapsed time before being added to stocks (mb). Per-country calibration is mandatory — a global average is the failure mode.
- **One confidence ladder:** `Verified-official` / `Inferred-triangulated` / `Modelled-EST` / `Absent (-)`. A model counts as at most one source class and never earns `Verified`.
- **Consistent stock basis** (IEA total-stock, strategic+commercial) on every row; US SPR-only is broken out separately, never substituted into the coverage column.
- **Independent verify + red team.** Run as context-isolated agents so they didn't see the figures being generated — the only configuration where hallucination control actually has teeth.

See the master prompt's §10 changelog for the full list of corrections over the original draft.

> All hard numbers live in a dated, illustrative appendix (§9) and decay fast — re-fetch at run time, never paste.

# Hormuz 2026 — Crude Reserve, Redistribution & Restocking Intelligence (v2)

A decision-grade intelligence product on global crude reserves during the 2026 Strait of Hormuz crisis. Not just a consumer coverage table — it covers **both sides of the chokepoint** and tests an explicit thesis.

## Contents

| File | What it is |
|---|---|
| `MASTER_PROMPT_crude_reserve_restocking_hormuz2026.md` | The master prompt v2 (OAS pattern). Portable across tiers; paste-runnable in any Claude session. |
| `workflows/hormuz-reserve-intel.workflow.js` | The same pipeline as an **executable** Claude Code Workflow — ~50 agents, structured-output schemas per agent, gates enforced in code. |

The two are kept in sync: the workflow is the master prompt made runnable.

## What it produces

- **Consumer coverage table** (16 countries, days + months, Hormuz-dependence %, effective at-risk cover).
- **Producer table** (Gulf-6) on an exporter schema — export-cover days, usable stock (inside/outside Hormuz/abroad), storage-utilization %, bypass-adjusted export capacity, shut-in mb/d.
- **Global redistribution ledger** — the thesis test: consumer draws vs producer builds vs foregone production, with a redistribution coefficient ρ and an explicit verdict.
- **Throughput / bypass model**, **restocking assessment**, **restocking-demand estimate**, **Hormuz-duration scenario tree** (S1/S2/S3), **weekly trajectory**, **key indicators**.

## The load-bearing finding

The thesis that motivated this — *"a chokepoint closure just moves oil from consumers to producers, so global reserves are conserved"* — is **refuted in its strong form**. Producers can't hoard what they have no tankage for: Gulf storage saturated within ~1–2 weeks (Ras Tanura 4/6 tanks full by early March 2026), forcing **shut-ins, not stockpiling**. Only ~120 mb was genuinely stranded (floating +100, onshore +20) against **>1.3 bn bbl of foregone production**. So ρ ≪ 1; the dominant effect is global undersupply, not redistribution. The pipeline computes ρ live and reports the verdict whichever way the data falls.

## Running the workflow

The Workflow primitive requires explicit opt-in:

```
Workflow({ scriptPath: "workflows/hormuz-reserve-intel.workflow.js",
           args: { runDate: "26 June 2026", daysElapsed: 118 } })
```

It spawns ~50 agents across 10 phases (frame → hinge → consumer ∥ producer → ledger → forward → restock → lenses → isolated verify/red-team → synthesis). Watch live with `/workflows`.

## Why it's rigorous, not laundered guessing

- **Frame verification first (A-00)** — corroborates the war/Hormuz/IEA spine across ≥3 independent qualifying sources and **halts** if it can't; a source-exclusion + self-citation gate keeps content-farms and the operator's own dashboard out.
- **Dimensionally-correct mass-balance estimator** — `ΔStock = R·T − S_release` [mb]; `Δdays = ΔStock / D` [days]; per-country calibration mandatory.
- **One confidence ladder** (`Verified-official` / `Inferred-triangulated` / `Modelled-EST` / `Absent`); a model is at most one source class and never earns `Verified`; totals carry a confidence-weighted band.
- **Consumers and producers use different metrics**; throughput (bypass capacity, storage utilization) is treated as the binding variable, not volume.
- **Independent verify + red team** run as context-isolated agents, plus a bottom-up-vs-IEA-top-down reconciliation that reports the divergence as an error bar.

See §10 (changelog) and §11 (a separate Sentinel-1 satellite tank-shadow pipeline spec) in the master prompt.

> All hard numbers live in a dated, illustrative appendix (§9) and decay fast — re-fetch at run time, never paste.

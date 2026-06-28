# Run the deep workflow on your own machine — step by step (Windows / Dell)

This gets the workflow running where the data sites (IEA/EIA/Eurostat/JODI) are reachable, so the numbers come back **verified**. No prior terminal experience needed — follow it literally. (~20 min setup, then ~1 hour for the run.)

> Throughout: "**type X**" or "**paste X**" means into the blue **PowerShell** window from Step 1, then press **Enter**. To paste in PowerShell, **right-click** (or **Ctrl+V**).

---

## STEP 1 — Open PowerShell
1. Press the **Windows key** (bottom-left, the ⊞ logo) → a search box appears.
2. Type **PowerShell** → click **Windows PowerShell** in the results.
3. A blue (or black) window opens with text ending in a `>` (e.g. `PS C:\Users\Laurent>`). **This is where every command below goes.** Leave it open.

## STEP 2 — Install Node.js (needed once)
Easiest way, no commands:
1. In your browser go to **https://nodejs.org**.
2. Click the big button that says **"LTS"** (recommended) — it downloads a file ending in **`.msi`**.
3. Double-click that file → an installer opens → click **Next → accept the license → Next → Next → Install** → if Windows asks "Do you want to allow this app to make changes", click **Yes** → **Finish**.
4. **Close PowerShell completely and reopen it** (so it sees the new install), then type this to check it worked:
   ```
   node --version
   ```
   You should see something like `v22.20.0`. If you see a version number, you're good. *(If it says "not recognized", restart the PC and try again.)*

## STEP 3 — Install Claude Code (needed once)
1. In PowerShell, paste:
   ```
   npm install -g @anthropic-ai/claude-code
   ```
2. Press Enter and wait ~1–2 minutes (lots of text scrolls — that's normal).
3. If it finishes without a red "ERR!" at the very end, it worked. Check with:
   ```
   claude --version
   ```
   **If you get a red "permission denied / EACCES / EPERM" error**: close PowerShell, then in the Windows search box type **PowerShell**, **right-click** it → **Run as administrator** → click **Yes** → paste the same `npm install -g @anthropic-ai/claude-code` again.

## STEP 4 — Log in to Claude
1. In PowerShell, type:
   ```
   claude
   ```
2. The first time, it asks you to log in and opens your browser → sign in with your Claude account (the same one you use for Claude Max) → it says "you can return to the terminal".
3. Back in PowerShell you're now inside Claude Code (the prompt changes). Type `/exit` and press Enter to leave for now.

## STEP 5 — Download this project
No git needed:
1. In your browser, open **https://github.com/Lchev14/OIl-Reserves**.
2. Click the green **"< > Code"** button → **Download ZIP**.
3. Open your **Downloads** folder (File Explorer → Downloads) → **right-click the ZIP** → **Extract All… → Extract**. It unzips to a folder named **`OIl-Reserves-main`**.
4. Back in PowerShell, point it at that folder by pasting:
   ```
   cd "$env:USERPROFILE\Downloads\OIl-Reserves-main"
   ```
   *(`cd` means "go into this folder". Nothing visible happens — that's fine.)*
5. Confirm you're in the right place:
   ```
   dir
   ```
   You should see a list including `workflows`, `manager`, `index.html`, etc. *(If instead you see only one folder also called `OIl-Reserves-main`, run `cd OIl-Reserves-main` once more, then `dir` again.)*

## STEP 6 — Run the workflow
1. Start Claude Code here:
   ```
   claude
   ```
2. When it's ready, type this sentence (literally) and press Enter:
   > Run the workflow file workflows/depletion-restock-deepdive.workflow.js as a Workflow, with args {"runDate":"28 June 2026"}. I authorize the multi-agent workflow.
3. Claude will show a **permission box** — choose **Yes / Allow**.
4. It now launches ~38 helper agents. To watch progress, type `/workflows`. **Leave it running ~45–90 minutes** (you can keep using the PC; just don't close the PowerShell window).

## STEP 7 — Save the result
When it finishes, type this to Claude Code and press Enter:
> Save the workflow's synthesis to manager/DEEP_SYNTHESIS.md and show me the bottom-line summary.

That's it. Because your home network can reach IEA/EIA/Eurostat/JODI, the figures it produces are the **verified** ones the locked cloud environment couldn't fetch.

---

## If you'd rather not use the Terminal at all
Two no-terminal alternatives:
- **Claude Code web** (what you're using now): you can't open your *local* network from there, so it stays data-limited — but it's where we already work.
- **The free data, by hand (5 min, no install):** open **https://ec.europa.eu/eurostat/databrowser/view/nrg_stk_oem/default/table** (verified days-of-cover for the 6 EU countries) and **https://www.jodidata.org/oil/database/data-downloads.aspx** (India/Thailand), and paste those numbers into the table. That alone verifies ~10 of 16 rows without running anything.

## Common hiccups
- **"claude is not recognized"** → Step 3 didn't finish; re-run it (Run as administrator if needed), then close & reopen PowerShell.
- **"node / npm is not recognized"** → Node didn't install or PowerShell wasn't restarted; redo Step 2 and reopen PowerShell.
- **Claude Code asks for "Git Bash" or a shell** → install **Git for Windows** from **https://git-scm.com/download/win** (just click Next through the installer), then reopen PowerShell and retry `claude`.
- **The workflow asks to confirm each agent** → that's the permission system; choose "Yes, and don't ask again" / "allow for this session".
- **Cost** → on your Claude Max plan it's covered as normal usage; on a pay-as-you-go API key it's ~$30–60 for the full run.

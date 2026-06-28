# Run the deep workflow on your own machine — step by step (Mac)

This gets the workflow running where the data sites (IEA/EIA/Eurostat/JODI) are reachable, so the numbers come back **verified**. No prior terminal experience needed — follow it literally. (~20 min setup, then ~1 hour for the run.)

> Throughout: "**type X**" or "**paste X**" means into the black Terminal window from Step 1, then press **Return** (Enter). To paste, use **⌘V**.

---

## STEP 1 — Open the Terminal
1. Press **⌘ (Command) + Space** → a search bar appears.
2. Type **Terminal** → press **Return**.
3. A window opens with text ending in a `%` (e.g. `laurent@MacBook ~ %`). **This is where every command below goes.** Leave it open.

## STEP 2 — Install Node.js (needed once)
Easiest way, no commands:
1. In your browser go to **https://nodejs.org**.
2. Click the big button that says **"LTS"** (recommended) — it downloads a file ending in `.pkg`.
3. Double-click that file → an installer opens → click **Continue → Continue → Agree → Install** → enter your Mac password → **Close**.
4. Back in Terminal, type this to check it worked:
   ```
   node --version
   ```
   You should see something like `v22.20.0`. If you see a version number, you're good. *(If it says "command not found", quit Terminal completely with ⌘Q and reopen it, then try again.)*

## STEP 3 — Install Claude Code (needed once)
1. In Terminal, paste:
   ```
   npm install -g @anthropic-ai/claude-code
   ```
2. Press Return and wait ~1–2 minutes (lots of text scrolls — that's normal).
3. If it finishes without a red "ERR" at the very end, it worked. Check with:
   ```
   claude --version
   ```
   **If you get a red "permission denied / EACCES" error**, paste this instead (it will ask for your Mac password — typing is invisible, that's normal):
   ```
   sudo npm install -g @anthropic-ai/claude-code
   ```

## STEP 4 — Log in to Claude
1. In Terminal, type:
   ```
   claude
   ```
2. The first time, it asks you to log in and opens your browser → sign in with your Claude account (the same one you use for Claude Max) → it says "you can return to the terminal".
3. Back in Terminal you're now inside Claude Code (the prompt changes). Type `/exit` and press Return to leave for now.

## STEP 5 — Download this project
No git needed:
1. In your browser, open **https://github.com/Lchev14/OIl-Reserves**.
2. Click the green **"< > Code"** button → **Download ZIP**.
3. Go to your **Downloads** folder and **double-click the ZIP** → it unzips to a folder named **`OIl-Reserves-main`**.
4. Back in Terminal, point it at that folder by pasting:
   ```
   cd ~/Downloads/OIl-Reserves-main
   ```
   *(`cd` means "change directory / go into this folder". Nothing visible happens — that's fine.)*
5. Confirm you're in the right place:
   ```
   ls
   ```
   You should see a list including `workflows`, `manager`, `index.html`, etc.

## STEP 6 — Run the workflow
1. Start Claude Code here:
   ```
   claude
   ```
2. When it's ready, type this sentence (literally) and press Return:
   > Run the workflow file workflows/depletion-restock-deepdive.workflow.js as a Workflow, with args {"runDate":"28 June 2026"}. I authorize the multi-agent workflow.
3. Claude will show a **permission box** — choose **Yes / Allow**.
4. It now launches ~38 helper agents. To watch progress, type `/workflows`. **Leave it running ~45–90 minutes** (you can keep using the Mac; just don't close the Terminal window).

## STEP 7 — Save the result
When it finishes, type this to Claude Code and press Return:
> Save the workflow's synthesis to manager/DEEP_SYNTHESIS.md and show me the bottom-line summary.

That's it. Because your home network can reach IEA/EIA/Eurostat/JODI, the figures it produces are the **verified** ones the locked cloud environment couldn't fetch.

---

## If you'd rather not use the Terminal at all
Two no-terminal alternatives:
- **Claude Code web** (what you're using now): you can't open your *local* network from there, so it stays data-limited — but it's where we already work.
- **The free data, by hand (5 min, no install):** open **https://ec.europa.eu/eurostat/databrowser/view/nrg_stk_oem/default/table** (verified days-of-cover for the 6 EU countries) and **https://www.jodidata.org/oil/database/data-downloads.aspx** (India/Thailand), and paste those numbers into the table. That alone verifies ~10 of 16 rows without running anything.

## Common hiccups
- **"command not found: claude"** → Step 3 didn't finish; re-run it (with `sudo` if needed), then quit & reopen Terminal.
- **"command not found: npm"** → Node didn't install; redo Step 2 and reopen Terminal.
- **The workflow asks to confirm each agent** → that's the permission system; choose "Yes, and don't ask again" / "allow for this session".
- **Cost** → on your Claude Max plan it's covered as normal usage; on a pay-as-you-go API key it's ~$30–60 for the full run.

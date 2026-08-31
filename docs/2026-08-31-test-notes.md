# Second Brain — Test Notes

**Date:** August 31, 2026
**Scope:** v0.1 Portal capture prototype (`dashboard/`), tested per `docs/2026-08-31-tonight-action-plan.md`.

This records behavior only — no actual captured note content, consistent with `CLAUDE.md`.

## What works

- Windows setup path (git clone → Python via Store install → `.env` → `python dashboard\server.py`) works end to end on a fresh machine with no prior Python install.
- Portal serves locally at `http://127.0.0.1:8765` with no build step.
- **Quick Note** confirmed live by Conor: typed a note, saved, file appeared correctly in the real vault's `Inbox/`.
- Obsidian opened the same vault folder and picked up the file automatically — no plugin or extra sync step needed, confirming the "Portal and Obsidian both just point at the same folder" design decision.
- Automated testing against a scratch vault (run during build, not the real vault) additionally confirmed:
  - N-able Call and Mortgage Call both write correct Markdown with frontmatter, quick-marker tags, and account/contact fields populated.
  - Same-minute saves never collide or overwrite (auto-suffixes `-2`, `-3`, …).
  - Empty note bodies are rejected rather than saved as blank files.
  - Static file serving rejects path-traversal attempts (`../`) with a 404.
  - `/api/health` correctly reports whether the vault path is configured, driving the status pill in the UI.

## What does not work / not yet confirmed

- **N-able Call and Mortgage Call flows have not yet been run live** by Conor against the real vault — only Quick Note has been exercised in the actual app. Automated testing covered the save logic but not the live-call UI (timer, quick markers, End Call).
- **Loss-protection has not been exercised live** — killing the server mid-note and confirming the draft survives (via `localStorage` autosave) is implemented and reasoned through but not yet manually verified end to end.

## Bugs found and fixed during build

- Untitled Quick Notes originally produced a redundant filename (`...-quick-note-quick-note.md`) because the empty-title fallback slug duplicated the mode name. Fixed so an untitled note now saves as `YYYY-MM-DD-HHmm-quick-note.md`.

## UX friction

- None reported yet — only one capture mode has been used live so far.

## Ideas / open questions

- Cross-device access: Conor wants to reach the same vault from a work computer, not just this one. This needs a decision on how the vault (not this software repo) gets shared between machines — see the options and privacy trade-offs discussed in chat; nothing has been decided or built yet.
- The three quick-marker sets (N-able: Pain/Objection/Need/Competitor/Next Step; Mortgage: Objective/Concern/Documents/Lender/Next Step) are still just first guesses from the design doc — worth revisiting after a few real calls.

## Next implementation steps

1. Run Test B (N-able call) and Test C (Mortgage call) live, in the real app, against the real vault.
2. Manually verify the loss-protection path: start a note, kill the `python dashboard\server.py` process mid-typing, restart it, confirm the draft is recoverable.
3. Decide and set up a cross-device access method for the vault (see chat discussion — cloud sync, Syncthing, or Obsidian Sync are the candidates), then repeat the work-computer setup steps against the *same* vault.
4. Once the capture loop is trusted, move to Phase 2 of the roadmap (n8n intake) — not before.

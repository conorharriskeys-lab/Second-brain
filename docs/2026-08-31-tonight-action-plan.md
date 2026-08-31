# Second Brain — Tonight's Action Plan

**Date:** August 31, 2026
**Based on:** `docs/2026-08-30-build-sprint.md`
**Purpose:** The Aug 30 sprint plan was written but not executed — this repository still contains only documentation and empty placeholder folders. This plan picks up exactly where the sprint left off and sequences tonight's work against the actual current state, not the assumed one.

## Where things actually stand

Verified against the repo tonight:

- `dashboard/`, `librarian/`, `n8n/`, `scripts/`, `tests/` each contain only a `README.md`. No code exists anywhere in the repository.
- No local knowledge vault exists yet (and it shouldn't live in this repo — see `.gitignore`, which already excludes `vault/`, `private/`, `personal-data/`, `client-data/`).
- No Portal, no Inbox, no capture flow. Every item in the sprint's "Definition of done" checklist is still unchecked.

So tonight is not a continuation of partial work — it's the actual first build session. The scope from the sprint doc still stands; this plan just makes it executable in order.

## Tonight's objective

Get a real, working local Portal that lets you type a Quick Note, N-able call, or Mortgage call and reliably produces a Markdown file in a real local Inbox — tonight, not eventually.

## Sequence

### 1. Vault setup (5 min) — you, not Claude Code

Create the vault **outside** this repository, e.g. `~/Conor-Second-Brain/`:

```text
Conor-Second-Brain/
├── Inbox/
├── Knowledge/
├── Projects/
├── Areas/
├── Resources/
└── Archive/
```

Open it in Obsidian. Tell Claude Code the absolute path — the Portal needs it as local config (not committed; see Privacy below).

**Done when:** the folder exists and Obsidian can open it.

### 2. Portal skeleton (10 min)

Build under `dashboard/`:

- One static HTML/CSS/JS page (the capture home from `docs/portal-design.md` §1) served locally.
- A minimal local API with one route: `POST /api/capture`.
- No build tooling, no framework, no auth, no database — a single small server process is enough for v0.1.

**Done when:** the page loads locally and the server responds to a health check.

### 3. Quick Note capture (15 min)

- Single textarea + Save, per `docs/portal-design.md` §2.
- Save writes a Markdown file with frontmatter (see format below) into `Inbox/`.
- Save must succeed even if nothing else in the system is running.

**Done when:** typing a note and clicking Save produces a file in `Inbox/`.

### 4. Sales Call capture — N-able and Mortgage (20 min)

- Shared interaction model per `docs/portal-design.md` §3–4: start call → account/contact fields → live note stream → optional quick markers (Pain / Objection / Need / Competitor / Next Step for N-able; equivalent set for Mortgage) → end call.
- Quick markers just prefix/tag a line — they are accelerators, never required fields.
- End of call writes one Markdown file per call to `Inbox/`, raw notes preserved verbatim.

**Done when:** a full mock call (start → type → mark a couple of lines → end) produces one readable Inbox file per domain.

### 5. Loss-protection pass (10 min)

- Autosave the in-progress note (e.g. to `localStorage` or a local temp file) on every keystroke or short interval, independent of the final Save action.
- Verify: start typing, kill the server process, restart it, confirm the draft is recoverable or the note area still holds the text client-side.

**Done when:** killing the server mid-note does not lose what was typed.

### 6. Real-world test pass (10 min)

Run the three tests from the sprint doc exactly as written, as a user, not a developer:

- **Test A** — capture a general thought, confirm it lands in `Inbox/` as Markdown.
- **Test B** — run a mock N-able call with a couple of quick markers, confirm the note survives.
- **Test C** — repeat for a mortgage call.

**Done when:** all three produce correct files with no manual filing step.

### 7. Record results (10 min)

Update or create a short test/roadmap note (in this repo, e.g. `docs/2026-08-31-test-notes.md`) capturing: what worked, what didn't, bugs, UX friction, and next steps. Do not put any actual captured note content from step 6 into this repo — summarize behavior only.

## Technical approach

- **Language/runtime:** prefer whatever has zero extra install friction on your machine tonight (Python stdlib `http.server`-based handler, or a tiny Node `http` server) over pulling in a framework. Avoid unnecessary dependencies per `CLAUDE.md`.
- **Storage:** direct filesystem writes to the vault's `Inbox/` path. No database, no ORM.
- **Config:** the vault path is local configuration, not a secret and not vault content — keep it in an untracked `.env` or local config file (already covered by `.gitignore`).
- **API contract:** `POST /api/capture` takes `{ mode: "quick-note" | "nable-call" | "mortgage-call", title?, account?, contact?, body }` and returns the written filename. Keep it that small; do not add fields the UI doesn't use yet.
- **Filename convention:** `YYYY-MM-DD-HHmm-<mode>-<slug>.md` — sortable, collision-resistant, greppable.
- **Frontmatter** (per `docs/knowledge-model.md`):

  ```yaml
  ---
  type: note        # or: sales-call
  mode: quick-note   # quick-note | nable-call | mortgage-call
  created: 2026-08-31T21:00:00
  status: inbox
  account: ""
  tags: []
  source: portal
  ---
  ```

- **Modularity:** keep the capture-write path free of any Librarian/n8n/Llama calls. Those are future async consumers of the Inbox, not part of tonight's save path — this is what makes the "still works if Wi-Fi is down" requirement actually true.

## Explicit non-goals tonight

Carried over from the sprint doc — do not let any of these creep in:

Vector databases, RAG, MCP, multi-agent systems, authentication, cloud hosting, mobile apps, complex knowledge graphs, GitHub Actions, Postgres/Redis, automatic classification, autonomous deletion, full CRM functionality, real Llama/n8n/Kindle integration.

## Definition of done for tonight

- [ ] Local vault exists outside this repo; Obsidian opens it.
- [ ] Portal runs locally with no build step beyond starting the process.
- [ ] Quick Note, N-able Call, and Mortgage Call each save a correct Markdown file to `Inbox/`.
- [ ] A killed server mid-note does not destroy what was typed.
- [ ] Tests A, B, and C from the sprint doc all pass.
- [ ] Results recorded in a follow-up doc in this repo (behavior only, no captured content).

Measure success the same way the sprint doc does: not by lines of code, but by whether you'd actually use this to capture a real note tonight.

# Dashboard — Second Brain Portal (v0.1)

The local capture Portal described in `docs/portal-design.md` and
`docs/2026-08-31-tonight-action-plan.md`. This is the Universal Capture
prototype only: Quick Note, N-able Call, and Mortgage Call, writing straight
to Markdown in your vault's `Inbox/`. No auth, no database, no build step.

Do not build a large application here until the underlying
capture → organization → retrieval pipeline is proven. The dashboard
consumes the knowledge layer; it is not the canonical data store.

## Run it

1. Copy the env template and point it at your real local vault (not this repo):

   ```bash
   cp dashboard/.env.example dashboard/.env
   # edit dashboard/.env — set SECOND_BRAIN_VAULT_PATH
   ```

2. Start the server (stdlib only, nothing to install):

   ```bash
   python3 dashboard/server.py
   ```

3. Open <http://127.0.0.1:8765> in a browser.

## How saving works

- `POST /api/capture` writes one Markdown file per capture directly into
  `<SECOND_BRAIN_VAULT_PATH>/Inbox/`, named
  `YYYY-MM-DD-HHmm-<mode>-<slug>.md`.
- Each file gets minimal YAML frontmatter per `docs/knowledge-model.md`
  (`type`, `mode`, `created`, `status: inbox`, `account`, `contact`, `tags`,
  `source: portal`).
- The browser also autosaves the in-progress note/call to `localStorage` on
  every change. If the server or your machine goes down mid-note, reopening
  the Portal offers to resume the draft — nothing typed is lost, and nothing
  else in the system needs to be running for a save to succeed.
- No Librarian, n8n, or model calls happen on the save path. Those are
  future asynchronous consumers of the Inbox, not part of capture.

## Mortgage vault segregation

Per `docs/architecture.md`, mortgage/client information stays segregated
from the general second brain. Set `SECOND_BRAIN_VAULT_PATH_MORTGAGE` in
`dashboard/.env` to a *separate* vault folder, and Mortgage Call captures
route there automatically — Quick Note and N-able Call always go to
`SECOND_BRAIN_VAULT_PATH`. You never choose a destination when capturing;
the mode decides it. Open both folders as separate vaults in Obsidian. If
`SECOND_BRAIN_VAULT_PATH_MORTGAGE` is left unset, mortgage captures fall
back to the general vault.

## Syncing with Obsidian

There is no sync step to build: point `SECOND_BRAIN_VAULT_PATH` at the same
folder you have open as an Obsidian vault, and Obsidian picks up new files
in `Inbox/` the moment the Portal writes them (Obsidian watches its vault
folder on disk). Keep the Portal and Obsidian pointed at the same path and
they stay in sync automatically — no plugin, export, or additional service
required.

## Explicitly not in v0.1

Authentication, a database, semantic search, the knowledge graph, real
Llama/n8n/Kindle integration. See `docs/2026-08-30-build-sprint.md` for the
full non-goals list.

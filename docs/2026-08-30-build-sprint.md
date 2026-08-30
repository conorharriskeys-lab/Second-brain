# Second Brain — Build Sprint

**Date:** August 30, 2026  
**Target:** Barebones v0.1 usable during the coming week

## What we are building

The Second Brain is a private, local-first personal information system. Markdown files are the durable knowledge layer; Obsidian is the initial knowledge workspace; the future Portal is the preferred human interface.

The near-term goal is deliberately small:

> **Capture information quickly, save it safely, and organize it later.**

The system should eventually support Kindle Scribe notes, live sales-call notes, mortgage and N-able accounts, ChatGPT-created documents, local AI classification, n8n automation, and specialized agents. None of that needs to be production-ready today.

## The most important user experience

The Portal should optimize for **capture**, especially during live work.

### 1. Quick Note

For thoughts, ideas, observations, and general notes.

The user should not need to choose a folder or understand metadata.

### 2. N-able Sales Call

Start a call, identify the account, and immediately take fast notes.

The interface should prioritize typing speed and optional quick markers such as:

- Pain
- Objection
- Need
- Competitor
- Next Step

The user should be able to capture messy notes without stopping to organize them.

### 3. Mortgage Sales Call

Same basic experience, with mortgage/account context.

The underlying system should distinguish the domain without forcing the user through a large CRM-style form.

### 4. Kindle Pairing

Eventually, a handwritten Kindle Scribe note should be importable and pairable with an existing call, account, project, or note.

Example:

```text
Kindle note
    ↓
pair with
    ↓
N-able — ABC Technology — Sales Call — 2026-08-30
```

The handwritten source should remain preserved while the Librarian can later extract and connect useful information.

## v0.1 success criteria

At the end of today's sprint, the following should work locally:

```text
Open Portal
    ↓
Choose Quick Note / N-able Call / Mortgage Call
    ↓
Type naturally
    ↓
Save
    ↓
Markdown file appears in local Inbox
```

The system must protect captured notes from accidental loss.

If Llama, n8n, Wi-Fi, or another future service is unavailable, **the user's live notes must still be saved locally.**

## Today's 60-minute sprint

### 0–10 minutes — Environment

- Clone/open the GitHub repository locally.
- Open it with Claude Code.
- Have Claude read `CLAUDE.md` and the documentation.
- Do not allow architecture drift.

Prompt for Claude Code:

> Read the entire repository documentation. Do not modify anything yet. Explain the architecture back to me and identify exactly what we need to implement for a barebones v0.1.

**Done when:** Claude understands the architecture and proposed scope.

### 10–20 minutes — Local knowledge vault

Create a separate local folder for the actual knowledge vault. This is NOT the GitHub software repository.

Suggested starting structure:

```text
Conor-Second-Brain/
├── Inbox/
├── Knowledge/
├── Projects/
├── Areas/
├── Resources/
└── Archive/
```

Open this vault in Obsidian.

Do not over-engineer the folder structure. `Inbox/` is the critical component for v0.1.

**Done when:** a real Markdown vault exists independently from the GitHub software repo.

### 20–40 minutes — Build the Portal capture prototype

Give Claude Code this implementation instruction:

> Build the v0.1 Second Brain Portal described in `docs/portal-design.md`.
>
> For this first prototype, focus exclusively on the Universal Capture experience.
>
> Required functionality:
>
> 1. Clean local web interface.
> 2. Prominent capture experience.
> 3. Three modes: Quick Note, N-able Sales Call, Mortgage Sales Call.
> 4. Simple title/account context fields where useful.
> 5. Large, fast note-taking area.
> 6. Save locally to an Inbox directory.
> 7. Protect against accidental loss while typing.
> 8. Do not connect Llama or n8n yet.
> 9. Do not build authentication.
> 10. Do not build a database.
> 11. Do not build semantic search.
> 12. Do not build the knowledge graph.
>
> The goal is: open Portal → choose activity → type → Save → Markdown file appears in Inbox.
>
> Keep the architecture modular so n8n and the Librarian can be added later without rebuilding the UI.
>
> Use mock/sample data only where necessary.
>
> After implementation, explain exactly what changed and how to run it locally.

**Done when:** a note can be captured and reliably written to Markdown.

### 40–50 minutes — Real-world testing

Test it as if using it during a workday, not as a developer.

#### Test A — General thought

Capture a thought such as:

> I think the biggest weakness in our MDR positioning is that we're selling technology instead of accountability.

Verify it lands in `Inbox/` as Markdown.

#### Test B — N-able call

Start an N-able call, type fast, use a few optional markers, save it, and verify the note survives.

#### Test C — Mortgage call

Repeat for a mortgage account.

**Done when:** all three workflows work without requiring manual filing.

### 50–60 minutes — Document the next iteration

Create/update a test and roadmap document recording:

- What works
- What does not work
- Bugs
- UX friction
- Ideas
- Next implementation steps

## Explicitly NOT building today

Do not allow scope creep into:

- Vector databases
- RAG
- MCP
- Multi-agent systems
- Authentication
- Cloud hosting
- Mobile apps
- Complex knowledge graphs
- GitHub Actions
- PostgreSQL/Redis unless an actual v0.1 requirement emerges
- Automatic document classification
- Autonomous deletion
- Full CRM functionality

These are future possibilities, not today's objective.

## Roadmap after v0.1

### Phase 1 — Capture

```text
Portal
  ↓
Markdown
  ↓
Inbox
```

### Phase 2 — Automation

```text
Portal / Kindle / Documents
  ↓
Inbox
  ↓
n8n
```

### Phase 3 — Local intelligence

```text
Inbox
  ↓
n8n
  ↓
Local Llama / Ollama
  ↓
Classification + metadata
```

### Phase 4 — Librarian

```text
Incoming information
  ↓
Librarian
  ↓
Organized Markdown
  ↓
Links + metadata
```

Guiding principle:

**Capture first → Organize second → Synthesize later.**

### Phase 5 — Kindle

Connect the Kindle Scribe ingestion path and allow notes to be paired with calls, accounts, projects, and existing knowledge.

### Phase 6 — Retrieval

Start with simple local full-text search. Add semantic search/RAG only when there is a demonstrated need.

### Phase 7 — Portal expansion

Add:

- Home / Today
- Inbox queue
- Knowledge Explorer
- Search
- Projects
- Connections
- Agent workspace

### Phase 8 — Specialized agents

Build agents only when a real recurring workflow justifies one:

- Sales Coach
- Researcher
- Writer
- Mortgage Agent

All specialized agents should work against the shared knowledge base rather than creating separate silos.

## North-star experience

The system should eventually make this possible:

```text
Conor thinks
    ↓
Conor captures
    ↓
System saves immediately
    ↓
Librarian organizes
    ↓
Knowledge becomes connected
    ↓
Agents can use it
    ↓
Conor gets useful insight
```

The user should never need to think:

> "Which folder does this belong in?"

The system should eventually feel like a **personal operating system for information**, while keeping the underlying knowledge portable, local, and under the user's control.

## Definition of done for August 30, 2026

A barebones version is complete if:

- [ ] GitHub repository contains the architecture and documentation.
- [ ] Separate local Markdown vault exists.
- [ ] Obsidian can open the vault.
- [ ] Portal prototype runs locally.
- [ ] Quick Note works.
- [ ] N-able Sales Call capture works.
- [ ] Mortgage Sales Call capture works.
- [ ] Notes are saved as Markdown in Inbox.
- [ ] Live notes are not dependent on AI or internet availability.
- [ ] Claude Code can understand the project from the repository documentation.

**Do not measure today's success by how much code was written. Measure it by whether the capture workflow is genuinely useful.**

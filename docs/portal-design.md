# Second Brain Portal — UI & Product Design

## Purpose

The Portal is the human-facing interface for Conor's Second Brain. It sits above the local Markdown/Obsidian knowledge base and should feel like a personal information operating system rather than a prettier file browser.

**Core principle:** Keep the knowledge portable. The Portal is an interface, not the source of truth.

## Design direction

**Concept: Personal OS / Command Center**

The first version should combine four ideas:

1. **Personal OS** — a calm home screen showing what matters now.
2. **Universal Capture** — one obvious place to put thoughts, documents, links, and notes without deciding where they belong.
3. **Knowledge Explorer** — browse related concepts, notes, sources, projects, and entities without relying on folder navigation alone.
4. **Agent Workspace** — invoke specialized agents against the shared knowledge base as they are added.

The visual style should be modern, minimal, information-dense without feeling cramped, and suitable for desktop first with responsive behavior. Avoid the visual language of a generic admin dashboard.

## Proposed navigation

- **Home** — live overview / Today
- **Capture** — universal input
- **Inbox** — unprocessed material and Librarian queue
- **Knowledge** — browse and search the knowledge base
- **Projects** — active work
- **Connections** — related concepts/entities/notes
- **Agents** — Librarian first; specialists later
- **Settings** — local configuration, integrations, system status

## Home screen

The Home screen should answer four questions immediately:

- What is new?
- What am I working on?
- What needs attention?
- What can I do next?

### Suggested composition

```text
┌─────────────────────────────────────────────────────────────┐
│  SECOND BRAIN                                  Search  ⌘K  │
│                                                             │
│  Good morning, Conor                                       │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ What are you thinking about?                    +     │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                             │
│  + Note      + Document      + Kindle      + URL            │
│                                                             │
│  ─────────────────────────────────────────────────────────  │
│                                                             │
│  TODAY                                                     │
│  ┌───────────────┐ ┌───────────────┐ ┌─────────────────┐  │
│  │ Inbox         │ │ Active        │ │ Recent          │  │
│  │ 12            │ │ Projects  4   │ │ 8 items         │  │
│  └───────────────┘ └───────────────┘ └─────────────────┘  │
│                                                             │
│  RECENT KNOWLEDGE                                           │
│  CMMC positioning · Sales call · Kindle note · MDR research │
│                                                             │
│  ACTIVE PROJECTS                                            │
│  Second Brain · Mortgage Dashboard · CMMC · N-able          │
└─────────────────────────────────────────────────────────────┘
```

The exact layout can evolve. The important hierarchy is **capture → today → recent → active work**.

## Universal Capture

This is the signature interaction.

The user should be able to enter a thought such as:

> Internal IT teams seem more concerned with accountability around MDR than the underlying technology.

and press Enter.

The Portal should save the original capture to the Inbox and let the Librarian classify it later.

The user should not have to choose a folder first.

Optional capture types:

- Thought
- Note
- Document
- URL
- Kindle import
- Transcript

## Librarian status

The UI should make automation visible rather than magical.

Example:

```text
INBOX

12 waiting

┌───────────────────────────────────────────────────────┐
│ CMMC Sales Guide.pdf                                  │
│ Processing…                                           │
│                                                       │
│ Librarian                                             │
│ Category: N-able / CMMC                               │
│ Tags: #CMMC #MDR #compliance                          │
│ Confidence: 94%                                       │
│                                                       │
│ [Approve] [Review]                                    │
└───────────────────────────────────────────────────────┘
```

For high-confidence, non-destructive classification, approval can eventually be automatic. Ambiguous routing should remain reviewable.

## Knowledge Explorer

A knowledge item should not simply open as a file.

Example: opening `MDR` could show:

- Summary / note content
- Source documents
- Related concepts
- Related entities
- Related projects
- Recent activity
- Backlinks / wikilinks
- Agent actions available

Example relationship view:

```text
                    MDR
                     │
          ┌──────────┼──────────┐
          ↓          ↓          ↓
       Adlumin   SentinelOne   CMMC
          │          │          │
          └──────┬───┘          │
                 ↓              ↓
            Sales Calls    Compliance
```

The graph is a supporting visualization, not the primary navigation mechanism. Lists and search must remain fast and useful.

## Search

Search should be globally accessible via `⌘/Ctrl + K` or a persistent search field.

Initial implementation should favor simple local full-text search over introducing a vector database prematurely.

Later, semantic search/RAG can be added when there is a demonstrated need.

Search results should show:

- Title
- Type
- Category
- Short excerpt
- Date
- Source
- Related tags

## Agent Workspace

The Agents page should initially contain only the Librarian.

Future cards:

```text
🧠 Librarian
Organize and connect my knowledge

💼 Sales Coach
Analyze my calls and improve my selling

🔎 Researcher
Synthesize research from my knowledge base

✍️ Writer
Create from what I already know

🏠 Mortgage
Work with mortgage knowledge
```

Each agent operates against the shared knowledge base rather than creating a separate silo.

## Agent interaction model

Avoid making every agent a generic chat window.

Prefer task-oriented prompts:

- Analyze these 10 calls
- Find everything about CMMC
- Summarize what I know about MDR
- Draft a document using these sources
- Show me unresolved questions

The system should show which sources were used and link back to the underlying Markdown notes.

## Architecture boundary

The Portal should communicate with the local system through explicit interfaces.

```text
Portal
  ↓
Local application/API
  ↓
Markdown vault / local indexes
  ↓
n8n + Librarian + local model
```

The Portal must not become a second database that independently stores the user's knowledge.

## Privacy requirements

- No personal knowledge in the GitHub software repository.
- No credentials in source code.
- Prefer local network/local process communication.
- Cloud AI should be an explicit, optional path rather than the default.
- Destructive operations require explicit confirmation.
- Never automatically delete knowledge.

## Technical direction

The eventual frontend can be implemented as a local web application, likely using Next.js + TypeScript, with a thin local backend/API where required.

Do not build the entire production stack immediately.

### Prototype first

Phase 1 of the Portal should use mock data and prove:

1. Home screen
2. Universal capture
3. Inbox
4. Knowledge browsing
5. Search interaction
6. Agent page
7. Basic note/detail view

Only after the UI feels right should it be connected to the real vault.

## Non-goals for v1

- No multi-user SaaS architecture
- No cloud database
- No complex vector database
- No autonomous multi-agent swarm
- No automatic deletion
- No elaborate graph-first navigation
- No attempt to replace every Obsidian feature

## Design test

A successful first prototype should make the user feel:

> "I don't need to know where this belongs. I just put it here, and my system takes care of the rest."

That is the experience the Portal should optimize for.

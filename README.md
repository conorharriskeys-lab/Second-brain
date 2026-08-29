# Conor's Second Brain

A local-first personal knowledge system built around Markdown, Obsidian, local AI, automation, and a future custom interface.

## Vision

Capture first. Organize second. Synthesize later.

The system should turn scattered inputs—notes, Kindle Scribe material, PDFs, research, conversations, ideas, and writing—into a durable, searchable knowledge base without locking the underlying knowledge into one application or model.

## Architecture

```text
INPUTS
  ├─ Manual / Obsidian notes
  ├─ Kindle Scribe
  ├─ PDFs & documents
  ├─ ChatGPT / Claude outputs
  ├─ Web research
  └─ Transcripts
        ↓
      INBOX
        ↓
   ORCHESTRATION
   (n8n / scripts)
        ↓
   LOCAL AI LAYER
   (Ollama / replaceable models)
        ↓
    THE LIBRARIAN
 classification • extraction • routing • linking
        ↓
  MARKDOWN KNOWLEDGE BASE
        ↓
  ┌───────────────┬────────────────┐
  ↓               ↓                ↓
Obsidian      Dashboard       Future agents
```

## Repository boundaries

This repository contains the **system**, not the personal knowledge vault.

Do not commit private notes, client information, mortgage files, credentials, API keys, or other sensitive material. The actual vault should live separately and be connected locally.

## Design principles

1. **Local-first** — sensitive knowledge stays on local infrastructure wherever practical.
2. **Markdown-first** — knowledge remains portable and readable without the application.
3. **Model-agnostic** — Claude, ChatGPT, Ollama/local models, and future models are interchangeable layers.
4. **Source preservation** — never destroy the original input when transforming it.
5. **Human-in-the-loop** — uncertain classification or destructive operations require review.
6. **No magical automation** — every automated behavior should be understandable and reversible.
7. **Separation of concerns** — capture, organization, retrieval, reasoning, and presentation are distinct layers.
8. **Build incrementally** — establish the foundation before adding clever agents.

## Initial build

- `CLAUDE.md` — operating instructions for Claude Code
- `docs/architecture.md` — technical architecture and boundaries
- `docs/knowledge-model.md` — how knowledge is represented and linked
- `docs/librarian.md` — Librarian agent specification
- `docs/agent-permissions.md` — safety and permissions model
- `docs/roadmap.md` — phased implementation plan
- `librarian/` — future Librarian implementation
- `n8n/` — automation definitions and integration notes
- `dashboard/` — future local interface
- `scripts/` — utility scripts
- `tests/` — validation and fixtures

## North star

The end state is not simply a better note-taking app. It is a **personal information operating system**: a private knowledge layer that can be queried, organized, connected, and used by multiple AI agents while keeping the underlying information portable and under the user's control.

# Architecture

## Goal

Create a durable personal knowledge layer that sits beneath Obsidian and future applications. The knowledge itself must remain portable; applications and models are interfaces to it.

## Layers

### 1. Capture

Inputs can include handwritten notes, typed notes, PDFs, documents, web research, conversations, transcripts, and exports from other tools.

All new material should have a safe landing zone before processing.

### 2. Inbox

The inbox is an append-oriented staging area. Nothing is considered fully organized merely because it entered the system.

### 3. Orchestration

n8n and small scripts handle predictable movement and integration tasks. Automation should be observable and restartable.

### 4. Local AI

Ollama/local models provide privacy-preserving AI operations where useful. Model selection should remain configurable.

### 5. Librarian

The Librarian handles classification, metadata extraction, routing, linking suggestions, and organization. It should not become a single point of truth.

### 6. Knowledge base

Markdown files are the canonical human-readable representation. Obsidian is the initial interface over this knowledge.

### 7. Retrieval and agents

Future agents can query the knowledge base for specialized purposes. Each agent gets narrowly defined permissions and a clear purpose.

### 8. Presentation

A local dashboard may eventually provide a higher-level view: recent knowledge, areas of focus, tasks, relationships, and agent outputs.

## Data flow

```text
source → inbox → normalize → classify → review (if needed) → route → link/index → retrieve
```

The original source remains available throughout the pipeline.

## Storage philosophy

Do not make a vector database, SQL database, or SaaS application the canonical knowledge store at the beginning. Search indexes and databases may be derived artifacts later.

## Privacy

The system is designed around a local/private operating model. Client and mortgage information is especially sensitive and should remain segregated from the general second brain unless a future architecture explicitly provides appropriate controls.

**v0.1 implementation of this control (Aug 31, 2026):** the Portal (`dashboard/`) writes Mortgage Call captures into a separate vault from Quick Note and N-able Call, controlled by `SECOND_BRAIN_VAULT_PATH_MORTGAGE` — the two vaults can then be synced/stored independently (e.g. different OneDrive folders or providers). Routing is by capture mode, not a user choice, keeping with the "never make the user classify before saving" rule. If that env var is unset, mortgage captures fall back to the general vault rather than failing.

## Future extensibility

The architecture should support:

- multiple AI providers
- local and remote model adapters
- semantic and lexical search
- embeddings as a derived index
- agent-specific workspaces
- scheduled processing
- human approval queues
- a local web dashboard
- backup and version history

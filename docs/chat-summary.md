# Project Context — Conversation Summary

## Why this file exists

This document captures the decisions, goals, mental models, and constraints established while designing Conor's Second Brain. It is intended to give future coding agents—especially Claude Code—the context behind the architecture rather than only a list of technical requirements.

## The original problem

Conor wants a personal second-brain system that can collect information from many places and keep it organized without requiring him to manually decide where every piece belongs.

He currently has a local Llama model running on his personal laptop through the terminal. Privacy is a major reason for using a local model. The initial model does not need to perform sophisticated reasoning; it mainly needs to parse, classify, tag, and route information.

Conor uses Obsidian as the intended underlying knowledge repository because it works with Markdown files. He does not particularly like the native Obsidian interface, so the long-term goal is a custom interactive Portal/dashboard that sits on top of the same Markdown vault.

## Core mental model

The system is best understood as a personal information operating system:

- **Markdown** = the durable information
- **Obsidian** = a knowledge workspace/viewer for that information
- **Inbox** = the mail tray where new information lands
- **n8n** = automation/orchestration / traffic cop
- **Local Llama** = private classifier/extractor
- **Librarian** = the agent responsible for organizing knowledge
- **Portal** = the user's preferred interface/desk
- **Claude Code** = software builder
- **GitHub** = source control and the software workshop
- **Specialized agents** = future specialists operating on the shared knowledge base

The key principle is that the underlying knowledge must not be trapped inside the Portal, an AI model, or a proprietary database.

## Capture → Organize → Retrieve → Understand → Act

The system should evolve through these stages.

The first implementation should concentrate on **Capture → Organize**.

Do not begin by building an elaborate reasoning system.

## First agent: Librarian

The initial AI agent is deliberately a generalist. It should eventually become the system's Librarian.

Its job is organization, not deep reasoning.

Responsibilities:

1. Read incoming material.
2. Determine what it is about.
3. Determine the information type.
4. Determine a category.
5. Generate useful metadata/tags.
6. Route the material to an appropriate location.
7. Identify relevant existing notes.
8. Create/update structured Markdown where appropriate.
9. Preserve the original source.
10. Maintain consistency.

The guiding principle is:

**Capture first → Organize second → Synthesize later.**

The Librarian should not aggressively rewrite original thoughts and should never automatically delete knowledge.

## Example categories

Initial examples discussed:

- N-able
- Sales
- CMMC / Cybersecurity
- Mortgage
- Personal
- Ideas
- Projects
- Learning
- General Thoughts
- Scheduling / Tasks
- Reference Material

These are examples, not immutable architecture. The final knowledge model should emerge from actual use and remain simple.

## Inputs

The system should eventually accept:

- Manual notes
- PDFs
- Documents
- Kindle Scribe notes
- ChatGPT-created documents
- Claude-created documents
- Research
- Web material
- Sales call transcripts
- General thoughts

The ideal experience is that Conor can simply capture information without deciding its final location.

## Kindle Scribe vision

Conor has a Kindle Scribe and has identified an open-source project that can potentially move Scribe material into Obsidian.

Desired eventual flow:

Kindle Scribe
→ Kindle/Obsidian integration
→ Inbox
→ n8n
→ Local Llama
→ Librarian
→ Correct location in knowledge base

The experience should eventually feel invisible: write on the Scribe, sync it, and let the system organize it.

## ChatGPT / Claude outputs

Conor creates substantial documents with ChatGPT, including work related to CMMC, cybersecurity, N-able, sales, and other projects.

Initially, manually placing an exported document into an Inbox is acceptable.

Eventually the workflow should become:

ChatGPT/Claude output
→ local Inbox
→ n8n
→ Librarian
→ Obsidian/Markdown

Cloud AI is optional. The local-first principle remains important.

## Local AI / privacy

Sensitive information should remain local wherever practical.

The local model is intended to handle organization/classification initially.

A more capable cloud model may eventually be used for optional deeper reasoning, writing, strategy, or synthesis, but the system should be model-agnostic and not depend on one vendor.

## n8n

n8n is being considered as the automation layer.

Initial conceptual workflow:

New file enters Inbox
→ n8n detects it
→ read content
→ send to local model
→ receive structured classification
→ route/create Markdown
→ log operation

Do not build ten workflows initially. Prove one useful ingestion workflow first.

## Future specialized agents

Once the Librarian is reliable, specialized agents can be added.

### Sales Coach

Use sales calls, transcripts, opportunities, notes, objections, and existing sales knowledge to identify:

- What Conor did well
- What he did poorly
- Repeating patterns
- Objections he struggles with
- Improvement opportunities

### Research Agent

Synthesize and connect research using existing knowledge.

### Writing Agent

Create new documents from existing knowledge and sources.

### Mortgage Agent

Eventually work with mortgage-related knowledge.

The specialized agents must leverage the same shared knowledge base rather than creating disconnected silos.

## GitHub architecture

The GitHub repository is for the **software and architecture**, not the actual personal knowledge vault.

The repository should contain things such as:

- Documentation
- Librarian implementation
- n8n workflows
- Dashboard code
- Scripts
- Tests
- Agent instructions
- Configuration templates

Do not commit:

- Client information
- Mortgage files
- Private personal notes
- Credentials
- API keys
- Other sensitive data

The actual Obsidian vault remains a separate local resource.

## Claude Code

Claude Code is intended to be the primary software builder working against the GitHub repository.

Claude should read `CLAUDE.md` and the architecture documentation before making significant changes.

The preferred workflow is:

**ChatGPT = architecture / thinking / review**

**Claude Code = implementation / testing / iteration**

**GitHub = source of truth for software**

Conor remains the decision-maker/architect.

## Existing second-brain projects used as inspiration

Several open-source projects were identified as useful architectural references:

- NicholasSpisak/second-brain — particularly the raw → LLM librarian → structured wiki concept.
- arkangelai/second-brain — local-first Markdown/Obsidian/AI/search architecture.
- 0xtahaa/obsidian-second-brain — agent instructions, CLAUDE.md, Inbox/Knowledge/Projects/Resources organization, and local-first design.
- byoniq/SecondBrain — more advanced continuous synthesis concepts to consider only in later phases.
- sridhar-3009/Second-Brain — raw/source/entity/concept/synthesis organization ideas.
- PieroSierra/SecondBrain — local dashboard, import, ingestion, wiki and AI interaction ideas.
- WebObsidian — web UI directly over Markdown with Obsidian compatibility.
- open-second-brain / Hermes Agent — useful idea of a live Today/command-center view derived from the vault.

These projects are references, not templates to copy wholesale.

## Portal vision

The Portal should NOT simply be “Obsidian but prettier.”

It should feel like a **personal operating system**.

Primary navigation should eventually include:

- Home
- Capture
- Inbox
- Knowledge
- Projects
- Connections
- Agents
- Settings

The Home screen should answer:

- What is new?
- What am I working on?
- What needs attention?
- What can I do next?

The Portal should have a prominent universal capture box where Conor can type a thought without selecting a folder first.

Example:

> Internal IT teams seem more concerned with accountability around MDR than the underlying technology.

The system should preserve that original capture and let the Librarian organize it.

## Portal design direction

The selected design direction is a hybrid of:

- Personal OS
- Command Center
- Knowledge Explorer
- Agent Workspace

The interface should be modern, minimal, calm, and interactive without looking like a generic enterprise admin dashboard.

The knowledge graph can be useful as a supporting visualization, but it should not become the primary navigation mechanism. Search and lists must remain fast and useful.

The Portal should show source links and supporting notes when AI produces an answer.

## Portal architecture

The Portal should sit above the local system:

Portal
→ local application/API
→ Markdown vault / local indexes
→ n8n + Librarian + local model

The Portal must not become a second, competing source-of-truth database.

A likely eventual frontend direction is Next.js + TypeScript, but the first prototype should use mock data and prove the UX before connecting to the real vault.

## Search philosophy

Start simple.

Use filesystem/Obsidian search or a local full-text index first.

Do not introduce a vector database, embeddings, RAG stack, or other complex infrastructure until a real use case demonstrates the need.

Semantic search can be a later layer.

## Development phases

1. Understand the knowledge model.
2. Establish the Obsidian vault structure.
3. Define the Librarian.
4. Get local Llama integration working.
5. Build the first n8n ingestion workflow.
6. Automate Inbox → Librarian → Knowledge Base.
7. Connect Kindle Scribe.
8. Improve local search/retrieval.
9. Build the Portal with mock data, then connect it to the vault.
10. Add specialized agents.

## What success looks like

The system should eventually make Conor feel:

> “I don't need to know where this belongs. I just put it here, and my system takes care of the rest.”

The goal is not to build the most technically impressive system possible.

The goal is to build a useful personal information operating system that becomes more powerful over time while keeping the underlying knowledge private, portable, understandable, and under Conor's control.

## Current status

The GitHub repository has been initialized as the software/architecture home for the project.

The next major implementation step is to prototype the Portal UI with mock data and separately begin the minimal Librarian/Inbox pipeline. Avoid connecting to the real vault until the boundaries and workflow have been tested.

# Claude Code — Second Brain Operating Instructions

## Mission

Build and maintain a local-first personal knowledge system. Optimize for durable knowledge, privacy, simplicity, and interoperability—not for novelty.

## Read first

Before changing the project, read:

1. `README.md`
2. `docs/architecture.md`
3. `docs/knowledge-model.md`
4. `docs/librarian.md`
5. `docs/agent-permissions.md`
6. `docs/roadmap.md`

## Non-negotiable boundaries

- Never commit personal knowledge, private documents, mortgage/client data, credentials, API keys, tokens, or secrets.
- Never send sensitive vault content to a cloud model unless the user explicitly directs it and the workflow is designed for that purpose.
- Never silently delete or overwrite source knowledge.
- Prefer reversible operations and explicit staging.
- Keep the actual Obsidian vault separate from this software repository.
- Do not introduce a database as the canonical source of knowledge unless the architecture is deliberately revised.

## AI architecture

The system is model-agnostic.

- Claude Code: primary coding/build agent.
- ChatGPT: architecture, reasoning, research, planning, review, and user-facing collaboration.
- Ollama/local models: privacy-sensitive classification, extraction, summarization, and future local agents.
- n8n: orchestration and integrations where useful.
- Obsidian: initial human knowledge interface.
- Dashboard: future interface; do not overbuild it early.

## Librarian behavior

The Librarian is an organizational agent, not an autonomous author of truth.

For incoming material it should:

1. Preserve the original.
2. Identify the source and timestamp where available.
3. Classify the material.
4. Extract useful metadata.
5. Suggest or create links to related knowledge.
6. Route it to the appropriate location.
7. Flag ambiguity rather than guessing when confidence is low.

## Knowledge hierarchy

Use a simple hierarchy first. Prefer meaningful domains and concepts over excessive folder depth. Metadata and links should complement folders, not replace good information architecture.

## Coding standards

- Keep components small and composable.
- Prefer boring, inspectable solutions.
- Document architectural decisions.
- Add tests for behavior that can damage or corrupt knowledge.
- Keep configuration separate from secrets.
- Avoid unnecessary dependencies.
- Use clear names and explicit interfaces.

## Git workflow

Make focused commits. Use branches for substantial changes. Do not rewrite history or force-push unless explicitly requested.

When implementing a feature, explain the intended behavior in documentation before adding complex code.

## Definition of done

A change is complete when:

- It follows the architecture.
- It does not violate privacy boundaries.
- Documentation reflects the behavior.
- Tests or validation exist where appropriate.
- The change is reversible where practical.
- Another AI agent can understand the change from the repository alone.

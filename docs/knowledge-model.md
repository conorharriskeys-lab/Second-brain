# Knowledge Model

The knowledge model should be simple enough to maintain manually and structured enough for machines to understand.

## Core object types

- **Note** — durable knowledge, thought, explanation, or observation.
- **Source** — material imported from somewhere else.
- **Project** — work with a desired outcome.
- **Person** — a person relevant to knowledge or work.
- **Area** — an ongoing responsibility or domain.
- **Reference** — external material worth retaining or citing.
- **Decision** — a meaningful choice and its rationale.
- **Question** — something unresolved.
- **Task** — an actionable item.
- **Daily note** — time-oriented capture and reflection.

## Frontmatter

Use YAML frontmatter only where it adds durable value. A typical note can use:

```yaml
---
type: note
created: 2026-08-29
status: active
tags: []
source: ""
---
```

Do not turn every possible property into mandatory metadata.

## Linking

Prefer direct Markdown links between related concepts. Links should express a meaningful relationship, not merely increase graph density.

Useful relationship patterns include:

- supports
- contradicts
- derived-from
- related-to
- part-of
- decided-by
- follows-from
- references

## Atomicity

A note should contain a coherent idea or collection of tightly related ideas. Split material when doing so improves retrieval or reuse; do not fragment everything into tiny notes merely to satisfy an "atomic notes" ideology.

## Provenance

Imported or AI-generated material should retain provenance when practical. Preserve source links, filenames, dates, or conversation context so future users and agents can distinguish original observations from synthesized material.

## AI-generated knowledge

AI may propose summaries, tags, links, and classifications. It should not silently turn uncertain inference into fact. Generated material should be distinguishable during early stages of the system.

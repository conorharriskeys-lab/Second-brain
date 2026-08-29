# The Librarian

## Purpose

The Librarian is the first agent to build. Its job is to keep the knowledge base organized and useful without pretending to be the owner of truth.

## Responsibilities

- inspect new material
- identify document/source type
- extract lightweight metadata
- classify into a domain/type
- suggest relevant existing notes
- create links when confidence is high
- route material from inbox to the correct destination
- identify duplicates or near-duplicates
- flag uncertainty
- produce an audit trail for automated changes

## Explicit non-responsibilities

The Librarian should not:

- delete original source material
- invent facts
- make consequential personal decisions
- expose private data to external models by default
- reorganize the entire vault on every run
- rewrite established knowledge without a reason

## Processing contract

Input:

- source content
- source metadata where available
- destination knowledge-base configuration

Output:

- classification
- metadata proposal
- destination proposal
- link proposals
- confidence
- rationale
- proposed file content or patch
- processing status

## Confidence

High-confidence routine organization may be automated. Low-confidence decisions should enter a review queue.

A future implementation should use explicit thresholds rather than an opaque "AI thinks this belongs here" behavior.

## Idempotency

Processing the same source twice should not create duplicate knowledge. Each source should have a stable identifier or fingerprint where practical.

## Auditability

Every automated mutation should be traceable to:

- source
- timestamp
- agent/model
- operation
- resulting file(s)

## Build order

1. deterministic file routing
2. metadata extraction
3. duplicate detection
4. model-assisted classification
5. link suggestions
6. review queue
7. autonomous low-risk organization

Do not jump directly to step 7.

# Second Brain Portal — UI & Product Design

## Product thesis

The Portal is the **capture-and-work interface** for Conor's Second Brain.

It is not a prettier file browser and it is not the source of truth. Markdown remains the durable knowledge layer; the Portal makes capturing, organizing, retrieving, and acting on that knowledge effortless.

### Primary UX principle

> **Think first. Organize later.**

The user should never have to stop a live thought or sales conversation to decide which folder, tag, filename, or note type something belongs to.

---

# 1. The most important workflow: Capture

The Capture experience is the highest-priority feature in the entire Portal.

It must be extremely fast and low-friction for three situations:

1. **Live general note-taking**
2. **Live account/sales-call note-taking** for either N-able or Mortgage
3. **Pairing typed notes with Kindle Scribe handwritten notes**

The Portal should feel closer to a simple scratchpad/field notebook than a database form.

## Capture home

The first screen should offer three obvious modes:

```text
┌─────────────────────────────────────────────────────┐
│                                                     │
│                    SECOND BRAIN                     │
│                                                     │
│              What are you working on?              │
│                                                     │
│     ┌────────────┐  ┌────────────┐  ┌────────────┐ │
│     │  + QUICK   │  │  + SALES   │  │  + KINDLE  │ │
│     │    NOTE    │  │    CALL    │  │    PAIR    │ │
│     └────────────┘  └────────────┘  └────────────┘ │
│                                                     │
│              or just start typing...               │
│                                                     │
└─────────────────────────────────────────────────────┘
```

Do not force a user to navigate through the sidebar before capturing.

---

# 2. Quick Note

For thoughts, ideas, observations, reminders, learning, or anything that does not need a structured account record.

The UI should be essentially:

```text
┌─────────────────────────────────────────────────────┐
│ QUICK NOTE                                           │
│                                                     │
│                                                     │
│  Start typing...                                    │
│                                                     │
│                                                     │
│                                                     │
│                                                     │
│                                                     │
│                    [ Save ]                         │
└─────────────────────────────────────────────────────┘
```

Optional metadata can be suggested after capture by the Librarian. The user should not have to fill out metadata to save a note.

Keyboard shortcut / mobile quick action should eventually open Quick Note instantly.

---

# 3. Live Sales Call mode

This is a **first-class feature**, not merely a template.

The user needs to be able to take notes while actively speaking with an account.

The interaction should be optimized for speed, minimal clicks, and large readable controls.

## Starting a call

```text
START SALES CALL

[ N-ABLE ]       [ MORTGAGE ]

Account / Client
[ __________________________ ]

Contact
[ __________________________ ]

Call purpose (optional)
[ __________________________ ]

                    [ START CALL ]
```

The system creates a local working note immediately. It should NOT wait for the call to end.

## During the call

```text
┌─────────────────────────────────────────────────────┐
│ ● LIVE CALL                          32:14           │
│ ABC TECHNOLOGY — N-ABLE                             │
├─────────────────────────────────────────────────────┤
│                                                     │
│ QUICK CAPTURE                                       │
│ ┌─────────────────────────────────────────────────┐ │
│ │ Type a thought...                               │ │
│ └─────────────────────────────────────────────────┘ │
│                                                     │
│ [Pain] [Objection] [Need] [Competitor] [Next Step] │
│                                                     │
│ NOTES                                               │
│                                                     │
│ • Currently using SentinelOne                       │
│ • Concerned about MDR cost                          │
│ • Compliance becoming more important                │
│                                                     │
│ NEXT STEPS                                          │
│ ☐ Send MDR comparison                               │
│ ☐ Follow up Tuesday                                 │
│                                                     │
│ [ PAUSE ]                       [ END CALL ]        │
└─────────────────────────────────────────────────────┘
```

The quick buttons are optional accelerators, not mandatory fields. The user must always be able to simply type.

### Call note philosophy

The system should capture **raw observations during the call**.

After the call, the Librarian/AI can organize the note into:

- Account
- Contact
- Business context
- Pain points
- Needs
- Objections
- Competitors
- Products discussed
- Decisions
- Follow-up tasks
- Open questions
- Key quotes/observations

The raw live notes must remain recoverable.

---

# 4. N-able vs Mortgage

Sales capture should share the same underlying interaction model while allowing different fields and downstream organization.

### N-able

Useful optional prompts:

- Company
- Contact
- Employee count
- Current stack
- RMM
- EDR
- Backup
- MDR/SOC
- Compliance
- Pain points
- Budget
- Timeline
- Competitors
- Next step

### Mortgage

Useful optional prompts:

- Client(s)
- Purchase / refinance / renewal / other
- Property
- Employment/income context
- Down payment
- Credit considerations
- Existing mortgage
- Objectives
- Documents outstanding
- Lender considerations
- Next step

These are **capture aids**, not rigid forms. The Librarian should infer and structure information later where possible.

---

# 5. Kindle Pairing

This is another signature workflow.

The user should be able to pair handwritten Kindle Scribe notes with an existing digital note, account, project, or sales call.

Example:

```text
KINDLE PAIR

Recent Kindle imports

○  Aug 30 — Sales notes — handwritten
○  Aug 29 — N-able meeting
○  Aug 28 — Mortgage ideas

Pair with:

○  ABC Technology — Aug 30 call
○  Project: N-able MDR
○  Create new note

                [ PAIR ]
```

When paired, the system should preserve the Kindle source and associate it with the digital record.

Conceptually:

```text
Kindle handwritten note
          ↓
      OCR / import
          ↓
      ORIGINAL SOURCE
          │
          ├──────────────┐
          ↓              ↓
   Digital transcript   Linked account/call
          │              │
          └──────┬───────┘
                 ↓
             Librarian
                 ↓
       Organized knowledge
```

The handwritten original should remain available for reference.

---

# 6. Capture should work without classification

A critical rule:

**Never make the user classify information before saving it.**

For example, during a sales call, Conor should not have to choose:

`N-able > Sales > Accounts > ABC > Calls > 2026 > August`

He should simply write:

> They're happy with SentinelOne but don't feel like they're getting enough visibility.

The system captures it immediately.

The Librarian handles organization afterward.

---

# 7. Post-capture processing

After a live session ends, the Portal should offer a lightweight review state:

```text
CALL COMPLETE

ABC Technology — N-able

Captured:
• 18 notes
• 3 pain points
• 2 objections
• 4 follow-ups
• 1 competitor
• Kindle note attached

LIBRARIAN
✓ Classified
✓ Linked to account
✓ Linked to N-able / MDR
✓ Follow-ups identified

[ Review ]     [ Done ]
```

The AI should not silently turn raw notes into a polished account of the conversation without retaining the source capture.

---

# 8. Home / Today

Home is a **live command center**, not another note.

It should answer:

- What needs my attention?
- What did I capture recently?
- What calls/accounts am I working on?
- What is the Librarian processing?
- What projects are active?

Suggested structure:

```text
┌───────────────────────────────────────────────────────────┐
│ 🧠 SECOND BRAIN                            Search   +      │
│                                                           │
│ Good afternoon, Conor                                    │
│                                                           │
│ ┌───────────────────────────────────────────────────────┐ │
│ │ What do you want to capture?                          │ │
│ └───────────────────────────────────────────────────────┘ │
│                                                           │
│ [ Quick Note ] [ Sales Call ] [ Kindle ]                  │
│                                                           │
│ TODAY                                                     │
│ ┌────────────┐ ┌────────────┐ ┌────────────────────────┐ │
│ │ Inbox      │ │ Live/Recent│ │ Follow-ups             │ │
│ │ 12         │ │ Calls 3    │ │ 7                      │ │
│ └────────────┘ └────────────┘ └────────────────────────┘ │
│                                                           │
│ RECENT CAPTURE                                            │
│ • ABC Technology — N-able call                           │
│ • Kindle — MDR notes                                      │
│ • Mortgage client thought                                 │
│                                                           │
│ ACTIVE WORK                                               │
│ • Second Brain                                            │
│ • Mortgage Dashboard                                      │
│ • N-able / MDR                                            │
└───────────────────────────────────────────────────────────┘
```

---

# 9. Knowledge Explorer

Once captured information is organized, the Portal can provide richer exploration.

A knowledge item can show:

- Content
- Original source
- Related notes
- Related accounts
- Projects
- Concepts
- Tags
- Backlinks
- Timeline
- Agent actions

Graph visualization can exist as a secondary view, but should never be the primary way to navigate knowledge.

---

# 10. Agent Workspace

Initially:

```text
AGENTS

🧠 Librarian
Organize and connect my knowledge

```

Later:

```text
💼 Sales Coach
Analyze my calls and improve my selling

🔎 Researcher
Synthesize research from my knowledge base

✍️ Writer
Create from what I already know

🏠 Mortgage
Work with mortgage knowledge
```

The Sales Coach should eventually be able to query the structured sales-call history created by the capture system.

Example:

> Analyze my last 20 N-able calls and identify the objections I am weakest at handling.

The agent should cite/link the underlying call notes it used.

---

# 11. Navigation

Recommended primary navigation:

- **Home**
- **Capture**
- **Inbox**
- **Accounts**
- **Knowledge**
- **Projects**
- **Agents**

Accounts deserve their own first-class area because live sales/account capture is one of the system's primary workflows.

Potential account structure:

```text
ACCOUNTS
├── N-able
│   ├── ABC Technology
│   ├── XYZ MSP
│   └── ...
│
└── Mortgage
    ├── Client / Household
    ├── Client / Household
    └── ...
```

The underlying Markdown model should remain flexible enough that accounts are notes/entities rather than a separate database silo.

---

# 12. Technical architecture

```text
             CAPTURE PORTAL
                  │
       ┌──────────┼──────────┐
       ↓          ↓          ↓
    Quick      Sales       Kindle
     Note       Call       Pairing
       │          │          │
       └──────────┼──────────┘
                  ↓
               INBOX
                  ↓
          n8n / local workflow
                  ↓
             Local Llama
                  ↓
             LIBRARIAN
                  ↓
         Markdown / Obsidian
                  │
       ┌──────────┼──────────┐
       ↓          ↓          ↓
    Search     Dashboard   Agents
```

The Portal should communicate with a local service/API. It should not directly become a second permanent database.

For live capture, the local working state may temporarily exist in an application data structure, but the durable record should ultimately be Markdown/local files.

---

# 13. Offline / resilience requirement

Because live sales calls are a primary use case, capture must be resilient.

A dropped network connection, temporary AI failure, or n8n failure must **not lose typed notes**.

The capture workflow should save locally first and process asynchronously.

```text
TYPE NOTE
   ↓
LOCAL SAVE ✓
   ↓
Continue call
   ↓
Async processing
   ↓
Librarian
```

AI processing must never be on the critical path for saving a note.

---

# 14. Privacy

Sales and mortgage information may be sensitive.

The Portal should default to local processing/storage.

Cloud AI should be an explicit opt-in path, not an invisible dependency.

Never commit actual account/client information to the GitHub software repository.

Never place credentials or API keys in source code.

---

# 15. V1 prototype

The first visual prototype should prioritize the actual daily workflow over advanced knowledge-graph features.

### V1 must demonstrate:

1. Very fast Quick Note capture
2. Start/stop Live Sales Call
3. N-able vs Mortgage call context
4. Live note stream
5. Quick capture buttons for sales concepts
6. Local draft persistence concept
7. End-of-call review
8. Kindle pairing concept using mock imports
9. Inbox
10. Account detail page
11. Basic Knowledge view
12. Librarian status
13. Agent page with Librarian only

### V1 should NOT yet require:

- Real AI
- Real n8n integration
- Real Kindle integration
- Vector database
- Cloud database
- Multi-user support
- Autonomous agents
- Complex graph algorithms

Use realistic mock data to make the workflow feel real before wiring up infrastructure.

---

# 16. Design language

The Portal should feel like a **premium personal tool**, not an enterprise CRM.

Desired qualities:

- Calm
- Minimal
- Fast
- Highly legible
- Modern
- Slightly futuristic without being gimmicky
- Excellent keyboard interaction
- Excellent touch interaction
- Information-rich without clutter

Avoid:

- Generic admin-dashboard styling
- Excessive cards
- Giant colorful charts
- Decorative AI animations
- Making the graph the center of the experience
- Forms that feel like CRM data entry

The most important visual element is the **capture surface**.

---

# 17. North-star experience

A successful Portal should make this possible:

> Conor is on a sales call. He opens the Portal, taps **Start Call**, selects N-able, and immediately starts typing. He never thinks about folders, tags, filenames, or databases. After the call, he attaches the handwritten Kindle notes from the same meeting. The system preserves both sources, organizes them locally, links them to the account, identifies follow-ups, and makes the information available to future agents.

That is the core product.

Everything else is secondary.

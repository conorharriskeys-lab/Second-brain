# Agent Permissions

The system should use least privilege.

## Levels

### Read

May inspect knowledge and produce analysis. No mutations.

### Propose

May generate patches, classifications, links, and file proposals. Human approval required for mutations.

### Write

May perform narrowly scoped, reversible changes within an assigned workspace.

### Admin

May change architecture, permissions, automation, or destructive operations. Reserved for explicit human direction.

## Default policy

New agents start at **Read**. Promotion to Write must be deliberate.

## Protected operations

Require explicit approval:

- deleting knowledge
- bulk renaming or moving files
- rewriting established notes at scale
- changing privacy boundaries
- exporting sensitive information
- adding external data destinations
- changing automation that can mutate the vault broadly

## External model policy

Cloud AI should not receive private vault content by default. Any future cloud integration must document exactly what data leaves the local environment and why.

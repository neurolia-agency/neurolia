# AI Collaboration Standards

## Scope
These standards apply to all AI agents used in this repository.

## Source of Truth
- Shared standards in this file are authoritative.
- Tool-specific files may extend details but must not conflict.

## Code Quality
- Run relevant lint and tests before proposing a merge.
- Keep changes focused and atomic.
- Prefer minimal diffs over broad refactors unless explicitly requested.
- Keep scripts deterministic and idempotent when possible.

## Safety
- Never commit secrets, tokens, or private keys.
- Do not execute destructive commands unless explicitly requested.
- Validate filesystem write targets before running automation scripts.
- Keep runtime logs and transcripts out of version control.

## Git Workflow
- Use one branch per task.
- Keep commit messages explicit and scoped.
- Rebase on latest target branch before opening a PR.
- Avoid mixed commits across unrelated domains.

## Handoff Protocol
- Every substantial task has a spec in `.ai/shared/tasks/`.
- The active agent updates the task spec with:
  - assumptions
  - decisions
  - pending risks
- Before handoff, include a short execution summary and verification status.

## Documentation
- Add or update ADRs in `docs/adr/` for significant decisions.
- Record assumptions in task specs under `.ai/shared/tasks/`.

# Claude Agent Configuration

## Purpose
Claude-specific operating rules for this repository.

## Inheritance
- Shared standards: `.ai/shared/standards.md`
- Shared architecture: `.ai/shared/architecture.md`

## Execution Contract
- Run `scripts/ai/preflight.sh` before meaningful work.
- Use `scripts/ai/run-claude.sh` for stable invocation.
- Keep local run traces in `.ai/claude/runs/`.

## Collaboration Rules
- Update task spec in `.ai/shared/tasks/` after substantial changes.
- Use explicit file references in summaries.
- Do not write tool-agnostic policy here; keep it in shared docs.

## Notes
- Prompt templates are optional and currently not required.

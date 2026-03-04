# Gemini CLI Configuration

## Purpose
Gemini CLI-specific operating rules for this repository.

## Inheritance
- Shared standards: `.ai/shared/standards.md`
- Shared architecture: `.ai/shared/architecture.md`

## Execution Contract
- Run `scripts/ai/preflight.sh` before meaningful work.
- Start design sessions with `scripts/ai/run-gemini-design.sh`.
- `scripts/ai/run-gemini.sh` is kept as a compatibility alias to the design wrapper.
- Keep local run traces in `.ai/gemini/runs/`.
- Keep approval mode on `default` (manual approval for edits).

## Collaboration Rules
- Update task spec in `.ai/shared/tasks/` after substantial changes.
- Use explicit file references in summaries.
- Do not write tool-agnostic policy here; keep it in shared docs.
- Read `AI_CONTEXT_DESIGN.md` from the target project before proposing UI changes.

## Notes
- Prompt templates are optional and currently not required.

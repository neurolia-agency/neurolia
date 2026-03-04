# AI Workspace

Single workspace for multi-agent collaboration in this repository.

## Commands Reference
- See `.ai/COMMANDS.md` for the command cheat sheet.

## Quick Start
1. Copy `.env.example` to `.env` and set your keys locally.
2. Run `scripts/ai/preflight.sh`.
3. Execute one agent:
   - `scripts/ai/run-claude.sh`
   - `scripts/ai/run-gemini-design.sh`
4. Track task context in `.ai/shared/tasks/`.

## Operating Model
- Shared rules live in `.ai/shared/`.
- Tool-specific rules live in `.ai/claude/` and `.ai/gemini/`.
- Runtime artifacts are local only and excluded from git.

## Gemini Design Workflow
- Use `scripts/ai/run-gemini-design.sh` as the default Gemini entrypoint.
- The wrapper resolves project context automatically from `AI_CONTEXT_DESIGN.md`.
- If `AI_CONTEXT_DESIGN.md` is missing, fallback context is used with a warning-safe profile.
- Edits remain in manual approval mode by default.
- Legacy `scripts/ai/run-gemini.sh` delegates to the same design wrapper.
- To bootstrap a new project context file, use `scripts/ai/init-design-context.sh --project <path>`.
- To bootstrap both local launcher + context in one command, use `scripts/ai/bootstrap-design-project.sh --project <path>`.

## Branch Strategy
- Branch names:
  - `feat/<topic>-claude`
  - `feat/<topic>-gemini`
  - `fix/<topic>-claude`
  - `fix/<topic>-gemini`
- Prefer one agent branch per task for clean diffs.
- Merge through PR after lint/test checks.

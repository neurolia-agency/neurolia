# AI Tooling Architecture

## Objectives
- Run Claude Code and Gemini CLI in the same repository.
- Share one source of truth for engineering rules.
- Isolate tool-specific instructions and runtime artifacts.
- Keep runs reproducible through wrapper scripts.

## Directory Layout
- `.ai/shared/`: common conventions, architecture, and task specs.
- `.ai/claude/`: Claude-specific instructions and local run traces.
- `.ai/gemini/`: Gemini-specific instructions and local run traces.
- `scripts/ai/`: preflight + execution wrappers.
- `docs/adr/`: architecture decision records.

## Data Classification
- Versioned:
  - standards
  - architecture notes
  - task specs
  - ADRs
  - scripts
- Local only (gitignored):
  - run traces
  - logs
  - transcripts

## Execution Flow
1. Define or update task spec in `.ai/shared/tasks/`.
2. Run `scripts/ai/preflight.sh`.
3. Execute one agent through wrapper.
4. Validate with lint/tests.
5. Update task spec and, if needed, ADR.

## Conflict Management
- If both agents work on same scope, isolate by branch.
- Resolve by file ownership where possible.
- Prefer rebasing and replaying minimal commits over large manual merges.

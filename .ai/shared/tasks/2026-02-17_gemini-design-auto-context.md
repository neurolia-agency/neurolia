# Task: Gemini design auto-context wrappers

## Context
- Gemini should automatically load relevant design context when asked to work on a project.
- Current wrapper did not enforce project-specific context loading.

## Objective
- Enforce a reliable Gemini design entrypoint.
- Resolve project context automatically from `AI_CONTEXT_DESIGN.md`.
- Keep edit actions under manual approval.

## Constraints
- Keep compatibility with existing `scripts/ai/run-gemini.sh` usage.
- Avoid low-context sessions by default.

## Plan
1. Add `scripts/ai/resolve-design-context.sh`.
2. Add `scripts/ai/run-gemini-design.sh`.
3. Delegate `scripts/ai/run-gemini.sh` to design wrapper.
4. Add `scripts/ai/init-design-context.sh` template helper.
5. Update Gemini documentation and workspace guidance.

## Validation
- `bash -n scripts/ai/resolve-design-context.sh`
- `bash -n scripts/ai/run-gemini-design.sh`
- `bash -n scripts/ai/init-design-context.sh`
- `scripts/ai/run-gemini-design.sh --dry-run --project neurolia-site`

## Outcome
- Gemini design context loading becomes automatic and repeatable.

## Open Risks
- Context quality still depends on each project's `AI_CONTEXT_DESIGN.md` maintenance.

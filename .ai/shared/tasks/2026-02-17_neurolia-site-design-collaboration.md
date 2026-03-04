# Task: neurolia-site design collaboration baseline

## Context
- The project `neurolia-site` needs an explicit collaboration contract between Claude Code and Gemini CLI for design work.

## Objective
- Define what Gemini should read.
- Define what should be edited during design tasks.
- Standardize implementation and handoff flow.

## Constraints
- Keep `pipeline/output/` immutable.
- Respect existing project workflow and stack.
- Avoid noisy reads from generated/dependency directories.

## Plan
1. Add `neurolia-site/AI_CONTEXT_DESIGN.md`.
2. Reference it from `neurolia-site/CLAUDE.md`.
3. Keep validation commands explicit in the design workflow.

## Validation
- `cd neurolia-site && npm run lint`
- `cd neurolia-site && npm run dev`

## Outcome
- Collaboration rules are now explicit and versioned.

## Open Risks
- If both agents edit the same files concurrently, merge conflicts remain possible.

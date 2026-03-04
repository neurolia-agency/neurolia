# Task: Multi-agent Bootstrap

## Context
- Repository needs a stable shared setup for Claude Code and Gemini CLI.

## Objective
- Provide shared standards, tool-specific configuration, wrappers, and ignore rules.

## Constraints
- No secrets committed.
- Keep compatibility with existing repository structure.

## Plan
1. Create `.ai/shared`, `.ai/claude`, `.ai/gemini` structure.
2. Add executable wrappers in `scripts/ai/`.
3. Add ignore rules for runtime artifacts.
4. Add baseline documentation and templates.

## Validation
- `scripts/ai/preflight.sh`

## Outcome
- Bootstrap files and scripts created.

## Open Risks
- CLI binaries may not be installed on every machine.

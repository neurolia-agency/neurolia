---
name: render-audit
description: Visual audit tool for Remotion compositions. Renders key frames, analyzes composition/color/typography/animation quality, and produces a structured report. Use after coding a scene or before delivery.
---

# Render Audit

Render frames from a Remotion composition and produce a quality report.

## Quick Audit (8 frames)

```bash
COMP="DotServicesReel"
for f in 10 60 130 200 400 500 800 1050; do
  npx remotion still src/index.ts $COMP "out/audit-f${f}.png" --frame=$f 2>&1 | tail -1
done
```

## Full Audit (every 2 seconds)

```bash
COMP="DotServicesReel"
TOTAL=1110
for f in $(seq 0 60 $TOTAL); do
  npx remotion still src/index.ts $COMP "out/audit-f${f}.png" --frame=$f 2>&1 | tail -1
done
```

## Checklist

For each rendered frame, apply the checklist in [references/checklist.md](references/checklist.md).

## Report Format

```markdown
## Scene [N]: [Name] (frames X-Y)

| Frame | Status | Issue | Priority | Fix |
|-------|--------|-------|----------|-----|
| 130   | OK     | —     | —        | —   |
| 200   | ISSUE  | [description] | CRITIQUE/MOYEN/MINEUR | [file:line + values] |

### Summary
- CRITIQUE: N issues
- MOYEN: N issues
- MINEUR: N issues
```

## Cleanup

Always clean after audit:
```bash
rm out/audit-*.png
```

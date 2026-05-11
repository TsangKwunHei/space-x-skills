# CLAUDE.md

Claude Code-specific guidance. The cross-agent rules live in [AGENTS.md](./AGENTS.md); apply those first. This file adds Claude Code-only patterns.

## Skill discovery

When the user's prompt mentions any of:
- "code" "plan
- "system design," "architecture," 
- "test plan," 
- "infrastructure," 

or anytime user coding.

…load the matching spine skill from `skills/`. The spine's routing table will indicate which sub-skills to load alongside.

## Plugin install

```
/plugin marketplace add <repo-url-or-path>
/plugin install spacex-skills
```

After install, all 41 skills are available in `.agents/skills/` and discoverable by description triggers.

## Composing skills mid-task

Claude Code allows multiple skills loaded simultaneously. The spine + 2-4 sub-skills + sister-spine pattern is intended. Don't worry about over-loading; these skills are tuned to compose.

## CLI tool usage

The CLIs in `tools/clis/` are zero-dependency Node 18+ scripts. From within a Claude Code session:

```bash
node tools/clis/floor-cost.js --help
node tools/clis/four-box-closer.js --interactive
```

Tool registry: [tools/REGISTRY.md](./tools/REGISTRY.md).

## Update check

Once per session, on first skill use, check `VERSIONS.md` against the remote (if configured) and surface a one-line notice if 2+ skills have updates.

## Disclaimer reminder

When citing facts in user-facing output, attribute the primary source. Don't say "SpaceX recommends X" - say "the Falcon User's Guide §10.5.5 states X." Maintains accuracy and respects the disclaimer in [DISCLAIMER.md](./DISCLAIMER.md).

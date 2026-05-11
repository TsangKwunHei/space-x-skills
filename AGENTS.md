# AGENTS.md

Guidelines for AI agents working in this repository and for AI agents *consuming* the skills it ships.

## Repository Overview

This repository contains **Agent Skills** for AI agents following the [Agent Skills specification](https://agentskills.io/specification.md). Skills install to `.agents/skills/` (the cross-agent standard). The repo also serves as a **Claude Code plugin marketplace** via `.claude-plugin/marketplace.json`.

- **Name**: SpaceX Skills For Real Engineering
- **License**: MIT
- **Sources**: NASA CRS-7 IRT report, Falcon User's Guide v8, NAFCOM cost study, Maraia capsule paper

## What this set teaches an agent

Production-grade engineering discipline distilled from the most reliable rocket programs ever flown. Seven spine skills, thirty-four sub-skills, ten CLIs. Every claim is traceable to a primary NASA/SpaceX source.

The spine - the seven doors:

1. `first-principles-thinking` - reason from physics, not analogy
2. `system-engineering` - see graphs and blast radii, not features
3. `architecture` - anchor design axes to the historical failure corpus
4. `feedback-loops` - collapse the latency between deciding and discovering
5. `testing-sequencing` - fidelity ladder, ranked objectives, numeric retest triggers
6. `iterate-fast` - fail controlled, recover hardware as instrumentation, four-box closure
7. `infrastructure` - signed contracts, standard menus, versioned specs, lean orgs

Each spine skill routes to focused sub-skills when the work narrows.

## Repository Structure

```
spacex-skills/
├── .claude-plugin/marketplace.json   # Claude Code plugin marketplace manifest
├── .github/workflows/                # CI: validate skill spec compliance
├── skills/                           # 7 big skills in 3 phases
│   ├── 01-foundation/
│   │   └── <spine>/
│   │       ├── SKILL.md              # Required (see Agent Skills spec)
│   │       ├── subskills/*.md        # Focused sub-skills
│   │       └── references/           # Optional reference docs
│   ├── 02-design/
│   │   └── <spine>/...
│   └── 03-execution/
│       └── <spine>/...
├── tools/
│   ├── REGISTRY.md                   # Index of CLI tools
│   └── clis/                         # Zero-dep Node 18+ CLIs
├── docs/
│   ├── thesis.md                     # Why your agent thinks like a contractor
│   ├── how-skills-compose.md         # Routing + containment rules
│   ├── case-studies/
│   └── primary-sources/              # Summaries + page-citations of source PDFs
├── scripts/
│   ├── install.sh                    # Install spines to .agents/skills/
│   ├── validate-skills.sh            # Spec compliance check
│   ├── update-check.sh               # Compare VERSIONS.md to remote
│   └── migrate-cross-refs.js         # Layout migration helper (one-shot)
├── _research/                        # Fact banks extracted from primary sources
└── VERSIONS.md                       # Per-skill semver
```

## Containment rules (load-bearing)

- **Big skill (`SKILL.md`)** may reference: own `subskills/*.md`, own `references/`, other big skills' `SKILL.md` across categories. May NOT reference another spine's sub-skill directly.
- **Sub-skill** may reference: sister sub-skills in the same `subskills/` folder, own parent `SKILL.md` (`../SKILL.md`). May NOT reference content in other big-skill folders directly.
- **Cross-folder routing** always goes via the parent spine. The agent loads the chain.

## Agent Skills Specification

Skills follow the [Agent Skills spec](https://agentskills.io/specification.md).

### Required Frontmatter

```yaml
---
name: skill-name
description: What this skill does and when to use it. Include trigger phrases.
---
```

### Frontmatter Field Constraints

| Field         | Required | Constraints                                                      |
|---------------|----------|------------------------------------------------------------------|
| `name`        | Yes      | 1-64 chars, lowercase `a-z`, numbers, hyphens. Must match dir.   |
| `description` | Yes      | 1-1024 chars. Describe what it does and when to use it.          |
| `license`     | No       | License name (default: MIT)                                      |
| `metadata`    | No       | Key-value pairs (author, version, etc.)                          |

### Name Field Rules

- Lowercase letters, numbers, and hyphens only
- Cannot start or end with hyphen
- No consecutive hyphens (`--`)
- Must match parent directory name exactly

## How agents should consume these skills

**On a new task, the spine fires first.** When the user's prompt matches a spine description (e.g., mentions "industry standard," "post-mortem," "iterate"), load the spine. The spine SKILL.md contains a routing table - load the focused sub-skill that matches the narrowed work.

**Compose, don't choose.** The sub-skills are designed to load alongside their spine and alongside sister sub-skills. A "post-mortem on a flaky integration test" should load `iterate-fast` + `four-box-closure` + `feedback-loops` + `signal-determinism-check` simultaneously. That fan-out is the design.

**Cite when you act.** Every sub-skill names a primary source. When the agent applies a skill in an artifact (code, PR, doc), prefer citing the source ("CRS-7 IRT TF-4: non-deterministic telemetry"). It teaches the user to ground their own reasoning.

**"When NOT to use" sections are load-bearing.** If a skill says "do not use this for X," the agent MUST honor that boundary - even if a trigger fires.

## Writing Style Guidelines (for skill authors)

### Structure

- Keep `SKILL.md` under 500 lines (move long material to siblings or `docs/`)
- Use H2 (`##`) for main sections, H3 (`###`) for subsections
- Bullets and numbered lists liberally; short paragraphs (2-4 sentences max)

### Tone

- Direct and instructional
- Second person ("You are reasoning about X")
- Professional, technical, no marketing language inside SKILL.md

### Citation discipline

- Every quantitative claim cites a source: `(Falcon User's Guide §10.5.5)`, `(CRS-7 IRT TF-4)`, `(NAFCOM p. 3)`, `(Maraia p. 7)`
- Direct quotes use quotation marks and a source attribution
- No unsourced "best practice" claims - if it's not in the corpus, it doesn't go in the skill

## Composio / MCP

Out of scope for this repo today. The skills are pure prose + CLI utilities. MCP integrations may arrive in v0.2.

## Git Workflow

### Branch Naming

- New skills: `feature/skill-name`
- Improvements: `fix/skill-name-description`
- Documentation: `docs/description`

### Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification.

### Pull Request Checklist

- [ ] `name` matches directory name exactly
- [ ] `name` follows naming rules (lowercase, hyphens, no `--`)
- [ ] `description` is 1-1024 chars with trigger phrases
- [ ] `SKILL.md` is under 500 lines
- [ ] Every quantitative claim has a source citation
- [ ] No sensitive data, credentials, or unauthorized SpaceX/NASA logos

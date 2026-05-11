# How Skills Compose

The repo is laid out in **three phases**, each containing the **big skills** for that phase. Each big skill is self-contained: its own `SKILL.md`, its own `subskills/`, its own `references/`. Composition happens by routing - not by reaching across folder boundaries.

## The shape

```
skills/
├── 01-foundation/
│   └── first-principles-thinking/
│       ├── SKILL.md
│       ├── subskills/   ← cost-floor, assumption-audit, analogy-detector,
│       │                  capability-gates, re-derive-from-physics
│       └── references/
├── 02-design/
│   ├── system-engineering/   (subskills: graph, blast-radius, cascade,
│   │                          apex, interface-contract)
│   ├── architecture/         (subskills: corpus, fault-tier, forbidden,
│   │                          three-axes)
│   └── feedback-loops/       (subskills: loop-latency, determinism, co-location,
│                              pre-commit, two-speed, fudge-factor)
└── 03-execution/
    ├── testing-sequencing/   (subskills: fidelity-ladder, ranked-objectives,
    │                          numeric-retest, not-because-of-x)
    ├── iterate-fast/         (subskills: four-box, cheap-abort,
    │                          recovery-as-instrumentation, fail-controlled,
    │                          subscale-flight)
    └── infrastructure/       (subskills: signed-contracts, standard-menu,
                               machine-consumable, versioned-specs, lean-org)
```

Foundation sets the goal. Design shapes the system. Execution verifies, iterates, scales.

## The containment rules

This is the rule you can rely on when reading or extending a skill:

| Element | Can reference | Cannot reference |
|---|---|---|
| **Big skill (SKILL.md)** | Its own `subskills/`, its own `references/`, other big skills' `SKILL.md` (across categories) | Another big skill's sub-skills directly |
| **Sub-skill** | Sister sub-skills in the same `subskills/` folder, its own parent `SKILL.md` (`../SKILL.md`) | Anything in other big-skill folders directly |
| **Reference** | Same-folder content only | Anything outside its parent big-skill folder |

Cross-folder traffic always routes via the parent spine. If sub-skill A (under spine X) needs to "compose with" content in spine Y, the path is: A → X → Y → Y's relevant sub-skill. The agent loads the chain.

This is what keeps the surface looking simple (7 big skills, 3 phases) while the internals stay deep.

## Three patterns that compose

### Pattern 1: production is on fire

User prompt: *"prod is throwing 500s after the deploy, what should I check?"*

Agent route:

1. Loads `iterate-fast` (spine, 03-execution).
2. From its routing table, loads `subskills/four-box-closure.md` (own folder).
3. Sees a "compose with" pointer → loads `feedback-loops` (spine, 02-design).
4. From `feedback-loops`, loads `subskills/signal-determinism-check.md`.
5. Loads sister `subskills/loop-latency-measurement.md`.
6. From `feedback-loops`'s routing table → loads `system-engineering` → `subskills/cascade-tracing.md`.

Six skills, all loaded by routing through parents. None of them reach across folder boundaries directly.

### Pattern 2: estimate this for me

User prompt: *"how much would it cost to build a feature like X?"*

Route:

1. Loads `first-principles-thinking` (spine, 01-foundation).
2. Loads `subskills/cost-floor-derivation.md` and sister `subskills/assumption-audit.md`.
3. Routes to `infrastructure` (spine, 03-execution).
4. Loads `infrastructure`'s `subskills/lean-org-pattern.md`.
5. Runs `tools/clis/floor-cost.js` to back the answer with a number.

### Pattern 3: review my test plan

Route:

1. Loads `testing-sequencing` (spine).
2. Loads its 4 sub-skills (`fidelity-ladder-design`, `ranked-objectives`, `numeric-retest-trigger`, `not-because-of-x-clauses`).
3. Routes to `feedback-loops` (sister design spine), then to its `signal-determinism-check` sub-skill if telemetry/observability is in scope.
4. Runs `not-because-of-x.js` against the plan and `fidelity-ladder.js` to suggest missing rungs.

## Why containment beats free linking

Without rules, every skill would link to every other skill, and the agent's load graph would explode. With containment:

- The reader knows where to look for any concept (find its category, find its spine).
- The author has a clear scope (only sister sub-skills are reachable).
- The agent's load order is predictable (spine first, then sub-skills, then sibling spines if invoked).
- Refactoring a sub-skill cluster doesn't break links across the repo.

If you find yourself wanting to link from a sub-skill to a sub-skill in another folder, that is the signal that the cross-link belongs at the spine level - write or update a routing entry in the parent `SKILL.md` instead.

## Validation

`scripts/validate-skills.sh` enforces the structural shape: each category has spine folders, each spine has a valid `SKILL.md` and an optional `subskills/`, every `.md` has spec-compliant frontmatter and ≤500 lines. CI runs it on every PR.

The containment rules are enforced socially today (PR review). A future iteration of the validator can mechanically reject cross-folder sub-skill links if needed.

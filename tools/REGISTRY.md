# Tools Registry

Zero-dependency Node.js 18+ CLIs. Each maps to a sub-skill inside one of the seven big skills. Each does something useful in under a minute.

Run any tool with `--help` for full usage.

## Cost & first principles (01-foundation / first-principles-thinking)

### floor-cost.js

Decompose a cost into physics floor (workforce × loaded labor + material + infrastructure + multiplier + margin) and the overhead layered above it. Optional comparison to a quoted estimate, with the ratio interpreted against the NAFCOM 9× pattern.

Maps to: [`cost-floor-derivation`](../skills/01-foundation/first-principles-thinking/subskills/cost-floor-derivation.md)

```bash
node tools/clis/floor-cost.js --hours 1500000 --rate 200 --material 80000000 \
                              --infra 50000000 --multiplier 1.0 --estimate 3977000000
```

### assumption-audit.js

Scan a markdown / spec / PR / source file for analogy-reasoning markers ("industry standard," "best practice," "we've always," "vendor recommends"). Output: each match with line number and a re-derivation prompt.

Maps to: [`assumption-audit`](../skills/01-foundation/first-principles-thinking/subskills/assumption-audit.md)

```bash
node tools/clis/assumption-audit.js docs/architecture.md
git diff main | node tools/clis/assumption-audit.js -
```

## System graph (02-design / system-engineering, architecture)

### blast-radius.js

Read a system dependency graph (JSON: `{ nodes, edges }`); for every node, output direct dependents, full transitive blast radius, and apex flag.

Maps to: [`blast-radius-analysis`](../skills/02-design/system-engineering/subskills/blast-radius-analysis.md)

```bash
node tools/clis/blast-radius.js tools/clis/examples/checkout-graph.json
```

### axes-mapper.js

Cluster a failure history (JSON list of incidents with tags) into the top N primary axes. Reports cumulative percentage to anchor against the 91%-from-3-causes pattern.

Maps to: [`three-axes-decomposition`](../skills/02-design/architecture/subskills/three-axes-decomposition.md)

```bash
node tools/clis/axes-mapper.js --history tools/clis/examples/incident-history.json --top 3
```

## Feedback loops (02-design / feedback-loops)

### loop-latency.js

Score a feedback loop on cycle time, sharpness (signal specificity), and flake rate. Identifies the dominant weakness.

Maps to: [`loop-latency-measurement`](../skills/02-design/feedback-loops/subskills/loop-latency-measurement.md)

```bash
node tools/clis/loop-latency.js --action "deploy to staging" \
                                 --signal "smoke test pass/fail" \
                                 --cycle-seconds 300 --sharpness 4 --flake-rate 0.01
```

### signal-determinism.js

Scan an observability/telemetry config (yaml/json/conf) for buffering, sampling, lossy semantics, and other non-determinism red flags. Anchors against CRS-7 IRT TF-4.

Maps to: [`signal-determinism-check`](../skills/02-design/feedback-loops/subskills/signal-determinism-check.md)

```bash
node tools/clis/signal-determinism.js otel-collector.yaml fluent-bit.conf
```

## Testing sequencing (03-execution / testing-sequencing)

### fidelity-ladder.js

Generate a cheapest-first test sequence for a goal. Built-in ladders for `SOFTWARE` (lint → unit → property → integration → chaos → canary), `HARDWARE` (sim → bench → subscale → ground → flight), and `SCIENCE` (literature → toy → pilot → pre-reg → replication).

Maps to: [`fidelity-ladder-design`](../skills/03-execution/testing-sequencing/subskills/fidelity-ladder-design.md)

```bash
node tools/clis/fidelity-ladder.js --goal "verify async retry under network partition" \
                                    --domain SOFTWARE
```

### not-because-of-x.js

Append "not because of X" pass-criteria clauses to a test plan, classified by domain (network / data / ui / perf). Hardens against accidental passes.

Maps to: [`not-because-of-x-clauses`](../skills/03-execution/testing-sequencing/subskills/not-because-of-x-clauses.md)

```bash
node tools/clis/not-because-of-x.js test-plan.md > test-plan-hardened.md
```

## Iterate fast (03-execution / iterate-fast)

### four-box-closer.js

Verify an anomaly closure has all four boxes filled and substantive: root cause + design change + test + doc. Scores each box for length, mechanism language ("because", "due to"), and artifact references.

Maps to: [`four-box-closure`](../skills/03-execution/iterate-fast/subskills/four-box-closure.md)

```bash
node tools/clis/four-box-closer.js --anomaly "auth token rotation broke gateway" \
  --root-cause "..." --design-change "..." --test "..." --doc "..."
```

## Architecture (02-design / architecture)

### forbidden-list.js

Initialize, validate, and grep code against a versioned forbidden-pattern YAML. Ships with starter entries derived from CRS-7 (industrial-grade-on-flight-critical, non-deterministic-telemetry) and Maraia (skip-the-cheap-rung, three-of-four-closure).

Maps to: [`forbidden-list`](../skills/02-design/architecture/subskills/forbidden-list.md)

```bash
node tools/clis/forbidden-list.js --init
node tools/clis/forbidden-list.js --validate forbidden.yaml
node tools/clis/forbidden-list.js --check-source src/main.ts --against forbidden.yaml
```

## Build

```bash
# Syntax check all CLIs
for f in tools/clis/*.js; do node --check "$f"; done

# Smoke test all --help
for f in tools/clis/*.js; do node "$f" --help > /dev/null && echo "ok: $(basename $f)"; done
```

CI runs both checks on every PR.

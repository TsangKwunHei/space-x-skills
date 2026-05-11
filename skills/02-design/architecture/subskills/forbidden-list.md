---
name: forbidden-list
description: Publish the explicit list of patterns rejected from the system, with rationale and source incident. Load this when writing or reviewing an architecture spec, after closing an incident root cause, debating a "should we ever do X again?" pattern, hardening a code review process, building a CI check, or onboarding a new engineer who needs to know what NOT to do. The reflex this trains: an architecture that lists only the allowed configurations forces every reviewer to silently re-derive the prohibitions, and they will not. The "no" list is as load-bearing as the "yes" table.
---

# Forbidden List

The Falcon User's Guide spends as much ink on what you cannot do as on what you can. §6.4.2.2 / Table 6-5 spells out pressure vessel types from safest to riskiest:

- Type 1 (all metallic): standard rules
- Type 2 (metallic liner + hoop overwrap): allowed
- Type 3 (metallic liner + full overwrap): allowed
- Type 4 (non-metallic liner + composite overwrap): **"use is discouraged"**
- Type 5 (all composite): **"N/A"** - not allowed

Plus explicit prohibitions: "No additively manufactured tanks." "No bimetallic welded joints." "No pressure tanks that require pressure stabilization to hold external structural load." "No Type 2, 3, 4, or 5 pressurized-structure tanks where non-pressure loading makes up more than 15% of maximum combined flight stress" (paraphrased from principles-to-skills-map.md L173, citing Falcon User's Guide §6.4.2.2).

These prohibitions encode collective scar tissue. Every "No X" is an incident or a class of incidents that someone paid for already. A spec without a forbidden list is one where every reviewer is silently re-deriving why those configurations are bad, and they will not.

## What this is

A forbidden list is the published, versioned set of patterns rejected from the system, each with a one-line rationale and a primary-source citation to the incident or principle that drove the prohibition. It lives in the same repo as the architecture spec. It is read at design review, at code review, and at CI time. New entries are added when the failure corpus grows.

The list complements the architecture spec's "yes" table. Both are first-class artifacts.

## When to use this

- After closing an incident with a clear root cause that maps to a pattern (not just to a single buggy line)
- During an architecture review, when patterns are being chosen - the no-list constrains the choices
- During code review, as a checklist of "things that look fine but should never ship"
- When onboarding a new engineer or a new team - the forbidden list is the fastest way to inherit scar tissue
- When building a CI / linter rule - the no-list is the source for the regex
- When auditing an existing system: which forbidden patterns slipped in despite the rule?

## When NOT to use this

- Style preferences masquerading as forbidden patterns ("no abbreviated variable names") - that is a style guide, not a forbidden list. The forbidden list earns its line by pointing at an incident.
- New, untested rules with no incident behind them. A "we think this might be bad" gets a docs page, not a forbidden-list entry. The list loses authority if entries are speculative.
- Bugs that are already caught by the type system, the tests, or normal review. The forbidden list is for patterns that look fine but are not.

## How to apply

1. **Each entry has five fields:** id, pattern (matchable - regex, AST shape, configuration value), rationale (≤3 lines), alternative (what to do instead), severity (critical / high / info), source (primary-source citation), and added-on date. The shape is enforced by `tools/clis/forbidden-list.js` - the CLI generates a starter file and validates entries.

2. **Write the rationale from the source incident.** "CRS-7 IRT TF-1: industrial-grade rod end at flight-critical cryogenic load path destroyed Falcon 9 in ~800ms. SpaceX did not apply manufacturer's 4:1 derating recommendation." Not "industrial-grade is generally bad." The incident is the rationale.

3. **Severity drives enforcement.** Critical = block CI. High = warn but allow. Info = note in review. The Falcon equivalent is the prose: "use is discouraged" (Type 4) is a high; "N/A" (Type 5) is critical. "No additively manufactured tanks" is critical - there is no waiver path in the spec.

4. **Always pair "no" with "instead."** The Type 5 entry comes with Type 1 as the default. The "no industrial-grade in flight-critical" entry comes with "aerospace-grade, or industrial + manufacturer's 4:1 derating + screening + load test under flight conditions" as the alternative. A no-list without alternatives is a wall; with alternatives, it is a fence with a gate.

5. **Update the list after every closed anomaly.** The Maraia Flight #1 eyebolt anomaly produced a design change: "the electrical setup of this system was modified for future flights" (Maraia p.5). That kind of fix earns a forbidden-list entry: "no burn-circuit electrical connection that depends on a non-rotating geometry without strain relief." The list grows as the corpus grows.

6. **Refuse three-of-four anomaly closure.** Maraia framing requires that an anomaly be closed on all four boxes: root cause named, design updated, test now catches it, documentation revised (principles-to-skills-map.md Principle 33). A closure that lists root cause and design fix but leaves the doc / test boxes empty is not a closure - and if you close it without the forbidden-list entry, the next person re-derives the lesson at their own cost. See four-box-closure (route via your parent spine to iterate-fast).

7. **Use the CLI.** From the repo root: `node tools/clis/forbidden-list.js --init` to scaffold a starter `forbidden.yaml`. `--validate <file>` checks entry shape. `--check-source <code-file> --against <forbidden.yaml>` greps source for forbidden patterns. The starter template ships with the CRS-7 industrial-grade rule and the non-deterministic-telemetry rule pre-filled.

## Worked example

A backend team has three closed S1 incidents in the last quarter. They run the forbidden-list discipline.

- Incident 1: a deployment dropped database writes because a connection-pool config was reused across two services and one service's traffic spiked. Forbidden-list entry: `id: shared-pool-across-services`; `pattern: "pool_size.*shared"`; rationale points to the incident ticket; alternative: per-service pool with explicit reservation; severity: high.
- Incident 2: a feature flag was rolled out to 100% of traffic without a gradual ramp because the flag system did not support percentages. Forbidden-list entry: `id: instant-100-percent-rollout`; `pattern: detected at the flag-system level via config audit`; rationale: the incident; alternative: 1% → 10% → 50% → 100% with bake time; severity: critical.
- Incident 3: a logging bug was masked because the log line concatenated user input into the format string. Forbidden-list entry: `id: format-string-with-user-input`; `pattern: "logger.(info|warn|error)\\(.*\\$\\{.*input"`; rationale: incident; alternative: structured logging with named fields; severity: critical.

CRS-7-class entries also live on the list as analogs: industrial-grade-on-flight-critical (TF-1), non-deterministic-telemetry (TF-4), and three-of-four anomaly closure (Maraia). The CLI's `--check-source` flag now greps every PR diff against the YAML, surfacing matches at review time.

The first quarter the list exists, three PRs trip on `format-string-with-user-input`. None of those PRs were written by the engineer who debugged the incident. The list propagated the lesson without the lesson having to be re-experienced.

## Anti-pattern

The "tribal knowledge" architecture: the senior engineers know what is forbidden, and they catch it at code review. New engineers learn by being told no in PR comments. Eventually a senior engineer leaves, the next senior engineer has slightly different priors, and the prohibition softens by attrition.

CRS-7 is the worst-case version. The manufacturer's data sheet for the 17-4 PH SS rod end recommended a 4:1 factor of safety for industrial-grade applications (CRS-7 IRT p.7). The recommendation was published. SpaceX did not apply it. The IRT's TF-1 records that the use was "without regard to the manufacturer's recommendations" (CRS-7 IRT TF-1, p.8). Putting "no industrial-grade hardware in flight-critical paths without manufacturer-recommended derating, screening, and load test under flight conditions" on a published forbidden list - at the architecture level, not buried in a parts catalog - is the kind of countermeasure this skill encodes.

A second example from CRS-7: the non-deterministic telemetry. "SpaceX's new implementation (for Falcon 9 'Full Thrust' flights) of non-deterministic network packets in their flight telemetry increases latency, directly resulting in substantial portions of the anomaly data being lost due to network buffering in the Stage 2 flight computer" (CRS-7 IRT TF-4, p.8). Non-deterministic telemetry on flight-critical signal paths is now a forbidden-list candidate everywhere the lesson applies - observability included.

## Related skills

- Parent: [architecture](../SKILL.md)
- Pairs with: [failure-corpus-mapping](failure-corpus-mapping.md) - every new corpus entry is a candidate forbidden-list rule
- Pairs with: four-box-closure (route via your parent spine to iterate-fast) - anomaly closure produces forbidden-list entries; without them, the loop is open
- Compose with: versioned-specs (route via your parent spine to infrastructure) - the forbidden list is a versioned artifact, not a wiki page
- Compose with: machine-consumable-artifacts (route via your parent spine to infrastructure) - the YAML is parseable; CI consumes it directly

## Source

- Primary: Falcon User's Guide §6.4.2.2 / Table 6-5 (pressure vessel types 1–5; Type 4 "use is discouraged"; Type 5 "N/A"; "No additively manufactured tanks"; "No bimetallic welded joints"; the 15% rule)
- Primary: CRS-7 IRT TF-1, p.8 (industrial-grade rod end without manufacturer's 4:1 derating, without screening, without load test under flight conditions - the source incident for the industrial-grade-on-flight-critical entry)
- Primary: CRS-7 IRT TF-4, p.8 (non-deterministic network packets in flight telemetry - the source for the non-deterministic-telemetry entry)
- Primary: Maraia p.5, Sec. III.A (eyebolt + burn-circuit anomaly producing a design change carried into future flights - the four-box closure pattern)
- Tool: `tools/clis/forbidden-list.js` - `--init`, `--validate`, `--check-source`
- Secondary: principles-to-skills-map.md Principle 11 (forbidden list is as load-bearing as the allowed-types table); Principle 33 (four-box closure)

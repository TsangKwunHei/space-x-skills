---
name: loop-latency-measurement
description: Quantify the time between deciding and discovering - cycle time, signal sharpness, and flake rate - because that latency, not your IQ, dominates reliability. Use this skill whenever the user asks "why is our debug loop so slow," proposes a CI rework, complains about flaky tests, evaluates an observability stack, or weighs co-location vs remote handoffs. Especially load this when someone defends a 30-minute CI as "thorough" or proposes adding a ticket layer between two teams that currently talk in person.
---

# Loop Latency Measurement

The CRS-7 IRT spent the better part of three years reconstructing an 800-to-900-millisecond failure window from a fault tree because the raw signal had been buffered into oblivion. Of 115 telemetry indications recorded during the anomaly, 9 were never explained (CRS-7 IRT p.6). The vehicle "went from flying fine to conflagration in less than a second, or 'within a blink of an eye'" (CRS-7 IRT p.5). At that scale, every millisecond of loop latency mattered. The loop lost.

Now compare Hawthorne. The Falcon User's Guide §1.2 names co-location as a deliberate latency move: "vehicle design teams are co-located with production and quality assurance staff to tighten the critical feedback loop." A defect on the production floor is a 30-meter walk from the designer's desk, not a two-week ticket round-trip. Same company, same era - different loops, different latencies, different outcomes.

## What this is

Loop latency measurement is the discipline of putting a number on the gap between a decision and the evidence that confirms or denies it. The number has three components, and you need all three:

1. **Cycle time** - wall-clock seconds from action to evidence.
2. **Sharpness** - how specifically the evidence points at the thing you wanted to verify (0 = "didn't crash," 10 = "indication 47 matched within tolerance, root-cause-tagged").
3. **Flake rate** - fraction of runs where the loop lies (false pass + false fail).

A loop with 30-minute cycle time, sharpness 2, and 5% flake is not "slow but reliable." It is a coin flip wearing a uniform, and it will train your team to ignore failures.

## When to use this

- Someone proposes a CI redesign, observability stack swap, or telemetry change. Demand a before/after on all three axes.
- A debug session is dragging because evidence is hours behind the decision. Measure the loop before debugging the code.
- Two teams communicate by ticket and the round-trip is in days. Quantify the latency, then decide whether to co-locate, embed, or both.
- Flaky tests are being retried instead of fixed. Compute the flake rate and treat anything over 0% as a P0 against the loop.

## When NOT to use this

- Loops that already run in seconds, return sharp signals, and are deterministic. Move on; they are working.
- One-off investigations where there is no repeating loop to optimize.
- Decisions about whether to build the thing at all. Latency measurement is a how-to-build-it skill, not a should-we-build-it skill.

## How to apply

1. **Name the loop in three lines.** What action are you taking? What signal returns? How long does it take? If you cannot write those three lines, you do not have a loop - you have a hope. The IRT could write those lines for the fault-tree blocks they closed; they could not write them for the 9 buffered indications (CRS-7 IRT p.6).

2. **Time the cycle.** Wall clock, action to first usable evidence. Not "until the report finishes," but until you can act. A test suite that runs in 2 seconds and reports in 12 minutes has a 12-minute loop, not a 2-second one, until you fix the reporting path.

3. **Score the sharpness.** Take the last five signals the loop produced. For each, ask: did it tell you exactly what failed, or did it say "something failed somewhere"? "Process exited 1" is sharpness 1. "Assertion at line 84 failed: expected 100 m/s ejection velocity, got 87 m/s" (Maraia p.8) is sharpness 9.

4. **Measure flake.** Run the loop 100 times against an unchanged input. Count disagreements with the median. Anything above 0% is debt; above 1% is a debugging trap because it lies just often enough to mislead and just rarely enough to ignore.

5. **Identify the dominant weakness.** One axis is always worst. Fix that one before touching the others. Doubling cycle-time speed when sharpness is 2 just means you get vague answers faster.

6. **Re-measure after every change.** A "speedup" that drops sharpness from 8 to 4 is a regression. A determinism fix that doubles cycle time is usually still a win, because flake compounds across runs in ways speed does not.

## Worked example

A team complains that their integration tests "feel slow." They run a measurement.

- **Action**: merge to main triggers integration suite.
- **Signal**: pass/fail email plus link to a 4,000-line log.
- **Cycle time**: 47 minutes (median over last 50 runs).
- **Sharpness**: 2. The email says "integration suite failed (3 failures)." Engineers must open the log, search for "FAIL," scroll, and guess.
- **Flake rate**: 6%. Re-running an unchanged commit produces a different result roughly one run in seventeen.

Dominant weakness: flake rate. At 6%, every red is presumed a flake until proven otherwise. The team has trained itself to retry instead of investigate. Speeding the loop from 47 to 12 minutes would not help - it would just deliver the lie faster.

Fix order: harden determinism first (pin time, seed RNGs, isolate test DB, fix shared-fixture races). Re-measure. Then sharpen the signal (assert on specific symptom, surface the failing assertion in the email subject line). Then attack cycle time.

Use the CLI to score concrete loops:

```bash
node tools/clis/loop-latency.js \
  --action "merge to main triggers integration suite" \
  --signal "pass/fail email plus 4000-line log" \
  --cycle-seconds 2820 \
  --sharpness 2 \
  --flake-rate 0.06
```

The tool outputs each axis score, the dominant weakness, and the implied fix order.

## Anti-pattern

A team brags that their CI runs in 8 minutes. Asked about flake rate: "we just retry." Asked about sharpness: "the log has everything you need." This is a loop that has optimized one axis (cycle time), measured it (8 minutes), and declared victory. The other two axes are unmeasured precisely because measuring them would force action. The 6% flake means roughly 1 in 17 merges sees a red that gets retried green; under load, real failures slip through with the flakes. The vague signal means an engineer spends 20 minutes finding the failing line, swamping the 8-minute "fast" run.

The CRS-7 telemetry switch was the same anti-pattern at flight scale: a modernization that improved one axis (throughput) at the cost of determinism (TF-4, CRS-7 IRT p.8: "non-deterministic network packets in their flight telemetry increases latency, directly resulting in substantial portions of the anomaly data being lost due to network buffering"). Throughput up, determinism down, loop dead at the moment it was needed most.

## Related skills

- Parent: [feedback-loops](../SKILL.md)
- Pairs with: [signal-determinism-check](signal-determinism-check.md) - flake rate and determinism are the same number from two angles
- Pairs with: [co-location-pattern](co-location-pattern.md) - co-location is a cycle-time fix at the org layer
- Compose with: iterate-fast (route via the feedback-loops spine, then to iterate-fast) - fast iteration requires a measured, fast loop underneath

## Source

- Primary: CRS-7 IRT TF-4, p.8 (telemetry buffering); CRS-7 IRT p.5–6 (115 indications, 9 unexplained, "blink of an eye"); Falcon User's Guide §1.2, p.1 (Hawthorne co-location to "tighten the critical feedback loop"); Maraia p.8 (100 m/s ejection-velocity criterion as a sharp signal)
- Tool: `tools/clis/loop-latency.js`

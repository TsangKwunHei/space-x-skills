---
name: feedback-loops
description: Shorten the latency between deciding and discovering - that latency, not your IQ, dominates reliability. Use this skill whenever the user mentions debugging speed, telemetry, observability, monitoring, dev loops, CI cycle time, post-mortems that stalled for lack of data, or asks "why didn't we catch this earlier?" Especially load this skill before approving a new logging architecture, a CI redesign, or a process that puts a wall between designers and operators - buffered feedback at the moment you most need data is the cardinal sin.
---

# Feedback Loops

On June 28, 2015, the SpaceX CRS-7 vehicle came apart in an 800 to 900 millisecond window. The NASA Independent Review Team showed up to investigate and hit a wall. SpaceX had recently switched the Falcon 9 telemetry architecture to non-deterministic network packets. Technical Finding #4 named the consequence directly: "non-deterministic network packets in their flight telemetry increases latency, directly resulting in substantial portions of the anomaly data being lost due to network buffering in the Stage 2 flight computer."

Out of 115 telemetry indications during the failure window, 9 were never explained. The signal had been lost at the exact moment the team most needed it.

Now contrast with the discipline. SpaceX's Hawthorne facility houses Dragon, Falcon 9, Falcon Heavy, and Merlin under one roof. The Falcon User's Guide §1.3 states it plainly: "vehicle design teams are co-located with production and quality assurance staff to tighten the critical feedback loop." Same company, same period - a near-loss of feedback in flight, paired with a deliberate reduction of feedback latency on the production floor.

The lesson: the latency between deciding and discovering dominates reliability. A 30-second flaky loop is barely better than no loop. A 2-second deterministic loop is a debugging superpower.

## What this is

A feedback loop is not a log file. It is the closed circuit between a decision you make and the evidence that tells you whether that decision was right. The skill is to treat the loop itself as the product: name what you are verifying, name what signal proves it, measure how long the signal takes to arrive, and harden it against drift.

When you see the loop as the product, three questions become automatic. How long is the cycle? How sharp is the signal? How often does the loop lie to you? A loop that takes 30 minutes to return a vague pass is not a loop - it is a coin flip wearing a uniform.

## In practice

### The trap: CRS-7 telemetry buffering

The IRT's investigation into CRS-7 had to reconstruct the failure window from a fault tree because the raw signal was incomplete. Of 115 telemetry indications during the anomaly window, 9 were never explained. The architecture had been switched to non-deterministic network packets, which sounded modern and decoupled, and which buffered in the Stage 2 flight computer at exactly the moment the data was needed.

Technical Recommendation TR-3 was blunt: "SpaceX needs to re-think new telemetry architecture and greatly improve their telemetry implementation documentation." Losing the loop at the moment you most need the data is the cardinal sin of feedback design. A modernization that improves throughput at the cost of determinism is a regression dressed as progress.

### The disciplined move: Hawthorne co-location

The Falcon User's Guide §1.3 describes Hawthorne as housing Dragon, Falcon 9, Falcon Heavy, and Merlin under one roof - and locates "vehicle design teams co-located with production and quality assurance staff to tighten the critical feedback loop."

The latency reduction is physical, not procedural. A designer learns about a production defect by walking 30 meters and seeing the part on a bench, not by waiting for a ticket to round-trip in two weeks. Two weeks is enough time for the design to advance, for the defect to recur on three more units, and for the original context to evaporate. Co-location collapses that loop to minutes. The two-week ticket is not a process problem; it is a latency problem.

### The disciplined move: hold-down on the pad

Falcon User's Guide §10.5.5 describes the launch sequence: "Engine ignition occurs shortly before liftoff, while the vehicle is held down at the base via hydraulic clamps. The flight computer evaluates engine ignition and full-power performance during the prelaunch hold-down, and if nominal criteria are satisfied, the hydraulic release system is activated at T-0. A safe shutdown is executed should any off-nominal condition be detected."

This is a feedback loop on the irreversible action. Once the clamps release, the vehicle is committed. So the loop is moved before commitment: light the engines in the final flight configuration, evaluate full-power performance with real propellant flow and real chamber pressure, and only then release. The signal arrives in seconds, in the actual environment, before any irreversible step. A deploy script that runs all checks against staging and then executes irreversibly against production has skipped this rung.

### The disciplined move: two-speed reporting

Falcon's customer reporting runs at two deliberate speeds. An orbit injection report is delivered at separation plus a small fixed offset - best-estimate state vector, immediate, customer unblocked. A flight report follows at L+8 weeks - full environments, anomalies, root causes, with time to compute properly.

Two loops, two deadlines, both shipped. The fast loop unblocks the next decision. The slow loop teaches the next design. Conflating them - waiting 8 weeks for the unblock signal, or rushing the root cause to fit a same-day deadline - collapses both. If you only have one report cadence, you have already starved one of the two real audiences.

### The disciplined move: Maraia post-flight model match

The Maraia post-flight reconstruction systematically adjusted the simulation aerodynamic model until predictions matched flight data. The report is specific: "A constant value of -0.078 was added to C_A in order to achieve this matching."

The next design inherits the correction because it lives in the simulator, not in a lessons-learned PDF. A flight finding that updates the model gets applied automatically the next time someone runs an analysis. A flight finding filed in a wiki page gets applied if a human remembers it exists, finds it, and reads to the bottom. The fudge factor in the simulator is the loop closing into the model. The wiki page is the loop dying.

## How to apply

1. **Identify the loop.** Name what you are trying to verify, what signal tells you, and how long the signal takes to arrive. If you cannot write those three lines down, you do not have a loop - you have a hope. The IRT could write those lines for the fault-tree pieces they could close, and could not write them for the 9 indications buffered into oblivion.

2. **Measure the loop on three axes.** Cycle time - how fast from action to evidence. Sharpness - how specific the signal is to the thing you care about. Determinism - how repeatable the loop is. A 50%-flake loop is debuggable; a 1%-flake loop will mislead you for months because it will pass when it should fail and you will have no way to tell which run was honest.

3. **Shorten cycle time.** Co-locate participants. Skip queue depth. Cache fixtures. Run it locally before remote. Hawthorne tightened the design-to-production loop by collapsing distance to meters; do the equivalent in your stack - a `make test` that runs in 2 seconds beats a CI job that runs in 12 minutes, every time, even when the CI job is more thorough.

4. **Sharpen the signal.** Assert on the specific symptom, not "didn't crash" and not "process exited 0." A pass that proves the wrong thing is worse than no pass, because the green check teaches the team to stop looking. The hold-down sequence does not assert "engines are on" - it asserts full-power performance against nominal criteria, in flight configuration.

5. **Harden determinism.** Pin time. Seed every RNG. Fix the network. Hold inputs constant. The CRS-7 telemetry switch failed the determinism axis: under load, packets buffered non-deterministically, so the same physical event produced different recorded signals. Keep raising determinism until the loop is debuggable; if a flake survives, treat it as a P0 bug in the loop, not a quirk to retry around.

6. **Propagate findings into models, not reports.** The Maraia C_A correction lives in the simulator and applies on the next run, automatically. A post-mortem doc that nobody reads does not get written, and if written, does not get found. Every finding worth keeping should land in a place the next decision will pass through.

## Do

- Treat the feedback loop as the product. Iterate on the loop itself before iterating on the thing it measures. A team that ships a 2-second deterministic loop has bought a year of velocity on every project that uses it.
- Co-locate. The two-week ticket round-trip is a latency problem, not a process problem. Hawthorne put design and production under one roof on purpose.
- Build hold-down checks for irreversible actions. Light the engines in the final configuration, evaluate, then release. Do not commit before the loop has closed.
- Run two-speed reporting. An "unblock now" signal at separation. A "learn from it" report on a fixed deadline weeks later. Both shipped, neither conflated.
- Push every flight finding into the model. The Maraia simulator carries -0.078 on C_A so the next design inherits the correction without anyone having to remember it.
- Pair fast feedback with sharp assertions. "Process exited 0" is not a signal; "telemetry indication 47 matched within tolerance" is.

## Do not

- Do not lose the signal to buffering, sampling, or "we'll log everything and grep later." The CRS-7 Stage 2 flight computer buffered non-deterministic packets and 9 of 115 indications were lost. Buffering at the moment of the event is the cardinal sin.
- Do not file the post-mortem in a doc nobody reads. That document does not get written, and if written, does not get found, and if found, does not get applied. Land the finding in the simulator, the test suite, the deploy gate - somewhere the next decision passes through.
- Do not accept hour-long aborts when minute-long aborts are physically possible. Cheap rollback lets you keep strict gates without inviting silent loosening; expensive rollback creates pressure to wave the gate.
- Do not separate design from operations by a wall. The feedback latency will eat you. The Falcon User's Guide makes Hawthorne co-location a stated design move, not an accident of real estate.
- Do not present flight data as "confirming the model" when the model needed a fudge factor to match. The Maraia reconstruction names the -0.078 on C_A explicitly. An unnamed correction is a lie that the next engineer will inherit without warning.
- Do not modernize the telemetry architecture without proving determinism under load. Throughput improvements that buffer under stress are regressions dressed as progress, and TR-3 named that exactly.

## Connects to

- **system-engineering** - the graph tells you which wires to instrument; without that graph, the loop has no anchor and you instrument the wrong nodes.
- **testing-sequencing** - your tests are loops; sequencing them is how you keep them sharp, fast, and aimed at the right symptom.
- **iterate-fast** - fast feedback is what makes fast iteration possible. Without the loop, iteration is guessing with a deadline.

## Sub-skills

| Sub-skill | When to load |
|---|---|
| [loop-latency-measurement](subskills/loop-latency-measurement.md) | Time-to-evidence for a decision needs to be quantified |
| [signal-determinism-check](subskills/signal-determinism-check.md) | Telemetry / observability config introduces buffering or sampling |
| [co-location-pattern](subskills/co-location-pattern.md) | Design-to-production / design-to-QA distance is creating ticket round-trips |
| [pre-commitment-gate](subskills/pre-commitment-gate.md) | An action is irreversible; need to verify in flight config before commit |
| [two-speed-reporting](subskills/two-speed-reporting.md) | One report cadence is starving either the unblock signal or the teach signal |
| [model-fudge-factor](subskills/model-fudge-factor.md) | Flight / production findings are dying in a wiki page instead of updating the simulator |

## Related spine skills

- [system-engineering](../../02-design/system-engineering/SKILL.md) - system-engineering names the nodes; feedback-loops tightens the loop on each
- [iterate-fast](../../03-execution/iterate-fast/SKILL.md) - feedback-loops gives the signal; iterate-fast acts on it
- [testing-sequencing](../../03-execution/testing-sequencing/SKILL.md) - feedback-loops measures the loop; testing-sequencing decides which loops to run

---

The team that ships fastest is not the team that thinks fastest. It is the team that learns fastest. Build the loop, sharpen it, harden it, then build the thing it measures. When you find a place where the loop is buffered - where the signal arrives too late, too smeared, or too non-deterministic to act on - that buffering is the bug. Fix it before anything else, including the thing the loop was supposed to be checking. **Be the engineer who refuses to ship a flaky 30-minute CI, who tears out the non-deterministic logging pipeline before it eats a real incident, who walks 30 meters instead of opening a ticket.** Redesign your slowest, smearedest loop today - not next sprint.

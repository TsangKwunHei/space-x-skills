---
name: ranked-objectives
description: Pre-declare what a test must accomplish, in priority order, before it runs - load this skill whenever the user is writing a test plan, a launch readiness review, an experiment design, a sprint demo plan, or any artifact that says "success means…" Especially load it when results are coming back from a test and someone is starting to summarize them as "successful test" without specifying which objective passed and which did not, or when someone proposes re-ordering the goals after the data is in. Anchored in the Maraia capsule program's pre-flight enumerated objectives and its honest report - "all objectives were met with the exception of the video objective."
---

# Ranked Objectives

The Maraia full-scale balloon flight, August 19, 2013, returned this report:

> "All objectives were met with the exception of the video objective." (Maraia p.7, Sec. IV)

That sentence is honest only because the objectives existed in writing before the flight. The full-scale primary objectives, declared in a numbered list before the test (Maraia p.7):

1. "Characterize capsule transonic & subsonic free-fall dynamic behavior and aerodynamics"
2. "Execute full scale autonomous pneumatic parachute deployment and recovery system"
3. "Execute drogue to main parachute transition"

And explicitly demoted: "Additional secondary objectives included recovery of the capsule and recording good quality, usable video" (Maraia p.7).

The video objective failed because the GoPro's data card filled at 99 minutes - root cause documented as "when using Windows computers, simply deleting the data on a flash memory card (micro HD) is not adequate to clear the memory for future use" (Maraia p.9). On a project status slide without the pre-flight ranking, "video failed" reads as a partial success. With the pre-flight ranking, it reads as a named, demoted, secondary failure on a flight where every primary objective met its bar. Two very different reports, same data.

## What this is

Ranked objectives are a written, ordered list of pass/fail criteria for a test, frozen before the test runs. Two to five objectives. Each one named, classified as primary or secondary, with an explicit pass condition. The report that follows the test addresses each objective, in order, by name.

The ranking is the bar. The bar exists before the test so that schedule pressure, ego, or re-interpretation cannot move it after results land. A test without a written ranking lets every partial result become a win in the deck and a failure in retrospect - the same data interpreted opportunistically by whoever owns the slide.

## When to use this

- Writing a test plan, launch readiness review, experiment design, sprint demo plan, or any "definition of done."
- Designing a milestone gate where results determine whether to advance.
- Reporting results from a completed test or experiment.
- Reviewing a draft of a test report that uses the words "successful test" without saying which objective passed.
- Sequencing a multi-rung campaign - each rung needs its own ranked objectives (compose with [fidelity-ladder-design](fidelity-ladder-design.md)).

## When NOT to use this

- Pure exploration with no decision riding on the outcome. If nothing depends on a pass/fail, you do not need a ranking - but check carefully whether something does.
- A standing regression test where the objective is "no change from last run." Even there, write it down once.
- A health check where the binary outcome is sufficient. Most "tests that matter" are not health checks.

## How to apply

1. **Write 2–5 objectives in priority order.** More than five and the ranking blurs; fewer than two and you have not actually thought about it. Maraia ran three primaries on the full-scale flight (Maraia p.7) and three numbered objectives on the planned sounding rocket (Maraia p.14, Sec. V).

2. **Mark each one primary or secondary, with a one-line pass condition.** Primary objectives gate promotion to the next rung. Secondary objectives are nice-to-have data. The Maraia full-scale flight named three primaries plus secondaries that included "recovery of the capsule and recording good quality, usable video" (p.7).

3. **Make pass conditions specific and falsifiable.** Not "the parachute works." Instead: "drogue chute deploys at 60,000 ft; main deploys at 14,000 ft; descent rate at touchdown within X-Y m/s" (Maraia p.7 declared the drogue/main altitudes; pair with [numeric-retest-trigger](numeric-retest-trigger.md) for the threshold half).

4. **Freeze the ranking before execution.** Print it. Sign it. Email it. Whatever your team's commitment ritual is, do it before the test starts. Any change after results land is a re-write of the bar to fit the data - exactly what the ranking exists to prevent.

5. **Report against the ranking, in order.** When results come back, walk the list. For each objective, name pass or fail. The Maraia Flight #1 report is the template:

   > "The primary test objective, obtaining performance data on the aerodynamic and dynamic properties of the sub-scale capsule, was not met since the release box was still attached during the freefall, creating additional drag (and stability). However, all secondary test objectives were met, including successful autonomous parachute deployment, demonstration of avionics and GN&C in flight, execution of ground commands in flight and observation of system response, and recovery of both payloads." (Maraia p.6)

   Primary failed. Secondaries passed. Reported in that order. No re-ranking.

6. **Use the report to gate the next rung.** If the primary objective failed, the next rung does not advance - the current rung repeats with the fix, or the campaign returns to the previous rung. Maraia's two subscale flights "successfully served as development tests for the full scale, but were unable to achieve a clean freefall configuration and did not provide usable capsule aerodynamic data" (Maraia p.2). The aero-data primary rolled forward to the full-scale rung; the subsystem secondaries promoted on the current rung.

## Worked example

A team plans a load test on a new bracket. Without ranked objectives, the test plan reads "verify bracket meets requirements." After the test, the bracket survived limit load but cracked at 1.18× ultimate (below the 1.25× factor of safety the Falcon User's Guide §6.1 Table 6-1 names for ultimate flight). Slide deck: "Load test successful - bracket survived limit load."

With ranked objectives, written before the test:

1. **(Primary)** Bracket survives 1.25× ultimate flight load with no permanent deformation (Falcon User's Guide §6.1 Table 6-1, p.43)
2. **(Primary)** Bracket survives 1.10× yield load with no permanent deformation (§6.1 Table 6-1)
3. **(Primary)** Strain at four instrumented locations matches FEA prediction within 15%
4. **(Secondary)** Acoustic emission count at limit load
5. **(Secondary)** Visual inspection log

After the test, the report walks the list: Primary 1 - failed (cracked at 1.18× ultimate, below 1.25× requirement). Primary 2 - passed. Primary 3 - passed at three of four locations; one location 23% high. Secondary 4, 5 - passed.

That report does not advance to flight qual. The first report does. Same data, opposite conclusions. The ranking is what made the difference.

## Anti-pattern

**Re-ranking objectives after the data is in.** The campaign declared three primaries and two secondaries. After the test, the third primary failed. The summary slide quietly promotes a secondary into the primary slot ("autonomous deploy was the real test"), or quietly reframes the failed primary as "a stretch goal." This is the failure mode the ranking exists to prevent. If the ranking is not frozen, it has not happened.

**The "successful test" report.** A test report whose top line reads "test was successful" without naming which objectives passed and which did not is a failure of this skill. Maraia did not write "Flight #1 was successful" - they wrote "the primary test objective… was not met… However, all secondary test objectives were met" (Maraia p.6). The pattern is "primary outcome, then secondary outcomes, named, in order."

**Single-bullet objectives.** "The system works" is not an objective. "The parachute opens within 0.4 s of the deploy command and decelerates the capsule to <12 m/s by 2,000 ft AGL" is. If you cannot count the objectives, they are not ranked.

**Too many objectives.** A list of fifteen "primary" objectives is not a ranking; it is a wishlist. Cap primaries at three to five; demote the rest to secondary. Maraia's full-scale primary list was three (Maraia p.7); the planned sounding-rocket campaign was three (Maraia p.14). When everything is primary, nothing is - and the report after the flight will silently re-rank to fit the data.

**Objectives without owners.** Each objective should have a named owner who signs off on its pass condition before the test. An owner-less objective is a deniable objective; if it passes, everyone claims credit, and if it fails, no one is responsible for closing it. The signature is the accountability mechanism - it pairs with signed-contracts (route via your parent spine to infrastructure).

**Conflating "objective" with "metric."** An objective is a question the test answers; a metric is the number that decides the answer. "Verify drogue chute deployment" is an objective; "drogue deploys at 60,000 ft within ±2,000 ft" is the metric (Maraia p.7). Pass/fail per objective is decided by the metric - pair this skill with [numeric-retest-trigger](numeric-retest-trigger.md) so every objective has a number behind it.

## Related skills

- Parent: [testing-sequencing](../SKILL.md)
- Pairs with: [not-because-of-x-clauses](not-because-of-x-clauses.md) - every objective needs its accidental-pass guard
- Pairs with: [numeric-retest-trigger](numeric-retest-trigger.md) - every pass condition needs a number
- Compose with: [fidelity-ladder-design](fidelity-ladder-design.md) - each rung gets its own ranked list
- Compose with: pre-commitment-gate (route via your parent spine to feedback-loops) - the ranking is itself a pre-commitment

## Source

- Primary: Maraia capsule paper p.7 (full-scale objectives enumerated and ranked before flight; "all objectives were met with the exception of the video objective")
- Primary: Maraia p.6 (Flight #1 report against pre-written ranking - "primary objective was not met… However, all secondary test objectives were met")
- Primary: Maraia p.14, Sec. V (sounding-rocket objectives numbered [1], [2], [3] before flight)
- Primary: Maraia p.3 (subscale primary/secondary objective split)
- Supporting: Falcon User's Guide §6.1 Table 6-1, p.43 (factor-of-safety pass conditions)

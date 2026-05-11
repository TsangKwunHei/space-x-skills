---
name: numeric-retest-trigger
description: Pre-commit numeric thresholds that, if exceeded, force a re-test - load this skill whenever the user is writing a verification plan, a change-control policy, or a qualification matrix; whenever someone proposes "we'll decide if we re-test once we see the result"; whenever a hardware modification is on the table and the discussion is about how much rework counts as enough to invalidate prior qualification; whenever a change request is moving through review and the question "does this need re-qual?" is being adjudicated by judgment instead of by number. Anchored in the Maraia 100 m/s ejection-velocity pass criterion, the >6 G severity flag from Flight #2, and Falcon User's Guide §7.3 Table 7-2 retest triggers - twenty fasteners, M2.5, six months.
---

# Numeric Retest Trigger

The Maraia pneumatic deployment had one number that decided pass or fail: "Initial development testing with a typical valve showed that chute ejection velocity did not meet requirements. The fast acting valve was able to get the desired chute ejection velocity of 100 m/s" (Maraia p.8). 100 m/s. A typical valve hit some other number; the typical valve did not pass. The fast-acting valve hit 100; the fast-acting valve did pass. The threshold existed before the test, so the result was unambiguous.

Flight #2 had another number: "Just prior to the line break, a series of greater than 6 G's spikes were observed in the accelerometer data" (Maraia p.6). Greater than 6 G. The accelerometer trace itself was the trigger - the dynamics had crossed a threshold that the team had set, and the freefall objective was scored as not met because of it.

The Falcon User's Guide §7.3 Table 7-2 (p.53) names retest triggers numerically as well: "Rework of primary load path or externally mounted interfaces, resulting in **more than twenty fasteners reworked** on secondary structures." Twenty. Not "a lot of fasteners." Not "significant rework." Twenty.

## What this is

A numeric retest trigger is a pre-committed quantitative threshold that determines whether a test must be repeated, whether a configuration is qualified, or whether an objective passes. The number exists before the trigger is met. The decision rule is: "if metric X exceeds value Y, action Z follows automatically."

The discipline is to argue about the number once, in a calm room, before any test runs or any rework is on the table. Then the number does the deciding. Schedule pressure does not move pre-committed numeric thresholds - that is the entire point of pre-committing them in numbers rather than in adjectives.

## When to use this

- Writing a verification plan, qualification matrix, or change-control policy.
- Defining pass/fail criteria for any test (compose with [ranked-objectives](ranked-objectives.md)).
- Adjudicating "does this change require re-qualification?" - get the rule out of judgment and into a number.
- Reviewing a deviation request that asks to skip retest after rework.
- Designing event triggers for an autonomous system (deploy at altitude X, abort at G-load Y).

## When NOT to use this

- The metric genuinely cannot be quantified. (Rare. Push hard before accepting this; even subjective metrics like "code review approval" can be decomposed into countable items.)
- The first time you are sequencing tests and have no baseline yet. Set provisional numbers; refine after the first run.
- When a single qualitative gate is more honest than a fake number. "Lawyer-signed contract" beats "contract scored 8.5/10."

## How to apply

1. **List the retest-relevant axes.** For hardware: load magnitude, cycle count, mass change, CG shift, fastener rework count, fastener size, calendar time since last qualification, supplier change, personnel change. For software: error-rate ceiling, latency ceiling, regression count, dependency-version delta, configuration drift. Falcon User's Guide §7.3 Table 7-2 (p.53) enumerates the hardware axes formally.

2. **Set a number for each axis.** Argue once, in writing, before any rework or test result is on the table. Falcon's matrix:

   - Penalty Retest (workmanship drift): "Rework of primary load path or externally mounted interfaces, resulting in **more than twenty fasteners reworked** on secondary structures." "Rework of fasteners **smaller than #3 (or smaller than M2.5)**." (§7.3 Table 7-2, p.53)
   - Delta Qualification (design change): "Production line interruptions for **6+ months**, change in final assembly work instructions, change in secondary retention methods, supplier/personnel change." (§7.3 Table 7-2)

   Twenty fasteners. M2.5. Six months. Numbers that cannot be argued away by "engineering judgment."

3. **Set event triggers numerically too.** Autonomous systems and tests with phased events need the same discipline. Maraia full-scale trigger sequence:

   - Release commanded once "above an altitude of 70,000 ft" (Maraia p.3)
   - Backup auto-deploy: "descends in freefall to 50,000 ft, at which point an autonomous command is sent to deploy the parachute" (Maraia p.3)
   - Drogue chute deploys at 60,000 ft; drogue release / main deploy at 14,000 ft (Maraia p.7)

   Four altitudes, all decided before the flight.

4. **Set severity numbers that flag investigation.** Not just pass/fail. Some metrics are "if you see this, stop and look." Maraia: ">6 G's spikes" in the accelerometer triggered the freefall objective failure (Maraia p.6). Falcon User's Guide §6.1 Table 6-1 (p.43) sets factor-of-safety floors that double as severity flags: yield 1.10, ultimate 1.25, GSE lifting yield 3.0, GSE lifting ultimate 4.0.

5. **Treat pre-committed numbers as immutable.** Once the matrix is signed, the only path to changing a threshold is the same disciplined process that set it - not a side conversation in a hallway, not a slide in a status meeting, not "we're only one fastener over the limit."

6. **Automate the trigger when possible.** If the metric is in CI, in telemetry, in a build pipeline, then the trigger should fire without a human deciding. A human deciding "does 21 fasteners count as more than twenty" is a human looking for a way to say no.

## Worked example

A team is qualifying a payload structure. The change-control policy is being written. The team applies this skill before the first test runs.

**Penalty Retest (workmanship) thresholds, pre-committed:**

| Axis | Threshold | Action |
|---|---|---|
| Fastener rework on secondary structure | >20 fasteners | Re-run sine vibration |
| Fastener size reworked | smaller than M2.5 | Re-run sine vibration |
| Mass change from qualified configuration | >2% | Re-run static load |
| CG shift from qualified configuration | >5 mm | Re-run static load |
| Time since last qualification | >12 months | Re-acceptance |

**Delta Qualification (design change) thresholds, pre-committed:**

| Axis | Threshold | Action |
|---|---|---|
| Load path change | any | Full re-qual |
| Supplier change on flight-critical part | any | Full re-qual at delta level |
| Production interruption | ≥6 months | Re-qual per Falcon §7.3 Table 7-2 |
| Final assembly work instruction change | any | Re-qual per §7.3 Table 7-2 |

Six months later, the team has reworked 19 fasteners on the secondary structure and is being asked to ship. Without the matrix, the discussion is "is 19 enough to worry about?" - and schedule wins. With the matrix, 19 is below 20 and the team ships without re-test, by the rule they wrote when no shipment was on the line. If the count had been 21, they re-test, by the same rule. The number does the deciding.

The mirror case: the same team reworks 21 fasteners but the program manager says "it's only one over." With the pre-committed matrix, "only one over" is "over." Re-test. The matrix removes the negotiation that schedule pressure would otherwise win.

## Anti-pattern

**Adjective thresholds.** "Significant rework requires re-test." "Major mass change requires re-qual." "Long production gap requires re-acceptance." Adjectives are negotiable; numbers are not. The Falcon User's Guide §7.3 Table 7-2 (p.53) is calibrated against years of failure data - 20, M2.5, 6 months are the values that survived contact with reality. Adjective thresholds always silently slide toward "no re-test."

**Post-result threshold setting.** The test returns 1.18× ultimate; someone proposes "let's set the bar at 1.15× this round, since the part's behavior was novel." This is the anti-pattern in its purest form. The bar is set before the test, not after.

**Numbers without action.** "Re-test is recommended if rework exceeds 20 fasteners" is not a trigger; it is a hint. Triggers say what happens, not what is recommended. "If rework >20 fasteners, then sine vibration is re-run before flight" is a trigger.

**Skipping severity flags.** Pass/fail is binary; severity flags are a second axis. Maraia's >6 G spike was not a "fail the system test" - it was a "you crossed a threshold, the dynamics are not what you modeled, stop and look." Tests without severity flags lose the gradient between "fine" and "broken."

**Setting numbers without baseline data.** A threshold pulled from the air is worse than no threshold - it gives the false comfort of a number while gating on a guess. Where possible, anchor the number in known-good data: Falcon User's Guide §6.1 Table 6-1's factor-of-safety numbers (1.10, 1.25, 3.0, 4.0) are calibrated against decades of structures data; §7.3 Table 7-2's twenty-fastener / M2.5 / six-month thresholds reflect lessons-learned from real workmanship and re-qual events. If you have no data, set provisional thresholds, run the first campaign, then refine - and document the iteration so the next program inherits the calibration.

**Treating a threshold as a target.** A 1.25× ultimate factor of safety is a floor, not a goal. Designing a part to fail at exactly 1.25× ultimate is a design that will fail in service the first time the loads exceed the predicted envelope by anything. Numbers that gate retest are minimum-acceptable thresholds, not optimization targets - design above them.

## Related skills

- Parent: [testing-sequencing](../SKILL.md)
- Pairs with: [ranked-objectives](ranked-objectives.md) - pass/fail per objective is itself a numeric trigger
- Pairs with: pre-commitment-gate (route via your parent spine to feedback-loops) - numeric thresholds are the gate's mechanism
- Compose with: [fidelity-ladder-design](fidelity-ladder-design.md) - promote-on-pass per rung needs a number
- Compose with: signed-contracts (route via your parent spine to infrastructure) - qualification matrices are signed artifacts

## Source

- Primary: Maraia capsule paper p.8 (100 m/s ejection-velocity pass criterion); p.6 (>6 G accelerometer severity flag); p.3 (release-window altitude triggers, 70,000 ft and 50,000 ft); p.7 (drogue/main altitudes 60,000 ft and 14,000 ft)
- Primary: Falcon User's Guide §7.3 Table 7-2, p.53 (penalty retest and delta qualification triggers - 20 fasteners, M2.5, 6 months)
- Primary: Falcon User's Guide §6.1 Table 6-1, p.43 (factors of safety as numeric severity floors - yield 1.10, ultimate 1.25, GSE lifting 3.0/4.0)
- Supporting: Falcon User's Guide §7.1, p.48 (three approaches to environmental verification - protoqualification, qualification, lot acceptance - each with numeric pass levels)

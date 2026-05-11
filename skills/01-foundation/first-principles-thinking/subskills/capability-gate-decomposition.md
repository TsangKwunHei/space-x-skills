---
name: capability-gate-decomposition
description: Break a goal that is too large to ship this quarter into a sequence of capability gates - each one a buildable rung whose pass criterion is physics-defensible - so the program advances by named, testable steps instead of by hope. Use this skill when a goal is a multi-quarter or multi-year ambition, when a roadmap has only an end state and no rungs, when a team is about to skip directly to the most expensive test, or when the question "what is the cheapest physically valid first rung?" has not been answered. Especially load this skill before any program plan, technology roadmap, or fundraising milestone discussion where the leap from current capability to target capability is more than a single test campaign.
---

# Capability-Gate Decomposition

The Maraia capsule program had to answer one question - can a small capsule be returned from orbit safely? - and the team broke it into five physical rungs before any rocket flew. (Maraia Fig. 2, p.2.) Texas A&M low-speed wind tunnel for parachute opening characterization. China Lake drop tower for steady-state parachute performance of two competing designs. Small-scale balloon drop from 100,000 ft with a 10-inch, 6-pound capsule. Chute ejection rig developing a no-pyro pneumatic deployment. Full-scale balloon drop from 100,000 ft with a 30-inch, 133-pound capsule (Maraia p.8). Each rung had a written pass criterion; each was the cheapest physically valid test of the next assumption; each rung you skip becomes a rung the rocket pays for. This skill is the discipline that builds the ladder.

## What this is

Capability-gate decomposition is the practice of taking a goal that cannot be shipped in a single test campaign and producing a written sequence of intermediate gates, each of which (a) corresponds to a real physical capability that did not exist before the gate, (b) has a pass criterion that is defensible from physics or measured data, and (c) is buildable as a discrete piece of work whose failure does not consume the next gate's resources.

It is not a project plan. A project plan is calendar-by-calendar; gates are capability-by-capability. A project plan can have a slip date; a gate has a pass criterion. If you cannot say what physical question the gate answers, it is not a gate - it is a milestone, which is a calendar mark with no physical content.

The discipline produces a ladder of rungs. Each rung is the cheapest physically valid test of the assumption that gates the next rung. The ladder is read bottom-up at planning time and bottom-up at execution time, and skipping rungs is the signature failure mode.

## When to use this

- A goal will take more than a single test campaign or quarter to reach
- A roadmap has an end state but no named intermediate capabilities
- The team is debating whether to skip directly to a full-scale or production test
- The question "what is the cheapest physically valid first rung?" has not been answered in writing
- A program is being scoped for fundraising or contractual milestones and the milestones are calendar-based rather than capability-based
- Two competing designs need to be compared empirically before commitment (Maraia p.2: two parachute geometries compared at China Lake before selection)
- A new flight regime, scale, or environment is being entered

## When NOT to use this

- The goal is a single increment to existing capability (a parameter tweak, a regression bug fix) - there is no ladder to build
- A capability ladder already exists and the team's job is to execute the next rung, not re-decompose
- The work is reversible at low cost and the cheapest path is to try the full thing once
- Time pressure makes the cost of the multi-rung ladder higher than the cost of the failure it prevents (rare; usually this is wishful thinking)

## How to apply

1. **State the goal in physical or capability terms.** Not "ship the platform." Write: "deliver N kg to LEO," "land a stage-1 booster," "return a capsule from orbit," "process M requests/sec at p99 < L." Maraia: "characterize the aerodynamic and dynamic properties of the Maraia capsule shape sufficient to design entry, descent, and landing for a real return mission" (paraphrased from Maraia Conclusion, p.15).
2. **Work backward from the goal to the gating capability.** What is the single capability whose absence prevents the goal? For Maraia, that was full-scale capsule aerodynamics in a clean freefall configuration (Maraia p.7). For Falcon Heavy, the gating capability was a proven Falcon 9 first stage that could be triplicated (Falcon User's Guide §2.2, p.6: "Falcon Heavy's first stage comprises three Falcon 9 first stages with enhancements provided to strengthen the cores").
3. **Ask: what is the cheapest physically valid test that would unlock that capability?** Cheapest means least resource expenditure for genuine physical evidence. Physically valid means the test, if it passes, transfers real information into the next rung. A demonstration that does not in principle invalidate the assumption is theater, not a rung. (See [first-principles-thinking](../SKILL.md) on the wind-tunnel-before-rocket move.)
4. **Recurse.** Each rung's pass criterion becomes the next subordinate goal: "to achieve full-scale balloon drop with clean freefall, we must first develop pneumatic chute deployment that meets a 100 m/s chute ejection velocity" (Maraia p.8) - and that becomes the chute-ejection-rig rung. Each subordinate rung also has a cheaper sub-rung. Stop the recursion when a rung is buildable this quarter.
5. **Write a pass criterion per rung that is physics-defensible.** "Demonstrate" is not a pass criterion. "Achieve chute ejection velocity ≥ 100 m/s with the fast-acting valve" (Maraia p.8) is a pass criterion. "Provide best-estimate state vector within ±X" is a pass criterion. The rung passes or fails against the criterion, not against the team's mood.
6. **Document what each rung produces for the next.** Maraia Fig. 2 (p.2) banner - "Aerodynamics Characterization, and Deceleration System Development" - and the explicit outputs per rung: "Characterization of parachute opening; Demonstration of parachute integrity at opening loads" (Rung 1); "Characterization of various parachute geometries; Steady state loads; Descent rates" (Rung 2); etc. Each rung's output is the next rung's input.
7. **Treat a missed primary objective as a partial pass, not a full pass.** Maraia Flight #1 (Maraia p.6, Sec. III.A) had its primary objective unmet (release box still attached, no clean freefall) but multiple secondary subsystem passes (avionics, GN&C, autonomous chute deploy, recovery). The team explicitly did not call it a "successful test" on the aero objective; it was a development test that promoted the subsystems forward without promoting the aero objective. The next rung had to re-attempt the unmet objective.
8. **Refuse to skip rungs.** "We will go directly to the full-scale rocket" is the most expensive failure mode. Maraia p.2: "The two subscale tests successfully served as development tests for the full scale, but were unable to achieve a clean freefall configuration and did not provide usable capsule aerodynamic data. The full scale test did successfully meet all primary objectives including a clean freefall." The full-scale test passed because the subscale rungs had surfaced the rigging and dynamics problems first.

## Worked example

Maraia capsule, EDL test program (Maraia p.2, Fig. 2; p.7-9, full-scale results):

**Goal.** Characterize Maraia capsule shape aerodynamics and develop deceleration system in subsonic regime sufficient to design future EDL missions.

**Decomposition into 5 rungs:**

1. **Texas A&M low-speed wind tunnel.** Pass criterion: characterize parachute opening; demonstrate parachute integrity at opening loads. (Maraia Fig. 2.) Cheapest, most controlled environment; tests the parachute alone.
2. **China Lake drop tower.** Pass criterion: characterize parachute geometries (two competing designs), steady-state loads, descent rates. (Maraia p.2; Fig. 2.) Adds physical mass and gravitational drop; still no flight dynamics.
3. **Sub-scale balloon drop, 100,000 ft, 10-inch / 6-pound capsule.** FAA payload limit: ≤6 lb without waivers (Maraia p.3). Primary pass criterion: aero/stability data in subsonic regime. Secondary: avionics, GN&C, parachute subsystem function. (Maraia p.3.) Two flights run; both failed primary aero objective due to release-box-still-attached and tether-line dynamics (Maraia p.5-6); both passed secondary subsystem objectives. The aero objective rolled forward to Rung 5.
4. **Chute ejection testing - pneumatic deployment development.** Pass criterion: chute ejection velocity ≥ 100 m/s using fast-acting valve, with no pyro (ISS internal requirements compliance, Maraia p.8). "A pneumatic deployment system was developed specifically for this test article, and also to serve as a prototype for the spaceflight vehicle which must comply with ISS internal requirements (so black power or pyrotechnics were not considered to be a viable option)" (Maraia p.8). Output: validated deployment system for Rung 5.
5. **Full-scale balloon drop, 100,000 ft, 30-inch / 133-pound capsule.** Pass criteria, ranked (Maraia p.7): (1) characterize transonic & subsonic free-fall dynamic behavior and aerodynamics; (2) execute full-scale autonomous pneumatic parachute deployment and recovery system; (3) execute drogue-to-main parachute transition. Secondary: capsule recovery and good-quality video. **Result (Maraia p.7):** "All objectives were met with the exception of the video objective." (Video failed because data card filled at 99 minutes - Maraia p.9.) Aero data passed and drove the -0.078 C_A correction in the post-flight model rebuild (Maraia p.11).

The ladder worked because each rung's pass criterion was physics-defensible and the rung was the cheapest test of the next assumption. Rung 1 cost a wind tunnel hour. Rung 5 cost a balloon launch from Fort Sumner. The factor between them is several orders of magnitude - and the team paid for the cheap rungs first to retire risk before the expensive one.

A second worked example, at a different scale: Falcon 1 → Falcon 9 → Falcon Heavy as a three-rung capability ladder. Falcon User's Guide §2.2, p.6: "Falcon Heavy builds on the proven, highly reliable design of Falcon 9. Falcon Heavy's first stage comprises three Falcon 9 first stages with enhancements provided to strengthen the cores. Furthermore, Falcon Heavy utilizes the same second stage and same payload fairing as flown on Falcon 9, fully benefiting from the flight heritage provided by Falcon 9 flights. This commonality has also minimized infrastructure unique to the vehicle." Each rung was a buildable rocket whose pass was demonstrated by flight; each next rung composed the prior.

## Anti-pattern

A program that wrote "Q4 milestone: launch the rocket" with no intermediate gates skipped the cheap rungs by definition. The Maraia subscale flights were not commercial pressure tests - they were sub-FAA-payload-limit (6 lb) balloon drops at student-program cost (Maraia p.3, Rocket University at KSC) - yet they surfaced two failure modes (Flight #1 burn-circuit pull-loose at p.5; Flight #2 tether-line break under increasing balloon-capsule oscillation at p.6) that, on the full-scale flight, would have cost months of recovery. Both subscale flights "did not provide usable capsule aerodynamic data" (Maraia p.2) - i.e., neither passed its primary - but each promoted the subsystem maturity that the full-scale rung depended on, and each surfaced an integration risk the full-scale design then mitigated.

The anti-pattern is not "subscale failed, therefore subscale was a waste." The anti-pattern is treating Rung 5 as Rung 1 and discovering, on the most expensive rung, what the cheapest rung would have surfaced for free. Maraia's program ran the cheapest rungs first by design; the alternative - full scale first - would have priced the same lessons three orders of magnitude higher and possibly destroyed the only test article.

## Related skills

- Parent: [first-principles-thinking](../SKILL.md)
- Pairs with: fidelity-ladder-design (route via your parent spine to testing-sequencing) (the testing-sequencing version of the same ladder), subscale-flight (route via your parent spine to iterate-fast) (cheap rungs as scaled-down evidence events)
- Compose with: ranked-objectives (route via your parent spine to testing-sequencing) (each rung's pass criterion is a pre-declared ranked objective), pre-commitment-gate (route via your parent spine to feedback-loops) (the gate's pass criterion must be written before the rung is run)

## Source

- Primary: Maraia paper, p.2 (Fig. 2, 5-rung ladder), p.3 (sub-scale FAA 6 lb constraint, Rocket U), p.7 (full-scale ranked objectives), p.8 (100 m/s chute ejection criterion), p.9 (full-scale results), Conclusion p.15.
- Secondary: Falcon User's Guide §2.2, p.6 (Falcon Heavy = 3× Falcon 9 first stages + same upper stage + same fairing); §1.3, p.3 (Falcon program flight-count progression).

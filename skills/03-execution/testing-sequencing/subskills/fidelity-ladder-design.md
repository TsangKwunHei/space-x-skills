---
name: fidelity-ladder-design
description: Sequence tests cheapest-first along a fidelity ladder so the most expensive test rig is not the first one - load this skill whenever the user is planning a verification campaign, scoping prototypes, deciding "which test do we run first," scoping a hardware-in-the-loop rig, building a staging environment, asking "can we just skip to the integration test," or trying to compress a qual schedule. Especially load it before signing off on a test plan that jumps straight to the most expensive rig: the rocket, the customer, the production cluster. Anchored in the Maraia capsule program's five-rung ladder from Texas A&M wind tunnel to a 30-inch full-scale balloon drop, and the question "what is the cheapest test that still tells me real physics?"
---

# Fidelity Ladder Design

Maraia's program walked five rungs before any planned rocket flight, in cost order: Texas A&M low-speed wind tunnel for parachute opening; China Lake drop tower for steady-state parachute geometry; a 10-inch, 6-pound subscale capsule on a balloon to 100,000 ft for aero and gas deployment; a chute ejection rig for pneumatic deployment with no pyros; a 30-inch, 133-pound full-scale capsule on a balloon to 100,000 ft for full aero, recovery, and parachute system (Maraia p.2, Fig. 2; p.8). Each rung's job was to make the next rung cheaper or more credible.

The two subscale balloon flights "did not provide usable capsule aerodynamic data" (Maraia p.2). On a project status slide that looks like two failures. It wasn't. The team called them "development tests for the full scale" - they surfaced rigging problems, release-circuit problems, and dynamics problems at subscale cost (Maraia p.2, p.5). The full-scale flight then "did successfully meet all primary objectives including a clean freefall" (Maraia p.2).

## What this is

A fidelity ladder is an ordered sequence of tests that climb from cheap and approximate to expensive and flight-like. Each rung answers a smaller, more constrained question than the next. Each rung's pass condition gates promotion to the next. The discipline is choosing the rungs and their order before the campaign begins, not improvising them as the schedule slips.

The governing question is: **what is the cheapest test that still tells me real physics?** A wind tunnel does not fly, but it tells you whether the parachute opens. A drop tower is not a flight, but it tells you the steady-state descent rate. A subscale balloon is not the vehicle, but it tells you whether your release circuit survives ascent vibration. Each rung trades fidelity for cost on a slope you have to design deliberately.

## When to use this

- Planning a verification campaign for a hardware system, software system, or experimental rig.
- Deciding which test to run first when you have several candidates of differing cost.
- Scoping prototypes or staging environments before integration.
- Compressing a qualification schedule and being asked "can we skip the bench test?"
- Reviewing a test plan that jumps straight to the most expensive rig (the rocket, the customer, prod).

## When NOT to use this

- A specific test is already executing and the question is "did it pass?" - that is a [ranked-objectives](ranked-objectives.md) and [not-because-of-x-clauses](not-because-of-x-clauses.md) problem.
- A specific component changed and the question is "do we re-test?" - that is a [numeric-retest-trigger](numeric-retest-trigger.md) problem.
- The system has zero blast radius and a single integration test is genuinely sufficient. Most systems do not actually qualify here; check before assuming.

## How to apply

1. **Write the question the campaign must answer.** One sentence. "Does the parachute deploy at 100 kft and decelerate the capsule to landing within G limits?" If you cannot write the sentence, you cannot design the ladder.

2. **Enumerate candidate rungs from cheap to expensive.** For each, name: cost class, what it can falsify, what it cannot, what physical fidelity it sacrifices. Wind tunnel sacrifices altitude and Mach but preserves parachute aerodynamics. Drop tower sacrifices flight environment but preserves steady-state descent. Subscale balloon sacrifices vehicle scale but preserves real altitude profile.

3. **Promote-on-pass criteria.** Each rung must define the result that lets you climb. Maraia: the wind tunnel had to characterize parachute opening before drop testing began; the drop tower had to characterize geometries and descent rates before balloon flights. The Falcon User's Guide §1.5.3 (p.5) describes the same pattern at scale: "component-level flight acceptance and workmanship testing, structures load and proof testing, flight system and propulsion subsystem-level testing, and full first and second stage testing up to full system testing (including first and second stage static fire testing)."

4. **Sacrifice list per rung.** What real-world fidelity does this rung not have? Mass simulator? CG offset? Static instead of fluid propellant? Bench cabling instead of flight harness? An empty sacrifice list means you have not looked hard enough - see Falcon User's Guide §7.4.1, which warns customers to "account for CG and mass differences in test and adjust levels and/or use fluid simulants to represent propellant mass, where necessary."

5. **Treat cheap-rung anomalies as development data.** A subscale rung that "did not produce the primary aerodynamic data" but did surface a release-circuit failure is not a failed test. It is the rung doing exactly its job - "successfully served as development tests for the full scale" (Maraia p.2). Carry the finding into the next rung's design and its instrumentation. Maraia did: "A barometric altimeter was added for Flight #2" (Maraia p.4).

6. **Run the ladder in order.** The order is the discipline. A ladder run out of order is not a ladder; it is a list of tests that happened in whatever sequence the schedule allowed.

## Worked example

A team is verifying a new pneumatic parachute deployment for a small recovery system. The system has never flown. The candidate test is a sounding-rocket flight at $400k per shot.

Apply the skill:

| Rung | Cost class | What it can falsify | What it cannot |
|---|---|---|---|
| 1. Bench fire of valve into open air | $1k | Valve actuates; chute exits canister | Chute opens against airflow; canister survives launch loads |
| 2. Wind tunnel chute opening | $20k | Chute inflates against airstream; opening loads bounded | Altitude effects; vehicle dynamics |
| 3. Drop tower with mass-matched dummy | $50k | Steady-state descent rate; chute integrity | Real altitude; gas density profile |
| 4. Subscale balloon to 100 kft, 6 lb capsule (FAA waiver-free) | $75k | Aero stability; deployment at altitude; release circuit | Full-scale dynamics; full chute loads |
| 5. Full-scale balloon to 100 kft, 133 lb capsule | $250k | Full aero; full recovery; full parachute system | Mach effects; ascent vibration |
| 6. Sounding rocket | $400k | Mach + ascent + flight environment together | - |

The ladder turns one $400k experiment into six experiments totaling $796k in worst-case cost - but cheap-rung failures stop the climb. A bench fire that shows valve hesitation costs $1k to find; the same hesitation discovered on the sounding rocket costs $400k. The Maraia program's actual ladder ran rungs 1-5 (Maraia p.2, Fig. 2) before its planned sounding-rocket campaign (Maraia p.14, Sec. V).

The accidental skip: "we have wind tunnel data from an old program; let's go straight to balloon." The old wind tunnel data was for a different parachute geometry. Skipping rung 1 saves $20k and surrenders falsification authority over the parachute opening - which is now an unknown all the way up to the balloon at $75k. Discovery moves to the most expensive rig still running.

## Anti-pattern

**Missing rung - CRS-7.** The industrial-grade rod end "implementation was done without adequate screening or testing of the industrial grade part... without proper modeling or adequate load testing of the part under predicted flight conditions" (CRS-7 IRT TF-1, p.8). A test rung - load testing the part under cryogenic flight conditions - was missing from the ladder. The manufacturer recommended a 4:1 factor of safety for industrial-grade applications; that recommendation was not applied (CRS-7 IRT, p.7). The rocket ran the test instead. Vehicle disintegration at T+139 seconds, taking 4,000 kg of ISS cargo with it. A missing rung does not disappear; it moves to the most expensive rung still running.

**Supplier-data-sheet substitution.** "The supplier's data sheet says the part is rated for this load." The supplier's bench is not your ladder. A part that passes the supplier's screening is at most a passed rung 0; it does not retire rung 4. Specifically, the supplier's bench almost never reproduces your environmental envelope (cryogenic, ascent vibration, integrated harness), and a data sheet rating without an environmental qualifier is not a flight credit.

**Rung-skipping under schedule pressure.** "We have wind tunnel data from the previous program; let's go straight to the balloon." Two failure modes. The previous program's article is not yours - geometry, mass distribution, materials, surface finish all drift. And the previous wind tunnel run's instrumentation is not what you would design today. Inherited rungs are at most provisional; cite them in the plan with the deltas called out, then re-run the cheap rung at low cost rather than discover the deltas at full-scale.

**Treating cheap-rung failure as program failure.** A subscale balloon flight that does not produce the primary aero data, but does surface a release-circuit failure, is a successful subscale rung - it caught at $75k what the next rung would have caught at $250k. Maraia explicitly framed it that way: the subscale flights "successfully served as development tests for the full scale" (Maraia p.2). A program that closes a cheap rung as failed loses the option to take cheap-rung failures as a win, and starts skipping cheap rungs to avoid the optics. Then discovery moves up the ladder.

## CLI

```
node tools/clis/fidelity-ladder.js --goal "<verification question>" --domain HARDWARE
node tools/clis/fidelity-ladder.js --goal "verify async retry under partition" --domain SOFTWARE
```

The CLI returns a 4-6 rung suggested ladder with cost class, falsification scope, and promote-on criteria for each rung. Edit the output; do not ship it raw.

## Related skills

- Parent: [testing-sequencing](../SKILL.md)
- Pairs with: [ranked-objectives](ranked-objectives.md) - each rung needs its own pre-written objectives
- Pairs with: [not-because-of-x-clauses](not-because-of-x-clauses.md) - each rung needs its own accidental-pass guards
- Compose with: subscale-flight (route via your parent spine to iterate-fast) - when a rung is a real flight at reduced scale
- Compose with: iterate-fast (route via the testing-sequencing spine, then to iterate-fast) - cheap-rung anomalies feed the four-box closure into the next rung's design

## Source

- Primary: Maraia capsule paper p.2 (Sec. II + Fig. 2 enumerating five rungs); p.3 (Sec. III on subscale 6-lb FAA threshold and 10-inch capsule); p.8 (Sec. IV.A on full-scale 30-inch, 133-lb article and pneumatic deployment rationale)
- Primary: Falcon User's Guide §1.5.3, p.5 (component → vehicle test progression)
- Counter-example: CRS-7 IRT TF-1, p.8 (missing rung - industrial-grade rod end without load testing under flight conditions)
- Tool: tools/clis/fidelity-ladder.js

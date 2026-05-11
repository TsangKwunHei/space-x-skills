---
name: testing-sequencing
description: This is NOT typical TDD. This is the discipline of how to *sequence* tests - the fidelity ladder, ranked objectives written before execution, retest triggers agreed before any change, and "not because of X" clauses that close the pass-for-the-wrong-reason trap. Load this skill whenever the user mentions "test plan," "verification," "qualification," "test order," "pre-flight checks," "test coverage strategy," "what should we test first?", or whenever you hear "this passed but I don't trust it." Especially load it before signing off on any qualification campaign - a test that passes for the wrong reason is worse than a test that fails.
---

# Testing Sequencing

The Maraia capsule program walked five rungs of test fidelity before its planned sounding rocket flight. Texas A&M low-speed wind tunnel - characterize parachute opening loads. China Lake drop tower - characterize parachute geometries and steady-state descent. Small-scale balloon drop from 100,000 ft with a 10-inch, 6-pound subscale capsule - aero stability and gas-parachute deployment. Chute ejection rig - develop pneumatic deployment without pyros. Full-scale balloon drop from 100,000 ft with a 30-inch, 133-pound capsule - full aero, recovery, parachute system.

The two subscale balloon flights "did not provide usable capsule aerodynamic data." On a project status slide that looks like two failures. It wasn't. The Maraia team called them "development tests for the full scale" - and they surfaced rigging problems, release-circuit problems, and dynamics problems at subscale cost. The full-scale flight then met all primary objectives.

Now the contrast. CRS-7. The industrial-grade rod end "implementation was done without adequate screening or testing of the industrial grade part... without proper modeling or adequate load testing of the part under predicted flight conditions." A test step that should have existed in the sequence was missing. The rocket found out for them, 139 seconds into flight, in less than one second of disintegration.

Same engineering org. Two opposite outcomes. The difference is whether the test sequence was designed before the test, or improvised after.

## What this is

Testing is a sequence, not a step. The skill is to design the order - which test runs when, what each must prove, what counts as a real pass, and what triggers a retest. Four moves carry the weight: walk a fidelity ladder cheap-to-expensive, rank objectives in writing before execution, write "not because of X" clauses to block accidental passes, define numeric retest triggers before any change.

This is not TDD. TDD is the loop inside a single rung - write a test, fail it, pass it, refactor. Testing-sequencing is the loop between rungs - which rung runs, in what order, with what evidence, against what pre-committed criteria. Two different problems. Confuse them and you ship a unit-tested rocket that finds out in flight what it should have learned in a wind tunnel.

## In practice

### The disciplined move: the Maraia 5-rung fidelity ladder

Maraia's five rungs, in cost order, before the planned sounding rocket:

1. **Texas A&M low-speed wind tunnel** - parachute opening, integrity at opening loads.
2. **China Lake drop tower** - parachute geometries, steady-state loads, descent rates.
3. **Small balloon drop from 100,000 ft, 10-inch / 6-pound capsule** - aero/stability + gas-parachute deployment.
4. **Chute ejection rig** - pneumatic deployment, no pyros.
5. **Full-scale balloon drop from 100,000 ft, 30-inch / 133-pound capsule** - full aero, recovery, parachute system.

Each rung's job was to make the next rung cheaper or more credible. The wind tunnel made the drop tower interpretable. The drop tower made the subscale balloon interpretable. The subscale balloon made the full-scale balloon interpretable. The full-scale balloon would have made the sounding rocket interpretable.

Skipping the cheap rungs to "save time" doesn't save time. It moves the discovery - and discovery moves to the most expensive rung that's still running. Skip the wind tunnel and you discover parachute geometry problems at full-scale-balloon cost. Skip the full-scale balloon and you discover them on the sounding rocket.

### The disciplined move: ranked objectives, written before execution

The Maraia Flight #1 report:

> "The primary test objective, obtaining performance data on the aerodynamic and dynamic properties of the sub-scale capsule, was not met since the release box was still attached during the freefall, creating additional drag (and stability). However, all secondary test objectives were met, including successful autonomous parachute deployment, demonstration of avionics and GN&C in flight, execution of ground commands in flight and observation of system response, and recovery of both payloads."

Read that carefully. The primary failed. Secondaries passed. The report says so, plainly, in that order. Nobody re-ranked the objectives after the results came in to make the slide deck look better.

A test without a written ranking lets every partial result become a win in the deck and a failure in retrospect. A test with a written ranking forces an honest report - and forces the team to ask, before the test, which question they actually came to answer.

Write the ranking before execution. Two to five objectives. Pass/fail per objective. Report against the ranking, in order, after.

### The disciplined move: "not because of X" clauses

Falcon User's Guide §7.4.6, on activation inhibits:

> "Verification testing must show that power to the deployable, propulsion, and other hazardous secondary devices was successfully inhibited from a mechanical separation signal, and not because of other factors such as software delays."

Read the second clause. *Not because of other factors such as software delays.* That sentence closes a real cheat. A separation inhibit can pass the test because the software hasn't sent the activation command yet. The dashboard lights up green. The test report says "inhibit verified." In flight, the software delay is gone, the command goes out, and the device activates because the actual mechanical inhibit was never working.

A test that passes for the wrong reason looks identical to a test that passes for the right reason - until flight. The "not because of X" clause forces you to name, before the test runs, the two or three ways this test could pass without the system actually working. Then you instrument or constrain the test to rule those out.

For every test, before you run it, write down: what could make this pass for the wrong reason? Then close those off.

### The disciplined move: same mass is not the same article

Falcon §7.4.1, on quasi-static load tests:

> "Customers should aim to replicate as close as possible in the test the CG position and mass of the flight article. Customers must account for CG and mass differences in test and adjust levels and/or use fluid simulants to represent propellant mass, where necessary."

Same mass, wrong CG, gives you the wrong load distribution. Same mass, frozen propellant instead of liquid, gives you the wrong dynamic response - propellant slosh is part of the structural environment, not a footnote. "Mass simulator" is a deviation from flight, and it must be named.

Every flight-vs-test deviation is a named gap in evidence: mass, CG, fluid versus simulant, power state, environmental exposures the test cannot reproduce, connection sequence, charge state. After writing the test plan, go line by line and enumerate the deltas. Empty list means you haven't looked hard enough.

### The disciplined move: numeric retest triggers, agreed before the change

Falcon Table 7-2 defines two retest types, **pre-agreed** in the verification schedule.

**Penalty Retest** triggers (workmanship drift):
- "Spacecraft not tested in integrated manner; e.g., mass dummies used in place of external mounted components."
- "Rework of primary load path or externally mounted interfaces, resulting in **more than twenty fasteners reworked** on secondary structures."
- "Rework of fasteners **smaller than #3 (or smaller than M2.5)**."

**Delta Qualification** triggers (design change):
- "Any change that affects payload structural load path or interfaces with externally mounted appendages."
- "Production line interruptions for **6+ months**, change in final assembly work instructions, change in secondary retention methods, supplier/personnel change."

Twenty fasteners. M2.5. Six months. Numbers, decided ahead of time.

Decide retest criteria after the change and you'll lose every argument. Schedule pressure will say "it's only nineteen fasteners," "it's only five months," "the supplier is basically the same." Schedule pressure does not move pre-committed numeric thresholds - that's the entire point of pre-committing them.

### The disciplined move: required vs advised, with a signed acknowledgment for skips

Falcon Table 7-1 tiers every payload test:

- **REQUIRED**: Static load, sine vibration, activation inhibits, EMC, leak test, random vibration.
- **ADVISED**: Shock, thermal vacuum / thermal cycle.

The phrasing matters: "tests that are 'required' must be completed by the customer to ensure mission safety through payload separation." Required tests protect the system. Advised tests "are designed to ensure on-orbit health and functionality of the payload but are not required to fly." Advised tests protect the customer's own outcome.

And the kicker: "If customer chooses not to complete any 'advised' tests, an acknowledgement of the inherent risks to the payload incurred by not completing the 'advised' testing must be included."

Required and advised do different jobs. Mark everything "recommended" and nothing gets done. Mark everything "mandatory" and the floor erodes under pressure. Tier the tests. Skipping advised requires a signature from someone who owns the consequences. The signature is what makes the risk visible.

### The trap: CRS-7, the missing test step

The NASA IRT on CRS-7:

> The industrial-grade rod end "implementation was done without adequate screening or testing of the industrial grade part... without proper modeling or adequate load testing of the part under predicted flight conditions."

The part passed at the supplier. Looked fine on the bench. What was missing was a test rung - load testing under cryogenic flight conditions, on a part that was about to live inside an LOX tank under ascent loads. That rung wasn't on the ladder. Nobody wrote a "not because of X" clause that would have caught it. Nobody set a retest trigger that said "industrial-grade casting in a flight-critical cryogenic load path requires X."

The rocket ran the test instead. The vehicle disintegrated 139 seconds into flight, taking with it 4,000 kg of cargo for the International Space Station. The cost of the missing rung was approximately the cost of one Falcon 9 plus its payload - discovered at the most expensive rung that was still running.

A missing rung doesn't disappear. It moves to the next rung up.

## How to apply

1. **Walk a fidelity ladder cheap-to-expensive.** Each rung's job is to make the next rung cheaper or more credible. Wind tunnel before drop tower before subscale balloon before full-scale balloon before flight. Cheap-rung failures are still development data - the Maraia subscale flights "did not provide usable capsule aerodynamic data" but surfaced rigging, release-circuit, and dynamics problems at subscale cost. That's a win, not a loss.

2. **Rank objectives in writing before execution.** Two to five objectives. Primary, secondary, tertiary. Pass/fail per objective. Report against the ranking, in order, after. The Maraia Flight #1 report - "primary objective not met... however, all secondary test objectives were met" - is the template. Honest report against a pre-written ranking, not a victory-lap summary.

3. **Write the "not because of X" clauses.** For every test, name the two or three ways the test could pass for the wrong reason. Software delay masking a real inhibit failure. Load applied at the wrong CG. Static propellant instead of fluid simulant. RBF pin still in. Stub service returning canned data. Block those before running.

4. **Define numeric retest triggers ahead of time.** Twenty fasteners. M2.5. Six months. Write the trigger matrix before the change is on the table. "If X changes, we do Y retest at Z levels." Decide retest criteria after the change and schedule pressure will silently move the bar - that's why the bar must be pre-committed in numbers, not "engineering judgment."

5. **Tier required vs advised; require a signed acknowledgment for skips.** Required tests protect mission safety. Advised tests protect the skipper's own outcome. Skipping advised requires a name attached - someone who owns the consequence. The signature is the mechanism that makes the risk visible.

6. **Enumerate every flight-vs-test delta.** Mass simulator? CG mismatch? Fluid simulant? Power state? Charge state? Connection sequence? Environmental exposures the test can't reproduce? Empty list means you haven't looked hard enough. Every delta is a named gap in evidence.

## Do

- Walk the cheap rung first. Wind tunnel before drop tower. Drop tower before balloon. Balloon before flight. Cheap rungs surface rigging, release-circuit, and dynamics problems at subscale cost - exactly what they are for.
- Rank objectives in writing before execution; report against the ranking honestly. "Primary not met, secondaries met" is a real report. "Successful test" is not.
- Write the "not because of X" clauses for every test. Name two or three ways this test could pass for the wrong reason, then close them off.
- Define numeric retest triggers ahead of time. Twenty fasteners, M2.5, six months - pre-committed numbers don't move under schedule pressure.
- Tier required vs advised. Require a signed acknowledgment for any advised test that gets skipped.
- Enumerate every flight-vs-test deviation. Mass, CG, fluid versus simulant, power state, charge state, connection sequence, environmental exposures the test cannot reproduce.
- Treat a cheap-rung "failure that didn't produce the primary data" as development data for the next rung. That's its job.

## Do not

- Do not skip to the expensive rung "to save time." You will spend the savings three times over on discovery - and the discovery moves to the most expensive rung still running. Skip the wind tunnel and the sounding rocket teaches you about parachute geometry.
- Do not re-rank objectives after results to make the report look better. The ranking is fixed before execution and that is what makes the report honest.
- Do not accept a pass that could be passing for the wrong reason. A separation inhibit that passes because the software hasn't sent the command yet is not an inhibit. Write the "not because of X" clauses before, not after.
- Do not decide retest criteria after the change. Schedule pressure will silently move the bar. Pre-commit the numbers.
- Do not let "advised" tests be skipped without a signed acknowledgment from someone who owns the consequences. The signature is the entire point.
- Do not treat "same mass" as "same article." Same mass with the wrong CG is a different load case. Same mass with frozen propellant is a different dynamic response. Use fluid simulants when the fluid moves.
- Do not let the test sequence be improvised. The order is the discipline. The order is what makes a "pass" mean something.

## Connects to

- **feedback-loops** - the test is the loop. Sequencing is what keeps the loop sharp and credible. A loop that closes on a wrong-reason pass is closed on a lie.
- **architecture** - what to test follows from the failure corpus you anchor on. The fidelity ladder runs cheap-to-expensive against the failure modes that matter most. Test where history says systems fail, not where it is convenient.
- **iterate-fast** - sequenced tests are what enable controlled iteration. Without sequencing, iteration is gambling. The cheap rung is what makes "fail fast" actually mean "fail cheaply, learn, advance."
- **system-engineering** - the component with the largest blast radius is the one that earns the most expensive test rung. Find the apex from the graph; aim the ladder at it.

---

A test that passes for the wrong reason is worse than a test that fails - because you'll trust it. The fidelity ladder, the ranked objectives, the "not because of X" clauses, the numeric retest triggers, the signed risk acknowledgments - these are the discipline that makes a "pass" mean something. The reader who internalizes this skill stops asking "did the test pass?" and starts asking "what would make this test pass for the wrong reason?" Build the sequence. Write the rankings before you run. Write the "not because of X" before you run. Write the retest numbers before the change. Then trust the sequence - because you built it before schedule pressure could touch it.

Design the test order today. Before the next test runs.

## Sub-skills

| Sub-skill | When to load |
|---|---|
| [fidelity-ladder-design](subskills/fidelity-ladder-design.md) | Sequencing tests cheapest-first before the expensive rig fires |
| [ranked-objectives](subskills/ranked-objectives.md) | Pre-declaring what the test must accomplish, in priority order, before it runs |
| [numeric-retest-trigger](subskills/numeric-retest-trigger.md) | Pre-committing thresholds that, if exceeded, force a re-test |
| [not-because-of-x-clauses](subskills/not-because-of-x-clauses.md) | Hardening pass criteria so a "pass" requires the right reason |

## Related spine skills

- [iterate-fast](../../03-execution/iterate-fast/SKILL.md) - testing-sequencing decides what to test; iterate-fast closes anomalies into design changes
- [feedback-loops](../../02-design/feedback-loops/SKILL.md) - testing-sequencing builds the signal; feedback-loops measures it
- [first-principles-thinking](../../01-foundation/first-principles-thinking/SKILL.md) - first-principles asks "what's the cheapest test that still tells me real physics?"; testing-sequencing arranges them

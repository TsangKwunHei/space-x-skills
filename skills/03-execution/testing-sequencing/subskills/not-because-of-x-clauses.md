---
name: not-because-of-x-clauses
description: Harden a test pass criterion so the test passes only for the right reason - load this skill whenever a test plan is being written, whenever a test result has just come back green, whenever someone is about to declare a campaign successful, whenever an inhibit, interlock, or safety check has been verified, whenever a partial-success outcome is being relabeled as a full pass, or whenever the user mentions "test passed but I don't trust it" or "are we sure that proved what we think it proved?" Especially load it before signing off on a qualification report. Anchored in the Falcon User's Guide §7.4.6 inhibit clause "and not because of other factors such as software delays" and the Maraia paper's discipline of distinguishing partial-success from objective-pass.
---

# "Not Because of X" Clauses

The Falcon User's Guide §7.4.6 (p.59) on activation inhibits:

> "Verification testing must show that power to the deployable, propulsion, and other hazardous secondary devices was successfully inhibited from a mechanical separation signal, and not because of other factors such as software delays."

Read the second clause. *Not because of other factors such as software delays.* That sentence closes a real cheat. A separation inhibit can pass the test because the software hasn't sent the activation command yet. The dashboard lights up green. The test report says "inhibit verified." In flight, the software delay is gone, the command goes out, and the device activates because the actual mechanical inhibit was never working.

Maraia ran the same discipline on flight reports. Flight #1: "The primary test objective… was not met since the release box was still attached during the freefall, creating additional drag (and stability). However, all secondary test objectives were met" (Maraia p.6). The capsule was recovered. It descended on a parachute. A casual reader could call that a successful flight. The Maraia team did not. They named the primary objective failure precisely and refused to let secondary passes paper over it.

Flight #2: "The release system remained attached, so a clean freefall configuration was not obtained… the tether line broke, but… remained attached to the capsule until after the chute deploy occurred. As a result, the freefall objective was not met for this flight" (Maraia p.6). The capsule landed safely. The objective still failed. Same discipline.

Final full-scale: "All objectives were met with the exception of the video objective" (Maraia p.7). The exception named, not glossed.

## What this is

A "not because of X" clause is a written constraint, attached to a test pass condition, that names the specific accidental ways the test could pass without the system actually working. The clause is added before the test runs. The instrumentation, the test setup, or the operating procedure is then designed to rule out each accidental path.

A test that passes for the wrong reason looks identical to a test that passes for the right reason - until flight. The clause forces you to enumerate the look-alike paths and close them, before the green light teaches the team to stop looking.

## When to use this

- Writing a test plan, especially for inhibits, interlocks, safeties, or any "negative" assertion (the system did NOT do something).
- Reviewing a test report whose top line is "passed."
- Closing out a qualification campaign before sign-off.
- Designing test instrumentation. The clauses tell you what to instrument.
- Reviewing a deviation request that argues "the test is essentially the same."
- Auditing a green CI pipeline that has stopped catching real bugs.

## When NOT to use this

- Pure exploration with no decision riding on the outcome.
- A unit test that is so tightly scoped it has only one path to pass. (Rare in practice.)
- After a test has already failed - the clauses help ensure passes are real, not failures.

## How to apply

1. **For each pass condition, ask: what could make this pass without the system working?** Brainstorm three. If you cannot think of three, you have not thought hard enough - every pass condition has at least three look-alikes.

2. **Write the look-alikes as "not because of" clauses attached to the pass condition.** Falcon §7.4.6 model: "X was inhibited, **and not because of** [look-alike A], [look-alike B], [look-alike C]." The grammatical pattern is the discipline.

3. **Design the test setup or instrumentation to rule each clause out.** This is where the clause earns its keep. A clause without a rule-out method is decoration. The Falcon §7.4.6 inhibit example demands instrumentation that distinguishes "the inhibit blocked the signal" from "the signal was never sent." That distinction is a test-setup design decision.

4. **Refuse partial-success relabeling.** A flight that recovered the hardware but did not produce the primary aero data is not a successful aero test. The Maraia subscale flights "were unable to achieve a clean freefall configuration and did not provide usable capsule aerodynamic data" (Maraia p.2). Even though "both payloads were recovered" (p.5) and avionics, GN&C, autonomous chute deploy, ground command exec, and recovery all passed (p.6), the primary aero objective was scored as failed. Recovery is not aero data. Holding that line is the skill.

5. **Name exceptions, never gloss them.** "All objectives met" is not a real report unless it is true. "All objectives met with the exception of the video objective" is a real report. The exception clause is the honesty mechanism. If the exception is large enough to need its own root-cause section ("when using Windows computers, simply deleting the data on a flash memory card (micro HD) is not adequate to clear the memory" - Maraia p.9), then "all met" was never the right summary.

6. **Apply the discipline to flight-vs-test deltas.** Falcon User's Guide §7.4.1 (p.55) on quasi-static load tests: "Customers should aim to replicate as close as possible in the test the CG position and mass of the flight article. Customers must account for CG and mass differences in test and adjust levels and/or use fluid simulants to represent propellant mass, where necessary." Same mass with the wrong CG is a different load case - a "passed because the CG was forgiving" is a not-because-of-X failure. Same mass with frozen propellant instead of fluid simulant is a different dynamic response - propellant slosh is part of the structural environment, not a footnote.

## Worked example

A team writes a test plan for a payload activation inhibit. Initial pass condition:

> The hazardous device shall not activate when the inhibit is engaged.

Apply the skill. Add "not because of" clauses:

> The hazardous device shall not activate when the inhibit is engaged, **and not because of**:
> - The activation command never being sent by software during the test window
> - The device being unpowered for unrelated reasons
> - A test harness blocking the activation signal upstream of the inhibit
> - The remove-before-flight pin still being inserted
> - A debug build with the activation path stubbed out

Now design the test setup to rule each clause out. Send a known activation command during the test window - close clause 1. Verify the device is fully powered before the inhibit test - close clause 2. Confirm the harness is in flight configuration with no test-only blocks - close clause 3. Confirm RBF pin removed and logged - close clause 4. Confirm the build is the flight build, with build hash recorded - close clause 5.

The result is a test that, when it passes, has actually verified the inhibit. Without the clauses, "the device did not activate" is consistent with all five accidental pass paths.

A second example: a team integrates a new payload and runs a load test on an integrated bracket. Pass condition: "Bracket survives 1.25× ultimate flight load" (Falcon User's Guide §6.1 Table 6-1, p.43). Add clauses:

> Bracket survives 1.25× ultimate flight load, **and not because of**:
> - Mass simulator with wrong CG, lowering effective bending moment
> - Static propellant instead of fluid simulant, missing slosh-induced load
> - Test fixture stiffness adding lateral support not present in flight
> - Load applied at the wrong point, masking a critical local stress

These map directly to Falcon §7.4.1's warning about CG, mass, and fluid simulants. The clauses are not novel; they are the bench-engineer's checklist made explicit.

## Anti-pattern

**The "successful test" report.** A test report that says "test was successful" without naming what the test could have passed for the wrong way is the failure mode of this skill. The Falcon User's Guide §7.4.6 (p.59) does not say "verify the inhibit"; it says "verify the inhibit, AND not because of software delays." The conjunction is the discipline.

**Partial-success relabeling.** The flight returned hardware. The chute deployed. The avionics worked. Therefore, the slide deck calls it a successful flight. The aero data was not obtained. The primary objective failed. Maraia named that exact pattern at p.6 and refused it. Recovery is not aero data. A pass that is "partial" is not a pass; it is a partial pass with a named partial failure.

**Glossed exceptions.** "All objectives met" when one was not is the lie this skill is built to prevent. Either every objective was met or one wasn't, and which one matters. "All objectives were met with the exception of the video objective" (Maraia p.7) is the honest form.

**Untested mass simulator.** A payload qualification with a mass simulator at the wrong CG, declared "qual passed," is a structural test that passed because the load distribution was forgiving. Falcon §7.4.1 names this exactly. The "not because of" clauses against test-vs-flight deltas would have caught it.

**Stub-driven green CI.** A test suite that passes because a remote dependency has been stubbed out - and the stub returns canned success - is the software-domain version of the inhibit cheat. The pass condition reads "API call succeeds." The actual integration is unverified. The clause to add: "the request actually reached the dependency and returned a real response, not a stub." Then build the test setup that distinguishes the two.

**Untested error path.** A test that passes by never exercising the error branch is passing for the wrong reason. The clause: "the error branch was reached and tested, not skipped because the input never invalidated." A green test suite where 30% of the lines are error handlers that have never been touched is a green test suite with a not-because-of-X failure on every error handler.

**Wind-tunnel data without instrumentation provenance.** The Maraia post-flight reconstruction added a constant -0.078 to C_A in the FAST simulation to match flight data (Maraia p.11). The pre-flight model was systematically wrong. A pre-flight test that "passed" against a wrong model passed because the model was forgiving - a not-because-of-X failure that only the flight data exposed. The clause for any model-validation test: "the model was independently verified, not just self-consistent with the test."

## CLI

```
node tools/clis/not-because-of-x.js test-plan.md > test-plan-hardened.md
```

Reads a markdown test plan or a JSON `{"objectives": [...]}` and appends 2–3 common accidental-pass clauses per objective. The output is a starting point - review and tailor each clause to the specific test setup before shipping.

## Related skills

- Parent: [testing-sequencing](../SKILL.md)
- Pairs with: [ranked-objectives](ranked-objectives.md) - every objective gets its own clauses
- Pairs with: signal-determinism-check (route via your parent spine to feedback-loops) - non-deterministic signals are accidental-pass machines
- Compose with: [fidelity-ladder-design](fidelity-ladder-design.md) - each rung needs its own clause set; flight-vs-test deltas multiply with rung distance
- Compose with: pre-commitment-gate (route via your parent spine to feedback-loops) - the clause set is signed before the test

## Source

- Primary: Falcon User's Guide §7.4.6, p.59 (inhibits "and not because of other factors such as software delays")
- Primary: Maraia capsule paper p.6 (Flight #1 primary failure named despite recovery; Flight #2 freefall objective failed despite soft landing)
- Primary: Maraia p.7 ("All objectives were met with the exception of the video objective" - exception explicitly named)
- Primary: Maraia p.2 (subscale "successfully served as development tests… but were unable to achieve a clean freefall configuration and did not provide usable capsule aerodynamic data")
- Supporting: Falcon User's Guide §7.4.1, p.55 (CG, mass, fluid simulant - flight-vs-test deltas)
- Tool: tools/clis/not-because-of-x.js

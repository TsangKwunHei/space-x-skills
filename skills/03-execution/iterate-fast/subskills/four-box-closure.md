---
name: four-box-closure
description: Close every anomaly with all four boxes - root cause, design change, test that catches it, doc revised - before the ticket closes. Three boxes leaves the loop open and the failure recurs. Use this skill whenever the user says "post-mortem," "anomaly review," "incident closure," "RCA," "we figured out what broke," "lessons learned," "we'll be more careful next time," "training fix," or is about to close a ticket whose only artifact is a written explanation of what went wrong. Anchored on the Maraia eyebolt parenthetical and the CRS-7 TR-1 design-level recommendation.
---

# Four-Box Closure

> "(The electrical setup of this system was modified for future flights.)"
>
> - Maraia Capsule Flight Test Report, Section III.A, on Flight #1 anomaly closure (Maraia p.5)

One parenthetical sentence. Inside it: the design change that made the failure mode unrepeatable. The same paragraph names the root cause (twisting during ascent pulled the burn-circuit electrical connection loose from its power source). The next flight added a barometric altimeter (instrumentation update). The report itself is the doc revision. Four boxes, all checked, before Flight #2 was attempted.

## What this is

A discipline: an anomaly is not closed until **all four boxes** are filled in writing in the same artifact:

1. **Root cause named** - the initiating cause, not a symptom. "We think it might be" is not closed.
2. **Design change made** - the thing that failed is a different thing now. Not a procedure note, not a training memo.
3. **Test that catches it exists** - the test gauntlet that let the failure through has been patched. Reproduce-the-bug-then-fix.
4. **Doc / model / spec revised** - the artifact the next program will reuse has been corrected. The Maraia FAST simulation got -0.078 added to C_A. Reports do not compound. Models do.

Three of four leaves the loop open. The same failure will recur. Programs do not lose to novel failures; they lose to old failures that closed at three boxes.

## When to use this

- Any incident, post-mortem, RCA, or anomaly review is in progress.
- A team is about to close a ticket whose only artifact is a written explanation.
- A "lessons learned" doc has been written but no design or test artifact has changed.
- Someone proposes "we'll be more careful next time" or "we'll add it to the runbook" as a fix.
- A flaky test was retried until it passed and someone is about to mark it resolved.

## When NOT to use this

- The anomaly is still in active investigation; root cause is not yet known. Use the skill at closure, not during diagnosis.
- A trivial cosmetic issue (typo, log message wording) where design / test / doc churn would cost more than the bug.
- The artifact is genuinely process-only by design (e.g., a one-time human onboarding mistake on a system that humans should not have been touching) - but flag whether the system itself should have prevented the access.

## How to apply

1. **Open the closure checklist before writing the ticket summary.** Four boxes, by name. Refuse to close with any box empty.

2. **Box 1 - Root cause.** Walk the chain to the initiating cause. CRS-7's IRT walked the chain: Stage 2 LOx tank rupture (proximate) ← COPV liberation (intermediate) ← rod end of axial strut broke under ascent loads (initiating) (CRS-7 p.7). "Material defect" alone was not the closure; the IRT named "more than just rod end material defect" as initiating cause.

3. **Box 2 - Design change.** The thing that failed must be a different thing now. The Maraia closure: "The electrical setup of this system was modified for future flights." (Maraia p.5). The CRS-7 TR-1 closure: a design-level requirement to evaluate manufacturer recommendations for commercially sourced parts in flight-critical applications, with screening, modeling, and load testing under predicted flight conditions (CRS-7 TR-1, p.8). Not "we will be careful." Not "we will train." A design change.

4. **Box 3 - Test that catches it.** The gauntlet that let the failure through has a hole. Patch it. After Maraia Flight #1, future flight readiness checks must verify the harness survives the same twisting environment. If you cannot describe the test that would now catch the failure, the design change is not specific enough.

5. **Box 4 - Doc / model / spec revised.** What artifact will the next program reuse? That is the artifact to update. Maraia rebuilt the FAST simulation aero model: "A constant value of -0.078 was added to CA in order to achieve this matching" plus an extracted C_{m,q} curve from Mach 0.3–0.8 (Maraia p.11). The model got smarter. The next program inherits the smarter model, not a wiki page no one will read.

6. **Run the CLI.** `node tools/clis/four-box-closer.js --interactive` walks the four prompts and refuses to print a closure summary until each box has a non-empty entry. Use it as the gate on the closure ticket.

7. **If any box is empty, the ticket does not close.** Re-open. Assign the missing box. The discipline is the refusal to close at three.

## Worked example

**Anomaly:** Maraia Flight #1, July 26, 2012 - eyebolt failed at launch (two-point attach became single-point); release command at 72,500 ft produced no release (Maraia p.5).

**Box 1 - Root cause:** "the twisting of the capsule during ascent caused the electrical connection of the burn circuit to pull loose from the power source. The command was received by the avionics, but the lack of power to the release box system prevented it from functioning properly." (Maraia p.5)

**Box 2 - Design change:** "(The electrical setup of this system was modified for future flights)." (Maraia p.5)

**Box 3 - Test that catches it:** Future flight readiness check verifies the harness survives the ascent twisting environment. (Implied by the design change being carried into Flight #2 readiness review; the test is the verification that the modified electrical setup does not pull loose.)

**Box 4 - Doc / spec revised:** The flight report itself documents cause and fix in the same paragraph, and the operations procedure was updated: "Future flights will permit separate commands for better control of payload landing locations." (Maraia p.4) Plus an instrumentation upgrade carried forward: "A barometric altimeter was added for Flight #2." (Maraia p.4)

Four boxes, all checked, in the same report. Flight #2 then flew. The same failure mode did not recur.

## Anti-pattern

**The "training fix" closure.** A team writes the post-mortem, names the root cause, and closes the ticket with: "Engineering team to review checklist; operators to be trained on new procedure." No design change. No new test. The next time schedule pressure is on, the operator skips the checklist step, and the same failure recurs.

CRS-7 TR-1 is the standard against which to judge any "training fix": "SpaceX should apply particular emphasis to understanding manufacturer's recommendations for using commercially sourced parts in flight critical applications." (CRS-7 TR-1, p.8) That is a design-level requirement - a change to *how parts are screened, derated, and tested before they ever see a flight load path*. Not a memo. Not a checklist item. A change to the screening process that the next program inherits whether anyone remembers Flight 020 or not.

If your closure says "we will be more careful," you are at three boxes. The same failure will recur. Re-open the ticket and write the design change.

## Related skills

- Parent: [iterate-fast](../SKILL.md) - closing the loop after every anomaly is one of the three disciplines that compound into fast iteration
- Pairs with: [recovery-as-instrumentation](recovery-as-instrumentation.md) - recovered hardware is what lets you find the root cause in the first place; without recovery, Box 1 is a guess
- Pairs with: not-because-of-x-clauses (route via your parent spine to testing-sequencing) - Box 3 needs to verify the test passes for the right reason, not because of a software delay or cached upstream
- Compose with: numeric-retest-trigger (route via your parent spine to testing-sequencing) - Box 3's test belongs in the pre-written retest schedule so it actually runs on the next iteration
- Compose with: model-fudge-factor (route via your parent spine to feedback-loops) - Box 4's doc revision is often a model parameter update, not a wiki edit

## Source

- Primary: Maraia Capsule Flight Test Report, Section III.A - eyebolt failure, burn-circuit twist, parenthetical design fix (Maraia p.5); operations and instrumentation updates (Maraia p.4); FAST simulation model update -0.078 to C_A (Maraia p.11)
- Primary: CRS-7 IRT Public Summary - TR-1 design-level recommendation on commercially sourced parts (CRS-7 TR-1, p.8); cascade chain from rod end to vehicle breakup (CRS-7 p.7)
- Tool: `tools/clis/four-box-closer.js` - interactive checklist that refuses to print closure until all four boxes are filled

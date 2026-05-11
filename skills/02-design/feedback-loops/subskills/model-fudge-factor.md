---
name: model-fudge-factor
description: Push every flight finding back into the simulator, the test fixture, or the reference model - the place the next decision will pass through - and name the correction explicitly so it is auditable. Use this skill whenever the user has a flight, deploy, experiment, or production finding that contradicts a pre-flight model and is about to be filed in a wiki page or post-mortem document. Findings in models compound; findings in reports die.
---

# Model Fudge Factor

The Maraia post-flight reconstruction is unusually direct. After the full-scale balloon flight, the team compared flight data to pre-flight predictions and found a systematic mismatch in altitude vs velocity. The paper reports the correction in one sentence: "The aerodynamic model in the FAST simulation was systematically adjusted in order to match the flight data. Figure 13 shows the matched velocity and altitude profile. The match appears to be very good. A constant value of -0.078 was added to C_A in order to achieve this matching" (Maraia p.11).

The pre-flight model was based on Apollo Entry capsule data and CFD. The flight data showed the assumed C_m,q model "was very different than the actual performance of the vehicle. The pre-flight simulation actually shows a fairly unstable vehicle. The flight showed a limit cycle behavior on the angle of attack and sideslip parameters" (Maraia p.11). Figure 19 (p.14) shows the post-flight C_m,q curves at Mach 0.3, 0.5, 0.6, 0.7, 0.8 - extracted from the flight data, replacing the Apollo-analogy assumption.

The next analyst inherits the -0.078 correction automatically because it lives in the simulator. They do not have to find a wiki page, read it to the bottom, and remember to apply it. They run the simulation, and the correction is already there.

## What this is

A discipline for closing the loop between flight (or deploy, or experiment) and the next design pass. Findings get encoded in the artifact that the next decision passes through - the simulator, the test fixture, the linter, the schema validator, the type definition, the load-test scenario. Not in a separate document.

The skill has three parts:

1. **Push the correction into the model.** Wherever the next analyst will look, the correction is already applied. Default to the new behavior; require an opt-out comment to use the old one.
2. **Name the correction explicitly.** "-0.078 was added to C_A" is auditable. A silent correction is a lie the next engineer will inherit without warning.
3. **Resist the wiki-page temptation.** A "lessons learned" document does not get written, does not get found, does not get read. The model gets run.

## When to use this

- Flight, deploy, experiment, or production data has just contradicted a pre-flight or pre-deploy model.
- Someone is about to write a post-mortem doc that captures the finding "for future reference."
- A simulator, test fixture, type system, or schema validator exists where the correction could live but currently does not.
- A "lessons learned" document is the proposed deliverable. Suspect that it is the loop dying, not the loop closing.

## When NOT to use this

- The finding is genuinely one-off and not predictive (a hardware failure with no implication for the model). File it, but do not corrupt the model with a one-off.
- The model itself was correct; the deploy was wrong. Fix the deploy, not the model.
- No model exists yet. Build the model first; correction comes later. Without a model, there is no place for the correction to land.

## How to apply

1. **Identify the model the next analyst will run.** The Maraia simulator (FAST) is the obvious example. In software: the load-test scenario, the type schema, the canonical fixture, the migration linter, the deployment template. The model is whatever the next decision passes through automatically.

2. **Compute the correction.** What value, what curve, what configuration would have made the model match the observed reality? "A constant value of -0.078 was added to C_A" is the form. For software: "expected p99 latency was 80ms; observed 130ms; the load-test scenario is updated to drive 130ms baseline." Numeric, specific, auditable.

3. **Land the correction in the model with a named comment.** The simulator file gets a one-line comment: `# C_A correction -0.078 from Maraia full-scale balloon flight, 19 Aug 2013, see report Sec IV.C.` The next analyst running the simulation sees the correction in the diff, can audit its provenance, and can challenge it if circumstances change.

4. **Update the structurally adjacent assumptions.** Maraia did not stop at -0.078 on C_A. Figure 19 (p.14) shows the new C_m,q model - the entire Mach 0.3–0.8 family, replacing the Apollo-data assumption. One finding often invalidates a related family of assumptions; chase the implications.

5. **Run the model after every comparable event.** A correction that lives in the simulator only helps if the simulator is run before the next decision. Make the model the gate, not an optional reference.

6. **Resist the wiki page.** If someone proposes "we'll capture the finding in a Confluence page so people can read it later," ask where in the model it should land instead. The wiki page is the loop dying. The model entry is the loop closing.

7. **Pair with two-speed reporting.** The slow learning report (L+8 weeks for Falcon, two weeks for most software incidents) is where the model correction belongs. The fast unblock report does not have time to compute it; the slow report does.

## Worked example

A team runs a load test before a major release. Pre-release model predicts p99 latency of 80ms at peak load. The release ships. Real production traffic at peak shows p99 latency of 130ms - the model under-predicted by 60%. No outage, but the headroom assumption was wrong.

The wrong response: file a Jira ticket "investigate p99 mismatch," add a paragraph to the post-mortem, move on. Six months later the next release runs the same load-test model, gets 80ms again, and the same 60% miss recurs because nobody read the Jira ticket.

The right response, Maraia-style:

- **Find the model.** The load-test scenario lives in `loadtests/release-readiness.yaml`. It generates synthetic traffic with a request mix calibrated from production logs from 30 days prior.
- **Compute the correction.** The 80ms vs 130ms gap traces to a single missing request type - large-payload analytics queries, which were 0.3% of traffic but accounted for 40% of p99 latency. The pre-release synthetic mix had them at 0.05%.
- **Land the correction.** `loadtests/release-readiness.yaml` is updated with `large_payload_share: 0.003 # corrected from 0.0005 based on Q3 release latency miss, see incident-2024-09-12.md`. The new default reproduces the observed p99 within 5%.
- **Update structurally adjacent assumptions.** The capacity-planning doc gets a similar update (request mix, per-class latency budget). The autoscaling rule for the analytics service gets re-tuned.
- **Run the model.** Next release uses the corrected load test; the predicted p99 now matches observed within tolerance. The team has bought a permanent calibration with one finding.

The correction is auditable: a future engineer running `git blame` on `loadtests/release-readiness.yaml` finds the comment and the incident link, and can challenge the value if the request mix shifts again. The wiki page never had to exist.

## Anti-pattern

A team holds a post-mortem after a production incident, identifies a precise root cause, writes a 12-page Confluence document with diagrams, and links it from the team wiki under "incidents." Six months later, the same root cause produces a similar incident. The post-mortem author has left the company. The new on-call engineer never read the document. The 12-page diagram captured everything except the next engineer's attention, which was the only thing that mattered.

The Maraia anti-pattern: imagine the team finishing the full-scale balloon flight, writing a beautiful conference paper documenting the C_A mismatch, and shipping the next-generation capsule using the unmodified pre-flight simulator with the Apollo-analogy C_m,q. The paper would be cited; the simulator would still be wrong. Maraia refuses that path: the simulator is updated, and the next analysis runs the corrected model whether or not anyone reads the paper.

A second anti-pattern: applying the correction silently. A simulator gets `-0.078` added to `C_A` with no comment, no source, no incident link. Two years later, an engineer modifying the simulator deletes "the magic number" thinking it was a typo. The correction is lost; the next flight reproduces the original mismatch. The discipline is push-into-model AND name-the-correction; one without the other fails.

## Related skills

- Parent: [feedback-loops](../SKILL.md)
- Pairs with: [two-speed-reporting](two-speed-reporting.md) - the slow learning report is where the correction is computed and landed
- Pairs with: recovery-as-instrumentation (route via your parent spine to iterate-fast) - recovered hardware/data is the source of the correction
- Compose with: assumption-audit (route via your parent spine to first-principles-thinking) - every model finding is an assumption falsified; audit the family of related assumptions
- Compose with: four-box-closure (route via your parent spine to iterate-fast) - the model update is one of the four boxes that must close before an anomaly is resolved

## Source

- Primary: Maraia p.11 ("A constant value of -0.078 was added to C_A in order to achieve this matching"); Maraia p.11 (pre-flight simulation showed unstable vehicle; flight showed limit cycle); Maraia p.14, Fig. 19 (extracted C_m,q curves at Mach 0.3, 0.5, 0.6, 0.7, 0.8 replacing the Apollo-data assumption)

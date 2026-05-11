---
name: iterate-fast
description: Fail fast in a controlled way, recover hardware as instrumentation, and close every anomaly into a design change before the next run. Use this skill whenever the user says "ship fast," "iterate," "MVP," "experiment," "rollback," "recover from failure," "post-mortem," "anomaly," "what should we do after this broke?", or "is it safe to try X?" - and especially when they're hesitating to run a recoverable experiment. This is the boldness skill of the set: if the abort is cheap, run the experiment.
---

# Iterate Fast

Maraia Flight #1 was a small subscale capsule lifted by balloon to 72,500 feet for a freefall and parachute test. Two things went wrong on a single flight.

At the moment of launch, an eyebolt failed on the capsule. The two-point attachment to the upper payload became a single-point attachment. The flight kept going.

At 72,500 feet, the command to release the capsule was sent. No release was observed. Post-test analysis found that the twisting of the capsule during ascent had pulled the electrical connection of the burn circuit loose from its power source. The avionics received the command. There was no power to act on it.

Then comes one parenthetical sentence in the report:

> "(The electrical setup of this system was modified for future flights.)"

That parenthetical is the entire skill. Anomaly. Root cause. Design change. Test. Doc. Five boxes, all checked, before the next flight. The team did not file the post-mortem and move on. They did not write a procedure note saying "be more careful with the burn circuit harness." They modified the electrical setup so this exact failure could not recur. And the next flight flew.

## What this is

Fast iteration is not "ship more, think less." It is three disciplines compounding:

1. **Fail fast in a controlled way.** Walk a fidelity ladder. Run the cheapest rung first. The cheap rung's failure is still development data.
2. **Recover hardware as instrumentation.** Flown hardware you can inspect is the highest-grade signal you will ever get. Design recovery in from day one.
3. **Close every anomaly with all four boxes.** Root cause named, design updated, test now catches it, doc revised. Three of four leaves the loop open. The same failure will appear on the next flight.

The fourth discipline, which makes the first three possible: **make the abort cheap.** If a scrub costs an hour when it could cost minutes, schedule pressure will silently loosen your go/no-go thresholds. Cheap rollback is what lets strict gates stay strict.

When the abort is cheap, the cheap rung is built, and the loop closes after every anomaly - that is when you can safely take the experimental step that would have terrified you a year ago. That is what boldness looks like in practice. Not bravado. Discipline that earns the right to dare.

## In practice

### The disciplined move: Maraia eyebolt to next flight

The Maraia team did not have a clean test. An eyebolt failed at launch. The release command at altitude did nothing because the burn circuit had been twisted loose from its power source during ascent.

What they did with that anomaly is the skill:

- **Root cause named:** the twisting motion during ascent pulled the electrical connection of the burn circuit loose from its power source.
- **Design updated:** "The electrical setup of this system was modified for future flights."
- **Test that catches it:** future flight readiness checks now have to verify the harness survives the same twisting environment.
- **Doc revised:** the report itself documents the cause and the fix in the same paragraph.

Five boxes, all checked, before the next flight. That is what closing the loop looks like. The loop closing is what allowed the program's full-scale balloon drop to meet "all objectives ... with the exception of the video objective." Subscale flights surfaced rigging, release-circuit, and dynamics problems at subscale cost. The full-scale flight then flew.

### The disciplined move: booster reuse as instrumentation

Falcon User's Guide §1.3, as of February 2025: SpaceX has re-flown Falcon first-stage boosters more than 384 times with a 100% success rate. Fairing halves: 307 missions, 100% success rate. The phrase that matters:

> "By re-flying boosters and fairings, SpaceX increases reliability and improves its designs and procedures by servicing and inspecting hardware as well as incorporating lessons that can only be learned from flight."

"Lessons that can only be learned from flight." The hardware comes back. Engineers inspect it. The design improves. Reuse is not just a cost-saving measure. It is the highest-grade signal in the program. A booster you can put under a microscope after flight tells you things no simulation, no static fire, and no acceptance test can.

The translation for non-aerospace work: every crashed job, every returned unit, every anomaly telemetry trace, every failed instance is flown hardware. If you are deleting it on a schedule shorter than your investigation cycle, you are throwing away your best signal.

### The disciplined move: cheap abort enables strict gates

Falcon User's Guide §10.5.6:

> "Falcon launch vehicle systems and operations have been designed to enable recycle operations when appropriate. In the event of a launch scrub, the transporter-erector and launch vehicle will typically stay vertical. Remaining on the pad provides uninterrupted payload-to-EGSE connectivity through the T-0 umbilical, eliminating the need to relocate EGSE from the instrumentation bay to the hangar after a scrub."

Read that twice. The vehicle stays vertical after a scrub. The umbilical stays connected. The EGSE does not have to be relocated. A scrub that could have cost a day costs hours. The result: the launch director can hold to strict go/no-go thresholds without the team silently shading them looser to avoid an expensive abort.

This is the principle: **the cost of aborting determines how strict your pre-commit gates can be.** If your rollback takes a day when it could take minutes, that delta will silently erode your standards under schedule pressure. Operators do not announce that they have lowered the bar. They just stop catching the marginal cases. The fix is not "be more rigorous." The fix is to engineer the abort to be cheap.

The mechanism is reinforced by another Falcon design choice: hold-down. Engines ignite while the vehicle is held down by hydraulic clamps. The flight computer evaluates ignition and full-power performance during prelaunch hold-down, and only then is the hydraulic release activated at T-0. A safe shutdown is executed if any off-nominal condition is detected. The commit step happens after the in-configuration verification, not before. That is what a cheap abort buys you - the right to verify in flight configuration and walk away if it does not look right.

### The disciplined move: the cheap rung's failure is still data

Maraia ran five test rungs before the planned sounding rocket flight: low-speed wind tunnel, drop tower, two subscale balloon flights from 100,000 ft, full-scale balloon from 100,000 ft.

The two subscale balloon flights "did not provide usable capsule aerodynamic data." Read literally, both flights missed their primary aerodynamic objective. Read correctly: they were development tests for the full scale. They surfaced rigging problems, release-circuit problems, and dynamics problems at subscale cost. The eyebolt failure and burn-circuit-disconnect on Flight #1 - both came from this rung. Both got fixed before the more expensive rung flew. The full-scale flight then met all objectives except the video objective.

The trap the principle catches: dismissing a subscale test as a failure because its primary objective missed. The cheap rung's job is not to be a clean dress rehearsal. Its job is to fail in ways the expensive rung cannot afford to.

### The disciplined move: two-speed reporting

Falcon does not produce one post-flight report. It produces two, both with hard deadlines:

- **Separation + TBD minutes - Orbit Injection Report:** "best-estimate state vector, attitude, and attitude rate based on initial data." The customer is unblocked immediately.
- **L + 8 weeks - Flight Report:** "the flight, environments, separation state, and a description of any mission-impacting anomalies and progress on their resolution." The learning artifact is shipped to a calendar date.

Two speeds. Both deadlines hard. The fast one unblocks the customer. The slow one captures the learning. Merge them into a single "we'll do it when we have time" report and the slow one never gets written. Ship only the fast one and the learning dies.

### The disciplined move: hold-down before commit

The Falcon launch sequence is structured around a single principle that maps directly to fast iteration: do not commit until the system has proved itself in flight configuration.

> "The flight computer evaluates engine ignition and full-power performance during the prelaunch hold-down, and if nominal criteria are satisfied, the hydraulic release system is activated at T-0. A safe shutdown is executed should any off-nominal condition be detected."

The engines ignite. The vehicle is held down by hydraulic clamps. The flight computer reads telemetry from the actual flight configuration with the actual hardware at full power. Only after that data confirms nominal does the release activate. If anything looks wrong, a safe shutdown happens with the vehicle still on the pad. That is what "fail fast in a controlled way" looks like at industrial scale: an irreversible action gated by an in-configuration verification that costs almost nothing if the answer is "no."

The translation: every irreversible deploy needs a hold-down equivalent. Not staging, which is a different environment. Not unit tests, which verify the parts. The integrated flight configuration, with real telemetry, evaluating nominal - and only then committing. If your system does not have a hold-down step, the first signal that something is wrong is the failure itself. That is too late to iterate fast.

### The trap: closing an anomaly with only a process fix

The CRS-7 NASA Independent Review Team - investigating the loss of a Falcon 9 to a single industrial-grade rod end at the apex of a load chain - issued Technical Recommendation TR-1:

> "SpaceX should apply particular emphasis to understanding manufacturer's recommendations for using commercially sourced parts in flight critical applications."

That is a design-level requirement. Not "we'll train people to be more careful." Not "we'll add a checklist." A change to how flight-critical commercial parts are screened, derated, and tested before they ever see a flight load path. A "training fix" or "we'll be more careful" is not a design fix. The same failure will recur until the design changes.

When you close an anomaly, write the design change in the same ticket. If you cannot, the ticket does not close.

### The trap: passing for the wrong reason

Falcon §7.4.6, on activation inhibits testing:

> "all necessary power components and harnesses must be fully integrated and in a flight-like state. Batteries must be in their flight-like charge state and any RBF/GSE inhibits must be removed. Verification testing must show that power to the deployable, propulsion, and other hazardous secondary devices was successfully inhibited from a mechanical separation signal, and not because of other factors such as software delays."

Read the last clause. "Not because of other factors such as software delays." The test is supposed to demonstrate that the mechanical inhibit holds. A software delay during the test could mask a real inhibit failure - the test would pass, the inhibit would not actually be working, and the failure would surface in flight when the timing changed.

The fast-iteration version of this trap: shipping a feature whose tests pass for the wrong reason. The flaky test that "self-resolves" by getting more retries. The integration test that passes because the upstream service happens to be cached. The canary that passes because the load balancer has not yet shifted real traffic. Every one of those is a hold-down evaluation that "passed" for a reason unrelated to whether the actual failure mode is closed. Write the "not because of X" clauses before you run the test, and reject any pass whose mechanism you cannot name.

### The trap: throwing away the evidence

The unspoken anti-pattern that kills programs: every flown unit gets discarded, every crashed job gets garbage-collected, every returned product gets refurbished and shipped without forensics. Every cycle, the team learns nothing they did not already know.

The Falcon User's Guide §1.5.3 names the alternative:

> "Stage recoverability also provides a unique opportunity to examine recovered hardware and assess design and material selection to continually improve Falcon 9 and Falcon Heavy."

Recoverability is design intent. It does not happen by accident. If your system does not currently let you inspect what came back, that is a design bug. Fix it before you run the next experiment.

### The disciplined move: design for inspection from day one

Falcon User's Guide Table 1-1 lists the safety benefits of architectural choices. One stands out for iteration:

> "Non-explosive, pneumatic release and separation systems ... significantly reduce orbital debris signature, can be repeatedly tested during the manufacturing process, and eliminate hazardous pyrotechnic devices."

The pneumatic stage separation system "allows for acceptance and functional testing of the actual flight hardware, which is not possible with a traditional explosives-based separation system."

Read that carefully. A pyro-based separation system can only be qualified by analogy - you fire test articles, you test the design, but you cannot test *the actual unit you are about to fly*. A pneumatic system can be tested on the flight article itself, repeatedly, before flight. The design choice - pneumatic over pyrotechnic - is a choice to keep iteration alive throughout the lifecycle.

Translation: when a design choice irreversibly couples two work stages (sealing, bonding, write-once initialization), name what inspection access you permanently lose. That loss is the real cost. Choose the re-testable mechanism whenever the costs are comparable. The Falcon design pattern: prefer the mechanism that lets you test the flight article itself, not just an analog of it.

### The disciplined move: pre-write the retest triggers

Falcon Table 7-2 defines two retest trigger types - Penalty Retest (workmanship drift) and Delta Qualification (design change) - pre-agreed between SpaceX and customer in the LAT schedule. Specific numeric thresholds are written down before the changes occur:

- Rework of more than **twenty fasteners** on secondary structures - Penalty Retest.
- Rework of fasteners **smaller than #3 (or smaller than M2.5)** - Penalty Retest.
- Production line interruptions for **6+ months**, change in final assembly work instructions, supplier or personnel change - Delta Qualification.
- Drift in component-level natural frequencies, substantial change in component mass or MOI - Delta Qualification.

The principle: arguing "does this change need a retest?" after the change is a political negotiation contaminated by schedule pressure. The criteria silently move when the ship date gets close. Pre-writing the numeric thresholds - twenty fasteners, M2.5, six months - fixes the criteria so they cannot move.

Translation for fast iteration: define "what change forces a re-test" in writing before the change happens. "Did the data schema change? Re-run the contract tests." "Did the model retrain on >5% new data? Re-run the eval suite." "Was the auth library upgraded? Re-run the security gauntlet." Numeric thresholds, written down, agreed before the change. Otherwise the team will iterate fast right past the test that would have caught the failure.

### The disciplined move: nine engines plus a supervisor that reroutes around failure

Falcon 9 has nine Merlin engines on the first stage. Falcon Heavy has 27. Both have engine-out capability through much of first-stage flight:

> "System-level vehicle management software controls the shutdown of engines in response to off-nominal engine indications; this has been demonstrated in flight, with 100% primary mission success."

The engines are not the redundancy. The supervisor that decides which engine to shut down - and whether the remaining engines can still hit the target velocity - is the redundancy. Engine-out is not a passive property of having nine engines. It is an active control plane that monitors each engine individually during ascent and preemptively commands shutdown of off-nominal engines if the minimum injection success criteria are still achievable with the remaining engines.

The translation: every iteration that survives in production becomes data for the supervisor. Each engine bay is "isolated from neighboring engines" not because the team trusts redundancy in the abstract, but because real flight data informed the blast-radius design. That is what 384 reflights buys you. Inspection of returning hardware feeds the design. The design feeds the supervisor. The supervisor lets you iterate faster, because the next anomaly does not take the whole vehicle.

### The trap: the model never learns

Maraia post-flight reconstruction: "The vehicle sensors supplied position, velocity, attitude, and attitude rate. The aerodynamic model in the FAST simulation was systematically adjusted in order to match the flight data ... A constant value of -0.078 was added to C_A in order to achieve this matching." The pre-flight simulation, based on Apollo data and CFD, "actually shows a fairly unstable vehicle. The flight showed a limit cycle behavior on the angle of attack and sideslip parameters." The team then extracted a new C_{m,q} model from the flight data across Mach 0.3–0.8 and updated the institutional knowledge.

The trap: stash the findings in a report and reuse the pre-flight model for the next design. The gap persists. The simulation keeps lying to the next program. The fix: every flight produces data, the model is the accumulated knowledge, the model gets updated. Not the report. The model. Reports do not compound. Models do.

## How to apply

1. **Design rollback cheap.** Before you tighten your go/no-go thresholds, measure how long an abort actually takes today. Time it. If it is hours when it could be minutes, work that down first. Concretely: keep the connections that are expensive to re-establish. Falcon's vehicle stays vertical, the umbilical stays connected, the EGSE stays in place. The equivalents for software: keep the database connection, the build artifacts, the warm cache, the canary's configured environment. Strict gates only hold when the abort is cheap; otherwise the team silently relaxes them under pressure to avoid the expensive scrub.

2. **Build the cheap rung.** Walk the fidelity ladder. Before the expensive test, run the cheapest test that could falsify the most assumptions. Maraia ran five rungs - wind tunnel, drop tower, two subscale balloon flights, full-scale balloon - before the planned sounding rocket. The two subscale balloon flights "did not provide usable capsule aerodynamic data" - and were still development tests for the full scale, surfacing rigging, release-circuit, and dynamics problems at subscale cost. Skipping the cheap rung to "save time" is how you spend the savings three times over on discovery.

3. **Run it. Report ranked-honestly against pre-written objectives.** Write 2–5 objectives ranked primary / secondary / tertiary before the test. Define pass/fail per objective. Report in that exact structure. Maraia Flight #1 reported: "The primary test objective, obtaining performance data on the aerodynamic and dynamic properties of the sub-scale capsule, was not met since the release box was still attached during the freefall, creating additional drag (and stability). However, all secondary test objectives were met, including successful autonomous parachute deployment, demonstration of avionics and GN&C in flight, execution of ground commands in flight and observation of system response, and recovery of both payloads." That sentence is the template. Primary missed. Secondaries met. Both stated. No re-ranking after the data came in.

4. **Close every anomaly with all four boxes.** Before the ticket closes, check:
   - **Root cause named** (not "we think it might be"). Walk the chain to the initiating cause.
   - **Design updated** (not "we will be careful"). The thing that failed is a different thing now.
   - **Test now catches it** (the test that would have caught the failure exists and is in the suite). If the failure flew through your test gauntlet, the gauntlet has a hole. Patch it.
   - **Doc revised** (the spec, runbook, model, or training material that misled the team has been corrected). For Maraia, the model itself got a -0.078 fudge to C_A and an extracted C_{m,q} curve. Doc revision is not just text; it is whatever artifact the next program will reuse.

   If any box is empty, the loop is open and the failure will recur. The Maraia parenthetical - "The electrical setup of this system was modified for future flights" - is what a closed loop reads like.

5. **Recover the hardware.** Crashed jobs, failed instances, returned units, anomaly telemetry - these are your flight-proven evidence. Do not delete them on a schedule shorter than your investigation cycle. Design the recovery from day one, the way Falcon was designed for booster return from day one. Inspect what comes back. Reuse is an instrumentation strategy, not a cost-saving measure. The 384 booster reflights are not just cheap launches; they are 384 inspection opportunities, each one a chance to surface a defect simulation could not.

6. **Run two-speed reporting.** Ship the unblock report immediately - the state vector, the metric, the "did the customer get what they needed" answer. Ship the learning report on a hard calendar deadline - Falcon does this at L+8 weeks. Both deadlines hard. Merge them into one and the slow one never gets written.

7. **Dare to try.** Once the abort is cheap, the cheap rung is built, the model has absorbed the last anomaly, and the loop has been closed with all four boxes - take the experiment that would have terrified you a year ago. That is the move boldness earns. Anomaly is data. The team that has learned to extract it can run experiments the safety-only team cannot.

The compact form of all seven steps, for the next time you are about to run an experiment:

- Is the abort cheap? (If not, fix that first.)
- Did the cheap rung run before the expensive one?
- Are the objectives ranked and written down?
- Was the last anomaly closed with all four boxes?
- Will the hardware come back for inspection?
- Are both reports on hard deadlines?
- If yes to all six - run it.

## Do

- **Design the abort cheap.** Vertical-recycle Falcon stays connected to its EGSE through the T-0 umbilical so a scrub does not burn the campaign. Build the equivalent for your system - the connections that survive a rollback, the artifacts that do not have to be rebuilt, the configuration that does not have to be relocated. The cheaper your abort, the stricter your gates can be.
- **Recover and inspect.** "Lessons that can only be learned from flight" is the principle. 384 booster reflights at 100% success. 307 fairing reflights. Reuse is not just cost; it is your best signal. Keep crashed jobs, returned units, anomaly traces long enough to investigate. Inspect them.
- **Close every anomaly into design + test + doc, not just the post-mortem.** All four boxes - root cause, design change, test that catches it, doc revised. Three is open-loop. The Maraia electrical-setup change is the standard. The CRS-7 TR-1 design-level requirement is the standard.
- **Run two-speed reporting.** Unblock now. Learn from it later. Both with hard deadlines. Separation + TBD minutes for the state vector. L+8 weeks for the flight report. Both ship. Different artifacts, different audiences, different deadlines.
- **Update the model after every flight.** Maraia added -0.078 to C_A and extracted a new C_{m,q} curve. The simulation got smarter for the next program. Findings in a report do not compound. Findings in the model do.
- **Take the bold experimental step when the abort is cheap.** The whole point of cheap rollback, cheap rungs, and closed loops is that they let you run experiments that would otherwise be too expensive to attempt.
- **Write objectives ranked, before the test.** Primary / secondary / tertiary. Pass/fail per objective. Report in that exact structure with both the misses and the meets named.
- **Pair every redundancy with a supervisor.** Nine engines is hardware. Nine engines plus vehicle-management software that reroutes around failure is a system. The supervisor is the reliability.

## Do not

- **Do not throw away crashed or returned units without inspection.** Logs, core dumps, ephemeral container state, failed hardware - keep them long enough to investigate. Falcon recovers boosters and inspects them. You should recover your equivalents. The shortest investigation cycle in your team is the floor on how long the evidence has to live.
- **Do not close an anomaly ticket with only the root cause documented.** Three boxes is not four. The Maraia parenthetical works because it names the design change inside the same paragraph that names the root cause. If you cannot write the design change, the cause is not understood yet.
- **Do not accept "training fix" or "we'll be more careful" as a design fix.** CRS-7 TR-1 - "SpaceX should apply particular emphasis to understanding manufacturer's recommendations for using commercially sourced parts in flight critical applications" - is a design-level requirement, not a memo. Process notes are not design changes. A failure that recurs after a "training fix" is the predictable consequence of stopping at three boxes.
- **Do not design only the happy path.** The cost of aborting determines how strict your pre-commit gates can be. An abort path you did not design is an abort that will silently erode your gates the first time the scrub looks expensive. Time the abort. If it is hours when it could be minutes, fix that before tightening anything else.
- **Do not present partial wins as full wins.** Honest ranked reporting - primary missed, secondaries met, stated in that order - is what builds the trust that lets you keep iterating fast. Re-ranking objectives after the data comes in is how programs lose their integrity. The slide that says "successful test" when the primary objective missed is the slide that ends fast iteration.
- **Do not skip the cheap rung to "save time."** You will spend the savings three times over on discovery. The wind tunnel before the drop test. The subscale flight before the full scale. The staging check before production. The Maraia subscale balloon flights produced no usable aerodynamic data and were still essential - they failed at subscale cost so the full scale could succeed.
- **Do not merge the two-speed reports into one.** A "we'll write it when we have time" report does not get written. Fast unblock and slow learning are different artifacts with different deadlines.
- **Do not stash flight data in a report and reuse the pre-flight model on the next design.** Models compound. Reports do not. If your simulation is still using last year's parameters after this year's data came in, you have already lost the iteration.

## Connects to

- **testing-sequencing** - sequenced tests are what enable controlled iteration. The fidelity ladder, ranked objectives, retest triggers, and "pass for the right reason" clauses are how the cheap rung gets built. Without sequencing, every iteration is high-risk.
- **feedback-loops** - fast feedback is what makes fast iteration possible. The loop and the iteration are two sides of the same wheel. Latency between deciding and discovering dominates how fast you can safely run.
- **infrastructure** - what survives iteration repeatedly becomes the standard menu, the signed ICD, the versioned spec. The 384 booster reflights are what graduates a configuration from experimental to standard. Iteration produces infrastructure; infrastructure makes the next iteration cheaper.

## Sub-skills

| Sub-skill | When to load |
|---|---|
| [four-box-closure](subskills/four-box-closure.md) | An anomaly is being closed; verify all four boxes (root + design + test + doc) |
| [cheap-abort-design](subskills/cheap-abort-design.md) | A scrub / rollback costs hours when it could cost minutes |
| [recovery-as-instrumentation](subskills/recovery-as-instrumentation.md) | Returned hardware / crashed jobs / failed runs are being deleted before inspection |
| [fail-controlled](subskills/fail-controlled.md) | An experiment needs bounded failure mode, not optimistic plan |
| [subscale-flight](subskills/subscale-flight.md) | Reduced-scale or reduced-fidelity test rig surfaces real bugs cheaply |

## Related spine skills

- [testing-sequencing](../../03-execution/testing-sequencing/SKILL.md) - testing-sequencing builds the rungs; iterate-fast acts on the data each rung produces
- [feedback-loops](../../02-design/feedback-loops/SKILL.md) - iterate-fast depends on the loop being short, sharp, and deterministic
- [system-engineering](../../02-design/system-engineering/SKILL.md) - anomaly closure modifies the graph; system-engineering tracks what changed

---

The team that ships only safe bets ships nothing of consequence. The team that ships recklessly ships once. The team that compounds - fail cheap, recover the hardware, close every loop, then dare - is the team that ends up with 384 reflights at 100% success.

Make the abort cheap. Build the cheap rung. Recover the hardware. Run honest ranked reports. Close every anomaly with all four boxes - root cause, design change, test that catches it, doc revised - never three of four.

Then take the experiment that would have terrified you a year ago.

Anomaly is not failure. Anomaly is data - but only if you close the loop after it. The agent who internalizes this skill stops measuring success in "did it work the first time" and starts measuring it in "how many learnings per week am I extracting from the things that broke."

The shift in metric matters. "Did it work the first time" rewards safe bets and punishes anyone who tried something new. "Learnings per week" rewards the team that ran the experiment, recovered the hardware, and closed the loop - even when the primary objective missed. Maraia Flight #1 missed its primary aerodynamic objective and was a successful test. The full-scale flight that came later was successful because the subscale tests had failed productively first.

The shift in metric is what turns a cautious team into a bold one without making it reckless. Recklessness is when the abort is expensive and you run anyway. Boldness is when the abort is cheap, the loop is closed, and you run because you can afford to learn.

The Maraia electrical setup change in a single parenthetical is the standard. The eyebolt failed. The release did not fire. The team named the cause, modified the design, and flew again. Five boxes, all checked, on the cheapest rung available.

You do not earn boldness by talking about it. You earn it by making the abort cheap, building the cheap rung, recovering the hardware, and closing the last anomaly's loop with all four boxes before the next run. Do those four things and the experiment that scared you yesterday is just another rung on the ladder.

Find the cheap rung. Time the abort. Recover the hardware. Close the last loop.

The team that can do those four things has earned the right to take the bold step. The team that cannot has not earned it yet, and trying to skip ahead is how programs die.

So earn it. Today.

Then run the experiment.

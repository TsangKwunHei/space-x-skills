---
name: subscale-flight
description: Build the cheap rung - a reduced-scale or reduced-fidelity test rig that surfaces real bugs at small cost before the expensive rung commits. Use this skill whenever the user says "we'll skip straight to the full test," "no time for a smaller version," "the subscale won't tell us anything," "MVP," "smoke test," "canary," "shadow traffic," "load test," "staging environment," "we'll find out in production," or whenever the team is about to commit expensive resources without a cheap-rung de-risking step. Anchored on Maraia's 10-inch / 6-pound subscale capsule that surfaced rigging, release-circuit, and dynamics problems before the 30-inch / 133-pound full-scale flight committed.
---

# Subscale Flight

> "Three tests were completed, two at sub-scale (1/3rd scale, 10" diameter) and one at full scale (30" diameter)." ... "The two subscale tests successfully served as development tests for the full scale, but were unable to achieve a clean freefall configuration and did not provide usable capsule aerodynamic data. The full scale test did successfully meet all primary objectives including a clean freefall."
>
> - Maraia Capsule Flight Test Report, Section II (Maraia p.2)

Read the second sentence twice. The two subscale flights "did not provide usable capsule aerodynamic data" - both missed their primary aerodynamic objective. That is a failure on the headline metric.

It is also exactly what the cheap rung is for. Subscale Flight #1 surfaced the eyebolt failure and the burn-circuit electrical pull-loose at 6-lb subscale cost. Subscale Flight #2 surfaced the dynamics-with-tether problem (>6 G accelerometer spikes, increasing-magnitude oscillations) at 6-lb subscale cost. Both were closed (the electrical setup was modified, the barometric altimeter was added - see [four-box-closure](four-box-closure.md)). Then the 30-inch / 133-pound full-scale capsule flew. "All objectives were met with the exception of the video objective." (Maraia p.7)

Three rungs. Two failed on their primary metric. The full-scale rung succeeded, and that is the entire point.

## What this is

A pre-experiment discipline: **before the expensive rung, run the cheapest rung that could falsify the most assumptions.** The cheap rung's job is not to be a clean dress rehearsal - its job is to fail in ways the expensive rung cannot afford to.

Three things follow:

1. **The cheap rung's missed primary is still development data.** Maraia subscale flights both missed primary aerodynamic objective and were both essential (Maraia p.2). The team graduated subsystem maturity (avionics, GN&C, parachute deployment, ground-command execution, recovery) from subscale even when aero rolled forward to full-scale.

2. **The cheap rung must be cheap enough that its failure does not derail the program.** Maraia's cheap rung was bounded by the FAA 6-lb payload limit, which "permit[s] payloads of up to 6 lbs. without requiring any waivers or special permissions" (Maraia p.3). Cheap means: no waivers, no special approvals, fast turnaround, minimal hardware investment. (See [fail-controlled](fail-controlled.md) for how to keep the cheap rung's failure cheap.)

3. **The cheap rung surfaces the bugs the expensive rung cannot afford to surface.** Eyebolt rigging, burn-circuit harness routing, balloon-tether-payload dynamics - all surfaced at subscale. Each one would have been a program-stopper at full-scale committed cost.

## When to use this

- A team is about to commit expensive resources (a flight, a major release, a hardware build) without a smaller-scale prior step.
- "We don't have time for a subscale" is being argued from schedule pressure.
- "The subscale won't tell us anything" is being argued from "different physics" - sometimes true, but often a cover for not wanting to run it.
- The full-scale test has dependencies on subsystems that have never been integrated (avionics, GN&C, deployment, recovery) - those subsystems can graduate from subscale.
- A new feature is about to ship to 100% of users without a canary, shadow traffic, or staged rollout.
- A migration / refactor is about to run on the full dataset without a representative-shard rehearsal.

## When NOT to use this

- The physics genuinely does not scale and a subscale would mislead more than it informs. (Test this assumption - Maraia knew Apollo data informed C_m,q, but still extracted a flight-data C_m,q model, see model-fudge-factor (route via your parent spine to feedback-loops). The subscale gave the team the calibration baseline.)
- The full-scale rung is itself cheap and fast (e.g., a sub-second feature flag toggle on a controlled cohort) - the cheap rung *is* the experiment.
- The subscale would cost more than a contained full-scale failure (rare; usually the schedule pressure is making this argument feel true when it is not).

## How to apply

1. **Walk the fidelity ladder, top down.** What is the most expensive rung you are planning to run? What is one rung cheaper that would falsify the most assumptions? The Maraia ladder (Maraia p.2): Texas A&M low-speed wind tunnel → China Lake drop tower → 10" subscale balloon (×2) → chute ejection testing → 30" full-scale balloon → planned sounding rocket. Five rungs before the rocket.

2. **Fix the cheap rung's bound first.** What is the regulatory / physical / cost ceiling that defines "cheap"? For Maraia, FAA 6-lb payload limit defined the subscale capsule mass and forced the 10" diameter (Maraia p.3). Find your equivalent: free-tier resource cap, internal-cohort traffic share, single-tenant blast domain, sandboxed dataset.

3. **Pre-write the cheap rung's objectives ranked.** Primary / secondary / tertiary, written before the run. Maraia's subscale: primary = "gain insight into the aerodynamic and dynamic properties of the capsule in the subsonic regime"; secondary = "testing subsystems (e.g. avionics, parachutes, and guidance, navigation, and control (GN&C) subsystems) … as well as training and gaining overall experience" (Maraia p.3). Even if primary misses, secondaries are what graduate to the next rung.

4. **Run the cheap rung. Report ranked-honestly.** Maraia Flight #1 reported: "The primary test objective, obtaining performance data on the aerodynamic and dynamic properties of the sub-scale capsule, was not met since the release box was still attached during the freefall, creating additional drag (and stability). However, all secondary test objectives were met, including successful autonomous parachute deployment, demonstration of avionics and GN&C in flight, execution of ground commands in flight and observation of system response, and recovery of both payloads." (Maraia p.6) Primary missed. Secondaries met. Both stated. No re-ranking after the data came in. (See ranked-objectives (route via your parent spine to testing-sequencing).)

5. **Close anomalies before the next rung.** Subscale anomalies must be closed with all four boxes (see [four-box-closure](four-box-closure.md)) before the expensive rung commits. Maraia did this: electrical setup modified for future flights, barometric altimeter added for Flight #2, separate-command operations procedure added (Maraia p.4–5).

6. **Promote what graduated.** The cheap rung's job is to mature subsystems for the next rung. Maraia subscale graduated avionics, GN&C, autonomous parachute deployment, ground-command execution, and recovery - all of which then operated correctly on the full-scale flight. List what graduated. List what did not. Re-run the cheap rung if a critical subsystem did not graduate.

7. **Then run the expensive rung.** With the cheap rung's anomalies closed and subsystems graduated, the expensive rung is committing on real data, not on hope. Maraia full-scale: "All objectives were met with the exception of the video objective." (Maraia p.7)

## Worked example

**Maraia 10" subscale → 30" full-scale.**

*Subscale rung:*
- Mass: 6 lb (FAA limit, no waivers required) (Maraia p.3)
- Diameter: 10" (1/3 scale)
- Altitude: ~104,000 ft via balloon (Maraia p.5)
- Cost: low - Rocket University program at KSC, no special permissions

*Subscale Flight #1 (July 26, 2012) - primary missed, secondaries met, two anomalies surfaced:*
- Eyebolt failed at launch - closed by [four-box-closure](four-box-closure.md): electrical setup modified for future flights.
- Burn-circuit electrical pull-loose during ascent twisting prevented release at 72,500 ft.
- Recovery: both payloads recovered. Subsystems graduated: avionics, parachute deployment, ground command execution, recovery.

*Subscale Flight #2 - primary still missed, additional dynamics anomaly surfaced:*
- Tether broke prior to release, ">6 G's spikes" in accelerometer data, "oscillations of the balloon-capsule system of increasing magnitude" (Maraia p.6).
- Recovery: capsule recovered from water, accelerometer + GoPro data identified coupled balloon-tether-payload dynamics.
- Closure: barometric altimeter added for Flight #2 instrumentation; separate-command operations procedure adopted.

*Full-scale rung (August 19, 2013):*
- Mass: 133 lb (reduced from 150 lb concept mass to reduce parachute opening loads) (Maraia p.8)
- Diameter: 30"
- Altitude: ~100,000 ft via NASA-Wallops/Columbia Scientific Balloon Facility
- Outcome: "All objectives were met with the exception of the video objective." (Maraia p.7) Drogue deploy at 59,622 ft confirmed by recovered data. Main deploy confirmed by recovered hardware (chute attached, capsule fully intact). Touchdown at remote location 23 miles from nearest highway.

The two subscale flights produced no usable aerodynamic data. They were essential. The full-scale flight succeeded because subscale had surfaced the rigging, release-circuit, and dynamics problems first, all closed, all at 6-lb cost.

**Translation to a software deploy:**

- *Subscale rung:* internal-cohort canary, 1% traffic, sandboxed tenants, representative-shard migration rehearsal.
- *Subscale objectives:* primary = catch query-plan regressions on real load; secondary = mature the rollback procedure, the dashboards, the runbook.
- *Subscale failure modes:* primary missed (no useful regression data) is still development data if secondaries graduate (rollback procedure works, dashboards show right metrics).
- *Full-scale rung:* 100% rollout. Should mostly meet objectives because subscale closed the loop on the failure modes the cheap rung surfaced.

## Anti-pattern

**"The subscale won't tell us anything different - let's just run the full-scale."** Schedule pressure makes this argument feel true. The Maraia counterexample is unforgiving: the eyebolt rigging at 6 lb behaves nothing like 133 lb, but the *failure mode* (mechanical attach failure under launch loads) is identical at both scales. The burn-circuit twisting motion at 10" is not the same as 30", but the *failure mode* (electrical harness vulnerability to ascent dynamics) is identical. The team that skips subscale to "save time" pays the same cost three times over when these failure modes surface at the expensive rung.

CRS-7 is the same anti-pattern at industrial scale: an industrial-grade 17-4 PH rod end was used in a critical load path under cryogenic conditions "without adequate screening or testing of the industrial grade part" and "without proper modeling or adequate load testing of the part under predicted flight conditions" (CRS-7 p.7). The cheap rung that should have caught it - material testing under predicted flight conditions - was skipped. The IRT's TR-1 design-level recommendation was, in effect: build the cheap rung. (CRS-7 TR-1, p.8)

If you are arguing "we don't need a subscale," ask what failure mode you would catch with one. If your honest answer is "none I can name," you are not subscale-ready - you do not yet understand the system well enough to skip the cheap rung. Build it.

## Related skills

- Parent: [iterate-fast](../SKILL.md) - the cheap rung is one of the three compounding disciplines; without it, every iteration is high-stakes
- Pairs with: [fail-controlled](fail-controlled.md) - the cheap rung's failure must stay cheap; fail-controlled is how the bound is engineered
- Pairs with: fidelity-ladder-design (route via your parent spine to testing-sequencing) - the subscale is one rung; fidelity-ladder-design walks the full ladder
- Compose with: ranked-objectives (route via your parent spine to testing-sequencing) - the cheap rung's primary may miss; secondaries graduate. Pre-rank to keep the report honest
- Compose with: [four-box-closure](four-box-closure.md) - close subscale anomalies with all four boxes before the next rung commits
- Compose with: [recovery-as-instrumentation](recovery-as-instrumentation.md) - the subscale is more valuable when its hardware comes back for inspection

## Source

- Primary: Maraia Capsule Flight Test Report, Section II (Maraia p.2) - three tests, two subscale + one full-scale; subscale "did not provide usable capsule aerodynamic data" but "successfully served as development tests"
- Primary: Maraia Section III (Maraia p.3) - FAA 6-lb payload limit; subscale 10" diameter; subscale primary/secondary objective split
- Primary: Maraia Section III.A (Maraia p.5) - Flight #1 anomalies and recovery
- Primary: Maraia Section III.B (Maraia p.6) - Flight #2 dynamics anomaly
- Primary: Maraia Section IV (Maraia p.7–8) - full-scale flight, 30" / 133 lb, "All objectives were met with the exception of the video objective"
- Primary: Maraia Section IV.A (Maraia p.8) - mass tuning between rungs (133 lb vs 150 lb concept)
- Anti-example: CRS-7 IRT Public Summary (CRS-7 p.7) - industrial-grade rod end without screening / modeling / load testing under predicted flight conditions; TR-1 design-level recommendation (CRS-7 p.8)

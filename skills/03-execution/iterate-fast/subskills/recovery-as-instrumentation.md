---
name: recovery-as-instrumentation
description: Treat returned hardware, crashed jobs, failed instances, and anomaly traces as flight-proven instrumentation - your highest-grade signal. Design recovery in from day one and refuse to delete the evidence on a schedule shorter than your investigation cycle. Use this skill whenever the user says "garbage collect the failed runs," "we don't keep crashed pods," "the unit was scrapped," "we already redeployed over it," "the logs rolled off," "we don't have a forensics process," "why don't we ever learn from outages?", or whenever evidence is being discarded before inspection. Anchored on Falcon's 384 booster reflights at 100% success and the Maraia parachute-still-attached recovery that proved deployment without telemetry.
---

# Recovery as Instrumentation

> "By re-flying boosters and fairings, SpaceX increases reliability and improves its designs and procedures by servicing and inspecting hardware as well as incorporating lessons that can only be learned from flight."
>
> - Falcon User's Guide §1.3 (Falcon User's Guide §1.3, p.3)

> "As of February 2025, SpaceX has re-flown Falcon first stage boosters more than 384 times with a 100% success rate." ... "SpaceX also started re-flying fairings in late 2019, and as of February 2025 has re-flown fairing halves on 307 missions with a 100% success rate."
>
> - Falcon User's Guide §1.3 (Falcon User's Guide §1.3, p.3)

"Lessons that can only be learned from flight." Read it twice. The hardware comes back. Engineers inspect it. The design improves. Reuse is not just a cost-saving measure - it is the highest-grade signal in the program. A booster you can put under a microscope after flight tells you things no simulation, no static fire, and no acceptance test can.

384 reflights at 100% success is 384 inspection opportunities. Each one a chance to surface a defect a test article could not.

## What this is

A design and operational discipline: every flown unit, every crashed job, every returned product, every anomaly telemetry trace is **flown hardware**. Treat it as instrumentation. Design the recovery path from day one. Inspect what comes back. Update the design from what you find.

Two things follow:

1. **Recovery is design intent, not a happy accident.** Falcon User's Guide §1.5.3 (p.5): "The Falcon first stage is designed to survive atmospheric entry and to be recovered, handling both the rigors of the ascent portion of the mission and the loads of the recovery portion." If your system does not currently let you inspect what came back, that is a design bug - fix it before the next experiment.

2. **The retention horizon for crashed evidence is the investigation cycle, not the storage budget.** If your shortest investigation cycle is a week and your logs roll off in 24 hours, you are deleting evidence faster than you can investigate it. The cycle is the floor on retention.

The Maraia full-scale flight is the smaller-scale analog: the main parachute deployment was not in the telemetry, but "the capsule was recovered with the main chute still attached and was fully intact so it clearly deployed successfully" (Maraia p.9). The recovered hardware confirmed the event the data missed. Without recovery, the flight would have been ambiguous.

## When to use this

- A team's incident-response process discards crashed pods, failed jobs, or returned units as part of routine cleanup.
- Logs / traces / core dumps roll off on a schedule shorter than the team's investigation cycle.
- A returned product is refurbished and re-shipped without forensic inspection.
- A new system is being designed and "what happens when this fails" has no inspection path.
- A team is about to repurpose / reformat a failed instance before anyone has looked at it.
- Post-mortem quality is dropping because the team is reasoning from logs instead of inspecting hardware.

## When NOT to use this

- The failure mode is fully understood, the design is closed (see [four-box-closure](four-box-closure.md)), and the marginal inspection has zero new information value.
- Privacy / compliance constraints require evidence destruction before the team's investigation cycle ends - design a redacted retention path instead, do not skip recovery.
- Evidence retention budget would dominate the system's total cost (rare; usually the budget pressure is the first signal that the recovery path was not designed in from day one).

## How to apply

1. **Audit your shortest investigation cycle.** How long does it take from "incident detected" to "root cause named"? That number is the floor on evidence retention. If your logs roll off in 24h and your investigations take a week, you have a recovery bug.

2. **Make recovery a day-one design requirement, not a day-N add-on.** Falcon was designed for booster return. The first stage "is designed to survive atmospheric entry and to be recovered" (Falcon User's Guide §1.5.3, p.5). For a software system, that means: deterministic crash dumps to durable storage, snapshotted state at the moment of failure, retained pod logs and configuration for the investigation window, raw telemetry retained alongside aggregated metrics.

3. **Prefer mechanisms that can be tested on the actual flight article, not just an analog.** Falcon's pneumatic separation is the principle: "The pneumatic system allows for acceptance and functional testing of the actual flight hardware, which is not possible with a traditional explosives-based separation system." (Falcon User's Guide §1.5.3, p.5) Translation: prefer rollback mechanisms that can be drilled on the actual production system in a low-risk mode, not just on staging analogs. If the recovery procedure has only ever been tested on staging, it is not yet flown.

4. **Inspect what comes back.** Recovered hardware drove the entire Maraia post-flight aero rebuild: FAST simulation "systematically adjusted in order to match the flight data" yielded the -0.078 C_A correction, the wind-profile inversion, and the new C_m,q curves at Mach 0.3–0.8 (Maraia p.11–14). For software: the failed pod's heap dump is the equivalent. Open it. Read it. Update the model.

5. **Feed inspection findings back into the design - not just the report.** This is the difference between recovery and recovery-as-instrumentation. The 384 reflights are 384 design iterations. If your team has 100 incidents a quarter and the system is no different at the end of the quarter, you have recovery without instrumentation. The findings died in tickets.

6. **Wire recovery into the four-box closure.** [four-box-closure](four-box-closure.md) Box 1 (root cause) is unsupportable without recovered evidence. If you cannot inspect what came back, your root cause is a guess. Recovery is the precondition for honest closure.

## Worked example

**Falcon booster reflight as instrumentation cycle.**

- *Recovery designed in:* "The Falcon first stage is designed to survive atmospheric entry and to be recovered" (Falcon User's Guide §1.5.3, p.5). Block 5 specifically: "Thermal protection shielding was modified to support rapid recovery and refurbishment" (Falcon User's Guide §2.1, p.6).
- *Inspection on each return:* "Stage recoverability also provides a unique opportunity to examine recovered hardware and assess design and material selection to continually improve Falcon 9 and Falcon Heavy." (Falcon User's Guide §1.5.3, p.5)
- *Findings feed forward:* "lessons that can only be learned from flight" (Falcon User's Guide §1.3, p.3) - the design and procedure improvements that result from servicing and inspection.
- *Outcome at scale:* 384+ booster reflights at 100% success; 307+ fairing reflights at 100% (Falcon User's Guide §1.3, p.3); since 2018 more missions have launched on flight-proven first stages than on first-flight boosters.

The hardware comes back. The team inspects it. The design improves. The next flight uses the improved design. The improved design comes back for another inspection. The loop compounds.

**Maraia parachute deployment without telemetry.**

Onboard data on the Maraia full-scale flight ended at 21,357 ft due to "a combination of a loose wire and the timing of the file writing" (Maraia p.9). The main parachute deployment event was not in the data. Without recovery, the team would not know whether deployment occurred. With recovery: "the capsule was recovered with the main chute still attached and was fully intact so it clearly deployed successfully" (Maraia p.9). The recovered hardware proved the event the telemetry missed.

The same principle for a software incident: when the logs are gone or the trace is incomplete, the recovered artifact (the failed pod's filesystem, the corrupted database row, the truncated payload) is the only remaining evidence. If it has been garbage-collected, the investigation is over.

## Anti-pattern

**Garbage-collected crashed pods.** A team's Kubernetes cluster auto-deletes crashed pods after 5 minutes to keep the pod list clean. An incident occurs at 02:00. The on-call engineer arrives at 02:15. The pods are gone. The logs are partial (sidecar shipped only the warning level, not debug). The heap dump was never enabled because "production should not have heap dumps." The investigation reasons from grafana panels and produces a "probably a memory leak in service X" closure. The same incident recurs next month.

The recovery-as-instrumentation fix: crashed pods are quarantined to a "post-mortem" namespace for the investigation window (= shortest investigation cycle). Heap dump and core dump on crash are written to durable storage with a tagged retention policy. The on-call runbook starts with "open the recovered pod" before "open grafana." The model - the service's memory profile in the team's documented expectations - gets updated when the inspection finds the actual root cause.

The Falcon analog: a Falcon program that recovered boosters but immediately scrapped them would be paying the cost of recovery with none of the instrumentation benefit. Reuse without inspection is not the same skill. Inspection is the skill. Reuse is one (very large) economic incentive that funds it.

## Related skills

- Parent: [iterate-fast](../SKILL.md) - recovery is one of the three compounding disciplines; without it, anomaly closure is a guess
- Pairs with: [four-box-closure](four-box-closure.md) - recovered evidence is what makes Box 1 (root cause) honest
- Pairs with: model-fudge-factor (route via your parent spine to feedback-loops) - the inspection findings update the model, not the report; that is what makes the next iteration smarter
- Compose with: signal-determinism-check (route via your parent spine to feedback-loops) - recovered hardware compensates for non-deterministic telemetry, but only if the telemetry retention window covers the event
- Compose with: feedback-loops (route via the iterate-fast spine, then to feedback-loops) - recovery extends the loop into the failure regime; without it, the loop terminates at the symptom

## Source

- Primary: Falcon User's Guide §1.3 (p.3) - 384 booster reflights, 307 fairing reflights, 100% success rate; "lessons that can only be learned from flight"
- Primary: Falcon User's Guide §1.5.3 (p.5) - "designed to survive atmospheric entry and to be recovered"; "unique opportunity to examine recovered hardware and assess design and material selection"
- Primary: Falcon User's Guide §1.5.3 (p.5) - pneumatic system tested on actual flight hardware (the testability principle)
- Primary: Falcon User's Guide §2.1 (p.6) - Block 5 thermal protection modified for rapid recovery and refurbishment
- Primary: Maraia Capsule Flight Test Report (Maraia p.9) - full-scale flight main parachute deployment confirmed only by recovered hardware; (Maraia p.11) recovered data drove FAST simulation rebuild

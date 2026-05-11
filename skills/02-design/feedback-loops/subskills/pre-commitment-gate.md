---
name: pre-commitment-gate
description: Move the verification loop ahead of the irreversible action, in the final flight configuration, with a safe-shutdown path if the verification fails. Use this skill whenever the user designs a deploy, a release, a launch, a database migration, or any other commit-once action; especially when checks today run only against staging and the production execution is irreversible. The hold-down clamp is the model: light the engines for real, evaluate full-power performance, release only on nominal.
---

# Pre-commitment Gate

Falcon User's Guide §10.5.5 describes the launch sequence: "Engine ignition occurs shortly before liftoff, while the vehicle is held down at the base via hydraulic clamps. The flight computer evaluates engine ignition and full-power performance during the prelaunch hold-down, and if nominal criteria are satisfied, the hydraulic release system is activated at T-0. A safe shutdown is executed should any off-nominal condition be detected" (Falcon User's Guide §10.5.5, p.83).

§1.5.1 frames the rationale: "Hold-on-pad operations, enabled by the launch vehicle's all-liquid propulsion architecture and autonomous countdown sequence, significantly reduce risks associated with engine start-up failures and underperformance" (Falcon User's Guide §1.5.1, p.4). Once the clamps release, the vehicle is committed; it has to fly. So the loop is moved before the commitment: light the engines in the actual flight configuration, with real propellant flow and real chamber pressure, and only release when nominal.

The pattern is the verification loop on an irreversible action - performed in flight configuration, before the action is irreversible, with a cheap-abort path if the loop says no.

## What this is

A gate placed at the latest possible point before commitment, where:

1. The system runs in its final configuration (real load, real environment, real inputs).
2. The signal returned is sharp enough to evaluate nominal vs off-nominal automatically.
3. A safe-shutdown path exists and is rehearsed.
4. Only on nominal does the irreversible step proceed.

The gate is not a unit test or a staging deploy. Unit tests verify the parts. Staging verifies the parts together. The pre-commitment gate verifies the integrated system in flight configuration, immediately before the flight. Hold-down means engines lit on real propellant with the actual vehicle, not a mock-up; staging is "engines lit on a test stand" and is a different rung of the fidelity ladder.

## When to use this

- A deploy is irreversible (production migration, schema change, payment send, config push to a fleet).
- The cost of a bad commit is much greater than the cost of a delay (data loss, customer impact, financial settlement).
- Staging-vs-production drift is a known risk: same code path passing in staging and failing in production is a recurring failure mode.
- Cheap abort exists. The gate is only credible if "off-nominal → safe shutdown" is actually an option, not a fiction.

## When NOT to use this

- Truly reversible actions where rollback is seconds and harmless. The gate adds latency for no benefit.
- Actions where the in-flight configuration cannot be safely simulated (some hardware deploys, some regulated transactions). Use a different rung of fidelity testing instead.
- Loops that already have a working hold-down equivalent. Do not stack gates for the sake of process.

## How to apply

1. **Identify the irreversible step.** The release of the hydraulic clamps is the irreversible step on Falcon. What is yours? The DNS cutover, the data migration, the payment dispatch, the fleet config rollout. Name the exact moment after which abort costs more than completion.

2. **Define nominal criteria, in writing.** "Engine ignition and full-power performance" is the Falcon criterion. Yours might be "all canary instances report 200 OK on health endpoint, p99 latency under 80ms, error rate under 0.1%, for 5 consecutive minutes." Numeric, specific, automatable.

3. **Run the gate in flight configuration.** Real production traffic on the canary, real database connection, real downstream calls. Not staging, not mocked, not "we trust the unit tests." The hold-down works because the engines are actually running - that is the only way to discover an underperformance that staging does not see.

4. **Wire the safe-shutdown path.** "An autonomous safe shutdown is performed if any off-nominal condition is detected" (Falcon User's Guide §1.5.1, p.4). Yours: roll back the canary, halt the rollout, revert the DNS, abort the migration before the irreversible step. Rehearse it. If safe-shutdown takes longer than the deploy, you do not have a gate, you have a wish.

5. **Pair with cheap-abort design.** §10.5.6 (p.83) describes the recycle: in the event of a launch scrub, the transporter-erector and launch vehicle typically stay vertical, "providing uninterrupted payload-to-EGSE connectivity through the T-0 umbilical, eliminating the need to relocate EGSE from the instrumentation bay to the hangar after a scrub." Cheap recycle is what makes the strict gate sustainable. If the abort costs eight hours of teardown, operators will silently loosen the gate to avoid triggering it. Fix abort cost first, then tighten the gate.

6. **Do not let the gate decay into a calendar gate.** The hold-down is decided by the flight computer evaluating "engine ignition and full-power performance," not by the clock. A pre-commit gate that always passes after 5 minutes is a delay, not a check. The gate must be capable of saying no.

## Worked example

A team is rolling out a database schema change to a payment-processing fleet. The change is irreversible once the writes start (the new schema is forward-incompatible with the old code path, so a rollback after writes would corrupt data).

The naive plan is: deploy schema migration → cut over code → done. Both steps are irreversible together; if the new code fails under real production load, the team is stuck rolling forward.

A pre-commitment gate plan:

- **Hold-down configuration**: deploy schema as backwards-compatible (new columns, no drops). Deploy new code to a 1% canary fleet, reading and writing against real production database. Real traffic, real load.
- **Nominal criteria**: for 15 minutes, canary error rate ≤ baseline + 0.1%, p99 latency ≤ baseline × 1.1, no exceptions in five named code paths, all writes verified by a parallel read-back.
- **Safe-shutdown**: canary instances drained, traffic returned to old fleet, schema migration reversed (still possible because additive). Rehearsed by running the rollback path in staging with synthetic traffic the day before.
- **Release at T-0**: only after the 15-minute hold-down passes, expand canary to 10%, then to 100%, then drop the now-unused old columns.

The gate is the canary running in flight configuration before the irreversible drop step. If the canary detects anomaly, safe-shutdown reverts the migration with no data loss. The "T-0" - dropping the old columns - happens only after the integrated system has demonstrated nominal under real production load.

This is hold-down for software: the engines are lit in the final flight configuration, the flight computer evaluates, and only on nominal does the clamp release.

## Anti-pattern

A team treats "all tests passing in CI" as the pre-commit gate. The CI runs in a clean container, against a seeded database, with mocked downstream services. On merge, the deploy goes straight to production. When production fails, the post-mortem says "tests passed; we don't know how this got through." The gate was lit in test configuration, not flight configuration, and the test configuration did not exercise the failure mode.

The Falcon equivalent would be a static-fire on a test stand and then declaring the launch ready without ever holding the actual vehicle on the actual pad with the actual propellant. SpaceX explicitly does not do that - the hold-down is on the launch pad, with the flight vehicle, with real ignition and full power. The static-fire on the test stand is a different rung of the fidelity ladder, not a substitute.

A second anti-pattern: a "canary" that runs against a synthetic load generator and then proceeds to production rollout. The canary did not see real traffic shape, did not see real customer payloads, did not see the long tail of weird production data. It was a test, not a hold-down.

## Related skills

- Parent: [feedback-loops](../SKILL.md)
- Pairs with: cheap-abort-design (route via your parent spine to iterate-fast) - cheap abort is what keeps the gate from being silently loosened
- Pairs with: not-because-of-x-clauses (route via your parent spine to testing-sequencing) - the nominal criteria must close false-pass paths
- Compose with: signed-contracts (route via your parent spine to infrastructure) - gate pass/fail criteria belong in a written contract, not engineering judgment in the moment

## Source

- Primary: Falcon User's Guide §10.5.5, p.83 (engine ignition during hold-down, hydraulic clamps, autonomous safe shutdown); Falcon User's Guide §1.5.1, p.4 (hold-on-pad reduces risks of engine startup failures and underperformance; safe shutdown if any off-nominal condition); Falcon User's Guide §10.5.6, p.83 (recycle operations, vehicle stays vertical, uninterrupted EGSE connectivity)

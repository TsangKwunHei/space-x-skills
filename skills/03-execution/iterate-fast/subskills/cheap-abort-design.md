---
name: cheap-abort-design
description: Engineer the abort path so a scrub costs minutes, not hours, so strict go/no-go gates can stay strict under schedule pressure. Use this skill whenever the user says "rollback," "scrub," "abort," "kill switch," "circuit breaker," "we should ship despite the warning," "the test is flaky but it'll probably be fine," "the deploy takes too long to roll back," or whenever a team is about to silently relax a gate because the abort is expensive. Anchored on Falcon hold-down at T-0, vertical-recycle after scrub, and the CRS-7 anti-example where expensive aborts let schedule pressure erode the standard.
---

# Cheap Abort Design

> "Engine ignition occurs shortly before liftoff, while the vehicle is held down at the base via hydraulic clamps. The flight computer evaluates engine ignition and full-power performance during the prelaunch hold-down, and if nominal criteria are satisfied, the hydraulic release system is activated at T-0. A safe shutdown is executed should any off-nominal condition be detected."
>
> - Falcon User's Guide §10.5.5 (Falcon User's Guide §10.5.5, p.83)

> "Falcon launch vehicle systems and operations have been designed to enable recycle operations when appropriate. In the event of a launch scrub, the transporter-erector and launch vehicle will typically stay vertical. Remaining on the pad provides uninterrupted payload-to-EGSE connectivity through the T-0 umbilical, eliminating the need to relocate EGSE from the instrumentation bay to the hangar after a scrub."
>
> - Falcon User's Guide §10.5.6 (Falcon User's Guide §10.5.6, p.83)

Read both quotes together. Engines ignite while the vehicle is clamped down. The flight computer reads telemetry from the actual flight configuration with the actual hardware at full power. If anything looks wrong, a safe shutdown happens with the vehicle still on the pad - vertical, umbilical connected, EGSE in place. A scrub that could have cost a day costs hours.

That is not just an operations decision. It is what makes strict pre-commit gates *survivable*. When the abort is cheap, the launch director can hold to the threshold. When the abort is expensive, the team silently shades the threshold looser to avoid the scrub. Operators do not announce the lowering of the bar. They just stop catching the marginal cases.

## What this is

A design discipline: **the cost of aborting determines how strict your pre-commit gates can be.** If a rollback takes a day when it could take minutes, that delta will silently erode your standards under schedule pressure. The fix is not "be more rigorous." The fix is to engineer the abort to be cheap.

Two complementary moves make Falcon's abort cheap:

1. **Hold-down before commit.** The irreversible action (T-0 release) happens *after* in-configuration verification at full power. The expensive thing - full engine ignition - happens before the cheap thing - release.
2. **Stay in configuration during a scrub.** Vehicle stays vertical. Umbilical stays connected. EGSE stays in place. The setup that would be expensive to re-establish does not have to be re-established.

Both are pre-engineered. Neither happens by accident. A team that has not invested in the abort path will discover, the first time the gate triggers, that the abort costs more than the team was budgeting for - and the next time, the gate gets quietly loosened.

## When to use this

- A deploy / launch / release process exists where the rollback cost is unmeasured or known to be high.
- A team has a strict go/no-go threshold but is feeling schedule pressure to ship anyway.
- An incident postmortem reveals "we knew the canary was wobbling but we didn't roll back because re-deploy takes 4 hours."
- An ops team is debating whether to hold for a marginal indication or push through.
- A new system is being designed and the abort/rollback path is being treated as an afterthought.

## When NOT to use this

- The action is genuinely reversible at zero cost (a feature flag toggle on a no-side-effect path); the abort is already cheap.
- Investment in cheap-abort engineering would exceed the lifetime cost of expected aborts (rare, low-stakes, throwaway script).
- The system is in maintenance mode and will not see new commits; freeze the gates as-is.

## How to apply

1. **Time the abort today.** Before tightening any gate, measure how long the abort actually takes - wall-clock, end-to-end, including human re-coordination. Falcon's vertical-recycle keeps the vehicle and EGSE in place; if your equivalent forces a full teardown and rebuild of the deploy environment, that delta is the work.

2. **Identify the expensive-to-re-establish connections.** Falcon's list: vertical orientation, T-0 umbilical, payload-to-EGSE connectivity, EGSE physical location in the instrumentation bay (Falcon User's Guide §10.5.6, p.83). Your equivalents: the warmed-up database connection pool, the prebuilt artifact cache, the canary's configured environment, the load balancer's stable routing config, the staging dataset.

3. **Engineer the abort to preserve those connections.** A scrub should not require relocating EGSE from the instrumentation bay back to the hangar. A failed deploy should not require rebuilding the artifact cache. Design the abort to stop the irreversible step while keeping the reversible setup intact.

4. **Put the irreversible commit AFTER in-configuration verification at full power.** Falcon's hold-down: ignite the engines (the expensive thing), evaluate full-power performance (the verification), only then release the clamps (the irreversible thing). Your equivalent: deploy to canary at full traffic shape (not synthetic), measure on real telemetry (not staging), only then shift production traffic. The commit step happens *after* the in-configuration check, not before.

5. **Pair the cheap abort with strict gates.** The whole point of cheap abort is that it lets you keep the gate strict. Falcon §1.5.1 (p.4): "An autonomous safe shutdown is performed if any off-nominal condition is detected." "Any off-nominal condition" - strict - is survivable because the shutdown is autonomous and the vehicle is still on the pad.

6. **Re-time the abort after the design change.** If the abort is now minutes instead of hours, write that down where the launch director / deploy gate operator can see it. The number is the contract between engineering and ops: this is what an abort costs us, so this is the threshold we can hold.

## Worked example

**Falcon launch sequence - hold-down + vertical recycle.** (Falcon User's Guide §10.5.5 and §10.5.6, p.83)

T-3 s: Engine start sequence begins.
Engines ignite. Vehicle is held down by hydraulic clamps. Flight computer reads telemetry at full power.
- If nominal: hydraulic release activates at T+0. Vehicle commits to flight.
- If off-nominal: autonomous safe shutdown. Vehicle stays vertical. Umbilical stays connected. EGSE stays in place.

The cost asymmetry: a successful flight commits at T+0; an aborted flight stops at the same moment but without any of the infrastructure unwound. Recycle operations resume from the same configuration. The campaign is not lost.

The gate that this enables: "An autonomous safe shutdown is performed if any off-nominal condition is detected." (Falcon User's Guide §1.5.1, p.4) Strict gate, cheap abort, survivable threshold.

**Translation to a software deploy:**

- *Cheap abort:* canary stays warm, traffic shift is reversible in seconds, build artifact and configured environment are not torn down.
- *Hold-down:* deploy to canary, route a measurable fraction of real traffic, evaluate SLO-relevant metrics on real load, and only then shift production traffic.
- *Strict gate:* "Any error budget burn over X% in the canary triggers automatic rollback." Survivable because the rollback is seconds.

Without the cheap abort, the gate becomes: "Any error budget burn over X% triggers a discussion about whether to rollback." That discussion is where the gate silently loosens.

## Anti-pattern

**CRS-7 schedule context as cautionary backdrop.** CRS-7 was the second launch failure under the CRS contract; before it, there had been six consecutive successful ISS missions on Falcon 9 and 13 successful flights total of Falcon 9 v1.1 (CRS-7 p.2). A program with that flight cadence and that schedule visibility cannot afford "wait, let's hold for that wobbly indication" if the abort is expensive - and the IRT later identified design-level vendor-screening gaps (TR-1) and telemetry-architecture gaps (TR-3) that suggest the gate that should have caught the rod end's industrial-grade derating was not held.

The CRS-7 IRT did not say "be more careful." TR-1 said: change the design process for evaluating manufacturer recommendations on commercially sourced flight-critical parts (CRS-7 TR-1, p.8). That is design-level - equivalent in software to "change the procurement / dependency-vetting pipeline so an industrial-grade dependency cannot enter a flight-critical path without explicit derating analysis," not "remind engineers to read manufacturer docs."

The deeper cautionary read: when an abort late in a program costs an entire campaign, the upstream gates erode, and a single industrial-grade rod end at the apex of a load chain reaches flight. Engineer cheap abort upstream so the upstream gates can stay strict.

## Related skills

- Parent: [iterate-fast](../SKILL.md) - cheap abort is the precondition for strict gates, which is the precondition for safe fast iteration
- Pairs with: pre-commitment-gate (route via your parent spine to feedback-loops) - the hold-down evaluation is the gate; cheap abort is what lets the gate stay strict
- Pairs with: [fail-controlled](fail-controlled.md) - both bound the cost of failure; cheap abort bounds *pre-commit* failure cost, fail-controlled bounds *post-commit* failure cost
- Compose with: numeric-retest-trigger (route via your parent spine to testing-sequencing) - pre-written numeric thresholds are what the cheap abort enforces
- Compose with: signal-determinism-check (route via your parent spine to feedback-loops) - the in-configuration verification only works if the telemetry is deterministic enough to trust

## Source

- Primary: Falcon User's Guide §10.5.5 (p.83) - hold-down, T-0 release, autonomous safe shutdown
- Primary: Falcon User's Guide §10.5.6 (p.83) - vertical-recycle, T-0 umbilical, EGSE not relocated
- Primary: Falcon User's Guide §1.5.1 (p.4) - "An autonomous safe shutdown is performed if any off-nominal condition is detected"
- Anti-example context: CRS-7 IRT Public Summary p.2 (cadence pressure), TR-1 p.8 (design-level vendor-screening recommendation)

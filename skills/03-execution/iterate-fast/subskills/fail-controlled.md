---
name: fail-controlled
description: Bound the failure mode of an experiment before you run it - by altitude, by location, by blast radius, by parachute backup, by autonomous termination - so the cheap rung's failure stays cheap. Use this skill whenever the user says "what's the worst case if this breaks?", "blast radius," "containment," "kill switch," "termination criteria," "what if the experiment fails?", "is it safe to try?", "we're flying without a backup," or whenever an experiment's failure mode is being treated as "we'll deal with it if it happens" rather than pre-engineered. Anchored on Maraia Flight #1 - eyebolt + burn-circuit anomalies bounded by altitude, parachute backup, and recovery zone - and the Falcon autonomous flight termination system.
---

# Fail Controlled

> "Our launch vehicles are equipped with an autonomous flight termination system (AFTS) to limit the potential damage caused by a launch vehicle malfunction. The system terminates the flight of the vehicle automatically if mission rules are violated."
>
> - Falcon User's Guide §2.5 (Falcon User's Guide §2.5, p.10)

> "An eyebolt failure on the capsule occurred immediately after launch, causing the two-point attach to the upper payload to become a single point attach." ... "Both payloads were recovered."
>
> - Maraia Capsule Flight Test Report, Section III.A (Maraia p.5)

Maraia Flight #1 had two anomalies on a single flight. An eyebolt failed at launch. The release command at 72,500 ft did nothing because the capsule's twisting motion during ascent had pulled the burn-circuit electrical connection loose from its power source. Either anomaly, on a more committed test article, would have been a program-stopper.

Both payloads were recovered. The team got the post-test analysis. The closure was a one-paragraph parenthetical (see [four-box-closure](four-box-closure.md)). Flight #2 flew.

The reason Flight #1's anomalies stayed cheap is that the failure mode was bounded *before* the experiment ran. Bounded by altitude (72,500 ft was the planned drop altitude - high enough for the test, low enough that recovery was tractable). Bounded by location (an FAA-approved drop zone with predicted landing area). Bounded by mass (FAA payload limits forced a 6-lb subscale, see [subscale-flight](subscale-flight.md)). Bounded by backup (Rocket U parachute deployed, the FAA-required tether snapped, both payloads landed under chute). Bounded by recovery (both payloads recovered for forensic analysis).

That is what failing controlled means: every failure mode the experiment can produce has a bound the experimenter has *already designed in* before the run.

## What this is

A pre-flight discipline: enumerate the failure modes the experiment can produce, and engineer a bound on each one *before* the run. The bound can be physical (altitude, mass, location), procedural (kill switch, autonomous termination), structural (separated blast domains, rate-limited deploy), or backup (redundant parachute, fallback path).

Three things follow:

1. **The cheap rung's failure must stay cheap.** The whole value of a cheap rung (see [subscale-flight](subscale-flight.md)) evaporates if its failure can take out the next rung's hardware, the team's schedule, or the program's reputation. Bound the failure first.

2. **Bounded failure mode is what makes "boldness" not "recklessness."** Recklessness is when the abort is expensive and you run anyway. Boldness is when the abort is cheap, the failure is bounded, and you run because you can afford to learn. (Spine: [iterate-fast](../SKILL.md))

3. **AFTS / kill-switch / autonomous termination is the final line.** When all upstream gates fail, the system itself terminates within bounded geometry. Falcon's AFTS "terminates the flight of the vehicle automatically if mission rules are violated" (Falcon User's Guide §2.5, p.10). The mission rules are pre-written. The termination is autonomous. The blast radius is bounded by the rules.

## When to use this

- An experiment is being planned and "what if it fails?" has not been answered concretely.
- A team is debating whether to run a risky test and the only argument against is vibes.
- A new system is being designed and the failure path has no kill switch.
- A canary deploy or staged rollout is going to a percentage of traffic without a defined automatic-rollback condition.
- Range-safety / regulatory framing exists ("FAA permit," "compliance gate") but the *team's own* failure bounds (not just the regulator's) are unwritten.
- An incident postmortem reveals "we didn't have a circuit breaker on the dependency that took us down."

## When NOT to use this

- The action is genuinely cost-free to fail (read-only query, sandboxed simulation with no side effects); the bound is implicit.
- A regulator-mandated bound already covers every team-relevant failure mode and the team's review confirms it; the discipline is satisfied, document it and move on.
- The experiment is being run specifically *to discover* the failure mode (e.g., chaos engineering on a controlled blast domain) - but in that case the blast domain itself must be bounded; the discipline still applies.

## How to apply

1. **Enumerate the failure modes before the run.** Write them down. For Maraia Flight #1, the eyebolt failure and burn-circuit-disconnect were not enumerated by name - but the broader failure modes were ("capsule does not release," "capsule lands outside predicted zone," "capsule is destroyed by impact"). For your experiment: what specific things can go wrong, and what does each one cost if it does?

2. **For each failure mode, write the bound.** Bounds come in five categories - pick at least one per failure mode:
   - **Geometric:** altitude, location, traffic %, blast domain (Falcon's "each engine is housed within its own metal bay to isolate it from neighboring engines" - Falcon User's Guide §1.5.1, p.4).
   - **Capacity:** mass, throughput cap, rate limit (Maraia's 6-lb FAA limit on the subscale; the canary's 1% traffic share).
   - **Backup:** redundant parachute, fallback path, last-known-good config (Rocket U parachute on Maraia Flight #1; the previous container image still warm).
   - **Termination:** AFTS, autonomous safe shutdown, automatic rollback trigger (Falcon's "An autonomous safe shutdown is performed if any off-nominal condition is detected" - Falcon User's Guide §1.5.1, p.4).
   - **Recovery:** the failed unit returns intact for inspection (see [recovery-as-instrumentation](recovery-as-instrumentation.md)).

3. **Pre-write mission rules for autonomous termination.** Falcon's AFTS does not deliberate - it terminates if pre-written rules are violated. Your equivalents: "auto-rollback if error rate >X% over Y seconds," "kill the migration if rows-affected exceeds Z," "shut down the agent if it has called tool W more than N times." Write the rules before the run. The autonomy of the termination is what bounds the failure during the moments when humans cannot react in time.

4. **Test the bound, do not just declare it.** Falcon tests separation under off-nominal conditions: "stage separation tests are performed for off-nominal cases with respect to geometrical misalignment, anomalous timing, and sequencing." (Falcon User's Guide §1.5.3, p.5) The bound that has only been declared has not yet been demonstrated. If the kill switch has never been pulled in a test, you do not know it works.

5. **Pair the bound with isolation.** "Although the likelihood of catastrophic engine failure is low, and failing engines are designed to be shut down prior to a catastrophic failure, each engine is housed within its own metal bay to isolate it from neighboring engines." (Falcon User's Guide §1.5.1, p.4) The bound on a single engine's failure is reinforced by the geometry that prevents it from cascading. For software: bulkheaded retries, per-tenant rate limits, blast-radius-aware deploys.

6. **Run the experiment.** With each failure mode bounded and the bound demonstrated, the experiment is safe to run. The failure that materializes is data. The bound prevents the data from becoming a disaster.

## Worked example

**Maraia Flight #1 - two anomalies, both bounded.**

The flight (July 26, 2012, Melbourne FL): a 10-inch / 6-lb subscale capsule lifted by balloon to ~104,000 ft, with planned release at altitude, freefall, and parachute recovery (Maraia p.3, p.5).

**Anomaly 1: Eyebolt failure at launch.**
- *Failure mode:* two-point attach to upper payload becomes single point.
- *Bound - capacity:* FAA payload limit forced 6-lb mass; even a degraded attach was within survivable structural margins for the system.
- *Bound - backup:* the Rocket U parachute (the upper payload) deployed as expected.
- *Outcome:* ascent continued at 1285 ft/min, near the expected ascent rate, to 103,984 ft (Maraia p.5).

**Anomaly 2: Release command produces no release at 72,500 ft.**
- *Failure mode:* capsule still attached during freefall, primary aerodynamic objective unobtainable.
- *Bound - backup:* "The Rocket U parachute inflated as expected" - the upper payload's parachute system pulled the assembly through to landing (Maraia p.5).
- *Bound - recovery:* "The system began to experience significant dynamics and the 50-lb line required by FAA regulations snapped between the Rocket U payload and the capsule release box." The FAA-required tether is itself a bounded failure mechanism (tested breaking strength); when dynamics exceeded its rating, it broke as designed, and "the capsule descended under parachute (release box still attached)" (Maraia p.5).
- *Bound - geometric:* the predicted landing zone covered the actual landing site; "Both payloads were recovered."
- *Outcome:* "Both payloads were recovered" (Maraia p.5) → root cause analysis identified the burn-circuit electrical pull-loose → design fix: "(The electrical setup of this system was modified for future flights)" (Maraia p.5).

The flight missed its primary aerodynamic objective. The anomalies were bounded by altitude, by mass, by FAA-compliant tether breaking strength, by the upper-payload parachute backup, and by the predicted recovery zone. The team got the post-flight data they needed to close the loop and fly Flight #2.

**Falcon AFTS - the final autonomous bound.**

When upstream gates fail, AFTS terminates the flight automatically if mission rules are violated (Falcon User's Guide §2.5, p.10). The mission rules are pre-written. The termination is autonomous. The damage is bounded by the geometry of where termination occurs.

Translation: when your system's upstream gates fail, what autonomously kills the run before the failure cascades? If the answer is "an on-call engineer pages and reacts," the bound is set by human latency, not by the system. AFTS-equivalent rules - written, autonomous, tested - are the bound that holds when humans cannot.

## Anti-pattern

**The optimistic experiment plan.** Team plans a migration that will rewrite a billion rows in production. The plan describes the happy path step by step. "What if it fails?" is answered with "we'll roll back." The rollback procedure is described in one sentence: "restore from backup." The backup restore time is not measured. The rate-limiting on the migration is set high "for speed." There is no automatic kill condition.

The migration runs. A query plan changes mid-run. The migration starts rewriting at 10x the expected rate. The on-call sees the alert, but by the time the human-in-the-loop kill is issued, 200M rows have been rewritten incorrectly. Restore-from-backup takes 14 hours. The "we'll roll back" plan was a slogan, not a bound.

The fail-controlled fix:
- *Geometric bound:* migration shards by tenant, only one shard runs at a time.
- *Capacity bound:* row-rewrite rate hard-capped at expected rate × 1.5.
- *Backup bound:* reversible migration (idempotent, can be re-run from any checkpoint).
- *Termination:* automatic kill if rows-affected exceeds X% in Y seconds (the mission rule).
- *Recovery:* the partial-run state is preserved for inspection, not auto-cleaned.

Each bound is written before the run, demonstrated in staging on a representative shard, and active in production from the first row.

## Related skills

- Parent: [iterate-fast](../SKILL.md) - fail-controlled is what makes the bold experiment safe; without it, the same experiment is reckless
- Pairs with: [cheap-abort-design](cheap-abort-design.md) - cheap-abort bounds *pre-commit* failure cost; fail-controlled bounds *post-commit* failure cost
- Pairs with: [subscale-flight](subscale-flight.md) - the cheap rung's failure must stay cheap; fail-controlled is how
- Compose with: blast-radius-analysis (route via your parent spine to system-engineering) - fail-controlled writes the bound; blast-radius-analysis quantifies what stays inside it
- Compose with: [recovery-as-instrumentation](recovery-as-instrumentation.md) - the recovery bound is a fail-controlled bound (the failed unit returns intact)
- Compose with: pre-commitment-gate (route via your parent spine to feedback-loops) - the gate decides whether to run; the bound decides what failure costs if you did

## Source

- Primary: Maraia Capsule Flight Test Report, Section III.A (Maraia p.5) - eyebolt failure, burn-circuit pull-loose, FAA tether bound, Rocket U parachute backup, both payloads recovered
- Primary: Maraia (Maraia p.3) - FAA 6-lb payload bound on subscale
- Primary: Falcon User's Guide §2.5 (p.10) - autonomous flight termination system, mission rules pre-written, automatic termination
- Primary: Falcon User's Guide §1.5.1 (p.4) - engine isolation by metal bay; autonomous safe shutdown on off-nominal condition
- Primary: Falcon User's Guide §1.5.3 (p.5) - off-nominal stage separation testing for misalignment, timing, sequencing

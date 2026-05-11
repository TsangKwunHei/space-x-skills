---
name: fault-tolerance-tiering
description: Allocate redundancy unevenly - more where blast radius is large, less where it is bounded. Load this when designing factor-of-safety policy, deciding how many inhibits a hazardous action needs, picking between single-fault and dual-fault tolerance, choosing redundancy levels for an N-replica system, or auditing whether your "redundancy" actually has independent failure modes. The reflex this trains: same physical act under different conditions deserves different factors. Flight loads, ground operations, and personnel-below-the-load are not the same tier. Two valves in series on one electrical command is not two inhibits.
---

# Fault-Tolerance Tiering

Falcon User's Guide Table 6-1 lists three factors of safety for the same physical class of load:

| Context | Yield | Ultimate |
|---|---|---|
| Flight | 1.10 | 1.25 |
| Ground operations | 1.10 | 1.40 |
| GSE lifting hardware | 3.0 | 4.0 |

(Falcon User's Guide §6.1 Table 6-1, p.43.)

Same load class. Three factors. GSE lifting gets ~3× the flight ultimate factor because personnel are below the load. The factor reflects who pays when it fails.

That table is the whole skill in one row. Uniform safety is a category error.

## What this is

Fault-tolerance tiering is the practice of allocating redundancy, factors of safety, and inhibits in proportion to blast radius - the consequence of failure - rather than uniformly across a system. Engine-out is achieved by 9 Merlins plus a vehicle-management supervisor (Falcon User's Guide §1.5.1, p.4). Hazardous propellant release requires three independent inhibits, ordinary propellant release requires two (cited via principles-to-skills-map.md Principle 11). Lifting hardware that could drop on people gets a 4.0 ultimate factor versus 1.25 for flight. Three different tiers for three different consequences.

The tiering is published before component design begins. The table is the contract. Component teams design to the tier, not to a uniform default.

## When to use this

- Setting factor-of-safety policy for a new vehicle, platform, or product line
- Deciding redundancy depth for an N-replica system (database replicas, AZ count, retry policies)
- Reviewing an existing redundancy design and asking "is this independent?"
- Designing inhibit chains for hazardous actions (irreversible deletes, payment dispatch, rocket release)
- Allocating engineering effort: where does the redundancy budget actually need to land?
- Audit: pulling the redundancy table and asking which tier each component should be in

## When NOT to use this

- For systems where blast radius is uniform across components - rare, but possible (e.g., a stateless CDN edge)
- Tactical bug fixes that do not change the redundancy posture
- Pre-corpus: until you have done [failure-corpus-mapping](failure-corpus-mapping.md), you do not know which axes need the tiers in the first place

## How to apply

1. **Define the tiers explicitly, with names.** SpaceX uses three: flight, ground operations, GSE lifting (Falcon User's Guide Table 6-1, p.43). For propellant systems they use two: hypergolic / catastrophic-hazard (dual fault tolerance, three inhibits) and other (single fault tolerance, two inhibits). Name your tiers. "Critical" and "non-critical" is two tiers, which is often enough.

2. **Assign each subsystem to a tier by blast radius.** Blast radius is "who pays when it fails": payload (loss of mission), hardware (loss of vehicle, monetary), personnel (life-safety). The Falcon GSE lifting tier gets 3× the flight factor because "personnel are below the load." Same physical object lifted in two contexts → two different factors.

3. **Tier supervisors as part of the redundancy.** N redundant components without a supervisor that actively reroutes around failure is N components, not N-redundant. Falcon 9's nine engines work because of "system-level vehicle management software [that] controls the shutdown of engines in response to off-nominal engine indications; this has been demonstrated in flight, with 100% primary mission success" (Falcon User's Guide §1.5.1, p.4). Without that supervisor in the time window where the decision matters, you have nine ways to lose the mission, not one.

4. **Enforce inhibit independence.** "Inhibits shall be independent and cannot be combined. For example, a single electrical command of two valves in series is not a dual fault tolerant system" (principles-to-skills-map.md L146, citing Falcon User's Guide §6.4.6). Two valves on one wire is one inhibit. The independence rule prevents the optical-redundancy trap. The same logic applies at the fastener level: locking features must not depend on preload to function (Falcon User's Guide Table 6-3 paraphrased; principles-to-skills-map.md L158–L164).

5. **Tier the engine-out / fail-controlled supervisor by what it can do in time.** A supervisor that "pages a human" is not a control plane for time-critical decisions - by the time the human is awake, the window has closed. Falcon's engine shutdown happens in ms via flight computer; the AFTS terminates flight if mission rules are violated, also automatically (Falcon User's Guide §2.5, p.10). The redundancy is real because the supervisor is real-time.

6. **Where the corpus does not point, do not invest.** Tiering is per-axis. A subsystem that does not appear in the failure corpus does not need a heavy tier just because the architecture diagram has space for one. CRS-7's rod end was the inverse - the architecture had no tier at the apex of a load chain whose terminus was the entire vehicle, because nobody had named the apex. The 4:1 the manufacturer required was published; the architecture did not enforce it (CRS-7 IRT p.7).

## Worked example

A payments platform has three irreversible action classes:

- **Class A: send money to a counterparty.** Blast radius: customer-visible loss of funds, regulatory exposure, reputational. Tier: highest. Three independent inhibits - (i) double-entry reconciliation pre-write, (ii) idempotency-key check at the edge, (iii) human-in-the-loop approval above $50k. No two inhibits share a code path or a deploy.
- **Class B: refund a customer.** Blast radius: bounded - at worst, double-refund up to a known dollar cap. Tier: middle. Two independent inhibits - idempotency key + reconciliation report at end-of-day.
- **Class C: send a confirmation email.** Blast radius: spam complaint at worst. Tier: lowest. One inhibit - idempotency key. Failure mode is bounded and reversible.

The tiering matches the blast radius. The "human-in-the-loop above $50k" inhibit costs money and slows down the system; the team only pays that cost on Class A because the consequence justifies it. They explicitly do not pay it on Class C, where the blast radius is bounded by a customer's spam folder.

Inhibit independence audit: in early design, all three classes happened to share the same idempotency-key store. That is one inhibit reused three times. The reconciliation jobs ran on the same scheduler. That is the "two valves in series on one electrical command" anti-pattern. The redesign separated the Class A reconciliation onto its own database with its own deploy cadence, so that a deploy that broke the Class B reconciliation could not silently break Class A's inhibit at the same time.

## Anti-pattern

Uniform redundancy. Every service has two replicas, every queue has a dead-letter, every endpoint has a circuit breaker. The architecture looks rigorous. The blast-radius distinction has been erased - Class A and Class C have the same inhibit count because the infrastructure team picked one default.

The CRS-7 anti-pattern is the inverse: a single rod-end-class joint sits at the apex of a load chain, with the manufacturer's own published 4:1 derating not applied, no screening of the unit, no test under flight conditions. "The IRT differs from SpaceX... The use of an industrial grade 17-4 PH SS casting in a critical load path under cryogenic conditions and flight environments, without additional part screening, and without regard to manufacturer recommendations for a 4:1 factor of safety, represents a design error – directly related to the F9-020 CRS-7 launch failure as a 'credible' cause" (CRS-7 IRT TF-1, p.8). The architecture had tiered fault tolerance for engines and avionics. It had not tiered for that load path. The blast radius was the entire vehicle. The tier was effectively zero.

The two anti-patterns share a root: nobody asked "who pays when this fails?" before deciding the redundancy depth.

## Related skills

- Parent: [architecture](../SKILL.md)
- Pairs with: blast-radius-analysis (route via your parent spine to system-engineering) - blast radius drives the tier; tiering allocates the redundancy budget along it
- Pairs with: [failure-corpus-mapping](failure-corpus-mapping.md) - corpus picks the axes; tiering allocates depth on each axis
- Compose with: apex-identification (route via your parent spine to system-engineering) - the apex is where the highest tier belongs
- Compose with: [forbidden-list](forbidden-list.md) - patterns that violate independence (two valves on one wire) belong on the no-list

## Source

- Primary: Falcon User's Guide §6.1 Table 6-1, p.43 (factors of safety: flight 1.10/1.25, ground 1.10/1.40, GSE lifting 3.0/4.0)
- Primary: Falcon User's Guide §1.5.1, p.4 (engine-out, isolation bays, vehicle-management software supervisor with 100% primary mission success)
- Primary: Falcon User's Guide §2.5, p.10 (autonomous flight termination system)
- Primary: CRS-7 IRT p.7 and TF-1, p.8 (no redundancy at the rod-end apex; manufacturer's 4:1 derating not applied)
- Secondary: principles-to-skills-map.md Principle 11, L146 (inhibit independence rule, dual vs single fault tolerance), L156 (GSE 3× flight factor because personnel below the load), L158–L164 (locking features not dependent on preload)

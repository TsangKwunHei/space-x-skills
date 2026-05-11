---
name: blast-radius-analysis
description: Bound the downstream impact of a single node's failure - how many other nodes go with it, in what time window, with what severity. Use whenever evaluating a change to a shared dependency, sizing redundancy, prioritizing tests, or whenever the user mentions "blast radius," "what does this break," "if X dies what dies with it," "single point of failure," "shared resource," "cascading failure," or "scope of impact." Especially load before approving changes to high-fanout components - the cost of a node's failure is set by its blast radius, not by its size.
---

# Blast Radius Analysis

A cast 17-4 PH stainless-steel rod end small enough to hold in your hand was, on 28 June 2015, the apex of a load chain whose blast radius was the entire Falcon 9 vehicle.

The CRS-7 IRT (page 7) traced it: "the failure of the axial strut supporting a COPV ... liberated the aforementioned COPV ... ruptured the gaseous helium (GHe) plumbing system within the Stage 2 LOx tank" and the LOx tank ruptured. From the rod end's failure to total vehicle disintegration: 800 to 900 milliseconds (CRS-7 IRT page 5).

The part was small. Its blast radius was the mission.

## What this is

Blast-radius analysis answers a single question per node: if this fails right now, what fails with it, and how fast?

The answer has three components:
- the **set** of downstream nodes affected
- the **time window** until each is impacted
- the **severity** of the impact at each (degraded, unavailable, destroyed)

A node's blast radius is independent of its size, cost, or position in the org chart. The CRS-7 rod end weighed grams; its blast radius was the whole vehicle.

The discipline forces an inversion of intuition. Engineers naturally think about a component in terms of what it does. Blast-radius thinking asks what it kills. Two components doing identical jobs can have radically different blast radii based on what depends on them: an auth service has a larger blast radius than a feature flag service even if their code is similar.

The point is not to eliminate blast radii - many components have to be load-bearing - but to make the radius **visible**, **quantified**, and **gated**. A component with vehicle-level blast radius gets vehicle-level qualification, vehicle-level redundancy, and vehicle-level review. A component with leaf-level blast radius does not.

The bounded form of blast radius - explicit, time-windowed, capped - is what makes redundancy work. Falcon's hold-down sequence (Falcon User's Guide §10.5.5, p.83) bounds the blast radius of an off-nominal engine: "Engine ignition occurs shortly before liftoff, while the vehicle is held down at the base via hydraulic clamps. The flight computer evaluates engine ignition and full-power performance during the prelaunch hold-down, and if nominal criteria are satisfied, the hydraulic release system is activated at T-0. A safe shutdown is executed should any off-nominal condition be detected."

Before release, an engine failure's blast radius is the engine and a scrubbed launch. After release, the blast radius is the entire stack. The clamps draw the boundary.

## When to use this

- Before changing any shared dependency (auth, database, queue, factory pad, ICD)
- When designing redundancy - the blast radius sets the redundancy tier required
- When prioritizing tests - the components with the largest blast radius earn the most expensive rungs
- When reviewing post-mortems - verify the blast-radius estimate matched reality
- When sizing on-call coverage and runbooks
- When the user proposes "small change to a load-bearing component" - the change is small; the radius may not be
- When deciding what to log, what to alarm on, what to budget SLO error against

## When NOT to use this

- For purely additive features that touch no existing dependency
- When the graph itself is unknown - first do system-graph-mapping; blast-radius analysis consumes a graph
- When the question is "why did this break" (use cascade-tracing instead - that walks forward from a known origin)
- For one-off scripts, throwaway prototypes, or sandbox environments where blast radius is bounded by definition

## How to apply

1. **Start from the graph.**

   Blast-radius analysis assumes you have already mapped nodes and edges. If not, do [system-graph-mapping](system-graph-mapping.md) first.

2. **For each node, walk downstream edges.**

   For each edge out of the node, follow it to its target. Mark the target as impacted. Recursively walk that target's outgoing edges. The closure is the blast radius.

   The CLI `tools/clis/blast-radius.js` does exactly this for a JSON `{nodes, edges}` graph and ranks nodes by closure size.

3. **Annotate with time window.**

   For each impacted downstream node, estimate when impact arrives. The CRS-7 cascade was 800–900 ms end-to-end (CRS-7 IRT page 5); a downstream service whose retry budget is 30 s may not be impacted at all if the upstream recovers in 3 s. Time matters.

4. **Annotate with severity.**

   Impacted ≠ destroyed. Distinguish:
   - **degraded** (slower / lossy)
   - **unavailable** (timing out / errors)
   - **destroyed** (data lost / hardware gone)

   The CRS-7 Dragon spacecraft was on a destroyed launcher but "indicated no anomalous behavior prior to the mishap, survived the second stage event, and continued to communicate with ground controllers" (CRS-7 IRT page 3) - Dragon's severity was "survived" even inside the radius.

5. **Find the bounded vs. unbounded boundaries.**

   Which mechanisms cap the radius today? Hold-down clamps cap engine-failure radius until release. Circuit breakers cap a downstream service's failure radius. A pre-stretched wire rope caps a length-creep failure radius. List them. Where there is no boundary, redundancy must be tiered up.

6. **Compare radius to current redundancy.**

   If the radius is the whole system and the component is single-string, you have a fault-tolerance gap. The Falcon User's Guide §6.4.6 derives this: "For systems using hypergolic propellants, or if a system failure may lead to a catastrophic hazard, the system must have dual fault tolerance (three inhibits to propellant release)."

   Catastrophic radius → dual fault tolerance, not single. Match the tier to the radius.

7. **Publish the top three.**

   Whoever owns the system should be able to name the three nodes with the largest blast radius without checking. If they cannot, the radii are invisible, which means they are unprotected. See [apex-identification](apex-identification.md).

## Worked example

**CRS-7 rod end, mapped node-by-node** (CRS-7 IRT page 7).

Node: industrial-grade 17-4 PH stainless-steel rod end - a threaded cast eye bolt, small enough to hold in your hand.

Outgoing edges:
- Rod end → axial strut (mechanical load)
- Axial strut → COPV mount (mechanical load)
- COPV mount → COPV-in-LOx (constraint against buoyancy)
- COPV (loose) → LOx dome (impact)
- LOx dome → Stage 2 LOx tank wall (rupture propagation)
- Stage 2 → Stage 1 + Dragon + payload (vehicle integrity)

Walked closure: rod end, strut, COPV mount, COPV, LOx dome, Stage 2, Stage 1, Dragon (carrier), 4,303 lb of cargo bound for ISS, and the mission.

**Blast radius: entire vehicle plus mission.**

- Time window: 800–900 ms (CRS-7 IRT page 5).
- Severity: destroyed (vehicle), survived (Dragon), lost (mission).
- Bounded by: nothing. There was no clamp, breaker, or fuse between rod end and vehicle. The strut was the apex of an unbounded cascade.
- Required tier given that radius: aerospace-grade casting, manufacturer-recommended 4:1 derating, screening, load testing under predicted flight conditions (CRS-7 IRT TF-1, page 8). None of these were present.

The same rod end in an industrial application (per the manufacturer's intended use) had a blast radius bounded by the manufacturer's 4:1 factor of safety and by the host application's own protective mechanisms. Same part, different graph, different radius, different qualification regime.

**Compare with hold-down on a nominal launch** (Falcon User's Guide §10.5.5, p.83).

Engine fails to reach full thrust → flight computer detects off-nominal during hold-down → hydraulic release is not activated → autonomous safe shutdown → vehicle remains clamped.

Blast radius: nine engines plus a scrubbed flight, no propellant lost downrange, no airframe damage, no Range cleanup. The clamps are the boundary that bounds the radius. Same engine failure, same vehicle, but the boundary turns a vehicle-level radius into an engine-level radius.

## Anti-pattern

CRS-7 manufacturer's 4:1 factor of safety, ignored (CRS-7 IRT TF-1, page 8). The manufacturer of the industrial-grade rod end had documented a 4:1 derating for industrial applications. SpaceX used the part "without regard to manufacturer recommendations for a 4:1 factor of safety" and "without proper modeling or adequate load testing of the part under predicted flight conditions" (CRS-7 IRT page 7). Substituting an industrial-grade part for an aerospace-grade part at a node with vehicle-level blast radius is a tier mismatch: the part's design margin assumed a small radius (industrial), while its position in the graph gave it a vehicle-sized radius. The error is not "we used a cheap part" but "we did not check whether the part's qualification matched its blast radius."

The same anti-pattern recurred non-fatally with the LOx Transfer Tube wire ropes (CRS-7 IRT TF-2, page 8): "commercially procured wire ropes ... without regard for manufacturer's caution to specify pre-stretched ropes in a length-critical application." Different part, same blast-radius / qualification mismatch. The IRT called this out as a pattern: TR-1 (page 8) - "SpaceX should apply particular emphasis to understanding manufacturer's recommendations for using commercially sourced parts in flight critical applications."

## Related skills

- Parent: [system-engineering](../SKILL.md)
- Pairs with: [system-graph-mapping](system-graph-mapping.md) (consumes a graph), [apex-identification](apex-identification.md) (the apex is the largest-radius node), fault-tolerance-tiering (route via your parent spine to architecture) (tiers redundancy by radius)
- Compose with: [cascade-tracing](cascade-tracing.md) (radius gives the cascade's reachable set), forbidden-list (route via your parent spine to architecture) (some configurations are forbidden because their radius is unacceptable)

## Source

- Primary: CRS-7 IRT report, page 5 (800–900 ms timespan), page 7 (rod end / strut / COPV / LOx dome cascade), TF-1 page 8 (design error: industrial-grade casting in flight-critical path).
- Secondary: Falcon User's Guide §10.5.5, p.83 (hold-down bounds engine-failure radius), §1.5.1, p.4 ("autonomous safe shutdown is performed if any off-nominal condition is detected"), §6.4.6 (catastrophic-hazard systems require dual fault tolerance).
- Tool: `tools/clis/blast-radius.js` computes downstream closure for a JSON graph and ranks nodes by blast-radius size.

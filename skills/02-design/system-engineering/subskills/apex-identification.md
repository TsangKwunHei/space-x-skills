---
name: apex-identification
description: Find the single node at the top of a critical-path graph - the place where many paths converge and whose failure has system-wide blast radius. Use when ranking components for review depth, when sizing test budgets, when designing redundancy, or whenever the user says "single point of failure," "the one thing that holds it all up," "what's load-bearing," "who decides," "which part is critical," or "we should look at X first." Especially load before approving any change to a candidate apex node and before assigning grades of qualification - apex parts cannot be industrial-grade.
---

# Apex Identification

The CRS-7 IRT (page 7) named it: a "threaded cast stainless steel eye bolt" - a Rod End - at the head of an axial strut supporting a helium pressure vessel inside the upper-stage liquid oxygen tank. Small, cheap, easy to overlook on a parts list. It sat at the apex of a load chain whose terminus was the vehicle.

Industrial-grade. The manufacturer recommended a 4:1 factor of safety for industrial applications (page 7); SpaceX did not apply it. There was no screening, no flight-condition load testing, no acknowledgment that the part's position made it apex. The vehicle disintegrated in 800–900 ms (page 5).

The part was small. Its place in the graph was not.

## What this is

The apex of a critical path is the single node where many other paths converge and whose failure cannot be routed around.

In a graph, it is the node with the largest blast radius, often (but not always) the smallest fan-in: many things depend on it, very little it depends on.

- In load chains, the apex is mechanical - a strut, a bolt, a clamp.
- In control planes, the apex is logical - an auth service, a leader-elected coordinator, a single-master ICD owner.
- In organizations, the apex is a role - the Falcon Mission Manager, who is "a single technical point of contact from contract award through launch" (Falcon User's Guide §9.2, p.70).

The apex is not the largest part, the most expensive part, or the most-watched part. It is the part whose failure ends the mission.

Apex identification is the discipline of *finding* that node deliberately, *naming* it explicitly, and *sizing the qualification regime to its blast radius*.

The CRS-7 lesson is that apex parts cannot be industrial-grade. The CRS-7 IRT TR-1 (page 8) made the principle explicit: "SpaceX should apply particular emphasis to understanding manufacturer's recommendations for using commercially sourced parts in flight critical applications."

The manufacturer's intended use bounds the blast radius the part was qualified for. When the part is moved into a position with a larger blast radius, the qualification regime must be re-derived. Carrying the manufacturer's industrial qualification into a flight-critical position is a category error.

The Falcon User's Guide §6.4.6 sets the threshold quantitatively: "For systems using hypergolic propellants, or if a system failure may lead to a catastrophic hazard, the system must have dual fault tolerance (three inhibits to propellant release)." Catastrophic-hazard systems sit at apex positions; they get dual fault tolerance, not single. The architecture is tiered to the apex, not averaged across the graph.

## When to use this

- During system review, before assigning test budget and review depth
- When evaluating a part's grade (industrial vs. aerospace) - apex parts cannot be industrial
- When designing a redundancy scheme - the apex needs the highest tier
- When a small or cheap component is in a load-bearing position and the team says "it's just a bolt"
- When defining incident-response decision authority - for each decision, exactly one named apex
- When a single shared service (DB, auth, queue, certificate authority) is a candidate apex and you need to confirm
- During interview-style design reviews: "name the three apex nodes; if you cannot, the apex is invisible"

## When NOT to use this

- For purely flat systems with no convergence - there is no apex to find
- For small features that cross no apex node
- When the apex is well-known and the question is operational (use blast-radius-analysis or fault-tolerance-tiering instead)
- When the team is debating priority of polish work - apex identification is for safety-critical analysis, not feature ranking

## How to apply

1. **Walk the graph.**

   Apex identification consumes a graph; do [system-graph-mapping](system-graph-mapping.md) first. Use [blast-radius-analysis](blast-radius-analysis.md) to compute the downstream closure for each node.

2. **Rank nodes by blast radius.**

   The apex is, by definition, near the top of this ranking. Use the `tools/clis/blast-radius.js` CLI to produce a ranked list. The top 1–3 are apex candidates.

3. **Test each candidate against the apex criteria.**

   A true apex satisfies all three:
   - Many other nodes depend on it directly or transitively
   - No parallel path exists that can carry the load if it fails
   - Failure is not gracefully degradable - the system loses an essential function, not just performance

   The CRS-7 rod end satisfied all three: many load paths converged on it, no parallel strut existed, and its failure liberated the COPV with no graceful degradation (CRS-7 IRT page 7).

4. **Name the apex explicitly.**

   Write the apex node, its blast radius, and its current qualification grade in the system's living documentation. "The auth service is the apex of the access-control graph; its failure cuts traffic for all 12 downstream services within 30 seconds; current redundancy is single-master with 90 s recovery." Naming exposes the gap.

5. **Size the qualification regime to the blast radius.**

   - Apex parts get aerospace-grade derating, screening, and load testing under predicted operating conditions (CRS-7 IRT TF-1, page 8).
   - Apex services get dual fault tolerance with independent inhibits (Falcon User's Guide §6.4.6).
   - Apex roles get a single named human, not a rotation.

   Match tier to radius.

6. **Verify manufacturer's intended-use envelope.**

   For commercially sourced parts at apex positions, read the manufacturer's spec literally. If the spec calls for a 4:1 derating in industrial applications, an apex (flight-critical) position needs at minimum that derating, plus screening for the new environment.

   The Falcon wire-rope finding (CRS-7 IRT TF-2, page 8) is the same pattern - manufacturer cautioned to specify pre-stretched ropes for length-critical applications; SpaceX did not. Apex use cannot ignore manufacturer caveats.

7. **Re-rank after every architectural change.**

   Adding a node, deleting a node, or changing an edge can move the apex. The apex of yesterday's graph may not be the apex of today's. Re-run the blast-radius computation; re-publish the top three.

## Worked example

**The CRS-7 rod end as apex part** (CRS-7 IRT page 7, TF-1 page 8).

Graph context: helium-filled COPV inside Stage 2 LOx tank → mounted via axial strut → strut secured by rod end. Many flight loads converge on the rod end (axial load from strut, indirect load from COPV mass, dynamic load from ascent acceleration). No parallel strut exists; the rod end's failure has no parallel path.

Apex test: (a) many things depend on it (the strut, the COPV, the LOx tank's interior layout, the upper-stage structure) - yes; (b) no parallel path - yes; (c) not gracefully degradable (rod end fails → strut releases → COPV liberates → LOx dome impacted) - yes. The rod end is the apex of the COPV-attachment subsystem.

Qualification check: industrial-grade 17-4 PH SS casting. Manufacturer recommends 4:1 factor of safety for industrial use (page 7). For aerospace flight-critical positions, the implicit requirement is aerospace-grade material plus screening plus load testing in predicted flight conditions. Actual practice: industrial-grade, no derating, no screening, no flight-condition load testing (page 7). Tier mismatch. The blast radius was the entire vehicle; the qualification regime was for an industrial application.

Outcome: rod end fails at T+139.1 s; vehicle disintegrates within 800–900 ms (page 5); cargo (4,303 lb to ISS) is lost (page 3). The IRT's TR-1 (page 8) made the lesson explicit: parts at apex positions need qualification regimes commensurate with their position, not their part-number-of-origin.

**The Mission Manager as apex role** (Falcon User's Guide §9.2, p.70). Many customer interactions and many internal SpaceX dependencies converge on the MM: "the master document for a Falcon launch vehicle mission" (the ICD) is owned by the MM; "SpaceX maintains configuration control of the document" through the MM. There is "a single technical point of contact from contract award through launch." This is an apex by design - a single named human authority - and the qualification regime is correspondingly heavy: the role is filled by a named individual, not a rotation, with internal authority across vehicle engineering, avionics, build & flight reliability, production, launch, plus external Range Safety, FAA, and FCC interfaces. Match the tier to the radius.

## Anti-pattern

CRS-7 industrial-grade rod end in a flight-critical cryogenic load path (CRS-7 IRT TF-1, page 8). The recurring failure mode of the apex anti-pattern is "the part looks ordinary, so we treated it as ordinary." Industrial 17-4 PH SS castings are routinely used in industrial settings; they are not typically a flight-critical concern. But a part's qualification floor is set by its position in the graph, not by its part number. The IRT explicitly called this out: the part was "used in a critical load path under cryogenic conditions and strenuous flight environments, supporting a COPV ... holding helium inside the Stage 2 LOx tank" (page 7) - every adjective in that sentence (critical, cryogenic, strenuous, supporting, holding) raised the required tier above industrial. Implementation was done "without adequate screening or testing of the industrial grade part" and "without proper modeling or adequate load testing of the part under predicted flight conditions" (page 7).

The anti-pattern in software shows up as: adopting an off-the-shelf library or service whose docs assume hobbyist or staging use, then placing it at a production apex without re-deriving the qualification regime. The library was qualified for its envelope. The apex position is outside that envelope. Either re-qualify (load test, security review, derating equivalent), or move the apex elsewhere.

## Related skills

- Parent: [system-engineering](../SKILL.md)
- Pairs with: [blast-radius-analysis](blast-radius-analysis.md) (apex is the largest-radius node), [system-graph-mapping](system-graph-mapping.md) (cannot find an apex without a graph)
- Compose with: fault-tolerance-tiering (route via your parent spine to architecture) (apex sets the tier), forbidden-list (route via your parent spine to architecture) (industrial-grade-at-apex is on the forbidden list), signed-contracts (route via your parent spine to infrastructure) (apex contracts get more rigorous review)

## Source

- Primary: CRS-7 IRT report, page 7 (rod end at apex of strut/COPV load chain; manufacturer 4:1 not applied; industrial vs. aerospace grade); TF-1 page 8 (design error: industrial casting in flight-critical cryogenic path); TR-1 page 8 ("apply particular emphasis to understanding manufacturer's recommendations for using commercially sourced parts in flight critical applications").
- Secondary: Falcon User's Guide §9.2, p.70 (Mission Manager as single apex role, "master document" / "single technical point of contact"); §6.4.6 (catastrophic-hazard systems require dual fault tolerance - apex tier matched to radius).

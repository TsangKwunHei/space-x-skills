---
name: system-graph-mapping
description: Enumerate a system as nodes (parts, services, teams, facilities) and edges (loads, flows, contracts, handoffs) before analyzing it. Use when reviewing a non-trivial change, when an incident escaped local code review, when the architecture diagram disagrees with reality, or whenever the user says "draw it out," "what depends on what," "system map," "dependency graph," "the whole picture," or "we keep finding new components." Especially load before blast-radius-analysis, cascade-tracing, or apex-identification - those skills operate on a graph; if you do not have the graph, you are guessing.
---

# System Graph Mapping

The CRS-7 Independent Review Team did not begin by asking which part broke. They began by drawing the graph.

Pages 5 and 6 of the report describe how the IRT "independently performed analysis of Falcon 9 CRS-7 telemetry and developed an independent millisecond-level event timeline" and "independently analyzed the various Falcon 9 systems and reviewed the SpaceX-developed fault tree." Only after the graph was on paper - every subsystem block enumerated, every flow named - could they start closing fault-tree blocks one by one until "all but the Stage 2 Fault Tree block could be closed" (CRS-7 IRT page 5).

The graph came first. The conclusion came last.

## What this is

System graph mapping is the discipline of writing down, before any analysis, every component of a system as a node and every connection between components as an edge.

A **node** is anything that can fail independently: a part, a service, a team, a building, a contract clause, a propellant tank, a network packet path.

An **edge** is anything that flows between nodes and could carry a fault: a load, a control signal, a data packet, a propellant feed, a procedural handoff, a signed deliverable.

The graph is an artifact, not a sketch. It is named, versioned, and shared. The act of drawing it is the work - most teams discover that two of their nodes were the same node, or that an edge they assumed existed has no owner, or that an entire subgraph (the launch facility, the recovery contractor, the customer) was missing from their mental model.

The graph is also composable. Falcon Heavy is "three Falcon 9 first stages with enhancements," sharing "the same second stage and same payload fairing" (Falcon User's Guide §2.2, p.6). The Heavy graph reuses the Falcon 9 subgraph almost in full, which is the entire reason Heavy inherits Falcon 9's flight heritage.

A graph that lives only in one engineer's head is not a graph. It is a single point of failure for the system understanding itself.

## When to use this

- Before any blast-radius, cascade, or apex analysis - those skills consume a graph
- When an incident review keeps surfacing components nobody had on the diagram
- When the architecture document and the production reality have visibly diverged
- When designing a new system whose components reuse an existing one (composition graphs)
- When two teams describe "the same" system using different nouns
- When facility, organizational, and software topologies are entangled and someone needs to see them together
- When you have to explain the system to an outside reviewer (regulator, customer, IRT)

## When NOT to use this

- When the failure is genuinely local to one component and the graph adds no information (a typo in one config file)
- When a graph already exists, is current, and the team agrees on it - re-drawing it is busywork
- For exploratory single-file work where the graph would dwarf the change
- When you need to commit code in the next ten minutes; mapping is upstream work, not a hot-fix activity

## How to apply

1. **Pick a scope and stick to it.**

   Name the system boundary in one sentence. "Falcon 9 ascent flight, T-3 s through SECO-1." "The checkout payment flow from cart submit to order-confirmation email." If you cannot name the boundary, you are mapping the universe.

2. **Enumerate nodes.**

   Walk the boundary and write down every component that can fail independently. Include physical parts, services, queues, facilities, teams, and external dependencies (Range Safety, FAA, the customer's ground station).

   The CRS-7 fault tree had blocks for "First Stage, Propulsion, Avionics, Electrical, Dragon" plus Stage 2 (CRS-7 IRT page 5) - first-class nodes for the things you might expect, plus the things you might forget.

3. **Enumerate edges.**

   For every pair of nodes that interact, draw an edge and label what flows on it: load, propellant, command, telemetry, money, signed document, procedural handoff. An edge with no labeled flow is an edge you have not yet thought about.

4. **Mark composition.**

   If a node is itself a system, link to its sub-graph rather than expanding inline. Falcon Heavy's mapping reuses Falcon 9's mapping for two entire subgraphs (upper stage, fairing). Composition is how graphs stay readable as systems scale.

5. **Mark ownership and version.**

   Each node and each edge needs an owner. An edge with no owner is the boundary where two teams politely defer to each other and the failure lives. Each subgraph carries a version number tied to the source artifact (drawing, ICD, code commit).

6. **Publish and freeze.**

   Save the graph in a format other tools can consume - JSON, dot, a checked-in diagram. The blast-radius CLI (`tools/clis/blast-radius.js`) consumes a `{nodes, edges}` JSON and computes downstream impact per node; that file format is a reasonable common ground.

7. **Re-walk after every incident.**

   Every incident either confirms or invalidates the graph. If a failure path crossed an edge that was not on the graph, the graph was wrong, and the post-mortem's first action item is to update it.

## Worked example

**Maraia full-scale balloon-flight system graph (Aug 2013, NASA Johnson).**

The Maraia paper (Sostaric & Strahan, page 6 §IV; page 8 §IV.A) describes the full-scale flight system. Map it as a graph.

Nodes:
- **HASP gondola** - carrier under high-altitude balloon
- **Release-box subsystem** - capsule-side electrical command
- **30-inch / 133 lb capsule** - test article (Maraia §IV.A)
- **Drogue chute** - deploy at 60,000 ft
- **Main chute** - deploy at 14,000 ft
- **Pneumatic deployment valve** - replaces pyro
- **GoPro camera** - onboard
- **GPS / telemetry transmitter** - ground link
- **Balloon program operations** - NASA-Wallops + Columbia Scientific Balloon Facility
- **Launch site** - Fort Sumner, NM
- **Recovery team** - post-flight

Edges:
- Gondola → capsule (mechanical attach + release-box electrical command)
- Capsule → drogue (pneumatic deploy at 100 m/s ejection velocity, page 8 §IV.A)
- Drogue → main (drogue release / main deploy at 14,000 ft)
- Capsule → telemetry (1-Hz data); telemetry → ground (GPS + radio)
- GoPro → onboard storage (micro SD)
- Recovery team → capsule (post-flight, at touchdown coordinates 34.335303, -105.259085 - Maraia page 9 §IV.B)

Composition: this graph is itself one node in a larger fidelity-ladder graph that includes "Texas A&M Low Speed Wind Tunnel → China Lake Drop Tower → Small Scale Balloon Drop → Chute Ejection Testing → Full Scale Balloon Drop" (Maraia Fig. 2, page 2). Each rung is a node; each promotion is an edge.

Once the graph exists, the loose-wire failure ("Onboard data ended at 21,357 ft due to a combination of a loose wire and the timing of the file writing" - Maraia page 9 §IV.B) and the antenna-connector failure ("a loss of signal occurred at 6,880 ft. It was later determined that a loose antenna connector was the culprit" - Maraia page 8 §IV.B) live on specific edges that can be hardened, retested, and tracked across rungs.

## Anti-pattern

The CRS-7 telemetry architecture (TF-4, CRS-7 IRT page 8). SpaceX's "new implementation (for Falcon 9 'Full Thrust' flights) of non-deterministic network packets in their flight telemetry increases latency, directly resulting in substantial portions of the anomaly data being lost due to network buffering in the Stage 2 flight computer."

The IRT recommended (TR-3, CRS-7 IRT page 8) that "SpaceX needs to re-think new telemetry architecture and greatly improve their telemetry implementation documentation."

Why this is a graph-mapping failure: the telemetry path was a graph edge between Stage 2 sensors and the ground. That edge had a labeled flow ("115 telemetry indications," CRS-7 IRT page 6) but its delivery semantics - non-deterministic, buffered, lossy - were not on the diagram. So 9 of 115 indications were lost in the failure window and the Stage 2 fault tree could not be closed (CRS-7 IRT page 5).

When the edge's properties (latency, ordering, durability) are not first-class on the graph, the graph cannot be used for forensics. Map the wires, not just the boxes.

## Related skills

- Parent: [system-engineering](../SKILL.md)
- Pairs with: [blast-radius-analysis](blast-radius-analysis.md), [apex-identification](apex-identification.md), [cascade-tracing](cascade-tracing.md)
- Compose with: [interface-contract](interface-contract.md) (every edge needs a contract), machine-consumable-artifacts (route via your parent spine to infrastructure) (the graph is a deliverable, not a picture)

## Source

- Primary: CRS-7 IRT report, pages 5–6 (independent fault-tree construction); Falcon User's Guide §2.2, p.6 (Falcon Heavy as composition of Falcon 9 subgraphs); Maraia paper, Fig. 2 page 2 and §IV pages 6–9 (balloon-flight system graph).
- Secondary: CRS-7 IRT TF-4, page 8 (telemetry-edge failure); Falcon User's Guide §1.5.3, p.5 (component-to-vehicle test program implies enumerated graph).

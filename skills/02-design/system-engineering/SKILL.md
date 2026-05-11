---
name: system-engineering
description: Stop seeing components and start seeing the graph - wires, flows, blast radius, and the apex where many paths converge. Use this skill whenever reviewing a non-trivial change, debugging a failure that escaped local code review, designing for redundancy or fault tolerance, or whenever the user mentions "system design," "blast radius," "cascade failure," "shared dependency," "single point of failure," "fault tolerance," or asks "what could break this." Especially load this skill before approving architectural changes or post-mortems - local-only review misses the apex, and the apex is where missions are lost.
---

# Systems Engineering

On June 28, 2015, at 14:23:31 UTC, a Falcon 9 carrying CRS-7 to the International Space Station was 139 seconds into flight. Telemetry showed nothing wrong. Then, in 800 to 900 milliseconds - less than the blink of an eye - the vehicle disintegrated.

The NASA Independent Review Team traced the cascade. A cast 17-4 PH stainless-steel rod end - an industrial-grade eyebolt small enough to hold in your hand - broke under ascent loads. It was holding an axial strut. The strut held a helium pressure vessel inside the upper-stage liquid oxygen tank. Liberated, the vessel's buoyancy in LOX shot it upward into the dome. The dome ruptured. The vehicle came apart.

The IRT's key technical finding: SpaceX used an industrial-grade casting in a flight-critical cryogenic load path "without adequate screening" and "without regard to the manufacturer's recommendations for a 4:1 factor of safety." One small part. Seven nodes between it and total mission loss.

An engineer who only looks at the rod end shrugs. A systems engineer walks the chain.

## What this is

A system is not a list of components. It is components plus interfaces plus flows plus blast radius. The skill is to stop seeing components and start seeing the graph - every part as a node, every connection as a wire, every wire carrying a flow that can fail, every node casting a downstream cone of damage.

When you see the graph, three questions become automatic. What is the blast radius of this change? Which interface is most likely to drift? Which node is the apex - the one place where many paths converge?

## In practice

### The small part at the apex

The rod end that failed CRS-7 was small. Looked at locally, it looked fine. But it sat at the apex of a load chain whose terminus was the entire vehicle: rod end → strut → COPV mount → COPV → LOX dome → upper stage → mission.

The IRT did not stop at the dome. They walked four levels. Proximate cause: the LOX dome ruptured. Intermediate cause: a liberated COPV impacted the dome. Initiating cause: the strut supporting the COPV failed. Root cause: an industrial-grade casting in a flight-critical cryogenic path with no 4:1 derating and no testing under flight conditions.

Stop at any one and you stop too early. "The DB connection timed out" is where investigation begins, not ends.

### Redundancy without a supervisor is decorative

Falcon 9 has nine Merlin engines on the first stage, "each engine housed within its own metal bay to isolate it from neighboring engines." That layout alone is a pile of redundant boxes.

The reliability comes from the supervisor: "system-level vehicle management software controls the shutdown of engines in response to off-nominal engine indications; this has been demonstrated in flight, with 100% primary mission success."

Nine engines without a supervisor is hardware. Nine engines plus a control plane that actively reroutes around failure is a system. If your N+1 cluster's failover plan is "page a human," the supervisor is human-in-the-loop at wall-clock latency, and the window has closed by the time the human is awake.

### A subsystem you delete cannot fail

The Falcon 9 first-stage thrust vector control system "pulls from the high-pressure rocket-grade kerosene system, rather than using a separate hydraulic fluid and pressurization system. Using fuel as the hydraulic fluid eliminates potential failures associated with a separate hydraulic system and with the depletion of hydraulic fluid." The Merlin turbopump uses "a single shaft for the liquid oxygen pump, the fuel pump, and the turbine."

The disciplined move is not to harden the second hydraulic system. It is to delete it. A node that does not exist has zero failures, zero leaks, zero monitoring overhead, zero consumables to track.

### Every interface is a failure waiting

"The two stage Falcon 9 architecture was selected to minimize the number of stage separation events, eliminating potential failure modes associated with third and fourth stage separations." The Merlin Vacuum even "uses a fixed, non-deploying expansion nozzle, eliminating potential failure modes in nozzle extension."

Every interface is a contract that can drift, a transition that can fail, a handoff that can lose context. Counting interfaces and deleting the ones you do not need is a primary design move, not a side activity. A microservice boundary that exists for org-chart reasons costs you on every ship.

## How to apply

1. **Draw the graph.** Sketch components and the wires between them. If you cannot sketch it in 90 seconds, you do not yet understand it. The graph is the artifact, not the code. The IRT's first move on CRS-7 was to build an independent fault tree and a millisecond-level timeline - graph first, conclusions later.

2. **Name the flows.** On every wire, write what travels: data shape, force, control signal, propellant, money, error rate. A wire with no labeled flow is a wire you have not actually thought about. The Falcon 9 telemetry stream carries 115 named indications during a failure window; the IRT could not resolve 9 of them because the flows had been switched to non-deterministic packets and the data was lost to buffering. Unnamed flows hide the failure.

3. **Count interfaces.** Each one is a contract. Ask for each: who owns it, where is it written down, what version is it, how would you know if a counterparty changed. Then ask the harder question - can it be deleted by folding the work into an adjacent node?

4. **Trace the blast radius.** For every component, ask: if this fails right now, what fails next? Walk the chain to its terminus. The CRS-7 IRT walked four levels - proximate, intermediate, initiating, root - and explicitly noted the initiating cause was not just "material defect" but could equally be mis-installation or collateral damage. Stop at the first plausible cause and you ship the next failure.

5. **Find the apex.** The apex is where many paths converge - the rod end of your system. The single auth service. The shared database. The one queue everything writes through. The apex needs more redundancy, more testing, and more observability than anywhere else, because it has the largest blast radius. On Falcon 9, the apex was a small industrial bolt holding a pressure vessel inside a cryogenic tank. On your system, find the equivalent.

6. **Publish what you found.** Whoever maintains the system should be able to name the three highest-blast-radius components without checking. If they cannot, the apex is invisible, which means it is unprotected.

## Do

- Delete components when one can carry two loads. Fuel as hydraulic fluid. Single shaft for LOX pump, fuel pump, and turbine. A node that does not exist has zero failures.
- Count interfaces; treat every one as a failure waiting. Falcon 9 has two stages because every separation event is a discrete, hard-to-test transition.
- Pair every redundancy with a supervisor. Nine engines plus vehicle-management software, not just nine engines.
- Trace cascades to all four levels - proximate, intermediate, initiating, root - as the CRS-7 IRT did.
- Instrument the wires, not just the boxes. A green "service is up" dashboard says nothing about the messages flowing through. The IRT lost 9 of 115 telemetry indications to network buffering and could not fully close the Stage 2 fault tree.
- Publish the apex. The three components with the biggest blast radius should be common knowledge in the team that owns them.

## Do not

- Do not look only at the local diff. The diff is not the unit of review; the affected subgraph is. A senior engineer who only reads the rod-end drawing approves CRS-7.
- Do not add a subsystem "just in case." Every new subsystem brings its own pressurization, monitoring, consumables, and blast radius.
- Do not stop at the proximate cause. Stopping at "the LOX dome ruptured" gives you no design change, and the failure recurs.
- Do not accept "small change cannot matter." The CRS-7 rod end was small. The Maraia Flight #1 eyebolt was small enough that "an eyebolt failure on the capsule occurred immediately after launch, causing the two-point attach to the upper payload to become a single point attach." Small parts at high-leverage joints destroy missions.
- Do not treat one team's pass as a systemic pass. Two services can each pass tests and the integration can still be wrong. The CRS-7 industrial-grade rod end "passed" at the part level - system-level qualification under cryogenic flight loads is what was missing.
- Do not install redundancy without a supervisor. N+1 hardware whose failover plan is "page a human" is not redundant in the time window where the decision still matters.

## Connects to

- **first-principles-thinking** - before you draw the graph, know what the system is for and which physics it is fighting. The graph is shaped by the goal; the goal is set by physics.
- **architecture** - once you have found the apex, anchor redundancy by failure mode at that node, not uniformly across the system.
- **feedback-loops** - the graph tells you which wires to instrument; without instrumentation on the wires, the apex is invisible until it breaks.
- **testing-sequencing** - the component with the largest blast radius is the one that earns the most expensive test rung.

---

The biggest reliability gains in any system come from rebuilding the apex, not polishing the leaves. When the system is too tangled to draw, surface that - the tangle is the bug, not your understanding. **Be the engineer who deletes the subsystem nobody dared touch, who finds the rod-end joint everyone assumed was fine, who refuses to stop tracing at the proximate cause.** Draw the graph today. Find the apex. Rebuild it before it breaks you.

## Sub-skills

| Sub-skill | When to load |
|---|---|
| [system-graph-mapping](subskills/system-graph-mapping.md) | The system needs to be enumerated before it can be analyzed |
| [blast-radius-analysis](subskills/blast-radius-analysis.md) | A node failure mode needs its downstream impact bounded |
| [cascade-tracing](subskills/cascade-tracing.md) | An incident propagated; you need to walk the chain forward |
| [apex-identification](subskills/apex-identification.md) | Identifying the single point at the top of a critical path |
| [interface-contract](subskills/interface-contract.md) | An interface boundary needs an explicit, machine-checkable contract |

## Related spine skills

- [first-principles-thinking](../../01-foundation/first-principles-thinking/SKILL.md) - first-principles names the goal; system-engineering shapes the graph
- [architecture](../../02-design/architecture/SKILL.md) - system-engineering surfaces the axes; architecture tiers fault tolerance against them
- [feedback-loops](../../02-design/feedback-loops/SKILL.md) - every node and edge in the graph needs an instrumented loop

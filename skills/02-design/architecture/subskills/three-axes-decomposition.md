---
name: three-axes-decomposition
description: Identify the 2–3 architectural dimensions that account for the bulk of historical failures, and align the system 1:1 with them. Load this when picking primary architecture axes for a new system, deciding which redundancy investments are primary versus secondary, justifying a sparse architecture against pressure to add a fourth or fifth axis, or auditing whether your axes match your incident corpus. The reflex this trains: a few causes dominate; the architecture takes the top few; the rest live on a backlog. Falcon 9's three primary axes - engines, avionics, staging - map 1:1 with the 91%-from-3-causes cluster.
---

# Three-Axes Decomposition

The Falcon User's Guide names the method directly: "A study by The Aerospace Corporation found that 91% of known launch vehicle failures in the previous two decades can be attributed to three causes: engine, avionics, and stage separation failures. With this in mind, SpaceX incorporated key engine, avionics, and staging reliability features for high reliability at the architectural level of Falcon launch vehicles" (Falcon User's Guide §1.5, p.4).

Three causes. Three axes. The mapping is intentional and load-bearing.

- **Engines** → 9 Merlins per stage, each in its own metal bay isolated from neighbors, with vehicle-management software that shuts down off-nominal engines and re-plans the trajectory. "By employing multiple first stage engines, SpaceX offers the world's first evolved expendable launch vehicle (EELV)-class system with engine-out capability through much of first-stage flight" (Falcon User's Guide §1.5.1, p.4). Demonstrated in flight with 100% primary mission success.
- **Avionics** → "Falcon launch vehicle avionics, and guidance, navigation, and control systems use a fault-tolerant architecture that provides full vehicle single-fault tolerance and uses modern computing and networking technology to improve performance and reliability. Fault tolerance is achieved either by isolating compartments within avionics boxes or by using triplicated units of specific components" (Falcon User's Guide §1.5.2, p.5).
- **Staging** → Two stages only. "The two stage Falcon 9 architecture was selected to minimize the number of stage separation events, eliminating potential failure modes associated with third and fourth stage separations, as well as potential engine deployment and ignition failure modes in the third and fourth stages" (Falcon User's Guide §1.5.3, p.5). The Merlin Vacuum reinforces this with a fixed, non-deploying expansion nozzle, eliminating the nozzle-deployment failure mode entirely (Falcon User's Guide §1.5.1, p.4).

Three axes, three causes. The architecture is sparse on purpose. A fourth or fifth primary axis would be a sign the team did not rank.

## What this is

Three-axes decomposition is the step that follows [failure-corpus-mapping](failure-corpus-mapping.md). Once you have a ranked list of failure clusters, you take the top 2–3 and turn each into an architectural dimension. Each axis gets:

- a name (engines, avionics, staging - terse, owns the failure cluster),
- a primary architectural mechanism (engine-out + isolation; triplicated avionics; minimize separation events),
- a measurable property that proves the axis is real in flight (engine-out demonstrated; single-fault tolerance; zero third-stage separations because there is no third stage).

Anything that does not fit one of the 2–3 axes is secondary - handled with normal engineering discipline, not with primary architectural attention.

## When to use this

- Starting a new architecture, after [failure-corpus-mapping](failure-corpus-mapping.md) has produced a ranked corpus
- Reviewing an existing architecture and asking "do our primary axes match the top failure clusters?"
- Resisting feature-driven pressure to add a fourth or fifth primary axis
- Building a derivative product (Falcon Heavy from three Falcon 9 cores) - the axes carry forward, the dimensions do not multiply
- Justifying a sparse architecture to a reviewer who says "shouldn't we also do X?"

## When NOT to use this

- Before the corpus exists - without a ranked list, you are picking axes from feature requests, which is exactly what this skill is meant to prevent
- For purely tactical work - refactors, performance tuning, single-feature projects
- For domains where failures are genuinely uniform across components (rare in practice)

## How to apply

1. **Take the top 2–3 clusters from the failure corpus.** Not 10. Not "everything that has gone wrong." The top 2–3, ranked by frequency × consequence. Aerospace Corp's clustering produced engines, avionics, staging. Your domain's top clusters will look different in name, identical in shape: a few causes dominate.

2. **Name each cluster as an axis with one terse word.** "Engines." "Avionics." "Staging." Not "engine reliability and propulsion subsystem hardening initiative." The axis name is going to appear at every architecture review for the life of the system; pick a short one. It also helps the team say "is this an engines axis decision or a staging axis decision?" out loud.

3. **For each axis, name the primary mechanism.** Engines → 9 Merlins + isolation bays + engine-out supervisor. Avionics → triplicated units or compartment isolation, full single-fault tolerance. Staging → two stages, no deploying nozzles. One mechanism per axis, stated in one sentence.

4. **Verify the mechanism is real in flight, not on paper.** Engine-out is real because "system-level vehicle management software controls the shutdown of engines in response to off-nominal engine indications; this has been demonstrated in flight, with 100% primary mission success" (Falcon User's Guide §1.5.1, p.4). The supervisor exists, runs in the time window where the decision matters, and has been exercised. A redundancy axis without a supervisor that has been demonstrated under fault is a paper axis.

5. **Compose derivatives by reusing the axes, not by adding new ones.** Falcon Heavy is built from three Falcon 9 first stages plus the Falcon 9 second stage and fairing: "Falcon Heavy's first stage comprises three Falcon 9 first stages... Falcon Heavy utilizes the same second stage and same payload fairing as flown on Falcon 9, fully benefiting from the flight heritage provided by Falcon 9 flights. This commonality has also minimized infrastructure unique to the vehicle" (Falcon User's Guide §2.2, p.6). Heavy adds two side-core separation events (Falcon User's Guide §1.5.3, p.5) - a delta on the staging axis, not a fourth axis.

6. **Park the long tail explicitly.** Failures in the long tail get normal engineering discipline - code review, testing, bug tracking - but they do not earn a primary axis. The decision to park them is conscious. "Park" in writing means a one-line note in the architecture doc: "Cluster X is below the threshold; we accept the residual risk and revisit when frequency or consequence changes." Without that note, the long tail accumulates pressure until someone adds it as a fourth axis under deadline pressure, and the top 2–3 lose budget.

7. **Re-rank when the corpus grows.** CRS-7 added the rod-end / industrial-grade-in-flight-critical cluster to the launch corpus. That cluster is small in count (one event) but high in consequence (vehicle loss). It does not become a fourth primary axis on its own - it becomes a [forbidden-list](forbidden-list.md) entry and a tightening of the existing engines / staging / avionics axes (load-path joints, factor-of-safety enforcement, screening). The axes are sticky; the entries within them grow.

## Worked example

A web platform team starts a from-scratch architecture for a new region. They run [failure-corpus-mapping](failure-corpus-mapping.md) on the last 18 months of their existing region's incidents and produce a ranked cluster list:

1. **Database write contention** (12 incidents, 6 customer-visible) - the top cluster.
2. **Failover transitions** (8 incidents, 4 customer-visible) - the second cluster.
3. **Configuration push storms** (5 incidents, 3 customer-visible) - the third cluster.
4. **Long tail** - 7 other clusters with 1–2 incidents each.

They take the top three as axes:

- **Writes**: explicit per-shard concurrency control + idempotency + reconciliation; no shared write paths across services; supervisor that detects hotspots and reroutes.
- **Failover**: pre-warmed standby with quorum-based promotion; supervisor that promotes in <5s; explicit split-brain detection.
- **Config**: gradual rollout primitive (1% → 10% → 50% → 100%) baked in; no instant 100% pushes; supervisor that auto-aborts if error rate breaches.

Each axis gets a one-paragraph mechanism in the architecture doc, plus a one-line "demonstrated by" note. The other seven clusters are noted in the same doc as "secondary, handled by normal engineering practice; revisit if any cluster moves into the top three on the next quarterly review."

A skeptical reviewer asks: "Shouldn't observability also be a primary axis?" The team checks the corpus: observability gaps were a contributing factor to many incidents but not the root cause of any. Observability gets investment - it is a force multiplier on the three axes - but it does not get its own primary axis, because nothing in the corpus says it should. The reviewer is satisfied because the answer comes from the corpus, not from taste.

## Anti-pattern

The "balanced architecture" with five primary axes: scalability, reliability, security, observability, and developer-experience, each given equal weight. Looks rigorous on a slide. The redundancy budget gets sprayed across all five. The actual failure clusters concentrate on two of them. After 18 months, the top two are still single-thread because the budget went uniformly. The other three are over-built relative to their failure history.

CRS-7 is a related anti-pattern at a different scale: the right axes were chosen (engines, avionics, staging) and well-executed. But a fourth would-be axis - load-path joints with industrial-grade hardware - was not on the corpus at the time, so it had no architectural attention. The rod-end class of failure became the corpus entry that retroactively created a sub-axis on the existing staging / structures dimension. The fix was not "add a fifth axis;" it was tighter discipline on the existing ones (factor-of-safety enforcement, screening, load test under flight conditions - see CRS-7 IRT TR-1, p.8). Three axes stayed three axes; the entries within them grew.

## Related skills

- Parent: [architecture](../SKILL.md)
- Pairs with: [failure-corpus-mapping](failure-corpus-mapping.md) - corpus ranks the causes; this skill turns the top 2–3 into axes
- Pairs with: [fault-tolerance-tiering](fault-tolerance-tiering.md) - once axes exist, tier the redundancy on each
- Compose with: [forbidden-list](forbidden-list.md) - long-tail incidents become forbidden-list entries, not new axes
- Compose with: standard-menu (route via your parent spine to infrastructure) - derivatives reuse the axes rather than adding new ones (Heavy = 3× F9 cores)
- Tool: `tools/clis/axes-mapper.js` - assists with mapping ranked clusters to axis names

## Source

- Primary: Falcon User's Guide §1.5, p.4 (Aerospace Corporation 2001 study: "91% of known launch vehicle failures in the previous two decades can be attributed to three causes: engine, avionics, and stage separation failures")
- Primary: Falcon User's Guide §1.5.1, p.4 (engine-out, isolation bays, vehicle-management supervisor demonstrated in flight)
- Primary: Falcon User's Guide §1.5.2, p.5 (avionics: full vehicle single-fault tolerance, triplicated units or compartment isolation)
- Primary: Falcon User's Guide §1.5.3, p.5 (two-stage architecture rationale: minimize separation events; Falcon Heavy reuses Falcon 9 stage architecture)
- Primary: Falcon User's Guide §1.3, p.1 / §2.2, p.6 (Falcon Heavy commonality with Falcon 9 - three first stages, same second stage, same fairing)
- Primary: CRS-7 IRT TF-1, p.8 and TR-1, p.8 (rod-end class as a tightening of existing axes, not a new fourth axis)
- Secondary: principles-to-skills-map.md Principle 1 (engines / avionics / staging mapping); Principle 3 (Falcon Heavy commonality)

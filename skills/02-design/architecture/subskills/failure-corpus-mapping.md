---
name: failure-corpus-mapping
description: Pick design axes from the historical failure record, not the feature list. Load this when starting a new architecture, doing a design review of an existing one, deciding where to invest redundancy, ranking risks for a platform, writing a post-incident architectural change, or debating "should we add a feature axis?" The reflex this trains: before you draw boxes, find - or build - the corpus of past incidents in your domain. Cluster the corpus by root cause. Take the top 2–3 causes. Those are your primary architecture axes. Anything else is a secondary axis at most.
---

# Failure-Corpus Mapping

Aerospace Corporation studied two decades of orbital launch failures. The Falcon User's Guide cites the headline number in §1.5: "91% of known launch vehicle failures in the previous two decades can be attributed to three causes: engine, avionics, and stage separation failures. With this in mind, SpaceX incorporated key engine, avionics, and staging reliability features for high reliability at the architectural level of Falcon launch vehicles" (Falcon User's Guide §1.5, p.4).

Three causes. Two decades. Almost every launch loss. Three causes accounted for 91% of historical losses, and three architecture axes were aligned to those causes. That is not a coincidence - it is the method this skill teaches.

## What this is

A corpus is the historical record of incidents in your problem space - outages, recalls, regressions, post-mortems, CVE classes, customer-visible defects. Corpus mapping is the discipline of (a) building or finding that record, (b) clustering it by root cause, (c) ranking the clusters, and (d) using the top 2–3 to pick the primary architecture axes you will spend redundancy on.

The output is a ranked list. The top of the list earns architectural attention. The long tail does not.

## When to use this

- Starting a new system architecture from a blank page
- Reviewing an existing architecture and deciding whether the redundancy budget is in the right places
- Allocating engineering effort across N possible "improvements"
- Justifying or challenging a redundancy axis to a skeptical reviewer
- Writing a post-incident architectural ADR - adding a new entry to the corpus and re-ranking
- Onboarding a new architect onto a mature system: the corpus is the orientation document

## When NOT to use this

- A pure greenfield problem with no analogs anywhere - there is no corpus, and inventing one from speculation defeats the method
- Tactical bug fixes that do not require an architectural change
- Performance optimization where the bottleneck is measured, not historical
- Picking a UI library, framework, or other taste-driven local choice

## How to apply

1. **Build the corpus, on paper.** Pull the last 2–3 years of incidents from your archive - outages, post-mortems, regressions, customer escalations, CVEs, recall notices. If you do not have 2–3 years, add public industry incidents in the same domain. Aerospace Corp's study covered two decades; you do not need that much, but you need enough to outvote any single bad week.

2. **Cluster by root cause, not by symptom.** Two outages caused by the same database deadlock pattern are one cluster, even if one was a checkout flow and the other was a search flow. The cluster is the cause, not the place it manifested. CRS-7 entered the launch corpus as a "rod-end class" failure: industrial-grade hardware in a flight-critical path. The class - not the rod end - is the entry.

3. **Rank by frequency × consequence.** A near-miss that almost lost the vehicle ranks above a stable-state degradation that nobody noticed. A repeat cluster ranks above a one-off. Aerospace Corp's clustering produced engines, avionics, staging - three causes that together accounted for 91%. The exact percentage matters less than the shape: a few causes dominate.

4. **Take the top 2–3 clusters.** Not the top 10. Not "everything that ever happened." The top 2–3 are the primary architectural axes. Falcon 9: 9 engines with engine-out, three-string avionics, two-stage architecture. Three causes, three axes (Falcon User's Guide §1.5.1, §1.5.2, §1.5.3).

5. **For each cluster, name the architectural countermeasure.** Engines → 9-Merlin redundancy with engine-out supervisor and isolation bays (Falcon User's Guide §1.5.1, p.4). Avionics → triplicated units or compartment isolation (Falcon User's Guide §1.5.2, p.5). Staging → minimize separation events; two stages, no third or fourth (Falcon User's Guide §1.5.3, p.5; §2.1, p.6). One countermeasure per axis.

6. **For each new incident, update the corpus and re-rank.** CRS-7 added a new cluster: industrial-grade hardware in a flight-critical cryogenic load path, "without adequate screening or testing... without regard to the manufacturer's recommendations for a 4:1 factor of safety" (CRS-7 IRT p.7; TF-1 p.8). That cluster moves the rod-end class onto the [forbidden-list](forbidden-list.md) and onto the heritage / lessons-learned corpus the next program iteration starts from.

7. **Carry heritage forward across iterations.** Falcon User's Guide §1.3 frames reuse and inspection as the source of design improvements: "By re-flying boosters and fairings, SpaceX increases reliability and improves its designs and procedures by servicing and inspecting hardware as well as incorporating lessons that can only be learned from flight" (§1.3, p.3). And §1.5.3: "Stage recoverability also provides a unique opportunity to examine recovered hardware and assess design and material selection to continually improve Falcon 9 and Falcon Heavy" (§1.5.3, p.5). The corpus grows; the architecture inherits.

## Worked example

A storage platform team is asked to "improve reliability" and given a quarter to spend. They list ten ideas: cross-region replication, faster failover, better backups, encryption-at-rest upgrades, a new admin UI, a more redundant load balancer, faster restore, write-ahead log compression, query plan caching, and a rewrite of the rate limiter.

Wrong move: pick three from the list by gut feel and ship.

Corpus-mapped move:

1. Pull the last 24 months of S1/S2 incidents - 38 in total.
2. Cluster by root cause: 17 are silent data corruption from a known-bad disk firmware family, 9 are control-plane deadlocks, 6 are network partitions during failover, the rest are scattered.
3. Rank: corruption (17, several near-data-loss) > deadlocks (9, customer-visible) > partitions (6, recoverable). Top three.
4. Architectural countermeasures: corruption → end-to-end checksums + scrub jobs + proactive firmware quarantine; deadlocks → control-plane redesign with explicit lock ordering; partitions → quorum changes + faster split-brain detection.
5. The original ten-item list? Two items map onto the top three (faster failover ≈ partition response). The other eight are not on the corpus. They go to a backlog labelled "secondary," not "rejected" - but they do not get this quarter's redundancy budget.

The team ships three architectural changes mapped 1:1 to the top three corpus clusters. The encryption upgrade and the admin UI get done eventually. The rate-limiter rewrite never happens because nobody can name an incident it would have prevented.

## Anti-pattern

The "feature-complete redundancy" architecture: every box on the diagram has its own failover, every service has a circuit breaker, every queue is doubled. It looks rigorous. It is uniform. It is also a sign that nobody ranked. The redundancy budget got sprayed evenly because evaluating "where does history actually stress us?" never happened. Three pages later in the post-mortem, the failure mode was not in any of those redundant places - it was in the one place that did not get an axis because nobody read the corpus.

CRS-7's rod end is the same anti-pattern at a smaller scale. The vehicle had three-string avionics and engine-out capability. Both were earned by reading Aerospace Corp's corpus. The rod-end class of failure was not on that corpus - orbital launch failures from 1981–2001 did not feature industrial-grade castings in cryogenic load paths breaking under ascent loads. So the architecture had no axis there. CRS-7 itself became the corpus entry that retroactively created the axis. The 4:1 derating, the screening requirement, the load testing under flight conditions - all consequences of the corpus growing by one entry.

## Related skills

- Parent: [architecture](../SKILL.md)
- Pairs with: [three-axes-decomposition](three-axes-decomposition.md) - corpus mapping ranks the causes; three-axes-decomposition turns the top 3 into design dimensions
- Pairs with: [fault-tolerance-tiering](fault-tolerance-tiering.md) - corpus picks the axes; tiering allocates redundancy along them
- Compose with: [forbidden-list](forbidden-list.md) - every new corpus entry produces a candidate forbidden-list rule
- Compose with: recovery-as-instrumentation (route via your parent spine to iterate-fast) - recovered hardware and post-mortems are how the corpus grows

## Source

- Primary: Falcon User's Guide §1.5, p.4 (Aerospace Corporation 2001 study citation: "91% of known launch vehicle failures in the previous two decades can be attributed to three causes: engine, avionics, and stage separation failures")
- Primary: Falcon User's Guide §1.5.1, p.4 (engine-out and isolation bays); §1.5.2, p.5 (triplicated avionics); §1.5.3, p.5 (two-stage rationale)
- Primary: Falcon User's Guide §1.3, p.3 and §1.5.3, p.5 (heritage / inspection / lessons-learned per iteration)
- Primary: CRS-7 IRT p.7 and TF-1, p.8 (rod-end class as a new corpus entry - "without adequate screening or testing... without regard to the manufacturer's recommendations for a 4:1 factor of safety")
- Secondary: principles-to-skills-map.md, Principle 1 (anchor architecture to historical failure modes, not features)

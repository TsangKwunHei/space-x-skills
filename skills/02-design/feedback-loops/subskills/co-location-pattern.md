---
name: co-location-pattern
description: Collapse the physical and organizational distance between teams whose feedback loop you need to tighten - design with production, design with QA, operations with engineering. Use this skill whenever the user describes ticket round-trips between teams, debates whether to embed engineers in operations, complains that production defects take weeks to reach designers, or argues for keeping research and production in separate buildings. The two-week ticket is a latency problem, not a process problem.
---

# Co-location Pattern

The Falcon User's Guide §1.2 names the move directly: "vehicle design teams are co-located with production and quality assurance staff to tighten the critical feedback loop. The result is highly reliable and producible launch vehicles with quality embedded throughout the process" (Falcon User's Guide §1.2, p.1).

That sentence covers a deliberate facility decision. The Hawthorne plant houses Dragon, Falcon 9, Falcon Heavy, and Merlin under one roof (Falcon User's Guide §8.3, p.68). Multiple Falcon 9 and Falcon Heavy stage manufacturing stations, fairing production and integration stations, and nine stations for final assembly of Merlin engines all sit in the same building as the engineering teams designing them. A production defect is a 30-meter walk away from the designer who can fix it. The loop closes in minutes, not in the two weeks a ticket round-trip would impose.

## What this is

A pattern for collapsing the latency between decision and evidence by collapsing the distance - physical, organizational, or both - between the people who decide and the people who discover. The cost is real estate and headcount adjacency. The benefit is that defects, anomalies, and design assumptions get tested by the team that can act, in a window short enough that context is still warm.

The skill is not "everyone in one room." It is naming the specific feedback loop that matters and choosing co-location for that loop, because the alternative - communication by ticket - has a latency floor that no process improvement can cross.

## When to use this

- A specific defect type takes longer than your iteration cycle to reach the team that can fix it (production-to-design, ops-to-engineering, customer-to-PM).
- Two teams disagree on facts about the same artifact and the disagreement keeps recurring. Co-location forces both teams to look at the same hardware, screen, or data.
- An organization is contemplating a "research" vs "production" split. The split adds a wall that drift will exploit.
- A new process is proposed to "improve communication" between teams that already have a tickets queue. More process makes the ticket round-trip more formal, not faster.

## When NOT to use this

- Loops that genuinely run at minute-or-better latency through async tooling. Co-location costs real estate; do not pay for it where the loop is already tight.
- Distributed-by-design teams where the work is asynchronous and the artifacts are machine-consumable (well-versioned APIs, signed contracts). Co-location is for tacit feedback; explicit feedback can travel by wire.
- Functions that benefit from independence (audit, security review, compliance). Some loops should be slower on purpose.

## How to apply

1. **Name the loop you are tightening.** "Design discovers production defect" or "operations escalates anomaly to engineering" or "QA flags workmanship issue to integration." A specific loop, not "communication."

2. **Measure the current latency.** How long does a defect take, today, to reach the person who can change the design? If "I don't know," start there. Hawthorne is not "everyone in a building" - it is a specific bet that minutes-to-hours beats weeks for the design-production loop.

3. **Pick the smallest co-location that closes the loop.** Sometimes it is one engineer embedded with the ops team. Sometimes it is a shared standup. Sometimes it is the whole factory floor under one roof. The right size depends on the volume of the loop traffic and the tacit nature of the signal.

4. **Make the path actually used.** Co-location only works if people use it. A designer whose desk is 30 meters from the production floor but who never walks over there is paying the rent on co-location for nothing. Either ritualize the walk (daily floor walk, weekly defect review on the bench) or admit the co-location is symbolic.

5. **Watch for the wall reappearing.** Process growth, badge restrictions, separate cafeterias, separate org-chart branches - each one adds latency back. Hawthorne keeps the loop tight by keeping the floor open. Treat any new wall as a regression and require a justification.

6. **Pair with one signed point of contact.** Falcon User's Guide §9.2 (p.70) names the customer-side equivalent: "SpaceX provides each Falcon launch services customer with a single technical point of contact from contract award through launch." A single mission manager is co-location's organizational twin - one named owner across all silos, so the customer's signal does not bounce between handoffs.

## Worked example

A platform team is debating two layouts for their next quarter. Option A: keep the SRE team in their current building, two floors above the application engineers, communicating through a shared on-call rotation and a Jira queue. Option B: relocate the SRE team to the application engineer floor, with a shared incident table and a daily 10-minute joint stand.

Latency measurement on the current loop: median time from production incident detection to a code change merging is 6.2 days. Reason: incident write-up → triage → backlog grooming → sprint planning → assignment → code → review.

Under Option B, the same loop closes in hours for the routine cases, because the SRE walks over with the Sentry trace and the application engineer fixes the bug at lunch. The complex cases still take days, but the routine traffic stops competing with them for sprint capacity. The application engineers also learn what their code looks like in production, which is the tacit signal that no amount of dashboards conveys.

The team picks Option B, ritualizes the joint stand and a weekly "production walk" where SREs demo recent incidents at the application team's desks, and re-measures after one quarter. Median incident-to-merge drops from 6.2 days to 1.8 days. The remaining 1.8 days is dominated by review, not by handoff - the loop now bottlenecks on the right axis.

This is Hawthorne in software form: the design team is co-located with the production team, and the loop tightens because the distance to the evidence shrinks.

## Anti-pattern

A company splits "research" from "engineering" by putting them in separate buildings, on separate budgets, with separate VPs. The research team produces prototypes that engineering must "productionize." Within two years, the productionization queue is six months deep. Research blames engineering for being slow; engineering blames research for shipping toys. Both are correct - and both are downstream of the wall.

The fix is not a "tiger team" or a "liaison engineer." Those are processes that pretend the wall does not exist. The fix is to re-merge the teams, or at minimum embed engineers in research and researchers in engineering, so the design assumptions get tested against production constraints in days rather than quarters. Hawthorne refuses the wall in the first place; the alternative is to spend years rebuilding what the wall let drift.

A second flavor: an executive sees Hawthorne and concludes "we just need an open floor plan." Open plan without the loop - without the named feedback path between specific roles - is just noise. Co-location is a mechanism for a named loop, not a furniture choice.

## Related skills

- Parent: [feedback-loops](../SKILL.md)
- Pairs with: [loop-latency-measurement](loop-latency-measurement.md) - co-location is a cycle-time fix; measure before and after
- Pairs with: lean-org-pattern (route via your parent spine to infrastructure) - flat org and physical co-location reinforce each other
- Compose with: system-engineering (route via the feedback-loops spine, then to system-engineering) - the system graph names the nodes; co-location decides which adjacencies are physical

## Source

- Primary: Falcon User's Guide §1.2, p.1 ("vehicle design teams are co-located with production and quality assurance staff to tighten the critical feedback loop"); Falcon User's Guide §8.3, p.68 (Hawthorne houses Dragon, Falcon 9, Falcon Heavy, Merlin under one roof; multiple stage manufacturing stations, fairing stations, nine Merlin assembly stations); Falcon User's Guide §9.2, p.70 (single technical point of contact from contract award through launch)

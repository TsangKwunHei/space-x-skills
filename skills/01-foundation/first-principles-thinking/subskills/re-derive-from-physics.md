---
name: re-derive-from-physics
description: Replace a vendor estimate, catalog spec, or inherited number with a direct derivation from physics or basic accounting - propellant chemistry, mass × velocity, workforce × loaded labor, energy budget, material cost - so that the answer rests on what reality requires rather than on what someone else's frame charged. Use this skill when a vendor estimate is the only reference point for a decision, when an inherited number is being treated as fixed, when a system is being composed by catalog rather than by physics, or when a question of the form "how much?" / "how many?" / "how long?" needs an independent answer. Especially load this skill before any architecture, costing, or scoping decision where a vendor or precedent number could be silently controlling the answer.
---

# Re-Derive From Physics

NAFCOM Page 3, in SpaceX's own words to NASA: "Total vehicle DDT&E costs are primarily a product of the total workforce needed to accomplish the effort." Page 9 of the same report gives the floor that follows from that derivation: $443.4M Firm Fixed Price, decomposed into Stage One $298.0M (split as $188.7M DDT&E + $109.3M for two test flight units), Stage Two $112.6M ($89.0M + $23.6M), and Vehicle Integration $32.8M - Fee, Program Support, and Contingency all zeroed (NAFCOM p.9). The traditional NASA-environment estimate for the same vehicle was $3.977B (NAFCOM p.5). The 9× spread was not physics. Physics produced $443M. The spread was acquisition strategy, requirements stability, management layers, and the subcontractor multiplier - every one negotiable, none of them physics. This skill is the discipline of computing the physics number first.

## What this is

Re-derive-from-physics is the practice of producing an independent answer to a quantitative question - cost, mass, time, throughput, sample size, propellant load, stage count - by composing first-order physical or accounting terms, before consulting any vendor estimate, catalog, or precedent.

It is not estimation. Estimation tries to predict what a vendor *will charge* or what a project *will take*. Derivation computes what physics, energy, mass, money, or time *actually require*. The difference is the overhead, and the overhead is the part you can attack.

The discipline is to compose, not to look up. Falcon 9 has two stages because two is what physics permits with that engine and that payload to LEO; the user guide cites "the two stage Falcon 9 architecture was selected to minimize the number of stage separation events, eliminating potential failure modes associated with third and fourth stage separations" (Falcon User's Guide §1.5.3, p.5). The architecture is a derivation, not a catalog selection.

## When to use this

- A vendor's quoted price is the only number on the table for a make-vs-buy decision
- An inherited estimate is being accepted as the budget without a floor calculation
- A design is being composed by catalog ("we will use Vendor X's Y because they offer it") rather than by physics ("this subsystem must do Z, what is the minimum implementation that does Z?")
- A question of the form "how many stages?" / "how many engines?" / "how big a tank?" / "how much margin?" needs an independent answer
- Two estimates of the same scope differ by more than 2× and the gap is unaccounted-for
- A vendor part is being used outside its rated regime (re-derive whether the part still meets margin under the real loads)
- A schedule is being defended by precedent ("programs of this size always take this long")

## When NOT to use this

- The vendor estimate has already been audited against a written floor and the gap is named - the work is done
- The quantity is dominated by a single market input (raw material at spot price) and the derivation reduces to that input
- The decision is reversible at low cost and the cost of derivation exceeds the cost of being wrong once
- A formal derivation already exists in a referenced source - cite it instead of re-doing it

## How to apply

1. **Identify the quantitative question.** Cost? Mass? Time? Throughput? Stage count? Sample size? Margin? State the question in physical or accounting units, not in dollars-of-vendor-quote.
2. **Name the first-order terms physics or accounting requires.** For cost: workforce × loaded labor + material + infrastructure + outsourcing multiplier + margin (NAFCOM p.3, factors #1, #2, #3 in priority order). For stage count: minimum number of separation events that delivers the required delta-V with the available engines (Falcon User's Guide §1.5.3, p.5). For margin: factor of safety from the relevant code or manufacturer derating, applied to the worst-case load (CRS-7 IRT p.7 cites the manufacturer's 4:1 derating that should have been applied).
3. **Compose the answer from the terms.** Do the arithmetic. Show the work. NAFCOM p.9 shows it for Falcon 9 FFP: $188.7M + $109.3M + $89.0M + $23.6M + $22.2M + $10.6M = $443.4M total. Each term has a physical or accounting basis; the sum is the floor.
4. **Compare to the vendor / inherited number.** Subtract the derivation from the inherited number. The remainder is overhead. Decompose the overhead against named drivers (NAFCOM's six drivers in priority order, p.6, are the canonical example - but other domains have their own).
5. **Re-derive when an input changes.** A previously valid derivation is not valid for a new input. New flight regime, new mass, new workforce structure, new vendor base - re-derive. The CRS-7 rod end was used "without proper modeling or adequate load testing of the part under predicted flight conditions" (CRS-7 IRT p.7); the load conditions had changed from the part's industrial-grade application, and the derivation that was valid in the source regime did not survive the new one.
6. **Refuse to optimize inside the wrong frame.** If the inherited frame's overhead is the dominant term and it cannot be moved, the derivation is your evidence that the goal is unreachable inside that frame. The right response is to challenge the frame, not to extract an extra few percent inside it. NAFCOM's traditional-environment $3.977B was unreachable from inside the traditional frame; only by changing the frame did the number fall to $443M (NAFCOM p.5).
7. **Compose proven primitives instead of designing new ones when the regime is the same.** Falcon Heavy's first stage is "three Falcon 9 first stages... the same second stage and same payload fairing as flown on Falcon 9, fully benefiting from the flight heritage provided by Falcon 9 flights. This commonality has also minimized infrastructure unique to the vehicle" (Falcon User's Guide §2.2, p.6). The composition is itself a derivation: physics did not require a new upper stage, so a new upper stage was not built.

## Worked example

NAFCOM Falcon 9 cost derivation, FFP path (NAFCOM p.3, p.9):

**The question.** What does it cost to develop Falcon 9?

**First-order terms (NAFCOM p.3, ranked by SpaceX-attributed cost-efficiency factor):**

1. Workforce - "Total vehicle DDT&E costs are primarily a product of the total workforce needed to accomplish the effort (SpaceX workforce numbers substantiate their development cost claims)."
2. Organizational complexity - "every dollar sent out of the company actually costs between $3 and $5 based on subcontractor overhead and profit." (Used as a multiplier on outsourced spend.)
3. Infrastructure - "Total infrastructure required for the DDT&E effort and infrastructure utilization percentage."

**Composition (NAFCOM p.9, Updated Firm Fixed Price decomposition):**

- Stage One: $188.7M DDT&E + $109.3M two test flight units = $298.0M
- Stage Two: $89.0M DDT&E + $23.6M two test flight units = $112.6M
- Vehicle-Level Integration: $22.2M + $10.6M = $32.8M
- Fee: $0 (FFP zeros it)
- Program Support: $0 (FFP zeros it)
- Contingency: $0 (FFP zeros it)
- **Total: $443.4M**

**Compare to the inherited number.** NAFCOM p.5 gives the traditional NASA-culture estimate at $3,977M. Subtract $443M from $3,977M → $3,534M of overhead. NAFCOM p.6 decomposes that overhead in priority order: Acquisition Strategy (oversight vs no oversight), Requirements Stability, Team Efficiency, Management Structure, Early-Phase Systems Engineering, Funding Commitment. "Order represents relative weighting" (NAFCOM p.6). Acquisition Strategy alone - the FFP-vs-CPF switch - accounts for the zeroed Fee + Program Support + Contingency lines that account for Fee 12.5% / Program Support 10% / Contingency 30% Vehicle / 10% Engine in the CPF case (NAFCOM p.8).

**Re-derivation works at the architecture level too.** Falcon User's Guide §1.5.3, p.5: "The two stage Falcon 9 architecture was selected to minimize the number of stage separation events, eliminating potential failure modes associated with third and fourth stage separations, as well as potential engine deployment and ignition failure modes in the third and fourth stages." The number of stages is derived: minimum stages that deliver required delta-V with the available engines, weighted against the failure corpus (Falcon User's Guide §1.5, p.4: "A study by The Aerospace Corporation found that 91% of known launch vehicle failures in the previous two decades can be attributed to three causes: engine, avionics, and stage separation failures"). Two stages was the answer. Not three because three is traditional. Not 1.5 because 1.5 is fashionable.

**Composition derivation, third example.** Falcon Heavy (Falcon User's Guide §2.2, pp.6-7): "Falcon Heavy's first stage comprises three Falcon 9 first stages... utilizes the same second stage and same payload fairing as flown on Falcon 9, fully benefiting from the flight heritage provided by Falcon 9 flights." The vehicle was composed from proven primitives: 3× F9 first stage + 1× F9 second stage + 1× F9 fairing. Physics did not demand a new upper stage; the upper-stage delta-V budget was already met. Building a new one would have added qualification cost (each fork divides the qualification base) without buying capability. Composition by physics, not by catalog.

## Anti-pattern

The original NAFCOM run, late 2010 (NAFCOM p.2): the team produced $3.977B for Falcon 9 development by treating the NASA traditional-culture model as the derivation. The model's terms - oversight, unstable requirements, less-lean management, annual funding, contingency-on-contingency - were not physical. They were inherited cost structure. The "derivation" was a composition of those overheads, not of physics.

The number was published in the "Commercial Market Assessment for Crew and Cargo Systems" Appendix B and cited at the National Space Symposium (NAFCOM p.2) before any of the terms had been audited against an actual physical derivation. SpaceX's actual development was already running near the $443M floor; the public estimate was 9× higher.

The anti-pattern is treating an estimate as a derivation. An estimate composed of overhead terms is a forecast of how much a frame will charge, not of what physics requires. When a derivation has not been done, the estimate has no floor - and treating an unfloored estimate as the budget locks the program inside the frame that produced it.

A second instance, same family of failure: CRS-7 (CRS-7 IRT p.7). The rod-end design assumed the part's industrial-grade rating was adequate. The manufacturer's published 4:1 factor of safety for industrial-grade parts in load applications was the derivation that would have answered the question. Nobody composed it. The flight became the test, and the answer was no.

## Related skills

- Parent: [first-principles-thinking](../SKILL.md)
- Pairs with: [cost-floor-derivation](cost-floor-derivation.md) (the cost-specific application), [assumption-audit](assumption-audit.md) (a derivation kills the assumption it contradicts)
- Compose with: three-axes-decomposition (route via your parent spine to architecture) (composition by proven primitives - Falcon Heavy as 3× F9), forbidden-list (route via your parent spine to architecture) (a kill-derivation produces an entry on the forbidden list)

## Source

- Primary: NAFCOM p.3 (workforce, $3-$5 multiplier, infrastructure as the three first-order cost terms), p.5 ($3.977B vs $443M), p.6 (six drivers in priority order), p.8-9 (CPF and FFP decompositions).
- Secondary: Falcon User's Guide §1.5, p.4 (Aerospace Corporation 91% failure-corpus finding); §1.5.3, p.5 (two-stage architecture rationale); §2.2, pp.6-7 (Falcon Heavy as composition of Falcon 9 primitives).
- Anti-pattern: CRS-7 IRT p.7 (4:1 derating not applied to rod end).

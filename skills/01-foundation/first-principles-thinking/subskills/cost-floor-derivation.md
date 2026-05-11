---
name: cost-floor-derivation
description: Compute the irreducible floor of a cost - workforce × loaded labor + material + infrastructure + outsourcing multiplier + margin - before accepting any vendor estimate, NRE quote, or "industry standard" budget. Use this skill when the user is being handed a cost number, an annual budget, an NRE estimate, or any "this will cost $X" figure and you need to know what physics and basic accounting actually require versus what the inherited frame is charging on top. Especially load this skill when a cost is treated as a constraint instead of a variable, when phrases like "the estimate says," "the vendor quoted," "we always budget," or "industry-standard NRE" appear, or when a 5-9× spread between two estimates of the same work needs explaining.
---

# Cost Floor Derivation

In late 2010, NASA ran NAFCOM - its NASA-Air Force Cost Model - against the Falcon 9 launch vehicle. With "traditional NASA environment/culture" inputs, the model produced $3.977B. After NASA staff visited Hawthorne and re-ran the model with corrected inputs, the same vehicle priced out at $443.4M Firm Fixed Price. (NAFCOM p.2, p.5.) The 9× spread was not physics. It was layers of overhead - six of them, ranked - sitting on top of the floor. This skill is the discipline that decomposes any cost into floor-plus-overhead so you can attack the overhead instead of optimizing inside it.

## What this is

Cost-floor derivation is the practice of computing what a goal *physically and accountably* requires - workforce-hours at loaded labor cost, raw material, infrastructure footprint, the outsourcing multiplier on every dollar that leaves your org, and a small margin - before you touch any vendor estimate, NRE quote, or annual budget.

The floor is not an estimate. It is an arithmetic identity: total workforce × loaded labor + material + infra utilization + (outsourced spend × 3 to 5) + margin. (NAFCOM p.3 ranks workforce as cost-efficiency factor #1 and infrastructure as factor #3; the $3-to-$5 multiplier is factor #2, verbatim from page 3.) Anything above the floor is overhead inherited from someone else's frame, and overhead is the part you can attack.

The discipline is not to disprove the estimate. It is to make the *gap between the floor and the estimate* a named, decomposed, line-item-by-line-item finding so the conversation shifts from "is the budget right?" to "which of these six drivers is in scope to change?"

## When to use this

- A vendor or internal team hands you a cost number and asks you to plan against it
- An "NRE" or "engineering budget" is being accepted as fixed
- Two estimates of the same scope differ by more than 2× and nobody has decomposed the gap
- The phrase "industry-standard cost" or "that's what these things cost" is being used to defend a number
- A program is being declared infeasible on cost grounds before the floor has been computed
- A make-vs-buy decision is being made on a single quoted price with no outsourcing-multiplier accounting
- You inherit an estimate built under one acquisition strategy and someone proposes changing the strategy without re-pricing the work

## When NOT to use this

- The work is a small one-off where computing the floor takes longer than the work itself
- The cost is dominated by a single physical input (e.g., raw material at market price) and the labor/overhead terms are <10% of total
- You are inside a fixed-price contract that you have no authority to renegotiate - derive the floor anyway, but for forward decisions, not for the current contract
- The floor calculation requires data the org will not release (and you cannot estimate within an order of magnitude); name the gap as a finding instead of inventing numbers

## How to apply

1. **Restate the goal in physical/economic terms.** Not "develop the system." Write: kilograms, joules, person-hours, square feet of facility, dollars of raw material. NAFCOM's $443M number was reachable only because someone restated "develop a Falcon 9" as workforce + material + infrastructure + acquisition strategy. (NAFCOM p.3.)
2. **Compute the workforce term.** Total full-time-equivalents required × loaded labor cost (salary + benefits + overhead allocation) × duration. NAFCOM p.3: "Total vehicle DDT&E costs are primarily a product of the total workforce needed to accomplish the effort." This is factor #1.
3. **Add material and infrastructure.** Raw material at market or vendor cost. Infrastructure footprint × utilization percentage × loaded carry cost per square foot. (NAFCOM p.3 lists infrastructure as factor #3: "Total infrastructure required for the DDT&E effort and infrastructure utilization percentage.")
4. **Apply the outsourcing multiplier to every dollar that leaves the org.** NAFCOM p.3, verbatim from SpaceX: "every dollar sent out of the company actually costs between $3 and $5 based on subcontractor overhead and profit." Use 3× as a low-end estimate, 5× as a high-end. Make it a separate line so the make-vs-buy lever is visible.
5. **Add margin (small, named).** A few percent for genuine unknowns. Distinguish margin from contingency - contingency is what NAFCOM's Cost-Plus-Fee model adds at 30% Vehicle / 10% Engine on top (p.8); the floor does not.
6. **Name the gap.** Subtract the floor from the estimate. The remainder is the overhead. Decompose it against NAFCOM's six ranked drivers (p.6, in priority order): (1) Acquisition Strategy oversight vs no-oversight, (2) Requirements Stability stable vs unstable, (3) Team Efficiency, (4) Management Structure lean vs less-lean, (5) Early-Phase Systems Engineering discipline, (6) Funding Commitment fixed vs annual. "Order represents relative weighting" (NAFCOM p.6).
7. **Identify the highest-weighted overhead lever you can move.** Acquisition strategy is #1. If you cannot change the acquisition strategy, move to #2. If you cannot change requirements stability either, the floor will not be reachable - name that as the constraint instead of pretending the estimate is the floor.
8. **Run the CLI to mechanize it.** `node tools/clis/floor-cost.js --help` writes the same arithmetic deterministically; use it for any non-trivial pass so the math is auditable.

## Worked example

NAFCOM, Falcon 9, August 2011 (NAFCOM p.5):

- **Initial NASA-environment estimate (Cost Plus Fee):** $3,977M. Decomposes (p.8) to Stage One $1,741M + Stage Two $651M + Fee 12.5% $298M + Program Support 10% $263M + Contingency 30%/10% $741M + Vehicle Integration 8% $282M.
- **Initial SpaceX-environment estimate (Cost Plus Fee):** $1,659M (paper headline rounds to $1,695M; p.8 decomposition). Same vehicle, commercial culture inputs.
- **Updated Firm Fixed Price after Hawthorne visit:** $443.4M. Decomposes (p.9) to Stage One $298.0M ($188.7M DDT&E + $109.3M for two test flight units) + Stage Two $112.6M + Fee $0 + Program Support $0 + Contingency $0 + Vehicle Integration $32.8M.

Decompose the $3,977M → $443M gap against the six drivers (NAFCOM p.6, priority order):

1. **Acquisition Strategy** (oversight → no oversight): zeros out Fee $298M + Program Support $263M + Contingency $741M = ~$1,302M removed. Single largest delta. (NAFCOM p.9 confirms FFP "reflects a space act agreement approach" with these line items zeroed.)
2. **Requirements Stability** (unstable → stable): stops requirements churn from inflating the workforce term. NAFCOM does not split this out as a dollar figure, but it is the second-highest-weighted driver (p.6).
3. **Team Efficiency** (less efficient → efficient): reduces the workforce-hours required for the same DDT&E. Shows up as Stage One $1,741M → $298M and Stage Two $651M → $112.6M after the SpaceX visit corrected the workforce inputs and added Falcon 1 heritage / off-the-shelf hardware (NAFCOM p.5).
4. **Management Structure** (less lean → lean): SpaceX's own attribution (NAFCOM p.3): "reducing the total workforce; number of management layers and infrastructure can substantially reduce DDT&E costs."
5. **Early-Phase Systems Engineering** (less disciplined → disciplined): tightens the workforce term again.
6. **Funding Commitment** (annual → fixed): allows the FFP structure to hold, which is what zeros the contingency line.

Now apply the outsourcing multiplier (NAFCOM p.3, factor #2): every dollar sent out of SpaceX cost $3-$5 once subcontractor overhead and profit were added. The traditional model paid this multiplier on a much larger fraction of total spend; the lean model paid it on far less. This is a separate finding from the six-driver decomposition above.

The floor was not $3.977B. The floor was within striking distance of $443M. Everything between the two was overhead - and NAFCOM, on page 6, named the overhead in priority order so anyone re-running the exercise would know which lever to pull first.

## Anti-pattern

The original NAFCOM run, late 2010 (NAFCOM p.2), produced $3.977B for Falcon 9 development. The number was used in the "Commercial Market Assessment for Crew and Cargo Systems" Appendix B and in the Deputy Administrator's National Space Symposium presentation (NAFCOM p.2) before anyone visited the SpaceX facility.

The floor had not been computed. The estimate inherited the entire NASA traditional-culture frame: oversight, unstable requirements, less-lean management, annual funding, contingency stacked on contingency. None of those terms was physics. None was material cost. None was a property of the rocket.

When NASA staff finally visited Hawthorne (NAFCOM p.2: "Working with different inputs from the preliminary data provided by SpaceX after a trip to the SpaceX facility, NASA recently inputted revised data into the NAFCOM model and a different output was the result"), the number fell to $443M. The same vehicle, the same physics, an order of magnitude off - and the public record had been built on the unfloored estimate.

The lesson: an estimate that has not been decomposed against a floor is not a budget. It is a frame. Treating it as a constraint locks the program inside the frame. The CRS-7-style cost of skipping this skill is not a vehicle loss; it is the quiet loss of every program that was never started because its inherited estimate priced it out.

## Related skills

- Parent: [first-principles-thinking](../SKILL.md)
- Pairs with: [assumption-audit](assumption-audit.md) (each overhead line is an unaudited assumption), [re-derive-from-physics](re-derive-from-physics.md) (the floor terms must come from physics, not catalog)
- Compose with: system-engineering (route via the first-principles-thinking spine, then to system-engineering) (the floor sets the budget against which the graph is shaped), infrastructure (route via the first-principles-thinking spine, then to infrastructure) (lean-org and standard-menu are how the floor is preserved over time)

## Source

- Primary: NAFCOM Cost Estimates report, Aug 2011 - pp.2, 3, 5, 6, 8, 9 (three estimates, six drivers in priority order, $3-$5 multiplier verbatim, FFP vs CPF decompositions).
- Secondary: Falcon User's Guide §1.2, §1.4 - lean-org and one-core-vehicle statements that operationalize NAFCOM's drivers #3 and #4.
- Tool: `tools/clis/floor-cost.js` - mechanized floor calculation.

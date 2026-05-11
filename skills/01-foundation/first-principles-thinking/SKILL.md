---
name: first-principles-thinking
description: Reason from physics, mass, energy, money, and time - not from analogy or inherited convention - and decompose any goal into capability gates whose first rung you can build this quarter. Use this skill whenever the user proposes a non-trivial goal, sets a budget or schedule, says "industry standard," "that's how it's done," "best practices," "we've always," "the vendor recommends," "the estimate says," or anywhere a number, architecture, or process is being accepted without being re-derived. Especially load this skill at the start of any planning, costing, or architecture conversation - it is the entry skill, the door, and skipping it means optimizing inside someone else's frame.
---

# First-Principles Thinking

In late 2010 and early 2011, NASA ran its own cost model - NAFCOM, the NASA-Air Force Cost Model - against the Falcon 9 launch vehicle. The objective was to estimate what it would have cost NASA to develop the same rocket SpaceX had just built.

The first run, with inputs set to a "traditional NASA environment/culture," produced $3.977B. A second run, with inputs adjusted to "a more commercial development culture," produced $1.695B. Same vehicle. Same mass. Same physics.

Then NASA staff visited SpaceX's Hawthorne facility, looked at what was actually being done, and re-ran the model with corrected inputs. More Falcon 1 heritage. Off-the-shelf hardware. Two flight units instead of one. Firm-fixed-price acquisition instead of cost-plus-fee.

The number fell to $443M. Same rocket. Roughly 9× spread between the high estimate and the low one.

NAFCOM's own decomposition of where the gap came from, in priority order: acquisition strategy (oversight vs no oversight), requirements stability (unstable vs stable), team efficiency, management structure (less lean vs lean), early-phase systems engineering discipline, and funding commitment (annual vs fixed). And from page 3 of the report, in SpaceX's own words to NASA: "every dollar sent out of the company actually costs between $3 and $5 based on subcontractor overhead and profit."

The 9× was not physics. It was layers of analogy reasoning - "this is how it has always been done" - stacked on top of each other until the floor was buried four billion dollars beneath the estimate.

That is what first-principles thinking unlocks. When you strip a goal down to what physics, energy, mass, money, or time actually require, you find that most of the cost was inherited from someone else's frame.

## What this is

First-principles thinking is the discipline of stating a goal in terms of what reality actually requires - kilograms to orbit, joules of delta-V, hours of workforce, dollars of material - and then working backward through capability gates to the cheapest first rung you can build right now.

It is the opposite of reasoning by analogy. Analogy starts with "how is this normally done" and inherits every assumption baked into the comparison. First principles starts with what physics permits and what accounting requires, then asks why the actual answer differs.

The asymmetry is brutal. When the inherited frame is correct, analogy is faster. When the frame is wrong - because the technology changed, because the vendor cost structure changed, because nobody re-derived the answer in twenty years - analogy is wrong by a factor that compounds. NAFCOM's 9×. The 60-year industry consensus that orbital boosters cannot be reused. The "industrial-grade rod end is fine" assumption that ended CRS-7. Every one was an analogy that nobody re-checked against physics.

## In practice

### When industry standard is just inherited convention

For sixty years, the consensus across every launch program on earth was that orbital first-stage boosters could not be re-flown. Reasoning was by analogy. No one has ever done it. The thermal and structural margins are too thin. The inspection cost would exceed building new.

The first-principles question is different. Is there a physical reason - propellant chemistry, material limit, energy budget - that prevents a Falcon 9 first stage from flying again after recovery? No. The answer was always no.

As of February 2025, SpaceX has re-flown Falcon 9 first-stage boosters more than 384 times with a 100% success rate. Sixty years of industry consensus, dissolved by one team that asked the question from physics instead of from precedent.

The lesson is not that the industry was lazy. The lesson is that analogy reasoning is invisible. Nobody wrote down "we assume reuse is impossible" - they just built every program around the assumption. When an assumption is invisible, it never gets re-derived.

### When the cost is the frame, not the work

The NAFCOM report is a clean public artifact of what frame inheritance costs. The $3.977B estimate was not wrong about Falcon 9's mass, geometry, or engine count - those inputs were the same in every run.

The estimate was wrong because the model multiplied the work by oversight overhead, requirements churn, less-lean management, less-disciplined early systems engineering, annual rather than fixed funding, and the $3-to-$5 subcontractor multiplier on every outsourced dollar.

Strip those layers - same vehicle, different organizational physics - and the cost falls to $443M.

The first-principles move is to refuse to start from the estimate. Start from the floor. Total workforce × loaded labor cost + material + infrastructure utilization + a small margin. Whatever sits between that number and the estimate is overhead. Overhead is negotiable in a way that physics is not.

NAFCOM's own page-3 ranking of cost drivers was, in priority order: workforce, organizational complexity (the subcontractor multiplier), and infrastructure utilization. Three terms. Reduce any of them and the number moves. Reduce all three and the number moves by an order of magnitude.

### When the cheapest test still tells you real physics

Maraia's capsule recovery program worked through a five-rung fidelity ladder before any rocket flew. A low-speed wind tunnel run at Texas A&M. A drop tower at China Lake. A small-scale balloon drop from 100,000 ft with a 10-inch, 6-pound subscale capsule. A chute ejection rig with no pyros. Finally, a full-scale balloon drop from 100,000 ft with a 30-inch, 133-pound capsule.

The first-principles question - "what is the cheapest test that still tells me real physics?" - picked the wind tunnel first. Not because it was the most realistic test. Because it was the cheapest physically valid one.

The trap is to skip the cheap rungs because they feel beneath the program. Maraia's program ran wind tunnels and drop towers before the rocket because each rung was the cheapest way to invalidate the next assumption.

Skip a rung and the rocket becomes the test rig. The rocket is the most expensive test rig ever built.

### When reasoning by analogy quietly destroys a vehicle

The CRS-7 anti-example is the price of skipping this skill. SpaceX selected an industrial-grade 17-4 PH stainless steel rod end for a flight-critical cryogenic load path holding a helium pressure vessel inside the upper-stage LOX tank.

The NASA Independent Review Team's finding: the part was used "without adequate screening or testing... without regard to the manufacturer's recommendations for a 4:1 factor of safety when using their industrial grade part."

This is reasoning by analogy. We use these everywhere. They have been fine.

The first-principles question would have been narrower and harder. At cryogenic temperature, under ascent loads, with the manufacturer's published 4:1 derating applied, does this part still meet margin? The answer, derivable on a single page, was no. The flight became the test.

### When the architecture is dictated by the question, not the catalog

Falcon 9 is a two-stage vehicle for one stated reason. The Falcon 9 user guide: "the two stage Falcon 9 architecture was selected to minimize the number of stage separation events, eliminating potential failure modes associated with third and fourth stage separations."

The first-principles question - "what is the minimum number of stages physics requires for this engine and this payload to LEO?" - gives the answer two. So: two. Not three because three is traditional. Not 1.5 because hybrid is fashionable. Two because that is what physics allows and what the failure corpus penalizes the least.

Falcon Heavy made the same move at the next level. Its "first stage comprises three Falcon 9 first stages" sharing "the same second stage and same payload fairing as flown on Falcon 9, fully benefiting from the flight heritage." The first-principles question - "do we need a wholly new vehicle, or can the existing one be composed?" - gave a three-core configuration that inherited the fight-tested upper stage and fairing rather than re-qualifying both.

### When nine cheap engines beat one expensive engine

The Falcon 9 first stage uses nine Merlin engines, not one large engine. The analogical move would be to design a single big engine. That is how Saturn V's F-1 worked. That is how the RD-180 works. That is how every legacy heavy launcher works.

The first-principles question is statistical. What does the historical engine failure corpus say, and does running nine engines plus a vehicle-management supervisor that can shut a failed engine down cost less than developing one ultra-reliable engine?

The answer was yes. Engine-out logic has been demonstrated in flight with 100% primary mission success. Nine cheap engines plus a control plane beat one expensive engine - but only if you ask the question from physics and statistics rather than from heritage.

## How to apply

1. **State the goal in physical or economic terms.** Not "ship a feature." Not "reduce cost." Write a sentence that names mass, energy, delta-V, workforce-hours, dollars, or wall-clock time. "Move 100 humans to Mars surface" has mass, energy, delta-V, and time as terms. "Develop a launch vehicle for under $500M" has workforce, organizational layers, subcontractor multiplier, and infrastructure utilization as terms. NAFCOM's $443M number was reachable only because someone restated the goal in those terms instead of "deliver a launcher within NASA's normal acquisition envelope."

2. **Compute the floor.** Add up what physics or basic accounting actually requires - propellant mass for the delta-V, workforce-hours at loaded cost, material cost, the minimum infrastructure footprint. The number you compute is the floor. Everything above the floor is overhead inherited from someone's frame, and overhead is the part you can attack. The NAFCOM report is the cleanest public example: SpaceX's actual development came in near the floor; NASA's traditional-culture estimate came in 9× higher; the gap was the overhead. If you cannot compute the floor on one page, you do not yet understand the goal - you are still inside someone else's frame.

3. **Identify capability gates working backward.** To do X you must first do Y; to do Y you must first do Z. Stop the regress when a gate is something you can build this quarter. Falcon 9 followed Falcon 1. Falcon Heavy followed Falcon 9. Reuse followed expendable launches. Each gate produced real physical data that retired risk on the next gate. The gate you stop at is the work item; everything above it is roadmap.

4. **Pick the cheapest physically valid first rung.** Maraia ran the wind tunnel before the drop tower before the balloon drop before the rocket. The selection rule is not "most realistic" - it is "cheapest test that still tells me real physics." A test that cannot in principle invalidate the assumption you are checking is not the rung; it is theater. A test that can invalidate the assumption with a $5,000 fixture is the rung even if a $5M test would have been more impressive. The rung you skip becomes the rung your flight vehicle pays for.

5. **Audit every decision for analogy reasoning.** For each "we will do it this way" line in the plan, ask: is this from physics, or from inherited convention? If from convention, write down what physics or basic accounting would actually allow. The gap between the convention answer and the physics answer is your opportunity. The CRS-7 rod end was an analogy decision ("we use these everywhere") that no one had re-derived against the manufacturer's published 4:1 cryogenic derating. The gap was a vehicle.

6. **Refuse to optimize inside the wrong frame.** If the frame itself is wrong - if the cost model assumes oversight, the schedule assumes annual funding, the architecture assumes three stages because three is traditional - the local optimum is in the wrong place. The right move is to challenge the frame, not to extract another five percent from inside it. NAFCOM's 9× was unreachable from inside the traditional frame; only by changing the frame did the number fall. When the frame is wrong, optimization is the trap.

## Do

- State goals in physics, energy, mass, money, or time. "Workforce × loaded cost + material + infrastructure" is a goal you can attack. "Deliver a launch vehicle within budget" is not.
- Compute the floor before you accept any estimate. The NAFCOM 9× was visible only because someone computed both numbers and named the difference as overhead.
- Re-derive "industry standard" answers when the underlying technology, vendor structure, or cost basis has changed. Reuse was "impossible" until someone asked from physics.
- Strip cost to drivers - workforce count, management layers, subcontractor multiplier (the $3-to-$5 NAFCOM number), infrastructure utilization. These are the terms; everything else is bookkeeping.
- Pick the cheapest physically valid first rung. Wind tunnel before rocket. Falcon 1 before Falcon 9. Grasshopper hop before orbital landing.
- Compose what is already proven. Falcon Heavy is three Falcon 9 first stages plus the existing upper stage and fairing - not a new vehicle.
- Write down the assumption you are reasoning from before you defend it. Invisible assumptions are the ones that destroy missions.
- Apply the manufacturer's published derating before you trust their part. CRS-7 cost a vehicle because no one applied the 4:1.
- When you find a 9× gap between physics and the estimate, treat it as a finding, not a typo. The gap is the work.

## Do not

- Do not reason by analogy when you can reason from physics. The CRS-7 rod end was an analogy ("industrial grade is fine") that physics ("4:1 derating at cryo + ascent loads") would have killed.
- Do not accept inherited cost structures as fixed. The NAFCOM 9× was not physics; it was acquisition strategy, requirements stability, management layers, and the subcontractor multiplier - every one negotiable.
- Do not skip the cheapest physically valid first rung. The flight is the most expensive test rig ever built; do not let it be the first one.
- Do not optimize inside someone else's frame. If the frame is wrong, the local optimum is wrong. NAFCOM's traditional-culture optimum was four billion dollars away from the floor.
- Do not confuse "this is how it is done" with "this is how it must be done." For every "must," ask: under what physics? Under what cost basis? When was it last checked?
- Do not declare a goal impossible without computing the floor first. Sixty years of industry consensus said reuse was impossible; the floor said otherwise; 384 re-flights later, the floor was right.
- Do not let an unnamed assumption survive a planning conversation. If you cannot say what assumption a number rests on, you cannot defend the number.

## Connects to

- **system-engineering** - once the goal is decomposed into capability gates, you need to see the graph that implements it. First principles set the goal; the graph implements it.
- **architecture** - the failure corpus tells you which design axes to harden first; first principles tell you which axes are even on the table. Two stages because physics allows two and the failure corpus penalizes more.
- **testing-sequencing** - the cheapest physically valid first rung is the entry point to the fidelity ladder. First principles pick the rung; testing-sequencing climbs it.
- **iterate-fast** - first principles tell you what counts as an acceptable failure, because they tell you what physical question the test was supposed to answer.
- **infrastructure** - the capability gates this skill produces eventually become standard interfaces, signed ICDs, and versioned specs. Today's first-principles derivation is tomorrow's contract.

---

This is the door. Without first-principles reasoning, every other skill in this set is polish on someone else's frame - better tests of the wrong vehicle, tighter feedback loops on the wrong question, leaner infrastructure for the wrong architecture.

The reader who internalizes this skill stops asking "how do I do X faster?" and starts asking "why is X done at all, and what does physics actually require?" They challenge the cost. They challenge the schedule. They challenge the architecture. When the answer is "because that is how it is done," they hear "no one has actually checked."

**If something is physically possible, it is possible - but you only know what is physically possible after you have stripped the analogy reasoning out, and that is the entire job.**

Compute the floor today. When the floor sits 9× below the estimate, do not flinch - that gap is the opportunity, and the people who own the inherited frame will defend it right up until you fly past them. Pick the goal that feels impossible. Write its floor on one page. Build the cheapest first rung this quarter. Then the next. Then the next. That is how an industry's sixty-year consensus dissolves into 384 successful re-flights, and how a $3.977B estimate becomes a $443M rocket. Begin.

## Sub-skills

When the work narrows, load a focused sub-skill:

| Sub-skill | When to load |
|---|---|
| [cost-floor-derivation](subskills/cost-floor-derivation.md) | A cost number is being accepted without being re-derived |
| [assumption-audit](subskills/assumption-audit.md) | A spec / PR is full of "industry standard" / "best practice" language |
| [analogy-detector](subskills/analogy-detector.md) | A design choice is justified by precedent, not physics |
| [capability-gate-decomposition](subskills/capability-gate-decomposition.md) | A goal is too big to ship this quarter |
| [re-derive-from-physics](subskills/re-derive-from-physics.md) | A vendor estimate is the only reference point |

## Related spine skills

- [system-engineering](../../02-design/system-engineering/SKILL.md) - first-principles gives you the goal; system-engineering shapes the graph
- [architecture](../../02-design/architecture/SKILL.md) - first-principles picks the axes; architecture tiers them by failure history
- [feedback-loops](../../02-design/feedback-loops/SKILL.md) - first-principles says "what should I be measuring?"; feedback-loops makes the measurement deterministic

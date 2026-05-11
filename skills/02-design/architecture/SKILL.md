---
name: architecture
description: Anchor design axes to the historical failure corpus, not the feature list. Load this skill for architectural decisions, redundancy strategy, fault tolerance tiering, factor-of-safety choices, single-point-of-failure analysis, design reviews, platform design, and service architecture. The reflex this trains: read the incident record before drawing the boxes - the architecture you arrive at maps 1:1 to the top failure modes, publishes the forbidden configurations as loudly as the allowed ones, and tiers redundancy by who pays when it fails.
---

# Architecture

In 2001, Aerospace Corporation published a study of orbital launch failures over the prior two decades. The Falcon User's Guide cites the headline number in §1.5: 91% of known failures traced to three causes - engines, avionics, and stage separations. Three causes. Two decades. Almost every launch loss.

SpaceX did not start Falcon 9 from a feature list. They started from that failure list. The architecture maps 1:1 to the three causes:

- **Engines** → 9 Merlins per stage with engine-out capability. Each engine sits in its own metal bay isolated from neighbors. Fuel doubles as hydraulic fluid, deleting the hydraulic subsystem entirely. Engine-out has been demonstrated in flight, with 100% primary mission success.
- **Avionics** → "three-string, fault-tolerant architecture ... full vehicle single-fault tolerance ... by isolating compartments within avionics boxes or by using triplicated units."
- **Staging** → Falcon 9 is two-stage only. No third or fourth stage = zero third- or fourth-stage separation failures. The Merlin Vacuum even uses a fixed expansion nozzle, so there is no nozzle-deployment failure mode.

Three causes accounted for 91% of historical losses. Three architecture axes were aligned to those causes. That is not a coincidence - it is the method.

The contrast is CRS-7. SpaceX put an industrial-grade 17-4 PH stainless steel rod end into a flight-critical cryogenic load path "without adequate screening or testing... without regard to the manufacturer's recommendations for a 4:1 factor of safety." A rod-end-class joint had no redundancy at the apex of a load chain whose terminus was the entire vehicle. Industrial-grade in a flight-critical path. No derating. No test under flight conditions. The architecture had a single point with no margin against the manufacturer's own published recommendation. Architecture failure.

Architecture is what you do when you take the failure corpus seriously enough to redesign around it.

## What this is

A design axis is the dimension along which you concentrate redundancy, fault tolerance, and engineering attention. Most teams pick axes from the feature list - what the system has to do. That gets you a feature-complete design with redundancy spread evenly to "look rigorous."

The disciplined alternative: pick design axes from the failure corpus. The historical record of incidents tells you where redundancy actually pays. Aerospace Corp's 91%-from-3-causes study is the template. You look up your equivalent. You concentrate redundancy on the top 2–3 modes. You publish the forbidden configurations as loudly as the allowed ones. You tier fault tolerance by blast radius - flight, ground operations, and lifting hardware all get different factors because different people pay when they fail. You share parts across variants so every flight is evidence for every use of that part.

What you arrive at is smaller, sharper, and harder to break than the architecture assembled from feature requests.

## In practice

### The 91% map

Falcon 9's three primary architectural decisions correspond to Aerospace Corp's three top failure causes:

- 9 engines, each in an isolated bay, with vehicle management software that shuts down off-nominal engines and re-plans the trajectory. The supervisor matters: "system-level vehicle management software controls the shutdown of engines in response to off-nominal engine indications; this has been demonstrated in flight, with 100% primary mission success." Nine engines without that supervisor would be nine ways to lose the mission. With it, engine failure is a tolerated event class.
- Three-string avionics with full single-fault tolerance, achieved either by triplicating units or by isolating compartments inside avionics boxes.
- Two stages. No third or fourth stage to separate. Even within stage 2, the Merlin Vacuum uses a fixed, non-deploying nozzle - the deployment failure mode is deleted by deleting the deployment.

Three axes, three causes. If your architecture has five primary redundancy axes and your top failures cluster on two of them, you spent your budget in the wrong place.

### Tier fault tolerance by blast radius

Uniform safety policy is a category error. The same physical act under different conditions deserves different factors. Falcon User's Guide Table 6-1:

| Context | Yield | Ultimate |
|---|---|---|
| Flight | 1.10 | 1.25 |
| Ground operations | 1.10 | 1.40 |
| GSE lifting hardware | **3.0** | **4.0** |

Same load class. Three factors. GSE lifting gets ~3× the flight factor because personnel are below the load. The factor reflects who pays when it fails: in flight, the payload is committed and the loss is hardware. In the warehouse, a dropped unit can kill someone.

Hazard-class fault tolerance follows the same logic (§6.4.6): hypergolic propellants or systems where a failure may lead to catastrophic hazard get **dual fault tolerance - three inhibits to propellant release**. Other propellant systems get **single fault tolerance - two inhibits**. And: "Inhibits shall be independent and cannot be combined. For example, a single electrical command of two valves in series is not a dual fault tolerant system." Two valves on one wire is not two inhibits. The independence rule prevents the optical-redundancy trap.

### Publish the forbidden configurations

The "no" list is as load-bearing as the "yes" table. §6.4.2.2 / Table 6-5 spells out pressure vessel types from safest to riskiest:

- Type 1 (all metallic): standard rules
- Type 2 (metallic liner + hoop overwrap): allowed
- Type 3 (metallic liner + full overwrap): allowed
- Type 4 (non-metallic liner + composite overwrap): **"use is discouraged"**
- Type 5 (all composite): **"N/A"** - not allowed

Plus explicit prohibitions: "No additively manufactured tanks." "No bimetallic welded joints." "No pressure tanks that require pressure stabilization to hold external structural load." "No Type 2, 3, 4, or 5 pressurized-structure tanks where non-pressure loading makes up more than 15% of maximum combined flight stress."

These prohibitions encode collective scar tissue. An architecture spec without a forbidden list is one where every reviewer is silently re-deriving why those configurations are bad. Publish the no-list and the next person inherits the lesson without paying for it.

### Commonality is your evidence multiplier

Falcon Heavy is built from three Falcon 9 first stages plus the Falcon 9 second stage and fairing: "Falcon Heavy builds on the proven, highly reliable design of Falcon 9. Falcon Heavy's first stage comprises three Falcon 9 first stages... Falcon Heavy utilizes the same second stage and same payload fairing as flown on Falcon 9, fully benefiting from the flight heritage provided by Falcon 9 flights."

Crew and cargo share a core: "Because SpaceX produces one Falcon core vehicle, satellite customers benefit from the high design standards required to safely transport crew." Falcon 9 has 9 Merlins; Heavy has 27. "Flying several engines on each mission also quickly builds substantial engineering data and flight heritage."

Every shared part doubles its evidence base. A rarely-flown variant never accumulates the heritage of its common cousin. Forking is the default mistake - variants divide your evidence, and a feature-flag fork that "ships next quarter" never accumulates the qualification that the trunk gets for free.

### Deletion as architecture

Architecture also names what you do not build. The Falcon 9 first-stage thrust vector control "pulls from the high-pressure rocket-grade kerosene system, rather than using a separate hydraulic fluid and pressurization system. Using fuel as the hydraulic fluid eliminates potential failures associated with a separate hydraulic system and with the depletion of hydraulic fluid." The Merlin turbopump uses "a single shaft for the liquid oxygen pump, the fuel pump, and the turbine." Stage 2 ACS uses cold nitrogen because "the GN₂ ACS is more reliable and produces less contamination than a propellant-based reaction control system."

A node that does not exist has zero failures, zero leaks, zero monitoring, zero consumables. Disciplined deletion is a primary architectural move, not a side activity. The question to ask before adding a subsystem is whether an existing one can carry the load.

### The trap: CRS-7 at the apex

The CRS-7 rod end was an industrial-grade 17-4 PH stainless steel casting installed in a flight-critical cryogenic load path holding a helium pressure vessel inside the upper-stage LOX tank. The NASA Independent Review Team found it had been used "without adequate screening or testing" and "without regard to the manufacturer's recommendations for a 4:1 factor of safety."

The architectural failure was not "we picked the wrong rod end." The architectural failure was that a single rod-end-class joint sat at the apex of a load chain whose terminus was the entire vehicle, with no redundancy at that apex, no derating, and no test of the actual flight article under flight conditions. An industrial part rated for terrestrial use was inserted into a flight-critical cryogenic path because nobody named the apex and tiered the margin to it. The factor-of-safety table was not enforced where it mattered most.

Architecture is the discipline that catches this before flight. The corpus told them load-path joints are high-leverage. Tier 1 margin (4:1, per the manufacturer) belonged at that joint. The spec said it; the assembly did not.

## How to apply

1. **Read the failure corpus.** Find your domain's equivalent of Aerospace Corp's 91%-from-3-causes study. The historical record of incidents in your problem space - outages, recalls, regressions, post-mortems, CVE classes. If it does not exist as a document, build one from your own incident archive plus public ones in your industry.

2. **Rank failure modes by frequency × consequence.** The top 2–3 are your design axes. Not the top 10 - the top 2–3. Beyond that, the long tail does not justify a primary axis.

3. **Map architecture 1:1 to the ranked modes.** Engines, avionics, staging - three causes, three axes, matched. If your architecture has axes that do not correspond to a top failure mode, ask why they are primary axes. If your top failure mode has no architectural axis, that is the gap.

4. **Tier fault tolerance by blast radius.** Inhibits, factors of safety, redundancy levels are not uniform. Hypergolic / catastrophic-hazard systems: dual fault tolerance, 3 independent inhibits. Other propellant systems: single fault tolerance, 2 independent inhibits. Flight loads: 1.25 ultimate. Ground operations: 1.40 ultimate. GSE lifting (humans below): 4.0 ultimate. Tier the ladder before designing components - not after.

5. **Enforce inhibit independence.** Two valves in series driven by one electrical command is not dual fault tolerance - they share the command failure mode. Independence is the property that makes redundancy real. The same logic applies at the fastener level: locking features must not depend on preload to function (Table 6-3).

6. **Publish the forbidden list.** Forbidden materials, forbidden joint types, forbidden manufacturing processes, forbidden architectures. "No additively manufactured tanks," "No bimetallic welded joints," "Type 5 N/A." The no-list is as load-bearing as the yes-table because it encodes the lessons your team should not have to relearn.

7. **Pursue commonality aggressively.** Every shared part's flight count is evidence for every variant that uses it. Falcon Heavy on Falcon 9 is the template - three boosters, one second stage, one fairing, all common with Falcon 9. Before forking, ask: will each fork's flight count pay for its own qualification?

8. **Delete subsystems whose function an existing one can carry.** Fuel as hydraulic fluid. Single shaft for LOX pump, fuel pump, turbine. GN₂ ACS instead of propellant-based RCS. Deletion is a first-class architectural move.

## Do

- Anchor architecture on history, not novelty. Novelty is never a reason to ignore a 20-year incident corpus.
- Map primary architecture axes 1:1 with the ranked top failure modes. Three causes, three axes.
- Tier fault tolerance by who pays when it fails - payload, hardware, or personnel below the load. Same physical act, different conditions, different factor.
- Enforce independence in redundancy. Two inhibits sharing one electrical command is one inhibit.
- Publish the forbidden list. "No additively manufactured tanks" belongs in the spec, not in a senior engineer's head.
- Share parts across variants. Falcon Heavy on Falcon 9 is the template. Every shared part doubles its evidence base.
- Delete subsystems whose function can be carried by an existing one. A node that does not exist has zero failures.
- For any flight-critical load path, derate per the manufacturer's published recommendation, screen each unit, and test under flight conditions.

## Do not

- Do not spread redundancy uniformly to "look rigorous." Concentrate it on the top failure modes. Uniform redundancy is a sign nobody ranked the risks.
- Do not invoke "our use case is different" to skip the failure corpus. Every team thinks their case is different. The corpus does not care.
- Do not use the same factor of safety for flight, ground operations, and lifting hardware. Different blast radius, different factor. 1.25 and 4.0 are not interchangeable.
- Do not count two valves in series on one electrical command as dual fault tolerance. Shared command, shared failure mode, one inhibit.
- Do not omit the forbidden list. A spec that lists only the allowed configurations forces every reviewer to re-derive the prohibitions, and they will not.
- Do not fork variants without a plan for each fork to accumulate its own flight heritage. Forks divide evidence; commonality multiplies it.
- Do not add a subsystem when an existing subsystem can carry the load. Every new subsystem brings its own pressurization, monitoring, consumables, and blast radius.
- Do not use industrial-grade hardware in a flight-critical path without screening, testing under flight conditions, and derating per the manufacturer's published recommendation. CRS-7 is the warning. The 4:1 was on the data sheet.

## Connects to

- **first-principles-thinking** - architecture is one frame of first-principles applied to design. The failure corpus you anchor on is itself derived from physics + history, not from feature requests.
- **system-engineering** - you cannot tier blast radius until you can see the graph. The graph names the apex; architecture decides what redundancy goes there. CRS-7's rod end was the apex; the architecture had no margin at it.
- **testing-sequencing** - the architectural axes pick which test rungs you climb. Flight loads need flight-condition testing; an industrial-grade casting screened on a benchtop is not flight qualification.
- **infrastructure** - architectural decisions (factor-of-safety tables, forbidden configurations, commonality maps) belong in versioned, machine-consumable specs others can consume - not in tribal knowledge.

---

Most teams architect by feature list, then bolt on redundancy at design review when somebody asks "what about fault tolerance?" That is backwards. The redundancy budget gets sprayed across whatever happened to be on the slide. The historically-fragile places stay single-thread.

Read the failure corpus first. Map your design axes to it. Tier fault tolerance by blast radius - payload, hardware, personnel - not uniformly. Publish the no-list as loudly as the yes-list. Share parts across variants so every flight is evidence for every use.

The architecture you arrive at will be smaller, sharper, and harder to break than the one assembled from feature requests. **Pull up your incident archive today. Rank the top three causes. If your primary architecture axes do not match those three, you are spending redundancy where history is not stressing you, and leaving the historically-fragile places single-thread. Fix that before you ship the next change.**

## Sub-skills

| Sub-skill | When to load |
|---|---|
| [failure-corpus-mapping](subskills/failure-corpus-mapping.md) | Designing risk axes from the historical failure record, not the wishlist |
| [fault-tolerance-tiering](subskills/fault-tolerance-tiering.md) | Allocating redundancy unevenly: more where blast radius is large |
| [forbidden-list](subskills/forbidden-list.md) | Publishing the explicit list of patterns rejected from the system |
| [three-axes-decomposition](subskills/three-axes-decomposition.md) | Identifying the 3 dimensions that account for the bulk of failures |

## Related spine skills

- [system-engineering](../../02-design/system-engineering/SKILL.md) - system-engineering surfaces the graph; architecture chooses where the redundancy goes
- [first-principles-thinking](../../01-foundation/first-principles-thinking/SKILL.md) - first-principles picks the axes; architecture tiers them
- [feedback-loops](../../02-design/feedback-loops/SKILL.md) - architecture decides what's critical; feedback-loops tightens the loop on those decisions

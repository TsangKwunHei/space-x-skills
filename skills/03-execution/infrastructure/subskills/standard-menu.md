---
name: standard-menu
description: A small, versioned, named set of customer-facing options beats infinite custom every time. Use this skill when the work involves a public API surface, a product catalog, an SDK, an SDK plan tier, supported configurations, payload adapter options, supported orbits, supported deployment targets, supported framework versions, or any place where you have to decide whether to standardize or to keep saying yes to one-off requests. Especially load this skill when most customer requests are starting to look like the same exception, when the phrase "we can do that as a one-off" gets repeated, or when a team is drowning in bespoke integration work.
---

# Standard Menu

Falcon offers exactly five Payload Attach Fittings (PAFs): 1,575 mm, 2,624 mm, 3,117 mm circular, 3,117 mm strut, and Square (Falcon User's Guide §4.1.5, pp.17–19). Exactly three clampbands: 937 mm, 1,194 mm, 1,666 mm (§9.3, pp.71–72). One standard fairing: 5.2 m × 13.2 m (§4.1.3, p.16). Two-stage Falcon 9 and three-core Falcon Heavy as the only vehicle configurations (§2.1, §2.2). Falcon Heavy reuses the F9 second stage and fairing - "fully benefiting from the flight heritage provided by Falcon 9 flights. This commonality has also minimized infrastructure unique to the vehicle" (§2.2, p.6).

The 18.7 m extended fairing is offered, but explicitly "as a nonstandard service" (§4.1.3). The phrase "nonstandard service" appears repeatedly in the User's Guide for: extended fairing, additional fairing access doors, internal fairing RF antenna, breakwire signal, cryogenic propellant loading, GN₂ purge, separate EGSE power, customer processing off-site.

The label is the point. The menu is small, versioned, and named. Exceptions are visible.

## What this is

A standard menu is a small, named, versioned set of customer-facing options, with exceptions explicitly priced as nonstandard. It is the answer to "what do you offer?" in a single page. It is what makes the second customer cheap and the thousandth nearly free.

The discipline has three parts. First, keep the menu small - five PAFs, three clampbands, two configurations. Second, version the menu (Falcon User's Guide is at v8 in March 2025; see [versioned-specs](versioned-specs.md)). Third, label every deviation as nonstandard so the customer feels the cost. If most customers are asking for the exception, promote the exception to standard explicitly. Do not let "standard" silently mean "whatever the customer asked for."

## When to use this

- A team is shipping its first product to its second customer and wondering whether to fork or standardize
- A backlog is filling with one-off integration requests that look suspiciously similar
- Sales / customer-success is making promises that engineering has to deliver as bespoke work
- A product surface has grown organically and nobody can describe it in a single page
- Two customers asked for the same exception in the past quarter, and a third just asked
- An SDK has more configuration knobs than tests
- A vendor's "support matrix" no longer fits on a single screen

## When NOT to use this

- The product is in pre-PMF discovery and you do not yet know what the menu should be - keep saying yes until a pattern emerges, then standardize on it
- One customer is so dominant that their bespoke integration *is* the product (and you have priced that risk)
- The exceptions are genuinely uncorrelated and forcing standardization would make the menu meaningless
- You have not yet flown enough to know which options work - Falcon's five PAFs are the answer after many flights, not the assumption beforehand

## How to apply

1. **Inventory current options.** List every variant the team has shipped or promised. CAD configurations, API parameters, plan tiers, supported runtime versions, deployment targets. Count the items.

2. **Cluster by demand.** Which options have shipped to ≥3 customers? Which to exactly 1? The menu is the union of the high-demand cluster, sized small. Falcon's five PAFs cover mass capabilities up to 26,500 kg (Falcon User's Guide §4.1.4 Table 4-1) - five was the answer that fit the demand.

3. **Cap the menu size.** Five PAFs. Three clampbands. Two vehicle configurations. Pick a small number deliberately. If you cannot justify each entry, cut. The cost of an extra entry is recurring - every entry has to be qualified, tested, documented, supported, and versioned.

4. **Label exceptions explicitly as "nonstandard."** Falcon User's Guide uses the phrase repeatedly: extended fairing, additional fairing access doors, internal fairing RF antenna, breakwire signal, cryogenic propellant loading, GN₂ purge, separate EGSE power, customer processing off-site (§4.1.3 and adjacent sections). The customer who asks for nonstandard service knows it is nonstandard. They pay the price visibly.

5. **Reuse aggressively.** Falcon Heavy reuses the F9 upper stage and fairing - "fully benefiting from the flight heritage provided by Falcon 9 flights. This commonality has also minimized infrastructure unique to the vehicle" (Falcon User's Guide §2.2, p.6). Composition over forking. A new product configuration should be a recombination of menu items, not a new menu.

6. **Promote demand patterns to standard.** If three customers in a row ask for the "nonstandard" option, the option is the new standard. Promote it explicitly - rename it, add it to the menu, version-bump the spec - or kill it. Do not leave it ambiguous.

7. **Publish the menu.** Falcon User's Guide §1.1 is explicit: "This document is applicable to the Falcon vehicle configurations with a 5.2 m (17-ft) diameter fairing and the related launch service." One page. One artifact. Versioned. Customers can pin against it. See [versioned-specs](versioned-specs.md).

## Worked example

A platform team supports 12 different runtime versions across Node, Python, and Go, each configured per customer. The on-call burden is unbounded. The team's sales pitch is "we'll support whatever you run." Engineering is drowning.

Apply the skill:

- **Inventory**: 12 runtime versions × 3 languages × 4 deployment targets × 2 networking modes × 3 plan tiers = ~864 theoretical combinations. Actual shipped: 47 distinct configurations in production.
- **Cluster**: Of 47, exactly 6 cover 80% of customers (Node 20 + Python 3.11, two deployment targets, two plan tiers).
- **Cap the menu**: Six standard configurations. Two languages × two deployment targets × two plan tiers = 8, prune two unused = 6. Cap held.
- **Nonstandard**: The remaining 41 customer configurations are reclassified as "nonstandard service" with a published premium tier and a renewal-time migration path to standard. Customers see the cost.
- **Reuse**: The Go support is dropped (low demand, high carry cost). New languages are added by composition with the existing CI/CD harness, not by forking it. (Falcon Heavy's reuse of the F9 second stage and fairing is the analog.)
- **Promotion candidate**: Of the 41 nonstandard configurations, 8 share a common pattern (a specific PostgreSQL version pin). Track for promotion at next major version. Either adopt it as standard or sunset it; do not leave it as a quiet exception.
- **Publish**: A single "Supported Configurations" page, versioned. Each release notes the diff against the prior version. Customers can pin.

The menu went from "ask the on-call" to a single page. The team's qualification matrix dropped from 47 to 6. The 41 customer configurations are still served - explicitly, visibly, at a price that reflects the cost.

## Anti-pattern

"Whatever the customer asked for" as the silent standard. A product surface that grew organically over four years, with each new customer adding a new option that nobody else uses. No single page describes what the team supports. Sales promises configurations that engineering only learns about at the kickoff call. Every customer integration is bespoke; the second is as expensive as the first.

This is the inverse of the Falcon menu. Falcon ships the same first stage, the same second stage, the same fairing, the same five PAFs to every customer. The mission is custom (orbit, payload mass, separation timing). The infrastructure is not. The cost of the second customer is dominated by mission-specific work, not by re-qualifying a new vehicle.

A team without a menu is running a custom integration shop in a product company's clothing. The 9× cost gap NAFCOM identified between traditional and lean acquisition (NAFCOM p.5) is partly this: the traditional path qualifies a new variant per customer; the lean path serves customers off the menu and keeps the variant count flat.

## Related skills

- Parent: [infrastructure](../SKILL.md)
- Pairs with: [versioned-specs](versioned-specs.md) (the menu has to carry a version and a changelog), [signed-contracts](signed-contracts.md) (the contract picks options off the menu)
- Compose with: first-principles-thinking (route via the infrastructure spine, then to first-principles-thinking) (decide menu size from cost floor, not from sales pressure), iterate-fast (route via the infrastructure spine, then to iterate-fast) (what survives iteration repeatedly becomes the standard)

## Source

- Primary: Falcon User's Guide §4.1.3 (5.2 m standard fairing; 18.7 m extended explicitly nonstandard), §4.1.5 (five PAF options enumerated), §4.1.4 Table 4-1 (mass capability per PAF), §9.3 (three clampband sizes), §2.1 (two-stage Falcon 9), §2.2 (Falcon Heavy = three F9 cores + same upper + same fairing; "commonality has also minimized infrastructure unique to the vehicle").
- Secondary: Falcon User's Guide §1.1 (user's guide scope), §3.1 Table 3-1 (insertion orbits offered as a menu), §10.1 (rollout-and-launch standard).

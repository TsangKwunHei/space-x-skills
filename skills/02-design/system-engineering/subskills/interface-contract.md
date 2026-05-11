---
name: interface-contract
description: Make every interface boundary in the system explicit, signed, versioned, and machine-checkable - not implicit, not verbal, not scattered across email and tickets. Use whenever defining or reviewing a boundary between two teams, services, vehicles, or organizations, or when the user mentions "ICD," "interface spec," "contract," "schema," "API definition," "spec mismatch," "two teams disagree," or "we never wrote it down." Especially load when designing handoffs, mating two subsystems built by different teams, or when an integration failure traces back to "we both thought the other side handled it."
---

# Interface Contract

Falcon's interface contract is a single document.

Falcon User's Guide §9.2 (p.70): "The mission manager will work with the customer to create a spacecraft-to-launch-vehicle interface control document (ICD): the master document for a Falcon launch vehicle mission. Following signature approval of the ICD, SpaceX maintains configuration control of the document."

One document. One owner. One version. Signature-gated. The ICD is signed at L-9 months; the vehicle does not launch without it.

Every interaction across the SpaceX–customer boundary - mechanical, electrical, thermal, coordinate-frame, schedule, deliverable - funnels through that one document. Sections 3 through 5 of the User's Guide are the "what to put in it"; the Appendices (E for CAD, F for dynamic models, G for thermal models, H for separation state vector format) are the "how to format it."

The interface is not a meeting; it is an artifact.

## What this is

An interface contract is the explicit, written, version-controlled, single-master, signature-gated specification of what crosses a boundary between two parts of a system.

Boundaries include: vehicle-to-payload, service-to-service, team-to-team, vendor-to-customer, ground-to-flight, contract-signature-to-mission-integration. The contract names every flow on every edge of the system graph in a form that both sides can parse, build to, and test against.

A contract has six properties:

- **Single master** - one canonical document, not Slack threads, not parallel team copies. The Falcon ICD lives under SpaceX configuration control after signature (Falcon User's Guide §9.2).

- **Signed** - both parties commit by signature; "we agreed on it in a meeting" is not a contract.

- **Versioned** - every revision has a number and an itemized changelog. The Falcon User's Guide front-matter Change Log shows v1 Oct 2015 → v8 Mar 2025, with each revision listing changed sections explicitly.

- **Machine-consumable** - the contract is parseable by tools, not just by humans. The Falcon coordinate frame (§4.1.1) is text - origin "440.69 cm (173.5 in.) aft of the first stage radial engine gimbal, with +X_LV aligned with the vehicle long axis and +Z_LV opposite the TE strongback" - not a labeled picture. The separation-state-vector delivery format is Appendix H, a parseable spec, not a PDF screenshot.

- **Complete** - every flow on the edge is named: mechanical, electrical, thermal, RF, coordinate-frame, schedule, environmental, regulatory.

- **Boundary-clean** - the contract cleanly separates "before signature, X owns; after signature, Y owns; this is the moment of handoff" (Falcon User's Guide §10.4 transition from spacecraft standalone operations to joint operations).

A boundary without a contract is not an interface. It is a mutual misunderstanding waiting to be discovered, usually during integration test or after launch.

## When to use this

- Whenever defining a boundary between two teams, services, vehicles, vendors, or organizations
- Before any joint-operations handoff (the L-7 Falcon transition from customer-owned to SpaceX-owned spacecraft processing, Falcon User's Guide §10.4)
- When two parties keep "agreeing" verbally and arriving at integration with mismatched assumptions
- When a coordinate frame, unit system, time zone, or schema is implicit and needs to become explicit
- When versioning a published spec - contracts must be versioned with itemized per-revision changelogs
- When designating decision authority - "who owns this decision" is itself an interface that needs a contract
- When data must flow between tools - the contract specifies the format (CAD, FEM, JSON, etc.), not "send me whatever you have"

## When NOT to use this

- For internal-only boundaries inside a single-owner module (the function call across a class boundary in one engineer's code does not need an ICD)
- For exploratory prototypes where the boundary may not exist next week
- For one-off scripts or data exchanges that will not recur
- When the boundary is genuinely loose (a debug log emitted to a file the dev reads sometimes); over-formalizing wastes the team's review budget

## How to apply

1. **Name the boundary.**

   "Spacecraft-to-launch-vehicle interface" (Falcon User's Guide §9.2, p.70). "Auth service to API gateway." "Customer ground station to range telemetry." Single sentence. If you cannot name it in a sentence, the boundary is too vague to contract.

2. **Enumerate every flow.**

   Walk every edge that crosses the boundary. For each, write down what crosses: mechanical load, electrical signal, propellant, RF, command, telemetry, signed deliverable.

   The Falcon ICD covers Sections 3–5 of the User's Guide: §3 mission integration parameters, §4 mechanical/electrical/RF interfaces, §5 environmental envelopes (loads, acoustics, shock, thermal). Nothing crosses that is not in the document.

3. **Specify each flow in machine-consumable form.**

   - For data: schema (JSON, Protobuf, FEM, CAD).
   - For coordinates: text frame definition with explicit origin, axes, units, subscripts.
   - For loads: numeric tables with statistical basis (P95/50, max-predicted-environment).
   - For shock: enumerated events with response spectra (Falcon User's Guide §5.3.5, p.38: "five events during flight result in shock loads" - each named).

   The receiver's tool must consume the spec directly, without re-typing.

4. **Designate single mastership.**

   One party owns configuration control of the document. The Falcon ICD: "Following signature approval of the ICD, SpaceX maintains configuration control of the document" (§9.2). Two-party mastership is no mastership.

5. **Define the signature gate.**

   When does the contract become binding? Falcon: at L-9 months, after "Completion of mission integration analyses" (Falcon User's Guide §9.4 Table 9-1, p.72). Before signature, the document is a draft. After signature, change requires versioned revision with itemized changelog. No silent updates.

6. **Define the handoff moment.**

   A contract specifies when ownership transitions. Falcon's L-7 transition from spacecraft-standalone operations to joint operations is the contract-defined moment when "All spacecraft processing operations within the PPF must be completed by L-7 days" - and SpaceX takes over (Falcon User's Guide §10.4). One side owns before, the other side owns after, zero overlap.

7. **Version with itemized changelog.**

   Every revision lists the changed sections. Falcon User's Guide v8 (Mar 2025) is the eighth revision since v1 (Oct 2015), and the front-matter Change Log lists section-by-section diffs against prior versions. Silent updates break integrators; itemized changelogs let them catch what changed.

8. **Test conformance both directions.**

   "ICD compliance verification is required prior to launch." For each clause in the contract, both sides need a test that the implementation satisfies it. Conformance verified one-sided is half a test.

## Worked example

**Falcon separation-state-vector contract** (Falcon User's Guide §9.4 Table 9-1, p.72; Appendix H delivery format).

Boundary: SpaceX upper-stage flight computer → customer mission control. Crosses at spacecraft separation.

Flows: position vector, velocity vector, attitude quaternion, attitude rate. Single text deliverable, not a PDF.

Specification:
- **Frame** - Earth-centered inertial frame defined in §4.1.1 of the User's Guide; right-handed; explicit origin and axis definitions in text, not picture.
- **Format** - Appendix H delivery-of-separation-state-vector format - parseable structure, fields named, units explicit.
- **Timing** - orbit injection report "Separation + TBD minutes" (§9.4 Table 9-1) - the quick-look report. The full flight report at L+8 weeks reports "the flight, environments, separation state, and a description of any mission-impacting anomalies and progress on their resolution." Two-speed reporting, both contractually specified.
- **Mastership** - SpaceX writes; customer consumes; SpaceX maintains configuration control (§9.2).
- **Signature gate** - ICD signed L-9 months (§9.4 Table 9-1) - Appendix H delivery format is part of the ICD bundle.
- **Versioning** - per Change Log, Appendix H content has revised between v1 and v8.

Conformance test: customer mission control parses the delivered file, computes their predicted post-separation orbit from it, and confirms the orbit matches the planned one within tolerance. SpaceX's side verifies the file was generated and transmitted to the agreed format. Two-sided conformance, both before flight (in the ICD compliance verification) and after.

The contrast: a verbal "we'll send you the state vector at separation, you know how to read it" agreement. Different time zone? Different frame convention? Different unit system? Stage 2 GN&C uses Frame A, customer's flight ops uses Frame B, neither side wrote down which? "We never write it down" is a category of system failure that disappears the day the contract is written.

## Anti-pattern

CRS-7 telemetry implementation documentation gap (CRS-7 IRT TF-4 and TR-3, page 8). The new "non-deterministic network packets in their flight telemetry" architecture had no contract documenting its delivery semantics. Latency, ordering, durability, and buffering behavior were emergent properties, not specified properties. When the 800–900 ms anomaly hit, "substantial portions of the anomaly data being lost due to network buffering in the Stage 2 flight computer" (TF-4). The IRT's recommendation was explicit (TR-3): "SpaceX needs to re-think new telemetry architecture and **greatly improve their telemetry implementation documentation**." The interface between flight-software-emitting-telemetry and ground-receiving-telemetry was not contracted; the receiver had no specification of what was guaranteed to arrive, in what order, with what latency.

The Maraia eyebolt + burn-circuit cascade (Maraia paper page 5 §III.A) hit the same anti-pattern at the electrical-mechanical boundary. The contract between the mechanical attach (eyebolt) and the electrical command path (burn circuit) did not specify behavior under twist. "The twisting of the capsule during ascent caused the electrical connection of the burn circuit to pull loose from the power source." The mechanical side and the electrical side were each individually correct under their assumed conditions; the boundary between them - what twists are tolerable, what mating method survives them - was not contractually specified. Fix: "(The electrical setup of this system was modified for future flights.)" The contract was rewritten implicitly via design change; the explicit boundary spec is the durable artifact, not the design change alone.

## Related skills

- Parent: [system-engineering](../SKILL.md)
- Pairs with: [system-graph-mapping](system-graph-mapping.md) (every edge is a candidate boundary needing a contract), signed-contracts (route via your parent spine to infrastructure) (the signature half of the contract), versioned-specs (route via your parent spine to infrastructure) (the versioning half)
- Compose with: machine-consumable-artifacts (route via your parent spine to infrastructure) (specs as data, not pictures), [apex-identification](apex-identification.md) (apex contracts get heaviest review)

## Source

- Primary: Falcon User's Guide §9.2, p.70 (ICD as "the master document for a Falcon launch vehicle mission"; "SpaceX maintains configuration control of the document"); §9.4 Table 9-1, p.72 (signature at L-9 months; itemized launch integration schedule); Appendix H (separation state vector delivery format); §4.1.1 (LV coordinate frame defined in parseable text); §10.4 (L-7 transition from standalone to joint operations).
- Secondary: Falcon User's Guide front-matter Change Log (v1 Oct 2015 → v8 Mar 2025, itemized per-revision changelog); §5.3.5, p.38 (five named shock events with bounded contracts); CRS-7 IRT TF-4 and TR-3, page 8 (telemetry contract gap as anti-pattern); Maraia paper page 5 §III.A (eyebolt-to-burn-circuit boundary not contracted under twist conditions).

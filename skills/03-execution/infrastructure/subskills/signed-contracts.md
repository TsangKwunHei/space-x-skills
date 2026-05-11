---
name: signed-contracts
description: A boundary that is not a signed, version-controlled, single-owner artifact is not infrastructure - it is risk. Use this skill when the work involves an interface, an SLA, an integration, an API contract, an ICD, an SOW, an acceptance test plan, a spec annex, factors of safety committed to a customer, retest triggers, payload deliverables, or any place where two parties need to agree on what gets delivered, by whom, by when, with what acceptance criteria. Especially load this skill when a boundary lives across Slack threads, email chains, Jira tickets, or a Google Doc nobody owns.
---

# Signed Contracts

The Falcon User's Guide §9.2 is unambiguous about what an interface is. "The mission manager will work with the customer to create a spacecraft-to-launch-vehicle interface control document (ICD): the master document for a Falcon launch vehicle mission. Following signature approval of the ICD, SpaceX maintains configuration control of the document."

One artifact. One owner of the master after signature. One signature date that gates all further work. Customer input is required up to that signature; control is unitary after it. (Falcon User's Guide §9.2.)

That is what an interface looks like as infrastructure. Anything weaker - a draft, a thread, a "we both have a copy" - is not an interface. It is a mutual misunderstanding waiting to be discovered at integration.

## What this is

A signed contract is a bilateral commitment artifact. It names what gets delivered, by whom, by when, in what format, with what acceptance criteria. It carries factors of safety as numbers, retest triggers as conditions, and the format of every handoff explicitly. It has a single owner of the master after signature and a published version. Each change is itemized.

The Falcon ICD is the canonical example. It is signed at L-9 months, after mission integration analyses complete (Falcon User's Guide §9.4 Table 9-1). Before signature, there is no interface - there is a draft. After signature, every change passes through configuration control owned by exactly one party.

## When to use this

- A team is about to commit to deliver something to another team or to a customer
- An "interface" is currently a Slack thread, an email chain, a Jira ticket, or a shared Google Doc with no version history
- Factors of safety, retest thresholds, acceptance criteria, or handoff formats are being discussed verbally
- Two parties have "aligned" but neither can name the artifact, version, owner, or signature date
- A customer is about to be onboarded and you have no master document to point them at
- Integration is approaching and the deliverable list is implicit
- A boundary spans an org, a vendor, a regulator, or any party not in the same standup

## When NOT to use this

- The work is exploratory, pre-commitment, or research with no downstream party - write a doc but do not pretend it is a contract
- One side has unilateral authority to change the spec and the other side accepts that - the contract is then "whatever the owner publishes," which is a degenerate case
- The boundary is internal to a single team that controls both sides - overhead exceeds value
- The artifact would block work that needs to ship today and the cost of a bad handoff is recoverable in hours, not weeks

## How to apply

1. **Name the artifact.** Pick the document type (ICD, API spec, SOW, ATP). One file. One canonical location. If the artifact does not have a name, the contract does not exist.

2. **Name the owner.** Exactly one organization owns the master after signature. "We both maintain a copy" is not ownership; it is two drifting forks. Falcon User's Guide §9.2: "SpaceX maintains configuration control of the document." Customer input is required up to signature; control is unitary after.

3. **Name the signature date.** The Falcon ICD signs at L-9 months (Falcon User's Guide §9.4 Table 9-1). Pick yours. Before signature, the document is a draft and a draft is not a commitment. After signature, configuration control kicks in.

4. **Enumerate the deliverables on both sides.** Falcon User's Guide §9.5 Tables 9-2 and 9-3 list customer deliverables: payload safety data, finite-element and CAD models, environment analysis inputs, ICD inputs, environmental test statement and data, launch site operations plans, mission data; plus FAA payload determination information, launch site visitor information, and GSE details for non-US persons. Each named, each owed by a date, each in a format the receiver's tool consumes.

5. **Carry numeric acceptance criteria in the artifact.** Factors of safety as numbers (Falcon User's Guide §6.1 Table 6-1: yield 1.10, ultimate flight 1.25, ultimate ground ops 1.40, GSE lifting yield 3.0 / ultimate 4.0). Retest triggers as conditions (Falcon User's Guide §7.3 Table 7-2: Type 1 penalty retest for workmanship; Type 2 delta qualification for design or production process changes). Numbers in the contract beat narrative every time.

6. **Specify handoff formats.** Not "send the model"; "send the FEM in the format Appendix F specifies" (Falcon User's Guide Appendices E, F, G, H cover CAD, dynamic models, thermal models, separation state vector format). Format is part of the contract. See [machine-consumable-artifacts](machine-consumable-artifacts.md).

7. **Pair the contract with a single point of contact.** Falcon User's Guide §9.2: "SpaceX provides each Falcon launch services customer with a single technical point of contact from contract award through launch." The artifact is necessary; the human who owns escalation is necessary too. Do not skip either.

8. **Version the artifact and publish itemized changelogs.** See [versioned-specs](versioned-specs.md). A contract that drifts silently is worse than no contract.

## Worked example

A team ships a payment service. The "interface" is currently:

- An OpenAPI YAML in the service's repo, last updated three months ago
- A Notion page documenting webhook payloads, owned by nobody on the calendar
- A Slack thread where the on-call engineer answered "what does field `status` mean" twice last quarter
- A Confluence page describing the SLA, last touched eighteen months ago

Apply the skill:

- **Artifact**: One signed integration spec. Markdown in a versioned repo, with the OpenAPI YAML as Appendix A, the webhook payload schemas as Appendix B (JSON Schema), the SLA as Appendix C. (Falcon User's Guide §9.2 calls the ICD "the master document"; pick a single name and stick to it.)
- **Owner**: The platform team owns the master after signature. Customer teams provide input via PRs into the platform repo until the version is cut.
- **Signature date**: T-2 weeks before each customer team's go-live. Falcon equivalent: L-9 months for ICD signature (§9.4 Table 9-1).
- **Deliverables**: Customer team owes (a) traffic forecast in JSON, (b) test fixtures matching their integration, (c) on-call rotation contacts. Platform team owes (a) staging endpoint with stable URL, (b) production endpoint with stable URL, (c) sandbox credentials, (d) SLO numbers in the contract.
- **Acceptance criteria**: p99 latency < 200ms at 1000 RPS sustained for 1 hour. Error rate < 0.1% over a rolling 7-day window. Specific numbers, not "fast and reliable."
- **Retest triggers**: Type 1 (workmanship) - any breaking change to the payload schema requires re-running the customer's integration test suite; Type 2 (design change) - any change to the auth model requires the customer team to re-sign. (Falcon User's Guide §7.3 Table 7-2 maps to this.)
- **Format**: Webhook payloads as JSON Schema, not "see this example." Test fixtures as runnable Postman / Bruno collections, not screenshots.
- **Single point of contact**: One named platform engineer, on the calendar, with escalation rules.
- **Version**: v1.0 at signature. Each subsequent revision lists changed sections.

The "interface" went from four loose surfaces with no owners to one signed artifact with a date, a version, a master owner, and an itemized deliverable list. The cost of an integration bug at customer go-live drops by an order of magnitude, because there is now one place to look.

## Anti-pattern

The "interface that lives nowhere": Slack threads, email chains, Jira tickets, a Google Doc that nobody owns and nobody version-controls, three half-aligned mental models on each side of a boundary.

There is no interface here. There is a mutual misunderstanding waiting to surface at integration. The cost of discovering it then - at L-2 days during a launch campaign, or two weeks before the customer's go-live - is the entire reason ICDs exist.

The Falcon User's Guide §1.1 is explicit about scope: "This user's guide is intended for pre-contract mission planning and for understanding SpaceX's standard services. The user's guide is not intended for detailed design use. Data for detailed design purposes will be exchanged directly between a SpaceX customer and a SpaceX mission manager." Even the user's guide knows it is not the contract. The ICD is the contract. The user's guide is the menu.

If your "interface" cannot be named with a document, a version, an owner, and a signature date, it does not exist as infrastructure. It exists as risk.

## Related skills

- Parent: [infrastructure](../SKILL.md)
- Pairs with: [versioned-specs](versioned-specs.md) (the contract has to carry a version and a changelog), [machine-consumable-artifacts](machine-consumable-artifacts.md) (handoff format is part of the contract)
- Compose with: [standard-menu](standard-menu.md) (the contract picks options off the menu and prices exceptions visibly), pre-commitment-gate (route via your parent spine to feedback-loops) (the signature date is itself a pre-commitment gate)

## Source

- Primary: Falcon User's Guide §9.2 (mission manager + ICD as master document, configuration control after signature), §9.4 Table 9-1 (L-9 months signature), §9.5 Tables 9-2, 9-3 (customer deliverables enumerated), §6.1 Table 6-1 (factors of safety as numbers), §7.3 Table 7-2 (Type 1 / Type 2 retest triggers).
- Secondary: Falcon User's Guide §1.1 (user's guide is not the contract; ICD is), §9.5.4 (anomaly cooperation clause as committed contract behavior).

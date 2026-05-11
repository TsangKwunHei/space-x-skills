---
name: infrastructure
description: Infrastructure is signed contracts, a small standard menu, machine-consumable artifacts, versioned specs, and lean orgs. Load this skill whenever the work touches "platform," "API contract," "interface," "integration," "service boundaries," "developer experience," "scaling team," "cost reduction," "consolidation," "spec versioning," "config management," or "internal tooling." Infrastructure is the difference between building one rocket and building a launch service that 1000 customers integrate with - get this wrong and your real cost is 9× what physics demands.
---

# Infrastructure

In late 2010, NASA used its own cost model - NAFCOM, the NASA-Air Force Cost Model - to estimate what Falcon 9 development would have cost two ways. Same rocket. Same mass (45,586 lbs). Same engines, same stages, same physics.

Under "traditional NASA environment/culture," cost-plus-fee acquisition: **$3,977M**.
Under firm-fixed-price commercial acquisition: **$443M**.

Roughly 9× spread. The cost model named the drivers in priority order, and not one of them is physics:

1. Acquisition Strategy - Oversight vs No Oversight
2. Requirements Stability - Unstable vs Stable
3. Team Efficiency - Less Efficient vs Efficient
4. Management Structure - Less Lean vs Lean
5. Early-Phase Sys. Engineering - Less Disciplined vs Disciplined
6. Funding Commitment - Annual vs Fixed

All six are infrastructure decisions. Contracts. Org structure. How specs are written and frozen. How money is committed. None of them are about the metal.

From the same NASA report, on what makes NASA's normal mode so expensive: SpaceX estimates "every dollar sent out of the company actually costs between $3 and $5 based on subcontractor overhead and profit." A $1 service that crosses an org boundary costs $3 to $5.

That is the cost of building products instead of infrastructure.

## What this is

Infrastructure is the work that makes the second customer cheap and the thousandth nearly free. It is signed contracts at every boundary, a small standard menu with priced exceptions, machine-consumable artifacts, versioned specs with itemized changelogs, and a lean org with no passthrough layers.

The product is the rocket. The infrastructure is the Falcon User's Guide, the ICD, the five PAFs, the three clampbands, the eight versions over ten years, the Mission Manager, and the org chart you can fit on one page.

When you build for the second customer, the cost of the thousandth approaches zero. When you build for the first only, the second costs what the first did, and the thousandth cost is the first cost times one thousand. NAFCOM put a number on the difference: 9×.

## In practice

### The disciplined move: one signed ICD per boundary, with one party owning the master

The Falcon User's Guide §9 names the Mission Manager as the single point of contact and is explicit about the artifact: "the mission manager will work with the customer to create a spacecraft-to-launch-vehicle interface control document (ICD): the master document for a Falcon launch vehicle mission. Following signature approval of the ICD, SpaceX maintains configuration control of the document."

Customer input is required. The master is owned by exactly one party. Signature lands at L-9 months, after mission integration analyses complete. Before that signature, there is no interface - there is a draft. After it, every change is versioned through one document.

### The disciplined move: small standard menu, exceptions priced visibly

Falcon offers exactly five Payload Attach Fittings: 1,575 mm, 2,624 mm, 3,117 mm circular, 3,117 mm strut, and Square. Exactly three clampbands: 937, 1,194, 1,666 mm. Standard fairing: 5.2 m × 13.2 m.

The 18.7 m extended fairing is offered "as a nonstandard service." That phrase appears repeatedly in the User's Guide for: extended fairing, additional fairing access doors, internal fairing RF antenna, breakwire signal, cryogenic propellant loading, GN₂ purge, separate EGSE power, customer processing off-site.

The label is the point. "Nonstandard" makes the customer feel the deviation. If most customers are asking for the exception, the exception is the new standard - promote it explicitly or kill it. Do not let it silently become the common path at standard pricing.

### The disciplined move: machine-consumable artifacts

Customer deliverables (Falcon User's Guide Tables 9-2 and 9-3) require CAD models, finite-element models, thermal models, separation state vectors. Appendix E specifies CAD model requirements. Appendix F covers dynamic models. Appendix G covers thermal. Appendix H specifies the delivery format of the separation state vector.

Not screenshots. Not PDFs of tables. Not a Word document describing a schematic. The receiving tool consumes the file directly. The handoff is data, not narrative.

If a downstream team has to retype, re-mesh, or re-derive what an upstream team already had in a tool, your handoff is wrong-format. The artifact is a transcription error waiting to happen.

### The disciplined move: versioned spec with itemized changelog

The Falcon User's Guide has 8 versions over 10 years:

- v1 - Oct 2015
- v2 - May 2016
- v3 - Jan 2019
- v4 - Apr 2020
- v5 - Aug 2020
- v6 - Aug 2021
- v7 - Sep 2021
- v8 - Mar 2025

The v8 changelog is itemized: Section 3.3 Launch Windows, Section 3.6 Multiple Payloads & Constellation, Section 4 Interfaces, Section 5 Environments, Section 6 Payload Design Requirements, Section 7 Verification, Appendices A–I.

Front matter: "SpaceX reserves the right to update this user's guide as required. Future revisions are assumed to always be in process as SpaceX gathers additional data and works to improve its launch vehicle design."

Translation: the spec is alive, and every revision tells integrators exactly which sections moved. Customers can audit the diff. Trust is preserved because surprise is eliminated.

### The disciplined move: lean org

NAFCOM's six drivers map directly to org structure. Oversight or no oversight. Lean management or layered. Efficient team or inefficient. The 9× cost gap is what the layers buy you - and not one of those drivers is engineering or safety.

The $3-$5 cost per outsourced dollar tells you the same thing from a different angle. Every boundary an action crosses is a tax. A hundred-engineer team with no subcontractors and one decision-maker per boundary outperforms a thousand-engineer program where every interface routes through three companies and four contracting offices.

Strip the layers. Co-locate design with production with QA, as Hawthorne does - Falcon User's Guide §1.4: "vehicle design teams are co-located with production and quality assurance staff to tighten the critical feedback loop."

### The trap: the interface that lives nowhere

Slack threads. Email chains. Jira tickets. A Google Doc that nobody owns and nobody version-controls. Three half-aligned mental models on each side of a boundary.

There is no "interface" here. There is a mutual misunderstanding waiting to be discovered at integration. The cost of discovering it then, on a Friday two weeks before ship, is the entire reason ICDs exist.

If the boundary cannot be named with a document, a version, an owner, and a signature date, it does not exist as infrastructure. It exists as risk.

## How to apply

1. **Name the boundaries.** Walk your system. Where does one team's responsibility end and another's begin? Each boundary is a candidate for an ICD. Most teams have far more boundaries than ICDs. The gap is the work.

2. **Sign one ICD per boundary, with one party owning the master.** Following signature, configuration control belongs to one organization. Customer input is required up to signature; ownership is unitary after. No "we both keep a copy."

3. **Publish a small standard menu.** Five PAFs and three clampbands beat fifty bespoke options. Print the menu. Mark exceptions as "nonstandard" explicitly so the cost is visible to whoever asks for them. If the exception becomes common, promote it to standard - do not let standard quietly mean "whatever the customer asked for."

4. **Ship machine-consumable artifacts.** CAD, JSON, Parquet, FEM, structured state vectors. Never ship a screenshot or a PDF of a table when the receiver's tool consumes a file. The format of the handoff is part of the contract.

5. **Version the spec; publish itemized changelogs.** Eight versions over ten years, each with a section-level diff. If you ship "v2," the customer can list what changed against v1 without asking. Silent updates destroy trust faster than bugs.

6. **Run lean. Count the layers and count the passthrough cost.** Each management layer is a delay. Each subcontractor handoff costs $3 to $5 per dollar of work. NAFCOM's 9× was driven by oversight, requirements churn, less-lean management, less-disciplined early-phase systems engineering, annual funding - not by engineering and not by safety. Strip what cost analysis flags as overhead.

## Do

- Publish the menu. Five PAFs and three clampbands beat fifty bespoke options. Make standard cheap and nonstandard explicit.
- Sign one ICD per boundary, with one party owning the master. Configuration control is unitary after signature.
- Ship machine-consumable artifacts. CAD, FEM, JSON, Parquet, state vectors - not PDFs and not screenshots.
- Version the spec and publish itemized changelogs. Each revision lists the changed sections.
- Co-locate design, production, and QA where possible. Latency between deciding and discovering dominates.
- Count $3 to $5 of cost per outsourced dollar before deciding to outsource. Do the math before crossing the boundary.
- Promote a "nonstandard" exception to "standard" when most customers are asking for it. Do not leave it ambiguous.

## Do not

- Do not let interfaces live across Slack threads, email, Jira tickets, and a shared Google Doc with no revision history. That is not an interface. That is a future incident.
- Do not silently update specs. If you ship "v2," publish the diff against v1, by section.
- Do not ship screenshots, PDFs of tables, or Word docs describing schematics when CAD or JSON is what the receiver actually needs. The format is part of the contract.
- Do not assume bureaucracy is the cost of safety. NAFCOM's 9× gap was driven by acquisition strategy, requirements stability, team efficiency, management leanness, early-phase discipline, and funding commitment - none of which are safety.
- Do not let "nonstandard" silently become "common." If most customers are asking for the exception, it is a standard. Print it on the menu or stop offering it.
- Do not split design from production from QA. Co-locate. Tickets between buildings have a multi-week latency that compounds across every cycle.
- Do not assume the org chart is the decision tree. The Mission Manager is the single technical point of contact across every internal silo for a reason.

## Connects to

- **architecture** - architectural decisions (factor-of-safety tables, forbidden pressure-vessel types, inhibit counts by hazard class) belong in versioned ICDs and published spec sections, not in private design notes. Architecture without infrastructure is a custom build per customer.
- **iterate-fast** - what survives iteration repeatedly becomes the standard menu. Five PAFs is the answer after many flights, not the assumption beforehand. Do not standardize until you have evidence; do not refuse to standardize after you have it.
- **first-principles-thinking** - strip the cost to its drivers (workforce, organizational complexity, infrastructure utilization) before you accept any budget. The NAFCOM analysis is itself a first-principles cost teardown: it names the six knobs and shows the 9× spread between settings.
- **system-engineering** - every interface is a failure waiting. Counting and deleting interfaces is a primary design move; the ones that survive the cut are the ones that earn an ICD.

## Sub-skills

| Sub-skill | When to load |
|---|---|
| [signed-contracts](subskills/signed-contracts.md) | Bilateral commitment artifacts - what, by whom, by when, with what acceptance criteria |
| [standard-menu](subskills/standard-menu.md) | Customer-facing options should be a small versioned set, not infinite custom |
| [machine-consumable-artifacts](subskills/machine-consumable-artifacts.md) | Specs are PDFs; need them as code so downstream tools can ingest them |
| [versioned-specs](subskills/versioned-specs.md) | Specs change without semver; integrators silently break |
| [lean-org-pattern](subskills/lean-org-pattern.md) | Subcontractor and oversight overhead is multiplying labor cost 3-5× |

## Related spine skills

- [first-principles-thinking](../../01-foundation/first-principles-thinking/SKILL.md) - first-principles names the floor; infrastructure makes the second customer cheap and the thousandth nearly free
- [feedback-loops](../../02-design/feedback-loops/SKILL.md) - infrastructure ships the feedback loops to others; co-location and two-speed reporting compose
- [architecture](../../02-design/architecture/SKILL.md) - architecture decides what's standard; infrastructure publishes the menu

---

Most teams build products where they should build infrastructure. They ship a custom integration for the first customer, a slightly different custom integration for the second, and by the tenth they are running ten parallel codebases none of which gets enough attention to stay reliable. NAFCOM put a 9× number on what that costs.

The fix is not glamorous. Draw the boundaries. Print the menu. Sign the ICD. Ship the CAD file instead of the screenshot. Publish the diff against v1. Count the layers and strip the ones the cost analysis says are overhead, not safety.

The product is what the customer touches. The infrastructure is everything that makes the second customer cheap and the thousandth nearly free. **Draw the boundaries today. Sign the first ICD this week. Print the menu before the next customer asks. The 9× is sitting on the table waiting for you to take it.**

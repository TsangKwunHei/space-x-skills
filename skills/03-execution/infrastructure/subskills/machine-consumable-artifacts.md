---
name: machine-consumable-artifacts
description: A handoff format that the receiver's tool consumes directly is part of the contract; PDFs of tables, screenshots, Word docs describing schematics, and prose narratives describing data are infrastructure debt. Use this skill when a team is shipping a spec, deliverable, model, dataset, geometry, schedule, environment definition, configuration, or any artifact a downstream system has to ingest. Especially load this skill when the phrase "I'll send you a PDF," "here's a screenshot of the table," or "let me describe the schema" appears, when a downstream team is retyping or re-meshing what an upstream team already has in a tool, or when a "spec" is a document instead of code/data.
---

# Machine-Consumable Artifacts

The Falcon User's Guide §9.5 lists customer deliverables in Tables 9-2 and 9-3, and Appendices E, F, G, H specify the exact format of each. CAD models per Appendix E. Finite-element models per Appendix F. Thermal models per Appendix G. Separation state vector per Appendix H. Not screenshots. Not PDFs of tables. Not Word documents describing geometry. The receiving tool consumes the file directly.

The discipline shows up across the document. §6.4 specifies environments as numeric tables. §3.6 specifies multi-payload CG constraints as numbers ("the maximum CG shift Δ (above the PAF) that is allowed between orbits or burns is 5 cm RSS lateral"). §7.2 Table 7-1 categorizes test types as REQUIRED / Advised / See guide - a structured matrix, not narrative. §10.7 publishes mission timelines (Tables 10-3, 10-4) as time-keyed event tables suitable for direct simulator ingestion.

The handoff format is part of the contract. If the upstream team has the data in a tool, the downstream team should receive it in a form their tool can consume - not a transcription error waiting to happen.

## What this is

A machine-consumable artifact is a deliverable that a receiving system can ingest directly without human re-typing, re-meshing, or re-deriving. It is CAD when CAD is the receiver. JSON when an API is the receiver. CSV/Parquet when a dataframe is the receiver. JSON Schema when validation is the receiver. A runnable test fixture when a CI pipeline is the receiver. A YAML config when a deploy tool is the receiver.

The opposite - a PDF of a table, a screenshot of a schematic, a Word document narrating a data model, a wiki page describing a JSON shape - forces the receiver to translate. Translation is where bugs live. Every translation step is a transcription error waiting to happen, and the translator's notes do not survive the next person's re-translation.

## When to use this

- A spec is being delivered to a downstream team that will implement against it
- A model (CAD, FEM, thermal, simulation) is being handed across a team boundary
- A dataset is being shipped as part of a deliverable
- A schedule, timeline, or sequence is being shared with an integration partner
- An environment definition (loads, temperatures, vibration, EMC) is being committed to in a contract
- A configuration (deploy target, runtime versions, feature flags) is being handed across infra/app boundaries
- An API contract is being shipped - the OpenAPI YAML / GraphQL SDL / Protobuf is the artifact, the prose is commentary
- The phrase "I'll send you a PDF of the table" appears in any planning conversation

## When NOT to use this

- The artifact is genuinely narrative (a strategy doc, a postmortem, a design rationale) where prose is the point - though even there, embed numbers and tables in machine-readable form
- The receiver is a human reading for context, not a tool ingesting for execution
- The cost of producing the machine-readable form exceeds the lifetime cost of human translation (rare for repeated artifacts; common for one-offs)
- The artifact is so unstable that fixing the format prematurely locks in errors - but in that case, fix the format alongside the first stable version, not after

## How to apply

1. **Identify the receiver.** Who or what consumes this artifact? A simulator? A code generator? A CI pipeline? A human reviewer? The receiver's preferred format dictates the artifact's format. Falcon User's Guide Appendix F covers dynamic models because the receiver is a coupled-loads analysis tool; Appendix H covers separation state vectors because the receiver is a flight dynamics simulator.

2. **Pick a format the receiver can ingest directly.** CAD → STEP / IGES / native CAD format. Geometry → STL / mesh. FEM → Nastran bulk data / Abaqus input / native solver format. API → OpenAPI / GraphQL SDL / Protobuf. Schedule → ICS / structured CSV with named columns. Environment → numeric tables (CSV / Parquet) with units. Config → YAML / TOML / JSON.

3. **Specify the format in the contract.** Falcon User's Guide §9.5 Tables 9-2, 9-3 list deliverables; Appendices E–H specify formats. Pair them. A deliverable in the contract without a format spec is a deliverable where format will be argued at integration time. See [signed-contracts](signed-contracts.md).

4. **Refuse the wrong format at the boundary.** If the receiver's tool consumes JSON and the sender ships a PDF of the table, the receiver should reject the artifact, not transcribe it. Transcription quietly trains the team that PDFs are acceptable. Rejection makes the format part of the contract in practice as well as in writing.

5. **Make the format authoritative.** If the CAD file and the PDF drawing disagree, the CAD file wins. State this in the contract. Otherwise the human-readable form drifts from the machine-readable form and downstream tools silently work against the wrong version.

6. **Provide the converters once, not per customer.** If a downstream team genuinely needs a PDF for a review meeting, generate it from the machine-readable source on demand. Do not maintain two parallel artifacts. The PDF is a view; the data file is the truth.

7. **Validate at the receiver.** A JSON Schema check at the API boundary, a units check at the data import, a format check at the CAD ingest - every machine-consumable artifact should be validated by the receiving tool. Errors caught at handoff are cheap; errors caught at integration are expensive.

## Worked example

A team ships an environment spec to integration partners. The current spec is a 40-page PDF with vibration tables, thermal envelopes, EMC compatibility matrices, and shock profiles, all embedded as images of Excel tables.

Integration partners email back questions: "Is the vibration spec in the PDF the qualification level or the acceptance level?" "What units is the thermal table in - C or K?" "Did the EMC matrix update in v3 of the PDF; the table looks similar?" Each question is a translation error catching fire.

Apply the skill:

- **Receiver identification**: Partners run a coupled-loads analysis (CLA) tool that ingests random vibration PSD as CSV; a thermal analysis tool that ingests temperature/time profiles as CSV; an EMC compliance script that reads YAML.
- **Format**: Vibration PSD as CSV with named columns `freq_hz, asd_g2_per_hz, level` (qualification or acceptance) and units in the column names. Thermal profiles as CSV with `time_s, temperature_K`. EMC matrix as YAML mapping `band_name -> {min_freq_hz, max_freq_hz, max_field_strength_v_per_m, source_section}`.
- **Specification**: A new Appendix F-equivalent in the contract spec, listing each artifact, its format, and a JSON Schema / column schema for validation. (Falcon User's Guide §9.5 Tables 9-2, 9-3 + Appendices F, G, H is the model.)
- **Refusal**: When a partner asks "can you send the PDF version for our review meeting?" - generate the PDF view from the CSV/YAML on demand. Do not maintain a parallel PDF.
- **Authority**: The CSV / YAML files are the contract. The PDF is a generated view. State this in the spec.
- **Validation**: A Python script, shipped in the spec repo, that loads each artifact and runs schema / units / range checks. Partners run it at ingest. Errors fail loudly.

Three rounds of email translation per integration go to zero. The spec is now diff-able (line-by-line CSV / YAML diffs), promotable to versioned releases (see [versioned-specs](versioned-specs.md)), and ingestable by the partner's tool without human transcription.

## Anti-pattern

The "spec is the PDF" trap. A spec lives as a 40-page PDF with embedded screenshots of Excel tables. Every downstream consumer transcribes the data into their tool. Every transcription introduces errors. The spec gets revved; some downstream consumers update; some do not. The drift is invisible until integration.

The Falcon User's Guide is itself a PDF - but it explicitly says "This user's guide is intended for pre-contract mission planning and for understanding SpaceX's standard services. The user's guide is not intended for detailed design use. Data for detailed design purposes will be exchanged directly between a SpaceX customer and a SpaceX mission manager" (§1.1). The PDF is the menu; the contract carries the machine-readable artifacts. Two roles, two formats.

A team that ships its spec as a PDF and expects downstream consumers to implement against the PDF has confused the menu with the contract. The PDF is for humans deciding whether to engage. The CAD / JSON / CSV / OpenAPI is for tools doing the work.

## Related skills

- Parent: [infrastructure](../SKILL.md)
- Pairs with: [signed-contracts](signed-contracts.md) (handoff format is part of the contract), [versioned-specs](versioned-specs.md) (machine-readable formats diff cleanly; PDFs do not)
- Compose with: feedback-loops (route via the infrastructure spine, then to feedback-loops) (validation at handoff is the loop closing at the right rung), system-engineering (route via the infrastructure spine, then to system-engineering) (the artifact is the wire; the format is the protocol)

## Source

- Primary: Falcon User's Guide §9.5 Tables 9-2, 9-3 (customer deliverables enumerated), Appendices E (CAD), F (dynamic / FEM models), G (thermal models), H (separation state vector format) - handoff formats explicitly specified.
- Secondary: Falcon User's Guide §6.4 (environments as numeric tables), §3.6 (CG shift constraint as a number, "5 cm RSS lateral"), §7.2 Table 7-1 (test categories as a structured REQUIRED / Advised matrix), §10.7 Tables 10-3, 10-4 (mission timelines as time-keyed event tables), §1.1 (user's guide is the menu, ICD carries the design data).

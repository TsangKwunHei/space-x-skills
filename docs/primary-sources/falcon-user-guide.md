# Source: Falcon User's Guide v8

**Title:** *Falcon User's Guide* (Falcon 9 / Falcon Heavy Launch Vehicle Reference)
**Author:** Space Exploration Technologies Corp. (SpaceX)
**Date:** May 2025 (version 8)
**Status:** Copyrighted by SpaceX. Short attributed quotes used here under fair use for commentary, criticism, teaching, and education.
**Format:** ~70-page PDF
**Local copy:** `/Users/kwun/ppt/falcon-users-guide-2025-05-09.pdf`

## What it is

SpaceX's customer-facing reference document for Falcon 9 and Falcon Heavy. Describes vehicle architecture, performance, interface specifications, mission integration, and standard services. Versioned (currently v8); customers can pin to a specific version.

## Why it's in this corpus

The User's Guide is the cleanest publicly available example of these patterns:

1. **Two-stage architecture rationale** stated explicitly - design choice tied to failure-mode reduction, not catalog.
2. **Falcon Heavy as composition** - three F9 first stages + same upper stage + same fairing, "fully benefiting from the flight heritage."
3. **Hold-down / pre-commitment gate** (§10.5.5) - engines light, flight computer evaluates, hydraulic release at T-0 only on nominal.
4. **Two-speed reporting** - orbit injection report at separation+offset; full flight report at L+8 weeks.
5. **Co-location** - Hawthorne houses Dragon, Falcon 9, Falcon Heavy, Merlin under one roof; "vehicle design teams are co-located with production and quality assurance staff to tighten the critical feedback loop" (§1.3).
6. **Reuse statistics** - 384+ booster re-flights and 307+ fairing re-flights at 100% success rate (as of February 2025), with explicit framing as instrumentation: "lessons that can only be learned from flight."
7. **Standard menu** - small set of fairings, payload adapters (PAFs), orbit and inclination options.
8. **ICDs as master document** - bilateral commitment artifacts with single point of contact.
9. **Machine-consumable artifacts** - appendices with CAD, dynamic models, thermal models, separation state vector format.
10. **Versioned specs** - visible semver, change notes per release, customer can pin against a specific version.

## Where it appears in the skills

Almost every skill in the set draws from the Falcon User's Guide. Highlights:

| Skill | Section anchor |
|---|---|
| [feedback-loops](../../skills/feedback-loops/SKILL.md) | §1.3 (co-location), §10.5.5 (hold-down), reporting cadence |
| [co-location-pattern](../../skills/co-location-pattern/SKILL.md) | §1.3 verbatim |
| [pre-commitment-gate](../../skills/pre-commitment-gate/SKILL.md) | §10.5.5–§10.5.6 |
| [two-speed-reporting](../../skills/two-speed-reporting/SKILL.md) | Orbit injection vs flight reports |
| [recovery-as-instrumentation](../../skills/recovery-as-instrumentation/SKILL.md) | §1.3 reuse statistics + framing |
| [re-derive-from-physics](../../skills/re-derive-from-physics/SKILL.md) | Two-stage rationale |
| [standard-menu](../../skills/standard-menu/SKILL.md) | Fairings, PAFs, orbit options |
| [signed-contracts](../../skills/signed-contracts/SKILL.md) | ICDs, single point of contact |
| [machine-consumable-artifacts](../../skills/machine-consumable-artifacts/SKILL.md) | Appendices with CAD / dynamic / thermal / state-vector formats |
| [versioned-specs](../../skills/versioned-specs/SKILL.md) | The User's Guide is itself the example; v8 May 2025 |
| [interface-contract](../../skills/interface-contract/SKILL.md) | Mechanical / electrical / thermal interface specs |
| [analogy-detector](../../skills/analogy-detector/SKILL.md) | The 60-year reuse-impossible consensus, broken |

## Selected direct quotes (short, attributed)

- §1.3: "vehicle design teams are co-located with production and quality assurance staff to tighten the critical feedback loop."
- §1.3: "By re-flying boosters and fairings, SpaceX increases reliability and improves its designs and procedures by servicing and inspecting hardware as well as incorporating lessons that can only be learned from flight."
- §1.3: "the two stage Falcon 9 architecture was selected to minimize the number of stage separation events, eliminating potential failure modes associated with third and fourth stage separations."
- §10.5.5: "Engine ignition occurs shortly before liftoff, while the vehicle is held down at the base via hydraulic clamps. The flight computer evaluates engine ignition and full-power performance during the prelaunch hold-down, and if nominal criteria are satisfied, the hydraulic release system is activated at T-0. A safe shutdown is executed should any off-nominal condition be detected."

(Full direct-quote bank in `_research/falcon-guide-facts.md`.)

## Fair use notice

Quotations from the Falcon User's Guide in this repository are short (single sentences and phrases), attributed to specific sections, and used for the purposes of commentary, criticism, teaching, and education on engineering discipline. The factual content of the guide (numbers, dates, procedures) is not subject to copyright. For full text, customers should request the official PDF from SpaceX.

## Original document

The PDF is at `/Users/kwun/ppt/falcon-users-guide-2025-05-09.pdf`. Customers can request the latest version directly from SpaceX. Version 8 (May 2025) was current at the time of this writing.

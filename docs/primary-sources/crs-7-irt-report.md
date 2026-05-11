# Source: NASA CRS-7 IRT Public Summary

**Title:** *NASA Independent Review Team - SpaceX CRS-7 Accident Investigation Report (Public Summary)*
**Author:** NASA Independent Review Team (IRT)
**Date:** March 2018 (public summary; investigation began June 2015)
**Status:** Public domain (work of the U.S. federal government, 17 USC §105)
**Format:** 9-page public summary PDF
**Local copy:** `/Users/kwun/ppt/public_summary_nasa_irt_spacex_crs-7_final.pdf`

## What it is

The NASA IRT's public summary of the investigation into the June 28, 2015 in-flight breakup of SpaceX CRS-7 (Falcon 9 / Dragon, ISS resupply mission). Lists 4 Technical Findings (TF-1 through TF-4) and 3 Technical Recommendations (TR-1 through TR-3).

## Why it's in this corpus

The CRS-7 report is the cleanest publicly available example of two patterns these skills target:

1. **Reasoning by analogy** at the design phase - an industrial-grade rod end at a flight-critical cryogenic load path (TF-1).
2. **Loss of feedback** at the moment data was needed - non-deterministic network packets in flight telemetry buffered into the flight computer; 9 of 115 indications during the failure window were never explained (TF-4).

It is also a textbook cascade: a single small part at the apex of the dependency graph took the whole vehicle in 800–900 ms.

## Technical Findings

| ID | Topic | One-line summary |
|---|---|---|
| TF-1 | Rod end / strut | Industrial-grade rod end used at flight-critical cryogenic load path "without adequate screening or testing... without regard to the manufacturer's recommendations for a 4:1 factor of safety when using their industrial grade part." |
| TF-2 | Acceptance / qualification | Acceptance procedures did not catch the off-spec material properties before flight. |
| TF-3 | Vendor / supply-chain | Vendor selection and certification process did not adequately distinguish flight-critical from non-flight-critical applications. |
| TF-4 | Telemetry | Non-deterministic network packets in flight telemetry caused substantial portions of the anomaly data to be lost due to network buffering in the Stage 2 flight computer. |

## Technical Recommendations

| ID | One-line summary |
|---|---|
| TR-1 | Reassess vendor / part selection process for flight-critical components. |
| TR-2 | Improve acceptance / qualification screening for parts in flight-critical paths. |
| TR-3 | "SpaceX needs to re-think new telemetry architecture and greatly improve their telemetry implementation documentation." |

## Where it appears in the skills

| Skill | How CRS-7 informs it |
|---|---|
| [first-principles-thinking](../../skills/first-principles-thinking/SKILL.md) | The rod end as analogy reasoning; the "we use these everywhere" trap |
| [assumption-audit](../../skills/assumption-audit/SKILL.md) | TF-1 wording as the canonical anti-pattern |
| [analogy-detector](../../skills/analogy-detector/SKILL.md) | TF-1 plus the 60-year industry consensus on booster reuse |
| [system-engineering](../../skills/system-engineering/SKILL.md) | The 800ms cascade as the canonical graph traversal |
| [blast-radius-analysis](../../skills/blast-radius-analysis/SKILL.md) | A single industrial-grade part with vehicle-level blast radius |
| [cascade-tracing](../../skills/cascade-tracing/SKILL.md) | Walking the failure: rod end → COPV → tank → vehicle |
| [apex-identification](../../skills/apex-identification/SKILL.md) | The strut as apex; recognized too late |
| [architecture](../../skills/architecture/SKILL.md) | The lesson: industrial-grade cannot live at flight-critical |
| [forbidden-list](../../skills/forbidden-list/SKILL.md) | TF-1 → forbidden pattern; TF-4 → forbidden pattern |
| [feedback-loops](../../skills/feedback-loops/SKILL.md) | TF-4 / TR-3 as the canonical "lost the loop when it mattered most" |
| [signal-determinism-check](../../skills/signal-determinism-check/SKILL.md) | TF-4 wording verbatim |

## Selected direct quotes

- TF-1 (paraphrased from the public summary): the rod end was used "without adequate screening or testing... without regard to the manufacturer's recommendations for a 4:1 factor of safety when using their industrial grade part."
- TF-4: "non-deterministic network packets in their flight telemetry increases latency, directly resulting in substantial portions of the anomaly data being lost due to network buffering in the Stage 2 flight computer."
- TR-3: "SpaceX needs to re-think new telemetry architecture and greatly improve their telemetry implementation documentation."

## Limitations of this source

- This is the **public summary only** (9 pages). The full IRT report is more detailed but not in the public domain.
- The 9 unexplained telemetry indications are mentioned as a count; the report does not enumerate them.
- Specific stress values, batch numbers, and exact strut geometry are not in the public summary.

## Original document

The PDF is at `/Users/kwun/ppt/public_summary_nasa_irt_spacex_crs-7_final.pdf` in this checkout. Public source: NASA's Office of Inspector General page for the CRS-7 investigation (search "CRS-7 IRT public summary").

# Source: NAFCOM Cost Study

**Title:** *Falcon 9 Launch Vehicle NAFCOM Cost Estimates*
**Author:** NASA Associate Deputy Administrator for Policy
**Date:** August 2011
**Status:** Public domain (work of the U.S. federal government)
**Format:** 9-page slide deck PDF
**Local copy:** `/Users/kwun/ppt/586023main_8-3-11_NAFCOM.pdf`

## What it is

NASA's application of its NAFCOM (NASA-Air Force Cost Model) to the Falcon 9 launch vehicle. NAFCOM is a cost-estimating tool used by NASA and DoD for launch vehicles. The deck reports three estimates of what it would have cost NASA to develop the same Falcon 9 vehicle SpaceX had just built, under different assumption sets.

## The three estimates

| Estimate | Assumptions | Implied source of cost |
|---|---|---|
| **$3.977B** | "Traditional NASA environment/culture": full oversight, unstable requirements, less-lean management, less-disciplined early systems engineering, annual funding | What it would cost NASA to build the same vehicle the traditional way |
| **$1.695B** | "More commercial development culture": some adjustments toward lean | Intermediate; NAFCOM's interim estimate |
| **$443M** | NASA's actual observation after visiting SpaceX's Hawthorne facility: more Falcon 1 heritage, off-the-shelf hardware, two flight units, FFP acquisition, lean management | What SpaceX actually did |

The high-vs-low ratio: **$3.977B / $443M ≈ 9×**.

The NAFCOM deck explicitly states (page 3) that NASA "did not perform a detailed analysis to explain the significant differences" - the causal attributions are SpaceX-reported, not NASA-validated.

## The six driver categories (priority-ordered, NAFCOM page 3)

1. **Acquisition strategy** (oversight vs no oversight)
2. **Requirements stability** (unstable vs stable)
3. **Team efficiency** (less-lean vs lean) [sic: original "Effeciency"]
4. **Management structure** (less lean vs lean)
5. **Early-phase systems engineering discipline**
6. **Funding commitment** (annual vs fixed-price)

These are the levers. Each one is "negotiable in a way physics is not" (paraphrased from the doc's framing).

## The $3-to-$5 multiplier

From SpaceX's own statement to NASA (page 3):

> "every dollar sent out of the company actually costs between $3 and $5 based on subcontractor overhead and profit."

This is the canonical anchor for [`lean-org-pattern`](../../skills/lean-org-pattern/SKILL.md) and the multiplier flag in [`floor-cost.js`](../../tools/clis/floor-cost.js).

## Why it's in this corpus

NAFCOM is the cleanest publicly available example of cost-as-frame-inheritance. The same vehicle priced 9× apart depending on which set of organizational assumptions are loaded into the model. The skills in this set use NAFCOM as the canonical example of:

- [first-principles-thinking](../../skills/first-principles-thinking/SKILL.md) - strip the estimate to the floor.
- [cost-floor-derivation](../../skills/cost-floor-derivation/SKILL.md) - the workforce × loaded labor + material + multiplier method.
- [lean-org-pattern](../../skills/lean-org-pattern/SKILL.md) - the $3-$5 multiplier and the six drivers.

## Limitations

- The deck is 9 pages. Pages 1 and 7 are title/section dividers.
- The headline figure $1.695B (page 2 / page 5 summary) does not exactly match the page 8 detail-table sum of $1,659M; both numbers are reported verbatim from their source pages without reconciliation.
- The deck contains typos preserved as-is in the fact bank (e.g., "Effeciency" on page 6, "flight unites" on page 4) - noted with `[sic]`.
- Causal attributions are SpaceX-reported, not NASA-validated.

## Original document

The PDF is at `/Users/kwun/ppt/586023main_8-3-11_NAFCOM.pdf`. NASA's public release page (search "NAFCOM Falcon 9 cost estimate 2011") links to the same file.

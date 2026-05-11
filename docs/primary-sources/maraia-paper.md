# Source: Maraia Capsule Flight Test Paper

**Title:** *Maraia Capsule Flight Testing and Results for Entry, Descent, and Landing*
**Authors:** Ronald R. Sostaric and Patrick Strahan (NASA Johnson Space Center)
**Date:** ~2015 (presented at AIAA conference; NASA technical report 20150021959)
**Status:** Public domain (NASA-authored; AIAA typeset version may carry additional formatting copyright but underlying facts and content are NASA-authored)
**Format:** 15-page technical paper PDF
**Local copy:** `/Users/kwun/ppt/20150021959 (1).pdf`

## What it is

A NASA technical paper describing a multi-flight test program for the Maraia capsule - a small Earth-return vehicle concept tested via balloon drops and ground rigs before any rocket flight. Documents five test categories from low-cost ground tests through full-scale balloon drops, and the anomalies / closures from the early flights.

## Why it's in this corpus

The Maraia paper is the cleanest publicly available example of:

1. **Fidelity ladder design** - five rungs, cheapest first, each rung's failure is development data:
   - Rung 1: low-speed wind tunnel (Texas A&M)
   - Rung 2: drop tower (China Lake)
   - Rung 3: subscale balloon drop (10-inch, 6-pound capsule, 100kft)
   - Rung 4: chute ejection rig with no pyros
   - Rung 5: full-scale balloon drop (30-inch, 133-pound, 100kft)

2. **Four-box anomaly closure** - Flight #1 had two anomalies (eyebolt failure at launch + burn-circuit twist that cut power to release command at altitude). The paper closes the burn-circuit anomaly in one parenthetical sentence: *"(The electrical setup of this system was modified for future flights.)"* That sentence simultaneously names the cause, the design change, and the doc revision; the test was the next flight readiness check.

3. **Ranked objectives, pre-declared** - final full-scale flight reported as: "all objectives met with the exception of the video objective." Only meaningful because objectives were enumerated and ranked beforehand.

4. **Numeric retest triggers** - pass thresholds (100 m/s ejection velocity, >6G severity flag, event-trigger altitudes 70k/50k/60k/14k ft) pre-declared.

5. **Model fudge factor** - post-flight reconstruction added a constant correction to the simulator: *"A constant value of -0.078 was added to C_A in order to achieve this matching."* The next analyst inherits the correction automatically because it lives in the simulator, not in a wiki page.

6. **Subscale flight pattern** - 10-inch / 6-pound capsule surfaced rigging, release-circuit, and dynamics problems at subscale cost before the 30-inch / 133-pound full-scale flight.

## Where it appears in the skills

| Skill | Anchor |
|---|---|
| [testing-sequencing](../../skills/testing-sequencing/SKILL.md) | The five rungs as the canonical example |
| [fidelity-ladder-design](../../skills/fidelity-ladder-design/SKILL.md) | Each rung itemized in the worked example |
| [ranked-objectives](../../skills/ranked-objectives/SKILL.md) | "All objectives met with the exception of..." framing |
| [numeric-retest-trigger](../../skills/numeric-retest-trigger/SKILL.md) | Pre-declared 100 m/s, 6G, altitude triggers |
| [not-because-of-x-clauses](../../skills/not-because-of-x-clauses/SKILL.md) | Soft landings NOT counted as objective passes |
| [iterate-fast](../../skills/iterate-fast/SKILL.md) | Burn-circuit closure as canonical four-box |
| [four-box-closure](../../skills/four-box-closure/SKILL.md) | Eyebolt + burn-circuit anomalies with full closure |
| [subscale-flight](../../skills/subscale-flight/SKILL.md) | 10-inch capsule as the rung-3 example |
| [recovery-as-instrumentation](../../skills/recovery-as-instrumentation/SKILL.md) | Recovered subscale capsule informing next flight |
| [model-fudge-factor](../../skills/model-fudge-factor/SKILL.md) | The -0.078 C_A correction verbatim |
| [analogy-detector](../../skills/analogy-detector/SKILL.md) | Pre-flight aero model used Apollo + CFD analogies that flight data contradicted |

## Selected direct quotes (short, attributed)

- "(The electrical setup of this system was modified for future flights.)"
- "A constant value of -0.078 was added to C_A in order to achieve this matching."
- "all objectives met with the exception of the video objective"

## Limitations

- The paper does not explicitly use the labels "five-rung fidelity ladder" or "four-box closure"; those framings are mapped onto the paper's content (Figure 2's five test categories; the eyebolt/burn-circuit anomaly with its design-fix, instrumentation-update, and procedure-update responses).
- "Numeric retest triggers" in the strict sense (pre-declared go/no-go thresholds for re-flying) are not stated as such in the paper; the closest content is captured under that topic with the caveat acknowledged.
- "Not because of X" clauses are not phrased that way in the paper; the closest evidence (cases where a soft landing or partial success was explicitly NOT counted as objective pass) is the anchor.

## Original document

The PDF is at `/Users/kwun/ppt/20150021959 (1).pdf`. Public source: NASA Technical Reports Server (NTRS), report number 20150021959. AIAA proceedings (2015) carry the typeset version.

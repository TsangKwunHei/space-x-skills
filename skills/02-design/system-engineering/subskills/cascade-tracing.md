---
name: cascade-tracing
description: Walk a known-origin failure forward step by step through the system graph, naming proximate, intermediate, initiating, and root causes. Use during incident review, post-mortems, fault-tree closure, or whenever the user mentions "cascade," "domino effect," "what triggered what," "chain of events," "what went wrong first," "fault tree," "5 whys," or "we don't know why this propagated." Especially load when telemetry is incomplete and you must reconstruct the chain analytically - the discipline is to walk every step, not stop at the first plausible cause.
---

# Cascade Tracing

The CRS-7 vehicle "went from flying fine to conflagration in less than a second, or 'within a blink of an eye.'" The IRT (page 5) recorded the timespan precisely: "800-900 millisecond." Inside that window, telemetry produced 115 indications; the IRT could account for the large majority but "9 indications [were] not fully explained" (page 6) because non-deterministic packet routing had buffered them away.

The cascade had to be traced analytically, not from the data alone. The IRT walked it forward: rod end fails under ascent loads → COPV breaks free from its mounts → buoyancy in LOx accelerates the COPV upward → COPV impacts the LOx dome at the top of the LOx tank "with great force" → LOx tank ruptures → Stage 2 LOx tank rupture → vehicle disintegrates.

Seven steps. Less than a second. Reconstructed from a partial fault tree.

## What this is

Cascade tracing is the discipline of walking a known-origin failure forward through the system graph, one edge at a time, naming what each step did to the next.

It is the temporal companion to blast-radius analysis. Blast-radius asks "if this fails, what is downstream?" Cascade-tracing asks "this *did* fail; what *actually* propagated, in what order?"

The goal is a chain whose each link carries:
- a named cause
- a named effect
- the mechanism connecting them
- the time delta

Skipping any of these breaks the chain.

The CRS-7 IRT used four explicit cause levels (page 5, page 7):

- **Proximate** - "the rupture of the Stage 2 LOx tank"
- **Intermediate** - "the liberation of a Stage 2 COPV within the Stage 2 LOx tank"
- **Initiating** - "the failure of the axial strut supporting a COPV"
- **Root** - industrial-grade casting in a flight-critical cryogenic path without 4:1 derating, screening, or load testing (TF-1, page 8)

Each level is a node further upstream in the cascade. Stopping at any level - including the proximate - gives an incomplete trace and an incomplete fix. Saying "the LOx tank ruptured" tells you nothing you can act on. Saying "an industrial-grade casting was used in a flight-critical cryogenic path without manufacturer-recommended derating" tells you exactly what to change.

The chain must be walkable in both directions. From the root forward, the design fix is testable: harden derating policy → screening becomes mandatory → strut survives → COPV stays attached → tank holds → vehicle survives. From the proximate backward, the analytical method is fault-tree refinement: each effect implies one or more candidate causes, each candidate is tested against telemetry and physics, surviving candidates are walked further upstream.

## When to use this

- During an incident post-mortem, after the immediate fire is out
- When a fault tree has open blocks that need to be closed analytically
- When telemetry is incomplete and the chain must be reconstructed from physics + partial data
- When two or more credible chains exist and you need to enumerate all of them rather than picking one prematurely
- When the user proposes a fix at the proximate cause and you suspect the root is upstream
- When the same incident recurs - the previous trace likely stopped too early
- During design review, as a hypothetical: "if X fails, trace forward through the graph and tell me where it stops"

## When NOT to use this

- Before the failure has actually occurred (use blast-radius-analysis instead - that walks downstream from a hypothetical, not an actual)
- For purely software bugs traceable to a single line - the cascade has length 1 and adds no insight
- When the graph is unknown - first do system-graph-mapping
- When the team is exhausted and pattern-matching to the previous incident - fresh tracing requires fresh attention; do it later

## How to apply

1. **Anchor at the proximate cause.**

   Write the proximate cause in one sentence. CRS-7's was "the rupture of the Stage 2 LOx tank" (CRS-7 IRT page 5). It is the last thing that broke before mission loss. Specific, verifiable, and not yet explanatory.

2. **Walk one step upstream.**

   Ask: what *immediately* caused the proximate? Use the graph - the proximate is a node, walk its incoming edges. For each incoming edge, ask "did this carry the cause?" Test each candidate against telemetry and physics.

   The IRT walked LOx-tank-rupture upstream and found "the liberation of a Stage 2 COPV within the Stage 2 LOx tank" as the credible intermediate (CRS-7 IRT page 6).

3. **Repeat until you reach a root cause that is actionable.**

   A cause is actionable when changing it changes the design. "Material defect" is not actionable - defects happen; the question is why a part with possible defects was in a flight-critical path.

   The IRT was explicit (page 7): "The IRT does not denote it a 'most probable' since the IRT also views 'rod end manufacturing damage', 'rod end strut mis-installation', 'rod end collateral damage' or some other part of the axial strut breaking as equally credible causes." All routed through the same root: the industrial-grade casting decision (TF-1, page 8).

4. **Enumerate alternatives at each level.**

   A cascade trace is not a single chain - it is a tree narrowing toward the proximate. At each upstream step, list every credible cause and disprove the rejected ones with data.

   The IRT considered Alternative Scenario #1 (RP-1 leak warming LOx, "disproven analytically: insufficient thermal energy") and Alternative Scenario #2 (RP-1 leak with sufficient thermal energy for geysering - disproven by Marshall Space Flight Center test, "still insufficient thermal energy to initiate a geysering occurrence within the total 800-900 millisecond time span") (CRS-7 IRT page 6).

5. **Annotate each link with mechanism and time.**

   "COPV impacts dome with great force" is a mechanism (kinetic impact); "buoyancy in LOx accelerates COPV upward" is a mechanism (Archimedes' principle in cryogenic LOx). Time deltas matter because they constrain which alternatives are credible - the geysering hypothesis was rejected partly because no thermal mechanism could complete in 800–900 ms.

6. **Close the chain or mark it open.**

   If you reach an actionable root, the chain is closed. If you cannot close it - if telemetry is missing and physics admits multiple roots - say so explicitly. The IRT marked the initiating cause as "probable" rather than "most probable" (CRS-7 IRT page 8) precisely because more than one root was credible.

   An honest open chain beats a falsely closed one.

7. **Translate root causes into design changes.**

   Each root cause maps to one or more design or process fixes. Pair this with four-box-closure (route via your parent spine to iterate-fast): root cause named, design changed, test now catches it, doc revised. A trace that stops before design change is a story, not a fix.

## Worked example

**CRS-7 cascade, walked forward.** Anchored at the proximate, refined to the root (CRS-7 IRT pages 5–8):

- Step 0 (proximate): "the rupture of the Stage 2 LOx tank" - page 5.
- Step 1 (intermediate, credible): "the liberation of a Stage 2 COPV within the Stage 2 LOx tank" - page 6. Mechanism: high-momentum impact of COPV against LOx tank dome. Time: tens of milliseconds.
- Step 2 (mechanism within intermediate): "buoyancy in LOx accelerates COPV upward" → "COPV impacted the LOx dome at the top of the LOx tank with great force" - page 7. Physics: cryogenic LOx is dense (~1140 kg/m³); a helium-filled COPV is extraordinarily buoyant. Time: ~100s of ms after liberation.
- Step 3 (initiating, credible): "the failure of the axial strut supporting a COPV" - page 7. Mechanism: structural failure under ascent loads. Time: T+139.1 s into flight.
- Step 4 (root, design): "industrial grade 17-4 PH SS (precipitation-hardening stainless steel) casting in a critical load path under cryogenic conditions and flight environments, without additional part screening, and without regard to manufacturer recommendations for a 4:1 factor of safety" - TF-1, page 8.

Alternatives the IRT enumerated and held in parallel at Step 3 (CRS-7 IRT page 7): "rod end breakage due to material defect," "rod end manufacturing damage," "rod end mis-installation," "rod end collateral damage," "or some other part of the axial strut breaking." All routed through the same Step 4 root: a part of inadequate design margin in a flight-critical path. SpaceX's AIT picked "material defect" as "most probable"; the IRT refused to single one out, marking the initiating cause as "probable" rather than "most probable" (CRS-7 IRT page 8) and forcing the root-cause fix to address the entire class.

The fix is at Step 4. Steps 0–3 are descriptions of physics that, given Step 4, were inevitable. Step 4 is where the design changes.

## Anti-pattern

Stopping at the proximate cause. The CRS-7 proximate was "the rupture of the Stage 2 LOx tank" - a true statement that yields no design change. A team that walked one step ("LOx dome rupture during ascent") and shipped a "thicker LOx dome" fix would have addressed nothing: the dome was not the weak link in the cascade. The dome ruptured because a buoyant COPV slammed into it; the COPV was buoyant because it was untethered; it was untethered because a strut failed; the strut failed because the rod end at its apex was an industrial casting in a regime requiring aerospace qualification. Four steps upstream is where the design moved.

The Maraia Flight #1 cascade demonstrates the same trap (Maraia paper page 5 §III.A): "An eyebolt failure on the capsule occurred immediately after launch, causing the two-point attach to the upper payload to become a single point attach." The proximate ("eyebolt failed") would not explain why "the command to release the capsule was sent. No release was observed." The Maraia team walked it forward: "the twisting of the capsule during ascent caused the electrical connection of the burn circuit to pull loose from the power source. The command was received by the avionics, but the lack of power to the release box system prevented it from functioning properly." Root: an electrical connection that could shake loose under flight twist. Fix: "(The electrical setup of this system was modified for future flights)" - page 5. Walking the cascade two extra steps revealed the actual root and the actual design change.

## Related skills

- Parent: [system-engineering](../SKILL.md)
- Pairs with: [blast-radius-analysis](blast-radius-analysis.md) (forward-from-hypothetical complement), [system-graph-mapping](system-graph-mapping.md) (cascade walks the graph)
- Compose with: four-box-closure (route via your parent spine to iterate-fast) (every closed cascade triggers a four-box check), model-fudge-factor (route via your parent spine to feedback-loops) (the cascade often invalidates a pre-flight model assumption)

## Source

- Primary: CRS-7 IRT report, page 5 (800–900 ms timespan; "blink of an eye"), page 6 (115 telemetry indications; alternative scenarios disproven), page 7 (intermediate / initiating cause language; rod end alternatives enumerated), page 8 (TF-1 root cause; "probable" not "most probable").
- Secondary: Maraia paper page 5 §III.A (eyebolt + burn-circuit cascade and the design fix).

---
name: analogy-detector
description: Identify when a design choice, cost estimate, schedule, or risk judgment is being defended by analogy - "we use these everywhere," "Apollo did it this way," "this is what the industry does" - instead of by a derivation from physics, accounting, or measured data, and treat each analogy as a load-bearing claim that must be re-derived in the new regime or explicitly demoted to "we are guessing." Use this skill when a design rests on precedent rather than physics, when historical-data-as-model assumptions are being carried into a new flight regime, when a vendor part is justified by "everyone uses it," or when a cost number is defended by "this is what these things cost." Especially load this skill before any review where a precedent claim is the strongest justification on the table.
---

# Analogy Detector

In Maraia's pre-flight aerodynamic model, the team used "an assumed C_m,q model... based on Apollo Entry capsule data" with static aerodynamic coefficients (C_A, C_N, C_m) derived from CFD (Maraia p.11). The vehicle flew. The recovered flight data did not match. "A constant value of -0.078 was added to C_A in order to achieve this matching" (Maraia p.11), and the C_m,q model was rebuilt from flight data across Mach 0.3-0.8 (Maraia Fig. 19, p.14). The pre-flight model was an analogy to a vehicle whose physics differed in ways the team only learned by flying. The analogy was not stupid. It was the best available reference. It was wrong because it had been imported into a new regime without being marked as suspect. This skill is the discipline of marking analogies, every time, before they fly.

## What this is

Analogy-detection is the practice of scanning a design, estimate, or risk judgment for any claim of the form "X works here because X worked there" and treating each one as a load-bearing assumption that must either be re-derived in the new regime or explicitly demoted with a written acknowledgment.

It is the inverse move to assumption-audit. Assumption-audit asks "what does this rest on?" Analogy-detection asks "where does the support come from - is it physics, accounting, measured data in this regime, or is it a comparison to a different regime?" If the support is comparison, the claim is an analogy, and analogies do not transfer regimes safely without re-derivation.

The discipline matters because analogies are *invisible* support. Nobody writes "I am reasoning by analogy here." The CRS-7 rod-end decision, the sixty-year reuse-is-impossible consensus, the Maraia Apollo-based C_m,q model - all three were analogies, none was labeled as such, and the cost of each surfaced only in flight.

## When to use this

- A design choice is justified primarily by precedent ("Apollo did it," "Saturn did it," "Shuttle did it," "every other team in the industry does it")
- A vendor part or library is justified by "we use these everywhere" or "this is the standard part"
- A cost estimate is defended by "this is what these things cost" rather than by a workforce-times-loaded-labor derivation
- A schedule is defended by "programs of this size always take this long"
- A model uses historical data from a previous vehicle/system as the prior for the new one
- A risk is dismissed because "we have seen this and it has been fine"
- A regime change has occurred (cryogenic, supersonic, multi-tenant, higher-throughput) and the prior-regime answers are still being used unmodified

## When NOT to use this

- The analogy has been explicitly marked, the regime delta has been written down, and a re-derivation has been done - the work is already complete
- The "analogy" is actually identity: the new system is the old system in the same regime with no inputs changed (genuine commonality, e.g., Falcon Heavy reusing the proven Falcon 9 second stage in the same flight regime)
- A cheap empirical test in the new regime is already planned - the analogy is being used as a starting hypothesis, not as the answer
- The decision is reversible at low cost and the cost of re-deriving exceeds the cost of being wrong once

## How to apply

1. **Scan for comparison language.** "Like X," "the same way Y did," "based on Z's data," "Apollo / Saturn / Shuttle / industry / vendor / our last project," "we use these everywhere," "this is the standard," "everyone does this." Each instance is a candidate analogy.
2. **For each candidate, name the source regime and the target regime.** Apollo's C_m,q model (Maraia p.11) was developed for Apollo's geometry and flight regime; Maraia's capsule was a 30-inch, 133-pound test article in subsonic balloon-drop flight (Maraia p.8). The geometric, mass, and Mach regimes differed. The analogy was a starting point, not an answer.
3. **Compute the regime delta.** What inputs differ between source and target? Temperature? Pressure? Mass? Mach? Tenant model? Failure rate? Cost basis? Each delta is a place the analogy may break.
4. **Demand a re-derivation or a demotion.** Either (a) re-derive the answer in the new regime - Maraia did this post-flight by extracting C_m,q from flight data and adding -0.078 to C_A (Maraia p.11) - or (b) explicitly demote the analogy to "starting hypothesis, expected to be wrong" with a planned cheap test to refute or confirm in the new regime.
5. **Mark every surviving analogy in the document.** Use a tag, a comment, an explicit list. An analogy that survives unmarked is an analogy that will not be re-checked when the regime drifts further. The Maraia paper's value is exactly that it published the -0.078 fudge factor and the Mach-0.3-to-0.8 C_m,q rebuild on the record (Maraia Fig. 19, p.14).
6. **Treat the failure corpus as the prior, not the heritage corpus.** When choosing between "design like X did because X succeeded" and "design unlike X did because X failed," the failure corpus is the better source of analogies. Falcon User's Guide §1.5, p.4: "A study by The Aerospace Corporation found that 91% of known launch vehicle failures in the previous two decades can be attributed to three causes: engine, avionics, and stage separation failures." That is an analogy *from failure*, which is a much stronger guide than analogy from success.

## Worked example

Maraia capsule pre-flight aerodynamic model (Maraia p.11, Sec. IV.C):

- **Analogy claim.** "An assumed C_m,q model was used prior to flight to predict the expected behavior in flight. The assumed C_m,q model was based on Apollo Entry capsule data. The model of the static aerodynamic coefficients – C_A, C_N, and C_m – was developed from CFD."
- **Source regime.** Apollo Entry capsule: large-scale, hypersonic-to-subsonic re-entry from Earth orbit, instrumented in the 1960s. Static coefficients also from CFD on the Maraia geometry, but CFD has its own regime-validity questions.
- **Target regime.** Maraia full-scale balloon drop, August 2013 (Maraia p.8): 30-inch diameter, 133-pound, subsonic free-fall from 100,000 ft over Fort Sumner, NM. Geometry is Maraia's own, not Apollo's; speed regime is subsonic, not hypersonic.
- **Regime delta.** Geometric scale ~order of magnitude smaller, mass several orders smaller, speed regime entirely different from Apollo's design point. The CFD static-coefficient model was for the Maraia geometry but had not been validated in the relevant flight regime.
- **Pre-flight prediction.** "The pre-flight simulation actually shows a fairly unstable vehicle" (Maraia p.11).
- **Flight data outcome.** "The flight showed a limit cycle behavior on the angle of attack and sideslip parameters" - different qualitative behavior. C_A required a constant -0.078 correction to match flight (Maraia p.11). C_m,q was rebuilt from flight data and presented across Mach 0.3, 0.5, 0.6, 0.7, 0.8 in Fig. 19 (Maraia p.14). Note from the source: "The Mach 1.1 curve is not derived from flight data. Rather it is assumed in the simulation from historical data and included here for completeness" (Maraia p.13) - the team was explicit about which curves were flight-derived and which remained analogies, the exact discipline this skill names.

The analogy was not the failure mode. The analogy *unmarked* would have been the failure mode. By publishing the -0.078 correction and labeling the Mach 1.1 curve as still-historical, the Maraia team converted analogy reasoning into a measured, cited model.

## Anti-pattern

CRS-7. NASA IRT TF-1 (CRS-7 IRT p.8): the industrial-grade 17-4 PH SS rod end was used in a flight-critical cryogenic load path. The implicit analogy was "we use these everywhere [in non-cryogenic, lower-load applications], and they have been fine" - a comparison from a regime where the manufacturer's 4:1 factor of safety was either not load-bearing or was implicitly satisfied by ambient conditions, into a regime (cryogenic LOX, ascent loads, COPV strut) where the 4:1 derating was the relevant physics.

The analogy was never marked. The CRS-7 IRT's framing on p.7 - used "without adequate screening or testing of the industrial grade part," "without regard to the manufacturer's recommendations for a 4:1 factor of safety," "without proper modeling or adequate load testing of the part under predicted flight conditions" - is exactly the audit a marked analogy would have triggered. None of those checks happened because the analogy did not surface as something to be checked. It was invisible support.

A second instance, same vehicle, same report (CRS-7 IRT TF-2, p.8): "commercially procured wire ropes to provide structural support to the LOx Transfer Tube Assembly, without regard for manufacturer's caution to specify pre-stretched ropes in a length-critical application." Same shape: an analogy from one regime carried unmarked into another, with the manufacturer's published guidance on the regime delta unread.

A third instance, industry-wide (Falcon User's Guide §1.3, p.3): the implicit analogy from sixty years of expendable boosters was "boosters cannot be re-flown." That was an analogy, not a derivation, and once the team that asked the question from physics flew the answer, the analogy collapsed in 384 successful re-flights.

## Related skills

- Parent: [first-principles-thinking](../SKILL.md)
- Pairs with: [assumption-audit](assumption-audit.md) (every analogy is an unaudited assumption with a comparative source), model-fudge-factor (route via your parent spine to feedback-loops) (the -0.078 is the artifact of an analogy that flew and broke)
- Compose with: failure-corpus-mapping (route via your parent spine to architecture) (analogies from failure are stronger priors than analogies from success), [re-derive-from-physics](re-derive-from-physics.md) (the demotion-or-rederive step requires physics)

## Source

- Primary: Maraia paper, p.11 (Apollo C_m,q + CFD analogy), p.13-14 (Mach 1.1 curve still historical, Fig. 19 flight-derived curves), -0.078 correction.
- Secondary: CRS-7 IRT TF-1 and TF-2, p.7-8 (rod end and wire ropes as unmarked analogies in flight-critical regimes); Falcon User's Guide §1.3, p.3 (sixty-year reuse-is-impossible consensus dissolved by re-derivation), §1.5, p.4 (Aerospace Corporation 91% failure-corpus finding as a stronger analogy source).

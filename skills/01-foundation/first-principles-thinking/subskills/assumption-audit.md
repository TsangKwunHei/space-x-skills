---
name: assumption-audit
description: Surface every unstated assumption in a spec, design doc, PR, or estimate - especially the ones hiding behind "industry standard," "best practice," "we've always," "the vendor recommends," or "we use these everywhere" - and force each one to be either re-derived against physics or named explicitly as an accepted risk. Use this skill when reviewing a design that defends decisions by precedent rather than physics, when a spec contains the language of inherited convention, when a vendor's part is being used outside its rated regime, or when an estimate or schedule is being defended without a written derivation. Especially load this skill before any commit, review, or sign-off where an unaudited assumption could cost a vehicle, a budget, or a quarter.
---

# Assumption Audit

The CRS-7 mishap was a single sentence's worth of unaudited assumption. Per the NASA Independent Review Team Technical Finding TF-1: SpaceX selected an "industrial grade 17-4 PH SS (precipitation-hardening stainless steel) casting in a critical load path under cryogenic conditions and flight environments, without additional part screening, and without regard to manufacturer recommendations for a 4:1 factor of safety, represents a design error – directly related to the F9-020 CRS-7 launch failure as a 'credible' cause." (CRS-7 IRT TF-1, p.8.) The assumption - "we use these everywhere, they have been fine" - was reasoning by analogy that nobody re-derived against the cryogenic/ascent-load regime where the part was actually being asked to work. It cost a vehicle. This skill is the discipline that finds that sentence before the flight does.

## What this is

Assumption-audit is the deliberate, written practice of extracting every unstated belief from a design document, PR, spec, or estimate and forcing each one to one of two states: (a) re-derived from physics or accounting and explicitly cited, or (b) named as an accepted risk with a written acknowledgment of who accepted it and what regime it is valid in.

It is not a code review. Code review checks the code against the spec. Assumption-audit checks the *spec itself* for inherited belief. The CRS-7 rod end was perfectly compliant with the SpaceX design document; the design document was wrong because the assumption it rested on - "industrial grade is fine here" - had never been audited against the manufacturer's own published 4:1 derating guidance (CRS-7 IRT p.7).

The discipline produces a written artifact: a list, with each line of the form "Assumption X is being made; its source is Y; the regime it is valid in is Z; the regime we are using it in is W; the gap is named or closed."

## When to use this

- Any design doc, PR, or spec that contains the phrases "industry standard," "best practice," "we've always," "the vendor recommends," "everyone uses," "this is fine," "we use these everywhere"
- Any vendor part or library being used in a regime different from its rated/typical use (cryogenic, high-frequency, high-load, untrusted-input, multi-tenant)
- Any estimate or schedule defended without a written derivation
- Any decision justified primarily by "we did it this way last time"
- Before sign-off on any flight-critical, security-critical, or financially-critical artifact
- When two engineers disagree about a number and neither can cite a source for it

## When NOT to use this

- The work is genuinely inside a regime the assumption was derived in, and the derivation is cited in the spec
- The assumption has already been audited within the last release/season and the relevant inputs have not changed
- The artifact is exploratory/throwaway and the cost of being wrong is bounded to the exploration itself
- A formal hazard analysis or FMEA is already running on the same artifact (use the findings from that, do not duplicate)

## How to apply

1. **Read the document with a different question.** Not "is this correct?" but "what does this rest on?" Each design choice, each number, each "we will" statement points back to an assumption. Write each one down as "Because we assume X, we are doing Y."
2. **Underline analogy language.** "Industry standard," "best practice," "we've always," "the vendor recommends," "we use these everywhere," "this is fine in our experience." Each underline is a candidate assumption that was carried in from a different regime.
3. **For each assumption, name three things.** (a) The source of the assumption: a paper, a vendor data sheet, a prior project, a senior engineer's memory, a convention. (b) The regime in which the assumption was originally validated. (c) The regime in which we are now using it. If (b) ≠ (c), the assumption is unaudited.
4. **Apply the manufacturer's published derating before trusting any vendor part.** CRS-7 IRT p.7: industrial-grade 17-4 PH SS rod end was used "without regard to the manufacturer's recommendations for a 4:1 factor of safety when using their industrial grade part in an application." The 4:1 was published. Nobody applied it. The audit step is: open the data sheet, find the derating clause, multiply.
5. **For each assumption, write a one-sentence physics or accounting derivation that would either confirm it or kill it.** If you cannot write the sentence, the assumption is unauditable as stated and must be reformulated.
6. **Promote, demote, or kill.** Each assumption ends in one of three states: (a) **Promoted** - derivation written and cited, line closed. (b) **Demoted** - explicitly named as an accepted risk, regime documented, named owner. (c) **Killed** - derivation contradicts the assumption, design must change.
7. **Run the CLI to mechanize the audit on a diff.** `node tools/clis/assumption-audit.js --help` parses for analogy-language tokens in a document or PR diff and surfaces the candidate assumptions that need a (a)/(b)/(c) decision before sign-off.
8. **Re-audit when the regime changes.** A previously audited assumption is not audited for the new regime. Cryogenic ≠ ambient. Production ≠ staging. Single-tenant ≠ multi-tenant. Re-derive when the inputs move.

## Worked example

CRS-7 IRT report, applied as an audit of the pre-flight design document for Falcon 9 v1.1, F9-020 (CRS-7).

Candidate assumption (verbatim CRS-7 IRT p.7): "an industrial grade 17-4 PH SS (precipitation-hardening stainless steel) cast part - the 'Rod End' - a threaded cast stainless steel eye bolt" was used "in a critical load path under cryogenic conditions and strenuous flight environments, supporting a COPV (composite overwrapped pressure vessel) holding helium inside the Stage 2 LOx tank."

Apply the audit:

- **Source of assumption.** Internal SpaceX design judgment that industrial-grade rod ends, used elsewhere in the vehicle, were adequate here. (CRS-7 IRT p.7 documents the gap; it does not name the source.)
- **Regime where assumption was validated.** Industrial-grade applications at non-cryogenic temperatures with the manufacturer's 4:1 factor of safety applied. The manufacturer published this derating (CRS-7 IRT p.7).
- **Regime where assumption is now being used.** Cryogenic LOX-tank temperatures, ascent loads, no 4:1 derating, no additional part screening, no proof testing, no flight-environment load testing (CRS-7 IRT p.7: "without adequate screening or testing... without proper modeling or adequate load testing of the part under predicted flight conditions").
- **Physics-derivation sentence that would have killed it.** Apply the manufacturer's 4:1 factor of safety to the rod end's rated load, then check whether the resulting margin still covers the cryogenic + ascent envelope. The CRS-7 IRT does not publish the numerical answer, but the IRT's TF-1 finding (p.8) - "directly related to the F9-020 CRS-7 launch failure as a 'credible' cause" - is the closure: the assumption was killable on a single page. It was not audited.

Cascade if the audit had been done and the assumption killed (CRS-7 IRT p.7): aerospace-grade rod end with proper screening → strut survives ascent loads → COPV stays in its mounts → no impact on the LOx dome → no Stage 2 LOx tank rupture → vehicle delivers Dragon to ISS. A single audited assumption sits between a successful resupply mission and the loss of CRS-7.

A second instance in the same report - TF-2 (CRS-7 IRT p.8) - confirms the pattern: "use of commercially procured wire ropes to provide structural support to the LOx Transfer Tube Assembly, without regard for manufacturer's caution to specify pre-stretched ropes in a length-critical application." Same shape, different part, same audit failure mode. Two unaudited "we use these everywhere" assumptions in the same flight document.

## Anti-pattern

For sixty years, every launch program on Earth operated under one assumption: orbital first-stage boosters cannot be re-flown. Falcon User's Guide §1.3, p.3, names the regime change without naming the assumption: "SpaceX pioneered reusability with the first re-flight of an orbital class rocket in 2017."

The assumption - "reuse is impossible" - was never written down. No spec said "we assume reuse is impossible." Every program just *built around* the assumption, and because the assumption was invisible, no audit could land on it. It propagated through cost estimates (single-use vehicles factored into NAFCOM-style budgets), through design choices (no re-entry margins, no inspection access), through scheduling (one flight = one vehicle), and through procurement (single-use materials). All of those decisions were locally rational under the assumption. None of them was rational without it.

When the assumption was finally audited - re-derived against propellant chemistry, material limits, energy budget - the answer was that there was no physical bar to reuse. As of February 2025, SpaceX has re-flown Falcon 9 first-stage boosters more than 384 times with 100% success (Falcon User's Guide §1.3, p.3). The sixty-year industry consensus dissolved into 384 successful re-flights. The lesson is not that the industry was lazy. The lesson is that an unwritten assumption *cannot* be audited; the audit step must include "what assumption is invisible because nobody states it?" - and the answer to that question is found by asking why every program in the corpus made the same decision.

## Related skills

- Parent: [first-principles-thinking](../SKILL.md)
- Pairs with: [analogy-detector](analogy-detector.md) (analogy is the most common source of unaudited assumptions), [re-derive-from-physics](re-derive-from-physics.md) (the kill/promote derivation must come from physics)
- Compose with: failure-corpus-mapping (route via your parent spine to architecture) (the failure corpus tells you which assumptions historically end vehicles), forbidden-list (route via your parent spine to architecture) (audited-and-killed assumptions become forbidden-list entries)

## Source

- Primary: CRS-7 IRT report TF-1 (p.8), TF-2 (p.8), and the rod-end / wire-rope / 4:1-derating narrative on p.7.
- Secondary: Falcon User's Guide §1.3, p.3 - sixty-year reuse assumption dissolved by re-derivation; 384 re-flights as of Feb 2025.
- Tool: `tools/clis/assumption-audit.js` - analogy-language token scanner and audit checklist.

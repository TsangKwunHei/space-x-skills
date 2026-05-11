# Principles → Skills Map

Source: `/Users/kwun/ppt/33-infrastructure-principles.md` (430 lines)
Derived from: NASA Maraia Capsule paper (Sostaric & Strahan, ~2015) + SpaceX Falcon User's Guide v8 (Mar 2025).

This document maps each of the 33 principles to spine and sub-skills. Content is drawn solely from the source document - no invention. Line numbers refer to the source.

---

## Principle 1: Anchor architecture to historical failure modes, not features.
- Maps to:
  - SPINE 3 architecture (primary)
  - sub: failure-corpus-mapping (primary)
  - sub: three-axes-decomposition (engines / avionics / staging are the three axes)
  - SPINE 1 first-principles-thinking (re-derive design from incident corpus, not feature list)
- Key facts (line numbers):
  - L56: Aerospace Corporation's 2001 study (cited in §1.5) found 91% of known launch failures in the prior two decades traced to three causes: engines, avionics, and stage separations.
  - L57: Engines → 9 Merlins/stage with engine-out, fuel doubles as hydraulic fluid, each engine in its own metal bay isolated from neighbors.
  - L58: Avionics → "three-string, fault-tolerant architecture ... full vehicle single-fault tolerance ... by isolating compartments within avionics boxes or by using triplicated units."
  - L59: Staging → Falcon 9 is two-stage only; Falcon Heavy uses the same two-stage core.
  - L62 trigger: "Any domain with a known failure corpus. Let that corpus, not novelty, pick your architectural axes."
- "Do not" trap:
  - L63: "spread redundancy evenly across the system to 'look rigorous.' Do not invoke 'our use case is different' to ignore the incident corpus - novelty is never a reason to forget history. Do not design to the happy-path component list before you've read the failure list."
- Source citations:
  - Falcon User Guide §1.5 (Aerospace Corporation 2001 study)

---

## Principle 2: Every interface is a failure; count them and minimize.
- Maps to:
  - SPINE 2 system-engineering (primary)
  - sub: interface-contract (primary - every transition named)
  - sub: blast-radius-analysis (each handoff = a failure mode to count)
  - SPINE 3 architecture sub: forbidden-list (deletion as a forbidden-additions discipline)
- Key facts:
  - L67: "The two stage Falcon 9 architecture was selected to minimize the number of stage separation events, eliminating potential failure modes associated with third and fourth stage separations, as well as potential engine deployment and ignition failure modes in the third and fourth stages."
  - L67: Merlin Vacuum "uses a fixed, non-deploying expansion nozzle, eliminating potential failure modes in nozzle extension."
  - L68: "4-stage rockets have 4× the separation events - and each one is a discrete, hard-to-test transition."
  - L69 trigger: "Draw the state diagram of any pipeline. Each transition is a 'can this fail?' question. Collapsing two transitions is usually cheaper than hardening both."
- "Do not" trap:
  - L70: "add a stage because the architecture diagram looks cleaner. Do not count 'we'll harden the transition' as equivalent to 'we removed the transition.' Do not add microservice boundaries that only exist for team org-chart reasons - you pay for each boundary in ops."
- Source citations:
  - Falcon User Guide (two-stage architecture rationale; Merlin Vacuum nozzle design)

---

## Principle 3: Commonality is your evidence multiplier.
- Maps to:
  - SPINE 3 architecture (primary)
  - sub: three-axes-decomposition (Heavy = 3× Falcon 9 first stages; same 2nd stage; same fairing)
  - SPINE 1 first-principles-thinking sub: cost-floor-derivation (forks divide the qualification base)
  - SPINE 7 infrastructure sub: standard-menu (one core, not many variants)
- Key facts:
  - L74: "Falcon Heavy's first stage comprises three Falcon 9 first stages ... Falcon Heavy utilizes the same second stage and same payload fairing as flown on Falcon 9, fully benefiting from the flight heritage provided by Falcon 9 flights."
  - L74: "Because SpaceX produces one Falcon core vehicle, satellite customers benefit from the high design standards required to safely transport crew."
  - L74: "flying several engines on each mission also quickly builds substantial engineering data and flight heritage" (9 Merlins/F9, 27 on Heavy).
  - L76 trigger: "Before forking a design or forking infrastructure, ask: will each fork's flight-count pay for its own qualification?"
- "Do not" trap:
  - L77: "fork 'just for this one customer' or 'just for this one feature flag.' Do not maintain two variants where one core can serve both. Do not optimize two codebases in parallel when neither will get enough attention to stay reliable."
- Source citations:
  - Falcon User Guide §1 (Falcon Heavy commonality with Falcon 9)

---

## Principle 4: Co-locate the feedback loop.
- Maps to:
  - SPINE 4 feedback-loops (primary)
  - sub: co-location-pattern (primary, named directly)
  - sub: loop-latency-measurement (latency dominates reliability)
  - SPINE 7 infrastructure sub: lean-org-pattern (flat structure, low overhead)
- Key facts:
  - L81: "SpaceX corporate structure is flat and business processes are lean, resulting in fast decision-making and product delivery. SpaceX products are designed to require low-infrastructure facilities with little overhead, while vehicle design teams are co-located with production and quality assurance staff to tighten the critical feedback loop."
  - L81: Hawthorne houses Dragon, Falcon 9, Falcon Heavy, and Merlin under one roof.
  - L83 trigger: "If the team that decides never meets the team that discovers, the feedback loop has a latency problem, not a process problem."
- "Do not" trap:
  - L84: "let design and operations communicate only through tickets. Do not accept a two-week turnaround on production defects reaching the designers. Do not separate 'research' and 'production' teams by a wall - they'll drift."
- Source citations:
  - Falcon User Guide (Hawthorne facility description; flat-org statement)

---

## Principle 5: Fold subsystems into other subsystems - a deleted component has no failures.
- Maps to:
  - SPINE 3 architecture (primary)
  - SPINE 1 first-principles-thinking sub: re-derive-from-physics (fuel can serve as hydraulic fluid)
  - SPINE 1 sub: assumption-audit (audit "do we need a separate subsystem here?")
  - SPINE 3 sub: forbidden-list (no separate hydraulic fluid; no propellant-based ACS)
- Key facts:
  - L88: "the first stage thrust vector control system pulls from the high-pressure rocket-grade kerosene system, rather than using a separate hydraulic fluid and pressurization system. Using fuel as the hydraulic fluid eliminates potential failures associated with a separate hydraulic system and with the depletion of hydraulic fluid."
  - L88: Merlin "features a reliable turbopump design with a single shaft for the liquid oxygen pump, the fuel pump, and the turbine."
  - L88: Second stage ACS uses cold nitrogen gas because "the GN₂ ACS is more reliable and produces less contamination than a propellant-based reaction control system."
  - L90 trigger: "Before adding a subsystem, ask whether an existing one can carry the load. A deleted component is more reliable than any tested one."
- "Do not" trap:
  - L91: "add a subsystem 'in case we need it later.' Do not keep two separate consumables / pressurizations / power rails / control paths when one can carry both loads. Do not confuse 'separation of concerns' with 'separate implementations' - they're different arguments."
- Source citations:
  - Falcon User Guide (TVC, Merlin turbopump, GN₂ ACS descriptions)

---

## Principle 6: Design for inspection, access, and (if possible) recovery - from day one.
- Maps to:
  - SPINE 6 iterate-fast (primary)
  - sub: recovery-as-instrumentation (primary)
  - SPINE 3 architecture sub: forbidden-list (no pyro when re-testable mechanism exists)
  - SPINE 4 sub: signal-determinism-check (pneumatic systems can be re-tested; pyros can't)
- Key facts:
  - L95: Table 1-1: "Horizontal manufacturing, processing, and integration ... Reduces work at height during numerous manufacturing, processing, and integration procedures, and eliminates many overhead operations."
  - L95: "All-liquid propulsion architecture: fuel and oxidizer are stored separately on the ground and in the vehicle. Propellant is not loaded into the vehicle until the vehicle is erected for launch."
  - L95: "Non-explosive, pneumatic release and separation systems ... significantly reduce orbital debris signature, can be repeatedly tested during the manufacturing process, and eliminate hazardous pyrotechnic devices."
  - L95: Pneumatic stage separation "allows for acceptance and functional testing of the actual flight hardware, which is not possible with a traditional explosives-based separation system."
  - L97 trigger: "When a proposed design couples two work stages irreversibly (seal, bond, pyro-fire), name what inspection access you permanently lose. That loss is the real cost."
- "Do not" trap:
  - L98: "choose a one-shot / pyro / sealed / write-only mechanism when a re-testable one exists at comparable cost. Do not say 'we'll figure out access later' - access must be designed in. Do not encrypt/hash/compact data in ways that permanently prevent forensic inspection of failures."
- Source citations:
  - Falcon User Guide Table 1-1 (safety benefits); §1 separation system description

---

## Principle 7: One signed ICD, with one party controlling the master.
- Maps to:
  - SPINE 7 infrastructure (primary)
  - sub: signed-contracts (primary)
  - sub: versioned-specs (configuration control of the document)
  - SPINE 2 system-engineering sub: interface-contract (every boundary needs a contract)
- Key facts:
  - L106: "The mission manager will work with the customer to create a spacecraft-to-launch-vehicle interface control document (ICD): the master document for a Falcon launch vehicle mission. Following signature approval of the ICD, SpaceX maintains configuration control of the document."
  - L106: "SpaceX generates and controls the ICD, but input is required from the customer. ICD compliance verification is required prior to launch."
  - L106: ICD signed at L-9 months after mission integration analyses complete.
  - L108 trigger: "If there isn't one signed document naming the interface, there isn't an interface - there's a mutual misunderstanding."
- "Do not" trap:
  - L109: "let 'the interface' live across Slack threads, emails, Jira tickets, and a shared Google Doc with no revision history. Do not let each side keep its own copy that nobody syncs. Do not rely on a verbal agreement at a meeting - 'we all agreed on it' is not an interface."
- Source citations:
  - Falcon User Guide §9 (mission integration / ICD process)

---

## Principle 8: Publish a small menu of standard interfaces; label everything else "nonstandard" explicitly.
- Maps to:
  - SPINE 7 infrastructure (primary)
  - sub: standard-menu (primary)
  - SPINE 3 architecture sub: forbidden-list (the "no 6th option silently" rule)
  - SPINE 1 first-principles-thinking sub: cost-floor-derivation (price the nonstandard so the customer feels it)
- Key facts:
  - L113: "Falcon offers exactly five PAFs (1,575 mm, 2,624 mm, 3,117 mm circular, 3,117 mm strut, Square - §4.1.5) and exactly three clampbands (937 / 1,194 / 1,666 mm - §4.1.7)."
  - L113: "Standard fairing is 5.2 m × 13.2 m; the extended 18.7 m fairing is labeled 'as a nonstandard service.'"
  - L113: "The phrase 'as a nonstandard service' appears repeatedly for: extended fairing, additional fairing access doors, internal fairing RF antenna, breakwire signal, cryogenic propellant loading, GN₂ purge, separate EGSE power, customer processing off-site."
  - L113: Table 4-1 - one-page selector with each PAF's mass limit, keep-in volume file, downloadable CAD.
  - L115 trigger: "Decide consciously: does it become the 4th standard (first-class, qualified, documented) or an explicit nonstandard exception (priced separately)?"
- "Do not" trap:
  - L116: "add a 6th 'standard' option silently. Do not charge the same for a nonstandard variant as for standard - the cost must be visible so the customer feels it. Do not let the nonstandard path silently become the common path - if most customers are asking for the 'exception,' it's a standard."
- Source citations:
  - Falcon User Guide §4.1.5 (PAFs), §4.1.7 (clampbands), Table 4-1

---

## Principle 9: Publish one coordinate frame; require all deliverables in it.
- Maps to:
  - SPINE 7 infrastructure (primary)
  - sub: signed-contracts (frame is part of the contract)
  - sub: machine-consumable-artifacts (frame must be text/parseable, not picture)
  - SPINE 2 system-engineering sub: interface-contract (shared reference is part of the interface)
- Key facts:
  - L120: §4.1.1: "The launch vehicle uses a right-hand X-Y-Z coordinate frame, indicated with the subscript 'LV,' centered 440.69 cm (173.5 in.) aft of the first stage radial engine gimbal, with +X_LV aligned with the vehicle long axis and +Z_LV opposite the TE strongback."
  - L120: "X_LV is the roll axis, Y_LV is the pitch axis, and Z_LV is the yaw axis."
  - L120: Payload frame "PL" - for forward-mounted: "+X_PL aligned with launch vehicle +X_LV ... Customers should provide all data and deliverables in this Payload Coordinate Frame."
  - L122 trigger: "If two teams can legitimately disagree about what a number means, no frame has been fixed."
- "Do not" trap:
  - L123: "accept a file 'in whatever frame the customer uses.' Do not publish the frame only as a picture - origin coordinates, axis definitions, and subscript conventions must be text so tools can parse them. Do not mix timezones, unit systems, or coordinate frames in the same deliverable without explicit per-field tagging."
- Source citations:
  - Falcon User Guide §4.1.1 (LV coordinate frame)

---

## Principle 10: Publish the maximum predicted environment with confidence levels before downstream teams design.
- Maps to:
  - SPINE 7 infrastructure (primary)
  - sub: versioned-specs (envelope is a first-class deliverable)
  - sub: machine-consumable-artifacts (numeric tables, lookups)
  - SPINE 5 testing-sequencing sub: ranked-objectives (shock events ranked by physical mechanism)
  - SPINE 2 system-engineering sub: blast-radius-analysis (per-phase environments)
- Key facts:
  - L128: "primary lateral frequency be above 10 Hz, the primary axial frequency be above 25 Hz, and all secondary structure minimum resonant frequencies be above 35 Hz."
  - L129: Table 5-3 quasi-static loads - three mass classes; light-class gets 4.0 g lateral envelope vs heavy-class 0.5 g.
  - L130: "OASPL 131.4 dB with acoustic blankets; 137.9 dB without (a 6.5 dB penalty for skipping blankets, named explicitly so the customer can price the trade)."
  - L130: "Derived at P95/50 spatial average, 60% fill-factor, per range."
  - L131: Five shock events enumerated; "The first three shock events are negligible for the payload, relative to fairing separation and spacecraft separation, because of the large distance and number of joints over which the shock loads will travel and dissipate." Ranking by physical mechanism.
  - L132: Random vibration 5.13 GRMS at P95/50, three bands with named causes (vehicle modes / aeroacoustics / MVac structure-borne).
  - L133: Table 5-2 environment-per-phase: 8 phases, each with own temperature/humidity/cleanliness/duration.
  - L134: Fairing internal pressure decay ≤ 2.8 kPa/sec, except brief ≤ 4.5 kPa/sec for ≤5 s.
  - L135: Table 5-14 - 2D lookup EIRP × separation velocity → seconds quiet time. 1,000 W at 0.3 m/s = 578 s; at 5 m/s = 35 s.
  - L136: Weather risk Table 3-2 - probability % by UTC hour × month × range; CCSFS 19.4% at 00:00 UTC June vs 4.5% at 09:00 UTC March.
  - L139 trigger: "A good test: can an external integrator design a conforming component from the spec alone, without asking you any questions? If not, publish more."
- "Do not" trap:
  - L140: "hand-wave with 'typical conditions' or 'normally we see.' Do not publish one flat envelope when phases differ. Do not omit the statistical basis (P95/50, percentile, worst-case) - a number without a percentile means nothing. Do not let integrators discover the real envelope through acceptance-test failures."
- Source citations:
  - Falcon User Guide §3.3, §5.3.1, §5.3.5, §5.3.8, §5.4, Tables 3-2, 5-2, 5-3, 5-5–5-7, 5-10, 5-14

---

## Principle 11: Fault tolerance scales with blast radius - tier it explicitly.
- Maps to:
  - SPINE 3 architecture (primary)
  - sub: fault-tolerance-tiering (primary)
  - sub: forbidden-list (Type 4 discouraged, Type 5 N/A; 15% rule; no AM tanks; no bimetallic welded joints)
  - SPINE 2 system-engineering sub: blast-radius-analysis (consequence drives redundancy)
- Key facts:
  - L146: "For systems using hypergolic propellants, or if a system failure may lead to a catastrophic hazard, the system must have dual fault tolerance (three inhibits to propellant release)."
  - L146: "For all other pressure/propellant systems, the system must be at least single fault tolerant (two inhibits to propellant release)."
  - L146: "Inhibits shall be independent and cannot be combined. For example, a single electrical command of two valves in series is not a dual fault tolerant system."
  - L146: Separation: "The preferred method of achieving reliability is two independent actuators on separate circuits."
  - L150–L154: Table 6-1 factors of safety: Flight 1.10/1.25; Ground ops 1.10/1.40; GSE lifting 3.0/4.0.
  - L156: GSE gets 3× flight factor "because personnel are below the load ... Factor should reflect *who pays when it fails*, not just the stress level."
  - L158–L164: Table 6-3 fastener locking preference order; "must incorporate a minimum of one locking feature that does not depend upon preload to function."
  - L166–L173: Table 6-5 pressure vessel types 1–5; Type 4 "use is discouraged"; Type 5 "N/A".
  - L173: "15% Rule": "No Type 2, 3, 4, or 5 pressurized-structure tanks where non-pressure loading makes up more than 15% of maximum combined flight stress." Plus "No additively manufactured tanks," "No bimetallic welded joints."
  - L176 trigger: "If personnel safety is in scope somewhere in your system, that scope gets a bigger factor than pure system reliability. And publish the forbidden configurations explicitly - 'No X' is as important as 'prefer Y.'"
- "Do not" trap:
  - L177: "apply the same redundancy rule to reversible and irreversible actions. Do not count two series valves driven by one electrical command as two inhibits - they share the command failure mode. Do not use the flight factor for ground lifting when humans are below the load. Do not omit the forbidden list - 'No additively manufactured tanks' is as load-bearing as the allowed-types table."
- Source citations:
  - Falcon User Guide §6.4.6, §6.4.2.2, §4.4.1, Tables 6-1, 6-3, 6-5

---

## Principle 12: Ship machine-consumable artifacts, not documents.
- Maps to:
  - SPINE 7 infrastructure (primary)
  - sub: machine-consumable-artifacts (primary)
  - sub: signed-contracts (Appendix specs are part of the contract)
  - SPINE 4 feedback-loops sub: signal-determinism-check (data not procedure text)
- Key facts:
  - L181: Tables 9-2 and 9-3: "Finite-element and CAD models - Used in coupled loads analyses and compatibility assessments. Specific format and other requirements are supplied during the mission integration process."
  - L181: "Appendix E = CAD model requirements; Appendix F = dynamic model requirements; Appendix G = thermal model requirements; Appendix H = Delivery Format of Separation State Vector."
  - L181: "Actual test procedures are not required" for the environmental test statement - "the data, not the procedure text, is what matters."
  - L183 trigger: "For every handoff artifact, ask: can the receiver's tool consume this directly, or do they have to re-type it?"
- "Do not" trap:
  - L184: "send screenshots of tables, PDFs of schematics, or Word docs when CAD / JSON / Parquet is expected. Do not require the receiver to retype, re-mesh, or re-derive what you already have. Do not ship procedure text when what's needed is data."
- Source citations:
  - Falcon User Guide Tables 9-2, 9-3, Appendices E, F, G, H

---

## Principle 13: Walk a fidelity ladder; use cheap rungs to de-risk the expensive ones.
- Maps to:
  - SPINE 5 testing-sequencing (primary)
  - sub: fidelity-ladder-design (primary)
  - SPINE 6 iterate-fast sub: subscale-flight (subscale balloon drops as cheap rungs)
  - SPINE 6 sub: cheap-abort-design (subscale lets you fail cheap)
- Key facts:
  - L192–L197: Maraia ran five rungs before the planned sounding rocket:
    1. Texas A&M low-speed wind tunnel - characterize parachute opening and integrity at opening loads.
    2. China Lake drop tower - characterize parachute geometries, steady-state loads, descent rates.
    3. Small-scale balloon drop from 100,000 ft with 10"/6 lb subscale capsule - aero/stability + gas-parachute deployment.
    4. Chute ejection testing - develop pneumatic deployment (no pyros), small and full-scale.
    5. Full-scale balloon drop from 100,000 ft with 30"/133 lb capsule - full aero, recovery, parachute system.
  - L199: "The two subscale balloon flights 'did not provide usable capsule aerodynamic data' - but they still served as 'development tests for the full scale,' surfacing rigging, release-circuit, and dynamics problems at subscale cost."
  - L201 trigger: "Before a major qualification event, list your assumptions. Can you test the cheapest-to-falsify ones first?"
- "Do not" trap:
  - L202: "skip to the expensive rung to 'save time' - you'll spend the savings three times over on discovery. Do not treat a subscale test as a failure because its primary objective missed; it's still development data for the next rung. Do not conflate 'it's all the same mechanism' with 'one scale proves all scales' - the Maraia subscale tests flew, but their flight dynamics were different enough that the data wasn't usable for the full-scale aero model."
- Source citations:
  - Maraia Figure 2 (test sequence); Maraia subscale flight reports

---

## Principle 14: Rank objectives before the test; report honestly against the ranking.
- Maps to:
  - SPINE 5 testing-sequencing (primary)
  - sub: ranked-objectives (primary)
  - SPINE 4 feedback-loops sub: pre-commitment-gate (objectives written down before execution)
- Key facts:
  - L206: Maraia Flight #1: "The primary test objective, obtaining performance data on the aerodynamic and dynamic properties of the sub-scale capsule, was not met since the release box was still attached during the freefall ... However, all secondary test objectives were met, including successful autonomous parachute deployment, demonstration of avionics and GN&C in flight, execution of ground commands in flight and observation of system response, and recovery of both payloads."
  - L206: Full-scale balloon: "All objectives were met with the exception of the video objective."
  - L208 trigger: "Before any experimental cycle (launch, A/B test, rollout), write the 2–5 objectives ranked. Define pass/fail per objective. Report in that exact structure."
- "Do not" trap:
  - L209: "report only the objectives that passed. Do not re-rank objectives after the results come in so the report looks better. Do not merge 'primary met' and 'some secondaries met' into a single 'successful test' line."
- Source citations:
  - Maraia Flight #1 report; Maraia full-scale balloon flight report

---

## Principle 15: Test-like-you-fly - and document every deviation.
- Maps to:
  - SPINE 5 testing-sequencing (primary)
  - sub: not-because-of-x-clauses (primary - "not because of other factors such as software delays")
  - sub: fidelity-ladder-design (each test rung's "flight-like" definition)
  - SPINE 4 feedback-loops sub: signal-determinism-check (close paths to passing for wrong reasons)
- Key facts:
  - L213: §7.1.2: "A test approach summary, using the SpaceX test template, including any and all test-like-you-fly exceptions and deviations from this guide ... The results must include all new test-like-you-fly exceptions for approval by SpaceX, including details on test versus flight boundary conditions and any hardware not included in the test set up that will be in the flight configuration."
  - L216: §7.4.6 activation inhibits: "all necessary power components and harnesses must be fully integrated and in a flight-like state. Batteries must be in their flight-like charge state and any RBF/GSE inhibits must be removed. Verification testing must show that power to the deployable, propulsion, and other hazardous secondary devices was successfully inhibited from a mechanical separation signal, and not because of other factors such as software delays."
  - L217: §7.4.1 quasi-static loads: "Customers must account for CG and mass differences in test and adjust levels and/or use fluid simulants to represent propellant mass, where necessary."
  - L218: §5.3.7.5 lightning retest: "based on lightning distance and amplitude data measured using Range-provided lightning monitoring systems ... Customers must provide their own retest thresholds so they pre-commit to what level of strike matters."
  - L221 trigger: "go line-by-line and enumerate every difference between test and production: CG, mass, liquids vs simulants, power state, connection sequence, environmental exposures the test can't reproduce. Empty list = you haven't looked hard enough. For every test, write the 'not because of X' clauses - what could make this pass for the wrong reason?"
- "Do not" trap:
  - L222: "use mass simulators, charge-dummies, or stub services without flagging them as deviations. Do not accept a test pass that could be passing for the wrong reason - software delay masking a real inhibit failure; load applied at wrong CG; static propellant instead of fluid simulant. Do not assume your staging environment matches production just because the config says it does."
- Source citations:
  - Falcon User Guide §7.1.2, §7.4.1, §7.4.6, §5.3.7.5

---

## Principle 16: Split tests into Required vs Advised; make risk acceptance explicit for the skipped ones.
- Maps to:
  - SPINE 5 testing-sequencing (primary)
  - sub: ranked-objectives (test tiers ranked by what they protect)
  - SPINE 4 feedback-loops sub: pre-commitment-gate (signed acknowledgment before skipping)
  - SPINE 7 infrastructure sub: signed-contracts (acknowledgment as artifact)
- Key facts:
  - L226: Table 7-1: "Static load, sine vibration, activation inhibits, EMC, leak test, random vibration = REQUIRED. Shock, thermal vacuum/thermal cycle = ADVISED."
  - L226: "tests that are 'advised' are designed to ensure on-orbit health and functionality of the payload but are not required to fly on a SpaceX Falcon 9/Falcon Heavy mission. Tests that are 'required' must be completed by the customer to ensure mission safety through payload separation."
  - L226: "If customer chooses not to complete any 'advised' tests, an acknowledgement of the inherent risks to the payload incurred by not completing the 'advised' testing must be included."
  - L228 trigger: "name the subset that protects system safety (required) vs the subset that protects the skipper's own outcomes (advised). Make skipping advised tests require a signed acknowledgment."
- "Do not" trap:
  - L229: "mark everything 'recommended' - nothing gets done and you have no floor. Do not mark everything 'mandatory' - the floor erodes under pressure. Do not let people skip advised tests without a written acknowledgment that attaches their name to the decision."
- Source citations:
  - Falcon User Guide Table 7-1, §7.1

---

## Principle 17: Offer multiple verification strategies sized to the customer's economics.
- Maps to:
  - SPINE 7 infrastructure (primary)
  - sub: standard-menu (primary - three named approaches)
  - SPINE 5 testing-sequencing sub: fidelity-ladder-design (proto/qual/acceptance/LAT as tiers)
- Key facts:
  - L235: "(a) Flight Unit Protoqualification: the flight unit itself is tested at protoqual levels (e.g., static ≥ 1.25× limit; sine at limit × 1.25). 'Validates both structural design and workmanship, while allowing for reduced test factors and durations.'"
  - L237: "(b) Unit/Fleet Qualification and Acceptance: a dedicated non-flown qual unit tests at full qual levels; every flight unit is tested only at acceptance levels."
  - L239: "(c) Constellation/Lot Acceptance Testing (LAT): for 10+ identical payloads. First five serial numbers + every fifth thereafter fully tested at integrated level; others get subscale workmanship screening only (Table I-1 example schedule for 20 payloads)."
  - L242 trigger: "When writing a verification policy, offer a menu. Low volume → protoqual. High volume → sample. One-off → dedicated qual."
- "Do not" trap:
  - L243: "force one verification strategy on everyone regardless of volume. Do not require a sacrificial qualification unit from a one-off customer, or 100% integrated testing of a 10,000-unit constellation. Do not let the strategy drift silently - if a customer is doing something between two strategies, name the new strategy or push them back into one."
- Source citations:
  - Falcon User Guide §7.1, Appendix I (LAT Table I-1)

---

## Principle 18: Define retest triggers BEFORE the events that would trigger them.
- Maps to:
  - SPINE 5 testing-sequencing (primary)
  - sub: numeric-retest-trigger (primary - exact numeric thresholds)
  - SPINE 4 feedback-loops sub: pre-commitment-gate (criteria pre-agreed in writing)
  - SPINE 7 infrastructure sub: signed-contracts (LAT schedule pre-agreement)
- Key facts:
  - L249: "Type 1 - Penalty Retest (workmanship drift). Triggers: 'Spacecraft not tested in integrated manner ...'; 'Rework of primary load path or externally mounted interfaces, resulting in more than twenty fasteners reworked on secondary structures'; 'Rework of fasteners smaller than #3 (or smaller than M2.5).' Retest: random vibration or acoustic testing at MPE levels for 30 seconds in each of 3 axes."
  - L251: "Type 2 - Delta Qualification (design change). Triggers: 'Any change that affects payload structural load path or interfaces with externally mounted appendages'; 'Any changes detected from component level acceptance testing'; 'Major change in assembly and/or manufacturing processes (production line interruptions for 6+ months, change in final assembly work instructions, change in secondary retention methods, supplier/personnel change).' Retest: delta protoqualification at the affected SN + acceptance test."
  - L254 trigger: "For any component/service subject to rework or updates, write the trigger matrix now: 'If X changes, we do Y retest at Z levels.'"
- "Do not" trap:
  - L255: "decide 'does this change need a retest?' after the change. Do not leave retest criteria as 'engineering judgment' - write the numeric thresholds (20 fasteners, M2.5, 6 months of production pause) so the criteria don't move when the ship date gets close. Do not grandfather in changes retroactively."
- Source citations:
  - Falcon User Guide Table 7-2

---

## Principle 19: Match the model to the flight data; update the model so future designs inherit the correction.
- Maps to:
  - SPINE 4 feedback-loops (primary)
  - sub: model-fudge-factor (primary - the literal -0.078 C_A correction)
  - SPINE 1 first-principles-thinking sub: assumption-audit ("which assumption did this contradict?")
  - SPINE 6 iterate-fast sub: recovery-as-instrumentation (flight data feeds models)
- Key facts:
  - L259: "The vehicle sensors supplied position, velocity, attitude, and attitude rate. The aerodynamic model in the FAST simulation was systematically adjusted in order to match the flight data ... A constant value of -0.078 was added to C_A in order to achieve this matching."
  - L259: "The pre-flight simulation 'actually shows a fairly unstable vehicle. The flight showed a limit cycle behavior on the angle of attack and sideslip parameters.'"
  - L259: "Figure 19 shows the extracted C_{m,q} model from the matching." Pre-flight Cm,q based on Apollo data + CFD; post-flight uses real flight-extracted curves Mach 0.3–0.8.
  - L261 trigger: "After every deployment/test, ask: 'Which assumption in our model did this contradict?' Update the model. Models compound; reports don't."
- "Do not" trap:
  - L262: "stash findings in a report and reuse the pre-flight model for the next design. Do not present flight data as 'confirming the model' when the model needed a -0.078 fudge factor to match. Do not let the 'lessons learned' document be a deliverable that nobody reads - it must propagate into the model, the simulator, and the reference data."
- Source citations:
  - Maraia post-flight reconstruction (FAST simulation match; Figure 19 C_{m,q})

---

## Principle 20: Gate the schedule by named reviews with pass/fail criteria - not by calendar dates.
- Maps to:
  - SPINE 4 feedback-loops (primary)
  - sub: pre-commitment-gate (primary - every gate has a named artifact)
  - SPINE 7 infrastructure sub: signed-contracts (named artifacts as the contract)
  - SPINE 5 testing-sequencing sub: ranked-objectives (each gate answers a specific question)
- Key facts:
  - L270–L280: Table 9-1 gates:
    - L-24 mo Contract signature: "Provide authority to proceed with work"
    - L-18 Mission integration kickoff: "Present project schedule, summary of mission requirements and proposed preliminary design solutions"
    - L-9 Mission integration analyses complete: "Deliver mission-unique design and analysis results to the customer and prepares the ICD for signature"
    - L-2 Launch campaign readiness review: "Verify that all people, parts, and paper are ready"
    - L-1 day Launch readiness review: "Verify readiness to proceed with the countdown and launch, including launch Range and FAA concurrence"
    - Sep+TBD min Orbit injection report: "Delivers best-estimate state vector, attitude, and attitude rate"
    - L+8 wk Flight report: "Reports the flight, environments, separation state, and a description of any mission-impacting anomalies"
  - L283 trigger: "For any multi-month initiative, define the gates first. Each gate needs a named artifact whose absence fails the gate."
- "Do not" trap:
  - L284: "gate the schedule on calendar dates ('Q3 launch'). Do not let a review pass without the named artifact present - 'we're 90% done on the ICD' is not a signed ICD. Do not treat a gate slip as a schedule slip only; treat it as a scope/readiness signal."
- Source citations:
  - Falcon User Guide Table 9-1

---

## Principle 21: One named point of contact, from contract to post-flight report.
- Maps to:
  - SPINE 7 infrastructure (primary)
  - sub: lean-org-pattern (primary - single channel across silos)
  - SPINE 2 system-engineering sub: apex-identification (the MM is the apex node)
  - SPINE 4 feedback-loops sub: co-location-pattern (one owner = no handoff latency)
- Key facts:
  - L288: §9.2: "SpaceX provides each Falcon launch services customer with a single technical point of contact from contract award through launch."
  - L288: MM "responsible for coordinating mission integration analysis and documentation deliverables, planning integration meetings and reports, conducting mission-unique design reviews (as required), and coordinating all integration and test activities."
  - L288: MM "also coordinates all aspects of launch vehicle production, Range and Range Safety integration, and all mission-required licensing leading up to the launch campaign."
  - L288: Figure 9-1 - MM is single channel between customer and F9 Vehicle Eng, Avionics, Build & Flight Reliability, Production, Launch, plus external Range Safety, FAA, FCC.
  - L290 trigger: "Any multi-phase customer engagement. Name one accountable owner from start to end, with internal authority across all the silos."
- "Do not" trap:
  - L291: "rotate the customer owner between integration, operations, and post-flight. Do not let the customer call different names for different technical issues. Do not confuse 'account manager' with 'technical owner' - the technical owner needs authority inside your org, not just rapport with the customer."
- Source citations:
  - Falcon User Guide §9.2, Figure 9-1

---

## Principle 22: Separate standalone operations from joint operations with a hard boundary.
- Maps to:
  - SPINE 2 system-engineering (primary)
  - sub: interface-contract (primary - explicit handoff moment)
  - sub: cascade-tracing (overlap creates collisions across crane lifts, ECS, procedures)
  - SPINE 6 iterate-fast sub: fail-controlled (hard boundary keeps failures local)
- Key facts:
  - L296: Figure 10-1: "Spacecraft Standalone Operations (L-22 to L-8): Launch team arrival (L-22), spacecraft unpacking (L-21 to L-17), electrical checkout (L-16 to L-10), prop load (L-9 to L-8), RBF removal. 'typically over a 15-day period.' Customer owns."
  - L297: "Joint Operations begin at L-7: 'Payload attachment to the PAF and fairing encapsulation are performed by SpaceX within the PPF.' Mate to adapter → encapsulation → transport to hangar → Falcon transporter-erector mate → rollout (L-2) → launch (L-0). SpaceX owns, customer supports."
  - L299: "All spacecraft processing operations within the PPF must be completed by L-7 days to allow for mating to the payload adapter, fairing encapsulation, and transportation to the launch vehicle integration hangar."
  - L301 trigger: "Define the moment of handoff. Before: X owns fully. After: Y owns fully. Zero overlap."
- "Do not" trap:
  - L302: "run standalone and joint operations concurrently in the same facility. Do not allow ambiguous authority during overlap - one phase ends the hour the next begins. Do not let the customer 'finish up a few things' after joint ops have started - that's how you get cable catches and schedule slippage."
- Source citations:
  - Falcon User Guide Figure 10-1

---

## Principle 23: Facility topology encodes your operational model - design for parallelism.
- Maps to:
  - SPINE 2 system-engineering (primary)
  - sub: system-graph-mapping (primary - facility/topology graph)
  - sub: cascade-tracing (shared bottleneck = serialized teams)
  - SPINE 7 infrastructure sub: lean-org-pattern (parallelism enabled by physical layout)
- Key facts:
  - L306: Building 398 PPF: "three independently operating processing bays with matching control/EGSE rooms supported by garment/changeout rooms for personnel entry."
  - L306: "Control rooms are nearly identical and are intended to operate independently."
  - L306: "Bay 1 is separated by a 13' high security partition from the rest of the clean room."
  - L306: Figure 8-12 - separate paths for personnel and hardware. Gowning rooms "badge-controlled."
  - L306: Hazardous ops accommodation: "Any required fueling operations will be performed by customer personnel with assistance from SpaceX personnel. All personnel must use certified SCAPE suits, pass a physical medical evaluation, and attend SCAPE training classes."
  - L308 trigger: "When N workstreams share a facility (physical or logical - one DB, one CI runner, one staging environment), ask whether real parallelism exists or you've built a serial bottleneck."
- "Do not" trap:
  - L309: "design a shared bay and expect parallel work. Do not accept 'one DB / one CI runner / one staging env' as 'shared infrastructure' without acknowledging you've serialized your teams on that bottleneck. Do not plan parallelism at the org level if the facility enforces serial."
- Source citations:
  - Falcon User Guide §8 (Building 398 PPF), Figure 8-12

---

## Principle 24: Design rollback cheap so you can afford conservative go/no-go criteria.
- Maps to:
  - SPINE 6 iterate-fast (primary)
  - sub: cheap-abort-design (primary)
  - sub: fail-controlled (recycle without expensive teardown)
  - SPINE 4 feedback-loops sub: pre-commitment-gate (cheap abort enables strict gates)
- Key facts:
  - L313: §10.5.6: "Falcon launch vehicle systems and operations have been designed to enable recycle operations when appropriate. In the event of a launch scrub, the transporter-erector and launch vehicle will typically stay vertical."
  - L313: "Remaining on the pad provides uninterrupted payload-to-EGSE connectivity through the T-0 umbilical, eliminating the need to relocate EGSE from the instrumentation bay to the hangar after a scrub."
  - L313: "However, for any long-duration launch postponements, SpaceX will return the vehicle on the transporter-erector to the hangar."
  - L313: "The vehicle will typically be erected only once, although the capability exists to easily return it to a horizontal orientation if necessary."
  - L315 trigger: "For any release/deploy, ask: 'If we abort halfway, how long to reset?' If it's 'hours' when you want 'minutes,' design for cheaper aborts before tightening gates."
- "Do not" trap:
  - L316: "design only the happy path. Do not accept hour-long recoveries from aborts that should take minutes - under schedule pressure, operators will silently loosen the go/no-go criteria to avoid triggering the expensive abort. Do not conflate 'we can roll back' with 'rollback is cheap'; if rollback takes longer than the original deploy, you'll avoid using it."
- Source citations:
  - Falcon User Guide §10.5.6

---

## Principle 25: Pre-execution readiness = People, Parts, Paper. All three, explicitly.
- Maps to:
  - SPINE 1 first-principles-thinking (primary)
  - sub: capability-gate-decomposition (primary - three independent axes)
  - SPINE 4 feedback-loops sub: pre-commitment-gate (L-2 review as gate)
  - SPINE 7 infrastructure sub: signed-contracts (FAA / Range concurrence as paper)
- Key facts:
  - L320: L-2 review: "Verify that all people, parts, and paper are ready for the shipment of the payload to the launch site."
  - L320: L-1 review: "Verify readiness to proceed with the countdown and launch, including launch Range and FAA concurrence."
  - L320: Non-US customer Table 9-3: "FAA payload determination info, launch site visitor info, launch site GSE details for import/export compliance."
  - L320: "SpaceX will facilitate pre-approval, badging, and access for customer personnel requiring access to CCSFS."
  - L322 trigger: "Before any critical execution, run the three-column check: People trained and on site? Hardware/code ready and tested? Approvals, licenses, signatures in hand?"
- "Do not" trap:
  - L323: "check only two of three. 'Parts ready' is not 'team trained on parts'; 'team ready' is not 'FAA license issued'; 'everyone ready' is not 'docs signed.' Do not assume readiness transitively - each column must be checked on its own."
- Source citations:
  - Falcon User Guide Table 9-1 (L-2, L-1 reviews), Table 9-3 (non-US deliverables)

---

## Principle 26: Commit only after the system proves itself in flight configuration - the hold-down principle.
- Maps to:
  - SPINE 4 feedback-loops (primary)
  - sub: pre-commitment-gate (primary - the hold-down is the gate)
  - SPINE 6 iterate-fast sub: cheap-abort-design ("safe shutdown ... if any off-nominal condition is detected")
  - SPINE 5 testing-sequencing sub: not-because-of-x-clauses (pass-criteria gate before release)
- Key facts:
  - L331: §1.5.1 + §10.5.5: "During Falcon launch operations, the first stage is held on the ground after engine ignition while automated monitors confirm nominal engine operation. An autonomous safe shutdown is performed if any off-nominal condition is detected."
  - L331: "Hold-on-pad operations, enabled by the launch vehicle's all-liquid propulsion architecture and autonomous countdown sequence, significantly reduce risks associated with engine start-up failures and underperformance."
  - L331: "Engine ignition occurs shortly before liftoff, while the vehicle is held down at the base via hydraulic clamps. The flight computer evaluates engine ignition and full-power performance during the prelaunch hold-down, and if nominal criteria are satisfied, the hydraulic release system is activated at T-0. A safe shutdown is executed should any off-nominal condition be detected."
  - L333 trigger: "Any irreversible deploy. Can you 'ignite but hold' - run the final configuration with real telemetry, evaluate nominal, and release only then?"
- "Do not" trap:
  - L334: "commit an irreversible action without an in-configuration verification. Do not substitute 'it worked in staging' for 'this build, on this hardware, passed nominal before release.' Do not conflate unit tests with the hold-down check - unit tests verify the parts; hold-down verifies the integrated system in its final configuration."
- Source citations:
  - Falcon User Guide §1.5.1, §10.5.5

---

## Principle 27: Automate the reflex loop; give humans abort authority and judgment calls.
- Maps to:
  - SPINE 4 feedback-loops (primary)
  - sub: loop-latency-measurement (primary - humans too slow for ms; too good for procedural)
  - SPINE 2 system-engineering sub: apex-identification (5-role Launch Control Org)
  - SPINE 6 iterate-fast sub: fail-controlled (AFTS terminates on rule violation)
- Key facts:
  - L338: "Automated software sequencers control all critical Falcon vehicle functions during terminal countdown."
  - L338: "Falcon's flight computers will command shutdown of the nine first stage engines based on achieving the target velocity or on remaining propellant levels."
  - L338: "The launch vehicle monitors each engine individually during ascent and can, if necessary, preemptively command shutdown of off-nominal engines, provided the minimum injection success criteria are achievable with the remaining engines."
  - L338: "Our launch vehicles are equipped with an autonomous flight termination system (AFTS) to limit the potential damage caused by a launch vehicle malfunction. The system terminates the flight of the vehicle automatically if mission rules are violated."
  - L338: "The five-role Launch Control Organization (Chief Engineer, Mission Manager, Launch Director, Range Operation Commander, Operations Safety Manager) makes decisions - not timing."
  - L340 trigger: "Classify every step: reflex (ms), procedural (s–min), judgment (min–hr). Automate reflex. Script procedural with human oversight. Leave judgment to humans."
- "Do not" trap:
  - L341: "put humans in ms-scale loops - they'll be too slow or too wrong. Do not automate judgment calls with rigid rules that can't handle novel situations. Do not merge the pilot and dispatcher roles - one executes the sequence, one decides what sequence to run."
- Source citations:
  - Falcon User Guide §10 (terminal countdown automation, AFTS); Launch Control Organization roles

---

## Principle 28: Engine-out: build a control plane that actively reroutes around failure, and prove it in production.
- Maps to:
  - SPINE 3 architecture (primary)
  - sub: fault-tolerance-tiering (primary - supervisor as part of redundancy)
  - SPINE 4 feedback-loops sub: signal-determinism-check (supervisor decisions in time window)
  - SPINE 2 system-engineering sub: apex-identification (system-level vehicle management software)
- Key facts:
  - L345: "By employing multiple first stage engines, SpaceX offers the world's first evolved expendable launch vehicle (EELV)-class system with engine-out capability through much of first-stage flight."
  - L345: "System-level vehicle management software controls the shutdown of engines in response to off-nominal engine indications; this has been demonstrated in flight, with 100% primary mission success."
  - L345: "each engine is housed within its own metal bay to isolate it from neighboring engines."
  - L345: "Heavy also has engine-out on 27 engines: 'The launch vehicle monitors each engine individually during ascent and can, if necessary, preemptively command shutdown of off-nominal engines.'"
  - L347 trigger: "If a component in your production system fails, which other component decides what to do - in the time window where the decision still matters?"
- "Do not" trap:
  - L348: "install redundant hardware (3-replica DB, multi-AZ deployment, N+1 workers) without the supervisor that actively routes around failure. Do not accept 'page a human' as a control plane for time-critical decisions - by the time the human is awake, the window has closed. Do not assume the cloud provider's supervisor is yours; read the SLA."
- Source citations:
  - Falcon User Guide §1 (engine-out capability); §10 (engine monitoring on Heavy)

---

## Principle 29: Define operational roles by decision authority, not reporting lines.
- Maps to:
  - SPINE 2 system-engineering (primary)
  - sub: apex-identification (primary - five-role decision tree)
  - sub: interface-contract (decision authority is a contract)
  - SPINE 7 infrastructure sub: lean-org-pattern (decision tree ≠ org chart)
- Key facts:
  - L352–L361: Table 10-2 / Figure 10-8 five ops roles:
    - Chief Engineer (SpaceX) - technical approval of vehicle state
    - Mission Manager (SpaceX) - mission-level coordination
    - Launch Director (SpaceX) - overall go/no-go
    - Range Operation Commander (Range) - range go/no-go
    - Operations Safety Manager (Range) - safety go/no-go
  - L362: "Customer provides a Customer Launch Director interfacing with the SpaceX MM. 'The launch control organization and its lines of decision-making are shown in Figure 10-8.'"
  - L364 trigger: "For incident response, list the decisions (rollback? escalate? cut traffic? evacuate?). Put exactly one name next to each. That list is your decision tree."
- "Do not" trap:
  - L365: "derive the incident-response tree from the org chart. Do not let a decision have zero names (bystander effect) or more than one name (deadlock) attached. Do not use 'whoever is on-call' - on-call is a rotation of the role, not the role itself; the role is the decision authority."
- Source citations:
  - Falcon User Guide Table 10-2, Figure 10-8

---

## Principle 30: Two-speed post-execution reporting: fast unblock, slow learning - both with hard deadlines.
- Maps to:
  - SPINE 4 feedback-loops (primary)
  - sub: two-speed-reporting (primary)
  - SPINE 7 infrastructure sub: signed-contracts (both reports as committed deliverables)
  - SPINE 6 iterate-fast sub: recovery-as-instrumentation (flight report drives learning)
- Key facts:
  - L370: "Separation + TBD minutes: Orbit injection report - 'Delivers best-estimate state vector, attitude, and attitude rate based on initial data.'"
  - L371: "L + 8 weeks: Flight report - 'Reports the flight, environments, separation state, and a description of any mission-impacting anomalies and progress on their resolution.'"
  - L373: Final post-flight report "will include payload separation confirmation, ephemeris, payload environments, significant events, and any mission-impacting anomalies."
  - L375 trigger: "After any execution, produce both: an 'unblock customer now' report immediately, and a 'learning artifact' by a fixed calendar date."
- "Do not" trap:
  - L376: "ship only the quick report - the learning dies. Do not ship only the thorough one - the customer is blocked until week 8. Do not merge them into a single 'we'll do it when we have time' document - that document does not get written."
- Source citations:
  - Falcon User Guide §9.3, Table 9-1

---

## Principle 31: Recovery of flown hardware is an instrumentation strategy, not just cost reduction.
- Maps to:
  - SPINE 6 iterate-fast (primary)
  - sub: recovery-as-instrumentation (primary)
  - sub: subscale-flight (each booster reflight = a scaled-up evidence event)
  - SPINE 4 feedback-loops sub: signal-determinism-check (recovered hardware = highest-grade signal)
- Key facts:
  - L384: §1.3: "As of February 2025, SpaceX has re-flown Falcon first stage boosters more than 384 times with a 100% success rate."
  - L384: "Since 2018, SpaceX had more missions launching with a flight-proven first-stage booster than a first flight booster."
  - L384: "SpaceX also started re-flying fairings in late 2019, and as of February 2025 has re-flown fairing halves on 307 missions with a 100% success rate."
  - L384: "By re-flying boosters and fairings, SpaceX increases reliability and improves its designs and procedures by servicing and inspecting hardware as well as incorporating lessons that can only be learned from flight."
  - L384: §1.5.3: "Stage recoverability also provides a unique opportunity to examine recovered hardware and assess design and material selection to continually improve Falcon 9 and Falcon Heavy."
  - L386 trigger: "Any process producing artifacts (crashed jobs, deprecated instances, returned units, failed experiments). Are you collecting them for inspection, or letting them evaporate?"
- "Do not" trap:
  - L387: "discard flown/crashed/returned units without inspection. Do not treat reuse as only a cost-saving measure - it's your highest-quality learning signal. Do not delete logs, core dumps, or ephemeral container state on a schedule shorter than your investigation cycle."
- Source citations:
  - Falcon User Guide §1.3, §1.5.3 (reusability statistics through Feb 2025)

---

## Principle 32: Version the interface spec and publish an itemized changelog.
- Maps to:
  - SPINE 7 infrastructure (primary)
  - sub: versioned-specs (primary)
  - sub: signed-contracts (versioned spec is the contract)
  - SPINE 4 feedback-loops sub: two-speed-reporting (per-revision changelog as fast signal to integrators)
- Key facts:
  - L392–L394: "Change Log shows 8 versions over 10 years: v1 Oct 2015 (original); v2 May 2016, v3 Jan 2019, v4 Apr 2020, v5 Aug 2020, v6 Aug 2021, v7 Sep 2021; v8 Mar 2025 - explicit itemized list: Section 3.3 Launch Windows, Section 3.6 Multiple Payloads & Constellation, Section 4 Interfaces, Section 5 Environments, Section 6 Payload Design Requirements, Section 7 Verification, Appendices A–I."
  - L396: "SpaceX reserves the right to update this user's guide as required. Future revisions are assumed to always be in process as SpaceX gathers additional data and works to improve its launch vehicle design."
  - L398 trigger: "If your customer-visible API/interface spec doesn't have a version number and an itemized per-revision changelog, it isn't a contract - it's a memo that may already be stale."
- "Do not" trap:
  - L399: "silently update the spec. Do not release a 'v2' without an itemized diff against v1. Do not assume integrators will notice changes without being told - they won't, until it breaks their integration."
- Source citations:
  - Falcon User Guide front-matter Change Log (v1 Oct 2015 → v8 Mar 2025)

---

## Principle 33: Close the loop: anomaly → root cause → design change → test change. All four or none.
- Maps to:
  - SPINE 6 iterate-fast (primary)
  - sub: four-box-closure (primary - the four boxes are root cause / design / test / doc)
  - SPINE 4 feedback-loops sub: model-fudge-factor (electrical setup modified for future flights)
  - SPINE 5 testing-sequencing sub: numeric-retest-trigger (tests must update to catch the recurrence)
- Key facts:
  - L403: Maraia Flight #1: "An eyebolt failure on the capsule occurred immediately after launch, causing the two-point attach to the upper payload to become a single point attach ... At 72,500 ft, the command to release the capsule was sent. No release was observed."
  - L403: "It was determined during post-test analysis that the twisting of the capsule during ascent caused the electrical connection of the burn circuit to pull loose from the power source. The command was received by the avionics, but the lack of power to the release box system prevented it from functioning properly. (The electrical setup of this system was modified for future flights.)"
  - L405: Falcon §9.5.4: "In the event of an anomaly, mishap, accident, or other event ... customer will cooperate with SpaceX, any insurers, and federal, state, and local government agencies, in their respective investigations of the event, including the completion of witness statements, if applicable."
  - L405: Flight Report at L+8 weeks must include "a description of any mission-impacting anomalies and progress on their resolution."
  - L407 trigger: "For every anomaly, check four boxes before closing: root cause named, design updated, test now catches it, documentation revised. If any box is empty, the loop is open."
- "Do not" trap:
  - L408: "close an anomaly ticket with only the root cause documented. Do not file the post-mortem and move on - the loop stays open until the design changed, the test that would have caught it exists, and the doc reflects the change. Do not accept 'training fix' or 'we'll be more careful' as a resolution - a process fix is not a design fix."
- Source citations:
  - Maraia Flight #1 anomaly report (eyebolt + electrical pull-loose); Falcon User Guide §9.5.4, Table 9-1 (L+8 wk Flight Report)

---

## Skill → Principle Map (inverted)

### SPINE 1: first-principles-thinking
- **cost-floor-derivation**: Principle 3 (forks divide qualification base), Principle 8 (price the nonstandard so customer feels it)
- **assumption-audit**: Principle 5 (audit "do we need a separate subsystem?"), Principle 19 ("which assumption did this contradict?")
- **analogy-detector**: *(no direct primary mapping in source; tangentially relates to Principle 19 where pre-flight Cm,q was based on Apollo data + CFD analogy and got contradicted by flight data - analogy detection is implicitly behind that contradiction, but not stated as a discipline in the source)*
- **capability-gate-decomposition**: Principle 25 (People / Parts / Paper as three independent axes)
- **re-derive-from-physics**: Principle 5 (fuel as hydraulic fluid; turbopump shared shaft; GN₂ vs propellant ACS)

### SPINE 2: system-engineering
- **system-graph-mapping**: Principle 23 (facility topology = operational graph)
- **blast-radius-analysis**: Principle 2 (each handoff = a counted failure mode), Principle 10 (per-phase environments), Principle 11 (consequence drives redundancy)
- **cascade-tracing**: Principle 22 (overlap creates collisions - crane lifts, ECS), Principle 23 (shared bottleneck serializes teams)
- **apex-identification**: Principle 21 (MM as apex node), Principle 27 (Launch Control Org), Principle 28 (system-level vehicle management software), Principle 29 (five-role decision tree)
- **interface-contract**: Principle 2 (every transition named), Principle 7 (signed ICD), Principle 9 (coordinate frame as part of interface), Principle 22 (handoff moment), Principle 29 (decision authority as contract)

### SPINE 3: architecture
- **failure-corpus-mapping**: Principle 1 (primary - Aerospace 2001 study → 3 axes)
- **fault-tolerance-tiering**: Principle 11 (primary - inhibits, FoS, locking, vessel types), Principle 28 (supervisor as part of redundancy)
- **forbidden-list**: Principle 2 (deletion as discipline), Principle 5 (no separate hydraulic fluid), Principle 6 (no pyro when re-testable exists), Principle 8 (no silent 6th option), Principle 11 (Type 4 discouraged, Type 5 N/A, no AM tanks, no bimetallic)
- **three-axes-decomposition**: Principle 1 (engines / avionics / staging), Principle 3 (Heavy = 3× F9 first stages, same 2nd stage, same fairing)

### SPINE 4: feedback-loops
- **loop-latency-measurement**: Principle 4 (latency dominates reliability), Principle 27 (ms / s / min–hr classification)
- **signal-determinism-check**: Principle 6 (pneumatic re-testable vs pyro one-shot), Principle 12 (data not procedure text), Principle 15 ("not because of X" closes false-pass paths), Principle 28 (supervisor decisions in time window), Principle 31 (recovered hardware = highest-grade signal)
- **co-location-pattern**: Principle 4 (primary), Principle 21 (one owner = no handoff latency)
- **pre-commitment-gate**: Principle 14 (objectives written before execution), Principle 16 (signed acknowledgment before skipping), Principle 18 (criteria pre-agreed in writing), Principle 20 (named gate artifacts), Principle 24 (cheap abort enables strict gates), Principle 25 (L-2 / L-1 readiness reviews), Principle 26 (hold-down as gate)
- **two-speed-reporting**: Principle 30 (primary - orbit injection vs flight report), Principle 32 (per-revision changelog)
- **model-fudge-factor**: Principle 19 (primary - -0.078 C_A correction), Principle 33 (electrical setup modified for future flights)

### SPINE 5: testing-sequencing
- **fidelity-ladder-design**: Principle 13 (primary - 5 Maraia rungs), Principle 15 ("flight-like" definitions per test), Principle 17 (proto / qual / acceptance / LAT as tiers)
- **ranked-objectives**: Principle 10 (shock events ranked by physical mechanism), Principle 14 (primary), Principle 16 (required vs advised tiers), Principle 20 (each gate answers a specific question)
- **numeric-retest-trigger**: Principle 18 (primary - 20 fasteners, M2.5, 6-month pause), Principle 33 (test must update to catch recurrence)
- **not-because-of-x-clauses**: Principle 15 (primary - "not because of software delays"), Principle 26 (gate before release closes false-pass paths)

### SPINE 6: iterate-fast
- **four-box-closure**: Principle 33 (primary - anomaly / design / test / doc)
- **cheap-abort-design**: Principle 13 (subscale lets you fail cheap), Principle 24 (primary - recycle without teardown), Principle 26 (safe shutdown if off-nominal)
- **recovery-as-instrumentation**: Principle 6 (primary - design for inspection from day one), Principle 19 (flight data feeds models), Principle 30 (flight report drives learning), Principle 31 (primary - flown hardware = instrumentation strategy)
- **fail-controlled**: Principle 22 (hard boundary keeps failures local), Principle 24 (recycle without expensive teardown), Principle 27 (AFTS terminates on rule violation)
- **subscale-flight**: Principle 13 (primary - Maraia subscale balloon drops), Principle 31 (each reflight = scaled-up evidence event)

### SPINE 7: infrastructure
- **signed-contracts**: Principle 7 (primary - ICD), Principle 9 (frame in contract), Principle 12 (Appendix specs), Principle 16 (acknowledgment as artifact), Principle 18 (LAT schedule pre-agreement), Principle 20 (named gate artifacts), Principle 25 (FAA / Range concurrence), Principle 30 (both reports as deliverables), Principle 32 (versioned spec is the contract)
- **standard-menu**: Principle 3 (one core, not many variants), Principle 8 (primary - five PAFs, three clampbands), Principle 17 (primary - three verification approaches)
- **machine-consumable-artifacts**: Principle 9 (frame must be parseable text), Principle 10 (numeric tables, lookups), Principle 12 (primary - CAD/FEM not Word docs)
- **versioned-specs**: Principle 7 (configuration control), Principle 10 (envelope as first-class deliverable), Principle 32 (primary - v1 → v8 changelog)
- **lean-org-pattern**: Principle 4 (flat structure), Principle 21 (primary - single channel across silos), Principle 23 (parallelism via physical layout), Principle 29 (decision tree ≠ org chart)

---

## Orphan / weakly-covered sub-skills

The following sub-skill in the spine set has **no primary principle** in this source document and only an indirect tie-in:

- **analogy-detector** (SPINE 1) - The source uses analogy-failure as a *symptom* in Principle 19 (pre-flight Cm,q model from Apollo + CFD analogy was contradicted by flight data, requiring -0.078 fudge factor and an extracted curve). But the source does not articulate "detect analogies and treat them as suspect" as a standalone discipline. If this sub-skill is to be populated, additional primary material is needed beyond the 33-principle doc.

All other 33 sub-skills have at least one primary or strong-secondary principle mapping.

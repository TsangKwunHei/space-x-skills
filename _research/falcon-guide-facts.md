# Falcon User's Guide v8 - Fact Bank

Source: SpaceX Falcon User's Guide, Version 8, March 2025 (cover dated "Version 8 – March 2025"; PDF metadata creation date May 2025). All citations refer to section numbers (§) and page numbers (p.) within that document. Direct quotes are in quotation marks; bracketed paraphrases preserve the original assertion without editorial expansion.

---

## Topic: Reuse Statistics (booster, fairing, Dragon)

- [§1.3, p.3] "As of the end of 2024, SpaceX has completed over 430 Falcon launches, making it the most flown U.S. launch vehicle currently in operation."
- [§1.3, p.3] "Reusability is an integral part of the Falcon program. SpaceX pioneered reusability with the first re-flight of an orbital class rocket in 2017."
- [§1.3, p.3] "As of February 2025, SpaceX has re-flown Falcon first stage boosters more than 384 times with a 100% success rate."
- [§1.3, p.3] "Since 2018, SpaceX had more missions launching with a flight-proven first stage booster than a first flight booster."
- [§1.3, p.3] "SpaceX also started re-flying fairings in late 2019, and as of February 2025 has re-flown fairing halves on 307 missions with a 100% success rate."
- [§1.3, p.3] Stated rationale for reuse: "By re-flying boosters and fairings, SpaceX increases reliability and improves its designs and procedures by servicing and inspecting hardware as well as incorporating lessons that can only be learned from flight."
- [§1.5.3, p.5] "The Falcon first stage is designed to survive atmospheric entry and to be recovered, handling both the rigors of the ascent portion of the mission and the loads of the recovery portion."
- [§1.5.3, p.5] "Stage recoverability also provides a unique opportunity to examine recovered hardware and assess design and material selection to continually improve Falcon 9 and Falcon Heavy."
- [§2.1, p.6] Falcon 9 Block 5 (first flown spring 2018) was designed in part so that "Thermal protection shielding was modified to support rapid recovery and refurbishment."
- [§1.2, p.1] Dragon described as "the first commercially produced spacecraft to visit the International Space Station and the first commercially produced spacecraft to carry people to and from low-Earth orbit (LEO)."

## Topic: Hold-down / Pre-commitment Gate

- [§1.5.1, p.4] "During Falcon launch operations, the first stage is held on the ground after engine ignition while automated monitors confirm nominal engine operation. An autonomous safe shutdown is performed if any off-nominal condition is detected."
- [§1.5.1, p.4] "Hold-on-pad operations, enabled by the launch vehicle's all-liquid propulsion architecture and autonomous countdown sequence, significantly reduce risks associated with engine start-up failures and underperformance."
- [§2.3, p.8] "After engine start, Falcon vehicles are held down until all vehicle systems are verified as functioning normally before release for liftoff."
- [§10.5.5, p.83] "Engine ignition occurs shortly before liftoff, while the vehicle is held down at the base via hydraulic clamps. The flight computer evaluates engine ignition and full-power performance during the prelaunch hold-down, and if nominal criteria are satisfied, the hydraulic release system is activated at T-0. A safe shutdown is executed should any off-nominal condition be detected."
- [§1.5.1, p.4] In-flight engine-out: "By employing multiple first stage engines, SpaceX offers the world's first evolved expendable launch vehicle (EELV)-class system with engine-out capability through much of first-stage flight. System-level vehicle management software controls the shutdown of engines in response to off-nominal engine indications; this has been demonstrated in flight, with 100% primary mission success."

## Topic: Two-Speed Reporting (orbit injection vs L+8 weeks)

- [§9.4 Table 9-1, p.72] "Separation + TBD minutes - Orbit injection report - Delivers best-estimate state vector, attitude, and attitude rate based on initial data."
- [§9.4 Table 9-1, p.72] "Launch + 8 weeks - Flight report - Reports the flight, environments, separation state, and a description of any mission-impacting anomalies and progress on their resolution."
- [§10.6.4, p.83] "SpaceX will provide a quick-look orbit injection report to the customer shortly after spacecraft separation, including a best-estimate spacecraft separation state vector. A final, detailed post-flight report is provided within eight weeks of launch."
- [§9.3, p.72] Standard service includes: "Verify spacecraft separation from the launch vehicle and provide an orbit injection report" and "Deliver a final post-flight report, which will include payload separation confirmation, ephemeris, payload environments, significant events, and any mission-impacting anomalies."

## Topic: Co-location / Hawthorne Factory

- [§1.2, p.1] "The SpaceX corporate structure is flat and business processes are lean, resulting in fast decision-making and product delivery. SpaceX products are designed to require low-infrastructure facilities with little overhead, while vehicle design teams are co-located with production and quality assurance staff to tighten the critical feedback loop. The result is highly reliable and producible launch vehicles with quality embedded throughout the process."
- [§1.2, p.1] "SpaceX design and manufacturing facilities are conveniently located near the Los Angeles International Airport. This location allows the company to leverage southern California's rich aerospace talent pool."
- [§8.3, p.68] "SpaceX's Dragon, Falcon 9, Falcon Heavy, and Merlin engine production facilities are conveniently located in Hawthorne, CA, a few miles inland from Los Angeles International Airport. The design and manufacturing facility ranks among the largest manufacturing facilities in California."
- [§8.3, p.68] "Facilities include multiple Falcon 9 and Falcon Heavy stage manufacturing stations, fairing production and integration stations, and nine stations for final assembly of the Merlin engine."
- [§8.4, p.68] "Structural and propulsion testing are performed at the SpaceX Rocket Development Facility in McGregor, Texas... At this facility, every Falcon 9 and Falcon Heavy first and second stage and every Merlin engine undergoes acceptance testing before first flight."
- [§8.4, p.68] "Merlin engine refurbishment work is also performed at SpaceX's three Falcon launch sites and at SpaceX's Rocket Development Facility."
- [§8.5, p.69] "SpaceX's government outreach and licensing team is located in Washington, DC."

## Topic: Vehicle Architecture (two-stage rationale)

- [§1.5.3, p.5] "The two stage Falcon 9 architecture was selected to minimize the number of stage separation events, eliminating potential failure modes associated with third and fourth stage separations, as well as potential engine deployment and ignition failure modes in the third and fourth stages."
- [§1.5, p.4] "A study by The Aerospace Corporation found that 91% of known launch vehicle failures in the previous two decades can be attributed to three causes: engine, avionics, and stage separation failures. With this in mind, SpaceX incorporated key engine, avionics, and staging reliability features for high reliability at the architectural level of Falcon launch vehicles."
- [§2.1, p.6] "Falcon 9 is a two-stage launch vehicle powered by liquid oxygen (LOX) and rocket-grade kerosene (RP-1). The vehicle is designed, built, and operated by SpaceX."
- [§2.1, p.6] "All first and second stage vehicle systems are the same in the two configurations [fairing or Dragon]; only the payload interface to the second stage changes between the fairing and Dragon configurations."
- [§1.5.1, p.4] Engine simplification rationale: "Engine failure modes are minimized by eliminating separate subsystems where appropriate. For example, the first stage thrust vector control system pulls from the high-pressure rocket-grade kerosene system, rather than using a separate hydraulic fluid and pressurization system. Using fuel as the hydraulic fluid eliminates potential failures associated with a separate hydraulic system and with the depletion of hydraulic fluid."
- [§1.5.1, p.4] "The second stage Merlin Vacuum engine uses a fixed, non-deploying expansion nozzle, eliminating potential failure modes in nozzle extension."
- [§2.3, p.8] Merlin engine architecture: "The engine uses a gas generator cycle instead of the more complex staged combustion cycle. The regeneratively cooled nozzle and thrust chamber use a milled copper alloy liner that provides large heat flux margins. A pintle injector provides inherent combustion stability."

## Topic: Falcon Heavy as Composition (3x cores + same upper)

- [§2.2, p.6] "Falcon Heavy builds on the proven, highly reliable design of Falcon 9. Falcon Heavy's first stage comprises three Falcon 9 first stages with enhancements provided to strengthen the cores. Furthermore, Falcon Heavy utilizes the same second stage and same payload fairing as flown on Falcon 9, fully benefiting from the flight heritage provided by Falcon 9 flights. This commonality has also minimized infrastructure unique to the vehicle."
- [§1.5.3, p.5] "Falcon Heavy uses the same stage architecture as Falcon 9 with the addition of two separating side cores."
- [§2.2, p.7] "The first stage comprises three Falcon 9 first stages: a center core and two side boosters; each booster and the core has nine Merlin 1D (M1D) engines. Each of the 27 first stage engines produces 845 kN (190,000 lbf) of thrust at sea level, for a total of 22,819 kN (5,130,000 lbf) of thrust at liftoff."
- [§2.2, p.7] "With nine engines in each first stage booster, Falcon Heavy has propulsion redundancy – unlike any other heavy-lift launch system."
- [§2.3, p.8] Center core differentiation: "Structurally, the plus y-axis and minus y-axis boosters are identical. The center core consists of thicker tank walls and carries the booster separation system."
- [§2.2, p.6] "SpaceX first launched the Falcon Heavy vehicle in February of 2018."

## Topic: Mission Assurance / Verification

- [§1.5.3, p.5] "For each Falcon launch vehicle, SpaceX performs an exhaustive series of tests from the component to the vehicle system level. The test program includes component-level flight acceptance and workmanship testing, structures load and proof testing, flight system and propulsion subsystem-level testing, and full first and second stage testing up to full system testing (including first and second stage static fire testing)."
- [§1.5.3, p.5] "In addition to testing environmental extremes (plus margin), flight critical and workmanship sensitive hardware are tested to account for off-nominal conditions. For example, stage separation tests are performed for off-nominal cases with respect to geometrical misalignment, anomalous timing, and sequencing."
- [§1.5.2, p.5] "Falcon launch vehicle avionics, and guidance, navigation, and control systems use a fault-tolerant architecture that provides full vehicle single-fault tolerance and uses modern computing and networking technology to improve performance and reliability. Fault tolerance is achieved either by isolating compartments within avionics boxes or by using triplicated units of specific components."
- [§7.1, p.48] "SpaceX allows three approaches to environmental verification testing at payload level":
  1. Flight Unit Protoqualification - first flight unit tested at protoqualification levels; follow-on units at acceptance.
  2. Unit/Fleet Qualification and Acceptance - dedicated qualification unit (not flown) tested at qualification levels; every flight unit at acceptance.
  3. Constellation/Lot Acceptance Testing - for ≥10 identical payloads; reduced testing cadence.
- [§7.3, p.52] Constellation/LAT eligibility: "The constellation consists of 10 or more identical payloads that are flown on one or across multiple SpaceX launches... all payloads need to be identical, interchangeable, and manufactured and integrated in the same manner."
- [§7.3, p.52] "The first five flight unit serial numbers (consecutively manufactured and integrated) and then flight units at least every fifth serial number must be fully tested at integrated level."
- [§7.3, p.52] Two retest trigger types: "Type 1 (penalty retest) and Type 2 (delta qualification)." Type 1 addresses workmanship issues; Type 2 addresses design or production process changes (Table 7-2, p.53).
- [§7.2 Table 7-1, p.50] Test categories and REQUIRED/Advised status: Static Load (REQUIRED), Sine Vibration (REQUIRED), Shock (Advised), Acoustic (See guide), Random Vibration (REQUIRED), Activation Inhibits (REQUIRED), EMC (REQUIRED if powered ON), Thermal Vacuum/Cycle (Advised), Integrated Pressure Leak Test (REQUIRED).
- [§6.1 Table 6-1, p.43] Factors of safety: Yield (flight, ground) 1.10; Joint gap and slip 1.10; Ultimate (flight) 1.25; Ultimate (ground operations) 1.40; Yield (GSE lifting) 3.0; Ultimate (GSE lifting) 4.0.
- [§1.4 Table 1-1, p.4] "Regular hardware-in-the-loop (HITL) software testing - Complete verification of entire mission profile prior to flight."

## Topic: Standard Menu / Configurations Offered

- [§1.1, p.1] "This document is applicable to the Falcon vehicle configurations with a 5.2 m (17-ft) diameter fairing and the related launch service (Section 2)."
- [§4.1.3, p.16] "The standard SpaceX Falcon fairing is 5.2 m (17.2 ft) in outer diameter and 13.2 m (43.5 ft) high overall." Extended fairing has same diameter and 18.7 m (61.25 ft) overall height.
- [§4.1.5, pp.17–19] PAF options offered as standard menu: 1,575-mm circular PAF (62.01 in., EELV-compatible), 2,624-mm circular PAF (103.307 in.), 3,117-mm circular PAF (122.717 in.), 3,117-mm Strut PAF, and Square PAF.
- [§4.1.4 Table 4-1, p.17] Mass capabilities: 1,575-mm PAF up to 10,885 kg; 2,624-mm PAF up to 19,050 kg; 3,117-mm Strut PAF up to 26,500 kg.
- [§4.1.6, p.19] "SpaceX can accommodate up to 21 payloads (with a cube arrangement) or up to 41 payloads (with an octagon arrangement)."
- [§3.1 Table 3-1, p.11] Insertion orbits offered: LEO 28.5–55°, LEO 55–65°, LEO 65–85°, LEO/Retrograde 105°+, LEO Polar/SSO 85–105°, GTO up to 28.5°, GSO up to 28.5° (Falcon Heavy only), Earth escape.
- [§3.1, p.12] "A perigee altitude of 185 km (100 nmi) is baselined for GTO."
- [§3.1, p.12] "Launch services directly into geosynchronous orbit (GSO) are available from Kennedy Space Center via Falcon Heavy. The satellite is placed into a circular orbit directly above or below GSO to allow it to phase into its correct orbital position."
- [§3.3, p.12] "Falcon launch vehicles can launch any day of the year, at any time of day, subject to environmental limitations and constraints as well as Range availability and readiness."
- [§3.4, p.13] "Falcon 9 and Falcon Heavy can provide payload pointing and roll control during long-duration coast phases for sun avoidance and thermal control... passive thermal control roll of up to ± 1.5 deg/sec around the launch vehicle X-axis, held to a local vertical/local horizontal (LVLH) roll attitude accuracy of ± 5 deg."
- [§3.5, p.13] "Falcon launch vehicles offer 3-axis attitude control or spin-stabilized separation as a standard service."
- [§3.6, p.14] "For multiple payload deployments that require different insertion orbits or burns as part of a single launch, the maximum CG shift Δ (above the PAF) that is allowed between orbits or burns is 5 cm RSS lateral (launch vehicle CSYS)."

## Topic: Customer Interface / Signed Contracts / ICDs

- [§9.2, p.70] "To streamline communication and ensure customer satisfaction, SpaceX provides each Falcon launch services customer with a single technical point of contact from contract award through launch."
- [§9.2, p.70] "The mission manager will work with the customer to create a spacecraft-to-launch-vehicle interface control document (ICD): the master document for a Falcon launch vehicle mission. Following signature approval of the ICD, SpaceX maintains configuration control of the document."
- [§1.1, p.1] "This user's guide is intended for pre-contract mission planning and for understanding SpaceX's standard services. The user's guide is not intended for detailed design use. Data for detailed design purposes will be exchanged directly between a SpaceX customer and a SpaceX mission manager."
- [§9.4 Table 9-1, p.72] Standard launch integration schedule: L-24 months Contract signature; L-18 months Mission integration kickoff; L-9 months Completion of mission integration analyses (ICD ready for signature); L-2 months Launch campaign readiness review; L-1 day Launch readiness review.
- [§9.5 Table 9-2, p.73] Required customer deliverables include: payload safety data, finite-element and CAD models, environment analysis inputs, inputs to ICD, environmental test statement and data, launch site operations plans and procedures, mission data.
- [§9.5 Table 9-3, p.73] Additional deliverables for non-US persons / non-US Government payloads: FAA payload determination information, launch site visitor information, launch site GSE details.
- [§9.5.1, p.73] "Customer will flow down its responsibilities relating to payload licensing and registration (including registration pursuant to the Convention on Registration of Objects Launched into Outer Space) to each of its customers, in writing."
- [§9.5.2.2, p.74] "An important benchmark is uploading ephemerides within Launch + 3 hours when the Launch COLA analysis expires."
- [§9.5.4, p.74] "Customer and customer's customers may not make any public comment, announcement, or other disclosure regarding such event [anomaly, mishap, accident] without SpaceX's review and approval."
- [§9.1, p.70] "Falcon launch services are available via direct contract with SpaceX and through certain managed procurement services."

## Topic: Lean Org / Lean Manufacturing References

- [§1.2, p.1] "SpaceX offers a family of launch vehicles that improves launch reliability and increases access to space. The company was founded on the philosophy that simplicity, reliability, and cost effectiveness are closely connected."
- [§1.2, p.1] "We approach all elements of launch services with a focus on simplicity to both increase reliability and lower cost."
- [§1.2, p.1] "The SpaceX corporate structure is flat and business processes are lean, resulting in fast decision-making and product delivery."
- [§1.2, p.1] "SpaceX products are designed to require low-infrastructure facilities with little overhead, while vehicle design teams are co-located with production and quality assurance staff to tighten the critical feedback loop."
- [§1.4, p.3] "Because SpaceX produces one Falcon core vehicle, satellite customers benefit from the high design standards required to safely transport crew."
- [§1.4 Table 1-1, p.4] "Horizontal manufacturing, processing, and integration - Reduces work at height during numerous manufacturing, processing, and integration procedures, and eliminates many overhead operations."
- [§1.5.1, p.4] "The high-volume engine production required to fly 10 Merlin engines (Falcon 9) or 28 engines (Falcon Heavy) on every launch results in high product quality and repeatability through process control and continuous production. Flying several engines on each mission also quickly builds substantial engineering data and flight heritage."
- [§2.3, p.8] "The first stage propellant tank walls of the Falcon vehicles are made from an aluminum lithium alloy. Tanks are manufactured using friction stir welding, the highest strength and most reliable welding technique available."

## Topic: Mission Profile Sequence (countdown, ascent, separation)

- [§10.5.5, p.83] Countdown overview: "Early in the countdown, the vehicle performs LOX, RP-1, and pressurant loading, and it executes a series of vehicle and Range checkouts. The transporter-erector strongback is retracted just prior to launch. Automated software sequencers control all critical Falcon vehicle functions during terminal countdown. Final launch activities include verifying flight termination system status, transferring to internal power, and activating the transmitters."
- [§10.6.1, p.83] "During first stage powered flight, Falcon's flight computers will command shutdown of the nine first stage engines based on achieving the target velocity or on remaining propellant levels. The second stage burns an additional five to six minutes to reach initial orbit, with deployment of the fairing typically taking place early in second stage flight."
- [§10.7 Table 10-3, p.85] Falcon 9 Sample GTO Mission Timeline: T-3 s Engine start sequence; T+0 Liftoff; T+74 s Max Q; T+147 s MECO; T+151 s Stage separation; T+158 s SES-1; T+222 s Fairing separation; T+484 s SECO-1; T+1636 s SES-2; T+1696 s SECO-2; T+1996 s Spacecraft separation.
- [§10.7 Table 10-4, p.85] Falcon 9 Sample LEO Mission Timeline: T-3 s Engine start sequence; T+0 Liftoff; T+67 s Max Q; T+145 s MECO; T+148 s Stage separation; T+156 s SES-1; T+195 s Fairing separation; T+514 s SECO-1; T+3086 s SES-2; T+3090 s SECO-2; T+3390 s Spacecraft separation.
- [§5.3.5, p.38] "Five events during flight result in shock loads: 1. Release of the launch vehicle hold-down at liftoff; 2. Side booster separation (Falcon Heavy only); 3. Stage separation; 4. Fairing separation; 5. Spacecraft separation."
- [§10.6.2, p.83] "After reaching the spacecraft injection orbit and attitude, the Falcon vehicle issues redundant spacecraft separation commands, providing the electrical impulses necessary to initiate spacecraft separation."
- [§10.6.3, p.83] "If a contamination and collision avoidance maneuver (CCAM) is necessary following payload deploy to ensure needed separation distance from the deployed payload and Falcon's second stage, the second stage can perform a CCAM if deemed necessary."
- [§10.4, p.79] "Joint operations begin seven days before launch. Payload attachment to the PAF and fairing encapsulation are performed by SpaceX within the PPF... Once at the launch vehicle integration hangar, the encapsulated assembly is rotated to horizontal and mated with the launch vehicle already positioned on its transporter-erector."
- [§10.1, p.75] "The encapsulated assembly is mated to the launch vehicle at approximately L-2 days, followed by end-to-end system checkouts. Falcon 9 and Falcon Heavy systems are designed for rollout and launch on the same day, but SpaceX can perform an earlier rollout and conduct a longer countdown if required."

## Topic: Anomaly Handling / Safe Shutdown

- [§1.5.1, p.4] "An autonomous safe shutdown is performed if any off-nominal condition is detected."
- [§10.5.5, p.83] "The flight computer evaluates engine ignition and full-power performance during the prelaunch hold-down, and if nominal criteria are satisfied, the hydraulic release system is activated at T-0. A safe shutdown is executed should any off-nominal condition be detected."
- [§1.5.1, p.4] "Although the likelihood of catastrophic engine failure is low, and failing engines are designed to be shut down prior to a catastrophic failure, each engine is housed within its own metal bay to isolate it from neighboring engines."
- [§1.5.1, p.4] "By employing multiple first stage engines, SpaceX offers the world's first evolved expendable launch vehicle (EELV)-class system with engine-out capability through much of first-stage flight. System-level vehicle management software controls the shutdown of engines in response to off-nominal engine indications; this has been demonstrated in flight, with 100% primary mission success."
- [§2.5, p.10] "Our launch vehicles are equipped with an autonomous flight termination system (AFTS) to limit the potential damage caused by a launch vehicle malfunction. The system terminates the flight of the vehicle automatically if mission rules are violated. The use of an AFTS requires fewer Range assets to support launch operations, resulting in fewer Range constraints and increased launch opportunities."
- [§10.5.6, p.83] "Falcon launch vehicle systems and operations have been designed to enable recycle operations when appropriate. In the event of a launch scrub, the transporter-erector and launch vehicle will typically stay vertical. Remaining on the pad provides uninterrupted payload-to-EGSE connectivity through the T-0 umbilical, eliminating the need to relocate EGSE from the instrumentation bay to the hangar after a scrub."
- [§4.1.3, p.16] "In the event of a payload anomaly requiring customer access to the payload, the standard concept of operations for Falcon vehicles is to return the launch vehicle to the hangar and remove the fairing. Access doors are not designed for emergency access into the payload fairing after encapsulation or once the launch vehicle is on the pad."
- [§9.5.4, p.74] Anomaly response: "Customer will cooperate with SpaceX, any insurers, and federal, state, and local government agencies, in their respective investigations of the event, including the completion of witness statements... Customer and customer's customers may not make any public comment, announcement, or other disclosure regarding such event without SpaceX's review and approval."
- [§11.1, p.86] "Falcon customers are required to meet AFSPCMAN 91-710 Range User's Manual and FAA 14 CFR Part 400 requirements in the design and operation of their flight and ground systems... SpaceX will serve as the safety liaison between the customer and the Range."
- [§11.3, p.86] "For systems or operations that do not meet safety requirements but are believed to be acceptable for ground operations and launch, a waiver is typically produced for approval by the Range safety authority. Waivers require considerable coordination and are considered a last resort; they should not be considered a standard practice."

## Topic: Vehicle Specifications and Dimensions

- [§2.3 Table 2-1, p.9] First stage: Height (with second stage, interstage, standard fairing) 70 m (229.6 ft); 75.2 m (246.7 ft) with extended fairing. Diameter 3.66 m (12 ft).
- [§2.3 Table 2-1, p.9] First stage propulsion: 9× M1D engines, 7,686 kN (1,710,000 lbf) sea-level total thrust, throttle range 190,000–108,300 lbf sea level, restart capability yes, heated helium pressurization.
- [§2.3 Table 2-1, p.9] Second stage: 1× MVac engine, 981 kN (220,500 lbf) vacuum thrust, throttle 220,500–140,679 lbf, fixed 165:1 expansion nozzle, dual redundant TEA-TEB pyrophoric igniters.
- [§2.3, p.8] "Nine SpaceX M1D engines power the Falcon 9 first stage with up to 845 kN (190,000 lbf) thrust per engine at sea level, for a total thrust of 7,605 kN (1,710,000 lbf) at liftoff, which has the highest thrust-to-weight ratio of any boost engine ever made."
- [§2.3, p.8] "The first stage M1D engines are configured in a circular pattern, with eight engines surrounding a center engine."
- [§2.3, p.9] Second stage attitude control: "the second stage contains a cold nitrogen gas (GN2) attitude control system (ACS) for pointing and roll control. The GN2 ACS is more reliable and produces less contamination than a propellant-based reaction control system."

## Topic: Facilities and Pad Locations

- [§8.1.1, p.58] "The SLC-40 launch pad is located at 28° 33.72' (28.5620°) N latitude, 80° 34.630' (80.5772°) W longitude."
- [§8.1.2, p.59] "In April 2014, SpaceX signed a 20-year lease with NASA for use of historic LC-39A. After facility upgrades in 2016, SpaceX completed its first LC-39A launch on February 19, 2017, with Falcon 9 launching CRS-10 as part of an ISS commercial resupply mission. SpaceX has since continued the pad's legacy, launching more than 100 Falcon 9 and Falcon Heavy missions from the pad."
- [§8.1.2, p.60] LC-39A hangar: "55,000 sq ft of floor space and 34,000 sq ft of high bay space, the hangar contains 90-ton, 50-ton, and 30-ton bridge cranes."
- [§8.1.2, p.60] "The maximum incline that the integrated launch vehicle experiences during transportation from the hanger to the pad is 2.9 degrees and occurs as it is moved up the ramp."
- [§8.2, p.62] "The SLC-4 East (SLC-4E) launch pad is located at 34° 37.92' (34.6320°) N latitude, 120° 36.64' (120.6107°) W longitude. Launch azimuths from SLC-4E support high-inclination LEO orbits, including polar orbits and SSO."
- [§8.2, p.66] "Building 398 was originally designed to support Space Shuttle solid rocket booster (SRB) assembly and checkouts. It was then repurposed to support Atlas and Delta SRB assembly until it was leased by SpaceX. It has now become the center of Falcon 9 and payload fairing maintenance in the west bay, and payload processing in the east bay."

## Topic: Standard Services Provided

- [§9.3, pp.71–72] SpaceX standard services include: launch licensing (FAA + State Department); third-party liability insurance; Range/Range Safety integration; up to two sets of 37- or 61-pin in-flight disconnect electrical connectors; standard PAF; 937/1194/1666-mm clampband separation system; 48 cumulative hours of remote on-call SpaceX support for sinusoidal vibration testing; transportation of customer hardware from designated landing point to PPF; ISO Class 8 (Class 100,000) cleanroom integration space; conditioned air into the fairing during ground processing; CCAM as required; orbit injection report; final post-flight report.
- [§10.3, p.76] "SpaceX provides an ISO Class 8 (Class 100,000) PPF for processing customer spacecraft... The PPF is available to customers from four weeks prior to launch, with 16 hours per day standard availability and access during that period."
- [§10.2, p.75] "For standard service processing and integration, payloads should be delivered to the launch site four weeks prior to launch."
- [§5.2 Table 5-2, p.31] Standard temperature/humidity: spacecraft processing 15–25 °C, 30–65% humidity, 3-week duration, ISO Class 8.
- [§5.2, p.31] "The PAF and fairing surface are cleaned to Visibly Clean-Highly Sensitive, achieving a residue level between R2E-1 and R1 and a particulate level between 500 and 750 per IEST-STD-CC1246E."

## Topic: Safety Architecture (Table 1-1)

- [§1.4 Table 1-1, p.4] "Designed to NASA human-rating margins and safety requirements - Improves reliability for payloads without crew through increased factors of safety, redundancy, and fault mitigation."
- [§1.4 Table 1-1, p.4] "All-liquid propulsion architecture: fuel and oxidizer are stored separately on the ground and in the vehicle. Propellant is not loaded into the vehicle until the vehicle is erected for launch - Significantly improves safety by eliminating hazardous ground handling operations required for systems that use solid propellant cores or boosters."
- [§1.4 Table 1-1, p.4] "Rocket-grade kerosene and liquid oxygen as primary propellants - Reduces health hazards to processing, integration, and recovery personnel compared to systems that use high toxicity primary propellants."
- [§1.4 Table 1-1, p.4] "Non-explosive, pneumatic release and separation systems for stage separation and standard payload fairing separation - Zero-debris separation systems significantly reduce orbital debris signature, can be repeatedly tested during the manufacturing process, and eliminate hazardous pyrotechnic devices."
- [§2.4, p.9] "The use of all-pneumatic separation systems provides a benign shock environment, allows acceptance and preflight testing of the actual separation system hardware, and minimizes debris created during separation."
- [§1.5.3, p.5] Pneumatic system advantages: "The pneumatic system allows for acceptance and functional testing of the actual flight hardware, which is not possible with a traditional explosives-based separation system."

## Notable Direct Quotes

- "The company was founded on the philosophy that simplicity, reliability, and cost effectiveness are closely connected." (§1.2, p.1)
- "We approach all elements of launch services with a focus on simplicity to both increase reliability and lower cost." (§1.2, p.1)
- "vehicle design teams are co-located with production and quality assurance staff to tighten the critical feedback loop." (§1.2, p.1)
- "The result is highly reliable and producible launch vehicles with quality embedded throughout the process." (§1.2, p.1)
- "SpaceX pioneered reusability with the first re-flight of an orbital class rocket in 2017." (§1.3, p.3)
- "By re-flying boosters and fairings, SpaceX increases reliability and improves its designs and procedures by servicing and inspecting hardware as well as incorporating lessons that can only be learned from flight." (§1.3, p.3)
- "Because SpaceX produces one Falcon core vehicle, satellite customers benefit from the high design standards required to safely transport crew." (§1.4, p.3)
- "The two stage Falcon 9 architecture was selected to minimize the number of stage separation events..." (§1.5.3, p.5)
- "Hold-on-pad operations, enabled by the launch vehicle's all-liquid propulsion architecture and autonomous countdown sequence, significantly reduce risks associated with engine start-up failures and underperformance." (§1.5.1, p.4)
- "SpaceX offers the world's first evolved expendable launch vehicle (EELV)-class system with engine-out capability through much of first-stage flight." (§1.5.1, p.4)
- "Falcon Heavy has propulsion redundancy – unlike any other heavy-lift launch system." (§2.2, p.7)
- "This commonality has also minimized infrastructure unique to the vehicle." (§2.2, p.6 - re: Falcon Heavy reusing F9 second stage and fairing)
- "Tanks are manufactured using friction stir welding, the highest strength and most reliable welding technique available." (§2.3, p.8)
- "the highest thrust-to-weight ratio of any boost engine ever made." (§2.3, p.8 - Merlin)
- "SpaceX provides each Falcon launch services customer with a single technical point of contact from contract award through launch." (§9.2, p.70)
- "the master document for a Falcon launch vehicle mission" (§9.2, p.70 - referring to the ICD)
- "SpaceX launch operations are designed for rapid response. Customers are strongly encouraged to develop launch readiness capabilities and timelines consistent with a rapid prelaunch concept of operations." (§10, p.75)
- "Falcon 9 and Falcon Heavy systems are designed for rollout and launch on the same day..." (§10.1, p.75)

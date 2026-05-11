# Maraia Capsule Flight Test Paper - Fact Bank

Source: Sostaric, R. R. and Strahan, A. L., "Maraia Capsule Flight Testing and Results for Entry, Descent, and Landing," NASA Johnson Space Center, NASA Technical Reports Server document 20150021959. Page numbers below refer to printed page numbers shown on each page (1-15).

## Topic: 5-Rung Fidelity Ladder (each test described)

- [page 2, Sec. II + Fig. 2] The program used "a progressive test approach" - explicitly enumerated as five rungs in Figure 2: Texas A&M Low Speed Wind Tunnel → China Lake Drop Tower → Small Scale Balloon Drop (100,000 ft) → Chute Ejection Testing → Full Scale Balloon Drop (100,000 ft). Banner across Figure 2: "Aerodynamics Characterization, and Deceleration System Development."
- [page 2, Sec. II] Rung 1 - Texas A&M University low-speed wind tunnel: "wind tunnel parachute testing at Texas A&M University's low speed wind tunnel in order to characterize the parachute opening." Figure 2 lists outputs: "Characterization of parachute opening" and "Demonstration of parachute integrity at opening loads."
- [page 2, Sec. II + Fig. 2] Rung 2 - China Lake drop tower: "parachute drop testing, more focused on steady-state parachute performance of two competing designs. The drop testing was completed at China Lake using a drop tower." Outputs in Fig. 2: "Characterization of various parachute geometries; Steady state loads; Descent rates."
- [page 3, Sec. III] Rung 3 - Small-scale balloon drop: payload limit set by FAA - "Federal Aviation Administration (FAA) regulations permit payloads of up to 6 lbs. without requiring any waivers or special permissions." Capsule scaled to "10" in diameter by approximately 6.5" tall at the 6 lb. weight limit." Conducted with Rocket University program at KSC.
- [page 2, Sec. II] Three balloon tests total: "Three tests were completed, two at sub-scale (1/3rd scale, 10" diameter) and one at full scale (30" diameter)."
- [page 3, Sec. III] Sub-scale objectives: "main test objective was to gain insight into the aerodynamic and dynamic properties of the capsule in the subsonic regime." Secondary objectives: "testing subsystems (e.g. avionics, parachutes, and guidance, navigation, and control (GN&C) subsystems) to be used in the full scale flights, as well as training and gaining overall experience in all aspects of designing, developing, and testing spaceflight systems."
- [page 2, Fig. 2] Rung 4 - Chute Ejection Testing: outputs "Develop gas deployment (no pyros)" and "Utilize on small & full-scale capsules."
- [page 8, Sec. IV.A] Rationale for no-pyro deployment: "A pneumatic deployment system was developed specifically for this test article, and also to serve as a prototype for the spaceflight vehicle which must comply with ISS internal requirements (so black power or pyrotechnics were not considered to be a viable option)."
- [page 2, Fig. 2] Rung 5 - Full Scale Balloon Drop (100,000 ft): outputs "Full scale aero & stability; Full scale recovery; Parachute system test; Completed in Aug 2013."
- [page 6, Sec. IV] Full-scale flown as secondary payload on the High Altitude Student Platform (HASP) administered by NASA-Wallops Balloon Program Office, executed by the Columbia Scientific Balloon Facility (CSBF), out of Fort Sumner, NM.
- [page 8, Sec. IV.A] Full-scale test article weighed 133 lb (reduced from 150 lb concept mass) "in order to reduce parachute opening loads for this test." Capsule = 30" diameter (per page 1 abstract and Fig. 2).

## Topic: Eyebolt Anomaly + Four-Box Closure

- [page 5, Sec. III.A] Root cause (what + why): On Flight #1 (July 26, 2012), "An eyebolt failure on the capsule occurred immediately after launch, causing the two-point attach to the upper payload to become a single point attach." Later, "At 72,500 ft, the command to release the capsule was sent. No release was observed. It was determined during post-test analysis that the twisting of the capsule during ascent caused the electrical connection of the burn circuit to pull loose from the power source. The command was received by the avionics, but the lack of power to the release box system prevented it from functioning properly."
- [page 5, Sec. III.A] Design fix (verbatim parenthetical): "(The electrical setup of this system was modified for future flights)."
- [page 4, Sec. III] Test/instrumentation update: "A barometric altimeter was added for Flight #2." (a configuration upgrade carried into the next flight).
- [page 4, Sec. III] Procedural/process update: "(Note: on Flight #1, this command was issued simultaneously for both payloads. Future flights will permit separate commands for better control of payload landing locations.)" - a documented operations revision derived from Flight #1 experience.
- [page 5, Sec. III.A] Recovery context that closed the loop: "Both payloads were recovered" - enabling the post-test analysis cited above.

## Topic: Ranked Objectives (declared before flight)

- [page 7, Sec. IV] Full-scale primary objectives, enumerated as a bulleted list before flight description:
  1. "Characterize capsule transonic & subsonic free-fall dynamic behavior and aerodynamics"
  2. "Execute full scale autonomous pneumatic parachute deployment and recovery system"
  3. "Execute drogue to main parachute transition"
- [page 7, Sec. IV] Secondary objectives explicitly demoted: "Additional secondary objectives included recovery of the capsule and recording good quality, usable video."
- [page 3, Sec. III] Sub-scale objectives also pre-declared with primary/secondary split: primary = "gain insight into the aerodynamic and dynamic properties of the capsule in the subsonic regime"; secondary = "testing subsystems (e.g. avionics, parachutes, and guidance, navigation, and control (GN&C) subsystems) … as well as training and gaining overall experience."
- [page 14, Sec. V] Sounding Rocket objectives also pre-enumerated and numbered: "[1] Explore and Investigate aerodynamics and dynamic stability … up to Mach 2.5 or greater. [2] Demonstrate active closed-loop flight control … utilizing small thrusters (cold gas). [3] Capture and record trajectory data (position, velocity, attitude, rates) for the free flight portion … to support flight dynamics reconstruction and further simulation development."

## Topic: Numeric Retest Triggers

- [page 8, Sec. IV.A] Pneumatic deployment retest threshold: "Initial development testing with a typical valve showed that chute ejection velocity did not meet requirements. The fast acting valve was able to get the desired chute ejection velocity of 100 m/s." (i.e., 100 m/s ejection velocity is the explicit numeric pass criterion.)
- [page 6, Sec. III.B] Severity flag from Flight #2: "Just prior to the line break, a series of greater than 6 G's spikes were observed in the accelerometer data" - quantitative threshold cited as the reason the freefall objective was not met.
- [page 3, Sec. III] Release-window altitude trigger: release commanded once "above an altitude of 70,000 ft … when trajectory predictions show that the capsule (aeroshell) will land within the landing zone." Backup auto-deploy trigger: "descends in freefall to 50,000 ft, at which point an autonomous command is sent to deploy the parachute."
- [page 2, Sec. II] Implicit retest trigger: subscale flights deemed insufficient - "were unable to achieve a clean freefall configuration and did not provide usable capsule aerodynamic data" - gating progression to full scale, which "did successfully meet all primary objectives including a clean freefall."
- [page 7, Sec. IV] Full-scale numeric event triggers pre-declared: drogue at 60,000 ft, drogue release/main deploy at 14,000 ft.

## Topic: "Not Because of X" Clauses (avoiding accidental passes)

- [page 6, Sec. III.A] Flight #1 carefully distinguishes pass vs. accidental pass: "The primary test objective, obtaining performance data on the aerodynamic and dynamic properties of the sub-scale capsule, was not met since the release box was still attached during the freefall, creating additional drag (and stability). However, all secondary test objectives were met…" - explicit separation of the unmet primary from the secondary "passes."
- [page 6, Sec. III.B] Flight #2 unmet objective stated despite a "soft" landing: "The release system remained attached, so a clean freefall configuration was not obtained." And: "the tether line broke, but … remained attached to the capsule until after the chute deploy occurred. As a result, the freefall objective was not met for this flight." (Capsule landed safely; objective still failed.)
- [page 7, Sec. IV] Final full-scale framing: "All objectives were met with the exception of the video objective." (Specific named exception, not glossed.)
- [page 2, Sec. II] On subscale tests: "The two subscale tests successfully served as development tests for the full scale, but were unable to achieve a clean freefall configuration and did not provide usable capsule aerodynamic data." (A subscale "success" is explicitly NOT a pass on the aero objective.)

## Topic: Flight #1 Anomalies (eyebolt + burn circuit)

- [page 5, Sec. III.A] Launch context: "Flight #1 was launched on the morning of July 26, 2012, from Gemini Elementary in Melbourne, Florida, at 9:15 a.m. local time."
- [page 5, Sec. III.A] Anomaly #1 (immediately after launch): eyebolt failure caused two-point attach to become single point attach.
- [page 5, Sec. III.A] Ascent continued: "average ascent rate of 1285 ft/min, near the expected ascent rate." Ascended to 103,984 ft where "a nominal balloon burst occurred."
- [page 5, Sec. III.A] Anomaly #2 (at 72,500 ft): release command sent, no release observed; root cause identified post-test as twisting that pulled the burn circuit electrical connection loose from power source.
- [page 5, Sec. III.A] Cascading consequence: "The Rocket U parachute inflated as expected. The system began to experience significant dynamics and the 50-lb line required by FAA regulations snapped between the Rocket U payload and the capsule release box."
- [page 5, Sec. III.A] Recovery: "Both payloads were recovered" - capsule descended under parachute (release box still attached), landing a few miles from the Rocket U payload.

## Topic: Model Fudge Factor (-0.078 to C_A)

- [page 11, Sec. IV.C] Pre-flight model issues: "The altitude vs velocity plot shows that the flight data experienced a slightly lower effective C_A than predicted, however, the basic trend is the same. The angle of attack plot shows that the assumed pre-flight model of C_m,q was very different than the actual performance of the vehicle. The pre-flight simulation actually shows a fairly unstable vehicle. The flight showed a limit cycle behavior on the angle of attack and sideslip parameters."
- [page 11, Sec. IV.C] The exact correction (verbatim): "The aerodynamic model in the FAST simulation was systematically adjusted in order to match the flight data. Figure 13 shows the matched velocity and altitude profile. The match appears to be very good. A constant value of -0.078 was added to CA in order to achieve this matching."
- [page 11, Sec. IV.C] Pre-flight model basis: "An assumed C_m,q model was used prior to flight to predict the expected behavior in flight. The assumed C_m,q model was based on Apollo Entry capsule data. The model of the static aerodynamic coefficients – C_A, C_N, and C_m – was developed from CFD."
- [page 14, Fig. 19] Updated C_m,q model (post-flight): explicit table-of-curves at Mach 0.3, 0.5, 0.6, 0.7, 0.8, 1.1 - note "The Mach 1.1 curve is not derived from flight data. Rather it is assumed in the simulation from historical data and included here for completeness." (page 13)

## Topic: Subscale → Full-Scale Promotion

- [page 2, Sec. II] Promotion logic: "The two subscale tests successfully served as development tests for the full scale, but were unable to achieve a clean freefall configuration and did not provide usable capsule aerodynamic data. The full scale test did successfully meet all primary objectives including a clean freefall."
- [page 5–6, Sec. III.A] Subscale Flight #1 yielded subsystem-level passes (avionics, GN&C, autonomous chute deploy, ground command exec, recovery) even though aero data was not obtained - i.e., subsystem maturity was promoted while aero objective rolled forward.
- [page 6, Sec. III.B] Subscale Flight #2 revealed coupled balloon-tether-payload dynamics ("dynamics that were much more severe than experienced during flight #1"; "video … showed oscillations of the balloon-capsule system of increasing magnitude") - exposing the integration risk that the full-scale design needed to mitigate.
- [page 4, Sec. III] Hardware iteration carried forward: "A barometric altimeter was added for Flight #2" - instrumentation evolved between rungs.
- [page 8, Sec. IV.A] Mass tuning between rungs: "The Maraia Capsule test article weighed 133 lb when completed. This mass reduction was performed in order to reduce parachute opening loads for this test." (vs. 150 lb concept mass on page 1.)

## Topic: Final Full-Scale Flight Results

- [page 7, Sec. IV] Headline result: "All objectives were met with the exception of the video objective."
- [page 8, Sec. IV.B] Launch: "On August 19, 2013, the balloon and payload were launched from the airport in Fort Sumner, NM."
- [page 9, Sec. IV.B] Trajectory milestones (recovered): "the Maraia Capsule went into freefall, meeting the primary objective of the flight. At an altitude of 59,622 ft the drogue chute deployed. This was not observed visually, but later determined from the recovered data."
- [page 9, Sec. IV.B] Onboard data ended at 21,357 ft due to "a combination of a loose wire and the timing of the file writing." Main deploy not in data, but "the capsule was recovered with the main chute still attached and was fully intact so it clearly deployed successfully."
- [page 9, Sec. IV.B] Touchdown coordinates: "(34.335303, -105.259085) in a remote location 23 miles from the nearest highway (and 6.4 miles from the nearest road)."
- [page 9, Sec. IV.B] Video objective failure root cause: "the data card in the GoPro camera filled up after the first 99 min of flight. Unfortunately, the lesson learned that was when using Windows computers, simply deleting the data on a flash memory card (micro HD) is not adequate to clear the memory for future use. As a result, the only video obtained from the capsule video camera was 99 min of the underside of the gondola."
- [page 8, Sec. IV.B] Comms anomaly: "a loss of signal occurred at 6,880 ft. It was later determined that a loose antenna connector was the culprit. Onboard data recording was not affected." Plus GPS dropout at 82,655 ft, "later reacquired during the float period so this event had no impact on objectives."

## Topic: Recovery as Instrumentation

- [page 9, Sec. IV.B] Drogue deploy event existed only because of recovery: "This was not observed visually, but later determined from the recovered data" - drogue deploy at 59,622 ft known only post-recovery.
- [page 9, Sec. IV.B] Main deploy verified by recovered hardware state: "No data was recovered confirming the main deploy, however, the capsule was recovered with the main chute still attached and was fully intact so it clearly deployed successfully."
- [page 11–12, Sec. IV.C] Recovered data drove the entire aero-model rebuild: FAST simulation "systematically adjusted in order to match the flight data," yielding the -0.078 C_A correction, the wind-profile inversion (page 12), and the new C_m,q curves (Fig. 19).
- [page 5, Sec. III.A] Flight #1: "Both payloads were recovered" - recovered hardware enabled the post-test root-cause analysis identifying the burn-circuit electrical pull-loose.
- [page 6, Sec. III.B] Flight #2: capsule recovered from water; accelerometer data + GoPro video together identified the >6 G spikes and increasing-magnitude balloon-capsule oscillation.

## Topic: Wind Profile Reconstruction Method

- [page 11–12, Sec. IV.C] Three wind sources tried: (1) "day of flight winds were provided by a local weather station, however, this wind profile lead to an unsatisfactory ground track match"; (2) "extraction of the wind profile from the balloon ascent data. This also led to a poor match"; (3) selected: "modify the wind velocity vector such that the simulation matched the flight data" - wind reconstructed from the vehicle's own dynamics.
- [page 12, Sec. IV.C] Justification: "The vehicle traveled approximately 70 miles from the launch site prior to release, so the local winds may have been very different."

## Notable Direct Quotes

- "A progressive test approach was used, beginning with wind tunnel parachute testing at Texas A&M University's low speed wind tunnel" (page 2).
- "The two subscale tests successfully served as development tests for the full scale, but were unable to achieve a clean freefall configuration and did not provide usable capsule aerodynamic data." (page 2).
- "The electrical setup of this system was modified for future flights." (page 5).
- "A barometric altimeter was added for Flight #2." (page 4).
- "Future flights will permit separate commands for better control of payload landing locations." (page 4).
- "All objectives were met with the exception of the video objective." (page 7).
- "A constant value of -0.078 was added to CA in order to achieve this matching." (page 11).
- "The lesson learned that was when using Windows computers, simply deleting the data on a flash memory card (micro HD) is not adequate to clear the memory for future use." (page 9).
- "The full scale test did successfully meet all primary objectives including a clean freefall." (page 2).
- "A robust EDL test program of the Maraia Capsule shape at subsonic velocity has been completed. This has led to significant improvement in understanding of the aerodynamic performance of the shape. Future test plans include attempting to obtain supersonic test data on a subscale sounding rocket test." (page 15, Conclusion).
- "Initial development testing with a typical valve showed that chute ejection velocity did not meet requirements. The fast acting valve was able to get the desired chute ejection velocity of 100 m/s." (page 8).
- "the freefall objective was not met for this flight." (page 6, Flight #2 - explicit non-pass despite soft landing).

# CRS-7 IRT Report - Fact Bank

Source: NASA Independent Review Team, SpaceX CRS-7 Accident Investigation Report - Public Summary. Date of Event: 28 June 2015. Date of Report: 12 March 2018. 9 pages.

## Topic: Mission Context and Event Timeline

- [page 3] On 28 June 2015 at approximately 10:21 a.m. Eastern Daylight Time, SpaceX launched CRS-7 from Launch Complex 40, Cape Canaveral Air Force Station (CCAFS), Florida.
- [page 3] The mission consisted of a Falcon 9 version 1.1 launch vehicle and a Dragon spacecraft loaded with 4303 lbs (1952 kgs) of cargo, bound for the ISS.
- [page 3] At approximately 139 seconds into flight, the launch vehicle experienced an anomalous event in the upper stage liquid oxygen (LOx) tank, resulting in the loss of the mission.
- [page 3] At the moment of anomaly: MET 139.1 s, geodetic altitude 44.7 km, velocity magnitude 1559 m/s.
- [page 3] The first stage of the vehicle, including all nine Merlin 1D engines, operated nominally.
- [page 3] The Dragon spacecraft indicated no anomalous behavior prior to the mishap, survived the second stage event, and continued to communicate with ground controllers until it dropped below the horizon.
- [page 3, Table 1] Video event sequence (UTC): 14:23:31.062 gas first seen exiting second stage; 14:23:32.083 combustion event seen in area of second stage; 14:23:33.759 first view of Dragon separated from Falcon; 14:23:38.288 large combustion event and gas cloud; 14:23:39.256 thrust termination on first stage; 14:23:39.339 beginning of complete vehicle breakup.
- [page 2] CRS-7 was the second launch failure under the CRS contract; the first was the Antares Orb-3 mission on 24 October 2014.
- [page 2] Prior to CRS-7, there had been six consecutive successful ISS missions on Falcon 9 (two on v1.0, four on v1.1) and 13 successful flights total of Falcon 9 v1.1.

## Topic: Failure Window (timing, telemetry counts)

- [page 5] "The anomalous event occurred over an 800-900 millisecond timespan." The vehicle "went from flying fine to conflagration in less than a second, or 'within a blink of an eye.'"
- [page 6] The IRT's effort accounted for the large majority of the 115 telemetry indications that occurred during the 800-900 millisecond failure time period, leaving 9 indications not fully explained.
- [page 5] Telemetry indications just prior to the event "showed no obviously degrading or trending conditions" - discerning the sequence of events proved a challenge.

## Topic: Telemetry Architecture (non-deterministic packets)

- [TF-4, page 8] "SpaceX's new implementation (for Falcon 9 'Full Thrust' flights) of non-deterministic network packets in their flight telemetry increases latency, directly resulting in substantial portions of the anomaly data being lost due to network buffering in the Stage 2 flight computer."
- [TR-3, page 8] "SpaceX needs to re-think new telemetry architecture and greatly improve their telemetry implementation documentation." (Addresses TF-4.)
- [page 5] The IRT independently developed a detailed timeline of events at the millisecond level "consistent with the sampling capability of the instrumentation," implying instrumentation sampling limits constrained reconstruction.

## Topic: Rod End / Strut Failure (the proximate cause)

- [page 7] Part: Industrial grade 17-4 PH SS (precipitation-hardening stainless steel) cast part - the "Rod End" - a threaded cast stainless steel eye bolt.
- [page 7] Application: Used in a critical load path under cryogenic conditions and strenuous flight environments, supporting a COPV (composite overwrapped pressure vessel) holding helium inside the Stage 2 LOx tank.
- [page 7] Manufacturer recommended a 4:1 factor of safety when using the industrial grade part in an application; SpaceX did not apply this recommendation.
- [page 7] Implementation was done "without adequate screening or testing of the industrial grade part."
- [page 7] Implementation was done "without proper modeling or adequate load testing of the part under predicted flight conditions."
- [TF-1, page 8] "Design Error: The use of an industrial grade 17-4 PH SS (precipitation-hardening stainless steel) casting in a critical load path under cryogenic conditions and flight environments, without additional part screening, and without regard to manufacturer recommendations for a 4:1 factor of safety, represents a design error – directly related to the F9-020 CRS-7 launch failure as a 'credible' cause."
- [page 7] The IRT considered "rod end breakage due to material defect," "rod end manufacturing damage," "rod end mis-installation," "rod end collateral damage," or some other part of the axial strut breaking as equally credible initiating causes.
- [page 7] Where the IRT differs from SpaceX: SpaceX's AIT identified "material defect" as the "most probable" cause for the rod end breaking; the IRT does not denote a "most probable" cause among the credible alternatives.

## Topic: Cascade / Blast Radius (one part → whole vehicle)

- [page 7] Cascade chain: rod end of the COPV's axial support strut broke under ascent loads → COPV broke free from its mounts → buoyancy in LOx accelerated COPV upward → COPV impacted the LOx tank dome at the top of the LOx tank "with great force" → LOx tank ruptured → Stage 2 LOx tank rupture → vehicle disintegration.
- [page 7] The initiating cause was "the failure of the axial strut supporting a COPV, which in turn liberated the aforementioned COPV, and which in turn ruptured the gaseous helium (GHe) plumbing system within the Stage 2 LOx tank."
- [page 6] "It is credible the intermediate cause of the Stage 2 LOx tank rupture was the liberation of a Stage 2 COPV within the Stage 2 LOx tank."
- [page 5] The IRT determined that the direct (or proximate) cause of the Falcon 9 launch vehicle failure was "the rupture of the Stage 2 LOx tank."

## Topic: Fault Tree Reconstruction (filling gaps)

- [page 5] The IRT independently performed analysis of Falcon 9 CRS-7 telemetry and developed an independent millisecond-level event timeline consistent with instrument sampling.
- [page 5] The IRT independently analyzed the various Falcon 9 systems and reviewed the SpaceX-developed fault tree.
- [page 5] Independent analyses enabled closure of all fault tree blocks (First Stage, Propulsion, Avionics, Electrical, Dragon, etc.) "with the exception of the Falcon 9's Stage 2."
- [page 5] The IRT performed the Falcon 9 systems review "completely independently from SpaceX, making its own judgments on the telemetry readings coming from the various systems throughout the flight."
- [page 5] "Multiple Engineering Review Boards were held to review the Falcon 9 systems and the data."
- [page 5] In the end, "the IRT independently came to the conclusion that all but the Stage 2 Fault Tree block could be closed."
- [page 6] In addition to the SpaceX AIT primary failure scenario, the NASA LSP IRT "developed and investigated multiple additional potential scenarios that could also explain some of the telemetry indications."
- [page 6] Two main alternative scenarios were identified that could have been the precipitating event in place of, or in addition to, the "liberated COPV" scenario.
- [page 6] Alternative Scenario #1: "warm" RP-1 leaks into the annulus of the LOx Transfer Tube, warming the LOx and causing it to spew or "geyser." Disproven analytically: "insufficient thermal energy would be transferred from the RP-1 (that could have leaked into the annulus) to the LOx in the LOx transfer tube."
- [page 6] Alternative Scenario #2: RP-1 leaks into the annulus of the LOx Transfer Tube, transferring sufficient thermal energy to initiate LOx gasification and eventual geysering. Required detailed testing.
- [page 6] Marshall Space Flight Center built a test chamber to validate thermal energy transfer assumptions; testing ran ~2 weeks; test matrix consisted of 15 different orifice configurations (3 leak orifices, 5 vacuum/vent orifices); design and fabrication took ~1.5–2 weeks; testing completed Oct 27, 2015.
- [page 6] Result: "There was greater thermal energy transfer in Alternative Scenario #2, but still insufficient thermal energy to initiate a geysering occurrence within the total 800-900 millisecond time span of the failure event."

## Topic: Vendor Selection / Acceptance Process

- [TR-1, page 8] "Additional attention warranted for evaluating design application using commercially sourced parts. SpaceX should apply particular emphasis to understanding manufacturer's recommendations for using commercially sourced parts in flight critical applications." (Addresses TF-1 and TF-2.)
- [page 7] Process gap: implementation done "without adequate screening or testing of the industrial grade part."
- [page 7] Process gap: implementation done "without regard to the manufacturer's recommendations for a 4:1 factor of safety when using their industrial grade part in an application."
- [page 7] Process gap: implementation done "without proper modeling or adequate load testing of the part under predicted flight conditions."
- [TF-2, page 8] "General Finding: The use of commercially procured wire ropes to provide structural support to the LOx Transfer Tube Assembly, without regard for manufacturer's caution to specify pre-stretched ropes in a length-critical application, is a general finding – not directly related to the F9-020 CRS-7 launch failure." (A second instance of the same vendor/manufacturer-recommendation pattern.)

## Topic: Manufacturer Recommendations vs Actual Use

- [page 7] Industrial grade vs aerospace grade: "SpaceX chose to use an industrial grade (as opposed to aerospace grade) 17-4 PH SS … cast part (the 'Rod End') in a critical load path under cryogenic conditions and strenuous flight environments."
- [page 7] Manufacturer's 4:1 factor of safety for industrial-grade applications was not applied.
- [TF-2, page 8] Wire ropes: manufacturer cautioned to specify pre-stretched ropes in a length-critical application; that caution was not followed.
- [TF-3, page 8] "General Finding: The use of a 0.01 standard cubic feet per minute (scfm) gaseous Nitrogen (GN2) flow rate to purge the LOx Transfer Tube Assembly annulus was a general finding – not directly related to the F9-020 CRS-7 launch failure."
- [TR-2, page 8] "SpaceX needs to establish and maintain the proper purge rates for stage testing and launch base operations." (Addresses TF-3.)

## Topic: All Technical Findings (TF-1 through TF-4)

- TF-1 [page 8]: Design Error - industrial grade 17-4 PH SS casting used in a critical load path under cryogenic/flight conditions without screening and without regard to manufacturer's 4:1 factor-of-safety recommendation. Directly related to CRS-7 as a "credible" cause.
- TF-2 [page 8]: General Finding - commercially procured wire ropes used to provide structural support to the LOx Transfer Tube Assembly without regard for manufacturer caution to specify pre-stretched ropes in a length-critical application. Not directly related to CRS-7.
- TF-3 [page 8]: General Finding - 0.01 scfm GN2 flow rate used to purge the LOx Transfer Tube Assembly annulus. Not directly related to CRS-7.
- TF-4 [page 8]: General Finding - non-deterministic network packets in flight telemetry (introduced for Falcon 9 "Full Thrust" flights) increase latency, causing substantial anomaly data to be lost due to network buffering in the Stage 2 flight computer.

## Topic: All Technical Recommendations (TR-1 through TR-3)

- TR-1 [page 8]: SpaceX must give additional attention to evaluating design applications using commercially sourced parts and apply particular emphasis to understanding manufacturer's recommendations for flight-critical applications. Addresses TF-1 and TF-2.
- TR-2 [page 8]: SpaceX must establish and maintain proper purge rates for stage testing and launch base operations. Addresses TF-3.
- TR-3 [page 8]: SpaceX must re-think its new telemetry architecture and greatly improve telemetry implementation documentation. Addresses TF-4.

## Topic: IRT Charter and Process

- [page 5] On 3 August 2015, the NASA Associate Administrator for Human Exploration and Operations determined that the Launch Services Program (LSP) should serve the function of an independent review team (IRT).
- [page 5] IRT charter: (a) independently evaluate events leading to failure (timeline, fault tree review, telemetry assessment); (b) ensure corrective actions are correctly implemented; (c) validate the SpaceX AIT efforts; (d) inform the Agency's risk posture for SpaceX return-to-flight; (e) make recommendations on how to develop, operate, and acquire more reliable systems.
- [page 5] NASA had right to accept/reject any finding, root cause, and corrective action from SpaceX's board, since the same launch-vehicle configuration was on the NASA NLS-II contract for Jason-3.
- [page 4] SpaceX established its own Accident Investigation Team (AIT) immediately following the accident per its FAA-approved contingency response plan, with NASA, FAA, and US Air Force representatives invited.
- [page 4] On 2 July 2015, NASA designated the Launch Services Program (LSP) as the coordinating program; the LSP representative was a non-voting member of the SpaceX AIT.

## Topic: Conclusions and Cause Categorization

- [page 7] "The IRT's conclusions regarding the direct, and immediate causes are consistent with the determination made by the SpaceX AIT investigation findings."
- [page 7] "Where the IRT differs with SpaceX is in regards to the initiating cause."
- [page 8] "The IRT determined that subject to the normal technical review of SpaceX's corrective actions implementation, including correction of their design error, the F9-020 CRS-7 flight anomaly is resolved with 'credible', direct, intermediate, and initiating causes."
- [page 8] "The initiating causes include more than just rod end 'material defect', and the initiating causes are rated by the IRT as 'probable'."
- [page 9] "All credible causes and technical findings identified by the IRT were corrected and/or mitigated by SpaceX and LSP for the Falcon 9 Jason-3 mission. That flight, known as 'F9-19', was the last flight of the Falcon 9 version 1.1 launch vehicle, and flew successfully on 17 January 2016."
- [page 7] "The differences in launch vehicle configuration between the 'Full Thrust' using densified propellants and the Version 1.1 do not add any qualifiers to the IRT's anomaly resolution conclusions."

## Topic: NASA LSP Insight

- [page 7] "NASA LSP did not perform a programmatic assessment of the SpaceX CRS program but would note that due to LSP having awarded launch service contracts to SpaceX for the launch of 'high value' NASA payloads, NASA LSP has developed deep insight to the SpaceX Falcon 9 version 1.1 launch vehicle due to the recent 'Category 2' certification effort by SpaceX."

## Notable Direct Quotes

- "The vehicle went from flying fine to conflagration in less than a second, or 'within a blink of an eye.'" (page 5)
- "The anomalous event occurred over an 800-900 millisecond timespan." (page 5)
- "Telemetry indications just prior to the event showed no obviously degrading or trending conditions." (page 5)
- "The IRT independently came to the conclusion that all but the Stage 2 Fault Tree block could be closed." (page 5)
- "Design Error: The use of an industrial grade 17-4 PH SS (precipitation-hardening stainless steel) casting in a critical load path under cryogenic conditions and flight environments, without additional part screening, and without regard to manufacturer recommendations for a 4:1 factor of safety, represents a design error – directly related to the F9-020 CRS-7 launch failure as a 'credible' cause." (TF-1, page 8)
- "SpaceX's new implementation (for Falcon 9 'Full Thrust' flights) of non-deterministic network packets in their flight telemetry increases latency, directly resulting in substantial portions of the anomaly data being lost due to network buffering in the Stage 2 flight computer." (TF-4, page 8)
- "SpaceX needs to re-think new telemetry architecture and greatly improve their telemetry implementation documentation." (TR-3, page 8)
- "SpaceX should apply particular emphasis to understanding manufacturer's recommendations for using commercially sourced parts in flight critical applications." (TR-1, page 8)
- "It is credible, that the COPV became liberated when a threaded cast stainless steel eye bolt (AKA: 'rod end') of the COPV's axial support strut broke under ascent loads, allowing the COPV to break free from its mounts, allowing it to accelerate, due to its buoyancy, to impact the LOx dome at the top of the LOx tank with great force." (page 7)
- "The IRT does not denote it a 'most probable' since the IRT also views 'rod end manufacturing damage', 'rod end strut mis-installation', 'rod end collateral damage' or some other part of the axial strut breaking as equally credible causes to have liberated the COPV." (page 7)
- "The initiating causes include more than just rod end 'material defect', and the initiating causes are rated by the IRT as 'probable'." (page 8)

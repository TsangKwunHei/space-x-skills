# Why Your AI Agent Thinks Like a Contractor, Not an Engineer

> Read once. Then load skills.

## The pattern that costs nine billion dollars

In late 2010 and early 2011, NASA ran its own cost model - NAFCOM, the NASA-Air Force Cost Model - against the Falcon 9 launch vehicle. The objective was to estimate what it would have cost NASA to develop the same rocket SpaceX had just built.

The first run, with inputs set to a "traditional NASA environment/culture," produced **$3.977B**. A second run, with inputs adjusted to "a more commercial development culture," produced **$1.695B**. Same vehicle. Same mass. Same physics.

Then NASA staff visited SpaceX's Hawthorne facility, looked at what was actually being done, and re-ran the model with corrected inputs. More Falcon 1 heritage. Off-the-shelf hardware. Two flight units instead of one. Firm-fixed-price acquisition instead of cost-plus-fee.

The number fell to **$443M**. Same rocket. Roughly **9× spread** between the high estimate and the low one.

NAFCOM's own decomposition of where the gap came from, in priority order: acquisition strategy (oversight vs no oversight), requirements stability, team efficiency, management structure, early-phase systems engineering discipline, funding commitment. And from page 3 of the report, in SpaceX's own words to NASA: *"every dollar sent out of the company actually costs between $3 and $5 based on subcontractor overhead and profit."*

The 9× was not physics. It was **layers of analogy reasoning** stacked on top of each other until the floor was buried four billion dollars beneath the estimate.

## The pattern that destroys vehicles

On June 28, 2015, SpaceX CRS-7 came apart in an 800–900 millisecond window. The proximate cause, per the NASA Independent Review Team's public summary (TF-1, March 2018): an industrial-grade 17-4 PH stainless steel rod end held a helium pressure vessel inside the upper-stage LOX tank. It was used "without adequate screening or testing... without regard to the manufacturer's recommendations for a 4:1 factor of safety when using their industrial grade part."

Why? Because reasoning by analogy is invisible. Nobody wrote down "we assume industrial-grade is fine for cryogenic flight-critical loads." They just used the part the way they used it on every other system. *We use these everywhere. They have been fine.*

Then a second pattern made the investigation harder. SpaceX had switched the Falcon 9 telemetry architecture to non-deterministic network packets. Of 115 telemetry indications during the failure window, **9 were never explained** because the packets buffered into the Stage 2 flight computer at the moment they were needed (TF-4). The IRT had to reconstruct the failure from a fault tree.

Two failures. Two patterns. **Reasoning by analogy** at the design phase. **Loss of feedback** at the moment data was needed. Both invisible until they were catastrophic.

## What this set installs

Most AI agents - and a startling fraction of human engineers - exhibit both patterns by default.

When an agent says "the standard approach is X," it is reasoning by analogy. When it ships logs without asking whether the events that matter will deterministically arrive, it is losing the feedback loop. When it writes a post-mortem in a wiki page without modifying the design, it is closing three of four boxes.

These skills install the discipline that closed the 9× gap and that did not destroy CRS-7's successors. Seven spine skills, thirty-four sub-skills, ten CLIs. Every claim cited to a primary source.

The seven doors:

1. **first-principles-thinking** - strip every number to what physics, energy, mass, money, or time actually requires. NAFCOM's $443M was the physics floor. The $3.977B was the frame inheritance.
2. **system-engineering** - see graphs, not features. The CRS-7 rod end was a small industrial-grade eyebolt; the cascade it sat at the top of took the whole vehicle in 800ms.
3. **architecture** - anchor design axes to the failure corpus. 91% of orbital launch failures came from 3 root causes; Falcon 9's three primary axes (engines, avionics, staging) mapped 1:1.
4. **feedback-loops** - collapse the latency between deciding and discovering. Hawthorne co-locates design, production, and QA. Hold-down verifies in flight configuration before commit.
5. **testing-sequencing** - fidelity ladder, ranked objectives, "not because of X" clauses. Maraia walked five rungs before any rocket flew.
6. **iterate-fast** - close every anomaly with all four boxes (root cause + design change + test + doc). Make the abort cheap. Then dare.
7. **infrastructure** - signed contracts, standard menu, machine-consumable artifacts, versioned specs, lean orgs. The product is the rocket; infrastructure is what makes the second customer cheap and the thousandth nearly free.

Each spine routes to focused sub-skills when the work narrows. The agent loading any spine pulls in the sub-skills that fit. That is the design.

## What changes when you install

For an AI coding agent: it stops saying "the standard approach." It starts saying "the standard approach is X. The physics says the floor is Y. The gap is Z, which is where we should look first."

It stops shipping post-mortems. It starts closing all four boxes - naming the root cause, modifying the design artifact, adding a test that catches the failure if it recurs, and updating the doc.

It stops accepting non-deterministic telemetry, sampling, and best-effort delivery on critical paths without flagging them. It starts asking whether the event that matters will deterministically arrive.

It stops treating the rocket as the test rig. It builds the cheap rungs first.

## The honest claim

This is not magic. The skills are not larger than the corpus they distill. They will not turn a coding assistant into a chief engineer. What they will do is make the agent louder about the patterns that cost the most when ignored, and quieter about the patterns that don't.

The four sources are public. NASA published CRS-7's IRT report. NASA published NAFCOM. NASA / AIAA published the Maraia paper. SpaceX published the Falcon User's Guide. They have been sitting in the public record. We are loading them into the agent's context, where they belong.

If you want to read the corpus directly, the [primary-sources/](primary-sources/) directory has summary files with section-level citations and links back to the originals.

## What to do next

1. Install: `bash scripts/install.sh` or `/plugin install spacex-skills`.
2. Run one CLI in 30 seconds: `node tools/clis/floor-cost.js --hours 1000 --rate 200 --material 100000 --estimate 5000000`.
3. Read one spine skill: [first-principles-thinking](../skills/first-principles-thinking/SKILL.md).
4. Watch the agent on your next non-trivial task. It will route to the right sub-skills automatically. Call out when it doesn't - that's a citation we missed.

The 9× was not physics. It was inherited convention. Re-derive everything. The floor is closer than you think.

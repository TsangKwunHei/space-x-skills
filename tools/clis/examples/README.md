# CLI Examples

Sample inputs for the CLIs in `../`. Use these to see each tool produce real output in 30 seconds.

| File | For | Run |
|---|---|---|
| `checkout-graph.json` | `blast-radius.js` | `node tools/clis/blast-radius.js tools/clis/examples/checkout-graph.json` |
| `incident-history.json` | `axes-mapper.js` | `node tools/clis/axes-mapper.js --history tools/clis/examples/incident-history.json --top 3` |
| `test-plan.md` | `not-because-of-x.js` | `node tools/clis/not-because-of-x.js tools/clis/examples/test-plan.md` |

For the parameter-only CLIs (`floor-cost.js`, `loop-latency.js`, `four-box-closer.js`, `fidelity-ladder.js`), see the `--help` output for ready-to-run example commands.

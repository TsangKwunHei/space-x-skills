#!/usr/bin/env node
// floor-cost.js - Decompose a cost into physics floor + overhead layers.
//
// Inspired by NAFCOM (NASA, August 2011): same Falcon 9 priced at $3.977B (traditional)
// vs $443M (lean) - a 9× spread that came from organizational physics, not vehicle physics.
//
// Usage:
//   node floor-cost.js --hours <N> --rate <USD/hr> --material <USD> [--infra <USD>] [--multiplier <N>] [--estimate <USD>]
//
// Output: physics floor, overhead layers stacked above it, ratio of estimate to floor.

"use strict";

const HELP = `
floor-cost.js - Compute the physics floor of a cost and decompose overhead.

USAGE
  node floor-cost.js --hours <N> --rate <USD/hr> --material <USD> [options]

REQUIRED
  --hours <N>          Total workforce hours required (estimate from first principles).
  --rate <USD/hr>      Loaded labor cost per hour (salary + benefits + overhead per person).
  --material <USD>     Total material cost (raw inputs + components).

OPTIONAL
  --infra <USD>        Infrastructure utilization cost (facilities, tooling). Default 0.
  --multiplier <N>     Subcontractor multiplier - NAFCOM observed $3-$5 per outsourced dollar
                       (NAFCOM p.3). Default 1.0 (fully in-house).
  --estimate <USD>     Comparison estimate. If set, output reports the ratio above floor.
  --margin <N>         Margin fraction above floor (default 0.15 = 15%).

EXAMPLE
  node floor-cost.js --hours 1500000 --rate 200 --material 80000000 --infra 50000000 \\
                     --multiplier 1.0 --estimate 3977000000

  Reproduces (approximately) the NAFCOM low-vs-high spread for Falcon 9.

NOTES
  This tool computes the *floor*, not "the right answer." The point: if the estimate
  is many multiples above the floor, the gap is overhead - and overhead is negotiable
  in a way physics is not.

  Source: NAFCOM Cost Estimates, NASA Associate Deputy Administrator for Policy, Aug 2011.
`;

function parseArgs(argv) {
  const args = {};
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === "-h" || a === "--help") return { help: true };
    if (a.startsWith("--")) {
      const k = a.slice(2);
      const v = argv[++i];
      args[k] = v;
    }
  }
  return args;
}

function fmt(n) {
  if (n >= 1e9) return `$${(n / 1e9).toFixed(3)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(2)}M`;
  if (n >= 1e3) return `$${(n / 1e3).toFixed(1)}k`;
  return `$${n.toFixed(0)}`;
}

function main() {
  const args = parseArgs(process.argv);
  if (args.help || Object.keys(args).length === 0) {
    console.log(HELP);
    return;
  }
  const hours = Number(args.hours);
  const rate = Number(args.rate);
  const material = Number(args.material);
  const infra = Number(args.infra || 0);
  const multiplier = Number(args.multiplier || 1.0);
  const margin = Number(args.margin || 0.15);
  const estimate = args.estimate ? Number(args.estimate) : null;

  if (!hours || !rate || material === undefined) {
    console.error("ERROR: --hours, --rate, --material are required.");
    console.error("Run with --help for usage.");
    process.exit(2);
  }

  const labor = hours * rate;
  const direct = labor + material + infra;
  const subcontractorOverhead = direct * (multiplier - 1.0);
  const subtotal = direct + subcontractorOverhead;
  const marginAmount = subtotal * margin;
  const floor = subtotal + marginAmount;

  console.log("");
  console.log("=== Cost Floor Decomposition ===");
  console.log("");
  console.log(`  Workforce:           ${hours.toLocaleString()} hr × ${fmt(rate)}/hr = ${fmt(labor)}`);
  console.log(`  Material:            ${fmt(material)}`);
  console.log(`  Infrastructure:      ${fmt(infra)}`);
  console.log(`  ${"─".repeat(50)}`);
  console.log(`  Direct cost:         ${fmt(direct)}`);
  if (multiplier > 1.0) {
    console.log(`  Subcontractor (×${multiplier.toFixed(2)}): ${fmt(subcontractorOverhead)}  ← NAFCOM p.3: $3-$5 per outsourced dollar`);
  }
  console.log(`  Margin (${(margin * 100).toFixed(0)}%):         ${fmt(marginAmount)}`);
  console.log(`  ${"─".repeat(50)}`);
  console.log(`  PHYSICS FLOOR:       ${fmt(floor)}`);
  console.log("");

  if (estimate !== null) {
    const ratio = estimate / floor;
    console.log("=== Comparison to estimate ===");
    console.log("");
    console.log(`  Estimate:            ${fmt(estimate)}`);
    console.log(`  Ratio above floor:   ${ratio.toFixed(2)}×`);
    console.log("");
    if (ratio > 3) {
      console.log("  ⚠  Ratio > 3×: the gap is overhead, not physics.");
      console.log("     NAFCOM observed 9× ($3.977B vs $443M) for the same Falcon 9.");
      console.log("     The decomposition: oversight, requirements churn, less-lean mgmt,");
      console.log("     less-disciplined early systems engineering, annual funding, and the");
      console.log("     subcontractor multiplier. Each is negotiable. Physics is not.");
    } else if (ratio > 1.5) {
      console.log("  ↑  Ratio in 1.5–3× range: overhead exists but not catastrophic.");
    } else {
      console.log("  ✓  Ratio close to 1×: estimate is close to physics floor.");
    }
    console.log("");
  } else {
    console.log("(Pass --estimate <USD> to compare a quoted price to this floor.)");
    console.log("");
  }
}

main();

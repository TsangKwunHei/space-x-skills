#!/usr/bin/env node
// loop-latency.js - Score a feedback loop on cycle time, sharpness, and determinism.
//
// "The latency between deciding and discovering dominates reliability."
// Inspired by CRS-7 IRT TF-4: non-deterministic telemetry packets buffered in the
// flight computer, losing 9 of 115 indications at the moment they were needed.
//
// Usage:
//   node loop-latency.js --action "<what>" --signal "<what>" \\
//                        --cycle-seconds <N> --sharpness <0-10> --flake-rate <0-1>

"use strict";

const HELP = `
loop-latency.js - Score a feedback loop on the three axes that decide reliability.

USAGE
  node loop-latency.js --action "<text>" --signal "<text>" \\
                       --cycle-seconds <N> --sharpness <0-10> --flake-rate <0-1>

REQUIRED
  --action          Short description of the decision/action.
  --signal          Short description of the evidence that returns.
  --cycle-seconds   How long, in seconds, from action to evidence.
  --sharpness       0-10 score: how specific is the signal to the thing you care about?
                    0 = "pass/fail, no detail"; 10 = "labeled, line-numbered, root-cause-tagged".
  --flake-rate      0-1: what fraction of runs lie to you (false pass + false fail)?

OUTPUT
  Score on each axis, overall reliability rating, and the dominant weakness.

NOTES
  A 1% flake rate is the most dangerous - it lies just often enough that you can't
  tell which run was honest, and just rarely enough that you ignore it for months.
  See feedback-loops and signal-determinism-check skills.
`;

function parseArgs(argv) {
  const args = {};
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === "-h" || a === "--help") return { help: true };
    if (a.startsWith("--")) {
      const k = a.slice(2);
      args[k] = argv[++i];
    }
  }
  return args;
}

function gradeCycle(s) {
  if (s <= 2) return ["A+", "near-instant - debugging superpower"];
  if (s <= 10) return ["A", "fast enough to iterate freely"];
  if (s <= 60) return ["B", "tight, good for inner loop"];
  if (s <= 600) return ["C", "minutes - acceptable for outer loop, slow for debugging"];
  if (s <= 3600) return ["D", "an hour - context evaporates between cycles"];
  return ["F", "hours+ - at this point the loop is a hope, not a tool"];
}
function gradeSharpness(s) {
  if (s >= 9) return ["A+", "pinpoint - root cause comes free"];
  if (s >= 7) return ["A", "specific - usually points at the right area"];
  if (s >= 5) return ["B", "moderately specific - narrows the search"];
  if (s >= 3) return ["C", "vague - pass/fail with little detail"];
  return ["F", "binary or worse - coin flip wearing a uniform"];
}
function gradeFlake(r) {
  if (r <= 0.001) return ["A+", "essentially deterministic"];
  if (r <= 0.01)  return ["F", "1% flake - most dangerous: lies just often enough that you can't tell"];
  if (r <= 0.05)  return ["C", "5% flake - debuggable but loses trust fast"];
  if (r <= 0.20)  return ["D", "20% flake - debugging is now archaeology"];
  if (r <= 0.50)  return ["B-", "50% flake - at least you know the loop is broken"];
  return ["C-", "above 50% flake - coin flip"];
}

function main() {
  const args = parseArgs(process.argv);
  if (args.help || !args.action) {
    console.log(HELP);
    return;
  }
  const cycle = Number(args["cycle-seconds"]);
  const sharpness = Number(args.sharpness);
  const flake = Number(args["flake-rate"]);
  if (Number.isNaN(cycle) || Number.isNaN(sharpness) || Number.isNaN(flake)) {
    console.error("ERROR: --cycle-seconds, --sharpness, --flake-rate must all be numbers.");
    process.exit(2);
  }

  const [cGrade, cNote] = gradeCycle(cycle);
  const [sGrade, sNote] = gradeSharpness(sharpness);
  const [fGrade, fNote] = gradeFlake(flake);

  console.log("");
  console.log("=== Feedback Loop Score ===");
  console.log("");
  console.log(`  Action: ${args.action}`);
  console.log(`  Signal: ${args.signal}`);
  console.log("");
  console.log(`  Cycle time:    ${cycle}s          → ${cGrade}  (${cNote})`);
  console.log(`  Sharpness:     ${sharpness}/10     → ${sGrade}  (${sNote})`);
  console.log(`  Flake rate:    ${(flake * 100).toFixed(2)}%  → ${fGrade}  (${fNote})`);
  console.log("");

  const grades = [cGrade, sGrade, fGrade];
  const worst = Math.max(...grades.map((g) => "FDCBA".indexOf(g[0])));
  const summary = ["A", "B", "C", "D", "F"][4 - worst];
  console.log(`  Overall: ${summary}  (limited by the weakest axis)`);
  console.log("");

  const dominantWeakness = (() => {
    const m = { F: 5, D: 4, C: 3, B: 2, A: 1 };
    const score = (g) => m[g[0]] || 0;
    const order = [
      ["cycle time", score(cGrade)],
      ["sharpness", score(sGrade)],
      ["flake rate", score(fGrade)],
    ].sort((a, b) => b[1] - a[1]);
    return order[0][0];
  })();
  console.log(`  Dominant weakness: ${dominantWeakness}`);
  console.log("");
  console.log("  Source: CRS-7 IRT TF-4 (March 2018): non-deterministic telemetry");
  console.log("  buffered into oblivion at the moment data was needed.");
  console.log("");
}

main();

#!/usr/bin/env node
// fidelity-ladder.js - Suggest a cheapest-first test sequence for an experiment.
//
// Maraia walked five rungs before any rocket flew:
//   1. Low-speed wind tunnel (Texas A&M)
//   2. Drop tower (China Lake)
//   3. Subscale balloon drop (10-inch, 6-pound capsule, 100kft)
//   4. Chute ejection rig with no pyros
//   5. Full-scale balloon drop (30-inch, 133-pound, 100kft)
//
// "What is the cheapest test that still tells me real physics?"
//
// Usage:
//   node fidelity-ladder.js --goal "<what you're verifying>" --budget <USD> --time-days <N>

"use strict";

const HELP = `
fidelity-ladder.js - Sequence tests cheapest-first; the rocket is the most
expensive test rig ever built. Don't make it the first one.

USAGE
  node fidelity-ladder.js --goal "<text>" [--domain <SOFTWARE|HARDWARE|SCIENCE>] [--budget <USD>]

OUTPUT
  A 4-6 rung ladder. Each rung names: cost class, what it can falsify, what it
  cannot, and the trigger to promote to the next rung.

EXAMPLE
  node fidelity-ladder.js --goal "verify async retry logic under network partition" --domain SOFTWARE
  node fidelity-ladder.js --goal "validate parachute deployment at 100kft" --domain HARDWARE

NOTES
  Skipping a rung makes the most expensive rig the test rig. Don't skip.
  See testing-sequencing and fidelity-ladder-design skills.
`;

const LADDERS = {
  SOFTWARE: [
    { rung: 1, name: "Type / lint", cost: "$0",        falsifies: "syntax + obvious type errors",                    cannot: "any runtime behavior",                    promote: "code compiles" },
    { rung: 2, name: "Unit test",   cost: "$0–$1",     falsifies: "function-level logic in isolation",                cannot: "integration, ordering, concurrency",      promote: "all unit tests pass + coverage gate" },
    { rung: 3, name: "Property test", cost: "$1–$10",  falsifies: "invariants across input space",                    cannot: "real I/O, real time, real failure modes", promote: "no shrinking failures in N runs" },
    { rung: 4, name: "Integration test (real deps)", cost: "$10–$100", falsifies: "wiring + protocol + serialization", cannot: "load, partial failure, scale",            promote: "passes against ephemeral real services" },
    { rung: 5, name: "Chaos / fault injection", cost: "$100–$1k", falsifies: "behavior under partition, latency, drop", cannot: "production-only emergent behavior",       promote: "survives N injection patterns clean" },
    { rung: 6, name: "Production canary",        cost: "$1k+",     falsifies: "remaining unknowns at small blast radius", cannot: "(this is the rocket - not a rung to skip onto)", promote: "(N/A - last rung)" },
  ],
  HARDWARE: [
    { rung: 1, name: "Analytic / sim",         cost: "$0–$1k",   falsifies: "first-order physics", cannot: "non-modeled couplings",         promote: "model converges" },
    { rung: 2, name: "Bench test",             cost: "$1k–$10k", falsifies: "single-component behavior at lab conditions", cannot: "environment, scale", promote: "bench passes acceptance" },
    { rung: 3, name: "Subscale test in env",   cost: "$10k–$100k", falsifies: "physics-correct behavior at reduced scale (Maraia 10-inch capsule)", cannot: "scale-dependent effects", promote: "subscale meets ranked objectives" },
    { rung: 4, name: "Full-scale ground test", cost: "$100k–$1M", falsifies: "scale-correct behavior in lab conditions", cannot: "real environment", promote: "ground test meets objectives" },
    { rung: 5, name: "Full-scale flight test", cost: "$1M+",     falsifies: "real envelope, real loads (Maraia 30-inch balloon drop)", cannot: "(this is the rocket)", promote: "(N/A - last rung)" },
  ],
  SCIENCE: [
    { rung: 1, name: "Literature check",       cost: "$0",       falsifies: "already answered",            cannot: "novel claim",            promote: "claim is genuinely novel" },
    { rung: 2, name: "Toy model / simulation", cost: "$0–$100",  falsifies: "first-order plausibility",    cannot: "real-world validity",    promote: "toy reproduces known result" },
    { rung: 3, name: "Pilot experiment",       cost: "$100–$1k", falsifies: "effect exists at pilot N",    cannot: "effect size, generality", promote: "pilot signal > noise" },
    { rung: 4, name: "Pre-registered study",   cost: "$1k–$10k", falsifies: "effect exists at adequate power", cannot: "external validity",  promote: "pre-reg passes" },
    { rung: 5, name: "Replication elsewhere",  cost: "$10k+",    falsifies: "external validity",           cannot: "(end of ladder)",       promote: "(N/A)" },
  ],
};

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

function main() {
  const args = parseArgs(process.argv);
  if (args.help || !args.goal) {
    console.log(HELP);
    return;
  }
  const domain = (args.domain || "SOFTWARE").toUpperCase();
  const ladder = LADDERS[domain];
  if (!ladder) {
    console.error(`ERROR: unknown --domain '${domain}'. Choose one of SOFTWARE | HARDWARE | SCIENCE.`);
    process.exit(2);
  }

  console.log("");
  console.log(`=== Fidelity Ladder: ${args.goal} ===`);
  console.log(`(domain: ${domain})`);
  console.log("");
  console.log("Walk these rungs in order. Each one's failure is development data.");
  console.log("");
  for (const r of ladder) {
    console.log(`  Rung ${r.rung}. ${r.name}    ${r.cost}`);
    console.log(`    falsifies: ${r.falsifies}`);
    console.log(`    cannot:    ${r.cannot}`);
    console.log(`    promote when: ${r.promote}`);
    console.log("");
  }
  console.log("Rule: do not skip rungs. Maraia's pattern: 5 cheap rungs before any rocket.");
  console.log("Source: 'Maraia Capsule Flight Testing and Results for EDL', Sostaric & Strahan, AIAA, ~2015.");
  console.log("");
}

main();

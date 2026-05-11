#!/usr/bin/env node
// axes-mapper.js - Map a system's failure history to its primary architectural axes.
//
// Aerospace Corp's launch-failure study found 91% of failures came from 3 root causes;
// Falcon 9's three primary axes (engines, avionics, staging) mapped 1:1. The principle:
// don't enumerate 50 risk areas. Find the 3 that actually take you down, and tier
// fault tolerance against them.
//
// Usage:
//   node axes-mapper.js --history <history.json>
//   node axes-mapper.js --history <history.json> --top 3

"use strict";

const fs = require("fs");

const HELP = `
axes-mapper.js - Cluster a failure history into 3-5 primary axes.

USAGE
  node axes-mapper.js --history <history.json> [--top 3]

INPUT (history.json)
  {
    "incidents": [
      { "date": "2026-01-12", "summary": "auth token rotation broke gateway",        "tags": ["auth", "rotation"] },
      { "date": "2026-02-03", "summary": "kafka consumer lag triggered queue depth",  "tags": ["queue", "kafka"] },
      ...
    ]
  }

OUTPUT
  Top N axes by incident count, with each incident attributed.
  Recommendation: tier fault tolerance against the top N. The remainder are
  the long tail and can run with single-point sufficiency.

NOTES
  Aerospace Corp study cited in Falcon-program literature: 91% of orbital launch
  failures came from 3 root causes. Don't spread fault-tolerance budget evenly.
  See architecture and three-axes-decomposition skills.
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

function main() {
  const args = parseArgs(process.argv);
  if (args.help || !args.history) {
    console.log(HELP);
    return;
  }
  let raw;
  try {
    raw = fs.readFileSync(args.history, "utf8");
  } catch (e) {
    console.error(`ERROR: cannot read ${args.history}: ${e.message}`);
    process.exit(2);
  }
  let data;
  try { data = JSON.parse(raw); } catch (e) {
    console.error(`ERROR: invalid JSON: ${e.message}`); process.exit(2);
  }
  const incidents = data.incidents || [];
  if (incidents.length === 0) {
    console.error("No incidents in history.");
    process.exit(1);
  }
  const top = Number(args.top || 3);

  const tagCount = new Map();
  for (const inc of incidents) {
    const tags = inc.tags || [];
    for (const t of tags) {
      tagCount.set(t, (tagCount.get(t) || 0) + 1);
    }
  }
  const axes = [...tagCount.entries()].sort((a, b) => b[1] - a[1]);

  console.log("");
  console.log(`=== Failure Axes (top ${top}) ===`);
  console.log(`(${incidents.length} incident(s) total)`);
  console.log("");
  const totalIncidents = incidents.length;
  let cumulative = 0;
  axes.slice(0, top).forEach(([tag, count], i) => {
    const pct = ((count / totalIncidents) * 100).toFixed(0);
    cumulative += count;
    console.log(`  Axis ${i + 1}. ${tag}    ${count} incident(s) (${pct}%)`);
    incidents.filter((inc) => (inc.tags || []).includes(tag)).slice(0, 5).forEach((inc) => {
      console.log(`    - ${inc.date}  ${inc.summary}`);
    });
    console.log("");
  });
  const cumPct = ((cumulative / totalIncidents) * 100).toFixed(0);
  console.log(`  Top ${top} axes account for ${cumPct}% of incidents.`);
  console.log("");
  console.log("Recommendation: tier fault tolerance against the top axes.");
  console.log("The remainder is the long tail; single-point sufficiency is acceptable there.");
  console.log("");
  console.log("Reference: 91%-from-3-causes pattern in launch failure corpus.");
  console.log("");
}

main();

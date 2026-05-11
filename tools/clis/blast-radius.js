#!/usr/bin/env node
// blast-radius.js - Read a system dependency graph; for each node, list what dies on failure.
//
// Inspired by CRS-7 IRT (March 2018): an industrial-grade rod end at a flight-critical
// cryogenic load path took the whole vehicle in ~800 ms. The rod end was at the apex
// of a cascade - its blast radius was the entire stack.
//
// Usage:
//   node blast-radius.js <graph.json>
//   echo '{"nodes":["a","b"],"edges":[["a","b"]]}' | node blast-radius.js -
//
// Graph format:
//   {
//     "nodes": ["auth-service", "api-gateway", "checkout"],
//     "edges": [["auth-service","api-gateway"], ["api-gateway","checkout"]]
//   }
// Each edge [from, to] means: "to depends on from" (i.e., if `from` fails, `to` is impacted).

"use strict";

const fs = require("fs");

const HELP = `
blast-radius.js - Compute downstream blast radius for every node in a dependency graph.

USAGE
  node blast-radius.js <graph.json>
  cat graph.json | node blast-radius.js -

GRAPH FORMAT (JSON)
  {
    "nodes": ["service-a", "service-b", "service-c"],
    "edges": [["service-a", "service-b"], ["service-b", "service-c"]]
  }
  Each edge [from, to] means: "to depends on from".
  If from fails, to (and everything downstream of to) is impacted.

OUTPUT
  For each node:
    - Direct dependents
    - Full transitive blast radius (count + list)
    - Apex flag (no dependents above this node)

EXAMPLE
  node blast-radius.js examples/checkout-graph.json

NOTES
  Apex nodes - those at the top of a cascade - deserve aerospace-grade scrutiny.
  CRS-7 demonstrated: the part at the apex doesn't get to be "industrial grade."
  See system-engineering and apex-identification skills.
`;

function readStdin() {
  return new Promise((resolve) => {
    const chunks = [];
    process.stdin.on("data", (c) => chunks.push(c));
    process.stdin.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
  });
}

function buildAdj(nodes, edges) {
  const downstream = new Map();
  const upstream = new Map();
  for (const n of nodes) {
    downstream.set(n, new Set());
    upstream.set(n, new Set());
  }
  for (const [from, to] of edges) {
    if (!downstream.has(from)) {
      downstream.set(from, new Set());
      upstream.set(from, new Set());
    }
    if (!downstream.has(to)) {
      downstream.set(to, new Set());
      upstream.set(to, new Set());
    }
    downstream.get(from).add(to);
    upstream.get(to).add(from);
  }
  return { downstream, upstream };
}

function transitiveDownstream(node, downstream) {
  const visited = new Set();
  const stack = [...(downstream.get(node) || [])];
  while (stack.length) {
    const n = stack.pop();
    if (visited.has(n)) continue;
    visited.add(n);
    for (const next of downstream.get(n) || []) stack.push(next);
  }
  return visited;
}

async function main() {
  const argv = process.argv.slice(2);
  if (argv.length === 0 || argv.includes("--help") || argv.includes("-h")) {
    console.log(HELP);
    return;
  }

  let raw;
  if (argv[0] === "-") {
    raw = await readStdin();
  } else {
    try {
      raw = fs.readFileSync(argv[0], "utf8");
    } catch (e) {
      console.error(`ERROR: cannot read ${argv[0]}: ${e.message}`);
      process.exit(2);
    }
  }

  let graph;
  try {
    graph = JSON.parse(raw);
  } catch (e) {
    console.error(`ERROR: invalid JSON: ${e.message}`);
    process.exit(2);
  }
  const nodes = graph.nodes || [];
  const edges = graph.edges || [];
  if (nodes.length === 0) {
    console.error("ERROR: graph has no nodes.");
    process.exit(2);
  }

  const { downstream, upstream } = buildAdj(nodes, edges);
  const radii = nodes.map((n) => ({
    node: n,
    direct: [...(downstream.get(n) || [])],
    transitive: [...transitiveDownstream(n, downstream)],
    apex: (upstream.get(n) || new Set()).size === 0,
  }));
  radii.sort((a, b) => b.transitive.length - a.transitive.length);

  console.log("");
  console.log("=== Blast Radius Report ===");
  console.log("");
  console.log("Nodes ordered by transitive blast radius (largest first):");
  console.log("");
  for (const r of radii) {
    const apexTag = r.apex ? "  [APEX]" : "";
    console.log(`  ${r.node}${apexTag}`);
    console.log(`    direct:     ${r.direct.length === 0 ? "(none)" : r.direct.join(", ")}`);
    console.log(`    transitive: ${r.transitive.length} node(s)${r.transitive.length > 0 ? ": " + r.transitive.join(", ") : ""}`);
    console.log("");
  }

  const apexes = radii.filter((r) => r.apex);
  console.log("=== Apex nodes ===");
  console.log("");
  if (apexes.length === 0) {
    console.log("  (none - graph has no roots; every node has an upstream dependency)");
  } else {
    console.log(`  ${apexes.length} apex node(s): ${apexes.map((a) => a.node).join(", ")}`);
    console.log("");
    console.log("  CRS-7 lesson: apex parts cannot be industrial-grade.");
    console.log("  Apply 4:1 derating, screening, and acceptance testing to apex nodes.");
  }
  console.log("");
}

main();

#!/usr/bin/env node
// signal-determinism.js - Scan a config / log pipeline definition for buffering
// and non-determinism red flags.
//
// CRS-7 IRT TF-4: SpaceX had switched the Falcon 9 telemetry architecture to
// non-deterministic network packets, causing 9 of 115 indications during the
// failure window to be lost to network buffering in the Stage 2 flight computer.
// "Losing the loop at the moment you most need data is the cardinal sin."
//
// Usage:
//   node signal-determinism.js <file> [...files]

"use strict";

const fs = require("fs");
const path = require("path");

const HELP = `
signal-determinism.js - Flag non-determinism risks in observability/telemetry config.

WHAT IT FLAGS (case-insensitive)
  Buffering         : "buffer", "batch_size", "flush_interval", "queue_capacity",
                      "max_in_flight", "linger_ms"
  Lossy semantics   : "drop", "best[-_]effort", "fire[-_]and[-_]forget", "sample(_rate)?",
                      "discard", "lossy"
  Async w/o backpressure : "async" without "await", "fire", "non[-_]?blocking"
  UDP / unreliable  : "udp", "unreliable", "no[-_]?ack"
  Compression that may delay: "gzip" + "buffer"
  Aggregation that hides events: "rate[-_]?limit", "throttle", "coalesce", "aggregate"

WHAT IT DOES NOT FLAG
  These patterns are often correct in production. The point is to surface them so
  every one is consciously chosen, not inherited.

USAGE
  node signal-determinism.js otel-collector.yaml
  node signal-determinism.js fluent-bit.conf logger.config.json
`;

const PATTERNS = [
  { name: "buffering",         re: /\b(buffer|batch[_-]?size|flush[_-]?interval|queue[_-]?capacity|max[_-]?in[_-]?flight|linger[_-]?ms)\b/i },
  { name: "lossy semantics",   re: /\b(drop|best[_-]?effort|fire[_-]?and[_-]?forget|discard|lossy)\b/i },
  { name: "sampling",          re: /\b(sample[_-]?rate|sampler|trace[_-]?sample)\b/i },
  { name: "udp / unreliable",  re: /\b(udp|unreliable|no[_-]?ack)\b/i },
  { name: "rate-limit / hide", re: /\b(rate[_-]?limit|throttle|coalesce|aggregate)\b/i },
  { name: "async no-await",    re: /\bnon[_-]?blocking\b/i },
];

function scan(label, content) {
  const lines = content.split(/\r?\n/);
  const hits = [];
  lines.forEach((line, i) => {
    for (const p of PATTERNS) {
      if (p.re.test(line)) {
        hits.push({ line: i + 1, name: p.name, text: line.trim().slice(0, 140) });
      }
    }
  });
  return { label, hits };
}

function main() {
  const argv = process.argv.slice(2);
  if (argv.length === 0 || argv.includes("--help") || argv.includes("-h")) {
    console.log(HELP);
    return;
  }
  const reports = argv.map((f) => {
    try {
      const content = fs.readFileSync(f, "utf8");
      return scan(path.relative(process.cwd(), f), content);
    } catch (e) {
      console.error(`ERROR: cannot read ${f}: ${e.message}`);
      return null;
    }
  }).filter(Boolean);

  let total = 0;
  for (const r of reports) {
    if (r.hits.length === 0) {
      console.log(`\n${r.label}: clean`);
      continue;
    }
    console.log(`\n${r.label}:`);
    for (const h of r.hits) {
      console.log(`  L${h.line}  [${h.name}]  ${h.text}`);
      total++;
    }
  }

  console.log("");
  console.log(`Total non-determinism markers: ${total}`);
  console.log("");
  if (total > 0) {
    console.log("For each marker: ask 'at the moment a customer reports an anomaly,");
    console.log("will THIS event be in the data, or buffered/sampled/dropped?' If you");
    console.log("can't answer 'yes, deterministically,' the loop will lie when it matters.");
    console.log("");
    console.log("Source: CRS-7 IRT TF-4 + TR-3 (NASA, March 2018).");
  }
  process.exit(total > 0 ? 1 : 0);
}

main();

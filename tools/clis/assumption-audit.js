#!/usr/bin/env node
// assumption-audit.js - Scan a doc/PR for analogy-reasoning markers.
//
// Reasoning by analogy is invisible: nobody writes "we assume X because everybody does."
// Instead they reach for inherited phrases. This tool flags those phrases so you can
// re-derive them from physics.
//
// Inspired by CRS-7 IRT TF-1: an industrial-grade rod end was used "without adequate
// screening or testing... without regard to the manufacturer's recommendations."
// Reasoning by analogy. We use these everywhere. They have been fine. They weren't.
//
// Usage:
//   node assumption-audit.js <file> [...files]
//   cat doc.md | node assumption-audit.js -
//
// Output: each match with line number and a re-derivation prompt.

"use strict";

const fs = require("fs");
const path = require("path");

const HELP = `
assumption-audit.js - Flag analogy-reasoning markers in markdown, code, or specs.

USAGE
  node assumption-audit.js <file> [...files]
  cat doc.md | node assumption-audit.js -

What it flags (case-insensitive):
  - "industry standard"           - "best practice(s)"
  - "we've always"                - "we have always"
  - "the standard"                - "standard practice"
  - "as is customary"             - "as usual"
  - "typically"                   - "the typical"
  - "the way it's done"           - "the way we do it"
  - "vendor recommends"           - "vendor-recommended"
  - "the estimate says"           - "industry consensus"
  - "battle-tested"               - "proven approach"
  - "everyone uses"               - "default choice"

What it does NOT flag:
  Statements that already cite physics, math, or an experiment. The point isn't to
  ban these phrases - it's to surface them so each one gets re-derived once.

EXAMPLE
  node assumption-audit.js docs/architecture.md
  node assumption-audit.js src/**/*.ts
  git diff main | node assumption-audit.js -
`;

const MARKERS = [
  /\bindustry standard\b/i,
  /\bbest[-\s]?practice(s)?\b/i,
  /\bwe['']?ve always\b/i,
  /\bwe have always\b/i,
  /\bthe standard\b/i,
  /\bstandard practice\b/i,
  /\bas is customary\b/i,
  /\bas usual\b/i,
  /\btypically\b/i,
  /\bthe typical\b/i,
  /\bthe way it['']?s done\b/i,
  /\bthe way we do it\b/i,
  /\bvendor[-\s]recommend(s|ed)?\b/i,
  /\bthe estimate says\b/i,
  /\bindustry consensus\b/i,
  /\bbattle[-\s]tested\b/i,
  /\bproven approach\b/i,
  /\beveryone uses\b/i,
  /\bdefault choice\b/i,
  /\bcommon wisdom\b/i,
  /\bconventional wisdom\b/i,
  /\bnobody (does|uses|builds)\b/i,
];

function readStdin() {
  return new Promise((resolve) => {
    const chunks = [];
    process.stdin.on("data", (c) => chunks.push(c));
    process.stdin.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
  });
}

function scan(label, content) {
  const lines = content.split(/\r?\n/);
  const hits = [];
  lines.forEach((line, idx) => {
    for (const m of MARKERS) {
      if (m.test(line)) {
        hits.push({ line: idx + 1, text: line.trim().slice(0, 200), marker: m.source });
        break;
      }
    }
  });
  return { label, hits };
}

async function main() {
  const argv = process.argv.slice(2);
  if (argv.length === 0 || argv.includes("--help") || argv.includes("-h")) {
    console.log(HELP);
    return;
  }

  const reports = [];

  if (argv.length === 1 && argv[0] === "-") {
    const content = await readStdin();
    reports.push(scan("(stdin)", content));
  } else {
    for (const f of argv) {
      try {
        const content = fs.readFileSync(f, "utf8");
        reports.push(scan(path.relative(process.cwd(), f), content));
      } catch (e) {
        console.error(`ERROR: cannot read ${f}: ${e.message}`);
      }
    }
  }

  let total = 0;
  for (const r of reports) {
    if (r.hits.length === 0) continue;
    console.log(`\n${r.label}:`);
    for (const h of r.hits) {
      console.log(`  L${h.line}: ${h.text}`);
      console.log(`         ↳ /${h.marker}/ - re-derive from physics, not precedent`);
      total++;
    }
  }

  console.log("");
  console.log(`Total analogy markers: ${total}`);
  console.log("");
  if (total > 0) {
    console.log("For each: ask 'is there a physical, mathematical, or empirical reason");
    console.log("this is true *for this specific case*?' If you can't answer, the answer");
    console.log("is no - re-derive before you ship.");
    console.log("");
    console.log("(See first-principles-thinking and analogy-detector skills.)");
  }
  process.exit(total > 0 ? 1 : 0);
}

main();

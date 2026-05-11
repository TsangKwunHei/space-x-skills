#!/usr/bin/env node
// forbidden-list.js - Generate or validate a forbidden-list YAML.
//
// A forbidden list is the published, versioned set of patterns rejected
// from the codebase / system. Instead of relying on each reviewer to remember
// "we don't do that here," the rule is anchored in a file, with a reason
// (usually a past incident) and the alternative.
//
// Usage:
//   node forbidden-list.js --init                   # create a starter template
//   node forbidden-list.js --validate <file>        # check entries are well-formed
//   node forbidden-list.js --check-source <code-file> --against <forbidden.yaml>
//                                                   # grep code for forbidden patterns

"use strict";

const fs = require("fs");
const path = require("path");

const HELP = `
forbidden-list.js - Manage a versioned list of patterns rejected from the system.

USAGE
  node forbidden-list.js --init [--out forbidden.yaml]
  node forbidden-list.js --validate <forbidden.yaml>
  node forbidden-list.js --check-source <code-file> --against <forbidden.yaml>

ENTRIES (YAML)
  - id: industrial-grade-on-flight-critical
    pattern: "industrial[\\s-]*grade"
    rationale: |
      CRS-7 IRT TF-1: industrial-grade rod end at flight-critical cryogenic
      load path destroyed Falcon 9 in ~800ms.
    alternative: aerospace-grade with manufacturer's 4:1 derating applied
    severity: critical
    source: "CRS-7 IRT (March 2018), TF-1"
    added: 2026-05-08

NOTES
  Severity levels: critical (block CI), high (warn), info (note in review).
  See architecture and forbidden-list skills.
`;

const TEMPLATE = `# forbidden-list.yaml - patterns rejected from this system.
# Each entry: id, pattern (regex), rationale, alternative, severity, source, added.
# Severity: critical | high | info

- id: industrial-grade-on-flight-critical
  pattern: "industrial[\\\\s-]*grade"
  rationale: |
    CRS-7 IRT TF-1: an industrial-grade rod end at a flight-critical cryogenic
    load path destroyed Falcon 9 in ~800ms. "Without adequate screening or
    testing... without regard to the manufacturer's recommendations for a 4:1
    factor of safety when using their industrial grade part."
  alternative: aerospace-grade or industrial + manufacturer-recommended 4:1 derating with screening
  severity: critical
  source: "CRS-7 IRT (March 2018), TF-1"
  added: 2026-05-08

- id: non-deterministic-telemetry
  pattern: "(udp|best[-_]?effort|sample[-_]?rate|drop[-_]?policy)"
  rationale: |
    CRS-7 IRT TF-4: non-deterministic telemetry packets buffered into the
    Stage 2 flight computer caused 9 of 115 indications during the failure
    window to be lost. Loop dies at the moment you need it.
  alternative: deterministic delivery (TCP / persistent queue / sync flush) on critical paths
  severity: high
  source: "CRS-7 IRT (March 2018), TF-4 + TR-3"
  added: 2026-05-08

- id: skip-the-cheap-rung
  pattern: "skip[- ]?(unit|integration|smoke|bench|wind[- ]?tunnel|subscale)"
  rationale: |
    Maraia walked five test rungs before any rocket flew. Skipping a rung
    makes the most expensive rig the test rig - the rocket is the most
    expensive test rig ever built.
  alternative: walk the ladder; promote only on objective pass
  severity: high
  source: "Maraia AIAA ~2015"
  added: 2026-05-08

- id: three-of-four-closure
  pattern: "(post[- ]?mortem|wiki page|lesson learned)"
  rationale: |
    A post-mortem that does not modify the design + add a test + revise the
    doc leaves the loop open. The same failure will appear next flight.
    Maraia closed the eyebolt anomaly in one parenthetical sentence.
  alternative: four-box closure (root cause + design change + test + doc)
  severity: high
  source: "Maraia AIAA ~2015"
  added: 2026-05-08

# Add your own entries below. Each one is an incident the system should not have to learn twice.
`;

function parseArgs(argv) {
  const args = {};
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === "-h" || a === "--help") return { help: true };
    if (a === "--init") args.init = true;
    else if (a.startsWith("--")) {
      const k = a.slice(2);
      const next = argv[i + 1];
      if (next && !next.startsWith("--")) {
        args[k] = next;
        i++;
      } else {
        args[k] = true;
      }
    }
  }
  return args;
}

function init(out) {
  const target = out || "forbidden.yaml";
  if (fs.existsSync(target)) {
    console.error(`ERROR: ${target} already exists. Refusing to overwrite.`);
    process.exit(2);
  }
  fs.writeFileSync(target, TEMPLATE, "utf8");
  console.log(`Initialized ${target} with 4 starter entries.`);
}

function validate(file) {
  let raw;
  try {
    raw = fs.readFileSync(file, "utf8");
  } catch (e) {
    console.error(`ERROR: cannot read ${file}: ${e.message}`);
    process.exit(2);
  }
  const entries = raw.split(/^- id:/m).slice(1);
  if (entries.length === 0) {
    console.error("No entries found.");
    process.exit(1);
  }
  let ok = 0, bad = 0;
  entries.forEach((e, i) => {
    const required = ["pattern", "rationale", "alternative", "severity", "source"];
    const missing = required.filter((r) => !new RegExp(`^\\s*${r}:`, "m").test(e));
    if (missing.length === 0) {
      ok++;
    } else {
      console.log(`Entry #${i + 1}: missing fields: ${missing.join(", ")}`);
      bad++;
    }
  });
  console.log("");
  console.log(`Valid: ${ok}  Invalid: ${bad}`);
  process.exit(bad === 0 ? 0 : 1);
}

function checkSource(codeFile, againstFile) {
  let code, list;
  try {
    code = fs.readFileSync(codeFile, "utf8");
    list = fs.readFileSync(againstFile, "utf8");
  } catch (e) {
    console.error(`ERROR: ${e.message}`);
    process.exit(2);
  }
  const entries = list.split(/^- id:/m).slice(1).map((e, i) => {
    const id = (e.match(/^\s*([\w-]+)/) || [])[1];
    const pat = (e.match(/^\s*pattern:\s*"([^"]+)"/m) || [])[1];
    const sev = (e.match(/^\s*severity:\s*(\w+)/m) || [])[1];
    return { id, pat, sev };
  });
  const lines = code.split(/\r?\n/);
  let hits = 0;
  for (const entry of entries) {
    if (!entry.pat) continue;
    let re;
    try { re = new RegExp(entry.pat, "i"); } catch (_) { continue; }
    lines.forEach((line, idx) => {
      if (re.test(line)) {
        console.log(`${codeFile}:${idx + 1}  [${entry.sev || "?"}]  ${entry.id}`);
        console.log(`  ${line.trim().slice(0, 140)}`);
        hits++;
      }
    });
  }
  console.log("");
  console.log(`Total forbidden-pattern hits: ${hits}`);
  process.exit(hits === 0 ? 0 : 1);
}

function main() {
  const args = parseArgs(process.argv);
  if (args.help) {
    console.log(HELP);
    return;
  }
  if (args.init) return init(args.out);
  if (args.validate) return validate(args.validate);
  if (args["check-source"] && args.against) return checkSource(args["check-source"], args.against);
  console.log(HELP);
}

main();

#!/usr/bin/env node
// not-because-of-x.js - Append "not because of X" clauses to a test plan.
//
// A test pass means "the system worked." A pass that happened to fire the
// success path *for the wrong reason* is the most expensive false positive
// you can ship. The Maraia paper's full-scale flight result -
// "all objectives met with the exception of the video objective" - was
// only meaningful because each objective had explicit pass criteria that
// excluded accidental success.
//
// Usage:
//   node not-because-of-x.js <test-plan.md|json>

"use strict";

const fs = require("fs");

const HELP = `
not-because-of-x.js - Append safety clauses to a test plan that block accidental passes.

USAGE
  node not-because-of-x.js <test-plan.md>
  node not-because-of-x.js <test-plan.json>

INPUT
  Markdown: lines starting with "- " or "* " or "1. " are treated as objectives.
  JSON: {"objectives": ["...", "..."]}.

OUTPUT
  For each objective, the original line plus 2-3 "not because of" clauses pulled
  from the common accidental-pass corpus.

EXAMPLE
  node not-because-of-x.js test-plan.md > test-plan-hardened.md

NOTES
  See testing-sequencing and not-because-of-x-clauses skills.
`;

const COMMON_NOT_BECAUSE = {
  default: [
    "not because the test was skipped or short-circuited",
    "not because the assertion compared the wrong fields",
    "not because the system was in a degraded fallback state",
  ],
  network: [
    "not because the request was cached and never reached the server",
    "not because the retry logic masked an underlying failure",
    "not because a load balancer served from a stale pool",
  ],
  data: [
    "not because the input matched a default/empty path",
    "not because both sides used the same wrong constant",
    "not because the migration backfilled a passing value",
  ],
  ui: [
    "not because the element rendered but was not visible / not interactive",
    "not because the test waited until the spinner timed out",
    "not because the page was a stale cached copy",
  ],
  perf: [
    "not because the test ran on warm caches the user will not have",
    "not because GC happened to defer until after the measurement",
    "not because the workload was below the queue-saturation threshold",
  ],
};

function classify(text) {
  const t = text.toLowerCase();
  if (/\b(http|api|request|network|grpc|rpc|kafka|queue)\b/.test(t)) return "network";
  if (/\b(db|sql|migration|schema|record|row|backfill)\b/.test(t)) return "data";
  if (/\b(ui|page|button|click|dom|render|visible)\b/.test(t)) return "ui";
  if (/\b(perf|latency|throughput|bench|p9[59]|qps|rps)\b/.test(t)) return "perf";
  return "default";
}

function harden(line) {
  const cls = classify(line);
  const pool = COMMON_NOT_BECAUSE[cls];
  return pool;
}

function main() {
  const argv = process.argv.slice(2);
  if (argv.length === 0 || argv.includes("--help") || argv.includes("-h")) {
    console.log(HELP);
    return;
  }
  const file = argv[0];
  let raw;
  try {
    raw = fs.readFileSync(file, "utf8");
  } catch (e) {
    console.error(`ERROR: cannot read ${file}: ${e.message}`);
    process.exit(2);
  }

  let objectives = [];
  if (file.endsWith(".json")) {
    try {
      const j = JSON.parse(raw);
      objectives = j.objectives || [];
    } catch (e) {
      console.error(`ERROR: invalid JSON: ${e.message}`);
      process.exit(2);
    }
  } else {
    objectives = raw.split(/\r?\n/)
      .map((l) => l.replace(/^\s*([-*]|\d+\.)\s+/, "").trim())
      .filter((l) => l.length > 0);
  }

  console.log("# Test Plan - hardened with 'not because of X' clauses");
  console.log("");
  console.log("> Source pattern: Maraia Flight Test paper, AIAA ~2015. Objectives ranked");
  console.log("> and pre-declared; pass requires the right reason, not just the right output.");
  console.log("");

  for (const obj of objectives) {
    console.log(`## Objective: ${obj}`);
    console.log("");
    console.log("Pass criteria:");
    console.log(`- The expected outcome is observed`);
    for (const clause of harden(obj)) {
      console.log(`- ${clause}`);
    }
    console.log("");
  }
}

main();

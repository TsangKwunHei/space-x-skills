#!/usr/bin/env node
// four-box-closer.js - Anomaly closure checklist.
//
// Inspired by Maraia Flight #1: an eyebolt failed at launch, the burn-circuit electrical
// connection twisted loose during ascent, and the release command at altitude did nothing.
// One parenthetical sentence in the report - "(The electrical setup of this system was
// modified for future flights.)" - closed all four boxes: root cause + design + test + doc.
//
// Usage:
//   node four-box-closer.js --anomaly "<short>" \\
//                           --root-cause "<text>" \\
//                           --design-change "<text>" \\
//                           --test "<text>" \\
//                           --doc "<text>"
//
//   node four-box-closer.js --from <file.yaml>     (reads same fields from YAML/JSON)

"use strict";

const fs = require("fs");

const HELP = `
four-box-closer.js - Verify an anomaly is closed in all four boxes.

THE FOUR BOXES (Maraia, NASA/AIAA ~2015)
  1. Root cause:    Named explicitly. Not "we fixed it." What physical/logical cause?
  2. Design change: An artifact updated. Code, diagram, hardware, config - pointable.
  3. Test:          A new check that catches this exact failure if it recurs.
  4. Doc:           The change is documented where the next person will look.

USAGE
  node four-box-closer.js --anomaly "<short title>" \\
                          --root-cause "<text>" \\
                          --design-change "<text>" \\
                          --test "<text>" \\
                          --doc "<text>"

  node four-box-closer.js --from anomaly.json
    (Reads { "anomaly": "...", "root_cause": "...", ... } )

OUTPUT
  Pass/fail per box, plus a quality score per box (length, specificity).

EXAMPLE
  node four-box-closer.js \\
    --anomaly "burn circuit lost power on Maraia Flight #1" \\
    --root-cause "ascent twist of the capsule pulled the electrical connection of the burn circuit loose from its power source" \\
    --design-change "redesigned harness anchor and routing to survive the same twisting environment" \\
    --test "post-mod harness shake/twist test added to flight readiness checks" \\
    --doc "updated flight ops procedure §X.Y; section in flight test report describes cause + fix"
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

function score(text) {
  if (!text) return { ok: false, score: 0, note: "MISSING" };
  const len = text.length;
  if (len < 20) return { ok: false, score: 1, note: "too short - likely hand-wave" };
  const hasArtifact = /\b(file|line|module|harness|diagram|code|test|spec|§|section|\.md|\.ts|\.py|\.yaml|\.json)\b/i.test(text);
  const hasMechanism = /\b(because|caused by|due to|when|under|while)\b/i.test(text);
  let s = 2;
  if (hasArtifact) s++;
  if (hasMechanism) s++;
  if (len > 80) s++;
  return { ok: true, score: s, note: hasArtifact ? "names an artifact" : "no artifact named" };
}

function loadFrom(path) {
  const raw = fs.readFileSync(path, "utf8");
  try {
    return JSON.parse(raw);
  } catch (_) {
    const out = {};
    raw.split(/\r?\n/).forEach((line) => {
      const m = line.match(/^([a-z_-]+)\s*:\s*(.*)$/i);
      if (m) out[m[1].replace(/-/g, "_")] = m[2].trim();
    });
    return out;
  }
}

function main() {
  const args = parseArgs(process.argv);
  if (args.help) {
    console.log(HELP);
    return;
  }
  let data = args;
  if (args.from) data = { ...args, ...loadFrom(args.from) };

  const fields = {
    "Root cause": data["root-cause"] || data.root_cause,
    "Design change": data["design-change"] || data.design_change,
    "Test": data.test,
    "Doc": data.doc,
  };
  const anomaly = data.anomaly || "(unnamed anomaly)";

  console.log("");
  console.log(`=== Four-Box Closure: ${anomaly} ===`);
  console.log("");

  let passed = 0;
  for (const [name, text] of Object.entries(fields)) {
    const r = score(text);
    const symbol = r.ok ? (r.score >= 4 ? "✓" : "△") : "✗";
    console.log(`  ${symbol}  ${name.padEnd(15)}  [${r.score}/5]  ${r.note}`);
    if (text && text.length > 0) {
      console.log(`      ${text.slice(0, 140)}${text.length > 140 ? "…" : ""}`);
    }
    console.log("");
    if (r.ok && r.score >= 3) passed++;
  }

  console.log("─".repeat(50));
  if (passed === 4) {
    console.log(`✓ Loop closed (4/4). Same failure cannot recur silently.`);
  } else {
    console.log(`✗ Loop NOT closed (${passed}/4). Same failure will appear again.`);
    console.log("");
    console.log("  Maraia closed the eyebolt anomaly with one parenthetical sentence:");
    console.log("  '(The electrical setup of this system was modified for future flights.)'");
    console.log("  Five words for the design-change box. Three other boxes equally explicit.");
  }
  console.log("");
  process.exit(passed === 4 ? 0 : 1);
}

main();

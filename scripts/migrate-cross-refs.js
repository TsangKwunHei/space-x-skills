#!/usr/bin/env node
// migrate-cross-refs.js - Rewrite cross-references after restructuring skills/
// from a flat 41-folder layout to a 3-category × 7-spine × subskills/ layout.
//
// Containment rules (per repo design):
//   - A SPINE may reference: (a) its own subskills/*.md, (b) other SPINE SKILL.md files
//     across categories. May NOT reference another spine's sub-skill directly.
//   - A SUB-SKILL may reference: (a) sister sub-skills in the same subskills/ folder,
//     (b) its own parent SKILL.md (../SKILL.md). May NOT reference content in other
//     spine folders directly. Cross-folder routing goes via the parent spine.
//
// Forbidden links are downgraded to plain text + a routing hint. The script is
// idempotent - running it twice has no effect.

"use strict";

const fs = require("fs");
const path = require("path");

const SKILLS_ROOT = "/Users/kwun/ppt/SpaceX skills/skills";

const SPINES = {
  "first-principles-thinking": "01-foundation",
  "system-engineering": "02-design",
  "architecture": "02-design",
  "feedback-loops": "02-design",
  "testing-sequencing": "03-execution",
  "iterate-fast": "03-execution",
  "infrastructure": "03-execution",
};

const SUBSKILLS = {
  "cost-floor-derivation": "first-principles-thinking",
  "assumption-audit": "first-principles-thinking",
  "analogy-detector": "first-principles-thinking",
  "capability-gate-decomposition": "first-principles-thinking",
  "re-derive-from-physics": "first-principles-thinking",
  "system-graph-mapping": "system-engineering",
  "blast-radius-analysis": "system-engineering",
  "cascade-tracing": "system-engineering",
  "apex-identification": "system-engineering",
  "interface-contract": "system-engineering",
  "failure-corpus-mapping": "architecture",
  "fault-tolerance-tiering": "architecture",
  "forbidden-list": "architecture",
  "three-axes-decomposition": "architecture",
  "loop-latency-measurement": "feedback-loops",
  "signal-determinism-check": "feedback-loops",
  "co-location-pattern": "feedback-loops",
  "pre-commitment-gate": "feedback-loops",
  "two-speed-reporting": "feedback-loops",
  "model-fudge-factor": "feedback-loops",
  "fidelity-ladder-design": "testing-sequencing",
  "ranked-objectives": "testing-sequencing",
  "numeric-retest-trigger": "testing-sequencing",
  "not-because-of-x-clauses": "testing-sequencing",
  "four-box-closure": "iterate-fast",
  "cheap-abort-design": "iterate-fast",
  "recovery-as-instrumentation": "iterate-fast",
  "fail-controlled": "iterate-fast",
  "subscale-flight": "iterate-fast",
  "signed-contracts": "infrastructure",
  "standard-menu": "infrastructure",
  "machine-consumable-artifacts": "infrastructure",
  "versioned-specs": "infrastructure",
  "lean-org-pattern": "infrastructure",
};

function classify(filePath) {
  // skills/01-foundation/first-principles-thinking/SKILL.md
  // skills/01-foundation/first-principles-thinking/subskills/cost-floor-derivation.md
  const rel = filePath.replace(SKILLS_ROOT + "/", "");
  const parts = rel.split("/");
  if (parts.length < 3) return null;
  const cat = parts[0];
  const spine = parts[1];
  const isSpine = parts[2] === "SKILL.md" && parts.length === 3;
  const isSubskill = parts[2] === "subskills" && parts.length === 4 && parts[3].endsWith(".md");
  return { cat, spine, isSpine, isSubskill };
}

function rewriteRefPath(targetName, source) {
  if (SPINES[targetName]) {
    const targetCat = SPINES[targetName];
    if (source.isSpine) {
      if (targetName === source.spine) return null; // self-ref, drop
      return { kind: "link", path: `../../${targetCat}/${targetName}/SKILL.md` };
    }
    // sub-skill referring to a spine
    if (targetName === source.spine) {
      return { kind: "link", path: `../SKILL.md` }; // own parent, allowed
    }
    return { kind: "forbidden", note: `route via the ${source.spine} spine, then to ${targetName}` };
  }
  if (SUBSKILLS[targetName]) {
    const targetParent = SUBSKILLS[targetName];
    const targetCat = SPINES[targetParent];
    if (source.isSpine) {
      if (targetParent === source.spine) {
        return { kind: "link", path: `subskills/${targetName}.md` };
      }
      return { kind: "forbidden", note: `route via the ${targetParent} spine` };
    }
    // sub-skill → sub-skill
    if (targetParent === source.spine) {
      return { kind: "link", path: `${targetName}.md` };
    }
    return { kind: "forbidden", note: `route via your parent spine to ${targetParent}` };
  }
  return null;
}

const REF_RE = /\[([^\]]+)\]\(\.\.\/([a-z0-9-]+)\/SKILL\.md\)/g;
const NEW_SUBSKILL_REF_RE = /\[([^\]]+)\]\(\.\.\/([a-z0-9-]+)\/SKILL\.md\)/g;

function processFile(filePath) {
  const source = classify(filePath);
  if (!source || (!source.isSpine && !source.isSubskill)) return { skipped: true };
  let content = fs.readFileSync(filePath, "utf8");
  let rewrites = 0;
  let dropped = 0;

  content = content.replace(REF_RE, (match, label, target) => {
    const r = rewriteRefPath(target, source);
    if (!r) return label; // unknown / self
    if (r.kind === "link") {
      rewrites++;
      return `[${label}](${r.path})`;
    }
    // forbidden - downgrade to plain text with a routing hint
    dropped++;
    return `${label} (${r.note})`;
  });

  fs.writeFileSync(filePath, content);
  return { rewrites, dropped };
}

function walk(dir) {
  const stats = { files: 0, rewrites: 0, dropped: 0, skipped: 0 };
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const child = walk(full);
      stats.files += child.files;
      stats.rewrites += child.rewrites;
      stats.dropped += child.dropped;
      stats.skipped += child.skipped;
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      const r = processFile(full);
      if (r.skipped) stats.skipped++;
      else {
        stats.files++;
        stats.rewrites += r.rewrites || 0;
        stats.dropped += r.dropped || 0;
      }
    }
  }
  return stats;
}

const stats = walk(SKILLS_ROOT);
console.log(JSON.stringify(stats, null, 2));

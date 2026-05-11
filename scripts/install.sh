#!/usr/bin/env bash
# install.sh - Install spacex-skills into the cross-agent .agents/skills/ path.
#
# Usage:
#   ./scripts/install.sh                      # installs to ./.agents/skills/
#   ./scripts/install.sh /path/to/project     # installs into another project's .agents/

set -eu

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TARGET_BASE="${1:-$PWD}"
TARGET_DIR="$TARGET_BASE/.agents/skills"

if [ ! -d "$REPO_ROOT/skills" ]; then
  echo "ERROR: source skills/ directory not found at $REPO_ROOT/skills"
  exit 1
fi

mkdir -p "$TARGET_DIR"
echo "Installing skills to: $TARGET_DIR"

count=0
for cat_dir in "$REPO_ROOT/skills"/*/; do
  [ -d "$cat_dir" ] || continue
  cat_name="$(basename "$cat_dir")"
  echo "$cat_name/.. ."
  for spine_dir in "$cat_dir"*/; do
    [ -d "$spine_dir" ] || continue
    spine_name="$(basename "$spine_dir")"
    cp -R "$spine_dir" "$TARGET_DIR/$spine_name"
    count=$((count + 1))
  done
done

echo "Installed $count spine skills (each carrying its own subskills/ and references/)."
echo "Done. Restart your agent to discover the new skills."

#!/usr/bin/env bash
# validate-skills.sh - Spec compliance + structural integrity checker.
#
# Layout (post v0.2):
#   skills/<NN-category>/<spine>/SKILL.md           ← spine
#   skills/<NN-category>/<spine>/subskills/*.md      ← sub-skills
#   skills/<NN-category>/<spine>/references/*.md     ← optional reference docs
#
# Verifies:
#   1. Each <spine>/SKILL.md exists with valid frontmatter
#   2. Frontmatter `name` matches spine directory name
#   3. `name` follows naming rules (lowercase a-z, 0-9, -; no leading/trailing -; no --)
#   4. `description` is 1-1024 chars
#   5. SKILL.md and every sub-skill .md is ≤ 500 lines
#   6. Sub-skill `name` field matches its filename (without .md)

set -u

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SKILLS_DIR="$REPO_ROOT/skills"
EXIT_CODE=0
SPINE_COUNT=0
SUBSKILL_COUNT=0
FAIL_COUNT=0

fail() {
  echo "  FAIL: $1"
  EXIT_CODE=1
  FAIL_COUNT=$((FAIL_COUNT + 1))
}

extract_frontmatter_field() {
  # $1 = file, $2 = field name
  local f="$1"
  local field="$2"
  awk -v field="$field" '
    /^---$/ { c++; if (c == 1) { in_fm = 1; next } else if (c == 2) { exit } }
    in_fm && $0 ~ "^"field":" {
      sub("^"field":[[:space:]]*", "")
      gsub(/^[|>][-+]?[[:space:]]*$/, "")
      val = $0
      active = 1
      next
    }
    in_fm && active && /^[a-zA-Z_][a-zA-Z0-9_-]*:/ { active = 0 }
    in_fm && active { val = val " " $0 }
    END { print val }
  ' "$f" | sed 's/^[[:space:]]*//;s/[[:space:]]*$//'
}

validate_skill_file() {
  # $1 = file path, $2 = expected name
  local skill_file="$1"
  local expected_name="$2"
  local context="${3:-$expected_name}"

  if [ ! -f "$skill_file" ]; then
    fail "$context: missing $skill_file"
    return
  fi

  local fm_name fm_desc desc_len line_count
  fm_name="$(extract_frontmatter_field "$skill_file" "name")"
  fm_desc="$(extract_frontmatter_field "$skill_file" "description")"

  if [ -z "$fm_name" ]; then
    fail "$context: frontmatter missing 'name' field"
  elif [ "$fm_name" != "$expected_name" ]; then
    fail "$context: name '$fm_name' does not match expected '$expected_name'"
  fi
  if ! echo "$fm_name" | grep -Eq '^[a-z0-9]+(-[a-z0-9]+)*$'; then
    fail "$context: name '$fm_name' violates naming rules"
  fi
  if [ -z "$fm_desc" ]; then
    fail "$context: frontmatter missing 'description' field"
  else
    desc_len=${#fm_desc}
    if [ "$desc_len" -lt 1 ] || [ "$desc_len" -gt 1024 ]; then
      fail "$context: description length $desc_len out of bounds (1-1024)"
    fi
  fi
  line_count=$(wc -l < "$skill_file" | tr -d ' ')
  if [ "$line_count" -gt 500 ]; then
    fail "$context: $skill_file is $line_count lines (max 500)"
  fi
}

if [ ! -d "$SKILLS_DIR" ]; then
  echo "ERROR: skills directory not found at $SKILLS_DIR"
  exit 1
fi

echo "Validating skills under $SKILLS_DIR..."
echo

for cat_dir in "$SKILLS_DIR"/*/; do
  [ -d "$cat_dir" ] || continue
  cat_name="$(basename "$cat_dir")"
  if ! echo "$cat_name" | grep -Eq '^[0-9]{2}-[a-z]+$'; then
    echo "Skipping non-category directory: $cat_name"
    continue
  fi
  echo "Category: $cat_name"

  for spine_dir in "$cat_dir"*/; do
    [ -d "$spine_dir" ] || continue
    spine_name="$(basename "$spine_dir")"
    SPINE_COUNT=$((SPINE_COUNT + 1))
    echo "  Spine: $spine_name"

    validate_skill_file "$spine_dir/SKILL.md" "$spine_name" "$cat_name/$spine_name"

    if [ -d "$spine_dir/subskills" ]; then
      for sub_file in "$spine_dir/subskills"/*.md; do
        [ -f "$sub_file" ] || continue
        sub_name="$(basename "$sub_file" .md)"
        SUBSKILL_COUNT=$((SUBSKILL_COUNT + 1))
        validate_skill_file "$sub_file" "$sub_name" "$cat_name/$spine_name/$sub_name"
      done
    fi
  done
done

echo
echo "----------------------------------------"
echo "Spines:    $SPINE_COUNT"
echo "Sub-skills: $SUBSKILL_COUNT"
echo "Failures:  $FAIL_COUNT"
if [ "$EXIT_CODE" -eq 0 ]; then
  echo "All skills pass spec."
else
  echo "Some skills failed validation. See above."
fi
exit $EXIT_CODE

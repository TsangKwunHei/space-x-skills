#!/usr/bin/env bash
# update-check.sh - Compare local VERSIONS.md against remote.
#
# Stub: when REMOTE_VERSIONS_URL is set, compares; otherwise reports local versions only.

set -eu

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
LOCAL_VERSIONS="$REPO_ROOT/VERSIONS.md"
REMOTE_URL="${REMOTE_VERSIONS_URL:-}"

if [ ! -f "$LOCAL_VERSIONS" ]; then
  echo "No VERSIONS.md found."
  exit 1
fi

if [ -z "$REMOTE_URL" ]; then
  echo "No REMOTE_VERSIONS_URL configured. Local versions:"
  grep -E '^\| [a-z]' "$LOCAL_VERSIONS" | head -20
  echo "..."
  echo "(Set REMOTE_VERSIONS_URL to enable update check.)"
  exit 0
fi

if ! command -v curl >/dev/null 2>&1; then
  echo "curl not available; cannot perform remote check."
  exit 0
fi

remote_tmp="$(mktemp)"
if curl -fsSL "$REMOTE_URL" -o "$remote_tmp" 2>/dev/null; then
  diff_count="$(diff "$LOCAL_VERSIONS" "$remote_tmp" | grep -c '^>' || true)"
  rm -f "$remote_tmp"
  if [ "$diff_count" -gt 0 ]; then
    echo "Updates available: $diff_count line(s) differ from remote."
    echo "Run 'git pull' in the spacex-skills repo to update."
  else
    echo "Up to date."
  fi
else
  echo "Remote check failed (cannot reach $REMOTE_URL)."
  rm -f "$remote_tmp"
fi

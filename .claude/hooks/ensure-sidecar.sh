#!/bin/sh
# Ensure an active chunk sidecar exists for this project.
# If none is active, create one from the snapshot pinned at
# validation.sidecarImage in .chunk/config.json, then sync.
# Always exits 0 so a sidecar problem never blocks the session.
cd "${CLAUDE_PROJECT_DIR:-.}" 2>/dev/null || exit 0

# Already active? nothing to do.
if chunk sidecar current 2>/dev/null | grep -qE '[0-9a-f]{8}-[0-9a-f]{4}-'; then
  exit 0
fi

img=$(python3 -c "import json;print(json.load(open('.chunk/config.json')).get('validation',{}).get('sidecarImage',''))" 2>/dev/null)
[ -n "$img" ] || exit 0

echo "chunk: no active sidecar, creating from snapshot $img" >&2
chunk sidecar create --image "$img" >/dev/null 2>&1 || exit 0
chunk sidecar sync >/dev/null 2>&1
exit 0

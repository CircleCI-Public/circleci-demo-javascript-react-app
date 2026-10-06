#!/usr/bin/env bash
# Runs on every container start: trust the mounted workspace so git operations work.
# Not in post-create.sh because the host's ~/.gitconfig can be copied in after that runs and
# drop the setting. Idempotent, and it only touches the container's Git config, not the host's.
set -euo pipefail

WORKSPACE="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
if ! git config --global --get-all safe.directory | grep -qxF "$WORKSPACE"; then
  git config --global --add safe.directory "$WORKSPACE"
fi

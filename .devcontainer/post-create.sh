#!/usr/bin/env bash
# Runs once when the dev container is created: app dependencies, then the tools for the chunk demo.
set -euo pipefail

# Same install step the chunk sidecar uses (see .chunk/config.json)
sudo corepack enable
pnpm install --frozen-lockfile

# Chunk CLI, from the release's .deb. Pinned so every demo machine gets the same build;
# `chunk factory` needs 0.7.200 or newer. (Not install.sh: its download filename no longer
# matches the release assets, so it 404s.)
CHUNK_VERSION="0.7.201"
ARCH="$(dpkg --print-architecture)"
DEB="$(mktemp --suffix=.deb)"
curl -fsSL -o "$DEB" \
  "https://github.com/CircleCI-Public/chunk-cli/releases/download/v${CHUNK_VERSION}/chunk_${CHUNK_VERSION}_linux_${ARCH}.deb"
sudo dpkg -i "$DEB"
rm -f "$DEB"

# Claude Code (native installer), linked into /usr/local/bin so it is on PATH in every shell
curl -fsSL https://claude.ai/install.sh | bash
sudo ln -sf "$HOME/.local/bin/claude" /usr/local/bin/claude

chunk --version
claude --version

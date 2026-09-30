# Software Factory + Chunk Sidecars Workshop

**SF Tech Week hands-on** for [Fine Tuning Your (Software) Factory Settings](https://partiful.com/e/p7wbsI2PqLVgqkW9Qxsw).

Goal: adopt **[Chunk sidecars](https://chunk.ai/)** so your agent gets CI-shaped feedback **before** you push, then let **CircleCI** own the outer-loop final exam.

This branch (`workshop/sf-tech-week`) turns the public React demo into a tiny **Software Factory** board (Accuracy · Efficiency · Risk) with one intentional failing test so you can practice the sidecar loop end-to-end.

---

## Super-easy path (about 10 minutes)

### 0) Prerequisites

- macOS or Linux with Git
- Node 20+ (matches CircleCI `cimg/node:20.20.2`)
- A [CircleCI](https://circleci.com/signup/) account (sidecars are free on every plan, including Free)
- Optional but recommended: [Claude Code](https://claude.ai/code), [Cursor](https://cursor.com/), or another agent that can run the `chunk-sidecar` skill

### 1) Clone this workshop branch

```bash
git clone -b workshop/sf-tech-week https://github.com/CircleCI-Public/circleci-demo-javascript-react-app.git
cd circleci-demo-javascript-react-app
```

Or fork on GitHub first, then clone **your** fork and check out `workshop/sf-tech-week`.

### 2) Install app dependencies

```bash
yarn install
```

### 3) Install Chunk and initialize

```bash
brew install CircleCI-Public/circleci/chunk
chunk init
chunk auth set circleci
# or: chunk auth login
```

`chunk init` writes `.chunk/config.json` (already committed here) and installs agent skills such as `/chunk-sidecar`.

### 4) See the planted failure

```bash
yarn test
```

You should see `mergeEfficiencyPercent` fail: `3/4` should be `75`, but the helper is wrong on purpose.

### 5) Fix it (agent or by hand)

**Copy/paste agent prompt:**

```
Fix the failing unit test for mergeEfficiencyPercent in src/factory/.
It should return Math.round((merged / attempted) * 100) with no off-by-ten.
Run `yarn test` to verify. Only edit files under src/factory/.
Then run Chunk sidecar validation before declaring done.
```

Manual fix: edit `src/factory/metrics.js` and remove the `+ 10` from the return line.

Confirm locally:

```bash
yarn test
```

### 6) Validate on a Chunk sidecar (inner loop)

First time in this repo, ask your agent to run the **`chunk-sidecar`** / **`chunk-sidecar-setup`** skill, or:

```bash
chunk sidecar setup --dir .
chunk sidecar sync
chunk validate --remote
```

You want **green** sidecar output for `yarn test` (and `yarn build`) before you push.

More detail: [chunk.ai](https://chunk.ai/) · [Introducing Chunk sidecars](https://circleci.com/blog/chunk-sidecars/)

### 7) Push and watch CircleCI (outer loop)

```bash
git checkout -b fix/factory-mer
git add src/factory
git commit -m "fix: correct mergeEfficiencyPercent for workshop"
git push -u origin HEAD
```

In CircleCI, follow the project (or your fork) and confirm the `build_and_test` workflow is green.

---

## What you just practiced

| Station        | In this workshop                                      |
| -------------- | ----------------------------------------------------- |
| **Accuracy**   | Sidecar + CircleCI both run the same kind of checks   |
| **Efficiency** | Fix while context is hot, with no wait-for-push tax   |
| **Risk**       | Cheap gates can auto; merge to main stays human       |

---

## Adopt Chunk

1. Install: `brew install CircleCI-Public/circleci/chunk && chunk init`
2. Site: [https://chunk.ai/](https://chunk.ai/)
3. Blog: [Introducing Chunk sidecars](https://circleci.com/blog/chunk-sidecars/)
4. Deeper walkthrough (optional): [Chunk sidecars demo on YouTube](https://youtu.be/edyVGWvDQos)
5. In your agent: run `/chunk-sidecar`

---

## If you get stuck

| Symptom                         | Try this                                                                 |
| ------------------------------- | ------------------------------------------------------------------------ |
| `chunk: command not found`      | `brew install CircleCI-Public/circleci/chunk`                            |
| Auth / org errors               | `chunk auth login` or `chunk auth set circleci` with a personal token    |
| `yarn: command not found`       | Install Yarn 1.x, or use `corepack enable` then retry                    |
| Sidecar create fails            | Confirm Free-plan CircleCI login; run `chunk auth status`                |
| Tests fail after you “fixed” it | Re-read `AGENTS.md`: only edit `src/factory/`; do not delete tests      |
| Build needs OpenSSL flag        | `yarn build` already sets `NODE_OPTIONS=--openssl-legacy-provider`       |

---

## Run the UI locally (optional)

```bash
yarn start
```

Open the Software Factory board: three cards for Accuracy, Efficiency, and Risk. The Efficiency card reads the same helper your tests cover.

---

## Appendix: CircleCI config (outer loop)

Workshop CI stays simple: **test + build**. Deploy stays commented out.

```yaml
version: 2.1
orbs:
  node: circleci/node@4.7.0
  heroku: circleci/heroku@1.2.6

jobs:
  build_and_test:
    docker:
      - image: cimg/node:20.20.2
    steps:
      - checkout
      - node/install-packages:
          pkg-manager: yarn
      - run:
          command: yarn test
          name: Run tests
      - run:
          command: yarn build
          name: Build app
```

Full file: [`.circleci/config.yml`](.circleci/config.yml)

---

## Project layout (workshop bits)

| Path                         | Why it matters                                      |
| ---------------------------- | --------------------------------------------------- |
| `src/factory/metrics.js`     | Seeded bug lives here                               |
| `src/factory/metrics.test.js`| The failing (then green) contract                   |
| `AGENTS.md`                  | Agent prompt + sidecar loop                         |
| `.chunk/config.json`         | Sidecar validate commands (`yarn test`, `yarn build`) |
| `.agents/skills/`            | `chunk-sidecar` skills for agents                   |

---

MIT · Maintained for CircleCI public demos · Workshop branch for SF Tech Week 2026

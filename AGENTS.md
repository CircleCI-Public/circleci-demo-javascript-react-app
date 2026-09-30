# AGENTS.md — Software Factory workshop

This repo is the SF Tech Week hands-on for [Chunk sidecars](https://chunk.ai/).

## Workshop task

Fix the failing unit test for `mergeEfficiencyPercent` in `src/factory/`.

- Expected: `mergeEfficiencyPercent(3, 4)` returns `75`
- The implementation under `src/factory/metrics.js` is intentionally wrong
- Only edit files under `src/factory/`
- Verify with `yarn test`
- Then validate on a Chunk sidecar before pushing

### Agent prompt (copy/paste)

```
Fix the failing unit test for mergeEfficiencyPercent in src/factory/.
It should return Math.round((merged / attempted) * 100) with no off-by-ten.
Run `yarn test` to verify. Only edit files under src/factory/.
Then run Chunk sidecar validation before declaring done.
```

### Sidecar loop

```bash
chunk sidecar sync
chunk validate --remote
# or: chunk validate --remote --cmd "yarn test"
```

In your agent, you can also run the `/chunk-sidecar` skill after `chunk init`.

## Factory lenses

| Station    | Meaning                                              |
| ---------- | ---------------------------------------------------- |
| Accuracy   | Did validation pass (sidecar + CircleCI)?            |
| Efficiency | Time / turns / cost to get a trustworthy signal      |
| Risk       | What stays human (merge) vs automated (lint + unit)  |

## Do not

- Do not remove or weaken the tests to make them pass
- Do not push until sidecar validation is green

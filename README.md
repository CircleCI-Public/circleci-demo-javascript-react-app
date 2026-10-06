# CircleCI Demo: React + TypeScript App

A small reference project showing how to build and test a React front end on CircleCI with version 2.1 configuration.

- [Project on GitHub](https://github.com/CircleCI-Public/circleci-demo-javascript-react-app)
- [Project building on CircleCI](https://app.circleci.com/pipelines/github/CircleCI-Public/circleci-demo-javascript-react-app)

The app, **Baby Hippo Gram**, is a gallery of baby hippo photos. It's built with React 19, TypeScript, Vite and Tailwind CSS, and tested with Vitest and React Testing Library. The photos are bundled with the app (see [`public/images/CREDITS.md`](public/images/CREDITS.md) for attribution), so it needs no network access or API keys to build, test or run.

## Run it locally

You need Node.js 22.12 or newer and [pnpm](https://pnpm.io/installation). The pnpm version is pinned in `package.json`'s `packageManager` field, and pnpm switches to it automatically.

```
pnpm install
pnpm start        # dev server at http://localhost:3000
```

Other scripts:

| Command          | What it does                                                                      |
| ---------------- | --------------------------------------------------------------------------------- |
| `pnpm test`      | Runs the tests once, with coverage and a JUnit report in `test-results/junit.xml` |
| `pnpm lint`      | Lints with oxlint; warnings fail the run                                          |
| `pnpm format`    | Formats files in place with oxfmt                                                 |
| `pnpm typecheck` | Type-checks the project with `tsc`                                                |
| `pnpm build`     | Type-checks, then builds the production bundle into `build/`                      |
| `pnpm preview`   | Serves the production build locally                                               |

## Run it in a dev container

If you'd rather not install Node and pnpm yourself, open the project in a [dev container](https://containers.dev) (VS Code with the Dev Containers extension, or GitHub Codespaces). The first start installs the dependencies, the [Chunk CLI](https://github.com/CircleCI-Public/chunk-cli) and Claude Code, and port 3000 is forwarded for `pnpm start`.

To use Chunk from inside the container, set `CIRCLE_TOKEN` (and `GITHUB_TOKEN` if you want `gh`) on your machine before opening it, or run `chunk auth login`. Claude Code asks you to sign in the first time you run `claude`.

## Build it on CircleCI yourself

1. Fork the project on GitHub to your own account.
2. In the CircleCI app, go to **Projects**, find your fork and click **Set Up Project**.
3. Make a change and push a commit. CircleCI runs the pipeline defined in `.circleci/config.yml`.

## Sample configuration

This is the `.circleci/config.yml` file in the project.

```yaml
version: 2.1
orbs:
  node: circleci/node@7.2.1

jobs:
  build_and_test:
    docker:
      - image: cimg/node:24.21.0
    steps:
      - checkout
      - node/install-pnpm:
          version: 12.9.1
      - node/install-packages:
          pkg-manager: pnpm
      - run:
          command: pnpm lint
          name: Lint
      - run:
          command: pnpm format:check
          name: Check formatting
      - run:
          command: pnpm test
          name: Run tests
      - store_test_results:
          path: test-results
      - run:
          command: pnpm build
          name: Build app
      - persist_to_workspace:
          root: ~/project
          paths:
            - build
  deploy: # this can be any name you choose
    docker:
      - image: cimg/node:24.21.0
    steps:
      - attach_workspace:
          at: ~/project
      - run:
          # Package the tested build in Vercel's Build Output API format so Vercel deploys it as-is
          # instead of rebuilding: https://vercel.com/docs/build-output-api
          name: Prepare Vercel output
          command: |
            mkdir -p .vercel/output
            cp -r build .vercel/output/static
            echo '{"version": 3}' > .vercel/output/config.json
      - run:
          # Requires VERCEL_TOKEN, VERCEL_ORG_ID and VERCEL_PROJECT_ID environment variables
          name: Deploy to Vercel
          command: npx --yes vercel@62.2.0 deploy --prebuilt --prod --token "$VERCEL_TOKEN"

workflows:
  on_commit:
    jobs:
      - build_and_test
      # To deploy to Vercel, create a Vercel token and project, then set VERCEL_TOKEN, VERCEL_ORG_ID
      # and VERCEL_PROJECT_ID as environment variables and uncomment the job below.
      # Read more: https://circleci.com/docs/guides/security/env-vars/
      # - deploy:
      #     requires:
      #       - build_and_test # only deploy if the build_and_test job has completed
      #     filters:
      #       branches:
      #         only: main # only deploy when on main
  nightly:
    triggers:
      - schedule:
          cron: '0 0 * * *'
          filters:
            branches:
              only:
                - main
    jobs:
      - build_and_test
```

## Config walkthrough

- **Orbs.** The [Node orb](https://circleci.com/developer/orbs/orb/circleci/node) installs dependencies with `node/install-packages`, caching them between runs based on `pnpm-lock.yaml`. Because the CircleCI images don't include pnpm, `node/install-pnpm` installs the pinned version first.
- **Executor.** Jobs run in `cimg/node`, a CircleCI convenience image. Any tag from [Docker Hub](https://hub.docker.com/r/cimg/node/tags) can be used to pick a Node version.
- **`build_and_test` job.** Installs dependencies, lints with [oxlint](https://oxc.rs/docs/guide/usage/linter), checks formatting with [oxfmt](https://oxc.rs/docs/guide/usage/formatter), runs the tests, uploads the JUnit results with `store_test_results` so they show up in the CircleCI test view, then type-checks and builds the app. The `build/` folder is saved to the workspace so the `deploy` job can ship exactly what was tested.
- **`deploy` job.** Packages `build/` in Vercel's [Build Output API](https://vercel.com/docs/build-output-api) format and deploys it with [`vercel deploy --prebuilt --prod`](https://vercel.com/docs/cli/deploy), so Vercel serves the tested files rather than rebuilding them.
- **Workflows.** `on_commit` runs on every push. `nightly` runs `build_and_test` every day at midnight UTC on `main`. The `deploy` step in `on_commit` is commented out. To turn it on, create a Vercel project and a [Vercel access token](https://vercel.com/kb/guide/how-do-i-use-a-vercel-api-access-token), then set `VERCEL_TOKEN`, `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID` as [environment variables](https://circleci.com/docs/guides/security/env-vars/). The org and project IDs are in `.vercel/project.json` after you run `vercel link` locally.

# Quickstart: Demo JavaScript Node.js Reference Project
We maintain a reference JavaScript Node.js project to show how to build an Express.js app on CircleCI with version: 2.1 configuration:
[Demo JavaScript Node Project on GitHub](https://github.com/CircleCI-Public/circleci-demo-javascript-react-app)
[Demo JavaScript Node Project building on CircleCI](https://app.circleci.com/pipelines/github/CircleCI-Public/circleci-demo-javascript-react-app)

In the project you will find a CircleCI configuration file .circleci/config.yml. This file shows best practice for using version 2.1 config with Node projects.
Build the Demo JavaScript Node Project Yourself
A good way to start using CircleCI is to build a project yourself. Here’s how to build the demo project with your own account:
Fork the project on GitHub to your own account.
Go to the Add Projects page in the CircleCI application and click the Set Up Project button next to the project you just forked.
To make changes you can edit the .circleci/config.yml file and make a commit. When you push a commit to GitHub, CircleCI will build and test the project.

# Sample Configuration
Below is the .circleci/config.yml file in the demo project.

```
version: 2.1
orbs:
  node: circleci/node@4.7.0
  heroku: circleci/heroku@1.2.6

jobs:
  build_and_test:
    docker:
      - image: cimg/node:17.2.0
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
      - persist_to_workspace:
          root: ~/project
          paths:
            - .
  deploy: # this can be any name you choose
    docker:
      - image: cimg/node:17.2.0
    steps:
      - attach_workspace:
          at: ~/project
      - heroku/deploy-via-git:
          force: true # force push when pushing to the heroku remote, see: https://devcenter.heroku.com/articles/git

workflows:
  on_commit:
    jobs:
      - build_and_test
      - deploy:
          requires:
            - build_and_test # only deploy if the build_and_test job has completed
          filters:
            branches:
              only: master # only deploy when on main/master
  nightly:
    triggers:
      - schedule:
          cron: "0 0 * * *"       
          filters:
            branches:
              only:
                - master
                - docs-node-js-language-guide
    jobs:
      - build_and_test
      - deploy:
          requires:
            - build_and_test # only deploy if the build_and_test job has completed
          filters:
            branches:
              only: master # only deploy when on main/master
```

# Config Walkthrough
By using the  [Node orb](https://circleci.com/orbs/registry/orb/circleci/node#jobs-test), it sets an executor from CircleCI's highly cached convenience images built for CI and allows you to set the version of NodeJS to use. Any available tag from this list can be used: https://hub.docker.com/r/cimg/node/tags.
 
The Node Orb test command will test your code with a one-line command, with optional parameters.

Matrix jobs are a simple way to test your Node app on various node environments. For a more in depth example of how the Node orb utilizes matrix jobs, see our blog on [matrix jobs](https://circleci.com/blog/circleci-matrix-jobs/). See [documentation on pipeline parameters](https://circleci.com/docs/2.0/pipeline-variables/#pipeline-parameters-in-configuration) to learn how to set a node version via Pipeline parameters.

Success! You just set up a Node.js app to build on CircleCI with version: 2.1 configuration. Check out our project’s Job page to see how this looks when building on CircleCI.



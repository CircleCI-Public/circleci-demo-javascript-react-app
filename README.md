
https://circleci.com/docs/2.0/language-javascript/
Notes
https://github.com/CircleCI-Public/node-orb/pull/24
 

# Node.js - JavaScript Tutorial
This document provides a walkthrough of the .circleci/config.yml file for a Node.js sample application.

This is the CircleCI reference JavaScript Node.js project to show how to build an Node app on CircleCI with version: 2.1 configuration:

* [Demo JavaScript Node Project on GitHub](https://github.com/CircleCI-Public/circleci-demo-javascript-react-app/tree/2.1-orb-example)

* [Demo JavaScript Node Project building on CircleCI](https://circleci.com/gh/CircleCI-Public/circleci-demo-javascript-react-app)

In the project you will find a CircleCI configuration file .circleci/config.yml. This file shows best practice for using version 2.1 config with Node projects.

Pre-Built CircleCI Docker Images

We recommend using a CircleCI pre-built image that comes pre-installed with tools that are useful in a CI environment. You can select the Node version you need from Docker Hub: https://hub.docker.com/r/circleci/node/. The demo project uses an official CircleCI image.

Database images for use as a secondary ‘service’ container are also available.

## Build the Demo JavaScript Node Project Yourself
A good way to start using CircleCI is to build a project yourself. Here’s how to build the demo project with your own account:

Fork the project on GitHub to your own account.
Go to the Add Projects page in the CircleCI application and click the Set Up Project button next to the project you just forked.

To make changes you can edit the .circleci/config.yml file and make a commit. When you push a commit to GitHub, CircleCI will build and test the project.

### Sample Configuration
Below is the .circleci/config.yml file in the demo project.

```
jobs:
  install-node-example:
    docker:
      - image: 'cimg/base:stable'
    steps:
      - checkout
      - node/install:
          install-yarn: true
          node-version: latest
      - run: node --version
orbs:
  node: circleci/node@13.7.0
version: 2.1
workflows:
  test_my_app:
    jobs:
      - install-node-example
```
 

## Config Walkthrough

By using the  2.1 Node orb, you’re able to pull in the docker image that you’d like, checkout your  code,  install node,  and then  run  any other  testing  steps that you’re looking for. 
 
Success! You just set up a Node.js app to build on CircleCI with version: 2.1 configuration. Check out our project’s Job page to see how this looks when building on CircleCI.


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
orbs:
  node: circleci/node4.0.0

version: 2.1

workflows:
  app-tests:
    jobs:
      - node/test
```

# Config Walkthrough
By using the  [Node orb](https://circleci.com/orbs/registry/orb/circleci/node#jobs-test), it sets an executor from CircleCI's highly cached convenience images built for CI and allows you to set the version of NodeJS to use. Any available tag from this list can be used: https://hub.docker.com/r/cimg/node/tags.
 
The Node Orb test command will test your code with a one-line command, with optional parameters.

Matrix jobs are a simple way to test your Node app on various node environments. For a more in depth example of how the Node orb utilizes matrix jobs, see our blog on [matrix jobs](https://circleci.com/blog/circleci-matrix-jobs/). See [documentation on pipeline parameters](https://circleci.com/docs/2.0/pipeline-variables/#pipeline-parameters-in-configuration) to learn how to set a node version via Pipeline parameters.

Success! You just set up a Node.js app to build on CircleCI with version: 2.1 configuration. Check out our project’s Job page to see how this looks when building on CircleCI.




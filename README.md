# Docly chat app

This is a simple chat app that we use as a template for running interview tests. The app is built using NextJS and Typescript. It also uses Yarn workspaces.

# Before you get going

This is meant to be a asynchronous, close to real-life test of your skills. Both hard (technical) and soft (communication, empathy etc). The main channel for communication will be through this repo. You should also have received an invite for a Slack channel we will be available in more real-time.

We expect that you will need to work around 4 hours on the different parts of this test. The time will be spread out across about a week.

Your first assignment is to:

1. Fork the repo. Your pick if you want to keep it public or make it private. Remember that anyone can see your activity in public repos. If you make it private, invite @hmps to the repo. 
1. Get the project up and running on your local machine. 
1. Add yourself to the list of contributors in package.json. Do this on your fork, and create a PR and assign @hmps to review it.

Good luck! 🎉

# Prerequisites

- NodeJS > (version 12 or later)
- Yarn

# Getting started

1. Clone the repo 
2. Run `yarn` from the root to install all dependencies.

# Development

We use Typescript and ESLint in this project. Whatever editor your using, make sure that you have plugins for both installed. You should also make sure that ESLint runs on save. That way you won't end upp committing code that doesn't follow the formatting guidelines.

## Developing the server

1. Run `yarn dev:server` from the repo root. This will start the server on `http://localhost:4000`.
1. Open `packages/server` in your favorite editor.

You can use any tool you prefer to connect and make reqeusts to the server.

## Developing the client

1. Run `yarn dev:server` from the repo root. That will start the server in development mode.
1. Open a new shell and run `yarn dev:client` from the repo root. That will start a hot-reloaded dev server on `http://localhost:3000`.
1. Open `packages/client` in your favorite editor

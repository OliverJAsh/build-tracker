---
id: contributing
title: Contributing to Build Tracker
sidebar_label: Contributing
---

> Thank you for your interest in helping out with Build Tracker! This is a project done with joy and care, out of our free time. Before getting started, please familiarize yourself with the [Contributor Covenant Code of Conduct](https://github.com/paularmstrong/build-tracker/blob/next/CODE_OF_CONDUCT.md).

---

## Getting started

Fork and pull the repository from Github. If you're unsure how to fork a repository, read the [getting started docs here](https://help.github.com/en/articles/fork-a-repo).

```sh
git clone git@github.com:<myuser>/build-tracker.git
```

Once you've pulled the repository, you'll be working on the _next_ branch. This may be slightly different from what you're used to, so make sure to pay attention to always keep the _next_ branch up to date, and don't worry about _master_.

### Install dependencies

Build Tracker is a monorepo managed by [Yarn](https://yarnpkg.com). Start by installing dependencies for all packages:

```sh
cd build-tracker
yarn
```

### Make your changes

Always work on features in a separate branch from the main _next_ or _master_ branch.

```sh
git checkout -b my-feature
```

Now that you're on a branch, make changes directly to the code related to your feature or bug fix.

Ensure to always add tests, preferrably before you start making changes. This helps both you and any future reviewer verify that the code's intentions work correctly.

Run tests using the main script from the root of the repository:

```sh
yarn test
```

Once you've completed your changes and all of your tests pass, commit and push your branch to your fork:

```sh
git commit -am "[bugfix] a short description of what I did"
git push
```

### Open a pull request

Finally, open a pull request on the main [Build Tracker repository](https://github.com/paularmstrong/build-tracker).

## Monorepo

The Build Tracker git repository is a monorepo that is composed of many publishable packages. This has been done so that it's easier to iterate on cross-functional dependencies without requiring premature publishing steps.

The tool for managing these packages is [Lerna](https://github.com/lerna/lerna) with [Yarn workspaces](https://yarnpkg.com/en/docs/workspaces).

### Package workspace structure

```plaintext
├── docs
│   └── website
├── plugins
│   ├── with-mariadb
│   └── with-postgres
└── src
    ├── api-errors
    ├── app
    ├── build
    ├── cli
    ├── comparator
    ├── fixtures
    ├── formatting
    ├── server
    └── types
```

#### Source `./src`

All core Build Tracker packages reside here.

All folder names should be mapped as the publishable name without the `@build-tracker` scope. For example: `@build-tracker/app` is in the path `src/app`, while `@build-tracker/server` is at `src/server`.

#### Plugins `./plugins`

All implementation-specific code for various integrations should be kept here, instead of in the `src` directory.

All folder names should be mapped as the publishable name without the `@build-tracker/plugin-` scope. For example: `@build-tracker/plugin-with-mariadb` is in the path `plugins/with-mariadb`.

Some local configs are available for development purposes. To use them, it's recommended to use a Docker container, since it's easy to seed and throw away:

##### MariaDB

```shell
docker run -p 3307:3306 --name bt-mariadb -e MYSQL_ROOT_PASSWORD=tacos -e MYSQL_ROOT_HOST=% -e MYSQL_DATABASE=buildtracker -d mariadb --default-authentication-plugin=mysql_native_password
yarn ts-node src/server/src/index.ts setup -c ./config/mariadb.js
yarn ts-node src/server/src/index.ts seed -c ./config/mariadb.js
yarn dev:mariadb
```

##### MySQL

```shell
docker run -p 3306:3306 --name bt-mysql -e MYSQL_ROOT_PASSWORD=tacos -e MYSQL_ROOT_HOST=% -e MYSQL_DATABASE=buildtracker -d mysql --default-authentication-plugin=mysql_native_password
yarn ts-node src/server/src/index.ts setup -c ./config/mysql.js
yarn ts-node src/server/src/index.ts seed -c ./config/mysql.js
yarn dev:mysql
```

##### Postgres

```shell
docker run --name pg -e POSTGRES_PASSWORD=mysecretpassword -e POSTGRES_DB=buildtracker -p 54320:5432 -d postgres
yarn ts-node src/server/src/index.ts setup -c ./config/postgres.js
yarn ts-node src/server/src/index.ts seed -c ./config/postgres.js
yarn dev:postgres
```

#### Docs `./docs`

This directory holds packages related to the documentation website

## Development

Here are some things to keep in mind while working in a monorepo:

### Adding a dependency to a package

To add a third-party dependency to a sub-package in the Build Tracker repository, ensure that it's done from the specific sub-package using the `yarn workspace` command:

```sh
# To add to the @build-tracker/app package
$ yarn workspace @build-tracker/app add <some-third-party-module>
```

### Don't abstract too early

Repeating code is not inherently bad. If some logic clearly fits in one of the already published packages, that's probably the right place for it. If there isn't a package available for something that is reusable, use your best judgement about complexity and scope of functions to determine if a new package is warranted.

## Typescript

Build Tracker is written in Typescript throughout all workspaces. Please do not add code that is not written in Typescript or change to another language.

## Dev environment

To run the development environment, some shortcuts are provided in the `package.json` scripts:

- `yarn dev` Run the server and application in a hot-reloadable environment using pre-seeded builds on the filesystem
- `yarn dev:maria` (coming soon) Run the server using a local MariaDB instance
- `yarn dev:postgres` (coming soon) Run the server using a local Postgres instance

## Code integrity

The following conformance checks can be run manually and will be automatically run on `pre-commit` as well as during the pull-request verification flow via Github Actions.

- `yarn lint` Lint and auto-format code
- `yarn test` Jest tests
- `yarn tsc` Typescript type check

## Documentation

Documentation is a great place to get started contributing to the Build Tracker project because writing good docs is difficult. For that reason, your help is _always_ appreciated.

### Running the docs locally

To run the documentation with hot reloading from your local machine, simple run:

```sh
$ yarn docs
LiveReload server started on port 35729
Docusaurus server started on port 3000
```

Your browser should automatically be opened to the documentation site running locally. If it is not, you can visit `http://localhost:3000` (or swap the port `3000` with whatever is on the last line of the output above)

### Updating documentation

To update any documentation pages, first update the files from the repository root at `docs/docs`. If your changes are also relevant to the 1.x.x version, you will also need to update `website/versioned_docs/1.0.0` files.

### Updating other pages

All pages and templates are written with React.js and can be found in `website/core` and `website/pages`.

### Submitting your PR

After your changes look the way you want on your local documentation server. You can close the server down (`CTRL+C`). Simply commit your changes and open a PR on the [Build Tracker repository](https://github.com/paularmstrong/build-tracker).

### Other help

Build Tracker uses [Docusaurus](https://docusaurus.io) for generating it's docs. If you're unfamiliar with any of the internals of how the docs are built, structured, or how to add a feature to them, the [official docs](https://docusaurus.io) are the best place to start.

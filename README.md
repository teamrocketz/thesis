# Project Name

The project description

## Team

- Tony Cassara
- James Hogan
- John Iaconis
- Jon Stewart

## Roadmap

View the project roadmap [here](LINK_TO_DOC)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

# Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)

## Usage

> Some usage instructions

## Requirements

- Node 6.9.x
- Redis 3.2.x
- Postgresql 9.6.x
- etc

## Development

### Installing System Dependencies

```
brew install yarn
brew install redis
brew install postgresql
```

Yarn is a replacement for npm. It's faster and *guarantees* consistency -- as you deploy your code in various environments, you won't run the risk of slight variations in what gets installed.

### Install Project Dependencies

```
yarn global add grunt-cli knex eslint
```

### Create local configuration file

Copy `config/development.example.json` to `config/development.json` and fill in any necessary fields for components you plan to use.

## Database Initialization

IMPORTANT: ensure `postgres` is running before performing these steps:

```
brew services start postgresql
```

### Database Creation:

Use grunt to create a new database for your development and test environments:

Development envronment: `grunt dbReset`

For other environments, make sure DATABASE_URL is set, or NODE_ENV is set and all needed values are in relevant `config` files.

### Run Migrations & Data Seeds

In terminal, from the root directory:

`knex migrate:latest`

`knex seed:run`

For other environments, make sure DATABASE_URL is set, or NODE_ENV is set and all needed values are in relevant `config` files.

## Running the App

To run webpack build: `yarn run build`

To run server: `yarn run start`

To run tests: `yarn run test`

To run your redis server for the session store `redis-server`



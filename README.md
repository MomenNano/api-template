# api-template
Fastify API Template. Written with TypeScript.

This project use Node.js and [Fastify](https://www.fastify.io/docs/latest/) as a web framework.

You have two options if you want to run the API and database locally: run everything inside Docker or run just the database inside Docker. It's up to you whether you like doing it one way or the other. If the API doesn't appear to be starting correctly outside of a Docker then try running everything inside Docker - the issue might just be a local environment thing.

# Usage

## Requirements

Node.js v16.*

Docker and Docker Compose

### Database:

PostgreSQL v14.*

Redis v7.*

## **Development**

Clone this repository.

Install npm dependencies:
```bash
npm install
# install dependencies

npm run create:env
# only needed if there is no .env file 
```

**Important Note:**

Make sure that you've set all the environment variables in .env file.

## Running API Outside Docker

You can run the API outside of Docker but the database still requires Docker.

First we'll start and setup the database.

```bash
$ npm run db:up
# Postgres database is started
$ npm run redis:up
# Redis is started
```

Next, we'll want to start the API service itself

```bash
$ npm start
# build the project and run it
```

At this point the API service is up and listening on port `8080`.

You need to restart and build the project everytime there's a change by terminating the current running process `Ctrl + C` and then redo:

```bash
$ npm start
# build the project and run it
```

**NOTE:** *Sometimes you will have to execute `npx prisma db push` to reflect the new changes in schema.prisma to the database*

## **Production**

It's **HIGHLY** recommended to run the system as a Docker Compose.

First you need to pull the changes into server.

```bash
$ git pull
```

And then you can start everything with one single command.
```bash
$ npm run system:up
```


## Backend API Development
​
There are a number of handy commands you can run to help with development.
​
|Command | Action |
|---|---|
|`npm run create:env`| Create a new .env file |
|`npm run lint`| run lintter |
|`npm run lint:fix`| fix linter and style mistaks |
|`npm run test:unit`| run unit tests using jest |
|`npm run build`| compile Typescript project |
|`npm run build:production`| compile the project and exclude tests file in final dist |
|`npm start` | Run the server (before that it deletes old dist directory and recompile the project into javascript and then execute it) |
|`npm run clean`| delete dist folder |
|`npm run build`| compile typescript with options specified in tsconfig.json|
|`npm run db:up`| Run the database server |
|`npm run db:down`| Shutdown the database server |
|`npm run db:delete`| Delete the database server. You will need to run `db:up` again. |
|`npm run db:seed`| Seed the database with data located in database/seed.ts. |
|`npm run redis:up`| Run Redis |
|`npm run redis:down`| Shutdown Redis server |
|`npm run redis:delete`| Delete Redis server. You will need to run `redis:up` again. |
|`npm run lint`| Run eslint |
|`npm run lint:fix`| Run eslint in fix mode |
|`system:up`| Start everything using docker-compose |
|`system:down`| Stop everything using docker-compose |
|`system:nuke`| Stop and delete everything using docker-compose |

## Environment

See [.env](./.env.sample)

## Database Schema

This project is using [Prisma](https://www.prisma.io/) as an ORM to connect and query from PostgreSQL database.

Database schema: [schema.prisma](./database/schema.prisma)

Seeder: [seed.ts](./database/seed)

## Docker

API Docker file: [dockerfile](./Dockerfile)

Docker Compose file: [docker-compose.yml](./docker-compose.yml)

## Project Structure

```
.
├── .github # contains github actions workflows
├── logs # contains application logs
├── database # contains the main files for the backend
│   ├── schema.prisma # Prisma models
│   ├── seed # prisma logic for seeding db
│   │   ├── data # contains seed data
│   │   └── index.ts
├── src # contains the main files for the backend
│   ├── config # stores configurations (server, logger, env vars... etc.)
│   ├── plugins # Custom plugins (auth, security, roles, db... etc.)
│   ├── routes # contains routes and structured as a directories.
│   │   ├── users # exports subroutes under '/users/'
│   │   │   ├── login # example route, mapped to '/users/login'
│   │   │   │   ├── index.js # exports login route 
│   │   │   │   ├── schema.js # JSON schema spec of the login route
│   │   │   └── # rest of routes
│   │   └── # exports accounts routes (and others)
│   └── app.ts # register necessary plugins for the system
└── dist # contains compiled typescript code.
```
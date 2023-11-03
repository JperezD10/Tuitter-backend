<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Description

This repository contains the backend used for my Twitter's (X) clon.

## Technologies
* [NestJS](https://github.com/nestjs/nest)
* [Typescript](https://www.typescriptlang.org/)
* API REST
* [Json Web Tokens](https://jwt.io/)
* [Docker](https://www.docker.com/)
* [PostgresSQL](https://www.postgresql.org/)

## Installation

```bash
$ npm install
```

## Environtment
Clone the `.env.template` and rename to `.env` with your configuration

## Run Docker
```
docker-compose up -d
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run Tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


## License

Nest is [MIT licensed](LICENSE).

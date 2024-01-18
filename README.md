# Api-Nestjs

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>

## Description

Final project of "Javascript in the Backend" of Bootcamp Codigofacilito.

## Requirements

Node.js and npm are required to use the API.

## Installation

1. Clone the repository with a terminal.

```bash
$ git clone https://github.com/nicoramo2s/api-nestjs.git
```

2. Navigate to the project directory.

```bash
$ cd api-nestjs
```

3. Install dependencies.

```bash
$ npm install
```

## Configuration

Inicia creando un archivo .env con este formato:

DATABASES_URL='url the database MongoDB'
PORT=3000
JWT_SECRET_KEY='secret key jwt'

## Running the app

Start the application with:

```bash
$ npm run start
```

Access the url http://localhost:3000 locally.
See the API documentation for detailed endpoints and operations.
Go to http://localhost:3000/api/docs#/ to see the documentation via Swagger.
Remember that all routes are protected. If you want to access them, you will need an administrator account. Don't worry, I will provide you with a test: email: "admin@admin.com" and password: "admin".

If you want more information check the documentation!!
https://hallowed-cemetery-27f.notion.site/Api-Nestjs-c02a9a46016e4c1e9357f87c302439aa?pvs=4

## Test

1. Unit tests

```bash
$ npm run test
```
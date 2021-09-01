# Server

[![Format](https://github.com/ContechOS/Server/actions/workflows/format.yml/badge.svg)](https://github.com/ContechOS/Server/actions/workflows/format.yml)
[![Lint](https://github.com/ContechOS/Server/actions/workflows/lint.yml/badge.svg)](https://github.com/ContechOS/Server/actions/workflows/lint.yml)

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

## Get started

### Set environment variables

```
JWT_SECRET=

NEO4J_SCHEME=
NEO4J_HOST=
NEO4J_PORT=
NEO4J_USERNAME=
NEO4J_PASSWORD=
NEO4J_DATABASE=
```

### Serve

Run

```
npm run start:dev
```

This will start a local server on `http://localhost:3000`.

#### GraphQL Playground

Once the server has been started a GraphQL Playground will be available at `http://localhost:3000/graphql`.

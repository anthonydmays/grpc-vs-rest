# gRPC Rest App

## Description

A basic address book app built using a gRPC API exposed via a REST-like endpoint using Envoy.

## Prerequisites

- Node v18 or above

## Running the demo

1. Install dependencies and build the apiTypes project.

```console
npm install
npm run build:apiTypes
```

2. In a new window, run the API server.

```console
npm run dev:api
```

3. In a new window, run the client web server.

```console
npm run dev:client
```

4. You can test that the API is running properly browing to the following link:

```url
http://localhost:9090/v1/contacts
```

5. Visit the address book front end app

```url
http://localhost:5173

```

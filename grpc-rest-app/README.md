# gRPC REST-like App

## Description

A basic address book app built using a gRPC API exposed via a REST-like endpoint using Envoy.

## Prerequisites

- Node v18 or above
- Docker (if you have trouble running the envoy Docker image, you can [install Envoy](https://www.envoyproxy.io/docs/envoy/latest/start/install) directly)

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

4. In a new window, run the proxy server on Docker.

```console
docker compose -f packages/proxy/docker-compose.yaml up
```

> :warning: If you get 500 errors when testing the client or API, you can [install Envoy](https://www.envoyproxy.io/docs/envoy/latest/start/install) directly and run the configuration by executing `envoy -c envoy.yaml`.

5. You can test that the API is running properly by browsing to the following link:

```url
http://localhost:8080/v1/contacts
```

6. Visit the address book front end app.

```url
http://localhost:5173
```

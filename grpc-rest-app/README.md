# gRPC REST-like App

## Description

A basic address book app built using a gRPC API exposed via a REST-like endpoint using Envoy.

## Prerequisites

- Node v18 or above
- Docker (if you have trouble running the envoy Docker image, you can install Envoy directly)

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
cd packages/proxy
docker compose up
```

> :warning: If you get 500 errors when testing the client or API, it may be that you're running Docker on Mac/Windows which will require configuration changes. See below for instructions, or install Envoy directly and run the configuration by executing `envoy -c envoy.yaml`.

5. You can test that the API is running properly browing to the following link:

```url
http://localhost:8080/v1/contacts
```

6. Visit the address book front end app

```url
http://localhost:5173

```

## Troubleshooting Docker on Mac/Windows

If you receive 500 errors when running the client or accessing the API, it's because the Docker container is configured to use `network_mode: HOST` which [doesn't work as expected on Mac/Windows native](https://github.com/docker/roadmap/issues/238). Fortunately, you can update the configuration files for the proxy server to get everything working.

Note that if you're using Windows, you can use the [Windows Subsystem for Linux](https://learn.microsoft.com/en-us/windows/wsl/install) which supports the Docker configuration by default.

1. In [packages/proxy/docker-compose.yaml](packages/proxy/docker-compose.yaml), change the `network_mode` setting to `BRIDGE`.
2. In [packages/proxy/envoy.yaml](packages/proxy/envoy.yaml), change the address value at the bottom of the file for the `contacts_service` config from `address: 0.0.0.0` to `address: host.docker.internal`.

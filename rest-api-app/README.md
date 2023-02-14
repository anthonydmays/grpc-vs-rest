# REST API App

## Description

A basic address book app built using a REST API on Express and a Svelte frontend.

## Prerequisites

- Node >=16

## Running the demo

1. Run and build the project.

```console
npm install
npm run build:apiTypes
```

2. Build the apiTypes dependency.

```console
npm run build:apiTypes
```

3. In a new window, run the API server.

```console
npm run dev:api
```

4. In a new window, run the client web server.

```console
npm run dev:client
```

5. You can test that the API is running properly by executing the following:

```console
curl http://localhost:9090/contacts
```

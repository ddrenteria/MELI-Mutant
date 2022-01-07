## Requisites
npm
docker
docker-compose

## Installation

```bash
$ npm install
$ cp .env.sample .env
```

## Running the app

```bash
$ cd docker
$ chmod +x start.bash
$ ./start.bash --build
```
## Running migrations

```bash
$ docker exec -ti meli-poc-api sh
$ npm run migration:run
```
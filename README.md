# countive

A simple web application to manage personal budget

## Run dev build

```bash
git clone https://github.com/pmasior/countive.git
cd countive/dev
nano .env
docker compose build
docker compose --profile migrate run migrate
docker compose --profile seed run seed
docker compose down
docker compose up
```

## Run prod build

```bash
git clone https://github.com/pmasior/countive.git
cd countive/prod
nano .env
docker compose build
docker compose --profile migrate run migrate
docker compose --profile seed run seed
docker compose down
docker compose up
```

## Update dependencies

```bash
git clone https://github.com/pmasior/countive.git
cd countive/application
docker run \
  -it --rm \
  -v ./package.json:/app/package.json \
  -v ./package-lock.json:/app/package-lock.json \
  --workdir /app \
  node:18 npm update
```

## Run command in running container

```bash
docker exec -it countive-docker-application bash
ls
```

## Create new next.js project

```bash
mkdir tempprojectname
cd tempprojectname
docker run \
  -it --name tempprojectname \
  -v ./:/app \
  -v tempprojectname_next_distribution:/app/.next \
  -v tempprojectname_node_modules:/app/node_modules \
  --workdir /app \
  node:18 bash
npx create-next-app@latest .
npm init jest@latest
```

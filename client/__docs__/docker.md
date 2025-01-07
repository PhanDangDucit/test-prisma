
```bash
$ docker build -t frontend:0.1.0 .

# https://docs.docker.com/build/building/variables/
$ docker build --build-arg NODE_VERSION=current .

# https://pimylifeup.com/ubuntu-folder-size/
$  docker build --build-arg NODE_ENV=development .

$ docker run --name postgres-test -e POSTGRES_PASSWORD=secret -dp 5432:5432 postgres

$ docker run --name frontend-test -dp 3000:3000 frontend:0.4.0
$ docker run --name frontend-test -dp 3000:3000 frontend:0.5.0


```
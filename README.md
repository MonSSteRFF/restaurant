# restaurant
fullstack application with nest + react for restaurants owners, workers and users


## docker

start client/server `docker-compose up`

start server only
```bash
$ cd server
$ docker build -t restaurant-server .
$ docker run restaurant-server
```

start client only (client dosent work without server)
```bash
$ cd client
$ docker build -t restaurant-client .
$ docker run restaurant-client
```

# restaurant
fullstack application with nest + react for restaurants owners, workers and users


## before start project

1. create .env file in ./server/ with params

        JWT_SECRET_ACCESS_CODE="your_secret_key_number_1"
        JWT_SECRET_REFRESH_CODE="your_secret_key_number_2"
        CREATE_ADMIN_SECRET_KEY="your_secret_key_number_3"
        DATABASE_URL="file:./database/dev.db"




## start in docker

### dev mode
- start client/server `npm run docker`
- start server only `npm run docker:server`

## start in local

### dev mode
- client and server `npm run dev`
- server only `npm run server:dev`
- client only `npm run client:dev`

### prod mode
- client and server `npm run prod`
- server only `npm run server:prod`
- client only `npm run client:prod`


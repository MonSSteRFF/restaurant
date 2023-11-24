## auth api

/auth/login/ - login user {identifier(login or email), password}\
/auth/register/ - register new User {login, email, password}\
/auth/logout/ - clear refresh_token in db\
/auth/refresh/ - refresh tokens by refresh_token\
/auth/guarded/ - guarded Authorization `Bearer access_token` and user role

## Installation

```bash
$ npm install

$ npm run prisma_migrate
```

## Running the app

```bash
# development
$ npm run start

# development with watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

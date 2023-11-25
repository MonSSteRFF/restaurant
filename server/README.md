## auth api

__/auth/login/__" - login user {identifier(login or email)(string), password(string)}

__/auth/register/__ - register new User {login(string), email(string), password(string)}

__/auth/logout/__ - clear refresh_token

__/auth/refresh/__ - refresh tokens 

## restaurant api (only for ADMIN or RES_ADMIN roles)

__/restaurant__ - get all restaurants with params\
limit(number), skip(number), search(string), tag(tag,tag), \
sort(byRanked ,fastest ,low_price ,high_price),\
sale(sales, free_delivery)

__/restaurant/create__ - create new restaurant - {name(string), tag(tag[])}

__/restaurant/delete__ - delete restaurant - {removeId(number)}\


### available restaurant tags -

        burgers, sushi, pizza, wok, paste, soups, breakfasts, 
        dinner, gruzia, italy, russian, uzbek, asia, japan, 
        china, coffee, dessert, bakery, shashlik, shawurma, 
        steaks, sandwiches, seafood, healthy, europe, 
        fastfood, east, cavcaz, childrens,

# Installation

```bash
$ npm install

$ npm run prisma_migrate
```

# Running the app

```bash
# development
$ npm run start

# development with watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

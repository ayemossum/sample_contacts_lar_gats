# Sample contacts app

## Backend (`/api/` directory)

Set up backend with `compose`.

You'll also need to set up a mysql/mariadb database and configure Laravel to use it.
My .env contains the following block, e.g.

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=newp
DB_USERNAME=newp
DB_PASSWORD=newp
```

Run with `php artisan serve` (defaults to :8000)

## Frontend (`/frontend/` directory)

Set up frontend with `yarn` or `npm`.

Also, install the `gatsby` module in global with `yarn global add gatsby` or `npm -g install gatsby`

Run with `gatsby develop -p 8001` (run on :8001, use some port other than :8000)

## What it does

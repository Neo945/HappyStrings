# HappyStrings API

## Manual Installation

Clone the repo:

```bash
git clone https://github.com/Neo945/HappyStrings.git
```

Install the dependencies:

```bash
yarn install
```

## Table of Contents

-   [Happy Strings](#appystrings-api)
    -   [Manual Installation](#manual-installation)
    -   [Table of Contents](#table-of-contents)
    -   [Features](#features)
    -   [Commands](#commands)
    -   [Environment Variables](#environment-variables)
    -   [Project Structure](#project-structure)
    -   [API Documentation](#api-documentation)

## Technologies

-   **NoSQL database**: [MongoDB](https://www.mongodb.com) object data modeling using [Mongoose](https://mongoosejs.com)
-   **Authentication and authorization**: using [passport](http://www.passportjs.org) and [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
-   **Validation**: request data validation using [Joi](https://github.com/hapijs/joi)
-   **Logging**: using [winston](https://github.com/winstonjs/winston) and [morgan](https://github.com/expressjs/morgan)
-   **Testing**: unit and integration tests using [Jest](https://jestjs.io)
-   **Error handling**: centralized error handling mechanism
-   **Process management**: advanced production process management using [PM2](https://pm2.keymetrics.io)
-   **Dependency management**: with [Yarn](https://yarnpkg.com)
-   **Environment variables**: using [dotenv](https://github.com/motdotla/dotenv) and [cross-env](https://github.com/kentcdodds/cross-env#readme)
-   **CORS**: Cross-Origin Resource-Sharing enabled using [cors](https://github.com/expressjs/cors)
-   **Docker support**
-   **Linting**: with [ESLint](https://eslint.org)

## Commands

Running locally:

```bash
yarn run dev
```

Running in production:

```bash
yarn start
```

Testing:

```bash
yarn test
```

Linting:

```bash
yarn lint

# fix ESLint errors
yarn lint:fix
```

## Environment Variables

The environment variables can be found and modified in the `.env` file. They come with these default values:

```bash
# Port number
PORT=5000

# URL of the Mongo DB
MONGO_URL=mongodb://localhost:27017/database

# JWT secret key
JWT_SECRET=mysecretkey
```

## Project Structure

```
src\
 |--config\         # Environment variables and configuration related things
 |--controllers\    # Route controllers
 |--middlewares\    # Custom express middlewares
 |--models\         # Mongoose models
 |--routes\         # Routes
 |--utils\          # Utility classes and functions
 |--app.js          # Express app
 |--index.js        # App entry point
```

### API Endpoints

List of available routes:

**Auth routes**:\
`POST auth/register`                - register\
`POST auth/login`                   - login\
`POST auth/refresh-tokens`          - refresh auth tokens\
`POST auth/forgot-password`         - send reset password email\
`POST auth/reset-password`          - reset password\
`POST auth/send-verification-email` - send verification email\
`POST auth/verify-email`            - verify email

**User routes**:\
`POST users`            - create a user\
`GET users`             - get all users\
`GET users/:userId`     - get user\
`PATCH users/:userId`   - update user\
`DELETE users/:userId`  - delete user

## Linting

Linting is done using [ESLint](https://eslint.org/) and [Prettier](https://prettier.io).

In this app, ESLint is configured to follow the [Airbnb JavaScript style guide](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb-base) with some modifications. It also extends [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier) to turn off all rules that are unnecessary or might conflict with Prettier.

To modify the ESLint configuration, update the `.eslintrc.json` file. To modify the Prettier configuration, update the `.prettierrc` file.

To prevent a certain file or directory from being linted, add it to `.eslintignore` and `.prettierignore`.

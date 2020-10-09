# User Service Api

## Description

Create users service by using NestJS framework (a progressive Node.js framework) with Typescript language. And using Passport and JWT for authentication.

## Functions

Provide Restful Api for handling user-related functions. Such as create user (register), get all users, get one users, update specific user, and delete specific user.

For user register, user needs provide an unique username and a password between 6 and 20 characters. Also, user needs to make sure their password and confrim password to be same. After creating, database will only store one hashed password.

For authentication part, users will start by authenticating with a username and password. Once authenticated, the server will issue a JWT that can be sent as a bearer token in an authorization header on subsequent requests to prove authentication. Other API routes (except login and register; for login, we use passport-local) are protected based on the presence of a valid JWT as a bearer token. The bearer token is only validated for 2 minutes. After 2 minutes, users need to get another token for future useage. (can be longer)

### Postman examples

- /register

![register](/user/pic/register.png)

- /login

![login](/user/pic/login.png)

- /

![getallusers](/user/pic/allusers.png)

- /:id

![getoneuser](/user/pic/oneuser.png)

- /:id **after 2 minutes, the baerer token was invalidated**

![deleteoneuser](/user/pic/deleteonuser.png)

## Run

- **Install Yarn:**

```bash
$ npm install -g yarn
```

- **Start:**

```bash
$ yarn install // install packages written in package.json file

$ yarn run start:dev (run)
```

## NestJS

Nest is a framework for building efficient, scalable Node.js server-side applications. It uses modern JavaScript, is built with TypeScript (preserves compatibility with pure JavaScript) and combines elements of OOP (Object Oriented Programming), FP (Functional Programming), and FRP (Functional Reactive Programming).

Under the hood, Nest makes use of Express, but also, provides compatibility with a wide range of other libraries, like e.g. Fastify, allowing for easy use of the myriad third-party plugins which are available.

### Website 

[https://nestjs.com](https://nestjs.com/)

## To Do

Need to connect with apigateway, and have many-to-many relationship to community.

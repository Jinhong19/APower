# User Service Api

## Description

Create users service by using NestJS framework (a progressive Node.js framework) with Typescript language. And using Passport and JWT for authentication.

## Functions

Provide Restful Api for handling user-related functions. Such as create user (register), get all users, get one users, update specific user, and delete specific user.

For user register, user needs provide an unique username and a password between 6 and 20 characters. Also, user needs to make sure their password and confrim password to be same. After creating, database will only store one hashed password.

For authentication part, users will start by authenticating with a username and password. Once authenticated, the server will issue a JWT that can be sent as a bearer token in an authorization header on subsequent requests to prove authentication. Other API routes (except login and register; for login, we use passport-local) are protected based on the presence of a valid JWT as a bearer token. The bearer token is only validated for 2 minutes. After 2 minutes, users need to get another token for future useage. (can be longer)

## New Functions

Finished creating apis for storing related users' id and communities's id. After the front end gives user's id and one community's id, this service's usercomm api with POST menthod can store these two ids. We can see it as a many-to-many relationships between users and communities, but these two services don't talk to each other. After storing all "relationships", we can find all users by one community id, all communities by one user id, delete specific "relationship", and so on through different apis.

## Build Docker Image & Run Container

```bash
cd user
docker build -t ysha/apower-user:v3 .
docker run -p 3008:3008 -d --name apower-user ysha/apower-user:v3
```

## Documentation
[https://github.com/Jinhong19/APower/blob/master/user/userDocumentation/userDoc.md](https://github.com/Jinhong19/APower/blob/master/user/userDocumentation/userDoc.md)

## Run

- **Install Yarn:**

```bash
$ npm install -g yarn
```

- **Start:**

```bash
$ yarn install // install packages written in package.json file

$ yarn start:dev (run)
```

## NestJS

Nest is a framework for building efficient, scalable Node.js server-side applications. It uses modern JavaScript, is built with TypeScript (preserves compatibility with pure JavaScript) and combines elements of OOP (Object Oriented Programming), FP (Functional Programming), and FRP (Functional Reactive Programming).

Under the hood, Nest makes use of Express, but also, provides compatibility with a wide range of other libraries, like e.g. Fastify, allowing for easy use of the myriad third-party plugins which are available.

### Website 

[https://nestjs.com](https://nestjs.com/)

## To Do

Need to connect with apigateway.

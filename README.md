# User Service Api

## Description

Create users service by using NestJS framework (a progressive Node.js framework) with Typescript language.

## Functions

Provide Restful Api for handling user-related functions. Such as create user (register), get all users, get one users, update specific user, and delete specific user.

For user register, user needs provide an unique username and a password between 6 and 20 characters. Also, user needs to make sure their password and confrim password to be same. After creating, database will only store one hashed password.

### Postman examples

- /register

![register](/pic/register.png)

- /

![getallusers](/pic/allusers.png)

- /:id

![getoneuser](/pic/oneuser.png)

![deleteoneuser](/pic/deleteonuser.png)

![updateoneuser](/pic/updateoneuser.png)

## Run

- **Install Typescript:**

```bash
$ npm install typescript --save-dev
```

- **Install NestJS:**

```bash
$ npm i -g @nestjs/cli
```

- **Install packages:**

```bash
  $ npm install class-validator --save

  $ npm install bcrypt

  $ npm install --save @types/bcrypt

  $ npm install mongoose --save

  $ npm install class-transformer
```

- **Start:**

```bash
$ nest start --watch

$ https://localhost/3008/...
```

## NestJS

Nest is a framework for building efficient, scalable Node.js server-side applications. It uses modern JavaScript, is built with TypeScript (preserves compatibility with pure JavaScript) and combines elements of OOP (Object Oriented Programming), FP (Functional Programming), and FRP (Functional Reactive Programming).

Under the hood, Nest makes use of Express, but also, provides compatibility with a wide range of other libraries, like e.g. Fastify, allowing for easy use of the myriad third-party plugins which are available.

### Website 

[https://nestjs.com](https://nestjs.com/)

## To Do

Need to work with authentication, and connect with apigateway.

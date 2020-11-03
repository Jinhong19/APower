# Script World

## Overview

Team Name:APower    
Script World is a text based rpg website that lets users play rpg stories with people online. Users will be able to create and join communities with their friends, customise their own characters for the game, and even create their own rpg stories to upload to their community according to the community rulebook. Users also have a specialised chat interface to communicate with others and invoke builtin functions during gameplay.

We aim to create an easily scalable application by using microservices. The MVP features we are working on are:

- Implement basic chat functionality with additional functions such as builtin dice.
- Allow users join a community that shares a rulebook
- Let users create and change rulebooks and stories.
- Let users create characters with items and spells for a rulebook.
- Implement authentication

## Team Member:

- Jinhong Gan
- Jiachao Chen
- Saswata Mishra
- Kashish Somani
- Yi Sha
- Peilan Wang

## System Design

![Image of System Design](https://github.com/Jinhong19/APower/blob/master/img/system_design.png)

- We are using the structure shown in the figure above to build our application. Each service is going to run separately and have a REST api that handles a subset of the requests. We use requests and responses with JSON for communications between the services. Most of the services are built with Node.js Express, with the exception of user service(Next.js) and player created content service(Java Spring).
- API Gateway is built to redirect all the user API calls to the correct services. User service stores user data and handles user log in and register. Community management service manages manages all community data, and handles requests like adding a user to a community. Rulebook service manages all rulebook, stories, skills creation and access.

## How the Application Addresses Scalability

We will be using docker images and containers to addresses scalability concerns for our project.

- Make each container to be its own application (services)
- Containers can have their own version of dependencies, so decouple each service. When introducing new features. Thus, we can include different versions of dependencies, since containers work separately, so we don’t have to update working services.
- Destroy containers without stopping other containers working.
- We can replicate as many containers as we want, and they don’t interfere with other containers by using images
- When deploying to a server, as long as the server has docker installed, it can run the containers.

We have a separate database for each service.

- Although we are only using MongoDB for now, we can switch to use other database technologies based on what works best for the data in a service.
- Depending on the type of the data, we can use both relational and nonrelational databases in our application, since we separated databases.
- By using a separate database It will help achieve consistency across different services.

## Current Services

| service | used port | description | api document |
| --- | --- | --- | --- |
| [dice](dice) | 3005 | This is a service tamplate, can be used for testing | |
| [apiGateway](apyGateway) | 3000 | Service manages the routing to all microservices API | |
| [rulebookService](rulebookService) | 3005 | Rulebook service manages all rulebook,stories,skills creation and access, and handle incoming http request | [https://docs.google.com/document/d/1M7XB4I3xLwcT0WQM_r4JxBjN55Go36tNeMqNGlQnwq8/edit#](https://docs.google.com/document/d/1M7XB4I3xLwcT0WQM_r4JxBjN55Go36tNeMqNGlQnwq8/edit#) |
| [communityService](communityService) | 3004 | Community service manages all community data and handle incoming http request | [https://docs.google.com/document/d/14wjDsvP9NK1BdJTZtBmN3OIEjCKfoN8HKU38hzlWan8/edit#](https://docs.google.com/document/d/14wjDsvP9NK1BdJTZtBmN3OIEjCKfoN8HKU38hzlWan8/edit#) |
| [userService](user) | 3008 | Create users service by using NestJS framework (a progressive Node.js framework) with Typescript language. And using Passport and JWT for authentication | 1. **/users GET**: get all users<br>2. **/users/login POST**: login to get token<br>3. **/users/register POST**: create new user<br>4. **/users/:id GET, PATCH, DELETE**: get, update, delete user<br>5. **/usercomm POST**: store "relationship" between user and community<br>6. **/usercomm GET(Query)**: get one data by user id and community id<br>7. **/usercomm/id GET(Query)**: get specific _id by user id and community id<br>8 **/usercomm/comms/:id GET**: get all communities' id by specific user id<br>9. **/usercomm/users/:id GET**: get all users' id by specific community id<br>10. **/usercomm DELETE(Query)**: delete specific data by user id and community id |

## Link
Demo: https://drive.google.com/file/d/1ziqleJjWilCAn6oQQxksVZBHLtWB4qZD/view?usp=sharing

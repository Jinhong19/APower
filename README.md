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


  
## System Design

## Current Services

| service | used port | description | api document |
| --- | --- | --- | --- |
| dice | 3005 | This is a service tamplate, can be used for testing | |
| apiGateway | 3000 | Service manages the routing to all microservices API | |
| rulebookService | 3005 | Rulebook service manages all rulebook,stories,skills creation and access, and handle incoming http request | [https://docs.google.com/document/d/1M7XB4I3xLwcT0WQM_r4JxBjN55Go36tNeMqNGlQnwq8/edit#](https://docs.google.com/document/d/1M7XB4I3xLwcT0WQM_r4JxBjN55Go36tNeMqNGlQnwq8/edit#) |
| communityService | 3004 | Community service manages all community data and handle incoming http request | [https://docs.google.com/document/d/14wjDsvP9NK1BdJTZtBmN3OIEjCKfoN8HKU38hzlWan8/edit#](https://docs.google.com/document/d/14wjDsvP9NK1BdJTZtBmN3OIEjCKfoN8HKU38hzlWan8/edit#) |
| userService | 3008 | Create users service by using NestJS framework (a progressive Node.js framework) with Typescript language. And using Passport and JWT for authentication | [https://github.com/Jinhong19/APower/blob/master/user/userDocumentation/userDoc.md](https://github.com/Jinhong19/APower/blob/master/user/userDocumentation/userDoc.md) |
| pccService | 8080 | Manages player created content | see readme.md in pcc |


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


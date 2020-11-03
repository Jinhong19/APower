# Script World

## overview
Team Name:APower
Script World is a text based rpg website that lets users play rpg stories with people online. Users will be able to create and join communities with their friends, customise their own characters for the game, and even create their own rpg stories to upload to their community according to the community rulebook. Users also have a specialised chat interface to communicate with others and invoke builtin functions during gameplay.

We aim to create an easily scalable application by using microservices. 
The MVP features we are working on are:
Implement basic chat functionality with additional functions such as builtin dice.
Allow users join a community that shares a rulebook
Let users create and change rulebooks and stories.
Let users create characters with items and spells for a rulebook.
Implement authentication

Team Member:


## Project Description

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

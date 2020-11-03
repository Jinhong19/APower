# Apower

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

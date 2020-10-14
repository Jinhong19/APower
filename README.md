# Apower

## Current Services

| service | used port | description | api document |
| --- | --- | --- | --- |
| dice | 3005 |
| apiGateway | 3000 |
| communityService | 3004 |
| userService | 3008 | Create users service by using NestJS framework (a progressive Node.js framework) with Typescript language. And using Passport and JWT for authentication | 1. **/users GET**: get all users  2. **/users/login POST**: login to get token  3. **/users/register POST**: create new user  4. **/users/:id GET, PATCH, DELETE**: get, update, delete user  5. **/usercomm POST**: store "relationship" between user and community  6. **/usercomm GET(Query)**: get one data by user id and community id  7. **/usercomm/id GET(Query)**: get specific _id by user id and community id  8 **/usercomm/comms/:id GET**: get all communities' id by specific user id  9. **/usercomm/users/:id GET**: get all users' id by specific community id  10. **/usercomm DELETE(Query)**: delete specific data by user id and community id |
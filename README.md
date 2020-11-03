# Apower

## Current Services

| service | used port | description | api document |
| --- | --- | --- | --- |
| [dice](dice) | 3005 | This is a service tamplate, can be used for testing | |
| apiGateway | 3000 | Service manages the routing to all microservices API | |
| rulebookService | 3005 | Rulebook service manages all rulebook,stories,skills creation and access, and handle incoming http request | [https://docs.google.com/document/d/1M7XB4I3xLwcT0WQM_r4JxBjN55Go36tNeMqNGlQnwq8/edit#](https://docs.google.com/document/d/1M7XB4I3xLwcT0WQM_r4JxBjN55Go36tNeMqNGlQnwq8/edit#) |
| communityService | 3004 | Community service manages all community data and handle incoming http request | [https://docs.google.com/document/d/14wjDsvP9NK1BdJTZtBmN3OIEjCKfoN8HKU38hzlWan8/edit#](https://docs.google.com/document/d/14wjDsvP9NK1BdJTZtBmN3OIEjCKfoN8HKU38hzlWan8/edit#) |
| userService | 3008 | Create users service by using NestJS framework (a progressive Node.js framework) with Typescript language. And using Passport and JWT for authentication | 1. **/users GET**: get all users<br>2. **/users/login POST**: login to get token<br>3. **/users/register POST**: create new user<br>4. **/users/:id GET, PATCH, DELETE**: get, update, delete user<br>5. **/usercomm POST**: store "relationship" between user and community<br>6. **/usercomm GET(Query)**: get one data by user id and community id<br>7. **/usercomm/id GET(Query)**: get specific _id by user id and community id<br>8 **/usercomm/comms/:id GET**: get all communities' id by specific user id<br>9. **/usercomm/users/:id GET**: get all users' id by specific community id<br>10. **/usercomm DELETE(Query)**: delete specific data by user id and community id |
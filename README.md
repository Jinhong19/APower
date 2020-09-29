# APower
Team member:

** API Gateway **
Service manages the routing to all microservices API
Test:
In directory APower
1. run ```npm install```
2. run ```npm run apiGateway```
3. open new terminal, and run ```npm run testapi```
4. open ```http://localhost:3000/testapi/testpath``` in brower, should return ```hello from test api```
5. or send get request to ```http://localhost:3000/testapi/testpath``` on postman, should have same result

**TODO**
Implement: security, authentication, authorization
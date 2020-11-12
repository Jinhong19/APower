# API Gateway   
Service manages the routing to all microservices API

## Test
In directory apiGateway
1. run ```npm install```
2. run ```npm run start``` or ```npm run dev``` to use nodemon
3. open new terminal, and run ```npm run testapi``` in directory apiGateway
4. open ```http://localhost:3000/testapi/testpath``` in brower, should return ```hello from test api```
5. or send get request to ```http://localhost:3000/testapi/testpath``` on postman, should have same result

## TODO  
Implement: security, authentication, authorization

How to change registry (follow this):
"dice": {
            "apiName": "dice",
            "host": "http://host.docker.internal",
            "port": 3003,
            "url": "http://host.docker.internal:3003/" 
        }
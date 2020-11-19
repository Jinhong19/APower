# PCC Service

This service manages player created content

## Run

With Maven and Java installed

- run `mvn spring-boot:run`

## View API Documentation and Test the API

With application running

- go to http://localhost:8080/swagger-ui.html

## Build and Run with Docker
mvn clean install
docker build -t pcc .
docker run pcc
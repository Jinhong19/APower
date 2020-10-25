const properties = require("../package.json");
const swaggerJsdoc = require("swagger-jsdoc");
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: properties.name,
      version: properties.version,
      description: properties.description,
      license: properties.license,
      host: "localhost:3005", // the host or url of the app
    },
    servers: [
      {
        url: "http://localhost:3005/",
      },
    ],
  },
  // path relative to server.js
  apis: ["./docs/**/*.yaml"],
};
const specs = swaggerJsdoc(options);

module.exports = specs;

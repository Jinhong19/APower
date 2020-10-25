const express = require("express");
const app = express();
const specs = require("./configs/swagger.js");
const port = process.env.PORT || 3005;

const swaggerUi = require("swagger-ui-express");

const routes = require("./api/routes");
routes(app);
app.use(
  "/api-doc",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

app.listen(port, function () {
  console.log("The dice service started on port: " + port);
});

// debug swagger
// console.log(specs)

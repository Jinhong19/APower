const express = require("express");
// hold all routes in routes dir to handel request
const routes = require("./routers/router.js");
var socket = require('socket.io');

const app = express();
const PORT = 3000;

var server = app.listen(PORT, function(){
  console.log("The Gateway started at PORT " + PORT);
});

let io = socket(server);

require('./routers/socket.js')(io);

app.use(express.json());
app.use("/", routes);

//test: start index.js testapi.js call http://localhost:3000/testapi/testpath

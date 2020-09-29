var express = require('express')
var app = express()
// hold all routes in routes dir to handel request
var routes = require('./routers/router.js');
var port = 3000;

app.use(express.json());

app.use('/', routes);

app.listen(port, ()=>{
    console.log("The Gateway started at port "+ port)
}) 

//test: start index.js testapi.js call http://localhost:3000/testapi/testpath

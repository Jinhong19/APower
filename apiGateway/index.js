const express = require('express')
const app = express()
// hold all routes in routes dir to handel request
const routes = require('./routers/router.js');
const PORT = 3000;

app.listen(PORT, console.log(`Server started on port ${PORT}`))

app.use(express.json());

app.use('/', routes);

app.listen(PORT, ()=>{
    console.log("The Gateway started at PORT "+ PORT)
}) 

//test: start index.js testapi.js call http://localhost:3000/testapi/testpath

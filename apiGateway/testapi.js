//this file contains API for testing on port 3001
var express = require('express')
var app = express()
var port = 3001

app.use(express.json())
app.get('/testpath', (req,res) => {
    res.send("hello from test api")
})

app.listen(port, () => {
    console.log('testapi on port '+ port)
})
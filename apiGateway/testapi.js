//this file contains API for testing on port 3001
const express = require('express')
const app = express()
const PORT = 3001

app.use(express.json())
app.get('/testpath', (req,res) => {
    res.send("hello from test api")
})

app.listen(PORT, () => {
    console.log('testapi on PORT '+ PORT)
})
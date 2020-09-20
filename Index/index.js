const express = require('express')

const app = express()
const port = 3002

app.get('/', (req, res) => {
    res.send('you are in index')
})

app.listen(port,()=>{ 
    console.log("index listening on http://localhost:${port}!")
})
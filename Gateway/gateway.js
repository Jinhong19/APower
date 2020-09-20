const express = require('express')
const proxy = require('express-http-proxy')

const app = express()

const port = 3001

app.get('/', (req, res) => {
    res.send('Hello World!')
  })

app.use('/index', proxy('http://localhost:3002'));

app.listen(port,()=>{ 
    console.log('api gateway listening on http://localhost:${port}!')
});


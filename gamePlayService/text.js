const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
require('./db');

const app = express();
const port = process.env.PORT || 3020;

dotenv.config();

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.listen(port, function() {
    console.log('community service running on port: ' +port);
})


app.get('/get', function(req,res){
    res.send("hello");
})
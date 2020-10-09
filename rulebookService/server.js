const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const upload = require('express-fileupload');
require('./db');

const app = express();
const port = process.env.PORT || 3005;

dotenv.config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(upload());

app.listen(port, function() {
   console.log('community service running on port: ' + port);
});

let rulebookRouter = require('./routes/rulebook');
app.use('/', rulebookRouter);
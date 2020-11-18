const express =require('express');
const bodyParser = require('body-parser');
const path = require('path');
var cors = require('cors');  
require('./db');

const app = express();
const port = 3020;
app.use(cors({credentials: true, origin: 'http://localhost:http://localhost:3000/'}));
app.use(express.static(path.join(__dirname, 'public')));
//const http = require('http').createServer(app);

//const io = require('socket.io')(http);

var socket = require('socket.io')
var server = app.listen(port, function(){
    console.log('chat service running on port: ' + port);
});
let io = socket(server)


require('./socket/story.js')(io);

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

var story = require("./routes/story");
var index = require("./routes/index");
app.use('/',index);
app.use('/', story);

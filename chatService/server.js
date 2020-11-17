const express =require('express');
const bodyParser = require('body-parser');
const http = require('http').createServer();
require('./db');

const app = express();
const httpPort = 3003;
const restPort = 3020;

const io = require('socket.io')(http);

require('./socket/community.js')(io);
require('./socket/audience.js')(io);
require('./socket/story.js')(io);

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

http.listen(httpPort, function(){
    console.log('http socket running on port: ' + httpPort);
});

app.listen(restPort, function() {
    console.log('express running on port: ' +restPort);
})

var story = require("./routes/story");
app.use('/', story);
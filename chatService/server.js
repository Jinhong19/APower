const express =require('express');
const http = require('http').createServer();
require('./db');

const app = express();
const port = 3003;

const io = require('socket.io')(http);

require('./routes/community.js')(io);
require('./routes/audience.js')(io);
require('./routes/story.js')(io);

http.listen(port, function(){
    console.log('chat service running on port: ' + port);
});
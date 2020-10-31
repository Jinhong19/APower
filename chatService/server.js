const express =require('express');
const http = require('http').createServer();

const app = express();
const port = 3003;

app.use(express.static(path.join(_direname, 'public')));

const io = require('socket.io')(http);

require('./routes/community.js')(io);

http.listen(port, function(){
    console.log('chat service running on port: ' + port);
});
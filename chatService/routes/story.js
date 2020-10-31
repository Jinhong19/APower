const io = require('socket.io');

module.exports = function(socket) {
    socket.emit("welcome","this is from story.js");
};
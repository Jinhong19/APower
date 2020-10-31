const io =require('socket.io-client');

var socket = io.connect("http://localhost:3003/community");

socket.on('welcome', (msg) =>{
    console.log(msg);
})

socket.on('newUser', (msg) =>{
    console.log(msg);
})

socket.on('disconnectUser', (msg) =>{
    console.log(msg);
})

socket.emit("joinRoom",{communityId:"123", username:"a1"});

socket.emit('disconnect', {communityId:"123", username:"a1"});

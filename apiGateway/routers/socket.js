const { compare } = require('bcryptjs');
var i = require('socket.io-client');
var s;

module.exports = function(io) {
    io.on('connection', socket => {
        var s = i.connect('http://host.docker.internal:3020/story');

        //story room
        socket.on('joinAsPlayer', (player) =>{
            s.emit("joinAsPlayer",player);
        });

        socket.on('welcome', (msg) =>{
            s.emit("welcome",msg);
        })

        socket.on('roll', (msg) =>{
            s.emit("roll",msg);
        })

        socket.on('getStory', (msg)=>{
            s.emit("getStory",msg);
        })

        socket.on('getAllSkill', (msg)=>{
            s.emit("getAllSkill",msg);
        })

        socket.on('getSkill', (msg)=>{
            s.emit("getSkill",msg);
        })

        socket.on('getItems', (msg)=>{
            s.emit("getItems",msg);
        })

        socket.on('getSpells', (msg)=>{
            s.emit("getSpells",msg);
        })

        socket.on('getCharacter', (msg)=>{
            s.emit("getCharacter",msg);
        })

        socket.on('clientMessage-Story', (msg)=>{
            s.emit("clientMessage-Story",msg);
        })

        socket.on('disconnect-Story', (msg)=>{
            s.emit("disconnect-Story",msg);
        })

        socket.on('serverMessage-Story', (msg)=>{
            s.emit("serverMessage-Story",msg);
        })


        s.on('clientMessage-Story', (msg)=>{
            socket.emit('clientMessage-Story',msg);
        })

        s.on('serverMessage-Story', (msg)=>{
            socket.emit('serverMessage-Story',msg);
        })

        s.on('welcome', (msg)=>{
            socket.emit('welcome',msg);
        })

        s.on('Error', (msg)=>{
            socket.emit('Error',msg);
        })

        s.on('newUser', (msg)=>{
            socket.emit('newUser',msg);
        })

        s.on('disconnectUser', (msg)=>{
            socket.emit('disconnectUser',msg);
        })

        s.on('story', (msg)=>{
            socket.emit('story',msg);
        })

        s.on('skill', (msg)=>{
            socket.emit('skill',msg);
        })

        s.on('character', (msg)=>{
            socket.emit('character',msg);
        })

        s.on('items', (msg)=>{
            socket.emit('items',msg);
        })

        s.on('spells', (msg)=>{
            socket.emit('spells',msg);
        })



        //audience room
        socket.on('joinAsAudience', (msg)=>{
            s.emit('joinAsAudience',msg);
        })

        socket.on('disconnect-Audience', (msg)=>{
            s.emit('disconnect-Audience',msg);
        })

        socket.on('clientMessage-Audience', (msg)=>{
            s.emit('clientMessage-Audience',msg);
        })

        s.on('audienceUserList', (msg)=>{
            socket.emit('audienceUserList',msg);
        })

        s.on('serverMessage-Audience', (msg)=>{
            socket.emit('serverMessage-Audience',msg);
        })

        s.on('welcome-Audienc', (msg)=>{
            socket.emit('welcome-Audienc',msg);
        })

        s.on('audienceNewUser', (msg)=>{
            socket.emit('audienceNewUser',msg);
        })

        s.on('disconnectUser-Audience', (msg)=>{
            socket.emit('disconnectUser-Audience',msg);
        })

        s.on('chatHistory', (msg)=>{
            socket.emit('chatHistory',msg);
        })

    });

}
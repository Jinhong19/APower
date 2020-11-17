const storyNamespace = '/story';
const history = require('../model/chatHistory');

module.exports = function(io) {
    io.of(storyNamespace).on('connection', socket => {
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaa");
        socket.on("joinRoom", (player) => {
            console.log("aaaaaaaaaaaaaaaaaaaaaaaaaa");
            var History =history.history;
            History.exists({"roomName":player.storyRoom}, function(err, result){
                if(result){
                    socket.join(player.storyRoom);
                    console.log("User " + player.username + " has join the audience room chat" + player.storyRoom);
                    socket.emit("welcome",{username:"Bot",time:"time",message:"You have succefully Joined audience room chat" + player.storyRoom});
                    io.of(storyNamespace).to(player.storyRoom).emit("newUser", {username:player.username,time:"time", message:"User " + player.username + " is online"});
                }
                else{
                    socket.emit("Error",{error:"room deosn't exists"});
                }
            })
        });

        socket.on('clientMessage', msg => {
            var History = history.history;

            History.exists({'roomName':msg.storyRoom}, function(err, result){
                if(result){
                    history.add_History(msg.storyRoom,{username:msg.username,time:"time",message:msg.message});
                    io.of(storyNamespace).to(msg.storyRoom).emit("serverMessage", {username:msg.username,time:"time",message:msg.message});
                }
                else
                    io.of(storyNamespace).to(msg.storyRoom).emit("error", "Error: chat room doesn't exsits.");
            })
            //io.of(storyNamespace).to(msg.storyRoom).emit("serverMessage", {username:msg.username,time:"time",message:msg.message});
        });

        socket.on('disconnect', player => {
            console.log("User " + player.username + " has leave the community");
            io.of(storyNamespace).to(player.storyRoom).emit("disconnectUser", "User " + player.username + " has leave the community");
        });

        socket.on('roll', player => {
            var History = history.history;

            History.exists({'roomName':msg.storyRoom}, function(err, result){
                if(result){
                    history.add_History(msg.storyRoom,{username:msg.username,time:"time",message:msg.message});
                    io.of(storyNamespace).to(msg.storyRoom).emit("serverMessage", {username:msg.username,time:"time",message:"5"});
                }
                else
                    io.of(storyNamespace).to(msg.storyRoom).emit("error", "Error: chat room doesn't exsits.");
            })
            //io.of(storyNamespace).to(player.storyRoom).emit("serverMessage", {username:player.username,time:"time",message:"5"});
        })
    })
};
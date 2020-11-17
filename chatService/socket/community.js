const communityNamespace = '/story';
const history = require('../model/chatHistory');

module.exports = function(io) {
    io.of(communityNamespace).on('connection', socket => {
        socket.on("joinRoom", (community) => {
            var History =history.history;
            History.exists({"roomName":community.communityId}, function(err, result){
                if(result){
                    socket.join(community.communityId);
                    console.log("User " + community.username + " has join the community");
                    socket.emit("welcome",{username:"Bot",time:"time",message:"You have succefully Joined community chat " + community.communityId});
                    io.of(communityNamespace).to(community.communityId).emit("newUser", {username:community.username,time:"time", message:"User " + community.username + " is online"});
                }
                else{
                    socket.emit("Error",{error:"room deosn't exists"});
                }
            })
        });

        socket.on('clientMessage', msg => {
            io.of(communityNamespace).to(msg.communityId).emit("serverMessage", {username:msg.username,time:"time",message:msg.message});
        });

        socket.on('disconnect', community => {
            console.log("User " + community.username + " has leave the community");
            io.of(communityNamespace).to(community.communityId).emit("disconnectUser", "User " + community.username + " has leave the community");
        });
    })
};
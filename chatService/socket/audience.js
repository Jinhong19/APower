const history = require('../model/chatHistory');
const audienceNamespace = '/audience';

module.exports = function(io) {
    io.of(audienceNamespace).on('connection', socket => {
        socket.on("joinRoom", (audience) => {
            var History = history.history;
            History.exists({"roomName":audience.audienceRoom}, function(err, result){
                if(result){
                    socket.join(audience.audienceRoom);
                    console.log("User " + audience.username + " has join the audience room chat" + audience.audienceRoom);
                    socket.emit("welcome",{username:"Bot",time:"time",message:"You have succefully Joined audience room chat" + audience.audienceRoom});
                    io.of(audienceNamespace).to(audience.audienceRoom).emit("newUser", {username:audience.username,time:"time", message:"User " + audience.username + " is online"});
                }
                else{
                    socket.emit("Error",{error:"room deosn't exists"});
                }
            })
        });

        socket.on('clientMessage', msg => {
            var History = history.history;

            History.exists({'roomName':msg.audienceRoom}, function(err, result){
                if(result){
                    history.add_History(msg.audienceRoom,{username:msg.username,time:"time",message:msg.message});
                    io.of(audienceNamespace).to(msg.audienceRoom).emit("serverMessage", {username:msg.username,time:"time",message:msg.message});
                }
                else
                    io.of(audienceNamespace).to(msg.audienceRoom).emit("error", "Error: chat room doesn't exsits.");
            })
        });

        socket.on('disconnect', audience => {
            console.log("User " + audience.username + " has leave the community");
            io.of(audienceNamespace).to(audience.audienceRoom).emit("disconnectUser", "User " + audience.username + " has leave the community");
        });
    })
};
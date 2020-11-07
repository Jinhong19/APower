const storyNamespace = '/story';

module.exports = function(io) {
    io.of(storyNamespace).on('connection', socket => {
        socket.on("joinRoom", (player) => {
            socket.join(player.storyRoom);
            console.log("User " + player.username + " has join the audience room chat" + player.storyRoom);
            socket.emit("welcome",{username:"Bot",time:"time",message:"You have succefully Joined audience room chat" + player.storyRoom});
            io.of(storyNamespace).to(player.storyRoom).emit("newUser", {username:player.username,time:"time", message:"User " + player.username + " is online"});
        });

        socket.on('clientMessage', msg => {
            io.of(storyNamespace).to(msg.storyRoom).emit("serverMessage", {username:msg.username,time:"time",message:msg.message});
        });

        socket.on('disconnect', player => {
            console.log("User " + player.username + " has leave the community");
            io.of(storyNamespace).to(player.storyRoom).emit("disconnectUser", "User " + player.username + " has leave the community");
        });

        socket.on('roll', player => {
            console.log("user was trying to roll a dice");
            io.of(storyNamespace).to(player.storyRoom).emit("serverMessage", {username:player.username,time:"time",message:"5"});
        })
    })
};
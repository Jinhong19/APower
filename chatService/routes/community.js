const communityNamespace = '/community';

module.exports = function(io) {
    io.of(communityNamespace).on('connection', socket => {
        socket.on("joinRoom", (community) => {
            socket.join(community.communityId);
            socket.emit("welcome","You have succefully Joined community chat " + community.communityId);
            io.of(communityNamespace).to(community.communityId).emit("newUser", "User " + community.username + " is online");
        });

        socket.on('chatMessage', msg => {

        });

        socket.on('disconnect', community => {
            console.log("aaaaaaaaaaaaa");
            io.of(communityNamespace).to(community.communityId).emit("disconnectUser", "User " + community.username + " has leave the community");
        });
    })
};
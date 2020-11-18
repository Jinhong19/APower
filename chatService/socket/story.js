const storyNamespace = '/story';
const history = require('../model/chatHistory');
const audienceList = require('../model/audienceList');
const axios = require('axios');

function currentTime(){
    let time = new Date();
    hours = time.getHours();
    minutes = time.getMinutes();
    return hours + ":" + minutes
}

module.exports = function(io) {
    io.of(storyNamespace).on('connection', socket => {
        socket.on("joinAsPlayer", (player) => {
            var History =history.history;
            History.findOne({"roomName":player.storyRoom}, function(err, result){
                if(result){
                    axios.get('http://localhost:3010/roomMember', {
                        params: {
                            password:player.storyRoom
                        }
                    })
                    .then(function (response){
                        if(response.data.includes(player.userId)){
                            socket.join(player.storyRoom);
                            socket.emit("welcome",{username:"System",time:currentTime(),text:"You have succefully Joined audience room chat" + player.storyRoom, users:response.data});
                            io.of(storyNamespace).to(player.storyRoom).emit("newUser", {username:"System",time:currentTime(), text:"User " + player.username + " is online"});
                            socket.emit("actionHistory", {history:result.chat});
                        }
                        else{
                            io.of(storyNamespace).emit("Error", {username:"System",time:currentTime(),text:"player unable to access this room."});
                        }
                    })
                    .catch(function (error){
                        io.of(storyNamespace).emit("Error", {username:"System",time:currentTime(),text:"player unable to access this room."});
                    })
                }
                else{
                    io.of(storyNamespace).emit("Error",{username:"System",time:currentTime(),text:"room deosn't exists"});
                }
            })
        });

        socket.on('getStory', msg=> {
            axios.get('http://localhost:3010/story', {
                params: {
                    password:msg.room
                }
            })
            .then(function (response){
                socket.emit("story",{username:"System",time:currentTime(),story:response.data});
            })
            .catch(function (error){
                socket.emit("Error",{username:"System",time:currentTime(),text:"unable to get story"});
            })
        })

        socket.on('clientMessage-Story', msg => {
            var History = history.history;

            History.exists({'roomName':msg.storyRoom}, function(err, result){
                if(result){
                    history.add_History(msg.storyRoom,{username:msg.username,time:currentTime(),message:msg.message});
                    io.of(storyNamespace).to(msg.storyRoom).emit("serverMessage-Story", {username:msg.username,time:currentTime(),text:msg.message});
                }
                else
                    io.of(storyNamespace).emit("Error", {username:"System",time:currentTime(),text:"room deosn't exists"});
            })
            //io.of(storyNamespace).to(msg.storyRoom).emit("serverMessage", {username:msg.username,time:"time",message:msg.message});
        });

        socket.on('disconnect-Story', player => {
            console.log("User " + player.username + " has leave the chat");
            io.of(storyNamespace).to(player.storyRoom).emit("disconnectUser", {username:"System",time:currentTime(),text:"User " + player.username + " has leave the chat"});
        });

        socket.on('roll', player => {
            var History = history.history;
            History.exists({'roomName':player.storyRoom}, function(err, result){
                if(result){
                    axios.post('http://localhost:3003/dice')
                    .then(function (response){
                        history.add_History(player.storyRoom,{username:player.username,time:currentTime(),message:response.data});
                        io.of(storyNamespace).to(player.storyRoom).emit("serverMessage", {username:player.username,time:currentTime(),message:response.data});
                    })
                    .catch(function (error){
                        io.of(storyNamespace).to(player.storyRoom).emit("Error", {username:"System",time:currentTime(),text:"unable to access dice service."});
                    })
                }
                else
                    io.of(storyNamespace).emit("Error", {username:"System",time:currentTime(),text:"chat room doesn't exsits."});
            })
            //io.of(storyNamespace).to(player.storyRoom).emit("serverMessage", {username:player.username,time:"time",message:"5"});
        })

        socket.on("joinAsAudience", (audience) => {
            var AudienceList = audienceList.audienceList;
            var History = history.history;
            AudienceList.findOne({"password":audience.audienceRoom}, function(err, result){
                if(result){
                    socket.join(audience.audienceRoom);

                    History.findOne({'roomName':audience.audienceRoom}, function(err, result){
                        if(result)
                            io.of(storyNamespace).to(audience.audienceRoom).emit("chatHistory", {history:result.chat});
                    })

                    if(!result.user.includes(audience.username)){
                        audienceList.add_User(audience.audienceRoom, audience.username, function(){
                            AudienceList.findOne({"password":audience.audienceRoom}, function(err, result){
                                if(result){
                                    io.of(storyNamespace).to(audience.audienceRoom).emit("audienceUserList", {userList:result.user});
                                }
                            });
                        });
                    }
                    console.log("User " + audience.username + " has join the audience room chat" + audience.audienceRoom);
                    socket.emit("welcome-Audience",{username:"System",time:currentTime(),text:"You have succefully Joined audience room chat " + audience.audienceRoom});
                    io.of(storyNamespace).to(audience.audienceRoom).emit("audienceNewUser", {username:audience.username,time:currentTime(), text:"User " + audience.username + " is online"});
                    io.of(storyNamespace).to(audience.audienceRoom).emit("audienceUserList", {userList:result.user});
                }
                else{
                    socket.emit("Error",{error:"room deosn't exists"});
                }
            });
        });

        socket.on('clientMessage-Audience', msg => {
            var History = history.history;

            History.exists({'roomName':msg.audienceRoom}, function(err, result){
                if(result){
                    io.of(storyNamespace).to(msg.audienceRoom).emit("serverMessage-Audience", {username:msg.username,time:currentTime(),text:msg.message});
                }
                else
                    io.of(storyNamespace).emit("Error", {username:"System",time:currentTime(),text:"room deosn't exists"});
            })
        });

        socket.on('disconnect-Audience', audience => {
            var AudienceList = audienceList.audienceList;
            console.log("User " + audience.username + " has leave the chat");
            io.of(storyNamespace).to(audience.audienceRoom).emit("disconnectUser-Audience", {username:"System",time:currentTime(),text:"User " + audience.username + " has leave the chat"});
            audienceList.remove_User(audience.audienceRoom,audience.username,function(){
                AudienceList.findOne({"password":audience.audienceRoom}, function(err ,result){
                    if(result){
                        io.of(storyNamespace).to(audience.audienceRoom).emit("audienceUserList", {userList:result.user});
                    }
                })
            });
        });
    })
};
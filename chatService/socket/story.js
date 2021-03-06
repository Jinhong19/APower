const storyNamespace = '/story';
const history = require('../model/chatHistory');
const audienceList = require('../model/audienceList');
const axios = require('axios');
const { copyFileSync } = require('fs');
const { compileFunction } = require('vm');

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
                    axios.get('http://host.docker.internal:3010/roomMember', {
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
            axios.get('http://host.docker.internal:3010/story', {
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

        socket.on('getAllSkill', msg=> {
            axios.get('http://host.docker.internal:3010/skill', {
                params: {
                    password:msg.room
                }
            })
            .then(function (response){
                if(response.data.length == 0){
                    io.of(storyNamespace).to(msg.room).emit("Error",{username:"System",time:currentTime(),text:"no skill exists"});
                }
                else{
                    var allSkill="";
                    for(var i in response.data){
                        allSkill = allSkill.concat("Skill Name: " + response.data[i].name + "\nDescription: " + response.data[i].description + "\n");
                    }
                    io.of(storyNamespace).to(msg.room).emit("skill", {username:"System",time:currentTime(), text:allSkill});
                }
            })
            .catch(function (error){
                socket.emit("Error",{username:"System",time:currentTime(),text:"unable to get all skill"});
            })
        })

        socket.on('getSkill', msg=> {
            axios.get('http://host.docker.internal:3010/skill', {
                params: {
                    password:msg.room
                }
            })
            .then(function (response){
                if(response.data.length == 0){
                    io.of(storyNamespace).to(msg.room).emit("Error",{username:"System",time:currentTime(),text:"no skill exists"});
                }
                else{
                    var flag = true;
                    for(var i in response.data){
                        if(response.data[i].name == msg.skillName){
                            flag = false;
                            io.of(storyNamespace).to(msg.room).emit("skill", {username:"System",time:currentTime(), text:"Skill Name: " + response.data[i].name + "\nDescription: " + response.data[i].description});
                        }
                    }
                    if(flag){
                        io.of(storyNamespace).to(msg.room).emit("Error",{username:"System",time:currentTime(),text:"skill " + msg.skillName  + " doesn't exists"});
                    }
                }
            })
            .catch(function (error){
                socket.emit("Error",{username:"System",time:currentTime(),text:"unable to get all skill"});
            })
        })

        socket.on('getCharacter', msg => {
            console.log("aaaaaaaaaaaaaaaaaaa");
            console.log('http://host.docker.internal:8080/characters/' + msg.userId);
            axios.get('http://host.docker.internal:3010/characterById', {
                params: {
                    password:msg.room,
                    userId:msg.userId
                }
            })
            .then(function (response){
                console.log(response.data);
                r = "Name: " + response.data.name + "\n" +
                    "Age: " + response.data.age + "\n" + 
                    "Gender: " + response.data.gender + "\n" + 
                    "Homeland: " + response.data.homeland + "\n" +
                    "Background Story: " + response.data.backgroundStory + "\n" +
                    "Stats: \n";
                for(var i in response.data.stats){
                    r = r.concat("| " + response.data.stats[i].name + ": " + response.data.stats[i].value + "\n");
                }
                r = r.concat("Skills: \n");
                for(var i in response.data.stats){
                    r = r.concat("| " + response.data.skills[i].name + ": " + response.data.skills[i].value + "\n");
                }
                io.of(storyNamespace).to(msg.room).emit("character", {username:"System",time:currentTime(), text:r});
            })
            .catch(function (error){
                socket.emit("Error",{username:"System",time:currentTime(),text:"unable to get character info"});
            })
        });

        socket.on('getItems', msg => {
            axios.get('http://host.docker.internal:3010/characterById', {
                params: {
                    password:msg.room,
                    userId:msg.userId
                }
            })
            .then(function (response){
                if(response.data.items == null){
                    io.of(storyNamespace).to(msg.room).emit("items", {username:"System",time:currentTime(), text:"character doesn't have any items"});
                }
                else{
                    r = "Items: \n";
                    for(var i in response.data.items){
                        console.log(response.data.items[i]);
                        r = r.concat(response.data.items[i].name + "\n| description: " + response.data.items[i].description + "\n| effect: " + response.data.items[i].effect + "\n");
                    }
                    io.of(storyNamespace).to(msg.room).emit("items", {username:"System",time:currentTime(), text:r});
                }
            })
            .catch(function (error){
                socket.emit("Error",{username:"System",time:currentTime(),text:"unable to get all items"});
            })
        });

        socket.on('getSpells', msg => {
            axios.get('http://host.docker.internal:3010/characterById', {
                params: {
                    password:msg.room,
                    userId:msg.userId
                }
            })
            .then(function (response){
                if(response.data.spells == null){
                    io.of(storyNamespace).to(msg.room).emit("spells", {username:"System",time:currentTime(), text:"character doesn't have any spells"});
                }
                else{
                    r = "Spells: \n";
                    for(var i in response.data.spells){
                        console.log(response.data.spells[i]);
                        r = r.concat(response.data.spells[i].name + "\n| description: " + response.data.spells[i].description + "\n| effect: " + response.data.spells[i].effect + "\n");
                    }
                    io.of(storyNamespace).to(msg.room).emit("spells", {username:"System",time:currentTime(), text:r});
                }
            })
            .catch(function (error){
                socket.emit("Error",{username:"System",time:currentTime(),text:"unable to get all items"});
            })
        });

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
                    axios.post('http://host.docker.internal:3003/dice')
                    .then(function (response){
                        history.add_History(player.storyRoom,{username:player.username,time:currentTime(),message:response.data});
                        io.of(storyNamespace).to(player.storyRoom).emit("serverMessage", {username:player.username,time:currentTime(),message:response.data});
                    })
                    .catch(function (error){
                        console.log("bbbbbbbbbbbbbbbbbbbbbbbbb");
                        io.of(storyNamespace).to(player.storyRoom).emit("Error", {username:"System",time:currentTime(),text:"unable to access dice service."});
                    })
                }
                else
                    io.of(storyNamespace).emit("Error", {username:"System",time:currentTime(),text:"chat room doesn't exsits."});
            })
            //io.of(storyNamespace).to(player.storyRoom).emit("serverMessage", {username:player.username,time:"time",message:"5"});
        })

        socket.on("joinAsAudience", (audience) => {
            console.log(audience);
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
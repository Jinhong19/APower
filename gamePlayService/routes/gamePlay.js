const express = require('express');
const storyRoom = require('../model/storyRoom');
const genPassword = require('generate-password');
const axios = require('axios');

var router = express.Router();

router.post('/createGameRoom', function(req,res){
    var Storyroom = storyRoom.storyRoom;

    var err = "";
    var errFlag = false;
    if(req.body.hostId == undefined){
        errFlag = true;
        err = err.concat("hostId cannot be undefined.\n");
    }
    if(req.body.storyId == undefined){
        errFlag = true;
        err = err.concat("storyId cannot be undefined.\n");
    }
    if(req.body.rulebookId == undefined){
        errFlag = true;
        err = err.concat("rulebookId cannot be undefined.\n");
    }
    if(req.body.maxMember == undefined){
        errFlag = true;
        err = err.concat("maxMember cannot be undefined.\n");
    }

    if(errFlag){
        res.status(400).send(err);
        return;
    }
    
    var password = genPassword.generate({length:20, numbers:true});
    Storyroom.find({}, function(err, result){
        if(result){
            var flag = true;
            while(flag){
                var flag = false;
                for (var i in result){
                    if(result[i] == password){
                        flag = true;
                    }
                }
                var password = genPassword.generate({length:20, numbers:true});
            }
        }
    });

    axios.post('http://localhost:3020/createChatHistory', {
            "roomName":password
        })
        .then(function (response){
            storyRoom.create_Storyroom(req.body.hostId,password,req.body.storyId, response.data.chatHistoryId ,req.body.rulebookId,req.body.maxMember);
        })
        .catch(function (error){
            console.log(error.status);
        })
    res.status(200).send("game room create success.");
});

router.post("/deleteGameRoom", function(req,res){
    var Storyroom = storyRoom.storyRoom;

    Storyroom.findOne({"hostId":req.body.userId, "password":req.body.password}, function(err, result){
        if(result){
            storyRoom.delete_Storyroom(req.body.password);
            res.status(200).send("game room delete success.");
        }
        else{
            res.status(400).send("unable to find game room");
        }
    })
});

router.post("/getRoomByPlayerId", function(req,res){
    var Storyroom = storyRoom.storyRoom;
    var allResult = [];

    console.log(req.body.userId)

    Storyroom.find({"playerList.playerId":req.body.userId}, function(err, result){
        if(result){
            for(var i in result){
                allResult.push({
                    storyId:result[i].storyId,
                    rulebookId:result[i].rulebookId,
                    password:result[i].password,
                    maxMember:result[i].maxMember,
                    playerList:result[i].playerList
                })
                console.log(allResult);
                res.status(200).send(allResult);
            }
        }
        else{
            res.status(400).send("game room doesn't exists");
        }
    })
})

router.post("/getRoomByHostId", function(req,res){
    var Storyroom = storyRoom.storyRoom;

    Storyroom.find({"hostId":req.body.userId}, function(err, result){
        if(result){
            res.status(200).send(result);
        }
        else{
            res.status(400).send("game room doesn't exists");
        }
    })
})

router.post("/invitePlayer", function(req,res){
    var Storyroom = storyRoom.storyRoom;

    Storyroom.findOne({"password":req.body.password, "hostId":req.body.userId}, function(err, result){
        console.log(result);
        if(result){
            if(result.maxMember <= result.playerList.length){
                res.status(400).send("room has reached max player");
            }
            else{
                var flag = false;
                for(var i in result.playerList){
                    if(result.playerList[i].playerId == req.body.playerId){
                        flag = true;
                    }
                }
                if(flag){
                    res.status(400).send("player already joined room");
                }
                else{
                    storyRoom.add_Player_To_Room(req.body.password, req.body.playerId, req.body.characterId);
                    res.status(200).send("success");
                }
            }
        }
        else{
            res.status(400).send("unable to invite player");
        }
    })
})

router.post("/kickPlayer", function(req,res){
    var Storyroom = storyRoom.storyRoom;

    console.log(req.body.userId);

    Storyroom.findOne({"password":req.body.password, "hostId":req.body.userId}, function(err, result){
        if(result){
            var flag = false;
            var player ={};
            for(var i in result.playerList){
                if(result.playerList[i].playerId == req.body.playerId){
                    flag = true;
                    player = result.playerList[i];
                }
            }
            if(flag){
                storyRoom.kick_Player_From_Room(req.body.password,player)
                res.status(200).send("player has been successfuly kick out from room");
            }
            else{
                res.status(400).send("player didn't exists in room");
            }
        }
        else{
            res.status(400).send("only host can kick player");
        }
    });

})

router.post("/quit", function(req,res){
    var Storyroom = storyRoom.storyRoom;

    Storyroom.exists({"password":req.body.password, "hostId":req.body.userId}, function(err, result){
        if(result){
            res.status(400).send("host must delete room, not quit");
        }
        else{
            Storyroom.findOne({"password":req.body.password, "playerList.playerId":req.body.userId}, function(err, result){
                if(result){
                    var player ={};
                    for(var i in result.playerList){
                        if(result.playerList[i].playerId == req.body.playerId){
                            flag = true;
                            player = result.playerList[i];
                        }
                    }
                    storyRoom.kick_Player_From_Room(req.body.password,player)
                    res.status(200).send("you have sccuessfuly quit the room");
                }
                else{
                    res.status(400).send("game room doesn't exists");
                }
            });
        }
    });
})

router.post("/assignHost", function(req,res){
    var Storyroom = storyRoom.storyRoom;

    Storyroom.exists({"password":req.body.password, "hostId":req.body.userId}, function(err, result){
        if(result){
            storyRoom.assign_Host(password,req.body.newHostId);
            res.status(200).send("host assign success")
        }
        else{
            res.status(400).send("game room doesn't exists");
        }
    })
});

router.get("/roomMember", function(req,res){
    var Storyroom = storyRoom.storyRoom;
    password = "";

    if(req.query.password == undefined){
        password = req.body.password;
    }
    else{
        password = req.query.password;
    }

    Storyroom.findOne({"password":password}, function(err, result){
        if(result){
            temp = [];
            for(var i in result.playerList){
                temp.push(result.playerList[i].playerId);
            }
            temp.push(result.hostId);
            res.status(200).send(temp);
        }
        else{
            res.status(400).send("game room doesn't exists");
        }
    })

});

router.post("/changeCharId", function(req,res){
    var Storyroom = storyRoom.storyRoom;
    var password = "";
    var userId = "";
    var characterId = "";

    if(req.query.password == undefined){
        password = req.body.password;
        userId = req.body.userId;
        characterId = req.body.characterId;
    }
    else{
        password = req.query.password;
        userId = req.query.userId;
        characterId = req.query.characterId;
    }

    Storyroom.findOne({"password":password}, function(err, result){
        if(result){
            var flag = false;
            var player = {};
            for(var i in result.playerList){
                if(result.playerList[i].playerId == userId){
                    flag = true;
                    player = result.playerList[i];
                }
                if(flag){
                    storyRoom.update_Character_Id(password,{playerId:userId,characterId,characterId});
                    storyRoom.kick_Player_From_Room(password,player);
                    res.status(200).send("character Id update success");
                }
                else{
                    res.status(400).send("user must join the room before update character id");
                }
            }
        }
        else{
            res.status(400).send("game room doesn't exists");
        }
    })
    
})

router.get('/story', function(req, res){
    var Storyroom = storyRoom.storyRoom;
    var password = "";

    if(req.query.password == undefined){
        password = req.body.password;
    }
    else{
        password = req.query.password;
    }

    Storyroom.findOne({"password":password}, function(err, result){
        if(result){
            axios.get('http://localhost:3005/storyById', {
                params: {
                    storyId:result.storyId
                }
            })
            .then(function (response){
                console.log("aaa");
                res.status(200).send(response.data);
            })
            .catch(function (error){
                res.status(400).send("unable to get story");
            })
        }
        else{
            res.status(400).send("game room doesn't exists");
        }
    })
})

router.get('/skill', function(req, res){
    var Storyroom = storyRoom.storyRoom;
    password = "";

    if(req.query.password == undefined){
        password = req.body.password;
    }
    else{
        password = req.query.password;
    }

    Storyroom.findOne({"password":password}, function(err, result){
        if(result){
            axios.get('http://localhost:3005/allSkill', {
                params: {
                    rulebookId:result.rulebookId
                }
            })
            .then(function (response){
                console.log("aaa");
                res.status(200).send(response.data);
            })
            .catch(function (error){
                console.log("bbbbbbbbbbbbbbbb");
                res.status(400).send("skill list doesn't exists");
            })
        }
        else{
            res.status(400).send("game room doesn't exists");
        }
    })
})

router.get('/characterById', function(req,res){
    var Storyroom = storyRoom.storyRoom;
    var password = "";
    var userId = "";
    var characterId = "";

    if(req.query.password == undefined){
        password = req.body.password;
        userId = req.body.userId;
    }
    else{
        password = req.query.password;
        userId = req.query.userId;
    }

    Storyroom.findOne({"password":password}, function(err, result){
        if(result){
            var flag = false;
            for(var i in result.playerList){
                if(result.playerList[i].playerId == userId){
                    flag = true;
                    characterId = result.playerList[i].characterId;
                    console.log(characterId);
                }
            }
            if(flag){
                axios.get('http://localhost:8080/characters/' + characterId, {
                })
                .then(function (response){
                    console.log(response.data);
                    res.status(200).send(response.data);
                })
                .catch(function (error){
                    res.status(400).send("unable to access pcc service");
                })
            }
            else{
                res.status(400).send("character not used");
            }
        }
        else{
            res.status(400).send("game room doesn't exists");
        }
    })
})

module.exports = router;
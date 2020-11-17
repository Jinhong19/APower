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

    Storyroom.find({"playerIdList":req.body.userId}, function(err, result){
        if(result){
            for(var i in result){
                allResult.push({
                    storyId:result[i].storyId,
                    rulebookId:result[i].rulebookId,
                    password:result[i].password,
                    maxMember:result[i].maxMember,
                    playerIdList:result[i].playerIdList
                })
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
        if(result){
            if(result.maxMember <= result.playerIdList.length){
                res.status(400).send("room has reached max player");
            }
            else if(result.playerIdList.includes(req.body.playerId)){
                res.status(400).send("player already joined room");
            }
            else{
                storyRoom.add_Player_To_Room(req.body.password, req.body.playerId);
                res.status(200).send("success");
            }
        }
        else{
            res.status(400).send("unable to invite player");
        }
    })
})

router.post("/kickPlayer", function(req,res){
    var Storyroom = storyRoom.storyRoom;

    Storyroom.findOne({"password":req.body.password, "hostId":req.body.userId}, function(err, result){
        if(result){
            if(result.playerIdList.includes(req.body.playerId)){
                storyRoom.kick_Player_From_Room(req.body.password,req.body.playerId)
                res.status(200).send("player has been successfuly kick out from room");
            }
            else{
                res.status(400).send("player didn't exists in room");
            }
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
            Storyroom.exists({"password":req.body.password, "hostId":req.body.userId}, function(err, result){
                if(result){
                    storyRoom.kick_Player_From_Room(req.body.password,req.body.playerId)
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

module.exports = router;
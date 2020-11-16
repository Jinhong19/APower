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

    if(errFlag){
        res.status(400).send(err);
        return;
    }
    
    chatHistoryId = "aaaaa";
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
    storyRoom.create_Storyroom(req.body.hostId,password,req.body.storyId,chatHistoryId,req.body.rulebookId);
    res.status(200).send(password);
});

module.exports = router;
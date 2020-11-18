const express = require('express');
const chatHistory = require('../model/chatHistory');
const audienceList = require('../model/audienceList');

var router = express.Router();

router.post("/createChatHistory", async function(req,res){
    var ChatHistory = chatHistory.history;

    if(req.body.roomName == undefined){
        res.status(400).send("roomName can't be undefined");
        return;
    }

    ChatHistory.exists({"roomName":req.body.roomName}, async function(err, result){
        if(result){
            res.status(400).send("chatHistory already exists.");
        }
        else{
            console.log("aaaaaaaaaaaaaaaaaaaaaaa");
            audienceList.create_List(req.body.roomName);
            const r = await chatHistory.create_History(req.body.roomName, function(err, obj){
                if(err){
                    res.status(400).send("unable to create chat history");
                }else{
                    res.status(200).send({"chatHistoryId":obj._id});
                }
            });
        }
    })
});

router.get("/roomId", function(req,res){
    var ChatHistory = chatHistory.history;

    ChatHistory.findOne({"roomName":req.body.roomName}, function(err, result){
        if(result){
            res.status(200).send({"roomId":result._id});
        }
        else{
            res.status(400).send("chatHistory doesn't exists.");
        }
    })
})

router.get("/chatHistory", function(req,res){
    var ChatHistory = chatHistory.history;

    ChatHistory.findOne({"roomName":req.body.roomName}, function(err, result){
        if(result){
            res.status(200).send({"history":result.chat});
        }
        else{
            res.status(400).send("chatHistory doesn't exists.");
        }
    })
})

router.get("/audienceUserList", function(req,res){
    var AudienceList = audienceList.audienceList;

    AudienceList.findOne({"password":req.body.roomName}, function(req,res){
        if(result){
            res.status(200).send(result.user);
        }
        else{
            res.status(400).send("audience doesn't exists");
        }
    })
})

router.post("/deleteChatHistory", function(req,res){
    var ChatHistory = chatHistory.history;

    ChatHistory.exists({"roomName":req.body.roomName}, function(err, result){
        if(result){
            chatHistory.delete_History(req.body.roomName);
            audienceList.delete_List(req.body.roomName);
            res.status(200).send("Chat History delete success.");
        }
        else{
            res.status(400).send("chatHistory doesn't exists.");
        }
    })
})


module.exports = router;
const express = require('express');
const storyRoom = require('../model/storyRoom');
const genPassword = require('generate-password');
const axios = require('axios');

var router = express.Router();

router.post('/createGameRoom', function(req,res){
    const Storyroom = storyRoom.storyRoom;

    var password = genPassword.generate({length:20, numbers:true});
    console.log(password)
    res.send("game room already exists");

    axios.get('http://localhost:3020/get')
        .then(function (response) {
            console.log(response.data);
        })
        .catch(function (err) {
            console.log("err");
        })

    /*Storyroom.exists({"hostId":req.hostId, "storyId":storyId}, function(err, result){
        if(result){
            res.status(400);
            res.send("game room already exists");
        }
        else{
            var password = genPassword.generate({length:20, numbers:true});
            console.log(password)
        }
    })*/
});

module.exports = router;
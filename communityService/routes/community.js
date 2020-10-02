const express = require('express');
var db = require('../db');
var user = require('../model/community');

var router = express.Router();

router.post('/create', function(req,res){
    console.log(req.body.name);
    res.send('community create success');
});

router.post('/join', function(req,res){
    res.send('user successfully join the community');
});

router.post('/quit', function(req,res){
    res.send('user successfully quit the community');
});

router.post('/createGameRoom', function(req,res){
    res.send('calling game service');
});

router.get('/communityHome', function(req,res){

});

module.exports = router;
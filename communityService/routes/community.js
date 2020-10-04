const express = require('express');
var db = require('../db');
var community = require('../model/community');

var router = express.Router();

router.post('/create', function(req,res){
    var Community = community.community;
    
    Community.exists({'communityName' : req.body.communityName}, function (err, result){  // check if community already exists
        if (result) // exist
            res.send('community name already exist');
        else{ // not exist, create community
            console.log(community.create_Community(req.body.communityName,req.body.creator,req.body.detial,req.body.public,req.body.rulebook));
            res.send('community create success');
        }
    });
});

router.post('/join', function(req,res){
    var Community = community.community;

    Community.exists({'communityName' : req.body.communityName, 'memberIdList' : req.body.userId}, function (err, result){  // check if already join
        if (result) // already join
            res.send('user already joined community');
        else{ // not already join, 
            console.log(community.join_Community(req.body.communityName, req.body.name));
            res.send('user join success');
        }
    })
});

router.post('/quit', function(req,res){
    var Community = community.community;

    Community.findOne({'communityName' : req.body.communityName, 'memberIdList' :  req.body.userId}, function (err, result){ // check if memebr in the community
        console.log(result);
        if(result){ // in community
            if(result.creatorId == req.body.userId && result.memberIdList.length > 1){ // if creator want to quit with more than one member in the community
                res.send('creator must give leadership to other member before quit');
            }
            else if(result.creatorId == req.body.userId && result.memberIdList.length == 1) { // if creator want to quit with only one him self in the community
                res.send('community has been delete, since current user is the laster member in this community');
            }
            else{ // user quit
                res.send('user successfully quit the community!');
            }
        }
        else // member is in in the community
            res.send('unable to find user within the community');
    });
});

router.post('/kickMember', function(req,res){
    var Community = community.community;

    if(req.body.userId == req.body.kickUserId){ // check if kick self
        res.send('unable to kick your self');
        return;
    }

    Community.findOne({'communityName' : req.body.communityName, 'memberIdList' :  req.body.userId}, function (err, result){ // check if memebr in the community
        if(result){ // if in
            if(result.memberIdList.includes(req.body.kickUserId) == true){ // if kickUser in the community
                if(req.body.userId == result.creatorId){ // if crator want to kick an user
                    res.send('user successfully kick out ' + req.body.kickUsername + " from the community");
                }
                else if(result.adminIdList.includes(req.body.userId) == true){ // if have admin authority
                    if(result.adminIdList.includes(req.body.kickUserId) == true) // if try to kick admin
                        res.send('unable to kick user that have same authority than you');
                    else{ // if try to kick user
                        res.send('user successfully kick out ' + req.body.kickUsername + " from the community");
                    }
                }
                else // no authority
                    res.send('you have no authority to kick a member');
            } 
            else
            res.send('error, unable to find the community with user');
        }
        else{ // not in the community
            res.send('error, unable to find the community with user');
        }
    });
});

router.post('/invite', function(req,res){
    var Community = community.community;
    if(req.body.userId == req.body.inviteUserId){ // check if invite self
        res.send('unable to invite your self');
        return;
    }

    Community.findOne({$or:[{'adminIdList' :  req.body.userId,'communityName' : req.body.communityName},  // if user is admin
                            {'creator' :  req.body.userId,'communityName' : req.body.communityName}]}, // if user is creator
                            function (err, result){ // check if memebr in the community
        if(result){
            res.send('player invited');
        }
        else
            res.send('error, you have no authority to invite user');
    });
});

router.post('/createGameRoom', function(req,res){
    res.send('calling game service');
});

router.get('/communityHome', function(req,res){

});

module.exports = router;
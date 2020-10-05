const express = require('express');
var community = require('../model/community');

var router = express.Router();

router.post('/assignAdmin', function(req,res){
    var Community = community.community;

    if(req.body.userId == req.body.assignUserId)
        res.send("you can't assign yourself to be an admin");
    else{
        Community.findOne({'communityName' : req.body.communityName}, function(err,result){
            if(result){
                if(result.memberIdList.includes(req.body.assignUserId) == false)
                    res.send('user is not in the community');
                else if (result.adminIdList.includes(req.body.assignUserId))
                    res.send('user is already a admin');
                else if(result.creatorId !== req.body.userId)
                    res.send("you don't have authority to assign user as admin");
                else{
                    community.assign_Admin(req.body.communityName, req.body.assignUserId);
                    res.send('assign success');
                }
            }
            else
                res.send('community does not exists');
        });
    }
});

router.post('/removeAdmin', function(req,res){
    var Community = community.community;

    Community.findOne({'communityName' : req.body.communityName, 'adminIdList' : req.body.removeAdminId}, function(err, result){
        if(result){
            if(result.creatorId == req.body.userId || req.body.userId == req.body.removeAdminId){
                community.remove_Admin(communityName,req.body.removeAdminId);
                res.send('user has been remove from admin list')
            } 
        else
            res.send('user is not an admin')
        }
    });
});

router.post('/changeCreator', function(req,res){
    var Community = community.community;

    Community.exists({'communityName' : req.body.communityName, 'creatorId' : req.body.userId, 'memberIdList' : req.body.newCreatorId}, function(err,result){
        if(result){
            community.change_Creator(req.body.communityName, req.body.newCreatorId);
            res.send('new creator roll assigned');
        }
        else
            res.send('unable to assign');
    });
});

module.exports = router;
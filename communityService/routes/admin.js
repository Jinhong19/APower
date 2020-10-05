const express = require('express');
var community = require('../model/community');

var router = express.Router();

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
                    community.quit_Community(req.body.communityName, req.body.kickUserId);
                    res.send('user successfully kick out ' + req.body.kickUsername + " from the community");
                }
                else if(result.adminIdList.includes(req.body.userId) == true){ // if have admin authority
                    if(result.adminIdList.includes(req.body.kickUserId) == true) // if try to kick admin
                        res.send('unable to kick user that have same authority than you');
                    else{ // if try to kick user
                        community.quit_Community(req.body.communityName, req.body.kickUserId);
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
                            {'creatorId' :  req.body.userId,'communityName' : req.body.communityName}]}, // if user is creator
                            function (err, result){ // check if memebr in the community
        if(result){
            community.join_Community(req.body.communityName, req.body.inviteUserId);
            res.send('user invited');
        }
        else
            res.send('error, you have no authority to invite user');
    });
});

module.exports = router;
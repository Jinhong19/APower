const express = require('express');
var community = require('../model/community');

var router = express.Router();

router.post('/join', function(req,res){
    var Community = community.community;

    Community.findOne({'communityName' : req.body.communityName}, function (err, result){  // check if already join
        if (result){// if community exists
            if(result.memberIdList.includes(req.body.userId)) // if user already in the community
                res.send('user already joined community');
            else{
                // join if the community is public 
                if(result.isPublic == true){ 
                    community.join_Community(req.body.communityName, req.body.userId);
                    res.send('user join success');
                }
                else // unable to join, community is private
                    res.send('the community is not public');
            }
        }
        else // no community found
            res.send('community does not exists');
    })
});

router.post('/quit', function(req,res){
    var Community = community.community;

    Community.findOne({'communityName' : req.body.communityName, 'memberIdList' :  req.body.userId}, function (err, result){ // check if memebr in the community
        console.log("1111111111111111111111111");
        console.log("1111111111111111111111111");
        if(result){ // in community
            if(result.creatorId == req.body.userId && result.memberIdList.length > 1){ // if creator want to quit with more than one member in the community
                res.send('creator must give leadership to other member before quit');
            }
            else if(result.creatorId == req.body.userId && result.memberIdList.length == 1) { // if creator want to quit with only one him self in the community
                community.delete_Community(req.body.communityName);
                res.send('community has been delete, since current user is the laster member in this community');
            }
            else{ // user quit
                community.quit_Community(req.body.communityName, req.body.userId);
                res.send('user successfully quit the community!');
            }
        }
        else // member is in in the community
            res.send('unable to find user within the community');
    });
});

module.exports = router;


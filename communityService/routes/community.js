const express = require('express');
var db = require('../db');
var community = require('../model/community');
var stringSimilarity = require('string-similarity');

var router = express.Router();

router.post('/create', async function(req,res){
    var Community = community.community;
    
    Community.exists({'communityName' : req.body.communityName}, await function (err, result){  // check if community already exists
        if (result) // exist
            res.send('community name already exist');
        else{ // not exist, create community
            community.create_Community(req.body.communityName,req.body.creator,req.body.detial,req.body.public,req.body.rulebook);
            res.send('community create success');
        }
    });
});

router.post('/join', function(req,res){
    var Community = community.community;

    Community.findOne({'communityName' : req.body.communityName}, function (err, result){  // check if already join
        if (result){// if community exists
            console.log(result.isPublic == true);
            if(result.memberIdList.includes(req.body.userId)) // if user already in the community
                res.send('user already joined community');
            else{
                // join if the community is public 
                if(result.isPublic == true){ 
                    console.log(community.join_Community(req.body.communityName, req.body.userId));
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
        console.log(result);
        if(result){ // in community
            if(result.creatorId == req.body.userId && result.memberIdList.length > 1){ // if creator want to quit with more than one member in the community
                res.send('creator must give leadership to other member before quit');
            }
            else if(result.creatorId == req.body.userId && result.memberIdList.length == 1) { // if creator want to quit with only one him self in the community
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
                            {'creator' :  req.body.userId,'communityName' : req.body.communityName}]}, // if user is creator
                            function (err, result){ // check if memebr in the community
        if(result){
            community.join_Community(req.body.communityName, req.body.inviteUserId);
            res.send('user invited');
        }
        else
            res.send('error, you have no authority to invite user');
    });
});

router.post('/searchCommunity', function(req,res){
    var Community = community.community;

    searchResult = [];
    rLength = 10;
    r = [];

    Community.find({}, function(err,result){
        if(result.length > 0){ // check if there exsits community in database
            if(result.length < rLength) // assign search result length with result length if have less than 10 community
                rLength = result.length;

            for (var i=0 ;i<rLength ;i++){ // initialize array
                r.push({'communityIndex' : -1
                        ,'similarity' : 0
                        });
            }

            for(var i = 0; i<result.length; i++){
                var similarity = stringSimilarity.compareTwoStrings(req.body.communityName, result[i].communityName); // compare community name similarity 
                for(var j=rLength-1; j>=0; j--){
                    if(similarity > r[j].similarity){ // if similarity greater than current element's similarity
                        if(j !== rLength-1){ // if at the last index
                            r[j+1].similarity = r[j].similarity;
                            r[j+1].communityIndex = r[j].communityIndex;
                        }
                        // swap
                        r[j].similarity = similarity; 
                        r[j].communityIndex = i;
                    }
                }
            }

            // assign result array with corresponding value
            for(var i = 0; i<rLength; i++){
                searchResult.push({
                    'communityName' : result[r[i].communityIndex].communityName,
                    'detail' : result[r[i].communityIndex].detail,
                    'numberOfMember' : result[r[i].communityIndex].memberIdList.length
                })
            }
            res.send(searchResult);
        }
        else if(result.length == 0)
            res.send('zero community exists');
        else
            res.send('error');
    });
});

router.post('/createGameRoom', function(req,res){
    res.send('calling game service');
});

router.get('/communityHome', function(req,res){

});

module.exports = router;
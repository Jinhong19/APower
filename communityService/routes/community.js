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
    })
});

router.post('/communityCreator', function(req,res){
    var Community = community.community;

    Community.findOne({'communityName' : req.body.communityName}, function(err,result){
        if(result)
            res.send(result.creatorId); //@redo when merge
        else
            res.send('community does not exsits');
    });
});

router.post('/communityMemberList', function(req,res){
    var Community = community.community;

    Community.findOne({'communityName' : req.body.communityName}, function(err,result){
        if(result)
            res.send(result.memberIdList); //@redo when merge
        else
            res.send('community does not exsits');
    });
})

router.post('/communityAdminList', function(req,res){
    var Community = community.community;

    Community.findOne({'communityName' : req.body.communityName}, function(err,result){
        if(result)
            res.send(result.adminIdList); //@redo when merge
        else
            res.send('community does not exsits');
    });
})

router.get('/communityList', function(req,res){
    var Community = community.community;

    var resultArray = [];
    Community.find({}, function(err,result){
        if(result){
            for(var i=0; i<result.length; i++){
                resultArray.push(result[i].communityName);
            }
            res.send(resultArray);
        }
        else
            res.send('no community exsits');
    })
});

module.exports = router;
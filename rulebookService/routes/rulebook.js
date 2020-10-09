const express = require('express');
const upload = require('express-fileupload');
const rulebook = require('../model/rulebook');

var router = express.Router();

router.get('/', function(req,res){
    res.sendFile(__dirname  + '/upload.html');
});

router.post('/', function(req,res){
    var Rulebook = rulebook.rulebook;
    var communityId = "1234";

    Rulebook.exists({'communityId' : communityId}, function(err, result){
        if(result)
            res.send('community already exists');
        else{
            if(req.files){
                if(req.files.file.name.endsWith(".pdf")){
                    var r = {
                        name : req.files.file.name,
                        data : req.files.file.data,
                        encoding : req.files.file.encoding,
                        size : req.files.file.size
                    }
                    rulebook.create_Rulebook(communityId, r);
                }
            }
            else
                rulebook.create_Rulebook(communityId, null);

            res.send('rulebook create success');
        }
    });
});

router.post('/create', function(req,res){
    var Rulebook = rulebook.rulebook;
    var communityId = "1234";

    Rulebook.exists({'communityId' : communityId}, function(err, result){
        if(result)
            res.send('community already exists');
        else{
            if(req.files){
                if(req.files.file.name.endsWith(".pdf")){
                    var r = {
                        name : req.files.file.name,
                        data : req.files.file.data,
                        encoding : req.files.file.encoding,
                        size : req.files.file.size
                    }
                    rulebook.create_Rulebook(communityId, r);
                }
            }
            else
                rulebook.create_Rulebook(communityId, null);

            res.send('rulebook create success');
        }
    });
});

router.post('/uploadRulebook', function(req,res){
    var Rulebook = rulebook.rulebook;

    Rulebook.exists({'communityId' : req.body.communityId}, function(err, result){
        if(result){
            //todo add to database
            res.send('rulebook change success');
        }
        else
            res.send("community deosn't  exists");
    });
})

router.post('/deleteRulebook', function(req,res){
    var Rulebook = rulebook.rulebook;

    Rulebook.exists({'communityId' : req.body.communityId}, function(err, result){
        if(result){
            //todo add to database
            res.send('rulebook delete success');
        }
        else
            res.send("community deosn't  exists");
    });
})

module.exports = router;
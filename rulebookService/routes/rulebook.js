const express = require('express');
const upload = require('express-fileupload');
const rulebook = require('../model/rulebook');

var router = express.Router();

router.get('/', function(req,res){
    console.log(__dirname);
    res.sendFile(__dirname  + '/uploadRulebook.html');
});

router.get('/getRulebook', function(req,res){
    var Rulebook = rulebook.rulebook;

    Rulebook.findOne({'communityId' : req.body.communityId}, function(err, result){
        if(result){
            res.send(result);
        }
        else{
            res.status(400);
            res.send("community deosn't exists");
        }
    })
});

router.post('/create', function(req,res){
    var Rulebook = rulebook.rulebook;

    console.log(req.body.communityId);

    Rulebook.exists({'communityId' : req.body.communityId}, function(err, result){
        if(result){
            res.status(400);
            res.send('community already exists');
        }
        else{
            if(req.files){
                var r;
                if(req.files.file.name.endsWith(".pdf")){
                    r = {
                        name : req.files.file.name,
                        data : req.files.file.data,
                        encoding : req.files.file.encoding,
                        size : req.files.file.size
                    }
                }
            }
            else{
                r = {
                    name : null,
                    data : null,
                    encoding : null,
                    size : null,
                }
            }
                rulebook.create_Rulebook(req.body.communityId, r);
            res.send('rulebook create success');
        }
    });
});

router.post('/uploadRulebook', function(req,res){
    var Rulebook = rulebook.rulebook;

    Rulebook.exists({'communityId' : req.body.communityId}, function(err, result){
        if(result){
            if(req.files){
                if(req.files.file.name.endsWith(".pdf")){
                    var r = {
                        name : req.files.file.name,
                        data : req.files.file.data,
                        encoding : req.files.file.encoding,
                        size : req.files.file.size
                    }
                    rulebook.update_Rulebook(req.body.communityId,r);
                    res.send('rulebook change success');
                }
                else{
                    res.status(400);
                    res.send('rulebook must be a pdf file');
                }
            }
            else{
                res.status(400);
                res.send('Error: no file uploaded');
            }
        }
        else{
            res.status(400);
            res.send("community deosn't  exists");
        }
    });
})

router.post('/deleteRulebook', function(req,res){
    var Rulebook = rulebook.rulebook;

    Rulebook.exists({'communityId' : req.body.communityId}, function(err, result){
        if(result){
            rulebook.delete_Rulebook(req.body.communityId);
            res.send('rulebook delete success');
        }
        else{
            res.status(400);
            res.send("community deosn't  exists");
        }
    });
})

router.post('/renameRulebook', function(req,res){
    var Rulebook = rulebook.rulebook;

    Rulebook.find({'communityId' : req.body.communityId}, function(err, result){
        if(result){
            if(result[0].rulebook.name == null){
                res.status(400);
                res.send('unable to rename, no rulebook exists');
            }
            else{
                rulebook.rename_Rulebook(req.body.communityId, req.body.newRulebookName);
                res.send("rulebook has successfully rename to " + req.body.newRulebookName);
            }
        }
        else{
            res.status(400);
            res.send("community doesn't  exists");
        }
    });
})

module.exports = router;
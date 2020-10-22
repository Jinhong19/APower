const express = require('express');
const upload = require('express-fileupload');
const rulebook = require('../model/rulebook');
const story = require('../model/story');

var router = express.Router();

router.get('/story', function(req,res){
    res.sendFile(__dirname  + '/upload.html');
})

router.post('/uploadStory', function(req,res){
    var Story = story.story;
    var Rulebook = rulebook.rulebook;
    
    Rulebook.exists({'_id':req.body.rulebookId}, function(err, result){
        if(result){
            if(req.files){
                if(req.files.file.name.endsWith(".pdf")){
                    var r = {
                        name : req.files.file.name,
                        data : req.files.file.data,
                        encoding : req.files.file.encoding,
                        size : req.files.file.size
                    }
                    //Todo add to db
                    //rulebook.update_Rulebook(communityId,r);
                    res.send('Story upload success');
                }
                else
                    res.send('Story must be a pdf file');
            }
            else
                res.send('Error: no file uploaded');
        }
        else
            res.send("community deosn't  exists");
    })
})

router.post('/deleteStory', function(req,res){
    var Story = story.story;
    var Rulebook = rulebook.rulebook;
    
    Story.exists({'rulebookId':req.body.rulebookId , 'stroyName':req.body.stroyName}, function(err, result){
        if(result){
            //Tdo add to db
            res.send('Story delete success')
        }
        else
            res.send('unable to delete story')
    })
})

router.post('/renameStory', function(req,res){
    var Story = story.story;
    Story.exists({'rulebookId':req.body.rulebookId , 'stroyName':req.body.stroyName}, function(err, result){
        if(result){
            //Tdo add to db
            res.send('Story rename success')
        }
        else
            res.send('unable to delete story')
    })
})

module.exports = router;
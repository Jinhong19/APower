const express = require('express');
const upload = require('express-fileupload');
const rulebook = require('../model/rulebook');
const story = require('../model/story');

var router = express.Router();

router.get('/story', function(req,res){
    res.sendFile(__dirname  + '/uploadStory.html');
})

router.post('/uploadStory', function(req,res){
    var Story = story.story;
    var Rulebook = rulebook.rulebook;

    console.log(req.body.rulebookId);
    //req.body.rulebookId = "5f912feba248c72158fd6ed8"
    //req.body.storyName = "123456"

    console.log(req.body.rulebookId);
    
    Rulebook.exists({'_id':req.body.rulebookId}, function(err, result){
        if(result){
            if(req.files){
                if(req.files.file.name.endsWith(".pdf")){
                    Story.exists({'rulebookId':req.body.rulebookId , 'storyName':req.body.storyName}, function(err, result){
                        if (result){
                            res.status(400);
                            res.send('Story already exists');
                        }
                        else{
                            var r = {
                                name : req.files.file.name,
                                data : req.files.file.data,
                                encoding : req.files.file.encoding,
                                size : req.files.file.size
                            }
                            story.create_Story(req.body.rulebookId,r,req.body.storyName);
                            res.send('Story upload success');
                        }
                    })
                }
                else{
                    res.status(400);
                    res.send('Story must be a pdf file');
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
    })
})

router.post('/deleteStory', function(req,res){
    var Story = story.story;
    var Rulebook = rulebook.rulebook;
    
    Story.findOne({'rulebookId':req.body.rulebookId , 'storyName':req.body.storyName}, function(err, result){
        if(result){
            story.delete_Story(req.body.rulebookId, result._id);
            res.send('Story delete success');
        }
        else{
            res.status(400);
            res.send('unable to delete story');
        }
    })
})

router.post('/renameStory', function(req,res){
    var Story = story.story;

    if(req.body.stroyName == req.body.newName)
        res.send("new story name must be different than the old story name");

    Story.exists({'rulebookId':req.body.rulebookId , 'storyName':req.body.newName}, function(err, result){
        if(result){
            res.status(400);
            res.send('new story name already exists')
        }
        else{
            Story.find({'rulebookId':req.body.rulebookId , 'storyName':req.body.storyName}, function(err, result){
                if(result.length > 0){
                    story.rename_Story(result[0]._id, req.body.newName);
                    res.send('Story rename success');
                }
                else{
                    res.status(400);
                    res.send('story does not exists');
                }
            })
        }
    })
})

router.get('/allStoryId', function(req,res){
    var Story = story.story;

    Story.find({'rulebookId':req.body.rulebookId}, function(err, result){
        if(result){
            r = [];
            for( var i in result){
                r.push(result[i]._id);
            }
            res.status(200).send({"storyIdList":r});
        }
        else{
            res.status(400).send("rulebook doesn't exstis");
        }
    })
})

router.get('/storyById', function(req,res){
    var Story = story.story;
    storyId = "";

    if(req.query.storyId == undefined){
        storyId = req.body.storyId;
    }
    else{
        storyId = req.query.storyId;
    }

    Story.findOne({'_id':storyId}, function(err, result){
        if(result){
            console.log(result);
            res.status(200).send({"storyName":result.storyName, "story":result.story});
        }
        else{
            res.status(400).send("story doesn't exstis");
        }
    })
})

module.exports = router;
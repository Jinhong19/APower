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

    req.body.rulebookId = "5f912feba248c72158fd6ed8"
    req.body.storyName = "123456"

    console.log(req.body.rulebookId);
    
    Rulebook.exists({'_id':req.body.rulebookId}, function(err, result){
        if(result){
            if(req.files){
                if(req.files.file.name.endsWith(".pdf")){
                    Story.exists({'rulebookId':req.body.rulebookId , 'storyName':req.body.storyName}, function(err, result){
                        if (result)
                            res.send('Story already exists');
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
    
    Story.exists({'rulebookId':req.body.rulebookId , 'storyName':req.body.stroyName}, function(err, result){
        if(result){
            story.delete_Story(req.body.rulebookId, req.body.stroyName);
            res.send('Story delete success');
        }
        else
            res.send('unable to delete story');
    })
})

router.post('/renameStory', function(req,res){
    var Story = story.story;

    if(req.body.stroyName == req.body.newName)
        res.send("new story name must be different than the old story name");

    Story.exists({'rulebookId':req.body.rulebookId , 'storyName':req.body.newName}, function(err, result){
        if(result)
            res.send('new story name already exists')
        else{
            Story.find({'rulebookId':req.body.rulebookId , 'storyName':req.body.storyName}, function(err, result){
                if(result.length > 0){
                    story.rename_Story(result[0]._id, req.body.newName);
                    res.send('Story rename success');
                }
                else
                    res.send('story does not exists');
            })
        }
    })
})

module.exports = router;
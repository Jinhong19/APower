const express = require('express');
const skill = require('../model/skill');
const rulebook = require('../model/rulebook');

var router = express.Router();

router.post('/addSkill', function(req,res){
    var Skill = skill.skill;
    var Rulebook = rulebook.rulebook;

    var error = "";
    if(req.body.rulebookId == undefined)
        error = error.concat("rulebookId cannot be undefine\n");
    if(typeof req.body.rulebookId != 'string')
        error = error.concat("rulebookId must be string\n");

    if(req.body.skillName == undefined)
        error = error.concat("skill name cannot be undefine\n");
    if(typeof req.body.skillName != 'string')
        error = error.concat("skill name must be string\n");

    if(req.body.description == undefined)
        error = error.concat("description cannot be undefine\n");
    if(typeof req.body.description != 'string')
        error = error.concat("description must be string\n");

    if(req.body.initialSuccessRate == undefined)
        error = error.concat("initialSuccessRate cannot be undefine\n");
    if(typeof req.body.initialSuccessRate != 'number')
        error = error.concat("initialSuccessRate must be number\n");

    if(error != ""){
        res.status(400);
        res.send(error);
    }
    else{
        Rulebook.exists({'_id':req.body.rulebookId}, function(err, result){
            if(result){
                Skill.exists({'rulebookId':req.body.rulebookId}, function(err, result){
                    if(result){
                        Skill.exists({'rulebookId':req.body.rulebookId, 'skillList.name':req.body.skillName}, function(err, result){
                            if(result){
                                res.status(400);
                                res.send('skill already exists');
                            }
                            else{
                                skill.add_Skill(req.body.rulebookId, req.body.skillName, req.body.description, req.body.initialSuccessRate);
                                res.send('skill added');
                            }
                        })
                    }
                    else{
                        skill.create(req.body.rulebookId, req.body.skillName, req.body.description, req.body.initialSuccessRate);
                        res.send('skill template create success');
                    }
                })
            }
            else{
                res.status(400);
                res.send('rulebook does not exists');
            }
        })
    }
})

router.post('/removeSkill', function(req,res){
    var Skill = skill.skill;

    Skill.exists({'rulebookId':req.body.rulebookId}, function(err, result){
        if(result){
            skill.remove_Skill(req.body.rulebookId, req.body.skillName);
            res.send('skill remove success');
        }
        else{
            res.status(400);
            res.send("skill template doesn't exists");
        }
    })

})

router.post('/deleteSkillTemp', function(req,res){
    var Skill = skill.skill;

    Skill.exists({'rulebookId':req.body.rulebookId}, function(err, result){
        if(result){
            skill.delete_Skill(req.body.rulebookId);
            res.send('skill template delete success');
        }
        else{
            res.status(400);
            res.send("skill template doesn't exists");
        }
    })
})

router.get('/allSkill', function(req,res){
    var Skill = skill.skill;

    rulebookId = "";

    if(req.query.rulebookId == undefined){
        rulebookId = req.body.rulebookId;
    }
    else{
        rulebookId = req.query.rulebookId;
    }

    Skill.findOne({"rulebookId":rulebookId}, function(err, result){
        if(result){
            console.log("aaaaaaaaaaaaaaaaaaaaa");
            res.status(200).send(result.skillList);
        }
        else{
            res.status(400).send("skill list doesn't exists");
        }
    });
})

module.exports = router;
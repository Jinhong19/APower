const db = require("../db");
const { models, modelNames } = require("mongoose");
const rulebook = require('../model/rulebook');

const Schema = db.Schema;
const skillSchema = new Schema({
    rulebookId: {type:String, require:true},
    skinList:[{
            name:{type:String, require:true},
            description:{type:String, require:true},
            initialSuccessRate:{type:Number, require:true},
    }] 
}, {
});

async function create(rulebookId,skillName,description,initialSuccessRate){
    const Skill = db.model('Skill', skillSchema);

    const s = new Skill({
        rulebookId : rulebookId,
        skinList : [{
                name : skillName,
                description : description,
                initialSuccessRate : initialSuccessRate
        }]
    });

    await s.save(function (err,result){
        if (err) return handleError(err);
    })
}

async function addSkill(rulebookId,skillName,description,initialSuccessRate){
    const Skill = db.model('Skill', skillSchema);

    var s = {
        name : skillName,
        description : description,
        initialSuccessRate : initialSuccessRate
    }

    Skill.findOneAndUpdate({'rulebookId':rulebookId}, {$push : {'skinList':s}}, await function(err, result){
        if (err) return handleError(err);
        else return 'sucess';
    })
}

async function removeSkill(rulebookId,skillName){
    const Skill = db.model('Skill', skillSchema);

    Skill.findOneAndUpdate({'rulebookId':rulebookId}, {$pull : {'skinList':{'name':skillName}}}, await function(err, result){
        if (err) return handleError(err);
        else return 'sucess';
    })
}

async function deleteSkill(rulebookId){
    const Skill = db.model('Skill', skillSchema);

    Skill.findOneAndDelete({'rulebookId':rulebookId}, await function(err, result){
        if (err) return handleError(err);
        else return 'sucess';
    })
}

module.exports.skill = db.model('Skill', skillSchema);
module.exports.create = create;
module.exports.add_Skill = addSkill;
module.exports.remove_Skill = removeSkill;
module.exports.delete_Skill = deleteSkill;
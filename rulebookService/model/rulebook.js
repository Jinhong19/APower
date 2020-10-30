const { models, modelNames } = require("mongoose");
const db = require("../db");

const Schema = db.Schema;
const rulebookSchema = new Schema({
    communityId: {type:String, require:true},
    rulebook: {
        name : {type:String, require:true},
        data : {type:Buffer, require:true},
        encoding : {type:String, require:true},
        size: {type:Number, require:true}
    },
    storyIdList: [{type:String, require:true}]
}, {
});

async function createRulebook(communityId, newRulebook){
    const Rulebook = db.model('Rulebook', rulebookSchema);

    const rulebook = new Rulebook({
        communityId: communityId,
        rulebook : newRulebook,
        storyIdList: []
    });

    await rulebook.save(function (err){
        if (err) return handleError(err);
    })
}

async function deleteRulebook(communityId){
    const Rulebook = db.model('Rulebook', rulebookSchema);

    Rulebook.deleteOne({'communityId':communityId}, await function(err){
        if (err) return handleError(err);
        else return 'sucess';
    })
}

async function updateRulebook(communityId,newRulebook){
    const Rulebook = db.model('Rulebook', rulebookSchema);

    Rulebook.findOneAndUpdate({'communityId':communityId}, {'rulebook':newRulebook}, await function (err, suceess){
        if (err) return handleError(err);
        else return 'success';
    })
}

async function renameRulebook(communityId,newName){
    const Rulebook = db.model('Rulebook', rulebookSchema);

    Rulebook.findOneAndUpdate({'communityId':communityId}, {'rulebook.name':newName}, await function (err, suceess){
        if (err) return handleError(err);
        else return 'success';
    })
}

async function addStory(rulebookId,storyId){
    const Rulebook = db.model('Rulebook', rulebookSchema);
    Rulebook.findOneAndUpdate({'_id':rulebookId}, {$push : {'storyIdList':storyId}}, await function (err, suceess){
        if (err) return handleError(err);
        else return 'success';
    })
}

async function removeStory(rulebookId,storyId){
    const Rulebook = db.model('Rulebook', rulebookSchema);
    Rulebook.findOneAndUpdate({'_id':rulebookId}, {$pull : {'storyIdList':storyId}}, await function (err, suceess){
        if (err) return handleError(err);
        else return 'success';
    })
}


module.exports.rulebook = db.model('Rulebook', rulebookSchema);
module.exports.create_Rulebook = createRulebook;
module.exports.delete_Rulebook = deleteRulebook;
module.exports.update_Rulebook = updateRulebook;
module.exports.rename_Rulebook = renameRulebook;
module.exports.add_Story = addStory;
module.exports.remove_Story = removeStory;

const { models, modelNames } = require("mongoose");
const db = require("../db");
const rulebook = require('../model/rulebook');

const Schema = db.Schema;
const storySchema = new Schema({
    storyName: {type:String, require:true},
    story: {
        name : {type:String, require:true},
        data : {type:Buffer, require:true},
        encoding : {type:String, require:true},
        size: {type:Number, require:true}
    },
    rulebookId: {type:String, require:true}
}, {
});

async function createStory(rulebookId,story,storyName){
    const Story = db.model('Story', storySchema);
    const Rulebook = rulebook.rulebook;

    const s = new Story({
        rulebookId : rulebookId,
        story : story,
        storyName: storyName
    });

    await s.save(function (err,result){
        rulebook.add_Story(rulebookId,result._id);
        if (err) return handleError(err);
    })
}


async function deleteStory(rulebookId,storyId){
    const Story = db.model('Story', storySchema);
    const Rulebook = rulebook.rulebook;

    Story.deleteOne({'_id':storyId}, await function(err){
        if (err) return handleError(err);
        else return 'sucess';
    })

    rulebook.remove_Story(rulebookId,storyId);
}

async function renameStory(storyId,newName){
    const Story = db.model('Story', storySchema);

    console.log(storyId)
    console.log(newName)

    Story.findByIdAndUpdate(storyId, {'storyName':newName}, await function(err){
        if (err) return handleError(err);
        else return 'sucess';
    })
}

module.exports.story = db.model('Story', storySchema);
module.exports.create_Story = createStory;
module.exports.delete_Story = deleteStory;
module.exports.rename_Story = renameStory;
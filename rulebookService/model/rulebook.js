const db = require("../db");

const Schema = db.Schema;
const rulebookSchema = new Schema({
    communityId: {type:String, require:true},
    rulebook: {
        name : {type:String, require:true},
        data : {type:Buffer, require:true},
        encoding : {type:String, require:true},
        size: {type:Number, require:true}
    }
}, {
});

async function createRulebook(communityId, newRulebook){
    const Rulebook = db.model('Rulebook', rulebookSchema);

    const rulebook = new Rulebook({
        communityId: communityId,
        rulebook : newRulebook
    });

    await rulebook.save(function (err){
        if (err) return handleError(err);
    })
}

module.exports.rulebook = db.model('Rulebook', rulebookSchema);
module.exports.create_Rulebook = createRulebook;

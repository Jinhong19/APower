const { model, models } = require("mongoose");
const db = require("../db");

const Schema = db.Schema;
const storySchema = new Schema({
    storyName: {type:String, require:true},
    story: {
        name : {type:String, require:true},
        data : {type:Buffer, require:true},
        encoding : {type:String, require:true},
        size: {type:Number, require:true}
    },
    ruleBookId: {type:String, require:true}
}, {
});

module.exports.story = db.model('Story', storySchema);
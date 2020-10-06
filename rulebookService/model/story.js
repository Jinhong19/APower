const db = require("../db");

const Schema = db.Schema;
const storySchema = new Schema({
    stroyName: {type:String, require:true},
    rulebookId: {type:String, require:true}
}, {
});
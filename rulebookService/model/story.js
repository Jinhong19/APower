const db = require("../db");

const Schema = db.Schema;
const storySchema = new Schema({
    stroyName: {type:String, require:true},
    sotry: {
        name : {type:String, require:true},
        data : {type:Buffer, require:true},
        encoding : {type:String, require:true},
        size: {type:Number, require:true}
    }
}, {
});
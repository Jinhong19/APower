const db = require("../db");

const Schema = db.Schema;
const skillSchema = new Schema({
    communityId: {type:String, require:true},
    rulebook: {type:String, require:true}
}, {
});
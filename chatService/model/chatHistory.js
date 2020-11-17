const { callbackify } = require("util");
const db = require("../db");

const Schema = db.Schema;
const historySchema = new Schema({
    roomName: {type:String, require:true},
    chat: [{
        username:{type:String, require:true},
        message:{type:String, require:true},
        time:{type:String, require:true}
    }]
});

async function createHistory(roomName, callback){
    const History = db.model('History', historySchema);
    
    const history = new History({
        roomName:roomName,
        chat:[]
    });

    var id = "";

    await history.save(async function (err, result){
        console.log(result._id);
        if (err) callback("error", err);
        else callback(null,result);
    })
}

async function addHistory(roomName,message){
    const History = db.model('History', historySchema);

    History.findOneAndUpdate({'roomName' : roomName},{  $push: {"chat":message}}, await function (err, success){
        console.log(roomName);
        console.log(message);
        if (err) return handleError(err);
        else return 'success';
    });
}

async function deleteHistory(roomName){
    const History = db.model('History', historySchema);

    History.deleteOne({'roomName' : roomName}, await function(err){
        if (err) return handleError(err);
        else return 'success';
    });
}

module.exports.history = db.model('History',historySchema);
module.exports.create_History = createHistory;
module.exports.add_History = addHistory;
module.exports.delete_History = deleteHistory;
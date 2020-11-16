const { models, modelNames } = require("mongoose");
const db = require("../db");

const Schema = db.Schema;
const storyRoomSchema = new Schema({
    storyId:{type:String, require:true},
    rulebookId:{type:String, require:true},
    password:{type:String, require:true},
    chatHistoryId:{type:String, require:true},
    hostId:{type:String, require:true},
    maxMember:{type:Number, require:true}
})

async function createStoryRoom(hostId,password,storyId,chatHistoryId,rulebookId){
    const Storyroom = db.model('Storyroom', storyRoomSchema);

    const storyRoom = new Storyroom({
        storyId:storyId,
        password:password,
        hostId:hostId,
        chatHistoryId:chatHistoryId,
        rulebookId:rulebookId
    })
    console.log("aaaaaaaaaaaaaaa");

    await storyRoom.save(function (err){
        if (err) return handleError(err);
    })
}

async function deleteStoryRoom(password){
    const Storyroom = db.model('Storyroom', storyRoomSchema);

    if(password){
        Storyroom.deleteOne({"password":password}, function (err){
            if (err) handleError(err);
            else return 'success';
        })
    }
}

module.exports.storyRoom = db.model('Storyroom', storyRoomSchema);
module.exports.create_Storyroom = createStoryRoom;
module.exports.delete_Storyroom = deleteStoryRoom;


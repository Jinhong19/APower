const { models, modelNames } = require("mongoose");
const db = require("../db");

const Schema = db.Schema;
const storyRoomSchema = new Schema({
    storyId:{type:String, require:true},
    rulebookId:{type:String, require:true},
    password:{type:String, require:true},
    chatHistoryId:{type:String, require:true},
    hostId:{type:String, require:true},
    maxMember:{type:Number, require:true},
    playerIdList:[
        {type:String, require:true}
    ]
})

async function createStoryRoom(hostId,password,storyId,chatHistoryId,rulebookId,maxMember){
    const Storyroom = db.model('Storyroom', storyRoomSchema);

    const storyRoom = new Storyroom({
        storyId:storyId,
        password:password,
        hostId:hostId,
        chatHistoryId:chatHistoryId,
        rulebookId:rulebookId,
        maxMember:maxMember,
        playerIdList:[]
    })

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

async function addPlayerToRoom(password,playerId){
    const Storyroom = db.model('Storyroom', storyRoomSchema);

    Storyroom.findOneAndUpdate({"password":password}, {  $push: {'playerIdList' : playerId} }, await function (err, success){
        if (err) return handleError(err);
        else return 'success';
    });
}

async function kickPlayerFromRoom(password,playerId){
    const Storyroom = db.model('Storyroom', storyRoomSchema);

    Storyroom.findOneAndUpdate({"password":password}, {  $pull: {'playerIdList' : playerId} }, await function (err, success){
        if (err) return handleError(err);
        else return 'success';
    });
}

async function assignHost(password,newHostId){
    const Storyroom = db.model('Storyroom', storyRoomSchema);

    Storyroom.exists({"password":password, "playerIdList":newHostId}, await function (err, result){
        if(result){
            kickPlayerFromRoom(password,newHostId);
        }
        Storyroom.findOneAndUpdate({'password' : password},{'hostId' : newHostId}, function (err, success){
            if (err) return handleError(err);
            else return 'success';
        });
    });
}

module.exports.storyRoom = db.model('Storyroom', storyRoomSchema);
module.exports.create_Storyroom = createStoryRoom;
module.exports.delete_Storyroom = deleteStoryRoom;
module.exports.add_Player_To_Room = addPlayerToRoom;
module.exports.kick_Player_From_Room = kickPlayerFromRoom;
module.exports.assign_Host = assignHost;


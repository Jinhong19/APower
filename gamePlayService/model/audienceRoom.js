const { models, modelNames } = require("mongoose");
const db = require("../db");

const Schema = db.Schema;
const audienceRoomSchema = new Schema({
    password:{type:String, require:true},
    chatHistoryId:{type:String, require:true},
})

async function createAudienceRoom(password,chatHistoryId){
    const Audienceroom = db.model('AudienceRoom', audienceRoomSchema);

    const audienceRoom = new Audienceroom({
        password:password,
        chatHistoryId:chatHistoryId
    })

    await audienceRoom.save(function (err){
        if (err) return handleError(err);
    })
}

async function deleteAudienceRoom(password){
    const Audienceroom = db.model('AudienceRoom', audienceRoomSchema);

    if(password){
        Audienceroom.deleteOne({"password":password}, function (err){
            if (err) handleError(err);
            else return 'success';
        })
    }
}

module.exports.audienceRoom = db.model('AudienceRoom', audienceRoomSchema);
module.exports.create_Audience_Room = createAudienceRoom;
module.exports.delete_Audience_Room = deleteAudienceRoom;
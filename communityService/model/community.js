const db = require("../db");

const Schema = db.Schema;
const communitySchema = new Schema({
    communityName: {type:String, require:true},
    creatorId: {type:String, require:true},
    detail: {type:String, default: 'This community owner is lazy.'},
    isPublic: {type:Boolean, require:true},
    memberIdList: [{type:String}],
    adminIdList: [{type:String}],
    rulebook: {type:String},
}, {
});

async function assignMember(communityName,userId){
    const Community = db.model('Community',communitySchema);
    Community.findOneAndUpdate({'communityName' : communityName},{  $push: {'memberIdList' : userId} }, await function (err, success){
        if (err) return handleError(err);
        else return 'success';
    });
}

async function assignAdmin(communityName,userId){
    const Community = db.model('Community',communitySchema);
    Community.findOneAndUpdate({'communityName' : communityName},{  $push: {'adminIdList' : userId} }, await function (err, success){
        if (err) return handleError(err);
        else return 'success';
    });
}

async function removeMember(communityName, userId){
    const Community = db.model('Community',communitySchema);
    Community.findOneAndUpdate({'communityName' : communityName},{  $pull: {'memberIdList' : userId} }, await function (err, success){
        if (err) return handleError(err);
        else return 'success';
    });
}

async function removeAdmin(communityName, userId){
    const Community = db.model('Community',communitySchema);
    Community.findOneAndUpdate({'communityName' : communityName},{  $pull: {'adminIdList' : userId} }, await function (err, success){
        if (err) return handleError(err);
        else return 'success';
    });
}

async function assignCreator(communityName, userId){
    const Community = db.model('Community',communitySchema);
    Community.findOneAndUpdate({'communityName' : communityName},{'creatorId' : userId}, await function (err, success){
        if (err) return handleError(err);
        else return 'success';
    });
}

async function deleteCommunity(communityName){
    const Community = db.model('Community',communitySchema);
    Community.deleteOne({'communityName' : communityName}, await function(err){
        if (err) return handleError(err);
        else return 'success';
    });
}

async function createCommunity(name, creator, detail, public, rulebook){
    const Community = db.model('Community',communitySchema);

    // create and add to db
    const communty = new Community({
        communityName:name,
        creatorId:creator,
        detail:detail,
        isPublic:public,
        memberIdList:[creator],
        adminIdList:[],
        rulebook:rulebook,
    });

    await communty.save(function (err){
        if (err) return handleError(err);
    });

   return ("community: " + name + " created");
}

async function joinCommunity(communityName,userId){
    assignMember(communityName, userId);
}

async function quitCommunity(communityName,userId){
    removeMember(communityName,userId);
    removeAdmin(communityName,userId);
}

async function changeCreator(communityName,userId){
    removeAdmin(communityName,userId);
    assignCreator(communityName,userId);
}


module.exports.community = db.model('Community',communitySchema);
module.exports.create_Community = createCommunity;
module.exports.join_Community = joinCommunity;
module.exports.quit_Community = quitCommunity;
module.exports.assign_Admin = assignAdmin;
module.exports.delete_Community = deleteCommunity;
module.exports.assign_Creator = assignCreator;
module.exports.remove_Admin = removeAdmin;
module.exports.change_Creator = changeCreator;
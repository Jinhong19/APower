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
    Community.findOneAndUpdate({'communityName' : communityName},{  $push: {'memberIdList' : userId} }, await function (err, success){
        if (err) return handleError(err);
        else return 'success';
    });
}

async function assignAdmin(communityName,userId){
    Community.findOneAndUpdate({'communityName' : communityName},{  $push: {'adminIdList' : userId} }, await function (err, success){
        if (err) return handleError(err);
        else return 'success';
    });
}

async function removeMember(communityName, userId){
    Community.findOneAndUpdate({'communityName' : communityName},{  $pull: {'memberIdList' : userId} }, await function (err, success){
        if (err) return handleError(err);
        else return 'success';
    });
}

async function removeAdmin(communityName, userId){
    Community.findOneAndUpdate({'communityName' : communityName},{  $pull: {'adminIdList' : userId} }, await function (err, success){
        if (err) return handleError(err);
        else return 'success';
    });
}

async function assignCreator(communityName, userId){
    Community.findOneAndUpdate({'communityName' : communityName},{'creatorId' : userId}, await function (err, success){
        if (err) return handleError(err);
        else return 'success';
    });
}

async function deleteCommunity(communityName){
    Community.deleteOne({'communityName' : communityName}, function(err){
        if (err) return handleError(err);
        else return 'success';
    })
}

async function createCommunity(name, creator, detail, public, rulebook){
    const Community = db.model('Community',communitySchema);

    // check if community name already in use
    await Community.exists({name : name}, function (err, result){ 
        console.log(result); 
        if (result) return "Community name already been used";
    })

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
    const Community = db.model('Community',communitySchema);

    removeMember(communityName,userId);
    removeAdmin(communityName,userId);
}

async function assignAdmins(communityName,userId){
    assignAdmin(communityName,userId);
}

module.exports.community = db.model('Community',communitySchema);
module.exports.create_Community = createCommunity;
module.exports.join_Community = joinCommunity;
module.exports.quit_Community = quitCommunity;
module.exports.assign_Admin = assignAdmins;
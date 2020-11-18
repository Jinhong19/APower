const db = require("../db");

const Schema = db.Schema;
const userListSchema = new Schema({
    password:{type:String,require:true},
    user:[]
});

async function createList(password){
    const AudienceList = db.model('UserList', userListSchema);
    
    const audienceList = new AudienceList({
        password:password,
        user:[]
    });

    await audienceList.save(async function (err, result){
        console.log(result._id);
        if (err) callback("error", err);
        return "success";
    })
}

async function deleteList(password){
    const AudienceList = db.model('UserList', userListSchema);

    AudienceList.deleteOne({'password' : password}, await function(err){
        if (err) return handleError(err);
        else return 'success';
    });
}

async function addUser(password,username,callback){
    const AudienceList = db.model('UserList', userListSchema);

    AudienceList.findOneAndUpdate({'password' : password},{  $push: {"user":username}}, await function (err, success){
        if (err) console.log(err);
        else callback();
    });
}

async function removeUser(password,username,callback){
    const AudienceList = db.model('UserList', userListSchema);
    console.log("aaaaaaaaaaaaaaaaaaaaaa");
    console.log(username);

    AudienceList.findOneAndUpdate({'password' : password},{  $pull: {"user":username}}, await function (err, success){
        if (err) console.log(err);
        else callback();
    });
}



module.exports.audienceList = db.model('UserList',userListSchema);
module.exports.create_List = createList;
module.exports.delete_List = deleteList;
module.exports.add_User = addUser;
module.exports.remove_User = removeUser;
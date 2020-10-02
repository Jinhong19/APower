const db = require("../db");

const Schema = db.Schema;
const communitySchema = new Schema({
    Name: {type:String, require:true},
    creator: {type:Number, require:true},
    detail: {type:String, default: 'This community owner is lazy.'},
    public: {type:Boolean, require:true},
    members: [{type:Number}],
    rulebook: {type:Number},
    numberOfMembers: {type:Number}
}, {
});

function createCommunity(name, creator, detail, public, members, rulebook){
    const Community = db.model('Community',communitySchema);

    // check if community name already in use
    Community.findOne({'name' : name}, function (err, community){  
        if (err) return "Community name already been used";
    })

    // if not in use, create and add to db
    Community.create({
        name:name,
        creator:creator,
        detail:detail,
        public:public,
        members:[],
        rulebook:rulebook,
        numberOfMembers:1
    }, function (err, community){
        if (err) return handleError(err);
    });

    console.log("community: " + name + " created");
}

module.exports.community = db.model('Community',communitySchema);
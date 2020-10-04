const db = require("../db");

const Schema = db.Schema;
const communitySchema = new Schema(
  {
    communityName: { type: String, require: true },
    creatorId: { type: String, require: true },
    detail: { type: String, default: "This community owner is lazy." },
    isPublic: { type: Boolean, require: true },
    memberIdList: [{ type: String }],
    adminIdList: [{ type: String }],
    rulebook: { type: String },
  },
  {}
);

async function createCommunity(name, creator, detail, public, rulebook) {
  const Community = db.model("Community", communitySchema);

  // check if community name already in use
  await Community.exists({ name: name }, function (err, result) {
    console.log(result);
    if (result) return "Community name already been used";
    else console.log("caaaaaaa");
  });

  // if not in use, create and add to db
  await Community.create(
    {
      communityName: name,
      creatorId: creator,
      detail: detail,
      isPublic: public,
      memberIdList: [creator],
      adminIdList: [],
      rulebook: rulebook,
    },
    function (err, community) {
      if (err) return handleError(err);
    }
  );

  return "community: " + name + " created";
}

async function joinCommunity(communityName, userName) {}

module.exports.community = db.model("Community", communitySchema);
module.exports.create_Community = createCommunity;
module.exports.join_Community = joinCommunity;

const { ObjectId } = require("bson");
const { mongoDB } = require("../../utils/database");

const handleNewGroup = async (req, res) => {
  const db = await mongoDB().db();
  const { _id, participants, modifiedOn, type, desc, createdOn, avatar, name } =
    req.body;

  console.log(req.body);

  if (!_id) {
    return res.sendStatus(404);
  }

  await db.collection("groups").insertOne({
    _id: ObjectId(_id),
    participants: participants.map((participant) => {
      return {
        objectId: ObjectId(participant.objectId),
        lastViewed: participant.lastViewed,
      };
    }),
    modifiedOn,
    type,
    desc,
    createdOn,
    avatar,
    name,
  });

  return res.sendStatus(200);
};

module.exports = { handleNewGroup };

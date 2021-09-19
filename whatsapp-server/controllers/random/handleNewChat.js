const { ObjectId } = require("bson");
const { mongoDB } = require("../../utils/database");

const handleNewChat = async (req, res) => {
  const db = await mongoDB().db();
  const { _id, participants, modifiedOn, type } = req.body;

  console.log(req.body);

  if (!_id) {
    return res.sendStatus(404);
  }

  await db.collection("chats").insertOne({
    _id: ObjectId(_id),
    participants: participants.map((participant) => {
      return {
        objectId: ObjectId(participant.objectId),
        lastViewed: participant.lastViewed,
      };
    }),
    modifiedOn,
    type,
  });

  return res.sendStatus(200);
};

module.exports = { handleNewChat };

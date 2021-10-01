const { ObjectId } = require("bson");
const { mongoDB } = require("../../utils/database");

export const handleNewGroup = async (req: any, res: any) => {
  const db: any = await mongoDB().db();
  const {
    _id,
    participants,
    modifiedOn,
    type,
    desc,
    createdOn,
    avatar,
    name,
  }: any = req.body;

  console.log(req.body);

  if (!_id) {
    return res.sendStatus(404);
  }

  await db.collection("groups").insertOne({
    _id: ObjectId(_id),
    participants: participants.map((participant: any) => {
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

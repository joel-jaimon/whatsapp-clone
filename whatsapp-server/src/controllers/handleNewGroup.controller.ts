import { ObjectId } from "bson";
import { mongoDB } from "../database/mongoInstance";

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
    _id: new ObjectId(_id),
    participants: participants.map((participant: any) => {
      return {
        objectId: new ObjectId(participant.objectId),
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

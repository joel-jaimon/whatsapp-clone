import { ObjectId } from "bson";
import { mongoDB } from "../database/mongoInstance";

export const handleNewChat = async (req: any, res: any) => {
  const db = await mongoDB().db();
  const { _id, participants, modifiedOn, type } = req.body;

  console.log(req.body);

  if (!_id) {
    return res.sendStatus(404);
  }

  await db.collection("chats").insertOne({
    _id: new ObjectId(_id),
    participants: participants.map((participant: any) => {
      return {
        objectId: new ObjectId(participant.objectId),
        lastViewed: participant.lastViewed,
      };
    }),
    modifiedOn,
    type,
  });

  return res.sendStatus(200);
};

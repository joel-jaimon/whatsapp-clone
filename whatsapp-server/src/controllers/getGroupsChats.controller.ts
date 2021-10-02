import { ObjectID } from "bson";
import { mongoDB } from "../database/mongoInstance";

// Get total chats and groups in database
export const getGroupsChats = async (req: any, res: any) => {
  try {
    const db: any = await mongoDB().db();
    const chats: any = await db
      .collection("chats")
      .find({
        participants: {
          $elemMatch: {
            objectId: new ObjectID(req.payload._id),
          },
        },
      })
      .toArray();
    const groups: any = await db
      .collection("groups")
      .find({
        participants: {
          $elemMatch: {
            objectId: new ObjectID(req.payload._id),
          },
        },
      })
      .toArray();

    const fi: any = [...chats, ...groups].sort(
      (x, y) => x.timestamp - y.timestamp
    );
    return res.status(201).json({
      data: fi,
    });
  } catch (err) {
    console.log(err);
    res.send(404).end();
  }
};

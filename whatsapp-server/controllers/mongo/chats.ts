import { ObjectID } from "bson";
import { mongoDB } from "../../utils/database";

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

// get messages corresponding to a chat or group
export const getMessages = async (req: any, res: any) => {
  try {
    const { refId }: any = req.params;
    const db: any = await mongoDB().db();
    const messages: any = await db
      .collection("messages")
      .find({ refId: new ObjectID(refId) })
      .sort({ timestamp: 1 })
      .toArray();

    return res.status(201).json({
      data: messages,
    });
  } catch (err) {
    console.log(err);
    res.send(404).end();
  }
};

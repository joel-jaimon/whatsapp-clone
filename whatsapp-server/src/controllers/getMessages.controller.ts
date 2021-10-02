import { ObjectID } from "bson";
import { mongoDB } from "../database/mongoInstance";

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

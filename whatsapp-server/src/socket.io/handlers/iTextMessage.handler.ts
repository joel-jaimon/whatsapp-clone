import * as socket from "socket.io";
import { getActiveUserByObjectId } from "../../utils/activeUsers";
import { ObjectId } from "bson";

export const iTextMessage = async (
  io: socket.Server,
  socket: socket.Socket,
  payload: any,
  db: any
) => {
  console.log(payload);
  const { type, msgType, msgParams, refId, timestamp, sentBy, tempId } =
    payload;

  const { participants } = await db.collection(`${type}s`).findOne({
    _id: new ObjectId(refId),
  });

  await db.collection("messages").insertOne(
    {
      type,
      msgType,
      msgParams,
      refId: new ObjectId(refId),
      timestamp,
      sentBy: new ObjectId(sentBy),
    },
    (err: any, data: any) => {
      if (err) {
        throw Error(err);
      }

      for (let i = 0; i < participants.length; i++) {
        if (participants[i].objectId.toString() != sentBy.toString()) {
          const activeFriends = getActiveUserByObjectId(
            participants[i].objectId
          );
          if (activeFriends?.socketId) {
            io.to(activeFriends.socketId).emit("recieveMessage", {
              _id: data._id,
              type,
              msgType,
              msgParams,
              refId: new ObjectId(refId),
              timestamp,
              sentBy: new ObjectId(sentBy),
            });
          }
        }
      }

      return socket.emit("messageSentSuccessfully", {
        tempId: tempId,
        refId,
        _id: data._id,
      });
    }
  );
};

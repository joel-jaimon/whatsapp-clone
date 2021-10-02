import { ObjectID } from "bson";
import * as socket from "socket.io";

export const updateUserProfile = async (
  socket: socket.Socket,
  _id: string,
  payload: any,
  db: any
) => {
  await db.collection("googleAuthUsers").updateOne(
    { _id: new ObjectID(_id) },
    {
      $set: { ...payload },
    }
  );

  return socket.broadcast.emit("onOtherAuthUsersInfoUpdate", {
    objectId: _id,
    ...payload,
  });
};

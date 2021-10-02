import * as socket from "socket.io";
import { removeActiveUserByObjectId } from "../../utils/activeUsers";
import { ObjectID } from "bson";

export const socketDisconnect = async (
  socket: socket.Socket,
  _id: string,
  db: any
) => {
  // timestamp
  const lastSeen = Date.now();

  // update last seen of disconnected user
  await db.collection("googleAuthUsers").updateOne(
    { _id: new ObjectID(_id) },
    {
      $set: { lastSeen },
    }
  );

  // tell others that this user is disconnected
  socket.broadcast.emit("offline", {
    _id,
    lastSeen,
  });

  // remove users frm the active list
  removeActiveUserByObjectId(_id);
  console.log(socket.id, "Disconnected");
};

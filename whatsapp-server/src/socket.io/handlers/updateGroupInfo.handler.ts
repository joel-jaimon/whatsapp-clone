import { ObjectID } from "bson";
import * as socket from "socket.io";
import { getActiveUserByObjectId } from "../../utils/activeUsers";

export const updateGroupInfo = async (
  io: socket.Server,
  _id: string,
  payload: any,
  db: any
) => {
  await db.collection("groups").updateOne(
    { _id: new ObjectID(payload.groupId) },
    {
      $set: { ...payload.updatedParams },
    }
  );

  const { participants } = await db.collection("groups").findOne({
    _id: new ObjectID(payload.groupId),
  });

  for (let i = 0; i < participants.length; i++) {
    if (participants[i].objectId.toString() != _id.toString()) {
      const activeFriends = getActiveUserByObjectId(participants[i].objectId);
      if (activeFriends?.socketId) {
        console.log("Chats updated for ", activeFriends?.objectId);
        io.to(activeFriends.socketId).emit("onGroupInfoUpdate", payload);
      }
    }
  }
  return;
};

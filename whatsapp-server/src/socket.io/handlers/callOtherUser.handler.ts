import * as socket from "socket.io";
import { ObjectId } from "bson";
import { getActiveUserByObjectId } from "../../utils/activeUsers";

export const callOtherUser = async (
  io: socket.Server,
  _id: string,
  db: any,
  payload: any
) => {
  if (payload?.extraParam) {
    const to = getActiveUserByObjectId(payload.extraParam.callTo);
    if (to) {
      io.to(to.socketId).emit("incomingCall", {
        peerId: payload.peerId,
        active: true,
        callBy: payload.callby,
        ...payload.extraParam,
      });
    }
  } else {
    const { participants, name, avatar } = await db
      .collection("groups")
      .findOne({
        _id: new ObjectId(payload.refId),
      });

    for (let i = 0; i < participants.length; i++) {
      if (participants[i].objectId.toString() != _id.toString()) {
        const activeFriends = getActiveUserByObjectId(participants[i].objectId);
        if (activeFriends?.socketId) {
          console.log("Calling ", activeFriends?.objectId);
          io.to(activeFriends.socketId).emit("incomingCall", {
            peerId: payload.peerId,
            active: true,
            callBy: payload.callby,
            displayname: name,
            avatar,
          });
        }
      }
    }
  }
};

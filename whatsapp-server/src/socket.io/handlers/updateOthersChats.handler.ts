import * as socket from "socket.io";
import { getActiveUserByObjectId } from "../../utils/activeUsers";

export const updateOthersChats = (
  io: socket.Server,
  _id: string,
  payload: any
) => {
  const {
    chatInfo: { participants },
  } = payload;
  for (let i = 0; i < participants.length; i++) {
    if (participants[i].objectId.toString() != _id.toString()) {
      const activeFriends = getActiveUserByObjectId(participants[i].objectId);
      if (activeFriends?.socketId) {
        console.log("Chats updated for ", activeFriends?.objectId);
        io.to(activeFriends.socketId).emit("updateExistingChats", {
          ...payload,
        });
      }
    }
  }
};

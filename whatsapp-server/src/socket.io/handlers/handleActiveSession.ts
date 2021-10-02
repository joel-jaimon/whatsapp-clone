import * as socket from "socket.io";
import {
  getActiveUserByObjectId,
  removeActiveUserByObjectId,
  addToActiveUsers,
} from "../../utils/activeUsers";

export const handleActiveSession = (
  io: socket.Server,
  socket: socket.Socket,
  _id: string
) => {
  // // Handle User Active Session
  if (!getActiveUserByObjectId(_id)) {
    console.log("New session!");
    // New Session
    addToActiveUsers({
      socketId: socket.id,
      objectId: _id,
    });
  } else {
    console.log("Prev Disconnected, New session!");
    // Old session removed
    const prevSocketId = getActiveUserByObjectId(_id)?.socketId;
    console.log(prevSocketId, io.sockets.sockets.get(prevSocketId));
    if (io.sockets.sockets.get(prevSocketId)) {
      console.log(prevSocketId + "disconnected");
      io.sockets.sockets.get(prevSocketId).emit("multipleSession");
      io.sockets.sockets.get(prevSocketId).disconnect(true);
    }
    removeActiveUserByObjectId(_id);
    // New session added
    addToActiveUsers({
      socketId: socket.id,
      objectId: _id,
    });
  }
};

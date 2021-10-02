import * as socket from "socket.io";
import { getActiveUserBySocketId } from "../../utils/activeUsers";

export const userOnCall = (socket: socket.Socket, roomId: string) => {
  socket.broadcast
    .to(roomId)
    .emit("other-user-on-call", getActiveUserBySocketId(socket.id).objectId);
};

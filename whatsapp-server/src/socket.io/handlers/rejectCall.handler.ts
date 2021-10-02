import * as socket from "socket.io";
import { getActiveUserBySocketId } from "../../utils/activeUsers";

export const rejectVideoCall = (socket: socket.Socket, roomId: string) => {
  socket.broadcast
    .to(roomId)
    .emit("call-rejected", getActiveUserBySocketId(socket.id).objectId);
};

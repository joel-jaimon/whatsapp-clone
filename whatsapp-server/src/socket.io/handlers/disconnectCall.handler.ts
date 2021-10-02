import * as socket from "socket.io";

export const disconnectVideoCall = (
  socket: socket.Socket,
  roomId: string,
  peerUserId: string
) => {
  socket.broadcast.to(roomId).emit("user-disconnected-from-vc", peerUserId);
};

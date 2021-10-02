import * as socket from "socket.io";

export const joinVideoRoom = async (
  socket: socket.Socket,
  roomId: string,
  peerUserId: string
) => {
  console.log(roomId, peerUserId);
  socket.join(roomId); // Join the room
  socket.broadcast.to(roomId).emit("user-connected-to-vc", peerUserId); // Tell everyone else in the room that we joined

  // Communicate the disconnection
  socket.on("disconnect", () => {
    socket.broadcast.to(roomId).emit("user-disconnected-from-vc", peerUserId);
  });
};

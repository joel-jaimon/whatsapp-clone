import { callOtherUser } from "./handlers/callOtherUser.handler";
import { disconnectVideoCall } from "./handlers/disconnectCall.handler";
import { getTotalUsers } from "./handlers/getTotalUsers.handler";
import { handleActiveSession } from "./handlers/handleActiveSession";
import { initialSocketConfig } from "./handlers/initialVerification";
import { iTextMessage } from "./handlers/iTextMessage.handler";
import { joinVideoRoom } from "./handlers/joinVideoRoom.handler";
import { rejectVideoCall } from "./handlers/rejectCall.handler";
import { socketDisconnect } from "./handlers/socketDisconnect.handler";
import { updateGroupInfo } from "./handlers/updateGroupInfo.handler";
import { updateOthersChats } from "./handlers/updateOthersChats.handler";
import { updateUserProfile } from "./handlers/updateUserProfile.handler";
import { userOnCall } from "./handlers/userOnCall.handler";
// import { switchActiveChat } from "./handlers/switchActiveChat.handler";

export const socketMain = async (io: any, socket: any) => {
  try {
    const { _id, db, userPayload, users } = await initialSocketConfig(
      io,
      socket
    );

    handleActiveSession(io, socket, _id);

    // Signin success state
    socket.emit("signInSuccess", {
      objectId: _id,
      displayName: userPayload.displayName,
      email: userPayload.email,
      avatar: userPayload.avatar,
      createdOn: userPayload.createdOn,
      about: userPayload.about,
      lastSeen: userPayload.lastSeen,
    });

    // call other user
    socket.on("callOtherUser", (payload: any) =>
      callOtherUser(io, _id, db, payload)
    );

    // join user to a video call room
    socket.on("join-vc-room", (roomId: string, peerUserId: string) =>
      joinVideoRoom(socket, roomId, peerUserId)
    );

    // when user ends vc after joining
    socket.on("diconnect-from-call", (roomId: string, peerUserId: string) =>
      disconnectVideoCall(socket, roomId, peerUserId)
    );

    // whien user rejects call
    socket.on("reject-call", (roomId: string) =>
      rejectVideoCall(socket, roomId)
    );

    // when user is already on call
    socket.on("user-on-call", (roomId: string) => userOnCall(socket, roomId));

    // Send users existing in DB back to sender
    socket.on("getTotalUsers", () => getTotalUsers(socket, users, _id));

    // Update logged user state to others
    socket.broadcast.emit("updateTotalUsers", {
      objectId: userPayload._id,
      displayName: userPayload.displayName,
      email: userPayload.email,
      avatar: userPayload.avatar,
      createdOn: userPayload.createdOn,
      about: userPayload.about,
      lastSeen: userPayload.lastSeen,
    });

    // Verification needed
    socket.on(
      "updateUserProfile",
      async (payload: any) => await updateUserProfile(socket, _id, payload, db)
    );

    // Verification needed
    socket.on("updateGroupInfo", async (payload: any) =>
      updateGroupInfo(io, _id, payload, db)
    );

    socket.on("updateOthersChats", (payload: any) =>
      updateOthersChats(io, _id, payload)
    );

    // handle incoming messages
    socket.on("iTextMessage", async (payload: any) =>
      iTextMessage(io, socket, payload, db)
    );

    // Handle online status
    socket.broadcast.emit("online", _id);

    // // Handle chat switches
    // socket.on("switchActiveChat", async (payload: any) =>
    //   switchActiveChat(io, socket, _id, db, payload)
    // );

    // Handle disconnect event
    socket.on("disconnect", async () => socketDisconnect(socket, _id, db));
  } catch (err) {
    console.log("MAIN SOCKET ERR", err);
  }
};

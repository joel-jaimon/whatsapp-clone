const { ObjectID, ObjectId } = require("bson");
const { verify } = require("jsonwebtoken");
const {
  addToActiveUsers,
  getActiveUserByObjectId,
  removeActiveUserByObjectId,
  getActiveUserBySocketId,
} = require("./utils/activeUsers");
const { mongoDB } = require("./utils/database");

const socketMain = async (io, socket) => {
  try {
    const jwtToken = socket.handshake.auth.accessToken;
    const { _id } = verify(jwtToken, process.env.JWT_ACCESS_SECRET);

    // MongoDb instance;
    const db = await mongoDB().db();

    // My detail
    const userPayload = await db
      .collection("googleAuthUsers")
      .findOne({ _id: ObjectID(_id) });

    // All users data
    const users = await db.collection("googleAuthUsers").find().toArray();

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

    // Signin success state
    socket.on("callOtherUser", async (payload) => {
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
            _id: ObjectID(payload.refId),
          });

        for (let i = 0; i < participants.length; i++) {
          if (participants[i].objectId.toString() != _id.toString()) {
            const activeFriends = getActiveUserByObjectId(
              participants[i].objectId
            );
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
    });

    // join user to a video call room
    socket.on("join-vc-room", (roomId, peerUserId) => {
      console.log(roomId, peerUserId);
      socket.join(roomId); // Join the room
      socket.broadcast.to(roomId).emit("user-connected-to-vc", peerUserId); // Tell everyone else in the room that we joined

      // Communicate the disconnection
      socket.on("disconnect", () => {
        socket.broadcast
          .to(roomId)
          .emit("user-disconnected-from-vc", peerUserId);
      });
    });

    // when user ends vc after joining
    socket.on("diconnect-from-call", (roomId, peerUserId) => {
      socket.broadcast.to(roomId).emit("user-disconnected-from-vc", peerUserId);
    });

    // whien user rejects call
    socket.on("reject-call", (roomId) => {
      socket.broadcast
        .to(roomId)
        .emit("call-rejected", getActiveUserBySocketId(socket.id).objectId);
    });

    // when user is already on call
    socket.on("user-on-call", (roomId) => {
      socket.broadcast
        .to(roomId)
        .emit(
          "other-user-on-call",
          getActiveUserBySocketId(socket.id).objectId
        );
    });

    // Send users existing in DB back to sender
    socket.on("getTotalUsers", () => {
      // get total users (less size compared to chat data so we can use socket.io here,
      // otherwise its better to use REST)
      const filterUsers = users
        .filter((me) => me._id != _id)
        .map((user) => {
          return {
            ...user,
            status: getActiveUserByObjectId(user._id.toString()) ? true : false,
          };
        });

      // emit the entire user list to client
      socket.emit("setInitialTotalUsers", filterUsers);
    });

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
    socket.on("updateUserProfile", async (payload) => {
      await db.collection("googleAuthUsers").updateOne(
        { _id: ObjectID(_id) },
        {
          $set: { ...payload },
        }
      );

      socket.broadcast.emit("onOtherAuthUsersInfoUpdate", {
        objectId: _id,
        ...payload,
      });
    });

    // Verification needed
    socket.on("updateGroupInfo", async (payload) => {
      await db.collection("groups").updateOne(
        { _id: ObjectID(payload.groupId) },
        {
          $set: { ...payload.updatedParams },
        }
      );

      const { participants } = await db.collection("groups").findOne({
        _id: ObjectID(payload.groupId),
      });

      for (let i = 0; i < participants.length; i++) {
        if (participants[i].objectId.toString() != _id.toString()) {
          const activeFriends = getActiveUserByObjectId(
            participants[i].objectId
          );
          if (activeFriends?.socketId) {
            console.log("Chats updated for ", activeFriends?.objectId);
            io.to(activeFriends.socketId).emit("onGroupInfoUpdate", payload);
          }
        }
      }
    });

    socket.on("updateOthersChats", async (payload) => {
      const {
        chatInfo: { participants },
      } = payload;
      for (let i = 0; i < participants.length; i++) {
        if (participants[i].objectId.toString() != _id.toString()) {
          const activeFriends = getActiveUserByObjectId(
            participants[i].objectId
          );
          if (activeFriends?.socketId) {
            console.log("Chats updated for ", activeFriends?.objectId);
            io.to(activeFriends.socketId).emit("updateExistingChats", {
              ...payload,
            });
          }
        }
      }
    });

    // handle incoming messages
    socket.on("iTextMessage", async (payload) => {
      console.log(payload);
      const { type, msgType, msgParams, refId, timestamp, sentBy, tempId } =
        payload;

      const { participants } = await db.collection(`${type}s`).findOne({
        _id: ObjectId(refId),
      });

      await db.collection("messages").insertOne(
        {
          type,
          msgType,
          msgParams,
          refId: ObjectId(refId),
          timestamp,
          sentBy: ObjectId(sentBy),
        },
        (err, data) => {
          if (err) {
            throw Error(err);
          }

          for (let i = 0; i < participants.length; i++) {
            if (participants[i].objectId.toString() != sentBy.toString()) {
              const activeFriends = getActiveUserByObjectId(
                participants[i].objectId
              );
              if (activeFriends?.socketId) {
                io.to(activeFriends.socketId).emit("recieveMessage", {
                  _id: data._id,
                  type,
                  msgType,
                  msgParams,
                  refId: ObjectId(refId),
                  timestamp,
                  sentBy: ObjectId(sentBy),
                });
              }
            }
          }

          socket.emit("messageSentSuccessfully", {
            tempId: tempId,
            refId,
            _id: data._id,
          });
        }
      );
    });

    // Handle online status
    socket.broadcast.emit("online", _id);

    // // Handle chat switches
    // socket.on("switchActiveChat", async (payload) => {
    //   // Second time switching a chat
    //   // Update prev chats info
    //   console.log(payload);
    //   if (payload?.prevActiveChat.prevActiveChatType) {
    //     const { prevActiveChatId, prevActiveChatType } = payload.prevActiveChat;
    //     const time = Date.now();

    //     // Update last chats info
    //     await db.collection(`${prevActiveChatType}s`).updateOne(
    //       {
    //         "participants.objectId": ObjectID(_id),
    //       },
    //       {
    //         $set: {
    //           "participants.$.lastViewed": time,
    //         },
    //       }
    //     );

    //     const { participants } = await db
    //       .collection(`${prevActiveChatType}s`)
    //       .findOne({
    //         _id: ObjectId(prevActiveChatId),
    //       });

    //     for (let i = 0; i < participants.length; i++) {
    //       if (participants[i].objectId.toString() != _id.toString()) {
    //         const activeFriends = getActiveUserByObjectId(
    //           participants[i].objectId
    //         );
    //         if (activeFriends?.socketId) {
    //           // Update others about this
    //           io.to(activeFriends.socketId).emit("activeChatsSwitched", {
    //             userObjectId: _id,
    //             prevActiveChat: {
    //               prevActiveChatId,
    //               lastViewed: time,
    //             },
    //           });
    //         }
    //       }
    //     }
    //   }

    //   await db.collection("googleAuthUsers").updateOne(
    //     { _id: ObjectID(_id) },
    //     {
    //       $set: { currentlyOn: payload.switchTo },
    //     }
    //   );

    //   // Update others about this
    //   socket.broadcast.emit("friendCurrentlyOn", {
    //     userObjectId: _id,
    //     currentlyOn: payload.switchTo,
    //   });
    // });

    // Handle disconnect event
    socket.on("disconnect", async () => {
      // timestamp
      const lastSeen = Date.now();

      // update last seen of disconnected user
      await db.collection("googleAuthUsers").updateOne(
        { _id: ObjectID(_id) },
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
    });
  } catch (err) {
    console.log("MAIN SOCKET ERR", err);
  }
};

module.exports = socketMain;

const { ObjectID } = require("bson");
const { verify } = require("jsonwebtoken");
const {
  getActiveUsers,
  addToActiveUsers,
  getActiveUserByObjectId,
  removeActiveUserByObjectId,
} = require("./utils/activeUsers");
const { mongoDB } = require("./utils/database");

const socketMain = async (io, socket) => {
  try {
    const jwtToken = socket.handshake.auth.accessToken;
    const { _id } = verify(jwtToken, process.env.JWT_ACCESS_SECRET);

    // MongoDb instance;
    const db = await mongoDB().db();
    const userPayload = await db
      .collection("googleAuthUsers")
      .findOne({ _id: ObjectID(_id) });

    const users = await db.collection("googleAuthUsers").find().toArray();

    const activeUsers = getActiveUsers();
    const activeUserIndex = activeUsers.findIndex((e) => e.objectId === _id);

    // // Handle User Active Session
    if (activeUserIndex === -1) {
      console.log(socket.id, activeUsers, activeUserIndex);
      addToActiveUsers({
        socketId: socket.id,
        objectId: _id,
      });
    } else {
      const prevSocketId = getActiveUserByObjectId(_id)?.socketId;
      if (io.sockets.sockets[prevSocketId]) {
        console.log(prevSocketId + "disconnected");
        io.sockets.sockets[prevSocketId].disconnect();
      }
      removeActiveUserByObjectId(_id);
      addToActiveUsers({
        socketId: socket.id,
        objectId: _id,
      });
    }
    // Signin success
    socket.emit("signInSuccess", {
      uid: userPayload.uid,
      displayName: userPayload.displayName,
      email: userPayload.email,
      avatar: userPayload.avatar,
      createdOn: userPayload.createdOn,
      about: userPayload.about,
    });

    socket.on("getTotalUsers", () => {
      socket.emit("setInitialTotalUsers", users);
    });

    socket.broadcast.emit("updateTotalUsers", {
      objectId: userPayload._id,
      uid: userPayload.uid,
      displayName: userPayload.displayName,
      email: userPayload.email,
      avatar: userPayload.avatar,
      createdOn: userPayload.createdOn,
      about: userPayload.about,
    });

    // Handle online status
    socket.broadcast.emit("online", _id);

    // Handle disconnect event
    socket.on("disconnect", () => {
      socket.broadcast.emit("offline", _id);
      console.log(socket.id, "Disconnected");
    });
  } catch (err) {
    console.log("MAIN SOCKET ERR", err);
  }
};

module.exports = socketMain;

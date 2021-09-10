const { ObjectID } = require("bson");
const { verify } = require("jsonwebtoken");
const { mongoDB } = require("./utils/database");

const socketMain = async (io, socket) => {
  try {
    const jwtToken = socket.handshake.auth.accessToken;
    const { _id } = verify(jwtToken, process.env.JWT_ACCESS_SECRET);

    const db = await mongoDB().db();
    const userPayload = await db
      .collection("googleAuthUsers")
      .findOne({ _id: ObjectID(_id) });

    socket.emit("signInSuccess", {
      uid: userPayload.uid,
      displayName: userPayload.displayName,
      email: userPayload.email,
      avatar: userPayload.avatar,
      createdOn: userPayload.createdOn,
      about: userPayload.about,
    });

    let count = 0;
    setInterval(() => {
      socket.emit("E");
      count++;
    }, 1000);
  } catch (err) {
    console.log("MAIN SOCKET ERR", err);
  }
};

module.exports = socketMain;

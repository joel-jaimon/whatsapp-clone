const { handleNewGoogleUser } = require("./mongoActions/googleUser");
const { handleNewGuestUser } = require("./mongoActions/guestUser");

function iterateFunc(doc) {
  console.log(JSON.stringify(doc, null, 4));
}

function errorFunc(error) {
  console.log(error);
}

const socketMain = async (io, socket, mongoClient) => {
  const db = mongoClient.db();
  socket.on("googleSignIn", (data) => handleNewGoogleUser(data, db));
};

module.exports = socketMain;

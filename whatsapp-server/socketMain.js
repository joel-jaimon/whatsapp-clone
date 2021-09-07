function iterateFunc(doc) {
  console.log(JSON.stringify(doc, null, 4));
}

function errorFunc(error) {
  console.log(error);
}

const socketMain = async (io, socket, mongoClient) => {
  let count = 0;
  const db = mongoClient.db();
  const googleAuthUsers = await db.collection("googleAuthUsers").find({});
  googleAuthUsers.forEach(iterateFunc, errorFunc);

  setInterval(() => {
    socket.emit("eval", count);
    count++;
  }, 100);
};

module.exports = socketMain;

function iterateFunc(doc) {
  console.log(JSON.stringify(doc, null, 4));
}

function errorFunc(error) {
  console.log(error);
}

const socketMain = async (io, socket) => {};

module.exports = socketMain;

const socketMain = (io, socket) => {
  let count = 0;
  setInterval(() => {
    socket.emit("eval", count);
    count++;
  }, 100);
};

module.exports = socketMain;

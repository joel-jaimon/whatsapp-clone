const { verify } = require("jsonwebtoken");
const { removeActiveUserBySocketId } = require("./activeUsers");

// Express REST routes middleware
const isAuthREST = (req, res, next) => {
  const authorization = req.headers["authorization"];

  if (!authorization) {
    throw new Error("Not authorized!");
  }

  try {
    const token = authorization.split(" ")[1];
    const payload = verify(token, process.env.JWT_ACCESS_SECRET);
    req.payload = payload;
  } catch (err) {
    console.log(err);
    res.send(404).end();
  } finally {
    return next();
  }
};

// Socket.io middleware
const isAuthSocket = (socket, next) => {
  const { accessToken } = socket.handshake.auth;
  verify(accessToken, process.env.JWT_ACCESS_SECRET, (err, payload) => {
    if (err) {
      socket.disconnect(true);
      return next(new Error("Not Authorized!"));
    }
    return next();
  });
};

module.exports = { isAuthREST, isAuthSocket };

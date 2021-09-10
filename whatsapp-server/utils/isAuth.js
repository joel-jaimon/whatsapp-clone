const { verify } = require("jsonwebtoken");
const timer = require("long-timeout");

const isAuthREST = (req, res, next) => {
  const authorization = context.req.headers["authorization"];

  if (!authorization) {
    throw new Error("Not authorized!");
  }

  try {
    const token = authorization.split(" ")[1];
    const payload = verify(token, process.env.JWT_ACCESS_SECRET);
    req.payload = payload;
  } catch (err) {
    console.log(err);
    throw new Error("Not authorized!");
  } finally {
    return next();
  }
};

const isAuthSocket = (socket, next) => {
  const { accessToken } = socket.handshake.auth;
  console.log("In AUTH SOCKET");
  verify(accessToken, process.env.JWT_ACCESS_SECRET, (err, payload) => {
    if (err) {
      socket.disconnect(true);
      console.log("Socket Disconnected!");
      return next(new Error("Not Authorized!"));
    }
    return next();
  });
};

module.exports = { isAuthREST, isAuthSocket };

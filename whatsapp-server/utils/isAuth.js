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
  const jwtToken = socket.handshake.auth.accessToken;
  const { _id, exp } = verify(jwtToken, process.env.JWT_ACCESS_SECRET);

  console.log(exp);

  if (!exp) {
    return next();
  }

  const expiresIn = (exp - Date.now() / 1000) * 1000;
  const timeout = timer.setTimeout(() => socket.disconnect(true), expiresIn);

  socket.on("disconnect", () => timer.clearTimeout(timeout));

  return next();
};

module.exports = { isAuthREST, isAuthSocket };

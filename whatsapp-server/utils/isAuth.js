const { verify } = require("jsonwebtoken");

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

module.exports = { isAuthREST };

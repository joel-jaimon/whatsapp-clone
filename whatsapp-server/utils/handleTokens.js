const jwt = require("jsonwebtoken");

const createAccessToken = (_id, exp) => {
  return jwt.sign(
    {
      _id,
    },
    process.env.JWT_ACCESS_SECRET,
    {
      expiresIn: exp / 1000, // time in s
    }
  );
};

const createRefreshToken = (_id, exp) => {
  return jwt.sign(
    {
      _id,
    },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: exp / 1000, // time in s
    }
  );
};

module.exports = { createAccessToken, createRefreshToken };

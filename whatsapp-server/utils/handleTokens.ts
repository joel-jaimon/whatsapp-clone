import * as jwt from "jsonwebtoken";

export const createAccessToken = (_id: any, exp: any) => {
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

export const createRefreshToken = (_id: any, exp: any) => {
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

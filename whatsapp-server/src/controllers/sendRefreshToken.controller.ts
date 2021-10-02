import { mongoDB } from "../database/mongoInstance";
import { verify } from "jsonwebtoken";
import { ObjectId } from "bson";
import { accessTokenExp, refreshTokenExp } from "../constants/token.constants";
import { createAccessToken, createRefreshToken } from "../utils/handleTokens";

export const sendRefreshToken = async (req: any, res: any) => {
  const db: any = await mongoDB().db();
  const token: any = req.cookies.wc_RTN;

  if (!token) {
    return res.status(401).send({
      error: "Not Authorized!",
    });
  }

  let payload: any = null;
  try {
    payload = verify(token, process.env.JWT_REFRESH_SECRET);
  } catch (err) {
    return res.status(401).send({
      error: "Not Authorized!",
    });
  }

  const { _id }: any = await db
    .collection("googleAuthUsers")
    .findOne({ _id: new ObjectId(payload._id) });

  if (!_id) {
    return res.status(401).send({
      error: "Not Authorized!",
    });
  }

  const newAccessToken = createAccessToken(payload._id, accessTokenExp);
  const newRefreshToken = createRefreshToken(payload._id, refreshTokenExp);

  res.cookie("wc_RTN", newRefreshToken, {
    maxAge: refreshTokenExp,
    httpOnly: true,
  });

  return res.send({
    accessToken: newAccessToken,
  });
};

import { OAuth2Client } from "google-auth-library";
import { mongoDB } from "../../utils/database";
import { v4 as uuidv4 } from "uuid";
import {
  createAccessToken,
  createRefreshToken,
} from "../../utils/handleTokens";

import axios from "axios";

import { verify } from "jsonwebtoken";
const { ObjectId } = require("bson");

const refreshTokenExp = 7 * 24 * 60 * 60 * 1000;
const accessTokenExp = 30 * 1000;

const client = new OAuth2Client(process.env.GAUTH_CLIENT_ID);

// Refresh token endpoint
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
    .findOne({ _id: ObjectId(payload._id) });

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

// Create / SigIn new user endpoint
export const googlelogin = async (req: any, res: any) => {
  try {
    const db: any = await mongoDB().db();

    const { tokenId }: any = req.body;

    const { payload }: any = await client.verifyIdToken({
      idToken: tokenId,
    });

    if (!payload) {
      return res.status(401).json({
        error: "Session Expired!",
      });
    }

    const { name, picture, email }: any = payload;
    const rs: any = await db.collection("googleAuthUsers").findOne({ email });

    if (rs?._id) {
      const refreshToken = createRefreshToken(rs._id, refreshTokenExp);
      const accessToken = createAccessToken(rs._id, accessTokenExp);

      res.cookie("wc_RTN", refreshToken, {
        maxAge: refreshTokenExp,
        httpOnly: true,
      });

      return res.json({
        accessToken: accessToken,
      });
    } else {
      const image: any = await axios.get(picture, {
        responseType: "arraybuffer",
      });
      const raw = Buffer.from(image.data).toString("base64");
      const base64Image =
        "data:" + image.headers["content-type"] + ";base64," + raw;

      const userUid = uuidv4();
      const { _id }: any = await db.collection("googleAuthUsers").insertOne({
        uid: userUid,
        displayName: name,
        authType: "google",
        email: email,
        avatar: base64Image,
        about: "Trying this clone...",
        createdOn: Date.now(),
      });

      const refreshToken: any = createRefreshToken(_id, refreshTokenExp);
      const accessToken: any = createAccessToken(_id, accessTokenExp);

      res.cookie("wc_RTN", refreshToken, {
        maxAge: refreshTokenExp,
        httpOnly: true,
      });

      return res.json({
        accessToken: accessToken,
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: "Something went wrong!" });
  }
};

export const logout = async (_: any, res: any) => {
  res.clearCookie("wc_RTN");
  res.status(200).json({
    hi: "Thanks for testing...!",
  });
};

import { mongoDB } from "../database/mongoInstance";
import { accessTokenExp, refreshTokenExp } from "../constants/token.constants";
import { OAuth2Client } from "google-auth-library";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { createAccessToken, createRefreshToken } from "../utils/handleTokens";

const client = new OAuth2Client(process.env.GAUTH_CLIENT_ID);

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

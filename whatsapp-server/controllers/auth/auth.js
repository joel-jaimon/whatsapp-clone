const { OAuth2Client } = require("google-auth-library");
const { mongoDB } = require("../../utils/database");
const { v4: uuidv4 } = require("uuid");
const {
  createAccessToken,
  createRefreshToken,
} = require("../../utils/handleTokens");

const axios = require("axios");

const verify = require("jsonwebtoken/verify");
const { ObjectId } = require("bson");

const refreshTokenExp = 7 * 24 * 60 * 60 * 1000;
const accessTokenExp = 30 * 1000;

const client = new OAuth2Client(process.env.GAUTH_CLIENT_ID);

// Refresh token endpoint
const sendRefreshToken = async (req, res) => {
  const db = await mongoDB().db();
  const token = req.cookies.wc_RTN;

  if (!token) {
    return res.status(401).send({
      error: "Not Authorized!",
    });
  }

  let payload = null;
  try {
    payload = verify(token, process.env.JWT_REFRESH_SECRET);
  } catch (err) {
    return res.status(401).send({
      error: "Not Authorized!",
    });
  }

  const { _id } = await db
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
const googlelogin = async (req, res) => {
  try {
    const db = await mongoDB().db();

    const { tokenId } = req.body;

    const { payload } = await client.verifyIdToken({
      idToken: tokenId,
    });

    if (!payload) {
      return res.status(401).json({
        error: "Session Expired!",
      });
    }

    const { name, picture, email } = payload;
    const rs = await db.collection("googleAuthUsers").findOne({ email });

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
      const image = await axios.get(picture, { responseType: "arraybuffer" });
      const raw = Buffer.from(image.data).toString("base64");
      const base64Image =
        "data:" + image.headers["content-type"] + ";base64," + raw;

      const userUid = uuidv4();
      const { _id } = await db.collection("googleAuthUsers").insertOne({
        uid: userUid,
        displayName: name,
        authType: "google",
        email: email,
        avatar: base64Image,
        about: "Trying this clone...",
        createdOn: Date.now(),
      });

      const refreshToken = createRefreshToken(_id, refreshTokenExp);
      const accessToken = createAccessToken(_id, accessTokenExp);

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

const logout = async (req, res) => {
  res.clearCookie("wc_RTN");
  res.status(200).json({
    hi: "Thanks for testing...!",
  });
};

module.exports = {
  logout,
  googlelogin,
  sendRefreshToken,
};

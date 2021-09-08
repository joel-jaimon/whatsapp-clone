const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const { mongoDB } = require("../../utils/database");
const { uuid } = require("uuidv4");

const client = new OAuth2Client(process.env.GAUTH_CLIENT_ID);

exports.googlelogin = async (req, res) => {
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
    const { _id } = await db.collection("googleAuthUsers").findOne({ email });

    const refreshTokenExp = 7 * 24 * 60 * 60 * 1000;
    const accessTokenExp = 30 * 1000;

    if (_id) {
      const refreshToken = jwt.sign(
        {
          _id,
        },
        process.env.JWT_REFRESH_SECRET,
        {
          expiresIn: refreshTokenExp,
        }
      );

      const accessToken = jwt.sign(
        {
          _id,
        },
        process.env.JWT_ACCESS_SECRET,
        {
          expiresIn: accessTokenExp,
        }
      );

      res.cookie("wc_RTN", refreshToken, {
        maxAge: refreshTokenExp,
        httpOnly: true,
      });

      res.json({
        accessToken: accessToken,
      });
    } else {
      const userUid = uuid();
      const { _id } = await db.collection("googleAuthUsers").insertOne({
        about: "Trying this clone...",
        authType: "google",
        avatar: picture,
        displayName: name,
        email: email,
        uid: userUid,
      });

      const refreshToken = jwt.sign(
        {
          _id,
        },
        process.env.JWT_REFRESH_SECRET,
        {
          expiresIn: refreshTokenExp,
        }
      );

      const accessToken = jwt.sign(
        {
          _id,
        },
        process.env.JWT_ACCESS_SECRET,
        {
          expiresIn: accessTokenExp,
        }
      );

      res.cookie("wc_RTN", refreshToken, {
        maxAge: refreshTokenExp,
        httpOnly: true,
      });

      res.json({
        accessToken: accessToken,
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: "Something went wrong!" });
  }
};

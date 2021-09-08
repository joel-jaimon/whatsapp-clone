const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(process.env.GAUTH_CLIENT_ID);

exports.googlelogin = async (req, res) => {
  const { tokenId } = req.body;
  console.log(tokenId);

  const param = await client.verifyIdToken({
    idToken: tokenId,
  });
  console.log(param);
};

var express = require("express");
const {
  googlelogin,
  sendRefreshToken,
  logout,
} = require("./controllers/auth/auth");
const { getMessages, getGroupsChats } = require("./controllers/mongo/chats");
const { isAuthREST } = require("./utils/isAuth");
var router = express.Router();

router.get("/", (req, res) => {
  res.json({
    active: true,
  });
});

router.get("/refresh-token", sendRefreshToken);

router.post("/g-auth/authenticate", googlelogin);

router.get("/logout", logout);

router.get("/chats/:refId", isAuthREST, getMessages);

router.get("/chats", isAuthREST, getGroupsChats);

module.exports = router;

var express = require("express");
const {
  googlelogin,
  sendRefreshToken,
  logout,
} = require("./controllers/auth/auth");
const { getMessages, getGroupsChats } = require("./controllers/mongo/chats");
const { isAuthREST } = require("./utils/isAuth");
const multer = require("multer");
const {
  handleFileUpload,
  handleGetResource,
} = require("./controllers/s3/handlers");
var router = express.Router();

// temp upload location for files
const uploadLocation = multer({ dest: "uploads/" });

// check if server is active
router.get("/", (_, res) => {
  res.json({
    active: true,
  });
});

// refresh access token and update the refresh token
router.get("/refresh-token", sendRefreshToken);

// signin with google
router.post("/g-auth/authenticate", googlelogin);

// logout user
router.get("/logout", logout);

// get messages of a particular chat, group
router.get("/chats/:refId", isAuthREST, getMessages);

// get chats, groups for a particular user
router.get("/chats", isAuthREST, getGroupsChats);

// upload files
router.post(
  "/file-upload/:fileType",
  uploadLocation.single("whatsapp-clone-message-file"),
  handleFileUpload
);

// chat message files
router.get("/resources/:fileType/:key", handleGetResource);

module.exports = router;

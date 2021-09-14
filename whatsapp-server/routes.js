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
  handleGetResourceFromServer,
} = require("./controllers/s3/handlers");
var router = express.Router();

const uploadLocation = multer({ dest: "uploads/" });

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

router.post(
  "/file-upload/:fileType",
  uploadLocation.single("whatsapp-clone-message-file"),
  handleFileUpload
);

router.get("/resources/:fileType/:key", handleGetResource);

// router.get("/resources/server/get/:key", handleGetResourceFromServer);

module.exports = router;

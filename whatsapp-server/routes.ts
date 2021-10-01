var express = require("express");
const {
  googlelogin,
  sendRefreshToken,
  logout,
} = require("./controllers/auth/auth");
import { getMessages, getGroupsChats } from "./controllers/mongo/chats";
import { isAuthREST } from "./utils/isAuth";
import * as multer from "multer";
import { handleFileUpload, handleGetResource } from "./controllers/s3/handlers";
import { handleNewGroup } from "./controllers/random/handleNewGroup";
import { handleNewChat } from "./controllers/random/handleNewChat";
const router = express.Router();

// temp upload location for files
const uploadLocation = multer({ dest: "uploads/" });

// check if server is active
router.get("/", (_: any, res: any) => {
  res.json({
    active: true,
  });
});

// refresh access token and update the refresh token
router.get("/refresh-token", sendRefreshToken);

// signin with google
router.post("/g-auth/authenticate", googlelogin);

// logout user
router.get("/logout", isAuthREST, logout);

// get messages of a particular chat, group
router.get("/chats/:refId", isAuthREST, getMessages);

// get chats, groups for a particular user
router.get("/chats", isAuthREST, getGroupsChats);

// upload files
router.post(
  "/file-upload/:fileType",
  isAuthREST,
  uploadLocation.single("whatsapp-clone-message-file"),
  handleFileUpload
);

// chat message files
router.get("/resources/:fileType/:key", handleGetResource);

router.post("/create-new-group", isAuthREST, handleNewGroup);

router.post("/create-new-chat", isAuthREST, handleNewChat);

module.exports = router;

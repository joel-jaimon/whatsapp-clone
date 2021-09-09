var express = require("express");
const { googlelogin, sendRefreshToken } = require("./controllers/auth/auth");
var router = express.Router();

router.get("/", (req, res) => {
  res.json({
    active: true,
  });
});

router.get("/refresh-token", sendRefreshToken);

router.post("/g-auth/authenticate", googlelogin);

module.exports = router;

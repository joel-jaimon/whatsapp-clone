var express = require("express");
const { googlelogin } = require("./controllers/auth/auth");
var router = express.Router();

router.get("/", (req, res) => {
  res.json({
    active: true,
  });
});

router.post("/g-auth/authenticate", googlelogin);

module.exports = router;

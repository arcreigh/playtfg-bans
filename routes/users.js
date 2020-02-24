const Joi = require("@hapi/joi");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send([{ user: "user1" }, { user: "user2" }, { user: "user3" }]);
});

module.exports = router;

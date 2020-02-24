const { Ban, validate } = require("../Models/banModel");
const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const jsonParse = bodyParser.json();

router.post("/", jsonParse, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let ban = new Ban({
    bannedUser: req.body.bannedUser,
    bannedBy: req.body.bannedBy,
    reason: req.body.reason,
    banDuration: req.body.banDuration,
    game: req.body.game,
    server: req.body.server
  });
  ban = await ban.save();
  res.send(ban);
});

module.exports = router;

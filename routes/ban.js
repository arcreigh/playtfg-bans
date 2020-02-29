const { Ban, validate } = require("../Models/banModel");
const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const jsonParse = bodyParser.json();
const isAdmin = require("../isAdmin");

router.post("/", jsonParse, async (req, res) => {
  if (await isAdmin(req)) {
    try {
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
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  } else {
    res.status(403).send("You are not an admin");
  }
});

module.exports = router;

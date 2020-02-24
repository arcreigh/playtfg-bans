const { Ban } = require("../Models/banModel");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const bans = await Ban.find().sort("date");
  res.send(bans);
});

module.exports = router;

const { Ban } = require("../Models/banModel");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  if (req.isAuthenticated()) {
    try {
      const bans = await Ban.find().sort("date");
      res.send(bans);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  } else {
    res.status(403).send("Please login to see the list of bans");
  }
});

module.exports = router;

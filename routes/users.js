const { User } = require("../Models/userModel");
const express = require("express");
const router = express.Router();
const isAdmin = require("../isAdmin");

router.get("/", async (req, res) => {
  if (await isAdmin(req)) {
    try {
      let users = await User.find().sort("personaName");
      res.send(users);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  } else {
    res.status(403).send("You are not an admin");
  }
});

module.exports = router;

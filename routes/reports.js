const express = require("express");
const { Report } = require("../Models/reportModel");
const router = express.Router();
const isAdmin = require("../isAdmin");

router.get("/", async (req, res) => {
  if (await isAdmin(req)) {
    try {
      let reports = await Report.find().sort("date");
      res.send(reports);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  } else {
    res.status(403).send("You are not an admin");
  }
});

module.exports = router;

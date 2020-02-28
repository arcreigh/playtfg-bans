const express = require("express");
const { Report } = require("../Models/reportModel");
const router = express.Router();

router.get("/", async (req, res) => {
  if (req.isAuthenticated()) {
    const reports = await Report.find().sort("date");
    res.send(reports);
  } else {
    res.status(403).send("In order to see reports please login");
  }
});

module.exports = router;

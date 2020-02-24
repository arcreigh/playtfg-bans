const express = require("express");
const { Report } = require("../Models/reportModel");
const router = express.Router();

router.get("/", async (req, res) => {
  const reports = await Report.find().sort("date");
  res.send(reports);
});

module.exports = router;

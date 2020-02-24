const { Report, validate } = require("../Models/reportModel");
const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const jsonParse = bodyParser.json();

router.post("/", jsonParse, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let report = new Report({
    reportingUser: req.body.reportingUser,
    reportedUser: req.body.reportedUser,
    game: req.body.game,
    server: req.body.server,
    description: req.body.description,
    title: req.body.title
  });
  report = await report.save();
  res.send(report);
});

module.exports = router;

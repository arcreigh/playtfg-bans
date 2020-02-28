const { Report, validate } = require("../Models/reportModel");
const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const jsonParse = bodyParser.json();

router.post("/", jsonParse, async (req, res) => {
  console.log(req.user);
  if (req.isAuthenticated()) {
    let report = new Report({
      reportingUserSteamID: req.user.id,
      reportingUserPersonaName: req.user.displayName,
      reportedUser: req.body.reportedUser,
      game: req.body.game,
      server: req.body.server,
      description: req.body.description,
      title: req.body.title
    });
    console.log(report);
    const { error } = validate(req.body);
    console.log(error);
    if (error) return res.status(400).send(error);
    report = await report.save();
    res.send(report);
  } else {
    res.status(403).send("Please log in before filing a report");
  }
});

module.exports = router;

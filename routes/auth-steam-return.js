const express = require("express");
const router = express.Router();
const passport = require("passport");
const bodyParser = require("body-parser");
const UTC = require("../unix-time-conversion");
const jsonParse = bodyParser.json();
const { User, validate } = require("../Models/userModel");
router.get(
  "/",
  jsonParse,
  (req, res, next) => {
    //setting the req.url fixes an assertion issue with express
    req.url = req.originalUrl;
    console.log("Grabbing user data.");
    next();
  },
  passport.authenticate("steam", { failureRedirect: "/login" }),
  async (req, res) => {
    //console.log(req.user);
    //console.log(req.headers);
    //console.log(`Username is: ${req.user.displayName}`);
    //console.log(`SteamID is: ${req.user.id}`);
    //console.log(`User was created on: ${UTC(req.user._json.timecreated)}`);
    try {
      let user = new User({
        steamID: req.user.id,
        personaName: req.user.displayName,
        steamAge: UTC(req.user._json.timecreated)
      });
      //Not sure if I need to validate the request here since the request is coming from steam itself
      //Maybe mongoose validation is enough?
      //I will leave the validation commented out until proven otherwise.
      //validate(user);
      console.log(user.steamAge);
      // .update may go away look into updateOne
      user = await User.update(
        { steamID: user.steamID },
        { $set: { personaName: user.personaName, steamAge: user.steamAge } },
        { upsert: true, setDefaultsOnInsert: true, runValidators: true }
      );
      console.log(user);
      res.redirect("/");
    } catch (error) {
      console.log(error);
      return res.status(500).send("500 Internal Server Error: " + error);
    }
  }
);
module.exports = router;

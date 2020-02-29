//const mongoose = require("mongoose");
const { User } = require("./Models/userModel");

async function isAdmin(req) {
  try {
    let user = await User.find({ steamID: req.user.id });
    if (user[0].toObject().isAdmin === true) {
      return true;
    } else {
      return false;
    }
  } catch {
    console.log("something went wrong");
  }
}

module.exports = isAdmin;

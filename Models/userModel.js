const Joi = require("@hapi/joi");
const mongoose = require("mongoose");
//mongoose ban model and schema
const User = mongoose.model(
  "User",
  new mongoose.Schema({
    steamID: { type: String, required: true, minlength: 3, maxlength: 64, unique: true },
    personaName: { type: String, required: true, minlength: 3, maxlength: 64 },
    steamAge: { type: String, required: true, minlength: 10, maxlength: 1024 },
    joinDate: { type: Date, default: Date.now }
  })
);

//Joi validation function for the ban model
function validateUser(user) {
  console.debug("DEBUG - validateUser", user);
  const schema = Joi.object({
    steamID: Joi.string()
      .min(3)
      .max(64)
      .required(),
    personaName: Joi.string()
      .min(3)
      .max(64)
      .required(),
    steamAge: Joi.string()
      .min(10)
      .max(1024)
      .required()
  });
  return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;

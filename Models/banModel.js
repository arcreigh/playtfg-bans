const Joi = require("@hapi/joi");
const mongoose = require("mongoose");
//mongoose ban model and schema
const Ban = mongoose.model(
  "Ban",
  new mongoose.Schema({
    bannedUser: { type: String, required: true, minlength: 3, maxlength: 64 },
    bannedBy: { type: String, required: true, minlength: 3, maxlength: 64 },
    reason: { type: String, required: true, minlength: 10, maxlength: 1024 },
    banDuration: { type: String, required: true },
    date: { type: Date, default: Date.now },
    game: { type: String, required: true, minlength: 3, maxlength: 32 },
    server: { type: String, required: true, minlength: 3, maxlength: 64 }
  })
);

//Joi validation function for the ban model
function validateBan(ban) {
  console.debug("DEBUG - validateBan", ban);
  const schema = Joi.object({
    bannedUser: Joi.string()
      .min(3)
      .max(64)
      .required(),
    bannedBy: Joi.string()
      .min(3)
      .max(64)
      .required(),
    reason: Joi.string()
      .min(10)
      .max(1024)
      .required(),
    banDuration: Joi.string().required(),
    game: Joi.string()
      .min(3)
      .max(32)
      .required(),
    server: Joi.string()
      .min(3)
      .max(64)
      .required()
  });
  return schema.validate(ban);
}

exports.Ban = Ban;
exports.validate = validateBan;

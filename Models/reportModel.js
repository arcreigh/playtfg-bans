const Joi = require("@hapi/joi");
const mongoose = require("mongoose");

//Define model here
const Report = mongoose.model(
  "Report",
  new mongoose.Schema({
    reportingUser: { type: String, required: true, minlength: 3, maxlength: 64 },
    reportedUser: { type: String, required: true, minlength: 3, maxlength: 64 },
    game: { type: String, required: true, minlength: 3, maxlength: 32 },
    server: { type: String, required: true, minlength: 3, maxlength: 64 },
    description: { type: String, required: true, minlength: 10, maxlength: 2048 },
    title: { type: String, required: true, minlength: 3, maxlength: 128 },
    comments: [{ body: String, date: Date, user: String }],
    date: { type: Date, default: Date.now },
    status: String,
    workedBy: String
  })
);

//Joi validation function for the report model
function validateReport(report) {
  console.debug("DEBUG - validateReport", report);
  const schema = Joi.object({
    reportingUser: Joi.string()
      .min(3)
      .max(64)
      .required(),
    reportedUser: Joi.string()
      .min(3)
      .max(64)
      .required(),
    game: Joi.string()
      .min(3)
      .max(32)
      .required(),
    server: Joi.string()
      .min(3)
      .max(64)
      .required(),
    description: Joi.string()
      .min(10)
      .max(2048)
      .required(),
    title: Joi.string()
      .min(3)
      .max(128)
      .required()
  });
  return schema.validate(report);
}
//list all exports here
exports.validate = validateReport;
exports.Report = Report;

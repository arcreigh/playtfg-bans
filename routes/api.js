const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
//app needed for bodyParser middleware
const app = express();
//define bodyParser middlewares here
//pingCheck restricts post requests to /api to text/plain and sets a limit of 4 bytes
const pingCheck = app.use(bodyParser.text());

//get request handling
router.get("/", (req, res) => {
  res.send("I am alive!");
});

//post request handling

//this post req is to respond back to users testing the API.
router.post("/", pingCheck, (req, res) => {
  console.log(req.body);
  if (req.body !== "ping") {
    return res
      .status(400)
      .send("I dont understand what you are trying to give me.");
  }
  res.send("pong!");
});

module.exports = router;

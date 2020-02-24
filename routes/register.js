const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  res.send(
    "Thank you for your report! We will look at this as soon as we can."
  );
});

module.exports = router;

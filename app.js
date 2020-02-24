const morgan = require("morgan");
const helmet = require("helmet");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
//define routes
const bans = require("./routes/bans");
const api = require("./routes/api");
const reports = require("./routes/reports");
const report = require("./routes/report");
const auth = require("./routes/auth");
const login = require("./routes/login");
const ban = require("./routes/ban");
//call middleware
app.use(helmet());
app.use(morgan("tiny"));

//connect to databases.
mongoose
  .connect("mongodb://support-mgmt.arc.net/playground", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected to MongoDB!"))
  .catch(err => console.error("Could not connect to MongoDB..." + err));
//initialize routes
app.use("/api/ban", ban);
app.use("/api/bans", bans);
app.use("/api", api);
app.use("/api/reports", reports);
app.use("/api/report", report);
app.use("/api/auth", auth);
app.use("/api/login", login);
//Check if environment variable is set for port, if it isn't use 5080

const port = process.env.PORT || 5080;
app.listen(port, () => console.log(`listening on port ${port}...`));

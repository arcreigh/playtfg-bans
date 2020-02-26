const config = require("config");
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
  .connect(`mongodb://${config.get("database.server")}/${config.get("database.db")}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log(`Connected to mongoDB on ${config.get("database.server")}!`))
  .catch(err => console.error(`Could not connect to ${config.get("database.server")}...` + err));
//initialize routes
app.use("/api/ban", ban);
app.use("/api/bans", bans);
app.use("/api", api);
app.use("/api/reports", reports);
app.use("/api/report", report);
app.use("/api/auth", auth);
app.use("/api/login", login);
//Check if environment variable is set for port, if it isn't use 5080
app.listen(config.get("general.api-port"), () =>
  console.log(`Listening on port ${config.get("general.api-port")}...`)
);

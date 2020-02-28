const config = require("config");
const morgan = require("morgan");
const helmet = require("helmet");
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const steamStrategy = require("passport-steam").Strategy;
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const app = express();
//define routes
const bans = require("./routes/bans");
const api = require("./routes/api");
const reports = require("./routes/reports");
const report = require("./routes/report");
const auth = require("./routes/auth");
const authSteam = require("./routes/auth-steam");
const authSteamReturn = require("./routes/auth-steam-return");
const login = require("./routes/login");
const ban = require("./routes/ban");
//call middleware
app.use(helmet());
app.use(morgan("tiny"));
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    maxAge: 3600000,
    secret: "unach14#dcde23!",
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);
app.use(passport.initialize());
app.use(passport.session());
//connect to databases.
mongoose
  .connect(`mongodb://${config.get("database.server")}/${config.get("database.db")}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log(`Connected to mongoDB on ${config.get("database.server")}!`))
  .catch(err => console.error(`Could not connect to ${config.get("database.server")}...` + err));

//Setup Passport with steamStrategy
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});
passport.use(
  new steamStrategy(
    {
      returnURL: config.get("passport.steam.returnURL"),
      realm: config.get("passport.steam.realm"),
      apiKey: config.get("passport.steam.api-key")
    },
    function(identifier, profile, done) {
      profile.identifier = identifier;
      return done(null, profile);
    }
  )
);
//initialize routes
app.use("/api/ban", ban);
app.use("/api/bans", bans);
app.use("/api", api);
app.use("/api/reports", reports);
app.use("/api/report", report);
app.use("/api/auth", auth);
app.use("/api/auth/steam", authSteam);
app.use("/api/auth/steam/return", authSteamReturn);
app.use("/api/login", login);
//Check config file for api port.
app.listen(config.get("general.api-port"), () =>
  console.log(`Listening on port ${config.get("general.api-port")}...`)
);

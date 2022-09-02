const bodyParser = require("body-parser");
const passport = require("passport");
const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
require("./passport");

const app = express();
const port = 3002;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  cookieSession({
    name: "Test Project",
    keys: ["Key1", "Key2"],
  })
);

const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.send({ status: 401 });
  }
};

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => res.send("You are logged out"));
app.get("/failed", (req, res) => res.send("Authentication failed"));
app.get("/good", isLoggedIn, (req, res) =>
  res.send(`Welcome mr ${req.user.displayName}`)
);

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/failed" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/good");
  }
);

app.get("/logout", (req, res) => {
  req.session = null;
  req.logout();
  res.redirect("/");
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

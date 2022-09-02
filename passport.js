const passport = require("passport");
var GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});
passport.use(
  new GoogleStrategy(
    {
      clientID:
        "817927816495-4bdar8qk68sclmq3nu04bvaij2ubes5k.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:3000/google/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      return cb(null, profile);
    }
  )
);

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");
const mongoose = require("mongoose");

const User = mongoose.model("users");

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then(user => {
        if (user) {
          // user already exists
          done(null, user);
        } else {
          // create new user record
          new User({ googleId: profile.id })
            .save()
            .then(newUser => done(null, newUser));
        }
      });
    }
  )
);

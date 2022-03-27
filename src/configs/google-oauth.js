const GoogleStrategy = require("passport-google-oauth2").Strategy;
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");

const passport = require("passport");

const User = require("../models/user.model")

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback",
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      //   // email
      //   console.log(profile._json.email);
      //   // password -- ""
      //   console.log(uuidv4());
      //   // role-"customer"

      let user = await User.findOne({ email: profile?.json?.email })
        .lean()
        .exec();

      if (!user) {
        user = await User.create({
          email: profile._json.email,
          password: uuidv4(),
          role: ["customer"],
        });
      }

      console.log(user);
      return done(null, user);
    }
  )
);
module.exports = passport;

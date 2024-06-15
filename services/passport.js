const passport = require("passport");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local");
// const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, { password: 0 }).then((user) => {
    done(null, user);
  });
});

// passport.use(
//   new GoogleStrategy(
//     {
//       callbackURL: "/auth/google/callback",
//       clientID: keys.googleClientID,
//       clientSecret: keys.googleClientSecret,
//       proxy: true,
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       try {
//         const existingUser = await User.findOne({ googleId: profile.id });
//         if (existingUser) {
//           return done(null, existingUser);
//         }
//         const user = await new User({
//           googleId: profile.id,
//           displayName: profile.displayName,
//         }).save();
//         done(null, user);
//       } catch (err) {
//         done(err, null);
//       }
//     }
//   )
// );

passport.use(
  new LocalStrategy({ usernameField: "email" }, async function (email, password, done) {
    try {
      const user = await User.findOne({ email });

      if (!user) return done(null, false, { message: "Invalid email." });

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) return done(null, false, { message: "Incorrect password." });

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

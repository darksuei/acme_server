const passport = require("passport");

const postLogin = async (req, res, next) => {
  try {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        // Authentication failed, redirect to login with an error message
        return res.redirect("/login?error=" + encodeURIComponent(info.message));
      }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        // Authentication successful, redirect to the desired page
        return res.redirect("/dashboard");
      });
    })(req, res, next);
  } catch (error) {
    console.log(error);
    return res.redirect("/login?error=Login failed.");
  }
};

module.exports = postLogin;

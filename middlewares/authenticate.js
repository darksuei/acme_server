const httpStatus = require("http-status");

const authenticate = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(httpStatus.UNAUTHORIZED).send({ error: "You must log in!" });
  }
  next();
};

module.exports = authenticate;

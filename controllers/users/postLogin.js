const httpStatus = require("http-status");

const postLogin = async (_req, res) => {
  return res.status(httpStatus.OK).json({ message: "User logged in successfully" });
};

module.exports = postLogin;

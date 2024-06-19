const Task = require("../../models/task");

const postLogin = async (req, res) => {
  console.log(`${req.user.email} logged in successfully`);
  return res.redirect("/dashboard");
};

module.exports = postLogin;

const httpStatus = require("http-status");

const postUpdateUser = async (req, res) => {
  try {
    const user = req.user;
    const { body } = req;

    // Need to check if the keys in the body are valid
    const allowedKeys = ["fullName", "department", "level", "semester"];

    const isValidOperation = Object.keys(body).every((key) => allowedKeys.includes(key));

    if (!isValidOperation) return res.status(httpStatus.BAD_REQUEST).json({ message: "Invalid fields." });

    Object.keys(body).forEach((key) => {
      user[key] = body[key];
    });

    await user.save();

    return res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
  }
};

module.exports = postUpdateUser;

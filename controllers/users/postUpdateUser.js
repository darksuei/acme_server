const postUpdateUser = async (req, res) => {
  try {
    const user = req.user;
    const { body } = req;

    // Need to check if the keys in the body are valid
    const allowedKeys = ["fullName", "department", "level", "semester"];

    const isValidOperation = Object.keys(body).every((key) => allowedKeys.includes(key));

    if (!isValidOperation) return res.redirect("/settings", { error: "Invalid fields!" });

    Object.keys(body).forEach((key) => {
      user[key] = body[key];
    });

    await user.save();

    return res.redirect("/settings");
  } catch (error) {
    return res.redirect("/settings");
  }
};

module.exports = postUpdateUser;

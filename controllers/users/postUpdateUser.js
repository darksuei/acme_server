const postUpdateUser = async (req, res) => {
  try {
    const user = req.user;

    const { body } = req;

    console.log(body);

    Object.keys(body).forEach((key) => {
      user[key] = body[key];
    });

    console.log(user);

    await user.save();

    return res.redirect("/settings");
  } catch (error) {
    return res.redirect("/settings?error=Failed to update user.");
  }
};

module.exports = postUpdateUser;

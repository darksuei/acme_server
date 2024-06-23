const postUpdateUser = async (req, res) => {
  try {
    const user = req.user;

    const { body } = req;

    Object.keys(body).forEach((key) => {
      user[key] = body[key];
    });

    await user.save();

    return res.redirect("/settings?sucess=User updated successfully.");
  } catch (error) {
    return res.redirect("/settings?error=Failed to update user.");
  }
};

module.exports = postUpdateUser;

const postOtherSettings = async (req, res) => {
  try {
    const user = req.user;

    user.notifications = Boolean(req.body.notifications) || false;
    user.darkMode = Boolean(req.body.darkMode) || false;

    await user.save();

    return res.redirect("/settings");
  } catch (error) {
    console.log(error);
    return res.redirect("/settings?error=Failed to update user.");
  }
};

module.exports = postOtherSettings;

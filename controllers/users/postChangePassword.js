const bcrypt = require("bcrypt");
const User = require("../../models/user");

const postChangePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (!currentPassword || !newPassword || !confirmPassword)
      return res.redirect("/settings?error=Please fill in all fields.");

    if (newPassword === currentPassword)
      return res.redirect("/settings?error=New password must be different from current password.");

    if (newPassword !== confirmPassword)
      return res.redirect("/settings?error=Confirmation password must match new password.");

    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);

    if (!isPasswordValid) return res.redirect("/settings?error=Current password is incorrect.");

    const passwordHash = await bcrypt.hash(newPassword, 10);

    user.password = passwordHash;

    await user.save();

    return res.redirect("/settings?success=Password updated successfully.");
  } catch (err) {
    console.log(err);
  }
};

module.exports = postChangePassword;

const User = require("../../models/user");
const bcrypt = require("bcrypt");
const path = require("path");
const { createNotificationSubscriber } = require("../../services/novu");

const postRegister = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.render(path.join(__dirname, "..", "..", "views", "signup"), {
        error: "Invalid email or password.",
      });

    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res.render(path.join(__dirname, "..", "..", "views", "signup"), {
        error: "Email already exists.",
      });

    const passwordHash = await bcrypt.hash(password, 10);

    let user = new User({ email, password: passwordHash });

    user = await user.save();

    await createNotificationSubscriber({
      id: String(user._id),
      email,
    });

    console.log(`${email} signed up successfully`);

    return res.render(path.join(__dirname, "..", "..", "views", "login"), {
      success: "Signed up successfully!",
    });
  } catch (error) {
    return res.render(path.join(__dirname, "..", "..", "views", "signup"), {
      error: "An error occurred. Please try again.",
    });
  }
};

module.exports = postRegister;

const User = require("../../models/user");
const bcrypt = require("bcrypt");
const { createNotificationSubscriber } = require("../../services/novu");

const postRegister = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) return res.redirect("/signup?error=Please fill in all fields.");

    const existingUser = await User.findOne({ email });

    if (existingUser) return res.redirect("/signup?error=Email already exists.");

    const passwordHash = await bcrypt.hash(password, 10);

    let user = new User({ email, password: passwordHash });

    user = await user.save();

    await createNotificationSubscriber({
      id: String(user._id),
      email,
    });

    console.log(`${email} signed up successfully`);

    return res.redirect("/login?success=Account created successfully.");
  } catch (error) {
    return res.redirect("/signup?error=Signup failed.");
  }
};

module.exports = postRegister;

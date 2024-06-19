const httpStatus = require("http-status");
const User = require("../../models/user");
const bcrypt = require("bcrypt");
const path = require("path");

const postRegister = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(httpStatus.BAD_REQUEST).json({ message: "Invalid Email or Password." });

    const existingUser = await User.findOne({ email });

    if (existingUser) return res.status(httpStatus.CONFLICT).json({ message: "User already exists." });

    // Hash the password before saving it to the database
    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({ email, password: passwordHash });

    await user.save();

    console.log(`${email} created successfully`);

    return res.render(path.join(__dirname, "..", "..", "views", "login"));
  } catch (error) {
    console.log(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
  }
};

module.exports = postRegister;

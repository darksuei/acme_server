const postLogin = async (req, res) => {
  try {
    console.log(`${req.user.email} logged in successfully`);
    return res.redirect("/dashboard");
  } catch (error) {
    return res.render(path.join(__dirname, "..", "..", "views", "signup"), {
      error: "An error occurred. Please try again.",
    });
  }
};

module.exports = postLogin;

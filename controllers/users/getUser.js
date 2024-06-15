const httpStatus = require("http-status");

const getUser = async (req, res) => {
  try {
    const user = req.user;

    return res.status(httpStatus.OK).json({ user });
  } catch (error) {
    console.log(error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
  }
};

module.exports = getUser;

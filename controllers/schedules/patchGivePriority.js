const httpStatus = require("http-status");

const patchGivePriority = async (req, res) => {
  try {
  } catch (err) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" });
  }
};

module.exports = patchGivePriority;

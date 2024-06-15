const Goal = require("../../models/goal");
const httpStatus = require("http-status");

const getGoals = async (req, res) => {
  try {
    const userId = req.user._id;

    const goals = await Goal.find({ userId });

    res.status(httpStatus.OK).json(goals);
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

module.exports = getGoals;

const Goal = require("../../models/goal");
const httpStatus = require("http-status");

const getGoalById = async (req, res) => {
  try {
    const { id } = req.params;

    const userId = req.user._id;

    const goals = await Goal.find({ userId });

    const goal = goals.find((goal) => goal._id.toString() === id);

    if (!goal) {
      return res.status(httpStatus.NOT_FOUND).json({ message: "Goal not found" });
    }

    return res.status(httpStatus.OK).json(goal);
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

module.exports = getGoalById;

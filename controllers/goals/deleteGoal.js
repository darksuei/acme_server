const httpStatus = require("http-status");
const Goal = require("../../models/goal");

const deleteGoal = async (req, res) => {
  try {
    const { id } = req.params;

    const goal = await Goal.findById(id);

    if (!goal) return res.status(httpStatus.NOT_FOUND).json({ message: "Goal not found" });

    if (String(goal.userId) !== String(req.user._id))
      return res.status(httpStatus.UNAUTHORIZED).json({ message: "User not unauthorized" });

    await Goal.deleteOne({ _id: id });

    return res.status(httpStatus.OK).json({ message: "Goal deleted successfully" });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

module.exports = deleteGoal;

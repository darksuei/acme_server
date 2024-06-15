const httpStatus = require("http-status");
const Goal = require("../../models/goal");

const patchGoal = async (req, res) => {
  try {
    const { id } = req.params;

    const { title, description, status } = req.body;

    const goal = await Goal.findById(id);

    if (!goal) return res.status(httpStatus.NOT_FOUND).json({ message: "Goal not found" });

    if (String(goal.userId) !== String(req.user._id))
      return res.status(httpStatus.UNAUTHORIZED).json({ message: "User unauthorized" });

    goal.title = title || goal.title;
    goal.description = description || goal.description;
    goal.status = status || goal.status;

    await goal.save();

    return res.status(httpStatus.OK).json({ message: "Goal updated successfully" });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

module.exports = patchGoal;

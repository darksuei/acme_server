const httpStatus = require("http-status");
const Goal = require("../../models/goal");

const patchGoal = async (req, res) => {
  try {
    const { id } = req.params;

    const { title, description, status, isCompleted, dueDate, priority } = req.body;

    const goal = await Goal.findById(id);

    if (!goal) return res.status(httpStatus.NOT_FOUND).json({ message: "Goal not found" });

    if (String(goal.userId) !== String(req.user._id))
      return res.status(httpStatus.UNAUTHORIZED).json({ message: "User unauthorized" });

    goal.title = title ?? goal.title;
    goal.description = description ?? goal.description;
    goal.isCompleted = isCompleted ?? goal.isCompleted;
    goal.dueDate = dueDate ?? goal.dueDate;
    goal.priority = priority ?? goal.priority;

    await goal.save();

    return res.redirect("/dashboard?success=Success.");
  } catch (error) {
    return res.redirect("/dashboard?error=Failed to update.");
  }
};

module.exports = patchGoal;

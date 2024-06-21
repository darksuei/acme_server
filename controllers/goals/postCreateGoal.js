const Goal = require("../../models/goal");
const scheduleEDF = require("../../services/edf");

const postCreateGoal = async (req, res) => {
  try {
    const { title, description, dueDate, priority } = req.body;
    const userId = req.user._id;

    await Goal.create({
      title,
      description,
      dueDate,
      userId,
      priority,
    });

    const goals = await Goal.find({ userId });

    const updatedGoals = scheduleEDF(goals);

    return res.redirect("/dashboard");
  } catch (error) {
    return res.redirect("/dashboard");
  }
};

module.exports = postCreateGoal;

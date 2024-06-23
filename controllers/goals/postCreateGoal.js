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

    scheduleEDF(goals);

    return res.redirect("/dashboard?success=Goal created successfully.");
  } catch (error) {
    return res.redirect("/dashboard?error=Failed to create goal.");
  }
};

module.exports = postCreateGoal;

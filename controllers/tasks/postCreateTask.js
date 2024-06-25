const Task = require("../../models/task");

const postCreateTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    const task = new Task({
      title,
      description,
      userId: req.user._id,
    });

    await task.save();

    return res.redirect("/dashboard?success=Success.");
  } catch (error) {
    return res.redirect("/dashboard?error=Failed.");
  }
};

module.exports = postCreateTask;

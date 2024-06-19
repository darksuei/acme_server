const httpStatus = require("http-status");
const Task = require("../../models/task");

const postCreateTask = async (req, res) => {
  try {
    console.log(req.body);
    const { title } = req.body;

    const task = new Task({
      title,
      userId: req.user._id,
    });

    await task.save();

    return res.redirect("/dashboard");
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

module.exports = postCreateTask;

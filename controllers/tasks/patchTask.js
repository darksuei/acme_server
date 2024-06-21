const httpStatus = require("http-status");
const Task = require("../../models/task");

const patchTask = async (req, res) => {
  try {
    const { id } = req.params;

    const { title, isCompleted } = req.body;

    const task = await Task.findById(id);

    if (!task) return res.status(httpStatus.NOT_FOUND).json({ message: "Task not found" });

    if (String(task.userId) !== String(req.user._id))
      return res.status(httpStatus.UNAUTHORIZED).json({ message: "User unauthorized" });

    task.title = title || task.title;
    task.isCompleted = isCompleted ?? task.isCompleted;

    const updatedTask = await task.save();

    return res.status(httpStatus.OK).json({ message: "Task updated successfully", task: updatedTask });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

module.exports = patchTask;

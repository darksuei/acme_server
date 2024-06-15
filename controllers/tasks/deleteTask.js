const httpStatus = require("http-status");
const Task = require("../../models/task");

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);

    if (!task) return res.status(httpStatus.NOT_FOUND).json({ message: "Task not found" });

    if (String(task.userId) !== String(req.user._id))
      return res.status(httpStatus.UNAUTHORIZED).json({ message: "User not unauthorized" });

    await Task.deleteOne({ _id: id });

    res.status(httpStatus.OK).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

module.exports = deleteTask;

const httpStatus = require("http-status");
const Task = require("../../models/task");

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user._id });
    return res.status(httpStatus.OK).json({ tasks });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

module.exports = getTasks;

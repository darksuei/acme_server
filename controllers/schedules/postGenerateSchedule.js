const httpStatus = require("http-status");
const scheduleEDF = require("../../services/edf");
const Goal = require("../../models/goal");

const postGenerateSchedule = async (req, res) => {
  try {
    const user = req.user;
    const userId = user._id;

    const goals = await Goal.find({ userId });

    const schedule = scheduleEDF(goals);

    user.hasSchedule = true;

    await user.save();

    res.status(httpStatus.OK).json(schedule);
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

module.exports = postGenerateSchedule;

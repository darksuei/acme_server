const httpStatus = require("http-status");
const scheduleEDF = require("../../services/edf");
const Goal = require("../../models/goal");
const { sendNewScheduleEmail } = require("../../services/novu");

const postGenerateSchedule = async (req, res) => {
  try {
    console.log("hit");
    const user = req.user;
    const userId = user._id;

    const goals = await Goal.find({ userId });

    const schedule = scheduleEDF(goals);

    user.hasSchedule = true;

    await user.save();

    if (user.notifications === true) {
      await sendNewScheduleEmail({
        id: String(user._id),
        email: user.email,
        goalsCount: goals.length,
      });
    }

    return res.status(httpStatus.OK).json(schedule);
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

module.exports = postGenerateSchedule;

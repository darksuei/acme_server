const httpStatus = require("http-status");
const Goal = require("../../models/goal");
const scheduleEDF = require("../../services/edf");

const patchGivePriority = async (req, res) => {
  try {
    const goals = await Goal.find({ userId: req.user._id });

    const goal = await Goal.findById(req.params.id);

    if (!goal) return res.status(httpStatus.NOT_FOUND).json({ message: "Goal not found" });

    goal.edfIndex = 0;
    goal.userDefinedPriority = true;

    await goal.save();

    goals.forEach((g) => {
      if (g._id.toString() !== req.params.id && g.userDefinedPriority === true) {
        g.edfIndex += 1;
        g.save();
      }
    });

    if (req.user.hasSchedule) {
      console.log("Updating schedule...");
      scheduleEDF(
        goals.filter((g) => g.userDefinedPriority === false),
        goals.filter((g) => g.userDefinedPriority === true).length
      );
    }

    return res.status(httpStatus.OK).json({ message: "Priority updated successfully" });
  } catch (err) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};

module.exports = patchGivePriority;

const httpStatus = require("http-status");
const Goal = require("../../models/goal");

const postCreateGoal = async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;
    console.log(req.body);
    const userId = req.user._id;
    const newGoal = await Goal.create({
      title,
      description,
      dueDate,
      userId,
    });

    // res.status(httpStatus.CREATED).json(newGoal);
    return res.redirect("/dashboard");
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

module.exports = postCreateGoal;

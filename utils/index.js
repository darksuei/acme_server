const Task = require("../models/task");
const Goal = require("../models/goal");
const moment = require("moment");

const renderDashboardElements = async (user) => {
  const tasks = await Task.find({ userId: user._id });
  const goals = await Goal.find({ userId: user._id, dueDate: { $gt: new Date() } });
  const currentDate = moment().format("dddd, Do MMMM");

  tasks.map((task) => {
    task.created = moment(task.createdAt).fromNow();
    return task;
  });

  goals.map((goal) => {
    goal.created = moment(goal.createdAt).fromNow();
    goal.deadline = moment(goal.dueDate).format("LL");
    return goal;
  });

  return {
    tasks: tasks.reverse(),
    goals: goals.sort((a, b) => a.edfIndex - b.edfIndex),
    currentDate,
    user,
  };
};

module.exports = renderDashboardElements;

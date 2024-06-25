const scheduleEDF = (goals, startIndex = 0) => {
  if (!Array.isArray(goals)) throw new Error("Input must be an array of objects.");

  const priorityOrder = {
    high: 1,
    medium: 2,
    low: 3,
  };

  goals.sort((a, b) => {
    if (a.dueDate.getTime() - b.dueDate.getTime() !== 0) {
      return a.dueDate.getTime() - b.dueDate.getTime();
    }
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  goals.forEach(async (goal, index) => {
    goal.edfIndex = startIndex + index;

    await goal.save();
  });

  return goals;
};

module.exports = scheduleEDF;

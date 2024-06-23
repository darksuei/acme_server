const scheduleEDF = (goals, startIndex = 0) => {
  if (!Array.isArray(goals)) {
    throw new Error("Input must be an array of objects.");
  }

  const priorityOrder = {
    High: 1,
    Medium: 2,
    Low: 3,
  };

  goals.sort((a, b) => {
    if (a.dueDate - b.dueDate !== 0) {
      return a.dueDate - b.dueDate;
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

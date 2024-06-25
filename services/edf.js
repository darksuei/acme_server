const scheduleEDF = (tasks, startIndex = 0) => {
  if (!Array.isArray(tasks)) throw new Error("Input must be an array of objects.");

  const priorityOrder = {
    high: 1,
    medium: 2,
    low: 3,
  };

  tasks.sort((a, b) => {
    if (a.dueDate.getTime() - b.dueDate.getTime() !== 0) {
      return a.dueDate.getTime() - b.dueDate.getTime();
    } else {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
  });

  tasks.forEach(async (task, index) => {
    task.edfIndex = startIndex + index;

    await task.save();
  });

  return tasks;
};

module.exports = scheduleEDF;

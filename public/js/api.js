function deleteTask(taskId) {
  fetch(`/api/task/delete-task/${String(taskId)}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      window.location.reload();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function deleteGoal(goalId) {
  fetch(`/api/goal/delete-goal/${String(goalId)}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      window.location.reload();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function patchPriority(goalId) {
  fetch(`/api/schedule/update-schedule-priority/${String(goalId)}`, {
    method: "PATCH",
  })
    .then((response) => response.json())
    .then((data) => {
      window.location.reload();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function toggleTaskStatus(taskId, isCompleted) {
  fetch(`/api/task/update-task/${taskId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ isCompleted: !convertToBoolean(isCompleted) }),
  })
    .then((response) => response.json())
    .then((data) => {
      window.location.reload();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function convertToBoolean(value) {
  if (value === "false") {
    return false;
  } else {
    return Boolean(value);
  }
}

function generateSchedule(hasSchedule) {
  if (convertToBoolean(hasSchedule) === false) {
    fetch("/api/schedule/create-schedule", {
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {})
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  window.location.href = "/new-schedule";
}

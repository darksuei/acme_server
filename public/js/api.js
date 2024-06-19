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

// Submit Form Wrapper Function
function submitForm(formId, url, redirectUrl) {
  const form = document.getElementById(formId);

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(form);
    const formDataObject = Object.fromEntries(formData.entries());

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formDataObject),
    })
      .then((response) => response.json())
      .then((data) => {
        if (redirectUrl) {
          window.location.href = redirectUrl;
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
}

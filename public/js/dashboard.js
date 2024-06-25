const notyf = new Notyf();

function openEditGoalModal(id) {
  localStorage.setItem("activeGoalId", id);

  const closeEditGoal = document.getElementById("closeEditGoal");
  const editGoalPopup = document.getElementById("editGoalPopup");

  editGoalPopup.style.display = "block";

  closeEditGoal.addEventListener("click", () => {
    editGoalPopup.style.display = "none";
  });

  fetch(`/api/goal/get-goal/${id}`)
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("goalTitle").value = data.title;
      document.getElementById("goalNote").value = data.description;
      document.getElementById("goalDate").value = new Date(data.dueDate).toISOString().split("T")[0];
      document.getElementById("priority").value = data.priority;
    })
    .catch((err) => {
      console.log(err);
    });

  document.getElementById("editGoalInput").action = `/api/goal/update-goal/${id}`;
}

document.addEventListener("DOMContentLoaded", (event) => {
  const openTaskPopupBtn = document.getElementById("openTaskPopupBtn");
  const closeTaskPopupBtn = document.getElementById("closeTaskPopupBtn");
  const taskPopup = document.getElementById("taskPopup");

  const openGoalPopupBtn = document.getElementById("openGoalPopupBtn");
  const closeGoalPopupBtn = document.getElementById("closeGoalPopupBtn");
  const goalPopup = document.getElementById("goalPopup");

  const editGoalPopup = document.getElementById("editGoalPopup");

  openTaskPopupBtn.addEventListener("click", () => {
    taskPopup.style.display = "block";
  });

  closeTaskPopupBtn.addEventListener("click", () => {
    taskPopup.style.display = "none";
  });

  openGoalPopupBtn.addEventListener("click", () => {
    goalPopup.style.display = "block";
  });

  closeGoalPopupBtn.addEventListener("click", () => {
    goalPopup.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (event.target == taskPopup) {
      taskPopup.style.display = "none";
    }

    if (event.target == goalPopup) {
      goalPopup.style.display = "none";
    }

    if (event.target == editGoalPopup) {
      editGoalPopup.style.display = "none";
    }
  });
});
document.addEventListener("DOMContentLoaded", function () {
  setMinDate();
  const newItemInput = document.getElementById("new-item-input");
  const addButton = document.getElementById("add-button");
  const popupButton = document.getElementById("popup-button");
  const popup = document.getElementById("popup");
  const closeButton = document.querySelector(".close-button");

  newItemInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      addButton.click();
    }
  });

  popupButton.addEventListener("click", function () {
    popup.style.display = "flex";
  });

  closeButton.addEventListener("click", function () {
    popup.style.display = "none";
  });

  window.addEventListener("click", function (e) {
    if (e.target === popup) {
      popup.style.display = "none";
    }
  });
});
// script.js

function addGoal() {
  var title = document.getElementById("goalTitle").value;
  var note = document.getElementById("goalNote").value;

  if (title && note) {
    var goalsList = document.getElementById("goalsList");

    var goalItem = document.createElement("div");
    goalItem.className = "goal-item";

    var goalHeader = document.createElement("div");
    goalHeader.className = "goal-header";

    var goalTitle = document.createElement("h3");
    goalTitle.innerText = title;

    var deleteButton = document.createElement("button");
    deleteButton.className = "delete-btn";
    deleteButton.innerText = "Delete";
    deleteButton.onclick = function () {
      deleteGoal(this);
    };

    goalHeader.appendChild(goalTitle);
    goalHeader.appendChild(deleteButton);

    var goalNote = document.createElement("div");
    goalNote.className = "goal-note";

    var noteText = document.createElement("p");
    noteText.innerText = "Note: " + note;

    goalNote.appendChild(noteText);

    goalItem.appendChild(goalHeader);
    goalItem.appendChild(goalNote);

    goalsList.appendChild(goalItem);

    document.getElementById("goalTitle").value = "";
    document.getElementById("goalNote").value = "";
  } else {
    alert("Please enter both a title and a note.");
  }
}

function deleteGoal(button) {
  var goalItem = button.closest(".goal-item");
  goalItem.remove();
}

function setMinDate() {
  var dateInputs = document.querySelectorAll(".goalDate");

  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  dateInputs.forEach((dateInput) => {
    const minDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;
    dateInput.min = minDateTime;
  });
}

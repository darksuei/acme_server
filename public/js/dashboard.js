const notyf = new Notyf();

function openEditGoalModal(id) {
  localStorage.setItem("activeGoalId", id);
  console.log(id, localStorage.getItem("activeGoalId"));

  const closeEditGoal = document.getElementById("closeEditGoal");
  const editGoalPopup = document.getElementById("editGoalPopup");

  editGoalPopup.style.display = "block";

  closeEditGoal.addEventListener("click", () => {
    editGoalPopup.style.display = "none";
  });

  fetch(`/api/goal/get-goal/${id}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
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
  const checkbookList = document.getElementById("checkbook-list");
  const newItemInput = document.getElementById("new-item-input");
  const addButton = document.getElementById("add-button");
  const popupButton = document.getElementById("popup-button");
  const popup = document.getElementById("popup");
  const closeButton = document.querySelector(".close-button");

  //   checkbookList.addEventListener("click", function (e) {
  //     if (e.target.classList.contains("checkbox")) {
  //       const listItem = e.target.parentElement;
  //       listItem.classList.toggle("crust");
  //     }

  //     if (e.target.classList.contains("delete-button")) {
  //       e.target.parentElement.remove();
  //     }
  //   });

  // addButton.addEventListener('click', function() {
  //     const newItemText = newItemInput.value.trim();
  //     if (newItemText !== '') {
  //         const newItem = document.createElement('li');
  //         newItem.innerHTML = `<input type="checkbox" class="checkbox"><span class="item-text">${newItemText}</span><svg class="delete-button" xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 48 48"><title>trash can</title><g stroke-width="1" fill="#000000" stroke="#000000" class="nc-icon-wrapper"><path d="M39,16,37.249,42.266A4,4,0,0,1,33.258,46H14.742a4,4,0,0,1-3.991-3.734L9,16" fill="none" stroke="#000000" stroke-linecap="square" stroke-miterlimit="10"></path><line data-color="color-2" x1="4" y1="10" x2="44" y2="10" fill="none" stroke-linecap="square" stroke-miterlimit="10"></line><path data-cap="butt" data-color="color-2" d="M17,10V2H31v8" fill="none" stroke-miterlimit="10"></path></g></svg>`;
  //         checkbookList.appendChild(newItem);
  //         newItemInput.value = '';
  //     }
  // });

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

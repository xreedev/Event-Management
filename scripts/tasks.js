document.addEventListener("DOMContentLoaded", function () {
  const taskJson = localStorage.getItem("tasks");
  tasks = JSON.parse(taskJson);
  tasksTable = document.getElementById("tasks-table");
  requiredEvent = localStorage.getItem("eventId");
  taskLength = 0;

  tasks.forEach((element) => {
    let taskId = element["eventId"];
    if (taskId == requiredEvent) {
      taskLength += 1;
      let taskName = element["taskName"];
      console.log(taskName, taskId);
      let taskColumn = createRow(taskId, taskName);
      tasksTable.appendChild(taskColumn);
    }
  });
});

function createRow(taskId, taskName) {
  let idRow = document.createElement("td");
  let nameRow = document.createElement("td");
  let statusRow = createStatusSelect();

  idRow.textContent = taskId;
  nameRow.textContent = taskName;

  let taskColumn = document.createElement("tr");
  taskColumn.id = taskId;

  taskColumn.appendChild(idRow);
  taskColumn.appendChild(nameRow);
  taskColumn.appendChild(statusRow);

  return taskColumn;
}

function createStatusSelect() {
  let statusRow = document.createElement("td");
  let statusSelect = document.createElement("select");

  let notStartedOption = document.createElement("option");
  notStartedOption.textContent = "Not Started";
  notStartedOption.value = 0;

  let progressOption = document.createElement("option");
  progressOption.textContent = "In Progress";
  progressOption.value = 1;

  let startedOption = document.createElement("option");
  startedOption.textContent = "Started";
  startedOption.value = 2;

  statusSelect.appendChild(notStartedOption);
  statusSelect.appendChild(progressOption);
  statusSelect.appendChild(startedOption);

  statusRow.appendChild(statusSelect);
  return statusRow;
}

function confirmStatus() {
  let statusSelects = tasksTable.querySelectorAll("select");
  let status = 0;

  statusSelects.forEach((select) => {
    let statusValue = parseInt(select.value);
    status += statusValue;
  });

  if (status > 0 && status < 2 * taskLength) {
    console.log("status");
    localStorage.setItem("status-event-" + requiredEvent, "In Progress");
  } else if (status > 0 && status == tasks.length) {
    localStorage.setItem("status-event-" + requiredEvent, "Complete");
  }
  console.log(status);
}

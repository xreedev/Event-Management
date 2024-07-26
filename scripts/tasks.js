document.addEventListener("DOMContentLoaded", function () {
  const taskJson = localStorage.getItem("tasks");
  tasks = JSON.parse(taskJson);
  tasksTable = document.getElementById("tasks-table");
  requiredEvent = localStorage.getItem("eventId");
  taskCount = 0;
  statusArray = [];

  tasks.forEach((element) => {
    let taskId = element["eventId"];
    if (taskId == requiredEvent) {
      let taskName = element["taskName"];
      let taskColumn = createRow(taskId, taskName);
      tasksTable.appendChild(taskColumn);
    }
  });
  if (localStorage.getItem("task-status-" + requiredEvent) == null) {
    localStorage.setItem("task-status-" + requiredEvent, statusArray);
  }
  updateStatus();
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
  taskCount += 1;
  let statusRow = document.createElement("td");
  let statusSelect = document.createElement("select");
  statusSelect.id = "task" + taskCount;

  let notStartedOption = document.createElement("option");
  notStartedOption.textContent = "Not Started";
  notStartedOption.value = "Not Started";

  let progressOption = document.createElement("option");
  progressOption.textContent = "In Progress";
  progressOption.value = "In Progress";

  let startedOption = document.createElement("option");
  startedOption.textContent = "Complete";
  startedOption.value = "Complete";

  statusSelect.appendChild(notStartedOption);
  statusSelect.appendChild(progressOption);
  statusSelect.appendChild(startedOption);

  statusRow.appendChild(statusSelect);
  statusArray.push("Not Started");
  return statusRow;
}

function confirmStatus() {
  statusList = [];
  let statusSelects = tasksTable.querySelectorAll("select");
  statusSelects.forEach((select) => {
    let status = select.value;
    statusList.push(status);
  });
  let statusListJson = JSON.stringify(statusList);
  console.log(statusListJson)
  localStorage.setItem("task-status-" + requiredEvent, statusListJson);
  window.location.href = "./events.html";
}
function updateStatus() {
  let statusListJson = localStorage.getItem("task-status-" + requiredEvent);
  let statusList = JSON.parse(statusListJson);

  for (let i = 0; i < statusList.length; i++) {
    let taskId = "task" + (i + 1);
    let statusSelect = document.getElementById(taskId);
    statusSelect.value = statusList[i];
  }
}

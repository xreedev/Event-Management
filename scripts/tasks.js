const taskJson = localStorage.getItem("tasks");
let tasks = JSON.parse(taskJson);
console.log(tasks);
let tasksTable = document.getElementById("tasks-table");
let requiredTask = localStorage.getItem("eventId");

tasks.forEach((element) => {
  let taskId = element["eventId"];
  if (taskId == requiredTask) {
    let taskName = element["taskName"];
    console.log(taskName, taskId);
    let taskColumn = createRow(taskId, taskName);
    tasksTable.appendChild(taskColumn);
  }
});

function createRow(taskId, taskName) {
  let idRow = document.createElement("td");
  let nameRow = document.createElement("td");

  idRow.textContent = taskId;
  nameRow.textContent = taskName;

  let taskColumn = document.createElement("tr");
  taskColumn.id = taskId;

  taskColumn.appendChild(idRow);
  taskColumn.appendChild(nameRow);

  return taskColumn;
}

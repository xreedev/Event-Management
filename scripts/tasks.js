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
  let statusRow=createStatusSelect();

  idRow.textContent = taskId;
  nameRow.textContent = taskName;

  let taskColumn = document.createElement("tr");
  taskColumn.id = taskId;

  taskColumn.appendChild(idRow);
  taskColumn.appendChild(nameRow);
  taskColumn.appendChild(statusRow);

  return taskColumn;
}

function createStatusSelect(){
    let statusRow = document.createElement("td");
    let statusSelect=document.createElement('select');

    let notStartedOption=document.createElement('option');
    notStartedOption.textContent="Not Started";
    notStartedOption.value="Not-Started";

    let progressOption=document.createElement('option');
    progressOption.textContent="In Progress";
    progressOption.value="In Progress";

    let startedOption=document.createElement('option');
    startedOption.textContent="Started";
    startedOption.value="Started";

    statusSelect.appendChild(notStartedOption);
    statusSelect.appendChild(progressOption);
    statusSelect.appendChild(startedOption);

    statusRow.appendChild(statusSelect);
    return statusRow;
}
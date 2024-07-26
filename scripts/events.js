document.addEventListener("DOMContentLoaded", function () {
  const eventJson = localStorage.getItem("events");
  let events = JSON.parse(eventJson);
  let eventsTable = document.getElementById("events-table");

  events.forEach((element) => {
    let eventName = element["eventName"];
    let eventId = element["eventId"];
    let startDate = element["startDate"];
    let endDate = element["endDate"];

    let eventColumn = createRow(eventId, eventName, startDate, endDate);

    eventsTable.appendChild(eventColumn);
    updateProgress(eventId);
    checkFailure(startDate, eventId);
  });
});

function createRow(eventId, eventName, startDate, endDate) {
  let idRow = document.createElement("td");
  let nameRow = document.createElement("td");
  let startDateRow = document.createElement("td");
  let endDateRow = document.createElement("td");

  let progressRow = document.createElement("td");
  progressRow.id = "progress-" + eventId;
  let actionRow = createAction(eventId);

  idRow.textContent = eventId;
  nameRow.textContent = eventName;
  startDateRow.textContent = startDate;
  endDateRow.textContent = endDate;
  progressRow.textContent = "Not Started";

  let eventColumn = document.createElement("tr");
  eventColumn.id = eventId;

  eventColumn.appendChild(idRow);
  eventColumn.appendChild(nameRow);
  eventColumn.appendChild(startDateRow);
  eventColumn.appendChild(endDateRow);
  eventColumn.appendChild(progressRow);
  eventColumn.appendChild(actionRow);

  return eventColumn;
}

function createAction(eventId) {
  let actionRow = document.createElement("td");
  let actionAnchor = document.createElement("a");
  actionAnchor.onclick = function () {
    goToTasks(eventId);
  };
  let actionButton = document.createElement("button");

  actionButton.textContent = "TASK";
  actionAnchor.appendChild(actionButton);
  actionRow.appendChild(actionAnchor);

  return actionRow;
}

function goToTasks(eventId) {
  localStorage.setItem("eventId", eventId);
  window.location.href = "./tasks.html";
}

function updateProgress(eventId) {
  let progressRow = document.getElementById("progress-" + eventId);

  let taskStatusesJson = localStorage.getItem("task-status-" + eventId);
  if (taskStatusesJson) {
    let taskStatuses = JSON.parse(taskStatusesJson);
    if (taskStatuses.includes("In Progress")) {
      progressRow.textContent = "In Progress";
    } else if (taskStatuses.every((status) => status === "Complete")) {
      progressRow.textContent = "Complete";
    }
  }
}

function checkFailure(startDateStr, eventId) {
  let progressRow = document.getElementById("progress-" + eventId);
  let startDate = new Date(startDateStr);
  const todayDate = new Date();
  if (startDate < todayDate) {
    console.log(todayDate);
    progressRow.textContent = "Failed";
    progressRow.id = "";
  }
}

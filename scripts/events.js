document.addEventListener("DOMContentLoaded", function () {
  const eventJson = localStorage.getItem("events");
  let events = JSON.parse(eventJson);
  let eventsTable = document.getElementById("events-table");
  failed=[];

  events.forEach((element) => {
    let eventName = element["eventName"];
    let eventId = element["eventId"];
    let startDate = element["startDate"];
    let endDate = element["endDate"];

    let eventColumn = createRow(eventId, eventName, startDate, endDate);

    eventsTable.appendChild(eventColumn);
    if (!localStorage.getItem("task-status-" + eventId)) {
      localStorage.setItem(
        "task-status-" + eventId,
        JSON.stringify(["Not Started", "Not Started", "Not Started"])
      );
    }

    updateProgress(eventId);
    checkFailure(startDate, eventId);
  });
  localStorage.setItem('failedTasks',failed);
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
  actionButton.className = "action-button";

  actionButton.textContent = "TASK";
  actionAnchor.appendChild(actionButton);
  actionRow.appendChild(actionAnchor);

  return actionRow;
}

function goToTasks(eventId) {
  let tasks=JSON.parse(localStorage.getItem("tasks"));
  if(tasks==null || tasks.length==0){
    setWarningPopup("No tasks added");
    return;
  }
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
    failed.push(eventId);
    console.log(todayDate);
    progressRow.textContent = "Failed";
    progressRow.id = "";
  }
}

function setWarningPopup(msg) {
  document.getElementById("warning-msg").innerText = "MESSAGE\n" + msg;
  document.getElementById("warning-popup").style.padding = "20px";
  document.getElementById("warning-popup").style.border = "2px solid black";
  document.getElementById("contents-div").style.opacity = "10%";

  let closeButton = document.getElementById("close");
  if (!closeButton) {
    closeButton = document.createElement("input");
    closeButton.className = "close-btn";
    closeButton.id = "close";
    closeButton.value = "CLOSE";
    closeButton.type = "button";
    closeButton.addEventListener("click", reverseInvoice);
    document.getElementById("warning-popup").appendChild(closeButton);
  }
}

function reverseInvoice() {
  document.getElementById("warning-msg").innerText = "";
  document.getElementById("close").remove();
  document.getElementById("warning-popup").style.border = "none";
  document.getElementById("contents-div").style.opacity = "100%";
  document.getElementById("warning-popup").style.padding = "0px";
}
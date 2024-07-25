localStorage.clear();
class Event {
  constructor(eventId, eventName, startDate, endDate) {
    this.eventName = eventName;
    this.eventId = eventId;
    this.startDate = startDate;
    this.endDate = endDate;
  }
}

class Task {
  constructor(eventId, taskName) {
    this.eventId = eventId;
    this.taskName = taskName;
  }
}

function submitCsv() {
  let csvType = document.getElementById("csv-type-select").value;
  let csvFile = document.getElementById("input-file").files[0];
  if (csvFile == "" || csvFile == null) {
    setWarningPopup("Please select a CSV file.");
    return;
  } else {
    if (!csvFile["name"].toLowerCase().endsWith(".csv")) {
      setWarningPopup("Please select a file with a .csv extension.");
      document.getElementById("input-file").value = "";
      return;
    }
  }

  if (csvFile) {
    const reader = new FileReader();

    reader.onload = function (e) {
      const contents = e.target.result;
      if (csvType == "events") {
        if (parseToEvent(contents)) {
          setWarningPopup("Events added successfully");
        }
      } else {
        if (parseToTask(contents)) {
          setWarningPopup("Tasks added successfully");
        }
      }
    };

    reader.readAsText(csvFile);
  }
}

function parseToEvent(contents) {
  let eventList = [];
  const rows = contents.split("\n");
  const header = rows.shift();

  if (validateHeader(header, "events")) {
    return false;
  }

  rows.forEach((row) => {
    if (row.trim() !== "") {
      const columns = row.split(",");
      const event = new Event(columns[0], columns[1], columns[2], columns[3]);
      eventList.push(event);
    }
  });
  localStorage.setItem("events", JSON.stringify(eventList));
  return eventList;
}

function parseToTask(contents) {
  let taskList = [];
  const rows = contents.split("\n");
  const header = rows.shift();
  if (validateHeader(header, "tasks")) {
    return false;
  }
  rows.forEach((row) => {
    const columns = row.split(",");
    const event = new Task(columns[0], columns[1]);
    taskList.push(event);
  });
  localStorage.setItem("tasks", JSON.stringify(taskList));
  return taskList;
}

function validateHeader(header, type) {
  if (type == "events") {
    if (!(header.trim() == "eventid,eventname,start_date,end_date")) {
      setWarningPopup("Incorrect event headers");
      document.getElementById("input-file").value = "";
      return true;
    }
  } else if (type == "tasks") {
    if (!(header.trim() == "eventid,task_name")) {
      setWarningPopup("Incorrect task headers");
      document.getElementById("input-file").value = "";
      return true;
    }
  }
}

function setWarningPopup(msg) {
  document.getElementById("warning-msg").innerText = "MESSAGE\n" + msg;
  document.getElementById("warning-popup").style.padding = "20px";
  let closeButton = document.createElement("input");
  closeButton.className = "close-btn";
  closeButton.id = "close";
  closeButton.value = "CLOSE";
  closeButton.addEventListener("click", reverseInvoice);
  document.getElementById("warning-popup").appendChild(closeButton);
  document.getElementById("warning-popup").style.border = "2px solid black";
  document.getElementById("csv-input-div").style.opacity = "10%";
}
function reverseInvoice() {
  document.getElementById("warning-msg").innerText = "";
  document.getElementById("close").remove();
  document.getElementById("warning-popup").style.border = "none";
  document.getElementById("csv-input-div").style.opacity = "100%";
  document.getElementById("warning-popup").style.padding = "0px";
}

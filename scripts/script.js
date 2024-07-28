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

// Declare eventIdArray globally
let eventIdArray = [];

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById('csv-type-select').addEventListener('change', function() {
    document.getElementById('input-file').value = ''; 
  });

  document.getElementById('refresh-button').addEventListener('click', function() {
    alert("All data erased");
    document.getElementById('input-file').value = ''; 
    localStorage.clear();
    eventIdArray = []; // Clear the global eventIdArray
  });
});

function submitCsv() {
  let csvType = document.getElementById("csv-type-select").value;
  let csvFile = document.getElementById("input-file").files[0];

  if (!csvFile) {
    setWarningPopup("Please select a CSV file.");
    return;
  }

  if (!csvFile.name.toLowerCase().endsWith(".csv")) {
    setWarningPopup("Please select a file with a .csv extension.");
    document.getElementById("input-file").value = "";
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => handleFileLoad(e, csvType);
  reader.readAsText(csvFile);
}

function handleFileLoad(e, csvType) {
  const contents = e.target.result;
  let success = false;

  if (csvType === "events") {
    success = parseToEvent(contents);
    if (success) {setWarningPopup("Events added successfully");
      document.getElementById('input-file').value = ''; }
      
  } else if (csvType === "tasks") {
    success = parseToTask(contents);
    if (success){setWarningPopup("Tasks added successfully");
      document.getElementById('input-file').value = ''; } 
  }
}

function parseToEvent(contents) {
  let eventList = [];
  eventIdArray = []; // Ensure eventIdArray is cleared
  const rows = contents.split("\n");
  const header = rows.shift();

  if (validateHeader(header, "events")) return false;

  for (let row of rows) {
    if (row.trim() !== "" && !processEventRow(row, eventList, eventIdArray)) {
      return false;
    }
  }

  localStorage.setItem("events", JSON.stringify(eventList));
  return eventList.length > 0;
}

function processEventRow(row, eventList, eventIdArray) {
  const columns = row.split(",");
  if (columns.some((column) => column.trim() === "")) {
    setWarningPopup("There are null values in file");
    document.getElementById('input-file').value = '';
    return false;
  }

  if (isValidDate(columns[2]) && isValidDate(columns[3])) {
    const newEventStart = new Date(columns[2]);
    const newEventEnd = new Date(columns[3]);

    if (!checkStartAndEnd(columns[2], columns[3])) {
      setWarningPopup("Some events have wrong start and end date");
      document.getElementById('input-file').value = '';
      return false;
    }

    if (!checkOverlap(newEventStart, newEventEnd, eventList)) {
      if (eventIdArray.includes(columns[0])) {
        setWarningPopup("There are repeated events");
        document.getElementById('input-file').value = '';
        return false;
      }
      const event = new Event(columns[0], columns[1], columns[2], columns[3]);
      eventIdArray.push(columns[0]);
      eventList.push(event);
    } else {
      setWarningPopup("There are overlapping events. Please check CSV.");
      document.getElementById('input-file').value = '';
      return false;
    }
  } else {
    setWarningPopup("Invalid dates were found. Check date format and value.");
    document.getElementById('input-file').value = '';
    return false;
  }
  return true;
}

function checkOverlap(newEventStart, newEventEnd, eventList) {
  return eventList.some((event) => {
    const existingEventStart = new Date(event.startDate);
    const existingEventEnd = new Date(event.endDate);
    return dateRangeOverlaps(existingEventStart, existingEventEnd, newEventStart, newEventEnd);
  });
}

function parseToTask(contents) {
  let taskList = [];
  const rows = contents.split("\n");
  const header = rows.shift();

  if (validateHeader(header, "tasks")) return false;

  for (let row of rows) {
    if (row.trim() !== "" && !processTaskRow(row, taskList)) {
      return false;
    }
  }

  localStorage.setItem("tasks", JSON.stringify(taskList));
  return true;
}

function processTaskRow(row, taskList) {
  const columns = row.split(",");
  if (columns.some((column) => column.trim() === "")) {
    setWarningPopup("There are null values in file");
    document.getElementById('input-file').value = '';
    return false;
  }

  const eventId = columns[0];
  const taskName = columns[1];

  if (!eventIdArray.includes(eventId)) {
    setWarningPopup("Event ID in task does not exist");
    document.getElementById('input-file').value = '';
    return false;
  }

  const task = new Task(eventId, taskName);
  taskList.push(task);
  return true;
}

function validateHeader(header, type) {
  const eventHeader = "eventid,eventname,start_date,end_date";
  const taskHeader = "eventid,task_name";

  if (type === "events" && header.trim() !== eventHeader) {
    setWarningPopup("Incorrect event headers");
    document.getElementById("input-file").value = "";
    return true;
  } else if (type === "tasks" && header.trim() !== taskHeader) {
    setWarningPopup("Incorrect task headers");
    document.getElementById("input-file").value = "";
    return true;
  }
  return false;
}

function setWarningPopup(msg) {
  document.getElementById("warning-msg").innerText = "MESSAGE\n" + msg;
  document.getElementById("warning-popup").style.padding = "20px";
  document.getElementById("warning-popup").style.border = "2px solid black";
  document.getElementById("csv-input-div").style.opacity = "10%";
  addCloseButton();
}

function addCloseButton() {
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
  document.getElementById("csv-input-div").style.opacity = "100%";
  document.getElementById("warning-popup").style.padding = "0px";
}

function isValidDate(stringDate) {
  return !isNaN(Date.parse(stringDate));
}

function dateRangeOverlaps(a_start, a_end, b_start, b_end) {
  return a_start <= b_end && b_start <= a_end;
}

function checkStartAndEnd(start_date, end_date) {
  return start_date <= end_date;
}

function goToEvent() {
  if (!localStorage.getItem("events")) {
    setWarningPopup("No events added");
    return;
  }
  window.location.href = "./events.html";
}

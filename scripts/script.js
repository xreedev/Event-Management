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

document.addEventListener("DOMContentLoaded", function () {
  localStorage.clear();
  console.log("Loaded");
  dateError = 0;
  eventIdArray = [];
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

  reader.onload = function (e) {
    const contents = e.target.result;
    let success = false;

    if (csvType === "events") {
      success = parseToEvent(contents);
      if (success) {
        setWarningPopup("Events added successfully");
      }
    } else if (csvType === "tasks") {
      success = parseToTask(contents);
      if (success) {
        setWarningPopup("Tasks added successfully");
      }
    }
  };

  reader.readAsText(csvFile);
}


function parseToEvent(contents) {
  let eventList = JSON.parse(localStorage.getItem("events")) || [];
  const rows = contents.split("\n");
  const header = rows.shift();

  if (validateHeader(header, "events")) {
    return false;
  }

  for (let row of rows) {
    if (row.trim() !== "") {
      const columns = row.split(",");

      // Check if any column is empty
      if (columns.some(column => column.trim() === "")) {
        setWarningPopup("There are null values in file");
        return false;
      }

      // Validate dates
      if (isValidDate(columns[2]) && isValidDate(columns[3])) {
        const newEventStart = new Date(columns[2]);
        const newEventEnd = new Date(columns[3]);

        // Check for date range overlaps
        let overlapFound = false;
        for (const event of eventList) {
          const existingEventStart = new Date(event.startDate);
          const existingEventEnd = new Date(event.endDate);
          if (
            dateRangeOverlaps(
              existingEventStart,
              existingEventEnd,
              newEventStart,
              newEventEnd
            )
          ) {
            overlapFound = true;
            break;
          }
        }

        if (!checkStartAndEnd(columns[2], columns[3])) {
          setWarningPopup("Some events have wrong start and end date");
          return false;
        }

        if (!overlapFound) {
          const event = new Event(
            columns[0],
            columns[1],
            columns[2],
            columns[3]
          );
          eventIdArray.push(columns[0]);
          eventList.push(event);
        } else {
          dateError = 1;
          setWarningPopup("There are overlapping events. Please check CSV.");
          return false;
        }
      } else {
        dateError = 1;
        setWarningPopup(
          "Invalid dates were found. Check date format and value."
        );
        return false;
      }
    }
  }

  if (dateError == 0) {
    localStorage.setItem("events", JSON.stringify(eventList));
  }
  return dateError == 0 ? eventList : false;
}

function parseToTask(contents) {
  let taskList = [];
  const rows = contents.split("\n");
  const header = rows.shift();

  if (validateHeader(header, "tasks")) {
    return false;
  }

  for (let row of rows) {

    if (row.trim() === "") continue; 

    const columns = row.split(",");
    if (columns.some(column => column.trim() === "")) {
      setWarningPopup("There are null values in file");
      return false;
    }
  
    const eventId = columns[0];
    const taskName = columns[1];

    if (!eventIdArray.includes(eventId)) {
      console.log("Event id in task does not exist");
      setWarningPopup("Event ID in task does not exist");
      return false;
    }

    const task = new Task(eventId, taskName);
    taskList.push(task);
  }

  localStorage.setItem("tasks", JSON.stringify(taskList));
  return true;
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
  document.getElementById("warning-popup").style.border = "2px solid black";
  document.getElementById("csv-input-div").style.opacity = "10%";

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

// Function for validation of date format
function isValidDate(stringDate) {
  return !isNaN(Date.parse(stringDate));
}

function dateRangeOverlaps(a_start, a_end, b_start, b_end) {
  return a_start <= b_end && b_start <= a_end;
}

function checkStartAndEnd(start_date, end_date) {
  if (start_date > end_date) {
    return false;
  }
  return true;
}

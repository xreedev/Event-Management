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
  localStorage.setItem("csvFile", csvFile);
  if (csvFile) {
    const reader = new FileReader();

    reader.onload = function (e) {
      const contents = e.target.result;
      console.log(contents);
      if (csvType == "events") {
        parseToEvent(contents);
      } else {
        parseToTask(contents);
      }
    };

    reader.readAsText(csvFile);
  } else {
    alert("No file selected");
  }
}

function parseToEvent(contents) {
  let eventList = [];
  const rows = contents.split("\n");
  rows.forEach((row) => {
    const columns = row.split(",");
    const event = new Event(columns[0], columns[1], columns[2], columns[3]);
    eventList.push(event);
  });
  console.log(eventList);
  localStorage.setItem("events", eventList);
  return eventList;
}

function parseToTask(contents) {
  let taskList = [];
  const rows = contents.split("\n");
  rows.forEach((row) => {
    const columns = row.split(",");
    const event = new Task(columns[0], columns[1]);
    taskList.push(event);
  });
  console.log(eventList);
  localStorage.setItem("tasks", taskList);
  return taskList;
}

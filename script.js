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
      if (csvType == "events") {
        if(parseToEvent(contents)){alert("Events added successfully")};
      } else {
        if(parseToTask(contents)){alert("Tasks added successfully")};
      }
    };

    reader.readAsText(csvFile);
  } else if (csvFile == "" || csvFile == null) {
    alert("Submit a file");
  } else {
    alert("No file selected");
  }
}

function parseToEvent(contents) {
  let eventList = [];
  const rows = contents.split("\n");
  const header=rows[0];
  if(validateHeader(header,"events")){return false;};
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
  const header=rows[0];
  if(validateHeader(header,"tasks")){return false;};
  rows.forEach((row) => {
    const columns = row.split(",");
    const event = new Task(columns[0], columns[1]);
    taskList.push(event);
  });
  console.log(taskList);
  localStorage.setItem("tasks", taskList);
  return taskList;
}

function validateHeader(header,type){
    console.log(header);
    if(type=='events'){
       if(header.trim()=='eventid,eventname,start_date,end_date')
       {
               alert("Correct row");
       }
       else{
        alert("Incorrect event headers");
        return true;
       }
    }
    else if(type=='tasks'){
        if(header.trim()=='eventid,task_name')
            {
                    alert("Correct row");
            }
            else{
             alert("Incorrect task headers");
             return true;
            }
    }
}
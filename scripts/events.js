const eventJson = localStorage.getItem("events");
let events=JSON.parse(eventJson);
console.log(events);
let eventsTable = document.getElementById("events-table");

events.forEach((element) => {
  let eventName = element["eventName"];
  let eventId = element["eventId"];
  let startDate = element["startDate"];
  let endDate = element["endDate"];
  console.log(eventName,eventId,startDate,endDate);
  let eventColumn = createRow(eventId, eventName, startDate, endDate);
  eventsTable.appendChild(eventColumn);
});

function createRow(eventId, eventName, startDate, endDate) {
  let idRow = document.createElement("td");
  let nameRow = document.createElement("td");
  let startDateRow = document.createElement("td");
  let endDateRow = document.createElement("td");
  let progressRow=document.createElement("td");
  let actionRow=createAction(eventId);

  idRow.textContent = eventId;
  nameRow.textContent = eventName;
  startDateRow.textContent = startDate;
  endDateRow.textContent = endDate;
  progressRow.textContent="Pending";
 

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


function createAction(eventId){
    let actionRow=document.createElement("td");
    let actionAnchor=document.createElement("a");
    actionAnchor.onclick=function(){
      goToTasks(eventId);
    }
    let actionButton=document.createElement("button");

    actionButton.textContent="TASK";
    actionAnchor.appendChild(actionButton);
    actionRow.appendChild(actionAnchor);
    
    return actionRow;
}

function goToTasks(eventId){
  localStorage.setItem("eventId",eventId);
  window.location.href="./tasks.html";
}
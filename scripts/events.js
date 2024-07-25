const events=localStorage.getItem("events");
console.log(JSON.parse(events)[0]["eventId"]);
function generateEventsTable(){
    //create table
    let eventsTable=document.createElement("table");
    



    for (let i = 1; i <= events.length; i++) {
      let tr = eventsTable.insertRow();
      for (let j = 1; j <= cols; j++) {
        let tc = tr.insertCell();
        let input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("name", "row");
        input.id = "mul" + x + "-" + i + "," + j;
        tc.appendChild(input);
}
    }}

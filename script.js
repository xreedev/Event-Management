class event{
    constructor(eventId,eventName,startDate,endDate){
      this.eventName=eventName;
      this.eventId=eventId;
      this.startDate=startDate;
      this.endDate=endDate;
    }
}

function submitCsv(){
    let csvType=document.getElementById("csv-type-select").value;
    let csvFile=document.getElementById("input-file").files[0];
    if (csvFile) {
        const reader = new FileReader();

        reader.onload = function(e) {
            const contents = e.target.result;
            // You can parse the contents here, for example:
            console.log(contents);
        };

        reader.readAsText(csvFile);
    } else {
        alert('No file selected');
    }
}

function parseToEvent(contents){
    const rows = contents.split('\n');
    rows.forEach(row => {
        const columns = row.split(',');
        console.log(columns);
        // Process each column as needed
    });
}
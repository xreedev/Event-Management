
---

# Event Management System

This project is an Event Management System built to handle events and tasks using CSV file uploads. It includes features for adding events, assigning tasks to those events, and validating the data for correctness. The application leverages HTML, CSS, and JavaScript to provide an intuitive interface and functionality.

## Features

- **Add Events**: Upload a CSV file to add multiple events, including their start and end dates.
- **Add Tasks**: Upload a CSV file to assign tasks to existing events.
- **Data Validation**: Ensure no overlapping events, validate date formats, and check for empty fields.
- **User Interface**: A simple, user-friendly interface with error handling and feedback.

## Getting Started

To get started with this project, follow these steps:

### Prerequisites

- Web browser (Google Chrome, Firefox, Safari, etc.)
- Basic knowledge of HTML, CSS, and JavaScript.

### Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/xreedev/EventManagement.git
   ```

2. **Navigate to the Project Directory:**

   ```bash
   cd EventManagement
   ```

3. **Open the Project:**

   Open `index.html` in your preferred web browser. You can do this by double-clicking the `index.html` file or using a local server if you prefer.

### Usage

1. **Open the Application:**
   Launch the `index.html` file in your browser.

2. **Select CSV Type:**
   Choose whether you are uploading an "Events" CSV or a "Tasks" CSV from the dropdown menu.

3. **Upload CSV File:**
   Click the "Choose File" button to select and upload a CSV file. Ensure that the file matches the expected format:
   
   - **Events CSV Format:**
     ```
     eventid,eventname,start_date,end_date
     ```
   
   - **Tasks CSV Format:**
     ```
     eventid,task_name
     ```

4. **View Notifications:**
   If there are issues with the data (e.g., missing values, overlapping events), appropriate warnings will be displayed.

### CSV File Formats

- **Events CSV:**
  - `eventid`: Unique identifier for the event.
  - `eventname`: Name of the event.
  - `start_date`: Start date of the event in `YYYY-MM-DD` format.
  - `end_date`: End date of the event in `YYYY-MM-DD` format.

- **Tasks CSV:**
  - `eventid`: Identifier of the event to which the task belongs.
  - `task_name`: Name of the task.

### Example Files

Here are examples of valid CSV files:

- **Events.csv:**
  ```csv
  eventid,eventname,start_date,end_date
  E001,Conference,2024-08-01,2024-08-05
  E002,Workshop,2024-09-10,2024-09-12
  ```

- **Tasks.csv:**
  ```csv
  eventid,task_name
  E001,Prepare agenda
  E001,Send invitations
  E002,Book venue
  ```

### Error Handling

- **File Not Selected:** A message will prompt you to select a file.
- **Incorrect File Extension:** Only CSV files are accepted.
- **Data Validation Errors:** Issues with dates or overlapping events will be reported with detailed messages.

### Contributing

Contributions to this project are welcome. If you have suggestions or improvements, please submit a pull request or open an issue on GitHub.

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Acknowledgements

- **Google Fonts:** For providing professional fonts used in the project.
- **CSV Libraries:** For handling CSV parsing and validation.

---


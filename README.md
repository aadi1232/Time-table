 College Timetable Generator with Autofill Extension
Overview
This project consists of a College Timetable Generator built with React and an Auto-Fill Extension to quickly input faculty, subjects, credits, and other necessary information. This setup is designed to generate non-clashable college timetables based on input data for each academic year, section, and subject, with the ability to download the timetable as a PDF.

Features
Timetable Generation: Creates a non-overlapping timetable based on faculty availability, subjects, credits, and section constraints.
Multi-Page PDF Export: Download the generated timetable in a paginated PDF format for easy printing or sharing.
Auto-Fill Extension: A browser extension that helps populate data fields for faculty, subjects, credits, etc., directly into the timetable generator's input fields.
Responsive UI: Built with React and CSS, the UI is responsive and visually organized for easy navigation and usability.
Table of Contents
Installation
Setup and Usage
Timetable Generator
Auto-Fill Extension
Project Structure
Customization
Troubleshooting
License
Installation
Prerequisites
Node.js (v14 or later)
npm (v6 or later)
A modern web browser (for the extension)
Clone the Repository
bash
Copy code
git clone https://github.com/yourusername/timetable-generator.git
cd timetable-generator
Install Dependencies
bash
Copy code
npm install
Setup and Usage
Timetable Generator
Start the Development Server:

bash
Copy code
npm run dev
Open the Application: Open your browser and navigate to http://localhost:5173.

Add Course Information:

Enter details such as faculty name, subject name, year, section, and credits in the Control Panel.
Click Add Course to populate the course list.
Generate Timetable:

Click Generate Timetable to create a non-clashable timetable.
The generated timetable is displayed for each UG year.
Click Download PDF to export the timetable in a multi-page PDF format.
Auto-Fill Extension
Setup Extension:

Navigate to the extension folder.
Load the unpacked extension in your browser:
In Chrome, go to chrome://extensions/, enable Developer mode, and click Load unpacked.
Select the extension directory.
Usage:

Open the timetable generator at http://localhost:5173.
Use the extension to automatically fill in the data fields for faculty, subjects, etc., with a click.
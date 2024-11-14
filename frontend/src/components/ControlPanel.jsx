// src/components/ControlPanel.jsx
import React, { useState } from 'react';
import '../styles/ControlPanel.css';

function ControlPanel({ onGenerate }) {
  const [courses, setCourses] = useState([]);
  const [currentCourse, setCurrentCourse] = useState({
    faculty: '',
    subject: '',
    credits: '',
    year: '',
    section: '',
  });

  const handleCourseChange = (e) => {
    const { name, value } = e.target;
    setCurrentCourse({ ...currentCourse, [name]: value });
  };

  const addCourse = () => {
    // Validate all fields before adding the course
    if (!currentCourse.faculty || !currentCourse.subject || !currentCourse.credits || !currentCourse.year || !currentCourse.section) {
      alert("Please fill in all fields before adding the course.");
      return;
    }

    // Format the display string
    const formattedCourse = {
      ...currentCourse,
      displayString: `${currentCourse.year}, ${currentCourse.section}: ${currentCourse.faculty} - ${currentCourse.subject} (${currentCourse.credits})`,
    };

    // Log for debugging purposes
    console.log("Adding course:", formattedCourse.displayString);

    // Add course to list and reset input fields
    setCourses([...courses, formattedCourse]);
    setCurrentCourse({ faculty: '', subject: '', credits: '', year: '', section: '' });
  };

  const handleGenerateClick = () => {
    onGenerate(courses);
  };

  return (
    <div className="control-panel">
      <h2>Add Courses</h2>

      <label>Faculty Name:</label>
      <input type="text" name="faculty" value={currentCourse.faculty} onChange={handleCourseChange} />

      <label>Subject Name:</label>
      <input type="text" name="subject" value={currentCourse.subject} onChange={handleCourseChange} />

      <label>Credits:</label>
      <input type="number" name="credits" value={currentCourse.credits} onChange={handleCourseChange} />

      <label>Year (UG):</label>
      <input type="number" name="year" value={currentCourse.year} onChange={handleCourseChange} />

      <label>Section:</label>
      <input type="text" name="section" value={currentCourse.section} onChange={handleCourseChange} />

      <button onClick={addCourse}>Add Course</button>

      <div className="course-list">
        <h3>Course List</h3>
        {courses.map((course, idx) => (
          <div key={idx}>
            {/* Display formatted course details */}
            {course.displayString}
          </div>
        ))}
      </div>

      <button onClick={handleGenerateClick}>Generate Timetable</button>
    </div>
  );
}

export default ControlPanel;

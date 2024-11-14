// src/components/TimeSlot.jsx
import React from 'react';
import '../styles/Timetable.css';

function TimeSlot({ course }) {
  return (
    <td className="time-slot">
      {course ? (
        <div>
          <strong>{course.subject}</strong>
          <p>{course.faculty}</p>
          <p>Section {course.section} | Room {course.room}</p>
        </div>
      ) : (
        <span className="empty-slot">Free</span>
      )}
    </td>
  );
}

export default TimeSlot;

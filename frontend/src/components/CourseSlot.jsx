// src/components/CourseSlot.jsx
import React from 'react';
import '../styles/Timetable.css';

function CourseSlot({ course }) {
  return (
    <td className="course-slot">
      {course || <span className="empty-slot">Free</span>}
    </td>
  );
}

export default CourseSlot;

// src/components/Timetable.jsx
import React from 'react';
import '../styles/Timetable.css';

function Timetable({ timetable }) {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const times = [
    "08:45 AM - 09:45 AM",
    "09:45 AM - 10:45 AM",
    "11:00 AM - 12:00 PM", // Break inserted after 10:45 AM
    "12:00 PM - 01:00 PM",
    "02:15 PM - 03:15 PM", // Lunch break inserted after 1:00 PM
    "03:15 PM - 04:15 PM",
    "04:30 PM - 05:30 PM"  // Break inserted after 4:15 PM
  ];

  return (
    <div className="timetable">
      <h2>Generated Timetable</h2>
      <table>
        <thead>
          <tr>
            <th>Time</th>
            {days.map((day, idx) => (
              <th key={idx}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {times.map((time, timeIdx) => (
            <React.Fragment key={timeIdx}>
              <tr>
                <td>{time}</td>
                {days.map((day, dayIdx) => (
                  <td key={dayIdx}>
                    {timetable[timeIdx]?.days[dayIdx]?.map((course, courseIdx) => (
                      <div key={`${dayIdx}-${courseIdx}`}>
                        {/* Display only Subject, Section, and Room */}
                        {course.subject} - S-{course.section} <br />
                        Room: {course.room}
                      </div>
                    )) || "Free"}
                  </td>
                ))}
              </tr>

              {/* Insert Break Rows after specific time slots */}
              {time === "10:45 AM - 11:00 AM" && (
                <tr className="break" key={`break-${timeIdx}`}>
                  <td colSpan={days.length + 1}>Break</td>
                </tr>
              )}
              {time === "01:00 PM - 02:15 PM" && (
                <tr className="lunch-break" key={`lunch-${timeIdx}`}>
                  <td colSpan={days.length + 1}>Lunch Break</td>
                </tr>
              )}
              {time === "04:15 PM - 04:30 PM" && (
                <tr className="break" key={`break2-${timeIdx}`}>
                  <td colSpan={days.length + 1}>Break</td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Timetable;

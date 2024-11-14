// src/components/App.jsx
import React, { useRef, useState } from 'react';
import ControlPanel from './ControlPanel';
import Timetable from './Timetable';
import { generateTimetable } from '../utils/timetableUtils';
import { downloadPDF } from '../utils/pdfUtils';
import '../styles/App.css';

function App() {
  const [timetables, setTimetables] = useState({});
  const [error, setError] = useState(null);
  const [isGenerated, setIsGenerated] = useState(false);
  const timetableRef = useRef();

  const handleGenerateTimetable = (courses) => {
    const result = generateTimetable(courses);

    if (result.error) {
      setError(result.error);
      setIsGenerated(false);
    } else {
      setTimetables(result.timetables);
      setError(null);
      setIsGenerated(true);
    }
  };

  const handleDownloadPDF = () => {
    downloadPDF(timetableRef.current);
  };

  return (
    <div className="app">
      <h1>College Timetable Generator</h1>
      <ControlPanel onGenerate={handleGenerateTimetable} />

      {error && <p className="error-message">{error}</p>}

      <div ref={timetableRef} id="timetableContainer">
        {Object.keys(timetables).map((year) => (
          <div key={year}>
            <h2>Timetable for UG Year {year}</h2>
            <Timetable timetable={timetables[year]} />
          </div>
        ))}
      </div>

      {isGenerated && <button onClick={handleDownloadPDF}>Download PDF</button>}
    </div>
  );
}

export default App;

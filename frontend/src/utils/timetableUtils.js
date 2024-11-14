export function generateTimetable(courses) {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const times = [
    "08:45 AM - 09:45 AM", 
    "09:45 AM - 10:45 AM", 
    "11:00 AM - 12:00 PM", 
    "12:00 PM - 01:00 PM", 
    "02:15 PM - 03:15 PM", 
    "03:15 PM - 04:15 PM", 
    "04:30 PM - 05:30 PM"
  ];
  
  const timetables = {};
  const facultySchedule = {};
  const sectionSchedule = {};
  const roomSchedule = {};
  const maxRetries = 3000;

  // Sort courses by credits to prioritize higher-credit courses
  const sortedCourses = courses.sort((a, b) => b.credits - a.credits);

  // Initialize schedules
  sortedCourses.forEach(course => {
    const { year, faculty, section } = course;
    if (!timetables[year]) {
      timetables[year] = times.map(() => ({ days: Array(days.length).fill(null).map(() => []) }));
    }
    if (!facultySchedule[faculty]) {
      facultySchedule[faculty] = times.map(() => Array(days.length).fill(false));
    }
    if (!sectionSchedule[`${year}-${section}`]) {
      sectionSchedule[`${year}-${section}`] = times.map(() => Array(days.length).fill(false));
    }
  });

  // Function to find an available room or use specified room
  function getAvailableRoom(timeIdx, dayIdx, preferredRoom) {
    if (preferredRoom && !roomSchedule[preferredRoom]) {
      roomSchedule[preferredRoom] = times.map(() => Array(days.length).fill(false));
    }

    if (preferredRoom && !roomSchedule[preferredRoom][timeIdx][dayIdx]) {
      roomSchedule[preferredRoom][timeIdx][dayIdx] = true;
      return preferredRoom;
    }

    // Otherwise, find the first available room
    for (let room = 101; room <= 110; room++) {
      const roomKey = `R${room}`;
      if (!roomSchedule[roomKey]) {
        roomSchedule[roomKey] = times.map(() => Array(days.length).fill(false));
      }
      if (!roomSchedule[roomKey][timeIdx][dayIdx]) {
        roomSchedule[roomKey][timeIdx][dayIdx] = true;
        return roomKey;
      }
    }
    return null;
  }

  // Schedule each course
  for (const course of sortedCourses) {
    const { year, section, subject, faculty, credits, room: preferredRoom } = course;
    const weeklyClasses = parseInt(credits) * 2;
    let classesAssigned = 0;
    let retryCount = 0;

    for (let timeIdx = 0; timeIdx < times.length && classesAssigned < weeklyClasses; timeIdx++) {
      for (let dayIdx = 0; dayIdx < days.length && classesAssigned < weeklyClasses; dayIdx++) {
        
        if (retryCount >= maxRetries) {
          console.error(`Max retries exceeded for "${subject}" by "${faculty}".`);
          return { error: `Unable to schedule "${subject}" for "${faculty}". Try reducing the number of sections or classes.` };
        }

        const sectionKey = `${year}-${section}`;
        const room = getAvailableRoom(timeIdx, dayIdx, preferredRoom);

        if (!facultySchedule[faculty][timeIdx][dayIdx] && !sectionSchedule[sectionKey][timeIdx][dayIdx] && room) {
          timetables[year][timeIdx].days[dayIdx].push({
            subject,
            faculty,
            section,
            room,
          });

          // Mark as occupied
          facultySchedule[faculty][timeIdx][dayIdx] = true;
          sectionSchedule[sectionKey][timeIdx][dayIdx] = true;
          classesAssigned++;
        } else {
          retryCount++;
        }
      }
    }

    // Log an error if the course couldn’t be fully scheduled
    if (classesAssigned < weeklyClasses) {
      console.error(`Unable to fully assign "${subject}" for "${faculty}" due to constraints.`);
      return { error: `Subject "${subject}" for faculty "${faculty}" could not be scheduled within the constraints.` };
    }
  }

  console.log("Timetable generated successfully:", timetables);
  return { timetables };
}

document.getElementById("autoFillBtn").addEventListener("click", async () => {
  const rawData = document.getElementById("dataInput").value;

  // Parse the JSON data
  let parsedData;
  try {
    parsedData = JSON.parse(rawData);
  } catch (error) {
    alert("Invalid data format. Please provide JSON formatted data.");
    return;
  }

  // Inject the parsed data into the website
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: fillTimetableData,
      args: [parsedData],
    });
  });
});

// Function injected into the page to fill data and dispatch events
function fillTimetableData(data) {
  data.forEach((entry, index) => {
    setTimeout(() => {
      // Select each field by name attribute as used in ControlPanel.jsx
      const facultyInput = document.querySelector('input[name="faculty"]');
      const subjectInput = document.querySelector('input[name="subject"]');
      const creditsInput = document.querySelector('input[name="credits"]');
      const yearInput = document.querySelector('input[name="year"]');
      const sectionInput = document.querySelector('input[name="section"]');
      const addCourseButton = document.querySelector("button"); // Assumes the first button is "Add Course"

      // Check if all required fields are available
      if (
        !facultyInput ||
        !subjectInput ||
        !creditsInput ||
        !yearInput ||
        !sectionInput ||
        !addCourseButton
      ) {
        console.error(
          "One or more fields are missing on the page. Please check field selectors."
        );
        return;
      }

      // Set each field value and trigger React updates by dispatching events
      facultyInput.value = entry.faculty;
      facultyInput.dispatchEvent(new Event("input", { bubbles: true }));
      facultyInput.dispatchEvent(new Event("change", { bubbles: true }));

      subjectInput.value = entry.subject;
      subjectInput.dispatchEvent(new Event("input", { bubbles: true }));
      subjectInput.dispatchEvent(new Event("change", { bubbles: true }));

      creditsInput.value = entry.credits;
      creditsInput.dispatchEvent(new Event("input", { bubbles: true }));
      creditsInput.dispatchEvent(new Event("change", { bubbles: true }));

      yearInput.value = entry.year;
      yearInput.dispatchEvent(new Event("input", { bubbles: true }));
      yearInput.dispatchEvent(new Event("change", { bubbles: true }));

      sectionInput.value = entry.section;
      sectionInput.dispatchEvent(new Event("input", { bubbles: true }));
      sectionInput.dispatchEvent(new Event("change", { bubbles: true }));

      // Click the "Add Course" button to add the entry
      addCourseButton.click();
    }, index * 500); // Delay to ensure React updates correctly for each entry
  });
}

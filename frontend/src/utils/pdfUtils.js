// src/utils/pdfUtils.js
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export function downloadPDF(element) {
  if (!element) {
    console.error("Element not found for PDF generation.");
    return;
  }

  html2canvas(element, {
    scale: 1.5, // Reduced scale for smaller size
    useCORS: true // Ensures cross-origin images are handled correctly
  }).then((canvas) => {
    const imgData = canvas.toDataURL('image/jpeg', 0.5); // Compress image for PDF size reduction
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: 'a4'
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let yPosition = 0;

    while (yPosition < imgHeight) {
      // Add portion of the canvas to the PDF
      pdf.addImage(
        imgData,
        'JPEG',
        0,
        -yPosition,
        imgWidth,
        imgHeight
      );

      yPosition += pageHeight;

      // Add new page if there's more content to add
      if (yPosition < imgHeight) {
        pdf.addPage();
      }
    }

    pdf.save('timetable.pdf');
  }).catch((error) => {
    console.error("Error generating PDF:", error);
  });
}

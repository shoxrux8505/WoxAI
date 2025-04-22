import jsPDF from 'jspdf';

export const generatePDF = (process, description, recommendations) => {
  const doc = new jsPDF();
  
  doc.setFontSize(16);
  doc.text('Business Process Report', 20, 20);
  
  doc.setFontSize(12);
  doc.text(`Process: ${process}`, 20, 30);
  doc.text(`Description: ${description}`, 20, 40);
  
  doc.text('Recommendations:', 20, 60);
  recommendations.forEach((rec, index) => {
    doc.text(`${index + 1}. ${rec}`, 20, 70 + (index * 10));
  });
  
  doc.save('business_process_report.pdf');
};
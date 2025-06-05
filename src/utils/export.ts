import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';
import { ResumeData } from '../types';

export const exportToPDF = async (data: ResumeData) => {
  const element = document.querySelector('.resume-preview') as HTMLElement;
  if (!element) return;

  const canvas = await html2canvas(element);
  const imgData = canvas.toDataURL('image/png');
  
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'px',
    format: 'a4',
  });

  const imgProps = pdf.getImageProperties(imgData);
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  
  pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  pdf.save(`${data.personalInfo.name.replace(/\s+/g, '_')}_resume.pdf`);
};

export const exportToWord = async (data: ResumeData) => {
  const doc = new Document({
    sections: [{
      properties: {},
      children: [
        new Paragraph({
          children: [
            new TextRun({
              text: data.personalInfo.name,
              bold: true,
              size: 28,
            }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: `${data.personalInfo.email} • ${data.personalInfo.phone}`,
              size: 24,
            }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: data.personalInfo.location,
              size: 24,
            }),
          ],
        }),
        // Add more sections for experience, education, and skills
      ],
    }],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `${data.personalInfo.name.replace(/\s+/g, '_')}_resume.docx`);
};

export const exportToHTML = (data: ResumeData) => {
  const element = document.querySelector('.resume-preview')?.outerHTML;
  if (!element) return;

  const blob = new Blob([element], { type: 'text/html' });
  saveAs(blob, `${data.personalInfo.name.replace(/\s+/g, '_')}_resume.html`);
};
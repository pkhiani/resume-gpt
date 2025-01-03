import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { FormattedResume } from './resumeFormatter';
import { resumeStyles } from './resumeStyles';

function createResumeHTML(resume: FormattedResume): HTMLDivElement {
  const container = document.createElement('div');
  container.style.cssText = resumeStyles.container;

  // Header
  const header = document.createElement('div');
  header.style.cssText = resumeStyles.header;
  
  const name = document.createElement('div');
  name.style.cssText = resumeStyles.name;
  name.textContent = resume.header.name;
  header.appendChild(name);

  // Contact info in one line
  const contactContainer = document.createElement('div');
  contactContainer.style.cssText = resumeStyles.contactContainer;
  
  resume.header.contact.forEach((contact, index) => {
    const contactDiv = document.createElement('div');
    contactDiv.style.cssText = resumeStyles.contact;
    contactDiv.textContent = contact;
    contactContainer.appendChild(contactDiv);

    // Add separator between contact items
    if (index < resume.header.contact.length - 1) {
      const separator = document.createElement('div');
      separator.style.cssText = resumeStyles.contact;
      separator.textContent = '•';
      contactContainer.appendChild(separator);
    }
  });

  header.appendChild(contactContainer);
  container.appendChild(header);

  // Sections
  resume.sections.forEach(section => {
    const sectionDiv = document.createElement('div');
    sectionDiv.style.cssText = resumeStyles.section;

    const title = document.createElement('div');
    title.style.cssText = resumeStyles.sectionTitle;
    title.textContent = section.title.toUpperCase();
    sectionDiv.appendChild(title);

    section.content.forEach(content => {
      const contentDiv = document.createElement('div');
      contentDiv.style.cssText = resumeStyles.content;
      contentDiv.textContent = content;
      sectionDiv.appendChild(contentDiv);
    });

    container.appendChild(sectionDiv);
  });

  return container;
}

export async function generatePDF(resume: FormattedResume): Promise<Blob> {
  const container = createResumeHTML(resume);
  document.body.appendChild(container);

  try {
    const canvas = await html2canvas(container, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff'
    });
    
    const pdf = new jsPDF({
      unit: 'px',
      format: 'letter',
      orientation: 'portrait'
    });
    
    const imgData = canvas.toDataURL('image/png');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    
    return pdf.output('blob');
  } finally {
    document.body.removeChild(container);
  }
}
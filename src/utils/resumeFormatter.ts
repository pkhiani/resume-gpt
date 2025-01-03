interface Section {
  title: string;
  content: string[];
}

export interface FormattedResume {
  header: {
    name: string;
    contact: string[];
  };
  sections: Section[];
}

export function parseResumeText(text: string): FormattedResume {
  const lines = text.split('\n').map(line => line.trim()).filter(Boolean);
  const formatted: FormattedResume = {
    header: {
      name: '',
      contact: []
    },
    sections: []
  };

  let currentSection: Section | null = null;

  // First non-empty line is assumed to be the name
  if (lines.length > 0) {
    formatted.header.name = lines[0];
    
    // Next few lines until we hit a section header are contact info
    let i = 1;
    while (i < lines.length && !isSectionHeader(lines[i])) {
      formatted.header.contact.push(lines[i]);
      i++;
    }

    // Process remaining lines
    for (; i < lines.length; i++) {
      const line = lines[i];
      
      if (isSectionHeader(line)) {
        if (currentSection) {
          formatted.sections.push(currentSection);
        }
        currentSection = {
          title: line,
          content: []
        };
      } else if (currentSection) {
        currentSection.content.push(line);
      }
    }

    if (currentSection) {
      formatted.sections.push(currentSection);
    }
  }

  return formatted;
}

function isSectionHeader(line: string): boolean {
  const sectionHeaders = [
    'education',
    'experience',
    'skills',
    'projects',
    'certifications',
    'awards',
    'publications'
  ];
  return sectionHeaders.some(header => 
    line.toLowerCase().includes(header)
  );
}
import React from 'react';
import { FormattedResume } from '../utils/resumeFormatter';

interface ResumeEditorProps {
  resume: FormattedResume;
  onUpdate: (resume: FormattedResume) => void;
}

export function ResumeEditor({ resume, onUpdate }: ResumeEditorProps) {
  const handleHeaderChange = (field: 'name' | string, value: string) => {
    if (field === 'name') {
      onUpdate({
        ...resume,
        header: { ...resume.header, name: value }
      });
    } else if (field.startsWith('contact')) {
      const index = parseInt(field.replace('contact', ''));
      const newContact = [...resume.header.contact];
      newContact[index] = value;
      onUpdate({
        ...resume,
        header: { ...resume.header, contact: newContact }
      });
    }
  };

  const handleSectionChange = (sectionIndex: number, field: 'title' | number, value: string) => {
    const newSections = [...resume.sections];
    if (field === 'title') {
      newSections[sectionIndex] = {
        ...newSections[sectionIndex],
        title: value
      };
    } else {
      const newContent = [...newSections[sectionIndex].content];
      newContent[field] = value;
      newSections[sectionIndex] = {
        ...newSections[sectionIndex],
        content: newContent
      };
    }
    onUpdate({ ...resume, sections: newSections });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Header</h3>
        <input
          type="text"
          value={resume.header.name}
          onChange={(e) => handleHeaderChange('name', e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Name"
        />
        {resume.header.contact.map((contact, index) => (
          <input
            key={`contact${index}`}
            type="text"
            value={contact}
            onChange={(e) => handleHeaderChange(`contact${index}`, e.target.value)}
            className="w-full p-2 border rounded"
            placeholder={`Contact ${index + 1}`}
          />
        ))}
      </div>

      {resume.sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="space-y-4">
          <input
            type="text"
            value={section.title}
            onChange={(e) => handleSectionChange(sectionIndex, 'title', e.target.value)}
            className="w-full p-2 border rounded font-semibold"
          />
          {section.content.map((content, contentIndex) => (
            <textarea
              key={contentIndex}
              value={content}
              onChange={(e) => handleSectionChange(sectionIndex, contentIndex, e.target.value)}
              className="w-full p-2 border rounded min-h-[100px]"
            />
          ))}
        </div>
      ))}
    </div>
  );
}
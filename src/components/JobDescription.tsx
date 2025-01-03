import React from 'react';

interface JobDescriptionProps {
  value: string;
  onChange: (value: string) => void;
}

export const JobDescription: React.FC<JobDescriptionProps> = ({ value, onChange }) => {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Job Description
      </label>
      <textarea
        className="w-full h-48 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="Paste the job description here..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
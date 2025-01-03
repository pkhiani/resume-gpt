import React, { useState } from 'react';
import { FileUpload } from './components/FileUpload';
import { JobDescription } from './components/JobDescription';
import { ResumePreview } from './components/ResumePreview';
import { ErrorMessage } from './components/ErrorMessage';
import { GenerateButton } from './components/GenerateButton';
import { ResumeCustomizer } from './components/ResumeCustomizer';
import { useResumeGeneration } from './hooks/useResumeGeneration';

export function App() {
  const [jobDescription, setJobDescription] = useState('');
  const [originalResume, setOriginalResume] = useState<File | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const { 
    generateResume, 
    isGenerating, 
    error, 
    generatedResume,
    showCustomizer,
    setShowCustomizer
  } = useResumeGeneration({
    setPdfUrl,
    originalResume,
    jobDescription
  });

  const handleFileSelect = (file: File) => {
    setOriginalResume(file);
    setPdfUrl(URL.createObjectURL(file));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Resume Tailor</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <FileUpload onFileSelect={handleFileSelect} />
            <JobDescription 
              value={jobDescription}
              onChange={setJobDescription}
            />
            <ErrorMessage error={error} />
            <GenerateButton 
              onClick={generateResume}
              isGenerating={isGenerating}
              disabled={!originalResume || !jobDescription}
            />
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Preview</h2>
            <ResumePreview pdfUrl={pdfUrl} />
          </div>
        </div>
      </div>

      {showCustomizer && generatedResume && (
        <ResumeCustomizer
          resume={generatedResume}
          onClose={() => setShowCustomizer(false)}
        />
      )}
    </div>
  );
}

export default App;
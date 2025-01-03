import { useState } from 'react';
import { generateTailoredResume } from '../services/openai';
import { extractTextFromPdf } from '../utils/pdfUtils';
import { FormattedResume } from '../utils/resumeFormatter';

interface UseResumeGenerationProps {
  setPdfUrl: (url: string) => void;
  originalResume: File | null;
  jobDescription: string;
}

export function useResumeGeneration({ setPdfUrl, originalResume, jobDescription }: UseResumeGenerationProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedResume, setGeneratedResume] = useState<FormattedResume | null>(null);
  const [showCustomizer, setShowCustomizer] = useState(false);

  const generateResume = async () => {
    if (!originalResume || !jobDescription) {
      setError('Please upload a resume and provide a job description');
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const resumeText = await extractTextFromPdf(originalResume);
      const tailoredResume = await generateTailoredResume(jobDescription, resumeText);
      
      setGeneratedResume(tailoredResume);
      setShowCustomizer(true);
    } catch (error: any) {
      console.error('Error:', error);
      setError(error.message || 'Failed to generate tailored resume');
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    generateResume,
    isGenerating,
    error,
    generatedResume,
    showCustomizer,
    setShowCustomizer
  };
}
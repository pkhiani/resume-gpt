import React from 'react';
import { FormattedResume } from '../utils/resumeFormatter';
import { ResumeEditor } from './ResumeEditor';
import { ResumePreview } from './ResumePreview';
import { generatePDF } from '../utils/pdfGenerator';
import { downloadBlob } from '../utils/downloadUtils';
import { Download } from 'lucide-react';

interface ResumeCustomizerProps {
  resume: FormattedResume;
  onClose: () => void;
}

export function ResumeCustomizer({ resume, onClose }: ResumeCustomizerProps) {
  const [editedResume, setEditedResume] = React.useState(resume);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);

  React.useEffect(() => {
    updatePreview();
  }, [editedResume]);

  const updatePreview = async () => {
    const pdfBlob = await generatePDF(editedResume);
    const url = URL.createObjectURL(pdfBlob);
    setPreviewUrl(url);
  };

  const handleDownload = async () => {
    const pdfBlob = await generatePDF(editedResume);
    downloadBlob(pdfBlob, 'tailored-resume.pdf');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-7xl h-[90vh] flex">
        <div className="w-1/2 p-6 overflow-auto border-r">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Edit Resume</h2>
            <div className="space-x-4">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleDownload}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          </div>
          <ResumeEditor resume={editedResume} onUpdate={setEditedResume} />
        </div>
        <div className="w-1/2 p-6 overflow-auto">
          <h2 className="text-xl font-semibold mb-6">Preview</h2>
          <ResumePreview pdfUrl={previewUrl} />
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface ResumePreviewProps {
  pdfUrl: string | null;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({ pdfUrl }) => {
  if (!pdfUrl) {
    return (
      <div className="w-full h-[600px] bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">Upload a resume to preview</p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-auto">
      <Document
        file={pdfUrl}
        className="flex justify-center"
        loading={
          <div className="flex items-center justify-center h-[600px]">
            <p>Loading PDF...</p>
          </div>
        }
      >
        <Page pageNumber={1} />
      </Document>
    </div>
  );
};
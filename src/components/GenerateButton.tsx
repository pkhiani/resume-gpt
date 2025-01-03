import React from 'react';
import { Download } from 'lucide-react';

interface GenerateButtonProps {
  onClick: () => void;
  isGenerating: boolean;
  disabled: boolean;
}

export function GenerateButton({ onClick, isGenerating, disabled }: GenerateButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={isGenerating || disabled}
      className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
    >
      {isGenerating ? (
        'Generating...'
      ) : (
        <>
          <Download className="w-4 h-4" />
          Generate Tailored Resume
        </>
      )}
    </button>
  );
}
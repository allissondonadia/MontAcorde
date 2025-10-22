import React from 'react';

interface ExportButtonProps {
  onExport: () => void;
}

const ExportButton: React.FC<ExportButtonProps> = ({ onExport }) => (
  <div className="flex mt-4 items-center">
    <button
      onClick={onExport}
      className="ml-auto bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700 transition-colors"
    >
      Exportar PNG
    </button>
  </div>
);

export default ExportButton;

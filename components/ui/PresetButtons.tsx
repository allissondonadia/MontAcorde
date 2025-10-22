import React from 'react';
import { PRESETS } from '../../types/chord';

interface PresetButtonsProps {
  onLoadPreset: (name: string) => void;
}

const PresetButtons: React.FC<PresetButtonsProps> = ({ onLoadPreset }) => (
  <div className="gap-2 flex flex-col">
    {Object.keys(PRESETS).map((key) => (
      <button
        key={key}
        onClick={() => onLoadPreset(key)}
        className="bg-indigo-600 text-white px-3 py-2 rounded hover:bg-indigo-700 transition-colors"
      >
        {key}
      </button>
    ))}
  </div>
);

export default PresetButtons;

import React from 'react';

const FINGERS = ['1', '2', '3', '4'] as const;

interface FingerSelectorProps {
  selectedFinger: string;
  onFingerSelect: (finger: string) => void;
}

const FingerSelector: React.FC<FingerSelectorProps> = ({ selectedFinger, onFingerSelect }) => (
  <div className="gap-2 flex flex-col">
    {FINGERS.map((finger) => (
      <button
        key={finger}
        onClick={() => onFingerSelect(finger)}
        className={`px-3 py-2 w-10 h-10 rounded-full transition-colors ${
          selectedFinger === finger
            ? 'bg-indigo-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        {finger}
      </button>
    ))}
  </div>
);

export default FingerSelector;

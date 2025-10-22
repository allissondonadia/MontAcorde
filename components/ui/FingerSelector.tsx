import React from 'react';

const FINGERS = ['1', '2', '3', '4'] as const;

const FINGER_LABELS = {
  '1': 'Indicador',
  '2': 'Médio',
  '3': 'Anelar',
  '4': 'Mínimo'
} as const;

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
        title={`Dedo ${finger} - ${FINGER_LABELS[finger]} (Tecla ${finger})`}
        className={`relative px-3 py-2 w-12 h-12 rounded-full font-bold text-lg transition-all duration-200 ${
          selectedFinger === finger
            ? 'bg-indigo-600 text-white shadow-lg scale-110 ring-4 ring-indigo-200'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:scale-105 hover:shadow-md'
        }`}
      >
        {finger}
        {selectedFinger === finger && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
        )}
      </button>
    ))}
  </div>
);

export default FingerSelector;

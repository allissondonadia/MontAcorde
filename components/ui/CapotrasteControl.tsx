import React, { useState } from 'react';

interface CapotrasteControlProps {
  onCapotrasteChange: (value: number) => void;
}

const CapotrasteControl: React.FC<CapotrasteControlProps> = ({
  onCapotrasteChange,
}) => {
  const [capotrasteNumber, setCapotrasteNumber] = useState<number>(0);

  const handleCapotrasteToggle = () => {
    const newCapotraste = capotrasteNumber ? 0 : 1;
    setCapotrasteNumber(newCapotraste);
    onCapotrasteChange(newCapotraste);
  };

  const handleCapotrasteUp = () => {
    const newNumber = Math.min(capotrasteNumber + 1, 12);
    setCapotrasteNumber(newNumber);
    onCapotrasteChange(newNumber);
  };

  const handleCapotrasteDown = () => {
    const newNumber = Math.max(capotrasteNumber - 1, 0);
    setCapotrasteNumber(newNumber);
    onCapotrasteChange(newNumber);
  };
  
  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={handleCapotrasteToggle}
        className={`px-3 py-2 h-10 rounded transition-colors ${
          capotrasteNumber ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300' }`}>
        {"Capotraste"}
      </button>
      
      <div className="flex flex-row gap-2 items-center">
        <button
          onClick={handleCapotrasteDown}
          className="px-2 py-1 h-8 w-8 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
          disabled={capotrasteNumber <= 0}
        >
          -
        </button>
        <span className="px-2 py-1 w-10 text-center font-bold">
          {capotrasteNumber}º
        </span>
        <button
          onClick={handleCapotrasteUp}
          className="px-2 py-1 h-8 w-8 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
          disabled={capotrasteNumber >= 12}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default CapotrasteControl;

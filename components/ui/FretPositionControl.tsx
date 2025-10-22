import React, { useState } from 'react';

interface FretPositionControlProps {
  onPositionChange: (position: number) => void;
}

const FretPositionControl: React.FC<FretPositionControlProps> = ({
  onPositionChange,
}) => {
  const [fretPosition, setFretPosition] = useState<number>(0);

  const handleToggle = () => {
    const newPosition = fretPosition ? 0 : 3;
    setFretPosition(newPosition);
    onPositionChange(newPosition);
  };

  const handlePositionUp = () => {
    const newPosition = Math.min(fretPosition + 1, 18);
    setFretPosition(newPosition);
    onPositionChange(newPosition);
  };

  const handlePositionDown = () => {
    const newPosition = Math.max(fretPosition - 1, 2);
    setFretPosition(newPosition);
    onPositionChange(newPosition);
  };
  
  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={handleToggle}
        title="Ativar/desativar posição alta no braço"
        className={`px-3 py-2 h-10 rounded transition-all duration-200 font-medium ${
          fretPosition ? 'bg-indigo-600 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300' }`}>
        📍 Posição
      </button>
      
      {!!fretPosition && (
        <div className="flex flex-col gap-1">
          <span className="text-xs text-gray-600 text-center font-semibold">Casa Inicial</span>
          <div className="flex flex-row gap-2 items-center">
            <button
              onClick={handlePositionDown}
              title="Diminuir casa inicial"
              className="px-2 py-1 h-8 w-8 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={fretPosition <= 2}
            >
              -
            </button>
            <span className="px-2 py-1 w-10 text-center font-bold" title={`Começa na ${fretPosition}ª casa`}>
              {fretPosition}º
            </span>
            <button
              onClick={handlePositionUp}
              title="Aumentar casa inicial"
              className="px-2 py-1 h-8 w-8 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={fretPosition >= 18}
            >
              +
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FretPositionControl;


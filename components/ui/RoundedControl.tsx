import React, { useState } from 'react';

interface RoundedControlProps {
  onRoundedChange: (corda: number, casa: number) => void;
}

const RoundedControl: React.FC<RoundedControlProps> = ({
  onRoundedChange,
}) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [corda, setCorda] = useState<number>(1);
  const [casa, setCasa] = useState<number>(1);

  const handleToggle = () => {
    const newActive = !isActive;
    setIsActive(newActive);
    if (newActive) {
      onRoundedChange(corda, casa);
    } else {
      onRoundedChange(0, 0);
    }
  };

  const handleCordaUp = () => {
    const newCorda = Math.min(corda + 1, 6);
    setCorda(newCorda);
    if (isActive) {
      onRoundedChange(newCorda, casa);
    }
  };

  const handleCordaDown = () => {
    const newCorda = Math.max(corda - 1, 1);
    setCorda(newCorda);
    if (isActive) {
      onRoundedChange(newCorda, casa);
    }
  };

  const handleCasaUp = () => {
    const newCasa = Math.min(casa + 1, 12);
    setCasa(newCasa);
    if (isActive) {
      onRoundedChange(corda, newCasa);
    }
  };

  const handleCasaDown = () => {
    const newCasa = Math.max(casa - 1, 1);
    setCasa(newCasa);
    if (isActive) {
      onRoundedChange(corda, newCasa);
    }
  };
  
  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={handleToggle}
        title="Ativar/desativar pestana (barre) no diagrama"
        className={`px-3 py-2 h-10 rounded transition-all duration-200 font-medium ${
          isActive ? 'bg-indigo-600 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300' }`}>
        🎵 Pestana
      </button>
      
      {isActive && (
        <>
          <div className="flex flex-col gap-1">
            <span className="text-xs text-gray-600 text-center font-semibold">Corda inicial</span>
            <div className="flex flex-row gap-2 items-center">
              <button
                onClick={handleCordaDown}
                title="Diminuir corda da pestana"
                className="px-2 py-1 h-8 w-8 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={corda <= 1}
              >
                -
              </button>
              <span className="px-2 py-1 w-10 text-center font-bold" title={`Pestana começa na ${corda}ª corda`}>
                {corda}º
              </span>
              <button
                onClick={handleCordaUp}
                title="Aumentar corda da pestana"
                className="px-2 py-1 h-8 w-8 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={corda >= 6}
              >
                +
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs text-gray-600 text-center font-semibold">Casa</span>
            <div className="flex flex-row gap-2 items-center">
              <button
                onClick={handleCasaDown}
                title="Diminuir casa da pestana"
                className="px-2 py-1 h-8 w-8 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={casa <= 1}
              >
                -
              </button>
              <span className="px-2 py-1 w-10 text-center font-bold" title={`Pestana na ${casa}ª casa`}>
                {casa}º
              </span>
              <button
                onClick={handleCasaUp}
                title="Aumentar casa da pestana"
                className="px-2 py-1 h-8 w-8 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={casa >= 12}
              >
                +
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RoundedControl;


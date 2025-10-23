import React from 'react';
import { FINGER_TYPES } from '../../types/tablature';

interface TablatureControlsProps {
  selectedType: 'number' | 'finger';
  selectedValue: string;
  onTypeChange: (type: 'number' | 'finger') => void;
  onValueChange: (value: string) => void;
  onClearAll: () => void;
}

const TablatureControls: React.FC<TablatureControlsProps> = ({
  selectedType,
  selectedValue,
  onTypeChange,
  onValueChange,
  onClearAll,
}) => {
  const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  
  return (
    <div className="flex flex-col gap-6">
      {/* Tipo de marcação */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Tipo</h3>
        <div className="flex flex-col gap-2">
          <button
            onClick={() => onTypeChange('number')}
            className={`px-3 py-2 rounded transition-all duration-200 font-medium ${
              selectedType === 'number'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            title="Usar números de casa"
          >
            🔢 Números
          </button>
          <button
            onClick={() => onTypeChange('finger')}
            className={`px-3 py-2 rounded transition-all duration-200 font-medium ${
              selectedType === 'finger'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            title="Usar indicadores de dedos"
          >
            ✋ Dedos
          </button>
        </div>
      </div>

      {/* Seleção de valores */}
      {selectedType === 'number' ? (
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Casa</h3>
          <div className="grid grid-cols-2 gap-2">
            {numbers.map((num) => (
              <button
                key={num}
                onClick={() => onValueChange(num)}
                className={`w-10 h-10 rounded-full font-bold transition-all duration-200 ${
                  selectedValue === num
                    ? 'bg-indigo-600 text-white shadow-lg scale-110 ring-4 ring-indigo-200'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:scale-105'
                }`}
                title={`Casa ${num}`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Dedo</h3>
          <div className="flex flex-col gap-2">
            {FINGER_TYPES.map((finger) => {
              const getFingerName = (f: string) => {
                if (f === 'P') return 'Polegar';
                if (f === 'I') return 'Indicador';
                if (f === 'M') return 'Médio';
                return 'Anelar';
              };
              
              return (
                <button
                  key={finger}
                  onClick={() => onValueChange(finger)}
                  className={`px-3 py-2 rounded font-bold transition-all duration-200 ${
                    selectedValue === finger
                      ? 'bg-blue-600 text-white shadow-lg scale-105 ring-4 ring-blue-200'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                  title={getFingerName(finger)}
                >
                  {finger}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Botão limpar */}
      <div className="bg-white rounded-lg shadow p-4">
        <button
          onClick={onClearAll}
          className="w-full px-3 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition-colors font-medium"
          title="Limpar toda a tablatura"
        >
          🗑️ Limpar Tudo
        </button>
      </div>
    </div>
  );
};

export default TablatureControls;


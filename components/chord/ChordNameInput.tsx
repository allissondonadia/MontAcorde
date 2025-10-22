import React from 'react';

interface ChordNameInputProps {
  chordName: string;
  onChordNameChange: (name: string) => void;
}

const ChordNameInput: React.FC<ChordNameInputProps> = ({ chordName, onChordNameChange }) => (
  <div className="flex mb-4 justify-center">
    <input
      value={chordName}
      onChange={(e) => onChordNameChange(e.target.value)}
      className="border px-3 py-2 rounded text-center focus:outline-none focus:ring-2 focus:ring-indigo-500"
      placeholder="Nome do acorde"
    />
  </div>
);

export default ChordNameInput;

import React, { useCallback, useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import TablatureCanvas from './TablatureCanvas';
import TablatureControls from './TablatureControls';
import { TablatureNote, TABLATURE_CONFIG } from '../../types/tablature';
import { exportTablatureAsPng } from '../../utils/tablatureExportUtils';

export interface TablatureBuilderRef {
  exportTablature: () => Promise<void>;
}

const TablatureBuilder = forwardRef<TablatureBuilderRef>((props, ref) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [notes, setNotes] = useState<TablatureNote[]>([]);
  const [tablatureName, setTablatureName] = useState('');
  const [selectedType, setSelectedType] = useState<'number' | 'finger'>('number');
  const [selectedValue, setSelectedValue] = useState<string>('0');

  const handleCanvasClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const svg = svgRef.current;
    if (!svg) return;
    
    const rect = svg.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calcular qual corda foi clicada
    const stringIndex = Math.round((y - TABLATURE_CONFIG.topMargin) / TABLATURE_CONFIG.stringSpacing);
    
    if (stringIndex < 0 || stringIndex > 5) return;
    
    const stringNumber = stringIndex + 1;
    const position = Math.max(0, x - TABLATURE_CONFIG.leftMargin);
    
    // Verificar se já existe uma nota nessa posição
    const existingNoteIndex = notes.findIndex(
      n => Math.abs(n.position - position) < 20 && n.string === stringNumber
    );
    
    if (existingNoteIndex >= 0) {
      // Remove a nota existente
      setNotes(notes.filter((_, i) => i !== existingNoteIndex));
    } else {
      // Adiciona nova nota
      const newNote: TablatureNote = {
        string: stringNumber,
        position,
        value: selectedValue,
        type: selectedType,
      };
      setNotes([...notes, newNote]);
    }
  };

  const handleClearAll = () => {
    setNotes([]);
    setTablatureName('');
  };

  const handleExport = useCallback(async () => {
    const svg = svgRef.current;
    if (!svg) return;
    
    await exportTablatureAsPng({
      svg,
      tablatureName,
      backgroundImageUrl: '/tablatura.png'
    });
  }, [tablatureName]);

  useImperativeHandle(ref, () => ({
    exportTablature: handleExport
  }), [handleExport]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Atalhos de teclado
      if (e.key >= '0' && e.key <= '9') {
        e.preventDefault();
        setSelectedType('number');
        setSelectedValue(e.key);
      }
      if (['p', 'i', 'm', 'a'].includes(e.key.toLowerCase())) {
        e.preventDefault();
        setSelectedType('finger');
        setSelectedValue(e.key.toUpperCase());
      }
      if ((e.key === 'Delete' || e.key === 'Backspace') && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        handleClearAll();
      }
    };
    
    globalThis.addEventListener('keydown', handleKeyDown);
    return () => globalThis.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="flex flex-row gap-4">
      <div className="bg-white rounded-lg shadow p-6 flex-1">
        <input
          type="text"
          value={tablatureName}
          onChange={(e) => setTablatureName(e.target.value)}
          placeholder="Nome da tablatura"
          className="w-full px-3 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        
        <TablatureCanvas
          notes={notes}
          onCanvasClick={handleCanvasClick}
          svgRef={svgRef}
        />
      </div>
      
      <TablatureControls
        selectedType={selectedType}
        selectedValue={selectedValue}
        onTypeChange={setSelectedType}
        onValueChange={setSelectedValue}
        onClearAll={handleClearAll}
      />
    </div>
  );
});

TablatureBuilder.displayName = 'TablatureBuilder';

export default TablatureBuilder;


import React, { useCallback, useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import PresetButtons from '../ui/PresetButtons';
import FingerSelector from '../ui/FingerSelector';
import ChordNameInput from '../chord/ChordNameInput';
import Fretboard from '../ui/Fretboard';
import CapotrasteControl from '../ui/CapotrasteControl';
import RoundedControl from '../ui/RoundedControl';
import { Dot, FRETBOARD_CONFIG, PRESETS, BASE_DOTS } from '../../types/chord';
import { exportChordAsPng } from '../../utils/exportUtils';

export interface ChordBuilderRef {
  exportChord: () => Promise<void>;
}

const ChordBuilder = forwardRef<ChordBuilderRef>((props, ref) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [dots, setDots] = useState<Dot[]>(BASE_DOTS);
  const [chordName, setChordName] = useState('');
  const [selectedFinger, setSelectedFinger] = useState<string>('1');
  const [hoverDot, setHoverDot] = useState<Dot | null>(null);
  
  const casaSpacing = (FRETBOARD_CONFIG.height - 60) / FRETBOARD_CONFIG.casaCount;
  const cordaSpacing = (FRETBOARD_CONFIG.width - 60) / (FRETBOARD_CONFIG.cordaCount - 1);

  const snap = (x: number, y: number): Dot => {
    const svg = svgRef.current;
    if (!svg) return { corda: 1, casa: 1 };
    
    const rect = svg.getBoundingClientRect();
    const rx = Math.max(30, Math.min(rect.width - 30, x));
    const ry = Math.max(30, Math.min(rect.height - 30, y - FRETBOARD_CONFIG.casaDeslocamento));
    
    const corda = FRETBOARD_CONFIG.cordaCount - Math.round((rx - 30) / cordaSpacing);
    const casa = Math.round((ry - 30) / casaSpacing) + 1;
    
    return { corda, casa };
  };

  const nextChordType = (type: string) => {
    switch(type) {
      case "gray":
        return "outline";
      case "outline":
        return "x";
      default:
        return undefined;
    }
  }

  const ajustaDedilhado = (corda: number): Dot[] => {
    const existingDot = dots.find(d => d.corda === corda && !d.casa);
    if(existingDot) {
      const newType = nextChordType(existingDot.type);
      const newDots = dots.filter(d => d.corda !== corda || d.casa);
      if(newType) {
        existingDot.type = newType;
        return [...newDots, existingDot];
      } else {
        return newDots
      }
    } else {
      const newDot: Dot = { corda: corda, type: "gray" };
      return [...dots, newDot];
    }
  }

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const svg = svgRef.current;
    if (!svg) return;
    
    const rect = svg.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const dot = snap(x, y);
    
    // Só mostra preview se for dentro do fretboard válido
    if (dot.casa <= 5 && dot.casa >= 1 && dot.corda >= 1 && dot.corda <= 6) {
      setHoverDot({ ...dot, finger: selectedFinger });
    } else {
      setHoverDot(null);
    }
  };

  const handleMouseLeave = () => {
    setHoverDot(null);
  };

  const handleDotClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const svg = svgRef.current;
    if (!svg) return;
    
    const rect = svg.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const dot = snap(x, y);

    const filteredDots = dots.filter(d => (d.finger !== selectedFinger));    
    if(dot.casa > 5) {
      setDots(ajustaDedilhado(dot.corda));
    } else {
      const existingDot = filteredDots.find(d => (d.corda === dot.corda && d.casa === dot.casa));
      if (existingDot) {
        setDots(dots.filter(d => (d.corda !== dot.corda || d.casa !== dot.casa)));
      } else {
        const newDot = { ...dot, finger: selectedFinger };
        setDots([...filteredDots, newDot]);
        const nextFinger = selectedFinger === '4' ? '1' : String(Number(selectedFinger) + 1);
        setSelectedFinger(nextFinger);
      }
    }
  };

  const loadPreset = useCallback((name: string) => {
    const preset = PRESETS[name];
    if (!preset) return;
    
    setDots(preset);
    setChordName(name);
  }, []);

  const handleExport = useCallback(async () => {
    const svg = svgRef.current;
    if (!svg) return;
    
    await exportChordAsPng({
      svg,
      chordName,
      backgroundImageUrl: '/grade_2.png'
    });
  }, [chordName]);

  useImperativeHandle(ref, () => ({
    exportChord: handleExport
  }), [handleExport]);

  const handleCapotrasteChange = (value: number) => {
    setDots(prevDots => prevDots.filter(d => !(d.corda === 6 && d.casa === 0.15)));
    if(value) {
      const capotrasteDot: Dot = { corda: 6, casa: 0.15, finger: `${value}°`, type: "square" };
      setDots(prevDots => [...prevDots, capotrasteDot]);
    }
  };

  const handleRoundedChange = (corda: number, casa: number) => {
    // Remove any existing rounded dot
    setDots(prevDots => prevDots.filter(d => d.type !== "rounded"));
    
    // If corda and casa are valid, add the new rounded dot
    if(corda > 0 && casa > 0) {
      const roundedDot: Dot = { corda, casa, type: "rounded" };
      setDots(prevDots => [...prevDots, roundedDot]);
    }
  };

  const handleClearAll = () => {
    setDots(BASE_DOTS);
    setChordName('');
    setSelectedFinger('1');
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Atalhos de teclado para selecionar dedos (1-4)
      if (['1', '2', '3', '4'].includes(e.key)) {
        e.preventDefault();
        setSelectedFinger(e.key);
      }
      // Atalho Ctrl/Cmd + Z para limpar (ou apenas Delete/Backspace)
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
      <PresetButtons onLoadPreset={loadPreset} />
      
      <div className="bg-white rounded-lg shadow p-6">
        <ChordNameInput
          chordName={chordName}
          onChordNameChange={setChordName}
        />
        
        <Fretboard
          dots={dots}
          hoverDot={hoverDot}
          onDotClick={handleDotClick}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          svgRef={svgRef}
        />
      </div>
            
      <div className="gap-2 flex flex-col gap-6">
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Dedos</h3>
          <FingerSelector
            selectedFinger={selectedFinger}
            onFingerSelect={setSelectedFinger}
          />
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Controles</h3>
          <div className="flex flex-col gap-3">
            <CapotrasteControl
              onCapotrasteChange={handleCapotrasteChange}
            />
            
            <RoundedControl
              onRoundedChange={handleRoundedChange}
            />
            
            <button
              onClick={handleClearAll}
              className="px-3 py-2 h-10 rounded bg-red-500 text-white hover:bg-red-600 transition-colors font-medium"
              title="Limpar todos os dots e resetar o acorde"
            >
              🗑️ Limpar Tudo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

ChordBuilder.displayName = 'ChordBuilder';

export default ChordBuilder;

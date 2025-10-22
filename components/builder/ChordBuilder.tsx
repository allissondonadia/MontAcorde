import React, { useCallback, useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import PresetButtons from '../ui/PresetButtons';
import FingerSelector from '../ui/FingerSelector';
import ChordNameInput from '../chord/ChordNameInput';
import Fretboard from '../ui/Fretboard';
import CapotrasteControl from '../ui/CapotrasteControl';
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
    const existingDot = dots.find(d => d.corda === corda);
    if(existingDot) {
      const newType = nextChordType(existingDot.type);
      const newDots = dots.filter(d => d.corda !== corda);
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

  const handleDotClick = (e: React.MouseEvent<SVGSVGElement>) => {
    console.log('handleDotClick started');
    const svg = svgRef.current;
    if (!svg) return;
    
    const rect = svg.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const dot = snap(x, y);
    
    if(dot.casa > 5) {
      setDots(ajustaDedilhado(dot.corda));
    } else {
      const existingDot = dots.find(d => d.corda === dot.corda && d.casa === dot.casa);
      if (existingDot) {
        setDots(dots.filter(d => d.corda !== dot.corda || d.casa !== dot.casa));
      } else {
        const newDot = { ...dot, finger: selectedFinger };
        setDots([...dots, newDot]);
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

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      // Future pointer move functionality can be added here
    };
    
    globalThis.addEventListener('pointermove', handlePointerMove);
    return () => globalThis.removeEventListener('pointermove', handlePointerMove);
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
          onDotClick={handleDotClick}
          svgRef={svgRef}
        />
      </div>
            
      <div className="gap-2 flex flex-col gap-24">
        <FingerSelector
          selectedFinger={selectedFinger}
          onFingerSelect={setSelectedFinger}
        />
        
        <CapotrasteControl
          onCapotrasteChange={handleCapotrasteChange}
        />
      </div>
    </div>
  );
});

ChordBuilder.displayName = 'ChordBuilder';

export default ChordBuilder;

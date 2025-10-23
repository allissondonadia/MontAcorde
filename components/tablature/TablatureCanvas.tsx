import React from 'react';
import { TablatureNote, TABLATURE_CONFIG } from '../../types/tablature';

interface TablatureCanvasProps {
  notes: TablatureNote[];
  onCanvasClick: (e: React.MouseEvent<SVGSVGElement>) => void;
  svgRef: React.RefObject<SVGSVGElement>;
}

const TablatureCanvas: React.FC<TablatureCanvasProps> = ({ 
  notes, 
  onCanvasClick, 
  svgRef 
}) => {
  const { width, height, stringSpacing, topMargin, leftMargin } = TABLATURE_CONFIG;
  
  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      onClick={onCanvasClick}
      className="border rounded cursor-crosshair bg-white"
    >
      <defs>
        <pattern
          id="tablatureBackground"
          patternUnits="userSpaceOnUse"
          width={width}
          height={height}
        >
          <image
            href="/tablatura.png"
            width={width}
            height={height}
            preserveAspectRatio="xMidYMid slice"
          />
        </pattern>
      </defs>
      
      <rect x={0} y={0} width={width} height={height} fill="url(#tablatureBackground)" />
      
      {/* Renderizar notas */}
      {notes.map((note, index) => {
        const y = topMargin + (note.string - 1) * stringSpacing;
        const x = leftMargin + note.position;
        
        return (
          <g key={`${note.string}-${note.position}-${index}`}>
            {/* Fundo branco atrás do texto para melhor legibilidade */}
            <circle
              cx={x}
              cy={y}
              r={12}
              fill="white"
              opacity={0.9}
            />
            
            {/* Texto da nota */}
            <text
              x={x}
              y={y}
              fontSize="24"
              fontWeight="bold"
              fill={note.type === 'finger' ? '#1e40af' : '#000'}
              textAnchor="middle"
              dominantBaseline="middle"
              style={{ userSelect: 'none' }}
            >
              {note.value}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

export default TablatureCanvas;


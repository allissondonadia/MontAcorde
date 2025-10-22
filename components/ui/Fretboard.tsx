import React from 'react';
import ChordDot from '../chord/ChordDot';
import ChordSquare from '../chord/ChordSquare';
import ChordRounded from '../chord/ChordRounded';
import ChordGray from '../chord/ChordGray';
import ChordOutline from '../chord/ChordOutline';
import ChordX from '../chord/ChordX';
import { Dot, FRETBOARD_CONFIG } from '../../types/chord';

interface FretboardProps {
  dots: Dot[];
  hoverDot?: Dot | null;
  fretPosition?: number;
  onDotClick: (e: React.MouseEvent<SVGSVGElement>) => void;
  onMouseMove?: (e: React.MouseEvent<SVGSVGElement>) => void;
  onMouseLeave?: () => void;
  svgRef: React.RefObject<SVGSVGElement>;
}

const Fretboard: React.FC<FretboardProps> = ({ 
  dots, 
  hoverDot,
  fretPosition = 0,
  onDotClick, 
  onMouseMove, 
  onMouseLeave, 
  svgRef 
}) => {
  const { width, height, backgroundImageWidth, backgroundImageHeight } = FRETBOARD_CONFIG;
  
  // Verifica se já existe um dot na posição do hover
  const isDotAtHoverPosition = hoverDot && dots.some(
    d => d.corda === hoverDot.corda && d.casa === hoverDot.casa
  );
  
  // Escolhe a imagem de fundo baseada na posição
  const backgroundImage = fretPosition > 0 ? '/grade_alta.png' : '/grade.png';
  
  return (
    <svg
      ref={svgRef}
      width={backgroundImageWidth}
      height={backgroundImageHeight}
      onClick={onDotClick}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="border rounded cursor-crosshair"
    >
      <defs>
        <pattern
          id="guitarFretboard"
          patternUnits="userSpaceOnUse"
          width={width}
          height={height}
        >
          <image
            href={backgroundImage}
            width={backgroundImageWidth}
            height={backgroundImageHeight}
            preserveAspectRatio="xMidYMid slice"
          />
        </pattern>
      </defs>
      
      <rect x={0} y={0} width={width} height={height} fill="url(#guitarFretboard)" />
      
      {/* Indicador de posição quando não está no início do braço */}
      {fretPosition > 0 && (
        <text
          x={15}
          y={90}
          fontSize="24"
          fontWeight="bold"
          fill="#333"
          textAnchor="middle"
        >
          {fretPosition}ª
        </text>
      )}
      
      {dots.map((dot, index) => {
        switch (dot.type) {
          case "square":
            return (
              <ChordSquare
                key={`square-${dot.corda}-${dot.casa}-${index}`}
                dot={dot}
                index={index}
              />
            );
          case "rounded":
            return (
              <ChordRounded
                key={`rounded-${dot.corda}-${dot.casa}-${index}`}
                dot={dot}
                index={index}
              />
            );
          case "gray":
            return (
              <ChordGray
                key={`gray-${dot.corda}-${dot.casa}-${index}`}
                dot={dot}
                index={index}
              />
            );
          case "outline":
            return (
              <ChordOutline
                key={`outline-${dot.corda}-${dot.casa}-${index}`}
                dot={dot}
                index={index}
              />
            );
          case "x":
            return (
              <ChordX
                key={`x-${dot.corda}-${dot.casa}-${index}`}
                dot={dot}
                index={index}
              />
            );
          default:
            return (
              <ChordDot
                key={`dot-${dot.corda}-${dot.casa}-${index}`}
                dot={dot}
                index={index}
              />
            );
        }
      })}
      
      {/* Preview dot ao passar o mouse */}
      {hoverDot && !isDotAtHoverPosition && (
        <g opacity="0.4">
          <ChordDot
            dot={hoverDot}
            index={-1}
          />
        </g>
      )}
    </svg>
  );
};

export default Fretboard;

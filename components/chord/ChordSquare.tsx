import React from 'react';
import { Dot } from '../../types/chord';
import { getDotPosition } from '../../utils/positionUtils';

interface ChordSquareProps {
  dot: Dot;
  index: number;
}

const ChordSquare: React.FC<ChordSquareProps> = ({ dot, index }) => {
  const position = getDotPosition(dot);
  const size = 24;
  
  return (
    <g key={`square-${dot.corda}-${dot.casa}-${index}`}>
      <rect 
        x={position.cx - (size*2)} 
        y={position.cy - size} 
        width={size * 2 * 12} 
        height={size * 2} 
        fill="#000" 
      />
      {dot.finger && (
        <>
          <text
            x={position.cx}
            y={position.cy + 8}
            textAnchor="middle"
            fontSize={24}
            fill="#fff"
            fontWeight="bold"
          >
            {dot.finger}
          </text>
          <text
          x={position.cx + 230}
          y={position.cy + 8}
          textAnchor="middle"
          fontSize={24}
          fill="#fff"
          fontWeight="bold"
        >
          CAPOTRASTE
        </text>
      </>
      )}
      <title>corda {dot.corda} - casa {dot.casa}</title>
    </g>
  );
};

export default ChordSquare;

import React from 'react';
import { Dot } from '../../types/chord';
import { getDotPosition } from '../../utils/positionUtils';

interface ChordOutlineProps {
  dot: Dot;
  index: number;
}

const ChordOutline: React.FC<ChordOutlineProps> = ({ dot, index }) => {
  const position = getDotPosition(dot);
  position.cx = position.cx + 1;
  
  return (
    <g key={`outline-${dot.corda}-${dot.casa}-${index}`}>
      <circle 
        {...position} 
        r={16} 
        fill="none" 
        stroke="#ccc" 
        strokeWidth={3}
      />
      {dot.finger && (
        <text
          x={position.cx}
          y={position.cy + 8}
          textAnchor="middle"
          fontSize={24}
          fill="#000"
          fontWeight="bold"
        >
          {dot.finger}
        </text>
      )}
      <title>corda {dot.corda} - casa {dot.casa}</title>
    </g>
  );
};

export default ChordOutline;

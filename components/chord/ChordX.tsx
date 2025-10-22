import React from 'react';
import { Dot } from '../../types/chord';
import { getDotPosition } from '../../utils/positionUtils';

interface ChordXProps {
  dot: Dot;
  index: number;
}

const ChordX: React.FC<ChordXProps> = ({ dot, index }) => {
  const position = getDotPosition(dot);
  const size = 16;
  
  return (
    <g key={`x-${dot.corda}-${dot.casa}-${index}`}>
      <line
        x1={position.cx - size}
        y1={position.cy - size}
        x2={position.cx + size}
        y2={position.cy + size}
        stroke="#ccc"
        strokeWidth={4}
      />
      <line
        x1={position.cx + size}
        y1={position.cy - size}
        x2={position.cx - size}
        y2={position.cy + size}
        stroke="#ccc"
        strokeWidth={4}
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

export default ChordX;

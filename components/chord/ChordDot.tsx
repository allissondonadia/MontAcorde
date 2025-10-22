import React from 'react';
import { getDotPosition } from '../../utils/positionUtils';
import { ChordProps } from '@/types/chord';

const ChordDot: React.FC<ChordProps> = ({ dot, index }) => {
  const position = getDotPosition(dot);
  
  return (
    <g key={`dot-${dot.corda}-${dot.casa}-${index}`}>
      <circle {...position} r={24} fill="#000" />
      {dot.finger && (
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
      )}
      <title>corda {dot.corda} - casa {dot.casa}</title>
    </g>
  );
};

export default ChordDot;

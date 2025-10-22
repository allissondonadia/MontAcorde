import React from 'react';
import { Dot } from '../../types/chord';
import { getDotPosition } from '@/utils/positionUtils';

interface ChordGrayProps {
  dot: Dot;
  index: number;
}

const ChordGray: React.FC<ChordGrayProps> = ({ dot, index }) => {
  const position = getDotPosition(dot);
  
  return (
    <g key={`gray-${dot.corda}-${dot.casa}-${index}`}>
      <circle {...position} r={16} fill="#ccc" />
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

export default ChordGray;

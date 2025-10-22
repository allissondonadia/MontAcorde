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
  onDotClick: (e: React.MouseEvent<SVGSVGElement>) => void;
  svgRef: React.RefObject<SVGSVGElement>;
}

const Fretboard: React.FC<FretboardProps> = ({ dots, onDotClick, svgRef }) => {
  const { width, height, backgroundImageWidth, backgroundImageHeight } = FRETBOARD_CONFIG;
  
  return (
    <svg
      ref={svgRef}
      width={backgroundImageWidth}
      height={backgroundImageHeight}
      onClick={onDotClick}
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
            href="/grade_2.png"
            width={backgroundImageWidth}
            height={backgroundImageHeight}
            preserveAspectRatio="xMidYMid slice"
          />
        </pattern>
      </defs>
      
      <rect x={0} y={0} width={width} height={height} fill="url(#guitarFretboard)" />
      
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
    </svg>
  );
};

export default Fretboard;

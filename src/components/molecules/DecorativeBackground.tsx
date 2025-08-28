import React from 'react';
import { useTheme, useMediaQuery } from '@mui/material';
import { DecorativeElement } from '../atoms';

interface DecorativeBackgroundProps {
  elements?: Array<{
    size: number;
    left: number;
    top: number;
    opacity: number;
  }>;
}

const DecorativeBackground: React.FC<DecorativeBackgroundProps> = ({
  elements = [
    { size: 80, left: 5, top: 15, opacity: 0.08 },
    { size: 120, left: 90, top: 10, opacity: 0.06 },
    { size: 60, left: 85, top: 80, opacity: 0.1 },
    { size: 100, left: 10, top: 85, opacity: 0.07 },
    { size: 90, left: 50, top: 5, opacity: 0.05 },
  ]
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Don't render decorative elements on mobile for performance
  if (isMobile) {
    return null;
  }

  return (
    <>
      {elements.map((element, index) => (
        <DecorativeElement
          key={index}
          size={element.size}
          left={element.left}
          top={element.top}
          opacity={element.opacity}
        />
      ))}
    </>
  );
};

export default DecorativeBackground;

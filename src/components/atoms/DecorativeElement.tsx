import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { subtleFloat } from './animations';

const StyledDecorativeElement = styled(Box, {
  shouldForwardProp: (prop) => 
    prop !== 'elementSize' && 
    prop !== 'elementLeft' && 
    prop !== 'elementTop' && 
    prop !== 'elementOpacity'
})<{ 
  elementSize?: number; 
  elementLeft?: number; 
  elementTop?: number; 
  elementOpacity?: number 
}>(({ 
  theme, 
  elementSize = 60, 
  elementLeft = 10, 
  elementTop = 20,
  elementOpacity = 0.1
}) => ({
  position: 'absolute',
  width: `${elementSize}px`,
  height: `${elementSize}px`,
  left: `${elementLeft}%`,
  top: `${elementTop}%`,
  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
  borderRadius: '50%',
  opacity: elementOpacity,
  animation: `${subtleFloat} 6s ease-in-out infinite`,
  zIndex: 1,
}));

interface DecorativeElementProps {
  size?: number;
  left?: number;
  top?: number;
  opacity?: number;
  className?: string;
}

const DecorativeElement: React.FC<DecorativeElementProps> = ({
  size = 60,
  left = 10,
  top = 20,
  opacity = 0.1,
  className
}) => {
  return (
    <StyledDecorativeElement
      elementSize={size}
      elementLeft={left}
      elementTop={top}
      elementOpacity={opacity}
      className={className}
    />
  );
};

export default DecorativeElement;

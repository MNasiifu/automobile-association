import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { subtleFloat } from './animations';

const StyledDecorativeElement = styled(Box)<{ 
  $size?: number; 
  $left?: number; 
  $top?: number; 
  $opacity?: number 
}>(({ 
  theme, 
  $size = 60, 
  $left = 10, 
  $top = 20,
  $opacity = 0.1
}) => ({
  position: 'absolute',
  width: `${$size}px`,
  height: `${$size}px`,
  left: `${$left}%`,
  top: `${$top}%`,
  background: `linear-gradient(191deg, ${theme.palette.primary.dark}, ${theme.palette.primary.light})`,
  borderRadius: '50%',
  opacity: $opacity,
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
      $size={size}
      $left={left}
      $top={top}
      $opacity={opacity}
      className={className}
    />
  );
};

export default DecorativeElement;

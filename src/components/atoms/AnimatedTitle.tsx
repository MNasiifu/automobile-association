import React from 'react';
import { styled } from '@mui/material/styles';
import { slideInUp } from './animations';
import Heading from './Heading';

const StyledAnimatedTitle = styled(Heading)(({ theme }) => ({
  color: '#ffffff',
  fontWeight: 800,
  textShadow: '0 4px 12px rgba(0,0,0,0.4), 0 2px 4px rgba(0,0,0,0.3)',
  marginBottom: theme.spacing(2),
  lineHeight: 1.1,
  letterSpacing: '-0.02em',
  animation: `${slideInUp} 0.8s ease-out`,
  position: 'relative',
  textAlign: 'center',
  
  // Enhanced text rendering
  textRendering: 'optimizeLegibility',
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
  
  // Responsive scaling with better proportions
  fontSize: 'clamp(2.5rem, 4vw + 1rem, 4.5rem)',
  
  // Subtle text decoration for depth
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '-8px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '60px',
    height: '3px',
    background: `linear-gradient(90deg, transparent, ${theme.palette.secondary.light}, transparent)`,
    borderRadius: '2px',
    opacity: 0.8,
  },
  
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(1.5),
    '&::after': {
      width: '40px',
      height: '2px',
      bottom: '-6px',
    },
  },
  
  [theme.breakpoints.down('sm')]: {
    letterSpacing: '-0.01em',
  },
}));

interface AnimatedTitleProps {
  children: React.ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  component?: React.ElementType;
  className?: string;
}

const AnimatedTitle: React.FC<AnimatedTitleProps> = ({
  children,
  variant = 'h1',
  component = 'h1',
  className
}) => {
  return (
    <StyledAnimatedTitle 
      variant={variant} 
      component={component}
      className={className}
    >
      {children}
    </StyledAnimatedTitle>
  );
};

export default AnimatedTitle;

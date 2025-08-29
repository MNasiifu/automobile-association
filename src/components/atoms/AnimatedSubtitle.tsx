import React from 'react';
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { slideInUp } from './animations';

const StyledAnimatedSubtitle = styled(Typography)(({ theme }) => ({
  color: 'rgba(255, 255, 255, 0.95)',
  fontSize: 'clamp(1.1rem, 2vw + 0.5rem, 1.1rem)',
  fontWeight: 400,
  lineHeight: 1.65,
  textShadow: '0 2px 8px rgba(0,0,0,0.3)',
  marginBottom: theme.spacing(3),
  maxWidth: '700px',
  margin: '0 auto',
  animation: `${slideInUp} 1s ease-out 0.2s both`,
  marginTop: theme.spacing(3),
  
  // Better text rendering
  textRendering: 'optimizeLegibility',
  WebkitFontSmoothing: 'antialiased',
  
  // Enhanced spacing and readability
  letterSpacing: '0.01em',
  wordSpacing: '0.05em',
  
  // Responsive adjustments
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(2),
    maxWidth: '600px',
  },
  
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(1.5),
    maxWidth: '100%',
    lineHeight: 1.6,
  },
}));

interface AnimatedSubtitleProps {
  children: React.ReactNode;
  className?: string;
}

const AnimatedSubtitle: React.FC<AnimatedSubtitleProps> = ({
  children,
  className
}) => {
  return (
    <StyledAnimatedSubtitle 
      className={className}
    >
      {children}
    </StyledAnimatedSubtitle>
  );
};

export default AnimatedSubtitle;

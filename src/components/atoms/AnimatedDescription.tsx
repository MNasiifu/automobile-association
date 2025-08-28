import React from 'react';
import { Typography } from '@mui/material';
import { slideInUp } from './animations';

interface AnimatedDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

const AnimatedDescription: React.FC<AnimatedDescriptionProps> = ({
  children,
  className
}) => {
  return (
    <Typography
      className={className}
      sx={{
        color: 'rgba(255, 255, 255, 0.85)',
        fontSize: '1.1rem',
        lineHeight: 1.7,
        maxWidth: '600px',
        margin: '0 auto',
        mb: 4,
        textShadow: '0 1px 3px rgba(0,0,0,0.3)',
        animation: `${slideInUp} 1.2s ease-out 0.4s both`,
      }}
    >
      {children}
    </Typography>
  );
};

export default AnimatedDescription;

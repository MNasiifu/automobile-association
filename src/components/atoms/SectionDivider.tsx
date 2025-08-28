import React from 'react';
import { Divider } from '@mui/material';

interface SectionDividerProps {
  className?: string;
}

const SectionDivider: React.FC<SectionDividerProps> = ({
  className
}) => {
  return (
    <Divider
      className={className}
      sx={{
        my: 4,
        background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
        height: '1px',
        border: 'none',
        maxWidth: '200px',
        margin: '32px auto',
      }}
    />
  );
};

export default SectionDivider;

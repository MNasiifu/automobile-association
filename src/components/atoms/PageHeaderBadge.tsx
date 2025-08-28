import React from 'react';
import { Box, Chip } from '@mui/material';
import { slideInUp } from './animations';

interface PageHeaderBadgeProps {
  label: string;
  className?: string;
}

const PageHeaderBadge: React.FC<PageHeaderBadgeProps> = ({
  label,
  className
}) => {
  return (
    <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}>
      <Chip
        label={label}
        className={className}
        sx={{
          background: 'rgba(255, 203, 10, 0.2)',
          color: 'rgba(255, 255, 255, 0.95)',
          fontWeight: 600,
          border: '1px solid rgba(255, 203, 10, 0.3)',
          fontSize: '0.875rem',
          animation: `${slideInUp} 0.8s ease-out 0.2s both`,
          '&:hover': {
            background: 'rgba(255, 203, 10, 0.3)',
          },
        }}
      />
    </Box>
  );
};

export default PageHeaderBadge;

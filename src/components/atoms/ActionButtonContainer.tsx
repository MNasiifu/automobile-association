import React from 'react';
import { Stack } from '@mui/material';
import { slideInUp } from './animations';

interface ActionButtonContainerProps {
  children: React.ReactNode;
  className?: string;
}

const ActionButtonContainer: React.FC<ActionButtonContainerProps> = ({
  children,
  className
}) => {
  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      spacing={2}
      justifyContent="center"
      alignItems="center"
      className={className}
      sx={{
        mt: 4,
        animation: `${slideInUp} 1s ease-out 0.6s both`,
      }}
    >
      {children}
    </Stack>
  );
};

export default ActionButtonContainer;

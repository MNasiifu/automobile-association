import React from 'react';
import { Box } from '@mui/material';
import { ServicesOverview } from '../components/organisms';

const Services: React.FC = () => {
  return (
    <Box sx={{ pt: 4 }}>
      <ServicesOverview showAll />
    </Box>
  );
};

export default Services;

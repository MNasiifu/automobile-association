import React from 'react';
import { Box } from '@mui/material';
import { Hero, ServicesOverview } from '../components/organisms';

const Home: React.FC = () => {
  return (
    <Box>
      <Hero />
      <ServicesOverview maxServices={3} />
    </Box>
  );
};

export default Home;

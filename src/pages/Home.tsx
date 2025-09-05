import React from 'react';
import { Box } from '@mui/material';
import { Hero, ServicesOverview } from '../components/organisms';
import { SEOFixed } from '../components/SEOFixed';
import { homeSEO } from '../data/seoData';

const Home: React.FC = () => {
  return (
    <Box>
      <SEOFixed seoData={homeSEO} />
      <Hero />
      <ServicesOverview maxServices={3} />
    </Box>
  );
};

export default Home;

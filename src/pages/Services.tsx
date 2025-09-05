import React from 'react';
import { Box } from '@mui/material';
import { PageHeader } from '../components/molecules';
import { ServicesOverview } from '../components/organisms';
import { SEO } from '../components/SEO';
import { servicesSEO } from '../data/seoData';

const Services: React.FC = () => {
  return (
    <Box>
      <SEO seoData={servicesSEO} />
      <PageHeader
        title="Our Services"
        subtitle="Comprehensive automotive solutions designed to keep you safe and confident on Uganda's roads."
      />

      <Box sx={{ pt: 0 }}>
        <ServicesOverview />
      </Box>
    </Box>
  );
};

export default Services;

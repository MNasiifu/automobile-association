import React from 'react';
import { Box } from '@mui/material';
import { PageHeader } from '../components/molecules';
import { ServicesOverview } from '../components/organisms';

const Services: React.FC = () => {
  return (
    <Box>
      <PageHeader
        title="Our Services"
        subtitle="Comprehensive automotive solutions designed to keep you safe and confident on Uganda's roads."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services' }
        ]}
      />

      <Box sx={{ pt: 0 }}>
        <ServicesOverview />
      </Box>
    </Box>
  );
};

export default Services;

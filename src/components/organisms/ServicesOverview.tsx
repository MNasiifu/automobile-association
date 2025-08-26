import React from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Heading } from '../atoms';
import { ServiceCard } from '../molecules';
import { services } from '../../data/servicesData';

const ServicesSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0),
  backgroundColor: theme.palette.grey[50],
}));

const SectionHeader = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(6),
}));

const ServicesGrid = styled(Grid)(() => ({
  '& .MuiGrid-item': {
    display: 'flex',
  },
}));

interface ServicesOverviewProps {
  maxServices?: number;
  showAll?: boolean;
}

const ServicesOverview: React.FC<ServicesOverviewProps> = ({ 
  maxServices = 6, 
  showAll = false 
}) => {
  const displayedServices = showAll ? services : services.slice(0, maxServices);

  const handleServiceClick = (serviceId: string) => {
    // Navigate to service detail or open modal
    console.log('Navigate to service:', serviceId);
  };

  return (
    <ServicesSection>
      <Container maxWidth="lg">
        <SectionHeader>
          <Heading variant="h2" align="center" gutterBottom>
            Our Services
          </Heading>
          
          <Typography
            variant="h6"
            color="text.secondary"
            align="center"
            sx={{ maxWidth: 600, mx: 'auto' }}
          >
            Comprehensive automotive solutions designed to keep you safe and 
            confident on Uganda's roads
          </Typography>
        </SectionHeader>
        
        <ServicesGrid container spacing={4}>
          {displayedServices.map((service) => (
            <Grid item xs={12} sm={6} lg={4} key={service.id}>
              <ServiceCard
                title={service.title}
                description={service.description}
                icon={service.icon}
                features={service.features}
                onClick={() => handleServiceClick(service.id)}
              />
            </Grid>
          ))}
        </ServicesGrid>
        
        {!showAll && services.length > maxServices && (
          <Box sx={{ textAlign: 'center', mt: 6 }}>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              And {services.length - maxServices} more services...
            </Typography>
          </Box>
        )}
      </Container>
    </ServicesSection>
  );
};

export default ServicesOverview;

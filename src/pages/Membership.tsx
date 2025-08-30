import React from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import { PageHeader } from '../components/molecules';
import rescueImage from '../assets/images/AA-rescue.jpg';


const MembershipPage: React.FC = () => {
  return (
    <Box>
      <PageHeader 
        title="AA Uganda Membership"
        subtitle="Join Us Today"
        description="Experience exclusive benefits and premium services with AA Uganda membership."
      />
      
      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
        {/* Services Section */}
        <Grid container spacing={4} alignItems="center" sx={{ mb: 8 }}>
          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h4" gutterBottom>
                Why Join AA Uganda?
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 2 }}>
                As a member of AA Uganda, you'll enjoy:
              </Typography>
              <Box component="ul" sx={{ pl: 2 }}>
                {[
                  '24/7 Emergency Rescue Services',
                  'Exclusive Discounts on Driving School',
                  'Free Vehicle Inspection',
                  'Technical Assistance and Advice',
                  'Travel and Tourism Services',
                  'Access to International Driving Permits'
                ].map((benefit) => (
                  <Typography 
                    key={benefit} 
                    component="li" 
                    sx={{ mb: 1 }}
                  >
                    {benefit}
                  </Typography>
                ))}
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src={rescueImage}
              alt="AA Uganda Rescue Services"
              sx={{
                width: '100%',
                height: 'auto',
                borderRadius: 2,
                boxShadow: 3
              }}
            />
          </Grid>
        </Grid>

        {/* Coming Soon Banner */}
        <Box 
          sx={{ 
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            py: 6,
            px: 4,
            borderRadius: 2,
            textAlign: 'center',
            mb: 8
          }}
        >
          <Typography variant="h3" sx={{ mb: 2 }}>
            New Membership Portal Coming Soon
          </Typography>
          <Typography>
            We're revamping our membership system to serve you better. 
            Stay tuned for enhanced features and an improved user experience.
          </Typography>
        </Box>

        {/* Contact Information */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            Want to Know More?
          </Typography>
          <Typography color="text.secondary">
            Visit our office or call us at +256 786 623 001
          </Typography>
          <Typography color="text.secondary">
            Email: membership@aauganda.org
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default MembershipPage;

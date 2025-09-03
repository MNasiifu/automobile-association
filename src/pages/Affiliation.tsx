import React from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import { PageHeader } from '../components/molecules';
import { affiliates } from '../data/companyData';

const Affiliation: React.FC = () => {
  return (
    <Box>
      <PageHeader
        title="Our Affiliations"
        subtitle="Learn about our international partnerships and memberships"
      />
      
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          {affiliates.map((affiliate, index) => (
            <Grid item xs={12} key={index}>
              <Box
                sx={{
                  p: 4,
                  bgcolor: 'background.paper',
                  borderRadius: 2,
                  boxShadow: 1,
                }}
              >
                <Grid container spacing={4} alignItems="center">
                  <Grid item xs={12} md={4}>
                    <Box
                      component="img"
                      src={affiliate.img}
                      alt={affiliate.name}
                      sx={{
                        width: '100%',
                        maxWidth: 300,
                        height: 'auto',
                        display: 'block',
                        mx: 'auto',
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <Typography variant="h4" gutterBottom color="primary">
                      {affiliate.name}
                    </Typography>
                    <Typography variant="body1">
                      {affiliate.description}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Affiliation;
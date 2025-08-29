// src/pages/Careers.tsx
import React from 'react';
import { Grid } from '@mui/material';
import { Box, Container, Typography, Button } from '@mui/material';
import { PageHeader } from '../components/molecules';

const Careers: React.FC = () => {
  return (
    <Box>
      <PageHeader
        title="Careers at AA Uganda"
        subtitle="Join a team committed to safer roads and excellent service."
      />

      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        <Grid container spacing={4} justifyContent="center">
          <Grid xs={12} md={8}>
            <Box
              sx={{
                p: { xs: 3, md: 5 },
                textAlign: 'center',
                borderRadius: 2,
                bgcolor: 'grey.50',
                border: (t) => `1px solid ${t.palette.divider}`,
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>
                No Current Openings
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                We’re not hiring right now, but we’re always excited to meet great talent.
                Check back soon.
              </Typography>

              <Button
                variant="contained"
                sx={{
                  // Yellow bg + green text (consistent with your brand)
                  bgcolor: 'secondary.main',
                  color: 'primary.main',
                  fontWeight: 800,
                  '&:hover': { bgcolor: 'secondary.light', color: 'primary.dark' },
                }}
                href="/contact"
              >
                Contact HR
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Careers;

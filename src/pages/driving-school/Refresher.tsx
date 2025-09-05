import React from 'react';
import { Box, Container, Typography, Paper, Button } from '@mui/material';
import { PageHeader } from '../../components/molecules';
import { SEO } from '../../components/SEO';
import { drivingSchoolRefresherSEO } from '../../data/seoData';
import { AccessTime, Event, Construction } from '@mui/icons-material';

const RefresherCourses: React.FC = () => {
  return (
    <Box>
      <SEO seoData={drivingSchoolRefresherSEO} />
      <PageHeader
        title="Refresher Courses"
        subtitle="Update and enhance your driving skills with our specialized refresher programs"
      />

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Paper 
          elevation={0} 
          sx={{ 
            p: 4, 
            bgcolor: 'background.paper',
            textAlign: 'center',
            minHeight: '400px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Construction sx={{ fontSize: 60, color: 'primary.main', mb: 3 }} />
          
          <Typography variant="h4" component="h2" gutterBottom sx={{ color: 'primary.main', fontWeight: 700 }}>
            Coming Soon
          </Typography>

          <Typography variant="body1" sx={{ maxWidth: 600, mx: 'auto', mb: 4 }}>
            We are currently developing our refresher course programs. These courses will be designed to help
            experienced drivers update their skills, learn about new traffic laws, and refresh their
            knowledge of safe driving practices.
          </Typography>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Planned Features:
            </Typography>
            <Box sx={{ display: 'flex', gap: 4, justifyContent: 'center', mt: 2 }}>
              <Box sx={{ textAlign: 'center' }}>
                <AccessTime sx={{ fontSize: 40, color: 'secondary.main', mb: 1 }} />
                <Typography variant="body2">
                  Flexible Scheduling
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Event sx={{ fontSize: 40, color: 'secondary.main', mb: 1 }} />
                <Typography variant="body2">
                  Multiple Sessions
                </Typography>
              </Box>
            </Box>
          </Box>

          <Button 
            variant="outlined" 
            color="primary"
            href="/contact"
            size="large"
          >
            Contact Us for Updates
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default RefresherCourses;
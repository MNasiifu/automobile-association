import React from 'react';
import { Box, Container, Typography, Grid, Paper, Button } from '@mui/material';
import { Phone, DirectionsCar, School, AccessTime, CardMembership } from '@mui/icons-material';
import { PageHeader } from '../../components/molecules';
import { SEO } from '../../components/SEO';
import { drivingSchoolAboutSEO } from '../../data/seoData';
import theme from '../../theme';

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: React.ReactNode }) => (
  <Paper
    elevation={0}
    sx={{
      p: 3,
      height: '100%',
      borderRadius: 2,
      border: '1px solid',
      borderColor: 'divider',
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 6px 16px rgba(0,0,0,0.1)',
        borderColor: 'primary.main',
      },
    }}
  >
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        mb: 2,
        gap: 1.5,
      }}
    >
      <Box
        sx={{
          width: 48,
          height: 48,
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          color: 'white',
          '& svg': {
            fontSize: 28,
          },
        }}
      >
        {icon}
      </Box>
      <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>
        {title}
      </Typography>
    </Box>
    <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
      {description}
    </Typography>
  </Paper>
);

const About: React.FC = () => {
  const features = [
    {
      icon: <AccessTime />,
      title: "4-Week Program",
      description: <>Intensive practical training spread over <strong>4 weeks</strong> to ensure thorough learning and skill development.</>
    },
    {
      icon: <School />,
      title: "Class B Training",
      description: "Comprehensive training including both theoretical classes and practical sessions with expert instructors."
    },
    {
      icon: <DirectionsCar />,
      title: "Vehicle Options",
      description: <>Choose between <strong>automatic</strong> and <strong>manual</strong> transmission vehicles for your training needs.</>
    },
    {
      icon: <CardMembership />,
      title: "3-Year License",
      description: <>Complete package includes a <strong>3-year</strong> driver's license upon successful completion.</>
    }
  ];

  return (
    <Box>
      <SEO seoData={drivingSchoolAboutSEO} />
      <PageHeader
        title="About Our Driving School"
        subtitle="Professional Class B Driver Training in Uganda"
      />

      <Container maxWidth="lg" sx={{ py: 6 }}>
        {/* Key Features Section */}
        <Grid container spacing={3} sx={{ mb: 6 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <FeatureCard {...feature} />
            </Grid>
          ))}
        </Grid>

        {/* Main Content */}
        <Paper 
          elevation={0} 
          sx={{ 
            p: 4, 
            bgcolor: 'background.paper',
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'divider'
          }}
        >
          <Typography variant="h4" component="h2" gutterBottom sx={{ 
            color: 'primary.main', 
            fontWeight: 700,
            textAlign: 'center',
            mb: 4
          }}>
            Professional Driver Training
          </Typography>

          <Typography 
            variant="body1" 
            paragraph 
            sx={{ 
              textAlign: 'center',
              maxWidth: '800px',
              mx: 'auto',
              fontSize: '1.1rem',
              color: 'text.secondary',
              mb: 6
            }}
          >
            Welcome to AA Uganda's Professional Driving School. Our comprehensive training program 
            is designed to create confident and responsible drivers through expert instruction and 
            hands-on experience.
          </Typography>

          {/* Contact Box */}
          <Box sx={{ 
            mt: 4, 
            p: 4, 
            bgcolor: (theme) => theme.palette.primary.main,
            color: 'white',
            borderRadius: 2,
            textAlign: 'center',
            maxWidth: '600px',
            mx: 'auto',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
              opacity: 0.7,
            }
          }}>
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                Ready to Start Your Journey?
              </Typography>
              <Typography variant="body1" sx={{ mb: 2, fontSize: '1.1rem' }}>
                Contact our driving school coordinator:
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 500 }}>
                Ms. Robina
              </Typography>
              <Button
                variant="contained"
                size="large"
                startIcon={<Phone />}
                href="tel:+256782756287"
                sx={{
                  mt: 2,
                  background: theme.palette.secondary.main,
                  color: 'primary.main',
                  borderRadius: 3,
                  px: 3,
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: theme.palette.secondary.light,
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
                    border: '1px solid rgba(255, 255, 255, 0.4)',
                  },
                  '&:active': {
                    transform: 'translateY(0px)',
                  }
                }}
                aria-label="Call Ms. Robina at +256 782 756287"
              >
                +256 782 756287
              </Button>
            </Box>
          </Box>

          {/* Coming Soon Box */}
          <Paper sx={{ 
            mt: 6, 
            p: 3, 
            bgcolor: 'secondary.light',
            color: 'primary.main',
            borderRadius: 2,
            textAlign: 'center',
            maxWidth: '800px',
            mx: 'auto',
            border: '1px dashed',
            borderColor: 'secondary.main'
          }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Coming Soon
            </Typography>
            <Typography variant="body1" sx={{ color: 'primary.dark' }}>
              We are currently updating our course catalog with new offerings and enhanced training modules. 
              Stay tuned for more information about our upcoming courses and programs.
            </Typography>
          </Paper>
        </Paper>
      </Container>
    </Box>
  );
};

export default About;
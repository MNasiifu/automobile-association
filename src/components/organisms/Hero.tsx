import React from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Button, Heading } from '../atoms';
import { heroContent } from '../../data/companyData';
import HeroImage from '../../assets/images/defensive-driving.jpeg';

const HeroSection = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
  color: theme.palette.primary.contrastText,
  minHeight: '80vh',
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  overflow: 'hidden',
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: 'url(/images/hero-pattern.svg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    opacity: 0.1,
    zIndex: 1,
  },
}));

const HeroContent = styled(Container)(({ theme }) => ({
  position: 'relative',
  zIndex: 2,
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(8),
}));

const FeaturesList = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(3),
  marginTop: theme.spacing(4),
  
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
}));

const FeatureItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  padding: theme.spacing(1.5, 2),
  borderRadius: theme.shape.borderRadius,
  border: '1px solid rgba(255, 255, 255, 0.2)',
  
  '&::before': {
    content: '"✓"',
    marginRight: theme.spacing(1),
    fontWeight: 600,
    color: theme.palette.secondary.main,
  },
}));

const Hero: React.FC = () => {
  return (
    <HeroSection>
      <HeroContent maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={8}>
            <Heading
              variant="h1"
              sx={{
                color: 'inherit',
                mb: 3,
                fontWeight: 700,
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              }}
            >
              {heroContent.title}
            </Heading>
            
            <Typography
              variant="h6"
              sx={{
                mb: 4,
                opacity: 0.9,
                lineHeight: 1.6,
                fontSize: { xs: '1rem', sm: '1.1rem' },
              }}
            >
              {heroContent.subtitle}
            </Typography>
            
            <Box sx={{ mb: 4 }}>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                href={heroContent.ctaLink}
                sx={{
                  py: 2,
                  px: 4,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  mr: 2,
                  mb: { xs: 2, sm: 0 },
                }}
              >
                {heroContent.ctaText}
              </Button>
              
              <Button
                variant="outlined"
                size="large"
                href="/services"
                sx={{
                  py: 2,
                  px: 4,
                  fontSize: '1.1rem',
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                  color: 'inherit',
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                Our Services
              </Button>
            </Box>
            
            <FeaturesList>
              {heroContent.features.map((feature, index) => (
                <FeatureItem key={index}>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {feature}
                  </Typography>
                </FeatureItem>
              ))}
            </FeaturesList>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                display: { xs: 'none', md: 'block' },
                textAlign: 'center',
              }}
            >
              <Box
                component="img"
                src={HeroImage}
                alt="AA Uganda Services"
                sx={{
                  width: '100%',
                  maxWidth: 600,
                  height: 'auto',
                  filter: 'drop-shadow(0 10px 20px rgba(0, 0, 0, 0.2))',
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </HeroContent>
    </HeroSection>
  );
};

export default Hero;

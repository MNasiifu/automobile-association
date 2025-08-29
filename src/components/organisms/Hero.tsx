import React from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Button, Heading } from '../atoms';
import { heroContent } from '../../data/companyData';
import HeroImage from '../../assets/images/TOWINGANDRECOVERYFRESHCAR.jpeg';
import defensiveDriving from '../../assets/images/defensive-driving.jpeg';

const HeroSection = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
  color: theme.palette.primary.contrastText,
  minHeight: '70vh',
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
    backgroundImage: `url(${HeroImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    opacity: 0.4,
    zIndex: 1,
  },
}));

const HeroContent = styled(Container)(({ theme }) => ({
  position: 'relative',
  zIndex: 2,
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(8),
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
                textAlign: { xs: 'center', md: 'left', lg: 'center'}
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
            
            <Box sx={{ mb: 4, textAlign: { xs: 'center', md: 'left', lg: 'center'} }}>
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
                  borderColor: 'primary.main',
                  color: 'white',
                  fontWeight: 700,
                  '&:hover': {
                    borderColor: 'primary.main',
                    color: 'white',
                    backgroundColor: 'primary.main',
                  },
                }}
              >
                Our Services
              </Button>
            </Box>
            
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
                src={defensiveDriving}
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

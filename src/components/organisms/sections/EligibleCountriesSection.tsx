import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  Avatar,
  Chip,
  Stack,
  Card,
  CardContent,
  Fade,
  alpha,
  useTheme,
} from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import {
  Public as PublicIcon,
  TravelExplore as TravelIcon,
  Flight as FlightIcon,
  Map as MapIcon,
  ArrowForward as ArrowForwardIcon,
  LocationOn as LocationIcon,
  Verified as VerifiedIcon,
} from '@mui/icons-material';
import { eligibleCountriesData } from '../../../data/eligibleCountriesData';
import { useInView } from 'react-intersection-observer';

// Enhanced animations
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
`;

const shimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

// Styled components
const SectionWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(12, 0),
  background: `linear-gradient(135deg, 
    ${alpha(theme.palette.background.paper, 0.9)} 0%, 
    ${alpha(theme.palette.primary.main, 0.03)} 50%, 
    ${alpha(theme.palette.secondary.main, 0.02)} 100%)`,
  overflow: 'hidden',
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `radial-gradient(circle at 20% 80%, ${alpha(
      theme.palette.secondary.main,
      0.05
    )} 0%, transparent 50%),
                 radial-gradient(circle at 80% 20%, ${alpha(
                   theme.palette.primary.main,
                   0.05
                 )} 0%, transparent 50%)`,
    zIndex: 0,
  },
}));

const ContentContainer = styled(Container)(() => ({
  position: 'relative',
  zIndex: 1,
}));

const HeroCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(6, 4),
  borderRadius: theme.spacing(4),
  background: `linear-gradient(135deg, 
    ${theme.palette.primary.main} 0%, 
    ${theme.palette.secondary.main} 100%)`,
  color: theme.palette.primary.contrastText,
  textAlign: 'center',
  position: 'relative',
  overflow: 'hidden',
  marginBottom: theme.spacing(6),
  boxShadow: `0 20px 60px ${alpha(theme.palette.primary.main, 0.3)}`,
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `linear-gradient(45deg, 
      transparent 30%, 
      ${alpha(theme.palette.common.white, 0.1)} 50%, 
      transparent 70%)`,
    animation: `${shimmer} 3s infinite`,
  },
  
  '& .hero-icon': {
    animation: `${float} 3s ease-in-out infinite`,
  },
}));

const StatsCard = styled(Card)(({ theme }) => ({
  height: '100%',
  borderRadius: theme.spacing(2.5),
  background: `linear-gradient(135deg, 
    ${alpha(theme.palette.background.paper, 0.9)} 0%, 
    ${alpha(theme.palette.primary.main, 0.02)} 100%)`,
  backdropFilter: 'blur(20px)',
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  
  '&:hover': {
    transform: 'translateY(-8px) scale(1.02)',
    boxShadow: `0 16px 40px ${alpha(theme.palette.primary.main, 0.15)}`,
    borderColor: theme.palette.secondary.main,
    
    '& .stat-icon': {
      transform: 'scale(1.1) rotate(5deg)',
      animation: `${pulse} 2s ease-in-out infinite`,
    },
    
    '& .stat-number': {
      background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
  },
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  
  '&:hover::before': {
    opacity: 1,
  },
}));

const CountryPreviewCard = styled(Card)(({ theme }) => ({
  height: '100%',
  borderRadius: theme.spacing(2),
  background: `linear-gradient(135deg, 
    ${alpha(theme.palette.background.paper, 0.8)} 0%, 
    ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'pointer',
  
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: `0 12px 32px ${alpha(theme.palette.primary.main, 0.12)}`,
    borderColor: theme.palette.secondary.main,
    
    '& .country-flag': {
      transform: 'scale(1.1)',
    },
  },
}));

const CtaButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.spacing(3),
  padding: theme.spacing(2, 4),
  fontSize: '1.1rem',
  fontWeight: 700,
  textTransform: 'none',
  position: 'relative',
  overflow: 'hidden',
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  color: theme.palette.primary.contrastText,
  border: 'none',
  boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.3)}`,
  
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: `0 12px 40px ${alpha(theme.palette.primary.main, 0.4)}`,
    background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`,
  },
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: `linear-gradient(90deg, transparent, ${alpha(theme.palette.common.white, 0.2)}, transparent)`,
    transition: 'left 0.5s',
  },
  
  '&:hover::before': {
    left: '100%',
  },
}));

// Continent emoji mapping
const continentEmojis: Record<string, string> = {
  "Africa": "🌍",
  "Europe": "🇪🇺", 
  "Asia and Middle East": "🌏",
  "America": "🌎",
  "Australasia": "🇦🇺",
};

interface CountryData {
  continent: string;
  country: string;
  years: number[];
  flag: string;
}

const EligibleCountriesSection: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Process countries data for statistics
  const { continents, totalCountries, featuredCountries } = useMemo(() => {
    const continents = Array.from(
      new Set(eligibleCountriesData.map((item) => item.continent))
    );
    
    // Get featured countries (most popular/important ones)
    const featured = [
      eligibleCountriesData.find(c => c.country === "United States of America"),
      eligibleCountriesData.find(c => c.country === "United Kingdom"),
      eligibleCountriesData.find(c => c.country === "Germany"),
      eligibleCountriesData.find(c => c.country === "France"),
      eligibleCountriesData.find(c => c.country === "Australia"),
      eligibleCountriesData.find(c => c.country === "Canada"),
      eligibleCountriesData.find(c => c.country === "South Africa"),
      eligibleCountriesData.find(c => c.country === "Kenya"),
    ].filter(Boolean) as CountryData[];

    return {
      continents,
      totalCountries: eligibleCountriesData.length,
      featuredCountries: featured,
    };
  }, []);

  const handleViewAllCountries = () => {
    navigate('/about/eligible-countries');
  };

  const handleApplyForIdp = () => {
    navigate('/idp/apply');
  };

  return (
    <SectionWrapper ref={ref}>
      <ContentContainer maxWidth="lg">
        <Fade in={inView} timeout={1000}>
          <div>
            {/* Hero Section */}
            <HeroCard elevation={0}>
              <Box className="hero-icon" sx={{ mb: 3 }}>
                <PublicIcon sx={{ fontSize: { xs: 60, sm: 70, md: 80 } }} />
              </Box>
              
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 800,
                  mb: 3,
                  fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                Drive Across Continents
              </Typography>
              
              <Typography
                variant="h6"
                sx={{
                  mb: 4,
                  opacity: 0.95,
                  maxWidth: 600,
                  mx: 'auto',
                  fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                Your AAU International Driving Permit opens doors to {totalCountries}+ countries 
                across {continents.length} continents. Travel with confidence and legal assurance.
              </Typography>
            </HeroCard>

            {/* Statistics */}
            <Grid container spacing={4} sx={{ mb: 8 }}>
              <Grid item xs={6} md={3}>
                <StatsCard>
                  <CardContent sx={{ textAlign: 'center', p: 3 }}>
                    <Avatar
                      className="stat-icon"
                      sx={{
                        bgcolor: 'primary.main',
                        width: 64,
                        height: 64,
                        mx: 'auto',
                        mb: 2,
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <PublicIcon fontSize="large" />
                    </Avatar>
                    <Typography
                      variant="h3"
                      className="stat-number"
                      sx={{
                        fontWeight: 900,
                        mb: 1,
                        fontSize: { xs: '2rem', sm: '2.5rem' },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      {totalCountries}+
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                      Valid Countries
                    </Typography>
                  </CardContent>
                </StatsCard>
              </Grid>

              <Grid item xs={6} md={3}>
                <StatsCard>
                  <CardContent sx={{ textAlign: 'center', p: 3 }}>
                    <Avatar
                      className="stat-icon"
                      sx={{
                        bgcolor: 'secondary.main',
                        color: 'primary.main',
                        width: 64,
                        height: 64,
                        mx: 'auto',
                        mb: 2,
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <MapIcon fontSize="large" />
                    </Avatar>
                    <Typography
                      variant="h3"
                      className="stat-number"
                      sx={{
                        fontWeight: 900,
                        mb: 1,
                        fontSize: { xs: '2rem', sm: '2.5rem' },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      {continents.length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                      Continents
                    </Typography>
                  </CardContent>
                </StatsCard>
              </Grid>

              <Grid item xs={6} md={3}>
                <StatsCard>
                  <CardContent sx={{ textAlign: 'center', p: 3 }}>
                    <Avatar
                      className="stat-icon"
                      sx={{
                        bgcolor: 'info.main',
                        width: 64,
                        height: 64,
                        mx: 'auto',
                        mb: 2,
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <VerifiedIcon fontSize="large" />
                    </Avatar>
                    <Typography
                      variant="h3"
                      className="stat-number"
                      sx={{
                        fontWeight: 900,
                        mb: 1,
                        fontSize: { xs: '2rem', sm: '2.5rem' },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      1926
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                      Since Year
                    </Typography>
                  </CardContent>
                </StatsCard>
              </Grid>

              <Grid item xs={6} md={3}>
                <StatsCard>
                  <CardContent sx={{ textAlign: 'center', p: 3 }}>
                    <Avatar
                      className="stat-icon"
                      sx={{
                        bgcolor: 'success.main',
                        width: 64,
                        height: 64,
                        mx: 'auto',
                        mb: 2,
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <TravelIcon fontSize="large" />
                    </Avatar>
                    <Typography
                      variant="h3"
                      className="stat-number"
                      sx={{
                        fontWeight: 900,
                        mb: 1,
                        fontSize: { xs: '2rem', sm: '2.5rem' },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      100%
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                      Recognition
                    </Typography>
                  </CardContent>
                </StatsCard>
              </Grid>
            </Grid>

            {/* Featured Countries Preview */}
            <Box sx={{ mb: 8 }}>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  textAlign: 'center',
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' },
                }}
              >
                Popular Destinations
              </Typography>
              
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{
                  textAlign: 'center',
                  mb: 4,
                  fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
                }}
              >
                Explore some of the most popular countries where your IDP is valid
              </Typography>

              <Grid container spacing={3}>
                {featuredCountries.slice(0, 8).map((country, index) => (
                  <Grid item xs={6} sm={4} md={3} key={country.country}>
                    <Fade in={inView} timeout={800} style={{ transitionDelay: `${index * 100}ms` }}>
                      <CountryPreviewCard onClick={handleViewAllCountries}>
                        <CardContent sx={{ p: 2, textAlign: 'center' }}>
                          <Avatar
                            className="country-flag"
                            sx={{
                              width: 48,
                              height: 48,
                              mx: 'auto',
                              mb: 1.5,
                              fontSize: '1.8rem',
                              background: `linear-gradient(135deg, 
                                ${alpha(theme.palette.background.paper, 0.1)}, 
                                ${alpha(theme.palette.background.paper, 0.05)})`,
                              transition: 'all 0.3s ease',
                            }}
                          >
                            {country.flag}
                          </Avatar>
                          
                          <Typography
                            variant="subtitle2"
                            sx={{
                              fontWeight: 600,
                              fontSize: '0.9rem',
                              color: 'text.primary',
                              lineHeight: 1.3,
                              minHeight: '2.6rem',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            {country.country}
                          </Typography>
                          
                          <Chip
                            icon={<LocationIcon fontSize="small" />}
                            label={continentEmojis[country.continent]}
                            size="small"
                            variant="outlined"
                            sx={{
                              mt: 1,
                              borderColor: alpha(theme.palette.primary.main, 0.3),
                              color: 'primary.main',
                              fontWeight: 600,
                              fontSize: '0.75rem',
                            }}
                          />
                        </CardContent>
                      </CountryPreviewCard>
                    </Fade>
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* Call to Action */}
            <Box sx={{ textAlign: 'center' }}>
              <Paper
                sx={{
                  p: 6,
                  borderRadius: 4,
                  background: `linear-gradient(135deg, 
                    ${alpha(theme.palette.background.paper, 0.9)} 0%, 
                    ${alpha(theme.palette.primary.main, 0.05)} 100%)`,
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                  backdropFilter: 'blur(20px)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `radial-gradient(circle at center, 
                      ${alpha(theme.palette.secondary.main, 0.1)} 0%, 
                      transparent 70%)`,
                    zIndex: 0,
                  }}
                />
                
                <Box sx={{ position: 'relative', zIndex: 1 }}>
                  <FlightIcon
                    sx={{
                      fontSize: { xs: 48, sm: 56, md: 64 },
                      color: 'primary.main',
                      mb: 3,
                      animation: `${float} 3s ease-in-out infinite`,
                    }}
                  />
                  
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 800,
                      mb: 2,
                      fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' },
                      background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    Ready to Explore the World?
                  </Typography>
                  
                  <Typography
                    variant="h6"
                    color="text.secondary"
                    sx={{
                      mb: 4,
                      maxWidth: 600,
                      mx: 'auto',
                      fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
                    }}
                  >
                    Get your International Driving Permit today and unlock access to driving 
                    in over {totalCountries} countries worldwide. Your next adventure awaits!
                  </Typography>
                  
                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={3}
                    justifyContent="center"
                    alignItems="center"
                  >
                    <CtaButton
                      size="large"
                      onClick={handleApplyForIdp}
                      endIcon={<ArrowForwardIcon />}
                    >
                      Apply for IDP
                    </CtaButton>
                    
                    <Button
                      variant="outlined"
                      size="large"
                      onClick={handleViewAllCountries}
                      sx={{
                        borderRadius: 3,
                        padding: theme.spacing(2, 4),
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        textTransform: 'none',
                        borderColor: 'primary.main',
                        color: 'primary.main',
                        borderWidth: 2,
                        
                        '&:hover': {
                          borderWidth: 2,
                          borderColor: 'primary.dark',
                          backgroundColor: alpha(theme.palette.primary.main, 0.05),
                          transform: 'translateY(-2px)',
                        },
                      }}
                    >
                      View All Countries
                    </Button>
                  </Stack>
                </Box>
              </Paper>
            </Box>
          </div>
        </Fade>
      </ContentContainer>
    </SectionWrapper>
  );
};

export default EligibleCountriesSection;

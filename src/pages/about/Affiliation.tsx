import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Chip, 
  Button, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  Stack,
  Paper,
  Fade,
  useTheme,
  alpha
} from '@mui/material';
import {
  Public as GlobalIcon,
  Groups as GroupsIcon,
  EmojiEvents as AwardsIcon,
  Security as SecurityIcon,
  CheckCircle as CheckIcon,
  Business as BusinessIcon,
  Map as MapIcon,
  Handshake as HandshakeIcon
} from '@mui/icons-material';
import { PageHeader } from '../../components/molecules';
import { SEO } from '../../components/SEO';
import { affiliationSEO } from '../../data/seoData';
import { affiliates } from '../../data/companyData';
import { useNavigate } from 'react-router-dom';
import { config } from '../../utils/config/config';

const Affiliation: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Enhanced FIA data with structured information
  const fiaDetails = {
    name: 'FIA - Federation Internationale de l\'Automobile',
    fullName: 'Federation Internationale de l\'Automobile',
    established: '1904',
    headquarters: 'Paris, France',
    globalReach: {
      countries: 145,
      continents: 5,
      members: 246,
      motorists: '100+ million'
    },
    benefits: [
      'Access to global best practices from AA clubs worldwide',
      'International recognition and credibility',
      'Technical expertise and knowledge sharing',
      'Global network of automotive professionals',
      'International standards and quality assurance',
      'Emergency assistance coordination worldwide'
    ],
    partnerships: [
      'Alliance Internationale de Tourisme (AIT)',
      'African Council of Touring and Automobile Clubs (ACTA)',
      'Regional AA Clubs across Africa',
      'International emergency assistance networks'
    ]
  };

  const keyStats = [
    { icon: <GlobalIcon />, label: 'Countries', value: '145+', color: 'primary' as const },
    { icon: <GroupsIcon />, label: 'Organizations', value: '246', color: 'secondary' as const },
    { icon: <SecurityIcon />, label: 'Motorists Served', value: '100M+', color: 'success' as const },
    { icon: <MapIcon />, label: 'Continents', value: '5', color: 'info' as const }
  ];

  const getColorFromPalette = (colorName: string) => {
    switch (colorName) {
      case 'primary':
        return theme.palette.primary.main;
      case 'secondary':
        return theme.palette.secondary.main;
      case 'success':
        return theme.palette.success.main;
      case 'info':
        return theme.palette.info.main;
      default:
        return theme.palette.primary.main;
    }
  };

  const handleChatWithUs = () => {
    const whatsappMessage = "Hello! I would like to inquire about your services.";
    try {
      const message = encodeURIComponent(whatsappMessage);
      const whatsappUrl = `https://wa.me/${config.company.whatsAppNumber}?text=${message}`;
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    } catch (error) {
      console.error("Error opening WhatsApp:", error);
      // Fallback: copy number to clipboard
      if (navigator.clipboard) {
        navigator.clipboard.writeText(config.company.whatsAppNumber);
        alert(
          `WhatsApp number copied to clipboard: ${config.company.whatsAppNumber}`
        );
      } else {
        alert(`Please message us on WhatsApp: ${config.company.whatsAppNumber}`);
      }
    }
  };

  const handleNavigateToMembership = () => {
    navigate("/membership");
  };

  return (
    <Box>
      <SEO seoData={affiliationSEO} />
      <PageHeader
        title="Our Global Affiliations"
        subtitle="Building stronger partnerships for safer roads worldwide"
      />
      
      <Container maxWidth="lg" sx={{ py: 8 }}>
        {/* Introduction Section */}
        <Fade in timeout={800}>
          <Paper 
            elevation={0}
            sx={{ 
              p: 4, 
              mb: 6, 
              bgcolor: alpha(theme.palette.primary.main, 0.02),
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              borderRadius: 3
            }}
          >
            <Typography 
              variant="h5" 
              gutterBottom 
              color="primary.main"
              fontWeight="600"
              textAlign="center"
            >
              International Recognition & Partnership
            </Typography>
            <Typography 
              variant="body1" 
              color="text.secondary" 
              textAlign="center"
              sx={{ maxWidth: '800px', mx: 'auto', lineHeight: 1.7 }}
            >
              Through our prestigious membership in global automotive organizations, 
              AA Uganda brings world-class standards and international best practices 
              to serve Uganda's motorists better.
            </Typography>
          </Paper>
        </Fade>

        {/* Main Affiliate Card */}
        <Fade in timeout={1000}>
          <Card 
            elevation={0}
            onMouseEnter={() => setHoveredCard(0)}
            onMouseLeave={() => setHoveredCard(null)}
            sx={{ 
              mb: 6,
              borderRadius: 4,
              border: `2px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              transition: 'all 0.3s ease-in-out',
              transform: hoveredCard === 0 ? 'translateY(-8px)' : 'translateY(0)',
              boxShadow: hoveredCard === 0 
                ? `0 20px 40px ${alpha(theme.palette.primary.main, 0.15)}` 
                : `0 4px 20px ${alpha(theme.palette.primary.main, 0.08)}`,
            }}
          >
            <CardContent sx={{ p: { xs: 3, md: 5 } }}>
              <Grid container spacing={4} alignItems="center">
                {/* Logo Section */}
                <Grid item xs={12} md={4}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center'
                    }}
                  >
                    <Box
                      component="img"
                      src={affiliates[0].img}
                      alt={fiaDetails.name}
                      sx={{
                        width: '100%',
                        maxWidth: 280,
                        height: 'auto',
                        borderRadius: 2,
                        mb: 2,
                        filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))'
                      }}
                    />
                    <Stack spacing={1} alignItems="center">
                      <Chip 
                        label="Est. 1904" 
                        size="small" 
                        color="primary" 
                        variant="outlined"
                      />
                      <Typography variant="caption" color="text.secondary">
                        Paris, France
                      </Typography>
                    </Stack>
                  </Box>
                </Grid>

                {/* Content Section */}
                <Grid item xs={12} md={8}>
                  <Stack spacing={3}>
                    <Box>
                      <Typography 
                        variant="h4" 
                        gutterBottom 
                        color="primary.main"
                        fontWeight="700"
                      >
                        {fiaDetails.name}
                      </Typography>
                      <Typography 
                        variant="subtitle1" 
                        color="text.secondary"
                        fontStyle="italic"
                        sx={{ mb: 2 }}
                      >
                        The World Motoring Body
                      </Typography>
                    </Box>

                    {/* Key Statistics */}
                    <Box>
                      <Typography variant="h6" gutterBottom color="primary.main" fontWeight="600">
                        Global Impact
                      </Typography>
                      <Grid container spacing={2}>
                        {keyStats.map((stat, index) => (
                          <Grid item xs={6} sm={3} key={index}>
                            <Paper 
                              elevation={0}
                              sx={{ 
                                p: 2,
                                textAlign: 'center',
                                bgcolor: alpha(getColorFromPalette(stat.color), 0.05),
                                border: `1px solid ${alpha(getColorFromPalette(stat.color), 0.2)}`,
                                borderRadius: 2
                              }}
                            >
                              <Box 
                                sx={{ 
                                  color: `${stat.color}.main`,
                                  mb: 1,
                                  display: 'flex',
                                  justifyContent: 'center'
                                }}
                              >
                                {stat.icon}
                              </Box>
                              <Typography variant="h6" fontWeight="700" color={`${stat.color}.main`}>
                                {stat.value}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {stat.label}
                              </Typography>
                            </Paper>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  </Stack>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Fade>

        {/* Benefits Section */}
        <Fade in timeout={1200}>
          <Grid container spacing={4} sx={{ mb: 6 }}>
            <Grid item xs={12} md={6}>
              <Card 
                elevation={0}
                sx={{ 
                  height: '100%',
                  borderRadius: 3,
                  border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`,
                  bgcolor: alpha(theme.palette.success.main, 0.02)
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <CheckIcon sx={{ color: 'success.main', mr: 2 }} />
                    <Typography variant="h5" fontWeight="600" color="success.main">
                      Membership Benefits
                    </Typography>
                  </Box>
                  <List dense>
                    {fiaDetails.benefits.map((benefit, index) => (
                      <ListItem key={index} sx={{ px: 0 }}>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <CheckIcon sx={{ color: 'success.main', fontSize: 20 }} />
                        </ListItemIcon>
                        <ListItemText 
                          primary={benefit}
                          primaryTypographyProps={{
                            variant: 'body2',
                            color: 'text.primary',
                            lineHeight: 1.5
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card 
                elevation={0}
                sx={{ 
                  height: '100%',
                  borderRadius: 3,
                  border: `1px solid ${alpha(theme.palette.info.main, 0.2)}`,
                  bgcolor: alpha(theme.palette.info.main, 0.02)
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <HandshakeIcon sx={{ color: 'info.main', mr: 2 }} />
                    <Typography variant="h5" fontWeight="600" color="info.main">
                      Strategic Partnerships
                    </Typography>
                  </Box>
                  <List dense>
                    {fiaDetails.partnerships.map((partnership, index) => (
                      <ListItem key={index} sx={{ px: 0 }}>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <BusinessIcon sx={{ color: 'info.main', fontSize: 20 }} />
                        </ListItemIcon>
                        <ListItemText 
                          primary={partnership}
                          primaryTypographyProps={{
                            variant: 'body2',
                            color: 'text.primary',
                            lineHeight: 1.5
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Fade>

        {/* Leadership Recognition Section */}
        <Fade in timeout={1400}>
          <Paper 
            elevation={0}
            sx={{ 
              p: 4, 
              borderRadius: 3,
              bgcolor: alpha(theme.palette.secondary.main, 0.05),
              border: `1px solid ${alpha(theme.palette.secondary.main, 0.2)}`
            }}
          >
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <AwardsIcon sx={{ fontSize: 48, color: 'secondary.main', mb: 2 }} />
              <Typography variant="h5" gutterBottom color="secondary.main" fontWeight="600">
                Leadership Recognition
              </Typography>
            </Box>
            <Grid container spacing={3} justifyContent="center">
              <Grid item xs={12} md={6}>
                <Box sx={{ textAlign: 'center', p: 3 }}>
                  <Typography variant="h6" gutterBottom color="primary.main">
                    African AA Clubs Leadership
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Our CEO serves as <strong>Treasurer</strong> at the African Council of 
                    Touring and Automobile Clubs (ACTA)
                  </Typography>
                  <Chip 
                    label="Executive Position" 
                    sx={{ color: theme.palette.secondary.dark }}
                    size="small"
                    variant="outlined"
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ textAlign: 'center', p: 3 }}>
                  <Typography variant="h6" gutterBottom color="primary.main">
                    Continental Representation
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Our Governing Council President holds the position of 
                    <strong> Vice President</strong> at ACTA
                  </Typography>
                  <Chip 
                    label="Vice President" 
                    sx={{ color: theme.palette.secondary.dark }}
                    size="small"
                    variant="outlined"
                  />
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Fade>

        {/* Call to Action */}
        <Fade in timeout={1600}>
          <Box sx={{ textAlign: 'center', mt: 6 }}>
            <Typography variant="h5" gutterBottom color="primary.main" fontWeight="600">
              Experience World-Class Automotive Services
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: '600px', mx: 'auto' }}>
              Join AA Uganda and access international standards of automotive care, 
              backed by global partnerships and proven expertise.
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
              <Button 
                variant="contained" 
                size="large"
                onClick={handleNavigateToMembership}
                sx={{ 
                  px: 4, 
                  py: 1.5,
                  borderRadius: 3,
                  textTransform: 'none',
                  fontWeight: 600
                }}
              >
                Become a Member
              </Button>
              <Button 
                variant="outlined" 
                size="large"
                onClick={handleChatWithUs}
                sx={{ 
                  px: 4, 
                  py: 1.5,
                  borderRadius: 3,
                  textTransform: 'none',
                  fontWeight: 600
                }}
              >
                Learn More
              </Button>
            </Stack>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
};

export default Affiliation;
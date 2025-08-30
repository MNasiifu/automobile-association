import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Paper,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Alert,
} from '@mui/material';
import {
  GpsFixed as GpsIcon,
  Security as SecurityIcon,
  Analytics as AnalyticsIcon,
  LocalGasStation as FuelIcon,
  Route as RouteIcon,
  Assignment as ReportIcon,
  CheckCircle as CheckIcon,
  ExpandMore as ExpandMoreIcon,
  Schedule as ScheduleIcon,
  Build as BuildIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { ContactButtons, PageHeader } from '../../components/molecules';
import { Heading } from '../../components/atoms';

const HeroSection = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main}15 0%, ${theme.palette.secondary.main}10 100%)`,
  padding: theme.spacing(8, 0),
  position: 'relative',
  overflow: 'hidden',
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  height: '100%',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[8],
  },
  borderRadius: theme.spacing(2),
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  width: 60,
  height: 60,
  borderRadius: '50%',
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(2),
  '& svg': {
    color: 'white',
    fontSize: '2rem',
  },
}));

const StatsCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  borderRadius: theme.spacing(2),
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  color: 'white',
  height: '100%',
}));

const FleetManagement: React.FC = () => {
  const trackingFeatures = [
    {
      title: 'Real-time GPS Tracking',
      description: 'Live vehicle location monitoring with geofencing capabilities',
      icon: <GpsIcon />,
      benefits: ['Live location updates', 'Geofence alerts', 'Route tracking', 'Historical playback'],
    },
    {
      title: 'Theft Recovery System',
      description: '24/7 monitoring with instant theft alerts and recovery workflow',
      icon: <SecurityIcon />,
      benefits: ['Instant theft alerts', '24/7 control room', 'Recovery workflow', 'Police coordination'],
    },
    {
      title: 'Fleet Analytics',
      description: 'Comprehensive reporting and analytics for fleet optimization',
      icon: <AnalyticsIcon />,
      benefits: ['Usage reports', 'Performance metrics', 'Cost analysis', 'Trend tracking'],
    },
    {
      title: 'Fuel Management',
      description: 'Monitor fuel consumption and detect anomalies automatically',
      icon: <FuelIcon />,
      benefits: ['Consumption tracking', 'Anomaly detection', 'Fuel card integration', 'Cost optimization'],
    },
  ];

  const managementFeatures = [
    {
      title: 'Vehicle Health Monitoring',
      description: 'Track vehicle condition and schedule maintenance reminders',
      icon: <BuildIcon />,
      features: ['Engine diagnostics', 'Maintenance alerts', 'Service scheduling', 'Health reports'],
    },
    {
      title: 'Driver Behavior Analysis',
      description: 'Monitor driving patterns for safety and efficiency improvements',
      icon: <PersonIcon />,
      features: ['Speed monitoring', 'Harsh braking detection', 'Route optimization', 'Safety scoring'],
    },
    {
      title: 'Route Optimization',
      description: 'Optimize routes for efficiency and reduce operational costs',
      icon: <RouteIcon />,
      features: ['Route planning', 'Traffic integration', 'Fuel efficiency', 'Time optimization'],
    },
    {
      title: 'Comprehensive Reporting',
      description: 'Detailed reports and analytics for informed decision making',
      icon: <ReportIcon />,
      features: ['Custom dashboards', 'Automated reports', 'Export capabilities', 'Compliance tracking'],
    },
  ];

  const processSteps = [
    {
      title: 'Install & Configure',
      description: 'Hardware fitted and portal linked to your fleet',
      icon: <BuildIcon />,
    },
    {
      title: 'Monitor & Alert',
      description: 'Live tracking and alerts streamed to control room and dashboard',
      icon: <ScheduleIcon />,
    },
    {
      title: 'Act & Optimize',
      description: 'Rapid recovery when needed; insights to cut costs',
      icon: <CheckIcon />,
    },
  ];

  const benefits = [
    'Trusted AA heritage with proven track record',
    'Solutions tailored to Ugandan operations',
    '24/7 monitoring and recovery services',
    'Proven fleet systems used across Africa',
    'Track fixed and mobile assets',
    'Dedicated account management',
    'Secure web access and reporting',
    'Integration with existing systems',
  ];

  const faqData = [
    {
      question: 'What types of vehicles can be tracked?',
      answer: 'Our system supports cars, trucks, motorcycles, trailers, and even static assets like generators. We provide solutions for both light and heavy commercial vehicles.',
    },
    {
      question: 'How does the theft recovery service work?',
      answer: 'When theft is detected, our 24/7 control room immediately coordinates with local authorities and our recovery teams. We provide real-time location updates to expedite vehicle recovery.',
    },
    {
      question: 'Can I access the system on mobile devices?',
      answer: 'Yes, our fleet portal is fully responsive and accessible on smartphones, tablets, and computers. You can monitor your fleet from anywhere with an internet connection.',
    },
    {
      question: 'What kind of reports can I generate?',
      answer: 'You can generate trip reports, fuel consumption analyses, driver behavior summaries, maintenance schedules, and custom reports tailored to your specific business needs.',
    },
  ];

  return (
    <Box>
      <PageHeader
        title="Fleet Management Solutions"
        subtitle="Comprehensive telematics and fuel management solutions tailored to Ugandan operations"
      />

      {/* Hero Section */}
      <HeroSection>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h3" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
                Keep Your Fleet Moving Securely & Efficiently
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 4, lineHeight: 1.6 }}>
                AA Uganda combines local expertise and global best practices to deliver comprehensive fleet tracking, rapid recovery, and fuel optimization with 24/7 support.
              </Typography>
              <Alert severity="info" sx={{ mb: 4 }}>
                <Typography variant="body1">
                  <strong>Trusted Heritage:</strong> Built on the Automobile Association legacy with decades of experience serving Ugandan motorists.
                </Typography>
              </Alert>
              <ContactButtons 
                whatsappMessage="Hello! I would like to inquire about your fleet management services."
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <StatsCard>
                    <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
                      24/7
                    </Typography>
                    <Typography variant="body1">
                      Control Room Monitoring
                    </Typography>
                  </StatsCard>
                </Grid>
                <Grid item xs={6}>
                  <StatsCard>
                    <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
                      100%
                    </Typography>
                    <Typography variant="body1">
                      Vehicle Recovery Rate
                    </Typography>
                  </StatsCard>
                </Grid>
                <Grid item xs={6}>
                  <StatsCard>
                    <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
                      30+
                    </Typography>
                    <Typography variant="body1">
                      Years Experience
                    </Typography>
                  </StatsCard>
                </Grid>
                <Grid item xs={6}>
                  <StatsCard>
                    <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
                      1000+
                    </Typography>
                    <Typography variant="body1">
                      Vehicles Tracked
                    </Typography>
                  </StatsCard>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </HeroSection>

      {/* Tracking & Recovery Features */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Heading variant="h2" align="center" gutterBottom>
          Tracking & Recovery Features
        </Heading>
        <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6, maxWidth: 800, mx: 'auto' }}>
          Advanced GPS tracking and security features to protect your fleet assets 24/7.
        </Typography>

        <Grid container spacing={4}>
          {trackingFeatures.map((feature, index) => (
            <Grid item xs={12} md={6} key={index}>
              <FeatureCard>
                <CardContent sx={{ p: 4 }}>
                  <IconWrapper>
                    {feature.icon}
                  </IconWrapper>
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                    {feature.description}
                  </Typography>
                  <Box>
                    {feature.benefits.map((benefit, idx) => (
                      <Box key={idx} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <CheckIcon sx={{ color: 'success.main', mr: 1, fontSize: '1rem' }} />
                        <Typography variant="body2">{benefit}</Typography>
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </FeatureCard>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Fleet Management Features */}
      <Box sx={{ backgroundColor: 'grey.50', py: 8 }}>
        <Container maxWidth="lg">
          <Heading variant="h2" align="center" gutterBottom>
            Fleet Management Features
          </Heading>
          <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6, maxWidth: 800, mx: 'auto' }}>
            Comprehensive management tools to optimize fleet performance and reduce operational costs.
          </Typography>

          <Grid container spacing={4}>
            {managementFeatures.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Paper 
                  sx={{ 
                    p: 3, 
                    textAlign: 'center', 
                    height: '100%', 
                    borderRadius: 3,
                    transition: 'all 0.3s ease-in-out',
                    cursor: 'pointer',
                    border: '1px solid transparent',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: (theme) => `0 12px 32px ${theme.palette.primary.main}20`,
                      borderColor: 'primary.main',
                      '& .feature-icon': {
                        transform: 'scale(1.1)',
                      },
                      '& .feature-list': {
                        '& .feature-item': {
                          transform: 'translateX(4px)',
                        }
                      }
                    }
                  }}
                >
                  <IconWrapper 
                    className="feature-icon"
                    sx={{ 
                      mx: 'auto',
                      transition: 'transform 0.3s ease-in-out',
                      mb: 3,
                    }}
                  >
                    {feature.icon}
                  </IconWrapper>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>
                    {feature.description}
                  </Typography>
                  
                  {/* Enhanced feature list with better visual hierarchy */}
                  <Box 
                    className="feature-list"
                    sx={{ 
                      textAlign: 'left',
                      mt: 3,
                      pt: 2,
                      borderTop: '1px solid',
                      borderColor: 'divider',
                    }}
                  >
                    <Typography 
                      variant="overline" 
                      sx={{ 
                        display: 'block',
                        textAlign: 'center',
                        mb: 2,
                        fontWeight: 600,
                        color: 'primary.main',
                        letterSpacing: 1.2,
                      }}
                    >
                      Key Features
                    </Typography>
                    <Stack spacing={1}>
                      {feature.features.map((item, idx) => (
                        <Box
                          key={idx}
                          className="feature-item"
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            transition: 'all 0.2s ease-in-out',
                            p: 1,
                            borderRadius: 1,
                            '&:hover': {
                              backgroundColor: 'primary.main',
                              color: 'primary.contrastText',
                              '& .check-icon': {
                                color: 'secondary.main',
                                transform: 'scale(1.2)',
                              }
                            }
                          }}
                        >
                          <CheckIcon 
                            className="check-icon"
                            sx={{ 
                              color: 'success.main', 
                              mr: 1.5, 
                              fontSize: '1.1rem',
                              transition: 'all 0.2s ease-in-out',
                              flexShrink: 0,
                            }} 
                          />
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              fontSize: '0.9rem',
                              fontWeight: 500,
                              lineHeight: 1.4,
                            }}
                          >
                            {item}
                          </Typography>
                        </Box>
                      ))}
                    </Stack>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* How It Works */}
      <Container maxWidth="lg" sx={{ py: 8, position: 'relative' }}>
        <Heading variant="h2" align="center" gutterBottom>
          How It Works
        </Heading>
        <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 8, maxWidth: 700, mx: 'auto' }}>
          Our streamlined 3-step process ensures quick deployment and immediate value for your fleet operations
        </Typography>

        {/* Desktop Timeline */}
        <Box 
          sx={{ 
            display: { xs: 'none', md: 'block' },
            position: 'relative',
            mb: 4,
          }}
        >
          {/* Timeline line */}
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '16.66%',
              right: '16.66%',
              height: 4,
              background: 'linear-gradient(90deg, transparent 0%, #e0e0e0 20%, #e0e0e0 80%, transparent 100%)',
              borderRadius: 2,
              zIndex: 0,
              transform: 'translateY(-50%)',
            }}
          />
          
          {/* Animated progress line */}
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '16.66%',
              width: '66.66%',
              height: 4,
              background: (theme) => `linear-gradient(90deg, 
                transparent 0%, 
                ${theme.palette.primary.main} 10%, 
                ${theme.palette.primary.main} 35%, 
                ${theme.palette.primary.light} 45%, 
                ${theme.palette.primary.light} 65%, 
                ${theme.palette.secondary.main} 75%, 
                ${theme.palette.secondary.main} 90%, 
                transparent 100%
              )`,
              borderRadius: 2,
              zIndex: 1,
              transform: 'translateY(-50%)',
              animation: 'pulse 3s ease-in-out infinite',
              '@keyframes pulse': {
                '0%, 100%': { opacity: 0.7 },
                '50%': { opacity: 1 },
              },
            }}
          />

          <Grid container spacing={0}>
            {processSteps.map((step, index) => (
              <Grid item xs={4} key={index} sx={{ position: 'relative' }}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    position: 'relative',
                    zIndex: 2,
                  }}
                >
                  {/* Step Number with enhanced design */}
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      background: (theme) => `linear-gradient(135deg, 
                        ${theme.palette.primary.main} 0%, 
                        ${theme.palette.primary.dark} 100%
                      )`,
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.8rem',
                      fontWeight: 'bold',
                      mb: 3,
                      cursor: 'pointer',
                      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                      border: '4px solid white',
                      boxShadow: (theme) => `0 8px 32px ${theme.palette.primary.main}30`,
                      position: 'relative',
                      overflow: 'hidden',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)',
                        transform: 'translateX(-100%)',
                        transition: 'transform 0.6s ease',
                      },
                      '&:hover': {
                        transform: 'scale(1.15) rotate(5deg)',
                        boxShadow: (theme) => `0 16px 48px ${theme.palette.primary.main}40`,
                        '&::before': {
                          transform: 'translateX(100%)',
                        },
                      },
                    }}
                  >
                    {index + 1}
                  </Box>

                  {/* Enhanced card design */}
                  <Paper 
                    sx={{ 
                      p: 4, 
                      textAlign: 'center', 
                      borderRadius: 4,
                      width: '100%',
                      maxWidth: 280,
                      height: 320,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      cursor: 'pointer',
                      position: 'relative',
                      overflow: 'hidden',
                      border: '2px solid transparent',
                      background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 4,
                        background: (theme) => `linear-gradient(90deg, 
                          ${theme.palette.primary.main} 0%, 
                          ${theme.palette.secondary.main} 100%
                        )`,
                      },
                      '&:hover': {
                        transform: 'translateY(-12px)',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                        borderColor: 'primary.main',
                        '& .step-icon': {
                          transform: 'scale(1.2) rotate(10deg)',
                        },
                        '& .step-title': {
                          color: 'primary.main',
                        },
                      },
                    }}
                  >
                    <Box>
                      <Box
                        className="step-icon"
                        sx={{
                          width: 72,
                          height: 72,
                          borderRadius: '20px',
                          background: (theme) => `linear-gradient(135deg, 
                            ${theme.palette.primary.light}30 0%, 
                            ${theme.palette.primary.light}60 100%
                          )`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          margin: '0 auto 24px',
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                          '& svg': {
                            color: 'primary.main',
                            fontSize: '2rem',
                          },
                        }}
                      >
                        {step.icon}
                      </Box>
                      
                      <Typography 
                        variant="h5" 
                        className="step-title"
                        gutterBottom 
                        sx={{ 
                          fontWeight: 700,
                          mb: 2,
                          transition: 'color 0.3s ease',
                          fontSize: '1.4rem',
                        }}
                      >
                        {step.title}
                      </Typography>
                    </Box>

                    <Typography 
                      variant="body1" 
                      color="text.secondary" 
                      sx={{ 
                        lineHeight: 1.6,
                        fontSize: '1rem',
                        fontWeight: 400,
                      }}
                    >
                      {step.description}
                    </Typography>

                    {/* Progress indicator */}
                    <Box
                      sx={{
                        mt: 2,
                        pt: 2,
                        borderTop: '1px solid',
                        borderColor: 'divider',
                      }}
                    >
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          color: 'primary.main',
                          fontWeight: 600,
                          textTransform: 'uppercase',
                          letterSpacing: 1.2,
                        }}
                      >
                        Step {index + 1} of 3
                      </Typography>
                    </Box>
                  </Paper>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Mobile/Tablet Version */}
        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
          <Stack spacing={4}>
            {processSteps.map((step, index) => (
              <Box key={index} sx={{ position: 'relative' }}>
                {/* Connecting line for mobile */}
                {index < processSteps.length - 1 && (
                  <Box
                    sx={{
                      position: 'absolute',
                      left: 39,
                      top: 80,
                      bottom: -32,
                      width: 2,
                      background: (theme) => `linear-gradient(180deg, 
                        ${theme.palette.primary.main} 0%, 
                        ${theme.palette.primary.light} 50%, 
                        ${theme.palette.secondary.main} 100%
                      )`,
                      zIndex: 0,
                    }}
                  />
                )}
                
                <Paper 
                  sx={{ 
                    p: 4, 
                    borderRadius: 4,
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 3,
                    transition: 'all 0.3s ease',
                    border: '2px solid transparent',
                    position: 'relative',
                    zIndex: 1,
                    background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                    '&:hover': {
                      transform: 'translateX(8px)',
                      borderColor: 'primary.main',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                    },
                  }}
                >
                  {/* Step number */}
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      background: (theme) => `linear-gradient(135deg, 
                        ${theme.palette.primary.main} 0%, 
                        ${theme.palette.primary.dark} 100%
                      )`,
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      flexShrink: 0,
                      boxShadow: (theme) => `0 4px 16px ${theme.palette.primary.main}30`,
                    }}
                  >
                    {index + 1}
                  </Box>

                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: '12px',
                          background: (theme) => `linear-gradient(135deg, 
                            ${theme.palette.primary.light}30 0%, 
                            ${theme.palette.primary.light}60 100%
                          )`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mr: 2,
                          '& svg': {
                            color: 'primary.main',
                            fontSize: '1.5rem',
                          },
                        }}
                      >
                        {step.icon}
                      </Box>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          fontWeight: 700,
                          color: 'primary.main',
                        }}
                      >
                        {step.title}
                      </Typography>
                    </Box>
                    
                    <Typography 
                      variant="body1" 
                      color="text.secondary" 
                      sx={{ lineHeight: 1.6 }}
                    >
                      {step.description}
                    </Typography>

                    <Typography 
                      variant="caption" 
                      sx={{ 
                        display: 'block',
                        mt: 2,
                        color: 'primary.main',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: 1,
                      }}
                    >
                      Step {index + 1} of 3
                    </Typography>
                  </Box>
                </Paper>
              </Box>
            ))}
          </Stack>
        </Box>

        {/* Call to action for the process */}
        <Box sx={{ textAlign: 'center', mt: 8 }}>
          <Typography 
            variant="h6" 
            color="text.secondary" 
            sx={{ mb: 3, maxWidth: 600, mx: 'auto' }}
          >
            Ready to get started? Our team can have your fleet operational within 24 hours.
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              px: 6,
              py: 2,
              borderRadius: 3,
              textTransform: 'none',
              fontSize: '1.1rem',
              fontWeight: 600,
              background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
              '&:hover': {
                background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
                transform: 'translateY(-2px)',
                boxShadow: (theme) => `0 8px 32px ${theme.palette.primary.main}30`,
              },
              transition: 'all 0.3s ease',
            }}
          >
            Start Your Fleet Setup Today
          </Button>
        </Box>
      </Container>

      {/* Benefits Section */}
      <Box sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText', py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
                Why Fleet Operators Choose AA Uganda
              </Typography>
              <Typography variant="body1" sx={{ mb: 4, opacity: 0.9 }}>
                Our fleet management solutions are designed specifically for Ugandan operations, combining local expertise with proven international systems.
              </Typography>
              
              <List>
                {benefits.map((benefit, index) => (
                  <ListItem key={index} sx={{ pl: 0 }}>
                    <ListItemIcon>
                      <CheckIcon sx={{ color: 'secondary.main' }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary={benefit}
                      primaryTypographyProps={{ 
                        color: 'inherit',
                        fontSize: '1.1rem',
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 4, borderRadius: 3 }}>
                <Typography variant="h5" gutterBottom color="primary.main" sx={{ fontWeight: 600 }}>
                  AA Fleet Portal Features
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Secure web access to comprehensive fleet management tools
                </Typography>
                <Grid container spacing={2}>
                  {[
                    'Live GPS tracking',
                    'Trip history & reports',
                    'Fuel consumption analytics',
                    'Driver behavior monitoring',
                    'Maintenance scheduling',
                    'Custom dashboards',
                    'Mobile accessibility',
                    'Data export capabilities',
                  ].map((feature, index) => (
                    <Grid item xs={6} key={index}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <CheckIcon sx={{ color: 'success.main', mr: 1, fontSize: '1rem' }} />
                        <Typography variant="body2">{feature}</Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* FAQ Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Heading variant="h2" align="center" gutterBottom>
          Frequently Asked Questions
        </Heading>
        <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6 }}>
          Get answers to common questions about our fleet management solutions
        </Typography>

        <Box sx={{ maxWidth: 800, mx: 'auto' }}>
          {faqData.map((faq, index) => (
            <Accordion key={index} sx={{ mb: 2, borderRadius: 2, '&:before': { display: 'none' } }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{ 
                  backgroundColor: 'grey.50',
                  borderRadius: 2,
                  '&.Mui-expanded': {
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                  }
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ backgroundColor: 'background.paper', borderRadius: '0 0 8px 8px' }}>
                <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>

      {/* CTA Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Paper 
          sx={{ 
            p: 6, 
            textAlign: 'center',
            borderRadius: 4,
            backgroundImage: (theme) => `linear-gradient(135deg, ${theme.palette.primary.light}20 0%, ${theme.palette.secondary.light}20 100%)`,
          }}
        >
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
            Ready to Optimize Your Fleet?
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
            Join hundreds of businesses across Uganda who trust AA Uganda for their fleet management needs.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <ContactButtons phoneText='Schedule Demo' whatsappMessage="Hello! I would like to inquire about your fleet management services." />
          </Box>
         
        </Paper>
      </Container>
    </Box>
  );
};

export default FleetManagement;

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
  Chip,
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
  Phone as PhoneIcon,
  Email as EmailIcon,
  ExpandMore as ExpandMoreIcon,
  Schedule as ScheduleIcon,
  Build as BuildIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { PageHeader } from '../../components/molecules';
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
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<PhoneIcon />}
                  sx={{ 
                    px: 4, 
                    py: 1.5,
                    borderRadius: 3,
                    textTransform: 'none',
                    fontSize: '1.1rem',
                  }}
                >
                  Get Demo
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<EmailIcon />}
                  sx={{ 
                    px: 4, 
                    py: 1.5,
                    borderRadius: 3,
                    textTransform: 'none',
                    fontSize: '1.1rem',
                  }}
                >
                  Request Quote
                </Button>
              </Stack>
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
                <Paper sx={{ p: 3, textAlign: 'center', height: '100%', borderRadius: 2 }}>
                  <IconWrapper sx={{ mx: 'auto' }}>
                    {feature.icon}
                  </IconWrapper>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {feature.description}
                  </Typography>
                  <Box>
                    {feature.features.map((item, idx) => (
                      <Chip
                        key={idx}
                        label={item}
                        size="small"
                        sx={{ m: 0.25 }}
                        variant="outlined"
                        color="primary"
                      />
                    ))}
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* How It Works */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Heading variant="h2" align="center" gutterBottom>
          How It Works
        </Heading>
        <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6 }}>
          Simple 3-step process to get your fleet managed and protected
        </Typography>

        <Grid container spacing={4}>
          {processSteps.map((step, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 3 }}>
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    backgroundColor: 'primary.main',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    margin: '0 auto 16px',
                  }}
                >
                  {index + 1}
                </Box>
                <IconWrapper sx={{ mx: 'auto', mb: 2 }}>
                  {step.icon}
                </IconWrapper>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  {step.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {step.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
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
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} justifyContent="center">
            <Button
              variant="contained"
              size="large"
              startIcon={<PhoneIcon />}
              sx={{ px: 4, py: 2, borderRadius: 3, textTransform: 'none', fontSize: '1.1rem' }}
            >
              Schedule Demo
            </Button>
            <Button
              variant="outlined"
              size="large"
              startIcon={<EmailIcon />}
              sx={{ px: 4, py: 2, borderRadius: 3, textTransform: 'none', fontSize: '1.1rem' }}
            >
              Get Pricing
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};

export default FleetManagement;

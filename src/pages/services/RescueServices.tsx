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
  Alert,
  Chip,
} from '@mui/material';
import {
  BuildCircle as RescueIcon,
  Phone as PhoneIcon,
  Schedule as ScheduleIcon,
  Security as SecurityIcon,
  LocalShipping as TowingIcon,
  Build as RepairIcon,
  BatteryChargingFull as BatteryIcon,
  LocalGasStation as FuelIcon,
  CheckCircle as CheckIcon,
  SupportAgent as SupportIcon,
  LocationOn as LocationIcon,
  Speed as SpeedIcon,
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

const EmergencyCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: 'center',
  borderRadius: theme.spacing(2),
  background: `linear-gradient(135deg, ${theme.palette.error.main}, ${theme.palette.error.dark})`,
  color: 'white',
  boxShadow: theme.shadows[8],
}));

const RescueServices: React.FC = () => {
  const rescueServices = [
    {
      title: 'Emergency Breakdown Assistance',
      description: 'Immediate response for vehicle breakdowns anywhere in Uganda',
      icon: <RescueIcon />,
      features: ['24/7 availability', 'Rapid response time', 'Professional technicians', 'On-site repairs'],
    },
    {
      title: 'Vehicle Recovery & Towing',
      description: 'Safe vehicle recovery and towing to your preferred location',
      icon: <TowingIcon />,
      features: ['Heavy-duty tow trucks', 'Damage-free towing', 'Secure transport', 'Insurance coordination'],
    },
    {
      title: 'On-Site Mechanical Repairs',
      description: 'Quick mechanical fixes performed at your breakdown location',
      icon: <RepairIcon />,
      features: ['Mobile workshops', 'Certified mechanics', 'Quality parts', 'Warranty coverage'],
    },
    {
      title: 'Battery Jump Start Service',
      description: 'Fast battery jump start and replacement services',
      icon: <BatteryIcon />,
      features: ['Jump start service', 'Battery testing', 'New battery supply', 'Installation service'],
    },
    {
      title: 'Emergency Fuel Delivery',
      description: 'Fuel delivery service when you run out of fuel',
      icon: <FuelIcon />,
      features: ['Rapid fuel delivery', 'Quality fuel supply', 'Safe handling', 'Remote locations'],
    },
    {
      title: 'Accident Response',
      description: 'Immediate response and assistance for road traffic accidents',
      icon: <SecurityIcon />,
      features: ['Emergency response', 'Scene management', 'Police coordination', 'Medical assistance'],
    },
  ];

  const keyBenefits = [
    {
      title: '24/7 Emergency Response',
      description: 'Round-the-clock availability every day of the year',
      icon: <ScheduleIcon />,
    },
    {
      title: '30+ Rescue Vehicles',
      description: 'Strategically positioned for rapid nationwide dispatch',
      icon: <SpeedIcon />,
    },
    {
      title: 'Certified Technicians',
      description: 'First-aid trained crews who prioritize safety',
      icon: <SupportIcon />,
    },
    {
      title: 'Member Priority Service',
      description: 'Faster dispatch for AA Uganda members',
      icon: <CheckIcon />,
    },
  ];

  const processSteps = [
    {
      step: 1,
      title: 'Contact Control Room',
      description: 'Call our 24/7 emergency line or use the AA Uganda app',
      details: ['Immediate call pickup', 'Location identification', 'Problem assessment', 'Service dispatch'],
    },
    {
      step: 2,
      title: 'Nearest Vehicle Dispatched',
      description: 'We dispatch the closest rescue vehicle to your location',
      details: ['GPS-based dispatch', 'Real-time updates', 'ETA notification', 'Crew preparation'],
    },
    {
      step: 3,
      title: 'Professional Assistance',
      description: 'Our crew arrives and provides comprehensive assistance',
      details: ['Scene assessment', 'On-site repairs', 'Recovery if needed', 'Safety ensured'],
    },
    {
      step: 4,
      title: 'Follow-up Support',
      description: 'Continued assistance until your journey resumes safely',
      details: ['Service completion', 'Documentation', 'Insurance support', 'Follow-up care'],
    },
  ];

  const responseAreas = [
    'Kampala Metropolitan Area',
    'Entebbe - Wakiso Corridor',
    'Jinja - Mukono Region',
    'Mbarara - Western Region',
    'Gulu - Northern Region',
    'Mbale - Eastern Region',
    'Major Highway Networks',
    'Remote Area Coverage',
  ];

  return (
    <Box>
      <PageHeader
        title="Rescue & Roadside Assistance"
        subtitle="Professional emergency response and roadside assistance across Uganda"
      />

      {/* Emergency Alert */}
      <Container maxWidth="lg" sx={{ pt: 4 }}>
        <EmergencyCard>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
            🚨 24/7 Emergency Hotline
          </Typography>
          <Typography variant="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
            +256 414 250 362
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
            Available 24 hours a day, 7 days a week for all emergency assistance
          </Typography>
          <Button
            variant="contained"
            size="large"
            startIcon={<PhoneIcon />}
            sx={{ 
              backgroundColor: 'white',
              color: 'error.main',
              '&:hover': { backgroundColor: 'grey.100' },
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
            }}
          >
            Call Now for Emergency
          </Button>
        </EmergencyCard>
      </Container>

      {/* Hero Section */}
      <HeroSection>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h3" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
                Your Trusted Partner When You're Stranded
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 4, lineHeight: 1.6 }}>
                When you're stranded on the road, AA Uganda is your trusted partner. Our rescue teams deliver fast, professional help across Uganda, backed by a nationwide network of 30+ rescue and recovery vehicles.
              </Typography>
              <Alert severity="success" sx={{ mb: 4 }}>
                <Typography variant="body1">
                  <strong>Fast Response:</strong> Average response time of 30 minutes in urban areas and 60 minutes in rural locations.
                </Typography>
              </Alert>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: 'center' }}>
                <RescueIcon sx={{ fontSize: 200, color: 'primary.main', opacity: 0.1 }} />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </HeroSection>

      {/* Key Benefits */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Heading variant="h2" align="center" gutterBottom>
          Why Choose AA Uganda Rescue Services
        </Heading>
        <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6, maxWidth: 800, mx: 'auto' }}>
          Professional, reliable, and safety-first emergency assistance when you need it most.
        </Typography>

        <Grid container spacing={4}>
          {keyBenefits.map((benefit, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper sx={{ p: 3, textAlign: 'center', height: '100%', borderRadius: 2 }}>
                <IconWrapper sx={{ mx: 'auto' }}>
                  {benefit.icon}
                </IconWrapper>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  {benefit.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {benefit.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Rescue Services */}
      <Box sx={{ backgroundColor: 'grey.50', py: 8 }}>
        <Container maxWidth="lg">
          <Heading variant="h2" align="center" gutterBottom>
            Our Rescue Services
          </Heading>
          <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6, maxWidth: 800, mx: 'auto' }}>
            Comprehensive roadside assistance services to get you back on the road safely.
          </Typography>

          <Grid container spacing={4}>
            {rescueServices.map((service, index) => (
              <Grid item xs={12} md={6} key={index}>
                <FeatureCard>
                  <CardContent sx={{ p: 4 }}>
                    <IconWrapper>
                      {service.icon}
                    </IconWrapper>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                      {service.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                      {service.description}
                    </Typography>
                    <Box>
                      {service.features.map((feature, idx) => (
                        <Chip
                          key={idx}
                          label={feature}
                          size="small"
                          sx={{ m: 0.5 }}
                          variant="outlined"
                          color="primary"
                        />
                      ))}
                    </Box>
                  </CardContent>
                </FeatureCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* How It Works */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Heading variant="h2" align="center" gutterBottom>
          How Our Rescue Service Works
        </Heading>
        <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6 }}>
          Simple, transparent process to get you help when you need it
        </Typography>

        <Grid container spacing={4}>
          {processSteps.map((step, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper sx={{ p: 3, textAlign: 'center', height: '100%', borderRadius: 2, position: 'relative' }}>
                <Box
                  sx={{
                    position: 'absolute',
                    top: -20,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    backgroundColor: 'primary.main',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.25rem',
                    fontWeight: 'bold',
                  }}
                >
                  {step.step}
                </Box>
                <Box sx={{ mt: 3 }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mt: 2 }}>
                    {step.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {step.description}
                  </Typography>
                  <List dense>
                    {step.details.map((detail, idx) => (
                      <ListItem key={idx} sx={{ pl: 0, py: 0.25 }}>
                        <ListItemIcon sx={{ minWidth: 20 }}>
                          <CheckIcon sx={{ fontSize: '1rem', color: 'success.main' }} />
                        </ListItemIcon>
                        <ListItemText 
                          primary={detail}
                          primaryTypographyProps={{ variant: 'caption' }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Coverage Areas */}
      <Box sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText', py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
                Nationwide Coverage
              </Typography>
              <Typography variant="body1" sx={{ mb: 4, opacity: 0.9 }}>
                Our rescue network covers all major cities, highways, and remote areas across Uganda, ensuring help is always within reach.
              </Typography>
              
              <Alert severity="info" sx={{ mb: 3, backgroundColor: 'rgba(255,255,255,0.1)', color: 'inherit' }}>
                <Typography variant="body2">
                  <strong>Coverage Guarantee:</strong> We reach 95% of Uganda's road network within 2 hours.
                </Typography>
              </Alert>

              <Button
                variant="contained"
                size="large"
                startIcon={<LocationIcon />}
                sx={{ 
                  backgroundColor: 'secondary.main',
                  color: 'secondary.contrastText',
                  '&:hover': { backgroundColor: 'secondary.dark' },
                  px: 4,
                  py: 1.5,
                }}
              >
                Find Nearest Center
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 4, borderRadius: 3 }}>
                <Typography variant="h5" gutterBottom color="primary.main" sx={{ fontWeight: 600 }}>
                  Service Coverage Areas
                </Typography>
                <Grid container spacing={1}>
                  {responseAreas.map((area, index) => (
                    <Grid item xs={6} key={index}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <CheckIcon sx={{ color: 'success.main', mr: 1, fontSize: '1rem' }} />
                        <Typography variant="body2">{area}</Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

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
            Need Emergency Assistance?
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
            Don't wait until you're stranded. Join AA Uganda today and travel with confidence knowing help is just a phone call away.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} justifyContent="center">
            <Button
              variant="contained"
              size="large"
              startIcon={<PhoneIcon />}
              color="error"
              sx={{ px: 4, py: 2, borderRadius: 3, textTransform: 'none', fontSize: '1.1rem' }}
            >
              Emergency Hotline
            </Button>
            <Button
              variant="outlined"
              size="large"
              startIcon={<CheckIcon />}
              sx={{ px: 4, py: 2, borderRadius: 3, textTransform: 'none', fontSize: '1.1rem' }}
            >
              Become a Member
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};

export default RescueServices;

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
  Chip,
  Avatar,
  Rating,
  Divider,
} from '@mui/material';
import {
  SupportAgent as AdvisoryIcon,
  DirectionsCar as VehicleIcon,
  Build as MaintenanceIcon,
  Engineering as TechnicalIcon,
  Assessment as AnalysisIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  CheckCircle as CheckIcon,
  Schedule as ScheduleIcon,
  Person as PersonIcon,
  LocalGasStation as FuelIcon,
  Security as SafetyIcon,
  Speed as PerformanceIcon,
  MonetizationOn as CostIcon,
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

const TestimonialCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
  height: '100%',
  position: 'relative',
  '&::before': {
    content: '"""',
    position: 'absolute',
    top: 10,
    left: 20,
    fontSize: '3rem',
    color: theme.palette.primary.light,
    fontFamily: 'serif',
  },
}));

const AutomotiveAdvisory: React.FC = () => {
  const advisoryServices = [
    {
      title: 'Vehicle Purchase Guidance',
      description: 'Independent advice on buying new or used cars in Uganda',
      icon: <VehicleIcon />,
      features: [
        'Market valuation assessment',
        'Red flags identification',
        'Negotiation strategy support',
        'Documentation guidance',
        'Inspection recommendations',
        'Financing advice',
      ],
      benefits: ['Save money', 'Avoid pitfalls', 'Make confident decisions'],
    },
    {
      title: 'Tailored Maintenance Plans',
      description: 'Localized service plans and preventative maintenance schedules',
      icon: <MaintenanceIcon />,
      features: [
        'Customized service schedules',
        'Climate-specific recommendations',
        'Cost-effective maintenance plans',
        'Quality parts sourcing',
        'Trusted mechanic network',
        'Maintenance tracking',
      ],
      benefits: ['Extend vehicle life', 'Reduce repair costs', 'Maintain reliability'],
    },
    {
      title: 'Technical Consultations',
      description: 'One-to-one time with experienced automotive technicians',
      icon: <TechnicalIcon />,
      features: [
        'Fault diagnosis assistance',
        'Performance optimization',
        'Upgrade recommendations',
        'Repair options analysis',
        'Technology explanations',
        'Problem-solving guidance',
      ],
      benefits: ['Expert insights', 'Informed decisions', 'Technical clarity'],
    },
    {
      title: 'Pre-purchase Vehicle Checks',
      description: 'Practical vehicle history and inspection briefs for Uganda',
      icon: <AnalysisIcon />,
      features: [
        'Comprehensive history checks',
        'Market analysis reports',
        'Condition assessments',
        'Value comparisons',
        'Risk evaluations',
        'Purchase recommendations',
      ],
      benefits: ['Risk mitigation', 'Value assurance', 'Peace of mind'],
    },
  ];

  const expertiseAreas = [
    {
      title: 'Fuel Efficiency Optimization',
      description: 'Maximize your vehicle\'s fuel economy',
      icon: <FuelIcon />,
      tips: ['Driving techniques', 'Vehicle maintenance', 'Route planning', 'Technology usage'],
    },
    {
      title: 'Safety Enhancement',
      description: 'Improve your vehicle\'s safety features',
      icon: <SafetyIcon />,
      tips: ['Safety system upgrades', 'Defensive driving', 'Emergency preparedness', 'Regular inspections'],
    },
    {
      title: 'Performance Tuning',
      description: 'Optimize your vehicle\'s performance',
      icon: <PerformanceIcon />,
      tips: ['Engine optimization', 'Suspension tuning', 'Tire selection', 'Aerodynamics'],
    },
    {
      title: 'Cost Management',
      description: 'Reduce your vehicle ownership costs',
      icon: <CostIcon />,
      tips: ['Maintenance planning', 'Insurance optimization', 'Resale value protection', 'Efficiency improvements'],
    },
  ];

  const consultationProcess = [
    {
      step: 1,
      title: 'Book Consultation',
      description: 'Choose phone, online, or on-site consultation',
      details: 'Schedule a convenient time for your consultation via phone, video call, or in-person meeting.',
    },
    {
      step: 2,
      title: 'Expert Assessment',
      description: 'Comprehensive review and hands-on checks',
      details: 'Our automotive experts will assess your needs and provide detailed analysis.',
    },
    {
      step: 3,
      title: 'Actionable Report',
      description: 'Receive detailed recommendations and maintenance plan',
      details: 'Get a comprehensive report with clear recommendations and next steps.',
    },
  ];

  const testimonials = [
    {
      name: 'James Mukasa',
      role: 'Fleet Manager',
      company: 'Kampala Transport Ltd',
      avatar: '/images/testimonial-1.jpg',
      rating: 5,
      comment: 'AA Uganda\'s advisory services saved our company over 30% on maintenance costs. Their local expertise is invaluable.',
    },
    {
      name: 'Sarah Namugga',
      role: 'Private Car Owner',
      company: 'Entebbe',
      avatar: '/images/testimonial-2.jpg',
      rating: 5,
      comment: 'They helped me avoid buying a problematic used car and found me a reliable vehicle within my budget. Excellent service!',
    },
    {
      name: 'Robert Ochieng',
      role: 'Taxi Operator',
      company: 'Boda Boda Association',
      avatar: '/images/testimonial-3.jpg',
      rating: 5,
      comment: 'The maintenance advice I received has kept my vehicles running smoothly and reduced my repair expenses significantly.',
    },
  ];

  const whyChooseUs = [
    'Deep local knowledge of Uganda\'s vehicle market',
    'Independent, customer-first advice',
    'Trained technical advisors',
    'Nationwide access to follow-up support',
    'Proven track record with satisfied customers',
    'Cost-effective consultation rates',
    'Flexible consultation formats',
    'Ongoing relationship and support',
  ];

  return (
    <Box>
      <PageHeader
        title="Automotive Advisory Services"
        subtitle="Expert guidance for every motorist in Uganda - buy smarter, maintain cheaper, drive safer"
      />

      {/* Hero Section */}
      <HeroSection>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h3" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
                Expert Automotive Advice You Can Trust
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 4, lineHeight: 1.6 }}>
                Whether you're buying your first car, managing a fleet, or maintaining a family vehicle, our advisors deliver practical, locally-tested recommendations tailored to Uganda's unique conditions.
              </Typography>
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
                  Book Free Consultation
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<ScheduleIcon />}
                  sx={{ 
                    px: 4, 
                    py: 1.5,
                    borderRadius: 3,
                    textTransform: 'none',
                    fontSize: '1.1rem',
                  }}
                >
                  Schedule Inspection
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: 'center' }}>
                <AdvisoryIcon sx={{ fontSize: 200, color: 'primary.main', opacity: 0.1 }} />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </HeroSection>

      {/* Advisory Services */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Heading variant="h2" align="center" gutterBottom>
          Our Advisory Services
        </Heading>
        <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6, maxWidth: 800, mx: 'auto' }}>
          Comprehensive automotive consultation services designed to help you make informed decisions.
        </Typography>

        <Grid container spacing={4}>
          {advisoryServices.map((service, index) => (
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

                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'primary.main' }}>
                    What's Included:
                  </Typography>
                  <List dense>
                    {service.features.map((feature, idx) => (
                      <ListItem key={idx} sx={{ pl: 0, py: 0.25 }}>
                        <ListItemIcon sx={{ minWidth: 20 }}>
                          <CheckIcon sx={{ fontSize: '1rem', color: 'success.main' }} />
                        </ListItemIcon>
                        <ListItemText 
                          primary={feature}
                          primaryTypographyProps={{ variant: 'body2' }}
                        />
                      </ListItem>
                    ))}
                  </List>

                  <Typography variant="h6" sx={{ mt: 2, mb: 1, fontWeight: 600, color: 'secondary.main' }}>
                    Benefits:
                  </Typography>
                  <Box sx={{ mb: 3 }}>
                    {service.benefits.map((benefit, idx) => (
                      <Chip
                        key={idx}
                        label={benefit}
                        size="small"
                        sx={{ m: 0.25 }}
                        variant="outlined"
                        color="secondary"
                      />
                    ))}
                  </Box>

                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<ScheduleIcon />}
                  >
                    Book Consultation
                  </Button>
                </CardContent>
              </FeatureCard>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Expertise Areas */}
      <Box sx={{ backgroundColor: 'grey.50', py: 8 }}>
        <Container maxWidth="lg">
          <Heading variant="h2" align="center" gutterBottom>
            Our Areas of Expertise
          </Heading>
          <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6, maxWidth: 800, mx: 'auto' }}>
            Specialized knowledge across all aspects of vehicle ownership and operation.
          </Typography>

          <Grid container spacing={4}>
            {expertiseAreas.map((area, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Paper sx={{ p: 3, textAlign: 'center', height: '100%', borderRadius: 2 }}>
                  <IconWrapper sx={{ mx: 'auto' }}>
                    {area.icon}
                  </IconWrapper>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    {area.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {area.description}
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                    Key Areas:
                  </Typography>
                  {area.tips.map((tip, idx) => (
                    <Chip
                      key={idx}
                      label={tip}
                      size="small"
                      sx={{ m: 0.25 }}
                      variant="outlined"
                      color="primary"
                    />
                  ))}
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Consultation Process */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Heading variant="h2" align="center" gutterBottom>
          How Our Consultation Works
        </Heading>
        <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6 }}>
          Simple, professional process to get expert automotive advice
        </Typography>

        <Grid container spacing={4}>
          {consultationProcess.map((step, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper sx={{ p: 4, textAlign: 'center', height: '100%', borderRadius: 2, position: 'relative' }}>
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
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    {step.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                    {step.description}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                    {step.details}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Testimonials */}
      <Box sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: 700, mb: 6 }}>
            What Our Clients Say
          </Typography>

          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <TestimonialCard>
                  <Box sx={{ pt: 2 }}>
                    <Typography variant="body1" sx={{ mb: 3, pl: 2 }}>
                      {testimonial.comment}
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar 
                        src={testimonial.avatar} 
                        alt={testimonial.name}
                        sx={{ width: 50, height: 50 }}
                      >
                        <PersonIcon />
                      </Avatar>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          {testimonial.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {testimonial.role}, {testimonial.company}
                        </Typography>
                        <Rating value={testimonial.rating} readOnly size="small" />
                      </Box>
                    </Box>
                  </Box>
                </TestimonialCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Why Choose Us */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
              Why Choose AA Uganda Advisory
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
              Our automotive advisory services combine decades of experience with deep understanding of Uganda's unique motoring environment.
            </Typography>
            
            <List>
              {whyChooseUs.map((reason, index) => (
                <ListItem key={index} sx={{ pl: 0 }}>
                  <ListItemIcon>
                    <CheckIcon sx={{ color: 'success.main' }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary={reason}
                    primaryTypographyProps={{ fontSize: '1rem' }}
                  />
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 4, borderRadius: 3, background: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)' }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
                Start Your Free Consultation
              </Typography>
              <Typography variant="body1" sx={{ mb: 3 }}>
                Get expert automotive advice tailored to your specific needs and budget.
              </Typography>
              
              <Stack spacing={2}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <PhoneIcon sx={{ color: 'primary.main' }} />
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>Call for Consultation</Typography>
                    <Typography variant="body2" color="text.secondary">+256 414 250 362</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <EmailIcon sx={{ color: 'primary.main' }} />
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>Email Us</Typography>
                    <Typography variant="body2" color="text.secondary">advisory@aauganda.co.ug</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <ScheduleIcon sx={{ color: 'primary.main' }} />
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>Business Hours</Typography>
                    <Typography variant="body2" color="text.secondary">Mon - Fri: 8AM - 6PM, Sat: 8AM - 2PM</Typography>
                  </Box>
                </Box>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
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
            Get Expert Automotive Advice Today
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
            Make informed decisions about your vehicle with trusted advice from Uganda's automotive experts.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} justifyContent="center">
            <Button
              variant="contained"
              size="large"
              startIcon={<PhoneIcon />}
              sx={{ px: 4, py: 2, borderRadius: 3, textTransform: 'none', fontSize: '1.1rem' }}
            >
              Book Free Consultation
            </Button>
            <Button
              variant="outlined"
              size="large"
              startIcon={<EmailIcon />}
              sx={{ px: 4, py: 2, borderRadius: 3, textTransform: 'none', fontSize: '1.1rem' }}
            >
              Request Callback
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};

export default AutomotiveAdvisory;

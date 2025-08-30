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
  Divider,
  Stack,
} from '@mui/material';
import {
  Assessment as AssessmentIcon,
  CheckCircle as CheckIcon,
  Schedule as ScheduleIcon,
  AttachMoney as MoneyIcon,
  Security as SecurityIcon,
  Build as BuildIcon,
  LocalShipping as ShippingIcon,
  Business as BusinessIcon,
  Phone as PhoneIcon,
  WhatsApp as WhatsAppIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { PageHeader } from '../../components/molecules';
import { Heading } from '../../components/atoms';
import { config } from '../../utils/config/config';

const HeroSection = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main}15 0%, ${theme.palette.secondary.main}10 100%)`,
  padding: theme.spacing(8, 0),
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'url("/images/vehicle-valuation-bg.jpg") center/cover',
    opacity: 0.05,
    zIndex: 0,
  },
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  height: '100%',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[8],
  },
  borderRadius: theme.spacing(2),
  overflow: 'visible',
  position: 'relative',
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

const ProcessStep = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  height: '100%',
  borderRadius: theme.spacing(2),
  border: `2px solid ${theme.palette.primary.light}`,
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    borderColor: theme.palette.primary.main,
    transform: 'translateY(-2px)',
  },
}));

const StepNumber = styled(Box)(({ theme }) => ({
  width: 40,
  height: 40,
  borderRadius: '50%',
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1.25rem',
  fontWeight: 'bold',
  margin: '0 auto 16px',
}));

const VehicleValuation: React.FC = () => {
  // Handler for phone call functionality
  const handleTalkToUs = () => {
    try {
      window.location.href = `tel:${config.company.contactNumber}`;
    } catch (error) {
      console.error('Error initiating phone call:', error);
      // Fallback: copy number to clipboard if possible
      if (navigator.clipboard) {
        navigator.clipboard.writeText(config.company.contactNumber);
        alert(`Phone number copied to clipboard: ${config.company.contactNumber}`);
      } else {
        alert(`Please call us at: ${config.company.contactNumber}`);
      }
    }
  };

  // Handler for WhatsApp functionality
  const handleChatWithUs = () => {
    try {
      const message = encodeURIComponent('Hello! I would like to inquire about your vehicle valuation services.');
      const whatsappUrl = `https://wa.me/${config.company.whatsAppNumber}?text=${message}`;
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    } catch (error) {
      console.error('Error opening WhatsApp:', error);
      // Fallback: copy number to clipboard
      if (navigator.clipboard) {
        navigator.clipboard.writeText(config.company.whatsAppNumber);
        alert(`WhatsApp number copied to clipboard: ${config.company.whatsAppNumber}`);
      } else {
        alert(`Please message us on WhatsApp: ${config.company.whatsAppNumber}`);
      }
    }
  };

  const valuationServices = [
    {
      title: 'Pre-Insurance Valuation',
      description: 'Independent market valuation to determine accurate sum insured before policy issuance',
      icon: <SecurityIcon />,
      features: ['Market-based assessment', 'Insurance compliance', 'Risk evaluation', 'Coverage recommendations'],
    },
    {
      title: 'Technical Brief Valuation',
      description: 'Concise technical summaries highlighting condition, defects and market value',
      icon: <AssessmentIcon />,
      features: ['Quick decision support', 'Condition assessment', 'Defect identification', 'Market analysis'],
    },
    {
      title: 'Comprehensive Mechanical Valuation',
      description: 'Full mechanical inspection for light and heavy vehicles with detailed condition reports',
      icon: <BuildIcon />,
      features: ['Complete inspection', 'Repair cost estimates', 'Condition documentation', 'Market valuation'],
    },
    {
      title: 'Accident Damage Assessment',
      description: 'Rapid on-site assessment after collision with damage report and repair estimates',
      icon: <ShippingIcon />,
      features: ['Damage evaluation', 'Repair estimates', 'Salvage assessment', 'Total loss guidance'],
    },
    {
      title: 'Fleet Valuation Solutions',
      description: 'Tailored programs for fleet owners with bulk valuations and audit-ready reports',
      icon: <BusinessIcon />,
      features: ['Bulk assessments', 'Depreciation schedules', 'Audit compliance', 'Periodic re-valuations'],
    },
    {
      title: 'Specialist Inspections',
      description: 'For modified vehicles, classic cars, imports, and non-standard cases',
      icon: <MoneyIcon />,
      features: ['Custom evaluations', 'Specialist expertise', 'Import assessments', 'Modification reviews'],
    },
  ];

  const processSteps = [
    {
      number: 1,
      title: 'Book Inspection',
      description: 'Schedule online, by phone, or at any AA Uganda branch',
      icon: <ScheduleIcon />,
    },
    {
      number: 2,
      title: 'Professional Inspection',
      description: 'Mobile or workshop inspection with photos and VIN verification',
      icon: <AssessmentIcon />,
    },
    {
      number: 3,
      title: 'Detailed Report',
      description: 'Receive comprehensive PDF report with market analysis',
      icon: <CheckIcon />,
    },
    {
      number: 4,
      title: 'Expert Support',
      description: 'Follow-up guidance for insurers, repairers, or buyers',
      icon: <PhoneIcon />,
    },
  ];

  const benefits = [
    'Local market expertise grounded in Ugandan market realities',
    'Independent and objective impartial reports',
    'Nationwide reach with inspections arranged where you are',
    'Practical deliverables that are insurer-friendly and audit-ready',
    'Fleet-savvy solutions for single vehicles and large fleets',
    'VIN verification and photographed evidence',
    'Clear next-step recommendations',
    'Quick turnaround times',
  ];

  return (
    <Box>
      <PageHeader
        title="Vehicle Valuation Services"
        subtitle="Professional vehicle valuation and inspection services across Uganda"
      />

      {/* Hero Section */}
      <HeroSection>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h3" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
                Expert Vehicle Valuations for Every Need
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 4, lineHeight: 1.6 }}>
                At AA Uganda, we provide independent, market-aware vehicle valuations tailored to Uganda's motoring environment. Our expert valuers deliver professional reports for insurance, sales, finance, fleet management, and legal needs.
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<PhoneIcon />}
                  onClick={handleTalkToUs}
                  sx={{ 
                    px: 4, 
                    py: 1.5,
                    borderRadius: 3,
                    textTransform: 'none',
                    fontSize: '1.1rem',
                  }}
                >
                  Talk To Us
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<WhatsAppIcon />}
                  onClick={handleChatWithUs}
                  sx={{ 
                    px: 4, 
                    py: 1.5,
                    borderRadius: 3,
                    textTransform: 'none',
                    fontSize: '1.1rem',
                  }}
                >
                  Chat with us
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: 'center' }}>
                <AssessmentIcon sx={{ fontSize: 200, color: 'primary.main', opacity: 0.1 }} />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </HeroSection>

      {/* Why Valuation Matters */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Heading variant="h2" align="center" gutterBottom>
          Why Vehicle Valuation Matters
        </Heading>
        <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6, maxWidth: 800, mx: 'auto' }}>
          A professional valuation establishes your vehicle's monetary value for specific purposes, ensuring you make informed decisions.
        </Typography>

        <Grid container spacing={3}>
          {[
            { icon: <SecurityIcon />, title: 'Correct Insurance Coverage', desc: 'Sets the right sum insured to avoid under or over-insurance' },
            { icon: <MoneyIcon />, title: 'Fair Trading Decisions', desc: 'Informs fair buying and selling decisions with market data' },
            { icon: <AssessmentIcon />, title: 'Financial Requirements', desc: 'Supports finance, lease and probate requirements' },
            { icon: <CheckIcon />, title: 'Claims Evidence', desc: 'Provides evidence in claims, disputes and investigations' },
            { icon: <BusinessIcon />, title: 'Fleet Management', desc: 'Helps fleet owners manage depreciation and budgeting' },
          ].map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper sx={{ p: 3, textAlign: 'center', height: '100%', borderRadius: 2 }}>
                <IconWrapper sx={{ mx: 'auto' }}>
                  {item.icon}
                </IconWrapper>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.desc}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Valuation Services */}
      <Box sx={{ backgroundColor: 'grey.50', py: 8 }}>
        <Container maxWidth="lg">
          <Heading variant="h2" align="center" gutterBottom>
            Our Valuation Services
          </Heading>
          <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6, maxWidth: 800, mx: 'auto' }}>
            Comprehensive suite of vehicle inspection and valuation services for individuals, insurers, financiers and fleet operators.
          </Typography>

          <Grid container spacing={4}>
            {valuationServices.map((service, index) => (
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

      {/* Process */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Heading variant="h2" align="center" gutterBottom>
          How It Works
        </Heading>
        <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6 }}>
          Fast, transparent process from booking to final report
        </Typography>

        <Grid container spacing={4}>
          {processSteps.map((step, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <ProcessStep>
                <StepNumber>{step.number}</StepNumber>
                <IconWrapper sx={{ mx: 'auto', mb: 2 }}>
                  {step.icon}
                </IconWrapper>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  {step.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {step.description}
                </Typography>
              </ProcessStep>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Report Includes */}
      <Box sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText', py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
                What Your Report Includes
              </Typography>
              <Typography variant="body1" sx={{ mb: 4, opacity: 0.9 }}>
                Every AA Uganda valuation report is comprehensive, professional, and designed to give you complete confidence in your vehicle's assessment.
              </Typography>
              
              <List>
                {[
                  'Executive summary and declared purpose',
                  'Market value, replacement/insured value and salvage indication',
                  'Condition notes and photographed evidence',
                  'Technical findings and repair cost estimates',
                  'VIN/registration and odometer verification',
                  'Clear next-step recommendations',
                ].map((item, index) => (
                  <ListItem key={index} sx={{ pl: 0 }}>
                    <ListItemIcon>
                      <CheckIcon sx={{ color: 'secondary.main' }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary={item}
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
                  Why Choose AA Uganda?
                </Typography>
                <Divider sx={{ mb: 3 }} />
                {benefits.map((benefit, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                    <CheckIcon sx={{ color: 'success.main', mr: 1, mt: 0.5 }} />
                    <Typography variant="body1">{benefit}</Typography>
                  </Box>
                ))}
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
            backgroundColor: 'primary.light',
            backgroundImage: (theme) => `linear-gradient(135deg, ${theme.palette.primary.light}20 0%, ${theme.palette.secondary.light}20 100%)`,
          }}
        >
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
            Ready for Professional Vehicle Valuation?
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
            Get started with AA Uganda's trusted valuation services. Book an inspection or request a quote today.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} justifyContent="center">
            <Button
              variant="contained"
              size="large"
              startIcon={<PhoneIcon />}
              onClick={handleTalkToUs}
              sx={{ px: 4, py: 2, borderRadius: 3, textTransform: 'none', fontSize: '1.1rem' }}
            >
              Schedule Inspection
            </Button>
            <Button
              variant="outlined"
              size="large"
              startIcon={<WhatsAppIcon />}
              onClick={handleChatWithUs}
              sx={{ px: 4, py: 2, borderRadius: 3, textTransform: 'none', fontSize: '1.1rem' }}
            >
              Chat with us
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};

export default VehicleValuation;

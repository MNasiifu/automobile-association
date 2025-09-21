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
  Paper,
  Divider,
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
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { PageHeader, ContactButtons } from '../../components/molecules';
import { Heading } from '../../components/atoms';
import { SEO } from '../../components/SEO';
import { vehicleValuationSEO } from '../../data/seoData';

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
  transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  borderRadius: theme.spacing(3),
  overflow: 'hidden',
  position: 'relative',
  border: `1px solid ${theme.palette.divider}`,
  background: 'linear-gradient(145deg, #ffffff 0%, #fafafa 100%)',
  cursor: 'pointer',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `linear-gradient(135deg, ${theme.palette.primary.main}08, ${theme.palette.secondary.main}05)`,
    opacity: 0,
    transition: 'opacity 0.4s ease-in-out',
    zIndex: 0,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    borderRadius: theme.spacing(3),
    opacity: 0,
    transition: 'opacity 0.4s ease-in-out',
    zIndex: -1,
  },
  '&:hover': {
    transform: 'translateY(-8px) scale(1.02)',
    color: 'white',
    boxShadow: `0 20px 40px ${theme.palette.primary.main}15, 0 8px 32px ${theme.palette.secondary.main}10`,
    borderColor: 'transparent',
    '&::before': {
      opacity: 1,
    },
    '&::after': {
      opacity: 1,
    },
    '& .feature-icon': {
      transform: 'scale(1.1) rotate(5deg)',
      background: `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
    },
    '& .feature-title': {
      color: theme.palette.grey[100],
      transform: 'translateY(-2px)',
    },
    '& .feature-chips': {
      '& .MuiChip-root': {
        transform: 'scale(1.05)',
        borderColor: theme.palette.grey[200],
        color: theme.palette.primary.main,
        backgroundColor: `${theme.palette.grey[100]}`,
        '&:nth-of-type(2n)': {
          color: theme.palette.secondary.dark,
        },
      },
    },
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  width: 68,
  height: 68,
  borderRadius: '50%',
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  position: 'relative',
  transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  boxShadow: `0 8px 24px ${theme.palette.primary.main}25, 0 4px 12px ${theme.palette.secondary.main}15`,
  border: `3px solid white`,
  zIndex: 2,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: -4,
    left: -4,
    right: -4,
    bottom: -4,
    borderRadius: '50%',
    background: `linear-gradient(135deg, ${theme.palette.primary.main}20, ${theme.palette.secondary.main}15)`,
    opacity: 0,
    transition: 'opacity 0.3s ease-in-out',
    zIndex: -1,
  },
  '& svg': {
    color: 'white',
    fontSize: '2.2rem',
    transition: 'all 0.3s ease-in-out',
    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
  },
}));

const ProcessStep = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: 'center',
  height: '100%',
  borderRadius: theme.spacing(3),
  border: `1px solid ${theme.palette.divider}`,
  background: 'linear-gradient(145deg, #ffffff 0%, #fafafa 100%)',
  transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  position: 'relative',
  overflow: 'hidden',
  cursor: 'pointer',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: `linear-gradient(90deg, transparent, ${theme.palette.primary.main}20, transparent)`,
    transition: 'left 0.6s ease-in-out',
  },
  '&:hover': {
    transform: 'translateY(-8px) scale(1.02)',
    boxShadow: `0 20px 40px ${theme.palette.primary.main}15`,
    borderColor: theme.palette.primary.main,
    '&::before': {
      left: '100%',
    },
    '& .step-number': {
      transform: 'scale(1.1) rotate(360deg)',
      background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    },
    '& .step-icon': {
      transform: 'scale(1.1)',
      color: theme.palette.primary.main,
    },
  },
}));

const StepNumber = styled(Box)(({ theme }) => ({
  width: 56,
  height: 56,
  borderRadius: '50%',
  background: `linear-gradient(135deg, ${theme.palette.primary.main}90, ${theme.palette.primary.dark})`,
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1.5rem',
  fontWeight: 700,
  margin: '0 auto 24px',
  boxShadow: `0 8px 24px ${theme.palette.primary.main}30`,
  transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  position: 'relative',
  zIndex: 2,
  border: `3px solid white`,
}));

const ProcessContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '120px',
    left: '12.5%',
    right: '12.5%',
    height: '2px',
    background: `linear-gradient(90deg, ${theme.palette.primary.main}30, ${theme.palette.secondary.main}30)`,
    zIndex: 0,
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
}));

const StepIconWrapper = styled(Box)(({ theme }) => ({
  width: 48,
  height: 48,
  borderRadius: '12px',
  background: `linear-gradient(135deg, ${theme.palette.primary.light}20, ${theme.palette.secondary.light}20)`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto 16px',
  transition: 'all 0.3s ease-in-out',
  '& svg': {
    fontSize: '1.75rem',
    color: theme.palette.primary.main,
    transition: 'all 0.3s ease-in-out',
  },
}));



const VehicleValuation: React.FC = () => {
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
      description: 'Follow-up guidance for insurers, banks, financial institutions, repairers, or buyers',
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
      <SEO seoData={vehicleValuationSEO} />
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
              <ContactButtons 
                whatsappMessage="Hello! I would like to inquire about your vehicle valuation services."
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: 'center', display: { xs: 'none', md: 'block' } }}>
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
            { icon: <MoneyIcon />, title: 'Car Logbook Loans', desc: 'Banks and financial institutions use professional valuations to determine loan amounts for car logbook financing' },
          ].map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper sx={{ 
                p: 3, 
                textAlign: 'center', 
                height: '100%', 
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                <Box>
                  <IconWrapper sx={{ mx: 'auto' }}>
                    {item.icon}
                  </IconWrapper>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, minHeight: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {item.title}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 'auto' }}>
                  {item.desc}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Valuation Services */}
      <Box sx={{ 
        backgroundColor: 'grey.50', 
        py: 8,
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(135deg, transparent 0%, rgba(25, 118, 210, 0.02) 50%, transparent 100%)`,
          pointerEvents: 'none',
        }
      }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8, position: 'relative', zIndex: 1 }}>
            <Heading variant="h2" gutterBottom align="center" sx={{ 
              fontWeight: 700,
              background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 3
            }}>
              Our Valuation Services
            </Heading>
            <Typography variant="h6" color="text.secondary" sx={{ 
              mb: 4, 
              maxWidth: 800, 
              mx: 'auto',
              lineHeight: 1.6,
              fontSize: { xs: '1.1rem', sm: '1.25rem' }
            }}>
              Comprehensive suite of vehicle inspection and valuation services for individuals, insurers, financiers and fleet operators.
            </Typography>
            <Box sx={{
              width: 120,
              height: 4,
              background: (theme) => `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              borderRadius: 4,
              mx: 'auto',
              mb: 2
            }} />
            <Typography variant="body2" color="text.secondary" sx={{ opacity: 0.8, fontStyle: 'italic' }}>
              Trusted by thousands of vehicle owners across Uganda
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {valuationServices.map((service, index) => (
              <Grid item xs={12} md={6} key={index}>
                <FeatureCard>
                  <CardContent sx={{ 
                    p: { xs: 3, sm: 4 }, 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    zIndex: 1
                  }}>
                    <Box sx={{ textAlign: 'center', mb: 3 }}>
                      <IconWrapper className="feature-icon">
                        {service.icon}
                      </IconWrapper>
                    </Box>
                    
                    <Box sx={{ flexGrow: 1, textAlign: 'center' }}>
                      <Typography 
                        variant="h5" 
                        gutterBottom 
                        className="feature-title"
                        sx={{ 
                          fontWeight: 700,
                          mb: 2,
                          transition: 'all 0.3s ease-in-out',
                          fontSize: { xs: '1.25rem', sm: '1.5rem' },
                          lineHeight: 1.3
                        }}
                      >
                        {service.title}
                      </Typography>
                      
                      <Typography 
                        variant="body1" 
                        color="text.secondary" 
                        className="feature-title"
                        sx={{ 
                          mb: 4,
                          lineHeight: 1.6,
                          fontSize: { xs: '0.95rem', sm: '1rem' },
                          textAlign: 'center'
                        }}
                      >
                        {service.description}
                      </Typography>
                    </Box>

                    <Box className="feature-chips" sx={{ 
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      mt: 'auto'
                    }}>
                      {service.features.map((feature, idx) => (
                        <Chip
                          key={idx}
                          label={feature}
                          size="small"
                          variant="outlined"
                          sx={{
                            fontSize: '0.75rem',
                            fontWeight: 500,
                            borderRadius: 2,
                            backgroundColor: 'background.paper',
                            border: (theme) => `1px solid ${theme.palette.primary.main}30`,
                            color: 'text.primary',
                            transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                            position: 'relative',
                            overflow: 'hidden',
                            backdropFilter: 'blur(8px)',
                            '&::before': {
                              content: '""',
                              position: 'absolute',
                              top: 0,
                              left: '-100%',
                              width: '100%',
                              height: '100%',
                              background: (theme) => `linear-gradient(90deg, transparent, ${theme.palette.primary.main}15, transparent)`,
                              transition: 'left 0.6s ease-in-out',
                            },
                            '&:hover': {
                              transform: 'translateY(-2px) scale(1.05)',
                              boxShadow: (theme) => `0 4px 12px ${theme.palette.primary.main}20`,
                              '&::before': {
                                left: '100%',
                              },
                            },
                            '&:nth-of-type(2n)': {
                              borderColor: (theme) => `${theme.palette.secondary.main}30`,
                              '&:hover': {
                                boxShadow: (theme) => `0 4px 12px ${theme.palette.secondary.main}20`,
                              },
                            },
                          }}
                        />
                      ))}
                    </Box>
                  </CardContent>
                </FeatureCard>
              </Grid>
            ))}
          </Grid>

          {/* Additional Service Highlights */}
          <Box sx={{ mt: 8, textAlign: 'center' }}>
            <Paper sx={{
              p: 4,
              borderRadius: 4,
              background: (theme) => `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[50]} 100%)`,
              border: (theme) => `1px solid ${theme.palette.primary.main}10`,
              boxShadow: (theme) => `0 8px 32px ${theme.palette.primary.main}08`,
            }}>
              <Typography variant="h5" gutterBottom sx={{ 
                fontWeight: 600, 
                color: 'primary.main',
                mb: 3
              }}>
                🏆 Why Choose Our Valuation Services?
              </Typography>
              <Grid container spacing={3}>
                {[
                  { icon: '⚡', title: 'Fast Turnaround', desc: 'Reports delivered within 24-48 hours' },
                  { icon: '🎯', title: 'Local Expertise', desc: 'Deep understanding of Uganda`s vehicle market' },
                  { icon: '📋', title: 'Comprehensive Reports', desc: 'Detailed analysis with photo documentation' },
                  { icon: '🤝', title: 'Trusted by Industry', desc: 'Preferred by insurers, banks, and dealers' },
                ].map((highlight, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h4" sx={{ mb: 1 }}>
                        {highlight.icon}
                      </Typography>
                      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, fontSize: '1rem' }}>
                        {highlight.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                        {highlight.desc}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Box>
        </Container>
      </Box>

      {/* Process */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Heading variant="h2" align="center" gutterBottom>
          How It Works
        </Heading>
        <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 2 }}>
          Fast, transparent process from booking to final report
        </Typography>
        <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 8, maxWidth: 600, mx: 'auto', opacity: 0.8 }}>
          Our streamlined 4-step process ensures you get professional vehicle valuation with minimal hassle and maximum reliability.
        </Typography>

        <ProcessContainer>
          <Grid container spacing={4}>
            {processSteps.map((step, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <ProcessStep elevation={0}>
                  <StepNumber className="step-number">{step.number}</StepNumber>
                  <StepIconWrapper className="step-icon">
                    {step.icon}
                  </StepIconWrapper>
                  <Typography 
                    variant="h6" 
                    gutterBottom 
                    sx={{ 
                      fontWeight: 700, 
                      color: 'text.primary',
                      mb: 2,
                      fontSize: { xs: '1.1rem', sm: '1.25rem' }
                    }}
                  >
                    {step.title}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ 
                      lineHeight: 1.6,
                      fontSize: { xs: '0.875rem', sm: '0.95rem' }
                    }}
                  >
                    {step.description}
                  </Typography>
                  
                  {/* Progress indicator for mobile */}
                  {index < processSteps.length - 1 && (
                    <Box
                      sx={{
                        display: { xs: 'block', md: 'none' },
                        mt: 3,
                        mx: 'auto',
                        width: 2,
                        height: 40,
                        background: (theme) => `linear-gradient(180deg, ${theme.palette.primary.main}60, ${theme.palette.primary.light}30)`,
                        borderRadius: 1,
                      }}
                    />
                  )}
                </ProcessStep>
              </Grid>
            ))}
          </Grid>
        </ProcessContainer>

        {/* Additional Process Benefits */}
        <Box sx={{ mt: 8, textAlign: 'center' }}>
          <Paper 
            sx={{ 
              p: 4, 
              borderRadius: 3,
              background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.main}08, ${theme.palette.secondary.main}05)`,
              border: (theme) => `1px solid ${theme.palette.primary.main}20`,
            }}
          >
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
              Why Our Process Works
            </Typography>
            <Grid container spacing={3} sx={{ mt: 2 }}>
              {[
                { icon: <ScheduleIcon />, title: 'Quick Turnaround', desc: 'Most reports delivered within 24-48 hours' },
                { icon: <SecurityIcon />, title: 'Guaranteed Accuracy', desc: 'Professional valuers with local market expertise' },
                { icon: <CheckIcon />, title: 'Comprehensive Coverage', desc: 'Every aspect of your vehicle thoroughly assessed' },
                { icon: <PhoneIcon />, title: 'Ongoing Support', desc: 'Expert guidance throughout the entire process' },
              ].map((benefit, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: 2,
                        backgroundColor: 'primary.main',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 1,
                        '& svg': { color: 'white', fontSize: '1.25rem' }
                      }}
                    >
                      {benefit.icon}
                    </Box>
                    <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
                      {benefit.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {benefit.desc}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Box>
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
            backgroundColor: 'grey.100',
            backgroundImage: (theme) => `linear-gradient(135deg, ${theme.palette.primary.light}20 0%, ${theme.palette.secondary.light}20 100%)`,
          }}
        >
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
            Ready for Professional Vehicle Valuation?
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
            Get started with AA Uganda's trusted valuation services. Book an inspection or request a quote today.
          </Typography>
          <ContactButtons 
            phoneText="Schedule Inspection"
            whatsappMessage="Hello! I would like to inquire about your vehicle valuation services."
            justifyContent="center"
            spacing={3}
            buttonSx={{ px: {xs: 1, sm: 4}, py: 2 }}
          />
        </Paper>
      </Container>
    </Box>
  );
};

export default VehicleValuation;

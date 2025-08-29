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
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stepper,
  Step,
  StepLabel,
  StepContent,
} from '@mui/material';
import {
  Security as InsuranceIcon,
  DirectionsCar as CarIcon,
  LocalPhone as PhoneIcon,
  Email as EmailIcon,
  CheckCircle as CheckIcon,
  AccountBalance as BankIcon,
  Assignment as ClaimIcon,
  Speed as FastIcon,
  Support as SupportIcon,
  ExpandMore as ExpandMoreIcon,
  MonetizationOn as MoneyIcon,
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

const PricingCard = styled(Card)(({ theme }) => ({
  height: '100%',
  transition: 'all 0.3s ease-in-out',
  borderRadius: theme.spacing(2),
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[12],
  },
}));

const PremiumCard = styled(PricingCard)(({ theme }) => ({
  border: `3px solid ${theme.palette.secondary.main}`,
  background: `linear-gradient(135deg, ${theme.palette.secondary.light}10 0%, ${theme.palette.primary.light}05 100%)`,
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
  borderRadius: theme.spacing(2),
  height: '100%',
  textAlign: 'center',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  },
}));

const InsuranceServices: React.FC = () => {
  const insurancePlans = [
    {
      title: 'Third Party',
      price: 'From UGX 180,000',
      period: 'per year',
      description: 'Basic legal requirement coverage',
      icon: <CarIcon />,
      features: [
        'Third party liability coverage',
        'Legal requirement compliance',
        'Basic roadside assistance',
        'Certificate issuance',
        'Quick processing',
        'Nationwide acceptance',
      ],
      popular: false,
    },
    {
      title: 'Comprehensive',
      price: 'From UGX 450,000',
      period: 'per year',
      description: 'Complete protection package',
      icon: <InsuranceIcon />,
      features: [
        'All Third Party benefits',
        'Own damage coverage',
        'Theft protection',
        'Fire & flood coverage',
        'Windscreen replacement',
        'Emergency rescue priority',
        'Rental car provision',
        'Personal accident cover',
      ],
      popular: true,
    },
    {
      title: 'Commercial Fleet',
      price: 'Custom Pricing',
      period: 'contact us',
      description: 'Tailored business solutions',
      icon: <BankIcon />,
      features: [
        'Fleet management coverage',
        'Multiple vehicle discounts',
        'Driver protection',
        'Business interruption',
        'Goods in transit',
        'Public liability',
        'Dedicated claims handler',
        'Risk management support',
      ],
      popular: false,
    },
  ];

  const claimsProcess = [
    {
      title: 'Report the Incident',
      description: 'Call our 24/7 hotline immediately after any incident',
      details: 'Contact us on 0800-100-100 or report online',
    },
    {
      title: 'Document Everything',
      description: 'Take photos and gather relevant information',
      details: 'Photos, police report, witness details if applicable',
    },
    {
      title: 'Submit Your Claim',
      description: 'Complete claim forms with required documentation',
      details: 'Online submission or visit our offices',
    },
    {
      title: 'Assessment & Approval',
      description: 'Our team reviews and processes your claim',
      details: 'Typically completed within 48-72 hours',
    },
    {
      title: 'Receive Payment',
      description: 'Get your settlement or vehicle repairs',
      details: 'Direct payment or approved garage repairs',
    },
  ];

  const insuranceFeatures = [
    {
      title: 'Quick Claims Processing',
      description: '48-hour claim processing with minimal paperwork',
      icon: <FastIcon />,
    },
    {
      title: '24/7 Support Hotline',
      description: 'Round-the-clock assistance for emergencies',
      icon: <SupportIcon />,
    },
    {
      title: 'Nationwide Coverage',
      description: 'Protected anywhere in Uganda and East Africa',
      icon: <CheckIcon />,
    },
    {
      title: 'Flexible Payment Plans',
      description: 'Monthly, quarterly, or annual payment options',
      icon: <MoneyIcon />,
    },
  ];

  const faqData = [
    {
      question: 'What does comprehensive motor insurance cover?',
      answer: 'Comprehensive insurance covers damage to your own vehicle from accidents, theft, fire, flood, and vandalism, plus third-party liability. It also includes windscreen replacement, emergency roadside assistance, and personal accident cover.',
    },
    {
      question: 'How quickly are claims processed?',
      answer: 'Most claims are processed within 48-72 hours of receiving complete documentation. Emergency situations and minor claims can often be approved within 24 hours.',
    },
    {
      question: 'Can I get insurance for an imported vehicle?',
      answer: 'Yes, we provide coverage for both locally assembled and imported vehicles. Additional inspection may be required for imported vehicles to determine their current market value.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept mobile money (MTN, Airtel), bank transfers, cash payments at our offices, and credit/debit cards. Payment plans are available for annual premiums.',
    },
    {
      question: 'Do you offer discounts for multiple vehicles?',
      answer: 'Yes, we offer attractive discounts for fleet insurance covering multiple vehicles. The discount increases with the number of vehicles insured.',
    },
  ];

  return (
    <Box>
      <PageHeader
        title="Motor Insurance Services"
        subtitle="Comprehensive vehicle protection and peace of mind on Uganda's roads"
      />

      {/* Hero Section */}
      <HeroSection>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h3" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
                Protect Your Vehicle Investment
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 4, lineHeight: 1.6 }}>
                Get comprehensive motor insurance coverage with AA Uganda. From basic third-party to full comprehensive protection, we've got your vehicle covered with competitive rates and excellent customer service.
              </Typography>
              <Alert severity="info" sx={{ mb: 4 }}>
                <Typography variant="body1">
                  <strong>Special Offer:</strong> Get 10% off your first year premium when you combine with AA Membership!
                </Typography>
              </Alert>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<PhoneIcon />}
                  sx={{ px: 4, py: 1.5, borderRadius: 3, textTransform: 'none', fontSize: '1.1rem' }}
                >
                  Get Quote
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<ClaimIcon />}
                  sx={{ px: 4, py: 1.5, borderRadius: 3, textTransform: 'none', fontSize: '1.1rem' }}
                >
                  File Claim
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: 'center' }}>
                <InsuranceIcon sx={{ fontSize: 200, color: 'primary.main', opacity: 0.1 }} />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </HeroSection>

      {/* Insurance Plans */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Heading variant="h2" align="center" gutterBottom>
          Choose Your Coverage Plan
        </Heading>
        <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6, maxWidth: 800, mx: 'auto' }}>
          Flexible insurance options to suit every budget and protection need.
        </Typography>

        <Grid container spacing={4}>
          {insurancePlans.map((plan, index) => {
            const CardComponent = plan.popular ? PremiumCard : PricingCard;
            return (
              <Grid item xs={12} md={4} key={index}>
                <CardComponent>
                  {plan.popular && (
                    <Chip
                      label="Most Popular"
                      color="secondary"
                      sx={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        fontWeight: 'bold',
                      }}
                    />
                  )}
                  <CardContent sx={{ p: 4, textAlign: 'center' }}>
                    <IconWrapper sx={{ mx: 'auto' }}>
                      {plan.icon}
                    </IconWrapper>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                      {plan.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                      {plan.description}
                    </Typography>

                    <Box sx={{ mb: 3 }}>
                      <Typography variant="h4" color="primary.main" sx={{ fontWeight: 'bold' }}>
                        {plan.price}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {plan.period}
                      </Typography>
                    </Box>

                    <List>
                      {plan.features.map((feature, idx) => (
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

                    <Button
                      variant={plan.popular ? "contained" : "outlined"}
                      fullWidth
                      size="large"
                      sx={{ mt: 3 }}
                    >
                      Get Quote
                    </Button>
                  </CardContent>
                </CardComponent>
              </Grid>
            );
          })}
        </Grid>
      </Container>

      {/* Insurance Features */}
      <Box sx={{ backgroundColor: 'grey.50', py: 8 }}>
        <Container maxWidth="lg">
          <Heading variant="h2" align="center" gutterBottom>
            Why Choose AA Uganda Insurance?
          </Heading>
          <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6 }}>
            Experience the difference with our customer-focused approach
          </Typography>

          <Grid container spacing={4}>
            {insuranceFeatures.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <ProcessStep>
                  <IconWrapper sx={{ mx: 'auto' }}>
                    {feature.icon}
                  </IconWrapper>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </ProcessStep>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Claims Process */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Heading variant="h2" align="center" gutterBottom>
          Simple Claims Process
        </Heading>
        <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6 }}>
          Filing a claim is easy with our streamlined process
        </Typography>

        <Box sx={{ maxWidth: 800, mx: 'auto' }}>
          <Stepper orientation="vertical">
            {claimsProcess.map((step, index) => (
              <Step key={index} active>
                <StepLabel
                  sx={{
                    '& .MuiStepLabel-label': {
                      fontSize: '1.1rem',
                      fontWeight: 600,
                    }
                  }}
                >
                  {step.title}
                </StepLabel>
                <StepContent>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    {step.description}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                    {step.details}
                  </Typography>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </Box>

        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Alert severity="success" sx={{ mb: 3, maxWidth: 600, mx: 'auto' }}>
            <Typography variant="body1">
              <strong>Emergency Hotline:</strong> 0800-100-100 (Available 24/7)
            </Typography>
          </Alert>
          <Button
            variant="contained"
            size="large"
            startIcon={<ClaimIcon />}
            sx={{ px: 4, py: 2 }}
          >
            Start Claim Process
          </Button>
        </Box>
      </Container>

      {/* FAQ Section */}
      <Box sx={{ backgroundColor: 'grey.50', py: 8 }}>
        <Container maxWidth="lg">
          <Heading variant="h2" align="center" gutterBottom>
            Frequently Asked Questions
          </Heading>
          <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6 }}>
            Common questions about our motor insurance services
          </Typography>

          <Box sx={{ maxWidth: 800, mx: 'auto' }}>
            {faqData.map((faq, index) => (
              <Accordion key={index} sx={{ mb: 2 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {faq.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body1" color="text.secondary">
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
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
            Ready to Protect Your Vehicle?
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
            Get an instant quote and enjoy peace of mind on every journey with AA Uganda motor insurance.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} justifyContent="center">
            <Button
              variant="contained"
              size="large"
              startIcon={<PhoneIcon />}
              sx={{ px: 4, py: 2, borderRadius: 3, textTransform: 'none', fontSize: '1.1rem' }}
            >
              Get Instant Quote
            </Button>
            <Button
              variant="outlined"
              size="large"
              startIcon={<EmailIcon />}
              sx={{ px: 4, py: 2, borderRadius: 3, textTransform: 'none', fontSize: '1.1rem' }}
            >
              Contact Agent
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};

export default InsuranceServices;

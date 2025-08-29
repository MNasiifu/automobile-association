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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  CardMembership as MembershipIcon,
  CheckCircle as CheckIcon,
  Star as PremiumIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  BuildCircle as RescueIcon,
  School as TrainingIcon,
  Security as InsuranceIcon,
  SupportAgent as SupportIcon,
  LocalOffer as DiscountIcon,
  People as FamilyIcon,
  Business as BusinessIcon,
  Speed as PriorityIcon,
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

const MembershipCard = styled(Card)(({ theme }) => ({
  height: '100%',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[12],
  },
  borderRadius: theme.spacing(2),
  position: 'relative',
  border: `2px solid transparent`,
}));

const PremiumCard = styled(MembershipCard)(({ theme }) => ({
  border: `2px solid ${theme.palette.secondary.main}`,
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

const PremiumBadge = styled(Chip)(({ theme }) => ({
  position: 'absolute',
  top: -12,
  left: '50%',
  transform: 'translateX(-50%)',
  background: `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.dark})`,
  color: 'white',
  fontWeight: 'bold',
}));

const BenefitCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
  height: '100%',
  textAlign: 'center',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
    color: 'white',
    '& .benefit-icon': {
      backgroundColor: 'white',
      color: theme.palette.primary.main,
    },
  },
}));

const MembershipPage: React.FC = () => {
  const membershipPlans = [
    {
      title: 'Individual Membership',
      price: 'UGX 150,000',
      period: 'per year',
      description: 'Perfect for individual car owners',
      icon: <MembershipIcon />,
      features: [
        'Priority rescue response',
        '24/7 emergency assistance',
        'Free vehicle inspections (2 per year)',
        'Discounted insurance rates',
        'Technical advice hotline',
        'Member-only events access',
        'Partner discounts',
        'Roadside assistance',
      ],
      popular: false,
    },
    {
      title: 'Family Membership',
      price: 'UGX 250,000',
      period: 'per year',
      description: 'Coverage for your entire family',
      icon: <FamilyIcon />,
      features: [
        'All Individual benefits',
        'Coverage for up to 3 vehicles',
        'Family member protection',
        'Additional driver coverage',
        'Extended rescue services',
        'Free driver training (1 family member)',
        'Enhanced insurance discounts',
        'Priority booking for all services',
      ],
      popular: true,
    },
    {
      title: 'Corporate Membership',
      price: 'From UGX 500,000',
      period: 'per year',
      description: 'Tailored solutions for businesses',
      icon: <BusinessIcon />,
      features: [
        'Fleet management support',
        'Bulk service discounts',
        'Dedicated account manager',
        'Custom rescue response',
        'Employee training programs',
        'Fleet insurance packages',
        'Maintenance planning',
        'Regular fleet audits',
      ],
      popular: false,
    },
  ];

  const memberBenefits = [
    {
      title: 'Priority Rescue Response',
      description: 'Jump the queue for emergency roadside assistance',
      icon: <PriorityIcon />,
      details: ['Faster dispatch', 'Priority handling', 'Dedicated support team'],
    },
    {
      title: 'Nationwide Assistance',
      description: 'Help available across Uganda\'s major routes',
      icon: <RescueIcon />,
      details: ['30+ rescue vehicles', 'Coverage nationwide', 'Partner workshops'],
    },
    {
      title: 'Exclusive Discounts',
      description: 'Save money on services and partner offers',
      icon: <DiscountIcon />,
      details: ['Insurance discounts', 'Service savings', 'Partner benefits'],
    },
    {
      title: 'Expert Support',
      description: 'Access to automotive advice and guidance',
      icon: <SupportIcon />,
      details: ['Technical helpline', 'Expert consultations', 'Maintenance advice'],
    },
    {
      title: 'Training Benefits',
      description: 'Driver education and safety training',
      icon: <TrainingIcon />,
      details: ['Driving courses', 'Safety workshops', 'Skill development'],
    },
    {
      title: 'Insurance Advantages',
      description: 'Preferential rates and claim support',
      icon: <InsuranceIcon />,
      details: ['Reduced premiums', 'Fast claims', 'Dedicated support'],
    },
  ];

  const comparisonData = [
    { feature: 'Emergency Rescue Response', individual: '✓', family: '✓', corporate: '✓' },
    { feature: 'Priority Service', individual: '✓', family: '✓', corporate: '✓' },
    { feature: 'Free Vehicle Inspections', individual: '2/year', family: '3/year', corporate: 'Unlimited' },
    { feature: 'Insurance Discounts', individual: '10%', family: '15%', corporate: '20%' },
    { feature: 'Technical Hotline', individual: '✓', family: '✓', corporate: '✓' },
    { feature: 'Driver Training', individual: 'Paid', family: '1 Free', corporate: 'Group Rates' },
    { feature: 'Vehicles Covered', individual: '1', family: '3', corporate: 'Fleet' },
    { feature: 'Account Manager', individual: '✗', family: '✗', corporate: '✓' },
  ];

  const membershipSteps = [
    {
      step: 1,
      title: 'Choose Your Plan',
      description: 'Select the membership that best fits your needs',
    },
    {
      step: 2,
      title: 'Complete Application',
      description: 'Fill out the membership form with your details',
    },
    {
      step: 3,
      title: 'Make Payment',
      description: 'Pay membership fee via mobile money or bank transfer',
    },
    {
      step: 4,
      title: 'Activate Membership',
      description: 'Receive membership card and start enjoying benefits',
    },
  ];

  const partnerOffers = [
    'Shell Fuel Stations - 5% discount',
    'Total Energies - Special rates',
    'Speedy Motors - Service discounts',
    'Auto Clinic - 10% off repairs',
    'Tire Mart - Reduced tire prices',
    'Quick Lube - Oil change deals',
    'Battery World - Power discounts',
    'Car Care - Detailing savings',
  ];

  return (
    <Box>
      <PageHeader
        title="AA Uganda Membership"
        subtitle="Trusted roadside support and exclusive benefits across Uganda"
      />

      {/* Hero Section */}
      <HeroSection>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h3" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
                Travel with Confidence Across Uganda
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 4, lineHeight: 1.6 }}>
                Join AA Uganda and travel with confidence. Our members receive priority rescue, specialist advice, and exclusive discounts across the country — ensuring help is just a call away.
              </Typography>
              <Alert severity="info" sx={{ mb: 4 }}>
                <Typography variant="body1">
                  <strong>Special Offer:</strong> Join now and get your first month of premium roadside assistance free!
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
                  Join AA Uganda
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<SupportIcon />}
                  sx={{ 
                    px: 4, 
                    py: 1.5,
                    borderRadius: 3,
                    textTransform: 'none',
                    fontSize: '1.1rem',
                  }}
                >
                  Request Rescue
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: 'center' }}>
                <MembershipIcon sx={{ fontSize: 200, color: 'primary.main', opacity: 0.1 }} />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </HeroSection>

      {/* Membership Plans */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Heading variant="h2" align="center" gutterBottom>
          Choose Your Membership Plan
        </Heading>
        <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6, maxWidth: 800, mx: 'auto' }}>
          Flexible membership options designed to meet your specific needs and provide maximum value.
        </Typography>

        <Grid container spacing={4}>
          {membershipPlans.map((plan, index) => {
            const CardComponent = plan.popular ? PremiumCard : MembershipCard;
            return (
              <Grid item xs={12} md={4} key={index}>
                <CardComponent sx={{ position: 'relative' }}>
                  {plan.popular && (
                    <PremiumBadge 
                      icon={<PremiumIcon />} 
                      label="Most Popular"
                      size="small"
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
                      <Typography variant="h3" color="primary.main" sx={{ fontWeight: 'bold' }}>
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
                      Select Plan
                    </Button>
                  </CardContent>
                </CardComponent>
              </Grid>
            );
          })}
        </Grid>
      </Container>

      {/* Member Benefits */}
      <Box sx={{ backgroundColor: 'grey.50', py: 8 }}>
        <Container maxWidth="lg">
          <Heading variant="h2" align="center" gutterBottom>
            Exclusive Member Benefits
          </Heading>
          <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6, maxWidth: 800, mx: 'auto' }}>
            Enjoy comprehensive benefits designed to enhance your motoring experience.
          </Typography>

          <Grid container spacing={4}>
            {memberBenefits.map((benefit, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <BenefitCard>
                  <IconWrapper className="benefit-icon" sx={{ mx: 'auto' }}>
                    {benefit.icon}
                  </IconWrapper>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    {benefit.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {benefit.description}
                  </Typography>
                  <Box>
                    {benefit.details.map((detail, idx) => (
                      <Chip
                        key={idx}
                        label={detail}
                        size="small"
                        sx={{ m: 0.25 }}
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </BenefitCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Membership Comparison */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Heading variant="h2" align="center" gutterBottom>
          Compare Membership Plans
        </Heading>
        <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6 }}>
          Detailed comparison of benefits across all membership tiers
        </Typography>

        <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'primary.main' }}>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Features</TableCell>
                <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold' }}>Individual</TableCell>
                <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold' }}>Family</TableCell>
                <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold' }}>Corporate</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {comparisonData.map((row, index) => (
                <TableRow key={index} sx={{ '&:nth-of-type(odd)': { backgroundColor: 'grey.50' } }}>
                  <TableCell sx={{ fontWeight: 600 }}>{row.feature}</TableCell>
                  <TableCell align="center">{row.individual}</TableCell>
                  <TableCell align="center">{row.family}</TableCell>
                  <TableCell align="center">{row.corporate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

      {/* How to Join */}
      <Box sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: 700, mb: 6 }}>
            How to Join AA Uganda
          </Typography>

          <Grid container spacing={4}>
            {membershipSteps.map((step, index) => (
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
                      backgroundColor: 'secondary.main',
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
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
                      {step.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {step.description}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ mt: 6, textAlign: 'center' }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<PhoneIcon />}
              sx={{ 
                backgroundColor: 'secondary.main',
                color: 'secondary.contrastText',
                '&:hover': { backgroundColor: 'secondary.dark' },
                px: 4,
                py: 2,
                mr: 2,
              }}
            >
              Start Application
            </Button>
            <Button
              variant="outlined"
              size="large"
              startIcon={<EmailIcon />}
              sx={{ 
                borderColor: 'white',
                color: 'white',
                '&:hover': { 
                  borderColor: 'secondary.main',
                  backgroundColor: 'secondary.main',
                },
                px: 4,
                py: 2,
              }}
            >
              Get More Info
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Partner Offers */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
              Partner Discounts & Offers
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
              As an AA Uganda member, enjoy exclusive discounts and special offers from our network of trusted partners across the automotive industry.
            </Typography>
            
            <List>
              {partnerOffers.slice(0, 4).map((offer, index) => (
                <ListItem key={index} sx={{ pl: 0 }}>
                  <ListItemIcon>
                    <CheckIcon sx={{ color: 'success.main' }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary={offer}
                    primaryTypographyProps={{ fontSize: '1rem' }}
                  />
                </ListItem>
              ))}
            </List>

            <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
              * Terms and conditions apply. Partner offers subject to change.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 4, borderRadius: 3, backgroundColor: 'grey.50' }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
                More Partner Benefits
              </Typography>
              <Grid container spacing={1}>
                {partnerOffers.slice(4).map((offer, index) => (
                  <Grid item xs={12} key={index}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <CheckIcon sx={{ color: 'success.main', mr: 1, fontSize: '1rem' }} />
                      <Typography variant="body2">{offer}</Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
              
              <Alert severity="info" sx={{ mt: 3 }}>
                <Typography variant="body2">
                  New partner offers added regularly. Check our member portal for the latest deals!
                </Typography>
              </Alert>
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
            Ready to Join AA Uganda?
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
            Become part of Uganda's most trusted motoring community and enjoy peace of mind on every journey.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} justifyContent="center">
            <Button
              variant="contained"
              size="large"
              startIcon={<PhoneIcon />}
              sx={{ px: 4, py: 2, borderRadius: 3, textTransform: 'none', fontSize: '1.1rem' }}
            >
              Join Now
            </Button>
            <Button
              variant="outlined"
              size="large"
              startIcon={<EmailIcon />}
              sx={{ px: 4, py: 2, borderRadius: 3, textTransform: 'none', fontSize: '1.1rem' }}
            >
              Contact Us
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};

export default MembershipPage;

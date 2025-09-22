import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Alert,
} from '@mui/material';
import {
  DriveEta,
  CheckCircle,
  Speed,
  Security,
  CardMembership,
  Public,
  Gavel,
  Verified,
  Assignment,
  ExpandMore,
  AccessTime,
  Phone,
  Email,
  MonetizationOn,
  SupportAgent,
  Star,
  FlightTakeoff,
  Shield,
  LocationCity,
  Groups,
  Schedule,
  Description,
  PhotoCamera,
  ContactSupport,
  HelpOutline as HelpIcon,
  Lightbulb as LightbulbIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { SEO } from '../components/SEO';
import { Heading, Button, HeaderContainer, AnimatedTitle, ContentContainer, AnimatedSubtitle, SectionDivider } from '../components/atoms';

import { idpBenefits, idpFAQs } from '../data/idpData';
import { DecorativeBackground } from '../components';
import { config } from '../utils/config/config';
import theme from '../theme';
import { FormattedTypography } from '../utils/textFormatter';

const FeatureCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s ease-in-out',
  border: '1px solid',
  borderColor: theme.palette.grey[200],
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.shadows[12],
    borderColor: theme.palette.primary.main,
  },
}));

const BenefitCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: 'center',
  height: '100%',
  transition: 'all 0.3s ease-in-out',
  border: '1px solid',
  borderColor: theme.palette.grey[200],
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[8],
    borderColor: theme.palette.primary.light,
  },
}));

const ProcessStep = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  position: 'relative',
  '&:not(:last-child)::after': {
    content: '""',
    position: 'absolute',
    top: '50px',
    right: '-50%',
    width: '100%',
    height: '2px',
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
}));

const StepIcon = styled(Box)(({ theme }) => ({
  width: 80,
  height: 80,
  borderRadius: '50%',
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  marginBottom: theme.spacing(2),
  boxShadow: theme.shadows[4],
}));

const StatCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  background: `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.light})`,
  color: theme.palette.primary.main,
  border: 'none',
  '& .stat-number': {
    fontSize: '2.0rem',
    fontWeight: 700,
    lineHeight: 1,
  },
  '& .stat-label': {
    fontSize: '0.875rem',
    fontWeight: 500,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
}));

// Enhanced FAQ Section Styled Components
const FAQSection = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.grey[50]} 0%, ${theme.palette.grey[100]} 100%)`,
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `radial-gradient(circle at 20% 80%, ${theme.palette.primary.main}08 0%, transparent 50%),
                      radial-gradient(circle at 80% 20%, ${theme.palette.secondary.main}08 0%, transparent 50%),
                      radial-gradient(circle at 40% 40%, ${theme.palette.primary.main}05 0%, transparent 50%)`,
    pointerEvents: "none",
  },
}));

const FAQContainer = styled(Container)(() => ({
  position: "relative",
  zIndex: 1,
}));

const FAQHeader = styled(Box)(({ theme }) => ({
  textAlign: "center",
  marginBottom: theme.spacing(6),
  position: "relative",
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: theme.spacing(-2),
    left: "50%",
    transform: "translateX(-50%)",
    width: 80,
    height: 4,
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    borderRadius: 2,
  },
}));

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  borderRadius: `${theme.spacing(2)} !important`,
  border: `1px solid ${theme.palette.divider}`,
  background: theme.palette.background.paper,
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
  overflow: "hidden",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  "&:hover": {
    boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
    transform: "translateY(-2px)",
  },
  "&.Mui-expanded": {
    margin: `${theme.spacing(2)} 0 !important`,
    boxShadow: `0 8px 32px ${theme.palette.primary.main}15`,
    border: `1px solid ${theme.palette.primary.light}`,
  },
  "&::before": {
    display: "none",
  },
}));

const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  padding: theme.spacing(2, 3),
  background: theme.palette.background.paper,
  borderRadius: theme.spacing(2),
  transition: "all 0.3s ease",
  "&:hover": {
    background: `linear-gradient(135deg, ${theme.palette.primary.main}05 0%, ${theme.palette.secondary.main}05 100%)`,
  },
  "&.Mui-expanded": {
    background: `linear-gradient(135deg, ${theme.palette.primary.main}10 0%, ${theme.palette.secondary.main}10 100%)`,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  "& .MuiAccordionSummary-expandIconWrapper": {
    color: theme.palette.primary.main,
    transition: "all 0.3s ease",
    "&.Mui-expanded": {
      transform: "rotate(180deg)",
      color: theme.palette.secondary.main,
    },
  },
  "& .MuiAccordionSummary-content": {
    margin: `${theme.spacing(1)} 0`,
    alignItems: "center",
  },
}));

const StyledAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
  padding: theme.spacing(3),
  background: theme.palette.background.default,
  borderTop: "none",
  "& .MuiTypography-root": {
    lineHeight: 1.7,
  },
}));

const QuestionIcon = styled(Box)(({ theme }) => ({
  width: 32,
  height: 32,
  borderRadius: "50%",
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginRight: theme.spacing(2),
  flexShrink: 0,
  "& svg": {
    color: "white",
    fontSize: "1.2rem",
  },
  [theme.breakpoints.down("sm")]: {
    width: 28,
    height: 28,
    marginRight: theme.spacing(1.5),
    "& svg": {
      fontSize: "1rem",
    },
  },
}));

const IdpAbout: React.FC = () => {
  const navigate = useNavigate();
  
  // State for controlling accordion expansion (only one can be open at a time)
  const [expandedAccordion, setExpandedAccordion] = React.useState<string | false>(false);

  // Handler for accordion expansion
  const handleAccordionChange = (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedAccordion(isExpanded ? panel : false);
  };

  const processSteps = [
    {
      icon: <Assignment />,
      title: 'Submit Application',
      description: 'Complete the online application form with required documents',
      details: ['Fill out personal information', 'Upload required documents', 'Pay application fee']
    },
    {
      icon: <AccessTime />,
      title: 'Processing',
      description: 'We verify your documents and process your application',
      details: ['Document verification', 'Application review', 'IDP preparation']
    },
    {
      icon: <CheckCircle />,
      title: 'Ready for Collection',
      description: 'Collect your IDP from our offices or request delivery',
      details: ['Notification sent', 'Office collection', 'Delivery available']
    },
  ];

  const idpStats = [
    { number: '150+', label: 'Countries Covered', icon: <Public /> },
    { number: '3-5', label: 'Working Days', icon: <Schedule /> },
    { number: '1 Year', label: 'Validity Period', icon: <Verified /> },
    { number: '24/7', label: 'Support Available', icon: <SupportAgent /> },
  ];

  const whyChooseAAUganda = [
    {
      icon: <Shield />,
      title: 'Only Authorized Issuer',
      description: 'AA Uganda is the only authorized issuer of International Driving Permits in Uganda since 1955.'
    },
    {
      icon: <Public />,
      title: 'Global Recognition',
      description: 'Our IDPs are officially recognized under the 1968 Vienna Convention and endorsed by FIA, AIT, and ACTA.'
    },
    {
      icon: <Star />,
      title: 'Trusted Experience',
      description: 'Over 65+ years of experience serving Uganda\'s motorists with reliable automotive services.'
    },
    {
      icon: <SupportAgent />,
      title: 'Expert Support',
      description: '24/7 customer support and verification services to ensure your IDP is authentic and valid.'
    }
  ];

  const membershipAdvantages = [
    {
      icon: <MonetizationOn sx={{ color: 'success.main' }} />,
      title: 'Save UGX 100,000',
      description: 'AA Members pay only UGX 250,000 instead of UGX 350,000 for IDP applications',
      highlight: 'Best Value'
    },
    {
      icon: <Speed sx={{ color: 'primary.main' }} />,
      title: 'Priority Processing',
      description: 'Faster processing times and dedicated support for all AA members',
      highlight: 'VIP Treatment'
    },
    {
      icon: <Security sx={{ color: 'warning.main' }} />,
      title: '24/7 Roadside Assistance',
      description: 'Complete peace of mind with emergency rescue services across Uganda',
      highlight: 'Always Protected'
    },
    {
      icon: <Groups sx={{ color: 'info.main' }} />,
      title: 'Exclusive Benefits',
      description: 'Access to member-only events, discounts, and premium automotive services',
      highlight: 'Member Perks'
    }
  ];

  const applicationRequirements = [
    {
      category: 'Personal Documents',
      icon: <Description />,
      items: [
        'Original Ugandan Driving Permit (for verification)',
        'Copy of passport bio-data page',
        'Copy of visa for intended travel country',
        'Valid AA Membership (optional)'
      ]
    },
    {
      category: 'Photography',
      icon: <PhotoCamera />,
      items: [
        'Passport-size photo (recent, colored)',
        'White background preferred',
        'Clear facial features visible',
        'Professional quality recommended'
      ]
    },
    {
      category: 'Application Process',
      icon: <Assignment />,
      items: [
        'Must be physically present for application',
        'No third-party applications accepted',
        'Complete application form accurately',
        'Provide accurate travel information'
      ]
    }
  ];

  const seoData = {
    title: 'About International Driving Permit (IDP) - AA Uganda | Official IDP Issuer',
    description: 'Learn everything about International Driving Permits from AA Uganda - the only authorized IDP issuer in Uganda. Discover benefits, requirements, application process, and why you need an IDP for international travel.',
    keywords: 'International Driving Permit, IDP Uganda, AA Uganda, Driving abroad, IDP requirements, International license, 1968 Vienna Convention, FIA, AIT, ACTA',
  };

  return (
    <Box>
      <SEO seoData={seoData} />

      {/* Page Header */}
      <HeaderContainer>
        <DecorativeBackground />
        <ContentContainer maxWidth="md">
          <Box className="page-header-content">
            <Box className="content-inner">
              <Box className="main-content">
                <AnimatedTitle variant="h1" component="h1">
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 2,
                      flexWrap: "wrap",
                    }}
                  >
                    <DriveEta
                      sx={{ fontSize: { xs: 40, md: 60 }, color: "inherit" }}
                    />
                    <Box component="span">International Driving Permit</Box>
                  </Box>
                </AnimatedTitle>

                <AnimatedSubtitle>
                  Your gateway to driving legally in over 150 countries worldwide. 
                  Get your official IDP from the Automobile Association of Uganda - the only authorized issuer in Uganda.
                </AnimatedSubtitle>

                <SectionDivider />
              </Box>
            </Box>
          </Box>
        </ContentContainer>
      </HeaderContainer>

      {/* IDP Statistics */}
      <Box sx={{ py: 8, backgroundColor: 'grey.100' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {idpStats.map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <StatCard elevation={0}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                    {stat.icon}
                  </Box>
                  <Typography className="stat-number" color="primary.main">
                    {stat.number}
                  </Typography>
                  <Typography className="stat-label" color="text.secondary">
                    {stat.label}
                  </Typography>
                </StatCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* What is an IDP Section */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Heading variant="h2" gutterBottom>
                What is an International Driving Permit?
              </Heading>
              <Typography variant="h6" color="text.secondary" paragraph>
                An <strong>International Driving Permit (IDP)</strong> is an official translation of your national driving license that is recognized internationally and allows motorists to drive a motor vehicle in foreign countries without further formality.
              </Typography>
              <Typography variant="body1" paragraph>
                It is available to <strong>Ugandan Residents</strong> with a current full Ugandan Driving License. Each license is valid for <strong>one year from the date of issue</strong> and covers over 150 countries worldwide.
              </Typography>
              <Typography variant="body1" paragraph>
                The IDP serves as an official translation of your domestic driving license and must be carried alongside your original license when driving abroad.
              </Typography>
              
              <Alert severity="info" sx={{ mt: 3 }}>
                <Typography variant="body2">
                  <strong>Important:</strong> An IDP is not a standalone license but a translation document. You must always carry both your original Ugandan license and the IDP when driving internationally.
                </Typography>
              </Alert>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card elevation={8} sx={{ p: 4, background: 'linear-gradient(135deg, #e3f2fd, #f3e5f5)' }}>
                <Box sx={{ textAlign: 'center', mb: 3 }}>
                  <Public sx={{ fontSize: 80, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h5" color="primary.main" fontWeight={600}>
                    Official Authorization
                  </Typography>
                </Box>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircle color="success" />
                    </ListItemIcon>
                    <ListItemText primary="Endorsed by Federation Internationale de l'Automobile (FIA)" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircle color="success" />
                    </ListItemIcon>
                    <ListItemText primary="Recognized under 1968 Vienna Convention" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircle color="success" />
                    </ListItemIcon>
                    <ListItemText primary="Alliance Internationale de Tourisme (AIT) approved" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircle color="success" />
                    </ListItemIcon>
                    <ListItemText primary="African Council for Touring & Automobile (ACTA) certified" />
                  </ListItem>
                </List>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Benefits of IDP */}
      <Box sx={{ py: 8, backgroundColor: 'grey.100' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Heading variant="h2" align="center" gutterBottom>
              Benefits of Getting an IDP
            </Heading>
            <Typography variant="h6" color="text.secondary">
              Why you need an International Driving Permit for your travels
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {idpBenefits.map((benefit, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <BenefitCard elevation={2}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
                    {benefit.icon === 'Public' && <Public sx={{ fontSize: 48, color: 'primary.main' }} />}
                    {benefit.icon === 'Gavel' && <Gavel sx={{ fontSize: 48, color: 'warning.main' }} />}
                    {benefit.icon === 'Security' && <Security sx={{ fontSize: 48, color: 'success.main' }} />}
                    {benefit.icon === 'Verified' && <Verified sx={{ fontSize: 48, color: 'info.main' }} />}
                  </Box>
                  <Typography variant="h6" gutterBottom fontWeight={600} color="primary.main">
                    {benefit.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {benefit.description}
                  </Typography>
                </BenefitCard>
              </Grid>
            ))}
          </Grid>

          {/* Additional Benefits */}
          <Box sx={{ mt: 6 }}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <FeatureCard elevation={3}>
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <FlightTakeoff sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
                      <Typography variant="h5" color='primary.main' fontWeight={600}>
                        Hassle-free Travel
                      </Typography>
                    </Box>
                    <Typography variant="body1" paragraph>
                      An IDP, being international, is recognized worldwide. Holders don't need to obtain separate driving permits to drive an appropriate vehicle in the foreign country they are visiting.
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      This makes it very convenient whenever you travel and eliminates the need for complex paperwork in each destination country.
                    </Typography>
                  </CardContent>
                </FeatureCard>
              </Grid>
              <Grid item xs={12} md={6}>
                <FeatureCard elevation={3}>
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Speed sx={{ fontSize: 40, color: 'success.main', mr: 2 }} />
                      <Typography variant="h5" color='primary.main' fontWeight={600}>
                        No Additional Tests
                      </Typography>
                    </Box>
                    <Typography variant="body1" paragraph>
                      All holders of Ugandan driving permits are eligible for an IDP. At AA Uganda, we honor your Ugandan driving permit as proof of your driving proficiency.
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      You don't need to undergo further lessons or tests. Just make your application and start driving across borders without worry.
                    </Typography>
                  </CardContent>
                </FeatureCard>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>

      {/* Why Choose AA Uganda */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Heading variant="h2" align='center' gutterBottom>
              Why Choose AA Uganda?
            </Heading>
            <Typography variant="h6" color="text.secondary">
              The trusted choice for Uganda's motorists since 1955
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {whyChooseAAUganda.map((reason, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card 
                  elevation={4}
                  sx={{
                    height: '100%',
                    textAlign: 'center',
                    p: 3,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: 12,
                    }
                  }}
                >
                  <Box sx={{ mb: 3 }}>
                    {reason.icon}
                  </Box>
                  <Typography variant="h6" gutterBottom fontWeight={600} color="primary.main">
                    {reason.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {reason.description}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Why Join AA Uganda Section */}
      <Box sx={{ py: 8, backgroundColor: 'primary.main', color: 'white' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h2" gutterBottom sx={{ fontWeight: 700, color: 'white' }}>
              Why Join AA Uganda?
            </Typography>
            <Typography variant="h6" sx={{ color: 'grey.500' }}>
              Unlock exclusive benefits and significant savings on your IDP application
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {membershipAdvantages.map((advantage, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Paper
                  elevation={8}
                  sx={{
                    p: 4,
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
                      background: `linear-gradient(90deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
                    },
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 16,
                    }
                  }}
                >
                  <Chip
                    label={advantage.highlight}
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: 16,
                      right: 16,
                      background: `linear-gradient(45deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
                      color: 'white',
                      fontWeight: 600,
                    }}
                  />
                  <Box sx={{ mb: 3, mt: 2 }}>
                    {advantage.icon}
                  </Box>
                  <Typography variant="h6" gutterBottom fontWeight={600} color="primary.main">
                    {advantage.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {advantage.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ textAlign: 'center', mt: 6 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: 'white' }}>
              Ready to Save UGX 100,000 on Your IDP?
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, color: 'grey.400' }}>
              Join AA Uganda today and enjoy priority processing, exclusive benefits, and significant savings.
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/membership')}
                startIcon={<CardMembership />}
                sx={{
                  background: 'white',
                  color: 'primary.main',
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 0.9)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Join AA Uganda
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate('/idp/apply')}
                startIcon={<Assignment />}
                sx={{
                  borderColor: 'white',
                  color: 'white',
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Apply for IDP
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>

      {/* Application Process */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Heading variant="h2" align="center" gutterBottom>
              Application Process
            </Heading>
            <Typography variant="h6" color="text.secondary">
              Simple steps to get your International Driving Permit
            </Typography>
          </Box>

          <Box sx={{ mb: 6 }}>
            <Grid container spacing={4} justifyContent="center">
              {processSteps.map((step, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <ProcessStep>
                    <StepIcon>
                      {step.icon}
                    </StepIcon>
                    <Typography variant="h6" gutterBottom fontWeight={600}>
                      {step.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" paragraph>
                      {step.description}
                    </Typography>
                    <List dense>
                      {step.details.map((detail, idx) => (
                        <ListItem key={idx} sx={{ py: 0, justifyContent: 'center' }}>
                          <ListItemIcon sx={{ minWidth: 20 }}>
                            <CheckCircle sx={{ fontSize: 16, color: 'success.main' }} />
                          </ListItemIcon>
                          <ListItemText 
                            primary={detail} 
                            primaryTypographyProps={{ variant: 'body2' }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </ProcessStep>
                </Grid>
              ))}
            </Grid>
          </Box>

          <Alert severity="info" sx={{ mb: 4 }}>
            <Typography variant="body2">
              <strong>Processing Time:</strong> Standard processing takes 3-5 working days. Express in 2 days processing is available for an additional fee of UGX 50,000.
            </Typography>
          </Alert>
        </Container>
      </Box>

      {/* Requirements Section */}
      <Box sx={{ py: 8, backgroundColor: 'grey.100' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Heading variant="h2" align='center' gutterBottom>
              Application Requirements
            </Heading>
            <Typography variant="h6" color="text.secondary">
              What you need to apply for your IDP
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {applicationRequirements.map((category, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card elevation={4} sx={{ height: '100%' }}>
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      {category.icon}
                      <Typography variant="h6" sx={{ ml: 2, fontWeight: 600, color: 'primary.main' }}>
                        {category.category}
                      </Typography>
                    </Box>
                    <List>
                      {category.items.map((item, idx) => (
                        <ListItem key={idx} sx={{ px: 0 }}>
                          <ListItemIcon>
                            <CheckCircle sx={{ fontSize: 20, color: 'success.main' }} />
                          </ListItemIcon>
                          <ListItemText 
                            primary={item} 
                            primaryTypographyProps={{ variant: 'body2' }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Alert severity="warning" sx={{ mt: 4 }}>
            <Typography variant="body2">
              <strong>Important:</strong> A permit can only be issued to holders of GENUINE and VALID Ugandan Driving Permits (NOT holders of Provisional Driving Permits). You must be physically present for the application - no third-party applications are accepted.
            </Typography>
          </Alert>
        </Container>
      </Box>

      {/* Pricing Section */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Heading variant="h2" align="center" gutterBottom>
              Application Fees
            </Heading>
            <Typography variant="h6" color="text.secondary">
              Transparent pricing with member benefits
            </Typography>
          </Box>

          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={6} md={4}>
              <Card 
                elevation={8}
                sx={{
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 4,
                    background: 'linear-gradient(90deg, #2e7d32, #43a047)',
                  },
                }}
              >
                <CardContent sx={{ p: 4, textAlign: 'center' }}>
                  <Chip
                    label="BEST VALUE"
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: 16,
                      right: 16,
                      backgroundColor: 'success.main',
                      color: 'white',
                      fontWeight: 600,
                    }}
                  />
                  <CardMembership sx={{ fontSize: 48, color: 'success.main', mb: 2 }} />
                  <Typography variant="h5" gutterBottom fontWeight={600} color="success.main">
                    AA Member
                  </Typography>
                  <Typography variant="h3" gutterBottom fontWeight={700} color="primary.main">
                    UGX 250,000
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Save UGX 100,000 with membership
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <List>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon>
                        <CheckCircle color="success" />
                      </ListItemIcon>
                      <ListItemText primary="Priority processing" />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon>
                        <CheckCircle color="success" />
                      </ListItemIcon>
                      <ListItemText primary="24/7 roadside assistance" />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon>
                        <CheckCircle color="success" />
                      </ListItemIcon>
                      <ListItemText primary="Member exclusive benefits" />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Card elevation={4}>
                <CardContent sx={{ p: 4, textAlign: 'center' }}>
                  <Public sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h5" gutterBottom fontWeight={600} color="primary.main">
                    Non-AA Member
                  </Typography>
                  <Typography variant="h3" gutterBottom sx={{ fontWeight: 700 }} color="text.primary">
                    UGX 350,000
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Standard rate for non-members
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <List>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon>
                        <CheckCircle color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="Standard processing" />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon>
                        <CheckCircle color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="Same quality service" />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon>
                        <CheckCircle color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="Valid for 1 year" />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography variant="body2" color="text.secondary">
              AA Membership Fee: UGX 150,000 (if not already a member) • Express Processing: Additional UGX 50,000
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* FAQ Section */}
      <FAQSection sx={{ py: { xs: 6, md: 8 } }}>
        <FAQContainer maxWidth="lg">
          <FAQHeader>
            <Box sx={{ mb: 2 }}>
              <LightbulbIcon 
                sx={{ 
                  fontSize: { xs: 48, md: 56 }, 
                  color: 'primary.main',
                  mb: 2,
                  filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))'
                }} 
              />
            </Box>
            <Heading 
              variant="h2" 
              align="center" 
              gutterBottom
              sx={{ 
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                fontWeight: 700,
                background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                mb: 2
              }}
            >
              Frequently Asked Questions
            </Heading>
            <Typography
              variant="h6"
              align="center"
              color="text.secondary"
              sx={{ 
                maxWidth: 600, 
                mx: 'auto',
                fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
                lineHeight: 1.6
              }}
            >
              Get instant answers to common questions about International Driving Permits
            </Typography>
          </FAQHeader>

          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              {idpFAQs.slice(0, Math.ceil(idpFAQs.length / 2)).map((faq, index) => {
                const panelId = `panel-left-${index}`;
                const isExpanded = expandedAccordion === panelId;
                
                return (
                  <StyledAccordion 
                    key={index}
                    expanded={isExpanded}
                    onChange={handleAccordionChange(panelId)}
                    elevation={0}
                  >
                    <StyledAccordionSummary 
                      expandIcon={<ExpandMore />}
                      aria-controls={`${panelId}-content`}
                      id={`${panelId}-header`}
                    >
                      <QuestionIcon>
                        <HelpIcon />
                      </QuestionIcon>
                      <Typography 
                        variant="subtitle1" 
                        sx={{ 
                          fontWeight: 600,
                          fontSize: { xs: '0.95rem', sm: '1rem', md: '1.1rem' },
                          color: isExpanded ? 'primary.main' : 'text.primary',
                          transition: 'color 0.3s ease',
                          pr: 1
                        }}
                      >
                        {faq.question}
                      </Typography>
                    </StyledAccordionSummary>
                    <StyledAccordionDetails>
                      <Box sx={{ pl: { xs: 0, sm: 6 } }}>
                        <FormattedTypography 
                          variant="body2" 
                          sx={{
                            color: 'text.secondary',
                            fontSize: { xs: '0.85rem', sm: '0.9rem' },
                            lineHeight: 1.7,
                            '& strong': {
                              color: 'primary.main',
                              fontWeight: 600
                            }
                          }}
                        >
                          {faq.answer}
                        </FormattedTypography>
                      </Box>
                    </StyledAccordionDetails>
                  </StyledAccordion>
                );
              })}
            </Grid>
            <Grid item xs={12} md={6}>
              {idpFAQs.slice(Math.ceil(idpFAQs.length / 2)).map((faq, index) => {
                const panelId = `panel-right-${index}`;
                const isExpanded = expandedAccordion === panelId;
                
                return (
                  <StyledAccordion 
                    key={index}
                    expanded={isExpanded}
                    onChange={handleAccordionChange(panelId)}
                    elevation={0}
                  >
                    <StyledAccordionSummary 
                      expandIcon={<ExpandMore />}
                      aria-controls={`${panelId}-content`}
                      id={`${panelId}-header`}
                    >
                      <QuestionIcon>
                        <HelpIcon />
                      </QuestionIcon>
                      <Typography 
                        variant="subtitle1" 
                        sx={{ 
                          fontWeight: 600,
                          fontSize: { xs: '0.95rem', sm: '1rem', md: '1.1rem' },
                          color: isExpanded ? 'primary.main' : 'text.primary',
                          transition: 'color 0.3s ease',
                          pr: 1
                        }}
                      >
                        {faq.question}
                      </Typography>
                    </StyledAccordionSummary>
                    <StyledAccordionDetails>
                      <Box sx={{ pl: { xs: 0, sm: 6 } }}>
                        <FormattedTypography 
                          variant="body2" 
                          sx={{
                            color: 'text.secondary',
                            fontSize: { xs: '0.85rem', sm: '0.9rem' },
                            lineHeight: 1.7,
                            '& strong': {
                              color: 'primary.main',
                              fontWeight: 600
                            }
                          }}
                        >
                          {faq.answer}
                        </FormattedTypography>
                      </Box>
                    </StyledAccordionDetails>
                  </StyledAccordion>
                );
              })}
            </Grid>
          </Grid>
        </FAQContainer>
      </FAQSection>

      {/* Contact Section */}
      <Box sx={{ py: 8, backgroundColor: 'primary.dark', color: 'white' }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h3" gutterBottom fontWeight={700}>
                Ready to Apply?
              </Typography>
              <Typography variant="h6" paragraph sx={{ color: 'primary.light' }}>
                Get your International Driving Permit and start your international journey with confidence.
              </Typography>
              <Typography variant="body1" paragraph sx={{ color: 'grey.300' }}>
                Our team at AA Uganda is here to help you through every step of the application process. Contact us for any questions or assistance.
              </Typography>
              
              <Stack direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                justifyContent="flex-start"
                alignItems="left" 
                sx={{ mt: 4 }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate('/idp/apply')}
                  startIcon={<Assignment />}
                  sx={{
                    background: 'white',
                    color: 'primary.main',
                    '&:hover': {
                      background: 'rgb(255, 255, 255, 0.9)',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Apply Now
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate('/contact')}
                  startIcon={<ContactSupport />}
                  sx={{
                    borderColor: 'white',
                    color: 'white',
                    '&:hover': {
                      borderColor: 'white',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Contact Us
                </Button>
              </Stack>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Card elevation={8} sx={{ p: 4, backgroundColor: 'rgba(255, 255, 255, 0.95)' }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }} color="primary.main">
                  Automobile Association of Uganda
                </Typography>
                <Divider sx={{ mb: 3 }} />
                
                <Stack spacing={2}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <LocationCity sx={{ color: 'primary.main', mr: 2 }} />
                    <Box>
                      <Typography variant="body2" fontWeight={600} color="text.primary">
                        Address
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Plot 4 Old Portbell Road Suite 8<br />
                        P.O. Box 1459 Kampala-Uganda
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Phone sx={{ color: 'primary.main', mr: 2 }} />
                    <Box>
                      <Typography variant="body2" fontWeight={600} color="text.primary">
                        Phone
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                      {`${config.company.contactNumber} / ${config.company.secondaryContactNumber}`}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Email sx={{ color: 'primary.main', mr: 2 }} />
                    <Box>
                      <Typography variant="body2" fontWeight={600} color="text.primary">
                        Email
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                       {config.company.email}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Schedule sx={{ color: 'primary.main', mr: 2 }} />
                    <Box>
                      <Typography variant="body2" fontWeight={600} color="text.primary">
                        Office Hours
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Monday - Friday: 8:00 AM - 5:00 PM<br />
                        Saturday: 8:00 AM - 1:00 PM (Emergency only)
                      </Typography>
                    </Box>
                  </Box>
                </Stack>
                
                <Box sx={{ mt: 3, pt: 3, borderTop: 1, borderColor: 'divider', textAlign: 'center' }}>
                  <Typography variant="body2" color="primary.main" fontWeight={600}>
                    🇺🇬 Serving Uganda's Motorists Since 1955
                  </Typography>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default IdpAbout;

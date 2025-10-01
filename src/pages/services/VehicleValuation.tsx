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
  Button,
  Stack,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Tabs,
  Tab,
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
  Assignment as ReportIcon,
  ElectricBolt as ElectricalIcon,
  DirectionsCar as CarIcon,
  LocalShipping as TruckIcon,
  Star as PremiumIcon,
  Download as DownloadIcon,
  Camera as PhotoIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { PageHeader, ContactButtons } from '../../components/molecules';
import { Heading } from '../../components/atoms';
import { SEO } from '../../components/SEO';
import { vehicleValuationSEO } from '../../data/seoData';
import { config } from '../../utils/config/config';
import { useNavigate } from 'react-router-dom';

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

const PremiumBadge = styled(Chip)(({ theme }) => ({
  position: 'absolute',
  top: 16,
  right: 16,
  background: `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.dark})`,
  color: 'white',
  fontWeight: 'bold',
  zIndex: 2,
}));

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`service-tabpanel-${index}`}
      aria-labelledby={`service-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `service-tab-${index}`,
    'aria-controls': `service-tabpanel-${index}`,
  };
}

const VehicleValuation: React.FC = () => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Handler for booking inspection call functionality
  const handleBookService = () => {
    try {
      window.location.href = `tel:${config.company.contactNumber}`;
    } catch (error) {
      console.error("Error initiating phone call:", error);
      // Fallback: copy number to clipboard if possible
      if (navigator.clipboard) {
        navigator.clipboard.writeText(config.company.contactNumber);
        alert(
          `Phone number copied to clipboard: ${config.company.contactNumber}`
        );
      } else {
        alert(`Please call us at: ${config.company.contactNumber}`);
      }
    }
  };

  // Handler for membership inquiry
  const handleNavigateToMembershipPage = () => {
    navigate("/membership");
  };
  const valuationServices = [
    {
      title: 'Pre-Insurance Valuation',
      description: 'Independent market valuation to determine accurate sum insured before policy issuance',
      icon: <SecurityIcon />,
      features: ['Market-based assessment', 'Insurance compliance', 'Risk evaluation', 'Coverage recommendations'],
      serviceType: 'valuation',
    },
    {
      title: 'Technical Brief Valuation',
      description: 'Concise technical summaries highlighting condition, defects and market value',
      icon: <AssessmentIcon />,
      features: ['Quick decision support', 'Condition assessment', 'Defect identification', 'Market analysis'],
      serviceType: 'valuation',
    },
    {
      title: 'Comprehensive Mechanical Valuation',
      description: 'Full mechanical inspection for light and heavy vehicles with detailed condition reports',
      icon: <BuildIcon />,
      features: ['Complete inspection', 'Repair cost estimates', 'Condition documentation', 'Market valuation'],
      serviceType: 'valuation',
    },
    {
      title: 'Accident Damage Assessment',
      description: 'Rapid on-site assessment after collision with damage report and repair estimates',
      icon: <ShippingIcon />,
      features: ['Damage evaluation', 'Repair estimates', 'Salvage assessment', 'Total loss guidance'],
      serviceType: 'valuation',
    },
    {
      title: 'Fleet Valuation Solutions',
      description: 'Tailored programs for fleet owners with bulk valuations and audit-ready reports',
      icon: <BusinessIcon />,
      features: ['Bulk assessments', 'Depreciation schedules', 'Audit compliance', 'Periodic re-valuations'],
      serviceType: 'valuation',
    },
    {
      title: 'Specialist Inspections',
      description: 'For modified vehicles, classic cars, imports, and non-standard cases',
      icon: <MoneyIcon />,
      features: ['Custom evaluations', 'Specialist expertise', 'Import assessments', 'Modification reviews'],
      serviceType: 'valuation',
    },
  ];

  const inspectionServices = [
    {
      title: "Pre-Purchase Inspection",
      description: "Comprehensive evaluation before buying a used vehicle",
      icon: <CarIcon />,
      features: [
        "Mechanical assessment",
        "Bodywork evaluation", 
        "Mileage verification",
        "Ownership checks",
        "Condition report",
        "Negotiation support",
      ],
      price: "From UGX 150,000",
      premium: false,
      serviceType: 'inspection',
    },
    {
      title: "Annual Safety Inspection",
      description: "Regular safety checks to maintain roadworthiness",
      icon: <SecurityIcon />,
      features: [
        "Brake system check",
        "Steering inspection",
        "Suspension review",
        "Tire condition",
        "Lights & signals",
        "Safety certification",
      ],
      price: "From UGX 80,000",
      premium: false,
      serviceType: 'inspection',
    },
    {
      title: "Insurance Claim Inspection",
      description: "Independent assessment for insurance claims",
      icon: <ReportIcon />,
      features: [
        "Damage assessment",
        "Repair estimates",
        "Photo documentation",
        "Insurance liaison",
        "Claims support",
        "Expert testimony",
      ],
      price: "From UGX 120,000",
      premium: true,
      serviceType: 'inspection',
    },
    {
      title: "Commercial Vehicle Inspection",
      description: "Specialized inspection for trucks and commercial vehicles",
      icon: <TruckIcon />,
      features: [
        "Heavy-duty systems",
        "Load capacity check",
        "Commercial compliance",
        "Fleet documentation",
        "Operating permits",
        "Safety standards",
      ],
      price: "From UGX 250,000",
      premium: true,
      serviceType: 'inspection',
    },
  ];

  const whatWeInspect = [
    {
      category: "Engine & Mechanical",
      icon: <BuildIcon />,
      items: [
        "Engine condition & performance",
        "Transmission operation",
        "Cooling system",
        "Exhaust system",
        "Belts & hoses",
        "Fluid levels & leaks",
      ],
    },
    {
      category: "Safety Systems",
      icon: <SecurityIcon />,
      items: [
        "Brake system (discs, pads, fluid)",
        "Steering & suspension",
        "Tire condition & alignment",
        "Lights & indicators",
        "Horn & wipers",
        "Safety equipment",
      ],
    },
    {
      category: "Electrical Systems",
      icon: <ElectricalIcon />,
      items: [
        "Battery & charging system",
        "Starter motor",
        "Alternator",
        "Wiring condition",
        "Electronic systems",
        "Dashboard functions",
      ],
    },
    {
      category: "Body & Interior",
      icon: <PhotoIcon />,
      items: [
        "Body panels & paintwork",
        "Rust & corrosion",
        "Glass condition",
        "Seat condition & operation",
        "Interior components",
        "Accident damage history",
      ],
    },
  ];

  const inspectionProcess = [
    {
      title: "Book Your Inspection",
      description: "Schedule online, by phone, or at any AA Uganda branch",
      details: [
        "Choose inspection type",
        "Select preferred date & time",
        "Provide vehicle details",
        "Choose location (mobile or center)",
      ],
    },
    {
      title: "Professional Inspection",
      description: "AA technician performs comprehensive vehicle assessment",
      details: [
        "Visual inspection of all systems",
        "Diagnostic testing where needed",
        "Photo documentation",
        "Short road test (where applicable)",
      ],
    },
    {
      title: "Detailed Digital Report",
      description: "Receive comprehensive inspection report with recommendations",
      details: [
        "Condition assessment with ratings",
        "Photo evidence included",
        "Immediate safety concerns highlighted",
        "Repair recommendations with cost estimates",
      ],
    },
    {
      title: "Expert Follow-up",
      description: "Ongoing support and guidance from our technical team",
      details: [
        "Report explanation and guidance",
        "Repair shop recommendations",
        "Insurance claim assistance",
        "Follow-up inspection scheduling",
      ],
    },
  ];

  const memberBenefits = [
    "Priority booking and scheduling",
    "Discounted inspection rates",
    "Free follow-up consultations",
    "Complimentary basic vehicle checks",
    "Extended warranty on findings",
    "Priority technical support",
    "Annual inspection reminders",
    "Multi-vehicle discount packages",
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
        title="Vehicle Services - Valuation & Inspection"
        subtitle="Comprehensive vehicle valuation and inspection services across Uganda"
      />

      {/* Hero Section */}
      <HeroSection>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h3" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
                Expert Vehicle Services for Every Need
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 4, lineHeight: 1.6 }}>
                At AA Uganda, we provide independent, professional vehicle valuations and comprehensive inspections tailored to Uganda's motoring environment. Our expert technicians deliver accurate assessments for insurance, sales, finance, fleet management, safety compliance, and legal needs.
              </Typography>
              <ContactButtons 
                whatsappMessage="Hello! I would like to inquire about your vehicle valuation and inspection services."
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

      {/* Why Vehicle Services Matter */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Heading variant="h2" align="center" gutterBottom>
          Why Professional Vehicle Services Matter
        </Heading>
        <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6, maxWidth: 800, mx: 'auto' }}>
          Professional vehicle valuation and inspection services establish your vehicle's true condition and monetary value for informed decision-making and safety assurance.
        </Typography>

        <Grid container spacing={3}>
          {[
            { icon: <SecurityIcon />, title: 'Correct Insurance Coverage', desc: 'Sets the right sum insured to avoid under or over-insurance' },
            { icon: <MoneyIcon />, title: 'Fair Trading Decisions', desc: 'Informs fair buying and selling decisions with market data' },
            { icon: <AssessmentIcon />, title: 'Safety Assurance', desc: 'Ensures your vehicle meets safety standards and roadworthiness requirements' },
            { icon: <CheckIcon />, title: 'Claims Evidence', desc: 'Provides evidence in claims, disputes and investigations' },
            { icon: <BusinessIcon />, title: 'Fleet Management', desc: 'Helps fleet owners manage depreciation, safety compliance and budgeting' },
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

      {/* Vehicle Services */}
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
          <Box sx={{ textAlign: 'center', mb: 6, position: 'relative', zIndex: 1 }}>
            <Heading variant="h2" gutterBottom align="center" sx={{ 
              fontWeight: 700,
              background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 3
            }}>
              Our Vehicle Services
            </Heading>
            <Typography variant="h6" color="text.secondary" sx={{ 
              mb: 4, 
              maxWidth: 800, 
              mx: 'auto',
              lineHeight: 1.6,
              fontSize: { xs: '1.1rem', sm: '1.25rem' }
            }}>
              Comprehensive suite of vehicle valuation and inspection services for individuals, insurers, financiers and fleet operators.
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

          {/* Service Tabs */}
          <Box sx={{ width: '100%', mb: 4 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'center' }}>
              <Tabs value={tabValue} onChange={handleTabChange} aria-label="vehicle services tabs">
                <Tab 
                  label="Vehicle Valuation" 
                  {...a11yProps(0)} 
                  sx={{ 
                    textTransform: 'none', 
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    minWidth: { xs: 'auto', sm: 200 }
                  }} 
                />
                <Tab 
                  label="Vehicle Inspection" 
                  {...a11yProps(1)} 
                  sx={{ 
                    textTransform: 'none', 
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    minWidth: { xs: 'auto', sm: 200 }
                  }} 
                />
              </Tabs>
            </Box>
            
            {/* Valuation Services Tab */}
            <TabPanel value={tabValue} index={0}>
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
            </TabPanel>

            {/* Inspection Services Tab */}
            <TabPanel value={tabValue} index={1}>
              <Grid container spacing={4}>
                {inspectionServices.map((service, index) => (
                  <Grid item xs={12} md={6} key={index}>
                    <FeatureCard sx={{ position: "relative" }}>
                      {service.premium && (
                        <PremiumBadge
                          icon={<PremiumIcon />}
                          label="Premium Service"
                          size="small"
                        />
                      )}
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
                              mb: 2,
                              lineHeight: 1.6,
                              fontSize: { xs: '0.95rem', sm: '1rem' },
                              textAlign: 'center'
                            }}
                          >
                            {service.description}
                          </Typography>

                          <Typography
                            variant="h6"
                            color="primary.main"
                            sx={{ mb: 3, fontWeight: 600 }}
                          >
                            {service.price}
                          </Typography>
                        </Box>

                        <List dense sx={{ mb: 2 }}>
                          {service.features.map((feature, idx) => (
                            <ListItem key={idx} sx={{ pl: 0, py: 0.25 }}>
                              <ListItemIcon sx={{ minWidth: 20 }}>
                                <CheckIcon
                                  sx={{ fontSize: "1rem", color: "success.main" }}
                                />
                              </ListItemIcon>
                              <ListItemText
                                primary={feature}
                                primaryTypographyProps={{ variant: "body2" }}
                              />
                            </ListItem>
                          ))}
                        </List>

                        <Button
                          variant="outlined"
                          fullWidth
                          sx={{ mt: 'auto' }}
                          startIcon={<ScheduleIcon />}
                          onClick={handleBookService}
                        >
                          Book This Service
                        </Button>
                      </CardContent>
                    </FeatureCard>
                  </Grid>
                ))}
              </Grid>
            </TabPanel>
          </Box>

          {/* What We Inspect Section */}
          <Box sx={{ mt: 6 }}>
            <Typography variant="h4" align="center" gutterBottom sx={{ 
              fontWeight: 600, 
              mb: 4,
              color: 'primary.main'
            }}>
              What Our Inspections Cover
            </Typography>
            
            <Grid container spacing={4}>
              {whatWeInspect.map((category, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Paper
                    sx={{
                      p: 3,
                      textAlign: "center",
                      height: "100%",
                      borderRadius: 3,
                      transition: 'all 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: (theme) => `0 8px 24px ${theme.palette.primary.main}15`,
                      }
                    }}
                  >
                    <IconWrapper sx={{ mx: "auto" }}>{category.icon}</IconWrapper>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ fontWeight: 600, mb: 2 }}
                    >
                      {category.category}
                    </Typography>
                    <List dense>
                      {category.items.map((item, idx) => (
                        <ListItem key={idx} sx={{ pl: 0, py: 0.25 }}>
                          <ListItemIcon sx={{ minWidth: 20 }}>
                            <CheckIcon
                              sx={{
                                fontSize: "1rem",
                                color: "primary.main",
                              }}
                            />
                          </ListItemIcon>
                          <ListItemText
                            primary={item}
                            primaryTypographyProps={{ variant: "body2" }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>

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
          How Our Services Work
        </Heading>
        <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 2 }}>
          Fast, transparent process from booking to final report
        </Typography>
        <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 8, maxWidth: 600, mx: 'auto', opacity: 0.8 }}>
          Our streamlined 4-step process ensures you get professional vehicle assessment with minimal hassle and maximum reliability.
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
                { icon: <SecurityIcon />, title: 'Guaranteed Accuracy', desc: 'Professional technicians with local market expertise' },
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

        {/* Detailed Inspection Process using Stepper */}
        <Box sx={{ mt: 8 }}>
          <Typography variant="h4" align="center" gutterBottom sx={{ 
            fontWeight: 600, 
            mb: 4,
            color: 'primary.main'
          }}>
            Detailed Inspection Process
          </Typography>
          <Typography
            variant="h6"
            align="center"
            color="text.secondary"
            sx={{ mb: 6 }}
          >
            Step-by-step breakdown of our comprehensive inspection methodology
          </Typography>

          <Box sx={{ maxWidth: 800, mx: "auto" }}>
            <Stepper orientation="vertical">
              {inspectionProcess.map((step, index) => (
                <Step key={index} active={true}>
                  <StepLabel>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {step.title}
                    </Typography>
                  </StepLabel>
                  <StepContent>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{ mb: 2 }}
                    >
                      {step.description}
                    </Typography>
                    <List dense>
                      {step.details.map((detail, idx) => (
                        <ListItem key={idx} sx={{ pl: 0, py: 0.25 }}>
                          <ListItemIcon sx={{ minWidth: 20 }}>
                            <CheckIcon
                              sx={{ fontSize: "1rem", color: "success.main" }}
                            />
                          </ListItemIcon>
                          <ListItemText
                            primary={detail}
                            primaryTypographyProps={{ variant: "body2" }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
          </Box>
        </Box>
      </Container>

      {/* Member Benefits */}
      <Box
        sx={{
          backgroundColor: "primary.main",
          color: "primary.contrastText",
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
                AA Uganda Member Benefits
              </Typography>
              <Typography variant="body1" sx={{ mb: 4, opacity: 0.9 }}>
                Enjoy exclusive benefits and priority service as an AA Uganda
                member, including discounted rates and premium support services for all vehicle assessments.
              </Typography>

              <Button
                size="large"
                startIcon={<PremiumIcon />}
                onClick={handleNavigateToMembershipPage}
                sx={{
                  backgroundColor: "secondary.main",
                  color: "secondary.contrastText",
                  "&:hover": { backgroundColor: "secondary.light" },
                  px: 4,
                  py: 1.5,
                }}
              >
                Become a Member
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 4, borderRadius: 3 }}>
                <Typography
                  variant="h5"
                  gutterBottom
                  color="primary.main"
                  sx={{ fontWeight: 600 }}
                >
                  Member Exclusive Benefits
                </Typography>
                <Grid container spacing={1}>
                  {memberBenefits.map((benefit, index) => (
                    <Grid item xs={12} key={index}>
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 1 }}
                      >
                        <CheckIcon
                          sx={{
                            color: "success.main",
                            mr: 1,
                            fontSize: "1rem",
                          }}
                        />
                        <Typography variant="body2">{benefit}</Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Digital Report Features */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Heading variant="h2" align="center" gutterBottom>
          Digital Report Features
        </Heading>
        <Typography
          variant="h6"
          align="center"
          color="text.secondary"
          sx={{ mb: 6 }}
        >
          Comprehensive digital reports with photo evidence and expert
          recommendations for both valuation and inspection services
        </Typography>

        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 4, borderRadius: 3, height: "100%" }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                What Your Report Includes
              </Typography>
              <List>
                {[
                  "Executive summary with safety ratings and market value",
                  "Detailed condition assessment with photos",
                  "Immediate safety concerns highlighted",
                  "Repair recommendations with cost estimates",
                  "Vehicle identification and VIN verification",
                  "Market analysis and valuation methodology",
                  "Compliance certification where applicable",
                  "Expert recommendations and next steps",
                  "Digital format for easy sharing",
                ].map((item, index) => (
                  <ListItem key={index} sx={{ pl: 0 }}>
                    <ListItemIcon>
                      <CheckIcon sx={{ color: "success.main" }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={item}
                      primaryTypographyProps={{ fontSize: "1rem" }}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={3}>
              <Paper sx={{ p: 3, textAlign: "center", borderRadius: 2 }}>
                <ReportIcon
                  sx={{ fontSize: 60, color: "primary.main", mb: 2 }}
                />
                <Typography variant="h6" gutterBottom>
                  Detailed Documentation
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Comprehensive reports with technical findings and
                  market-based recommendations
                </Typography>
              </Paper>
              <Paper sx={{ p: 3, textAlign: "center", borderRadius: 2 }}>
                <PhotoIcon
                  sx={{ fontSize: 60, color: "primary.main", mb: 2 }}
                />
                <Typography variant="h6" gutterBottom>
                  Photo Evidence
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Visual documentation of all inspection findings and condition details
                </Typography>
              </Paper>
              <Paper sx={{ p: 3, textAlign: "center", borderRadius: 2 }}>
                <DownloadIcon
                  sx={{ fontSize: 60, color: "primary.main", mb: 2 }}
                />
                <Typography variant="h6" gutterBottom>
                  Digital Delivery
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Instant PDF delivery via email for immediate access and sharing
                </Typography>
              </Paper>
            </Stack>
          </Grid>
        </Grid>
      </Container>

      {/* Why Choose AA Uganda */}
      <Box sx={{ backgroundColor: 'grey.50', py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h3" gutterBottom sx={{ fontWeight: 700, color: 'primary.main' }}>
                Why Choose AA Uganda Vehicle Services?
              </Typography>
              <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.6 }}>
                Every AA Uganda assessment combines decades of local market expertise with international best practices, delivering the trusted reports you need for confident decision-making.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 4, borderRadius: 3 }}>
                <Typography variant="h5" gutterBottom color="primary.main" sx={{ fontWeight: 600 }}>
                  Our Advantages
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
            Ready for Professional Vehicle Services?
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
            Get started with AA Uganda's trusted valuation and inspection services. Book an assessment or request a quote today.
          </Typography>
          <ContactButtons 
            phoneText="Book Service"
            whatsappMessage="Hello! I would like to inquire about your vehicle valuation and inspection services."
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

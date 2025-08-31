import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Snackbar,
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
  Speed as SpeedIcon,
  AccessTime as ClockIcon,
  Engineering as TechnicianIcon,
  Garage as WorkshopIcon,
  VerifiedUser as VerifiedIcon,
  ElectricBolt as ElectricIcon,
  Assessment as TestingIcon,
  Inventory as SupplyIcon,
  Construction as InstallIcon,
  FlashOn as RapidIcon,
  HighQuality as QualityIcon,
  Shield as SafetyIcon,
  Place as RemoteIcon,
  ReportProblem as EmergencyIcon,
  Traffic as SceneIcon,
  LocalPolice as PoliceIcon,
  MedicalServices as MedicalIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { PageHeader } from '../../components/molecules';
import { Heading } from '../../components/atoms';
import { config } from '../../utils/config/config';
import { colors } from '../../theme/colors';

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
  background: `linear-gradient(135deg, ${theme.palette.error.light}, ${theme.palette.error.light})`,
  color: 'white',
  boxShadow: theme.shadows[8],
}));

const FeatureListItem = styled(ListItem)(({ theme }) => ({
  borderRadius: theme.spacing(1),
  marginBottom: theme.spacing(0.5),
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateX(8px)',
    boxShadow: theme.shadows[2],
  },
}));

const PriorityIndicator = styled(Box)<{ priority: 'high' | 'medium' | 'low' }>(({ theme, priority }) => ({
  width: 32,
  height: 32,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: priority === 'high' 
    ? `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`
    : priority === 'medium' 
      ? `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.dark})`
      : `linear-gradient(135deg, ${theme.palette.grey[600]}, ${theme.palette.grey[700]})`,
  '& svg': {
    color: 'white',
    fontSize: '1rem',
  },
}));

const RescueServices: React.FC = () => {
  const navigate = useNavigate();
  
  // State for managing user feedback and analytics
  const [notification, setNotification] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error' | 'warning' | 'info';
  }>({
    open: false,
    message: '',
    severity: 'info',
  });

  // Call benchmarking and analytics state
  const [callMetrics, setCallMetrics] = useState({
    emergencyCallAttempts: 0,
    successfulConnections: 0,
    lastCallTimestamp: null as Date | null,
  });

  const handleNavigateToMembershipPage = () => {
    navigate('/services/membership');
  };

  // Enhanced handleTalkToUs function with benchmarking
  const handleTalkToUs = useCallback((callType: 'emergency' | 'general' = 'general') => {
    const startTime = Date.now();
    
    // Update call metrics
    setCallMetrics(prev => ({
      ...prev,
      emergencyCallAttempts: prev.emergencyCallAttempts + 1,
      lastCallTimestamp: new Date(),
    }));

    try {
      // Log call attempt for analytics
      console.log(`Call attempt initiated: ${callType} at ${new Date().toISOString()}`);
      
      const phoneNumber = config.company.contactNumber;
      const callUrl = `tel:${phoneNumber}`;
      
      // Attempt to initiate phone call
      window.location.href = callUrl;
      
      // Benchmark success (assume successful if no immediate error)
      setTimeout(() => {
        const duration = Date.now() - startTime;
        setCallMetrics(prev => ({
          ...prev,
          successfulConnections: prev.successfulConnections + 1,
        }));
        
        setNotification({
          open: true,
          message: `Call initiated successfully (${duration}ms response time)`,
          severity: 'success',
        });
        
        // Log success metrics
        console.log(`Call benchmark - Duration: ${duration}ms, Type: ${callType}`);
      }, 100);
      
    } catch (error) {
      console.error('Error initiating phone call:', error);
      
      // Fallback: copy number to clipboard if possible
      if (navigator.clipboard) {
        navigator.clipboard.writeText(config.company.contactNumber);
        setNotification({
          open: true,
          message: `Phone number copied to clipboard: ${config.company.contactNumber}`,
          severity: 'warning',
        });
      } else {
        setNotification({
          open: true,
          message: `Please call us at: ${config.company.contactNumber}`,
          severity: 'info',
        });
      }
    }
  }, []);

  // Handler for emergency calls with enhanced benchmarking
  const handleEmergencyCall = useCallback(() => {
    // Priority handling for emergency calls
    console.log('EMERGENCY CALL INITIATED:', new Date().toISOString());
    handleTalkToUs('emergency');
  }, [handleTalkToUs]);

  // Handler for closing notifications
  const handleCloseNotification = () => {
    setNotification(prev => ({ ...prev, open: false }));
  };

  const rescueServices = [
    {
      title: 'Emergency Breakdown Assistance',
      description: 'Immediate response for vehicle breakdowns anywhere in Uganda',
      icon: <RescueIcon />,
      features: [
        { 
          text: '24/7 availability', 
          icon: <ClockIcon />, 
          description: 'Round-the-clock emergency support',
          priority: 'high'
        },
        { 
          text: 'Rapid response time', 
          icon: <SpeedIcon />, 
          description: 'Average 30-min urban response',
          priority: 'high'
        },
        { 
          text: 'Professional technicians', 
          icon: <TechnicianIcon />, 
          description: 'Certified and experienced crew',
          priority: 'medium'
        },
        { 
          text: 'On-site repairs', 
          icon: <RepairIcon />, 
          description: 'Fix issues at breakdown location',
          priority: 'medium'
        },
      ],
    },
    {
      title: 'Vehicle Recovery & Towing',
      description: 'Safe vehicle recovery and towing to your preferred location',
      icon: <TowingIcon />,
      features: [
        { 
          text: 'Heavy-duty tow trucks', 
          icon: <TowingIcon />, 
          description: 'Modern fleet of towing vehicles',
          priority: 'high'
        },
        { 
          text: 'Damage-free towing', 
          icon: <SafetyIcon />, 
          description: 'Safe transport with no damage',
          priority: 'high'
        },
        { 
          text: 'Secure transport', 
          icon: <VerifiedIcon />, 
          description: 'Your vehicle is in safe hands',
          priority: 'medium'
        },
        { 
          text: 'Insurance coordination', 
          icon: <SecurityIcon />, 
          description: 'Direct insurance claim support',
          priority: 'medium'
        },
      ],
    },
    {
      title: 'On-Site Mechanical Repairs',
      description: 'Quick mechanical fixes performed at your breakdown location',
      icon: <RepairIcon />,
      features: [
        { 
          text: 'Mobile workshops', 
          icon: <WorkshopIcon />, 
          description: 'Fully equipped mobile repair units',
          priority: 'high'
        },
        { 
          text: 'Certified mechanics', 
          icon: <VerifiedIcon />, 
          description: 'Qualified automotive technicians',
          priority: 'high'
        },
        { 
          text: 'Quality parts', 
          icon: <QualityIcon />, 
          description: 'Genuine and reliable spare parts',
          priority: 'medium'
        },
        { 
          text: 'Warranty coverage', 
          icon: <CheckIcon />, 
          description: 'Work guaranteed with warranty',
          priority: 'medium'
        },
      ],
    },
    {
      title: 'Battery Jump Start Service',
      description: 'Fast battery jump start and replacement services',
      icon: <BatteryIcon />,
      features: [
        { 
          text: 'Jump start service', 
          icon: <ElectricIcon />, 
          description: 'Quick battery boost to get moving',
          priority: 'high'
        },
        { 
          text: 'Battery testing', 
          icon: <TestingIcon />, 
          description: 'Comprehensive battery diagnostics',
          priority: 'medium'
        },
        { 
          text: 'New battery supply', 
          icon: <SupplyIcon />, 
          description: 'Quality replacement batteries',
          priority: 'medium'
        },
        { 
          text: 'Installation service', 
          icon: <InstallIcon />, 
          description: 'Professional battery installation',
          priority: 'low'
        },
      ],
    },
    {
      title: 'Emergency Fuel Delivery',
      description: 'Fuel delivery service when you run out of fuel',
      icon: <FuelIcon />,
      features: [
        { 
          text: 'Rapid fuel delivery', 
          icon: <RapidIcon />, 
          description: 'Fast fuel delivery to your location',
          priority: 'high'
        },
        { 
          text: 'Quality fuel supply', 
          icon: <QualityIcon />, 
          description: 'Clean, high-grade fuel',
          priority: 'high'
        },
        { 
          text: 'Safe handling', 
          icon: <SafetyIcon />, 
          description: 'Proper fuel handling procedures',
          priority: 'medium'
        },
        { 
          text: 'Remote locations', 
          icon: <RemoteIcon />, 
          description: 'Service available in rural areas',
          priority: 'medium'
        },
      ],
    },
    {
      title: 'Accident Response',
      description: 'Immediate response and assistance for road traffic accidents',
      icon: <SecurityIcon />,
      features: [
        { 
          text: 'Emergency response', 
          icon: <EmergencyIcon />, 
          description: 'Immediate accident scene response',
          priority: 'high'
        },
        { 
          text: 'Scene management', 
          icon: <SceneIcon />, 
          description: 'Professional accident scene control',
          priority: 'high'
        },
        { 
          text: 'Police coordination', 
          icon: <PoliceIcon />, 
          description: 'Direct liaison with authorities',
          priority: 'medium'
        },
        { 
          text: 'Medical assistance', 
          icon: <MedicalIcon />, 
          description: 'First aid and medical support',
          priority: 'high'
        },
      ],
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
      <Container maxWidth="lg" sx={{ pt: 4, mb: 4 }}>
        <EmergencyCard>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
            🚨 24/7 Emergency Hotline
          </Typography>
          <Typography variant="h2" gutterBottom sx={{ fontWeight: 'bold', fontSize: {xs: '1.5rem', sm: '2.0rem'} }}>
            {config.company.contactNumber}
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
            Available 24 hours a day, 7 days a week for all emergency assistance
          </Typography>
          <Button
            variant="contained"
            size="large"
            startIcon={<PhoneIcon />}
            onClick={handleEmergencyCall}
            sx={{ 
              backgroundColor: 'white',
              color: 'error.light',
              '&:hover': { backgroundColor: 'grey.100' },
              px: 4,
              py: 1.5,
              fontSize: {xs: '0.9rem', sm: '1.1rem'},
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
              <Alert severity="info" sx={{ mb: 4 }}>
                <Typography variant="body1">
                  <strong>Fast Response:</strong> Average response time of 30 minutes in urban areas and 60 minutes in rural locations.
                </Typography>
              </Alert>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: 'center' }}>
                <RescueIcon sx={{ 
                  fontSize: 200, 
                  color: 'primary.main', 
                  opacity: 0.1,
                  display: { xs: 'none', md: 'block' }
                }} />
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
                    
                    {/* Enhanced Features List */}
                    <List dense sx={{ mt: 2 }}>
                      {service.features.map((feature, idx) => (
                        <FeatureListItem 
                          key={idx} 
                          sx={{ 
                            px: 2, 
                            py: 1.5,
                            mb: 1,
                            backgroundColor: feature.priority === 'high' 
                              ? 'primary.main' + '08' 
                              : feature.priority === 'medium' 
                                ? 'secondary.main' + '08' 
                                : 'grey.100',
                            '&:hover': {
                              backgroundColor: feature.priority === 'high' 
                                ? 'primary.main' + '15' 
                                : feature.priority === 'medium' 
                                  ? 'secondary.main' + '15' 
                                  : 'grey.200',
                            }
                          }}
                        >
                          <ListItemIcon sx={{ minWidth: 40 }}>
                            <PriorityIndicator priority={feature.priority as 'high' | 'medium' | 'low'}>
                              {feature.icon}
                            </PriorityIndicator>
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                <Typography 
                                  variant="body2" 
                                  sx={{ 
                                    fontWeight: 600,
                                    color: feature.priority === 'high' ? 'primary.main' : 'text.primary'
                                  }}
                                >
                                  {feature.text}
                                </Typography>
                                {feature.priority === 'high' && (
                                  <Chip 
                                    label="Priority" 
                                    size="small" 
                                    color="primary"
                                    variant="filled"
                                    sx={{ 
                                      height: 20, 
                                      fontSize: '0.65rem',
                                      fontWeight: 600,
                                      '& .MuiChip-label': { px: 1 }
                                    }}
                                  />
                                )}
                              </Box>
                            }
                            secondary={
                              <Typography 
                                variant="caption" 
                                color="text.secondary"
                                sx={{ 
                                  fontSize: '0.75rem', 
                                  lineHeight: 1.3,
                                  fontStyle: 'italic'
                                }}
                              >
                                {feature.description}
                              </Typography>
                            }
                          />
                        </FeatureListItem>
                      ))}
                    </List>
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
        <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6, maxWidth: 700, mx: 'auto' }}>
          Four simple steps to get professional help when you need it most. Our streamlined process ensures rapid response and effective assistance.
        </Typography>

        {/* Enhanced Process Steps with Visual Flow */}
        <Box sx={{ position: 'relative', mt: 6 }}>
          {/* Desktop Flow Line */}
          <Box
            sx={{
              display: { xs: 'none', md: 'block' },
              position: 'absolute',
              top: '50%',
              left: '12.5%',
              right: '12.5%',
              height: 3,
              background: `linear-gradient(90deg, 
                transparent 0%, 
                ${colors.neutral[300]} 10%, 
                ${colors.primary.main} 20%, 
                ${colors.primary.main} 80%, 
                ${colors.neutral[300]} 90%, 
                transparent 100%
              )`,
              zIndex: 0,
              transform: 'translateY(-50%)',
              borderRadius: 1.5,
            }}
          />

          <Grid container spacing={4} sx={{ position: 'relative', zIndex: 1, alignItems: 'stretch' }}>
            {processSteps.map((step, index) => (
              <Grid item xs={12} sm={6} md={3} key={index} sx={{ display: 'flex' }}>
                <Box
                  sx={{
                    position: 'relative',
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  {/* Animated Step Card */}
                  <Paper 
                    sx={{ 
                      p: 4, 
                      textAlign: 'center', 
                      width: '100%',
                      height: '100%',
                      minHeight: { xs: 'auto', md: 480 },
                      borderRadius: 3,
                      position: 'relative',
                      display: 'flex',
                      flexDirection: 'column',
                      background: `linear-gradient(135deg, 
                        ${index % 2 === 0 ? colors.background.default : colors.background.paper} 0%, 
                        ${index % 2 === 0 ? colors.background.paper : colors.background.default} 100%
                      )`,
                      border: '2px solid transparent',
                      backgroundClip: 'padding-box',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      transform: 'translateY(0)',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: `0 20px 40px ${colors.primary.main}25`,
                        borderColor: colors.primary.light,
                        '& .step-number': {
                          transform: 'scale(1.1)',
                          boxShadow: `0 8px 25px ${colors.primary.main}50`,
                        },
                        '& .step-icon': {
                          transform: 'rotate(5deg) scale(1.05)',
                        },
                      },
                    }}
                  >
                    {/* Enhanced Step Number */}
                    <Box
                      className="step-number"
                      sx={{
                        position: 'absolute',
                        top: -25,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 50,
                        height: 50,
                        borderRadius: '50%',
                        background: `linear-gradient(135deg, 
                          ${step.step === 1 ? colors.primary.main : 
                            step.step === 2 ? colors.info.main : 
                            step.step === 3 ? colors.success.main : colors.secondary.main} 0%, 
                          ${step.step === 1 ? colors.primary.dark : 
                            step.step === 2 ? colors.info.dark : 
                            step.step === 3 ? colors.success.dark : colors.secondary.dark} 100%
                        )`,
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.4rem',
                        fontWeight: 'bold',
                        boxShadow: `0 6px 20px ${colors.primary.main}40`,
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        border: `3px solid ${colors.background.default}`,
                      }}
                    >
                      {step.step}
                    </Box>

                    {/* Step Content */}
                    <Box sx={{ mt: 4, flex: 1, display: 'flex', flexDirection: 'column' }}>
                      {/* Dynamic Step Icon */}
                      <Box 
                        className="step-icon"
                        sx={{ 
                          mb: 2,
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        }}
                      >
                        {step.step === 1 && <PhoneIcon sx={{ fontSize: 48, color: colors.primary.main, opacity: 0.8 }} />}
                        {step.step === 2 && <SpeedIcon sx={{ fontSize: 48, color: colors.info.main, opacity: 0.8 }} />}
                        {step.step === 3 && <TechnicianIcon sx={{ fontSize: 48, color: colors.success.main, opacity: 0.8 }} />}
                        {step.step === 4 && <SupportIcon sx={{ fontSize: 48, color: colors.secondary.main, opacity: 0.8 }} />}
                      </Box>

                      <Typography 
                        variant="h6" 
                        gutterBottom 
                        sx={{ 
                          fontWeight: 700, 
                          mb: 2,
                          color: colors.text.primary,
                          fontSize: { xs: '1.1rem', md: '1.25rem' }
                        }}
                      >
                        {step.title}
                      </Typography>
                      
                      <Typography 
                        variant="body2" 
                        color={colors.text.secondary}
                        sx={{ 
                          mb: 3,
                          lineHeight: 1.6,
                          fontSize: '0.95rem'
                        }}
                      >
                        {step.description}
                      </Typography>

                      {/* Enhanced Details List */}
                      <Box 
                        sx={{ 
                          backgroundColor: `${colors.primary.main}08`,
                          borderRadius: 2,
                          p: 2,
                          flex: 1,
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                        }}
                      >
                        {step.details.map((detail, idx) => (
                          <Box
                            key={idx}
                            sx={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              mb: idx === step.details.length - 1 ? 0 : 1.5,
                              transition: 'all 0.2s ease',
                              '&:hover': {
                                transform: 'translateX(4px)',
                              },
                            }}
                          >
                            <CheckIcon 
                              sx={{ 
                                fontSize: '1.1rem', 
                                color: step.step === 1 ? colors.primary.main : 
                                       step.step === 2 ? colors.info.main : 
                                       step.step === 3 ? colors.success.main : colors.secondary.main,
                                mr: 1, 
                                mt: 0.2,
                                flexShrink: 0
                              }} 
                            />
                            <Typography 
                              variant="caption" 
                              sx={{ 
                                fontSize: '0.85rem',
                                lineHeight: 1.4,
                                color: colors.text.secondary,
                                fontWeight: 500
                              }}
                            >
                              {detail}
                            </Typography>
                          </Box>
                        ))}
                      </Box>

                      {/* Step Timing Indicator */}
                      <Box sx={{ mt: 3, pt: 2, borderTop: `1px solid ${colors.neutral[200]}` }}>
                        <Chip
                          label={
                            step.step === 1 ? 'Instant Response' :
                            step.step === 2 ? '5-15 mins' :
                            step.step === 3 ? '30-60 mins' : 'Ongoing'
                          }
                          size="small"
                          variant="outlined"
                          sx={{
                            borderColor: step.step === 1 ? colors.primary.main : 
                                        step.step === 2 ? colors.info.main : 
                                        step.step === 3 ? colors.success.main : colors.secondary.main,
                            color: step.step === 1 ? colors.primary.main : 
                                   step.step === 2 ? colors.info.main : 
                                   step.step === 3 ? colors.success.main : colors.secondary.main,
                            fontWeight: 600,
                            fontSize: '0.75rem',
                          }}
                        />
                      </Box>
                    </Box>
                  </Paper>

                  {/* Mobile Connection Arrow */}
                  {index < processSteps.length - 1 && (
                    <Box
                      sx={{
                        display: { xs: 'block', md: 'none' },
                        mt: 3,
                        mb: 2,
                        width: 2,
                        height: 40,
                        backgroundColor: colors.primary.light,
                        position: 'relative',
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          bottom: -6,
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: 0,
                          height: 0,
                          borderLeft: '6px solid transparent',
                          borderRight: '6px solid transparent',
                          borderTop: '8px solid',
                          borderTopColor: colors.primary.light,
                        },
                      }}
                    />
                  )}
                </Box>
              </Grid>
            ))}
          </Grid>

          {/* Progress Timeline (Mobile) */}
          <Box
            sx={{
              display: { xs: 'block', md: 'none' },
              mt: 4,
              textAlign: 'center',
            }}
          >
            <Typography variant="body2" color={colors.text.secondary} sx={{ mb: 2 }}>
              Average Total Time: 45-90 minutes
            </Typography>
            <Box
              sx={{
                height: 6,
                backgroundColor: colors.neutral[200],
                borderRadius: 3,
                position: 'relative',
                overflow: 'hidden',
                maxWidth: 300,
                mx: 'auto',
              }}
            >
              <Box
                sx={{
                  height: '100%',
                  width: '75%',
                  background: `linear-gradient(90deg, ${colors.primary.main} 0%, ${colors.success.main} 100%)`,
                  borderRadius: 3,
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
                    animation: 'shimmer 2s infinite linear',
                  },
                }}
              />
            </Box>
          </Box>
        </Box>
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
              onClick={handleEmergencyCall}
              color="error"
              sx={{ px: 4, py: 2, borderRadius: 3, textTransform: 'none', fontSize: {xs: '1.0rem', sm: '1.1rem'} }}
            >
              Emergency Hotline
            </Button>
            <Button
              variant="outlined"
              size="large"
              startIcon={<CheckIcon />}
              onClick={handleNavigateToMembershipPage}
              sx={{ px: 4, py: 2, borderRadius: 3, textTransform: 'none', fontSize: {xs: '1.0rem', sm: '1.1rem'} }}
            >
              Become a Member
            </Button>
          </Stack>
        </Paper>
      </Container>

      {/* Call Metrics Display (Development Mode) */}
      {import.meta.env.DEV && (
        <Box sx={{ position: 'fixed', bottom: 16, right: 16, zIndex: 1000 }}>
          <Paper sx={{ p: 2, backgroundColor: 'rgba(0,0,0,0.8)', color: 'white' }}>
            <Typography variant="caption" sx={{ display: 'block' }}>
              📞 Call Metrics:
            </Typography>
            <Typography variant="caption" sx={{ display: 'block' }}>
              Attempts: {callMetrics.emergencyCallAttempts}
            </Typography>
            <Typography variant="caption" sx={{ display: 'block' }}>
              Success: {callMetrics.successfulConnections}
            </Typography>
            <Typography variant="caption" sx={{ display: 'block' }}>
              Last Call: {callMetrics.lastCallTimestamp?.toLocaleTimeString() || 'N/A'}
            </Typography>
          </Paper>
        </Box>
      )}

      {/* Notification Snackbar for User Feedback */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseNotification} 
          severity={notification.severity}
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default RescueServices;

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Grid,
  Stack,
  Chip,
  Divider,
  Card,
  CardContent,
  Avatar,
  useTheme,
} from '@mui/material';
import {
  CheckCircle as CheckIcon,
  Home as HomeIcon,
  Email as EmailIcon,
  Schedule as TimeIcon,
  Assignment as DocumentIcon,
  Phone as PhoneIcon,
  Info as InfoIcon,
  PersonAdd as TeamIcon,
  Celebration as CelebrationIconMui,
} from '@mui/icons-material';
import { styled, keyframes } from '@mui/material/styles';
import { SEO } from '../components/SEO';
import { companyInfo } from '../data/companyData';

// SEO data for success page
const successPageSEO = {
  title: 'IDP Application Submitted Successfully - AA Uganda',
  description: 'Your International Driving Permit application has been successfully submitted to AA Uganda. We will review and process your application within 3-5 working days.',
  keywords: 'IDP application success, international driving permit submitted, AA Uganda, application confirmation',
  ogType: 'website' as const,
  noIndex: true, // Prevent indexing of success pages
};

// Animations
const bounceIn = keyframes`
  0% {
    transform: scale(0.3) translateY(-50px);
    opacity: 0;
  }
  50% {
    transform: scale(1.1);
  }
  70% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1) translateY(0);
    opacity: 1;
  }
`;

const fadeInUp = keyframes`
  0% {
    transform: translateY(30px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

// Styled components
const SuccessContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: `linear-gradient(135deg, 
    ${theme.palette.primary.main}08 0%, 
    ${theme.palette.secondary.main}12 50%, 
    ${theme.palette.primary.main}08 100%)`,
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `radial-gradient(circle at 20% 50%, ${theme.palette.primary.main}06 0%, transparent 50%),
                 radial-gradient(circle at 80% 20%, ${theme.palette.secondary.main}08 0%, transparent 50%),
                 radial-gradient(circle at 40% 80%, ${theme.palette.primary.main}04 0%, transparent 50%)`,
    pointerEvents: 'none',
  },
}));

const SuccessIcon = styled(Avatar)(({ theme }) => ({
  width: 120,
  height: 120,
  background: `linear-gradient(135deg, ${theme.palette.success.main}, ${theme.palette.success.light})`,
  margin: '0 auto 24px auto',
  animation: `${bounceIn} 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)`,
  boxShadow: `0 8px 32px ${theme.palette.success.main}40`,
  '& .MuiSvgIcon-root': {
    fontSize: '3rem',
    color: 'white',
  },
}));

const MainCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: 24,
  textAlign: 'center',
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(20px)',
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: '0 8px 40px rgba(0, 0, 0, 0.12)',
  position: 'relative',
  overflow: 'hidden',
  animation: `${fadeInUp} 0.6s ease-out 0.2s both`,
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

const InfoCard = styled(Card)(({ theme }) => ({
  height: '100%',
  borderRadius: 16,
  border: `1px solid ${theme.palette.divider}`,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  background: 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(10px)',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
    '& .info-icon': {
      transform: 'scale(1.1)',
      background: theme.palette.primary.main,
      color: 'white',
    },
  },
}));

const ActionButton = styled(Button)(() => ({
  borderRadius: 12,
  padding: '12px 32px',
  fontSize: '1rem',
  fontWeight: 600,
  textTransform: 'none',
  boxShadow: 'none',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
  },
}));

const PrimaryActionButton = styled(ActionButton)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
  color: 'white',
  '&:hover': {
    background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
    transform: 'translateY(-2px)',
    boxShadow: `0 8px 25px ${theme.palette.primary.main}40`,
  },
}));

const SecondaryActionButton = styled(ActionButton)(({ theme }) => ({
  background: theme.palette.secondary.main,
  color: theme.palette.primary.main,
  fontWeight: 700,
  '&:hover': {
    background: theme.palette.secondary.light,
    transform: 'translateY(-2px)',
    boxShadow: `0 8px 25px ${theme.palette.secondary.main}40`,
  },
}));

const CelebrationIcon = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: -10,
  right: -10,
  width: 40,
  height: 40,
  borderRadius: '50%',
  background: `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.light})`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  animation: `${pulse} 2s infinite`,
  '& .MuiSvgIcon-root': {
    color: theme.palette.primary.main,
    fontSize: '1.2rem',
  },
}));

interface LocationState {
  applicantName?: string;
  applicationDate?: string;
  email?: string;
}

const IdpApplicationSuccess: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  
  const state = location.state as LocationState;
  const [isVisible, setIsVisible] = useState(false);

  // If no state data, redirect to application page
  useEffect(() => {
    if (!state?.applicantName) {
      navigate('/idp/apply', { replace: true });
      return;
    }
    
    // Trigger animations
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, [navigate, state]);

  const handleGoHome = () => {
    navigate('/', { replace: true });
  };

  const handleContactUs = () => {
    navigate('/contact');
  };

  const infoItems = [
    {
      icon: <TimeIcon />,
      title: 'Processing Time',
      description: '3-5 Working Days',
      detail: 'Our team will review your application and documents',
      color: theme.palette.info.main,
    },
    {
      icon: <EmailIcon />,
      title: 'Email Updates',
      description: 'Check Your Inbox',
      detail: `Updates will be sent to ${state?.email || 'your email'}`,
      color: theme.palette.secondary.main,
    },
    {
      icon: <TeamIcon />,
      title: 'Expert Review',
      description: 'AAU Team Verification',
      detail: 'Experienced professionals will verify your documents',
      color: theme.palette.success.main,
    },
    {
      icon: <PhoneIcon />,
      title: 'Need Help?',
      description: 'Contact Support',
      detail: `Call us at ${companyInfo.contact.phone}`,
      color: theme.palette.primary.main,
    },
  ];

  if (!state?.applicantName) {
    return null; // Will redirect in useEffect
  }

  return (
    <SuccessContainer>
      <SEO seoData={successPageSEO} />
      
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 }, position: 'relative', zIndex: 1 }}>
        <Grid container spacing={4} justifyContent="center">
          {/* Main Success Card */}
          <Grid item xs={12} md={8}>
            <MainCard elevation={0}>
              <CelebrationIcon>
                <CelebrationIconMui />
              </CelebrationIcon>
              
              <SuccessIcon>
                <CheckIcon />
              </SuccessIcon>

              <Typography 
                variant="h3" 
                sx={{ 
                  fontWeight: 800, 
                  mb: 2, 
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontSize: { xs: '2rem', md: '2.5rem' }
                }}
              >
                Application Submitted!
              </Typography>

              <Typography variant="h6" color="text.secondary" sx={{ mb: 3, fontWeight: 500 }}>
                Thank you, <strong>{state.applicantName}</strong>! Your International Driving Permit application has been successfully submitted.
              </Typography>

              <Box sx={{ mb: 4 }}>
                <Chip
                  icon={<DocumentIcon />}
                  label={`Submitted on ${state.applicationDate}`}
                  sx={{
                    px: 2,
                    py: 1,
                    height: 'auto',
                    background: theme.palette.primary.main,
                    color: 'white',
                    fontWeight: 600,
                    '& .MuiChip-icon': {
                      color: 'white',
                    },
                  }}
                />
              </Box>

              <Divider sx={{ my: 3, opacity: 0.3 }} />

              <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.8, color: 'text.secondary' }}>
                Your application is now being reviewed by our experienced team at AA Uganda. 
                We will carefully verify all your documents and process your International Driving Permit.
              </Typography>

              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                justifyContent="center"
                sx={{ mt: 4 }}
              >
                <PrimaryActionButton
                  variant="contained"
                  startIcon={<HomeIcon />}
                  onClick={handleGoHome}
                  size="large"
                >
                  Back to Home
                </PrimaryActionButton>
                
                <SecondaryActionButton
                  variant="contained"
                  startIcon={<PhoneIcon />}
                  onClick={handleContactUs}
                  size="large"
                >
                  Contact Us
                </SecondaryActionButton>
              </Stack>
            </MainCard>
          </Grid>

          {/* Information Cards */}
          <Grid item xs={12}>
            <Typography 
              variant="h5" 
              align="center" 
              sx={{ mb: 4, fontWeight: 700, color: 'text.primary' }}
            >
              What Happens Next?
            </Typography>

            <Grid container spacing={3}>
              {infoItems.map((item, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <InfoCard 
                    elevation={0}
                    sx={{
                      animation: isVisible 
                        ? `${fadeInUp} 0.6s ease-out ${0.4 + index * 0.1}s both`
                        : 'none',
                    }}
                  >
                    <CardContent sx={{ p: 3, '&:last-child': { pb: 3 } }}>
                      <Avatar
                        className="info-icon"
                        sx={{
                          width: 56,
                          height: 56,
                          mb: 2,
                          mx: 'auto',
                          background: `${item.color}15`,
                          color: item.color,
                          transition: 'all 0.3s ease',
                        }}
                      >
                        {item.icon}
                      </Avatar>

                      <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                        {item.title}
                      </Typography>

                      <Typography 
                        variant="subtitle1" 
                        color="primary" 
                        sx={{ mb: 1, fontWeight: 600 }}
                      >
                        {item.description}
                      </Typography>

                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                        {item.detail}
                      </Typography>
                    </CardContent>
                  </InfoCard>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Additional Information */}
          <Grid item xs={12} md={10}>
            <Paper
              sx={{
                p: 4,
                borderRadius: 3,
                background: `linear-gradient(135deg, ${theme.palette.primary.main}08, ${theme.palette.secondary.main}12)`,
                border: `1px solid ${theme.palette.divider}`,
                animation: isVisible ? `${fadeInUp} 0.6s ease-out 0.8s both` : 'none',
              }}
            >
              <Stack direction="row" spacing={2} alignItems="flex-start" sx={{ mb: 2 }}>
                <Avatar
                  sx={{
                    width: 48,
                    height: 48,
                    background: theme.palette.info.main,
                    flexShrink: 0,
                  }}
                >
                  <InfoIcon />
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    Important Information
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.7 }}>
                    • Please ensure your phone and email are accessible as we may need to contact you for additional information
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.7 }}>
                    • Your IDP will be ready for collection at our offices once approved
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.7 }}>
                    • You will receive email notifications at each stage of the process
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                    • For urgent inquiries, please call us at <strong>{companyInfo.contact.phone}</strong>
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </SuccessContainer>
  );
};

export default IdpApplicationSuccess;

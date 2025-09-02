import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  TextField,
  Card,
  CardContent,
  Alert,
  Snackbar,
  CircularProgress,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  InputAdornment,
} from '@mui/material';
import {
  Search as SearchIcon,
  QrCodeScanner as QrCodeIcon,
  Verified as VerifiedIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Security as SecurityIcon,
  Public as PublicIcon,
  Schedule as ScheduleIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { Button, Heading } from '../components/atoms';

const HeroSection = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(12, 0, 8),
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'url("/images/hero-illustration.png") no-repeat center center',
    backgroundSize: 'cover',
    opacity: 0.1,
  },
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  height: '100%',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[8],
  },
}));

const SearchCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: 'center',
  borderRadius: theme.spacing(2),
  background: `linear-gradient(145deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[50]} 100%)`,
}));

const ResultCard = styled(Card)(({ theme }) => ({
  marginTop: theme.spacing(3),
  borderRadius: theme.spacing(2),
  '&.success': {
    borderLeft: `4px solid ${theme.palette.success.main}`,
  },
  '&.error': {
    borderLeft: `4px solid ${theme.palette.error.main}`,
  },
}));

interface VerificationResult {
  status: 'valid' | 'invalid' | 'expired' | 'suspended';
  idpNumber: string;
  holderName?: string;
  issueDate?: string;
  expiryDate?: string;
  licenseNumber?: string;
  countries?: string[];
  type?: string;
}

const VerifyIdp: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const features = [
    {
      icon: <SecurityIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Instant Verification',
      description: 'Real-time validation against secure AA Uganda database'
    },
    {
      icon: <PublicIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Global Recognition',
      description: 'Verify permits recognized in over 150 countries worldwide'
    },
    {
      icon: <CheckCircleIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Fraud Protection',
      description: 'Advanced security features to prevent counterfeiting'
    },
  ];

  const handleSearch = async () => {
    if (!searchValue.trim()) {
      setAlertMessage('Please enter an IDP number to verify');
      setShowAlert(true);
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Mock verification logic
      const mockResult: VerificationResult = {
        status: searchValue.toLowerCase().includes('invalid') ? 'invalid' : 
                searchValue.toLowerCase().includes('expired') ? 'expired' :
                searchValue.toLowerCase().includes('suspended') ? 'suspended' : 'valid',
        idpNumber: searchValue.toUpperCase(),
        holderName: searchValue.toLowerCase().includes('invalid') ? undefined : 'John Doe Mukasa',
        issueDate: '2024-01-15',
        expiryDate: '2025-01-14',
        licenseNumber: 'UG123456789',
        countries: ['Kenya', 'Tanzania', 'Rwanda', 'South Sudan', 'Congo DR'],
        type: '1968 Vienna Convention IDP'
      };
      
      setResult(mockResult);
      setLoading(false);
    }, 2000);
  };

  const handleQrScan = () => {
    setAlertMessage('QR code scanner feature coming soon. Please enter the IDP number manually.');
    setShowAlert(true);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'valid':
        return <CheckCircleIcon sx={{ color: 'success.main', fontSize: 24 }} />;
      case 'invalid':
        return <CancelIcon sx={{ color: 'error.main', fontSize: 24 }} />;
      case 'expired':
        return <ErrorIcon sx={{ color: 'warning.main', fontSize: 24 }} />;
      case 'suspended':
        return <ErrorIcon sx={{ color: 'error.main', fontSize: 24 }} />;
      default:
        return <InfoIcon sx={{ color: 'info.main', fontSize: 24 }} />;
    }
  };

  const getStatusMessage = (status: string) => {
    switch (status) {
      case 'valid':
        return 'This International Driving Permit is valid and authentic.';
      case 'invalid':
        return 'This IDP number is not found in our database. Please verify the number and try again.';
      case 'expired':
        return 'This International Driving Permit has expired and is no longer valid.';
      case 'suspended':
        return 'This International Driving Permit has been suspended and is not currently valid.';
      default:
        return 'Unknown verification status.';
    }
  };

  const getStatusChip = (status: string) => {
    const configs = {
      valid: { label: 'Valid', color: 'success' as const },
      invalid: { label: 'Invalid', color: 'error' as const },
      expired: { label: 'Expired', color: 'warning' as const },
      suspended: { label: 'Suspended', color: 'error' as const },
    };
    
    const config = configs[status as keyof typeof configs] || { label: 'Unknown', color: 'default' as const };
    return <Chip label={config.label} color={config.color} variant="filled" />;
  };

  return (
    <Box>
      {/* Hero Section */}
      <HeroSection>
        <Container maxWidth="lg">
          <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
            <Heading 
              variant="h1" 
              gutterBottom 
              sx={{ 
                color: 'inherit',
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                fontWeight: 700,
                mb: 3
              }}
            >
              Verify International Driving Permit
            </Heading>
            
            <Typography 
              variant="h5" 
              sx={{ 
                color: 'inherit', 
                opacity: 0.9,
                maxWidth: 600,
                mx: 'auto',
                mb: 4,
                lineHeight: 1.6
              }}
            >
              Instantly verify the authenticity of any IDP issued by AA Uganda
            </Typography>

            <Grid container spacing={3} sx={{ mt: 6 }}>
              {features.map((feature, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <FeatureCard sx={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'inherit' }}>
                    <CardContent sx={{ textAlign: 'center', p: 3 }}>
                      {feature.icon}
                      <Typography variant="h6" sx={{ mt: 2, mb: 1, fontWeight: 600 }}>
                        {feature.title}
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.9 }}>
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </FeatureCard>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </HeroSection>

      {/* Verification Section */}
      <Box sx={{ py: 8, backgroundColor: 'grey.50' }}>
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Heading variant="h2" gutterBottom>
              Verify Your IDP
            </Heading>
            <Typography variant="h6" color="text.secondary">
              Enter the IDP number or scan the QR code to verify authenticity
            </Typography>
          </Box>

          <SearchCard>
            <Box sx={{ mb: 3 }}>
              <VerifiedIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                IDP Verification Service
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Secure verification powered by AA Uganda's official database
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, mb: 3, alignItems: 'stretch' }}>
              <TextField
                fullWidth
                label="Enter IDP Number"
                placeholder="e.g., UG2024123456789"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleQrScan} edge="end">
                        <QrCodeIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  }
                }}
              />
              
              <Button
                variant="contained"
                color="primary"
                onClick={handleSearch}
                disabled={loading}
                startIcon={loading ? <CircularProgress size={16} /> : <SearchIcon />}
                sx={{ 
                  minWidth: 140,
                  borderRadius: 2,
                  height: '56px'
                }}
              >
                {loading ? 'Verifying...' : 'Verify'}
              </Button>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
              <Button
                variant="outlined"
                size="small"
                startIcon={<QrCodeIcon />}
                onClick={handleQrScan}
              >
                Scan QR Code
              </Button>
              
              <Button
                variant="text"
                size="small"
                onClick={() => setSearchValue('UG2024SAMPLE123')}
              >
                Try Sample: UG2024SAMPLE123
              </Button>
            </Box>
          </SearchCard>

          {/* Verification Result */}
          {result && (
            <ResultCard className={result.status === 'valid' ? 'success' : 'error'}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  {getStatusIcon(result.status)}
                  <Box sx={{ ml: 2, flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Verification Result
                      </Typography>
                      {getStatusChip(result.status)}
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {getStatusMessage(result.status)}
                    </Typography>
                  </Box>
                </Box>

                {result.status === 'valid' && result.holderName && (
                  <>
                    <Divider sx={{ my: 3 }} />
                    
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <List dense>
                          <ListItem>
                            <ListItemIcon>
                              <PersonIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText
                              primary="Permit Holder"
                              secondary={result.holderName}
                            />
                          </ListItem>
                          
                          <ListItem>
                            <ListItemIcon>
                              <InfoIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText
                              primary="IDP Number"
                              secondary={result.idpNumber}
                            />
                          </ListItem>
                          
                          <ListItem>
                            <ListItemIcon>
                              <ScheduleIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText
                              primary="Valid Until"
                              secondary={new Date(result.expiryDate!).toLocaleDateString()}
                            />
                          </ListItem>
                        </List>
                      </Grid>
                      
                      <Grid item xs={12} md={6}>
                        <List dense>
                          <ListItem>
                            <ListItemIcon>
                              <InfoIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText
                              primary="Permit Type"
                              secondary={result.type}
                            />
                          </ListItem>
                          
                          <ListItem>
                            <ListItemIcon>
                              <SecurityIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText
                              primary="License Number"
                              secondary={result.licenseNumber}
                            />
                          </ListItem>
                          
                          <ListItem>
                            <ListItemIcon>
                              <PublicIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText
                              primary="Valid Countries"
                              secondary={`${result.countries?.length || 0} countries covered`}
                            />
                          </ListItem>
                        </List>
                      </Grid>
                    </Grid>

                    {result.countries && result.countries.length > 0 && (
                      <>
                        <Divider sx={{ my: 3 }} />
                        <Box>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
                            Sample Valid Countries:
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                            {result.countries.slice(0, 5).map((country, index) => (
                              <Chip 
                                key={index} 
                                label={country} 
                                size="small" 
                                variant="outlined"
                                color="primary"
                              />
                            ))}
                            <Chip 
                              label="+ 145 more countries" 
                              size="small" 
                              variant="outlined"
                              color="secondary"
                            />
                          </Box>
                        </Box>
                      </>
                    )}
                  </>
                )}
              </CardContent>
            </ResultCard>
          )}
        </Container>
      </Box>

      {/* Information Section */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ p: 4 }}>
                  <SecurityIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                    Why Verify an IDP?
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircleIcon color="success" />
                      </ListItemIcon>
                      <ListItemText primary="Confirm authenticity before accepting" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircleIcon color="success" />
                      </ListItemIcon>
                      <ListItemText primary="Prevent fraud and legal issues" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircleIcon color="success" />
                      </ListItemIcon>
                      <ListItemText primary="Ensure valid coverage for travel dates" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircleIcon color="success" />
                      </ListItemIcon>
                      <ListItemText primary="Verify permit is not expired or suspended" />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ p: 4 }}>
                  <InfoIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                    Verification Features
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircleIcon color="success" />
                      </ListItemIcon>
                      <ListItemText primary="Real-time database lookup" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircleIcon color="success" />
                      </ListItemIcon>
                      <ListItemText primary="QR code scanning capability" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircleIcon color="success" />
                      </ListItemIcon>
                      <ListItemText primary="Detailed permit information" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircleIcon color="success" />
                      </ListItemIcon>
                      <ListItemText primary="Mobile-friendly interface" />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Alert Snackbar */}
      <Snackbar
        open={showAlert}
        autoHideDuration={6000}
        onClose={() => setShowAlert(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setShowAlert(false)} 
          severity="info"
          sx={{ width: '100%' }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default VerifyIdp;

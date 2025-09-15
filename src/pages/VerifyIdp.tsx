import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  TextField,
  Card,
  CardContent,
  CircularProgress,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Search as SearchIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Security as SecurityIcon,
  Public as PublicIcon,
  Schedule as ScheduleIcon,
  Person as PersonIcon,
  DriveEta as DriveEtaIcon,
  VerifiedUser as VerifiedUserIcon,
  Language as LanguageIcon,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { Button, Heading, AlertNotification } from "../components/atoms";
import { PageHeader } from "../components/molecules";
import { SEO } from "../components/SEO";
import { verifyIdpSEO } from "../data/seoData";
import theme from "../theme";
import { useForm } from "react-hook-form";
import { useVerifyIdp } from "../hooks/useVerifyIdp";

const FeatureCard = styled(Card)(({ theme }) => ({
  height: "100%",
  transition: "all 0.3s ease-in-out",
  border: "1px solid",
  borderColor: theme.palette.grey[200],
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: theme.shadows[12],
    borderColor: theme.palette.primary.main,
    "& .feature-icon": {
      transform: "scale(1.1)",
      color: theme.palette.primary.main,
    },
  },
}));

const SearchCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(6),
  textAlign: "center",
  borderRadius: theme.spacing(3),
  background: `linear-gradient(145deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[50]} 100%)`,
  border: "1px solid",
  borderColor: theme.palette.grey[200],
  boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
  "&:hover": {
    boxShadow: "0 12px 48px rgba(0,0,0,0.12)",
    transform: "translateY(-2px)",
  },
  transition: "all 0.3s ease-in-out",
}));

const ResultCard = styled(Card)(({ theme }) => ({
  marginTop: theme.spacing(3),
  borderRadius: theme.spacing(2),
  "&.success": {
    borderLeft: `4px solid ${theme.palette.success.main}`,
  },
  "&.error": {
    borderLeft: `4px solid ${theme.palette.error.main}`,
  },
}));

const iconMap = {
  SecurityIcon: <SecurityIcon sx={{ fontSize: 40, color: "primary.main" }} className="feature-icon" />,
  VerifiedUserIcon: <VerifiedUserIcon sx={{ fontSize: 40, color: "primary.main" }} className="feature-icon" />,
  LanguageIcon: <LanguageIcon sx={{ fontSize: 40, color: "primary.main" }} className="feature-icon" />,
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "valid":
      return <CheckCircleIcon sx={{ color: "success.dark", fontSize: 24 }} />;
    case "invalid":
      return <CancelIcon sx={{ color: "error.main", fontSize: 24 }} />;
    case "expired":
      return <ErrorIcon sx={{ color: "warning.main", fontSize: 24 }} />;
    case "suspended":
      return <ErrorIcon sx={{ color: "error.main", fontSize: 24 }} />;
    default:
      return <InfoIcon sx={{ color: "info.main", fontSize: 24 }} />;
  }
};



const getStatusChip = (status: string) => {
  const configs = {
    valid: { label: "Valid", color: "success" as const },
    invalid: { label: "Invalid", color: "error" as const },
    expired: { label: "Expired", color: "warning" as const },
    suspended: { label: "Suspended", color: "error" as const },
  };
  const config = configs[status as keyof typeof configs] || {
    label: "Unknown",
    color: "default" as const,
  };
  return <Chip label={config.label} color={config.color} variant="filled" />;
};

// Helper function to calculate days remaining until expiry
const calculateDaysRemaining = (expiryDate: string): number => {
  const today = new Date();
  const expiry = new Date(expiryDate);
  const diffTime = expiry.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

// Helper function to get expiry status and styling
const getExpiryStatus = (expiryDate: string) => {
  const daysRemaining = calculateDaysRemaining(expiryDate);
  
  if (daysRemaining < 0) {
    return {
      status: 'expired',
      daysRemaining,
      color: 'error',
      bgColor: 'error.50',
      borderColor: 'error.200',
      icon: <ErrorIcon color="error" sx={{ mr: 1, fontSize: 20 }} />,
      message: `Expired ${Math.abs(daysRemaining)} day${Math.abs(daysRemaining) !== 1 ? 's' : ''} ago`
    };
  } else if (daysRemaining === 0) {
    return {
      status: 'expires-today',
      daysRemaining,
      color: 'error',
      bgColor: 'error.50',
      borderColor: 'error.200',
      icon: <ErrorIcon color="error" sx={{ mr: 1, fontSize: 20 }} />,
      message: 'Expires today'
    };
  } else if (daysRemaining <= 30) {
    return {
      status: 'expires-soon',
      daysRemaining,
      color: 'warning',
      bgColor: 'warning.50',
      borderColor: 'warning.200',
      icon: <ErrorIcon color="warning" sx={{ mr: 1, fontSize: 20 }} />,
      message: `Expires in ${daysRemaining} day${daysRemaining !== 1 ? 's' : ''}`
    };
  } else {
    return {
      status: 'valid',
      daysRemaining,
      color: 'success',
      bgColor: 'background.paper',
      borderColor: 'grey.200',
      icon: <ScheduleIcon color="primary" sx={{ mr: 1, fontSize: 20 }} />,
      message: `Valid for ${daysRemaining} more day${daysRemaining !== 1 ? 's' : ''}`
    };
  }
};

const VerifyIdp: React.FC = () => {
  const {
    searchValue,
    setSearchValue,
    loading,
    result,
    showAlert,
    setShowAlert,
    alertMessage,
    handleSearch,
    features,
    getTestCases,
    navigate,
    config,
  } = useVerifyIdp();
  const { handleSubmit, register, setValue } = useForm<{ idpNumber: string }>({
    defaultValues: { idpNumber: searchValue },
  });

  // Keep searchValue in sync with form
  React.useEffect(() => {
    setValue("idpNumber", searchValue);
  }, [searchValue, setValue]);

  // Add keyframes animations for enhanced visual effects
  React.useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      @keyframes slideStripe {
        0% { background-position: 0% 0%; }
        100% { background-position: 300% 0%; }
      }
      
      @keyframes pulse {
        0%, 100% { 
          transform: scale(1);
          opacity: 1;
        }
        50% { 
          transform: scale(1.05);
          opacity: 0.9;
        }
      }
      
      @keyframes glow {
        0%, 100% { 
          box-shadow: 0 0 5px rgba(211, 47, 47, 0.5);
        }
        50% { 
          box-shadow: 0 0 20px rgba(211, 47, 47, 0.8), 0 0 30px rgba(211, 47, 47, 0.6);
        }
      }
      
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `;
    document.head.appendChild(styleElement);
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  const onSubmit = (data: { idpNumber: string }) => {
    setSearchValue(data.idpNumber);
    handleSearch(data.idpNumber);
  };

  return (
    <Box>
      <SEO seoData={verifyIdpSEO} />
      {/* Page Header */}
      <PageHeader
        title="Verify International Driving Permit"
        subtitle="Instantly verify the authenticity of any IDP issued by Automobile Association of Uganda. Official verification service powered by AA Uganda's secure database since 1955"
      />

      {/* Verification Section */}
      <Box sx={{ py: 8, backgroundColor: "background.paper" }}>
        <Container maxWidth="md">
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Heading variant="h2" align="center" gutterBottom>
              IDP Verification Service
            </Heading>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
              Enter your IDP number to verify authenticity and validity
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Powered by AA Uganda's official database - serving motorists since
              1955
            </Typography>
          </Box>

          <SearchCard>
            <Box sx={{ mb: 4 }}>
              <DriveEtaIcon
                sx={{ fontSize: 56, color: "primary.main", mb: 2 }}
              />
              <Typography
                variant="h4"
                sx={{ fontWeight: 700, mb: 2, color: "primary.main" }}
              >
                Official AA Uganda IDP Verification
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                Automobile Association of Uganda • Plot 4 Old Portbell Road
                Suite 8
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Phone: {config.company.contactNumber} • Email: {config.company.email}
              </Typography>
            </Box>

            <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", gap: 16, marginBottom: 32, alignItems: "stretch" }}>
              <TextField
                fullWidth
                label="Enter IDP Number"
                placeholder="e.g., 00023"
                {...register("idpNumber")}
                type="number"
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                    height: "60px",
                    fontSize: "1.1rem",
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "primary.main",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    fontSize: "1.1rem",
                  },
                }}
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={loading}
                startIcon={
                  loading ? <CircularProgress size={20} /> : <SearchIcon />
                }
                sx={{
                  minWidth: 160,
                  borderRadius: 3,
                  height: "60px",
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  boxShadow: 3,
                  "&:hover": {
                    boxShadow: 6,
                    transform: "translateY(-2px)",
                  },
                  transition: "all 0.3s ease-in-out",
                }}
              >
                {loading ? "Verifying..." : "Verify IDP"}
              </Button>
            </form>

            <Box
              sx={{
                mt: 4,
                p: 3,
                backgroundColor: "primary.50",
                borderRadius: 2,
              }}
            >
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textAlign: "center" }}
              >
                <strong>Important:</strong> Only genuine and valid Ugandan IDPs
                issued by AA Uganda can be verified through this system. IDPs
                must be issued to holders of valid Ugandan driving permits (not
                provisional permits).
              </Typography>
            </Box>
          </SearchCard>

          {/* Verification Result */}
          {result && (
            <ResultCard
              className={result.idp_available ? "success" : "error"}
              sx={{ 
                mt: 4, 
                boxShadow: result.idp_available ? '0 8px 32px rgba(76, 175, 80, 0.15)' : '0 8px 32px rgba(211, 47, 47, 0.15)',
                border: result.idp_available ? '2px solid rgba(76, 175, 80, 0.2)' : '2px solid rgba(211, 47, 47, 0.2)',
                borderRadius: 3,
                overflow: 'hidden'
              }}
            >
              {/* Header Section */}
              {(() => {
                const expiryInfo = result.idp_available ? getExpiryStatus(result.expirydate) : null;
                const isExpiredOrExpiring = expiryInfo && (expiryInfo.status === 'expired' || expiryInfo.status === 'expires-today');
                
                return (
                  <Box
                    sx={{
                      background: result.idp_available 
                        ? isExpiredOrExpiring
                          ? 'linear-gradient(135deg, #D32F2F 0%, #EF5350 100%)'
                          : expiryInfo?.status === 'expires-soon'
                            ? 'linear-gradient(135deg, #FF9800 0%, #FFB74D 100%)'
                            : 'linear-gradient(135deg, #4CAF50 0%, #81C784 100%)'
                        : 'linear-gradient(135deg, #D32F2F 0%, #EF5350 100%)',
                      color: 'white',
                      p: 3,
                      textAlign: 'center'
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                      {result.idp_available 
                        ? isExpiredOrExpiring 
                          ? getStatusIcon('expired')
                          : expiryInfo?.status === 'expires-soon'
                            ? getStatusIcon('expired')
                            : getStatusIcon('valid')
                        : getStatusIcon('invalid')
                      }
                      <Typography variant="h5" sx={{ fontWeight: 700, ml: 2 }}>
                        {result.idp_available 
                          ? isExpiredOrExpiring
                            ? 'IDP Found but Expired'
                            : expiryInfo?.status === 'expires-soon'
                              ? 'IDP Expires Soon'
                              : 'IDP Verified Successfully'
                          : 'IDP Not Found'
                        }
                      </Typography>
                    </Box>
                    {result.idp_available 
                      ? isExpiredOrExpiring
                        ? getStatusChip('expired')
                        : expiryInfo?.status === 'expires-soon'
                          ? getStatusChip('expired')
                          : getStatusChip('valid')
                      : getStatusChip('invalid')
                    }
                    <Typography variant="body2" sx={{ mt: 2, opacity: 0.9 }}>
                      {result.idp_available 
                        ? isExpiredOrExpiring
                          ? 'This International Driving Permit has expired and is no longer valid for international driving. Please renew at AA Uganda.'
                          : expiryInfo?.status === 'expires-soon'
                            ? `This International Driving Permit expires in ${expiryInfo.daysRemaining} day${expiryInfo.daysRemaining !== 1 ? 's' : ''}. Please consider renewing soon.`
                            : 'This International Driving Permit is valid and authentic, issued by Automobile Association of Uganda.'
                        : 'This IDP number is not found in the AA Uganda database. Please verify the number and try again.'
                      }
                    </Typography>
                  </Box>
                );
              })()}

              {result.idp_available && (
                <CardContent sx={{ p: 0 }}>
                  {/* Main Content Section */}
                  <Box sx={{ p: 4 }}>
                    <Grid container spacing={4}>
                      {/* Photo and Basic Info */}
                      <Grid item xs={12} md={4}>
                        <Box
                          sx={{
                            textAlign: 'center',
                            p: 3,
                            backgroundColor: 'grey.50',
                            borderRadius: 2,
                            border: '1px solid',
                            borderColor: 'grey.200'
                          }}
                        >
                          {/* Photo Section */}
                          <Box
                            sx={{
                              width: 150,
                              height: 150,
                              mx: 'auto',
                              mb: 3,
                              borderRadius: 2,
                              overflow: 'hidden',
                              border: '3px solid',
                              borderColor: 'primary.main',
                              boxShadow: 3,
                              backgroundColor: 'white',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            {result.pp_photo ? (
                              <img
                                src={`/models/${result.pp_photo}`}
                                alt="Passport Photo"
                                style={{
                                  width: '100%',
                                  height: '100%',
                                  objectFit: 'cover'
                                }}
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = 'none';
                                  target.nextElementSibling?.removeAttribute('style');
                                }}
                              />
                            ) : null}
                            <PersonIcon 
                              sx={{ 
                                fontSize: 80, 
                                color: 'grey.400',
                                display: result.pp_photo ? 'none' : 'block'
                              }} 
                            />
                          </Box>
                          
                          {/* Name */}
                          <Typography 
                            variant="h6" 
                            sx={{ 
                              fontWeight: 700, 
                              color: 'primary.main',
                              mb: 1,
                              textTransform: 'capitalize'
                            }}
                          >
                            {`${result.onames.toLowerCase()} ${result.surname.toLowerCase()}`}
                          </Typography>
                          
                          {/* IDP Number Badge */}
                          <Box
                            sx={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              backgroundColor: 'primary.main',
                              color: 'white',
                              px: 2,
                              py: 1,
                              borderRadius: 2,
                              fontWeight: 600
                            }}
                          >
                            <SecurityIcon sx={{ fontSize: 18, mr: 1 }} />
                            IDP #{result.id}
                          </Box>
                        </Box>
                      </Grid>

                      {/* Permit Details */}
                      <Grid item xs={12} md={8}>
                        <Box sx={{ pl: { md: 2 } }}>
                          <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, color: 'primary.main' }}>
                            Permit Details
                          </Typography>
                          
                          <Grid container spacing={3} sx={{ alignItems: 'stretch' }}>
                            {/* Issue Date */}
                            <Grid item xs={12} sm={6}>
                              <Box
                                sx={{
                                  p: 2.5,
                                  border: '1px solid',
                                  borderColor: 'grey.200',
                                  borderRadius: 3,
                                  backgroundColor: 'background.paper',
                                  height: '100%',
                                  display: 'flex',
                                  flexDirection: 'column',
                                  minHeight: '140px',
                                  transition: 'all 0.3s ease-in-out',
                                  '&:hover': {
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                    transform: 'scale(1.01)',
                                    borderColor: 'primary.main'
                                  }
                                }}
                              >
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                  <ScheduleIcon color="primary" sx={{ mr: 1, fontSize: 20 }} />
                                  <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 500 }}>
                                    Issue Date
                                  </Typography>
                                </Box>
                                <Typography variant="body1" sx={{ fontWeight: 600, mt: 'auto' }}>
                                  {new Date(result.issuedate).toLocaleDateString('en-GB', {
                                    day: '2-digit',
                                    month: 'long',
                                    year: 'numeric'
                                  })}
                                </Typography>
                              </Box>
                            </Grid>

                            {/* Expiry Date */}
                            <Grid item xs={12} sm={6}>
                              {(() => {
                                const expiryInfo = getExpiryStatus(result.expirydate);
                                const isExpiredOrCritical = expiryInfo.status === 'expired' || expiryInfo.status === 'expires-today';
                                const isExpiringSoon = expiryInfo.status === 'expires-soon';
                                
                                return (
                                  <Box
                                    sx={{
                                      p: 2.5,
                                      border: '2px solid',
                                      borderColor: expiryInfo.borderColor,
                                      borderRadius: 3,
                                      backgroundColor: expiryInfo.bgColor,
                                      position: 'relative',
                                      overflow: 'hidden',
                                      minHeight: isExpiredOrCritical ? '280px' : isExpiringSoon ? '220px' : '140px',
                                      display: 'flex',
                                      flexDirection: 'column',
                                      transition: 'all 0.3s ease-in-out',
                                      ...(expiryInfo.status !== 'valid' && {
                                        boxShadow: isExpiredOrCritical 
                                          ? `0 8px 24px rgba(211, 47, 47, 0.25), 0 4px 12px rgba(211, 47, 47, 0.15)`
                                          : `0 6px 18px rgba(255, 152, 0, 0.2), 0 3px 9px rgba(255, 152, 0, 0.1)`,
                                        transform: isExpiredOrCritical ? 'scale(1.03)' : 'scale(1.02)',
                                        zIndex: isExpiredOrCritical ? 3 : 2
                                      }),
                                      '&:hover': {
                                        transform: expiryInfo.status !== 'valid' 
                                          ? isExpiredOrCritical ? 'scale(1.04)' : 'scale(1.03)'
                                          : 'scale(1.01)',
                                        boxShadow: expiryInfo.status !== 'valid'
                                          ? isExpiredOrCritical
                                            ? `0 12px 32px rgba(211, 47, 47, 0.3), 0 6px 16px rgba(211, 47, 47, 0.2)`
                                            : `0 8px 24px rgba(255, 152, 0, 0.25), 0 4px 12px rgba(255, 152, 0, 0.15)`
                                          : `0 4px 12px rgba(0,0,0,0.1)`
                                      }
                                    }}
                                  >
                                    {/* Animated warning stripe for expired/expiring soon */}
                                    {(isExpiredOrCritical || isExpiringSoon) && (
                                      <Box
                                        sx={{
                                          position: 'absolute',
                                          top: 0,
                                          left: 0,
                                          right: 0,
                                          height: isExpiredOrCritical ? '6px' : '4px',
                                          background: isExpiredOrCritical
                                            ? 'linear-gradient(90deg, #D32F2F 0%, #EF5350 25%, #FF5722 50%, #EF5350 75%, #D32F2F 100%)'
                                            : 'linear-gradient(90deg, #FF9800 0%, #FFB74D 25%, #FFC107 50%, #FFB74D 75%, #FF9800 100%)',
                                          backgroundSize: '300% 100%',
                                          animation: `slideStripe ${isExpiredOrCritical ? '1.5s' : '2s'} linear infinite`,
                                          '&::after': isExpiredOrCritical ? {
                                            content: '""',
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
                                            animation: 'slideStripe 3s linear infinite reverse'
                                          } : {}
                                        }}
                                      />
                                    )}
                                    
                                    {/* Header Section */}
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, flexShrink: 0 }}>
                                      <Box sx={{ display: 'flex', alignItems: 'center', mr: 'auto' }}>
                                        {expiryInfo.icon}
                                        <Typography 
                                          variant="subtitle2" 
                                          sx={{ 
                                            color: expiryInfo.status !== 'valid' ? `${expiryInfo.color}.dark` : 'text.secondary',
                                            fontWeight: expiryInfo.status !== 'valid' ? 700 : 500,
                                            fontSize: isExpiredOrCritical ? '0.9rem' : '0.8rem'
                                          }}
                                        >
                                          Expiry Date
                                        </Typography>
                                      </Box>
                                      
                                      {/* Status Chips */}
                                      {isExpiredOrCritical && (
                                        <Chip 
                                          label="EXPIRED" 
                                          size="small" 
                                          color="error" 
                                          sx={{ 
                                            fontSize: '0.7rem', 
                                            fontWeight: 800,
                                            height: 24,
                                            '& .MuiChip-label': {
                                              px: 1.5
                                            },
                                            animation: 'pulse 2s infinite'
                                          }}
                                        />
                                      )}
                                      {isExpiringSoon && (
                                        <Chip 
                                          label="EXPIRES SOON" 
                                          size="small" 
                                          color="warning" 
                                          sx={{ 
                                            fontSize: '0.65rem', 
                                            fontWeight: 700,
                                            height: 22,
                                            '& .MuiChip-label': {
                                              px: 1.2
                                            }
                                          }}
                                        />
                                      )}
                                    </Box>
                                    
                                    {/* Date Display */}
                                    <Typography 
                                      variant={isExpiredOrCritical ? "h6" : "body1"}
                                      sx={{ 
                                        fontWeight: isExpiredOrCritical ? 700 : 600,
                                        color: expiryInfo.status !== 'valid' ? `${expiryInfo.color}.dark` : 'text.primary',
                                        mb: 1.5,
                                        fontSize: isExpiredOrCritical ? '1.1rem' : '1rem'
                                      }}
                                    >
                                      {new Date(result.expirydate).toLocaleDateString('en-GB', {
                                        day: '2-digit',
                                        month: 'long',
                                        year: 'numeric'
                                      })}
                                    </Typography>
                                    
                                    {/* Status Message */}
                                    <Typography 
                                      variant="body2" 
                                      sx={{ 
                                        display: 'block',
                                        color: expiryInfo.status !== 'valid' ? `${expiryInfo.color}.dark` : 'text.secondary',
                                        fontWeight: expiryInfo.status !== 'valid' ? 600 : 400,
                                        fontSize: isExpiredOrCritical ? '0.85rem' : '0.75rem',
                                        mb: 2,
                                        flexGrow: isExpiredOrCritical ? 0 : 1
                                      }}
                                    >
                                      {expiryInfo.message}
                                    </Typography>
                                    
                                    {/* Enhanced Renewal Section for Expired/Critical */}
                                    {(isExpiredOrCritical || isExpiringSoon) && (
                                      <Box
                                        sx={{
                                          mt: 'auto',
                                          p: isExpiredOrCritical ? 2.5 : 2,
                                          background: isExpiredOrCritical 
                                            ? 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,245,245,0.95) 100%)'
                                            : 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,252,245,0.9) 100%)',
                                          borderRadius: 2,
                                          border: '2px solid',
                                          borderColor: expiryInfo.color === 'error' ? 'error.300' : 'warning.300',
                                          boxShadow: isExpiredOrCritical 
                                            ? 'inset 0 2px 8px rgba(211, 47, 47, 0.1)'
                                            : 'inset 0 2px 8px rgba(255, 152, 0, 0.1)',
                                          position: 'relative',
                                          overflow: 'hidden'
                                        }}
                                      >
                                        {/* Urgent indicator for expired */}
                                        {isExpiredOrCritical && (
                                          <Box
                                            sx={{
                                              position: 'absolute',
                                              top: -1,
                                              left: -1,
                                              right: -1,
                                              height: '3px',
                                              background: 'linear-gradient(90deg, #D32F2F 0%, #FF5722 50%, #D32F2F 100%)',
                                              animation: 'slideStripe 1s linear infinite'
                                            }}
                                          />
                                        )}
                                        
                                        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1.5 }}>
                                          <Typography 
                                            variant="body2" 
                                            sx={{ 
                                              fontSize: isExpiredOrCritical ? '0.9rem' : '0.8rem',
                                              fontWeight: 700,
                                              color: expiryInfo.color === 'error' ? 'error.dark' : 'warning.dark',
                                              display: 'flex',
                                              alignItems: 'center',
                                              gap: 1
                                            }}
                                          >
                                            {isExpiredOrCritical ? '🚨' : '⚠️'} 
                                            {isExpiredOrCritical ? 'URGENT: Renewal Required' : 'Renewal Recommended'}
                                          </Typography>
                                        </Box>
                                        
                                        <Typography 
                                          variant="caption" 
                                          sx={{ 
                                            fontSize: isExpiredOrCritical ? '0.75rem' : '0.7rem',
                                            fontWeight: 500,
                                            color: 'text.primary',
                                            display: 'block',
                                            lineHeight: 1.4,
                                            mb: isExpiredOrCritical ? 1.5 : 1
                                          }}
                                        >
                                          {isExpiredOrCritical 
                                            ? 'This IDP has expired and cannot be used for international driving. Immediate renewal is required.'
                                            : 'IDPs are valid for exactly 1 year. Consider renewing soon to avoid travel disruptions.'
                                          }
                                        </Typography>
                                        
                                        {/* Quick Action Info */}
                                        {isExpiredOrCritical && (
                                          <Box
                                            sx={{
                                              mt: 1.5,
                                              p: 1.5,
                                              backgroundColor: 'rgba(211, 47, 47, 0.05)',
                                              borderRadius: 1,
                                              border: '1px dashed',
                                              borderColor: 'error.200'
                                            }}
                                          >
                                            <Typography 
                                              variant="caption" 
                                              sx={{ 
                                                fontSize: '0.7rem',
                                                fontWeight: 600,
                                                color: 'error.dark',
                                                display: 'block',
                                                mb: 0.5
                                              }}
                                            >
                                              📍 Renew at AA Uganda:
                                            </Typography>
                                            <Typography variant="caption" sx={{ fontSize: '0.65rem', color: 'text.secondary', display: 'block' }}>
                                              Plot 4 Old Portbell Road Suite 8, Kampala • {config.company.contactNumber}
                                            </Typography>
                                          </Box>
                                        )}
                                      </Box>
                                    )}
                                  </Box>
                                );
                              })()}
                            </Grid>

                            {/* Passport Number */}
                            <Grid item xs={12} sm={6}>
                              <Box
                                sx={{
                                  p: 2.5,
                                  border: '1px solid',
                                  borderColor: 'grey.200',
                                  borderRadius: 3,
                                  backgroundColor: 'background.paper',
                                  height: '100%',
                                  display: 'flex',
                                  flexDirection: 'column',
                                  minHeight: '140px',
                                  transition: 'all 0.3s ease-in-out',
                                  '&:hover': {
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                    transform: 'scale(1.01)',
                                    borderColor: 'primary.main'
                                  }
                                }}
                              >
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                  <PublicIcon color="primary" sx={{ mr: 1, fontSize: 20 }} />
                                  <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 500 }}>
                                    Passport Number
                                  </Typography>
                                </Box>
                                <Typography 
                                  variant="body1" 
                                  sx={{ 
                                    fontWeight: 600, 
                                    fontFamily: 'monospace',
                                    mt: 'auto',
                                    fontSize: '1.1rem',
                                    letterSpacing: '0.5px'
                                  }}
                                >
                                  {result.passport}
                                </Typography>
                              </Box>
                            </Grid>

                            {/* License Classes */}
                            <Grid item xs={12} sm={6}>
                              <Box
                                sx={{
                                  p: 2.5,
                                  border: '1px solid',
                                  borderColor: 'grey.200',
                                  borderRadius: 3,
                                  backgroundColor: 'background.paper',
                                  height: '100%',
                                  display: 'flex',
                                  flexDirection: 'column',
                                  minHeight: '140px',
                                  transition: 'all 0.3s ease-in-out',
                                  '&:hover': {
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                    transform: 'scale(1.01)',
                                    borderColor: 'primary.main'
                                  }
                                }}
                              >
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                  <DriveEtaIcon color="primary" sx={{ mr: 1, fontSize: 20 }} />
                                  <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 500 }}>
                                    License Classes
                                  </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 'auto' }}>
                                  {result.classes.split(',').map((cls, index) => (
                                    <Chip
                                      key={index}
                                      label={`Class ${cls.trim()}`}
                                      size="small"
                                      color="primary"
                                      variant="outlined"
                                      sx={{ 
                                        fontWeight: 600,
                                        '&:hover': {
                                          backgroundColor: 'primary.50',
                                          transform: 'scale(1.05)'
                                        },
                                        transition: 'all 0.2s ease-in-out'
                                      }}
                                    />
                                  ))}
                                </Box>
                              </Box>
                            </Grid>
                          </Grid>

                          {/* Validity Status */}
                          {(() => {
                            const expiryInfo = getExpiryStatus(result.expirydate);
                            const isExpiredOrExpiring = expiryInfo.status === 'expired' || expiryInfo.status === 'expires-today';
                            const isExpiringSoon = expiryInfo.status === 'expires-soon';
                            
                            return (
                              <Box
                                sx={{
                                  mt: 3,
                                  p: 3,
                                  backgroundColor: isExpiredOrExpiring 
                                    ? 'error.50' 
                                    : isExpiringSoon 
                                      ? 'warning.50' 
                                      : 'success.50',
                                  borderRadius: 2,
                                  border: '2px solid',
                                  borderColor: isExpiredOrExpiring 
                                    ? 'error.200' 
                                    : isExpiringSoon 
                                      ? 'warning.200' 
                                      : 'success.200'
                                }}
                              >
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                  {isExpiredOrExpiring ? (
                                    <ErrorIcon color="error" sx={{ mr: 1 }} />
                                  ) : isExpiringSoon ? (
                                    <ErrorIcon color="warning" sx={{ mr: 1 }} />
                                  ) : (
                                    <VerifiedUserIcon color="success" sx={{ mr: 1 }} />
                                  )}
                                  <Typography 
                                    variant="h6" 
                                    sx={{ 
                                      fontWeight: 600, 
                                      color: isExpiredOrExpiring 
                                        ? 'error.dark' 
                                        : isExpiringSoon 
                                          ? 'warning.dark' 
                                          : 'success.dark' 
                                    }}
                                  >
                                    {isExpiredOrExpiring 
                                      ? 'Expired IDP - Renewal Required'
                                      : isExpiringSoon 
                                        ? 'Expires Soon - Consider Renewal'
                                        : 'Official Verification'
                                    }
                                  </Typography>
                                </Box>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                  {isExpiredOrExpiring 
                                    ? 'This IDP has expired and is no longer valid for international driving. You must renew your IDP at AA Uganda before traveling internationally.'
                                    : isExpiringSoon 
                                      ? `This IDP expires in ${expiryInfo.daysRemaining} day${expiryInfo.daysRemaining !== 1 ? 's' : ''}. We recommend renewing your IDP soon to avoid travel disruptions.`
                                      : 'This IDP has been verified against the official AA Uganda database. It is valid for international driving in 150+ countries under the 1968 Vienna Convention.'
                                  }
                                </Typography>
                                
                                {(isExpiredOrExpiring || isExpiringSoon) && (
                                  <Box
                                    sx={{
                                      p: 2,
                                      backgroundColor: 'rgba(255,255,255,0.8)',
                                      borderRadius: 1,
                                      border: '1px dashed',
                                      borderColor: isExpiredOrExpiring ? 'error.300' : 'warning.300'
                                    }}
                                  >
                                    <Typography 
                                      variant="body2" 
                                      sx={{ 
                                        fontWeight: 600,
                                        color: isExpiredOrExpiring ? 'error.dark' : 'warning.dark',
                                        mb: 1
                                      }}
                                    >
                                      📍 Renewal Information:
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                                      • IDPs are valid for exactly 1 year from issue date
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                                      • Visit AA Uganda at Plot 4 Old Portbell Road Suite 8, Kampala
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                                      • Contact: {config.company.contactNumber} or {config.company.email}
                                    </Typography>
                                  </Box>
                                )}
                              </Box>
                            );
                          })()}
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>

                  {/* Footer Section */}
                  <Box
                    sx={{
                      backgroundColor: 'grey.100',
                      p: 3,
                      borderTop: '1px solid',
                      borderColor: 'grey.200'
                    }}
                  >
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={12} sm={6}>
                        <Typography variant="caption" color="text.secondary">
                          Verified by AA Uganda Official Database
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          Automobile Association of Uganda
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6} sx={{ textAlign: { sm: 'right' } }}>
                        <Typography variant="caption" color="text.secondary">
                          Verification Time: {new Date().toLocaleString('en-GB')}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </CardContent>
              )}
            </ResultCard>
          )}
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 6, backgroundColor: "grey.50" }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Heading variant="h2" align="center" gutterBottom>
              Why Trust AA Uganda IDP Verification?
            </Heading>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ maxWidth: 600, mx: "auto" }}
            >
              As the official automobile association established in 1955, we
              ensure your IDP verification is authentic and globally recognized
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <FeatureCard>
                  <CardContent sx={{ textAlign: "center", p: 4 }}>
                    {iconMap[feature.icon as keyof typeof iconMap]}
                    <Typography
                      variant="h6"
                      sx={{ mt: 3, mb: 2, fontWeight: 600 }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ lineHeight: 1.6 }}
                    >
                      {feature.description}
                    </Typography>
                  </CardContent>
                </FeatureCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Test Cases Section for Development */}
      {import.meta.env.DEV && (
        <Box sx={{ py: 6, backgroundColor: "warning.50" }}>
          <Container maxWidth="lg">
            <Box sx={{ textAlign: "center", mb: 4 }}>
              <Heading variant="h3" align="center" gutterBottom>
                🧪 Test Cases (Development Mode)
              </Heading>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ maxWidth: 600, mx: "auto" }}
              >
                Use these predefined IDP numbers to test different verification scenarios
              </Typography>
            </Box>

            <Grid container spacing={3}>
              {getTestCases().map((testCase, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card 
                    sx={{ 
                      cursor: 'pointer', 
                      transition: 'all 0.2s',
                      '&:hover': { 
                        transform: 'translateY(-2px)',
                        boxShadow: 3 
                      }
                    }}
                    onClick={() => {
                      setSearchValue(testCase.idpNumber);
                      handleSearch(testCase.idpNumber);
                    }}
                  >
                    <CardContent>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                        {testCase.description}
                      </Typography>
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          fontFamily: 'monospace',
                          backgroundColor: 'grey.100',
                          p: 1,
                          borderRadius: 1,
                          mb: 1
                        }}
                      >
                        {testCase.idpNumber}
                      </Typography>
                      <Chip 
                        label={`Expected: ${testCase.expectedStatus}`}
                        size="small"
                        color={
                          testCase.expectedStatus === 'valid' ? 'success' :
                          testCase.expectedStatus === 'expired' ? 'warning' : 'error'
                        }
                      />
                      <Typography variant="caption" display="block" sx={{ mt: 1, fontStyle: 'italic' }}>
                        Click to test this case
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            <Box sx={{ mt: 4, p: 3, backgroundColor: 'info.50', borderRadius: 2 }}>
              <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                <strong>Note:</strong> This section is only visible in development mode. 
                The verification system also supports realistic fallback results for arbitrary valid Uganda IDP patterns (UG + year + numbers).
              </Typography>
            </Box>
          </Container>
        </Box>
      )}

      {/* Information Section */}
      <Box sx={{ py: 8, backgroundColor: "grey.50" }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Heading variant="h2" align="center" gutterBottom>
              About AA Uganda IDP Services
            </Heading>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ maxWidth: 600, mx: "auto" }}
            >
              Learn about our International Driving Permit services and
              verification process
            </Typography>
          </Box>

          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  height: "100%",
                  border: "1px solid",
                  borderColor: "grey.200",
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <SecurityIcon
                    sx={{ fontSize: 48, color: "primary.main", mb: 3 }}
                  />
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 600, mb: 3, color: "primary.main" }}
                  >
                    Official AA Uganda IDP
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
                    Established in 1955, the Automobile Association of Uganda is
                    the only authorized issuer of International Driving Permits
                    in Uganda, endorsed by:
                  </Typography>
                  <List dense sx={{ mb: 2 }}>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <CheckCircleIcon color="success" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Federation Internationale de l'Automobile (FIA)" />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <CheckCircleIcon color="success" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Alliance Internationale de Tourisme (AIT)" />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <CheckCircleIcon color="success" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="African Council for Touring & Automobile (ACTA)" />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  height: "100%",
                  border: "1px solid",
                  borderColor: "grey.200",
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <InfoIcon
                    sx={{ fontSize: 48, color: "primary.main", mb: 3 }}
                  />
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 600, mb: 3, color: "primary.main" }}
                  >
                    IDP Requirements & Verification
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
                    Our verification system ensures that only legitimate IDPs
                    are recognized. All IDPs must meet these criteria:
                  </Typography>
                  <List dense>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <CheckCircleIcon color="success" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Issued to holders of genuine, valid Ugandan driving permits" />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <CheckCircleIcon color="success" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Applicant must be AA Uganda member or pay non-member fees" />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <CheckCircleIcon color="success" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Valid for one year from issue date" />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <CheckCircleIcon color="success" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Recognized in 150+ countries under 1968 Vienna Convention" />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card
                sx={{
                  background:
                    "linear-gradient(135deg, #024f31 0%, #f1c50e 100%)",
                  color: "white",
                  border: "none",
                }}
              >
                <CardContent sx={{ p: 4, textAlign: "center" }}>
                  <PublicIcon sx={{ fontSize: 48, mb: 2 }} />
                  <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
                    Need an IDP? Apply Through AA Uganda
                  </Typography>
                  <Typography variant="h6" sx={{ mb: 3, opacity: 0.9 }}>
                    AA Members: UGX 250,000 • Non-Members: UGX 350,000
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ mb: 4, maxWidth: 800, mx: "auto", lineHeight: 1.8 }}
                  >
                    Located at Plot 4 Old Portbell Road Suite 8, Kampala.
                    Contact us at {config.company.contactNumber} or email {config.company.email} 
                    {" "}for IDP applications and inquiries.
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      gap: 2,
                      justifyContent: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    <Button
                      variant="contained"
                      size="large"
                      onClick={() => navigate("/idp/apply")}
                      sx={{
                        background: "white",
                        color: "primary.main",
                        fontWeight: 600,
                        "&:hover": { background: theme.palette.grey[300] },
                      }}
                    >
                      Apply for IDP
                    </Button>
                    <Button
                      variant="outlined"
                      size="large"
                      sx={{
                        borderColor: "white",
                        color: "white",
                        "&:hover": {
                          borderColor: "white",
                          backgroundColor: "rgba(255,255,255,0.1)",
                        },
                      }}
                    >
                      Contact Us
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Enhanced Alert Notification - Top Right Positioning */}
      <AlertNotification
        open={showAlert}
        message={alertMessage}
        severity="error"
        onClose={() => setShowAlert(false)}
        autoHideDuration={6000}
        position="top-right"
        showCloseButton={true}
      />
    </Box>
  );
};

export default VerifyIdp;

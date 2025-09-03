import React, { useState } from "react";
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
import { Button, Heading } from "../components/atoms";
import { PageHeader } from "../components/molecules";
import { config } from "../utils/config/config";
import theme from "../theme";
import { useNavigate } from "react-router-dom";
import { MockIdpVerificationService } from "../utils/mockIdpDatabase";

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

interface VerificationResult {
  status: "valid" | "invalid" | "expired" | "suspended";
  idpNumber: string;
  holderName?: string;
  issueDate?: string;
  expiryDate?: string;
  licenseNumber?: string;
  countries?: string[];
  type?: string;
  issuingAuthority?: string;
  membershipType?: string;
  validityStatus?: string;
}

const VerifyIdp: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const navigate = useNavigate();

  const features = [
    {
      icon: (
        <SecurityIcon
          sx={{ fontSize: 40, color: "primary.main" }}
          className="feature-icon"
        />
      ),
      title: "AA Uganda Authorized",
      description:
        "Official verification service by Automobile Association of Uganda since 1955",
    },
    {
      icon: (
        <VerifiedUserIcon
          sx={{ fontSize: 40, color: "primary.main" }}
          className="feature-icon"
        />
      ),
      title: "FIA & AIT Endorsed",
      description:
        "Recognized by Federation Internationale de l'Automobile and Alliance Internationale de Tourisme",
    },
    {
      icon: (
        <LanguageIcon
          sx={{ fontSize: 40, color: "primary.main" }}
          className="feature-icon"
        />
      ),
      title: "150+ Countries Valid",
      description:
        "Valid in over 150 countries worldwide under 1968 Vienna Convention",
    },
  ];

  const handleSearch = async () => {
    if (!searchValue.trim()) {
      setAlertMessage("Please enter an IDP number to verify");
      setShowAlert(true);
      return;
    }

    setLoading(true);

    try {
      // Use structured mock database lookup instead of fragile string matching
      const verificationResult = await MockIdpVerificationService.verifyIdp(searchValue);
      
      if (verificationResult) {
        // Convert MockIdpRecord to VerificationResult format
        const result: VerificationResult = {
          status: verificationResult.status,
          idpNumber: verificationResult.idpNumber,
          holderName: verificationResult.holderName,
          issueDate: verificationResult.issueDate,
          expiryDate: verificationResult.expiryDate,
          licenseNumber: verificationResult.licenseNumber,
          countries: verificationResult.countries,
          type: verificationResult.type,
          issuingAuthority: verificationResult.issuingAuthority,
          membershipType: verificationResult.membershipType,
          validityStatus: verificationResult.validityStatus,
        };
        setResult(result);
      } else {
        // IDP not found in database
        const notFoundResult: VerificationResult = {
          status: "invalid",
          idpNumber: searchValue.toUpperCase(),
          holderName: undefined,
          issueDate: undefined,
          expiryDate: undefined,
          licenseNumber: undefined,
          countries: undefined,
          type: undefined,
          issuingAuthority: "Automobile Association of Uganda",
          membershipType: undefined,
          validityStatus: "Not Found in Database",
        };
        setResult(notFoundResult);
      }
    } catch (error) {
      console.error("Error verifying IDP:", error);
      setAlertMessage("An error occurred while verifying the IDP. Please try again.");
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "valid":
        return <CheckCircleIcon sx={{ color: "success.main", fontSize: 24 }} />;
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

  const getStatusMessage = (status: string) => {
    switch (status) {
      case "valid":
        return "This International Driving Permit is valid and authentic, issued by Automobile Association of Uganda.";
      case "invalid":
        return "This IDP number is not found in the AA Uganda database. Please verify the number and try again, or contact AA Uganda at +256-414-255917.";
      case "expired":
        return "This International Driving Permit has expired and is no longer valid. Please apply for a renewal at AA Uganda.";
      case "suspended":
        return "This International Driving Permit has been suspended by AA Uganda and is not currently valid. Please contact AA Uganda for details.";
      default:
        return "Unknown verification status. Please contact AA Uganda for assistance.";
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

  return (
    <Box>
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
                Phone: +256-414-255917 • Email: aauganda@aau.co.ug
              </Typography>
            </Box>

            <Box sx={{ display: "flex", gap: 2, mb: 4, alignItems: "stretch" }}>
              <TextField
                fullWidth
                label="Enter IDP Number"
                placeholder="e.g., UG2024123456789"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
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
                onClick={handleSearch}
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
            </Box>

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
              className={result.status === "valid" ? "success" : "error"}
            >
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  {getStatusIcon(result.status)}
                  <Box sx={{ ml: 2, flexGrow: 1 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        mb: 1,
                      }}
                    >
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

                {result.status === "valid" && result.holderName && (
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
                              secondary={new Date(
                                result.expiryDate!
                              ).toLocaleDateString("en-GB")}
                            />
                          </ListItem>

                          <ListItem>
                            <ListItemIcon>
                              <SecurityIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText
                              primary="Uganda License No."
                              secondary={result.licenseNumber}
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
                              <PublicIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText
                              primary="Issuing Authority"
                              secondary={result.issuingAuthority}
                            />
                          </ListItem>

                          <ListItem>
                            <ListItemIcon>
                              <CheckCircleIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText
                              primary="Membership Status"
                              secondary={result.membershipType}
                            />
                          </ListItem>

                          <ListItem>
                            <ListItemIcon>
                              <LanguageIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText
                              primary="Global Coverage"
                              secondary={`Valid in ${
                                result.countries?.length || 0
                              }+ countries`}
                            />
                          </ListItem>
                        </List>
                      </Grid>
                    </Grid>

                    {result.countries && result.countries.length > 0 && (
                      <>
                        <Divider sx={{ my: 3 }} />
                        <Box>
                          <Typography
                            variant="subtitle2"
                            sx={{ fontWeight: 600, mb: 2 }}
                          >
                            Sample Valid Countries (1968 Vienna Convention):
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              gap: 1,
                              flexWrap: "wrap",
                              mb: 2,
                            }}
                          >
                            {result.countries
                              .slice(0, 12)
                              .map((country, index) => (
                                <Chip
                                  key={index}
                                  label={country}
                                  size="small"
                                  variant="outlined"
                                  color="primary"
                                  sx={{ fontSize: "0.75rem" }}
                                />
                              ))}
                          </Box>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ fontStyle: "italic" }}
                          >
                            + Many more countries. IDP valid in all 1968 Vienna
                            Convention signatory countries. Always check with
                            destination country's embassy for specific
                            requirements.
                          </Typography>
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
                    {feature.icon}
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
              {MockIdpVerificationService.getTestCases().map((testCase, index) => (
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
                    onClick={() => setSearchValue(testCase.idpNumber)}
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

      {/* Alert Snackbar */}
      <Snackbar
        open={showAlert}
        autoHideDuration={6000}
        onClose={() => setShowAlert(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setShowAlert(false)}
          severity="info"
          sx={{ width: "100%" }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default VerifyIdp;

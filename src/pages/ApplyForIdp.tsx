import React from "react";
import { Controller } from "react-hook-form";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  TextField,
  FormControlLabel,
  Checkbox,
  Alert,
  Card,
  CardContent,
  FormHelperText,
  Radio,
  RadioGroup,
  FormLabel,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Tooltip,
  CircularProgress,
  Collapse,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import {
  DriveEta,
  ArrowBack,
  CheckCircle as CheckCircleIcon,
  AccountCircle,
  Description,
  Verified,
  LocationOn,
  Phone,
  Email,
  CardMembership,
  Delete as DeleteIcon,
  PhotoCamera,
  PictureAsPdf,
  Image as ImageIcon,
  CalendarToday as CalendarIcon,
  Info as InfoIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Search as SearchIcon,
  CheckCircleOutline as CheckCircleOutlineIcon,
  PersonSearch as PersonSearchIcon,
  Payment as PaymentIcon,
  AccountBalance as AccountBalanceIcon,
  Security as SecurityIcon,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { MuiTelInput } from "mui-tel-input";
import {
  Button,
  Heading,
  HeaderContainer,
  ContentContainer,
  AnimatedTitle,
  AnimatedSubtitle,
  SectionDivider,
  AlertNotification,
} from "../components/atoms";
import {
  DecorativeBackground,
  PhotoValidationDisplay,
} from "../components/molecules";
import { SEO } from "../components/SEO";
import { applyIdpSEO } from "../data/seoData";
import { passportPhotoRequirements } from "../utils/passportPhotoValidator";
import useApplyForIdp, {
  type IDPFormData,
  drivingPermitClasses,
  FILE_SIZE_LIMITS,
} from "../hooks/useApplyForIdp";
import theme from "../theme";
import ReCAPTCHA from "react-google-recaptcha";

// ---- reCAPTCHA key from environment variables ----
const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || "";

const StyledStepper = styled(Stepper)(({ theme }) => ({
  "& .MuiStepLabel-root .Mui-completed": {
    color: theme.palette.success.main,
  },
  "& .MuiStepLabel-root .Mui-active": {
    color: theme.palette.primary.main,
  },
}));

const FormPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[4],
}));

const InfoCard = styled(Card)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.light}20, ${theme.palette.secondary.light}20)`,
  border: `1px solid ${theme.palette.primary.main}30`,
  marginBottom: theme.spacing(3),
}));

const FileUploadBox = styled(Box)(({ theme }) => ({
  border: `2px dashed ${theme.palette.grey[300]}`,
  borderRadius: theme.spacing(1),
  padding: theme.spacing(3),
  textAlign: "center",
  cursor: "pointer",
  transition: "all 0.3s ease",
  "&:hover": {
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.primary.light + "10",
  },
  "&.dragover": {
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.primary.light + "20",
  },
}));

const FilePreviewCard = styled(Card)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2),
  marginTop: theme.spacing(2),
  border: `1px solid ${theme.palette.success.main}30`,
  backgroundColor: theme.palette.success.light + "10",
}));

const PhotoPreview = styled(Box)(({ theme }) => ({
  width: 120,
  height: 150,
  border: `2px solid ${theme.palette.grey[300]}`,
  borderRadius: theme.spacing(1),
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  backgroundColor: theme.palette.grey[50],
  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
}));

const ApplyForIdp: React.FC = () => {
  const {
    // State
    activeStep,
    showAlert,
    alertMessage,
    alertSeverity,
    alertConfig,
    photoValidationState,
    showPhotoRequirements,
    memberVerificationState,
    steps,
    isLoading,

    // Loading states are now handled by the global loading context

    // reCAPTCHA
    recaptchaValue,
    recaptchaRef,
    handleRecaptchaChange,
    handleRecaptchaError,
    handleRecaptchaExpired,

    // Form
    control,
    handleSubmit,
    watch,
    errors,
    watchedIsMember,

    // Computed values
    applicationFee,

    // Handlers
    handleNext,
    handleBack,
    handleFormSubmit,
    handleFileUpload,
    handleFileRemove,
    createImagePreviewUrl,
    formatFileSize,
    handleManualMemberVerification,

    // State setters
    setActiveStep,
    setShowAlert,
    setShowPhotoRequirements,
  } = useApplyForIdp();

  // Enhanced keyboard navigation support
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Allow keyboard navigation only when not typing in input fields
      const activeElement = document.activeElement;
      const isInputActive =
        activeElement?.tagName === "INPUT" ||
        activeElement?.tagName === "TEXTAREA" ||
        activeElement?.getAttribute("contenteditable") === "true";

      if (isInputActive) return;

      if (event.key === "ArrowLeft" && activeStep > 0) {
        event.preventDefault();
        handleBack();
      } else if (event.key === "ArrowRight" && activeStep < steps.length - 1) {
        event.preventDefault();
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeStep, steps.length, handleBack, handleNext]);

  // File Upload Component
  const FileUploadField: React.FC<{
    fieldName: keyof IDPFormData;
    label: string;
    acceptedTypes: string;
    icon: React.ReactNode;
    maxSizeMB: number;
    description: string;
    showPreview?: boolean;
  }> = ({
    fieldName,
    label,
    acceptedTypes,
    icon,
    maxSizeMB,
    description,
    showPreview = false,
  }) => {
    const fieldValue = watch(fieldName) as File | undefined;
    const fieldError = errors[fieldName];

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        handleFileUpload(fieldName, files[0]);
      }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        handleFileUpload(fieldName, files[0]);
      }
      e.target.value = ""; // Reset input
    };

    return (
      <Box>
        <FormLabel sx={{ fontWeight: 600, mb: 1, display: "block" }}>
          {label} *
        </FormLabel>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ mb: 2, display: "block" }}
        >
          {description}
        </Typography>

        {!fieldValue ? (
          <FileUploadBox
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() =>
              document.getElementById(`file-input-${fieldName}`)?.click()
            }
          >
            <input
              id={`file-input-${fieldName}`}
              type="file"
              accept={acceptedTypes}
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            {icon}
            <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
              Click to upload or drag and drop
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {acceptedTypes.toUpperCase()} files up to {maxSizeMB}MB
            </Typography>
          </FileUploadBox>
        ) : (
          <FilePreviewCard>
            <Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
              {showPreview && fieldValue.type.startsWith("image/") ? (
                <PhotoPreview sx={{ mr: 2, flexShrink: 0 }}>
                  <img
                    src={createImagePreviewUrl(fieldValue)}
                    alt="Passport preview"
                  />
                </PhotoPreview>
              ) : (
                <Box sx={{ mr: 2, display: "flex", alignItems: "center" }}>
                  {fieldValue.type === "application/pdf" ? (
                    <PictureAsPdf color="error" />
                  ) : (
                    <ImageIcon color="primary" />
                  )}
                </Box>
              )}

              <Box sx={{ flex: 1 }}>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {fieldValue.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {formatFileSize(fieldValue.size)}
                </Typography>
              </Box>

              <Tooltip title="Remove file">
                <IconButton
                  onClick={() => handleFileRemove(fieldName)}
                  color="error"
                  size="small"
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </FilePreviewCard>
        )}

        {fieldError && (
          <FormHelperText error sx={{ mt: 1 }}>
            {fieldError.message}
          </FormHelperText>
        )}

        {/* Photo Requirements Button - Always visible for passport photo */}
        {fieldName === "passportPhoto" && (
          <Box sx={{ mt: 2 }}>
            <Button
              variant="outlined"
              size="small"
              startIcon={<InfoIcon />}
              endIcon={
                showPhotoRequirements ? <ExpandLessIcon /> : <ExpandMoreIcon />
              }
              onClick={() => setShowPhotoRequirements(!showPhotoRequirements)}
              sx={{
                mb: showPhotoRequirements ? 2 : 0,
                borderColor: "primary.main",
                color: "primary.main",
                "&:hover": {
                  backgroundColor: "primary.main",
                  borderColor: "primary.dark",
                  color: "white",
                },
              }}
            >
              {showPhotoRequirements
                ? "Hide Photo Requirements"
                : "Show Photo Requirements"}
            </Button>

            {/* Photo Requirements Display */}
            <Collapse in={showPhotoRequirements}>
              <Card
                sx={{
                  mt: 2,
                  border: "1px solid",
                  borderColor: "primary.light",
                }}
              >
                <CardContent sx={{ p: 2 }}>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, mb: 2, color: "primary.main" }}
                  >
                    Passport Photo Requirements
                  </Typography>
                  {passportPhotoRequirements.map((category, categoryIndex) => (
                    <Box
                      key={categoryIndex}
                      sx={{
                        mb:
                          categoryIndex < passportPhotoRequirements.length - 1
                            ? 3
                            : 0,
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        sx={{ fontWeight: 600, mb: 1, color: "text.primary" }}
                      >
                        {category.category}
                      </Typography>
                      <List dense sx={{ pl: 2 }}>
                        {category.requirements.map((requirement, reqIndex) => (
                          <ListItem key={reqIndex} sx={{ py: 0.25, px: 0 }}>
                            <ListItemIcon sx={{ minWidth: 20 }}>
                              <CheckCircleIcon
                                sx={{ fontSize: 16, color: "success.main" }}
                              />
                            </ListItemIcon>
                            <ListItemText
                              primary={requirement}
                              primaryTypographyProps={{
                                variant: "body2",
                                sx: { lineHeight: 1.4 },
                              }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  ))}
                  <Alert severity="info" sx={{ mt: 2 }}>
                    <Typography variant="body2">
                      <strong>Tip:</strong> Upload a photo that meets these
                      requirements to ensure faster processing of your
                      application.
                    </Typography>
                  </Alert>
                </CardContent>
              </Card>
            </Collapse>
          </Box>
        )}

        {/* Photo Validation Display for Passport Photo */}
        {fieldName === "passportPhoto" && fieldValue && (
          <Box sx={{ mt: 2 }}>
            {photoValidationState.isValidating && (
              <Alert
                severity="info"
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <CircularProgress size={16} />
                <Typography variant="body2">Validating photo...</Typography>
              </Alert>
            )}

            {photoValidationState.validationResult && (
              <PhotoValidationDisplay
                validationResult={photoValidationState.validationResult}
                onRetake={() => handleFileRemove(fieldName)}
                showDetails={photoValidationState.showValidationDetails}
              />
            )}
          </Box>
        )}
      </Box>
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box>
        <SEO seoData={applyIdpSEO} />

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
                    Apply for your International Driving Permit through the
                    Automobile Association of Uganda. Plot 4 Old Portbell Road
                    Suite 8, P.O. Box 1459 Kampala-Uganda
                  </AnimatedSubtitle>

                  <SectionDivider />
                </Box>
              </Box>
            </Box>
          </ContentContainer>
        </HeaderContainer>

        {/* Application Form Section */}
        <Box sx={{ py: 8 }}>
          <Container maxWidth="lg">
            <Box sx={{ textAlign: "center", mb: 6 }}>
              <Heading variant="h2" align="center" gutterBottom>
                IDP Application Form
              </Heading>
              <Typography variant="h6" color="text.secondary">
                Complete the form below to apply for your International Driving
                Permit
              </Typography>
            </Box>

            {/* Fee Information Card */}
            <InfoCard sx={{ mb: 4 }}>
              <CardContent>
                <Grid container spacing={3} alignItems="center">
                  <Grid item xs={12} md={8}>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                      Application Fee
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {watchedIsMember
                        ? "You're applying as an AA Member - Enjoy discounted rates!"
                        : "Non-AA Member rate applies. Consider joining AA for significant savings!"}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={4}
                    sx={{ textAlign: { xs: "left", md: "right" } }}
                  >
                    <Typography
                      variant="h4"
                      color="primary.main"
                      sx={{ fontWeight: 700 }}
                    >
                      UGX {applicationFee.toLocaleString()}
                    </Typography>
                    {!watchedIsMember && (
                      <Typography variant="caption" color="text.secondary">
                        Save UGX 100,000 as AA Member
                      </Typography>
                    )}
                  </Grid>
                </Grid>
              </CardContent>
            </InfoCard>

            <Grid container spacing={4}>
              {/* Stepper */}
              <Grid item xs={12} md={4}>
                <Paper sx={{ p: 3, position: "sticky", top: 120 }}>
                  {/* Progress Bar */}
                  <Box sx={{ mb: 3 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 1,
                      }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        Progress
                      </Typography>
                      <Typography
                        variant="body2"
                        color="primary.main"
                        sx={{ fontWeight: 600 }}
                      >
                        {Math.round(((activeStep + 1) / steps.length) * 100)}%
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        width: "100%",
                        height: 8,
                        backgroundColor: "grey.200",
                        borderRadius: 4,
                        overflow: "hidden",
                      }}
                    >
                      <Box
                        sx={{
                          width: `${((activeStep + 1) / steps.length) * 100}%`,
                          height: "100%",
                          background: `linear-gradient(90deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.dark})`,
                          borderRadius: 4,
                          transition: "width 0.3s ease-in-out",
                        }}
                      />
                    </Box>
                  </Box>

                  <StyledStepper
                    activeStep={activeStep}
                    orientation="vertical"
                    sx={{
                      "& .MuiStepContent-root": { borderLeft: "none", pl: 3 },
                    }}
                  >
                    {steps.map((label, index) => (
                      <Step key={label}>
                        <StepLabel
                          sx={{
                            cursor: index < activeStep ? "pointer" : "default",
                            "&:hover":
                              index < activeStep
                                ? {
                                    "& .MuiStepLabel-label": {
                                      color: "primary.main",
                                    },
                                  }
                                : {},
                          }}
                          onClick={() => {
                            // Allow navigation to previous steps only
                            if (index < activeStep) {
                              setActiveStep(index);
                            }
                          }}
                        >
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: 500,
                              color:
                                index < activeStep
                                  ? "text.primary"
                                  : index === activeStep
                                  ? "primary.main"
                                  : "text.secondary",
                              "&:hover":
                                index < activeStep
                                  ? {
                                      color: "primary.main",
                                    }
                                  : {},
                              transition: "color 0.2s ease-in-out",
                            }}
                          >
                            {label}
                          </Typography>
                        </StepLabel>
                        {activeStep === index && (
                          <StepContent>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              sx={{ mt: 1, display: "block", lineHeight: 1.4 }}
                            >
                              {index === 0 &&
                                "Enter membership status and personal information"}
                              {index === 1 &&
                                "Provide your contact and address details"}
                              {index === 2 &&
                                "Enter passport and visa information"}
                              {index === 3 &&
                                "Upload required documents (passport, visa, photo)"}
                              {index === 4 &&
                                "Provide your Uganda driving license details"}
                              {index === 5 &&
                                "Enter MTN Mobile Money number for payment"}
                              {index === 6 &&
                                "Review and confirm your application"}
                            </Typography>

                            {/* Quick navigation buttons for current step */}
                            <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
                              {index > 0 && (
                                <Button
                                  size="small"
                                  variant="text"
                                  startIcon={<ArrowBack />}
                                  onClick={handleBack}
                                  sx={{
                                    fontSize: "0.75rem",
                                    minWidth: "auto",
                                    px: 1,
                                  }}
                                >
                                  Back
                                </Button>
                              )}
                            </Box>
                          </StepContent>
                        )}
                      </Step>
                    ))}
                  </StyledStepper>

                  {/* Keyboard Navigation Hint */}
                  <Alert severity="info" sx={{ mt: 2, fontSize: "0.75rem" }}>
                    <Typography variant="caption">
                      💡 <strong>Tip:</strong> Use keyboard ← → arrow keys for
                      quick navigation, or click on previous steps to go back.
                    </Typography>
                  </Alert>
                </Paper>
              </Grid>

              {/* Form Content */}
              <Grid item xs={12} md={8}>
                <form onSubmit={handleSubmit(handleFormSubmit as any)}>
                  <FormPaper>
                    {/* Mobile Back Button - Appears on all steps except first */}
                    {activeStep > 0 && (
                      <Box
                        sx={{
                          display: { xs: "flex", md: "none" },
                          alignItems: "center",
                          mb: 3,
                          pb: 2,
                          borderBottom: 1,
                          borderColor: "divider",
                        }}
                      >
                        <Button
                          onClick={handleBack}
                          variant="text"
                          startIcon={<ArrowBack />}
                          sx={{
                            color: "primary.main",
                            "&:hover": {
                              backgroundColor: "primary.light",
                              transform: "translateX(-4px)",
                            },
                            transition: "all 0.2s ease-in-out",
                          }}
                        >
                          Back to {steps[activeStep - 1]}
                        </Button>
                      </Box>
                    )}

                    {/* Step 1: Membership & Personal Info */}
                    {activeStep === 0 && (
                      <Box>
                        <Typography
                          variant="h5"
                          gutterBottom
                          sx={{ fontWeight: 600, mb: 3 }}
                        >
                          Membership & Personal Information
                        </Typography>

                        {/* Membership Status */}
                        <Card sx={{ mb: 3, p: 2, backgroundColor: "grey.50" }}>
                          <FormLabel
                            component="legend"
                            sx={{ fontWeight: 600, mb: 2 }}
                          >
                            AA Membership Status
                          </FormLabel>
                          <Controller
                            name="isMember"
                            control={control}
                            render={({ field }) => (
                              <RadioGroup
                                {...field}
                                value={field.value ? "yes" : "no"}
                                onChange={(e) =>
                                  field.onChange(e.target.value === "yes")
                                }
                              >
                                <FormControlLabel
                                  value="yes"
                                  control={<Radio />}
                                  label="Yes, I am an AA member"
                                />
                                <FormControlLabel
                                  value="no"
                                  control={<Radio />}
                                  label="No, I am not an AA member"
                                />
                              </RadioGroup>
                            )}
                          />
                        </Card>

                        <Grid container spacing={3}>
                          {/* Membership Number (conditional) */}
                          {watchedIsMember && (
                            <Grid item xs={12}>
                              <Controller
                                name="membershipNumber"
                                control={control}
                                render={({ field, fieldState: { error } }) => (
                                  <Box>
                                    <TextField
                                      {...field}
                                      fullWidth
                                      label="AA Membership Number *"
                                      error={!!error}
                                      helperText={error?.message}
                                      placeholder="Enter your AA membership number"
                                      InputProps={{
                                        startAdornment: (
                                          <CardMembership
                                            sx={{
                                              mr: 1,
                                              color: "text.secondary",
                                            }}
                                          />
                                        ),
                                        endAdornment:
                                          memberVerificationState.isVerifying ? (
                                            <CircularProgress size={20} />
                                          ) : memberVerificationState.showVerificationButton ? (
                                            <Tooltip title="Click to verify membership">
                                              <IconButton
                                                onClick={
                                                  handleManualMemberVerification
                                                }
                                                size="small"
                                                color="primary"
                                                sx={{
                                                  "&:hover": {
                                                    backgroundColor:
                                                      "primary.main",
                                                    color: "#ffffff",
                                                  },
                                                }}
                                              >
                                                <PersonSearchIcon />
                                              </IconButton>
                                            </Tooltip>
                                          ) : memberVerificationState.verifiedMember ? (
                                            <Tooltip title="Member verified">
                                              <CheckCircleOutlineIcon
                                                sx={{
                                                  color: "success.main",
                                                  fontSize: 24,
                                                }}
                                              />
                                            </Tooltip>
                                          ) : null,
                                      }}
                                      sx={{
                                        "& .MuiOutlinedInput-root": {
                                          "&.Mui-focused": {
                                            "& .MuiOutlinedInput-notchedOutline":
                                              {
                                                borderColor:
                                                  memberVerificationState.verifiedMember
                                                    ? "success.main"
                                                    : "primary.main",
                                              },
                                          },
                                        },
                                      }}
                                    />

                                    {/* Member Verification Status */}
                                    {memberVerificationState.verificationError && (
                                      <Alert
                                        severity="error"
                                        sx={{ mt: 1, fontSize: "0.875rem" }}
                                        action={
                                          <Button
                                            color="error"
                                            size="small"
                                            variant="text"
                                            startIcon={<SearchIcon />}
                                            onClick={
                                              handleManualMemberVerification
                                            }
                                            disabled={
                                              memberVerificationState.isVerifying
                                            }
                                          >
                                            Retry
                                          </Button>
                                        }
                                      >
                                        {
                                          memberVerificationState.verificationError
                                        }
                                      </Alert>
                                    )}

                                    {memberVerificationState.verifiedMember && (
                                      <Alert
                                        severity="success"
                                        sx={{ mt: 1, fontSize: "0.875rem" }}
                                        icon={<CheckCircleOutlineIcon />}
                                      >
                                        <Typography
                                          variant="body2"
                                          sx={{ fontWeight: 600 }}
                                        >
                                          Member Verified:{" "}
                                          {
                                            memberVerificationState
                                              .verifiedMember.fname
                                          }{" "}
                                          {
                                            memberVerificationState
                                              .verifiedMember.onames
                                          }
                                        </Typography>
                                        <Typography
                                          variant="caption"
                                          color="text.secondary"
                                        >
                                          Member details have been automatically
                                          populated below.
                                        </Typography>
                                      </Alert>
                                    )}

                                    {/* Manual Verification Button */}
                                    {memberVerificationState.showVerificationButton &&
                                      !memberVerificationState.isVerifying && (
                                        <Box sx={{ mt: 2 }}>
                                          <Button
                                            variant="outlined"
                                            size="small"
                                            startIcon={<PersonSearchIcon />}
                                            onClick={
                                              handleManualMemberVerification
                                            }
                                            sx={{
                                              borderColor: "primary.main",
                                              color: "primary.main",
                                              "&:hover": {
                                                backgroundColor:
                                                  "primary.light",
                                                borderColor: "primary.main",
                                                color: "grey.100",
                                              },
                                            }}
                                          >
                                            Verify Membership
                                          </Button>
                                          <Typography
                                            variant="caption"
                                            color="text.secondary"
                                            sx={{ ml: 2 }}
                                          >
                                            Or wait 2 seconds for
                                            auto-verification
                                          </Typography>
                                        </Box>
                                      )}

                                    {/* Loading State Message */}
                                    {memberVerificationState.isVerifying && (
                                      <Box
                                        sx={{
                                          mt: 1,
                                          display: "flex",
                                          alignItems: "center",
                                          gap: 1,
                                        }}
                                      >
                                        <CircularProgress size={16} />
                                        <Typography
                                          variant="caption"
                                          color="text.secondary"
                                        >
                                          Verifying membership number...
                                        </Typography>
                                      </Box>
                                    )}
                                  </Box>
                                )}
                              />
                            </Grid>
                          )}

                          {/* Personal Information */}
                          <Grid item xs={12} sm={6}>
                            <Controller
                              name="surname"
                              control={control}
                              render={({ field, fieldState: { error } }) => (
                                <TextField
                                  {...field}
                                  fullWidth
                                  label={`First Name *${
                                    memberVerificationState.verifiedMember
                                      ? " (Auto-filled)"
                                      : ""
                                  }`}
                                  error={!!error}
                                  helperText={
                                    error?.message ||
                                    (memberVerificationState.verifiedMember
                                      ? "This field was automatically filled from your membership record"
                                      : undefined)
                                  }
                                  InputProps={{
                                    startAdornment: (
                                      <AccountCircle
                                        sx={{ mr: 1, color: "text.secondary" }}
                                      />
                                    ),
                                    endAdornment:
                                      memberVerificationState.verifiedMember && (
                                        <Tooltip title="Auto-filled from membership record">
                                          <CheckCircleOutlineIcon
                                            sx={{
                                              color: "success.main",
                                              fontSize: 18,
                                              opacity: 0.7,
                                            }}
                                          />
                                        </Tooltip>
                                      ),
                                  }}
                                  sx={{
                                    "& .MuiFormHelperText-root": {
                                      color:
                                        memberVerificationState.verifiedMember &&
                                        !error
                                          ? "success.main"
                                          : undefined,
                                    },
                                  }}
                                />
                              )}
                            />
                          </Grid>

                          <Grid item xs={12} sm={6}>
                            <Controller
                              name="otherNames"
                              control={control}
                              render={({ field, fieldState: { error } }) => (
                                <TextField
                                  {...field}
                                  fullWidth
                                  label={`Last Name *${
                                    memberVerificationState.verifiedMember
                                      ? " (Auto-filled)"
                                      : ""
                                  }`}
                                  error={!!error}
                                  helperText={
                                    error?.message ||
                                    (memberVerificationState.verifiedMember
                                      ? "This field was automatically filled from your membership record"
                                      : undefined)
                                  }
                                  InputProps={{
                                    startAdornment: (
                                      <AccountCircle
                                        sx={{ mr: 1, color: "text.secondary" }}
                                      />
                                    ),
                                    endAdornment:
                                      memberVerificationState.verifiedMember && (
                                        <Tooltip title="Auto-filled from membership record">
                                          <CheckCircleOutlineIcon
                                            sx={{
                                              color: "success.main",
                                              fontSize: 18,
                                              opacity: 0.7,
                                            }}
                                          />
                                        </Tooltip>
                                      ),
                                  }}
                                  sx={{
                                    "& .MuiFormHelperText-root": {
                                      color:
                                        memberVerificationState.verifiedMember &&
                                        !error
                                          ? "success.main"
                                          : undefined,
                                    },
                                  }}
                                />
                              )}
                            />
                          </Grid>

                          <Grid item xs={12} sm={6}>
                            <Controller
                              name="dateOfBirth"
                              control={control}
                              render={({ field, fieldState: { error } }) => (
                                <DatePicker
                                  label="Date of Birth *"
                                  value={
                                    field.value ? dayjs(field.value) : null
                                  }
                                  onChange={(newValue: Dayjs | null) => {
                                    field.onChange(
                                      newValue ? newValue.toDate() : null
                                    );
                                  }}
                                  maxDate={dayjs()}
                                  format="DD/MM/YYYY"
                                  slotProps={{
                                    textField: {
                                      fullWidth: true,
                                      error: !!error,
                                      helperText: error?.message,
                                      InputProps: {
                                        startAdornment: (
                                          <CalendarIcon
                                            sx={{
                                              mr: 1,
                                              color: "text.secondary",
                                            }}
                                          />
                                        ),
                                      },
                                    },
                                  }}
                                  sx={{ width: "100%" }}
                                />
                              )}
                            />
                          </Grid>

                          <Grid item xs={12} sm={6}>
                            <Controller
                              name="placeOfBirth"
                              control={control}
                              render={({ field, fieldState: { error } }) => (
                                <TextField
                                  {...field}
                                  fullWidth
                                  label="Place of Birth *"
                                  error={!!error}
                                  helperText={error?.message}
                                  InputProps={{
                                    startAdornment: (
                                      <LocationOn
                                        sx={{ mr: 1, color: "text.secondary" }}
                                      />
                                    ),
                                  }}
                                />
                              )}
                            />
                          </Grid>
                        </Grid>
                      </Box>
                    )}

                    {/* Step 2: Contact Details */}
                    {activeStep === 1 && (
                      <Box>
                        <Typography
                          variant="h5"
                          gutterBottom
                          sx={{ fontWeight: 600, mb: 3 }}
                        >
                          Contact Details
                        </Typography>

                        <Grid container spacing={3}>
                          <Grid item xs={12}>
                            <Controller
                              name="postalAddress"
                              control={control}
                              render={({ field, fieldState: { error } }) => (
                                <TextField
                                  {...field}
                                  fullWidth
                                  label="Postal Address *"
                                  multiline
                                  rows={2}
                                  error={!!error}
                                  helperText={error?.message}
                                  placeholder="P.O. Box 1459 Kampala-Uganda"
                                />
                              )}
                            />
                          </Grid>

                          <Grid item xs={12} sm={6}>
                            <Controller
                              name="emailAddress"
                              control={control}
                              render={({ field, fieldState: { error } }) => (
                                <TextField
                                  {...field}
                                  fullWidth
                                  label={`Email Address *${
                                    memberVerificationState.verifiedMember
                                      ? " (Auto-filled)"
                                      : ""
                                  }`}
                                  type="email"
                                  error={!!error}
                                  helperText={
                                    error?.message ||
                                    (memberVerificationState.verifiedMember
                                      ? "This field was automatically filled from your membership record"
                                      : undefined)
                                  }
                                  InputProps={{
                                    startAdornment: (
                                      <Email
                                        sx={{ mr: 1, color: "text.secondary" }}
                                      />
                                    ),
                                    endAdornment:
                                      memberVerificationState.verifiedMember && (
                                        <Tooltip title="Auto-filled from membership record">
                                          <CheckCircleOutlineIcon
                                            sx={{
                                              color: "success.main",
                                              fontSize: 18,
                                              opacity: 0.7,
                                            }}
                                          />
                                        </Tooltip>
                                      ),
                                  }}
                                  sx={{
                                    "& .MuiFormHelperText-root": {
                                      color:
                                        memberVerificationState.verifiedMember &&
                                        !error
                                          ? "success.main"
                                          : undefined,
                                    },
                                  }}
                                />
                              )}
                            />
                          </Grid>

                          <Grid item xs={12} sm={6}>
                            <Controller
                              name="telephoneNumber"
                              control={control}
                              render={({ field, fieldState: { error } }) => (
                                <TextField
                                  {...field}
                                  fullWidth
                                  label={`Telephone Number *${
                                    memberVerificationState.verifiedMember
                                      ? " (Auto-filled)"
                                      : ""
                                  }`}
                                  error={!!error}
                                  helperText={
                                    error?.message ||
                                    (memberVerificationState.verifiedMember
                                      ? "This field was automatically filled from your membership record"
                                      : undefined)
                                  }
                                  placeholder="+256-414-255917"
                                  InputProps={{
                                    startAdornment: (
                                      <Phone
                                        sx={{ mr: 1, color: "text.secondary" }}
                                      />
                                    ),
                                    endAdornment:
                                      memberVerificationState.verifiedMember && (
                                        <Tooltip title="Auto-filled from membership record">
                                          <CheckCircleOutlineIcon
                                            sx={{
                                              color: "success.main",
                                              fontSize: 18,
                                              opacity: 0.7,
                                            }}
                                          />
                                        </Tooltip>
                                      ),
                                  }}
                                  sx={{
                                    "& .MuiFormHelperText-root": {
                                      color:
                                        memberVerificationState.verifiedMember &&
                                        !error
                                          ? "success.main"
                                          : undefined,
                                    },
                                  }}
                                />
                              )}
                            />
                          </Grid>

                          <Grid item xs={12} sm={6}>
                            <Controller
                              name="mobileNumber"
                              control={control}
                              render={({ field, fieldState: { error } }) => (
                                <TextField
                                  {...field}
                                  fullWidth
                                  label="Mobile Number *"
                                  error={!!error}
                                  helperText={error?.message}
                                  placeholder="+256-700-000000"
                                  InputProps={{
                                    startAdornment: (
                                      <Phone
                                        sx={{ mr: 1, color: "text.secondary" }}
                                      />
                                    ),
                                  }}
                                />
                              )}
                            />
                          </Grid>

                          <Grid item xs={12}>
                            <Controller
                              name="residentialAddress"
                              control={control}
                              render={({ field, fieldState: { error } }) => (
                                <TextField
                                  {...field}
                                  fullWidth
                                  label="Residential Address *"
                                  multiline
                                  rows={2}
                                  error={!!error}
                                  helperText={error?.message}
                                  placeholder="Your current residential address"
                                />
                              )}
                            />
                          </Grid>

                          <Grid item xs={12}>
                            <Controller
                              name="streetRoadPlot"
                              control={control}
                              render={({ field, fieldState: { error } }) => (
                                <TextField
                                  {...field}
                                  fullWidth
                                  label="Street / Road / Plot *"
                                  error={!!error}
                                  helperText={error?.message}
                                  placeholder="Plot 4 Old Portbell Road Suite 8"
                                />
                              )}
                            />
                          </Grid>
                        </Grid>
                      </Box>
                    )}

                    {/* Step 3: Passport & Visa Info */}
                    {activeStep === 2 && (
                      <Box>
                        <Typography
                          variant="h5"
                          gutterBottom
                          sx={{ fontWeight: 600, mb: 3 }}
                        >
                          Passport & Visa Information
                        </Typography>

                        <Grid container spacing={3}>
                          <Grid item xs={12} sm={6}>
                            <Controller
                              name="passportNumber"
                              control={control}
                              render={({ field, fieldState: { error } }) => (
                                <TextField
                                  {...field}
                                  fullWidth
                                  label="Passport Number *"
                                  error={!!error}
                                  helperText={error?.message}
                                  InputProps={{
                                    startAdornment: (
                                      <Description
                                        sx={{ mr: 1, color: "text.secondary" }}
                                      />
                                    ),
                                  }}
                                />
                              )}
                            />
                          </Grid>
                        </Grid>

                        <Alert severity="info" sx={{ mt: 3 }}>
                          <Typography variant="body2">
                            <strong>Next Step:</strong> Upload your required
                            documents including passport bio-data page, visa
                            copy, and passport photo in the following step.
                          </Typography>
                        </Alert>
                      </Box>
                    )}

                    {/* Step 4: Document Upload */}
                    {activeStep === 3 && (
                      <Box>
                        <Typography
                          variant="h5"
                          gutterBottom
                          sx={{ fontWeight: 600, mb: 3 }}
                        >
                          Document Upload
                        </Typography>

                        <Alert severity="info" sx={{ mb: 4 }}>
                          <Typography variant="body2">
                            <strong>Important:</strong> Please upload clear,
                            legible copies of your documents. All files must be
                            in the specified formats and within size limits.
                          </Typography>
                        </Alert>

                        <Grid container spacing={4}>
                          <Grid item xs={12} md={6}>
                            <FileUploadField
                              fieldName="passportBioDataPage"
                              label="Passport Bio-Data Page"
                              acceptedTypes=".pdf"
                              icon={
                                <PictureAsPdf
                                  sx={{
                                    fontSize: 48,
                                    color: "error.main",
                                    mb: 1,
                                  }}
                                />
                              }
                              maxSizeMB={FILE_SIZE_LIMITS.PDF_MAX_SIZE}
                              description="Upload a clear copy of your passport's bio-data page containing your photo and personal information"
                            />
                          </Grid>

                          <Grid item xs={12} md={6}>
                            <FileUploadField
                              fieldName="visaCopy"
                              label="Visa Copy"
                              acceptedTypes=".pdf"
                              icon={
                                <PictureAsPdf
                                  sx={{
                                    fontSize: 48,
                                    color: "error.main",
                                    mb: 1,
                                  }}
                                />
                              }
                              maxSizeMB={FILE_SIZE_LIMITS.PDF_MAX_SIZE}
                              description="Upload a copy of your visa for the country you intend to travel to"
                            />
                          </Grid>

                          <Grid item xs={12}>
                            <FileUploadField
                              fieldName="passportPhoto"
                              label="Passport Photo"
                              acceptedTypes=".png,.jpg,.jpeg"
                              icon={
                                <PhotoCamera
                                  sx={{
                                    fontSize: 48,
                                    color: "primary.main",
                                    mb: 1,
                                  }}
                                />
                              }
                              maxSizeMB={FILE_SIZE_LIMITS.IMAGE_MAX_SIZE}
                              description="Upload a recent passport-size photograph (white background preferred)"
                              showPreview={true}
                            />
                          </Grid>
                        </Grid>

                        <Alert severity="warning" sx={{ mt: 4 }}>
                          <Typography variant="body2">
                            <strong>File Requirements:</strong>
                            <br />
                            • Passport documents: PDF format only, max 5MB each
                            <br />
                            • Passport photo: PNG, JPG, or JPEG format, max 2MB
                            <br />
                            • All documents must be clear and legible
                            <br />• Only one file per requirement is allowed
                          </Typography>
                        </Alert>
                      </Box>
                    )}

                    {/* Step 5: Driving License Details */}
                    {activeStep === 4 && (
                      <Box>
                        <Typography
                          variant="h5"
                          gutterBottom
                          sx={{ fontWeight: 600, mb: 3 }}
                        >
                          Uganda Driving License Details
                        </Typography>

                        <Grid container spacing={3}>
                          <Grid item xs={12} sm={6}>
                            <Controller
                              name="ugandaDrivingPermitNumber"
                              control={control}
                              render={({ field, fieldState: { error } }) => (
                                <TextField
                                  {...field}
                                  fullWidth
                                  label="Uganda Driving Permit Number *"
                                  error={!!error}
                                  helperText={error?.message}
                                  InputProps={{
                                    startAdornment: (
                                      <DriveEta
                                        sx={{ mr: 1, color: "text.secondary" }}
                                      />
                                    ),
                                  }}
                                />
                              )}
                            />
                          </Grid>

                          <Grid item xs={12} sm={6}>
                            <Controller
                              name="expiryDateOfDrivingPermit"
                              control={control}
                              render={({ field, fieldState: { error } }) => (
                                <DatePicker
                                  label="Expiry Date of Driving Permit *"
                                  value={
                                    field.value ? dayjs(field.value) : null
                                  }
                                  onChange={(newValue: Dayjs | null) => {
                                    field.onChange(
                                      newValue ? newValue.toDate() : null
                                    );
                                  }}
                                  minDate={dayjs()}
                                  format="DD/MM/YYYY"
                                  slotProps={{
                                    textField: {
                                      fullWidth: true,
                                      error: !!error,
                                      helperText: error?.message,
                                      InputProps: {
                                        startAdornment: (
                                          <CalendarIcon
                                            sx={{
                                              mr: 1,
                                              color: "text.secondary",
                                            }}
                                          />
                                        ),
                                      },
                                    },
                                  }}
                                  sx={{ width: "100%" }}
                                />
                              )}
                            />
                          </Grid>

                          <Grid item xs={12}>
                            <FormLabel
                              component="legend"
                              sx={{ fontWeight: 600, mb: 2 }}
                            >
                              Classes of Driving Permit *
                            </FormLabel>
                            <Controller
                              name="classesOfDrivingPermit"
                              control={control}
                              render={({ field, fieldState: { error } }) => (
                                <Box>
                                  <Grid container spacing={2}>
                                    {drivingPermitClasses.map((permitClass) => (
                                      <Grid
                                        item
                                        xs={12}
                                        sm={6}
                                        key={permitClass.value}
                                      >
                                        <FormControlLabel
                                          control={
                                            <Checkbox
                                              checked={
                                                field.value?.includes(
                                                  permitClass.value
                                                ) || false
                                              }
                                              onChange={(e) => {
                                                const currentValue =
                                                  field.value || [];
                                                const newValue = e.target
                                                  .checked
                                                  ? [
                                                      ...currentValue,
                                                      permitClass.value,
                                                    ]
                                                  : currentValue.filter(
                                                      (v) =>
                                                        v !== permitClass.value
                                                    );
                                                field.onChange(newValue);
                                              }}
                                            />
                                          }
                                          label={permitClass.label}
                                        />
                                      </Grid>
                                    ))}
                                  </Grid>
                                  {error && (
                                    <FormHelperText error>
                                      {error.message}
                                    </FormHelperText>
                                  )}
                                </Box>
                              )}
                            />
                          </Grid>
                        </Grid>

                        <Alert severity="warning" sx={{ mt: 3 }}>
                          <Typography variant="body2">
                            <strong>Important:</strong> A permit can only be
                            issued to holders of GENUINE and VALID Ugandan
                            Driving Permits (not holders of Provisional Driving
                            Permits). The current Driving Permit must be
                            produced and a photocopy is made and retained.
                          </Typography>
                        </Alert>
                      </Box>
                    )}

                    {/* Step 6: Payment Details */}
                    {activeStep === 5 && (
                      <Box>
                        <Typography
                          variant="h5"
                          gutterBottom
                          sx={{ fontWeight: 600, mb: 3 }}
                        >
                          Payment Details
                        </Typography>

                        {/* Payment Information Card */}
                        <Card
                          sx={{
                            mb: 4,
                            p: 3,
                            background: `linear-gradient(135deg, ${theme.palette.secondary.light}20, ${theme.palette.secondary.main}20)`,
                            border: `1px solid ${theme.palette.secondary.main}30`,
                          }}
                        >
                          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                            <PaymentIcon 
                              sx={{ 
                                fontSize: 32, 
                                color: "secondary.main", 
                                mr: 2 
                              }} 
                            />
                            <Typography
                              variant="h6"
                              sx={{ fontWeight: 600, color: "text.primary" }}
                            >
                              MTN Mobile Money Payment
                            </Typography>
                          </Box>
                          
                          <Grid container spacing={2} alignItems="center">
                            <Grid item xs={12} md={6}>
                              <Typography variant="body2" sx={{ mb: 1 }}>
                                <strong>Application Fee:</strong> UGX {applicationFee.toLocaleString()}
                              </Typography>
                              <Typography variant="body2" sx={{ mb: 1 }}>
                                <strong>Payment Method:</strong> MTN Mobile Money
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Payment will be processed securely through MTN Mobile Money API
                              </Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                              <Box 
                                sx={{ 
                                  display: "flex", 
                                  alignItems: "center", 
                                  justifyContent: { xs: "flex-start", md: "flex-end" } 
                                }}
                              >
                                <Box
                                  sx={{
                                    backgroundColor: "secondary.main",
                                    color: "secondary.contrastText",
                                    px: 3,
                                    py: 1.5,
                                    borderRadius: 2,
                                    fontWeight: 700,
                                    fontSize: "1.2rem",
                                  }}
                                >
                                  UGX {applicationFee.toLocaleString()}
                                </Box>
                              </Box>
                            </Grid>
                          </Grid>
                        </Card>

                        {/* MTN Mobile Money Number Input */}
                        <Grid container spacing={3}>
                          <Grid item xs={12}>
                            <Typography
                              variant="h6"
                              sx={{ fontWeight: 600, mb: 2 }}
                            >
                              Enter MTN Mobile Money Number
                            </Typography>
                            
                            <Controller
                              name="mtnPaymentPhoneNumber"
                              control={control}
                              render={({ field, fieldState: { error } }) => (
                                <MuiTelInput
                                  {...field}
                                  fullWidth
                                  label="MTN Mobile Money Number"
                                  variant="outlined"
                                  defaultCountry="UG"
                                  onlyCountries={["UG"]}
                                  forceCallingCode
                                  required
                                  error={!!error}
                                  helperText={
                                    error?.message || 
                                    "Enter your MTN Mobile Money number (+25677xxxxxxx, +25678xxxxxxx, or +25676xxxxxxx)"
                                  }
                                  onChange={(value: string) => {
                                    field.onChange(value);
                                  }}
                                  InputProps={{
                                    startAdornment: (
                                      <Box sx={{ 
                                        display: "flex", 
                                        alignItems: "center", 
                                        mr: 1 
                                      }}>
                                        <Phone sx={{ color: "text.primary", mr: 0.5 }} />
                                        <Typography 
                                          variant="caption" 
                                          sx={{ 
                                            color: "primary.main", 
                                            fontWeight: 600,
                                            fontSize: "0.75rem"
                                          }}
                                        >
                                          MTN
                                        </Typography>
                                      </Box>
                                    ),
                                  }}
                                  sx={{
                                    "& .MuiOutlinedInput-root": {
                                      "&.Mui-focused": {
                                        "& .MuiOutlinedInput-notchedOutline": {
                                          borderColor: "secondary.main",
                                        },
                                      },
                                    },
                                    "& .MuiInputLabel-root.Mui-focused": {
                                      color: "secondary.main",
                                    },
                                  }}
                                />
                              )}
                            />
                          </Grid>
                        </Grid>

                        {/* Payment Information Cards */}
                        <Grid container spacing={3} sx={{ mt: 2 }}>
                          <Grid item xs={12} md={6}>
                            <Card sx={{ p: 2, height: "100%" }}>
                              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                                <SecurityIcon 
                                  sx={{ 
                                    color: "success.main", 
                                    mr: 1 
                                  }} 
                                />
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                  Secure Payment
                                </Typography>
                              </Box>
                              <Typography variant="body2" color="text.secondary">
                                Your payment is processed securely through MTN's official API. 
                                Your financial information is protected with bank-level security.
                              </Typography>
                            </Card>
                          </Grid>
                          
                          <Grid item xs={12} md={6}>
                            <Card sx={{ p: 2, height: "100%" }}>
                              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                                <AccountBalanceIcon 
                                  sx={{ 
                                    color: "info.main", 
                                    mr: 1 
                                  }} 
                                />
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                  Payment Process
                                </Typography>
                              </Box>
                              <Typography variant="body2" color="text.secondary">
                                After submitting, you'll receive an MTN Mobile Money prompt on your phone. 
                                Authorize the payment to complete your application.
                              </Typography>
                            </Card>
                          </Grid>
                        </Grid>

                        <Alert severity="info" sx={{ mt: 3 }}>
                          <Typography variant="body2">
                            <strong>Important:</strong> Make sure your MTN Mobile Money account has 
                            sufficient balance (UGX {applicationFee.toLocaleString()}) and that your phone 
                            is available to approve the payment when you submit this application.
                          </Typography>
                        </Alert>

                        <Alert severity="warning" sx={{ mt: 2 }}>
                          <Typography variant="body2">
                            <strong>Note:</strong> Only MTN Mobile Money numbers are accepted for payment 
                            (numbers starting with +25677, +25678, or +25676). If you don't have an MTN number, 
                            please visit any MTN service center to get one or ask a friend/family member with 
                            MTN Mobile Money to help with the payment.
                          </Typography>
                        </Alert>
                      </Box>
                    )}

                    {/* Step 7: Declaration & Submit */}
                    {activeStep === 6 && (
                      <Box>
                        <Typography
                          variant="h5"
                          gutterBottom
                          sx={{ fontWeight: 600, mb: 3 }}
                        >
                          Declaration & Submit
                        </Typography>

                        {/* Application Summary */}
                        <Card
                          sx={{
                            mb: 3,
                            p: 3,
                            backgroundColor: "primary.light",
                            color: "primary.contrastText",
                          }}
                        >
                          <Typography
                            variant="h6"
                            sx={{ fontWeight: 600, mb: 2 }}
                          >
                            Application Summary
                          </Typography>
                          <Grid container spacing={2}>
                            <Grid item xs={6}>
                              <Typography variant="body2">
                                <strong>Application Type:</strong>
                                <br />
                                International Driving Permit
                              </Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant="body2">
                                <strong>Application Fee:</strong>
                                <br />
                                UGX {applicationFee.toLocaleString()}
                              </Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant="body2">
                                <strong>Membership Status:</strong>
                                <br />
                                {watchedIsMember
                                  ? "AA Member"
                                  : "Non-AA Member"}
                              </Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant="body2">
                                <strong>Processing Time:</strong>
                                <br />
                                2-3 working days
                              </Typography>
                            </Grid>
                          </Grid>
                        </Card>

                        {/* Required Documents Checklist */}
                        <Card sx={{ mb: 3, p: 3 }}>
                          <Typography
                            variant="h6"
                            sx={{ fontWeight: 600, mb: 2 }}
                          >
                            Uploaded Documents
                          </Typography>
                          <List>
                            <ListItem>
                              <ListItemIcon>
                                <CheckCircleIcon
                                  color={
                                    watch("passportBioDataPage")
                                      ? "success"
                                      : "disabled"
                                  }
                                />
                              </ListItemIcon>
                              <ListItemText
                                primary="Passport Bio-Data Page"
                                secondary={
                                  watch("passportBioDataPage")
                                    ? (watch("passportBioDataPage") as File)
                                        .name
                                    : "Not uploaded"
                                }
                              />
                            </ListItem>
                            <ListItem>
                              <ListItemIcon>
                                <CheckCircleIcon
                                  color={
                                    watch("visaCopy") ? "success" : "disabled"
                                  }
                                />
                              </ListItemIcon>
                              <ListItemText
                                primary="Visa Copy"
                                secondary={
                                  watch("visaCopy")
                                    ? (watch("visaCopy") as File).name
                                    : "Not uploaded"
                                }
                              />
                            </ListItem>
                            <ListItem>
                              <ListItemIcon>
                                <CheckCircleIcon
                                  color={
                                    watch("passportPhoto")
                                      ? "success"
                                      : "disabled"
                                  }
                                />
                              </ListItemIcon>
                              <ListItemText
                                primary="Passport Photo"
                                secondary={
                                  watch("passportPhoto")
                                    ? (watch("passportPhoto") as File).name
                                    : "Not uploaded"
                                }
                              />
                            </ListItem>
                            <ListItem>
                              <ListItemIcon>
                                <CheckCircleIcon color="success" />
                              </ListItemIcon>
                              <ListItemText
                                primary="Valid Uganda Driving Permit"
                                secondary="Verified in previous step"
                              />
                            </ListItem>
                            {!watchedIsMember && (
                              <ListItem>
                                <ListItemIcon>
                                  <CheckCircleIcon color="info" />
                                </ListItemIcon>
                                <ListItemText
                                  primary="AA Membership (Optional)"
                                  secondary="Join AA to save UGX 100,000 on this application"
                                />
                              </ListItem>
                            )}
                          </List>
                        </Card>

                        {/* Declaration */}
                        <Box sx={{ mb: 3 }}>
                          <Typography
                            variant="h6"
                            sx={{ fontWeight: 600, mb: 2 }}
                          >
                            Declaration
                          </Typography>

                          <Controller
                            name="declarationAccepted"
                            control={control}
                            render={({ field }) => (
                              <FormControlLabel
                                control={
                                  <Checkbox {...field} checked={field.value} />
                                }
                                label={
                                  <Typography variant="body2">
                                    I hereby certify that the details given
                                    above are correct and that I understand the
                                    terms and conditions for obtaining an
                                    International Driving Permit.
                                  </Typography>
                                }
                                sx={{ alignItems: "flex-start", mb: 2 }}
                              />
                            )}
                          />

                          <Controller
                            name="termsAccepted"
                            control={control}
                            render={({ field }) => (
                              <FormControlLabel
                                control={
                                  <Checkbox {...field} checked={field.value} />
                                }
                                label={
                                  <Typography variant="body2">
                                    I agree to the terms and conditions of the
                                    Automobile Association of Uganda and
                                    authorize the processing of my application
                                    for an International Driving Permit.
                                  </Typography>
                                }
                                sx={{ alignItems: "flex-start" }}
                              />
                            )}
                          />

                          {(errors.declarationAccepted ||
                            errors.termsAccepted) && (
                            <FormHelperText error sx={{ mt: 1 }}>
                              Please accept both declarations to continue
                            </FormHelperText>
                          )}
                        </Box>

                        {/* Contact Information */}
                        <Alert severity="info">
                          <Typography variant="body2">
                            <strong>Automobile Association of Uganda</strong>
                            <br />
                            Plot 4 Old Portbell Road Suite 8 | P.O. Box 1459
                            Kampala-Uganda
                            <br />
                            Phone: +256-414-255917 or 257054 | Fax:
                            +256-41-250814
                            <br />
                            Email: aauganda@aau.co.ug | Website: www.aau.co.ug
                          </Typography>
                        </Alert>
                      </Box>
                    )}
                    {/* Google Recaptcha*/}
                    {activeStep === 6 && (
                      <Grid item xs={12}>
                        <Box sx={{ mb: 2 }}>
                          <Typography
                            variant="h6"
                            sx={{ fontWeight: 600, mb: 2 }}
                          >
                            Security Verification
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mb: 2 }}
                          >
                            Please complete security verification to submit your application.
                          </Typography>
                          {RECAPTCHA_SITE_KEY ? (
                            <Box>
                              <ReCAPTCHA
                                ref={recaptchaRef}
                                sitekey={RECAPTCHA_SITE_KEY}
                                onChange={handleRecaptchaChange}
                                onErrored={handleRecaptchaError}
                                onExpired={handleRecaptchaExpired}
                                theme="light"
                                size="normal"
                                hl="en"
                              />
                              {recaptchaValue ? (
                                <Alert severity="success" sx={{ mt: 2 }}>
                                  <Typography variant="body2">
                                    ✓ Security verification completed successfully!
                                  </Typography>
                                </Alert>
                              ) : (
                                <Typography
                                  variant="caption"
                                  color="error"
                                  sx={{ mt: 1, display: "block" }}
                                >
                                  * Please complete the reCAPTCHA verification to submit your application
                                </Typography>
                              )}
                            </Box>
                          ) : (
                            <Alert severity="warning">
                              reCAPTCHA is not configured. Add your site key to
                              environment variables.
                            </Alert>
                          )}
                        </Box>
                      </Grid>
                    )}

                    {/* Navigation Buttons */}
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mt: 4,
                        pt: 3,
                        borderTop: 1,
                        borderColor: "divider",
                        gap: 2,
                      }}
                    >
                      {/* Back Button with Enhanced Styling */}
                      {activeStep > 0 && (
                        <Button
                          disabled={activeStep === 0}
                          onClick={handleBack}
                          variant="outlined"
                          size="large"
                          startIcon={<ArrowBack />}
                          sx={{
                            minWidth: { xs: "120px", sm: "140px" },
                            borderColor:
                              activeStep === 0 ? "grey.300" : "primary.main",
                            color:
                              activeStep === 0 ? "grey.400" : "primary.main",
                            "&:hover": {
                              color: "grey.50",
                              border: "none",
                              backgroundColor:
                                activeStep === 0
                                  ? "transparent"
                                  : "primary.light",
                              transform:
                                activeStep === 0 ? "none" : "translateX(-2px)",
                            },
                            "&:disabled": {
                              borderColor: "grey.300",
                              color: "grey.400",
                              backgroundColor: "transparent",
                            },
                            transition: "all 0.2s ease-in-out",
                          }}
                        >
                          Back
                        </Button>
                      )}

                      {/* Step Counter */}
                      <Box
                        sx={{
                          display: { xs: "none", sm: "flex" },
                          flexDirection: "column",
                          alignItems: "center",
                          px: 2,
                        }}
                      >
                        <Typography variant="caption" color="text.secondary">
                          Step {activeStep + 1} of {steps.length}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="primary.main"
                          sx={{ fontWeight: 500 }}
                        >
                          {steps[activeStep]}
                        </Typography>
                      </Box>

                      {/* Next/Submit Button */}
                      <Button
                        variant="contained"
                        onClick={handleNext}
                        size="large"
                        disabled={
                          isLoading ||
                          (activeStep === steps.length - 1 && !recaptchaValue)
                        }
                        startIcon={
                          activeStep === steps.length - 1 ? (
                            <>
                              {isLoading ? (
                                <CircularProgress color="secondary" size={20} />
                              ) : (
                                <Verified />
                              )}
                            </>
                          ) : undefined
                        }
                        sx={{
                          minWidth: { xs: "140px", sm: "180px" },
                          background: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
                          "&:hover": {
                            background: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
                            transform: isLoading ? "none" : "scale(1.02)",
                          },
                          "&.MuiButtonBase-root.MuiButton-root.Mui-disabled":
                              {
                                color: isLoading ? `${theme.palette.secondary.main} !important` : `${theme.palette.grey[500]} !important`,
                              },
                          transition: "all 0.2s ease-in-out",
                          fontWeight: 600,
                        }}
                      >
                        {isLoading
                          ? "Submitting..."
                          : activeStep === steps.length - 1
                          ? "Submit Application"
                          : "Next Step"}
                      </Button>
                    </Box>
                  </FormPaper>
                </form>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Enhanced Alert Notification - Top Right Positioning */}
        <AlertNotification
          open={showAlert}
          message={alertMessage}
          severity={alertSeverity}
          onClose={() => setShowAlert(false)}
          autoHideDuration={alertConfig?.autoHideDuration || 6000}
          position={
            alertConfig?.anchorOrigin?.vertical === "top" &&
            alertConfig?.anchorOrigin?.horizontal === "right"
              ? "top-right"
              : alertConfig?.anchorOrigin?.vertical === "top" &&
                alertConfig?.anchorOrigin?.horizontal === "center"
              ? "top-center"
              : "bottom-center"
          }
          showCloseButton={alertConfig?.showCloseButton ?? true}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default ApplyForIdp;

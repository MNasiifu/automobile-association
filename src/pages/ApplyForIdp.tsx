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
  Chip,
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

  Security as SecurityIcon,
  Speed as SpeedIcon,
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
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
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
import { DecorativeBackground, PhotoValidationDisplay } from "../components/molecules";
import { SEO } from "../components/SEO";
import { applyIdpSEO } from "../data/seoData";
import { passportPhotoRequirements } from "../utils/passportPhotoValidator";
import useApplyForIdp, { 
  type IDPFormData, 
  drivingPermitClasses, 
  membershipBenefits 
} from "../hooks/useApplyForIdp";

const FeatureCard = styled(Card)(({ theme }) => ({
  height: "100%",
  transition: "all 0.3s ease-in-out",
  border: `1px solid ${theme.palette.divider}`,
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: theme.shadows[8],
    borderColor: theme.palette.primary.main,
  },
}));

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
    steps,
    
    // Loading states are now handled by the global loading context
    
    // Form
    control,
    handleSubmit,
    watch,
    errors,
    isSubmitting,
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
    
    // State setters
    setShowAlert,
    setShowPhotoRequirements,
  } = useApplyForIdp();

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
        {fieldName === 'passportPhoto' && (
          <Box sx={{ mt: 2 }}>
            <Button
              variant="outlined"
              size="small"
              startIcon={<InfoIcon />}
              endIcon={showPhotoRequirements ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              onClick={() => setShowPhotoRequirements(!showPhotoRequirements)}
              sx={{ 
                mb: showPhotoRequirements ? 2 : 0,
                borderColor: 'primary.main',
                color: 'primary.main',
                '&:hover': {
                  backgroundColor: 'primary.main',
                  borderColor: 'primary.dark',
                  color: 'white',
                }
              }}
            >
              {showPhotoRequirements ? 'Hide Photo Requirements' : 'Show Photo Requirements'}
            </Button>
            
            {/* Photo Requirements Display */}
            <Collapse in={showPhotoRequirements}>
              <Card sx={{ mt: 2, border: '1px solid', borderColor: 'primary.light' }}>
                <CardContent sx={{ p: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'primary.main' }}>
                    Passport Photo Requirements
                  </Typography>
                  {passportPhotoRequirements.map((category, categoryIndex) => (
                    <Box key={categoryIndex} sx={{ mb: categoryIndex < passportPhotoRequirements.length - 1 ? 3 : 0 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: 'text.primary' }}>
                        {category.category}
                      </Typography>
                      <List dense sx={{ pl: 2 }}>
                        {category.requirements.map((requirement, reqIndex) => (
                          <ListItem key={reqIndex} sx={{ py: 0.25, px: 0 }}>
                            <ListItemIcon sx={{ minWidth: 20 }}>
                              <CheckCircleIcon sx={{ fontSize: 16, color: 'success.main' }} />
                            </ListItemIcon>
                            <ListItemText 
                              primary={requirement} 
                              primaryTypographyProps={{ 
                                variant: 'body2',
                                sx: { lineHeight: 1.4 }
                              }} 
                            />
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  ))}
                  <Alert severity="info" sx={{ mt: 2 }}>
                    <Typography variant="body2">
                      <strong>Tip:</strong> Upload a photo that meets these requirements to ensure faster processing of your application.
                    </Typography>
                  </Alert>
                </CardContent>
              </Card>
            </Collapse>
          </Box>
        )}
        
        {/* Photo Validation Display for Passport Photo */}
        {fieldName === 'passportPhoto' && fieldValue && (
          <Box sx={{ mt: 2 }}>
            {photoValidationState.isValidating && (
              <Alert severity="info" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
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

        {/* Membership Benefits Section */}
        <Box sx={{ py: 6, backgroundColor: "grey.50" }}>
          <Container maxWidth="lg">
            <Box sx={{ textAlign: "center", mb: 4 }}>
              <Heading variant="h3" align="center" gutterBottom>
                Why Join AA Uganda?
              </Heading>
              <Typography variant="h6" color="text.secondary">
                Enjoy exclusive benefits and significant savings as an AA member
              </Typography>
            </Box>

            <Grid container spacing={3}>
              {membershipBenefits.map((benefit, index) => {
                // Render the appropriate icon based on the icon name
                const IconComponent = 
                  benefit.icon === "CardMembership" ? CardMembership :
                  benefit.icon === "SpeedIcon" ? SpeedIcon :
                  benefit.icon === "SecurityIcon" ? SecurityIcon :
                  CardMembership; // fallback
                
                return (
                  <Grid item xs={12} md={4} key={index}>
                    <FeatureCard>
                      <CardContent sx={{ textAlign: "center", p: 3 }}>
                        <IconComponent sx={{ fontSize: 40, color: "primary.main" }} />
                        <Typography
                          variant="h6"
                          sx={{ mt: 2, mb: 1, fontWeight: 600 }}
                        >
                          {benefit.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mb: 2 }}
                        >
                          {benefit.description}
                        </Typography>
                        {"savings" in benefit && (
                          <Chip
                            label={benefit.savings}
                            color="secondary"
                            variant="filled"
                            sx={{ fontWeight: 600 }}
                          />
                        )}
                      </CardContent>
                    </FeatureCard>
                  </Grid>
                );
              })}
            </Grid>
          </Container>
        </Box>

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
                  <StyledStepper
                    activeStep={activeStep}
                    orientation="vertical"
                    sx={{
                      "& .MuiStepContent-root": { borderLeft: "none", pl: 3 },
                    }}
                  >
                    {steps.map((label, index) => (
                      <Step key={label}>
                        <StepLabel>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {label}
                          </Typography>
                        </StepLabel>
                        {activeStep === index && (
                          <StepContent>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              sx={{ mt: 1, display: "block" }}
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
                                "Review and confirm your application"}
                            </Typography>
                          </StepContent>
                        )}
                      </Step>
                    ))}
                  </StyledStepper>
                </Paper>
              </Grid>

              {/* Form Content */}
              <Grid item xs={12} md={8}>
                <form onSubmit={handleSubmit(handleFormSubmit as any)}>
                  <FormPaper>
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
                                  <TextField
                                    {...field}
                                    fullWidth
                                    label="AA Membership Number *"
                                    error={!!error}
                                    helperText={error?.message}
                                    InputProps={{
                                      startAdornment: (
                                        <CardMembership
                                          sx={{
                                            mr: 1,
                                            color: "text.secondary",
                                          }}
                                        />
                                      ),
                                    }}
                                  />
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
                                  label="First Name *"
                                  error={!!error}
                                  helperText={error?.message}
                                  InputProps={{
                                    startAdornment: (
                                      <AccountCircle
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
                              name="otherNames"
                              control={control}
                              render={({ field, fieldState: { error } }) => (
                                <TextField
                                  {...field}
                                  fullWidth
                                  label="Last Name *"
                                  error={!!error}
                                  helperText={error?.message}
                                  InputProps={{
                                    startAdornment: (
                                      <AccountCircle
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
                                  label="Email Address *"
                                  type="email"
                                  error={!!error}
                                  helperText={error?.message}
                                  InputProps={{
                                    startAdornment: (
                                      <Email
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
                              name="telephoneNumber"
                              control={control}
                              render={({ field, fieldState: { error } }) => (
                                <TextField
                                  {...field}
                                  fullWidth
                                  label="Telephone Number *"
                                  error={!!error}
                                  helperText={error?.message}
                                  placeholder="+256-414-255917"
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
                              maxSizeMB={5}
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
                              maxSizeMB={5}
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
                              maxSizeMB={2}
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

                    {/* Step 6: Declaration & Submit */}
                    {activeStep === 5 && (
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

                    {/* Navigation Buttons */}
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mt: 4,
                        pt: 3,
                        borderTop: 1,
                        borderColor: "divider",
                      }}
                    >
                      <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        variant="outlined"
                        size="large"
                      >
                        Back
                      </Button>

                      <Button
                        variant="contained"
                        onClick={handleNext}
                        size="large"
                        disabled={isSubmitting}
                        startIcon={
                          activeStep === steps.length - 1 ? (
                            <Verified />
                          ) : undefined
                        }
                      >
                        {isSubmitting
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
            alertConfig?.anchorOrigin?.vertical === 'top' && alertConfig?.anchorOrigin?.horizontal === 'right' 
              ? 'top-right'
              : alertConfig?.anchorOrigin?.vertical === 'top' && alertConfig?.anchorOrigin?.horizontal === 'center'
              ? 'top-center'
              : 'bottom-center'
          }
          showCloseButton={alertConfig?.showCloseButton ?? true}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default ApplyForIdp;

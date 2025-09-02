import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
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
  Snackbar,
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
  ListItemText
} from '@mui/material';
import {
  DriveEta,
  Public as PublicIcon,
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
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { Button, Heading, HeaderContainer, ContentContainer, AnimatedTitle, AnimatedSubtitle, AnimatedDescription, SectionDivider } from '../components/atoms';
import { DecorativeBackground } from '../components/molecules';

// Validation schema based on idp.md requirements
const validationSchema = yup.object({
  // Membership info
  isMember: yup.boolean().required('Please specify if you are an AA member'),
  membershipNumber: yup.string().when('isMember', {
    is: true,
    then: (schema) => schema.required('Membership number is required for AA members'),
    otherwise: (schema) => schema.notRequired(),
  }),
  
  // Personal information
  surname: yup.string().required('Surname is required'),
  otherNames: yup.string().required('Other names are required'),
  dateOfBirth: yup.date().nullable().required('Date of birth is required').max(new Date(), 'Date of birth cannot be in the future'),
  placeOfBirth: yup.string().required('Place of birth is required'),
  
  // Contact information
  postalAddress: yup.string().required('Postal address is required'),
  emailAddress: yup.string().email('Invalid email format').required('Email address is required'),
  telephoneNumber: yup.string().required('Telephone number is required'),
  mobileNumber: yup.string().required('Mobile number is required'),
  residentialAddress: yup.string().required('Residential address is required'),
  streetRoadPlot: yup.string().required('Street/Road/Plot is required'),
  
  // Passport and visa information
  passportNumber: yup.string().required('Passport number is required'),
  countryOfAcquiredVisa: yup.string().required('Country of acquired visa is required'),
  
  // Driving license information
  ugandaDrivingPermitNumber: yup.string().required('Uganda driving permit number is required'),
  expiryDateOfDrivingPermit: yup.date().nullable().required('Expiry date of driving permit is required')
    .min(new Date(), 'Driving permit must be valid'),
  classesOfDrivingPermit: yup.array().of(yup.string().required()).min(1, 'At least one driving permit class is required'),
  
  // Terms and declaration
  termsAccepted: yup.boolean().oneOf([true], 'You must accept the terms and conditions'),
  declarationAccepted: yup.boolean().oneOf([true], 'You must confirm the declaration'),
});

type IDPFormData = yup.InferType<typeof validationSchema>;

const FeatureCard = styled(Card)(({ theme }) => ({
  height: '100%',
  transition: 'all 0.3s ease-in-out',
  border: `1px solid ${theme.palette.divider}`,
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[8],
    borderColor: theme.palette.primary.main,
  },
}));

const StyledStepper = styled(Stepper)(({ theme }) => ({
  '& .MuiStepLabel-root .Mui-completed': {
    color: theme.palette.success.main,
  },
  '& .MuiStepLabel-root .Mui-active': {
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

const drivingPermitClasses = [
  { value: 'A', label: 'Class A - Motorcycles' },
  { value: 'B', label: 'Class B - Light Motor Vehicles' },
  { value: 'C', label: 'Class C - Medium Motor Vehicles' },
  { value: 'D', label: 'Class D - Heavy Motor Vehicles' },
  { value: 'E', label: 'Class E - Articulated Vehicles' },
  { value: 'F', label: 'Class F - Public Service Vehicles' },
];

const membershipBenefits = [
  {
    icon: <CardMembership sx={{ fontSize: 40, color: 'primary.main' }} />,
    title: 'AA Member Rate',
    description: 'Pay only UGX 250,000 instead of UGX 350,000',
    savings: 'Save UGX 100,000'
  },
  {
    icon: <SpeedIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
    title: 'Priority Processing',
    description: 'Faster processing times for AA members',
  },
  {
    icon: <SecurityIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
    title: 'Additional Support',
    description: 'Access to AA roadside assistance and travel support',
  },
];

const ApplyForIdp: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'warning' | 'error'>('success');

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    trigger,
  } = useForm<IDPFormData>({
    resolver: yupResolver(validationSchema) as any,
    defaultValues: {
      isMember: false,
      membershipNumber: '',
      surname: '',
      otherNames: '',
      dateOfBirth: undefined,
      placeOfBirth: '',
      postalAddress: '',
      emailAddress: '',
      telephoneNumber: '',
      mobileNumber: '',
      residentialAddress: '',
      streetRoadPlot: '',
      passportNumber: '',
      countryOfAcquiredVisa: '',
      ugandaDrivingPermitNumber: '',
      expiryDateOfDrivingPermit: undefined,
      classesOfDrivingPermit: [],
      termsAccepted: false,
      declarationAccepted: false,
    },
    mode: 'onChange',
  });

  const watchedIsMember = watch('isMember');
  const watchedFormData = watch();

  const steps = [
    'Membership & Personal Info',
    'Contact Details',
    'Passport & Visa Info',
    'Driving License Details',
    'Declaration & Submit',
  ];

  const showAlertMessage = (message: string, severity: 'success' | 'warning' | 'error' = 'success') => {
    setAlertMessage(message);
    setAlertSeverity(severity);
    setShowAlert(true);
  };

  const handleNext = async () => {
    let fieldsToValidate: (keyof IDPFormData)[] = [];
    
    switch (activeStep) {
      case 0:
        fieldsToValidate = ['isMember', 'surname', 'otherNames', 'dateOfBirth', 'placeOfBirth'];
        if (watchedIsMember) fieldsToValidate.push('membershipNumber');
        break;
      case 1:
        fieldsToValidate = ['postalAddress', 'emailAddress', 'telephoneNumber', 'mobileNumber', 'residentialAddress', 'streetRoadPlot'];
        break;
      case 2:
        fieldsToValidate = ['passportNumber', 'countryOfAcquiredVisa'];
        break;
      case 3:
        fieldsToValidate = ['ugandaDrivingPermitNumber', 'expiryDateOfDrivingPermit', 'classesOfDrivingPermit'];
        break;
      case 4:
        fieldsToValidate = ['termsAccepted', 'declarationAccepted'];
        break;
    }

    const isStepValid = await trigger(fieldsToValidate);
    
    if (!isStepValid) {
      showAlertMessage('Please fill in all required fields correctly', 'warning');
      return;
    }

    if (activeStep === steps.length - 1) {
      handleFormSubmit(watchedFormData);
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleFormSubmit = async (data: IDPFormData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      showAlertMessage('Application submitted successfully! You will receive a confirmation email shortly.', 'success');
      console.log('Form submitted:', data);
      
      // In a real app, you would submit to your backend here
    } catch (error) {
      showAlertMessage('Failed to submit application. Please try again.', 'error');
    }
  };

  const applicationFee = watchedIsMember ? 250000 : 350000;

  return (
    <Box>
      {/* Page Header */}
      <HeaderContainer>
        <DecorativeBackground />
        
        <ContentContainer maxWidth="md">
          <Box className="page-header-content">
            <Box className="content-inner">
              <Box className="main-content">
                <AnimatedTitle variant="h1" component="h1">
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
                    <DriveEta sx={{ fontSize: { xs: 40, md: 60 }, color: 'inherit' }} />
                    <Box component="span">International Driving Permit</Box>
                  </Box>
                </AnimatedTitle>

                <AnimatedSubtitle>
                  Apply for your International Driving Permit through the Automobile Association of Uganda
                </AnimatedSubtitle>

                <AnimatedDescription>
                  Plot 4 Old Portbell Road Suite 8, P.O. Box 1459 Kampala-Uganda
                </AnimatedDescription>

                <SectionDivider />
              </Box>
            </Box>
          </Box>
        </ContentContainer>
      </HeaderContainer>

      {/* Membership Benefits Section */}
      <Box sx={{ py: 6, backgroundColor: 'grey.50' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Heading variant="h3" align="center" gutterBottom>
              Why Join AA Uganda?
            </Heading>
            <Typography variant="h6" color="text.secondary">
              Enjoy exclusive benefits and significant savings as an AA member
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {membershipBenefits.map((benefit, index) => (
              <Grid item xs={12} md={4} key={index}>
                <FeatureCard>
                  <CardContent sx={{ textAlign: 'center', p: 3 }}>
                    {benefit.icon}
                    <Typography variant="h6" sx={{ mt: 2, mb: 1, fontWeight: 600 }}>
                      {benefit.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {benefit.description}
                    </Typography>
                    {'savings' in benefit && (
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
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Application Form Section */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Heading variant="h2" align="center" gutterBottom>
              IDP Application Form
            </Heading>
            <Typography variant="h6" color="text.secondary">
              Complete the form below to apply for your International Driving Permit
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
                      : "Non-AA Member rate applies. Consider joining AA for significant savings!"
                    }
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
                  <Typography variant="h4" color="primary.main" sx={{ fontWeight: 700 }}>
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
              <Paper sx={{ p: 3, position: 'sticky', top: 120 }}>
                <StyledStepper 
                  activeStep={activeStep} 
                  orientation="vertical"
                  sx={{ '& .MuiStepContent-root': { borderLeft: 'none', pl: 3 } }}
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
                          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                            {index === 0 && "Enter membership status and personal information"}
                            {index === 1 && "Provide your contact and address details"}
                            {index === 2 && "Enter passport and visa information"}
                            {index === 3 && "Provide your Uganda driving license details"}
                            {index === 4 && "Review and confirm your application"}
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
                      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                        Membership & Personal Information
                      </Typography>
                      
                      {/* Membership Status */}
                      <Card sx={{ mb: 3, p: 2, backgroundColor: 'grey.50' }}>
                        <FormLabel component="legend" sx={{ fontWeight: 600, mb: 2 }}>
                          AA Membership Status
                        </FormLabel>
                        <Controller
                          name="isMember"
                          control={control}
                          render={({ field }) => (
                            <RadioGroup
                              {...field}
                              value={field.value ? 'yes' : 'no'}
                              onChange={(e) => field.onChange(e.target.value === 'yes')}
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
                                    startAdornment: <CardMembership sx={{ mr: 1, color: 'text.secondary' }} />
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
                                label="Surname *"
                                error={!!error}
                                helperText={error?.message}
                                InputProps={{
                                  startAdornment: <AccountCircle sx={{ mr: 1, color: 'text.secondary' }} />
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
                                label="Other Names *"
                                error={!!error}
                                helperText={error?.message}
                                InputProps={{
                                  startAdornment: <AccountCircle sx={{ mr: 1, color: 'text.secondary' }} />
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
                              <TextField
                                {...field}
                                fullWidth
                                label="Date of Birth *"
                                type="date"
                                error={!!error}
                                helperText={error?.message}
                                InputLabelProps={{ shrink: true }}
                                value={field.value ? field.value.toISOString().split('T')[0] : ''}
                                onChange={(e) => field.onChange(e.target.value ? new Date(e.target.value) : null)}
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
                                  startAdornment: <LocationOn sx={{ mr: 1, color: 'text.secondary' }} />
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
                      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
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
                                  startAdornment: <Email sx={{ mr: 1, color: 'text.secondary' }} />
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
                                  startAdornment: <Phone sx={{ mr: 1, color: 'text.secondary' }} />
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
                                  startAdornment: <Phone sx={{ mr: 1, color: 'text.secondary' }} />
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
                      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
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
                                  startAdornment: <Description sx={{ mr: 1, color: 'text.secondary' }} />
                                }}
                              />
                            )}
                          />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <Controller
                            name="countryOfAcquiredVisa"
                            control={control}
                            render={({ field, fieldState: { error } }) => (
                              <TextField
                                {...field}
                                fullWidth
                                label="Country of Acquired Visa *"
                                error={!!error}
                                helperText={error?.message}
                                placeholder="e.g., Kenya, Tanzania, Rwanda"
                                InputProps={{
                                  startAdornment: <PublicIcon sx={{ mr: 1, color: 'text.secondary' }} />
                                }}
                              />
                            )}
                          />
                        </Grid>
                      </Grid>

                      <Alert severity="info" sx={{ mt: 3 }}>
                        <Typography variant="body2">
                          <strong>Required Documents:</strong><br />
                          • Copy of passport bio-data page<br />
                          • Copy of visa for the country intended to travel to<br />
                          • 2 passport-size photos
                        </Typography>
                      </Alert>
                    </Box>
                  )}

                  {/* Step 4: Driving License Details */}
                  {activeStep === 3 && (
                    <Box>
                      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
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
                                  startAdornment: <DriveEta sx={{ mr: 1, color: 'text.secondary' }} />
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
                              <TextField
                                {...field}
                                fullWidth
                                label="Expiry Date of Driving Permit *"
                                type="date"
                                error={!!error}
                                helperText={error?.message}
                                InputLabelProps={{ shrink: true }}
                                value={field.value ? field.value.toISOString().split('T')[0] : ''}
                                onChange={(e) => field.onChange(e.target.value ? new Date(e.target.value) : null)}
                              />
                            )}
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <FormLabel component="legend" sx={{ fontWeight: 600, mb: 2 }}>
                            Classes of Driving Permit *
                          </FormLabel>
                          <Controller
                            name="classesOfDrivingPermit"
                            control={control}
                            render={({ field, fieldState: { error } }) => (
                              <Box>
                                <Grid container spacing={2}>
                                  {drivingPermitClasses.map((permitClass) => (
                                    <Grid item xs={12} sm={6} key={permitClass.value}>
                                      <FormControlLabel
                                        control={
                                          <Checkbox
                                            checked={field.value?.includes(permitClass.value) || false}
                                            onChange={(e) => {
                                              const currentValue = field.value || [];
                                              const newValue = e.target.checked
                                                ? [...currentValue, permitClass.value]
                                                : currentValue.filter(v => v !== permitClass.value);
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
                                  <FormHelperText error>{error.message}</FormHelperText>
                                )}
                              </Box>
                            )}
                          />
                        </Grid>
                      </Grid>

                      <Alert severity="warning" sx={{ mt: 3 }}>
                        <Typography variant="body2">
                          <strong>Important:</strong> A permit can only be issued to holders of GENUINE and VALID Ugandan Driving Permits (not holders of Provisional Driving Permits). The current Driving Permit must be produced and a photocopy is made and retained.
                        </Typography>
                      </Alert>
                    </Box>
                  )}

                  {/* Step 5: Declaration & Submit */}
                  {activeStep === 4 && (
                    <Box>
                      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                        Declaration & Submit
                      </Typography>
                      
                      {/* Application Summary */}
                      <Card sx={{ mb: 3, p: 3, backgroundColor: 'primary.light', color: 'primary.contrastText' }}>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                          Application Summary
                        </Typography>
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Typography variant="body2">
                              <strong>Application Type:</strong><br />
                              International Driving Permit
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body2">
                              <strong>Application Fee:</strong><br />
                              UGX {applicationFee.toLocaleString()}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body2">
                              <strong>Membership Status:</strong><br />
                              {watchedIsMember ? 'AA Member' : 'Non-AA Member'}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body2">
                              <strong>Processing Time:</strong><br />
                              2-3 working days
                            </Typography>
                          </Grid>
                        </Grid>
                      </Card>

                      {/* Required Documents Checklist */}
                      <Card sx={{ mb: 3, p: 3 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                          Required Documents Checklist
                        </Typography>
                        <List>
                          <ListItem>
                            <ListItemIcon>
                              <CheckCircleIcon color="success" />
                            </ListItemIcon>
                            <ListItemText primary="Copy of Passport bio-data page" />
                          </ListItem>
                          <ListItem>
                            <ListItemIcon>
                              <CheckCircleIcon color="success" />
                            </ListItemIcon>
                            <ListItemText primary="Copy of Visa for intended travel country" />
                          </ListItem>
                          <ListItem>
                            <ListItemIcon>
                              <CheckCircleIcon color="success" />
                            </ListItemIcon>
                            <ListItemText primary="2 Passport-size Photos" />
                          </ListItem>
                          <ListItem>
                            <ListItemIcon>
                              <CheckCircleIcon color="success" />
                            </ListItemIcon>
                            <ListItemText primary="Copy of Valid Uganda Driving Permit" />
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
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                          Declaration
                        </Typography>
                        
                        <Controller
                          name="declarationAccepted"
                          control={control}
                          render={({ field }) => (
                            <FormControlLabel
                              control={
                                <Checkbox 
                                  {...field}
                                  checked={field.value}
                                />
                              }
                              label={
                                <Typography variant="body2">
                                  I hereby certify that the details given above are correct and that I understand the terms and conditions for obtaining an International Driving Permit.
                                </Typography>
                              }
                              sx={{ alignItems: 'flex-start', mb: 2 }}
                            />
                          )}
                        />

                        <Controller
                          name="termsAccepted"
                          control={control}
                          render={({ field }) => (
                            <FormControlLabel
                              control={
                                <Checkbox 
                                  {...field}
                                  checked={field.value}
                                />
                              }
                              label={
                                <Typography variant="body2">
                                  I agree to the terms and conditions of the Automobile Association of Uganda and authorize the processing of my application for an International Driving Permit.
                                </Typography>
                              }
                              sx={{ alignItems: 'flex-start' }}
                            />
                          )}
                        />
                        
                        {(errors.declarationAccepted || errors.termsAccepted) && (
                          <FormHelperText error sx={{ mt: 1 }}>
                            Please accept both declarations to continue
                          </FormHelperText>
                        )}
                      </Box>

                      {/* Contact Information */}
                      <Alert severity="info">
                        <Typography variant="body2">
                          <strong>Automobile Association of Uganda</strong><br />
                          Plot 4 Old Portbell Road Suite 8 | P.O. Box 1459 Kampala-Uganda<br />
                          Phone: +256-414-255917 or 257054 | Fax: +256-41-250814<br />
                          Email: aauganda@aau.co.ug | Website: www.aau.co.ug
                        </Typography>
                      </Alert>
                    </Box>
                  )}

                  {/* Navigation Buttons */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4, pt: 3, borderTop: 1, borderColor: 'divider' }}>
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
                      startIcon={activeStep === steps.length - 1 ? <Verified /> : undefined}
                    >
                      {isSubmitting 
                        ? 'Submitting...' 
                        : activeStep === steps.length - 1 
                          ? 'Submit Application' 
                          : 'Next Step'
                      }
                    </Button>
                  </Box>
                </FormPaper>
              </form>
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
          severity={alertSeverity}
          sx={{ width: '100%' }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ApplyForIdp;

import React, { useState, useRef } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Paper,
  Snackbar,
  Alert,
} from '@mui/material';
import { parsePhoneNumber } from 'libphonenumber-js/min';
import { Phone, Email, LocationOn } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { Heading, Button, Card } from '../components/atoms';
import { PageHeader } from '../components/molecules';
import { companyInfo } from '../data/companyData';
import emailjs from '@emailjs/browser';
import ReCAPTCHA from 'react-google-recaptcha';
import { MuiTelInput } from 'mui-tel-input';
import type { MuiTelInputInfo } from 'mui-tel-input';

// ---- reCAPTCHA key from environment variables ----
const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || '';

// ---- Intl helper for country display name in emails ----
const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
const countryNameOf = (iso2?: string) => (iso2 ? regionNames.of(iso2) ?? '' : '');

// ---- Styled sections ----
const ContactSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0),
}));

const MapSection = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.grey[50],
  padding: theme.spacing(6, 0),
}));

const ContactCard = styled(Card)(({ theme }) => ({
  height: '100%',
  textAlign: 'center',
  padding: theme.spacing(4),
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.shadows[8],
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  width: 60,
  height: 60,
  borderRadius: '50%',
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto 16px auto',
  position: 'relative',
  boxShadow: `0 8px 24px ${theme.palette.primary.main}30`,
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  border: '3px solid white',
  '& .MuiSvgIcon-root': {
    color: 'white',
    fontSize: '2rem',
    transition: 'transform 0.3s ease',
  },
  '& .icon': {
    transition: 'transform 0.3s ease',
  },
}));

const FormSection = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  height: '100%',
}));

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    // phone fields
    phoneFull: '', // e.g. +256712345678
    phoneCountry: 'UG', // ISO2 (default Uganda)
    phoneDialCode: '+256',
    phoneNational: '',
    subject: '',
    message: '',
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error' | 'warning' | 'info',
  });

  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const validatePhoneNumber = (phoneNumber: string, countryCode?: string) => {
    try {
      // Remove any spaces or special characters
      const cleanNumber = phoneNumber.replace(/\s+/g, '');
      
      if (countryCode) {
        console.log('Validating number:', {
          input: cleanNumber,
          countryCode
        });
        
        const parsed = parsePhoneNumber(cleanNumber, countryCode as any);
        
        if (parsed) {
          console.log('Parsed result:', {
            nationalNumber: parsed.nationalNumber,
            countryCallingCode: parsed.countryCallingCode,
            number: parsed.number,
            formatInternational: parsed.formatInternational(),
            isValid: parsed.isValid()
          });
        }
        
        if (!parsed) {
          return { 
            isValid: false, 
            error: 'Invalid phone number format' 
          };
        }

        // Check if country code matches
        if (!cleanNumber.startsWith(`+${parsed.countryCallingCode}`)) {
          return {
            isValid: false,
            error: `Phone number should start with +${parsed.countryCallingCode}`
          };
        }

        // Check if number after country code starts with 0
        // Extract the part after the country code from the clean number
        const afterCountryCode = cleanNumber.substring(cleanNumber.indexOf(parsed.countryCallingCode) + parsed.countryCallingCode.length);
        if (afterCountryCode.startsWith('0')) {
          return {
            isValid: false,
            error: `Do not include 0 after country code +${parsed.countryCallingCode}`
          };
        }

        // Also check the national number format
        const nationalNumber = parsed.nationalNumber || '';
        if (nationalNumber.startsWith('0')) {
          return {
            isValid: false,
            error: `Do not include 0 after country code +${parsed.countryCallingCode}`
          };
        }

        // Common phone number lengths by country
        const countryLengths: { [key: string]: number } = {
          'UG': 9, // Uganda
          'KE': 9, // Kenya
          'TZ': 9, // Tanzania
          'RW': 9, // Rwanda
          'BI': 8, // Burundi
          'ET': 9, // Ethiopia
          'SS': 9, // South Sudan
          'CD': 9, // DR Congo
          // Add more countries as needed
        };

        const expectedLength = countryLengths[countryCode] || 9; // Default to 9 if country not in list
        if (nationalNumber.length !== expectedLength) {
          return {
            isValid: false,
            error: `Phone number should be ${expectedLength} digits after +${parsed.countryCallingCode}`
          };
        }

        if (parsed.isValid()) {
          return {
            isValid: true,
            formattedNumber: parsed.formatInternational(),
            type: parsed.getType(),
            countryCallingCode: parsed.countryCallingCode,
            nationalNumber: parsed.nationalNumber
          };
        }
      }
      
      // If no country code provided or country-specific validation fails,
      // try to parse without a specific country
      const parsed = parsePhoneNumber(cleanNumber);
      if (parsed?.isValid()) {
        return {
          isValid: true,
          formattedNumber: parsed.formatInternational(),
          type: parsed.getType(),
          countryCallingCode: parsed.countryCallingCode,
          nationalNumber: parsed.nationalNumber
        };
      }
      
      return { 
        isValid: false, 
        error: 'Please enter a valid phone number with country code' 
      };
    } catch (error) {
      return { 
        isValid: false, 
        error: 'Invalid phone number format. Please include country code.' 
      };
    }
  };

const isFormValid = () =>
    !!formState.firstName &&
    !!formState.lastName &&
    !!formState.email &&
    !!formState.subject &&
    !!formState.message &&
    !!formState.phoneFull &&
    validatePhoneNumber(formState.phoneFull, formState.phoneCountry).isValid &&
    !!recaptchaValue;

  const contactMethods = [
    {
      icon: <Phone sx={{ fontSize: 28 }} />,
      title: 'Phone',
      primary: companyInfo.contact.phone.replace(', ', ' | '),
      secondary: 'Available 24/7 for emergency assistance',
      href: `tel:${companyInfo.contact.phone.split(', ')[0]}`,
    },
    {
      icon: <Email sx={{ fontSize: 28 }} />,
      title: 'Email',
      primary: companyInfo.contact.email,
      secondary: 'We respond within 24 hours',
      href: `mailto:${companyInfo.contact.email}`,
    },
    {
      icon: <LocationOn sx={{ fontSize: 28 }} />,
      title: 'Address',
      primary: 'Plot 4 Old Portbell Road Suite 8 | P.O. Box 1459 Kampala-Uganda',
      secondary:
        'Business Hours: Mon - Fri: 8:00 AM - 6:00 PM • Sat: 9:00 AM - 4:00 PM',
      href: `https://maps.google.com/?q=${encodeURIComponent(
        'Plot 4 Old Portbell Road Suite 8 Kampala Uganda'
      )}`,
    },
  ];

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const phoneValidation = validatePhoneNumber(formState.phoneFull, formState.phoneCountry);
    if (!phoneValidation.isValid) {
      setSnackbar({
        open: true,
        message: phoneValidation.error || 'Please enter a valid phone number for the selected country.',
        severity: 'error',
      });
      return;
    }

    if (!recaptchaValue) {
      setSnackbar({
        open: true,
        message: 'Please complete the reCAPTCHA verification',
        severity: 'error',
      });
      return;
    }

    try {
      // Initialize EmailJS with your public key (safe to call multiple times)
      emailjs.init('3cddm8-Ni7ObSmjjE');

      // Construct a helpful subject line for your inbox
      const emailSubject =
        `AAU Contact — ${formState.subject || 'No Subject'} — ` +
        `${formState.firstName} ${formState.lastName} ` +
        `(${formState.email} | ${formState.phoneFull})`;

      await emailjs.send('service_lp5vo2i', 'template_8rvs5ee', {
        // routing
        to_email: 'hadijahaws@gmail.com', // odongkara@aau.co.ug
        reply_to: formState.email,

        // subject for template
        email_subject: emailSubject,

        // identity
        first_name: formState.firstName,
        last_name: formState.lastName,
        from_name: `${formState.firstName} ${formState.lastName}`,
        from_email: formState.email,

        // phone (full + parts + country)
        phone_full: formState.phoneFull,
        phone_country_iso2: formState.phoneCountry,
        phone_country_name: countryNameOf(formState.phoneCountry),
        phone_dial_code: formState.phoneDialCode,
        phone_national: formState.phoneNational,

        // message meta
        subject: formState.subject,
        message: formState.message,
        page_url: typeof window !== 'undefined' ? window.location.href : '',

        // reCAPTCHA
        'g-recaptcha-response': recaptchaValue,
      });

      setSnackbar({
        open: true,
        message: 'Message sent successfully!',
        severity: 'success',
      });

      // Clear form and reset reCAPTCHA
      setFormState({
        firstName: '',
        lastName: '',
        email: '',
        phoneFull: '',
        phoneCountry: 'UG',
        phoneDialCode: '+256',
        phoneNational: '',
        subject: '',
        message: '',
      });
      setRecaptchaValue(null);
      recaptchaRef.current?.reset();
    } catch (error) {
      console.error('Error sending email:', error);
      let errorMessage = 'Failed to send message. Please try again.';

      if (error instanceof Error) {
        if (error.message.toLowerCase().includes('recaptcha')) {
          errorMessage = 'reCAPTCHA verification failed. Please try again.';
        } else if (error.message.toLowerCase().includes('network')) {
          errorMessage =
            'Network error. Please check your connection and try again.';
        }
      }

      setSnackbar({
        open: true,
        message: errorMessage,
        severity: 'error',
      });

      // Reset reCAPTCHA on error
      setRecaptchaValue(null);
      recaptchaRef.current?.reset();
    }
  };

  return (
    <Box>
      <PageHeader
        title="Contact Us"
        subtitle="Get in touch with AAU for emergency assistance, inquiries, or to learn more about our services."
      />

      <ContactSection>
        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
          <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
            {contactMethods.map((method, index) => (
              <Grid item xs={12} md={4} key={index}>
                <ContactCard>
                  <Box
                    component="a"
                    href={method.href}
                    target={method.title === 'Address' ? '_blank' : undefined}
                    rel={
                      method.title === 'Address'
                        ? 'noopener noreferrer'
                        : undefined
                    }
                    sx={{
                      textDecoration: 'none',
                      display: 'block',
                      '&:hover': {
                        '& .icon-wrapper': {
                          transform: 'translateY(-5px)',
                          boxShadow: '0 6px 16px rgba(2, 79, 49, 0.25)',
                        },
                        '& .icon': {
                          transform: 'scale(1.2)',
                        },
                      },
                    }}
                  >
                    <IconWrapper className="icon-wrapper">
                      {React.cloneElement(method.icon, { className: 'icon' })}
                    </IconWrapper>

                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{
                        fontWeight: 700,
                        color: 'primary.main',
                        mb: 2,
                        fontSize: { xs: '1.1rem', md: '1.2rem' },
                      }}
                    >
                      {method.title}
                    </Typography>
                  </Box>

                  <Typography
                    component="a"
                    href={method.href}
                    target={method.title === 'Address' ? '_blank' : undefined}
                    rel={
                      method.title === 'Address'
                        ? 'noopener noreferrer'
                        : undefined
                    }
                    sx={{
                      fontWeight: 500,
                      mb: 1,
                      fontSize: { xs: '0.95rem', md: '1rem' },
                      lineHeight: 1.6,
                      whiteSpace: 'pre-line',
                      color: 'primary.main',
                      textDecoration: 'none',
                      display: 'block',
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    {method.title === 'Phone'
                      ? method.primary.replace(', ', ' | ')
                      : method.primary}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.secondary',
                      fontSize: { xs: '0.85rem', md: '0.9rem' },
                      mt: 1,
                    }}
                  >
                    {method.secondary}
                  </Typography>
                </ContactCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </ContactSection>

      {/* Contact Form & Map Section */}
      <MapSection>
        <Container maxWidth="lg">
          <Grid container spacing={6}>
            {/* Contact Form */}
            <Grid item xs={12} md={6}>
              <FormSection elevation={2} id="talk">
                <Heading variant="h3" gutterBottom>
                  Send us a Message
                </Heading>

                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 4 }}
                >
                  Fill out the form below and we'll get back to you as soon as
                  possible.
                </Typography>

                <Box component="form" onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="First Name"
                        variant="outlined"
                        required
                        value={formState.firstName}
                        onChange={(e) =>
                          setFormState({
                            ...formState,
                            firstName: e.target.value,
                          })
                        }
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Last Name"
                        variant="outlined"
                        required
                        value={formState.lastName}
                        onChange={(e) =>
                          setFormState({
                            ...formState,
                            lastName: e.target.value,
                          })
                        }
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        variant="outlined"
                        required
                        value={formState.email}
                        onChange={(e) =>
                          setFormState({
                            ...formState,
                            email: e.target.value,
                          })
                        }
                      />
                    </Grid>

                    {/* Phone with country/flag selector (default Uganda) */}
                    <Grid item xs={12}>
                      <MuiTelInput
                        fullWidth
                        label="Phone Number"
                        variant="outlined"
                        defaultCountry="UG"
                        forceCallingCode
                        required
                        value={formState.phoneFull}
                        onChange={(value: string, info?: MuiTelInputInfo) => {
                          const validation = validatePhoneNumber(
                            value,
                            info?.countryCode?.toUpperCase()
                          );

                          setFormState((s) => ({
                            ...s,
                            phoneFull: value,
                            phoneCountry:
                              (info?.countryCode ?? s.phoneCountry)?.toUpperCase(),
                            phoneDialCode: validation.isValid
                              ? `+${validation.countryCallingCode}`
                              : info?.countryCallingCode
                              ? `+${info.countryCallingCode}`
                              : s.phoneDialCode,
                            phoneNational: validation.isValid
                              ? validation.nationalNumber ?? ''
                              : info?.nationalNumber ?? s.phoneNational,
                          }));
                        }}
                        error={
                          !!formState.phoneFull &&
                          !validatePhoneNumber(
                            formState.phoneFull,
                            formState.phoneCountry
                          ).isValid
                        }
                        helperText={
                          !!formState.phoneFull
                            ? validatePhoneNumber(
                                formState.phoneFull,
                                formState.phoneCountry
                              ).error || ' '
                            : ' '
                        }
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Subject"
                        variant="outlined"
                        required
                        value={formState.subject}
                        onChange={(e) =>
                          setFormState({
                            ...formState,
                            subject: e.target.value,
                          })
                        }
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Message"
                        multiline
                        rows={4}
                        variant="outlined"
                        required
                        value={formState.message}
                        onChange={(e) =>
                          setFormState({
                            ...formState,
                            message: e.target.value,
                          })
                        }
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Box sx={{ mb: 2 }}>
                        {RECAPTCHA_SITE_KEY ? (
                          <ReCAPTCHA
                            ref={recaptchaRef}
                            sitekey={RECAPTCHA_SITE_KEY}
                            onChange={(value) => {
                              setRecaptchaValue(value);
                              if (value) {
                                setSnackbar((prev) => ({ ...prev, open: false }));
                              }
                            }}
                            onErrored={() => {
                              setRecaptchaValue(null);
                              setSnackbar({
                                open: true,
                                message:
                                  'reCAPTCHA error occurred. Please refresh the page and try again.',
                                severity: 'error',
                              });
                            }}
                            onExpired={() => {
                              setRecaptchaValue(null);
                              setSnackbar({
                                open: true,
                                message:
                                  'reCAPTCHA has expired. Please verify again.',
                                severity: 'warning',
                              });
                            }}
                            theme="light"
                            size="normal"
                            hl="en"
                          />
                        ) : (
                          <Alert severity="warning">
                            reCAPTCHA is not configured. Add your site key to
                            environment variables.
                          </Alert>
                        )}
                      </Box>
                    </Grid>

                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        fullWidth
                        disabled={!isFormValid()}
                        onClick={() => {
                          if (!isFormValid()) {
                            setSnackbar({
                              open: true,
                              message:
                                'Please complete all required fields and reCAPTCHA.',
                              severity: 'error',
                            });
                          }
                        }}
                      >
                        Send Message
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </FormSection>
            </Grid>

            {/* Map */}
            <Grid item xs={12} md={6}>
              <Box>
                <Heading variant="h3" gutterBottom>
                  Find Us Here
                </Heading>

                <Box sx={{ height: '600px', mb: 2 }}>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d278.2569047471456!2d32.600749063051275!3d0.32037999967650627!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMMKwMTknMTMuNCJOIDMywrAzNicwMy4zIkU!5e1!3m2!1sen!2sus!4v1756761503824!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0, borderRadius: '8px' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </Box>

                <Box
                  component="a"
                  href="https://maps.google.com/?q=Automobile+Association+of+Uganda+Plot+4+Old+Portbell+Road+Kampala"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    color: 'primary.main',
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  <LocationOn sx={{ fontSize: 24 }} />
                  <Typography>
                    Plot 4 Old Portbell Road Suite 8 | P.O. Box 1459
                    Kampala-Uganda
                  </Typography>
                </Box>

                <Box
                  sx={{
                    mt: 3,
                    p: 4,
                    backgroundColor: 'error.main',
                    color: 'common.white',
                    borderRadius: 2,
                    boxShadow: '0 4px 12px rgba(211, 47, 47, 0.2)',
                  }}
                >
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                    }}
                  >
                    <Phone /> Emergency Assistance
                  </Typography>

                  <Typography
                    component="a"
                    href={`tel:${companyInfo.contact.emergency.phone}`}
                    sx={{
                      fontWeight: 700,
                      fontSize: { xs: '1rem', md: '1.15rem' },
                      mt: 1,
                      color: 'inherit',
                      textDecoration: 'none',
                      display: 'block',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    24/7 Hotline ({companyInfo.contact.emergency.name}):{' '}
                    {companyInfo.contact.emergency.phone}
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{ mt: 2, opacity: 0.9, fontWeight: 500 }}
                  >
                    For immediate roadside assistance and emergency services
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </MapSection>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Contact;

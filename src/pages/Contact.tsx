import React, { useState, useRef, useCallback, useMemo, memo } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Paper,
  Snackbar,
  Alert,
  CircularProgress,
  Fade,
  Zoom,
  IconButton,
  Tooltip,
  Chip,
  Divider,
  Stack,
} from "@mui/material";

import { parsePhoneNumber } from "libphonenumber-js";
import { 
  Phone, 
  Email, 
  LocationOn, 
  Send as SendIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  WhatsApp as WhatsAppIcon,
  Launch as LaunchIcon,
  Emergency as EmergencyMuiIcon,
  AccessTime as AccessTimeIcon,
  ContactSupport as ContactSupportIcon,
  Sms as SmsIcon,
  SignalCellularAlt as SignalIcon,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { Heading, Button, Card } from "../components/atoms";
import { PageHeader } from "../components/molecules";
import { SEO } from "../components/SEO";
import { companyInfo } from "../data/companyData";
import { contactSEO } from "../data/seoData";
import emailjs from "@emailjs/browser";
import ReCAPTCHA from "react-google-recaptcha";
import { MuiTelInput } from "mui-tel-input";
import type { MuiTelInputInfo } from "mui-tel-input";

import { config } from "../utils/config/config";
import theme from "../theme";

// ---- Type Definitions ----
interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  phoneFull: string;
  phoneCountry: string;
  phoneDialCode: string;
  phoneNational: string;
  subject: string;
  message: string;
}

interface ContactMethod {
  icon: React.ReactElement;
  title: string;
  primary: string;
  secondary: string;
  href: string;
  type: 'phone' | 'email' | 'address';
}

interface SnackbarState {
  open: boolean;
  message: string;
  severity: 'success' | 'error' | 'warning' | 'info';
}

interface PhoneValidationResult {
  isValid: boolean;
  error?: string;
  formattedNumber?: string;
  type?: string;
  countryCallingCode?: string;
  nationalNumber?: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
  recaptcha?: string;
}

// ---- Constants ----
const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || "";
const EMAILJS_PUBLIC_KEY = "3cddm8-Ni7ObSmjjE";
const EMAILJS_SERVICE_ID = "service_lp5vo2i";
const EMAILJS_TEMPLATE_ID = "template_8rvs5ee";
const DEFAULT_COUNTRY = "UG" as const;

// ---- Utility Functions ----
const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
const countryNameOf = (iso2?: string): string =>
  iso2 ? regionNames.of(iso2) ?? "" : "";

// Validation utilities
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidName = (name: string): boolean => {
  return name.trim().length >= 2 && /^[a-zA-Z\s'-]+$/.test(name.trim());
};

// ---- Enhanced Styled Components ----
const ContactSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0),
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(6, 0),
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(4, 0),
  },
}));

const MapSection = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.grey[50],
  padding: theme.spacing(6, 0),
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '1px',
    background: `linear-gradient(90deg, transparent, ${theme.palette.primary.main}30, transparent)`,
  },
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(4, 0),
  },
}));

const ContactCard = styled(Card)(({ theme }) => ({
  height: "100%",
  textAlign: "center",
  padding: theme.spacing(4),
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  cursor: "pointer",
  border: `2px solid transparent`,
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: `linear-gradient(90deg, transparent, ${theme.palette.primary.main}10, transparent)`,
    transition: 'left 0.5s ease',
  },
  "&:hover": {
    transform: "translateY(-12px)",
    boxShadow: `0 20px 40px ${theme.palette.primary.main}20`,
    borderColor: theme.palette.primary.main,
    '&::before': {
      left: '100%',
    },
  },
  "&:focus-visible": {
    outline: `2px solid ${theme.palette.primary.main}`,
    outlineOffset: '2px',
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3),
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  width: 70,
  height: 70,
  borderRadius: "50%",
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto 20px auto",
  position: "relative",
  boxShadow: `0 10px 30px ${theme.palette.primary.main}25`,
  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  cursor: "pointer",
  border: "4px solid white",
  zIndex: 2,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '-5px',
    left: '-5px',
    right: '-5px',
    bottom: '-5px',
    borderRadius: '50%',
    background: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.secondary.light})`,
    zIndex: -1,
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  "& .MuiSvgIcon-root": {
    color: "white",
    fontSize: "2.2rem",
    transition: "all 0.3s ease",
    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
  },
  "& .icon": {
    transition: "transform 0.3s ease",
  },
  '&:hover::before': {
    opacity: 1,
  },
  [theme.breakpoints.down('sm')]: {
    width: 60,
    height: 60,
    "& .MuiSvgIcon-root": {
      fontSize: "2rem",
    },
  },
}));

const FormSection = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(5),
  height: "100%",
  borderRadius: theme.spacing(2),
  position: 'relative',
  background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    borderRadius: `${theme.spacing(2)} ${theme.spacing(2)} 0 0`,
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3),
  },
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.spacing(1.5),
  padding: theme.spacing(1.5, 4),
  fontSize: '1.1rem',
  fontWeight: 600,
  textTransform: 'none',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 0,
    height: 0,
    background: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '50%',
    transform: 'translate(-50%, -50%)',
    transition: 'width 0.3s ease, height 0.3s ease',
  },
  '&:hover::before': {
    width: '300px',
    height: '300px',
  },
  '&.Mui-disabled': {
    background: theme.palette.grey[300],
    color: theme.palette.grey[500],
  },
}));

const MapContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.spacing(2),
  overflow: 'hidden',
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 15px 40px rgba(0, 0, 0, 0.15)',
  },
  '& iframe': {
    transition: 'filter 0.3s ease',
  },
  '&:hover iframe': {
    filter: 'brightness(1.05)',
  },
}));

const EmergencyCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(0),
  background: "#950404d1",
  color: theme.palette.common.white,
  borderRadius: theme.spacing(3),
  position: 'relative',
  overflow: 'hidden',
  cursor: 'pointer',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  border: '2px solid rgba(255, 255, 255, 0.1)',
  
  // Pulsing animation for urgency
  animation: 'emergencyPulse 2s ease-in-out infinite',
  
  // Shimmer effect
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
    animation: 'shimmer 4s infinite',
    zIndex: 1,
  },
  
  // Glowing border effect
  '&::after': {
    content: '""',
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    background: `linear-gradient(45deg, 
      ${theme.palette.error.main}, 
      ${theme.palette.error.dark})`,
    borderRadius: theme.spacing(3),
    zIndex: -1,
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  
  '&:hover': {
    background: theme.palette.error.main,
    transform: 'translateY(-8px) scale(1.02)',
    boxShadow: `
      0 20px 60px rgba(211, 47, 47, 0.4),
      0 8px 30px rgba(211, 47, 47, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.2)
    `,
    animation: 'emergencyPulse 1s ease-in-out infinite',
    
    '&::after': {
      opacity: 1,
    },
    
    '& .emergency-icon': {
      transform: 'rotate(360deg) scale(1.2)',
    },
    
    '& .emergency-phone': {
      transform: 'scale(1.05)',
    },
  },
  
  '&:focus-visible': {
    outline: `3px solid ${theme.palette.warning.main}`,
    outlineOffset: '4px',
  },
  
  '&:active': {
    transform: 'translateY(-4px) scale(1.01)',
  },
  
  '@keyframes shimmer': {
    '0%': { left: '-100%' },
    '50%': { left: '100%' },
    '100%': { left: '100%' },
  },
  
  '@keyframes emergencyPulse': {
    '0%, 100%': { 
      boxShadow: `
        0 12px 40px rgba(211, 47, 47, 0.3),
        0 4px 20px rgba(211, 47, 47, 0.2),
        inset 0 1px 0 rgba(255, 255, 255, 0.1)
      `,
    },
    '50%': { 
      boxShadow: `
        0 12px 40px rgba(211, 47, 47, 0.4),
        0 4px 20px rgba(211, 47, 47, 0.3),
        inset 0 1px 0 rgba(255, 255, 255, 0.15),
        0 0 30px rgba(211, 47, 47, 0.5)
      `,
    },
  },
  
  [theme.breakpoints.down('sm')]: {
    marginTop: theme.spacing(2),
    borderRadius: theme.spacing(2),
  },
}));

const EmergencyHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4, 4, 2, 4),
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  position: 'relative',
  zIndex: 2,
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3, 3, 2, 3),
    flexDirection: 'column',
    textAlign: 'center',
    gap: theme.spacing(1),
  },
}));

const EmergencyIcon = styled(Box)(({ theme }) => ({
  width: 60,
  height: 60,
  borderRadius: '50%',
  background: `linear-gradient(135deg, 
    rgba(255, 255, 255, 0.2) 0%, 
    rgba(255, 255, 255, 0.1) 100%)`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backdropFilter: 'blur(10px)',
  border: '2px solid rgba(255, 255, 255, 0.2)',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  
  '& .MuiSvgIcon-root': {
    fontSize: '2rem',
    color: theme.palette.common.white,
    filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.3))',
  },
  
  [theme.breakpoints.down('sm')]: {
    width: 50,
    height: 50,
    '& .MuiSvgIcon-root': {
      fontSize: '1.75rem',
    },
  },
}));

const EmergencyContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2, 4, 4, 4),
  position: 'relative',
  zIndex: 2,
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2, 3, 3, 3),
    textAlign: 'center',
  },
}));

const EmergencyPhoneContainer = styled(Box)(({ theme }) => ({
  margin: theme.spacing(3, 0),
  padding: theme.spacing(2),
  background: 'rgba(255, 255, 255, 0.1)',
  borderRadius: theme.spacing(2),
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  transition: 'all 0.3s ease',
  
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.15)',
    transform: 'scale(1.02)',
  },
}));

const EmergencyActions = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  marginTop: theme.spacing(3),
  flexWrap: 'wrap',
  
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    gap: theme.spacing(1.5),
  },
}));

const EmergencyActionButton = styled(IconButton)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.15)',
  color: theme.palette.common.white,
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: theme.spacing(1.5),
  padding: theme.spacing(1.5),
  backdropFilter: 'blur(10px)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  flex: '1',
  minWidth: 'auto',
  
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.25)',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
  },
  
  '& .MuiSvgIcon-root': {
    fontSize: '1.5rem',
  },
  
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
    minHeight: 56,
    '& .MuiSvgIcon-root': {
      fontSize: '1.75rem',
    },
  },
}));

const StatusIndicator = styled(Chip)(({ theme }) => ({
  background: `linear-gradient(45deg, 
    ${theme.palette.success.main} 0%, 
    ${theme.palette.success.light} 100%)`,
  color: theme.palette.common.white,
  fontWeight: 600,
  fontSize: '0.75rem',
  animation: 'statusPulse 2s ease-in-out infinite',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  
  '& .MuiChip-icon': {
    color: 'inherit',
    animation: 'statusBlink 1.5s ease-in-out infinite',
  },
  
  '@keyframes statusPulse': {
    '0%, 100%': { opacity: 1 },
    '50%': { opacity: 0.8 },
  },
  
  '@keyframes statusBlink': {
    '0%, 100%': { opacity: 1 },
    '50%': { opacity: 0.6 },
  },
}));

/**
 * Enhanced Contact Page Component for AA Uganda
 * 
 * Features:
 * - Advanced contact form with comprehensive validation
 * - Real-time business hours status indicator
 * - Interactive emergency contact card with multiple contact methods
 * - Enhanced accessibility with ARIA labels and keyboard navigation
 * - Professional styling with hover effects and animations
 * - Real-time form validation with user-friendly error messages
 * - Email integration with EmailJS and reCAPTCHA security
 * - Responsive design optimized for all screen sizes
 * - Google Maps integration with interactive map
 * - WhatsApp, Phone, and SMS quick actions
 * 
 * Enhanced EmergencyCard Features:
 * - Eye-catching pulsing animation for urgency
 * - Multiple contact methods (call, WhatsApp, SMS)
 * - Gradient backgrounds and professional styling
 * - Current status indicators and service information
 * - Accessibility compliant with focus management
 * - Interactive hover states and keyboard navigation
 * 
 * @returns React functional component for the contact page
 */
const Contact: React.FC = () => {
  // ---- Hooks ----

  // ---- State Management ----
  const [formState, setFormState] = useState<FormState>({
    firstName: "",
    lastName: "",
    email: "",
    phoneFull: "",
    phoneCountry: DEFAULT_COUNTRY,
    phoneDialCode: "+256",
    phoneNational: "",
    subject: "",
    message: "",
  });

  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: "",
    severity: "success",
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);
  const [fieldTouched, setFieldTouched] = useState<Record<string, boolean>>({});
  
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // ---- Enhanced Validation Functions ----
  const validatePhoneNumber = useCallback((phoneNumber: string, countryCode?: string): PhoneValidationResult => {
    try {
      if (!phoneNumber.trim()) {
        return { isValid: false, error: "Phone number is required" };
      }

      const cleanNumber = phoneNumber.replace(/\s+/g, "");

      if (countryCode) {
        const parsed = parsePhoneNumber(cleanNumber, countryCode as any);

        if (!parsed) {
          return {
            isValid: false,
            error: "Invalid phone number format",
          };
        }

        if (!parsed.isValid()) {
          return {
            isValid: false,
            error: `Invalid phone number format for ${countryNameOf(countryCode)}`,
          };
        }

        if (parsed.nationalNumber?.startsWith("0")) {
          return {
            isValid: false,
            error: `Remove leading 0 after +${parsed.countryCallingCode}`,
          };
        }

        return {
          isValid: true,
          formattedNumber: parsed.formatInternational(),
          type: parsed.getType(),
          countryCallingCode: String(parsed.countryCallingCode),
          nationalNumber: parsed.nationalNumber,
        };
      }

      const parsed = parsePhoneNumber(cleanNumber);
      if (parsed?.isValid()) {
        return {
          isValid: true,
          formattedNumber: parsed.formatInternational(),
          type: parsed.getType(),
          countryCallingCode: String(parsed.countryCallingCode),
          nationalNumber: parsed.nationalNumber,
        };
      }

      return {
        isValid: false,
        error: "Please enter a valid phone number with country code",
      };
    } catch (error) {
      return {
        isValid: false,
        error: "Invalid phone number format",
      };
    }
  }, []);

  const validateForm = useCallback((): FormErrors => {
    const errors: FormErrors = {};

    if (!formState.firstName.trim()) {
      errors.firstName = "First name is required";
    } else if (!isValidName(formState.firstName)) {
      errors.firstName = "Please enter a valid first name";
    }

    if (!formState.lastName.trim()) {
      errors.lastName = "Last name is required";
    } else if (!isValidName(formState.lastName)) {
      errors.lastName = "Please enter a valid last name";
    }

    if (!formState.email.trim()) {
      errors.email = "Email is required";
    } else if (!isValidEmail(formState.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!formState.subject.trim()) {
      errors.subject = "Subject is required";
    } else if (formState.subject.length < 5) {
      errors.subject = "Subject must be at least 5 characters";
    }

    if (!formState.message.trim()) {
      errors.message = "Message is required";
    } else if (formState.message.length < 20) {
      errors.message = "Message must be at least 20 characters";
    }

    const phoneValidation = validatePhoneNumber(formState.phoneFull, formState.phoneCountry);
    if (!phoneValidation.isValid) {
      errors.phone = phoneValidation.error;
    }

    if (!recaptchaValue) {
      errors.recaptcha = "Please complete the reCAPTCHA verification";
    }

    return errors;
  }, [formState, recaptchaValue, validatePhoneNumber]);

  // ---- Memoized computed values ----
  const formValidationResult = useMemo(() => {
    const errors = validateForm();
    return {
      errors,
      isValid: Object.keys(errors).length === 0,
      errorCount: Object.keys(errors).length,
    };
  }, [validateForm]);

  const isFormValid = formValidationResult.isValid;

  // ---- Helper Functions for Business Hours ----
  const getCurrentBusinessStatus = useCallback(() => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentDay = now.getDay(); // 0 = Sunday, 6 = Saturday
    
    // Business hours: Mon-Fri 8AM-6PM, Sat 9AM-4PM, Sun Closed
    if (currentDay === 0) return { isOpen: false, status: 'Closed (Sunday)' };
    if (currentDay === 6) {
      return {
        isOpen: currentHour >= 9 && currentHour < 16,
        status: currentHour >= 9 && currentHour < 16 ? 'Open (Sat 9AM-4PM)' : 'Closed (Sat 9AM-4PM)'
      };
    }
    // Monday to Friday
    return {
      isOpen: currentHour >= 8 && currentHour < 18,
      status: currentHour >= 8 && currentHour < 18 ? 'Open (Mon-Fri 8AM-6PM)' : 'Closed (Mon-Fri 8AM-6PM)'
    };
  }, []);

  const businessStatus = useMemo(() => getCurrentBusinessStatus(), [getCurrentBusinessStatus]);

  const contactMethods = useMemo((): ContactMethod[] => [
    {
      icon: <Phone sx={{ fontSize: 28 }} />,
      title: "Phone Support",
      primary: `${config.company.contactNumber} | ${config.company.secondaryContactNumber}`,
      secondary: `${businessStatus.status} • Emergency support available 24/7`,
      href: `tel:${config.company.contactNumber}`,
      type: 'phone',
    },
    {
      icon: <Email sx={{ fontSize: 28 }} />,
      title: "Email Support",
      primary: config.company.email,
      secondary: "We respond within 24 hours during business days • Always available",
      href: `mailto:${config.company.email}?subject=General Inquiry - AA Uganda`,
      type: 'email',
    },
    {
      icon: <LocationOn sx={{ fontSize: 28 }} />,
      title: "Visit Our Office",
      primary: "Plot 4 Old Portbell Road Suite 8\nP.O. Box 1459 Kampala, Uganda",
      secondary: `${businessStatus.status} • Free parking available`,
      href: `https://maps.google.com/?q=${encodeURIComponent("Plot 4 Old Portbell Road Suite 8 Kampala Uganda")}`,
      type: 'address',
    },
  ], [businessStatus]);

  // ---- Helper Functions ----
  const getFieldError = useCallback((field: keyof FormErrors) => {
    return fieldTouched[field] && formErrors[field] ? formErrors[field] : '';
  }, [fieldTouched, formErrors]);

  const shouldShowError = useCallback((field: keyof FormErrors) => {
    return !!(fieldTouched[field] && formErrors[field]);
  }, [fieldTouched, formErrors]);

  // ---- Enhanced Event Handlers ----
  const handleSubmit = useCallback(async (event: React.FormEvent) => {
    event.preventDefault();
    
    // Validate form before submission
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      const firstError = Object.values(errors)[0];
      setSnackbar({
        open: true,
        message: firstError || "Please correct the errors in the form",
        severity: "error",
      });
      return;
    }

    setIsSubmitting(true);
    setFormErrors({});

    try {
      // Initialize EmailJS
      emailjs.init(EMAILJS_PUBLIC_KEY);

      const emailSubject = `AAU Contact — ${formState.subject} — ${formState.firstName} ${formState.lastName} (${formState.email} | ${formState.phoneFull})`;

      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        to_email: companyInfo.contact.email,
        reply_to: formState.email,
        email_subject: emailSubject,
        first_name: formState.firstName,
        last_name: formState.lastName,
        from_name: `${formState.firstName} ${formState.lastName}`,
        from_email: formState.email,
        phone_full: formState.phoneFull,
        phone_country_iso2: formState.phoneCountry,
        phone_country_name: countryNameOf(formState.phoneCountry),
        phone_dial_code: formState.phoneDialCode,
        phone_national: formState.phoneNational,
        subject: formState.subject,
        message: formState.message,
        page_url: typeof window !== "undefined" ? window.location.href : "",
        timestamp: new Date().toISOString(),
        "g-recaptcha-response": recaptchaValue,
      });

      setSubmitSuccess(true);
      setSnackbar({
        open: true,
        message: "Thank you! Your message has been sent successfully. We'll get back to you within 24 hours.",
        severity: "success",
      });

      // Reset form
      setFormState({
        firstName: "",
        lastName: "",
        email: "",
        phoneFull: "",
        phoneCountry: DEFAULT_COUNTRY,
        phoneDialCode: "+256",
        phoneNational: "",
        subject: "",
        message: "",
      });
      setRecaptchaValue(null);
      setFieldTouched({});
      recaptchaRef.current?.reset();

    } catch (error) {
      console.error("Error sending email:", error);
      
      let errorMessage = "We encountered an issue sending your message. Please try again or contact us directly.";
      let actionHint = "";
      
      if (error instanceof Error) {
        const errorMsg = error.message.toLowerCase();
        
        if (errorMsg.includes("recaptcha")) {
          errorMessage = "Security verification failed. Please complete the reCAPTCHA and try again.";
          actionHint = "Try refreshing the page if reCAPTCHA doesn't load properly.";
        } else if (errorMsg.includes("network") || errorMsg.includes("fetch")) {
          errorMessage = "Network connection issue. Please check your internet and try again.";
          actionHint = "You can also call us directly for immediate assistance.";
        } else if (errorMsg.includes("rate limit") || errorMsg.includes("too many")) {
          errorMessage = "Too many requests. Please wait a moment before trying again.";
          actionHint = "This helps us prevent spam. Thank you for your patience.";
        } else if (errorMsg.includes("timeout")) {
          errorMessage = "Request timed out. Please try again.";
          actionHint = "If this persists, please contact us directly via phone.";
        } else if (errorMsg.includes("email") || errorMsg.includes("invalid")) {
          errorMessage = "Invalid email format detected. Please check your email address.";
          actionHint = "Make sure your email address is correctly formatted.";
        }
      }
      
      const fullMessage = actionHint ? `${errorMessage} ${actionHint}` : errorMessage;

      setSnackbar({
        open: true,
        message: fullMessage,
        severity: "error",
      });

      setRecaptchaValue(null);
      recaptchaRef.current?.reset();
    } finally {
      setIsSubmitting(false);
    }
  }, [formState, recaptchaValue, validateForm]);

  const handleFieldChange = useCallback((field: keyof FormState) => 
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = event.target.value;
      setFormState(prev => ({ ...prev, [field]: value }));
      setFieldTouched(prev => ({ ...prev, [field]: true }));
      
      // Clear field error when user starts typing
      if (formErrors[field as keyof FormErrors]) {
        setFormErrors(prev => ({ ...prev, [field]: undefined }));
      }
    }, [formErrors]);

  const handlePhoneChange = useCallback((value: string, info?: MuiTelInputInfo) => {
    const validation = validatePhoneNumber(value, info?.countryCode?.toUpperCase());
    
    setFormState(prev => ({
      ...prev,
      phoneFull: value,
      phoneCountry: (info?.countryCode ?? prev.phoneCountry).toUpperCase(),
      phoneDialCode: validation.isValid 
        ? `+${validation.countryCallingCode}`
        : info?.countryCallingCode 
          ? `+${info.countryCallingCode}`
          : prev.phoneDialCode,
      phoneNational: validation.isValid 
        ? validation.nationalNumber ?? ""
        : info?.nationalNumber ?? prev.phoneNational,
    }));
    
    setFieldTouched(prev => ({ ...prev, phone: true }));
    
    // Clear phone error when user starts typing
    if (formErrors.phone) {
      setFormErrors(prev => ({ ...prev, phone: undefined }));
    }
  }, [validatePhoneNumber, formErrors.phone]);

  const handleRecaptchaChange = useCallback((value: string | null) => {
    setRecaptchaValue(value);
    if (value && formErrors.recaptcha) {
      setFormErrors(prev => ({ ...prev, recaptcha: undefined }));
    }
    if (value) {
      setSnackbar(prev => ({ ...prev, open: false }));
    }
  }, [formErrors.recaptcha]);

  const handleRecaptchaError = useCallback(() => {
    setRecaptchaValue(null);
    setSnackbar({
      open: true,
      message: "reCAPTCHA error occurred. Please refresh the page and try again.",
      severity: "error",
    });
  }, []);

  const handleRecaptchaExpired = useCallback(() => {
    setRecaptchaValue(null);
    setSnackbar({
      open: true,
      message: "reCAPTCHA has expired. Please verify again.",
      severity: "warning",
    });
  }, []);

  const handleSnackbarClose = useCallback(() => {
    setSnackbar(prev => ({ ...prev, open: false }));
  }, []);

  return (
    <Box>
      <SEO seoData={contactSEO} />
      <PageHeader
        title="Contact Us"
        subtitle="Get in touch with AAU for emergency assistance, inquiries, or to learn more about our services."
      />

      <ContactSection sx={{ backgroundColor: theme.palette.grey[50] }}>
        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
          <Fade in timeout={800}>
            <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
              {contactMethods.map((method, index) => (
                <Grid item xs={12} md={4} key={`${method.type}-${index}`}>
                  <Zoom in timeout={600 + index * 200}>
                    <ContactCard
                      tabIndex={0}
                      role="button"
                      aria-label={`Contact us via ${method.title}: ${method.primary}`}
                      onClick={() => window.open(method.href, method.type === 'address' ? '_blank' : '_self')}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          window.open(method.href, method.type === 'address' ? '_blank' : '_self');
                        }
                      }}
                      sx={{
                        backgroundColor: theme.palette.grey[200],
                      }}
                    >
                      <IconWrapper 
                        aria-hidden="true"
                        sx={{
                          "&:hover": {
                            transform: "translateY(-8px) scale(1.05)",
                            "& .MuiSvgIcon-root": {
                              transform: "scale(1.1)",
                            },
                          },
                        }}
                      >
                        {method.icon}
                      </IconWrapper>

                      <Typography
                        variant="h6"
                        gutterBottom
                        sx={{
                          fontWeight: 700,
                          color: "primary.main",
                          mb: 2,
                          fontSize: { xs: "1.1rem", md: "1.25rem" },
                        }}
                      >
                        {method.title}
                      </Typography>

                      <Typography
                        sx={{
                          fontWeight: 500,
                          mb: 2,
                          fontSize: '0.9rem',
                          lineHeight: 1.6,
                          whiteSpace: "pre-line",
                          color: "text.primary",
                        }}
                      >
                        {method.primary}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{
                          color: "text.secondary",
                          fontSize: { xs: "0.85rem", md: "0.9rem" },
                          fontStyle: 'italic',
                          mb: 2,
                        }}
                      >
                        {method.secondary}
                      </Typography>

                      {method.type === 'phone' && (
                        <Box sx={{ mb: 2 }}>
                          <Chip
                            icon={businessStatus.isOpen ? <SignalIcon /> : <AccessTimeIcon />}
                            label={businessStatus.isOpen ? "Currently Open" : "Currently Closed"}
                            size="small"
                            color={businessStatus.isOpen ? "success" : "default"}
                            variant={businessStatus.isOpen ? "filled" : "outlined"}
                            sx={{
                              fontSize: '0.75rem',
                              fontWeight: 600,
                              animation: businessStatus.isOpen ? 'pulse 2s ease-in-out infinite' : 'none',
                              '@keyframes pulse': {
                                '0%, 100%': { opacity: 1 },
                                '50%': { opacity: 0.7 },
                              },
                            }}
                          />
                        </Box>
                      )}

                      {method.type === 'phone' && (
                        <Box sx={{ mt: 2 }}>
                          <Tooltip title="Contact via WhatsApp">
                            <IconButton
                              component="a"
                              href={`https://wa.me/${config.company.whatsAppNumber}?text=Hello AA Uganda, I would like to inquire about your services.`}
                              target="_blank"
                              rel="noopener noreferrer"
                              size="small"
                              sx={{ 
                                color: '#25D366',
                                '&:hover': {
                                  backgroundColor: 'rgba(37, 211, 102, 0.1)',
                                },
                              }}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <WhatsAppIcon />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      )}
                    </ContactCard>
                  </Zoom>
                </Grid>
              ))}
            </Grid>
          </Fade>
        </Container>
      </ContactSection>

      {/* Enhanced Contact Form & Map Section */}
      <MapSection>
        <Container maxWidth="lg">
          <Grid container spacing={6}>
            {/* Enhanced Contact Form */}
            <Grid item xs={12} md={6}>
              <FormSection elevation={3} id="contact-form">
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Heading variant="h3" sx={{ flexGrow: 1 }}>
                    Send us a Message
                  </Heading>
                  {submitSuccess && (
                    <CheckCircleIcon 
                      sx={{ 
                        color: 'success.main', 
                        fontSize: 32,
                        animation: 'fadeIn 0.5s ease-in-out',
                      }} 
                    />
                  )}
                </Box>

                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 4, lineHeight: 1.6 }}
                >
                  Fill out the form below and we'll get back to you within 24 hours during business days.
                </Typography>

                <Box 
                  component="form" 
                  ref={formRef}
                  onSubmit={handleSubmit}
                  noValidate
                  sx={{ position: 'relative' }}
                >
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="First Name"
                        variant="outlined"
                        required
                        value={formState.firstName}
                        onChange={handleFieldChange('firstName')}
                        error={shouldShowError('firstName')}
                        helperText={getFieldError('firstName') || 'Enter your first name'}
                        disabled={isSubmitting}
                        inputProps={{
                          'aria-describedby': formErrors.firstName ? 'firstName-error' : undefined,
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Last Name"
                        variant="outlined"
                        required
                        value={formState.lastName}
                        onChange={handleFieldChange('lastName')}
                        error={shouldShowError('lastName')}
                        helperText={getFieldError('lastName') || 'Enter your last name'}
                        disabled={isSubmitting}
                        inputProps={{
                          'aria-describedby': formErrors.lastName ? 'lastName-error' : undefined,
                        }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Email Address"
                        type="email"
                        variant="outlined"
                        required
                        value={formState.email}
                        onChange={handleFieldChange('email')}
                        error={shouldShowError('email')}
                        helperText={getFieldError('email') || "We'll never share your email address"}
                        disabled={isSubmitting}
                        inputProps={{
                          'aria-describedby': formErrors.email ? 'email-error' : 'email-helper',
                        }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <MuiTelInput
                        fullWidth
                        label="Phone Number"
                        variant="outlined"
                        defaultCountry={DEFAULT_COUNTRY}
                        forceCallingCode
                        required
                        value={formState.phoneFull}
                        onChange={handlePhoneChange}
                        error={shouldShowError('phone')}
                        helperText={getFieldError('phone') || 'Include country code for international numbers'}
                        disabled={isSubmitting}

                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Subject"
                        variant="outlined"
                        required
                        value={formState.subject}
                        onChange={handleFieldChange('subject')}
                        error={shouldShowError('subject')}
                        helperText={getFieldError('subject') || 'Brief description of your inquiry'}
                        disabled={isSubmitting}
                        inputProps={{
                          maxLength: 100,
                          'aria-describedby': formErrors.subject ? 'subject-error' : 'subject-helper',
                        }}
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
                        onChange={handleFieldChange('message')}
                        error={shouldShowError('message')}
                        helperText={
                          getFieldError('message') || 
                          `${formState.message.length}/500 characters. Please be as detailed as possible.`
                        }
                        disabled={isSubmitting}
                        inputProps={{
                          maxLength: 500,
                          'aria-describedby': formErrors.message ? 'message-error' : 'message-helper',
                        }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Box sx={{ mb: 3 }}>
                        {RECAPTCHA_SITE_KEY ? (
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
                        ) : (
                          <Alert severity="warning" sx={{ mt: 2 }}>
                            Security verification is temporarily unavailable. Please contact us directly.
                          </Alert>
                        )}
                        {formErrors.recaptcha && (
                          <Typography 
                            variant="caption" 
                            color="error" 
                            sx={{ mt: 1, display: 'block' }}
                            id="recaptcha-error"
                          >
                            {formErrors.recaptcha}
                          </Typography>
                        )}
                      </Box>
                    </Grid>

                    <Grid item xs={12}>
                      <SubmitButton
                        type="submit"
                        variant="contained"
                        size="large"
                        fullWidth
                        disabled={!isFormValid || isSubmitting}
                        startIcon={
                          isSubmitting ? (
                            <CircularProgress size={20} color="inherit" />
                          ) : (
                            <SendIcon />
                          )
                        }
                        sx={{
                          position: 'relative',
                          transition: 'all 0.3s ease',
                          '&:hover:not(.Mui-disabled)': {
                            transform: 'translateY(-2px)',
                            boxShadow: (theme) => `0 8px 25px ${theme.palette.primary.main}40`,
                          },
                        }}
                      >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </SubmitButton>
                    </Grid>
                  </Grid>

                  {/* Loading overlay */}
                  {isSubmitting && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 2,
                        zIndex: 10,
                      }}
                    >
                      <CircularProgress size={40} />
                    </Box>
                  )}
                </Box>
              </FormSection>
            </Grid>

            {/* Enhanced Map Section */}
            <Grid item xs={12} md={6}>
              <Box>

                <EmergencyCard
                  elevation={0}
                  tabIndex={0}
                  role="button"
                  aria-label={`Emergency assistance hotline: ${companyInfo.contact.emergency.phone}`}
                  onClick={() => window.open(`tel:${companyInfo.contact.emergency.phone}`, '_self')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      window.open(`tel:${companyInfo.contact.emergency.phone}`, '_self');
                    }
                  }}
                >
                  <EmergencyHeader>
                    <EmergencyIcon className="emergency-icon">
                      <EmergencyMuiIcon />
                    </EmergencyIcon>
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: 800,
                          fontSize: { xs: "1.3rem", md: "1.5rem" },
                          mb: 0.5,
                          textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                        }}
                      >
                        🚨 24/7 Emergency Hotline
                      </Typography>
                      <StatusIndicator
                        icon={<SignalIcon sx={{ fontSize: '1rem' }} />}
                        label="ONLINE & READY"
                        size="small"
                      />
                    </Box>
                  </EmergencyHeader>

                  <EmergencyContent>
                    <EmergencyPhoneContainer className="emergency-phone">
                      <Typography
                        variant="h3"
                        sx={{
                          fontWeight: 900,
                          fontSize: { xs: "1.8rem", md: "2.2rem" },
                          mb: 1,
                          textAlign: 'center',
                          textShadow: '0 2px 8px rgba(0,0,0,0.4)',
                          letterSpacing: '0.05em',
                        }}
                      >
                        {companyInfo.contact.emergency.phone}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          textAlign: 'center',
                          fontWeight: 600,
                          opacity: 0.95,
                          fontSize: { xs: "0.9rem", md: "1rem" },
                        }}
                      >
                        Tap to call instantly
                      </Typography>
                    </EmergencyPhoneContainer>

                    <Box sx={{ mb: 3 }}>
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: 600,
                          mb: 1,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                        }}
                      >
                        <ContactSupportIcon sx={{ fontSize: '1.2rem' }} />
                        Contact Person: {companyInfo.contact.emergency.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          opacity: 0.9,
                          fontStyle: 'italic',
                          pl: 3,
                        }}
                      >
                        Rescue Manager • Available 24/7 for all emergency assistance
                      </Typography>
                    </Box>

                    <Divider sx={{ bgcolor: 'rgba(255,255,255,0.2)', mb: 3 }} />

                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 500,
                        mb: 2,
                        textAlign: 'center',
                        opacity: 0.95,
                      }}
                    >
                      Multiple ways to reach us instantly:
                    </Typography>

                    <EmergencyActions>
                      <Tooltip title="Call Emergency Hotline" arrow>
                        <EmergencyActionButton
                          aria-label="Call emergency hotline"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(`tel:${companyInfo.contact.emergency.phone}`, '_self');
                          }}
                        >
                          <Phone />
                        </EmergencyActionButton>
                      </Tooltip>

                      <Tooltip title="WhatsApp Emergency" arrow>
                        <EmergencyActionButton
                          aria-label="Contact via WhatsApp"
                          onClick={(e) => {
                            e.stopPropagation();
                            const message = encodeURIComponent("🚨 EMERGENCY ASSISTANCE NEEDED - Please respond immediately");
                            window.open(`https://wa.me/${config.company.whatsAppNumber}?text=${message}`, '_blank');
                          }}
                        >
                          <WhatsAppIcon />
                        </EmergencyActionButton>
                      </Tooltip>

                      <Tooltip title="Send Emergency SMS" arrow>
                        <EmergencyActionButton
                          aria-label="Send emergency SMS"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(`sms:${companyInfo.contact.emergency.phone}?body=EMERGENCY ASSISTANCE NEEDED`, '_self');
                          }}
                        >
                          <SmsIcon />
                        </EmergencyActionButton>
                      </Tooltip>
                    </EmergencyActions>

                    <Box
                      sx={{
                        mt: 3,
                        p: 2,
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: 2,
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          mb: 1,
                          fontWeight: 600,
                        }}
                      >
                        <AccessTimeIcon sx={{ fontSize: '1rem' }} />
                        Available Services:
                      </Typography>
                      <Stack spacing={0.5}>
                        <Typography variant="caption" sx={{ opacity: 0.9 }}>
                          • Roadside breakdown assistance
                        </Typography>
                        <Typography variant="caption" sx={{ opacity: 0.9 }}>
                          • Emergency towing services
                        </Typography>
                        <Typography variant="caption" sx={{ opacity: 0.9 }}>
                          • Battery jump-start & tire changes
                        </Typography>
                        <Typography variant="caption" sx={{ opacity: 0.9 }}>
                          • Fuel delivery & lockout assistance
                        </Typography>
                      </Stack>
                    </Box>
                  </EmergencyContent>
                </EmergencyCard>

                <Paper
                  elevation={2}
                  sx={{
                    p: 3,
                    mb: 3,
                    mt: 5,
                    background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
                    borderLeft: '4px solid',
                    borderLeftColor: 'primary.main',
                  }}
                >
                  <Box
                    component="a"
                    href="https://maps.google.com/?q=Automobile+Association+of+Uganda+Plot+4+Old+Portbell+Road+Kampala"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 2,
                      color: "text.primary",
                      textDecoration: "none",
                      "&:hover": {
                        "& .location-icon": {
                          color: "primary.main",
                          transform: "scale(1.1)",
                        },
                        "& .location-text": {
                          color: "primary.main",
                        },
                      },
                    }}
                  >
                    <LocationOn 
                      className="location-icon"
                      sx={{ 
                        fontSize: 28, 
                        color: 'primary.main', 
                        mt: 0.5,
                        transition: 'all 0.3s ease',
                      }} 
                    />
                    <Box>
                      <Typography 
                        className="location-text"
                        variant="body1"
                        sx={{ 
                          fontWeight: 600,
                          transition: 'color 0.3s ease',
                          lineHeight: 1.5,
                        }}
                      >
                        Plot 4 Old Portbell Road Suite 8<br />
                        P.O. Box 1459 Kampala, Uganda
                      </Typography>
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{ mt: 1, fontStyle: 'italic' }}
                      >
                        Click to view directions in Google Maps
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Heading variant="h3" sx={{ flexGrow: 1 }}>
                    Find Us Here
                  </Heading>
                  <Tooltip title="Open in Google Maps">
                    <IconButton
                      component="a"
                      href="https://maps.google.com/?q=Automobile+Association+of+Uganda+Plot+4+Old+Portbell+Road+Kampala"
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ color: 'primary.main' }}
                    >
                      <LaunchIcon />
                    </IconButton>
                  </Tooltip>
                </Box>

                <MapContainer sx={{ height: "500px", mb: 3 }}>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d278.2569047471456!2d32.600749063051275!3d0.32037999967650627!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMMKwMTknMTMuNCJOIDMywrAzNicwMy4zIkU!5e1!3m2!1sen!2sus!4v1756761503824!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="AA Uganda Location Map"
                  />
                </MapContainer>
                </Box>
            </Grid>
          </Grid>
        </Container>
      </MapSection>

      {/* Enhanced Snackbar with better UX */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={snackbar.severity === 'success' ? 8000 : 6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        sx={{
          '& .MuiSnackbarContent-root': {
            minWidth: { xs: '90vw', sm: 'auto' },
          },
        }}
        TransitionComponent={Fade}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          variant="filled"
          sx={{
            alignItems: 'center',
            '& .MuiAlert-icon': {
              fontSize: 24,
            },
            '& .MuiAlert-message': {
              fontWeight: 500,
              lineHeight: 1.5,
            },
          }}
          iconMapping={{
            success: <CheckCircleIcon fontSize="inherit" />,
            error: <ErrorIcon fontSize="inherit" />,
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default memo(Contact);

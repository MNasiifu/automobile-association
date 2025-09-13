import { useState, useEffect, useRef, useCallback } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { validatePassportPhoto } from "../utils/passportPhotoValidator";
import type { PhotoValidationResult } from "../utils/passportPhotoValidator";
import { applyForIdp } from "../api";
import type { CreateMemberData, IdpDocument, PendingIdpData } from "../types";
import {
  concatenateWithCommas,
  formatDateToYYYYMMDD,
  getCurrentDateFormatted,
} from "../utils";
import { fileToDataUrl } from "../utils/fileUtils";

// Photo validation cache to avoid repeated computations
interface PhotoValidationCache {
  [fileHash: string]: {
    validationResult: PhotoValidationResult;
    timestamp: number;
    fileName: string; // Store for debugging
    fileSize: number; // Store for verification
  };
}

// File validation helpers
const validateFile = (
  file: File | null,
  allowedTypes: string[],
  maxSizeMB: number
) => {
  if (!file) return false;

  const allowedMimeTypes = allowedTypes.map((type) => {
    if (type === "pdf") return "application/pdf";
    if (type === "jpg" || type === "jpeg") return "image/jpeg";
    if (type === "png") return "image/png";
    return type;
  });

  if (!allowedMimeTypes.includes(file.type)) return false;
  if (file.size > maxSizeMB * 1024 * 1024) return false;

  return true;
};

// Create a unique file hash using file content
const createFileHash = async (file: File): Promise<string> => {
  const arrayBuffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest("SHA-256", arrayBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
};

// Validation schema based on idp.md requirements
const validationSchema = yup.object({
  // Membership info
  isMember: yup.boolean().required("Please specify if you are an AA member"),
  membershipNumber: yup.string().when("isMember", {
    is: true,
    then: (schema) =>
      schema.required("Membership number is required for AA members"),
    otherwise: (schema) => schema.notRequired(),
  }),

  // Personal information
  surname: yup.string().required("Surname is required"),
  otherNames: yup.string().required("Other names are required"),
  dateOfBirth: yup
    .date()
    .nullable()
    .required("Date of birth is required")
    .max(new Date(), "Date of birth cannot be in the future"),
  placeOfBirth: yup.string().required("Place of birth is required"),

  // Contact information
  postalAddress: yup.string().required("Postal address is required"),
  emailAddress: yup
    .string()
    .email("Invalid email format")
    .required("Email address is required"),
  telephoneNumber: yup.string().required("Telephone number is required"),
  mobileNumber: yup.string().required("Mobile number is required"),
  residentialAddress: yup.string().required("Residential address is required"),
  streetRoadPlot: yup.string().required("Street/Road/Plot is required"),

  // Passport and visa information
  passportNumber: yup.string().required("Passport number is required"),

  // File uploads
  passportBioDataPage: yup
    .mixed<File>()
    .required("Passport bio-data page is required")
    .test("fileType", "Only PDF files are allowed", (value) => {
      if (!value) return false;
      return validateFile(value as File, ["pdf"], 5);
    }),

  visaCopy: yup
    .mixed<File>()
    .required("Visa copy is required")
    .test("fileType", "Only PDF files are allowed", (value) => {
      if (!value) return false;
      return validateFile(value as File, ["pdf"], 5);
    }),

  passportPhoto: yup
    .mixed<File>()
    .required("Passport photo is required")
    .test("fileType", "Only PNG, JPG, or JPEG images are allowed", (value) => {
      if (!value) return false;
      return validateFile(value as File, ["png", "jpg", "jpeg"], 2);
    }),

  // Driving license information
  ugandaDrivingPermitNumber: yup
    .string()
    .required("Uganda driving permit number is required"),
  expiryDateOfDrivingPermit: yup
    .date()
    .nullable()
    .required("Expiry date of driving permit is required")
    .min(new Date(), "Driving permit must be valid"),
  classesOfDrivingPermit: yup
    .array()
    .of(yup.string().required())
    .min(1, "At least one driving permit class is required"),

  // Terms and declaration
  termsAccepted: yup
    .boolean()
    .oneOf([true], "You must accept the terms and conditions"),
  declarationAccepted: yup
    .boolean()
    .oneOf([true], "You must confirm the declaration"),
});

export type IDPFormData = yup.InferType<typeof validationSchema>;

export const drivingPermitClasses = [
  { value: "A", label: "Class A - Motorcycles" },
  { value: "B", label: "Class B - Light Motor Vehicles" },
  { value: "C", label: "Class C - Medium Motor Vehicles" },
  { value: "D", label: "Class D - Heavy Motor Vehicles" },
  { value: "E", label: "Class E - Articulated Vehicles" },
  { value: "F", label: "Class F - Public Service Vehicles" },
];

export const membershipBenefits = [
  {
    icon: "CardMembership",
    title: "AA Member Rate",
    description: "Pay only UGX 250,000 instead of UGX 350,000",
    savings: "Save UGX 100,000",
  },
  {
    icon: "SpeedIcon",
    title: "Priority Processing",
    description: "Faster processing times for AA members",
  },
  {
    icon: "SecurityIcon",
    title: "Additional Support",
    description: "Access to AA roadside assistance and travel support",
  },
];

const useApplyForIdp = () => {
  // Navigation hook
  const navigate = useNavigate();

  // State management
  const [activeStep, setActiveStep] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState<
    "success" | "warning" | "error"
  >("success");

  // Enhanced alert configuration for better UX
  const [alertConfig, setAlertConfig] = useState<{
    autoHideDuration: number | null;
    anchorOrigin: {
      vertical: "top" | "bottom";
      horizontal: "left" | "center" | "right";
    };
    showCloseButton: boolean;
  }>({
    autoHideDuration: 6000,
    anchorOrigin: { vertical: "top", horizontal: "right" },
    showCloseButton: true,
  });

  // Photo validation cache to avoid repeated computations
  const [photoValidationCache, setPhotoValidationCache] =
    useState<PhotoValidationCache>({});

  // Photo validation state
  const [photoValidationState, setPhotoValidationState] = useState<{
    isValidating: boolean;
    validationResult: PhotoValidationResult | null;
    showValidationDetails: boolean;
    isPhotoValid: boolean; // Track if current photo passes validation
  }>({
    isValidating: false,
    validationResult: null,
    showValidationDetails: false,
    isPhotoValid: false,
  });

  // Photo requirements state
  const [showPhotoRequirements, setShowPhotoRequirements] = useState(false);

  // URL management for object URLs to prevent memory leaks
  const objectUrlsRef = useRef<Map<string, string>>(new Map());

  // Form configuration
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    trigger,
    setValue,
    reset,
  } = useForm<IDPFormData>({
    resolver: yupResolver(validationSchema) as any,
    defaultValues: {
      isMember: false,
      membershipNumber: "",
      surname: "",
      otherNames: "",
      dateOfBirth: undefined,
      placeOfBirth: "",
      postalAddress: "",
      emailAddress: "",
      telephoneNumber: "",
      mobileNumber: "",
      residentialAddress: "",
      streetRoadPlot: "",
      passportNumber: "",
      passportBioDataPage: undefined,
      visaCopy: undefined,
      passportPhoto: undefined,
      ugandaDrivingPermitNumber: "",
      expiryDateOfDrivingPermit: undefined,
      classesOfDrivingPermit: [],
      termsAccepted: false,
      declarationAccepted: false,
    },
    mode: "onChange",
  });

  const watchedIsMember = watch("isMember");
  const watchedFormData = watch();

  // Steps configuration
  const steps = [
    "Membership & Personal Info",
    "Contact Details",
    "Passport & Visa Info",
    "Document Upload",
    "Driving License Details",
    "Declaration & Submit",
  ];

  // Cleanup all object URLs when component unmounts
  useEffect(() => {
    return () => {
      objectUrlsRef.current.forEach((url) => {
        URL.revokeObjectURL(url);
      });
      objectUrlsRef.current.clear();
    };
  }, []);

  // Create and manage object URLs with automatic cleanup
  const createManagedImageUrl = useCallback((file: File): string => {
    const fileKey = `${file.name}-${file.size}-${file.lastModified}`;

    // Check if we already have a URL for this file
    const existingUrl = objectUrlsRef.current.get(fileKey);
    if (existingUrl) {
      return existingUrl;
    }

    // Create new URL and store it
    const url = URL.createObjectURL(file);
    objectUrlsRef.current.set(fileKey, url);

    return url;
  }, []);

  // Clean up specific file URL
  const revokeManagedImageUrl = useCallback((file: File) => {
    const fileKey = `${file.name}-${file.size}-${file.lastModified}`;
    const url = objectUrlsRef.current.get(fileKey);

    if (url) {
      URL.revokeObjectURL(url);
      objectUrlsRef.current.delete(fileKey);
    }
  }, []);

  // Enhanced alert management with top-right positioning
  const showAlertMessage = (
    message: string,
    severity: "success" | "warning" | "error" = "success",
    options?: {
      autoHideDuration?: number;
      position?: "top-right" | "top-center" | "bottom-center";
      persistent?: boolean;
    }
  ) => {
    setAlertMessage(message);
    setAlertSeverity(severity);
    setShowAlert(true);

    // Update alert configuration based on options
    const position = options?.position || "top-right";
    const duration = options?.persistent
      ? null
      : options?.autoHideDuration || 6000;

    const anchorConfig = {
      "top-right": { vertical: "top" as const, horizontal: "right" as const },
      "top-center": { vertical: "top" as const, horizontal: "center" as const },
      "bottom-center": {
        vertical: "bottom" as const,
        horizontal: "center" as const,
      },
    };

    setAlertConfig({
      autoHideDuration: duration,
      anchorOrigin: anchorConfig[position],
      showCloseButton: true,
    });
  };

  // Navigation handlers
  const handleNext = async () => {
    let fieldsToValidate: (keyof IDPFormData)[] = [];

    switch (activeStep) {
      case 0:
        fieldsToValidate = [
          "isMember",
          "surname",
          "otherNames",
          "dateOfBirth",
          "placeOfBirth",
        ];
        if (watchedIsMember) fieldsToValidate.push("membershipNumber");
        break;
      case 1:
        fieldsToValidate = [
          "postalAddress",
          "emailAddress",
          "telephoneNumber",
          "mobileNumber",
          "residentialAddress",
          "streetRoadPlot",
        ];
        break;
      case 2:
        fieldsToValidate = ["passportNumber"];
        break;
      case 3:
        fieldsToValidate = ["passportBioDataPage", "visaCopy", "passportPhoto"];

        // Additional check for passport photo validation
        // const passportPhoto = watch("passportPhoto") as File | undefined;
        // if (passportPhoto) {
        //   // Check if we have a valid validation result for the current photo
        //   if (!photoValidationState.isPhotoValid || photoValidationState.isValidating) {
        //     showAlertMessage(
        //       photoValidationState.isValidating
        //         ? "Please wait for photo validation to complete"
        //         : "Please upload a valid passport photo that meets all requirements",
        //       "warning"
        //     );
        //     return;
        //   }

        //   // Additional safety check: ensure validation result exists
        //   if (!photoValidationState.validationResult) {
        //     showAlertMessage(
        //       "Photo validation incomplete. Please re-upload your photo.",
        //       "warning"
        //     );
        //     return;
        //   }
        // }
        break;
      case 4:
        fieldsToValidate = [
          "ugandaDrivingPermitNumber",
          "expiryDateOfDrivingPermit",
          "classesOfDrivingPermit",
        ];
        break;
      case 5:
        fieldsToValidate = ["termsAccepted", "declarationAccepted"];
        break;
    }

    const isStepValid = await trigger(fieldsToValidate);

    if (!isStepValid) {
      showAlertMessage(
        "Please fill in all required fields correctly",
        "warning",
        { position: "top-right", autoHideDuration: 5000 }
      );
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

  // Form submission handler
  const handleFormSubmit = async (data: IDPFormData) => {
    const currentDate = getCurrentDateFormatted();

    const {
      membershipNumber,
      surname,
      otherNames,
      dateOfBirth,
      classesOfDrivingPermit,
      expiryDateOfDrivingPermit,
      placeOfBirth,
      postalAddress,
      emailAddress,
      telephoneNumber,
      mobileNumber,
      residentialAddress,
      streetRoadPlot,
      ugandaDrivingPermitNumber,
      passportNumber,
      visaCopy,
      passportPhoto,
      passportBioDataPage,
    } = data;

    const expiryDate = formatDateToYYYYMMDD(expiryDateOfDrivingPermit);
    const formatedDob = formatDateToYYYYMMDD(dateOfBirth);
    const clientClasses = concatenateWithCommas(
      classesOfDrivingPermit ?? ["B"]
    );
    const currentDateTimeStamp = new Date().getTime();

    let visaPdfBase64: string;
    let passportBioDataPdfBase64: string;
    let passportPhotoBase64: string;

    visaPdfBase64 = await fileToDataUrl(visaCopy); 
    passportBioDataPdfBase64 = await fileToDataUrl(passportBioDataPage); 
    passportPhotoBase64 = await fileToDataUrl(passportPhoto); 

    const memberPostData: CreateMemberData = {
      aa_member_no: membershipNumber ? Number(membershipNumber) : null,
      surname: surname,
      onames: otherNames,
      paddress: postalAddress,
      email: emailAddress,
      tel: telephoneNumber,
      mobile: mobileNumber,
      passport: passportNumber,
      raddress: residentialAddress,
      street: streetRoadPlot,
      pob: placeOfBirth,
      dob: formatedDob,
      licence: ugandaDrivingPermitNumber,
      classes: clientClasses,
      e_date: expiryDate,
      pp_photo: passportPhotoBase64,
      p_date: currentDate,
    };

    const pendingIdpPostData: PendingIdpData = {
      status: "pending",
      application_date: currentDate,
      application_date_tz: currentDateTimeStamp,
    };

    const idpDocuments: IdpDocument = {
        visa_pdf_base64: visaPdfBase64,
        passport_pdf_base64: passportBioDataPdfBase64,
        passport_photo_base64: passportPhotoBase64,
    };

    try {
      const { error } = await applyForIdp(memberPostData, pendingIdpPostData, idpDocuments);

      if (error){
        showAlertMessage(
            `${error || "Failed to submit application. Please try again."}`,
            "error",
            { position: "top-right", autoHideDuration: 60000 }
        );

        return;
      }

      // Reset the form to initial state
      reset();

      // Reset step to first step
      setActiveStep(0);

      // Clear photo validation state
      setPhotoValidationState({
        isValidating: false,
        validationResult: null,
        showValidationDetails: false,
        isPhotoValid: false,
      });

      // Clear photo validation cache
      setPhotoValidationCache({});

      // Clean up all object URLs
      objectUrlsRef.current.forEach((url) => {
        URL.revokeObjectURL(url);
      });
      objectUrlsRef.current.clear();

      // Show success alert briefly before navigation
      showAlertMessage(
        "Application submitted successfully! Redirecting to confirmation page...",
        "success",
        { position: "top-right", autoHideDuration: 2000 }
      );

      // Navigate to success page after a short delay
      setTimeout(() => {
        navigate("/idp/apply-success", {
          state: {
            applicantName: `${surname} ${otherNames}`,
            applicationDate: currentDate,
            email: emailAddress,
          },
        });
      }, 2000);
    } catch (error: unknown) {
      console.error("::debug error:", error);
      showAlertMessage(
        `${error || "Failed to submit application. Please try again."}`,
        "error",
        { position: "top-right", autoHideDuration: 10000 }
      );
    }
  };

  // File handling functions
  const handleFileUpload = async (fieldName: keyof IDPFormData, file: File) => {
    setValue(fieldName, file, { shouldValidate: true });

    // If it's a passport photo, validate it with content-based caching
    if (fieldName === "passportPhoto") {
      // Start validation immediately (show loading state)
      setPhotoValidationState((prev) => ({
        ...prev,
        isValidating: true,
        validationResult: null,
        isPhotoValid: false,
      }));

      try {
        // Generate file hash for accurate caching
        const fileHash = await createFileHash(file);

        // Check cache with hash-based key
        const cachedResult = photoValidationCache[fileHash];
        const cacheValidityPeriod = 10 * 60 * 1000; // 10 minutes
        const now = Date.now();

        // Verify cache entry is still valid and matches current file
        if (
          cachedResult &&
          now - cachedResult.timestamp < cacheValidityPeriod &&
          cachedResult.fileSize === file.size
        ) {
          // Use cached result
          setPhotoValidationState({
            isValidating: false,
            validationResult: cachedResult.validationResult,
            showValidationDetails: true,
            isPhotoValid: cachedResult.validationResult.isValid,
          });

          if (!cachedResult.validationResult.isValid) {
            showAlertMessage(
              `Photo validation failed: ${
                cachedResult.validationResult.errors[0] ||
                "Please check photo requirements"
              }`,
              "warning",
              { position: "top-right", autoHideDuration: 8000 }
            );
          } else {
            showAlertMessage(
              "Photo validation passed! (from cache)",
              "success",
              { position: "top-right", autoHideDuration: 3000 }
            );
          }
          return;
        }

        // Perform fresh validation
        const validationResult = await validatePassportPhoto(file);
        console.log("::debug validationResult:", validationResult);

        // Cache the result with file hash
        setPhotoValidationCache((prev) => {
          // Clean up old cache entries (keep only last 10 entries to prevent memory issues)
          const entries = Object.entries(prev);
          const sortedEntries = entries.sort(
            (a, b) => b[1].timestamp - a[1].timestamp
          );
          const recentEntries = sortedEntries.slice(0, 9); // Keep 9, add 1 new = 10 total

          const cleanedCache = Object.fromEntries(recentEntries);

          return {
            ...cleanedCache,
            [fileHash]: {
              validationResult,
              timestamp: now,
              fileName: file.name,
              fileSize: file.size,
            },
          };
        });

        setPhotoValidationState({
          isValidating: false,
          validationResult,
          showValidationDetails: true,
          isPhotoValid: validationResult.isValid,
        });

        if (!validationResult.isValid) {
          showAlertMessage(
            `Photo validation failed: ${
              validationResult.errors[0] || "Please check photo requirements"
            }`,
            "warning",
            { position: "top-right", autoHideDuration: 8000 }
          );
        } else {
          showAlertMessage("Photo validation passed!", "success", {
            position: "top-right",
            autoHideDuration: 4000,
          });
        }
      } catch (error) {
        console.error("Photo validation error:", error);
        setPhotoValidationState({
          isValidating: false,
          validationResult: null,
          showValidationDetails: false,
          isPhotoValid: false,
        });
        showAlertMessage(
          "Failed to validate photo. Please try again.",
          "error",
          { position: "top-right", autoHideDuration: 6000 }
        );
      }
    }
  };

  const handleFileRemove = (fieldName: keyof IDPFormData) => {
    // Get the current file before removing it to clean up its URL
    const currentFile = watch(fieldName) as File | undefined;
    if (currentFile) {
      revokeManagedImageUrl(currentFile);
    }

    setValue(fieldName, undefined, { shouldValidate: true });

    // Clear photo validation state when removing passport photo
    if (fieldName === "passportPhoto") {
      setPhotoValidationState({
        isValidating: false,
        validationResult: null,
        showValidationDetails: false,
        isPhotoValid: false,
      });

      // Optional: Clear relevant cache entries to prevent confusion
      // Note: We don't clear the entire cache as other uploaded files might still be valid
      // The cache will naturally expire or be cleaned up by the LRU mechanism
    }
  };

  // Legacy function name kept for backward compatibility, now uses managed URLs
  const createImagePreviewUrl = (file: File): string => {
    return createManagedImageUrl(file);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // Computed values
  const applicationFee = watchedIsMember ? 250000 : 350000;

  return {
    // State
    activeStep,
    showAlert,
    alertMessage,
    alertSeverity,
    alertConfig,
    photoValidationState,
    showPhotoRequirements,
    steps,

    // Form
    control,
    handleSubmit,
    watch,
    errors,
    isSubmitting,
    trigger,
    setValue,
    reset,
    watchedIsMember,
    watchedFormData,

    // Computed values
    applicationFee,

    // Handlers
    handleNext,
    handleBack,
    handleFormSubmit,
    handleFileUpload,
    handleFileRemove,
    showAlertMessage,
    createImagePreviewUrl,
    formatFileSize,

    // State setters
    setActiveStep,
    setShowAlert,
    setShowPhotoRequirements,

    // Photo validation utilities
    createManagedImageUrl,
    revokeManagedImageUrl,
  };
};

export default useApplyForIdp;

import { useState, useEffect, useRef, useCallback } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { validatePassportPhoto } from "../utils/passportPhotoValidator";
import type { PhotoValidationResult } from "../utils/passportPhotoValidator";
import { applyForIdp, getAAUMemberByNumber } from "../api";
import type {
  CreateMemberData,
  IdpDocument,
  PendingIdpData,
  AauMember,
} from "../types";
import {
  concatenateWithCommas,
  formatDateToYYYYMMDD,
  getCurrentDateFormatted,
  validateUgandaPhoneNumber,
  formatUgandaPhoneNumber,
  getPhoneNumberHelperText as getPhoneHelperText,
} from "../utils";
import { fileToDataUrl } from "../utils/fileUtils";
import { useGlobalLoading } from "../contexts";

// File size constants (in MB) - exported for use in other components
export const FILE_SIZE_LIMITS = {
  PDF_MAX_SIZE: 1, // 1MB for PDF documents
  IMAGE_MAX_SIZE: 1, // 1MB for images
} as const;

// Photo validation cache to avoid repeated computations
interface PhotoValidationCache {
  [fileHash: string]: {
    validationResult: PhotoValidationResult;
    timestamp: number;
    fileName: string; // Store for debugging
    fileSize: number; // Store for verification
  };
}

// File validation result interface
export interface FileValidationResult {
  isValid: boolean;
  error?: string;
  details?: {
    fileName: string;
    fileSize: number;
    fileType: string;
    maxSizeMB: number;
    allowedTypes: string[];
  };
}

// Helper function to get user-friendly file type descriptions
const getFileTypeDescription = (mimeType: string): string => {
  const typeMap: Record<string, string> = {
    "application/pdf": "PDF",
    "image/jpeg": "JPEG",
    "image/jpg": "JPG",
    "image/png": "PNG",
    "image/gif": "GIF",
    "image/webp": "WebP",
  };

  return (
    typeMap[mimeType] || mimeType.split("/")[1]?.toUpperCase() || "Unknown"
  );
};

// File validation helpers
const validateFile = (
  file: File | null,
  allowedTypes: string[],
  maxSizeMB: number
): FileValidationResult => {
  if (!file) {
    return { isValid: false, error: "No file selected" };
  }

  // Check for empty file
  if (file.size === 0) {
    return {
      isValid: false,
      error: "File is empty. Please select a valid file",
      details: {
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        maxSizeMB,
        allowedTypes,
      },
    };
  }

  const allowedMimeTypes = allowedTypes.map((type) => {
    if (type === "pdf") return "application/pdf";
    if (type === "jpg" || type === "jpeg") return "image/jpeg";
    if (type === "png") return "image/png";
    return type;
  });

  // Check file type
  if (!allowedMimeTypes.includes(file.type)) {
    const typeNames = allowedTypes.map((type) => type.toUpperCase()).join(", ");
    const actualTypeDescription = getFileTypeDescription(file.type);
    return {
      isValid: false,
      error: `Invalid file type "${actualTypeDescription}". Only ${typeNames} files are allowed`,
      details: {
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        maxSizeMB,
        allowedTypes,
      },
    };
  }

  // Check file size
  if (file.size > maxSizeMB * 1024 * 1024) {
    const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
    return {
      isValid: false,
      error: `File size (${fileSizeMB}MB) exceeds the maximum allowed size of ${maxSizeMB}MB`,
      details: {
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        maxSizeMB,
        allowedTypes,
      },
    };
  }

  return {
    isValid: true,
    details: {
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      maxSizeMB,
      allowedTypes,
    },
  };
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
// Configured for onBlur validation - all validations trigger when user leaves the field
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
  telephoneNumber: yup
    .string()
    .required("Telephone number is required")
    .test(
      "ugandaPhoneValidation",
      "Invalid Uganda phone number format",
      function (value) {
        if (!value) return false;

        const validation = validateUgandaPhoneNumber(value);
        if (!validation.isValid) {
          return this.createError({ message: validation.error });
        }
        return true;
      }
    ),
  mobileNumber: yup
    .string()
    .required("Mobile number is required")
    .test(
      "ugandaPhoneValidation",
      "Invalid Uganda phone number format",
      function (value) {
        if (!value) return false;

        const validation = validateUgandaPhoneNumber(value);
        if (!validation.isValid) {
          return this.createError({ message: validation.error });
        }
        return true;
      }
    ),
  residentialAddress: yup.string().required("Residential address is required"),
  streetRoadPlot: yup.string().required("Street/Road/Plot is required"),

  // Passport and visa information
  passportNumber: yup.string().required("Passport number is required"),

  // File uploads
  passportBioDataPage: yup
    .mixed<File>()
    .required("Passport bio-data page is required")
    .test("fileValidation", "File validation failed", function (value) {
      if (!value) return false;

      const validation = validateFile(
        value as File,
        ["pdf"],
        FILE_SIZE_LIMITS.PDF_MAX_SIZE
      );
      if (!validation.isValid) {
        return this.createError({ message: validation.error });
      }
      return true;
    }),

  visaCopy: yup
    .mixed<File>()
    .required("Visa copy is required")
    .test("fileValidation", "File validation failed", function (value) {
      if (!value) return false;

      const validation = validateFile(
        value as File,
        ["pdf"],
        FILE_SIZE_LIMITS.PDF_MAX_SIZE
      );
      if (!validation.isValid) {
        return this.createError({ message: validation.error });
      }
      return true;
    }),

  passportPhoto: yup
    .mixed<File>()
    .required("Passport photo is required")
    .test("fileValidation", "File validation failed", function (value) {
      if (!value) return false;

      const validation = validateFile(
        value as File,
        ["png", "jpg", "jpeg"],
        FILE_SIZE_LIMITS.IMAGE_MAX_SIZE
      );
      if (!validation.isValid) {
        return this.createError({ message: validation.error });
      }
      return true;
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

  // Loading management hook
  const globalLoading = useGlobalLoading();

  // State management
  const [activeStep, setActiveStep] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState<
    "success" | "warning" | "error"
  >("success");

  // reCAPTCHA state
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);

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

  // Member verification state
  const [memberVerificationState, setMemberVerificationState] = useState<{
    isVerifying: boolean;
    verifiedMember: AauMember | null;
    verificationError: string | null;
    lastVerifiedNumber: string | null;
    showVerificationButton: boolean;
  }>({
    isVerifying: false,
    verifiedMember: null,
    verificationError: null,
    lastVerifiedNumber: null,
    showVerificationButton: false,
  });

  // Debounce timer for membership number input
  const membershipDebounceRef = useRef<NodeJS.Timeout | null>(null);

  // reCAPTCHA ref
  const recaptchaRef = useRef<any>(null);

  // URL management for object URLs to prevent memory leaks
  const objectUrlsRef = useRef<Map<string, string>>(new Map());

  // Form configuration with onBlur validation
  // All field validations will trigger when user leaves the field (onBlur event)
  // This provides better UX by not showing errors while user is still typing
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
    mode: "onBlur", // Validate when user leaves the field
    reValidateMode: "onBlur", // Re-validate on blur after initial validation
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
        { position: "top-right", autoHideDuration: 6000 }
      );
      return;
    }

    // Additional reCAPTCHA validation for final step
    if (activeStep === steps.length - 1) {
      if (!recaptchaValue) {
        showAlertMessage(
          "Please complete the reCAPTCHA verification before submitting",
          "error",
          { position: "top-right", autoHideDuration: 6000 }
        );
        return;
      }
      handleFormSubmit(watchedFormData);
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  // Form submission handler with loading management
  const handleFormSubmit = async (data: IDPFormData) => {
    // Final reCAPTCHA validation check
    if (!recaptchaValue) {
      showAlertMessage(
        "Please complete the reCAPTCHA verification",
        "error",
        { position: "top-right", autoHideDuration: 6000 }
      );
      return;
    }

    try {
      setIsLoading(true);
      // Start loading state
      globalLoading.startLoading("formSubmission");

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

      const generatedMemberNumber = memberVerificationState.verifiedMember
        ? Number(membershipNumber)
        : null;
      const getApplicantMembership = memberVerificationState.verifiedMember
        ? true
        : false;

      // File processing
      let visaPdfBase64: string;
      let passportBioDataPdfBase64: string;
      let passportPhotoBase64: string;

      visaPdfBase64 = await fileToDataUrl(visaCopy);
      passportBioDataPdfBase64 = await fileToDataUrl(passportBioDataPage);
      passportPhotoBase64 = await fileToDataUrl(passportPhoto);

      const memberPostData: CreateMemberData = {
        aa_member_no: generatedMemberNumber,
        surname: surname,
        onames: otherNames,
        paddress: postalAddress,
        email: emailAddress,
        tel: telephoneNumber,
        isMember: getApplicantMembership,
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

      const { error } = await applyForIdp(
        memberPostData,
        pendingIdpPostData,
        idpDocuments
      );

      if (error) {
        showAlertMessage(
          `${error || "Failed to submit application. Please try again."}`,
          "error",
          { position: "top-right", autoHideDuration: 6000 }
        );
        return;
      }

      // Reset the form to initial state
      reset();

      // Reset reCAPTCHA
      setRecaptchaValue(null);
      recaptchaRef.current?.reset();

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

      // Navigate to success page after a short delay
      setTimeout(() => {
        navigate("/idp/apply-success", {
          state: {
            applicantName: `${surname} ${otherNames}`,
            applicationDate: currentDate,
            email: emailAddress,
          },
        });
      }, 500);
    } catch (error: unknown) {
      console.error("::debug error:", error);
      
      let errorMessage = "Failed to submit application. Please try again.";

      if (error instanceof Error) {
        if (error.message.toLowerCase().includes("recaptcha")) {
          errorMessage = "reCAPTCHA verification failed. Please try again.";
        } else if (error.message.toLowerCase().includes("network")) {
          errorMessage = "Network error. Please check your connection and try again.";
        }
      }

      showAlertMessage(
        `${error || errorMessage}`,
        "error",
        { position: "top-right", autoHideDuration: 7000 }
      );

      // Reset reCAPTCHA on error
      setRecaptchaValue(null);
      recaptchaRef.current?.reset();
    } finally {
      // Always stop loading state
      globalLoading.stopLoading("formSubmission");
      setIsLoading(false);
    }
  };

  // File handling functions
  const handleFileUpload = async (fieldName: keyof IDPFormData, file: File) => {
    setValue(fieldName, file, { shouldValidate: true, shouldTouch: true });

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
              { position: "top-right", autoHideDuration: 6000 }
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
            autoHideDuration: 6000,
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

    setValue(fieldName, undefined, { shouldValidate: true, shouldTouch: true });

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

  // Helper function to format and validate phone numbers during form population
  const formatPhoneNumberForForm = (
    phoneNumber: string | null | undefined
  ): string => {
    return formatUgandaPhoneNumber(phoneNumber);
  };

  const handleResetPopulatedData = () => {
    setValue("surname", "");
    setValue("otherNames", "");
    setValue("emailAddress", "");
    setValue("telephoneNumber", "");
  };

  // Stable auto-verification function that doesn't cause re-renders
  const autoVerifyMembership = useCallback(
    async (membershipNumber: string) => {
      if (!membershipNumber.trim()) {
        setMemberVerificationState((prev) => ({
          ...prev,
          verifiedMember: null,
          verificationError: null,
          lastVerifiedNumber: null,
          showVerificationButton: false,
        }));
        return;
      }

      const memberNumber = parseInt(membershipNumber.trim());

      // Validate the number format
      if (isNaN(memberNumber) || memberNumber <= 0) {
        setMemberVerificationState((prev) => ({
          ...prev,
          verifiedMember: null,
          verificationError: "Please enter a valid membership number",
          showVerificationButton: false,
          lastVerifiedNumber: null,
        }));
        return;
      }

      // Check if we already verified this number
      setMemberVerificationState((prev) => {
        if (prev.lastVerifiedNumber === membershipNumber) {
          console.log(
            "::debug Already verified this number:",
            membershipNumber
          );
          return prev;
        }

        console.log("::debug Starting verification for:", membershipNumber);
        return {
          ...prev,
          isVerifying: true,
          verificationError: null,
        };
      });

      try {
        const result = await getAAUMemberByNumber(memberNumber);
        console.log("::debug Verification result:", result);

        if (result.error) {
          setMemberVerificationState((prev) => ({
            ...prev,
            isVerifying: false,
            verifiedMember: null,
            verificationError: result.error,
            lastVerifiedNumber: membershipNumber,
            showVerificationButton: false,
          }));

          showAlertMessage(
            `Member verification failed: ${result.error}`,
            "error",
            { position: "top-right", autoHideDuration: 6000 }
          );
          return;
        }

        if (result.data) {
          // Successfully found member
          setMemberVerificationState((prev) => ({
            ...prev,
            isVerifying: false,
            verifiedMember: result.data,
            verificationError: null,
            lastVerifiedNumber: membershipNumber,
            showVerificationButton: false,
          }));

          // Auto-populate form fields with member data
          setValue("surname", result.data.fname || "", {
            shouldValidate: true,
            shouldTouch: true,
          });
          setValue("otherNames", result.data.onames || "", {
            shouldValidate: true,
            shouldTouch: true,
          });
          setValue("emailAddress", result.data.email || "", {
            shouldValidate: true,
            shouldTouch: true,
          });
          // Format and validate phone numbers before setting them
          const formattedTel = formatPhoneNumberForForm(result.data.tel);

          setValue("telephoneNumber", formattedTel, { 
            shouldValidate: true,
            shouldTouch: true,
          });

          showAlertMessage(
            `Member verified successfully! Welcome back, ${result.data.fname} ${result.data.onames}`,
            "success",
            { position: "top-right", autoHideDuration: 6000 }
          );
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error occurred";
        setMemberVerificationState((prev) => ({
          ...prev,
          isVerifying: false,
          verifiedMember: null,
          verificationError: errorMessage,
          lastVerifiedNumber: membershipNumber,
          showVerificationButton: false,
        }));

        showAlertMessage(
          `Member verification failed: ${errorMessage}`,
          "error",
          { position: "top-right", autoHideDuration: 6000 }
        );
      }
    },
    [setValue, showAlertMessage]
  );

  // Watch membership number for changes
  const watchedMembershipNumber = watch("membershipNumber");

  // Handle auto-verification with proper debouncing
  useEffect(() => {
    console.log(
      "::debug useEffect triggered - isMember:",
      watchedIsMember,
      "membershipNumber:",
      watchedMembershipNumber
    );

    // Clear existing timer
    if (membershipDebounceRef.current) {
      clearTimeout(membershipDebounceRef.current);
      membershipDebounceRef.current = null;
    }

    if (!watchedIsMember) {
      // Reset member verification state if not a member
      setMemberVerificationState((prev) => ({
        ...prev,
        verifiedMember: null,
        verificationError: null,
        lastVerifiedNumber: null,
        showVerificationButton: false,
      }));
      return;
    }

    if (!watchedMembershipNumber?.trim()) {
      // Clear member data if membership number is cleared
      setMemberVerificationState((prev) => ({
        ...prev,
        verifiedMember: null,
        verificationError: null,
        lastVerifiedNumber: null,
        showVerificationButton: false,
      }));
      return;
    }

    // Update verification button state
    setMemberVerificationState((prev) => {
      const shouldShowButton = Boolean(
        watchedMembershipNumber?.trim() &&
          watchedMembershipNumber !== prev.lastVerifiedNumber
      );

      return {
        ...prev,
        showVerificationButton: shouldShowButton,
      };
    });

    // Set up debounced verification (auto-trigger after 2 seconds of no typing)
    membershipDebounceRef.current = setTimeout(() => {
      autoVerifyMembership(watchedMembershipNumber);
    }, 2000);

    // Cleanup function
    return () => {
      if (membershipDebounceRef.current) {
        clearTimeout(membershipDebounceRef.current);
        membershipDebounceRef.current = null;
      }
    };
  }, [watchedMembershipNumber, watchedIsMember]);

  // Manual member verification (triggered by button click)
  const handleManualMemberVerification = useCallback(async () => {
    const membershipNumber = watch("membershipNumber");
    if (membershipNumber) {
      // Clear any pending auto-verification timer
      if (membershipDebounceRef.current) {
        clearTimeout(membershipDebounceRef.current);
        membershipDebounceRef.current = null;
      }

      // Reset populated data before verification
      handleResetPopulatedData();

      // Perform manual verification
      await autoVerifyMembership(membershipNumber);
    }
  }, [autoVerifyMembership, watch]);

  // Cleanup debounce timer
  useEffect(() => {
    return () => {
      if (membershipDebounceRef.current) {
        clearTimeout(membershipDebounceRef.current);
      }
    };
  }, []);

  // Computed values
  const applicationFee = watchedIsMember ? 250000 : 350000;

  // Phone number helper functions for use in form inputs
  // Updated for onBlur validation - no immediate validation on change
  const handlePhoneNumberChange = useCallback(
    (fieldName: "telephoneNumber" | "mobileNumber", value: string) => {
      // Set the value without immediate validation (will validate onBlur)
      // This prevents validation errors from showing while user is still typing
      setValue(fieldName, value, { shouldValidate: false });
    },
    [setValue]
  );

  // Helper function for manual validation trigger when needed
  // Useful for programmatic validation outside of normal onBlur flow
  const triggerPhoneValidation = useCallback(
    (fieldName: "telephoneNumber" | "mobileNumber") => {
      trigger(fieldName);
    },
    [trigger]
  );

  const getPhoneNumberHelperText = useCallback(
    (fieldName: "telephoneNumber" | "mobileNumber") => {
      const error = errors[fieldName];
      const value = watch(fieldName);
      return getPhoneHelperText(value || "", error?.message);
    },
    [errors, watch]
  );

  // reCAPTCHA handlers
  const handleRecaptchaChange = useCallback((value: string | null) => {
    setRecaptchaValue(value);
    if (value) {
      // Clear any error messages when reCAPTCHA is completed
      setShowAlert(false);
    }
  }, []);

  const handleRecaptchaError = useCallback(() => {
    setRecaptchaValue(null);
    showAlertMessage(
      "reCAPTCHA error occurred. Please refresh the page and try again.",
      "error",
      { position: "top-right", autoHideDuration: 6000 }
    );
  }, [showAlertMessage]);

  const handleRecaptchaExpired = useCallback(() => {
    setRecaptchaValue(null);
    showAlertMessage(
      "reCAPTCHA has expired. Please verify again.",
      "warning",
      { position: "top-right", autoHideDuration: 6000 }
    );
  }, [showAlertMessage]);

  return {
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

    // Loading states
    globalLoading,
    isFormSubmitting: globalLoading.isLoading("formSubmission"),

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
    isSubmitting,
    trigger,
    setValue,
    reset,
    watchedIsMember,
    watchedFormData,

    // Computed values
    applicationFee,

    // Phone number utilities
    handlePhoneNumberChange,
    triggerPhoneValidation,
    getPhoneNumberHelperText,
    validateUgandaPhoneNumber,

    // Handlers
    handleNext,
    handleBack,
    handleFormSubmit,
    handleFileUpload,
    handleFileRemove,
    showAlertMessage,
    createImagePreviewUrl,
    formatFileSize,
    handleManualMemberVerification,
    autoVerifyMembership,

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

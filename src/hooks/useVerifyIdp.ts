import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { config } from "../utils/config/config";
import { verifyIdp } from "../api";
import type { verifyIdpResultProp } from "../types";
import { useGlobalLoading } from "../contexts";

export interface VerificationResult {
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

export const useVerifyIdp = () => {
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<verifyIdpResultProp | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();

  // reCAPTCHA state
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);
  const recaptchaRef = useRef<any>(null);

  // Loading management hook
  const globalLoading = useGlobalLoading();

  const features = [
    {
      icon: "SecurityIcon",
      title: "AA Uganda Authorized",
      description:
        "Official verification service by Automobile Association of Uganda since 1955",
    },
    {
      icon: "VerifiedUserIcon",
      title: "FIA & AIT Endorsed",
      description:
        "Recognized by Federation Internationale de l'Automobile and Alliance Internationale de Tourisme",
    },
    {
      icon: "LanguageIcon",
      title: "150+ Countries Valid",
      description:
        "Valid in over 150 countries worldwide under 1968 Vienna Convention",
    },
  ];

  const handleSearch = async (idpNumber?: string) => {
    const value = idpNumber ?? searchValue;
    setResult(null);
    
    if (!value.trim()) {
      setAlertMessage("Please enter an IDP number to verify");
      setShowAlert(true);
      return;
    }

    // reCAPTCHA validation
    if (!recaptchaValue) {
      setAlertMessage("Please complete the reCAPTCHA verification before searching");
      setShowAlert(true);
      return;
    }

    // Start loading state
    globalLoading.startLoading('verifyIdpFormSubmission');
    setLoading(true);
    
    try {
      const {data, error} = await verifyIdp(Number(value));

      if (error) {
        setShowAlert(true);
        setAlertMessage(
          `${error || "Failed to verify IDP. Please try again."}`,
        );
        // Reset reCAPTCHA on error
        setRecaptchaValue(null);
        recaptchaRef.current?.reset();
        return;
      }

      if (data?.idp_available) {
        setResult(data);
      } else {
        setResult(data || null);
      }
    } catch (error) {
      let errorMessage = "An error occurred while verifying the IDP. Please try again.";
      
      if (error instanceof Error) {
        if (error.message.toLowerCase().includes("recaptcha")) {
          errorMessage = "reCAPTCHA verification failed. Please try again.";
        } else if (error.message.toLowerCase().includes("network")) {
          errorMessage = "Network error. Please check your connection and try again.";
        }
      }

      setAlertMessage(errorMessage);
      setShowAlert(true);
      
      // Reset reCAPTCHA on error
      setRecaptchaValue(null);
      recaptchaRef.current?.reset();
    } finally {
      // Always stop loading state
      globalLoading.stopLoading('verifyIdpFormSubmission');
      setLoading(false);
    }
  };

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
    setAlertMessage("reCAPTCHA error occurred. Please refresh the page and try again.");
    setShowAlert(true);
  }, []);

  const handleRecaptchaExpired = useCallback(() => {
    setRecaptchaValue(null);
    setAlertMessage("reCAPTCHA has expired. Please verify again.");
    setShowAlert(true);
  }, []);

  return {
    searchValue,
    setSearchValue,
    loading,
    result,
    showAlert,
    setShowAlert,
    alertMessage,
    setAlertMessage,
    handleSearch,
    features,
    navigate,
    config,
    // reCAPTCHA values and handlers
    recaptchaValue,
    recaptchaRef,
    handleRecaptchaChange,
    handleRecaptchaError,
    handleRecaptchaExpired,
  };
};

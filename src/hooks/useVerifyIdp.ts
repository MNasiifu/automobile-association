import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MockIdpVerificationService } from "../utils/mockIdpDatabase";
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
    // Start loading state
    globalLoading.startLoading('verifyIdpFormSubmission');

    const value = idpNumber ?? searchValue;
    setResult(null);
    if (!value.trim()) {
      setAlertMessage("Please enter an IDP number to verify");
      setShowAlert(true);
      return;
    }
    setLoading(true);
    try {
      const {data, error} = await verifyIdp(Number(value));
      console.log("::debug data:",data);
      console.log("::debug error:",error);

      if (error) {
        setShowAlert(true);
        setAlertMessage(
          `${error || "Failed to submit application. Please try again."}`,
        );
        return;
      }

      if (data?.idp_available) {
        setResult(data);
      } else {
        setResult(null);
      }
    } catch (error) {
      setAlertMessage("An error occurred while verifying the IDP. Please try again.");
      setShowAlert(true);
    } finally {
      // Always stop loading state
      globalLoading.stopLoading('verifyIdpFormSubmission');
      setLoading(false);
    }
  };

  const getTestCases = () => MockIdpVerificationService.getTestCases();

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
    getTestCases,
    navigate,
    config,
  };
};
